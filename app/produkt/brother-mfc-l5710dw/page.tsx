'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'brother-mfc-l5710dw',
  name: 'Brother MFC-L5710DW',
  category: 'Urządzenia wielofunkcyjne',
  categoryHref: '/kategoria/urzadzenia-wielofunkcyjne',
  images: ['/MFCL5710DW_1.png'],
  inquiry: {
    description: 'Monochromatyczne urządzenie 4 w 1 z faksem',
    specifications: 'Mono laser · druk 48 str./min · skan dwustronny 56 ipm · faks · dupleks',
  },
  whyNavLabel: 'Dlaczego MFC-L5710DW',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W kancelarii nadleśnictwa',
  highlights: [
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: '48 stron/min (A4)' },
    { icon: ICON.skandok, label: 'Skan dwustronny', value: '56 ipm mono' },
    { icon: ICON.adf, label: 'Podajnik ADF', value: '50 arkuszy, dwustronny' },
    { icon: ICON.siec, label: 'Łączność', value: 'Wi-Fi, Gigabit Ethernet, USB' },
  ],
  specGroups: [
    {
      title: 'Ogólne',
      rows: [
        { k: 'Typ', v: 'monochromatyczna, laserowa' },
        { k: 'Funkcje', v: 'druk, kopiowanie, skanowanie, faks' },
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
        { k: 'ADF', v: '50 arkuszy, dwustronny' },
      ],
    },
    {
      title: 'Skanowanie i eksploatacja',
      rows: [
        { k: 'Skaner', v: 'podwójny CIS, do 1200 × 1200 dpi' },
        { k: 'Skan jednostronny', v: '28 ipm mono' },
        { k: 'Skan dwustronny', v: '56 ipm mono' },
        { k: 'Skan kolor', v: '20 ipm' },
        { k: 'Cykl pracy', v: 'do 5000 stron miesięcznie' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.skandok,
      title: 'Skanowanie obu stron za jednym przejściem',
      body:
        'Podwójny skaner CIS czyta awers i rewers jednocześnie z prędkością 56 obrazów na minutę — archiwizacja teczki idzie kilka razy szybciej.',
    },
    {
      icon: ICON.szybkosc,
      title: 'Czterdzieści osiem stron na minutę',
      body:
        'Wydruk zestawień i protokołów nie blokuje pracy kancelarii nawet przy dużych zadaniach.',
    },
    {
      icon: ICON.dwustronny,
      title: 'Automatyczny dupleks',
      body:
        'Druk po obu stronach bez przekładania kartek ogranicza zużycie papieru i skraca obsługę zadania.',
    },
    {
      icon: ICON.papier,
      title: 'Trzysta pięćdziesiąt arkuszy zapasu',
      body:
        'Dwa podajniki pozwalają trzymać w urządzeniu papier na cały dzień pracy.',
    },
  ],
  usedBy: { device: 'Brother MFC-L5710DW' },
  signature: [
    {
      icon: ICON.skandok,
      title: 'Bardzo szybkie skanowanie dwustronne',
      body:
        'Podwójny skaner CIS skanuje obie strony dokumentu za jednym przejściem, z prędkością 56 obrazów na minutę w trybie mono.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Brother MFC-L6710DW',
      href: '/produkt/brother-mfc-l6710dw',
      note: 'Szybszy druk i większy podajnik na 520 arkuszy',
    },
  ],
}

export default function BrotherMFCL5710DWPage() {
  return <ProductPage data={data} />
}
