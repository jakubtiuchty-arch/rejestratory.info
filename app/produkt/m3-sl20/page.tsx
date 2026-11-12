'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Do 12.11.2026 karta opisywała 8-calowy tablet (8″ WXGA, 6300 mAh, IP65) — inne urządzenie.
// Parametry SL20+ według karty katalogowej M3 Mobile (rew. 28.03.2025, przez Jarltech);
// m3mobile.net od 11.11.2026 nie ma kart produktów (dział terminali przejęła firma TimCore).
// Zdjęcie przedstawia SL20 — obudowa i wymiary są te same co w SL20+.
const data: ProductData = {
  slug: 'm3-sl20',
  name: 'M3 Mobile SL20+',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/sl20_1.png'],
  inquiry: {
    description: 'Lekki terminal 5,5″ z baterią wymienianą bez wyłączania',
    specifications: 'Android 13 → 15 · 5,5″ HD+ · 8 rdzeni 2,0 GHz · 4/64 GB · 5000 mAh hot-swap · IP67 · upadek z 1,5 m',
  },
  whyNavLabel: 'Dlaczego SL20+',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.wymiana, label: 'Bateria', value: '5000 mAh, hot-swap' },
    { icon: ICON.woda, label: 'Odporność', value: 'IP67, upadek z 1,5 m' },
    { icon: ICON.przekatna, label: 'Ekran', value: '5,5″ HD+' },
    { icon: ICON.mroz, label: 'Temperatura', value: 'od -20 °C do +55 °C' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['4 GB / 64 GB', '8 GB / 128 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '5,5″' },
        { k: 'Rozdzielczość', v: '1440 × 720 HD+' },
        { k: 'Szkło', v: 'Corning Gorilla Glass' },
        { k: 'Dotyk', v: 'obsługa w rękawicach i mokrymi palcami' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 13, aktualizacja do 15' },
        { k: 'Procesor', v: '8 rdzeni, 2,0 GHz' },
        { k: 'Pamięć RAM', v: '4 GB (opcja 8 GB)' },
        { k: 'Pamięć wbudowana', v: '64 GB (opcja 128 GB), karta microSD do 1 TB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP67' },
        { k: 'Upadki', v: 'wielokrotne z 1,5 m na beton (MIL-STD-810G)' },
        { k: 'Test przewrotów', v: '1000 × z 0,5 m' },
        { k: 'Temperatura pracy', v: 'od -20 °C do +55 °C' },
      ],
    },
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Bateria', v: '5000 mAh, wymiana bez wyłączania (hot-swap)' },
        { k: 'Czas pracy', v: 'cały dzień pracy według M3 (bez podanej liczby godzin)' },
        { k: 'Ładowanie', v: 'USB-C, szybkie ładowanie, stacje dokujące' },
      ],
    },
    {
      title: 'Łączność i odczyt',
      rows: [
        { k: 'Skaner', v: 'Zebra SE4710, kody 1D i 2D' },
        { k: 'Sieć', v: 'LTE, Wi-Fi 5 (2,4 i 5 GHz), Bluetooth 5.0, NFC' },
        { k: 'SIM', v: 'nano SIM i eSIM' },
        { k: 'Lokalizacja', v: 'GPS, GLONASS, Galileo, BeiDou' },
        { k: 'Aparaty', v: 'tył 13 Mpx, przód 5 Mpx' },
        { k: 'Masa', v: '250 g z baterią' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.wymiana,
      title: 'Bateria wymieniana bez wyłączania',
      body:
        'Akumulator 5000 mAh wymienia się w trybie hot-swap — terminal nie traci połączenia z siecią ani otwartych aplikacji, więc zapasowa bateria przedłuża pracę bez restartu w środku objazdu.',
    },
    {
      icon: ICON.jednareka,
      title: '250 g i 5,5 cala do jednej ręki',
      body:
        'Kompaktowa obudowa mieści się w kieszeni kurtki, a ekran działa w rękawicach i przy mokrych palcach.',
    },
    {
      icon: ICON.mroz,
      title: 'Od -20 °C do +55 °C',
      body:
        'Terminal pracuje zimą przy zrywce i latem w nagrzanym samochodzie.',
    },
    {
      icon: ICON.upadek,
      title: 'IP67 i upadek z 1,5 metra',
      body:
        'Obudowa w klasie IP67 wytrzymuje wielokrotne upadki z 1,5 m na beton w całym zakresie temperatur pracy — przy pracy z pojazdu i przekazywaniu urządzenia między osobami.',
    },
  ],
  usedBy: { device: 'SL20' },
  serviceContract: '3 lata',
  related: [
    {
      name: 'Unitech EA660',
      href: '/produkt/unitech-ea660',
      note: 'Bateria wymieniana bez wyłączania, większy ekran 6″ FHD+',
    },
  ],
}

export default function M3SL20Page() {
  return <ProductPage data={data} />
}
