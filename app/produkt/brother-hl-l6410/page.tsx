'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'brother-hl-l6410',
  name: 'Brother HL-L6410',
  category: 'Drukarki laserowe',
  categoryHref: '/kategoria/drukarki-laserowe',
  images: ['/HLL6410DN_1.png'],
  inquiry: {
    description: 'Szybka drukarka mono do intensywnej pracy',
    specifications: 'Mono laser · 50 str./min · dupleks · cykl 16 000 str./mies. · Secure Print',
  },
  whyNavLabel: 'Dlaczego HL-L6410',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W kancelarii nadleśnictwa',
  highlights: [
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: '50 stron/min (A4)' },
    { icon: ICON.papier, label: 'Podajniki', value: '520 + 100 arkuszy' },
    { icon: ICON.wsparcie, label: 'Cykl pracy', value: 'do 16 000 stron miesięcznie' },
    { icon: ICON.tarcza, label: 'Bezpieczeństwo', value: 'Secure Print, NFC' },
  ],
  specGroups: [
    {
      title: 'Ogólne',
      rows: [
        { k: 'Typ', v: 'monochromatyczna, laserowa' },
        { k: 'Funkcje', v: 'druk' },
        { k: 'Panel', v: 'kolorowy ekran dotykowy 8,9 cm' },
        { k: 'Pamięć', v: '1 GB' },
        { k: 'Łączność', v: 'USB 2.0, Gigabit Ethernet, Wi-Fi opcjonalnie' },
      ],
    },
    {
      title: 'Drukowanie',
      rows: [
        { k: 'Prędkość', v: '50 stron/min (A4)' },
        { k: 'Dupleks', v: 'automatyczny, 24 strony/min' },
        { k: 'Pierwszy wydruk', v: 'do 6,7 sekundy' },
        { k: 'Rozdzielczość', v: 'do 1200 × 1200 dpi' },
        { k: 'Cykl pracy', v: 'do 16 000 stron miesięcznie' },
      ],
    },
    {
      title: 'Obsługa papieru',
      rows: [
        { k: 'Podajnik główny', v: '520 arkuszy' },
        { k: 'Podajnik wielofunkcyjny', v: '100 arkuszy' },
        { k: 'Odbiornik', v: '250 arkuszy' },
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
        { k: 'NFC', v: 'tak' },
        { k: 'Języki druku', v: 'PCL6, PDF 1.7, BR-Script3' },
      ],
    },
    {
      title: 'Materiały',
      rows: [
        { k: 'Toner startowy', v: '11 000 stron' },
        { k: 'Tonery', v: 'TN3600 do TN3610XL, 3 000–25 000 stron' },
        { k: 'Bęben', v: 'DR3600, 12 000 stron' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.szybkosc,
      title: 'Pięćdziesiąt stron na minutę',
      body:
        'Pierwsza strona wychodzi po niecałych siedmiu sekundach, więc drukarka nadąża za kancelarią w szczycie sprawozdawczym.',
    },
    {
      icon: ICON.wsparcie,
      title: 'Cykl pracy do 16 000 stron',
      body:
        'Dwukrotnie wyższy niż w modelu HL-L6210DW — sprzęt dla jednostki o największym ruchu dokumentów.',
    },
    {
      icon: ICON.tarcza,
      title: 'Secure Print przy wspólnej drukarce',
      body:
        'Wydruk zwalnia się kodem na urządzeniu, więc dokumenty nie leżą w odbiorniku, zanim ktoś po nie przyjdzie.',
    },
    {
      icon: ICON.papier,
      title: 'Sześćset dwadzieścia arkuszy zapasu',
      body:
        'Podajnik 520 arkuszy plus wielofunkcyjny 100 pozwala trzymać w środku papier na cały tydzień.',
    },
  ],
  usedBy: { device: 'Brother HL-L6410DN' },
  signature: [
    {
      icon: ICON.szybkosc,
      title: 'Najwyższy cykl pracy w kategorii',
      body:
        'Do 16 000 stron miesięcznie przy prędkości 50 stron na minutę i pojemności 620 arkuszy w podajnikach. Drukarka do stanowiska, przez które przechodzą wszystkie wydruki jednostki.',
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
      id: 'tn3610xl',
      name: 'Toner TN3610XL',
      meta: '25 000 stron',
      description: 'Oryginalny toner Brother',
      image: '/HLL6210DW_toner_25000.png',
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
      name: 'Brother HL-L6210DW',
      href: '/produkt/brother-hl-l6210dw',
      note: 'Ten sam druk przy mniejszym cyklu pracy',
    },
  ],
}

export default function BrotherHLL6410Page() {
  return <ProductPage data={data} />
}
