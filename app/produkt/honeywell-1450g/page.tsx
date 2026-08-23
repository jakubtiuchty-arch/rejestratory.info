'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'honeywell-1450g',
  name: 'Honeywell Voyager 1450g',
  category: 'Elektroniczne Zarządzanie Dokumentacją',
  categoryHref: '/kategoria/ezd',
  images: ['/1450g_1.png'],
  inquiry: {
    description: 'Czytnik przewodowy kodów 2D',
    specifications: 'Kody 1D, PDF417 i 2D · zasięg 2,5–26 cm · IP40 · 30 upadków z 1,5 m · USB, KBW, RS232',
  },
  whyNavLabel: 'Dlaczego 1450g',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W obiegu dokumentów',
  highlights: [
    { icon: ICON.skaner, label: 'Odczyt', value: '1D, PDF417 i kody 2D' },
    { icon: ICON.porty, label: 'Interfejsy', value: 'USB, Keyboard Wedge, RS232' },
    { icon: ICON.upadek, label: 'Odporność', value: '30 upadków z 1,5 m' },
    { icon: ICON.waga, label: 'Waga', value: '130 g' },
  ],
  specGroups: [
    {
      title: 'Odczyt',
      rows: [
        { k: 'Przetwornik', v: 'obszarowy 640 × 480 px' },
        { k: 'Kody 1D', v: 'wszystkie standardowe symboliki' },
        { k: 'Kody 2D', v: 'PDF417, DataMatrix, QR Code, Aztec, MaxiCode' },
        { k: 'Kąt odczytu', v: 'pitch 45°, skew 65°' },
        { k: 'Kontrast', v: 'minimum 20 %' },
      ],
    },
    {
      title: 'Zasięg',
      rows: [
        { k: 'Kod 13 mil UPC', v: '3,7–26,0 cm' },
        { k: 'Code 39, 5 mil', v: '5,1–12,7 cm' },
        { k: 'DataMatrix, 10 mil', v: '4,6–12,7 cm' },
        { k: 'QR Code, 20 mil', v: '2,5–19,1 cm' },
      ],
    },
    {
      title: 'Obudowa',
      rows: [
        { k: 'Wymiary', v: '16,5 × 10,4 × 6,6 cm' },
        { k: 'Waga', v: '130 g' },
        { k: 'Upadki', v: '30 upadków z 1,5 m na beton' },
        { k: 'Klasa szczelności', v: 'IP40' },
        { k: 'Temperatura pracy', v: 'od 0 °C do +50 °C' },
        { k: 'Wilgotność', v: 'do 95 %, bez kondensacji' },
      ],
    },
    {
      title: 'Złącza i zasilanie',
      rows: [
        { k: 'Interfejsy', v: 'USB, Keyboard Wedge, RS232' },
        { k: 'Napięcie', v: '4,0–5,5 V' },
        { k: 'Pobór prądu', v: '250 mA przy pracy, 90 mA w czuwaniu' },
        { k: 'Oświetlenie', v: 'LED 617 nm' },
        { k: 'Celownik', v: 'LED 526 nm' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.porty,
      title: 'Działa bez instalowania sterowników',
      body:
        'W trybie Keyboard Wedge czytnik wpisuje odczytany kod jak klawiatura, więc współpracuje z każdym programem przyjmującym tekst.',
    },
    {
      icon: ICON.skaner,
      title: 'Nie trzeba celować',
      body:
        'Kod odczytuje się pod kątem do 45° i z odległości od 2,5 do 26 cm, więc pismo wystarczy podsunąć pod czytnik.',
    },
    {
      icon: ICON.upadek,
      title: 'Trzydzieści upadków z półtora metra',
      body:
        'Deklarowana odporność na wielokrotne upadki na beton przy klasie IP40 — czytnik do stanowiska, przy którym pracuje kilka osób.',
    },
    {
      icon: ICON.waga,
      title: 'Sto trzydzieści gramów',
      body:
        'Lekki na tyle, żeby trzymać go w ręku przez całą serię dokumentów bez zmęczenia nadgarstka.',
    },
  ],
  signature: [
    {
      icon: ICON.skandok,
      title: 'Czyta kod z ekranu, nie tylko z papieru',
      body:
        'Przetwornik obszarowy 640 × 480 radzi sobie z kodem wyświetlonym na monitorze — pismo w obiegu elektronicznym nie musi trafić najpierw na wydruk.',
      tone: 'akcent',
    },
  ],
  usedBy: { device: 'Honeywell 1450g' },
  related: [
    {
      name: 'Zebra DS2208',
      href: '/produkt/zebra-ds2208',
      note: 'Czytnik 2D z pięcioletnią gwarancją i klasą IP52',
    },
  ],
}

export default function Honeywell1450gPage() {
  return <ProductPage data={data} />
}
