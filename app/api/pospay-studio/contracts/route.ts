import { NextRequest } from 'next/server';
import { randomUUID, createHash } from 'node:crypto';
import { contractAdmin, contractOperator, operatorClient, contractFailure, privateJSON } from '@/lib/contracts-server';
import { ContractError, contractUUID, contractText, contractDate, checkContractPDF, MAX_CONTRACT_BYTES } from '@/lib/contracts-validation';
import { scanContractPDF } from '@/lib/contracts-scanner';
export const runtime = 'nodejs';
export const maxDuration = 60;
export async function POST(request: NextRequest) {
  try {
    const operator = await contractOperator(request), db = contractAdmin();
    const length = Number(request.headers.get('content-length'));
    if (!Number.isFinite(length) || length <= 0 || length > MAX_CONTRACT_BYTES + 16384) throw new ContractError('PDF może mieć maksymalnie 3 MB.', 413);
    const form = await request.formData(), clientId = contractUUID(form.get('clientId')), id = contractUUID(form.get('uploadId'));
    await operatorClient(operator, clientId);
    const name = contractText(form.get('name'), 200), number = contractText(form.get('number'), 100), signedOn = contractDate(form.get('signedOn'));
    const file = form.get('file');
    if (!(file instanceof Blob) || file.size > MAX_CONTRACT_BYTES) throw new ContractError('Wybierz umowę PDF do 3 MB.');
    const bytes = Buffer.from(await file.arrayBuffer()); checkContractPDF(bytes);
    const sha256 = createHash('sha256').update(bytes).digest('hex');
    const { data: existing, error: lookupError } = await db.from('private_contracts').select('id,client_id,sha256,status,name,number,signed_on,object_key,created_by').eq('id', id).maybeSingle();
    if (lookupError) throw lookupError;
    if (existing) {
      if (existing.client_id !== clientId || existing.sha256 !== sha256 || existing.name !== name || existing.number !== number || existing.signed_on !== signedOn) throw new ContractError('Identyfikator wysyłki dotyczy innej umowy.', 409);
      if (existing.status === 'published') return privateJSON({ success: true, id });
      if (existing.status !== 'quarantine' || existing.created_by !== operator.user_id) throw new ContractError('Nie można wznowić tej wysyłki.', 409);
    }
    // Preserve signed bytes. No upload/publication when scanner is missing or fails.
    await scanContractPDF(bytes);
    const { data: client, error: clientError } = await db.from('contract_clients').select('id,access_version').eq('id', clientId).eq('active', true).maybeSingle();
    if (clientError || !client) throw new ContractError('Klient lub jego telefon wymaga zatwierdzenia.', 403);
    const objectKey = existing?.object_key || randomUUID() + '.pdf';
    if (!existing) {
      const { error: insertError } = await db.from('private_contracts').insert({ id, client_id: clientId, name, number, signed_on: signedOn,
        object_key: objectKey, sha256, bytes: bytes.length, created_by: operator.user_id, status: 'quarantine' });
      if (insertError) throw new ContractError('Nie udało się rozpocząć zapisu. Sprawdź stan wcześniejszej wysyłki.', 409);
    }
    let stored = false;
    if (existing) {
      const { data: previous } = await db.storage.from('contracts-private').download(objectKey);
      if (previous) {
        const original = Buffer.from(await previous.arrayBuffer());
        if (createHash('sha256').update(original).digest('hex') !== sha256) throw new ContractError('Zapisany plik wymaga sprawdzenia przez TAKMA.', 409);
        stored = true;
      }
    }
    if (!stored) {
      const { error: storageError } = await db.storage.from('contracts-private').upload(objectKey, bytes, { contentType: 'application/pdf', upsert: false });
      if (storageError) throw new ContractError('Nie ukończono zapisu PDF. Umowa pozostaje ukryta; ponów sprawdzenie zapisu.', 503);
    }
    const { error: publishError } = await db.rpc('contract_publish', { p_id: id, p_operator: operator.user_id, p_client_version: client.access_version });
    if (publishError) throw new ContractError('PDF zapisano, ale publikacja wymaga sprawdzenia uprawnień.', 503);
    return privateJSON({ success: true, id });
  } catch (error) { return contractFailure(error); }
}
