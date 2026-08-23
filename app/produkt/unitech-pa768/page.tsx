'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'unitech-pa768',
  name: 'Unitech PA768',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/pa768_1.png'],
  inquiry: {
    description: 'Terminal z baterią wymienianą bez wyłączania',
    specifications: 'Android · 6,3″ FHD+ · Snapdragon 6490 2,7 GHz · 6/64 GB · 5100 mAh hot-swap · IP65/IP67',
  },
  whyNavLabel: 'Dlaczego PA768',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.wymiana, label: 'Bateria', value: '5100 mAh, hot-swap' },
    { icon: ICON.upadek, label: 'Upadki', value: 'do 1,8 m' },
    { icon: ICON.przekatna, label: 'Ekran', value: '6,3″ FHD+' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Snapdragon 6490, 2,7 GHz' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['6 GB / 64 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,3″' },
        { k: 'Rozdzielczość', v: '2160 × 1080 FHD+' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Snapdragon 6490, 8 rdzeni, 2,7 GHz' },
        { k: 'Pamięć RAM', v: '6 GB' },
        { k: 'Pamięć wbudowana', v: '64 GB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP65 i IP67' },
        { k: 'Upadki', v: 'do 1,8 m' },
        { k: 'Temperatura pracy', v: 'od -20 °C do +55 °C' },
      ],
    },
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Bateria', v: '5100 mAh, wymiana bez wyłączania' },
        { k: 'Czas pracy', v: 'do 14 godzin' },
        { k: 'Ładowanie', v: 'USB-C' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.wymiana,
      title: 'Wymiana baterii bez wyłączania',
      body:
        'Tryb hot-swap podtrzymuje pracę urządzenia podczas zmiany ogniwa — sesja w aplikacji nie przepada, praca trwa dalej.',
    },
    {
      icon: ICON.upadek,
      title: 'Odporność na upadek z 1,8 m',
      body:
        'Najwyższa wartość w zestawieniu terminali — obudowa liczy się z pracą z pojazdu i podawaniem sprzętu z ręki do ręki.',
    },
    {
      icon: ICON.przekatna,
      title: 'Największy ekran wśród terminali',
      body:
        '6,3 cala w rozdzielczości FHD+ mieści mapę i formularz naraz, a wciąż mieści się w dłoni.',
    },
    {
      icon: ICON.mroz,
      title: 'Od -20 °C do +55 °C',
      body:
        'Terminal pracuje zimą przy zrywce i latem w nagrzanym pojeździe bez przerw na ochłonięcie.',
    },
  ],
  usedBy: { device: 'Unitech PA768' },
  related: [
    {
      name: 'Unitech EA660',
      href: '/produkt/unitech-ea660',
      note: 'Dłuższy czas pracy, mniejszy ekran',
    },
  ],
}

export default function UnitechPA768Page() {
  return <ProductPage data={data} />
}
