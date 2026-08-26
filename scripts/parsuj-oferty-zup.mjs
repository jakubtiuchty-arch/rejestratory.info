#!/usr/bin/env node
/**
 * Czyta oferty ZUP Łódź (.docx) i generuje `data/oferty-skladnicy.ts`.
 *
 * Wszystkie mają ten sam szablon: akapit z okresem obowiązywania oraz
 * tabelę z nagłówkiem „Cena sprzedaży netto zł. dla LP”. Pierwszy wiersz danych
 * to urządzenie, kolejne to pozycje dodatkowe.
 *
 *   node scripts/parsuj-oferty-zup.mjs "/ścieżka/do/katalogu z ofertami"
 *
 * Dopasowanie oferty do karty produktu idzie przez tabelę MODELE poniżej —
 * świadomie ręczną, bo nazwa w dokumencie („Mobilny komputer dotykowy ZEBRA TC27 -
 * rejestrator leśniczego”) nie przypomina slugu.
 */

import { writeFileSync, readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'
import { execFileSync } from 'node:child_process'

/**
 * Katalogi z ofertami. Można podać kilka, bo druki leżą w Pobranych w osobnych
 * folderach tematycznych (REJESTRATORY 3, MONITORY, KOMPUTERY ALL IN ONE…).
 */
const KATALOGI = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['/Users/jakubtiuchty/Downloads/REJESTRATORY 3']
const WYJSCIE = 'data/oferty-skladnicy.ts'

/**
 * Druki modeli, których producent już nie wytwarza. Leżą w katalogu razem
 * z resztą, ale do katalogu nie trafiają — decyzja Jakuba z 26.08.2026.
 */
const WYCOFANE = [
  'Oferta na Rejestrator Zebra EC55_03.2026.docx',
  'Oferta na Rejestrator Zebra TC26_03.2026.docx',
  'Oferta na Rejestrator Zebra TC57_03.2026.docx',
  'Oferta na Rejestrator Zebra TC77_03.2026.docx',
  'Oferta na Rejestrator typu Smartfon HMD XR21_03.2026.docx',
  // sam SL20 zszedł z produkcji; SL20+ z osobnego druku zostaje
  'Oferta na Rejestrator M3 Mobile SL20_03.2026.docx',
]

/** Fragment nazwy z druku → slug karty produktu. Kolejność: od najdłuższego. */
const MODELE = [
  ['EM45', 'zebra-em45'],
  ['TC58', 'zebra-tc58e'],
  ['TC27', 'zebra-tc27'],
  ['CT30P', 'honeywell-ct30'],
  ['CT40XP', 'honeywell-ct40xp'],
  ['CT47', 'honeywell-ct47'],
  ['EDA52', 'honeywell-eda52'],
  ['SL20+', 'm3-sl20'],
  ['SL20', 'm3-sl20'],
  ['EA660', 'unitech-ea660'],
  ['PA768', 'unitech-pa768'],
  ['A56', 'samsung-a56'],
  ['A36', 'samsung-a36'],
  ['CT32', 'honeywell-ct32'],
  ['PM95', 'point-mobile-pm95'],
  ['S25 FE', 'samsung-s25-fe'],
  ['S25 ULTRA', 'samsung-s25-ultra'],
  ['XCOVER', 'samsung-xcover7'],
  // Dokument nazywa ten model „Elite Book 645 14” G11”, ale numer katalogowy
  // C51GKET to EliteBook 6 G1ah 14” (Ryzen 5 220, 16 GB, 512 GB) — potwierdzone
  // u dystrybutorów. Karta idzie za numerem, nie za nazwą z dokumentu.
  ['ELITE BOOK 645', 'hp-elitebook-6-g1ah-14'],
  // Monitor bez linku w ofercie ZUP. „P2724HEB” z naszej dawnej karty nie
  // istnieje w gamie Della — 27-calowa konferencyjna QHD to P2724DEB.
  ['P2724DEB', 'dell-pro-27-plus-p2724deb'],
  ['P2726HE', 'dell-pro-27-p2726he'],
  ['P2726H', 'dell-pro-27-p2726h'],
  ['PC42E-T', 'honeywell-pc42e-t'],
  ['DS2278', 'zebra-ds2278'],
  ['1250g', 'honeywell-1250g'],
  ['LK-P400', 'sewoo-lkp400'],
  ['LK-P43', 'sewoo-lkp43'],
  ['ZQ521', 'zebra-zq521'],
  ['524PM', 'hp-seria-5-pro-524pm'],
  ['524PU', 'hp-seria-5-pro-524pu'],
  ['527PM', 'hp-seria-5-pro-527pm'],
  // urządzenia wielofunkcyjne i drukarki Brother — druki podają model w nazwie,
  // link prowadzi najczęściej na brother.pl, nie na naszą kartę
  ['DCP-B7620DW', 'brother-dcp-b7620dw'],
  ['MFC-L5710DW', 'brother-mfc-l5710dw'],
  ['MFC-L6710DW', 'brother-mfc-l6710dw'],
  ['MFC-L8390CDW', 'brother-mfc-l8390cdw'],
  ['MFC-L8900CDW', 'brother-mfc-l8900cdw'],
  ['DCP-L5510DW', 'brother-dcp-l5510dw'],
  ['HLL-6210DW', 'brother-hl-l6210dw'],
  ['HL-L6410', 'brother-hl-l6410'],
]

const czytajDocx = (sciezka) => {
  // unzip do stdout — bez zewnętrznych zależności npm
  return execFileSync('unzip', ['-p', sciezka, 'word/document.xml'], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  })
}

const tekstAkapitu = (xml) =>
  [...xml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)].map((m) => m[1]).join('')

const akapity = (xml) =>
  [...xml.matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)]
    .map((m) => tekstAkapitu(m[0]).trim())
    .filter(Boolean)

/**
 * Komórka bywa wielolinijkowa: pierwszy akapit to nazwa pozycji, reszta to opis
 * i specyfikacja. Zwracamy oba, bo na karcie pokazujemy samą nazwę.
 */
const komorki = (wiersz) =>
  [...wiersz.matchAll(/<w:tc>[\s\S]*?<\/w:tc>/g)].map((m) => {
    const linie = akapity(m[0]).map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean)
    const bezLinkow = linie.map((l) => l.replace(/\s*https?:\/\/\S+/g, '').trim()).filter(Boolean)
    return {
      etykieta: bezLinkow[0] ?? '',
      pelny: bezLinkow.join(' '),
      linie: bezLinkow,
      zLinkami: linie.join(' '),
    }
  })

/** „2.873,00”, „121,-”, „77,-.” → 2873, 121, 77 (w groszach jako liczba zł) */
const naKwote = (tekst) => {
  const m = tekst.match(/(\d[\d .]*),\s*(\d{2}|-)/)
  if (!m) return null
  const zlote = Number(m[1].replace(/[ .]/g, ''))
  const grosze = m[2] === '-' ? 0 : Number(m[2])
  if (!Number.isFinite(zlote)) return null
  return zlote + grosze / 100
}

/**
 * Dokumenty mówią o okresie na dwa sposoby: „od 01.07.2026r. do 31.08.2026”
 * albo „od 21.03.2026r. do odwołania”. Ten drugi wariant zwraca `do: null`.
 */
const okresObowiazywania = (linie) => {
  const tekst = linie.join(' ')
  const naISO = (d) => d.split('.').reverse().join('-')

  // część druków pisze „w okresie od…”, część „na zamówienia złożone od…”
  const wstep =
    '(?:okresie|złożone|zlozone|obowiązuje|obowiazuje|ważna|wazna)\\s*(?:w\\s*okresie\\s*)?(?:od\\s*)?(?:dnia\\s*)?'

  const zData = tekst.match(
    new RegExp(`${wstep}(\\d{2}\\.\\d{2}\\.\\d{4})\\s*r?\\.?\\s*do\\s*(\\d{2}\\.\\d{2}\\.\\d{4})`, 'i')
  )
  if (zData) return { od: naISO(zData[1]), do: naISO(zData[2]) }

  const doOdwolania = tekst.match(
    new RegExp(`${wstep}(\\d{2}\\.\\d{2}\\.\\d{4})\\s*r?\\.?\\s*do\\s*odwo`, 'i')
  )
  if (doOdwolania) return { od: naISO(doOdwolania[1]), do: null }

  const samaData = tekst.match(new RegExp(`${wstep}(\\d{2}\\.\\d{2}\\.\\d{4})`, 'i'))
  return samaData ? { od: naISO(samaData[1]), do: null } : null
}

/**
 * Komórka urządzenia to lista parametrów, wśród których dokument wymienia też to,
 * co wchodzi w cenę („Ładowarka sieciowa i ładowarka samochodowa”, „Dodatkowa
 * karta pamięci micro SD 64 GB”). Zbieramy tylko te wiersze — reszta to
 * specyfikacja, którą karta i tak podaje w swojej tabeli.
 *
 * Wiersze z „UWAGA”, „opcjonalnie” czy „można doposażyć” świadomie odpadają:
 * opisują wyposażenie dodatkowe, a nie zawartość zestawu.
 */
const W_CENIE =
  /(ładowark|karta pamięci|etui|kabur|rysik|pasek na rękę|handstrap|szkło ochronne|folia ochronna|uchwyt|zasilacz|kabel)/i
const NIE_W_CENIE =
  /(uwaga|opcjonalnie|można doposażyć|doposaż|dostawa\s*[,i]\s*serwis|serwis gwarancyjny)/i

/**
 * Pozycje świadomie pomijane, mimo że stoją w druku. Decyzja Jakuba z 23.08.2026:
 * papieru 104/33/25 z oferty ZPUH Olsztyn nie pokazujemy na karcie.
 */
const POMIJANE_POZYCJE = [/^papier termiczny 104\/33\/25/i]

const pomijana = (nazwa) => POMIJANE_POZYCJE.some((wzor) => wzor.test(nazwa))

const bezPunktora = (l) => l.replace(/^[-–—•*]\s*/, '').replace(/\s+/g, ' ').trim()

/**
 * Co wchodzi w cenę urządzenia.
 *
 * Gdy druk sam otwiera listę słowami „w zestawie:”, bierzemy dokładnie to, co
 * pod nią wypisał — to jedyne wiarygodne źródło. Lista kończy się na zdaniu
 * (linia zamknięta kropką) albo na nocie o dostawie i serwisie.
 *
 * Druki bez takiego nagłówka wymieniają zawartość między parametrami, więc tam
 * zostaje wybieranie po nazwach przedmiotów. Wiersze „UWAGA”, „opcjonalnie”
 * czy „można doposażyć” świadomie odpadają: opisują wyposażenie dodatkowe.
 */
const wZestawie = (linie) => {
  const marker = linie.findIndex((l) => /w zestawie\s*:?\s*$/i.test(l))
  if (marker !== -1) {
    const wynik = []
    for (const l of linie.slice(marker + 1)) {
      if (NIE_W_CENIE.test(l) || /\.\s*$/.test(l)) break
      const czysta = bezPunktora(l)
      if (czysta) wynik.push(czysta)
    }
    if (wynik.length) return wynik
  }
  return linie
    .slice(1) // pierwsza linia to nazwa pozycji
    .filter((l) => W_CENIE.test(l) && !NIE_W_CENIE.test(l))
    .map(bezPunktora)
}

/**
 * ZUP wstawia przy nazwie modelu link do naszej karty. To najpewniejsze
 * źródło sluga — pewniejsze niż nazwa, bo „DELL PRO 16” jest przedrostkiem
 * „DELL PRO 16 PLUS”. Dokumenty bez linku (starsze) idą przez tabelę MODELE.
 */
const slugZLinku = (tekst) =>
  tekst.match(/rejestratory\.info\/produkt\/([a-z0-9-]+)/i)?.[1]?.toLowerCase() ?? null

/**
 * Marka z nazwy pozycji. Potrzebna tam, gdzie jeden druk obejmuje kilka modeli:
 * stacja dokująca Dell dotyczy laptopów Dell, a nie stojącego obok HP.
 */
const MARKI = ['dell', 'hp', 'zebra', 'honeywell', 'samsung', 'unitech', 'm3']
const marka = (tekst) => MARKI.find((m) => new RegExp(`\\b${m}\\b`, 'i').test(tekst)) ?? null

/**
 * Dokument wskazuje przy każdym urządzeniu, kto odpowiada za dostawę i serwis —
 * najczęściej TAKMA, ale np. przy Dellach bez systemu i Galaxy A36 jest to
 * SCANTER. Karta nie może przypisywać sobie cudzej obsługi, więc czytamy to
 * z dokumentu zamiast zakładać.
 */
const dostawcaPozycji = (tekst) =>
  tekst.match(/pogwarancyjny\s*(?:prowadzi\s*)?firma\s+([A-ZĄĆĘŁŃÓŚŹŻ][A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż.\s]{1,30}?)(?:\s{2,}|$|,)/)?.[1]?.trim() ?? null

/**
 * Nazwa pozycji bywa całym zdaniem reklamowym („Monitor komputerowy DELL P2425H
 * wyróżniony 4-gwiazdkowym certyfikatem TÜV…, zapewnia większą wygodę i płynną
 * łączność”). Ucinamy dopiero wtedy, gdy nazwa nie mieści się w limicie — na
 * pierwszym przecinku, potem na kropce. Krótsze nazwy zostają nietknięte, żeby
 * nie zjeść wariantu z nazwy w rodzaju „…, wersja standardowa i rozszerzona”.
 */
const LIMIT_NAZWY = 120
const skrocNazwe = (nazwa) => {
  if (nazwa.length <= LIMIT_NAZWY) return nazwa
  for (const znak of [',', '.', ';', ' – ', ' - ']) {
    const i = nazwa.indexOf(znak)
    if (i > 0 && i <= LIMIT_NAZWY) return nazwa.slice(0, i).trim()
  }
  return nazwa.slice(0, nazwa.lastIndexOf(' ', LIMIT_NAZWY)).trim()
}

/** Do porównań: same litery i cyfry, bo druki piszą „MFCL-6710DW” i „MFC L 6710 DW”. */
const uprosc = (tekst) => tekst.toUpperCase().replace(/[^A-Z0-9]/g, '')

/**
 * Wzorzec modelu tolerujący spacje, myślniki i kropki wewnątrz oznaczenia,
 * ale wymagający, żeby zaczynało się ono od granicy słowa.
 *
 * Porównywanie na tekście z wyciętymi spacjami (`uprosc`) samo w sobie sklejało
 * sąsiednie wyrazy i produkowało fałszywe oznaczenia: „Gwarancja 36 miesięcy”
 * dawało ciąg …CJA36MIES…, w którym siedzi „A36”, więc drukarka Brother RJ-4230B
 * z druku ZPUH Olsztyn trafiła na kartę Samsunga Galaxy A36. Stąd `(?<![A-Z0-9])`
 * z przodu. Z tyłu blokujemy tylko cyfrę, bo litera bywa wariantem tego samego
 * modelu, który chcemy złapać („TC58” w „TC58e”, „P2726H” w „P2726HE”).
 */
const wzorzecModelu = (fragment) =>
  // separatorów może być kilka, bo druki piszą „BROTHER HLL – 6210DW”
  new RegExp(`(?<![A-Z0-9])${uprosc(fragment).split('').join('[\\s\\-_.–—]*')}(?![0-9])`, 'i')

const dopasujSlug = (nazwa) => {
  const trafienie = [...MODELE]
    .sort((a, b) => b[0].length - a[0].length)
    .find(([fragment]) => wzorzecModelu(fragment).test(nazwa))
  return trafienie ? trafienie[1] : null
}

/**
 * Wiersze wyposażenia potrafią nosić w nazwie model urządzenia („Toner do
 * BROTHER MFCL-6710DW”, „Kontrakt serwisowy do ZEBRA TC27”). Bez tego filtra
 * każdy taki wiersz otwierałby własną ofertę i zabierał sąsiadom akcesoria.
 */
const WYPOSAZENIE =
  /^(toner|bęben|beben|kabel|przewód|przewod|kontrakt|ładowarka|ladowarka|akumulator|bateria|stacja|obudowa|nakładka|nakladka|pasek|uchwyt|torba|etui|kabura|folia|szkło|szklo|rysik|papier|materiały|materialy|zasilacz|listwa|adapter|karta pamięci|karta pamieci|szkolenie|dodatkowa|opcja|opcjonaln|wersja|zestaw montaż)/i

const slugUrzadzenia = (pozycja) =>
  WYPOSAZENIE.test(pozycja.nazwa) ? null : dopasujSlug(pozycja._tekst)

/**
 * Czy wiersz opisuje urządzenie, a nie wyposażenie. Rozstrzyga blok parametrów
 * w komórce — druki opisują każde urządzenie listą „Procesor:”, „Technologia
 * druku:”, „Funkcje:”, a wyposażenie mieści się w jednej, dwóch linijkach.
 * Bez tego wiersz nieznanego modelu (np. Brother MFC-L8730CDW, którego nie mamy
 * w katalogu) dopisywałby się jako pozycja dodatkowa do sąsiedniej drukarki.
 */
/**
 * Nagłówek bloku wyposażenia: „Materiały eksploatacyjne do drukarki X”,
 * „Akcesoria dodatkowe do czytnika Y”. Otwiera listę pozycji należących do
 * urządzenia stojącego bezpośrednio nad nim.
 */
const NAGLOWEK_BLOKU = /(materia[łl]y eksploatacyjne|akcesoria\s+(dodatkowe\s+)?(i\s+materia)?)/i

const PARAMETR =
  /^(procesor|technologia druku|funkcje|pamięć|pamiec|dysk|ekran|wyświetlacz|wyswietlacz|system|szybkość druku|szybkosc druku|rozdzielczość|rozdzielczosc|złącza|zlacza|połączenie|polaczenie|sieć bezprzewodowa|siec bezprzewodowa|akumulator \d|gwarancja:)/i

/**
 * Czy zaraz pod tym wierszem stoi nagłówek bloku wyposażenia. Tabele mają
 * między wierszami puste rzędy z komórką „…… sztuk”, więc szukamy pierwszego
 * rzędu, który cokolwiek zawiera.
 */
const nagłówekPoWierszu = (wiersze, numer) => {
  for (let i = numer + 1; i < wiersze.length; i++) {
    const [nazwa, cena] = wiersze[i]
    if (!nazwa?.etykieta && !cena?.pelny) continue
    if (!nazwa?.etykieta) return false
    return !cena?.pelny && NAGLOWEK_BLOKU.test(nazwa.pelny)
  }
  return false
}

const wyglądaNaUrzadzenie = (pozycja) =>
  pozycja._przedBlokiem || (pozycja._linie >= 5 && pozycja._parametry >= 2)

/**
 * ZUP Łódź dzieli asortyment na podstrony i tam wiesza dokumenty. Rejestratory
 * i drukarki są razem pod `/rejestratory` — to domyślny dział; reszta poniżej.
 */
/**
 * Która składnica wystawia ofertę. Rozpoznajemy po nagłówku dokumentu; gdy nic
 * nie pasuje, zostaje ZUP Łódź — z niego pochodzi większość druków.
 */
const SKLADNICE_PO_TRESCI = [
  [/zpuh|olsztyn/i, 'zpuh-olsztyn'],
  [/zslp|stargard/i, 'zslp-stargard'],
  [/zup|łód|lodz/i, 'zup-lodz'],
]

const rozpoznajSkladnice = (tekst) =>
  SKLADNICE_PO_TRESCI.find(([wzor]) => wzor.test(tekst))?.[1] ?? 'zup-lodz'

/** Strona z asortymentem w składnicach innych niż ZUP Łódź. */
const STRONY_POZOSTALE = {
  'zpuh-olsztyn': 'https://zpuh.olsztyn.lasy.gov.pl/drukarki',
  'zslp-stargard': 'https://zslpstargard.szczecin.lasy.gov.pl',
}

const DZIALY_ZUP = {
  'akcesoria-komputerowe': [
    'hp-460',
    'hp-715',
    'torba-hp-15',
    'dell-km5221',
    'dell-km7321',
    'hp-655',
    'ms-365',
    'podkladka-pod-mysz',
    'podnozek-biurowy',
    'samsung-ssd-t7',
    'samsung-ssd-t9',
    'torba-na-laptopa-15',
    'vertin-1000',
    'vertin-600',
  ],
  'komputery-pc-laptopy-all-in-one': [
    'aio-dell-pro-24',
    'aio-dell-pro-24-bez-systemu',
    'dell-pro-14-plus',
    'dell-pro-16',
    'dell-pro-16-plus',
    'hp-elitebook-6-g1ah-16',
    'hp-elitebook-6-g1ah-14',
  ],
  'monitory': [
    'dell-pro-24-plus-p2424heb',
    'dell-pro-24-plus-p2425he',
    'dell-pro-24-plus-p2425he-usbc',
    'dell-pro-27-plus-p2724deb',
    'dell-pro-27-p2726h',
    'dell-pro-27-p2726he',
    'hp-seria-3-pro-324pv',
    'hp-seria-5-pro-524pm',
    'hp-seria-5-pro-524pu',
    'hp-seria-5-pro-527pm',
    'hp-seria-5-pro-527pq',
    'hp-seria-5-pro-527pu',
  ],
  'sprzet-do-ezd': [
    'epson-ds730n',
    'honeywell-1250g',
    'honeywell-1450g',
    'honeywell-pc42e-t',
    'honeywell-pc45t',
    'zebra-ds2208',
    'zebra-ds2278',
    'zebra-zd421c',
  ],
  'tablety': [
    'samsung-galaxy-tab-active5',
  ],
  // uwaga: adres kończy się myślnikiem — tak jest w serwisie ZUP
  'urzadzenia-wielofunkcyjne-': [
    'brother-dcp-b7620dw',
    'brother-dcp-l5510dw',
    'brother-hl-l6210dw',
    'brother-hl-l6410',
    'brother-mfc-l5710dw',
    'brother-mfc-l6710dw',
    'brother-mfc-l8390cdw',
    'brother-mfc-l8690cdw',
    'brother-mfc-l8900cdw',
  ],
}

const stronaSkladnicy = (slug, skladnica) => {
  if (skladnica !== 'zup-lodz') return STRONY_POZOSTALE[skladnica]
  const dzial = Object.keys(DZIALY_ZUP).find((d) => DZIALY_ZUP[d].includes(slug)) ?? 'rejestratory'
  return `https://zup.lodz.lasy.gov.pl/${dzial}`
}

/**
 * Wiersze, które są samodzielnym produktem — każdy staje się osobną ofertą
 * **bez wyposażenia**. Dwa powody, żeby tak je oznaczyć:
 *
 * - oferta obejmuje kilka urządzeń, a katalog prowadzi tylko jedno (tablety:
 *   Zebra ET45, Samsung Tab Active 5 i Zebra XSLATE L10 mają w tej samej
 *   tabeli powymieszane ładowarki, a my chcemy samego Samsunga);
 * - cała oferta to płaska lista niezależnych produktów (akcesoria komputerowe),
 *   gdzie normalna reguła zrobiłaby z drugiego i kolejnych wierszy wyposażenie
 *   pierwszego.
 *
 * Dopasowanie idzie po tekście **z linkami**, bo dwie pozycje potrafią mieć
 * identyczną nazwę („Klawiatura i mysz bezprzewodowa DELL”), a różnią się
 * wyłącznie modelem w adresie.
 */
const POJEDYNCZE_POZYCJE = [
  ['TAB ACTIVE 5', 'samsung-galaxy-tab-active5'],
  ['Torba na LAPTOP', 'torba-na-laptopa-15'],
  ['Podkładka pod mysz', 'podkladka-pod-mysz'],
  ['Podnóżek biurowy', 'podnozek-biurowy'],
  ['SSD T9', 'samsung-ssd-t9'],
  ['SSD T7', 'samsung-ssd-t7'],
  ['MS 365 Business Standard', 'ms-365'],
  ['KM5221W', 'dell-km5221'],
  ['KM7321W', 'dell-km7321'],
  ['WRLS KB/MSE Combo', 'hp-655'],
  // Obie wersje all-in-one linkują w druku do tej samej karty, a różnią się
  // systemem, pamięcią i dyskiem — rozróżnia je dopisek przy nazwie.
  ['DELL PRO 24 AiO bez systemu', 'aio-dell-pro-24-bez-systemu'],
  ['DELL PRO 24 AiO z systemem', 'aio-dell-pro-24'],
  ['460 Multi-device', 'hp-460'],
  ['715-6E6FOAA', 'hp-715'],
  ['Torba do laptopów HP', 'torba-hp-15'],
]

const pojedynczaPozycja = (tekst) => {
  const duze = uprosc(tekst)
  return POJEDYNCZE_POZYCJE.find(([fragment]) => duze.includes(uprosc(fragment)))?.[1] ?? null
}

/** Formularze przerobione na PDF i wrzucone do `public/formularze/`. */
const FORMULARZE_PDF = {
  'zebra-em45': '/formularze/zup-lodz-zebra-em45-2026-07.pdf',
}

const oferty = []
const pominiete = []

/**
 * Wszystkie druki ze wskazanych miejsc, bez duplikatów nazw.
 *
 * Argumentem może być katalog albo pojedynczy plik .docx. Pojedyncze pliki są
 * potrzebne, bo w Pobranych obok naszych druków leżą dokumenty, których do
 * katalogu nie chcemy — wskazanie całego folderu wciągnęłoby je razem z resztą.
 */
const dokumenty = new Map()
for (const sciezka of KATALOGI) {
  if (!existsSync(sciezka)) {
    console.error(`nie istnieje: ${sciezka}`)
    process.exit(1)
  }
  // macOS podaje nazwy plików w NFD („ą” = a + ogonek), a w zapisanych danych
  // stoją NFC. Bez ujednolicenia ten sam druk raz wygląda na nowy, a raz na
  // zniknięty z dysku — klucze map trzymamy więc zawsze w NFC.
  const klucz = (nazwa) => nazwa.normalize('NFC')
  if (sciezka.endsWith('.docx')) {
    const plik = klucz(basename(sciezka))
    if (!dokumenty.has(plik)) dokumenty.set(plik, sciezka)
    continue
  }
  for (const nazwa of readdirSync(sciezka).sort()) {
    if (!nazwa.endsWith('.docx') || nazwa.startsWith('~$')) continue
    const plik = klucz(nazwa)
    if (!dokumenty.has(plik)) dokumenty.set(plik, join(sciezka, nazwa))
  }
}

for (const [plik, sciezka] of dokumenty) {
  if (WYCOFANE.includes(plik)) {
    pominiete.push([plik, 'model wycofany z produkcji — druk celowo pomijany'])
    continue
  }
  let xml
  try {
    xml = czytajDocx(sciezka)
  } catch {
    pominiete.push([plik, 'nie da się odczytać'])
    continue
  }

  const linie = akapity(xml)
  const skladnica = rozpoznajSkladnice(linie.slice(0, 20).join(' '))

  // Jeden plik bywa kilkoma ofertami — oferta na laptopy ma osobną część na sam
  // laptop i osobną na laptop ze stacją dokującą, każdą z własnym terminem.
  // Akapit „Oferta aktualna na zamówienia złożone w okresie…” otwiera sekcję,
  // a tabele z cenami należą do ostatniej sekcji otwartej przed nimi.
  const sekcje = []
  for (const m of xml.matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)) {
    const o = okresObowiazywania([tekstAkapitu(m[0])])
    if (o) sekcje.push({ poczatek: m.index, okres: o, tabele: [] })
  }

  // Nagłówek „Nazwa | Cena sprzedaży…” bywa osobną tabelą nad danymi, więc
  // rozpoznajemy też tabele bez nagłówka: takie, w których wiersz ma nazwę
  // w pierwszej komórce i kwotę w drugiej.
  const zKwotami = (tabela) =>
    [...tabela.matchAll(/<w:tr[ >][\s\S]*?<\/w:tr>/g)].some((w) => {
      const k = komorki(w[0])
      return k.length >= 2 && k[0].etykieta && k[1]?.pelny && naKwote(k[1].pelny) !== null
    })

  const tabele = [...xml.matchAll(/<w:tbl>[\s\S]*?<\/w:tbl>/g)].filter(
    (m) => /Cena sprzeda/i.test(m[0]) || zKwotami(m[0])
  )
  if (!tabele.length) {
    pominiete.push([plik, 'brak tabeli z cenami'])
    continue
  }
  if (!sekcje.length) sekcje.push({ poczatek: -1, okres: null, tabele: [] })
  for (const t of tabele) {
    const s = [...sekcje].reverse().find((x) => x.poczatek < t.index) ?? sekcje[0]
    s.tabele.push(t[0])
  }

  // druki wstawiają spacje wewnątrz nawiasów („( karton 60 szt. )”)
  const bezPromo = (t) =>
    t
      .replace(/\s*PROMOCJA\s*/gi, ' ')
      .replace(/\(\s+/g, '(')
      .replace(/\s+\)/g, ')')
      .replace(/\s+/g, ' ')
      .trim()

  for (const sekcja of sekcje) {
    if (!sekcja.tabele.length) continue

    const wiersze = sekcja.tabele.flatMap((t) =>
      [...t.matchAll(/<w:tr[ >][\s\S]*?<\/w:tr>/g)].map((m) => komorki(m[0]))
    )

    const pozycje = []
    // wiersz z jedną komórką to podtytuł nad pozycją (np. „Stacja dokująca do
    // rejestratora Zebra EM45”), a właściwa nazwa z ceną jest w wierszu niżej
    let oczekujacyNaglowek = null
    // „Materiały eksploatacyjne do drukarki BROTHER DCPB7620DW” otwiera blok
    // wyposażenia konkretnego modelu. Bez tego tonery jednej drukarki dopisują
    // się do poprzedniej pozycji w tabeli.
    let blokWyposazenia = null

    for (const [numer, wiersz] of wiersze.entries()) {
      const [nazwa, cena] = wiersz
      if (!nazwa || /^Nazwa$/i.test(nazwa.etykieta)) continue

      if (wiersz.length === 1 || !cena?.pelny) {
        if (nazwa.etykieta) oczekujacyNaglowek = bezPromo(nazwa.etykieta)
        if (NAGLOWEK_BLOKU.test(nazwa.pelny)) {
          blokWyposazenia = { slug: dopasujSlug(nazwa.pelny), opis: nazwa.etykieta }
          oczekujacyNaglowek = null
        }
        continue
      }

      // urządzenie zamyka blok wyposażenia poprzedniego modelu
      const przedBlokiem = nagłówekPoWierszu(wiersze, numer)
      if (przedBlokiem || nazwa.linie.filter((l) => PARAMETR.test(l)).length >= 2) {
        blokWyposazenia = null
      }

      const kwota = naKwote(cena.pelny)
      if (kwota === null) {
        if (nazwa.etykieta) oczekujacyNaglowek = bezPromo(nazwa.etykieta)
        continue
      }

      const nazwaPozycji = skrocNazwe(oczekujacyNaglowek || bezPromo(nazwa.etykieta))
      if (pomijana(nazwaPozycji)) {
        oczekujacyNaglowek = null
        continue
      }

      pozycje.push({
        // nagłówek nad wierszem bywa właściwą nazwą pozycji („Stacja dokująca do
        // rejestratora Zebra EM45”); nagłówki bloków wyposażenia są zdejmowane
        // wcześniej, więc nie podmieniają nazw tonerów
        nazwa: nazwaPozycji,
        cenaNetto: kwota,
        promocja: /PROMOCJA/i.test(nazwa.pelny) || /PROMOCJA/i.test(cena.pelny),
        wZestawie: wZestawie(nazwa.linie),
        // pola robocze, zdejmowane przed zapisem
        _slug: slugZLinku(nazwa.zLinkami),
        _tekst: nazwa.pelny,
        _dostawca: dostawcaPozycji(nazwa.pelny),
        _blok: blokWyposazenia,
        _zLinkami: nazwa.zLinkami,
        _linie: nazwa.linie.length,
        _parametry: nazwa.linie.filter((l) => PARAMETR.test(l)).length,
        // pozycja tuż nad nagłówkiem bloku to urządzenie, nawet opisana jedną
        // linijką — tak wyglądają czytniki i drukarki w druku na sprzęt do EZD
        _przedBlokiem: przedBlokiem,
      })
      oczekujacyNaglowek = null
    }

    if (!pozycje.length) {
      pominiete.push([plik, 'brak wierszy z cenami'])
      continue
    }

    // Pozycja z linkiem do karty to urządzenie i otwiera własną ofertę. Reszta
    // to wyposażenie: idzie do modeli tej samej marki, a gdy marki nie widać —
    // do urządzenia, pod którym stoi w dokumencie.
    const grupy = []
    // model rozpoznany po linku do karty albo po nazwie z tabeli MODELE
    for (const p of pozycje) p._slug = p._slug ?? slugUrzadzenia(p)
    const zLinkiem = pozycje.filter((p) => p._slug)

    // Pozycje wyjmowane pojedynczo wychodzą z puli jako osobne oferty bez
    // wyposażenia — reszta dokumentu opisuje inne modele i ich nie dotyczy.
    const grupyPojedyncze = pozycje
      .filter((p) => pojedynczaPozycja(p._zLinkami))
      .map((p) => ({ slug: pojedynczaPozycja(p._zLinkami), urzadzenie: p, dodatki: [] }))
    if (grupyPojedyncze.length && grupyPojedyncze.length < pozycje.length) {
      const poza = pozycje.length - grupyPojedyncze.length
      pominiete.push([plik, `${poza} pozycji poza wybranym urządzeniem`])
    }

    if (grupyPojedyncze.length) {
      grupy.push(...grupyPojedyncze)
    } else if (zLinkiem.length) {
      for (const p of pozycje) {
        if (p._slug) {
          grupy.push({ slug: p._slug, urzadzenie: p, dodatki: [] })
          continue
        }
        // wiersz bez karty, a niebędący wyposażeniem, to inne urządzenie z tego
        // samego druku — zamyka poprzednią grupę i wypada, zamiast dopisywać się
        // do sąsiada jako pozycja dodatkowa
        if (wyglądaNaUrzadzenie(p) && !p._blok) {
          pominiete.push([plik, `urządzenie bez karty: ${p.nazwa}`])
          grupy.push({ slug: null, urzadzenie: p, dodatki: [] })
          continue
        }

        // Blok „Materiały eksploatacyjne do …” wskazuje model w nagłówku. Gdy
        // nazwa modelu z nagłówka nie ma odpowiednika w katalogu, blok i tak
        // należy do urządzenia, pod którym stoi — a jeśli tamto nie ma karty,
        // trafia do jego zaślepki i wypada razem z nim.
        if (p._blok) {
          const cel =
            grupy.find((g) => p._blok.slug && g.slug === p._blok.slug) ?? grupy[grupy.length - 1]
          if (!cel) {
            pominiete.push([plik, `wyposażenie bez urządzenia: ${p._blok.opis}`])
            continue
          }
          if (!cel.slug) {
            pominiete.push([plik, `wyposażenie urządzenia bez karty: ${p.nazwa}`])
            continue
          }
          cel.dodatki.push(p)
          continue
        }
        const m = marka(p._tekst)
        const cel = m ? grupy.filter((g) => g.slug.startsWith(`${m}-`)) : []
        const trafione = cel.length ? cel : grupy.slice(-1)
        if (!trafione.length) {
          pominiete.push([plik, `pozycja bez urządzenia: ${p.nazwa}`])
          continue
        }
        for (const g of trafione) g.dodatki.push(p)
      }
    } else {
      const [urzadzenie, ...dodatki] = pozycje
      const slug = dopasujSlug(`${plik} ${urzadzenie._tekst}`)
      if (!slug) {
        pominiete.push([plik, 'brak karty produktu'])
        continue
      }
      grupy.push({ slug, urzadzenie, dodatki })
    }

    const czysta = ({
      _slug, _tekst, _zLinkami, _dostawca, _blok, _linie, _parametry, _przedBlokiem, ...reszta
    }) => reszta

    for (const g of grupy.filter((g) => g.slug)) {
      oferty.push({
        slug: g.slug,
        skladnica,
        plik,
        formularz: FORMULARZE_PDF[g.slug] ?? null,
        strona: stronaSkladnicy(g.slug, skladnica),
        okres: sekcja.okres,
        dostawca: g.urzadzenie._dostawca,
        urzadzenie: czysta(g.urzadzenie),
        dodatki: g.dodatki.map(czysta),
      })
    }
  }
}

/**
 * Oferty z druków, których w skanowanych katalogach nie było.
 *
 * Druki wędrują po Pobranych i bywają kasowane — `Oferta Laptopy_06.2026.docx`
 * zniknęła stamtąd w sierpniu 2026, a jest jedynym źródłem cen na laptopy.
 * Bez tego przeniesienia każde odświeżenie danych po cichu wycinałoby oferty,
 * których dokumentu akurat nie ma pod ręką. Zachowane wpisy są wypisywane
 * na konsolę, żeby nikt nie odkrył ich przypadkiem za pół roku.
 */
const zachowane = []
if (existsSync(WYJSCIE)) {
  const stary = readFileSync(WYJSCIE, 'utf8')
  // uwaga: `indexOf('[')` po samej nazwie stałej trafiłby w nawias adnotacji
  // typu (`OfertaSkladnicy[]`), więc szukamy dopiero za znakiem równości
  const naglowek = 'OFERTY_SKLADNICY: OfertaSkladnicy[] ='
  const start = stary.indexOf('[', stary.indexOf(naglowek) + naglowek.length)
  const koniec = stary.indexOf('\n]', start) + 2
  if (start > 0 && koniec > start) {
    for (const o of JSON.parse(stary.slice(start, koniec))) {
      const plik = o.plik.normalize('NFC')
      if (!dokumenty.has(plik) && !WYCOFANE.includes(plik)) zachowane.push(o)
    }
  }
}
oferty.push(...zachowane)

// jeden model w jednej składnicy = jedna oferta; przy duplikatach wygrywa nowsza
const najnowsze = new Map()
for (const o of oferty) {
  const klucz = `${o.slug}::${o.skladnica}`
  const poprzednia = najnowsze.get(klucz)
  const data = (x) => x.okres?.do ?? x.okres?.od ?? ''
  if (!poprzednia || data(o) > data(poprzednia)) najnowsze.set(klucz, o)
}

const wynik = [...najnowsze.values()].sort(
  (a, b) => a.slug.localeCompare(b.slug) || a.skladnica.localeCompare(b.skladnica)
)

// bramka jakości — lepiej nie wygenerować pliku niż wpuścić na kartę bzdurną cenę
const bledy = []
for (const o of wynik) {
  // druk w komunikacie, bo bez niego szukanie winowajcy w kilku katalogach to zgadywanka
  if (!existsSync(join('app/produkt', o.slug))) bledy.push(`${o.slug}: brak karty produktu (${o.plik})`)
  if (!o.okres) bledy.push(`${o.slug}: nie rozpoznano okresu obowiązywania (${o.plik})`)
  const kwoty = [o.urzadzenie, ...o.dodatki]
  for (const k of kwoty) {
    if (!(k.cenaNetto > 0 && k.cenaNetto < 100000)) bledy.push(`${o.slug}: podejrzana kwota ${k.cenaNetto} (${k.nazwa})`)
    if (!k.nazwa || k.nazwa.length > 140) bledy.push(`${o.slug}: podejrzana nazwa pozycji „${k.nazwa.slice(0, 60)}…”`)
  }
}
if (bledy.length) {
  console.error('PRZERWANO — dane nie przeszły walidacji:')
  for (const b of bledy) console.error('  ' + b)
  process.exit(1)
}

const ts = `// PLIK GENEROWANY — nie edytować ręcznie.
// Źródło: oferty składnic (.docx). Odświeżenie:
//   node scripts/parsuj-oferty-zup.mjs "<katalog z ofertami>"

import type { KodSkladnicy } from './skladnice'

export type PozycjaOferty = {
  nazwa: string
  cenaNetto: number
  promocja?: boolean
  /** co dokument wymienia jako wchodzące w tę cenę */
  wZestawie?: string[]
}

export type OfertaSkladnicy = {
  /** slug karty produktu */
  slug: string
  /** która składnica prowadzi tę ofertę */
  skladnica: KodSkladnicy
  /** nazwa źródłowego pliku z ofertą */
  plik: string
  /** formularz do pobrania z naszego serwera, jeśli został przygotowany */
  formularz: string | null
  /** podstrona składnicy z tym asortymentem; bez niej link idzie na \`www\` składnicy */
  strona?: string
  /** okres, w którym składnica przyjmuje zamówienia po tych cenach */
  okres: { od: string; do: string | null } | null
  /** kto według dokumentu odpowiada za dostawę i serwis; null, gdy nie jest podany */
  dostawca?: string | null
  urzadzenie: PozycjaOferty
  dodatki: PozycjaOferty[]
}

export const OFERTY_SKLADNICY: OfertaSkladnicy[] = ${JSON.stringify(wynik, null, 2)}

/** Wszystkie oferty na dany model — po jednej z każdej składnicy, która go ma. */
export const ofertyDla = (slug: string): OfertaSkladnicy[] =>
  OFERTY_SKLADNICY.filter((o) => o.slug === slug)
`

writeFileSync(WYJSCIE, ts)

console.log(`zapisano ${WYJSCIE}: ${wynik.length} ofert`)
for (const o of wynik) {
  const ile = o.dodatki.length
  console.log(
    `  ${o.slug.padEnd(22)} ${String(o.urzadzenie.cenaNetto).padStart(9)} zł netto` +
      `  ${o.okres ? o.okres.od + '…' + (o.okres.do ?? 'do odwołania') : 'BRAK OKRESU'}  (+${ile} pozycji)`
  )
}
if (zachowane.length) {
  const zDrukow = [...new Set(zachowane.map((o) => o.plik))]
  console.log(`\nzachowane z poprzedniego przebiegu (${zachowane.length} ofert z ${zDrukow.length} druków,`)
  console.log('których nie było w skanowanych katalogach):')
  for (const p of zDrukow) console.log(`  ${p}`)
}
if (pominiete.length) {
  console.log('\npominięte:')
  for (const [p, powod] of pominiete) console.log(`  ${p} — ${powod}`)
}
