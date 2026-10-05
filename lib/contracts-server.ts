import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { ContractError, contractSerial, hashSecret } from './contracts-validation';

export const CONTRACT_COOKIE = 'takma_contract_access';
export const CHALLENGE_COOKIE = 'takma_contract_challenge';
const cookieOptions = { httpOnly: true, secure: true, sameSite: 'strict' as const, path: '/api/contracts' };
export function contractAdmin() {
  if (process.env.CONTRACTS_ENABLED !== 'true') throw new ContractError('Moduł umów jest przygotowany i czeka na uruchomienie przez TAKMA.', 503);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new ContractError('Dostęp do umów nie został jeszcze uruchomiony.', 503);
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
}
export function contractAuth() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new ContractError('Brak konfiguracji logowania.', 503);
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
}
export async function accessRPC(action: string, data: Record<string, unknown>) {
  const { data: result, error } = await contractAdmin().rpc('contract_access_rpc', { p_action: action, p_data: data });
  if (error || !result) throw new ContractError('Dostęp do umów jest chwilowo niedostępny.', 503);
  if (result.error === 'rate_limit') throw new ContractError('Odczekaj przed kolejną próbą wysłania kodu.', 429);
  if (result.error === 'unavailable') throw new ContractError('Dostęp do umów wymaga zatwierdzenia numeru telefonu przez TAKMA.', 403);
  if (result.error) throw new ContractError('Odblokuj umowy ponownie kodem SMS.', 401);
  return result as Record<string, string>;
}
export function requireContractOrigin(request: NextRequest) {
  const allowed = process.env.CONTRACT_PORTAL_ORIGIN;
  if (!allowed || request.headers.get('origin') !== allowed) throw new ContractError('Niedozwolone żądanie.', 403);
  const site = request.headers.get('sec-fetch-site');
  if (site && site !== 'same-origin') throw new ContractError('Niedozwolone żądanie.', 403);
}
export async function smallJSON(request: NextRequest) {
  const text = await request.text();
  if (Buffer.byteLength(text) > 8192) throw new ContractError('Żądanie jest zbyt duże.', 413);
  try {
    const data = JSON.parse(text);
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error();
    return data as Record<string, unknown>;
  } catch { throw new ContractError('Nieprawidłowe dane.'); }
}
export function secret(): string { return randomBytes(32).toString('base64url'); }
export function contractCookie(response: NextResponse, name: string, value: string, maxAge: number) {
  response.cookies.set(name, value, { ...cookieOptions, maxAge });
}
export function privateJSON(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { 'Cache-Control': 'private, no-store', 'Vary': 'Cookie', 'X-Content-Type-Options': 'nosniff' } });
}
export function contractFailure(error: unknown) {
  // No raw provider errors, phone numbers, tokens or codes in responses or logs.
  return privateJSON({ message: error instanceof ContractError ? error.message : 'Nie udało się obsłużyć umów.' }, error instanceof ContractError ? error.status : 500);
}
export async function currentChallengeHash(): Promise<string> {
  const value = (await cookies()).get(CHALLENGE_COOKIE)?.value;
  if (!value || !/^[\w-]{43}$/.test(value)) throw new ContractError('Poproś o nowy kod SMS.', 401);
  return hashSecret(value);
}
export async function contractSession(serial: unknown) {
  const value = (await cookies()).get(CONTRACT_COOKIE)?.value;
  if (!value || !/^[\w-]{43}$/.test(value)) throw new ContractError('Odblokuj umowy kodem SMS.', 401);
  return accessRPC('session', { serial: contractSerial(serial), tokenHash: hashSecret(value) });
}
export async function contractOperator(request: NextRequest) {
  const token = request.headers.get('authorization')?.match(/^Bearer ([\w.-]+)$/)?.[1];
  if (!token) throw new ContractError('Zaloguj się jako operator umów.', 401);
  const client = contractAuth();
  const { data: identity, error } = await client.auth.getUser(token);
  if (error || !identity.user) throw new ContractError('Sesja operatora wygasła.', 401);
  const { data: claims, error: claimError } = await client.auth.getClaims(token);
  if (claimError || claims?.claims.aal !== 'aal2' || claims.claims.sub !== identity.user.id) throw new ContractError('Potwierdź logowanie kodem z aplikacji uwierzytelniającej.', 403);
  const db = contractAdmin();
  const { data: operator, error: operatorError } = await db.from('contract_operators').select('user_id,can_manage_clients').eq('user_id', identity.user.id).eq('active', true).maybeSingle();
  if (operatorError || !operator) throw new ContractError('Brak uprawnień operatora umów.', 403);
  return operator;
}
export async function operatorClient(operator: { user_id: string; can_manage_clients: boolean }, clientId: string) {
  if (operator.can_manage_clients) return;
  const { data, error } = await contractAdmin().from('contract_operator_clients').select('client_id').eq('operator_id', operator.user_id).eq('client_id', clientId).maybeSingle();
  if (error || !data) throw new ContractError('Brak uprawnień do umów tego klienta.', 403);
}
