export type FiscalDeviceStatus = 'new' | 'ok' | 'warning' | 'overdue';

function validDay(value: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Nieprawidłowa data.');
  const date = new Date(value + 'T00:00:00Z');
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) throw new Error('Nieprawidłowa data.');
  return date;
}

export function nextInspectionDate(fiscalizationDate: string): string {
  const date = validDay(fiscalizationDate), year = date.getUTCFullYear() + 2, month = date.getUTCMonth();
  const day = Math.min(date.getUTCDate(), new Date(Date.UTC(year, month + 1, 0)).getUTCDate());
  return new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
}

export function fiscalDeviceStatus(nextInspection: string, lastInspection: string | null, now = new Date()): FiscalDeviceStatus {
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Warsaw' }).format(now);
  const days = Math.round((validDay(nextInspection).getTime() - validDay(today).getTime()) / 86400000);
  if (days < 0) return 'overdue';
  if (days <= 90) return 'warning';
  return lastInspection ? 'ok' : 'new';
}
