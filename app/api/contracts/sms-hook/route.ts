import { NextRequest } from 'next/server';
import { Webhook } from 'standardwebhooks';
import { contractPhone, contractUUID, ContractError } from '@/lib/contracts-validation';
import { accessRPC, privateJSON, contractFailure } from '@/lib/contracts-server';
import { sendContractSMS } from '@/lib/contracts-sms';
export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  try {
    const signingSecret = process.env.SUPABASE_SMS_HOOK_SECRET;
    if (!signingSecret) throw new ContractError('Brak konfiguracji SMS.', 503);
    const raw = await request.text();
    if (Buffer.byteLength(raw) > 16384) throw new ContractError('Niedozwolone żądanie.', 413);
    let payload: { user: { id: string; phone: string }; sms: { otp: string } };
    try {
      payload = new Webhook(signingSecret.replace(/^v1,whsec_/, '').replace(/^whsec_/, '')).verify(raw, {
        'webhook-id': request.headers.get('webhook-id') || '',
        'webhook-timestamp': request.headers.get('webhook-timestamp') || '',
        'webhook-signature': request.headers.get('webhook-signature') || '',
      }) as typeof payload;
    } catch { throw new ContractError('Niedozwolone żądanie.', 401); }
    const phone = contractPhone(payload.user?.phone), userId = contractUUID(payload.user?.id);
    // The public Auth API cannot bypass our send limits: every hook needs a single-use pending challenge.
    const challenge = await accessRPC('hook', { phone, userId });
    await sendContractSMS(phone, payload.sms?.otp, challenge.id);
    return privateJSON({});
  } catch (error) { return contractFailure(error); }
}
