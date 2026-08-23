'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'honeywell-eda52',
  name: 'Honeywell EDA52',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/eda52_1.png'],
  inquiry: {
    description: 'Kompaktowy terminal do codziennych zadań',
    specifications: 'Android · 5,5″ HD · Snapdragon 2,0 GHz · 4/64 GB · 4500 mAh · IP67',
  },
  whyNavLabel: 'Dlaczego EDA52',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.czaspracy, label: 'Bateria', value: '4500 mAh, do 14 h' },
    { icon: ICON.woda, label: 'Odporność', value: 'IP67, upadek z 1,2 m' },
    { icon: ICON.przekatna, label: 'Ekran', value: '5,5″ HD' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Snapdragon, 2,0 GHz' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['4 GB / 64 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '5,5″' },
        { k: 'Rozdzielczość', v: '1280 × 720 HD' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Snapdragon, 8 rdzeni, 2,0 GHz' },
        { k: 'Pamięć RAM', v: '4 GB' },
        { k: 'Pamięć wbudowana', v: '64 GB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP67' },
        { k: 'Upadki', v: 'z 1,2 m' },
        { k: 'Temperatura pracy', v: 'od -10 °C do +50 °C' },
      ],
    },
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Bateria', v: '4500 mAh' },
        { k: 'Czas pracy', v: 'do 14 godzin' },
        { k: 'Ładowanie', v: 'USB-C' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.skaner,
      title: 'Skaner do codziennego odczytu',
      body:
        'Wbudowany moduł skanujący obsługuje odbiór drewna i inwentaryzację bez sięgania po aparat.',
    },
    {
      icon: ICON.czaspracy,
      title: '4500 mAh na pełną zmianę',
      body:
        'Bateria wystarcza na 14 godzin pracy, więc terminal nie wymaga ładowania w połowie objazdu.',
    },
    {
      icon: ICON.woda,
      title: 'IP67 na deszcz i kurz',
      body:
        'Uszczelnienie chroni przed zachlapaniem i pyłem, a obudowa znosi upadek z 1,2 metra.',
    },
    {
      icon: ICON.jednareka,
      title: 'Kompaktowy rozmiar do jednej ręki',
      body:
        'Ekran 5,5 cala pozwala obsługiwać terminal jedną ręką, gdy druga trzyma dokumenty albo cechówkę.',
    },
  ],
  usedBy: { device: 'Honeywell EDA52' },
  related: [
    {
      name: 'Honeywell CT30P',
      href: '/produkt/honeywell-ct30',
      note: 'Zbliżona specyfikacja w innej obudowie',
    },
  ],
}

export default function HoneywellEDA52Page() {
  return <ProductPage data={data} />
}
