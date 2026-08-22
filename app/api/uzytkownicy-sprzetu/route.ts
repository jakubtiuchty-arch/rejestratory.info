import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Zwraca listę nadleśnictw, które kupiły dane urządzenie.
 * Źródła są dwa: `sales_products` z panelu handlowego (sprzedaż) oraz `devices`
 * z modułu przeglądów (urządzenia fiskalne pod opieką serwisową — tam sprzedaż
 * nie jest rejestrowana, a mimo to sprzęt stoi u klienta). Nazwy modeli w bazie
 * bywają zapisane inaczej niż na karcie produktu („Sewoo LKP43” vs
 * „Sewoo LK-P43”), dlatego dopasowanie idzie po nazwie znormalizowanej: bez
 * spacji, myślników i wielkości liter.
 */

export const revalidate = 3600

/** Pozycje, które są materiałem lub dodatkiem do urządzenia, a nie samym urządzeniem. */
const AKCESORIA =
  /papier|etykiet|ta[śs]m|toner|b[ęe]ben|szk[łl]o|folia|pasek|handstrap|akumulator|bateria|stacja|dok|torba|etui|kabur|czytnik|podstawk|kabel|[łl]adowark|zasilacz|myszk|klawiatur/i

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[\s\-_.]/g, '')
    .replace(/[^a-z0-9ąćęłńóśźż]/g, '')

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const device = params.get('device')?.trim()
  // np. karta „Dell Pro 16” musi odsiać sprzedaż modelu „Dell Pro 16 Plus”
  const exclude = (params.get('exclude') ?? '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean)
  if (!device) {
    return NextResponse.json({ error: 'Brak parametru device' }, { status: 400 })
  }

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Supabase twardo obcina odpowiedź do 1000 wierszy — ani `.limit()`, ani jeden
  // szeroki `.range()` tego nie omijają. Tabele mają ~1,3 tys. pozycji, więc
  // czytamy je porcjami, inaczej co czwarte nadleśnictwo znika z listy.
  const STRONA = 1000
  const pobierzWszystko = async (tabela: string, kolumna: string) => {
    const wiersze: { device_type: string | null; client_name: string | null }[] = []
    for (let od = 0; ; od += STRONA) {
      const { data, error } = await sb
        .from(tabela)
        .select(`${kolumna}, client_name`)
        .range(od, od + STRONA - 1)
      if (error) throw new Error(error.message)
      const paczka = (data ?? []) as unknown as Record<string, string | null>[]
      wiersze.push(
        ...paczka.map((r) => ({ device_type: r[kolumna], client_name: r.client_name }))
      )
      if (paczka.length < STRONA) return wiersze
    }
  }

  let sprzedaz: { device_type: string | null; client_name: string | null }[]
  let przeglady: { device_type: string | null; client_name: string | null }[]
  try {
    ;[sprzedaz, przeglady] = await Promise.all([
      pobierzWszystko('sales_products', 'device_type'),
      pobierzWszystko('devices', 'device_name'),
    ])
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }

  const data = [...sprzedaz, ...przeglady]

  const wanted = normalize(device)
  const wykluczone = exclude.map(normalize)
  const seen = new Map<string, string>() // nazwa znormalizowana -> nazwa wyświetlana

  for (const row of data ?? []) {
    const type = normalize(row.device_type ?? '')
    // pomijamy materiały eksploatacyjne („papier termiczny do drukarki …”)
    if (AKCESORIA.test(row.device_type ?? '')) continue
    if (wykluczone.some((w) => type.includes(w))) continue
    // dopasowanie odwrotne tylko dla sensownie długich nazw, żeby „iPad” nie łapał wszystkiego
    const pasuje = type.includes(wanted) || (type.length >= 6 && wanted.includes(type))
    if (!pasuje) continue

    const client = (row.client_name ?? '').trim()
    if (!client) continue
    const key = normalize(client)
    if (!seen.has(key)) seen.set(key, client)
  }

  const nadlesnictwa = [...seen.values()]
    .map((n) => n.replace(/^nadleśnictwo\s+/i, '').trim())
    .map((n) =>
      n
        .toLowerCase()
        .split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    )
    .sort((a, b) => a.localeCompare(b, 'pl'))

  return NextResponse.json({ device, count: nadlesnictwa.length, nadlesnictwa })
}
