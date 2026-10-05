import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pospayRPC, pospayErrorResponse } from '../lib/pospay-portal';

test('integracja zachowuje UUID ponowienia i wymaga istniejącej autoryzacji bazy', async () => {
  const before = { ...process.env }, originalFetch = global.fetch;
  try {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://database.example';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-public-key';
    process.env.POSPAY_STUDIO_API_TOKEN = 'test-private-token-' + 'x'.repeat(40);
    const payload = { eventId: 'existing-event', batchId: 'existing-batch' };
    global.fetch = async (url, options) => {
      assert.equal(String(url), 'https://database.example/rest/v1/rpc/pospay_studio_sync');
      assert.deepEqual(JSON.parse(String(options?.body)), { p_token: process.env.POSPAY_STUDIO_API_TOKEN, p_action: 'register', p_payload: payload });
      assert.equal(options?.cache, 'no-store');
      return Response.json({ registrationId: payload.eventId, batchId: payload.batchId, alreadyRegistered: true });
    };
    assert.equal((await pospayRPC('register', payload)).alreadyRegistered, true);
    global.fetch = async () => Response.json({ message: 'POSPAY_UNAUTHORIZED' }, { status: 400 });
    await assert.rejects(() => pospayRPC('register', payload), error => pospayErrorResponse(error).status === 401);
  } finally { global.fetch = originalFetch; process.env = before; }
});

test('błąd bazy nie ujawnia sekretów i pozwala ponowić zgłoszenie przy awarii', async () => {
  const before = { ...process.env }, originalFetch = global.fetch;
  try {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://database.example';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-public-key';
    process.env.POSPAY_STUDIO_API_TOKEN = 'test-private-token-' + 'x'.repeat(40);
    global.fetch = async () => Response.json({ message: 'database exception ' + process.env.POSPAY_STUDIO_API_TOKEN }, { status: 500 });
    await assert.rejects(() => pospayRPC('register', {}), error => {
      const response = pospayErrorResponse(error);
      assert.equal(response.status, 503);
      assert.ok(!response.message.includes(process.env.POSPAY_STUDIO_API_TOKEN!));
      return true;
    });
    global.fetch = async () => Response.json({ message: 'POSPAY_CONFLICT: private client data' }, { status: 400 });
    await assert.rejects(() => pospayRPC('register', {}), error => pospayErrorResponse(error).status === 409);
    delete process.env.POSPAY_STUDIO_API_TOKEN;
    await assert.rejects(() => pospayRPC('register', {}), error => pospayErrorResponse(error).status === 503);
  } finally { global.fetch = originalFetch; process.env = before; }
});
