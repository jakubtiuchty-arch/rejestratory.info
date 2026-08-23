'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'honeywell-rp4',
  name: 'Honeywell RP4',
  category: 'Drukarki do rejestratora',
  categoryHref: '/kategoria/drukarki-do-rejestratora',
  images: ['/rp4_1.png'],
  inquiry: {
    description: 'Mobilna drukarka 4-calowa o dużej wydajności',
    specifications: '203 dpi · do 125 mm/s · IP54 · upadek 2 m · bateria 4900 mAh · 2 lata gwarancji',
  },
  whyNavLabel: 'Dlaczego RP4',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Przy odbiorze drewna',
  highlights: [
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: 'do 125 mm/s' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '4900 mAh' },
    { icon: ICON.upadek, label: 'Odporność', value: 'IP54, upadki z 2 m' },
    { icon: ICON.rolka, label: 'Papier', value: 'rolka do 58 mm średnicy' },
  ],
  specGroups: [
    {
      title: 'Obudowa',
      rows: [
        { k: 'Wymiary', v: '187 × 164 × 77 mm' },
        { k: 'Waga z baterią', v: '1,02 kg' },
        { k: 'Platforma', v: 'Honeywell Printer Edge' },
        { k: 'Gwarancja', v: '2 lata' },
      ],
    },
    {
      title: 'Drukowanie',
      rows: [
        { k: 'Rozdzielczość', v: '203 dpi' },
        { k: 'Prędkość', v: '25–125 mm/s' },
        { k: 'Szerokość druku', v: '104 mm (4 cale)' },
        { k: 'Technologia', v: 'termiczna bezpośrednia' },
      ],
    },
    {
      title: 'Nośniki',
      rows: [
        { k: 'Rodzaj', v: 'papier termiczny w rolce' },
        { k: 'Średnica rolki', v: 'do 58 mm' },
        { k: 'Wydajność', v: 'do 2000 wydruków dziennie' },
      ],
    },
    {
      title: 'Zasilanie i łączność',
      rows: [
        { k: 'Bateria', v: '4900 mAh' },
        { k: 'Bluetooth', v: '5.0 + LE, dual radio' },
        { k: 'Wi-Fi', v: '802.11 a/b/g/n/ac' },
        { k: 'NFC', v: 'parowanie' },
        { k: 'Szczelność', v: 'IP54' },
        { k: 'Upadki', v: 'z 2 m, 1000 cykli tumble z 0,5 m' },
        { k: 'Temperatura pracy', v: 'od -20 °C do +55 °C' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.rolka,
      title: 'Rolka na cały objazd',
      body:
        'Rolka do 58 mm średnicy mieści komplet kwitów wywozowych na dzień jazdy po powierzchniach — bez przezbrajania w połowie trasy.',
    },
    {
      icon: ICON.adf,
      title: 'Dwa tysiące wydruków dziennie',
      body:
        'Producent podaje taką dzienną objętość pracy — to drukarka na nadleśnictwo z dużym wywozem, nie na kilka kwitów dziennie.',
    },
    {
      icon: ICON.czaspracy,
      title: 'Bateria 4900 mAh',
      body:
        'Największe ogniwo w zestawieniu drukarek mobilnych — starcza na dzień pracy z transmisją Wi-Fi.',
    },
    {
      icon: ICON.upadek,
      title: 'IP54 i upadki z 2 metrów',
      body:
        'Do tego tysiąc cykli testu obracania z pół metra — konstrukcja liczy się z pracą w rękawicach i przekazywaniem z ręki do ręki.',
    },
  ],
  usedBy: { device: 'Honeywell RP4' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/rejestratory' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.adf,
      title: 'Wydajność do 2000 wydruków dziennie',
      body:
        'Drukarka przewidziana do intensywnej pracy — obsłuży odbiór drewna w szczycie sezonu bez przerw na chłodzenie mechanizmu.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Zebra ZQ521',
      href: '/produkt/zebra-zq521',
      note: 'Odpowiednik Zebry z obsługą RFID',
    },
  ],
}

export default function HoneywellRP4Page() {
  return <ProductPage data={data} />
}
