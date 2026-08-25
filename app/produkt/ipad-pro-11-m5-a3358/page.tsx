'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'ipad-pro-11-m5-a3358',
  name: 'Apple iPad Pro 11″ (M5)',
  category: 'Tablety',
  categoryHref: '/kategoria/tablety',
  images: ['/products/ipad-pro-11-1.webp', '/products/ipad-pro-11-2.webp'],
  inquiry: {
    description: 'Tablet do pracy biurowej i pomiaru fotooptycznego, Wi-Fi + Cellular',
    specifications: 'iPadOS · 11″ Ultra Retina XDR 120 Hz · Apple M5 · LiDAR · 5G · Thunderbolt',
  },
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '11″ Ultra Retina XDR, 120 Hz' },
    { icon: ICON.procesor, label: 'Układ', value: 'Apple M5' },
    { icon: ICON.siec, label: 'Łączność', value: '5G (Apple C1X) i Wi-Fi 7' },
    { icon: ICON.lidar, label: 'Pomiar', value: 'LiDAR + aparat 12 Mpx' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['256 GB', '512 GB', '1 TB', '2 TB'] },
    { id: 'kolor', label: 'Kolor', options: ['Space Black', 'Silver'] },
  ],
  related: [
    {
      name: 'iPad Pro 11″ (M4)',
      href: '/produkt/ipad-pro-11-m4-a2837',
      note: 'Poprzednia generacja, ten sam ekran i obudowa',
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
        { k: 'System', v: 'iPadOS 26' },
        { k: 'Układ', v: 'Apple M5' },
        { k: 'Pamięć RAM', v: '12 GB lub 16 GB' },
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
        { k: 'Sieć komórkowa', v: '5G z modemem Apple C1X' },
        { k: 'Wi-Fi', v: 'Wi-Fi 7, Bluetooth 6' },
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
        'Skaner wysyła 576 impulsów podczerwieni i mierzy czas ich powrotu; z tych punktów i obrazu ' +
        'z aparatu powstaje mapa głębi kadru na dystansie do pięciu metrów. Tablet opisuje więc scenę ' +
        'w metrach, a nie w pikselach, i aplikacja do fotooptycznego pomiaru drewna dostaje skalę ' +
        'bez wzorca odniesienia kładzionego na stosie. Duży ekran pomaga skorygować obrys ' +
        'i sprawdzić wynik jeszcze przy stosie.',
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
        'Układ Apple M5 obsługuje aplikacje do fotooptycznego pomiaru drewna i pracę ' +
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
  usedBy: { device: 'iPad Pro 11 M5' },
}

export default function IPadProM5Page() {
  return <ProductPage data={data} />
}
