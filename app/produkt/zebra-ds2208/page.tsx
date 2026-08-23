'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'zebra-ds2208',
  name: 'Zebra DS2208',
  category: 'Elektroniczne Zarządzanie Dokumentacją',
  categoryHref: '/kategoria/ezd',
  images: ['/zebra-ds2208.png'],
  inquiry: {
    description: 'Czytnik kodów 1D i 2D do stanowiska kancelaryjnego',
    specifications: 'Kody 1D i 2D · zasięg do 36,8 cm · upadki z 1,5 m · IP52 · USB i RS232',
  },
  whyNavLabel: 'Dlaczego DS2208',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W obiegu dokumentów',
  highlights: [
    { icon: ICON.skaner, label: 'Odczyt', value: 'kody 1D i 2D, w tym QR' },
    { icon: ICON.upadek, label: 'Odporność', value: 'upadki z 1,5 m, IP52' },
    { icon: ICON.waga, label: 'Waga', value: '161,6 g' },
    { icon: ICON.wsparcie5, label: 'Gwarancja', value: '60 miesięcy' },
  ],
  variants: [
    { id: 'kolor', label: 'Kolor obudowy', options: ['Twilight Black', 'Nova White'] },
  ],
  specGroups: [
    {
      title: 'Dekodowanie',
      rows: [
        { k: 'Kody 1D', v: 'Code 39, Code 128, Code 93, Codabar, UPC/EAN, GS1 DataBar' },
        { k: 'Kody 2D', v: 'PDF417, Aztec, DataMatrix, MaxiCode, QR Code, Micro QR' },
        { k: 'Minimalna rozdzielczość', v: 'Code 39 — 4 mil, DataMatrix — 6 mil, QR — 6,7 mil' },
      ],
    },
    {
      title: 'Wydajność odczytu',
      rows: [
        { k: 'Zasięg UPC 13 mil', v: '1,3–36,8 cm' },
        { k: 'Zasięg Code 39, 5 mil', v: '0,5–15,2 cm' },
        { k: 'Zasięg DataMatrix, 10 mil', v: '0,8–15,7 cm' },
        { k: 'Tolerancja ruchu', v: 'do 13 cm/s w ręku, 76,2 cm/s w podstawce' },
      ],
    },
    {
      title: 'Obudowa',
      rows: [
        { k: 'Wymiary', v: '16,5 × 6,6 × 9,9 cm' },
        { k: 'Waga', v: '161,6 g' },
        { k: 'Upadki', v: 'wielokrotne z 1,5 m na beton' },
        { k: 'Klasa szczelności', v: 'IP52' },
        { k: 'Temperatura pracy', v: 'od 0 °C do +50 °C' },
      ],
    },
    {
      title: 'Złącza i zasilanie',
      rows: [
        { k: 'Interfejsy', v: 'USB, RS232, Keyboard Wedge, TGCS (IBM) 46XX' },
        { k: 'Układy klawiatury', v: 'ponad 90 międzynarodowych' },
        { k: 'Zasilanie', v: '4,5–5,5 V z hosta lub zewnętrzne' },
        { k: 'Gwarancja', v: '60 miesięcy' },
        { k: 'Wsparcie', v: 'Zebra OneCare Essential lub Select' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.skaner,
      title: 'Odczyt kodu z ekranu i z papieru',
      body:
        'Czytnik obszarowy radzi sobie z kodami 2D wyświetlonymi na monitorze i z nadrukiem na piśmie — obieg dokumentów nie wymaga drukowania kodu na papier.',
    },
    {
      icon: ICON.upadek,
      title: 'Zniesie upadek z półtora metra',
      body:
        'Wielokrotne upadki na beton i klasa IP52 przy wadze 162 gramów — sprzęt do codziennego używania, nie do ostrożnego obchodzenia się.',
    },
    {
      icon: ICON.klawiatura,
      title: 'Działa bez instalowania sterowników',
      body:
        'W trybie Keyboard Wedge czytnik wpisuje kod jak klawiatura, więc współpracuje z każdym systemem, który przyjmuje tekst.',
    },
    {
      icon: ICON.wsparcie5,
      title: 'Pięć lat gwarancji',
      body:
        'Sześćdziesiąt miesięcy od daty wysyłki, z opcją rozszerzenia o pakiety Zebra OneCare.',
    },
  ],
  signature: [
    {
      icon: ICON.wsparcie5,
      title: 'Pięć lat gwarancji producenta',
      body:
        'Sześćdziesiąt miesięcy od daty wysyłki — dwukrotnie dłużej niż typowa gwarancja na czytnik w tej klasie.',
      tone: 'akcent',
    },
  ],
  usedBy: { device: 'Zebra DS2208' },
  related: [
    {
      name: 'Honeywell 1450g',
      href: '/produkt/honeywell-1450g',
      note: 'Tańszy czytnik z możliwością rozbudowy do 2D',
    },
  ],
}

export default function ZebraDS2208Page() {
  return <ProductPage data={data} />
}
