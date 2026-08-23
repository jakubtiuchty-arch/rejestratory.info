'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'brother-hl-l6210dw',
  name: 'Brother HL-L6210DW',
  category: 'Drukarki laserowe',
  categoryHref: '/kategoria/drukarki-laserowe',
  images: ['/HLL6210DW_1.png'],
  inquiry: {
    description: 'Szybka drukarka mono do kancelarii',
    specifications: 'Mono laser · 50 str./min · dupleks · cykl 8 000 str./mies. · Wi-Fi',
  },
  whyNavLabel: 'Dlaczego HL-L6210DW',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W kancelarii nadleśnictwa',
  highlights: [
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: '50 stron/min (A4)' },
    { icon: ICON.papier, label: 'Podajniki', value: '520 + 100 arkuszy' },
    { icon: ICON.dwustronny, label: 'Dupleks', value: 'automatyczny, 24 str./min' },
    { icon: ICON.siec, label: 'Łączność', value: 'Wi-Fi, Gigabit Ethernet, USB' },
  ],
  specGroups: [
    {
      title: 'Ogólne',
      rows: [
        { k: 'Typ', v: 'monochromatyczna, laserowa' },
        { k: 'Funkcje', v: 'druk' },
        { k: 'Panel', v: 'przyciski i wyświetlacz jednoliniowy' },
        { k: 'Pamięć', v: '256 MB' },
        { k: 'Łączność', v: 'USB 2.0, Gigabit Ethernet, Wi-Fi' },
      ],
    },
    {
      title: 'Drukowanie',
      rows: [
        { k: 'Prędkość', v: '50 stron/min (A4)' },
        { k: 'Dupleks', v: 'automatyczny, 24 strony/min' },
        { k: 'Pierwszy wydruk', v: 'do 6,7 sekundy' },
        { k: 'Rozdzielczość', v: 'do 1200 × 1200 dpi' },
        { k: 'Cykl pracy', v: 'do 8000 stron miesięcznie' },
      ],
    },
    {
      title: 'Obsługa papieru',
      rows: [
        { k: 'Podajnik główny', v: '520 arkuszy' },
        { k: 'Podajnik wielofunkcyjny', v: '100 arkuszy' },
        { k: 'Odbiornik', v: '150 arkuszy' },
        { k: 'Formaty', v: 'A4, Letter, Legal, A5, A6, B5' },
        { k: 'Gramatura', v: '60–230 g/m²' },
      ],
    },
    {
      title: 'Funkcje dodatkowe',
      rows: [
        { k: 'Druk mobilny', v: 'AirPrint, Mopria, Brother Mobile Connect' },
        { k: 'Tryb cichy', v: 'tak, 50 dB' },
        { k: 'Secure Print', v: 'tak' },
        { k: 'Języki druku', v: 'PCL6, PDF 1.7, BR-Script3' },
      ],
    },
    {
      title: 'Materiały',
      rows: [
        { k: 'Toner startowy', v: '6000 stron' },
        { k: 'Tonery', v: 'TN3600 do TN3610, 3 000–18 000 stron' },
        { k: 'Bęben', v: 'DR3600, 12 000 stron' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.szybkosc,
      title: 'Pięćdziesiąt stron na minutę',
      body:
        'Ta sama prędkość co w wyższym modelu — różnica leży w cyklu pracy i panelu, nie w tempie druku.',
    },
    {
      icon: ICON.dwustronny,
      title: 'Automatyczny dupleks',
      body:
        'Druk po obu stronach bez przekładania kartek zmniejsza zużycie papieru o połowę.',
    },
    {
      icon: ICON.papier,
      title: 'Duży podajnik w standardzie',
      body:
        '520 arkuszy w podajniku głównym to rzadsze uzupełnianie niż w typowej drukarce biurowej z tacą na 250.',
    },
    {
      icon: ICON.tarcza,
      title: 'Secure Print',
      body:
        'Zadanie czeka w pamięci, aż zwolni je osoba stojąca przy urządzeniu — przydatne przy drukarce na korytarzu.',
    },
  ],
  usedBy: { device: 'Brother HL-L6210DW' },
  signature: [
    {
      icon: ICON.szybkosc,
      title: 'Pięćdziesiąt stron na minutę w cenie modelu podstawowego',
      body:
        'Prędkość i podajnik jak w wyższej serii, przy prostszym panelu i cyklu pracy do 8000 stron miesięcznie. Wybór na stanowisko o umiarkowanym ruchu.',
      tone: 'akcent',
    },
  ],
  accessoriesHeading: 'Materiały eksploatacyjne — dodaj do zapytania',
  accessories: [
    {
      id: 'tn3600',
      name: 'Toner TN3600',
      meta: '3 000 stron',
      description: 'Oryginalny toner Brother',
      image: '/HLL6210DW_toner_3000.png',
    },
    {
      id: 'tn3600xl',
      name: 'Toner TN3600XL',
      meta: '6 000 stron',
      description: 'Oryginalny toner Brother',
      image: '/HLL6210DW_toner_6000.png',
    },
    {
      id: 'tn3600xxl',
      name: 'Toner TN3600XXL',
      meta: '11 000 stron',
      description: 'Oryginalny toner Brother',
      image: '/HLL6210DW_toner_11000.png',
    },
    {
      id: 'tn3610',
      name: 'Toner TN3610',
      meta: '18 000 stron',
      description: 'Oryginalny toner Brother',
      image: '/HLL6210DW_toner_18000.png',
    },
    {
      id: 'dr3600',
      name: 'Bęben DR3600',
      meta: '12 000 stron',
      description: 'Oryginalny bęben Brother',
      image: '/HLL6210DW_bęben.png',
    },
  ],
  related: [
    {
      name: 'Brother HL-L6410',
      href: '/produkt/brother-hl-l6410',
      note: 'Wyższy cykl pracy i ekran dotykowy',
    },
  ],
}

export default function BrotherHLL6210DWPage() {
  return <ProductPage data={data} />
}
