import { ContractError, contractPhone, smsMessage } from './contracts-validation';

export async function sendContractSMS(phone: string, code: string, id: string, transport = fetch) {
  const token = process.env.SMSAPI_TOKEN;
  const sender = process.env.SMSAPI_SENDER || 'TAKMA';
  if (!token || sender !== 'TAKMA') throw new ContractError('Wysyłka kodów SMS nie została jeszcze uruchomiona.', 503);
  const body = new URLSearchParams({ to: contractPhone(phone).slice(1), from: sender, message: smsMessage(code), format: 'json', encoding: 'utf-8', idx: id, check_idx: '1' });
  const response = await transport('https://api.smsapi.pl/sms.do', {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body, redirect: 'error', signal: AbortSignal.timeout(12000), cache: 'no-store',
  });
  const result = await response.json();
  if (!response.ok || result.error || result.count !== 1 || !result.list?.[0]?.id || result.list[0].error) throw new ContractError('Nie udało się wysłać kodu SMS. Spróbuj później.', 503);
}
