'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'ipad-pro-11-m4-a2837',
  name: 'Apple iPad Pro 11″ (M4)',
  category: 'Tablety',
  categoryHref: '/kategoria/tablety',
  images: ['/products/ipad-pro-11-1.webp', '/products/ipad-pro-11-2.webp'],
  inquiry: {
    description: 'Tablet do pracy biurowej i pomiaru fotooptycznego, Wi-Fi + Cellular',
    specifications: 'iPadOS · 11″ Ultra Retina XDR 120 Hz · Apple M4 · LiDAR · 5G · Thunderbolt',
  },
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '11″ Ultra Retina XDR, 120 Hz' },
    { icon: ICON.procesor, label: 'Układ', value: 'Apple M4' },
    { icon: ICON.siec, label: 'Łączność', value: '5G i Wi-Fi 6E' },
    { icon: ICON.lidar, label: 'Pomiar', value: 'LiDAR + aparat 12 Mpx' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['256 GB', '512 GB', '1 TB', '2 TB'] },
    { id: 'kolor', label: 'Kolor', options: ['Space Black', 'Silver'] },
  ],
  related: [
    {
      name: 'iPad Pro 11″ (M5)',
      href: '/produkt/ipad-pro-11-m5-a3358',
      note: 'Nowsza generacja z układem M5 i Wi-Fi 7',
    },
  ],
  whyNavLabel: 'Dlaczego iPad Pro',
  whyHeading: 'Tablet do biura i do lasu',
  whyLabel: 'W nadleśnictwie',
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '11″ Ultra Retina XDR' },
        { k: 'Technologia', v: 'tandem OLED' },
        { k: 'Rozdzielczość', v: '2420 × 1668 (264 ppi)' },
        { k: 'Odświeżanie', v: 'ProMotion 10–120 Hz' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'iPadOS' },
        { k: 'Układ', v: 'Apple M4' },
        { k: 'Pamięć RAM', v: '8 GB lub 16 GB' },
        { k: 'Pamięć wbudowana', v: '256 GB – 2 TB' },
      ],
    },
    {
      title: 'Aparaty i zabezpieczenia',
      rows: [
        { k: 'Tylny', v: '12 Mpx' },
        { k: 'Przedni', v: '12 Mpx Center Stage (poziomo)' },
        { k: 'Uwierzytelnianie', v: 'Face ID' },
      ],
    },
    {
      title: 'Łączność i obudowa',
      rows: [
        { k: 'Sieć komórkowa', v: '5G, Gigabit LTE' },
        { k: 'Wi-Fi', v: 'Wi-Fi 6E' },
        { k: 'Złącze', v: 'Thunderbolt / USB 4' },
        { k: 'Grubość', v: '5,3 mm' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.lidar,
      title: 'LiDAR do pomiaru fotooptycznego',
      body:
        'Skaner LiDAR podaje odległość i geometrię sceny, dzięki czemu aplikacje do fotooptycznego ' +
        'pomiaru drewna liczą wymiary stosu na podstawie zdjęcia. Duży ekran pomaga skorygować obrys ' +
        'i sprawdzić wynik jeszcze przy mygle.',
    },
    {
      icon: ICON.rozdzielczosc,
      title: 'Ekran, na którym widać szczegół',
      body:
        'Ultra Retina XDR w technologii tandem OLED pokazuje mapy i zdjęcia z wyraźnym kontrastem, ' +
        'a ProMotion do 120 Hz utrzymuje płynność przy przewijaniu dużych zestawień.',
    },
    {
      icon: ICON.procesor,
      title: 'Moc do pomiaru fotooptycznego',
      body:
        'Układ Apple M4 obsługuje aplikacje do fotooptycznego pomiaru drewna i pracę ' +
        'na wielu warstwach map bez czekania na przeliczenie.',
    },
    {
      icon: ICON.siec,
      title: 'Własny internet w terenie',
      body:
        'To wersja Wi-Fi + Cellular, więc tablet łączy się z siecią bez pośrednictwa telefonu — ' +
        'dane z powierzchni trafiają do systemu od razu.',
    },
  ],
  usedBy: { device: 'iPad Pro 11 M4' },
  whereToBuy: [{ name: 'TAKMA' }],
}

export default function IPadProM4Page() {
  return <ProductPage data={data} />
}
