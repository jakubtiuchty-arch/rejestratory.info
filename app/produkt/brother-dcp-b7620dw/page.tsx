'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'brother-dcp-b7620dw',
  name: 'Brother DCP-B7620DW',
  category: 'Drukarki laserowe',
  categoryHref: '/kategoria/drukarki-laserowe',
  images: ['/dcpb75620dwph.png'],
  inquiry: {
    description: 'Kompaktowe urządzenie 3 w 1 na mniejsze stanowisko',
    specifications: 'Mono laser · 34 str./min · skan · kopia · Wi-Fi',
  },
  whyNavLabel: 'Dlaczego DCP-B7620DW',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W kancelarii nadleśnictwa',
  highlights: [
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: '34 strony/min (A4)' },
    { icon: ICON.skandok, label: 'Skanowanie', value: '22,5 ipm mono' },
    { icon: ICON.kompakt, label: 'Format', value: 'urządzenie 3 w 1' },
    { icon: ICON.siec, label: 'Łączność', value: 'Wi-Fi, Ethernet, USB' },
  ],
  specGroups: [
    {
      title: 'Ogólne',
      rows: [
        { k: 'Typ', v: 'monochromatyczna, laserowa' },
        { k: 'Funkcje', v: 'druk, kopiowanie, skanowanie' },
        { k: 'Panel', v: 'wyświetlacz LCD dwuwierszowy' },
        { k: 'Pamięć', v: '256 MB' },
        { k: 'Łączność', v: 'USB 2.0, Ethernet, Wi-Fi' },
      ],
    },
    {
      title: 'Drukowanie',
      rows: [
        { k: 'Prędkość', v: '34 strony/min (A4)' },
        { k: 'Dupleks', v: 'ręczny, 16 stron/min' },
        { k: 'Rozdzielczość', v: 'do 1200 × 1200 dpi' },
      ],
    },
    {
      title: 'Obsługa papieru',
      rows: [
        { k: 'Podajnik główny', v: '250 arkuszy' },
        { k: 'Podajnik ręczny', v: '1 arkusz' },
        { k: 'Odbiornik', v: '120 arkuszy' },
        { k: 'Formaty', v: 'A4, Letter, B5, A5, A6' },
        { k: 'Gramatura', v: '60–230 g/m²' },
      ],
    },
    {
      title: 'Skanowanie i eksploatacja',
      rows: [
        { k: 'Skaner', v: 'CIS' },
        { k: 'Skan mono', v: '22,5 ipm' },
        { k: 'Skan kolor', v: '7,5 ipm' },
        { k: 'Kopiowanie', v: '34 kopie/min' },
        { k: 'Cykl pracy', v: 'do 2500 stron miesięcznie' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.kompakt,
      title: 'Druk, kopia i skan w jednej obudowie',
      body:
        'Na małym stanowisku zastępuje trzy urządzenia, a zajmuje tyle miejsca co zwykła drukarka.',
    },
    {
      icon: ICON.szybkosc,
      title: 'Trzydzieści cztery strony na minutę',
      body:
        'Prędkość wystarczająca do bieżącej korespondencji i kopii dokumentów w kancelarii leśnictwa.',
    },
    {
      icon: ICON.skandok,
      title: 'Skanowanie z prędkością 22,5 ipm',
      body:
        'Kopiowanie i skanowanie dokumentów bez wysyłania ich na inne stanowisko.',
    },
    {
      icon: ICON.siec,
      title: 'Wi-Fi i Ethernet w standardzie',
      body:
        'Urządzenie wpina się w sieć kablem lub bezprzewodowo i obsługuje druk z telefonu przez AirPrint i Mopria.',
    },
  ],
  usedBy: { device: 'Brother DCP-B7620DW' },
  whereToBuy: [{ name: 'ZUP Łódź' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.kompakt,
      title: 'Trzy funkcje na najmniejszym stanowisku',
      body:
        'Druk, kopiowanie i skanowanie w obudowie wielkości zwykłej drukarki — rozwiązanie dla leśnictwa albo pokoju, w którym nie ma miejsca na osobne urządzenia.',
      tone: 'akcent',
    },
  ],
  accessoriesHeading: 'Materiały eksploatacyjne — dodaj do zapytania',
  accessories: [
    {
      id: 'toner',
      name: 'Toner czarny Brother',
      meta: '2 000 stron',
      description: 'Oryginalny toner Brother',
      image: '/DCPB7620DW_toner_czarny.png',
    },
    {
      id: 'beben',
      name: 'Bęben Brother',
      meta: '12 000 stron',
      description: 'Oryginalny bęben Brother',
      image: '/DCPB7620DW_bęben.png',
    },
  ],
  related: [
    {
      name: 'Brother DCP-L5510DW',
      href: '/produkt/brother-dcp-l5510dw',
      note: 'Szybszy druk 48 stron na minutę i dupleks',
    },
  ],
}

export default function BrotherDCPB7620DWPage() {
  return <ProductPage data={data} />
}
