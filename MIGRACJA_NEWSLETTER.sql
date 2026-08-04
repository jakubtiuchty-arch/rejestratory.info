-- =====================================================
-- MIGRACJA: Newsletter tygodniowy — rejestr zatwierdzonych wysyłek
-- Data: 2026-08-04
-- Idempotencja przycisku "Zatwierdź wysyłkę" (PK = plik wydania):
-- drugie kliknięcie nie zaplanuje maili po raz drugi.
-- =====================================================

CREATE TABLE IF NOT EXISTS newsletter_sends (
  file TEXT PRIMARY KEY,
  approved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  scheduled_for TIMESTAMPTZ NOT NULL,
  recipient_count INT NOT NULL DEFAULT 0
);

COMMENT ON TABLE newsletter_sends IS 'Zatwierdzone wydania newslettera dla nadleśnictw (plik = public/newsletter/editions/...)';

-- =====================================================
-- WERYFIKACJA: SELECT * FROM newsletter_sends;
-- =====================================================
