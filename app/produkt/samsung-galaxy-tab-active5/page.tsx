'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'samsung-galaxy-tab-active5',
  name: 'Samsung Galaxy Tab Active5',
  category: 'Tablety',
  categoryHref: '/kategoria/tablety',
  images: [
    '/products/tab-active5-1.webp',
    '/products/tab-active5-2.webp',
    '/products/tab-active5-3.webp',
  ],
  inquiry: {
    description: 'Wzmocniony tablet terenowy z wymienną baterią',
    specifications: 'Android 14 · 8″ 120 Hz · Exynos 1380 · IP68 · 5050 mAh wymienna · S Pen',
  },
  modelCode: 'SM-X306',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '8″ 1920 × 1200, 120 Hz' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Exynos 1380' },
    { icon: ICON.norma, label: 'Odporność', value: 'IP68, MIL-STD-810H' },
    { icon: ICON.wymiana, label: 'Bateria', value: '5050 mAh, wymienna' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['6 GB / 128 GB', '8 GB / 128 GB', '8 GB / 256 GB'] },
    { id: 'siec', label: 'Łączność', options: ['5G', 'Wi-Fi'] },
  ],
  whyNavLabel: 'Dlaczego Tab Active5',
  whyHeading: 'Tablet, który znosi teren',
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '8″ TFT' },
        { k: 'Rozdzielczość', v: '1920 × 1200' },
        { k: 'Odświeżanie', v: '120 Hz' },
        { k: 'Jasność', v: '600 nitów' },
        { k: 'Ochrona', v: 'Corning Gorilla Glass 5' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 14, One UI 6' },
        { k: 'Procesor', v: 'Exynos 1380, 8 rdzeni' },
        { k: 'Pamięć RAM', v: '6 GB lub 8 GB' },
        { k: 'Pamięć wbudowana', v: '128 GB lub 256 GB' },
        { k: 'Karta pamięci', v: 'microSD' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP68 (1,5 m przez 30 min)' },
        { k: 'Norma', v: 'MIL-STD-810H' },
        { k: 'Upadki', v: 'do 1,8 m' },
      ],
    },
    {
      title: 'Zasilanie i łączność',
      rows: [
        { k: 'Bateria', v: '5050 mAh, wymienna' },
        { k: 'Sieć', v: '5G, Wi-Fi 6, NFC, Bluetooth 5.3' },
        { k: 'Złącze', v: 'USB-C, gniazdo audio 3,5 mm' },
        { k: 'Aparaty', v: '13 Mpx / 5 Mpx' },
        { k: 'Waga', v: '433 g' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.woda,
      title: 'Deszcz, pył i mycie pod kranem',
      body:
        'Klasa IP68 oznacza zanurzenie na 1,5 m przez pół godziny, a norma MIL-STD-810H ' +
        'obejmuje wstrząsy, wibracje i pracę w skrajnych temperaturach.',
    },
    {
      icon: ICON.upadek,
      title: 'Upadek z 1,8 metra bez konsekwencji',
      body:
        'Gumowa obudowa ochronna i szkło Gorilla Glass 5 znoszą upadki z wysokości większej ' +
        'niż wzrost człowieka — także na leśną drogę.',
    },
    {
      icon: ICON.wymiana,
      title: 'Bateria do wymiany w terenie',
      body:
        'Ogniwo 5050 mAh wyjmuje się bez narzędzi, więc druga bateria w plecaku zastępuje ' +
        'szukanie gniazdka i przedłuża pracę na drugą zmianę.',
    },
    {
      icon: ICON.rysik,
      title: 'S Pen działa w rękawicach i na mokro',
      body:
        'Rysik jest w zestawie i pozwala podpisywać dokumenty oraz obsługiwać aplikacje ' +
        'bez zdejmowania rękawic, nawet gdy po ekranie spływa woda.',
    },
  ],
  usedBy: { device: 'Tab Active5' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl' }, { name: 'TAKMA' }],
}

export default function TabActive5Page() {
  return <ProductPage data={data} />
}
