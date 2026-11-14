#!/usr/bin/env node
/**
 * Buduje dane rozwijanego menu „Produkty” w nagłówku: kategorie, a w każdej jej
 * produkty. Zapisuje `data/menu-produktow.ts`.
 *
 * Nazwa i kategoria produktu pochodzą z karty w `app/produkt/` (pola `name`
 * i `categoryHref`). Kolejność produktów jest taka jak na stronie kategorii
 * (pierwsze wystąpienie `/produkt/<slug>` w jej pliku). Karty, których strona
 * kategorii nie wymienia, idą na koniec alfabetycznie.
 *
 *   node scripts/menu-produktow.mjs
 *
 * Odpala się automatycznie przed `npm run build` (hook `prebuild`).
 *
 * Polecany produkt kategorii (karta w stylu x-kom po prawej stronie menu) to
 * wpis w POLECANE; jego zdjęcie, opis i trzy pierwsze wyróżnienia też idą
 * z karty, a cena „od” to najniższa cena netto ze składnic (data/oferty-*.ts).
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const KARTY = 'app/produkt'
const WYJSCIE = 'data/menu-produktow.ts'

/** Kolejność i nazwy jak w kafelkach kategorii na stronie głównej. */
const KATEGORIE = [
  ['rejestratory', 'Rejestratory'],
  ['telefony', 'Telefony'],
  ['tablety', 'Tablety'],
  ['laptopy', 'Laptopy'],
  ['urzadzenia-wielofunkcyjne', 'Urządzenia wielofunkcyjne'],
  ['monitory', 'Monitory'],
  ['drukarki-do-rejestratora', 'Drukarki do rejestratora'],
  ['drukarki-laserowe', 'Drukarki laserowe'],
  ['all-in-one', 'All in One'],
  ['ezd', 'Zarządzanie dokumentacją (EZD)'],
  ['urzadzenia-fiskalne', 'Urządzenia fiskalne'],
  ['akcesoria-komputerowe', 'Akcesoria komputerowe'],
  ['wideokonferencje', 'Wideokonferencje'],
]

/**
 * Polecany produkt w kategorii: slug karty i lekka miniatura do menu (zdjęcia
 * kart mają po kilka tysięcy pikseli; miniatura to ok. 300 × 640, przezroczyste tło).
 * Na razie tylko rejestratory (prośba Jakuba 14.11.2026: polecany EM45).
 */
const POLECANE = {
  rejestratory: { slug: 'zebra-em45', zdjecie: '/menu/polecany-zebra-em45.webp' },
}

/**
 * Najniższa cena netto modelu ze składnic. Pliki ofert to TypeScript, więc bez
 * importu: generowane mają tablicę w JSON, ręczne czytamy wyrażeniem regularnym.
 * Wpis ręczny wygrywa z generowanym w tej samej składnicy (jak w data/oferty.ts).
 */
const cenyOd = (() => {
  const zJson = (plik) => {
    const t = readFileSync(plik, 'utf8')
    const start = t.indexOf('= [', t.indexOf('OfertaSkladnicy[] =')) + 2
    let glebokosc = 0
    for (let i = start; i < t.length; i++) {
      if (t[i] === '[') glebokosc++
      else if (t[i] === ']' && --glebokosc === 0) {
        try {
          return JSON.parse(t.slice(start, i + 1))
        } catch {
          break
        }
      }
    }
    console.warn(`  UWAGA: nie udało się odczytać ofert z ${plik} — polecany bez ceny`)
    return []
  }
  const reczne = [...readFileSync('data/oferty-reczne.ts', 'utf8').matchAll(
    /slug: '([^']+)',\s*skladnica: '([^']+)'[\s\S]*?cenaNetto: ([\d.]+)/g,
  )].map(([, slug, skladnica, cena]) => ({ slug, skladnica, urzadzenie: { cenaNetto: Number(cena) } }))
  const klucz = (o) => `${o.slug}::${o.skladnica}`
  const recznieKlucze = new Set(reczne.map(klucz))
  const wszystkie = [
    ...reczne,
    ...zJson('data/oferty-zpuh-olsztyn.ts').filter((o) => !recznieKlucze.has(klucz(o))),
    ...zJson('data/oferty-skladnicy.ts').filter((o) => !recznieKlucze.has(klucz(o))),
  ]
  return (slug) => {
    const kwoty = wszystkie.filter((o) => o.slug === slug).map((o) => o.urzadzenie.cenaNetto)
    return kwoty.length ? Math.min(...kwoty) : null
  }
})()

const pole = (tekst, nazwa) =>
  tekst.match(new RegExp(`${nazwa}: '((?:[^'\\\\]|\\\\.)*)'`))?.[1]?.replace(/\\'/g, "'") ?? null

/** Plik strony kategorii; rejestratory obsługuje trasa dynamiczna. */
const plikKategorii = (slug) => {
  const wlasny = join('app/kategoria', slug, 'page.tsx')
  return existsSync(wlasny) ? wlasny : join('app/kategoria/[category]/page.tsx')
}

const wKategorii = Object.fromEntries(KATEGORIE.map(([slug]) => [slug, []]))
const pominiete = []
const polecane = {}

for (const slug of readdirSync(KARTY)) {
  const plik = join(KARTY, slug, 'page.tsx')
  if (!existsSync(plik)) continue
  const tresc = readFileSync(plik, 'utf8')
  const nazwa = pole(tresc, 'name')
  const kategoria = tresc.match(/categoryHref: '\/kategoria\/([a-z0-9-]+)'/)?.[1]
  if (!nazwa || !kategoria || !wKategorii[kategoria]) {
    pominiete.push(`${slug} (${kategoria ?? 'brak categoryHref'})`)
    continue
  }
  wKategorii[kategoria].push({ name: nazwa, slug })
  if (POLECANE[kategoria]?.slug === slug) {
    const blokCech = tresc.match(/highlights: \[([\s\S]*?)\n  \]/)?.[1] ?? ''
    polecane[kategoria] = {
      name: nazwa,
      href: `/produkt/${slug}`,
      image: POLECANE[kategoria].zdjecie ?? tresc.match(/images: \['([^']+)'/)?.[1] ?? null,
      opis: pole(tresc, 'description'),
      cechy: [...blokCech.matchAll(/value: '((?:[^'\\]|\\.)*)'/g)].slice(0, 3).map((m) => m[1].replace(/\\'/g, "'")),
      cenaOd: cenyOd(slug),
    }
  }
}

const kategorie = KATEGORIE.map(([slug, name]) => {
  const strona = readFileSync(plikKategorii(slug), 'utf8')
  const pozycja = (s) => {
    const i = strona.indexOf(`/produkt/${s}"`) >= 0 ? strona.indexOf(`/produkt/${s}"`) : strona.indexOf(`/produkt/${s}'`)
    return i < 0 ? Infinity : i
  }
  const produkty = wKategorii[slug]
    .sort((a, b) => pozycja(a.slug) - pozycja(b.slug) || a.name.localeCompare(b.name, 'pl'))
    .map(({ name, slug: s }) => ({ name, href: `/produkt/${s}` }))
  return { slug, name, href: `/kategoria/${slug}`, produkty, ...(polecane[slug] ? { polecany: polecane[slug] } : {}) }
}).filter((k) => k.produkty.length > 0)

writeFileSync(
  WYJSCIE,
  `// PLIK GENEROWANY — nie edytować ręcznie.
// Menu „Produkty” w nagłówku: kategorie i ich produkty z kart w \`app/produkt/\`.
// Odświeżenie: node scripts/menu-produktow.mjs (odpala się przed \`npm run build\`).

export type ProduktMenu = { name: string; href: string }
export type PolecanyMenu = {
  name: string
  href: string
  image: string | null
  opis: string | null
  cechy: string[]
  /** najniższa cena netto ze składnic, null gdy model jest wyceniany indywidualnie */
  cenaOd: number | null
}
export type KategoriaMenu = {
  slug: string
  name: string
  href: string
  produkty: ProduktMenu[]
  polecany?: PolecanyMenu
}

export const MENU_PRODUKTOW: KategoriaMenu[] = ${JSON.stringify(kategorie, null, 2)}
`,
)

const suma = kategorie.reduce((a, k) => a + k.produkty.length, 0)
console.log(`zapisano ${WYJSCIE}: ${suma} produktów w ${kategorie.length} kategoriach`)
for (const [k, p] of Object.entries(polecane)) console.log(`polecany w ${k}: ${p.name}, od ${p.cenaOd} zł netto`)
for (const [k, s] of Object.entries(POLECANE)) if (!polecane[k]) console.warn(`  UWAGA: polecany ${s.slug} w ${k} — brak karty w tej kategorii`)
if (pominiete.length) {
  console.log('pominięte:')
  for (const s of pominiete) console.log('  ' + s)
}
