import { timingSafeEqual } from "node:crypto";
import { nextInspectionDate } from "./fiscal-device-status";

export class PospayValidationError extends Error {}

export interface PospayRegistration {
  eventId: string;
  batchId: string;
  serialNumber: string;
  clientName: string;
  taxpayerNIP: string;
  forestryUnit: string;
  location: string;
  fiscalizationDate: string;
  nextInspectionDate: string;
}

export function authorizedPospayRequest(header: string | null, token = process.env.POSPAY_STUDIO_API_TOKEN): boolean {
  if (!token || token.length < 32 || !header?.startsWith("Bearer ")) return false;
  const supplied = Buffer.from(header.slice(7)), expected = Buffer.from(token);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export function uuid(value: unknown): string {
  if (typeof value !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
    throw new PospayValidationError("Nieprawidłowy identyfikator zgłoszenia.");
  }
  return value.toLowerCase();
}

function text(value: unknown, max: number, label: string): string {
  if (typeof value !== "string" || /[\x00-\x1f\x7f]/.test(value)) throw new PospayValidationError("Nieprawidłowe pole: " + label);
  const clean = value.trim().replace(/\s+/g, " ");
  if (!clean || clean.length > max) throw new PospayValidationError("Nieprawidłowe pole: " + label);
  return clean;
}

export function parseRegistration(input: unknown): PospayRegistration {
  if (!input || typeof input !== "object") throw new PospayValidationError("Brak danych fiskalizacji.");
  const data = input as Record<string, unknown>;
  const serialNumber = text(data.serialNumber, 30, "numer EBF").replace(/\s/g, "").toUpperCase();
  if (!/^EBF\d{10}$/.test(serialNumber)) throw new PospayValidationError("Nieprawidłowy numer unikatowy Pospaya.");
  const taxpayerNIP = text(data.taxpayerNIP, 10, "NIP");
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  if (!/^\d{10}$/.test(taxpayerNIP) || /^0+$/.test(taxpayerNIP) ||
      weights.reduce((sum, w, i) => sum + w * Number(taxpayerNIP[i]), 0) % 11 !== Number(taxpayerNIP[9])) {
    throw new PospayValidationError("Nieprawidłowy NIP podatnika.");
  }
  const date = text(data.fiscalizationDate, 10, "data fiskalizacji");
  let next: string;
  try { next = nextInspectionDate(date); } catch { throw new PospayValidationError("Nieprawidłowa data fiskalizacji."); }
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Warsaw" }).format(new Date());
  if (date > today || date < "2000-01-01") throw new PospayValidationError("Data fiskalizacji nie może być przyszła.");
  return {
    eventId: uuid(data.eventId), batchId: uuid(data.batchId), serialNumber,
    clientName: text(data.clientName, 200, "klient"), taxpayerNIP,
    forestryUnit: text(data.forestryUnit, 120, "leśnictwo").replace(/^Leśnictwo\s+/i, ""),
    location: text(data.location, 500, "adres"), fiscalizationDate: date, nextInspectionDate: next,
  };
}

export function parseNotification(input: unknown): { batchId: string; eventIds: string[]; recipients: string[] } {
  if (!input || typeof input !== "object") throw new PospayValidationError("Brak danych wiadomości.");
  const data = input as Record<string, unknown>;
  if (!Array.isArray(data.eventIds) || !data.eventIds.length || data.eventIds.length > 500) throw new PospayValidationError("Nieprawidłowa lista urządzeń.");
  const eventIds = [...new Set(data.eventIds.map(uuid))].sort();
  if (eventIds.length !== data.eventIds.length) throw new PospayValidationError("Powtórzone urządzenie w wiadomości.");
  if (!Array.isArray(data.recipients) || !data.recipients.length || data.recipients.length > 5) throw new PospayValidationError("Wpisz adres email odbiorcy.");
  const recipients = [...new Set(data.recipients.map(value => {
    const email = text(value, 254, "email").toLowerCase();
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) throw new PospayValidationError("Nieprawidłowy adres email.");
    return email;
  }))].sort();
  return { batchId: uuid(data.batchId), eventIds, recipients };
}
