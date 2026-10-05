import { NextRequest, NextResponse } from 'next/server';
import { contractAdmin, contractSession, contractFailure } from '@/lib/contracts-server';
import { contractByteRange } from '@/lib/contracts-ranges';
import { ContractError, contractUUID } from '@/lib/contracts-validation';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await contractSession(request.nextUrl.searchParams.get('serial')), db = contractAdmin();
    const { data: contract, error } = await db.from('private_contracts').select('id,object_key,sha256,bytes').eq('id', contractUUID(id)).eq('client_id', session.clientId).eq('status', 'published').maybeSingle();
    if (error || !contract) throw new ContractError('Nie znaleziono umowy.', 404);
    const range = contractByteRange(request.headers.get('range'), contract.bytes);
    const { data: file, error: downloadError } = await db.storage.from('contracts-private').download(contract.object_key);
    if (downloadError || !file) throw new ContractError('Nie udało się pobrać umowy.', 503);
    const bytes = Buffer.from(await file.arrayBuffer());
    const { createHash } = await import('node:crypto');
    if (bytes.length !== contract.bytes || createHash('sha256').update(bytes).digest('hex') !== contract.sha256) throw new ContractError('Plik wymaga sprawdzenia przez TAKMA.', 503);
    const audit = await db.from('contract_audit_events').insert({ client_id: session.clientId, contract_id: contract.id, actor_id: session.userId, action: 'download' });
    if (audit.error) throw new ContractError('Nie udało się zarejestrować pobrania.', 503);
    // Recheck after storage I/O so a revoked phone/session cannot download a file already being loaded.
    await contractSession(request.nextUrl.searchParams.get('serial'));
    return new NextResponse(bytes.subarray(range.start, range.end + 1), { status: range.partial ? 206 : 200, headers: {
      'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="umowa-${contract.id}.pdf"`,
      'Content-Length': String(range.end - range.start + 1), 'Accept-Ranges': 'bytes',
      ...(range.partial ? { 'Content-Range': `bytes ${range.start}-${range.end}/${bytes.length}` } : {}), 'Cache-Control': 'private, no-store', 'Vary': 'Cookie',
      'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'none'; sandbox", 'Referrer-Policy': 'no-referrer',
    } });
  } catch (error) { return contractFailure(error); }
}
