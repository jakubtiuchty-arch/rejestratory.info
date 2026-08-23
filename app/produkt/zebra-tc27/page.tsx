'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'zebra-tc27',
  name: 'Zebra TC27',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/tc27_1.png'],
  inquiry: {
    description: 'Terminal mobilny do pracy w terenie',
    specifications: 'Android · 6″ HD · 6/64 GB · 3800 mAh · IP68 · upadek z 1,2 m',
  },
  whyNavLabel: 'Dlaczego TC27',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.woda, label: 'Odporność', value: 'IP68, upadek z 1,2 m' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '3800 mAh, do 14 h' },
    { icon: ICON.przekatna, label: 'Ekran', value: '6″ HD' },
    { icon: ICON.mroz, label: 'Temperatura', value: 'od -10 °C do +50 °C' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['6 GB / 64 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6″' },
        { k: 'Rozdzielczość', v: '1280 × 720 HD' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Qualcomm 660, 8 rdzeni, 2,2 GHz' },
        { k: 'Pamięć RAM', v: '6 GB' },
        { k: 'Pamięć wbudowana', v: '64 GB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP68' },
        { k: 'Upadki', v: 'z 1,2 m' },
        { k: 'Temperatura pracy', v: 'od -10 °C do +50 °C' },
      ],
    },
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Bateria', v: '3800 mAh' },
        { k: 'Czas pracy', v: 'do 14 godzin' },
        { k: 'Ładowanie', v: 'USB-C' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.woda,
      title: 'Uszczelniony na deszcz i pył',
      body:
        'Klasa IP68 obejmuje zachlapanie i mycie pod bieżącą wodą, a upadek z 1,2 m na leśną drogę nie kończy dnia pracy.',
    },
    {
      icon: ICON.mroz,
      title: 'Pracuje od mrozu do upału',
      body:
        'Zakres od -10 °C do +50 °C pokrywa zimowe zrywki i lipcowe objazdy — terminal nie gaśnie przy pierwszym przymrozku.',
    },
    {
      icon: ICON.ladowanie,
      title: 'Cała zmiana na jednym ładowaniu',
      body:
        '3800 mAh wystarcza na 14 godzin pracy ze skanowaniem i transmisją danych.',
    },
    {
      icon: ICON.skaner,
      title: 'Skanowanie zamiast przepisywania',
      body:
        'Wbudowany skaner czyta kody z płytek i dokumentów szybciej i pewniej niż aparat w telefonie, także w rękawicach.',
    },
  ],
  usedBy: { device: 'Zebra TC27' },
  related: [
    {
      name: 'Zebra TC58e',
      href: '/produkt/zebra-tc58e',
      note: 'Nowszy model tej samej rodziny',
    },
  ],
}

export default function ZebraTC27Page() {
  return <ProductPage data={data} />
}
