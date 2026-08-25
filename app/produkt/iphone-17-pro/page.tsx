'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'iphone-17-pro',
  name: 'Apple iPhone 17 Pro',
  category: 'Telefony',
  categoryHref: '/kategoria/telefony',
  images: ['/products/iphone-17-pro-1.webp', '/products/iphone-17-pro-4.webp'],
  inquiry: {
    description: 'Smartfon do dokumentacji terenowej',
    specifications: 'iOS 26 · 6,3″ 120 Hz · A19 Pro · 3 × 48 Mpx + LiDAR · USB-C',
  },
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '6,3″ Super Retina XDR, 120 Hz' },
    { icon: ICON.procesor, label: 'Układ', value: 'Apple A19 Pro' },
    { icon: ICON.aparat, label: 'Aparaty', value: '3 × 48 Mpx + LiDAR' },
    { icon: ICON.siec, label: 'Łączność', value: '5G, USB-C' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['256 GB', '512 GB', '1 TB'] },
    { id: 'kolor', label: 'Kolor', options: ['Cosmic Orange', 'Deep Blue', 'Silver'] },
  ],
  related: [
    {
      name: 'iPhone 17 Pro Max',
      href: '/produkt/iphone-17-pro-max',
      note: 'Ten sam sprzęt, ekran 6,9″ i dłuższa praca na baterii',
    },
  ],
  whyNavLabel: 'Dlaczego iPhone 17 Pro',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W pracy terenowej',
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,3″ Super Retina XDR' },
        { k: 'Odświeżanie', v: 'ProMotion do 120 Hz' },
        { k: 'Ochrona', v: 'Ceramic Shield 2' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'iOS 26' },
        { k: 'Układ', v: 'Apple A19 Pro' },
        { k: 'Pamięć', v: '256 GB / 512 GB / 1 TB' },
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
        'Pomiar fotooptyczny z samego aparatu wymaga punktu odniesienia: wzorca o znanym wymiarze ' +
        'położonego na drewnie albo ręcznie zmierzonej długości wałków. Skaner LiDAR zdejmuje ten ' +
        'warunek, bo geometrię podaje sam czujnik. Wysyła 576 impulsów podczerwieni i mierzy czas ' +
        'ich powrotu; z tych punktów i obrazu z aparatu powstaje mapa głębi kadru, odświeżana ' +
        'sześćdziesiąt razy na sekundę na dystansie do pięciu metrów. System łączy ją z ruchem ' +
        'kamery, więc telefon opisuje scenę w metrach, a nie w pikselach. Obchodzi się stos ' +
        'i skanuje jego czoło oraz tył, a aplikacja składa z tego wymiary, objętość i przelicznik ' +
        'zamienny — bez ani jednego ręcznego pomiaru.',
    },
    {
      icon: ICON.procesor,
      title: 'Zapas mocy na lata',
      body:
        'Układ A19 Pro obsługuje aplikacje terenowe i mapy bez zadyszki, a Apple wspiera swoje ' +
        'telefony aktualizacjami znacznie dłużej niż typowy cykl wymiany sprzętu.',
    },
    {
      icon: ICON.jasnosc,
      title: 'Czytelny ekran przy pracy w ruchu',
      body:
        'Panel 6,3″ z ProMotion do 120 Hz płynnie przewija mapy i długie zestawienia, ' +
        'a szkło Ceramic Shield 2 chroni go przed zarysowaniem w kieszeni kurtki.',
    },
    {
      icon: ICON.tarcza,
      title: 'Bezpieczeństwo danych służbowych',
      body:
        'Face ID, szyfrowanie pamięci i zarządzanie urządzeniami (MDM) pozwalają wpiąć telefon ' +
        'w politykę bezpieczeństwa jednostki.',
    },
  ],
  usedBy: { device: 'iPhone 17 Pro', exclude: 'iPhone 17 Pro Max' },
}

export default function IPhone17ProPage() {
  return <ProductPage data={data} />
}
