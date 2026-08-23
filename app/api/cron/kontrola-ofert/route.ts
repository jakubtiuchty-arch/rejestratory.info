import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { NEWSLETTER_TEST_TO, NEWSLETTER_FROM, NEWSLETTER_REPLY_TO, SITE } from '@/lib/newsletter'
import { WSZYSTKIE_OFERTY } from '@/data/oferty'
import { SKLADNICE } from '@/data/skladnice'

/**
 * Cron: codziennie 6:00 UTC.
 *
 * Karty produktu nie pokazują terminów ważności ofert — leśnika interesuje
 * kwota, nie data ważności dokumentu. Za aktualność odpowiada ten cron: w dniu,
 * w którym oferta składnicy traci ważność, zagląda na stronę składnicy i
 * przysyła zgłoszenie do sprawdzenia. Wtedy albo odświeżamy ceny w danych,
 * albo ofertę usuwamy.
 *
 * Sprawdzenie strony jest tylko sygnałem pomocniczym — składnice publikują
 * oferty jako .docx/.pdf i przebudowują strony, więc decyzję zawsze podejmuje
 * człowiek. Dlatego cron nic nie kasuje samodzielnie, tylko powiadamia.
 *
 * Podgląd bez wysyłki: /api/cron/kontrola-ofert?dry=1 (też za CRON_SECRET).
 */

export const dynamic = 'force-dynamic'
export const maxDuration = 60

type DoSprawdzenia = {
  slug: string
  model: string
  skladnica: string
  miasto: string
  www: string
  wygasa: string
  cenaNetto: number
  plik: string
  /** czy nazwa modelu nadal pojawia się na stronie składnicy */
  naStronie: 'tak' | 'nie' | 'nie udało się sprawdzić' | 'nie sprawdzano'
}

/**
 * Fragment do wyszukania na stronie składnicy — ze sluga karty, np. „zq521”.
 * Człon krótszy niż trzy znaki („16” z `dell-pro-16`) trafiłby na przypadkowy
 * numer w treści, więc wtedy odpuszczamy sprawdzanie zamiast zgadywać.
 */
const znacznikModelu = (slug: string) => {
  const zCyfra = slug.split('-').filter((cz) => /\d/.test(cz) && cz.length >= 3)
  return zCyfra.sort((a, b) => b.length - a.length)[0] ?? null
}

const sprawdzStrone = async (www: string, znacznik: string): Promise<DoSprawdzenia['naStronie']> => {
  try {
    const odp = await fetch(www, {
      headers: { 'user-agent': 'rejestratory.info/kontrola-ofert' },
      signal: AbortSignal.timeout(15_000),
      cache: 'no-store',
    })
    if (!odp.ok) return 'nie udało się sprawdzić'
    const html = (await odp.text()).toLowerCase()
    return html.includes(znacznik.toLowerCase()) ? 'tak' : 'nie'
  } catch {
    return 'nie udało się sprawdzić'
  }
}

const esc = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const zloty = (kwota: number) => {
  const [calosc, grosze] = kwota.toFixed(2).split('.')
  return `${calosc.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')},${grosze} zł`
}

export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dry = request.nextUrl.searchParams.get('dry') === '1'

  try {
    const dzis = new Date().toISOString().slice(0, 10)

    // oferta wymaga decyzji w dniu wygaśnięcia i każdego kolejnego dnia,
    // dopóki nie zostanie odświeżona albo usunięta z danych
    const wygasle = WSZYSTKIE_OFERTY.filter((o) => o.okres?.do && o.okres.do <= dzis)

    if (!wygasle.length) {
      return NextResponse.json({ ok: true, dzis, doSprawdzenia: 0 })
    }

    const pozycje: DoSprawdzenia[] = []
    for (const o of wygasle) {
      const s = SKLADNICE[o.skladnica]
      const model = o.urzadzenie.nazwa
      const znacznik = znacznikModelu(o.slug)
      pozycje.push({
        slug: o.slug,
        model,
        skladnica: s.nazwa,
        miasto: s.miasto,
        www: o.strona ?? s.www,
        wygasa: o.okres!.do!,
        cenaNetto: o.urzadzenie.cenaNetto,
        plik: o.plik,
        naStronie: znacznik ? await sprawdzStrone(o.strona ?? s.www, znacznik) : 'nie sprawdzano',
      })
    }

    const wiersze = pozycje
      .map(
        (p) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e7e5e4;font-size:14px;">
          <b>${esc(p.model)}</b><br>
          <span style="color:#78716c;font-size:12px;">${esc(p.plik)}</span>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e7e5e4;font-size:14px;">
          ${esc(p.skladnica)}<br>
          <a href="${esc(p.www)}" style="color:#15803d;font-size:12px;">strona składnicy &#8594;</a>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e7e5e4;font-size:14px;white-space:nowrap;">
          ${esc(zloty(p.cenaNetto))} netto
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e7e5e4;font-size:14px;white-space:nowrap;">
          ${esc(p.wygasa)}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e7e5e4;font-size:14px;white-space:nowrap;">
          ${p.naStronie === 'tak' ? 'model nadal na stronie' : p.naStronie === 'nie' ? '<b style="color:#b91c1c;">brak modelu na stronie</b>' : p.naStronie === 'nie sprawdzano' ? 'nie da się sprawdzić automatem' : 'brak odpowiedzi'}
        </td>
      </tr>`,
      )
      .join('')

    const html = `
  <div style="max-width:760px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;color:#1c1917;">
    <h1 style="font-size:18px;margin:0 0 6px;">Oferty składnic do sprawdzenia</h1>
    <p style="margin:0 0 16px;font-size:14px;color:#57534e;">
      ${pozycje.length === 1 ? 'Jedna oferta straciła ważność' : `${pozycje.length} ofert straciło ważność`}.
      Karty produktu nadal pokazują te ceny — trzeba je odświeżyć w danych albo usunąć.
      Ręcznie wpisane oferty siedzą w <code>data/oferty-reczne.ts</code>, wyciągnięte z dokumentów
      w <code>data/oferty-skladnicy.ts</code> (regeneracja: <code>node scripts/parsuj-oferty-zup.mjs</code>).
    </p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e7e5e4;">
      <tr style="background:#f5f5f4;">
        <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#78716c;">Model</th>
        <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#78716c;">Składnica</th>
        <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#78716c;">Cena na karcie</th>
        <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#78716c;">Ważna do</th>
        <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#78716c;">Kontrola strony</th>
      </tr>
      ${wiersze}
    </table>
    <p style="margin:16px 0 0;font-size:13px;">
      ${pozycje.map((p) => `<a href="${SITE}/produkt/${esc(p.slug)}" style="color:#15803d;margin-right:14px;">karta ${esc(p.model)} &#8594;</a>`).join('')}
    </p>
  </div>`

    if (dry) {
      return new NextResponse(html, { headers: { 'content-type': 'text/html; charset=utf-8' } })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: NEWSLETTER_FROM,
      replyTo: NEWSLETTER_REPLY_TO,
      to: NEWSLETTER_TEST_TO,
      subject: `Oferty składnic do sprawdzenia — ${pozycje.length}`,
      html,
    })
    if (error) throw new Error(error.message)

    return NextResponse.json({ ok: true, dzis, doSprawdzenia: pozycje.length, pozycje })
  } catch (e) {
    console.error('[kontrola-ofert]', e)
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
