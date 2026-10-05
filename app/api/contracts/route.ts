import { NextRequest } from 'next/server';
import { contractAdmin, contractSession, contractFailure, privateJSON } from '@/lib/contracts-server';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    const session = await contractSession(request.nextUrl.searchParams.get('serial'));
    const { data, error } = await contractAdmin().from('private_contracts').select('id,name,number,signed_on,bytes').eq('client_id', session.clientId).eq('status', 'published').order('signed_on', { ascending: false });
    if (error) throw error;
    return privateJSON({ contracts: data, expiresAt: session.expiresAt });
  } catch (error) { return contractFailure(error); }
}
