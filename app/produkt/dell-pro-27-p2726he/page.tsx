'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'dell-pro-27-p2726he',
  name: 'Dell Pro 27 P2726HE z USB-C',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/P2425HE_1.png'],
  inquiry: {
    description: 'Monitor 27 cali ze stacją dokującą USB-C',
    specifications: '27″ Full HD 120 Hz · USB-C 100 W · RJ45 1GbE · MST · pivot',
  },
  whyNavLabel: 'Dlaczego P2726HE',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '27″ Full HD, 120 Hz' },
    { icon: ICON.usbc, label: 'USB-C', value: 'obraz i ładowanie do 100 W' },
    { icon: ICON.lan, label: 'Sieć', value: 'wbudowany RJ45 1GbE' },
    { icon: ICON.ergonomia, label: 'Ergonomia', value: 'regulacja 150 mm, pivot' },
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
      title: 'Koncentrator USB-C',
      rows: [
        { k: 'Power Delivery', v: 'do 100 W (upstream)' },
        { k: 'DisplayPort', v: 'tryb alternatywny DP 1.4' },
        { k: 'Ethernet', v: 'RJ45 1GbE' },
        { k: 'USB-A', v: '2 × downstream 5 Gb/s' },
        { k: 'USB-C', v: '2 × downstream 5 Gb/s, zasilanie do 15 W' },
      ],
    },
    {
      title: 'Porty i funkcje',
      rows: [
        { k: 'Wideo', v: 'HDMI z HDCP 1.4, DisplayPort 1.4' },
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
      title: 'Jeden kabel zamiast trzech',
      body:
        'Laptop podłączony USB-C dostaje obraz, zasilanie do 100 W i sieć — odpinasz jeden przewód i jedziesz w teren.',
    },
    {
      icon: ICON.lan,
      title: 'Sieć przewodowa z monitora',
      body:
        'Wbudowane gniazdo RJ45 1GbE wpina laptop do sieci kancelarii, także gdy sam nie ma portu Ethernet.',
    },
    {
      icon: ICON.daisy,
      title: 'Drugi monitor bez drugiego kabla',
      body:
        'Wyjście DisplayPort z obsługą MST pozwala połączyć dwa ekrany szeregowo i pracować na dwóch obszarach roboczych.',
    },
    {
      icon: ICON.ergonomia,
      title: 'Ustawisz go pod siebie',
      body:
        'Regulacja wysokości o 150 mm, obrót w obu osiach i pivot do pionu — wygodnie przy długich zestawieniach.',
    },
  ],
  signature: [
    {
      icon: ICON.usbc,
      title: 'Stacja dokująca wbudowana w monitor',
      body:
        'Jeden kabel USB-C przenosi obraz, ładuje laptop mocą do 100 W i podaje sieć z wbudowanego gniazda RJ45. Na biurku znika zasilacz i przejściówka do LAN.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Dell Pro 24 Plus P2425HE z USB-C',
      href: '/produkt/dell-pro-24-plus-p2425he-usbc',
      note: 'Ten sam zestaw portów na 23,8 cala',
    },
  ],
}

export default function DellP2726HEUsbcPage() {
  return <ProductPage data={data} />
}
