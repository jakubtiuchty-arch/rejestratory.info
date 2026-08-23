#!/usr/bin/env node
/**
 * Liczy karty produktu w każdej kategorii i zapisuje `data/liczby-kategorii.ts`.
 *
 * Kafelki na stronie głównej miały te liczby wpisane ręcznie i rozjechały się
 * z rzeczywistością prawie wszędzie (All in One obiecywał 5 produktów przy
 * jednej karcie, drukarki laserowe 14 przy trzech). Liczba jest pochodną tego,
 * co leży w `app/produkt/`, więc niech się liczy sama.
 *
 *   node scripts/policz-karty.mjs
 *
 * Odpala się automatycznie przed `npm run build` (hook `prebuild`).
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const KARTY = 'app/produkt'
const WYJSCIE = 'data/liczby-kategorii.ts'

const liczby = {}
for (const slug of readdirSync(KARTY)) {
  const plik = join(KARTY, slug, 'page.tsx')
  if (!existsSync(plik)) continue
  const kategoria = readFileSync(plik, 'utf8').match(/categoryHref: '\/kategoria\/([a-z0-9-]+)'/)?.[1]
  if (!kategoria) {
    console.warn(`  ${slug}: brak categoryHref — karta nie trafi do żadnej kategorii`)
    continue
  }
  liczby[kategoria] = (liczby[kategoria] ?? 0) + 1
}

const posortowane = Object.fromEntries(Object.entries(liczby).sort(([a], [b]) => a.localeCompare(b)))

writeFileSync(
  WYJSCIE,
  `// PLIK GENEROWANY — nie edytować ręcznie.
// Liczba kart produktu w kategorii. Odświeżenie: node scripts/policz-karty.mjs
// (odpala się samo przed \`npm run build\`).

export const LICZBY_KATEGORII: Record<string, number> = ${JSON.stringify(posortowane, null, 2)}

/** Ile kart ma kategoria spod danego adresu, np. \`/kategoria/laptopy\`. */
export const ileKart = (categoryHref: string): number =>
  LICZBY_KATEGORII[categoryHref.replace('/kategoria/', '')] ?? 0
`,
)

const suma = Object.values(posortowane).reduce((a, b) => a + b, 0)
console.log(`zapisano ${WYJSCIE}: ${suma} kart w ${Object.keys(posortowane).length} kategoriach`)
for (const [k, v] of Object.entries(posortowane)) console.log(`  ${k.padEnd(28)} ${v}`)
