import { createClient } from '@supabase/supabase-js'
import { createHmac } from 'crypto'

/**
 * Wspólna logika newslettera tygodniowego dla nadleśnictw.
 * Odbiorcy: unia client_email z registrators + sales_products + inspections,
 * po normalizacji (literówki domen LP) i deduplikacji — ta sama logika co
 * scripts/send-newsletter.mjs.
 */

export const NEWSLETTER_TEST_TO = 'jakub.tiuchty@takma.com.pl'
export const NEWSLETTER_FROM = 'TAKMA <oferta@rejestratory.info>'
export const NEWSLETTER_REPLY_TO = 'takma@takma.com.pl'
export const SITE = 'https://www.rejestratory.info'

export function normalizeEmail(raw: string | null | undefined): string | null {
  let e = (raw || '').toLowerCase().trim().replace(/[,;\s]+$/, '')
  e = e.replace('@olsztyn.lay.gov.pl', '@olsztyn.lasy.gov.pl')
  e = e.replace(/@([a-z]+)\.lasy\.pl$/, '@$1.lasy.gov.pl')
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(e)) return null
  return e
}

export async function getRecipients(): Promise<string[]> {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const uniq = new Set<string>()
  // 1) adresy OGÓLNE nadleśnictw (nadlesnictwo@rdlp.lasy.gov.pl) — baza zbudowana
  //    2026-08-04 z portali 17 RDLP + korespondencji, walidacja DNS; plik w repo
  //    + wydziały informatyki 17 RDLP (odbiorcy-rdlp-informatyka.json)
  const general = (await import('@/newsletter/odbiorcy-ogolne.json')).default as string[]
  const rdlp = (await import('@/newsletter/odbiorcy-rdlp-informatyka.json')).default as string[]
  for (const e of [...general, ...rdlp]) {
    const n = normalizeEmail(e)
    if (n) uniq.add(n)
  }
  // 2) adresy OSOBISTE administratorów z Supabase (klienci serwisu/sklepu)
  for (const table of ['registrators', 'sales_products', 'inspections']) {
    const { data, error } = await sb.from(table).select('client_email').not('client_email', 'is', null)
    if (error) throw new Error(`Supabase ${table}: ${error.message}`)
    for (const r of data || []) {
      const e = normalizeEmail((r as { client_email?: string }).client_email)
      if (e) uniq.add(e)
    }
  }
  return [...uniq]
}

/** Manifest bieżącego wydania: public/newsletter/manifest.json */
export interface NewsletterManifest {
  file: string // np. /newsletter/editions/2026-08-11-zebra-em45.html
  bulkAt: string // ISO z offsetem, np. 2026-08-12T08:30:00+02:00
}

export async function getManifest(): Promise<NewsletterManifest> {
  const res = await fetch(`${SITE}/newsletter/manifest.json`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`manifest.json HTTP ${res.status}`)
  return res.json()
}

export async function getEditionHtml(file: string): Promise<{ html: string; subject: string }> {
  const res = await fetch(`${SITE}${file}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`${file} HTTP ${res.status}`)
  const html = await res.text()
  const subject = (html.match(/<title>([^<]+)<\/title>/) || [])[1]?.trim()
  if (!subject) throw new Error(`${file}: brak <title> (temat maila)`)
  return { html, subject }
}

/** Token zatwierdzenia: HMAC(CRON_SECRET, plik wydania) — link ważny tylko dla tego wydania. */
export function approvalToken(file: string): string {
  return createHmac('sha256', process.env.CRON_SECRET || '').update(file).digest('hex').slice(0, 32)
}

