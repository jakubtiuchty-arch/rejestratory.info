import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Zwraca urządzenia najczęściej występujące u klientów — ranking liczony na
 * podstawie tego, co faktycznie stoi w nadleśnictwach, a nie z ręcznie wpisanej
 * listy. Źródła: `registrators` (sprzęt terenowy i biurowy) oraz `devices`
 * (urządzenia fiskalne pod opieką serwisową).
 *
 * Zwracane są wyłącznie modele, dla których istnieje karta produktu — inaczej
 * kafelek na stronie głównej prowadziłby donikąd.
 */

export const revalidate = 3600

/** Materiały i dodatki to nie „urządzenie sprzedane do klienta”. */
const AKCESORIA =
  /papier|ta[śs]m|szk[łl]o|folia|etui|kabur|pasek|handstrap|akumulator|bateria|stacja|dokuj|[łl]adowark|zasilacz|kabel|podstawk|czytnik|toner|b[ęe]ben|myszk|klawiatur|torba/i

/** Nazwa z bazy → karta produktu. Klucze porównywane po uproszczeniu. */
const KATALOG: Record<
  string,
  { slug: string; nazwa: string; kategoria: string; opis: string; zdjecie: string }
> = {
  'Zebra ZQ521': {
    slug: 'zebra-zq521',
    nazwa: 'Zebra ZQ521',
    kategoria: 'Drukarka do rejestratora',
    opis: 'Mobilna drukarka 4-calowa do pracy w terenie',
    zdjecie: '/zq521_1.png',
  },
  'Zebra EM45': {
    slug: 'zebra-em45',
    nazwa: 'Zebra EM45',
    kategoria: 'Rejestrator',
    opis: 'Terminal terenowy w obudowie smartfona',
    zdjecie: '/em45_1.webp',
  },
  'Samsung A56': {
    slug: 'samsung-a56',
    nazwa: 'Samsung Galaxy A56',
    kategoria: 'Telefon',
    opis: 'Smartfon służbowy z zapasem pamięci',
    zdjecie: '/a56_1.png',
  },
  'Posnet Temo': {
    slug: 'posnet-temo-online',
    nazwa: 'Posnet Temo Online',
    kategoria: 'Urządzenie fiskalne',
    opis: 'Mobilna drukarka fiskalna do sprzedaży w terenie',
    zdjecie: '/temo_online_1.png',
  },
  'Posnet Pospay': {
    slug: 'posnet-pospay-2',
    nazwa: 'Posnet Pospay 2',
    kategoria: 'Urządzenie fiskalne',
    opis: 'Kasa, drukarka i terminal w jednej obudowie',
    zdjecie: '/pospay_1.png',
  },
  'Zebra TC27': {
    slug: 'zebra-tc27',
    nazwa: 'Zebra TC27',
    kategoria: 'Rejestrator',
    opis: 'Terminal ze skanerem do pracy w terenie',
    zdjecie: '/tc27_1.png',
  },
  'Samsung S25 FE': {
    slug: 'samsung-s25-fe',
    nazwa: 'Samsung Galaxy S25 FE',
    kategoria: 'Telefon',
    opis: 'Smartfon służbowy z dużym ekranem',
    zdjecie: '/s25fe_1.png',
  },
  'Samsung A36': {
    slug: 'samsung-a36',
    nazwa: 'Samsung Galaxy A36',
    kategoria: 'Telefon',
    opis: 'Smartfon służbowy do codziennej pracy',
    zdjecie: '/a36_1.png',
  },
  'Dell Pro 16 Plus': {
    slug: 'dell-pro-16-plus',
    nazwa: 'Dell Pro 16 Plus',
    kategoria: 'Laptop',
    opis: 'Wydajny komputer dla biura leśnika',
    zdjecie: '/dell_16_1.png',
  },
  'Zebra TC58e': {
    slug: 'zebra-tc58e',
    nazwa: 'Zebra TC58e',
    kategoria: 'Rejestrator',
    opis: 'Terminal terenowy z wymienną baterią',
    zdjecie: '/tc58_1.png',
  },
  'Unitech PA768': {
    slug: 'unitech-pa768',
    nazwa: 'Unitech PA768',
    kategoria: 'Rejestrator',
    opis: 'Terminal terenowy z klawiaturą',
    zdjecie: '/pa768_1.png',
  },
  'Seiko MPA40': {
    slug: 'seiko-mpa40',
    nazwa: 'Seiko MP-A40',
    kategoria: 'Drukarka do rejestratora',
    opis: 'Lekka drukarka mobilna do kwitów',
    zdjecie: '/mpa40_1.png',
  },
  'Brother DCP-B7620DW': {
    slug: 'brother-dcp-b7620dw',
    nazwa: 'Brother DCP-B7620DW',
    kategoria: 'Urządzenie wielofunkcyjne',
    opis: 'Kompaktowe urządzenie do kancelarii',
    zdjecie: '/dcpb75620dwph.png',
  },
  'Sewoo LKP43': {
    slug: 'sewoo-lkp43',
    nazwa: 'Sewoo LK-P43',
    kategoria: 'Drukarka do rejestratora',
    opis: 'Mobilna drukarka do wydruków w terenie',
    zdjecie: '/lkp43_1.png',
  },
}

const uprosc = (s: string) => s.toLowerCase().replace(/[\s\-_.+]/g, '')
const KLUCZE = Object.keys(KATALOG).sort((a, b) => b.length - a.length)

const dopasuj = (nazwa: string) => {
  const n = uprosc(nazwa)
  const dokladne = KLUCZE.find((k) => uprosc(k) === n)
  if (dokladne) return dokladne
  return KLUCZE.find((k) => n.includes(uprosc(k))) ?? null
}

export async function GET(request: Request) {
  const ile = Math.min(Number(new URL(request.url).searchParams.get('ile') ?? 3) || 3, 12)

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Supabase oddaje maksymalnie 1000 wierszy na zapytanie — czytamy porcjami
  const STRONA = 1000
  const czytaj = async (tabela: string) => {
    const wiersze: { nazwa: string; klient: string }[] = []
    for (let od = 0; ; od += STRONA) {
      const { data, error } = await sb
        .from(tabela)
        .select('device_name, client_name')
        .range(od, od + STRONA - 1)
      if (error) throw new Error(error.message)
      const paczka = (data ?? []) as { device_name: string | null; client_name: string | null }[]
      wiersze.push(
        ...paczka.map((r) => ({ nazwa: r.device_name ?? '', klient: r.client_name ?? '' }))
      )
      if (paczka.length < STRONA) return wiersze
    }
  }

  let wiersze: { nazwa: string; klient: string }[]
  try {
    const [rejestratory, fiskalne] = await Promise.all([czytaj('registrators'), czytaj('devices')])
    wiersze = [...rejestratory, ...fiskalne]
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }

  const licznik = new Map<string, { sztuk: number; nadlesnictwa: Set<string> }>()
  for (const { nazwa, klient } of wiersze) {
    if (!nazwa || AKCESORIA.test(nazwa)) continue
    const klucz = dopasuj(nazwa)
    if (!klucz) continue
    const wpis = licznik.get(klucz) ?? { sztuk: 0, nadlesnictwa: new Set<string>() }
    wpis.sztuk += 1
    if (klient) wpis.nadlesnictwa.add(klient.trim().toLowerCase())
    licznik.set(klucz, wpis)
  }

  const ranking = [...licznik.entries()]
    .sort((a, b) => b[1].sztuk - a[1].sztuk)
    .slice(0, ile)
    .map(([klucz, dane]) => ({
      ...KATALOG[klucz],
      sztuk: dane.sztuk,
      nadlesnictwa: dane.nadlesnictwa.size,
    }))

  return NextResponse.json({ ranking })
}
