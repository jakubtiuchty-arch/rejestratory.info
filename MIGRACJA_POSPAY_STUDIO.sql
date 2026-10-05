-- Integracja Pospay Studio. Wykonaj w bazie portalu.
-- Zastąp __POSPAY_STUDIO_TOKEN_SHA256__ skrótem SHA-256 dedykowanego tokena API.
-- Token jest przechowywany w Vercel i Pęku kluczy Maca; w bazie jest tylko jego skrót.
BEGIN;

ALTER TABLE public.devices ADD COLUMN IF NOT EXISTS client_nip text;
-- Istniejący trigger odwołuje się do reminders bez schematu. Jego własna, ograniczona ścieżka
-- zapewnia obsługę przypomnień również wtedy, gdy wywołuje go RPC z pustym search_path.
DO $$ BEGIN
  IF pg_catalog.to_regprocedure('public.create_inspection_reminder()') IS NOT NULL THEN
    ALTER FUNCTION public.create_inspection_reminder() SET search_path = pg_catalog, public, pg_temp;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.pospay_studio_keys (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  token_hash text NOT NULL CHECK (length(token_hash) = 64)
);
INSERT INTO public.pospay_studio_keys (id, token_hash) VALUES (true, '__POSPAY_STUDIO_TOKEN_SHA256__')
  ON CONFLICT (id) DO UPDATE SET token_hash = EXCLUDED.token_hash;

CREATE TABLE IF NOT EXISTS public.pospay_studio_batches (
  id uuid PRIMARY KEY,
  client_name text NOT NULL,
  client_nip text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  email_state text NOT NULL DEFAULT 'open' CHECK (email_state IN ('open', 'sending', 'failed', 'sent')),
  email_payload jsonb,
  email_id text,
  email_error text,
  first_attempt_at timestamptz,
  claim_id uuid,
  claim_started_at timestamptz
);
CREATE TABLE IF NOT EXISTS public.pospay_studio_fiscalizations (
  event_id uuid PRIMARY KEY,
  batch_id uuid NOT NULL REFERENCES public.pospay_studio_batches(id),
  serial_number text NOT NULL UNIQUE,
  device_id uuid NOT NULL REFERENCES public.devices(id),
  registration_data jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.pospay_studio_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pospay_studio_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pospay_studio_fiscalizations ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.pospay_studio_keys, public.pospay_studio_batches, public.pospay_studio_fiscalizations FROM PUBLIC, anon, authenticated;

-- Dostęp wyłącznie przez tę funkcję z dedykowanym tokenem; search_path nie obejmuje schematów użytkowników.
CREATE OR REPLACE FUNCTION public.pospay_studio_sync(p_token text, p_action text, p_payload jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE
  reg public.pospay_studio_fiscalizations%ROWTYPE;
  batch public.pospay_studio_batches%ROWTYPE;
  device public.devices%ROWTYPE;
  eid uuid; bid uuid; serial text; cname text; nip text; forestry text; address text;
  fisc_date date; next_date date; matches integer; request_payload jsonb; actual_ids jsonb;
  notification_id uuid;
BEGIN
  IF p_token IS NULL OR length(p_token) < 32 OR NOT EXISTS (
    SELECT 1 FROM public.pospay_studio_keys
    WHERE token_hash = pg_catalog.encode(pg_catalog.sha256(pg_catalog.convert_to(p_token, 'UTF8')), 'hex')
  ) THEN RAISE EXCEPTION 'POSPAY_UNAUTHORIZED'; END IF;
  bid := (p_payload->>'batchId')::uuid;

  IF p_action = 'register' THEN
    eid := (p_payload->>'eventId')::uuid;
    serial := pg_catalog.regexp_replace(pg_catalog.upper(p_payload->>'serialNumber'), '\s', '', 'g');
    cname := pg_catalog.btrim(p_payload->>'clientName'); nip := p_payload->>'taxpayerNIP';
    forestry := pg_catalog.btrim(p_payload->>'forestryUnit'); address := p_payload->>'location';
    fisc_date := (p_payload->>'fiscalizationDate')::date;
    next_date := (fisc_date + interval '2 years')::date;
    IF bid IS NULL OR eid IS NULL OR serial IS NULL OR serial !~ '^EBF[0-9]{10}$' OR nip IS NULL OR nip !~ '^[0-9]{10}$'
       OR cname IS NULL OR length(cname) NOT BETWEEN 1 AND 200
       OR forestry IS NULL OR length(forestry) NOT BETWEEN 1 AND 120
       OR address IS NULL OR length(address) NOT BETWEEN 1 AND 500
       OR fisc_date IS NULL OR fisc_date > (now() AT TIME ZONE 'Europe/Warsaw')::date OR fisc_date < '2000-01-01'::date
       OR next_date IS DISTINCT FROM (p_payload->>'nextInspectionDate')::date THEN RAISE EXCEPTION 'POSPAY_INVALID'; END IF;
    PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(serial, 0));
    SELECT * INTO reg FROM public.pospay_studio_fiscalizations WHERE event_id = eid OR serial_number = serial;
    IF FOUND THEN
      IF reg.registration_data <> p_payload THEN RAISE EXCEPTION 'POSPAY_CONFLICT: urządzenie ma inne dane zgłoszenia'; END IF;
      SELECT * INTO device FROM public.devices WHERE id = reg.device_id;
      RETURN pg_catalog.jsonb_build_object('registrationId', reg.event_id, 'batchId', reg.batch_id, 'device', pg_catalog.to_jsonb(device), 'alreadyRegistered', true);
    END IF;
    INSERT INTO public.pospay_studio_batches (id, client_name, client_nip) VALUES (bid, cname, nip) ON CONFLICT DO NOTHING;
    SELECT * INTO batch FROM public.pospay_studio_batches WHERE id = bid FOR UPDATE;
    IF batch.client_name <> cname OR batch.client_nip <> nip OR batch.email_state <> 'open' THEN
      RAISE EXCEPTION 'POSPAY_CONFLICT: partia jest zamknięta lub należy do innego klienta';
    END IF;
    SELECT count(*) INTO matches FROM public.devices
      WHERE pg_catalog.regexp_replace(pg_catalog.upper(serial_number), '\s', '', 'g') = serial;
    IF matches > 1 THEN RAISE EXCEPTION 'POSPAY_CONFLICT: powielony numer w istniejącej bazie'; END IF;
    SELECT * INTO device FROM public.devices
      WHERE pg_catalog.regexp_replace(pg_catalog.upper(serial_number), '\s', '', 'g') = serial FOR UPDATE;
    IF FOUND THEN
      IF pg_catalog.lower(pg_catalog.btrim(device.client_name)) <> pg_catalog.lower(cname)
         OR (device.client_nip IS NOT NULL AND device.client_nip <> nip)
         OR (device.fiscalization_date IS NOT NULL AND device.fiscalization_date <> fisc_date)
         OR (coalesce(device.forestry_unit, '') <> '' AND device.forestry_unit <> forestry) THEN
        RAISE EXCEPTION 'POSPAY_CONFLICT: istniejące urządzenie ma inne dane klienta lub leśnictwa';
      END IF;
      UPDATE public.devices SET client_nip = nip, forestry_unit = forestry, location = address,
        fiscalization_date = coalesce(fiscalization_date, fisc_date),
        next_inspection_date = CASE WHEN last_inspection_date IS NULL THEN next_date ELSE next_inspection_date END
        WHERE id = device.id RETURNING * INTO device;
    ELSE
      INSERT INTO public.devices (client_name, client_nip, device_name, serial_number, fiscalization_date,
        last_inspection_date, next_inspection_date, forestry_unit, location)
        VALUES (cname, nip, 'Posnet Pospay', serial, fisc_date, NULL, next_date, forestry, address)
        RETURNING * INTO device;
    END IF;
    INSERT INTO public.pospay_studio_fiscalizations (event_id, batch_id, serial_number, device_id, registration_data)
      VALUES (eid, bid, serial, device.id, p_payload);
    RETURN pg_catalog.jsonb_build_object('registrationId', eid, 'batchId', bid, 'device', pg_catalog.to_jsonb(device), 'alreadyRegistered', false);

  ELSIF p_action = 'claim_email' THEN
    SELECT * INTO batch FROM public.pospay_studio_batches WHERE id = bid FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'POSPAY_NOT_FOUND'; END IF;
    request_payload := p_payload - 'claimId';
    SELECT pg_catalog.jsonb_agg(event_id::text ORDER BY event_id::text) INTO actual_ids
      FROM public.pospay_studio_fiscalizations WHERE batch_id = bid;
    IF actual_ids IS NULL OR actual_ids <> request_payload->'eventIds'
       OR pg_catalog.jsonb_typeof(request_payload->'recipients') <> 'array'
       OR pg_catalog.jsonb_array_length(request_payload->'recipients') NOT BETWEEN 1 AND 5 THEN
      RAISE EXCEPTION 'POSPAY_CONFLICT: lista nie obejmuje całej partii';
    END IF;
    IF batch.email_payload IS NOT NULL AND batch.email_payload <> request_payload THEN
      RAISE EXCEPTION 'POSPAY_CONFLICT: zmieniono dane rozpoczętej wysyłki';
    END IF;
    IF batch.email_state = 'sent' THEN
      RETURN pg_catalog.jsonb_build_object('status', 'sent', 'emailId', batch.email_id, 'alreadySent', true);
    END IF;
    IF batch.first_attempt_at < now() - interval '23 hours' THEN
      RAISE EXCEPTION 'POSPAY_EMAIL_UNCONFIRMED: sprawdź wcześniejszą wysyłkę przed kolejną próbą';
    END IF;
    IF batch.email_state = 'sending' AND batch.claim_started_at > now() - interval '5 minutes' THEN
      RETURN pg_catalog.jsonb_build_object('status', 'sending', 'claimed', false);
    END IF;
    notification_id := (p_payload->>'claimId')::uuid;
    IF notification_id IS NULL THEN RAISE EXCEPTION 'POSPAY_INVALID'; END IF;
    UPDATE public.pospay_studio_batches SET email_state = 'sending', email_payload = request_payload,
      first_attempt_at = coalesce(first_attempt_at, now()), claim_id = notification_id, claim_started_at = now(), email_error = NULL
      WHERE id = bid;
    RETURN pg_catalog.jsonb_build_object('status', 'sending', 'claimed', true, 'claimId', notification_id,
      'clientName', batch.client_name, 'taxpayerNIP', batch.client_nip,
      'registrations', (SELECT pg_catalog.jsonb_agg(registration_data ORDER BY serial_number) FROM public.pospay_studio_fiscalizations WHERE batch_id = bid));

  ELSIF p_action = 'finish_email' THEN
    SELECT * INTO batch FROM public.pospay_studio_batches WHERE id = bid FOR UPDATE;
    IF NOT FOUND OR batch.claim_id IS NULL OR batch.claim_id IS DISTINCT FROM (p_payload->>'claimId')::uuid THEN RAISE EXCEPTION 'POSPAY_CONFLICT'; END IF;
    IF batch.email_state = 'sent' THEN RETURN pg_catalog.jsonb_build_object('status', 'sent', 'emailId', batch.email_id); END IF;
    IF coalesce(p_payload->>'emailId', '') <> '' THEN
      UPDATE public.pospay_studio_batches SET email_state = 'sent', email_id = p_payload->>'emailId', email_error = NULL WHERE id = bid;
      RETURN pg_catalog.jsonb_build_object('status', 'sent', 'emailId', p_payload->>'emailId');
    END IF;
    UPDATE public.pospay_studio_batches SET email_state = 'failed', email_error = left(p_payload->>'error', 500) WHERE id = bid;
    RETURN pg_catalog.jsonb_build_object('status', 'failed');
  END IF;
  RAISE EXCEPTION 'POSPAY_INVALID_ACTION';
END;
$$;
REVOKE ALL ON FUNCTION public.pospay_studio_sync(text, text, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.pospay_studio_sync(text, text, jsonb) TO anon, authenticated, service_role;
NOTIFY pgrst, 'reload schema';
COMMIT;
