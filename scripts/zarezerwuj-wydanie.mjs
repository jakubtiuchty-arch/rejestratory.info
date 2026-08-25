#!/usr/bin/env node
/**
 * Wpisuje wydanie do tabeli `newsletter_sends`, czyli robi dokładnie to,
 * co robi przycisk „Potwierdzam — wysyłaj" w /api/newsletter/approve.
 *
 * Po co: kiedy bulk zaplanowaliśmy ręcznie przez `send-newsletter.mjs --send`,
 * pipeline o tym nie wie. W poniedziałek cron i tak wyśle testówkę z przyciskiem
 * zatwierdzenia, a jedno kliknięcie zaplanowałoby te same maile drugi raz.
 * Rezerwacja sprawia, że przycisk odpowie „Już zatwierdzone ✓" i nic nie wyśle.
 *
 *   node scripts/zarezerwuj-wydanie.mjs /newsletter/editions/RRRR-MM-DD-slug.html <ISO8601> <liczba>
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const [, , plik, termin, liczba] = process.argv
if (!plik || !termin || !liczba) {
  console.error('Użycie: node scripts/zarezerwuj-wydanie.mjs <ścieżka-wydania> <ISO8601> <liczba odbiorców>')
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

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const { data: istnieje } = await sb.from('newsletter_sends').select('*').eq('file', plik).maybeSingle()
if (istnieje) {
  console.log('Wydanie już zarezerwowane:', istnieje)
  process.exit(0)
}

const { error } = await sb.from('newsletter_sends').insert({
  file: plik,
  approved_at: new Date().toISOString(),
  scheduled_for: termin,
  recipient_count: Number(liczba),
})
if (error) {
  console.error('Błąd zapisu:', error.message)
  process.exit(1)
}
console.log(`Zarezerwowano ${plik} — ${liczba} maili na ${termin}. Przycisk zatwierdzenia nic już nie wyśle.`)
