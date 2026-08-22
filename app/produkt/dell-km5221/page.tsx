'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'dell-km5221',
  name: 'Dell Pro KM5221W',
  category: 'Akcesoria komputerowe',
  categoryHref: '/kategoria/akcesoria-komputerowe',
  images: ['/km5221_1.png'],
  inquiry: {
    description: 'Bezprzewodowy zestaw klawiatura i mysz',
    specifications: '2,4 GHz · bateria do 36 miesięcy · mysz 1600 dpi (do 4000) · szyfrowanie AES 128 bit',
  },
  whyNavLabel: 'Dlaczego KM5221W',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.czaspracy, label: 'Bateria', value: 'do 36 miesięcy pracy' },
    { icon: ICON.odbiornik, label: 'Łączność', value: '2,4 GHz przez odbiornik USB' },
    { icon: ICON.precyzja, label: 'Rozdzielczość myszy', value: '1600 dpi, do 4000 dpi' },
    { icon: ICON.klodka, label: 'Transmisja', value: 'szyfrowana AES 128 bit' },
  ],
  specGroups: [
    {
      title: 'Łączność',
      rows: [
        { k: 'Standard', v: 'bezprzewodowy 2,4 GHz' },
        { k: 'Odbiornik', v: 'USB, dołączony' },
        { k: 'Szyfrowanie', v: 'AES 128 bit' },
      ],
    },
    {
      title: 'Klawiatura',
      rows: [
        { k: 'Układ', v: 'pełnowymiarowy z blokiem numerycznym' },
        { k: 'Klawisze programowalne', v: '12' },
        { k: 'Zasilanie', v: '2 × AAA' },
        { k: 'Żywotność baterii', v: 'do 36 miesięcy' },
      ],
    },
    {
      title: 'Mysz',
      rows: [
        { k: 'Czujnik', v: 'optyczny' },
        { k: 'Rozdzielczość domyślna', v: '1600 dpi' },
        { k: 'Regulacja', v: '1000, 1600, 2400 lub 4000 dpi w Dell Peripheral Manager' },
        { k: 'Rolka', v: 'programowalne kliknięcie' },
        { k: 'Zasilanie', v: '1 × AA' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.czaspracy,
      title: 'Trzy lata bez wymiany baterii',
      body:
        'Deklarowane 36 miesięcy pracy oznacza, że komplet baterii przeżyje w kancelarii dwie inwentaryzacje.',
    },
    {
      icon: ICON.klodka,
      title: 'Szyfrowana transmisja',
      body:
        'AES 128 bit między klawiaturą a odbiornikiem — to, co się wpisuje, nie krąży po biurze otwartym tekstem.',
    },
    {
      icon: ICON.precyzja,
      title: 'Czułość pod użytkownika',
      body:
        'Aplikacja Dell Peripheral Manager przełącza mysz między 1000 a 4000 dpi, więc pracę na dużym monitorze da się dopasować do ręki.',
    },
    {
      icon: ICON.klawiszskrotu,
      title: 'Dwanaście klawiszy do przypisania',
      body:
        'Skróty do programów używanych w nadleśnictwie wchodzą pod klawisze, zamiast być klikane przez trzy menu.',
    },
  ],
  whereToBuy: [
    { name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe' },
    { name: 'TAKMA' },
  ],
  related: [
    {
      name: 'Dell Pro Plus KM7321W',
      href: '/produkt/dell-km7321',
      note: 'Bluetooth i przełączanie między trzema urządzeniami',
    },
  ],
}

export default function DellKM5221Page() {
  return <ProductPage data={data} />
}
