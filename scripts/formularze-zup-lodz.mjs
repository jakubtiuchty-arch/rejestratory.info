#!/usr/bin/env node
/**
 * Formularze zamówienia ZUP Łódź — po jednym PDF na każdą ofertę z cennika,
 * w układzie formularza Zebra EM45 (zielony pas, „Zamawiający / Dostawca”,
 * karta urządzenia, tabela wyposażenia, warunki, podpis). Pola wypełnia się
 * z klawiatury.
 *
 *   node scripts/formularze-zup-lodz.mjs                 # wszystkie oferty
 *   node scripts/formularze-zup-lodz.mjs zebra-tc27 …    # wybrane slugi
 *   node scripts/formularze-zup-lodz.mjs --html-do <katalog>   # zostaw HTML robocze
 *
 * Skąd dane — nic nie jest wpisywane tutaj z ręki poza poprawkami literówek:
 *   ceny, okres, promocje, wyposażenie  → data/oferty-skladnicy.ts
 *   opis urządzenia i dostawca          → formularze-zrodla/zup-lodz-opisy.json
 *   nazwa, zdjęcie, kategoria           → karta produktu app/produkt/<slug>/page.tsx
 *
 * Wynik: public/formularze/zup-lodz/<kategoria>/zup-lodz-<slug>.pdf. Druk do PDF i pola robi
 * scripts/formularz-pdf.py (ten sam, co przy formularzach ZPUH Olsztyn).
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, mkdtempSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const w = (...p) => path.join(ROOT, ...p)

const POMIJANE = []

/* ───────────────────────── dane wejściowe ───────────────────────── */

const ts = readFileSync(w('data/oferty-skladnicy.ts'), 'utf8')
const OFERTY = JSON.parse(ts.match(/OFERTY_SKLADNICY: OfertaSkladnicy\[\] = (\[[\s\S]*?\n\])/)[1]).filter(
  (o) => o.skladnica === 'zup-lodz' && !POMIJANE.includes(o.slug),
)

const PLIKI = Object.fromEntries(readdirSync(w('oferty-zrodla')).map((n) => [n.normalize('NFC'), n]))
const encje = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
const tekstXml = (x) => [...x.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)].map((m) => m[1]).join('')
const naKwote = (t) => {
  const m = t.match(/(\d[\d .]*),\s*(\d{2}|-)/)
  return m ? Number(m[1].replace(/[ .]/g, '')) + (m[2] === '-' ? 0 : Number(m[2]) / 100) : null
}

const wierszeDocx = {}
/** Wiersze wszystkich tabel dokumentu: komórki jako listy akapitów z flagą pogrubienia i punktora. */
function wiersze(plik) {
  return (wierszeDocx[plik] ??= (() => {
    const xml = execFileSync('unzip', ['-p', w('oferty-zrodla', PLIKI[plik.normalize('NFC')]), 'word/document.xml'], {
      encoding: 'utf8',
      maxBuffer: 1 << 26,
    })
    return [...xml.matchAll(/<w:tr[ >][\s\S]*?<\/w:tr>/g)].map((r) =>
      [...r[0].matchAll(/<w:tc>[\s\S]*?<\/w:tc>/g)].map((c) =>
        [...c[0].matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)]
          .map((p) => ({
            t: encje(tekstXml(p[0])).replace(/\s+/g, ' ').trim(),
            b: /<w:b\/>|<w:b /.test(p[0]),
            li: /<w:numPr>/.test(p[0]),
          }))
          .filter((l) => l.t),
      ),
    )
  })())
}

/** Komórka urządzenia: wiersz z tą samą ceną, a przy kilku — ten z linkiem do karty. */
function komorkaUrzadzenia(o) {
  const kandydaci = wiersze(o.plik).filter(
    (k) => k.length >= 2 && naKwote(k[1].map((l) => l.t).join(' ')) === o.urzadzenie.cenaNetto,
  )
  const zLinkiem = kandydaci.filter((k) => k[0].some((l) => l.t.includes(`/produkt/${o.slug}`)))
  const wybrane = zLinkiem.length ? zLinkiem : kandydaci
  if (wybrane.length !== 1) throw new Error(`${o.slug}: ${wybrane.length} wierszy z ceną urządzenia w „${o.plik}”`)
  return wybrane[0][0]
}

function karta(slug) {
  const src = readFileSync(w('app/produkt', slug, 'page.tsx'), 'utf8')
  const pole = (re) => src.match(re)?.[1] ?? null
  return {
    nazwa: pole(/^\s{2}name:\s*'([^']+)'/m),
    kategoria: pole(/^\s{2}category:\s*'([^']+)'/m),
    zdjecie: pole(/^\s{2}images:\s*\[\s*'([^']+)'/m),
    parametry: pole(/specifications:\s*\n?\s*'([^']+)'/),
  }
}

/* ───────────────────────── redakcja tekstu ───────────────────────── */

/** Literówki z dokumentów składnicy. Sens i wartości zostają, poza oczywistymi pomyłkami zapisu. */
const LITEROWKI = [
  [/akywną/g, 'aktywną'],
  [/Rozdzilczość/g, 'Rozdzielczość'],
  [/Dispaly|Dispay/g, 'Display'],
  [/upstrea\b/g, 'upstream'],
  [/beztreminowa licencją/g, 'bezterminową licencją'],
  [/przewod\b/g, 'przewód'],
  [/zapobiegajaca/g, 'zapobiegającą'],
  [/podójny/g, 'podwójny'],
  [/pdstawą/g, 'podstawą'],
  [/x\s*11440/g, 'x 1440'],
  [/mozliwością ugrade do v\.\s*/g, "możliwością upgrade'u do v. "],
  [/UCB-C/g, 'USB-C'],
  [/caps look/g, 'Caps Lock'],
  [/skory człowieka/g, 'skóry człowieka'],
  [/redukcja hałasu/g, 'redukcją hałasu'],
  [/\bi i\b/g, 'i'],
  [/rolka przewijającą/g, 'rolką przewijającą'],
  [/\bbluetooth\b/g, 'Bluetooth'],
  [/Pass Trought/g, 'Pass Through'],
  [/470 x 350 cm/g, '470 x 350 mm'],
  [/67””/g, '6,7”'],
  [/BEZ SYSTEMU/g, 'bez systemu operacyjnego'],
  [/szkoło/g, 'szkło'],
  [/\+kabel/g, '+ kabel'],
  [/\(3 letni\)/g, '(3-letni)'],
  [/pojedyń\. akumulatora w wersji std i rozszerz\./g, 'pojedynczego akumulatora w wersji standardowej i rozszerzonej'],
  [/(\d) st$/g, '$1 stron'],
  [/Stacja dokująca służąca z osłoną/g, 'Stacja dokująca z osłoną'],
  [/jedynie od ładowania/g, 'jedynie do ładowania'],
  [/Powiększania do A4/g, 'Powiększanie do A4'],
  [/str\/m$/g, 'str./min'],
  [/w mono o kolorze/g, 'w mono i kolorze'],
  [/Ryzen5/g, 'Ryzen 5'],
  [/WiFi 6E160 MHz/g, 'WiFi 6E 160 MHz'],
  [/\bWiFi\b/g, 'Wi-Fi'],
  [/, Moduł/g, ', moduł'],
  [/Core™ i3 3 100U/g, 'Core™ 3 100U'],
  [/^Wskaźniki Wymiary max \(szer\. X gł\. X wys\.\)/, 'Wymiary max (szer. × gł. × wys.)'],
  [/^Akumulator, kontrola kanałów$/, 'Wskaźniki: akumulator, kontrola kanałów'],
  [/klasyczna instalacyjną/g, 'klasyczną instalacyjną'],
  [/aktualizowana na bieżąco/g, 'aktualizowaną na bieżąco'],
  [/MAC zawierająca/g, 'MAC, zawierającą'],
  [/od 20 x 20 i 22 x 22 cm/g, 'od 20 x 20 do 22 x 22 cm'],
  [/tablety z android\b/g, 'tablety z Androidem'],
  [/ciemno szary/g, 'ciemnoszary'],
  [/Pełnowymiarowa układ 3 strefowy/i, 'pełnowymiarowa, układ 3-strefowy'],
  [/1440 QHD przy/g, '1440 przy'],
  [/3,8” kolor$/g, '3,8”'],
  [/do 24 strony na minutę/g, 'do 24 stron na minutę'],
  [/stron \/minuta/g, 'stron/minuta'],
  [/W zestawie: Mysz/g, 'W zestawie: mysz'],
  [/: TAK$/g, ': tak'],
  [/USB-C downstream 15W\),USB3\.2Gen1/g, 'USB-C downstream (15 W), USB 3.2 Gen 1'],
  [/RJ45port/g, 'RJ45'],
  [/typA do TypB/g, 'typ A do typ B'],
  [/USB2\.0\. 1xnanoSIM, 1xeSIM/g, 'USB 2.0, 1 × nanoSIM, 1 × eSIM'],
  [/Bluetooth 5,3/g, 'Bluetooth 5.3'],
  [/góra\/dół - -5/g, 'góra/dół: −5'],
]

/** Wartości, w których dokument składnicy przeczy sam sobie albo karcie produktu — idziemy za kartą. */
const SPROSTOWANIA = {
  // nazwa pozycji w dokumencie mówi „8/128GB”, lista pod nią „RAM 6 GB”
  'samsung-s25-fe': [[/Pamięć RAM 6 GB/, 'Pamięć RAM 8 GB']],
  // XCover6 Pro ma 6 GB RAM (karta produktu, specyfikacja Samsunga); dokument podaje 4 GB
  'samsung-xcover7': [[/Pamięć RAM 4 GB/, 'Pamięć RAM 6 GB']],
}

function popraw(t) {
  for (const [z, na] of LITEROWKI) t = t.replace(z, na)
  return (
    t
      // cale: 5.5” / 16’’ / 6.7" → 5,5″
      .replace(/(\d+)(?:[.,](\d+))?\s*(?:”|’’|''|"|″)/g, (_, a, b) => `${a}${b ? `,${b}` : ''}″`)
      .replace(/(\d)(GB|TB|mAh|Wh|Hz|GHz|Mbps|Gbps|mm|cm|kg|dpi|W|g|m)\b/g, '$1 $2')
      .replace(/(\d)(str\.)/g, '$1 $2')
      .replace(/(\d)\.(\d) (GHz|m)\b/g, '$1,$2 $3')
      .replace(/(USB|HDMI|HDCP|Port)(\d)/g, '$1 $2')
      .replace(/(\d)(typ)\b/g, '$1 $2')
      .replace(/(\d)Gen\s*(\d)/g, '$1 Gen $2')
      .replace(/([\p{L}\d])\(/gu, '$1 (')
      .replace(/\bv\.(\d)/g, 'v. $1')
      .replace(/(\d)\s*[xX]\s*(?=\d)/g, '$1 × ')
      .replace(/^(\d+)\s*[xX]\s*(?=[A-Za-z(])/, '$1 × ')
      .replace(/(\d)\*/g, '$1°')
      .replace(/\bmin\.(?=[\p{L}\d])/gu, 'min. ')
      .replace(/Gen (\d) × (\d)/g, 'Gen $1x$2')
      .replace(/\s+([,;.])/g, '$1')
      .replace(/\(\s+/g, '(')
      .replace(/\s+\)/g, ')')
      .replace(/\s+-\s+/g, ' – ')
      .replace(/(\S)–\s/g, '$1 – ')
      .replace(/\s+/g, ' ')
      .trim()
  )
}

const punkt = (t) => {
  t = popraw(t.replace(/^[-–—•*]\s*/, '')).replace(/[;,]$/, '')
  return t ? t[0].toUpperCase() + t.slice(1) : t
}

const URL_RE = /https?:\/\/\S+/
const DOSTAWCA_RE = /^(?:Dostawa|Dostawca)\b.*?\b(TAKMA\s*\/\s*SCANTER|TAKMA|SCANTER)\s*$/i
const PORT_RE = /^(?:\d+\s*[xX×]|HDCP|HUB USB)/

/**
 * Komórka urządzenia → lista punktów. Pierwsze linie to nazwa pozycji (pomijana,
 * bo tytuł bierzemy z karty), linki i nota o dostawcy wypadają z listy, „UWAGA”
 * idzie do ramki pod tabelą. Nagłówki („Złącza:”, „1. KLAWIATURA”) zbierają
 * pod sobą podpunkty, tak jak „Wbudowane porty” w formularzu EM45.
 */
function opisZDokumentu(linie, slug) {
  let dostawca = null
  let nota = null
  const tresc = []
  let poNazwie = false
  for (const [i, l] of linie.entries()) {
    const d = l.t.match(DOSTAWCA_RE)
    if (d) {
      dostawca = d[1].replace(/\s*\/\s*/, ' / ').toUpperCase()
      continue
    }
    if (/^UWAGA\b/i.test(l.t)) {
      nota = l.t.replace(/^UWAGA\s*[–—-]?\s*/i, '')
      continue
    }
    if (URL_RE.test(l.t)) {
      poNazwie = true
      continue
    }
    if (!poNazwie) {
      const nazwaDalej =
        i === 1 && l.b && !l.li && !/^[-–•\d]/.test(l.t) && !/:/.test(l.t) && l.t.length < 75 && !JEDNA_LINIA_NAZWY.includes(slug)
      if (i === 0 || nazwaDalej) continue
      poNazwie = true
    }
    tresc.push(l)
  }

  // zdanie rozbite w Wordzie na dwa akapity: „(NPU z 13 TOPS, 14 rdzeni, do” + „5,0 GHz)”
  const sklejone = []
  for (const l of tresc) {
    const p = sklejone[sklejone.length - 1]
    if (p && (p.t.match(/\(/g) ?? []).length > (p.t.match(/\)/g) ?? []).length) p.t += ` ${l.t}`
    else sklejone.push({ ...l })
  }

  const wytluszczone = sklejone.filter((l) => l.b).length
  const wyroznij = wytluszczone > 0 && wytluszczone <= sklejone.length / 3

  const punkty = []
  let naglowek = null // { p, tryb: 'porty' | 'sekcja' }
  for (const l of sklejone) {
    const sekcja = /^\d+\.\s+\p{Lu}[\p{Lu} ]+$/u.test(l.t)
    const otwiera = sekcja || /^[-–•]?\s*(Złącza|Wyposażona w porty min\.|Wbudowane porty)\s*:?\s*$/i.test(l.t)
    if (otwiera) {
      const p = { t: punkt(sekcja ? l.t.replace(/^\d+\.\s+/, '') : l.t.replace(/:?\s*$/, ':')), b: sekcja, pod: [] }
      if (sekcja) p.t = p.t[0] + p.t.slice(1).toLowerCase()
      punkty.push(p)
      naglowek = { p, tryb: sekcja ? 'sekcja' : 'porty' }
      continue
    }
    if (naglowek && (naglowek.tryb === 'sekcja' || PORT_RE.test(l.t.replace(/^[-–•]\s*/, '')))) {
      naglowek.p.pod.push(punkt(l.t))
      continue
    }
    naglowek = null
    punkty.push({ t: punkt(l.t), b: wyroznij && l.b && l.li, pod: [] })
  }
  return { punkty: punkty.filter((p) => p.t && !/^Wydajność 2 TB$/.test(p.t)), nota: nota && popraw(nota), dostawca }
}

/** Druga pogrubiona linia komórki jest tu już parametrem, nie dalszym ciągiem nazwy. */
const JEDNA_LINIA_NAZWY = ['hp-460']

/* ───────────────────────── nazewnictwo ───────────────────────── */

/** kategoria karty → [etykieta w zielonym pasie, rodzaj urządzenia w tytule pozycji i podtytule, folder w public/formularze/zup-lodz/] */
const RODZAJE = {
  Rejestratory: ['Rejestrator leśniczego', 'Mobilny komputer dotykowy', 'rejestratory'],
  Telefony: ['Rejestrator leśniczego', 'Mobilny komputer dotykowy', 'rejestratory'],
  Tablety: ['Tablet', 'Wzmocniony tablet', 'tablety'],
  'Drukarki do rejestratora': ['Drukarka mobilna', 'Drukarka mobilna', 'drukarki-mobilne'],
  'Drukarki laserowe': ['Drukarka', 'Drukarka laserowa', 'drukarki-i-urzadzenia-wielofunkcyjne'],
  'Urządzenia wielofunkcyjne': ['Urządzenie wielofunkcyjne', 'Urządzenie wielofunkcyjne', 'drukarki-i-urzadzenia-wielofunkcyjne'],
  Laptopy: ['Laptop', 'Laptop', 'laptopy-i-komputery'],
  'All in One': ['Komputer all-in-one', 'Komputer all-in-one', 'laptopy-i-komputery'],
  Monitory: ['Monitor', 'Monitor', 'monitory'],
  'Elektroniczne Zarządzanie Dokumentacją': ['Sprzęt do EZD', null, 'sprzet-do-ezd'],
  'Urządzenia fiskalne': ['Drukarka fiskalna', 'Drukarka fiskalna', 'drukarki-mobilne'],
  'Akcesoria komputerowe': ['Akcesoria komputerowe', null, 'akcesoria-komputerowe'],
}

/** Wyjątki: rodzaj (wtedy tytuł = rodzaj + nazwa z karty) albo cały tytuł pozycji. */
const WYJATKI = {
  'brother-dcp-b7620dw': { etykieta: 'Urządzenie wielofunkcyjne', rodzaj: 'Urządzenie wielofunkcyjne' },
  'aio-dell-pro-24': { tytul: 'Komputer all-in-one Dell Pro 24 z systemem operacyjnym' },
  'aio-dell-pro-24-bez-systemu': { tytul: 'Komputer all-in-one Dell Pro 24 bez systemu operacyjnego' },
  'dell-pro-16': { tytul: 'Laptop Dell Pro 16 bez systemu operacyjnego' },
  'epson-ds730n': { rodzaj: 'Skaner dokumentów' },
  'honeywell-1250g': { rodzaj: 'Czytnik kodów kreskowych', dopisz: ['W zestawie kabel USB i podstawka'] },
  'honeywell-1450g': { rodzaj: 'Czytnik kodów kreskowych', dopisz: ['W zestawie kabel USB i podstawka'] },
  'zebra-ds2208': { rodzaj: 'Czytnik kodów kreskowych', dopisz: ['W zestawie kabel USB i podstawka'] },
  'zebra-ds2278': { rodzaj: 'Czytnik kodów kreskowych', dopisz: ['W zestawie kabel USB i podstawka'] },
  // ZUP sprzedaje od 23.09.2026 następcę opisanego na karcie XCover6 Pro (decyzja Jakuba z 12.11.2026).
  // Dokument ZUP ma przy nim akumulator 4050 mAh przepisany z poprzednika — XCover7 Pro ma 4350 mAh
  // (Samsung). Zdjęcie z karty pokazuje XCover6 Pro, więc formularz idzie bez zdjęcia.
  'samsung-xcover7': {
    nazwa: 'Samsung Galaxy XCover7 Pro',
    bezZdjecia: true,
    zamianyDodatkow: [[/4050 mAh/, '4350 mAh']],
  },
  'honeywell-pc42e-t': { rodzaj: 'Drukarka etykiet' },
  'honeywell-pc45t': { rodzaj: 'Drukarka etykiet' },
  'zebra-zd421c': { rodzaj: 'Drukarka etykiet' },
  'dell-km5221': { rodzaj: 'Klawiatura i mysz bezprzewodowa' },
  'dell-km7321': { rodzaj: 'Klawiatura i mysz bezprzewodowa' },
  'hp-460': { tytul: 'Klawiatura bezprzewodowa HP 460 Multi-device', rodzaj: 'Klawiatura bezprzewodowa' },
  'hp-655': { tytul: 'Klawiatura i mysz bezprzewodowa HP 655', rodzaj: 'Klawiatura i mysz bezprzewodowa' },
  'hp-715': { tytul: 'Mysz bezprzewodowa HP 715', rodzaj: 'Mysz bezprzewodowa' },
  'ms-365': { tytul: 'Microsoft 365 Business Standard', rodzaj: 'Pakiet biurowy' },
  'podkladka-pod-mysz': { tytul: 'Podkładka pod mysz', rodzaj: 'Akcesoria komputerowe' },
  'podnozek-biurowy': { tytul: 'Podnóżek biurowy do pracy przy komputerze', rodzaj: 'Akcesoria komputerowe' },
  'samsung-ssd-t7': { rodzaj: 'Dysk zewnętrzny' },
  'samsung-ssd-t9': { rodzaj: 'Dysk zewnętrzny' },
  'torba-hp-15': { tytul: 'Torba HP do laptopów 15,6″', rodzaj: 'Torba na laptopa' },
  'torba-na-laptopa-15': { tytul: 'Torba na laptopa 15,6″', rodzaj: 'Torba na laptopa' },
}

/**
 * Opisy urządzeń: lista punktów, dostawca i ewentualna nota pod tabelą.
 *
 * Od 12.11.2026 to jest źródło opisów — ZUP publikuje oferty jako PDF, więc
 * komórki z Worda nie da się już czytać przy każdej budowie. Wpisy powstały
 * z dokumentów .docx (po redakcji literówek), a nowe modele są przepisane
 * z PDF-ów ze strony składnicy. Oferta bez wpisu idzie starą ścieżką przez
 * .docx z oferty-zrodla/, o ile jej `plik` jeszcze tam leży.
 */
const OPISY = JSON.parse(readFileSync(w('formularze-zrodla/zup-lodz-opisy.json'), 'utf8'))

function nazwaDodatku(nazwa, nazwaKarty) {
  return popraw(nazwa)
    .replace(/\s+do\s+(?:ZEBRA|HONEYWELL|UNITECH|M3\.Mobile)\s+\S+$/i, ` do ${nazwaKarty}`)
    .replace(/\s*([–-])\s*(\d)/, ' – $2')
    .replace(/,\s+–/, ' –')
    .replace(/(\p{L})–/u, '$1 –')
}

/* ───────────────────────── model formularza ───────────────────────── */

function model(o) {
  const k = karta(o.slug)
  if (!k.nazwa || !k.kategoria) throw new Error(`${o.slug}: karta bez nazwy albo kategorii`)
  const wyj = WYJATKI[o.slug] ?? {}
  if (wyj.nazwa) k.nazwa = wyj.nazwa
  const [etykietaKat, rodzajKat, folder] = RODZAJE[k.kategoria] ?? []
  if (!etykietaKat) throw new Error(`${o.slug}: nieznana kategoria „${k.kategoria}”`)
  const rodzaj = wyj.rodzaj ?? rodzajKat
  const gotowy = OPISY[o.slug]
  let punkty, opis
  if (gotowy) {
    opis = { dostawca: gotowy.dostawca ?? null, nota: gotowy.nota ?? null }
    punkty = gotowy.punkty.map((p) => (typeof p === 'string' ? { t: p, b: false, pod: [] } : { b: false, pod: [], ...p }))
  } else {
    const komorka = komorkaUrzadzenia(o)
    opis = opisZDokumentu(komorka, o.slug)
    punkty = opis.punkty
    // drukarki mobilne: dokument wymienia sam zestaw — parametry dopowiada karta
    const samZestaw = /w zestawie\s*:?\s*$/i.test(komorka[0].t)
    const zKarty = (k.parametry ?? '').split(' · ').filter(Boolean).map((t) => ({ t: punkt(t), b: false, pod: [] }))
    if (samZestaw) punkty = [...zKarty, { t: 'W zestawie:', b: true, pod: punkty.map((p) => p.t) }]
    // dokument podaje samą nazwę (czytniki, drukarki etykiet, skaner) — parametry z karty
    else if (!punkty.length) punkty = zKarty
    for (const [z, na] of SPROSTOWANIA[o.slug] ?? []) for (const x of punkty) x.t = x.t.replace(z, na)
    if (wyj.dopisz) punkty = [...punkty, ...wyj.dopisz.map((t) => ({ t, b: false, pod: [] }))]
  }
  if (!punkty.length) throw new Error(`${o.slug}: brak opisu urządzenia`)

  const dostawca = opis.dostawca
  return {
    slug: o.slug,
    folder,
    etykieta: wyj.etykieta ?? etykietaKat,
    h1: k.nazwa,
    podtytul: `${rodzaj} dla Lasów Państwowych — ceny netto dla LP`,
    okres: o.okres,
    dostawca,
    pozycja: {
      tytul: wyj.tytul ?? `${rodzaj} ${k.nazwa}`,
      zdjecie: k.zdjecie && !wyj.bezZdjecia ? `public${k.zdjecie}` : null,
      punkty,
      link: `www.rejestratory.info/produkt/${o.slug}`,
      cenaNetto: o.urzadzenie.cenaNetto,
      promocja: !!o.urzadzenie.promocja,
    },
    dodatki: o.dodatki.map((d) => ({
      nazwa: (wyj.zamianyDodatkow ?? []).reduce((n, [z, na]) => n.replace(z, na), nazwaDodatku(d.nazwa, k.nazwa)),
      opis: (d.wZestawie ?? []).map(popraw).join(' · '),
      cenaNetto: d.cenaNetto,
      promocja: !!d.promocja,
    })),
    nota: opis.nota,
  }
}

/* ───────────────────────── HTML ───────────────────────── */

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const zl = (kwota) => {
  const [calk, gr] = kwota.toFixed(2).split('.')
  return `${calk.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')},${gr}`
}
const dataPL = (iso) => iso.split('-').reverse().join('.')

const KATALOG_ZDJEC = mkdtempSync(path.join(tmpdir(), 'formularze-zdjecia-'))
const zdjecia = {}
/** Zdjęcie przycięte do zawartości i zmniejszone — inaczej każdy PDF ważyłby kilka MB. */
function obraz(sciezka, maks = 520) {
  return (zdjecia[`${sciezka}@${maks}`] ??= (() => {
    const cel = path.join(KATALOG_ZDJEC, `${path.basename(sciezka).replace(/\W/g, '_')}-${maks}.png`)
    const wymiary = execFileSync(
      'python3',
      [
        '-c',
        `import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert('RGBA')
ramka = im.getbbox()
if ramka: im = im.crop(ramka)
im.thumbnail((int(sys.argv[3]), int(sys.argv[3])), Image.LANCZOS)
im.save(sys.argv[2], optimize=True)
print(im.width, im.height)`,
        w(sciezka),
        cel,
        String(maks),
      ],
      { encoding: 'utf8' },
    )
    const [szer, wys] = wymiary.trim().split(' ').map(Number)
    return { uri: `data:image/png;base64,${readFileSync(cel).toString('base64')}`, szer, wys }
  })())
}

function szablon(d) {
  let nrIlosci = 0
  const ilosc = (czego) =>
    `<span class="il"><span class="linia" data-pole="ilosc_${++nrIlosci}" data-opis="Ilość zamówiona — ${esc(czego)} (szt.)" data-wyrownanie="2"></span><span class="szt">szt.</span></span>`
  // cena jest wpisana, ale zostaje polem — składnica poprawi kwotę bez przebudowy formularza.
  // Twarda spacja w kwocie i zapas szerokości są konieczne: Podgląd macOS i przeglądarki
  // rysują pole po swojemu i kwotę „1 700,00” w ciasnym polu łamały na spacji, pokazując samo „1”.
  let nrCeny = 0
  const cena = (kwota, czego, rozmiar) =>
    `<span class="linia" data-pole="cena_${++nrCeny}" data-opis="Cena netto — ${esc(czego)} (zł)" data-wyrownanie="2" data-rozmiar="${rozmiar}" data-pogrubienie data-wartosc="${zl(kwota)}"></span>`
  const pole = (nazwa, etykieta) =>
    `<label class="pole"><span>${esc(etykieta)}</span><span class="linia" data-pole="${nazwa}" data-opis="${esc(etykieta)}"></span></label>`

  const p = d.pozycja
  const foto = p.zdjecie ? obraz(p.zdjecie) : null
  // pionowe zdjęcie (telefon, rejestrator) dostaje wąską kolumnę, poziome szerszą — jak w EM45
  const szerFoto = foto ? (foto.wys > foto.szer * 1.15 ? 68 : foto.wys > foto.szer * 0.8 ? 84 : 112) : 0
  const okres = d.okres
    ? `Oferta ważna dla zamówień złożonych od ${dataPL(d.okres.od)} do ${d.okres.do ? dataPL(d.okres.do) : 'odwołania'}`
    : ''
  const takma = d.dostawca === 'TAKMA'

  const lista = p.punkty
    .map(
      (x) =>
        `<li${x.b ? ' class="b"' : ''}>${esc(x.t)}${
          x.pod.length ? `<div class="pod">${x.pod.map((s) => `<span>— ${esc(s)}</span>`).join('')}</div>` : ''
        }</li>`,
    )
    .join('\n          ')

  // pola urządzenia powstają przed wyposażeniem, żeby miały numer 1 (cena_1, ilosc_1)
  const cenaUrzadzenia = cena(p.cenaNetto, p.tytul, 17)
  const iloscUrzadzenia = ilosc(p.tytul)
  const glowaTabeli = `<div class="tab-glowa blok"><span>Wyposażenie dodatkowe</span><span class="r">Cena netto</span><span class="c">Ilość<br>zamówiona</span></div>`
  const wierszeTabeli = d.dodatki
    .map(
      (a) => `<div class="wiersz blok">
      <span class="nazwa">${esc(a.nazwa)}${a.opis ? `<small>${esc(a.opis)}</small>` : ''}</span>
      <span class="kw">${a.promocja ? '<i class="promo">Promocja</i>' : ''}<span class="kw-pole">${cena(a.cenaNetto, a.nazwa, 9.6)}<b>zł</b></span></span>
      ${ilosc(a.nazwa)}
    </div>`,
    )
    .join('\n    ')

  return `<!doctype html>
<html lang="pl"><head><meta charset="utf-8">
<title>Formularz zamówienia — ${esc(d.h1)} · ZUP Łódź</title>
<style>
@page { size: A4; margin: 0 }
* { box-sizing: border-box; margin: 0; padding: 0 }
html, body { background: #fff }
body { font: 9.3pt/1.5 "Helvetica Neue", Helvetica, Arial, sans-serif; color: #1a1d1b;
  -webkit-print-color-adjust: exact; print-color-adjust: exact }
.strona { width: 210mm; height: 297mm; padding: 34pt 33.5pt 30pt 34pt; overflow: hidden; break-after: page }
.blok { margin-top: 8pt }
.strona > .blok:first-child { margin-top: 0 }
.strona > .tab-glowa:first-child, .strona > .karta:first-child { margin-top: 8pt }
.kapitaliki { font-size: 6.6pt; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: #6b7280 }
.linia { display: block; border-bottom: .75pt solid #b9c4bb }

.pas { overflow: hidden; display: flex; align-items: center; justify-content: space-between; gap: 12pt; height: 24.5pt; padding: 0 10pt;
  border-radius: 4pt; background: #14532d }
.pas b { font-size: 7pt; letter-spacing: .32em; text-transform: uppercase; color: #a3e635; white-space: nowrap }
.pas span { font-size: 8pt; color: #d7f0df; white-space: nowrap }
h1 { margin-top: 10pt; font-size: 21pt; line-height: 1.25; font-weight: 700; letter-spacing: -.005em }
.podtytul { margin-top: 2pt; font-size: 10pt; color: #4b5563 }

.strony-umowy { display: grid; grid-template-columns: 260pt 1fr; gap: 8pt; margin-top: 9pt }
.strony-umowy > div { padding: 9pt 9pt 7pt; border: .75pt solid #d9e0da; border-radius: 4pt }
.zamawiajacy .pole { display: block; margin-top: 4.5pt; font-size: 7.4pt; color: #4b5563 }
.zamawiajacy .pole .linia { height: 16.6pt }
.dostawca { background: #f5f8f5 }
.dostawca b { display: block; margin-top: 8pt; font-size: 9.4pt }
.dostawca p { font-size: 8.6pt; line-height: 1.55 }
.dostawca .serwis { margin-top: 9pt; padding: 4.6pt 7pt; border: .75pt solid #e2eadf; border-radius: 3pt; background: #f7faf6;
  font-size: 8.2pt; color: #33452f }
.dostawca .serwis b { display: inline; margin: 0; font-size: inherit; white-space: nowrap }

.karta { border: .75pt solid #d9e0da; border-radius: 4pt; overflow: hidden }
.karta-glowa { display: flex; align-items: center; justify-content: space-between; gap: 10pt; padding: 5.6pt 9.5pt;
  background: #f5f8f5; border-bottom: .75pt solid #d9e0da }
.karta-glowa h2 { font-size: 11pt; line-height: 1.35; font-weight: 700 }
.karta-glowa .kapitaliki { white-space: nowrap }
.karta-tresc { display: grid; grid-template-columns: ${szerFoto ? `${szerFoto}pt ` : ''}1fr 100pt; column-gap: 10pt;
  padding: 8.5pt 9.5pt 8pt }
.foto img { display: block; width: 100%; margin-top: 2pt }
.opis ul { padding-left: 20pt }
.opis li { padding-left: 1pt; line-height: 1.42; margin-bottom: 1.35pt }
.opis li.b { font-weight: 700 }
.opis .pod { font-weight: 400 }
.opis .pod span { display: block; margin-top: .6pt; padding-left: 11.5pt; text-indent: -11.5pt; font-size: 8.6pt; line-height: 1.45; color: #374151 }
.opis .link { display: block; margin-top: 1.5pt; padding-left: 10pt; font-size: 7.2pt; color: #166534 }
.gesto .opis li { line-height: 1.3; margin-bottom: .6pt; font-size: 8.8pt }
.gesto .opis .pod span { font-size: 8.2pt; line-height: 1.34 }
.gesto .wiersz { min-height: 21pt; padding-top: 2.4pt; padding-bottom: 2.4pt }
.gesto .podpis { margin-top: 10pt }
.gesto .stopka { margin-top: 8pt }
.cena { display: flex; flex-direction: column; align-items: flex-end; padding-left: 8pt; border-left: .75pt solid #e2e7e3 }
.promo { display: inline-block; padding: 1.6pt 6pt 1.4pt; border-radius: 2pt; background: #a3e635; color: #14532d;
  font-size: 6.6pt; font-style: normal; font-weight: 700; letter-spacing: .12em; line-height: 1.2 }
.kwota { display: flex; align-items: flex-end; margin-top: 3pt; white-space: nowrap }
.kwota .linia { width: 80pt; height: 24pt; border: 0 }
.kwota small { margin: 0 0 4.6pt 3pt; font-size: 9pt; line-height: 1; color: #6b7280 }
.cena .ile { margin-top: 7pt; font-size: 7.6pt; color: #4b5563 }
.il { display: flex; align-items: flex-end; justify-content: flex-end; gap: 3pt }
.il .linia { width: 39pt; height: 13.5pt }
.szt { font-size: 7.4pt; line-height: 1; color: #6b7280 }

.tab-glowa, .wiersz { display: grid; grid-template-columns: 1fr 90pt 83pt; align-items: center }
.tab-glowa { min-height: 28pt; padding: 0 7pt; background: #eef3ec; border-bottom: .75pt solid #d9e0da;
  font-size: 6.8pt; font-weight: 700; letter-spacing: .14em; line-height: 1.5; text-transform: uppercase; color: #14532d }
.tab-glowa .r { text-align: right; padding-right: 12pt }
.tab-glowa .c { text-align: center; padding-left: 14pt }
.wiersz { margin-top: 0; min-height: 23.6pt; padding: 3.5pt 7pt; border-bottom: .75pt solid #edf1ec }
.wiersz .nazwa small { display: block; font-size: 7.6pt; line-height: 1.35; color: #4b5563 }
.wiersz .kw { text-align: right; padding-right: 12pt; white-space: nowrap; line-height: 1.25 }
.wiersz .kw-pole { display: flex; align-items: flex-end; justify-content: flex-end; gap: 2.6pt }
.wiersz .kw-pole .linia { width: 64pt; height: 13.5pt; border: 0 }
.wiersz .kw b { font-size: 9.6pt; line-height: 1; padding-bottom: 2.6pt }
.wiersz .il { padding-right: 16pt }
.nota { padding: 5.5pt 7pt; border: .75pt solid #e2eadf; border-radius: 3pt; background: #f7faf6; font-size: 8.2pt;
  line-height: 1.5; color: #33452f }

.warunki { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8pt }
.warunki > div { padding: 7pt 9pt 6pt; border: .75pt solid #d9e0da; border-radius: 4pt }
.warunki b { display: block; margin-top: 1pt; font-size: 9.6pt }
.podpis { width: 158pt; margin: 18pt 0 0 auto; font-size: 7.4pt; color: #6b7280; text-align: center }
.podpis .linia { height: 14pt; margin-bottom: 3pt; border-bottom-color: #9aa89d }
.stopka { display: flex; align-items: center; justify-content: space-between; gap: 12pt; margin-top: 12pt; padding-top: 6pt;
  border-top: .75pt solid #e5e9e5; font-size: 7.6pt; color: #6b7280 }
.stopka span:last-child { display: flex; align-items: center; gap: 4pt; white-space: nowrap }
.stopka img { height: 8.6pt }
</style></head>
<body>
<div id="zrodlo">
  <div class="blok">
    <div class="pas"><b>Formularz zamówienia — ${esc(d.etykieta)}</b><span>${esc(okres)}</span></div>
    <h1>${esc(d.h1)}</h1>
    <p class="podtytul">${esc(d.podtytul)}</p>
    <div class="strony-umowy">
      <div class="zamawiajacy">
        <span class="kapitaliki">Zamawiający</span>
        ${pole('zamawiajacy_nadlesnictwo', 'Nadleśnictwo / jednostka')}
        ${pole('zamawiajacy_adres', 'Adres e-mail do faktur elektronicznych')}
        ${pole('zamawiajacy_osoba', 'Osoba do kontaktu w sprawie realizacji zamówienia (tel. / e-mail)')}
        ${pole('zamawiajacy_data', 'Data')}
      </div>
      <div class="dostawca">
        <span class="kapitaliki">Dostawca</span>
        <b>Zakład Usługowo-Produkcyjny Lasów Państwowych</b>
        <p>91-073 Łódź, ul. Legionów 113<br>tel. 42 632 23 62<br>e-mail: zup@lodz.lasy.gov.pl</p>
        ${d.dostawca ? `<div class="serwis">Dostawa oraz serwis gwarancyjny i pogwarancyjny: <b>${esc(d.dostawca)}</b></div>` : ''}
      </div>
    </div>
  </div>

  <section class="karta blok">
    <div class="karta-glowa"><h2>${esc(p.tytul)}</h2>${d.dodatki.length ? '<span class="kapitaliki">Pozycja 1</span>' : ''}</div>
    <div class="karta-tresc">
      ${foto ? `<div class="foto"><img src="${foto.uri}" alt=""></div>` : ''}
      <div class="opis">
        <ul>
          ${lista}
        </ul>
        <span class="link">${esc(p.link)}</span>
      </div>
      <div class="cena">
        ${p.promocja ? '<i class="promo">Promocja</i>' : ''}
        <div class="kwota">${cenaUrzadzenia}<small>zł</small></div>
        <span class="ile">Ilość zamówiona</span>
        ${iloscUrzadzenia}
      </div>
    </div>
  </section>

  ${d.dodatki.length ? `${glowaTabeli}\n    ${wierszeTabeli}` : ''}

  ${d.nota ? `<div class="nota blok">${esc(d.nota)}</div>` : ''}

  <div class="blok koniec">
    <div class="warunki">
      <div><span class="kapitaliki">Podatek</span><b>Do cen należy doliczyć VAT 23%</b></div>
      <div><span class="kapitaliki">Termin realizacji</span><b>Do uzgodnienia</b></div>
      <div><span class="kapitaliki">Płatność</span><b>Przelew 14 dni</b></div>
    </div>
    <div class="podpis"><span class="linia" data-pole="podpis_imie_nazwisko" data-opis="Imię i nazwisko osoby zamawiającej"></span>Podpis zamawiającego</div>
    <footer class="stopka">
      <span>Zakład Usługowo-Produkcyjny Lasów Państwowych w Łodzi &nbsp;·&nbsp; zup@lodz.lasy.gov.pl &nbsp;·&nbsp; tel. 42 632 23 62</span>
      ${
        d.dostawca
          ? `<span>Dostawa i serwis: ${
              takma ? `<img src="${obraz('public/takma_logo_footer.png', 400).uri}" alt="TAKMA">` : `<b>${esc(d.dostawca)}</b>`
            }</span>`
          : ''
      }
    </footer>
  </div>
</div>
<script>
/* Podział na kartki A4: bloki przechodzą na następną stronę w całości, a tabela
   wyposażenia dostaje tam powtórzony nagłówek. */
addEventListener('load', () => {
  const zrodlo = document.getElementById('zrodlo')
  const bloki = [...zrodlo.children]
  const glowa = bloki.find((b) => b.classList.contains('tab-glowa'))
  const opis = zrodlo.querySelector('.opis')
  const zaDuzo = (s) => s.scrollHeight > s.clientHeight + 1
  const uloz = () => {
    for (const s of document.querySelectorAll('.strona')) s.remove()
    const nowa = () => document.body.appendChild(Object.assign(document.createElement('main'), { className: 'strona' }))
    let strona = nowa()
    for (const [i, b] of bloki.entries()) {
      strona.appendChild(b)
      let przenies = zaDuzo(strona)
      // nagłówek tabeli nie zostaje sam na dole strony
      if (!przenies && b === glowa && bloki[i + 1]) {
        strona.appendChild(bloki[i + 1])
        przenies = zaDuzo(strona)
        bloki[i + 1].remove()
      }
      if (przenies && strona.children.length > 1) {
        strona = nowa()
        if (b.classList.contains('wiersz') && glowa) strona.appendChild(glowa.cloneNode(true))
        strona.appendChild(b)
      }
    }
    return [...document.querySelectorAll('.strona')]
  }
  let strony = uloz()
  // Gdy na ostatnią kartkę spadają same warunki z podpisem albo karta urządzenia nie mieści się
  // na stronie, próbujemy gęstszego składu; zostaje tylko wtedy, gdy oszczędza kartkę.
  const samKoniec = (s) => s.children.length === 1 && s.firstElementChild.classList.contains('koniec')
  if (strony.some(zaDuzo) || (strony.length > 1 && samKoniec(strony[strony.length - 1]))) {
    const przed = strony.length
    const przepelnione = strony.some(zaDuzo)
    document.body.classList.add('gesto')
    strony = uloz()
    if (!przepelnione && strony.length >= przed) {
      document.body.classList.remove('gesto')
      strony = uloz()
    }
  }
  zrodlo.remove()
  // długa etykieta w zielonym pasie (np. „urządzenie wielofunkcyjne”) dostaje ciaśniejsze odstępy liter
  const pas = document.querySelector('.pas')
  const etykieta = pas.querySelector('b')
  const ciasno = () => pas.querySelector('span').getBoundingClientRect().right > pas.getBoundingClientRect().right - 9
  for (let odstep = 0.3; ciasno() && odstep > 0.15; odstep -= 0.02) etykieta.style.letterSpacing = odstep + 'em'
  if (ciasno()) pas.querySelector('span').style.fontSize = '7.4pt'
  for (let odstep = 0.14; ciasno() && odstep > 0.03; odstep -= 0.02) etykieta.style.letterSpacing = odstep + 'em'
})
</script>
</body></html>`
}

/* ───────────────────────── budowa ───────────────────────── */

const argumenty = process.argv.slice(2)
const iHtml = argumenty.indexOf('--html-do')
const katalogHtml = iHtml >= 0 ? path.resolve(argumenty.splice(iHtml, 2)[1]) : mkdtempSync(path.join(tmpdir(), 'formularze-zup-'))
const iPdf = argumenty.indexOf('--pdf-do')
const katalogPdf = iPdf >= 0 ? path.resolve(argumenty.splice(iPdf, 2)[1]) : w('public/formularze/zup-lodz')
const tylkoDane = argumenty.includes('--dane')
const wybrane = argumenty.filter((a) => !a.startsWith('--'))
mkdirSync(katalogHtml, { recursive: true })
mkdirSync(katalogPdf, { recursive: true })

const doZrobienia = OFERTY.filter((o) => !wybrane.length || wybrane.includes(o.slug))
const bledy = []
for (const o of doZrobienia) {
  try {
    const d = model(o)
    if (tylkoDane) {
      console.log(`\n## ${d.slug} — ${d.pozycja.tytul} [${d.etykieta}] dostawca: ${d.dostawca}`)
      for (const x of d.pozycja.punkty) {
        console.log(`  ${x.b ? '*' : '•'} ${x.t}`)
        for (const s of x.pod) console.log(`      — ${s}`)
      }
      for (const a of d.dodatki) console.log(`  + ${a.nazwa}${a.opis ? ` (${a.opis})` : ''}`)
      if (d.nota) console.log(`  ! ${d.nota}`)
      continue
    }
    mkdirSync(path.join(katalogPdf, d.folder), { recursive: true })
    const html = path.join(katalogHtml, `zup-lodz-${d.slug}.html`)
    writeFileSync(html, szablon(d))
    const wynik = execFileSync('python3', [w('scripts/formularz-pdf.py'), html, path.join(katalogPdf, d.folder, `zup-lodz-${d.slug}.pdf`)], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    console.log(wynik.split('\n')[0].replace(`${ROOT}/`, ''))
  } catch (e) {
    bledy.push(`${o.slug}: ${(e.stderr || e.message).toString().trim().split('\n').pop()}`)
  }
}
if (bledy.length) {
  console.error(`\nNIE ZBUDOWANO (${bledy.length}):`)
  for (const b of bledy) console.error(`  ${b}`)
  process.exit(1)
}
