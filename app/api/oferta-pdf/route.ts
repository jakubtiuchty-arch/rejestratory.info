import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { PRODUKTY_OFERTY, WARUNKI_OFERTY } from '@/lib/oferta-pdf/produkty'
import { renderujOfertePdf, nazwaPlikuOferty } from '@/lib/oferta-pdf/render'
import { zl } from '@/lib/oferta-pdf/OfertaPdf'

/**
 * Klient wpisuje dane nadleśnictwa na karcie produktu → dostaje ofertę w PDF
 * do pobrania, kopię na e-mail, a dział handlowy powiadomienie z załącznikiem.
 * react-pdf nie działa na edge, stąd runtime nodejs.
 */
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const SITE = 'https://www.rejestratory.info'
const OD = 'TAKMA <oferta@rejestratory.info>'
/** odbiorcy powiadomienia; OFERTA_PDF_HANDLOWY=a@x,b@y nadpisuje (np. do testów) */
const HANDLOWY = (process.env.OFERTA_PDF_HANDLOWY || 'handlowy@takma.com.pl,rejestratory@takma.com.pl')
  .split(',')
  .map((a) => a.trim())
  .filter(Boolean)

type Wejscie = {
  slug?: string
  nadlesnictwo?: string
  adres?: string
  nip?: string
  osoba?: string
  email?: string
  telefon?: string
  ilosc?: number | string
  uwagi?: string
  zgoda?: boolean
  /** honeypot — boty wypełniają, ludzie nie widzą */
  www?: string
}

/* prosty limit per IP: 5 ofert na 10 minut; pamięć procesu, więc na serverless
   resetuje się przy zimnym starcie — wystarcza przeciw prostym pętlom */
const limity = new Map<string, number[]>()
const limitOk = (ip: string) => {
  const teraz = Date.now()
  const okno = (limity.get(ip) ?? []).filter((t) => teraz - t < 10 * 60_000)
  if (okno.length >= 5) return false
  okno.push(teraz)
  limity.set(ip, okno)
  return true
}

/**
 * „dla Nadleśnictwa Wipsowo”, nie „dla Nadleśnictwo Wipsowo”. Odmieniamy tylko
 * pierwszy wyraz nazwy jednostki; nazwa własna po nim zostaje w mianowniku.
 */
function dopelniacz(nazwa: string): string {
  const [pierwszy, ...reszta] = nazwa.split(' ')
  const formy: Record<string, string> = {
    Nadleśnictwo: 'Nadleśnictwa',
    nadleśnictwo: 'nadleśnictwa',
    Leśnictwo: 'Leśnictwa',
    Zakład: 'Zakładu',
    Dyrekcja: 'Dyrekcji',
    Regionalna: 'Regionalnej',
  }
  const odmieniony = formy[pierwszy]
  return odmieniony ? [odmieniony, ...reszta].join(' ') : nazwa
}

const tekst = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const esc = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Data DD.MM.RRRR — jak w PDF; `toLocaleDateString` gubi zero wiodące. */
const dataPl = (d: Date) =>
  `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`

/** Numer oferty wg Jakuba: OF-ROK-DDMMRRRR (data wystawienia). */
function numerOferty(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `OF-${d.getFullYear()}-${dd}${mm}${d.getFullYear()}`
}

/**
 * Rejestr ofert w tabeli `oferty_pdf` w Supabase (MIGRACJA_OFERTY_PDF.sql).
 * Bez tabeli (albo przy błędzie) oferta i tak powstaje, tylko nie zostaje w rejestrze.
 */
async function zarejestrujOferte(wpis: Record<string, unknown>): Promise<void> {
  try {
    const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { error } = await sb.from('oferty_pdf').insert(wpis)
    if (error) throw error
  } catch (e) {
    console.warn('[oferta-pdf] rejestr niedostępny:', (e as Error)?.message)
  }
}

function mailHtml(opts: { naglowek: string; wstep: string; wiersze: [string, string][]; stopka: string }) {
  const rows = opts.wiersze
    .map(
      ([k, v]) =>
        `<tr><td style="padding:7px 0;border-bottom:1px solid #e2e8e2;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b7280;width:42%;">${esc(k)}</td><td style="padding:7px 0;border-bottom:1px solid #e2e8e2;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#111827;font-weight:bold;">${esc(v)}</td></tr>`
    )
    .join('')
  return `<!DOCTYPE html><html lang="pl"><body style="margin:0;padding:0;background:#e8ebe8;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e8ebe8;"><tr><td align="center" style="padding:20px 10px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="background:#ffffff;border-radius:12px 12px 0 0;padding:18px 28px;"><img src="${SITE}/takma_logo_footer.png" alt="TAKMA" height="49" style="height:49px;width:auto;border:0;display:block;"></td></tr>
<tr><td style="background:#166534;padding:24px 32px;"><p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#bbf7d0;font-weight:bold;">Oferta w PDF</p><h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.25;color:#ffffff;">${esc(opts.naglowek)}</h1></td></tr>
<tr><td style="background:#ffffff;padding:24px 32px;"><p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#374151;">${opts.wstep}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
<p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#6b7280;">${opts.stopka}</p></td></tr>
<tr><td align="center" style="background:#f3f7f2;border-top:1px solid #dfe7e0;border-radius:0 0 12px 12px;padding:20px 32px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.8;color:#6b7280;text-align:center;">TAKMA · ul. Poświęcka 1a, 51-128 Wrocław · NIP 915-100-43-77<br>tel. <a href="tel:+48607819688" style="color:#14532d;text-decoration:none;font-weight:bold;">607 819 688</a> · <a href="mailto:takma@takma.com.pl" style="color:#14532d;text-decoration:none;">takma@takma.com.pl</a> · <a href="${SITE}" style="color:#14532d;text-decoration:none;font-weight:bold;">rejestratory.info</a></td></tr>
</table></td></tr></table></body></html>`
}

export async function POST(req: NextRequest) {
  let b: Wejscie
  try {
    b = (await req.json()) as Wejscie
  } catch {
    return NextResponse.json({ error: 'Nieprawidłowe dane' }, { status: 400 })
  }

  // honeypot: bot dostaje „sukces” bez pliku
  if (b.www) return NextResponse.json({ ok: true })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (!limitOk(ip)) {
    return NextResponse.json({ error: 'Za dużo ofert w krótkim czasie. Spróbuj za kilka minut.' }, { status: 429 })
  }

  const produkt = PRODUKTY_OFERTY[tekst(b.slug, 80)]
  const nadlesnictwo = tekst(b.nadlesnictwo, 120)
  const adres = tekst(b.adres, 200)
  const nipSurowy = tekst(b.nip, 20).replace(/[\s-]/g, '')
  const osoba = tekst(b.osoba, 80)
  const email = tekst(b.email, 120).toLowerCase()
  const telefon = tekst(b.telefon, 30)
  const uwagi = tekst(b.uwagi, 500)
  const ilosc = Math.floor(Number(b.ilosc))

  const bledy: string[] = []
  if (!produkt) bledy.push('Nieznany produkt.')
  if (nadlesnictwo.length < 3) bledy.push('Podaj nazwę nadleśnictwa lub jednostki.')
  if (adres.length < 5) bledy.push('Podaj adres.')
  if (nipSurowy && !/^\d{10}$/.test(nipSurowy)) bledy.push('NIP powinien mieć 10 cyfr.')
  if (osoba.length < 3) bledy.push('Podaj osobę do kontaktu.')
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) bledy.push('Podaj poprawny adres e-mail.')
  if (!Number.isFinite(ilosc) || ilosc < 1 || ilosc > 50) bledy.push('Ilość od 1 do 50 sztuk.')
  if (b.zgoda !== true) bledy.push('Potrzebna zgoda na przetwarzanie danych.')
  if (bledy.length) return NextResponse.json({ error: bledy.join(' ') }, { status: 400 })

  const nip = nipSurowy ? nipSurowy.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1-$2-$3-$4') : null
  const wystawiona = new Date()
  const waznaDo = new Date(wystawiona.getTime() + WARUNKI_OFERTY.waznoscDni * 86_400_000)
  const netto = produkt.cenaNetto * ilosc
  const brutto = netto + Math.round(netto * WARUNKI_OFERTY.vat)

  const numer = numerOferty(wystawiona)
  await zarejestrujOferte({
    numer,
    slug: produkt.slug,
    nadlesnictwo,
    adres,
    nip,
    osoba,
    email,
    telefon: telefon || null,
    ilosc,
    uwagi: uwagi || null,
    netto,
    brutto,
    wazna_do: waznaDo.toISOString().slice(0, 10),
  })

  let pdf: Buffer
  try {
    pdf = await renderujOfertePdf({
      numer,
      wystawiona,
      waznaDo,
      nabywca: { nazwa: nadlesnictwo, adres, nip, osoba, email, telefon: telefon || null },
      produkt,
      ilosc,
      uwagiKlienta: uwagi || null,
    })
  } catch (e) {
    console.error('[oferta-pdf] render:', e)
    return NextResponse.json({ error: 'Nie udało się przygotować pliku. Spróbuj ponownie.' }, { status: 500 })
  }

  const plik = nazwaPlikuOferty(numer, produkt.nazwa)
  const wiersze: [string, string][] = [
    ['Numer oferty', numer],
    ['Produkt', `${produkt.nazwa} × ${ilosc} szt.`],
    ['Wartość', `${zl(netto)} netto · ${zl(brutto)} brutto`],
    ['Ważna do', dataPl(waznaDo)],
  ]
  const wierszeHandlowy: [string, string][] = [
    ...wiersze,
    ['Nadleśnictwo', nadlesnictwo],
    ['Adres', adres],
    ['NIP', nip ?? '—'],
    ['Osoba do kontaktu', osoba],
    ['E-mail', email],
    ['Telefon', telefon || '—'],
  ]

  // maile w tle względem odpowiedzi: błąd wysyłki nie odbiera klientowi pliku
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const zalaczniki = [{ filename: plik, content: pdf }]
    await Promise.all([
      resend.emails.send({
        from: OD,
        to: [email],
        replyTo: 'takma@takma.com.pl',
        subject: `Oferta ${numer} — ${produkt.nazwa} dla ${dopelniacz(nadlesnictwo)}`,
        html: mailHtml({
          naglowek: `${produkt.nazwa} dla ${dopelniacz(nadlesnictwo)}`,
          wstep: `Dziękujemy za zainteresowanie. W załączniku oferta nr <b>${esc(numer)}</b>, ważna ${WARUNKI_OFERTY.waznoscDni} dni.`,
          wiersze,
          stopka: `Pytania o konfigurację, termin dostawy albo wdrożenie: wystarczy odpowiedzieć na tę wiadomość albo zadzwonić pod 607 819 688.`,
        }),
        attachments: zalaczniki,
      }),
      resend.emails.send({
        from: OD,
        to: HANDLOWY,
        replyTo: email,
        subject: `[rejestratory.info] Oferta ${numer} wygenerowana — ${nadlesnictwo}`,
        html: mailHtml({
          naglowek: `Nowa oferta ${numer}`,
          wstep: `Klient wygenerował ofertę na karcie produktu. Kopia poszła na adres ${esc(email)}.${uwagi ? ` Uwagi zamawiającego: <i>${esc(uwagi)}</i>` : ''}`,
          wiersze: wierszeHandlowy,
          stopka: 'Wiadomość automatyczna z rejestratory.info.',
        }),
        attachments: zalaczniki,
      }),
    ])
  } catch (e) {
    console.error('[oferta-pdf] mail:', e)
  }

  return new NextResponse(new Uint8Array(pdf), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${plik}"`,
      'Cache-Control': 'private, no-store',
      'X-Oferta-Numer': numer,
    },
  })
}
