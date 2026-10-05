import test from 'node:test';
import { contractByteRange, CONTRACT_DOWNLOAD_CHUNK } from '../lib/contracts-ranges';
import { PDFDocument, PDFName, PDFString } from 'pdf-lib';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';
import { Webhook } from 'standardwebhooks';
import { contractPhone, contractSerial, contractDate, contractNIP, checkContractPDF, smsMessage, MAX_CONTRACT_BYTES } from '../lib/contracts-validation';
import { sendContractSMS } from '../lib/contracts-sms';
import { scanContractPDF } from '../lib/contracts-scanner';

test('Walidacja danych i jedno krótkie SMS bez treści umowy', () => {
  assert.equal(contractPhone('500 000 000'), '+48500000000');
  assert.equal(contractSerial(' ebf2402281501 '), 'EBF2402281501');
  assert.equal(contractDate('2024-02-29'), '2024-02-29');
  assert.throws(() => contractDate('2026-02-29'));
  assert.throws(() => contractNIP('0000000000'));
  assert.throws(() => contractSerial('../'));
  assert.ok(smsMessage('482913').length < 160);
  assert.throws(() => smsMessage('12345'));
  const pdf = Buffer.from('%PDF-1.4\nexample\n%%EOF');
  checkContractPDF(pdf);
  assert.throws(() => checkContractPDF(Buffer.from('<html>not a pdf</html>')));
  assert.throws(() => checkContractPDF(Buffer.alloc(MAX_CONTRACT_BYTES + 1)));
});

test('SMSAPI: nadawca TAKMA, błąd nie jest uznawany za wysyłkę, brak przekierowań', async () => {
  process.env.SMSAPI_TOKEN = 'fake-token-for-test'; process.env.SMSAPI_SENDER = 'TAKMA';
  const transport: typeof fetch = async (url, options) => {
    assert.equal(url, 'https://api.smsapi.pl/sms.do'); assert.equal(options?.redirect, 'error');
    const fields = options?.body as URLSearchParams;
    assert.equal(fields.get('from'), 'TAKMA'); assert.equal(fields.get('to'), '48500000000');
    assert.ok(fields.get('message')?.includes('482913')); assert.equal(fields.get('check_idx'), '1');
    return new Response(JSON.stringify({ count: 1, list: [{ id: 'test-id' }] }));
  };
  await sendContractSMS('+48500000000', '482913', randomUUID(), transport);
  await assert.rejects(sendContractSMS('+48500000000', '482913', randomUUID(), async () => new Response(JSON.stringify({ error: 14 }))));
  delete process.env.SMSAPI_TOKEN;
  await assert.rejects(sendContractSMS('+48500000000', '482913', randomUUID(), transport));
});

test('Skaner: publikacja tylko po wyniku clean i zgodnym skrócie oryginału', async () => {
  const bytes = Buffer.from('%PDF-1.4\nexample\n%%EOF');
  process.env.CONTRACT_SCAN_URL = 'https://private-scanner.invalid/scan'; process.env.CONTRACT_SCAN_TOKEN = 'fake-scanner-token';
  const hash = createHash('sha256').update(bytes).digest('hex');
  assert.equal(await scanContractPDF(bytes, async (_url, options) => {
    assert.equal(options?.redirect, 'error'); assert.deepEqual(Buffer.from(options?.body as Uint8Array), bytes);
    return new Response(JSON.stringify({ clean: true, sha256: hash }));
  }), hash);
  await assert.rejects(scanContractPDF(bytes, async () => new Response(JSON.stringify({ clean: false, sha256: hash }))));
  await assert.rejects(scanContractPDF(bytes, async () => new Response(JSON.stringify({ clean: true, sha256: 'wrong' }))));
  delete process.env.CONTRACT_SCAN_URL;
  await assert.rejects(scanContractPDF(bytes));
});

test('Podpis hooka: zmiana treści i przeterminowany podpis odrzucone', () => {
  const hook = new Webhook(randomBytes(32).toString('base64')), body = '{"sms":{"otp":"482913"}}', date = new Date();
  const headers = { 'webhook-id': 'test-message', 'webhook-timestamp': String(Math.floor(date.getTime() / 1000)), 'webhook-signature': hook.sign('test-message', date, body) };
  assert.deepEqual(hook.verify(body, headers), JSON.parse(body));
  assert.throws(() => hook.verify(body.replace('482913', '111111'), headers));
  const old = new Date(date.getTime() - 600000);
  assert.throws(() => hook.verify(body, { ...headers, 'webhook-timestamp': String(Math.floor(old.getTime() / 1000)), 'webhook-signature': hook.sign('test-message', old, body) }));
});

test('Baza: izolacja klientów, zamknięte tabele i Storage, limity, wygaśnięcie, cofnięcie telefonu', async () => {
  const db = new PGlite();
  await db.exec(`create role anon; create role authenticated; create role service_role bypassrls;
    create schema auth; create table auth.users(id uuid primary key);
    create schema storage; create table storage.buckets(id text primary key,name text,public boolean,file_size_limit integer,allowed_mime_types text[]);
    create table storage.objects(id uuid primary key,bucket_id text,name text);
    alter table storage.objects enable row level security;
    grant usage on schema storage to anon,authenticated;
    grant select,insert,delete,update on storage.objects to anon,authenticated;
    create policy old_broad_policy on storage.objects for all using(true) with check(true);`);
  await db.exec(readFileSync('MIGRACJA_UMOWY_SMS.sql', 'utf8'));
  // Repeat migration verifies idempotent deployment.
  await db.exec(readFileSync('MIGRACJA_UMOWY_SMS.sql', 'utf8'));
  const a = randomUUID(), b = randomUUID(), ua = randomUUID(), ub = randomUUID(), op = randomUUID(), stranger = randomUUID();
  await db.query('insert into auth.users values ($1),($2),($3),($4)', [ua, ub, op, stranger]);
  await db.query(`insert into contract_clients(id,name,nip,phone,auth_user_id) values ($1,'Client A','1111111111','+48500000000',$3),($2,'Client B','2222222222','+48500000001',$4)`, [a,b,ua,ub]);
  await db.query('insert into contract_device_bindings values ($1,$2),($3,$4)', ['SERIAL-A',a,'SERIAL-B',b]);
  await db.query('insert into storage.objects values ($1,$2,$3)', [randomUUID(),'contracts-private','private.pdf']);
  await db.query('insert into storage.objects values ($1,$2,$3)', [randomUUID(),'public','manual.pdf']);
  await db.exec('set role anon');
  await assert.rejects(db.query('select * from private_contracts'));
  await assert.rejects(db.query(`select contract_access_rpc('request','{}')`));
  const publicFiles = await db.query<{name: string}>('select name from storage.objects');
  assert.deepEqual(publicFiles.rows.map(r => r.name), ['manual.pdf']);
  await assert.rejects(db.query('insert into storage.objects values ($1,$2,$3)', [randomUUID(),'contracts-private','bypass.pdf']));
  await db.exec('reset role; set role authenticated');
  await assert.rejects(db.query('select * from contract_clients'));
  await db.exec('reset role; set role service_role');
  const rpc = async (action: string, data: Record<string, unknown>) => (await db.query<{r: any}>('select contract_access_rpc($1,$2::jsonb) as r', [action,JSON.stringify(data)])).rows[0].r;
  assert.equal((await rpc('request', { serial: 'FAKE', secretHash: 'test', ipHash: 'ip' })).error, 'unavailable');
  const ch = await rpc('request', { serial: 'SERIAL-A', secretHash: 'secret-a', ipHash: 'ip' });
  assert.equal(ch.phone, '+48500000000');
  assert.equal((await rpc('request', { serial: 'SERIAL-A', secretHash: 'secret-a', ipHash: 'ip' })).error, 'rate_limit');
  assert.equal((await rpc('hook', {phone:ch.phone,userId:ub})).error, 'denied');
  await rpc('hook', {phone:ch.phone,userId:ua});
  assert.equal((await rpc('hook', {phone:ch.phone,userId:ua})).error, 'denied');
  await rpc('sent', {id:ch.id,secretHash:'secret-a'});
  assert.equal((await rpc('verify', {id:ch.id,secretHash:'wrong'})).error, 'denied');
  await rpc('verify', {id:ch.id,secretHash:'secret-a'});
  assert.equal((await rpc('verify', {id:ch.id,secretHash:'secret-a'})).error, 'denied');
  assert.equal((await rpc('finish', {id:ch.id,secretHash:'secret-a',tokenHash:'session-a',userId:ub})).error, 'denied');
  await rpc('finish', {id:ch.id,secretHash:'secret-a',tokenHash:'session-a',userId:ua});
  assert.equal((await rpc('session', {serial:'SERIAL-A',tokenHash:'session-a'})).clientId,a);
  assert.equal((await rpc('session', {serial:'SERIAL-B',tokenHash:'session-a'})).error,'denied');
  assert.equal((await rpc('finish', {id:ch.id,secretHash:'secret-a',tokenHash:'session-reuse',userId:ua})).error,'denied');
  await db.query('update contract_clients set phone=$1 where id=$2',['+48500000002',a]);
  assert.equal((await rpc('session', {serial:'SERIAL-A',tokenHash:'session-a'})).error,'denied');
  const cb = await rpc('request', {serial:'SERIAL-B',secretHash:'secret-b',ipHash:'ip'});
  await rpc('hook', {phone:cb.phone,userId:ub}); await rpc('sent', {id:cb.id,secretHash:'secret-b'});
  for (let i=0;i<5;i++) { await rpc('verify', {id:cb.id,secretHash:'secret-b'}); await rpc('failed', {id:cb.id,secretHash:'secret-b'}); }
  assert.equal((await rpc('verify', {id:cb.id,secretHash:'secret-b'})).error,'denied');
  await db.exec(`update contract_sms_challenges set created_at=now()-interval '61 seconds' where client_id='${b}'`);
  const expired = await rpc('request', {serial:'SERIAL-B',secretHash:'expired',ipHash:'ip'});
  await db.query('update contract_sms_challenges set expires_at=now()-interval \'1 second\' where id=$1',[expired.id]);
  assert.equal((await rpc('hook', {phone:expired.phone,userId:ub})).error,'denied');
  assert.equal((await rpc('verify', {id:expired.id,secretHash:'expired'})).error,'denied');
  // Manager-only phone changes; conflicting serial assignments roll back atomically.
  await db.query('insert into contract_operators values ($1,true,true),($2,true,false)',[op,stranger]);
  await assert.rejects(db.query('select contract_save_client($1,$2,$3,$4,$5,$6)',[stranger,'X','3333333333','+48500000003',ua,['SERIAL-X']]));
  await assert.rejects(db.query('select contract_save_client($1,$2,$3,$4,$5,$6)',[op,'X','3333333333','+48500000003',ua,['SERIAL-B']]));
  assert.equal((await db.query('select id from contract_clients where nip=$1',['3333333333'])).rows.length,0);
  const id = randomUUID();
  await db.query('insert into private_contracts(id,client_id,name,number,signed_on,object_key,sha256,bytes,created_by) values($1,$2,\'Example\',\'1\',\'2026-09-30\',\'random.pdf\',$3,100,$4)',[id,a,'a'.repeat(64),op]);
  await assert.rejects(db.query('select contract_publish($1,$2,2)',[id,stranger]));
  await db.query('select contract_publish($1,$2,2)',[id,op]);
  assert.equal((await db.query<{status:string}>('select status from private_contracts where id=$1',[id])).rows[0].status,'published');
  await db.close();
});


test('Kontrola struktury PDF: oryginalne bajty, aktywne treści w skompresowanych obiektach, załączniki i uszkodzenia', async () => {
  process.env.CONTRACT_SCAN_MODE = 'structural';
  try {
    const pdf = await PDFDocument.create(); pdf.addPage().drawText('Contract test');
    const bytes = Buffer.from(await pdf.save()); const original = Buffer.from(bytes);
    assert.equal(await scanContractPDF(bytes), createHash('sha256').update(original).digest('hex'));
    assert.deepEqual(bytes, original);
    const malicious = await PDFDocument.create(); malicious.addPage();
    malicious.catalog.set(PDFName.of('OpenAction'), malicious.context.register(malicious.context.obj({ S: 'JavaScript', JS: PDFString.of('app.alert(1)') })));
    await assert.rejects(scanContractPDF(Buffer.from(await malicious.save({ useObjectStreams: true }))));
    const attachment = await PDFDocument.create(); attachment.addPage();
    await attachment.attach(new Uint8Array([1,2,3]), 'hidden.exe');
    await assert.rejects(scanContractPDF(Buffer.from(await attachment.save())));
    // PDF names may escape characters with hex; decoded names are inspected.
    const plain = Buffer.from(await malicious.save({ useObjectStreams: false }));
    await assert.rejects(scanContractPDF(Buffer.from(plain.toString('latin1').replace('/JS ', '/J#53 '), 'latin1')));
    await assert.rejects(scanContractPDF(Buffer.from('%PDF-1.4\ninvalid\n%%EOF')));
  } finally { delete process.env.CONTRACT_SCAN_MODE; }
});


test('Duże PDF: zakresy poniżej limitu Vercel, brak ucięcia i odrzucenie nadmiarowych zakresów', () => {
 const total = 20311535, chunk = CONTRACT_DOWNLOAD_CHUNK;
 assert.throws(() => contractByteRange(null, total));
 assert.deepEqual(contractByteRange(null, 100), {start:0,end:99,partial:false});
 let coverage = 0;
 for (let start=0; start<total; start+=chunk) {
   const r=contractByteRange(`bytes=${start}-${start+chunk-1}`, total);
   assert.equal(r.start,start); assert.ok(r.end-r.start+1<=chunk); coverage+=r.end-r.start+1;
 }
 assert.equal(coverage,total);
 assert.throws(() => contractByteRange('bytes=0-9999999',total));
 assert.throws(() => contractByteRange('bytes=-1-3',total));
 assert.throws(() => contractByteRange('bytes=5-2',total));
 assert.throws(() => contractByteRange(`bytes=${total}-${total+10}`,total));
});
