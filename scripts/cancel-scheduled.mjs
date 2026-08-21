#!/usr/bin/env node
/**
 * Anulowanie zaplanowanej wysyłki newslettera (Resend scheduledAt).
 *
 * Resend zamraża HTML w momencie wywołania API — po zmianie treści trzeba
 * anulować kolejkę i zaplanować ją od nowa aktualnym plikiem.
 *
 * Użycie:
 *   node scripts/cancel-scheduled.mjs scheduled-2026-08-18.json
 */
import { Resend } from 'resend'
import { readFileSync, writeFileSync } from 'fs'

const path = process.argv[2]
if (!path) {
  console.error('Użycie: node scripts/cancel-scheduled.mjs <scheduled-YYYY-MM-DD.json>')
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

const { sendAt, subject, emails } = JSON.parse(readFileSync(path, 'utf8'))
console.log(`Anulowanie ${emails.length} maili zaplanowanych na ${sendAt}`)
console.log(`Temat: ${subject}\n`)

const resend = new Resend(env.RESEND_API_KEY)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let ok = 0, fail = 0
const failed = []

for (let i = 0; i < emails.length; i++) {
  const { to, id } = emails[i]
  try {
    if (!id) throw new Error('brak id')
    const { error } = await resend.emails.cancel(id)
    if (error) throw new Error(error.message)
    ok++
    if (ok % 20 === 0) console.log(`[${i + 1}/${emails.length}] anulowano ${to}`)
  } catch (e) {
    fail++
    failed.push({ to, id, err: e.message })
    console.error(`[${i + 1}/${emails.length}] BŁĄD ${to}: ${e.message}`)
  }
  if (i < emails.length - 1) await sleep(600)
}

console.log(`\nAnulowane: ${ok}, błędy: ${fail}`)
if (failed.length) {
  const f = path.replace(/\.json$/, '-cancel-errors.json')
  writeFileSync(f, JSON.stringify(failed, null, 2))
  console.log(`Nieudane anulowania zapisane w ${f}`)
  console.log('UWAGA: sprawdź ich status przez resend.emails.get(id) zanim uznasz, że pójdą.')
  console.log('Błąd "Email is not scheduled" zwykle znaczy, że mail ma status suppressed')
  console.log('(adres na liście blokad Resend po wcześniejszym odbiciu) — taki mail NIE zostanie wysłany.')
}
