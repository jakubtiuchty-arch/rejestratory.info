'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'dell-pro-24-plus-p2425he-usbc',
  name: 'Dell Pro 24 Plus P2425HE z USB-C',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/P2425HE_1.png'],
  inquiry: {
    description: 'Monitor 23,8 cala ze stacją dokującą USB-C',
    specifications: '23,8″ Full HD 100 Hz · USB-C 90 W · RJ45 1GbE · MST · pivot',
  },
  whyNavLabel: 'Dlaczego P2425HE',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '23,8″ Full HD, 100 Hz' },
    { icon: ICON.usbc, label: 'USB-C', value: 'obraz i ładowanie do 90 W' },
    { icon: ICON.lan, label: 'Sieć', value: 'wbudowany RJ45 1GbE' },
    { icon: ICON.ergonomia, label: 'Ergonomia', value: 'regulacja 150 mm, pivot' },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '23,8″' },
        { k: 'Rozdzielczość', v: 'Full HD 1920 × 1080' },
        { k: 'Odświeżanie', v: '100 Hz' },
        { k: 'Matryca', v: 'IPS, kąty 178°/178°' },
        { k: 'Jasność', v: '250 cd/m², kontrast 1500:1' },
        { k: 'Gamut', v: '99% sRGB' },
      ],
    },
    {
      title: 'Koncentrator USB-C',
      rows: [
        { k: 'Power Delivery', v: 'do 90 W (upstream)' },
        { k: 'DisplayPort', v: 'tryb alternatywny DP 1.4' },
        { k: 'Ethernet', v: 'RJ45 1GbE' },
        { k: 'USB-A', v: '3 × USB 3.2 downstream' },
        { k: 'USB-C', v: '1 × USB 3.2 downstream 15 W' },
      ],
    },
    {
      title: 'Porty i funkcje',
      rows: [
        { k: 'Wideo', v: 'HDMI 1.4, DisplayPort 1.4' },
        { k: 'Wyjście DP', v: 'DP 1.4 z MST' },
        { k: 'Power Button Sync', v: 'tak, przez USB-C' },
        { k: 'Display Manager', v: 'tak, z EasyArrange' },
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
      icon: ICON.usbc,
      title: 'Jeden kabel do laptopa',
      body:
        'Obraz, ładowanie do 90 W i sieć idą jednym przewodem USB-C — biurko zostaje bez zasilacza i przejściówki.',
    },
    {
      icon: ICON.kompakt,
      title: 'Mniejsze biurko, ten sam komplet portów',
      body:
        'Wersja 23,8 cala ma dokładnie te same złącza co model 27-calowy, więc mniejszy pokój nie oznacza gorszego stanowiska.',
    },
    {
      icon: ICON.lan,
      title: 'Gniazdo RJ45 w monitorze',
      body:
        'Laptop bez portu Ethernet wchodzi do sieci kancelarii przez monitor.',
    },
    {
      icon: ICON.ergonomia,
      title: 'Regulacja pod wzrost i pozycję',
      body:
        'Podnoszenie o 150 mm, obrót i pivot pozwalają dopasować ekran do stanowiska.',
    },
  ],
  usedBy: { device: 'Dell P2425HE' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/monitory' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.usbc,
      title: 'Stacja dokująca wbudowana w monitor',
      body:
        'Jeden kabel USB-C przenosi obraz, ładuje laptop mocą do 90 W i podaje sieć z wbudowanego gniazda RJ45. Na biurku znika zasilacz i przejściówka do LAN.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Dell Pro 27 Plus P2725HE z USB-C',
      href: '/produkt/dell-pro-27-plus-p2725he-usbc',
      note: 'Ten sam monitor na 27 cali',
    },
  ],
}

export default function DellP2425HEUsbcPage() {
  return <ProductPage data={data} />
}
