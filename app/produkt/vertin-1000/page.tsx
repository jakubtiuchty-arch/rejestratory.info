'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'vertin-1000',
  name: 'Vertiv Liebert itON 1000 VA',
  category: 'Akcesoria komputerowe',
  categoryHref: '/kategoria/akcesoria-komputerowe',
  images: ['/vertin_1000_1.png'],
  inquiry: {
    description: 'Zasilacz awaryjny UPS do stanowiska i sprzętu sieciowego',
    specifications: '1000 VA / 600 W · line-interactive z AVR · 3 × Schuko i 3 × IEC C13 · bateria VRLA 2 × 7 Ah 12 V',
  },
  whyNavLabel: 'Dlaczego itON 1000',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.moc, label: 'Moc', value: '1000 VA / 600 W' },
    { icon: ICON.napiecie, label: 'Regulacja', value: 'AVR z podbiciem i obniżeniem' },
    { icon: ICON.gniazdo, label: 'Gniazda', value: '3 × Schuko i 3 × IEC C13' },
    { icon: ICON.bateria, label: 'Bateria', value: 'VRLA 2 × 7 Ah 12 V' },
  ],
  specGroups: [
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Moc pozorna', v: '1000 VA' },
        { k: 'Moc czynna', v: '600 W' },
        { k: 'Topologia', v: 'line-interactive' },
        { k: 'Napięcie', v: '230 V' },
        { k: 'Regulacja napięcia', v: 'AVR z podbiciem i obniżeniem' },
      ],
    },
    {
      title: 'Bateria i gniazda',
      rows: [
        { k: 'Bateria', v: 'VRLA 2 × 7 Ah 12 V' },
        { k: 'Gniazda wyjściowe', v: '3 × Schuko oraz 3 × IEC C13' },
        { k: 'Cold start', v: 'tak' },
        { k: 'Ładowanie', v: 'szybkie' },
      ],
    },
    {
      title: 'Obsługa',
      rows: [
        { k: 'Panel', v: 'wskaźniki LED' },
        { k: 'Temperatura pracy', v: 'od 0 °C do +40 °C' },
        { k: 'Certyfikaty', v: 'CE, RoHS' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.gniazdo,
      title: 'Sześć gniazd w dwóch standardach',
      body:
        'Trzy Schuko dla komputera i monitora, trzy IEC C13 dla przełącznika, routera albo małego serwera — jeden zasilacz obsługuje całe stanowisko z osprzętem sieciowym.',
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
      icon: ICON.bateria,
      title: 'Dwie baterie zamiast jednej',
      body:
        'Podwójny akumulator VRLA 7 Ah daje dłuższe podtrzymanie przy tym samym obciążeniu niż wersja 600 VA.',
    },
  ],
  whereToBuy: [
    { name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe' },
    { name: 'TAKMA' },
  ],
  signature: [
    {
      icon: ICON.gniazdo,
      title: 'Schuko i IEC C13 w jednym urządzeniu',
      body:
        'Sprzęt sieciowy używa wtyków C13, komputery i monitory — Schuko. Ten zasilacz nie zmusza do przejściówek ani do drugiego UPS-a w kancelarii.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Vertiv Liebert itON 600 VA',
      href: '/produkt/vertin-600',
      note: 'Mniejszy model do samego komputera',
    },
  ],
}

export default function Vertiv1000Page() {
  return <ProductPage data={data} />
}
