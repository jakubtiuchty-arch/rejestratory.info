#!/usr/bin/env node
/**
 * Wysyłka cotygodniowego newslettera do nadleśnictw przez Resend.
 *
 * Lista odbiorców: unia client_email z tabel registrators, sales_products,
 * inspections (Supabase) — po normalizacji i deduplikacji (~150 adresów).
 *
 * Użycie (z katalogu repo):
 *   node scripts/send-newsletter.mjs newsletter/2026-08-posnet-pospay-2.html --list          # tylko pokaż listę
 *   node scripts/send-newsletter.mjs newsletter/2026-08-posnet-pospay-2.html --test adres@x  # wyślij próbkę
 *   node scripts/send-newsletter.mjs newsletter/2026-08-posnet-pospay-2.html --send          # WYSYŁKA do całej listy
 *
 * Temat maila: z <title> pliku HTML.
 * Resend: limit 2 req/s na darmowym planie — wysyłamy sekwencyjnie z odstępem 600 ms.
 */
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { readFileSync } from 'fs'

const htmlPath = process.argv[2]
const mode = process.argv[3]
const testAddr = process.argv[4]

if (!htmlPath || !['--list', '--test', '--send'].includes(mode) || (mode === '--test' && !testAddr)) {
  console.error('Użycie: node scripts/send-newsletter.mjs <plik.html> --list | --test <adres> | --send')
  process.exit(1)
}

const env = {}
for (const f of ['.env.local', '.env']) {
  try {
    for (const l of readFileSync(f, 'utf8').split('\n')) {
      const m = l.match(/^([A-Z_0-9]+)=["']?([^"']*)["']?\s*$/)
      if (m && !(m[1] in env)) env[m[1]] = m[2]
    }
  } catch {}
}

const html = readFileSync(htmlPath, 'utf8')
const subject = (html.match(/<title>([^<]+)<\/title>/) || [])[1]?.trim()
if (!subject) { console.error('Brak <title> w pliku HTML — nie mam tematu maila.'); process.exit(1) }

// ── Lista odbiorców ──────────────────────────────────────────────────────────
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

function normalize(raw) {
  let e = (raw || '').toLowerCase().trim().replace(/[,;\s]+$/, '')
  // znane literówki w bazie
  e = e.replace('@olsztyn.lay.gov.pl', '@olsztyn.lasy.gov.pl')
  e = e.replace(/@([a-z]+)\.lasy\.pl$/, '@$1.lasy.gov.pl')
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(e)) return null
  return e
}

const recipients = new Map() // email -> client_name
for (const table of ['registrators', 'sales_products', 'inspections']) {
  const { data, error } = await sb.from(table).select('client_name, client_email').not('client_email', 'is', null)
  if (error) { console.error(`Supabase ${table}:`, error.message); continue }
  for (const r of data) {
    const e = normalize(r.client_email)
    if (e && !recipients.has(e)) recipients.set(e, (r.client_name || '').trim())
  }
}
console.log(`Odbiorców po deduplikacji: ${recipients.size}`)

if (mode === '--list') {
  for (const [e, n] of [...recipients].sort()) console.log(e, '|', n)
  process.exit(0)
}

// ── Wysyłka ──────────────────────────────────────────────────────────────────
const resend = new Resend(env.RESEND_API_KEY)
const FROM = 'TAKMA <oferta@rejestratory.info>'
const REPLY_TO = 'takma@takma.com.pl'

const targets = mode === '--test' ? [testAddr] : [...recipients.keys()]
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let ok = 0, fail = 0
const failed = []

for (let i = 0; i < targets.length; i++) {
  const to = targets[i]
  try {
    const { error } = await resend.emails.send({ from: FROM, replyTo: REPLY_TO, to, subject, html })
    if (error) throw new Error(error.message)
    ok++
    if (ok % 20 === 0 || mode === '--test') console.log(`[${i + 1}/${targets.length}] OK ${to}`)
  } catch (e) {
    fail++
    failed.push(to)
    console.error(`[${i + 1}/${targets.length}] BŁĄD ${to}: ${e.message}`)
  }
  if (i < targets.length - 1) await sleep(600)
}

console.log(`\nWysłane: ${ok}, błędy: ${fail}`)
if (failed.length) console.log('Nieudane adresy:\n' + failed.join('\n'))
