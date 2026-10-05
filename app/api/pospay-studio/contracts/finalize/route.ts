import { NextRequest } from 'next/server';
import { createHash } from 'node:crypto';
import { contractAdmin, contractOperator, operatorClient, contractFailure, privateJSON, smallJSON } from '@/lib/contracts-server';
import { ContractError, contractUUID, MAX_CONTRACT_BYTES } from '@/lib/contracts-validation';
import { scanContractPDF } from '@/lib/contracts-scanner';
export const runtime = 'nodejs';
export const maxDuration = 60;
export async function POST(request: NextRequest) {
  try {
    const operator = await contractOperator(request), db = contractAdmin(), body = await smallJSON(request), id = contractUUID(body.uploadId);
    const { data: doc, error } = await db.from('private_contracts').select('*').eq('id', id).maybeSingle();
    if (error || !doc) throw new ContractError('Nie znaleziono wysyłki umowy.', 404);
    await operatorClient(operator, doc.client_id);
    if (doc.status === 'published') return privateJSON({ success: true, id });
    if (doc.status !== 'quarantine' || doc.created_by !== operator.user_id) throw new ContractError('Brak uprawnień do zakończenia tej wysyłki.', 403);
    const { data: client, error: clientError } = await db.from('contract_clients').select('access_version').eq('id', doc.client_id).eq('active', true).maybeSingle();
    if (clientError || !client) throw new ContractError('Klient wymaga ponownego zatwierdzenia.', 403);
    const { data: info, error: infoError } = await db.storage.from('contracts-private').info(doc.object_key);
    if (infoError || !info || typeof info.size !== 'number' || info.size !== doc.bytes || info.size > MAX_CONTRACT_BYTES) throw new ContractError('Nie ukończono zapisu PDF lub jego rozmiar jest niezgodny.', 409);
    const { data: file, error: downloadError } = await db.storage.from('contracts-private').download(doc.object_key);
    if (downloadError || !file) throw new ContractError('Nie ukończono zapisu PDF.', 503);
    const bytes = Buffer.from(await file.arrayBuffer());
    if (bytes.length !== doc.bytes || createHash('sha256').update(bytes).digest('hex') !== doc.sha256) throw new ContractError('Zapisany PDF jest niezgodny z oryginałem. Nie opublikowano umowy.', 409);
    await scanContractPDF(bytes);
    const { error: publishError } = await db.rpc('contract_publish', { p_id: id, p_operator: operator.user_id, p_client_version: client.access_version });
    if (publishError) {
      const { data: concurrent } = await db.from('private_contracts').select('status').eq('id', id).maybeSingle();
      if (concurrent?.status !== 'published') throw new ContractError('PDF nie został opublikowany. Sprawdź uprawnienia i ponów sprawdzenie zapisu.', 503);
    }
    return privateJSON({ success: true, id });
  } catch (error) { return contractFailure(error); }
}
