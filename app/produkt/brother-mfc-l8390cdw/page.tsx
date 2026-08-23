'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'brother-mfc-l8390cdw',
  name: 'Brother MFC-L8390CDW',
  category: 'Urządzenia wielofunkcyjne',
  categoryHref: '/kategoria/urzadzenia-wielofunkcyjne',
  images: ['/MFCL8390CDW_1.png'],
  inquiry: {
    description: 'Najbardziej kompaktowe urządzenie kolorowe',
    specifications: 'Kolor LED · druk 30 str./min · skan dwustronny 56 ipm · faks · dupleks',
  },
  whyNavLabel: 'Dlaczego MFC-L8390CDW',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W kancelarii nadleśnictwa',
  highlights: [
    { icon: ICON.kolor, label: 'Druk', value: 'kolorowy, 30 stron/min' },
    { icon: ICON.kompakt, label: 'Obudowa', value: 'najbardziej kompaktowa w serii' },
    { icon: ICON.skandok, label: 'Skan dwustronny', value: '56 ipm mono' },
    { icon: ICON.siec, label: 'Łączność', value: 'Wi-Fi, Gigabit Ethernet, USB' },
  ],
  specGroups: [
    {
      title: 'Ogólne',
      rows: [
        { k: 'Typ', v: 'kolorowa, LED' },
        { k: 'Funkcje', v: 'druk, kopiowanie, skanowanie, faks' },
        { k: 'Panel', v: 'kolorowy ekran dotykowy 8,8 cm' },
        { k: 'Łączność', v: 'USB 2.0, Gigabit Ethernet, Wi-Fi' },
      ],
    },
    {
      title: 'Drukowanie',
      rows: [
        { k: 'Prędkość mono', v: '30 stron/min (A4)' },
        { k: 'Prędkość kolor', v: '30 stron/min (A4)' },
        { k: 'Dupleks', v: 'automatyczny, 12 stron/min' },
        { k: 'Rozdzielczość', v: 'do 600 × 600 dpi' },
        { k: 'Pamięć', v: '512 MB' },
      ],
    },
    {
      title: 'Obsługa papieru',
      rows: [
        { k: 'Podajnik główny', v: '250 arkuszy' },
        { k: 'Podajnik wielofunkcyjny', v: '30 arkuszy' },
        { k: 'Odbiornik', v: '150 arkuszy' },
        { k: 'ADF', v: '50 arkuszy, dwustronny' },
        { k: 'Formaty', v: 'A4, Legal, Letter, A5, A6, Executive' },
      ],
    },
    {
      title: 'Skanowanie i eksploatacja',
      rows: [
        { k: 'Skaner', v: 'podwójny CIS' },
        { k: 'Skan jednostronny', v: '27 ipm mono' },
        { k: 'Skan dwustronny', v: '56 ipm mono' },
        { k: 'Cykl pracy', v: 'do 4000 stron miesięcznie' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.kompakt,
      title: 'Mieści się na wąskim blacie',
      body:
        'Najmniejsza obudowa wśród kolorowych urządzeń Brother — sprzęt o pełnej funkcjonalności wchodzi do pokoju, w którym nie ma miejsca na duże centrum wydruku.',
    },
    {
      icon: ICON.kolor,
      title: 'Kolor tam, gdzie jest potrzebny',
      body:
        'Trzydzieści stron na minutę w kolorze pozwala drukować mapy i materiały informacyjne bez zlecania ich na zewnątrz.',
    },
    {
      icon: ICON.skandok,
      title: 'Skanowanie obu stron naraz',
      body:
        'Podwójny skaner CIS czyta awers i rewers za jednym przejściem, z prędkością 56 obrazów na minutę.',
    },
    {
      icon: ICON.dwustronny,
      title: 'Automatyczny dupleks',
      body:
        'Druk po obu stronach kartki bez ręcznego przekładania — mniej papieru i mniej obsługi.',
    },
  ],
  usedBy: { device: 'Brother MFC-L8390CDW' },
  signature: [
    {
      icon: ICON.kompakt,
      title: 'Najbardziej kompaktowe urządzenie Brother',
      body:
        'Rozwiązanie dla biur o ograniczonej przestrzeni, które potrzebują pełnego zestawu funkcji bez przeznaczania na sprzęt dużej powierzchni.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Brother MFC-L8690CDW',
      href: '/produkt/brother-mfc-l8690cdw',
      note: 'Szybszy druk kolorowy i większy podajnik',
    },
  ],
}

export default function BrotherMFCL8390CDWPage() {
  return <ProductPage data={data} />
}
