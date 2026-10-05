import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { authorizedPospayRequest, parseRegistration, parseNotification } from "../lib/pospay-registration";
import { nextInspectionDate, fiscalDeviceStatus } from "../lib/fiscal-device-status";
import { generateEmailHtml } from "../lib/client-panel-email";

const token = "test-only-pospay-token-" + "x".repeat(40);
const registration = (changes: Record<string, unknown> = {}) => parseRegistration({
  eventId: randomUUID(), batchId: randomUUID(), serialNumber: "EBF 2402281501",
  clientName: "Nadleśnictwo Limanowa", taxpayerNIP: "7370005045", forestryUnit: "Leśnictwo Jaworz",
  location: "Laskowa 418, 34-603 Laskowa", fiscalizationDate: "2026-09-29", ...changes,
});

test("daty, status, NIP, autoryzacja i walidacja wiadomości", () => {
  assert.equal(nextInspectionDate("2026-09-29"), "2028-09-29");
  assert.equal(nextInspectionDate("2024-02-29"), "2026-02-28");
  assert.throws(() => nextInspectionDate("2026-02-30"));
  const date = new Date("2026-09-29T14:00:00Z");
  assert.equal(fiscalDeviceStatus("2028-09-29", null, date), "new");
  assert.equal(fiscalDeviceStatus("2028-09-29", "2026-09-29", date), "ok");
  assert.equal(fiscalDeviceStatus("2026-09-29", null, date), "warning");
  assert.equal(fiscalDeviceStatus("2026-09-28", null, date), "overdue");
  assert.equal(authorizedPospayRequest("Bearer " + token, token), true);
  assert.equal(authorizedPospayRequest("Bearer invalid", token), false);
  assert.equal(authorizedPospayRequest(null, token), false);
  assert.equal(authorizedPospayRequest("Bearer " + token, ""), false);
  const data = registration();
  assert.equal(data.serialNumber, "EBF2402281501");
  assert.equal(data.forestryUnit, "Jaworz");
  assert.equal(data.nextInspectionDate, "2028-09-29");
  assert.throws(() => registration({ taxpayerNIP: "7370005046" }));
  assert.throws(() => registration({ clientName: "Limanowa\nInjected" }));
  assert.throws(() => registration({ serialNumber: "EBF1" }));
  assert.throws(() => registration({ fiscalizationDate: "2099-01-01" }));
  assert.throws(() => parseNotification({ batchId: data.batchId, eventIds: [data.eventId], recipients: ["invalid"] }));
  assert.throws(() => parseNotification({ batchId: data.batchId, eventIds: [data.eventId, data.eventId], recipients: ["user@example.org"] }));
});

test("migracja SQL, ponowienia, cały zestaw, osobny mail i zachowanie przeglądu", async () => {
  const db = new PGlite();
  try {
    await db.exec(`CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role;
      CREATE TABLE public.devices (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz DEFAULT now(),
      client_name text NOT NULL, device_name text NOT NULL, serial_number text UNIQUE NOT NULL,
      last_inspection_date date, next_inspection_date date NOT NULL, location text DEFAULT '',
      last_inspection_id uuid, forestry_unit text, fiscalization_date date);`);
    await db.exec(`CREATE TABLE public.reminders (device_id uuid, client_name text, serial_number text,
      reminder_date date, reminder_type text, is_sent boolean DEFAULT false, UNIQUE(device_id, reminder_type));`);
    const legacy = await readFile("MIGRACJA_BAZY_URZADZENIA.sql", "utf8");
    const triggerFunction = legacy.slice(legacy.indexOf("CREATE OR REPLACE FUNCTION create_inspection_reminder()"), legacy.indexOf("-- 7. Trigger"));
    await db.exec(triggerFunction);
    await db.exec("CREATE TRIGGER trigger_create_inspection_reminder AFTER INSERT OR UPDATE OF next_inspection_date ON devices FOR EACH ROW EXECUTE FUNCTION create_inspection_reminder()");
    const sql = (await readFile("MIGRACJA_POSPAY_STUDIO.sql", "utf8"))
      .replaceAll("__POSPAY_STUDIO_TOKEN_SHA256__", createHash("sha256").update(token).digest("hex"));
    await db.exec(sql);
    await db.exec(sql); // instalacja ponowna zachowuje istniejące dane
    const rpc = async (action: string, payload: unknown, auth = token) =>
      (await db.query<{ result: any }>("SELECT public.pospay_studio_sync($1, $2, $3::jsonb) AS result", [auth, action, JSON.stringify(payload)])).rows[0].result;
    const first = registration();
    await assert.rejects(() => rpc("register", first, "wrong-token"));
    await db.exec("SET ROLE anon");
    await assert.rejects(() => db.query("SELECT token_hash FROM public.pospay_studio_keys"));
    const result = await rpc("register", first);
    await db.exec("RESET ROLE");
    assert.equal(result.device.last_inspection_date, null);
    assert.equal(result.device.fiscalization_date, "2026-09-29");
    assert.equal(result.device.next_inspection_date, "2028-09-29");
    assert.equal(result.device.forestry_unit, "Jaworz");
    assert.equal(result.device.client_nip, "7370005045");
    const reminders = await db.query<{ reminder_date: string; reminder_type: string }>("SELECT reminder_date::text AS reminder_date, reminder_type FROM reminders");
    assert.equal(reminders.rows[0].reminder_date, "2028-09-15");
    assert.equal(reminders.rows[0].reminder_type, "first_inspection");
    assert.equal((await rpc("register", first)).device.id, result.device.id);
    assert.equal((await db.query("SELECT * FROM devices")).rows.length, 1);
    assert.equal((await db.query<{ email_state: string }>("SELECT email_state FROM pospay_studio_batches")).rows[0].email_state, "open");
    await assert.rejects(() => rpc("register", { ...first, clientName: "Inny klient" }), /POSPAY_CONFLICT/);
    const second = registration({ batchId: first.batchId, serialNumber: "EBF2402281502", forestryUnit: "Kostrza" });
    await rpc("register", second);
    const request = parseNotification({ batchId: first.batchId, eventIds: [first.eventId, second.eventId], recipients: ["katarzyna.arkuszewska@krakow.lasy.gov.pl"] });
    await assert.rejects(() => rpc("claim_email", { ...request, eventIds: [first.eventId], claimId: randomUUID() }), /POSPAY_CONFLICT/);
    const claimId = randomUUID();
    const claim = await rpc("claim_email", { ...request, claimId });
    assert.equal(claim.claimed, true);
    assert.equal(claim.registrations.length, 2);
    assert.equal((await rpc("claim_email", { ...request, claimId: randomUUID() })).claimed, false);
    await assert.rejects(() => rpc("register", registration({ batchId: first.batchId, serialNumber: "EBF2402281503" })), /POSPAY_CONFLICT/);
    await assert.rejects(() => rpc("finish_email", { batchId: first.batchId, claimId: randomUUID(), emailId: "MAIL-1" }), /POSPAY_CONFLICT/);
    await rpc("finish_email", { batchId: first.batchId, claimId, emailId: "MAIL-1" });
    const retried = await rpc("claim_email", { ...request, claimId: randomUUID() });
    assert.equal(retried.status, "sent"); assert.equal(retried.emailId, "MAIL-1");
    assert.equal(retried.alreadySent, true);
    await assert.rejects(() => rpc("claim_email", { ...request, recipients: ["other@example.org"], claimId: randomUUID() }), /POSPAY_CONFLICT/);
    await db.query("UPDATE devices SET last_inspection_date = '2028-08-15', next_inspection_date = '2030-08-15' WHERE id = $1", [result.device.id]);
    const afterInspection = await rpc("register", first);
    assert.equal(afterInspection.device.last_inspection_date, "2028-08-15");
    assert.equal(afterInspection.device.next_inspection_date, "2030-08-15");
    assert.equal(fiscalDeviceStatus("2030-08-15", "2028-08-15", new Date("2028-08-16")), "ok");
    const leap = registration({ fiscalizationDate: "2024-02-29", serialNumber: "EBF2402281504" });
    const leapResult = await rpc("register", leap);
    assert.equal(leapResult.device.next_inspection_date, "2026-02-28");
    const lateRequest = parseNotification({ batchId: leap.batchId, eventIds: [leap.eventId], recipients: ["user@example.org"] });
    await rpc("claim_email", { ...lateRequest, claimId: randomUUID() });
    await db.query("UPDATE pospay_studio_batches SET first_attempt_at = now() - interval '25 hours', claim_started_at = now() - interval '25 hours' WHERE id=$1", [leap.batchId]);
    await assert.rejects(() => rpc("claim_email", { ...lateRequest, claimId: randomUUID() }), /POSPAY_EMAIL_UNCONFIRMED/);
    const html = generateEmailHtml({ clientName: "Nadleśnictwo <test>", deviceType: "Posnet Pospay", serialNumber: first.serialNumber,
      allSerialNumbers: [first.serialNumber, second.serialNumber], taxpayerNIP: first.taxpayerNIP,
      fiscalizations: [first, second].map(r => ({ serialNumber: r.serialNumber, forestryUnit: r.forestryUnit, date: r.fiscalizationDate, nextInspection: r.nextInspectionDate })) });
    assert.ok(html.includes(first.serialNumber) && html.includes(second.serialNumber));
    assert.ok(html.includes("Jaworz") && html.includes("Kostrza") && html.includes("29.09.2028"));
    assert.ok(html.includes("&lt;test&gt;") && !html.includes("Nadleśnictwo <test>"));
  } finally { await db.close(); }
});
