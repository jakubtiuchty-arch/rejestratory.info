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

const pole = (tekst, nazwa) =>
  tekst.match(new RegExp(`${nazwa}: '((?:[^'\\\\]|\\\\.)*)'`))?.[1]?.replace(/\\'/g, "'") ?? null

/** Plik strony kategorii; rejestratory obsługuje trasa dynamiczna. */
const plikKategorii = (slug) => {
  const wlasny = join('app/kategoria', slug, 'page.tsx')
  return existsSync(wlasny) ? wlasny : join('app/kategoria/[category]/page.tsx')
}

const wKategorii = Object.fromEntries(KATEGORIE.map(([slug]) => [slug, []]))
const pominiete = []

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
  return { slug, name, href: `/kategoria/${slug}`, produkty }
}).filter((k) => k.produkty.length > 0)

writeFileSync(
  WYJSCIE,
  `// PLIK GENEROWANY — nie edytować ręcznie.
// Menu „Produkty” w nagłówku: kategorie i ich produkty z kart w \`app/produkt/\`.
// Odświeżenie: node scripts/menu-produktow.mjs (odpala się przed \`npm run build\`).

export type ProduktMenu = { name: string; href: string }
export type KategoriaMenu = { slug: string; name: string; href: string; produkty: ProduktMenu[] }

export const MENU_PRODUKTOW: KategoriaMenu[] = ${JSON.stringify(kategorie, null, 2)}
`,
)

const suma = kategorie.reduce((a, k) => a + k.produkty.length, 0)
console.log(`zapisano ${WYJSCIE}: ${suma} produktów w ${kategorie.length} kategoriach`)
if (pominiete.length) {
  console.log('pominięte:')
  for (const s of pominiete) console.log('  ' + s)
}
