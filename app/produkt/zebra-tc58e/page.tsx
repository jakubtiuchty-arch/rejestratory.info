'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'zebra-tc58e',
  name: 'Zebra TC58e',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/tc58_1.png'],
  inquiry: {
    description: 'Terminal mobilny ze skanerem do pracy w terenie',
    specifications: 'Android · 6″ HD · 6/64 GB · 3800 mAh · IP68 · upadek z 1,2 m',
  },
  whyNavLabel: 'Dlaczego TC58e',
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
      icon: ICON.skaner,
      title: 'Skaner do intensywnego odczytu',
      body:
        'Dedykowany moduł skanujący czyta kody seriami — przy inwentaryzacji i odbiorze drewna to różnica godzin, nie minut.',
    },
    {
      icon: ICON.woda,
      title: 'Uszczelniony na deszcz i pył',
      body:
        'Klasa IP68 znosi ulewę i mycie pod bieżącą wodą, a obudowa upadek z 1,2 m.',
    },
    {
      icon: ICON.ladowanie,
      title: 'Cała zmiana na jednym ładowaniu',
      body:
        '3800 mAh wystarcza na 14 godzin pracy ze skanowaniem i transmisją danych.',
    },
    {
      icon: ICON.wsparcie,
      title: 'Wsparcie producenta na lata',
      body:
        'Terminale Zebra obejmuje kontrakt serwisowy z naprawą także po uszkodzeniach eksploatacyjnych.',
    },
  ],
  usedBy: { device: 'Zebra TC58e' },
  related: [
    {
      name: 'Zebra EM45',
      href: '/produkt/zebra-em45',
      note: 'Ten sam ekosystem w obudowie smartfona',
    },
  ],
}

export default function ZebraTC58ePage() {
  return <ProductPage data={data} />
}
