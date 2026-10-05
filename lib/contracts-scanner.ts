import { createHash } from 'node:crypto';
import { Worker } from 'node:worker_threads';
import { join } from 'node:path';
import { checkContractPDF } from './contracts-validation';
import { ContractError } from './contracts-validation';
export async function scanContractPDF(bytes: Buffer, transport = fetch) {
  checkContractPDF(bytes);
  if (process.env.CONTRACT_SCAN_MODE === 'structural') {
    await checkPDFStructure(bytes);
    return createHash('sha256').update(bytes).digest('hex');
  }
  const url = process.env.CONTRACT_SCAN_URL, token = process.env.CONTRACT_SCAN_TOKEN;
  if (!url || !token || !url.startsWith('https://')) throw new ContractError('Skanowanie umów nie jest skonfigurowane. Dokument nie został opublikowany.', 503);
  const response = await transport(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/pdf' }, body: new Uint8Array(bytes),
    signal: AbortSignal.timeout(20000), cache: 'no-store', redirect: 'error' });
  const result = await response.json(), sha256 = createHash('sha256').update(bytes).digest('hex');
  if (!response.ok || result.clean !== true || result.sha256 !== sha256) throw new ContractError('Dokument nie przeszedł kontroli bezpieczeństwa. Nie został opublikowany.', 422);
  return sha256;
}

// Structural validation blocks active PDF features. This is not an antivirus scan.
function checkPDFStructure(bytes: Buffer): Promise<void> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(join(process.cwd(), 'tools/contracts-scanner/pdf-worker.cjs'), {
      workerData: new Uint8Array(bytes), resourceLimits: { maxOldGenerationSizeMb: 192, maxYoungGenerationSizeMb: 16, stackSizeMb: 4 },
    });
    let settled = false;
    const finish = (error?: ContractError) => {
      if (settled) return; settled = true; clearTimeout(timer); void worker.terminate();
      error ? reject(error) : resolve();
    };
    const unavailable = () => finish(new ContractError('Kontrola PDF nie powiodła się. Dokument nie został opublikowany.', 503));
    const timer = setTimeout(unavailable, 8000);
    worker.once('error', unavailable);
    worker.once('exit', () => { if (!settled) unavailable(); });
    worker.once('message', result => result?.valid === true ? finish() : finish(new ContractError('PDF jest niepoprawny, zaszyfrowany lub zawiera niedozwolone aktywne treści albo załączniki.', 422)));
  });
}
