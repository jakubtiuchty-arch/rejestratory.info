'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'honeywell-pc42e-t',
  name: 'Honeywell PC42E-T',
  category: 'Elektroniczne Zarządzanie Dokumentacją',
  categoryHref: '/kategoria/ezd',
  images: ['/pc42e_t_1.png'],
  inquiry: {
    description: 'Biurkowa drukarka etykiet do stanowiska kancelaryjnego',
    specifications: '203 lub 300 dpi · do 6 ips · Ethernet i USB · gilotyna i dyspenser opcjonalnie',
  },
  whyNavLabel: 'Dlaczego PC42E-T',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W obiegu dokumentów',
  highlights: [
    { icon: ICON.rozdzielczosc, label: 'Rozdzielczość', value: '203 lub 300 dpi' },
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: 'do 6 ips' },
    { icon: ICON.lan, label: 'Łączność', value: 'Ethernet i USB w standardzie' },
    { icon: ICON.rozbudowa, label: 'Rozbudowa', value: 'gilotyna, dyspenser, moduł Wi-Fi' },
  ],
  specGroups: [
    {
      title: 'Druk',
      rows: [
        { k: 'Metoda druku', v: 'termotransferowa' },
        { k: 'Rozdzielczość', v: '203 dpi lub 300 dpi — do wyboru przy zamówieniu' },
        { k: 'Prędkość', v: 'do 6 ips' },
        { k: 'Głowica', v: 'wymienna, dostępna w obu rozdzielczościach' },
      ],
    },
    {
      title: 'Łączność',
      rows: [
        { k: 'Ethernet', v: 'wbudowany' },
        { k: 'USB', v: 'typu A (host) i typu B' },
        { k: 'Moduł bezprzewodowy', v: 'Wi-Fi i Bluetooth, opcjonalnie' },
      ],
    },
    {
      title: 'Obsługa',
      rows: [
        { k: 'Ekran', v: 'LCD ze stanem druku i nośnika' },
        { k: 'Okno podglądu', v: 'duże, na górze obudowy' },
        { k: 'Obudowa', v: 'płaski wierzch, drukarki można ustawiać jedna na drugiej' },
        { k: 'Oprogramowanie', v: 'Honeywell Printer Edge' },
      ],
    },
    {
      title: 'Pamięć i wyposażenie',
      rows: [
        { k: 'Pamięć RAM', v: '128 MB' },
        { k: 'Pamięć Flash', v: '128 MB' },
        { k: 'Gilotyna', v: 'opcjonalna, w ofercie składnicy' },
        { k: 'Dyspenser', v: 'odklejak, opcjonalny' },
        { k: 'Zgodność akcesoriów', v: 'z poprzednim modelem PC42T' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.lan,
      title: 'Ethernet bez dokupywania modułu',
      body:
        'Gniazdo sieciowe jest w standardzie, więc drukarka staje się zasobem całej kancelarii, a nie tylko komputera, do którego ją wpięto.',
    },
    {
      icon: ICON.rozbudowa,
      title: 'Gilotyna i dyspenser do dobrania',
      body:
        'Ta sama drukarka obsłuży etykiety odrywane ręcznie, odklejane z podkładu albo cięte — akcesoria są w tej samej ofercie składnicy.',
    },
    {
      icon: ICON.rozdzielczosc,
      title: 'Dwie rozdzielczości, wymienna głowica',
      body:
        '203 dpi wystarcza do kodów i opisów, 300 dpi do drobnego druku na małych etykietach. Głowicę obu rodzajów można dokupić osobno.',
    },
    {
      icon: ICON.kompakt,
      title: 'Płaski wierzch pod drugą drukarkę',
      body:
        'Obudowa jest przystosowana do ustawiania w stos, a okno na górze pokazuje ile nośnika zostało — bez otwierania mechanizmu.',
    },
  ],
  signature: [
    {
      icon: ICON.wymiana,
      title: 'Akcesoria z poprzedniej generacji pasują',
      body:
        'PC42E-T zachowuje zgodność z osprzętem modelu PC42T, więc wymiana drukarki na stanowisku nie pociąga za sobą wymiany akcesoriów.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Honeywell PC45t',
      href: '/produkt/honeywell-pc45t',
      note: 'Szybszy model z kolorowym ekranem i Wi-Fi 6',
    },
    {
      name: 'Zebra ZD421c',
      href: '/produkt/zebra-zd421c',
      note: 'Odpowiednik Zebry z kasetą na taśmę',
    },
  ],
}

export default function HoneywellPC42ETPage() {
  return <ProductPage data={data} />
}
