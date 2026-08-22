'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'zebra-zq521',
  name: 'Zebra ZQ521',
  category: 'Drukarki do rejestratora',
  categoryHref: '/kategoria/drukarki-do-rejestratora',
  images: ['/zq521_1.png'],
  inquiry: {
    description: 'Mobilna drukarka 4-calowa do pracy w terenie',
    specifications: '203 dpi · 127 mm/s · IP54 · upadek 2 m · Wi-Fi ac · Link-OS',
  },
  whyNavLabel: 'Dlaczego ZQ521',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Przy odbiorze drewna',
  highlights: [
    { icon: ICON.upadek, label: 'Odporność', value: 'IP54, upadki z 2 m' },
    { icon: ICON.mroz, label: 'Temperatura', value: 'od -20 °C do +55 °C' },
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: '127 mm/s, 203 dpi' },
    { icon: ICON.rolka, label: 'Nośniki', value: 'paragony, etykiety, przywieszki' },
  ],
  specGroups: [
    {
      title: 'Obudowa',
      rows: [
        { k: 'Wymiary', v: '158 × 155 × 67 mm' },
        { k: 'Waga', v: '0,79 kg z baterią 3250 mAh' },
        { k: 'Klasa szczelności', v: 'IP54' },
        { k: 'Upadki', v: 'z 2 m, wielokrotnie' },
      ],
    },
    {
      title: 'Drukowanie',
      rows: [
        { k: 'Rozdzielczość', v: '203 dpi (8 pkt/mm)' },
        { k: 'Szerokość druku', v: 'do 104 mm' },
        { k: 'Prędkość', v: 'do 127 mm/s' },
        { k: 'System', v: 'Link-OS' },
      ],
    },
    {
      title: 'Nośniki',
      rows: [
        { k: 'Szerokość podłoża', v: '50,8–113 mm' },
        { k: 'Średnica rolki', v: 'do 57 mm' },
        { k: 'Rodzaje', v: 'paragony, etykiety, przywieszki' },
      ],
    },
    {
      title: 'Zasilanie i łączność',
      rows: [
        { k: 'Bateria', v: 'PowerPrecision+ 3250 mAh' },
        { k: 'Wi-Fi', v: '802.11ac, 2,4 i 5 GHz' },
        { k: 'Bluetooth', v: '4.1 Classic i BLE' },
        { k: 'USB', v: '2.0 On-The-Go' },
        { k: 'Temperatura pracy', v: 'od -20 °C do +55 °C' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.upadek,
      title: 'Upadek z dwóch metrów, wielokrotnie',
      body:
        'Drukarka wisi u pasa i spada — obudowa jest na to przygotowana, a klasa IP54 chroni przed deszczem i pyłem przy odbiórce.',
    },
    {
      icon: ICON.mroz,
      title: 'Drukuje przy dwudziestu stopniach mrozu',
      body:
        'Zakres pracy od -20 °C obejmuje zimową zrywkę, gdy zwykła drukarka odmawia podania papieru.',
    },
    {
      icon: ICON.rolka,
      title: 'Kwity, etykiety i przywieszki',
      body:
        'Jedno urządzenie obsługuje kwity odbioru, etykiety na stos i przywieszki — nośniki od 50,8 do 113 mm szerokości.',
    },
    {
      icon: ICON.czaspracy,
      title: 'Bateria PowerPrecision+ 3250 mAh',
      body:
        'Akumulator z układem kontroli stanu — drukarka raportuje kondycję ogniwa, więc wymianę planuje się przed awarią, a nie po niej.',
    },
  ],
  usedBy: { device: 'Zebra ZQ521' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/rejestratory' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.upadek,
      title: 'Zaprojektowana pod upadki z 2 metrów',
      body:
        'Klasa szczelności IP54, praca od -20 °C i odporność na wielokrotne upadki z dwóch metrów. Drukarka do noszenia przy pasie przez cały dzień, nie do stanowiska w kancelarii.',
      tone: 'akcent',
    },
  ],
}

export default function ZebraZQ521Page() {
  return <ProductPage data={data} />
}
