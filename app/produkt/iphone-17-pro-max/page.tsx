'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'iphone-17-pro-max',
  name: 'Apple iPhone 17 Pro Max',
  category: 'Telefony',
  categoryHref: '/kategoria/telefony',
  images: ['/products/iphone-17-pro-max-1.webp', '/products/iphone-17-pro-max-4.webp'],
  inquiry: {
    description: 'Smartfon do dokumentacji terenowej, największy ekran w serii',
    specifications: 'iOS 26 · 6,9″ 120 Hz · A19 Pro · 3 × 48 Mpx + LiDAR · USB-C',
  },
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '6,9″ Super Retina XDR, 120 Hz' },
    { icon: ICON.procesor, label: 'Układ', value: 'Apple A19 Pro' },
    { icon: ICON.aparat, label: 'Aparaty', value: '3 × 48 Mpx + LiDAR' },
    { icon: ICON.siec, label: 'Łączność', value: '5G, USB-C' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['256 GB', '512 GB', '1 TB', '2 TB'] },
    { id: 'kolor', label: 'Kolor', options: ['Cosmic Orange', 'Deep Blue', 'Silver'] },
  ],
  related: [
    {
      name: 'iPhone 17 Pro',
      href: '/produkt/iphone-17-pro',
      note: 'Mniejszy ekran 6,3″, ta sama specyfikacja',
    },
  ],
  whyNavLabel: 'Dlaczego 17 Pro Max',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W pracy terenowej',
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,9″ Super Retina XDR' },
        { k: 'Odświeżanie', v: 'ProMotion do 120 Hz' },
        { k: 'Ochrona', v: 'Ceramic Shield 2' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'iOS 26' },
        { k: 'Układ', v: 'Apple A19 Pro' },
        { k: 'Pamięć', v: '256 GB / 512 GB / 1 TB / 2 TB' },
      ],
    },
    {
      title: 'Aparaty',
      rows: [
        { k: 'Szerokokątny', v: '48 Mpx' },
        { k: 'Ultraszerokokątny', v: '48 Mpx' },
        { k: 'Teleobiektyw', v: '48 Mpx' },
        { k: 'Przedni', v: 'Center Stage' },
      ],
    },
    {
      title: 'Łączność i zasilanie',
      rows: [
        { k: 'Sieć', v: '5G, Wi-Fi, Bluetooth' },
        { k: 'Złącze', v: 'USB-C' },
        { k: 'Lokalizacja', v: 'GPS, alarmowe SOS przez satelitę' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.lidar,
      title: 'LiDAR do pomiaru fotooptycznego',
      body:
        'Skaner LiDAR mierzy odległość do obiektu wiązką światła, więc aplikacja do fotooptycznego ' +
        'pomiaru drewna zna skalę kadru i geometrię stosu — bez wzorca odniesienia kładzionego na mygle. ' +
        'Zdjęcia uzupełniają trzy aparaty 48 Mpx: ogólne, detal i kadr z dystansu.',
    },
    {
      icon: ICON.przekatna,
      title: 'Największy ekran w rodzinie iPhone',
      body:
        'Panel 6,9″ mieści mapę i formularz jednocześnie — mniej przewijania przy pracy ' +
        'z SILP-em i dokumentacją w terenie.',
    },
    {
      icon: ICON.czaspracy,
      title: 'Najdłuższy czas pracy w serii',
      body:
        'Większa obudowa oznacza większe ogniwo — telefon spokojnie wytrzymuje dzień objazdu ' +
        'z włączonym GPS-em i transmisją danych.',
    },
    {
      icon: ICON.tarcza,
      title: 'Bezpieczeństwo danych służbowych',
      body:
        'Face ID, szyfrowanie pamięci i zarządzanie urządzeniami (MDM) pozwalają wpiąć telefon ' +
        'w politykę bezpieczeństwa jednostki.',
    },
  ],
  usedBy: { device: 'iPhone 17 Pro Max' },
  whereToBuy: [{ name: 'TAKMA' }],
}

export default function IPhone17ProMaxPage() {
  return <ProductPage data={data} />
}
