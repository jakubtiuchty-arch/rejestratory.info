'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'dell-pro-27-plus-p2725he',
  name: 'Dell Pro 27 Plus P2725H',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/P2425HE_1.png'],
  inquiry: {
    description: 'Monitor 27 cali do pracy z dokumentacją',
    specifications: '27″ Full HD 100 Hz · IPS · 99% sRGB · pivot · 3 lata Premium Panel',
  },
  whyNavLabel: 'Dlaczego P2725H',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '27″ Full HD, 100 Hz' },
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
        { k: 'Odświeżanie', v: '100 Hz' },
        { k: 'Matryca', v: 'IPS, kąty 178°/178°' },
        { k: 'Jasność', v: '300 cd/m², kontrast 1500:1' },
        { k: 'Gamut', v: '99% sRGB' },
      ],
    },
    {
      title: 'Łączność',
      rows: [
        { k: 'Wideo', v: 'HDMI 1.4, DisplayPort 1.2, VGA' },
        { k: 'USB-C', v: 'Power Delivery do 15 W' },
        { k: 'USB-A', v: '3 × USB 3.2 pierwszej generacji' },
        { k: 'USB-B', v: '1 × USB 3.2 upstream' },
      ],
    },
    {
      title: 'Komfort pracy',
      rows: [
        { k: 'Display Manager', v: 'tak, z EasyArrange' },
        { k: 'TÜV Eye Comfort', v: '4 gwiazdki' },
        { k: 'Brak migotania', v: 'tak' },
        { k: 'Gwarancja', v: '3 lata Premium Panel' },
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
  usedBy: { device: 'P2725HE', exclude: 'P2725HE USB-C' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/monitory' }, { name: 'TAKMA' }],
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
      name: 'Dell Pro 27 Plus P2725HE z USB-C',
      href: '/produkt/dell-pro-27-plus-p2725he-usbc',
      note: 'Ta sama matryca ze stacją dokującą USB-C',
    },
  ],
}

export default function DellP2725HPage() {
  return <ProductPage data={data} />
}
