import { NextRequest } from 'next/server';
import { contractAuth, contractOperator, contractFailure, privateJSON, smallJSON } from '@/lib/contracts-server';
import { ContractError, contractUUID, contractText } from '@/lib/contracts-validation';
export async function POST(request: NextRequest) {
  try {
    const body = await smallJSON(request), token = contractText(body.sessionToken, 8000), factorId = contractUUID(body.factorId), code = contractText(body.code, 6);
    if (!/^\d{6}$/.test(code)) throw new ContractError('Podaj kod z aplikacji uwierzytelniającej.');
    const { data, error } = await contractAuth().auth.getUser(token);
    if (error || !data.user?.factors?.some(f => f.id === factorId && f.factor_type === 'totp')) throw new ContractError('Sesja logowania wygasła.', 401);
    const headers = { Authorization: `Bearer ${token}`, apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, 'Content-Type': 'application/json' };
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL! + '/auth/v1/factors/' + factorId;
    const options = { method: 'POST', headers, cache: 'no-store' as const, redirect: 'error' as const, signal: AbortSignal.timeout(10000) };
    const challengeResponse = await fetch(base + '/challenge', { ...options, body: '{}' }), challenge = await challengeResponse.json();
    if (!challengeResponse.ok || !challenge.id) throw new ContractError('Nie udało się potwierdzić logowania.', 401);
    const response = await fetch(base + '/verify', { ...options, body: JSON.stringify({ challenge_id: challenge.id, code }) }), session = await response.json();
    if (!response.ok || !session.access_token) throw new ContractError('Kod uwierzytelniający jest błędny lub wygasł.', 401);
    await contractOperator(new NextRequest(request.url, { headers: { authorization: `Bearer ${session.access_token}` } }));
    return privateJSON({ token: session.access_token, expiresAt: session.expires_at });
  } catch (error) { return contractFailure(error); }
}
