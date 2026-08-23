'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'dell-pro-27-p2726h',
  name: 'Dell Pro 27 P2726H',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/P2425HE_1.png'],
  inquiry: {
    description: 'Monitor 27 cali do pracy z dokumentacją',
    specifications: '27″ Full HD 120 Hz · IPS · 99% sRGB · pivot · 3 lata Premium Panel',
  },
  whyNavLabel: 'Dlaczego P2726H',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '27″ Full HD, 120 Hz' },
    { icon: ICON.oko, label: 'Komfort', value: 'TÜV Eye Comfort 4 gwiazdki' },
    { icon: ICON.ergonomia, label: 'Ergonomia', value: 'regulacja 150 mm, pivot' },
    { icon: ICON.wsparcie, label: 'Gwarancja', value: '3 lata Premium Panel' },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '27″' },
        { k: 'Rozdzielczość', v: 'Full HD 1920 × 1080' },
        { k: 'Odświeżanie', v: '120 Hz' },
        { k: 'Czas reakcji', v: '5 ms GtG w trybie szybkim, 8 ms GtG' },
        { k: 'Matryca', v: 'IPS, kąty 178°/178°' },
        { k: 'Jasność', v: '300 cd/m², kontrast 1500:1' },
        { k: 'Gamut', v: '99% sRGB' },
      ],
    },
    {
      title: 'Łączność',
      rows: [
        { k: 'Wideo', v: 'HDMI z obsługą 1920 × 1080 przy 120 Hz, DisplayPort 1.4' },
        { k: 'USB-C', v: '2 × downstream 5 Gb/s, zasilanie do 15 W' },
        { k: 'USB-A', v: '2 × downstream 5 Gb/s' },
        { k: 'USB-B', v: '1 × upstream 5 Gb/s' },
      ],
    },
    {
      title: 'Komfort pracy',
      rows: [
        { k: 'Display Manager', v: 'tak, z EasyArrange' },
        { k: 'TÜV Eye Comfort', v: '4 gwiazdki' },
        { k: 'Brak migotania', v: 'tak' },
        { k: 'Gwarancja', v: '3 lata z wymianą z wyprzedzeniem i Premium Panel' },
      ],
    },
    {
      title: 'Ergonomia',
      rows: [
        { k: 'Regulacja wysokości', v: 'do 150 mm' },
        { k: 'Przechylanie', v: '-5° / +21°' },
        { k: 'Obrót poziomy', v: '±45°' },
        { k: 'Pivot', v: '±90°' },
        { k: 'VESA', v: '100 × 100 mm' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.przekatna,
      title: 'Dwadzieścia siedem cali na dwa okna',
      body:
        'Większy ekran mieści mapę i formularz obok siebie, bez przełączania się między aplikacjami.',
    },
    {
      icon: ICON.oko,
      title: 'Certyfikat komfortu pracy',
      body:
        'TÜV Eye Comfort na cztery gwiazdki oraz brak migotania — istotne przy pracy na pełen etat przy biurku.',
    },
    {
      icon: ICON.ergonomia,
      title: 'Pełna regulacja i pivot',
      body:
        'Podnoszenie o 150 mm, obrót w obu osiach i obrót do pionu pozwalają dopasować ekran do zadania.',
    },
    {
      icon: ICON.wsparcie,
      title: 'Trzy lata gwarancji Premium Panel',
      body:
        'Gwarancja obejmuje wymianę panelu przy wadzie pikseli przez cały okres jej trwania.',
    },
  ],
  signature: [
    {
      icon: ICON.rozdzielczosc,
      title: 'Matryca IPS z pełną paletą sRGB',
      body:
        'Odwzorowanie 99% przestrzeni sRGB i kąty widzenia 178° w obu osiach — obraz pozostaje wierny także przy patrzeniu z boku.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Dell Pro 27 P2726HE z USB-C',
      href: '/produkt/dell-pro-27-p2726he',
      note: 'Ta sama matryca ze stacją dokującą USB-C',
    },
  ],
}

export default function DellP2726HPage() {
  return <ProductPage data={data} />
}
