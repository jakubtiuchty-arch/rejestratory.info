import { NextRequest } from 'next/server';
import { randomUUID } from 'node:crypto';
import { contractAdmin, contractOperator, operatorClient, contractFailure, privateJSON, smallJSON } from '@/lib/contracts-server';
import { ContractError, contractUUID, contractText, contractDate, MAX_CONTRACT_BYTES } from '@/lib/contracts-validation';
export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  try {
    const operator = await contractOperator(request), db = contractAdmin(), body = await smallJSON(request);
    const clientId = contractUUID(body.clientId), id = contractUUID(body.uploadId);
    await operatorClient(operator, clientId);
    const name = contractText(body.name, 200), number = contractText(body.number, 100), signedOn = contractDate(body.signedOn);
    const sha256 = contractText(body.sha256, 64), bytes = body.bytes;
    if (!/^[0-9a-f]{64}$/.test(sha256) || typeof bytes !== 'number' || !Number.isSafeInteger(bytes) || bytes <= 0 || bytes > MAX_CONTRACT_BYTES) throw new ContractError('Nieprawidłowy plik PDF lub przekroczony limit 50 MB.');
    const { data: client, error: clientError } = await db.from('contract_clients').select('id').eq('id', clientId).eq('active', true).maybeSingle();
    if (clientError || !client) throw new ContractError('Klient wymaga zatwierdzenia.', 403);
    const { data: existing, error: lookupError } = await db.from('private_contracts').select('*').eq('id', id).maybeSingle();
    if (lookupError) throw lookupError;
    if (existing) {
      if (existing.client_id !== clientId || existing.sha256 !== sha256 || existing.bytes !== bytes || existing.name !== name || existing.number !== number || existing.signed_on !== signedOn) throw new ContractError('Identyfikator wysyłki dotyczy innej umowy.', 409);
      if (existing.status === 'published') return privateJSON({ id, published: true, uploadURL: null });
      if (existing.status !== 'quarantine' || existing.created_by !== operator.user_id) throw new ContractError('Nie można wznowić tej wysyłki.', 409);
    }
    const objectKey = existing?.object_key || randomUUID() + '.pdf';
    if (!existing) {
      const { error } = await db.from('private_contracts').insert({ id, client_id: clientId, name, number, signed_on: signedOn, sha256, bytes, object_key: objectKey, created_by: operator.user_id, status: 'quarantine' });
      if (error) throw new ContractError('Nie udało się rozpocząć wysyłki. Ponów sprawdzenie zapisu.', 409);
    }
    const bucket = db.storage.from('contracts-private');
    const { data: info, error: infoError } = await bucket.info(objectKey);
    // Storage returns HTTP 400 with provider statusCode 404 for a missing object.
    if (infoError && (!('statusCode' in infoError) || String(infoError.statusCode) !== '404')) throw new ContractError('Nie udało się sprawdzić zapisu PDF.', 503);
    if (info) return privateJSON({ id, published: false, uploadURL: null });
    // Grants upload only to one private random path. Does not grant read or publication.
    const { data: signed, error: signError } = await bucket.createSignedUploadUrl(objectKey, { upsert: false });
    if (signError || !signed) throw new ContractError('Nie udało się przygotować wysyłki PDF.', 503);
    return privateJSON({ id, published: false, uploadURL: signed.signedUrl });
  } catch (error) { return contractFailure(error); }
}
