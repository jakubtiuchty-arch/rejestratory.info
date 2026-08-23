'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'zebra-ds2278',
  name: 'Zebra DS2278',
  category: 'Elektroniczne Zarządzanie Dokumentacją',
  categoryHref: '/kategoria/ezd',
  images: ['/zebra-ds2278.png'],
  inquiry: {
    description: 'Bezprzewodowy czytnik kodów 1D i 2D z podstawką',
    specifications: 'Bluetooth · akumulator 2400 mAh do 84 h · kody 1D i 2D · IP52 · podstawka w komplecie',
  },
  whyNavLabel: 'Dlaczego DS2278',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W obiegu dokumentów',
  highlights: [
    { icon: ICON.bluetooth, label: 'Łączność', value: 'Bluetooth, bez kabla do czytnika' },
    { icon: ICON.bateria, label: 'Akumulator', value: '2400 mAh, do 84 h pracy' },
    { icon: ICON.skaner, label: 'Odczyt', value: 'kody 1D i 2D, w tym QR' },
    { icon: ICON.upadek, label: 'Odporność', value: 'upadki z 1,5 m, IP52' },
  ],
  specGroups: [
    {
      title: 'Łączność',
      rows: [
        { k: 'Standard', v: 'Bluetooth' },
        { k: 'Zasięg', v: 'do 100 m w otwartej przestrzeni' },
        { k: 'Podstawka', v: 'CR2278-PC, komunikacja i ładowanie' },
        { k: 'Połączenie z komputerem', v: 'kabel USB od podstawki' },
      ],
    },
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Akumulator', v: 'litowo-jonowy 2400 mAh' },
        { k: 'Czas pracy', v: 'do 84 godzin' },
        { k: 'Odczyty na ładowaniu', v: 'do 110 000' },
        { k: 'Ładowanie', v: 'w podstawce albo kablem micro-USB' },
        { k: 'Pełne ładowanie', v: '7 godzin, na zmianę wystarczy 1 godzina' },
      ],
    },
    {
      title: 'Odczyt',
      rows: [
        { k: 'Kody', v: '1D i 2D, w tym QR i DataMatrix' },
        { k: 'Zasięg odczytu', v: '1,3–36,8 cm' },
        { k: 'Skanowanie z ekranu', v: 'tak, także z telefonu i monitora' },
      ],
    },
    {
      title: 'Obudowa',
      rows: [
        { k: 'Odporność na upadki', v: '250 upadków z 0,5 m' },
        { k: 'Szczelność', v: 'IP52' },
        { k: 'Waga', v: '214 g' },
        { k: 'Wymiary', v: '175,3 × 66 × 88,9 mm' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.bluetooth,
      title: 'Kabel zostaje przy podstawce',
      body:
        'Czytnik odchodzi od stanowiska na odległość całego pokoju, więc paczkę z dokumentami skanuje się tam, gdzie leży, zamiast nosić ją do biurka.',
    },
    {
      icon: ICON.bateria,
      title: 'Osiemdziesiąt cztery godziny na ładowaniu',
      body:
        'Akumulator 2400 mAh wystarcza na kilkanaście dni pracy kancelaryjnej, a godzina w podstawce daje zapas na całą zmianę.',
    },
    {
      icon: ICON.skaner,
      title: 'Kody z papieru i z ekranu',
      body:
        'Czytnik obszarowy bierze kody 1D i 2D także wyświetlone na monitorze czy telefonie — pismo przychodzące nie musi być wydrukowane.',
    },
    {
      icon: ICON.upadek,
      title: 'Zniesie upadek z biurka',
      body:
        'Konstrukcja przechodzi 250 upadków z pół metra i ma klasę IP52 — kurz i przypadkowe zrzucenie z blatu jej nie kończą.',
    },
  ],
  signature: [
    {
      icon: ICON.bluetooth,
      title: 'Ta sama obsługa co DS2208, tylko bez kabla',
      body:
        'Bezprzewodowa odmiana czytnika, który już pracuje w kancelariach. Podstawka służy jednocześnie za ładowarkę i za łącze do komputera, więc na biurku nie przybywa osprzętu.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Zebra DS2208',
      href: '/produkt/zebra-ds2208',
      note: 'Wersja przewodowa, taniej',
    },
    {
      name: 'Epson DS-730n',
      href: '/produkt/epson-ds730n',
      note: 'Skaner dokumentów do tego samego stanowiska',
    },
  ],
}

export default function ZebraDS2278Page() {
  return <ProductPage data={data} />
}
