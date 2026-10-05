import { createHash } from 'node:crypto';

export class ContractError extends Error {
  constructor(message: string, readonly status = 400) { super(message); }
}
export const MAX_CONTRACT_BYTES = 50 * 1024 * 1024;
export function hashSecret(value: string): string { return createHash('sha256').update(value).digest('hex'); }
export function contractText(value: unknown, max: number): string {
  if (typeof value !== 'string' || /[\x00-\x1f\x7f]/.test(value)) throw new ContractError('Nieprawidłowe dane.');
  const result = value.trim();
  if (!result || result.length > max) throw new ContractError('Uzupełnij wymagane pola.');
  return result;
}
export function contractUUID(value: unknown): string {
  const text = contractText(value, 36);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(text)) throw new ContractError('Nieprawidłowy identyfikator.');
  return text.toLowerCase();
}
export function contractSerial(value: unknown): string {
  const text = contractText(value, 80).toUpperCase();
  if (!/^[A-Z0-9][A-Z0-9._\/-]{2,79}$/.test(text)) throw new ContractError('Nieprawidłowy numer urządzenia.');
  return text;
}
export function contractPhone(value: unknown): string {
  let text = contractText(value, 30).replace(/[\s()-]/g, '');
  if (/^\d{9}$/.test(text)) text = '+48' + text;
  if (/^48\d{9}$/.test(text)) text = '+' + text;
  if (/^[1-9]\d{9,14}$/.test(text)) text = '+' + text;
  if (!/^\+[1-9]\d{7,14}$/.test(text)) throw new ContractError('Podaj numer telefonu z kierunkowym kraju.');
  return text;
}
export function contractNIP(value: unknown): string {
  const text = contractText(value, 15).replace(/[\s-]/g, '');
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  if (!/^\d{10}$/.test(text) || /^0+$/.test(text) || weights.reduce((sum, w, i) => sum + w * Number(text[i]), 0) % 11 !== Number(text[9])) throw new ContractError('Nieprawidłowy NIP klienta.');
  return text;
}
export function contractDate(value: unknown): string {
  const text = contractText(value, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text) || !Number.isFinite(Date.parse(text)) || new Date(text).toISOString().slice(0, 10) !== text) throw new ContractError('Nieprawidłowa data umowy.');
  return text;
}
export function checkContractPDF(data: Buffer): void {
  if (!data.length || data.length > MAX_CONTRACT_BYTES) throw new ContractError('PDF może mieć maksymalnie 50 MB.');
  if (!data.subarray(0, 8).toString('ascii').match(/^%PDF-\d\.\d/) || !data.subarray(-2048).includes(Buffer.from('%%EOF'))) throw new ContractError('Plik nie jest poprawnym dokumentem PDF.');
}
export function smsMessage(code: string): string {
  if (!/^\d{6}$/.test(code)) throw new ContractError('Nieprawidłowy kod SMS.');
  return `Twoj kod dostepu do umow TAKMA: ${code}. Wazny 5 minut. Nie udostepniaj kodu.`;
}
