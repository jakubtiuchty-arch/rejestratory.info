'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'dell-pro-24-plus-p2425he',
  name: 'Dell Pro 24 Plus P2425H',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/P2425HE_1.png'],
  inquiry: {
    description: 'Monitor 23,8 cala do codziennej pracy biurowej',
    specifications: '23,8″ Full HD 100 Hz · IPS · 99% sRGB · pivot · 3 lata Premium Panel',
  },
  whyNavLabel: 'Dlaczego P2425H',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '23,8″ Full HD, 100 Hz' },
    { icon: ICON.oko, label: 'Komfort', value: 'TÜV Eye Comfort 4 gwiazdki' },
    { icon: ICON.ergonomia, label: 'Ergonomia', value: 'regulacja 150 mm, pivot' },
    { icon: ICON.wsparcie, label: 'Gwarancja', value: '3 lata Premium Panel' },
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
      icon: ICON.oko,
      title: 'Certyfikat komfortu pracy',
      body:
        'TÜV Eye Comfort na cztery gwiazdki i brak migotania — przy ośmiu godzinach nad dokumentacją wzrok męczy się wolniej.',
    },
    {
      icon: ICON.ergonomia,
      title: 'Ustawienie pod stanowisko',
      body:
        'Regulacja wysokości o 150 mm, obrót w obu osiach i pivot do pionu, wygodny przy długich zestawieniach.',
    },
    {
      icon: ICON.rozdzielczosc,
      title: 'Matryca IPS z pełnym sRGB',
      body:
        'Kąty widzenia 178° i 99% palety sRGB dają czytelny obraz także wtedy, gdy nad ekranem pochyla się dwoje ludzi.',
    },
    {
      icon: ICON.wsparcie,
      title: 'Trzy lata gwarancji Premium Panel',
      body:
        'Wymiana panelu przy wadzie pikseli w okresie gwarancji — bez sporów o pojedyncze punkty.',
    },
  ],
  usedBy: { device: 'Dell P2425HE' },
  signature: [
    {
      icon: ICON.przekatna,
      title: 'Najczęściej wybierany monitor',
      body:
        'Podstawowy wybór do codziennej pracy biurowej w administracji — sprawdzona matryca IPS, pełna ergonomia i trzyletnia gwarancja Premium Panel.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Dell Pro 24 Plus P2425HE z USB-C',
      href: '/produkt/dell-pro-24-plus-p2425he-usbc',
      note: 'Ta sama matryca ze stacją dokującą USB-C',
    },
  ],
}

export default function DellP2425HPage() {
  return <ProductPage data={data} />
}
