#!/usr/bin/env node
/**
 * Doplanowuje pojedynczy adres do już zaplanowanej wysyłki i dopisuje jego ID
 * do `scheduled-<data>.json`, żeby lista do ewentualnego anulowania była pełna.
 *
 * Powstało po wysyłce Apple 25.08.2026: jeden z 603 adresów odpadł na błędzie
 * Resenda, a ponowne uruchomienie całego skryptu nadpisałoby plik z ID.
 *
 *   node scripts/dosli-jeden.mjs <plik.html> <adres> <ISO8601>
 */
import { Resend } from 'resend'
import { readFileSync, writeFileSync, existsSync } from 'fs'

const [, , htmlPath, adres, termin] = process.argv
if (!htmlPath || !adres || !termin) {
  console.error('Użycie: node scripts/dosli-jeden.mjs <plik.html> <adres> <ISO8601>')
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
if (!subject) { console.error('Brak <title> — nie mam tematu maila.'); process.exit(1) }

const resend = new Resend(env.RESEND_API_KEY)
const { data, error } = await resend.emails.send({
  from: 'TAKMA <oferta@rejestratory.info>',
  replyTo: 'takma@takma.com.pl',
  to: adres,
  subject,
  html,
  scheduledAt: termin,
  headers: {
    'List-Unsubscribe': '<mailto:takma@takma.com.pl?subject=rezygnacja>',
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  },
})

if (error) {
  console.error(`BŁĄD ${adres}: ${error.message}`)
  process.exit(1)
}
console.log(`OK ${adres} → ${data.id}, termin ${termin}`)

const plik = `scheduled-${termin.slice(0, 10)}.json`
if (existsSync(plik)) {
  const j = JSON.parse(readFileSync(plik, 'utf8'))
  if (!j.emails.some((e) => e.to === adres)) {
    j.emails.push({ to: adres, id: data.id })
    writeFileSync(plik, JSON.stringify(j, null, 2))
    console.log(`Dopisane do ${plik} — razem ${j.emails.length} maili.`)
  }
}
