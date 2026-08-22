'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'brother-mfc-l8690cdw',
  name: 'Brother MFC-L8690CDW',
  category: 'Urządzenia wielofunkcyjne',
  categoryHref: '/kategoria/urzadzenia-wielofunkcyjne',
  images: ['/MFCL8690CDW_1.png'],
  inquiry: {
    description: 'Kolorowe urządzenie 4 w 1 do kancelarii',
    specifications: 'Kolor laser · druk 31 str./min · skan dwustronny · faks · dupleks',
  },
  whyNavLabel: 'Dlaczego MFC-L8690CDW',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W kancelarii nadleśnictwa',
  highlights: [
    { icon: ICON.kolor, label: 'Druk', value: 'kolorowy, 31 stron/min' },
    { icon: ICON.dwustronny, label: 'Dupleks', value: 'automatyczny, 14 str./min' },
    { icon: ICON.adf, label: 'Podajnik ADF', value: '50 arkuszy, dwustronny' },
    { icon: ICON.siec, label: 'Łączność', value: 'Wi-Fi, Gigabit Ethernet, USB' },
  ],
  specGroups: [
    {
      title: 'Ogólne',
      rows: [
        { k: 'Typ', v: 'kolorowa, laserowa' },
        { k: 'Funkcje', v: 'druk, kopiowanie, skanowanie, faks' },
        { k: 'Panel', v: 'ekran dotykowy' },
        { k: 'Łączność', v: 'USB 2.0, Gigabit Ethernet, Wi-Fi' },
      ],
    },
    {
      title: 'Drukowanie',
      rows: [
        { k: 'Prędkość mono', v: '31 stron/min (A4)' },
        { k: 'Prędkość kolor', v: '31 stron/min (A4)' },
        { k: 'Dupleks', v: 'automatyczny, 14 stron/min' },
        { k: 'Pamięć', v: '512 MB' },
      ],
    },
    {
      title: 'Obsługa papieru',
      rows: [
        { k: 'Podajnik główny', v: '250 arkuszy' },
        { k: 'Podajnik wielofunkcyjny', v: '50 arkuszy' },
        { k: 'Odbiornik', v: '150 arkuszy' },
        { k: 'ADF', v: '50 arkuszy, dwustronny' },
      ],
    },
    {
      title: 'Skanowanie i eksploatacja',
      rows: [
        { k: 'Skaner', v: 'dwustronny CIS, 28 ipm mono i kolor' },
        { k: 'Kopiowanie', v: '31 kopii/min' },
        { k: 'Cykl pracy', v: 'do 3000 stron miesięcznie' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.kolor,
      title: 'Kolor w tej samej prędkości co mono',
      body:
        'Trzydzieści jeden stron na minutę niezależnie od trybu — mapa czy materiał informacyjny wychodzą tak szybko jak zwykły protokół.',
    },
    {
      icon: ICON.skandok,
      title: 'Skanowanie dwustronne z podajnika',
      body:
        'Dwustronny skaner CIS czyta 28 obrazów na minutę w mono i w kolorze, a ADF na 50 arkuszy pozwala zostawić teczkę i wrócić po skan.',
    },
    {
      icon: ICON.dwustronny,
      title: 'Automatyczny druk po obu stronach',
      body:
        'Dupleks z prędkością 14 stron na minutę ogranicza zużycie papieru bez ręcznego przekładania.',
    },
    {
      icon: ICON.siec,
      title: 'Wpina się w sieć kancelarii',
      body:
        'Gigabit Ethernet i Wi-Fi, a do tego AirPrint, Mopria oraz iPrint&Scan dla druku z telefonu.',
    },
  ],
  usedBy: { device: 'Brother MFC-L8690CDW' },
  whereToBuy: [{ name: 'ZUP Łódź' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.kolor,
      title: 'Pełny kolor w prędkości 31 stron na minutę',
      body:
        'Druk laserowy w pełnym kolorze z tą samą prędkością co czarno-biały. Wysoka jakość wydruków kolorowych dokumentów i materiałów informacyjnych.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Brother MFC-L8900CDW',
      href: '/produkt/brother-mfc-l8900cdw',
      note: 'Ten sam druk plus NFC i wyższy cykl pracy',
    },
  ],
}

export default function BrotherMFCL8690CDWPage() {
  return <ProductPage data={data} />
}
