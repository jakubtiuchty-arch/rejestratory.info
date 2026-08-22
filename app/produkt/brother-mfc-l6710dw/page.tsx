'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'brother-mfc-l6710dw',
  name: 'Brother MFC-L6710DW',
  category: 'Urządzenia wielofunkcyjne',
  categoryHref: '/kategoria/urzadzenia-wielofunkcyjne',
  images: ['/MFCL6710DW_1.png'],
  inquiry: {
    description: 'Najszybsze monochromatyczne urządzenie w ofercie',
    specifications: 'Mono laser · druk 50 str./min · podajnik 620 ark. · ADF 70 ark. · cykl 8000 str./mies.',
  },
  whyNavLabel: 'Dlaczego MFC-L6710DW',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W kancelarii nadleśnictwa',
  highlights: [
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: '50 stron/min (A4)' },
    { icon: ICON.papier, label: 'Podajniki', value: '520 + 100 arkuszy' },
    { icon: ICON.adf, label: 'Podajnik ADF', value: '70 arkuszy, dwustronny' },
    { icon: ICON.wsparcie, label: 'Cykl pracy', value: 'do 8000 stron miesięcznie' },
  ],
  specGroups: [
    {
      title: 'Ogólne',
      rows: [
        { k: 'Typ', v: 'monochromatyczna, laserowa' },
        { k: 'Funkcje', v: 'druk, kopiowanie, skanowanie, faks' },
        { k: 'Panel', v: 'kolorowy ekran dotykowy 12,7 cm' },
        { k: 'Łączność', v: 'USB 2.0, Gigabit Ethernet, Wi-Fi' },
      ],
    },
    {
      title: 'Drukowanie',
      rows: [
        { k: 'Prędkość', v: '50 stron/min (A4)' },
        { k: 'Dupleks', v: 'automatyczny, 24 strony/min' },
        { k: 'Rozdzielczość', v: 'do 1200 × 1200 dpi' },
        { k: 'Pamięć', v: '512 MB' },
      ],
    },
    {
      title: 'Obsługa papieru',
      rows: [
        { k: 'Podajnik główny', v: '520 arkuszy' },
        { k: 'Podajnik wielofunkcyjny', v: '100 arkuszy' },
        { k: 'Odbiornik', v: '150 arkuszy' },
        { k: 'ADF', v: '70 arkuszy, dwustronny' },
      ],
    },
    {
      title: 'Skanowanie i eksploatacja',
      rows: [
        { k: 'Skaner', v: 'podwójny CIS' },
        { k: 'Skan jednostronny', v: '28 ipm mono' },
        { k: 'Skan dwustronny', v: '56 ipm mono' },
        { k: 'Cykl pracy', v: 'do 8000 stron miesięcznie' },
        { k: 'Druk mobilny', v: 'AirPrint, Mopria, Brother Mobile Connect' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.szybkosc,
      title: 'Pięćdziesiąt stron na minutę',
      body:
        'Najwyższa prędkość druku w zestawieniu — urządzenie dla kancelarii, przez którą przechodzi największy ruch dokumentów.',
    },
    {
      icon: ICON.papier,
      title: 'Sześćset dwadzieścia arkuszy w podajnikach',
      body:
        'Podajnik główny na 520 arkuszy plus wielofunkcyjny na 100 oznacza ryzę papieru w środku i rzadsze uzupełnianie.',
    },
    {
      icon: ICON.adf,
      title: 'Podajnik dokumentów na 70 arkuszy',
      body:
        'Największy ADF w zestawieniu, ze skanowaniem dwustronnym — całą teczkę wkłada się raz i zostawia urządzenie przy pracy.',
    },
    {
      icon: ICON.wsparcie,
      title: 'Cykl pracy do 8000 stron',
      body:
        'Miesięczny cykl pracy z zapasem pokrywa potrzeby nadleśnictwa także w okresach sprawozdawczych.',
    },
  ],
  usedBy: { device: 'Brother MFC-L6710DW' },
  whereToBuy: [{ name: 'ZUP Łódź' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.szybkosc,
      title: 'Wysoka prędkość druku',
      body:
        'Drukuje z prędkością do 50 stron na minutę i obsługuje duże zadania bez kolejki. Rozwiązanie dla stanowisk o intensywnym ruchu dokumentów.',
      tone: 'akcent',
    },
    {
      icon: ICON.papier,
      title: 'Podajnik na 520 arkuszy',
      body:
        'Największy podajnik główny w zestawieniu, uzupełniony wielofunkcyjnym na 100 arkuszy i podajnikiem ADF na 70 dokumentów.',
      tone: 'ciemny',
    },
  ],
  related: [
    {
      name: 'Brother MFC-L5710DW',
      href: '/produkt/brother-mfc-l5710dw',
      note: 'Mniejszy podajnik, ta sama jakość druku',
    },
  ],
}

export default function BrotherMFCL6710DWPage() {
  return <ProductPage data={data} />
}
