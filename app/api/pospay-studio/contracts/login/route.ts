import { NextRequest } from 'next/server';
import { contractAdmin, contractAuth, contractFailure, privateJSON, smallJSON } from '@/lib/contracts-server';
import { ContractError, contractText } from '@/lib/contracts-validation';
export async function POST(request: NextRequest) {
  try {
    contractAdmin();
    const body = await smallJSON(request), auth = contractAuth();
    if (typeof body.password !== 'string' || !body.password.length || body.password.length > 200) throw new ContractError('Wpisz hasło.');
    const { data, error } = await auth.auth.signInWithPassword({ email: contractText(body.email, 254), password: body.password });
    if (error || !data.user || !data.session) throw new ContractError('Nieprawidłowe dane logowania operatora.', 401);
    const { data: operator } = await contractAdmin().from('contract_operators').select('user_id').eq('user_id', data.user.id).eq('active', true).maybeSingle();
    if (!operator) throw new ContractError('Brak uprawnień operatora umów.', 403);
    let factorId = data.user.factors?.find(f => f.factor_type === 'totp' && f.status === 'verified')?.id;
    let qrUri: string | undefined, setupSecret: string | undefined;
    if (!factorId) {
      for (const f of data.user.factors || []) if (f.factor_type === 'totp' && f.status === 'unverified') await auth.auth.mfa.unenroll({ factorId: f.id });
      const { data: enrollment, error: enrollError } = await auth.auth.mfa.enroll({ factorType: 'totp', friendlyName: 'Pospay Studio', issuer: 'TAKMA' });
      if (enrollError || !enrollment) throw new ContractError('Nie udało się przygotować zabezpieczenia konta.', 503);
      factorId = enrollment.id; qrUri = enrollment.totp.uri; setupSecret = enrollment.totp.secret;
    }
    return privateJSON({ phase: 'verify', sessionToken: data.session.access_token, factorId, qrUri, setupSecret });
  } catch (error) { return contractFailure(error); }
}
