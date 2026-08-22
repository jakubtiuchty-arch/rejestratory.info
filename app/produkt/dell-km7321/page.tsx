'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'dell-km7321',
  name: 'Dell Pro Plus KM7321W',
  category: 'Akcesoria komputerowe',
  categoryHref: '/kategoria/akcesoria-komputerowe',
  images: ['/km7321_1.png'],
  inquiry: {
    description: 'Bezprzewodowy zestaw do pracy na kilku komputerach',
    specifications: 'Bluetooth 5.0 i 2,4 GHz · do 3 urządzeń · mysz 1600 dpi (do 4000) · bateria do 36 miesięcy',
  },
  whyNavLabel: 'Dlaczego KM7321W',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.bluetooth, label: 'Łączność', value: 'Bluetooth 5.0 i 2,4 GHz' },
    { icon: ICON.urzadzenia, label: 'Urządzenia', value: 'przełączanie między trzema' },
    { icon: ICON.precyzja, label: 'Mysz', value: '1600 dpi, do 4000 dpi' },
    { icon: ICON.czaspracy, label: 'Bateria', value: 'do 36 miesięcy pracy' },
  ],
  specGroups: [
    {
      title: 'Łączność',
      rows: [
        { k: 'Standardy', v: 'Bluetooth 5.0 oraz 2,4 GHz' },
        { k: 'Odbiornik', v: 'USB, dołączony' },
        { k: 'Sparowane urządzenia', v: 'do 3, przełączane klawiszem' },
        { k: 'Szyfrowanie', v: 'AES 128 bit' },
      ],
    },
    {
      title: 'Klawiatura',
      rows: [
        { k: 'Układ', v: 'pełnowymiarowy z blokiem numerycznym' },
        { k: 'Mechanizm', v: 'nożycowy' },
        { k: 'Klawisze programowalne', v: '12' },
        { k: 'Zasilanie', v: '2 × AAA' },
        { k: 'Żywotność baterii', v: 'do 36 miesięcy' },
      ],
    },
    {
      title: 'Mysz',
      rows: [
        { k: 'Rozdzielczość domyślna', v: '1600 dpi' },
        { k: 'Regulacja', v: 'do 4000 dpi' },
        { k: 'Przyciski skrótów', v: '5' },
        { k: 'Zasilanie', v: '1 × AA' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.urzadzenia,
      title: 'Jeden zestaw, trzy komputery',
      body:
        'Klawiatura pamięta trzy sparowane urządzenia i przechodzi między nimi klawiszem — stanowisko obsługujące laptopa i komputer stacjonarny nie potrzebuje dwóch kompletów.',
    },
    {
      icon: ICON.bluetooth,
      title: 'Bluetooth albo odbiornik',
      body:
        'Do nowego laptopa wystarczy Bluetooth 5.0, do starszego komputera bez modułu zostaje odbiornik USB w zestawie.',
    },
    {
      icon: ICON.klawiatura,
      title: 'Mechanizm nożycowy',
      body:
        'Płaski, cichy skok klawisza — praca przy wspólnym pokoju nie przeszkadza reszcie kancelarii.',
    },
    {
      icon: ICON.czaspracy,
      title: 'Trzy lata na komplecie baterii',
      body:
        'Deklarowane 36 miesięcy pracy klawiatury, bez ładowarki i bez kabla na biurku.',
    },
  ],
  whereToBuy: [
    { name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe' },
    { name: 'TAKMA' },
  ],
  signature: [
    {
      icon: ICON.urzadzenia,
      title: 'Przełącza się między trzema komputerami',
      body:
        'Sparowane urządzenia zmienia się jednym klawiszem — laptop terenowy, komputer w kancelarii i stanowisko wspólne obsługuje ta sama klawiatura.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Dell Pro KM5221W',
      href: '/produkt/dell-km5221',
      note: 'Prostszy zestaw 2,4 GHz do jednego komputera',
    },
  ],
}

export default function DellKM7321Page() {
  return <ProductPage data={data} />
}
