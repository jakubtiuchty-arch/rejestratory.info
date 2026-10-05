import { ContractError } from './contracts-validation';
export const CONTRACT_DOWNLOAD_CHUNK = 3 * 1024 * 1024;
export function contractByteRange(value: string | null, total: number) {
  if (!value) {
    if (total > CONTRACT_DOWNLOAD_CHUNK) throw new ContractError('Odśwież panel, aby pobrać duży PDF w częściach.', 413);
    return { start: 0, end: total - 1, partial: false };
  }
  const match = /^bytes=(\d+)-(\d+)$/.exec(value);
  if (!match) throw new ContractError('Nieprawidłowy zakres pobierania.', 416);
  const start = Number(match[1]), end = Math.min(Number(match[2]), total - 1);
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(Number(match[2])) || start < 0 || start >= total || end < start || end - start + 1 > CONTRACT_DOWNLOAD_CHUNK) throw new ContractError('Nieprawidłowy zakres pobierania.', 416);
  return { start, end, partial: true };
}
