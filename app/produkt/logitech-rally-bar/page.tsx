'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Logitech Rally Bar (grafitowy, EMEA 960-001311). Parametry: strona produktu logitech.com
// (en-eu), datasheet Rally Bar (01/2024), specyfikacja i tabela certyfikacji w Logitech Sync Hub.
// ZUP Łódź kupuje go w umowie NH.271.51.2026 z 02.11.2026 (część 1, „Urządzenie konferencyjne
// w formacie videobara”). Karta dodana 13.11.2026.
const data: ProductData = {
  slug: 'logitech-rally-bar',
  name: 'Logitech Rally Bar',
  category: 'Wideokonferencje',
  categoryHref: '/kategoria/wideokonferencje',
  images: ['/rallybar_1.png', '/rallybar_2.png'],
  inquiry: {
    description: 'Wideobar all-in-one do średnich i dużych sal narad',
    specifications: 'Kamera 4K PTZ, zoom 15× · 6 mikrofonów, zasięg 7 m · 2 głośniki · Teams, Zoom, Google Meet',
  },
  whyNavLabel: 'Dlaczego Rally Bar',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W sali narad',
  highlights: [
    { icon: ICON.kamera, label: 'Kamera', value: '4K PTZ, zoom 15× (5× optyczny)' },
    { icon: ICON.ai, label: 'Druga kamera', value: 'AI Viewfinder 174°' },
    { icon: ICON.glosnik, label: 'Dźwięk', value: '6 mikrofonów, 2 głośniki' },
    { icon: ICON.zdalne, label: 'Zarządzanie', value: 'Logitech Sync' },
  ],
  specGroups: [
    {
      title: 'Kamera',
      rows: [
        { k: 'Rozdzielczość', v: 'do 4K przy 30 kl./s' },
        { k: 'Ruch kamery', v: 'silnikowy: obrót ±25°, pochylenie ±15°' },
        { k: 'Zoom', v: '15× HD (5× optyczny i 3× cyfrowy)' },
        { k: 'Pole widzenia', v: '90° po przekątnej, pokrycie sali 132° × 82°' },
        { k: 'Druga kamera', v: 'AI Viewfinder 174° — kadrowanie mówcy i grupy, liczenie osób' },
      ],
    },
    {
      title: 'Dźwięk',
      rows: [
        { k: 'Głośniki', v: '2 × 70 mm, do 99 dB SPL' },
        { k: 'Mikrofony', v: '6 mikrofonów MEMS, 5 wiązek, zasięg 7 m' },
        { k: 'Redukcja szumów', v: 'tłumienie echa i filtr szumów AI' },
        { k: 'Rozbudowa', v: 'do 4 paneli mikrofonowych Rally Mic Pod' },
      ],
    },
    {
      title: 'Praca i zarządzanie',
      rows: [
        { k: 'Bez komputera', v: 'Microsoft Teams Rooms, Zoom Rooms i Google Meet — certyfikowane (licencja platformy osobno)' },
        { k: 'Z komputerem', v: 'przez USB z Windows lub macOS' },
        { k: 'Laptop gościa', v: 'tryb BYOD przez HDMI i USB' },
        { k: 'Zarządzanie', v: 'Logitech Sync — zdalny podgląd, aktualizacje, alerty' },
      ],
    },
    {
      title: 'Złącza i wymiary',
      rows: [
        { k: 'Obraz', v: '2 × HDMI out (2 ekrany 1080p60), 1 × HDMI in' },
        { k: 'USB', v: '3 × USB-A, 1 × USB-C' },
        { k: 'Sieć', v: 'Ethernet 1 Gb/s, Wi-Fi 802.11ac' },
        { k: 'Pilot', v: 'w zestawie, Bluetooth LE' },
        { k: 'Wymiary i waga', v: '910 × 164 × 130,5 mm, 7,08 kg' },
        { k: 'W zestawie', v: 'zasilacz, kable HDMI i USB, pilot, osłony obiektywów' },
        { k: 'Gwarancja', v: '2 lata' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.kamera,
      title: 'Jedno urządzenie zamiast zestawu',
      body:
        'Kamera, mikrofony i głośniki w jednej belce pod telewizorem — w sali narad nadleśnictwa ' +
        'nie trzeba rozkładać osobnych urządzeń ani prowadzić kabli przez stół.',
    },
    {
      icon: ICON.ai,
      title: 'Kadrowanie mówcy i całej sali',
      body:
        'Druga kamera 174° śledzi salę, a kamera główna z zoomem 15× pokazuje osobę, która mówi — ' +
        'uczestnicy narady z RDLP widzą, kto zabiera głos.',
    },
    {
      icon: ICON.chmura,
      title: 'Teams, Zoom albo Meet bez komputera',
      body:
        'Rally Bar ma wbudowany system z certyfikatami Microsoft Teams Rooms, Zoom Rooms i Google ' +
        'Meet, a gdy trzeba, łączy się też z laptopem przez USB.',
    },
    {
      icon: ICON.zdalne,
      title: 'Zdalna opieka nad salą',
      body:
        'W Logitech Sync widać stan urządzenia, odłączone mikrofony i dostępne aktualizacje — ' +
        'informatyk nadleśnictwa nie musi jechać do sali, żeby sprawdzić sprzęt.',
    },
  ],
  related: [
    {
      name: 'Logitech Rally Plus',
      href: '/produkt/logitech-rally-plus',
      note: 'System modułowy do większych sal, z projektorem',
    },
    {
      name: 'Logitech Rally Board 65',
      href: '/produkt/logitech-rally-board-65',
      note: 'Ekran dotykowy 65″ z kamerą i głośnikami',
    },
  ],
}

export default function LogitechRallyBarPage() {
  return <ProductPage data={data} />
}
