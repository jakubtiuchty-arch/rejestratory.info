#!/usr/bin/env node
/**
 * Mailing spersonalizowany — każdy odbiorca dostaje własne dane w treści.
 *
 * W przeciwieństwie do newslettera (jeden HTML dla wszystkich) tutaj lista
 * odbiorców pochodzi z pliku CSV, a w szablonie podmieniane są pola {{...}}.
 *
 * CSV (średnik jako separator, pierwszy wiersz to nagłówek, # = komentarz):
 *   email;nadlesnictwo;data;godzina
 *   piensk@wroclaw.lasy.gov.pl;Nadleśnictwo Pieńsk;15 września 2026 (wtorek);10:00
 *
 * Nazwy kolumn stają się polami {{EMAIL}}, {{NADLESNICTWO}}, {{DATA}}, {{GODZINA}}.
 * Dla każdego pola powstaje też wariant {{NAZWA_URL}} zakodowany do użycia w linkach
 * mailto: — bez tego spacje i polskie znaki rozbijają temat wiadomości.
 *
 * Użycie (z katalogu repo):
 *   node scripts/send-mailing.mjs <szablon.html> <lista.csv> --list
 *   node scripts/send-mailing.mjs <szablon.html> <lista.csv> --preview <plik-wyjściowy.html>
 *   node scripts/send-mailing.mjs <szablon.html> <lista.csv> --test <adres>
 *   node scripts/send-mailing.mjs <szablon.html> <lista.csv> --send [--send-at <ISO8601>] [--reply-to <adres>]
 *
 * Temat maila: z <title> szablonu, po podmianie pól — więc również spersonalizowany.
 */
import { Resend } from 'resend'
import { readFileSync, writeFileSync } from 'fs'

const [templatePath, csvPath, mode, modeArg] = process.argv.slice(2)
const sendAtIdx = process.argv.indexOf('--send-at')
const sendAt = sendAtIdx > -1 ? process.argv[sendAtIdx + 1] : null
// adres zwrotny — domyślnie skrzynka serwisu, ale konkretny mailing może kierować
// odpowiedzi gdzie indziej (np. do prowadzącego trasę)
const replyToIdx = process.argv.indexOf('--reply-to')
const REPLY_TO = replyToIdx > -1 ? process.argv[replyToIdx + 1] : 'serwis@takma.com.pl'

const MODES = ['--list', '--preview', '--test', '--send']
if (!templatePath || !csvPath || !MODES.includes(mode) || (mode === '--test' && !modeArg) || (mode === '--preview' && !modeArg)) {
  console.error('Użycie: node scripts/send-mailing.mjs <szablon.html> <lista.csv> --list | --preview <plik.html> | --test <adres> | --send [--send-at <ISO8601>]')
  process.exit(1)
}
if (sendAt && isNaN(Date.parse(sendAt))) {
  console.error(`Nieprawidłowa data --send-at: ${sendAt}`)
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

// ── Lista odbiorców z CSV ────────────────────────────────────────────────────
const lines = readFileSync(csvPath, 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))

const header = lines.shift().split(';').map((h) => h.trim().toUpperCase())
if (!header.includes('EMAIL')) {
  console.error('CSV musi mieć kolumnę "email".')
  process.exit(1)
}

const rows = []
const problems = []
lines.forEach((line, i) => {
  const cells = line.split(';').map((c) => c.trim())
  if (cells.length !== header.length) {
    problems.push(`wiersz ${i + 2}: ${cells.length} pól zamiast ${header.length} — ${line}`)
    return
  }
  const row = Object.fromEntries(header.map((h, j) => [h, cells[j]]))
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(row.EMAIL)) {
    problems.push(`wiersz ${i + 2}: nieprawidłowy adres "${row.EMAIL}"`)
    return
  }
  const empty = header.filter((h) => !row[h])
  if (empty.length) {
    problems.push(`wiersz ${i + 2} (${row.EMAIL}): puste pola ${empty.join(', ')}`)
    return
  }
  rows.push(row)
})

if (problems.length) {
  console.error('\nPROBLEMY W LIŚCIE — te wiersze zostaną pominięte:')
  for (const p of problems) console.error('  ' + p)
  console.error('')
}

const dups = rows.map((r) => r.EMAIL.toLowerCase()).filter((e, i, a) => a.indexOf(e) !== i)
if (dups.length) console.error(`UWAGA: adresy powtórzone w liście: ${[...new Set(dups)].join(', ')}\n`)

console.log(`Odbiorców w liście: ${rows.length}`)

function render(tpl, row) {
  let out = tpl
  for (const [key, value] of Object.entries(row)) {
    out = out.replaceAll(`{{${key}_URL}}`, encodeURIComponent(value))
    out = out.replaceAll(`{{${key}}}`, value)
  }
  return out
}

const template = readFileSync(templatePath, 'utf8')

// nieuzupełnione pola w szablonie = błąd w liście, lepiej złapać przed wysyłką
const leftover = [...new Set([...render(template, rows[0] || {}).matchAll(/\{\{([A-Z_]+)\}\}/g)].map((m) => m[1]))]
if (leftover.length) {
  console.error(`BŁĄD: w szablonie zostają niewypełnione pola: ${leftover.join(', ')}`)
  console.error(`Kolumny dostępne w CSV: ${header.join(', ')}`)
  process.exit(1)
}

if (mode === '--list') {
  for (const r of rows) console.log(header.map((h) => r[h]).join(' | '))
  process.exit(0)
}

if (mode === '--preview') {
  writeFileSync(modeArg, render(template, rows[0]))
  console.log(`Podgląd dla ${rows[0].EMAIL} zapisany w ${modeArg}`)
  process.exit(0)
}

// ── Wysyłka ──────────────────────────────────────────────────────────────────
const resend = new Resend(env.RESEND_API_KEY)
const FROM = 'TAKMA Serwis <oferta@rejestratory.info>'

const targets = mode === '--test' ? [{ ...rows[0], EMAIL: modeArg }] : rows
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let ok = 0, fail = 0
const failed = []
const scheduled = []

console.log(`Odpowiedzi trafią na: ${REPLY_TO}`)
if (sendAt) console.log(`Wysyłka zaplanowana na: ${sendAt}`)
if (mode === '--test') console.log(`Test na ${modeArg} z danymi wiersza: ${rows[0].NADLESNICTWO || rows[0].EMAIL}`)

for (let i = 0; i < targets.length; i++) {
  const row = targets[i]
  const html = render(template, row)
  const subject = (html.match(/<title>([^<]+)<\/title>/) || [])[1]?.trim()
  if (!subject) { console.error('Brak <title> w szablonie — nie mam tematu maila.'); process.exit(1) }
  try {
    const payload = { from: FROM, replyTo: REPLY_TO, to: row.EMAIL, subject, html }
    if (sendAt) payload.scheduledAt = sendAt
    const { data, error } = await resend.emails.send(payload)
    if (error) throw new Error(error.message)
    ok++
    scheduled.push({ to: row.EMAIL, id: data?.id })
    console.log(`[${i + 1}/${targets.length}] OK ${row.EMAIL} — ${row.DATA || ''} ${row.GODZINA || ''}`)
  } catch (e) {
    fail++
    failed.push(row.EMAIL)
    console.error(`[${i + 1}/${targets.length}] BŁĄD ${row.EMAIL}: ${e.message}`)
  }
  if (i < targets.length - 1) await sleep(600)
}

console.log(`\n${sendAt ? 'Zaplanowane' : 'Wysłane'}: ${ok}, błędy: ${fail}`)
if (failed.length) console.log('Nieudane adresy:\n' + failed.join('\n'))
if (mode === '--send' && scheduled.length) {
  const stamp = sendAt ? sendAt.slice(0, 10) : 'natychmiast'
  const f = `mailing-wyslane-${stamp}.json`
  writeFileSync(f, JSON.stringify({ sendAt, template: templatePath, emails: scheduled }, null, 2))
  console.log(`ID wiadomości zapisane w ${f} (anulowanie zaplanowanej wysyłki: scripts/cancel-scheduled.mjs)`)
}
