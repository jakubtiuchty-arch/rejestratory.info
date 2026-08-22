'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'vertin-600',
  name: 'Vertiv Liebert itON 600 VA',
  category: 'Akcesoria komputerowe',
  categoryHref: '/kategoria/akcesoria-komputerowe',
  images: ['/vertin_600_1.png'],
  inquiry: {
    description: 'Zasilacz awaryjny UPS do stanowiska komputerowego',
    specifications: '600 VA / 360 W · line-interactive z AVR · 2 gniazda Schuko · bateria VRLA 7 Ah 12 V · 4,2 kg',
  },
  whyNavLabel: 'Dlaczego itON 600',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.moc, label: 'Moc', value: '600 VA / 360 W' },
    { icon: ICON.napiecie, label: 'Regulacja', value: 'AVR z podbiciem i obniżeniem' },
    { icon: ICON.gniazdo, label: 'Gniazda', value: '2 × Schuko' },
    { icon: ICON.bateria, label: 'Bateria', value: 'VRLA 7 Ah 12 V' },
  ],
  specGroups: [
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Moc pozorna', v: '600 VA' },
        { k: 'Moc czynna', v: '360 W' },
        { k: 'Topologia', v: 'line-interactive' },
        { k: 'Napięcie', v: '230 V' },
        { k: 'Regulacja napięcia', v: 'AVR z podbiciem i obniżeniem' },
      ],
    },
    {
      title: 'Bateria i gniazda',
      rows: [
        { k: 'Bateria', v: 'VRLA 7 Ah 12 V' },
        { k: 'Gniazda wyjściowe', v: '2 × Schuko' },
        { k: 'Cold start', v: 'tak' },
        { k: 'Ładowanie', v: 'szybkie' },
      ],
    },
    {
      title: 'Obudowa i warunki pracy',
      rows: [
        { k: 'Wymiary', v: '101 × 142 × 279 mm' },
        { k: 'Waga', v: '4,2 kg' },
        { k: 'Panel', v: 'wskaźniki LED' },
        { k: 'Temperatura pracy', v: 'od 0 °C do +40 °C' },
        { k: 'Certyfikaty', v: 'CE, RoHS' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.moc,
      title: 'Czas na zapisanie pracy',
      body:
        'Sześćset woltoamperów wystarcza, żeby przy zaniku prądu zamknąć dokumenty i wyłączyć komputer w kontrolowany sposób, zamiast tracić godzinę roboty.',
    },
    {
      icon: ICON.napiecie,
      title: 'Wyrównuje napięcie, nie tylko podtrzymuje',
      body:
        'Automatyczna regulacja napięcia z podbiciem i obniżeniem reaguje na wahania w sieci, zanim staną się problemem zasilacza komputera.',
    },
    {
      icon: ICON.coldstart,
      title: 'Startuje bez sieci',
      body:
        'Funkcja cold start pozwala uruchomić urządzenie z samej baterii — przy awarii zasilania komputer da się włączyć i wyłączyć po ludzku.',
    },
    {
      icon: ICON.biurko,
      title: 'Cztery kilogramy pod biurkiem',
      body:
        'Wymiary 10 × 14 × 28 cm — urządzenie mieści się obok komputera i nie wymaga szafy ani stelaża.',
    },
  ],
  whereToBuy: [
    { name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe' },
    { name: 'TAKMA' },
  ],
  related: [
    {
      name: 'Vertiv Liebert itON 1000 VA',
      href: '/produkt/vertin-1000',
      note: 'Większa moc i gniazda IEC C13 do sprzętu sieciowego',
    },
  ],
}

export default function Vertiv600Page() {
  return <ProductPage data={data} />
}
