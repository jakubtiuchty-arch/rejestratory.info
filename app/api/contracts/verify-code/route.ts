import { NextRequest } from 'next/server';
import { ContractError, contractUUID, hashSecret } from '@/lib/contracts-validation';
import { accessRPC, requireContractOrigin, smallJSON, secret, currentChallengeHash, contractAuth, contractAdmin, privateJSON, contractCookie, CHALLENGE_COOKIE, CONTRACT_COOKIE, contractFailure } from '@/lib/contracts-server';
export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  let id: string | undefined, secretHash: string | undefined, reserved = false;
  try {
    requireContractOrigin(request);
    const data = await smallJSON(request);
    id = contractUUID(data.challengeId); secretHash = await currentChallengeHash();
    if (typeof data.code !== 'string' || !/^\d{6}$/.test(data.code)) throw new ContractError('Wpisz 6 cyfr kodu SMS.');
    const challenge = await accessRPC('verify', { id, secretHash }); reserved = true;
    const { data: verified, error } = await contractAuth().auth.verifyOtp({ phone: challenge.phone, token: data.code, type: 'sms' });
    if (error || !verified.user || verified.user.id !== challenge.userId) throw new ContractError('Kod jest błędny lub wygasł. Poproś o nowy kod, jeśli wykorzystano 5 prób.', 401);
    const value = secret();
    const session = await accessRPC('finish', { id, secretHash, tokenHash: hashSecret(value), userId: verified.user.id });
    // Supabase's access/refresh tokens stay on the server; only an opaque 15 min contract cookie goes to the browser.
    if (verified.session) await contractAdmin().auth.admin.signOut(verified.session.access_token, 'local').catch(() => undefined);
    const response = privateJSON({ expiresAt: session.expiresAt });
    contractCookie(response, CONTRACT_COOKIE, value, 900);
    contractCookie(response, CHALLENGE_COOKIE, '', 0);
    return response;
  } catch (error) {
    if (reserved && id && secretHash) await accessRPC('failed', { id, secretHash }).catch(() => undefined);
    return contractFailure(error);
  }
}
