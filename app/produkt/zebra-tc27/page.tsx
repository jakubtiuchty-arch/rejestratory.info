'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Ekran, procesor i upadki poprawione 12.11.2026 według spec sheetu Zebry TC22/TC27
// (karta podawała 6″ HD, Qualcomm 660 i upadek z 1,2 m). Akumulator 3800 mAh jest zgodny
// z Zebrą i OPZ — dokument ZUP Łódź podaje błędnie 3100 mAh.
const data: ProductData = {
  slug: 'zebra-tc27',
  name: 'Zebra TC27',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/tc27_1.png'],
  inquiry: {
    description: 'Terminal mobilny do pracy w terenie',
    specifications: 'Android · 6″ FHD+ · 6/64 GB · 3800 mAh · IP68 · upadek z 1,3 m',
  },
  whyNavLabel: 'Dlaczego TC27',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.woda, label: 'Odporność', value: 'IP68, upadek z 1,3 m (1,5 m w etui)' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '3800 mAh, do 14 h' },
    { icon: ICON.przekatna, label: 'Ekran', value: '6″ FHD+, 450 nitów' },
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
        { k: 'Rozdzielczość', v: '2160 × 1080 Full HD+, 450 nitów' },
        { k: 'Szkło', v: 'Corning Gorilla Glass' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Qualcomm 5430, 6 rdzeni, 2,1 GHz' },
        { k: 'Pamięć RAM', v: '6 GB' },
        { k: 'Pamięć wbudowana', v: '64 GB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP68' },
        { k: 'Upadki', v: 'z 1,3 m na płytki na betonie, z 1,5 m w etui' },
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
        'Klasa IP68 obejmuje zachlapanie i mycie pod bieżącą wodą, a upadek z 1,3 m na leśną drogę nie kończy dnia pracy.',
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
      note: 'Wyższa seria: 5G, praca od −20 °C, upadek z 1,8 m',
    },
  ],
}

export default function ZebraTC27Page() {
  return <ProductPage data={data} />
}
