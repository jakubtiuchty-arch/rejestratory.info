import { PospayValidationError } from './pospay-registration';

class PospayPortalError extends Error {
  constructor(message: string, readonly status: number) { super(message); }
}

function databaseFailure(message: string): PospayPortalError {
  if (message.includes('POSPAY_UNAUTHORIZED')) return new PospayPortalError('Brak dostępu do integracji.', 401);
  if (message.includes('POSPAY_EMAIL_UNCONFIRMED')) return new PospayPortalError('Sprawdź wcześniejszą wysyłkę maila przed kolejną próbą.', 409);
  if (message.includes('POSPAY_CONFLICT')) return new PospayPortalError('Zgłoszenie ma inne dane niż zapis w panelu lub partia jest już zamknięta.', 409);
  if (message.includes('POSPAY_NOT_FOUND')) return new PospayPortalError('Nie znaleziono partii urządzeń w panelu.', 404);
  if (message.includes('POSPAY_INVALID')) return new PospayPortalError('Nieprawidłowe dane zgłoszenia.', 400);
  return new PospayPortalError('Zapis w panelu jest chwilowo niedostępny. Zgłoszenie pozostaje zachowane w aplikacji.', 503);
}

export async function pospayRPC(action: 'register' | 'claim_email' | 'finish_email', payload: unknown): Promise<Record<string, any>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const token = process.env.POSPAY_STUDIO_API_TOKEN;
  if (!url || !key || !token || token.length < 32) throw new PospayPortalError('Integracja z panelem wymaga konfiguracji serwera.', 503);
  let response: Response;
  try {
    response = await fetch(new URL('/rest/v1/rpc/pospay_studio_sync', url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}` },
      body: JSON.stringify({ p_token: token, p_action: action, p_payload: payload }),
      cache: 'no-store', signal: AbortSignal.timeout(20000),
    });
  } catch { throw databaseFailure(''); }
  let result: any;
  try { result = await response.json(); } catch { throw databaseFailure(''); }
  if (!response.ok) throw databaseFailure(typeof result?.message === 'string' ? result.message : '');
  if (!result || typeof result !== 'object' || Array.isArray(result)) throw databaseFailure('');
  return result;
}

export function pospayErrorResponse(error: unknown): { message: string; status: number } {
  if (error instanceof PospayValidationError) return { message: error.message, status: 400 };
  if (error instanceof PospayPortalError) return { message: error.message, status: error.status };
  return { message: 'Zapis w panelu jest chwilowo niedostępny. Zgłoszenie pozostaje zachowane w aplikacji.', status: 503 };
}
