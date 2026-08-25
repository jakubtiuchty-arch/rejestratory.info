#!/usr/bin/env node
/**
 * Buduje indeks wyszukiwarki z kart produktu i zapisuje `data/wyszukiwarka.ts`.
 *
 * Lista była wpisywana ręcznie w `SearchAutocomplete.tsx` i rozjechała się
 * z katalogiem: brakowało dziesięciu kart (m.in. obu iPhone'ów i obu iPadów),
 * a jeden wpis prowadził na nieistniejący adres. Skoro nazwa i kategoria stoją
 * w karcie, indeks ma się z niej brać sam.
 *
 *   node scripts/indeks-wyszukiwarki.mjs
 *
 * Odpala się automatycznie przed `npm run build` (hook `prebuild`).
 *
 * Słowa kluczowe powstają z nazwy, kategorii i sluga, a do tego dochodzą
 * synonimy z tabeli SYNONIMY — tego, czego w nazwie nie ma, a ludzie tak
 * szukają („ekran” na monitor, „czytnik” na skaner kodów).
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const KARTY = 'app/produkt'
const WYJSCIE = 'data/wyszukiwarka.ts'

/** Kategoria z karty → krótka etykieta pokazywana w podpowiedzi. */
const ETYKIETY = {
  'Rejestratory': 'Rejestrator',
  'Telefony': 'Telefon',
  'Tablety': 'Tablet',
  'Laptopy': 'Laptop',
  'Monitory': 'Monitor',
  'Serwery': 'Serwer',
  'All in One': 'Komputer All in One',
  'Drukarki do rejestratora': 'Drukarka mobilna',
  'Drukarki laserowe': 'Drukarka laserowa',
  'Urządzenia wielofunkcyjne': 'Urządzenie wielofunkcyjne',
  'Urządzenia fiskalne': 'Urządzenie fiskalne',
  'Akcesoria komputerowe': 'Akcesoria komputerowe',
  'Elektroniczne Zarządzanie Dokumentacją': 'EZD',
}

/** Czego ludzie szukają, a czego nie ma w nazwie produktu. */
const SYNONIMY = {
  'Rejestratory': ['rejestrator', 'terminal', 'kolektor', 'android'],
  'Telefony': ['telefon', 'smartfon', 'komórka'],
  'Tablety': ['tablet'],
  'Laptopy': ['laptop', 'notebook', 'komputer przenośny'],
  'Monitory': ['monitor', 'ekran', 'wyświetlacz'],
  'Serwery': ['serwer', 'rack'],
  'All in One': ['all in one', 'aio', 'komputer'],
  'Drukarki do rejestratora': ['drukarka', 'mobilna', 'kwit', 'etykiety'],
  'Drukarki laserowe': ['drukarka', 'laserowa', 'druk'],
  'Urządzenia wielofunkcyjne': ['drukarka', 'skaner', 'kopiarka', 'ksero', 'wielofunkcyjne'],
  'Urządzenia fiskalne': ['fiskalna', 'kasa', 'paragon'],
  'Akcesoria komputerowe': ['akcesoria'],
  'Elektroniczne Zarządzanie Dokumentacją': ['ezd', 'dokumenty', 'kancelaria'],
}

/** Dodatki dla konkretnych kart — tam, gdzie nazwa nie zdradza, czym to jest. */
const SYNONIMY_KARTY = {
  'zebra-ds2208': ['czytnik', 'skaner', 'kody kreskowe'],
  'zebra-ds2278': ['czytnik', 'skaner', 'kody kreskowe', 'bezprzewodowy'],
  'honeywell-1450g': ['czytnik', 'skaner', 'kody kreskowe'],
  'honeywell-1250g': ['czytnik', 'skaner', 'kody kreskowe'],
  'epson-ds730n': ['skaner', 'dokumenty', 'podajnik'],
  'ms-365': ['office', 'word', 'excel', 'licencja', 'oprogramowanie'],
  'vertin-1000': ['ups', 'zasilacz awaryjny', 'podtrzymanie'],
  'vertin-600': ['ups', 'zasilacz awaryjny', 'podtrzymanie'],
  'samsung-ssd-t7': ['dysk', 'ssd', 'zewnętrzny', 'pamięć'],
  'samsung-ssd-t9': ['dysk', 'ssd', 'zewnętrzny', 'pamięć'],
  'podkladka-pod-mysz': ['podkładka', 'mysz'],
  'podnozek-biurowy': ['podnóżek', 'ergonomia'],
  'torba-na-laptopa-15': ['torba', 'laptop'],
  'torba-hp-15': ['torba', 'laptop'],
  'iphone-17-pro': ['iphone', 'apple', 'ios'],
  'iphone-17-pro-max': ['iphone', 'apple', 'ios'],
  'ipad-pro-11-m4-a2837': ['ipad', 'apple', 'ios'],
  'ipad-pro-11-m5-a3358': ['ipad', 'apple', 'ios'],
}

const pole = (tekst, nazwa) =>
  tekst.match(new RegExp(`${nazwa}: '((?:[^'\\\\]|\\\\.)*)'`))?.[1]?.replace(/\\'/g, "'") ?? null

const produkty = []
const bezDanych = []

for (const slug of readdirSync(KARTY).sort()) {
  const plik = join(KARTY, slug, 'page.tsx')
  if (!existsSync(plik)) continue
  const tresc = readFileSync(plik, 'utf8')
  const nazwa = pole(tresc, 'name')
  const kategoria = pole(tresc, 'category')
  if (!nazwa || !kategoria) {
    bezDanych.push(slug)
    continue
  }

  const zNazwy = nazwa
    .toLowerCase()
    .split(/[^a-z0-9ąćęłńóśźż,]+/i)
    .filter((cz) => cz.length >= 2)

  const keywords = [
    ...new Set([
      ...zNazwy,
      ...slug.split('-').filter((cz) => cz.length >= 2),
      ...(SYNONIMY[kategoria] ?? []),
      ...(SYNONIMY_KARTY[slug] ?? []),
    ]),
  ]

  produkty.push({
    name: nazwa,
    category: ETYKIETY[kategoria] ?? kategoria,
    url: `/produkt/${slug}`,
    keywords,
  })
}

produkty.sort((a, b) => a.name.localeCompare(b.name, 'pl'))

writeFileSync(
  WYJSCIE,
  `// PLIK GENEROWANY — nie edytować ręcznie.
// Indeks wyszukiwarki budowany z kart w \`app/produkt/\`.
// Odświeżenie: node scripts/indeks-wyszukiwarki.mjs (odpala się przed \`npm run build\`).

export type PozycjaIndeksu = {
  name: string
  category: string
  url: string
  keywords: string[]
}

export const INDEKS_PRODUKTOW: PozycjaIndeksu[] = ${JSON.stringify(produkty, null, 2)}
`,
)

console.log(`zapisano ${WYJSCIE}: ${produkty.length} produktów`)
if (bezDanych.length) {
  console.log('pominięte (brak name/category w karcie):')
  for (const s of bezDanych) console.log('  ' + s)
}
