'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'brother-dcp-l5510dw',
  name: 'Brother DCP-L5510DW',
  category: 'Urządzenia wielofunkcyjne',
  categoryHref: '/kategoria/urzadzenia-wielofunkcyjne',
  images: ['/DCPL5510DW_1.png'],
  inquiry: {
    description: 'Monochromatyczne urządzenie 3 w 1 do kancelarii',
    specifications: 'Mono laser · druk 48 str./min · skan · kopia · dupleks · Wi-Fi i Ethernet',
  },
  whyNavLabel: 'Dlaczego DCP-L5510DW',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W kancelarii nadleśnictwa',
  highlights: [
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: '48 stron/min (A4)' },
    { icon: ICON.dwustronny, label: 'Dupleks', value: 'automatyczny, 24 str./min' },
    { icon: ICON.adf, label: 'Podajnik ADF', value: '50 arkuszy' },
    { icon: ICON.siec, label: 'Łączność', value: 'Wi-Fi, Gigabit Ethernet, USB' },
  ],
  specGroups: [
    {
      title: 'Ogólne',
      rows: [
        { k: 'Typ', v: 'monochromatyczna, laserowa' },
        { k: 'Funkcje', v: 'druk, kopiowanie, skanowanie' },
        { k: 'Panel', v: 'kolorowy ekran dotykowy 8,9 cm' },
        { k: 'Łączność', v: 'USB 2.0, Gigabit Ethernet, Wi-Fi' },
      ],
    },
    {
      title: 'Drukowanie',
      rows: [
        { k: 'Prędkość jednostronnie', v: '48 stron/min (A4)' },
        { k: 'Prędkość dwustronnie', v: '24 strony/min (A4)' },
        { k: 'Dupleks', v: 'automatyczny' },
        { k: 'Rozdzielczość', v: 'do 1200 × 1200 dpi' },
        { k: 'Pamięć', v: '512 MB' },
      ],
    },
    {
      title: 'Obsługa papieru',
      rows: [
        { k: 'Podajnik główny', v: '250 arkuszy' },
        { k: 'Podajnik wielofunkcyjny', v: '100 arkuszy' },
        { k: 'Odbiornik', v: '150 arkuszy' },
        { k: 'ADF', v: '50 arkuszy' },
        { k: 'Formaty', v: 'A4, Legal, Letter, A5, A6' },
      ],
    },
    {
      title: 'Skanowanie i eksploatacja',
      rows: [
        { k: 'Skaner', v: 'CIS, do 1200 × 1200 dpi' },
        { k: 'Skan mono', v: '28 ipm' },
        { k: 'Skan kolor', v: '20 ipm' },
        { k: 'Kopiowanie', v: '48 kopii/min' },
        { k: 'Cykl pracy', v: 'do 5000 stron miesięcznie' },
        { k: 'Druk mobilny', v: 'AirPrint, Mopria, iPrint&Scan' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.szybkosc,
      title: 'Czterdzieści osiem stron na minutę',
      body:
        'Wydruk protokołów i zestawień nie tworzy kolejki przy urządzeniu — kancelaria odbiera dokumenty od razu po wysłaniu zadania.',
    },
    {
      icon: ICON.dwustronny,
      title: 'Dupleks bez przekładania kartek',
      body:
        'Automatyczny druk dwustronny z prędkością 24 stron na minutę zmniejsza zużycie papieru o połowę.',
    },
    {
      icon: ICON.papier,
      title: 'Trzysta pięćdziesiąt arkuszy zapasu',
      body:
        'Podajnik główny na 250 arkuszy i wielofunkcyjny na 100 pozwalają drukować cały dzień bez dokładania papieru.',
    },
    {
      icon: ICON.siec,
      title: 'Gigabit Ethernet i Wi-Fi',
      body:
        'Urządzenie wpina się w sieć kancelarii kablem lub bezprzewodowo, a druk mobilny obsługuje AirPrint i Mopria.',
    },
  ],
  usedBy: { device: 'Brother DCP-L5510DW' },
  whereToBuy: [{ name: 'ZUP Łódź' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.szybkosc,
      title: 'Monochromatyczna, bardzo szybka',
      body:
        'Drukuje czarno-biało z prędkością 48 stron na minutę. Technologia laserowa daje ostry tekst, odpowiedni do dokumentów urzędowych i wydruków leśnych.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Brother MFC-L5710DW',
      href: '/produkt/brother-mfc-l5710dw',
      note: 'Ten sam druk plus faks i skanowanie dwustronne',
    },
  ],
}

export default function BrotherDCPL5510DWPage() {
  return <ProductPage data={data} />
}
