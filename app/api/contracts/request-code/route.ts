import { NextRequest } from 'next/server';
import { hashSecret, ContractError, contractSerial } from '@/lib/contracts-validation';
import { accessRPC, requireContractOrigin, smallJSON, secret, contractAuth, privateJSON, contractCookie, CHALLENGE_COOKIE, CONTRACT_COOKIE, contractFailure } from '@/lib/contracts-server';
export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  let challenge: Record<string, string> | undefined, secretHash: string | undefined;
  try {
    requireContractOrigin(request);
    if (!process.env.SMSAPI_TOKEN || !process.env.SUPABASE_SMS_HOOK_SECRET) throw new ContractError('Wysyłka SMS nie została jeszcze uruchomiona.', 503);
    const data = await smallJSON(request), value = secret(); secretHash = hashSecret(value);
    // Use the platform's trusted IP. Local deployment needs a trusted reverse proxy.
    const ip = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const salt = process.env.CONTRACT_IP_HASH_KEY;
    if (!salt || salt.length < 32) throw new ContractError('Brak konfiguracji ochrony wysyłki SMS.', 503);
    challenge = await accessRPC('request', { serial: contractSerial(data.serial), secretHash, ipHash: hashSecret(salt + ip) });
    const { error } = await contractAuth().auth.signInWithOtp({ phone: challenge.phone, options: { shouldCreateUser: false } });
    if (error) throw new ContractError('Nie udało się wysłać kodu SMS. Spróbuj później.', 503);
    await accessRPC('sent', { id: challenge.id, secretHash });
    const response = privateJSON({ challengeId: challenge.id, resendAfter: 60, expiresIn: 300, message: 'Kod wysłano na zatwierdzony numer telefonu.' });
    contractCookie(response, CHALLENGE_COOKIE, value, 300);
    contractCookie(response, CONTRACT_COOKIE, '', 0);
    return response;
  } catch (error) {
    if (challenge && secretHash) await accessRPC('cancel', { id: challenge.id, secretHash }).catch(() => undefined);
    return contractFailure(error);
  }
}
