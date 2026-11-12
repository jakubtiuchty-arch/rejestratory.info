'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Dell Pro P 24 USB-C Hub Monitor – P2426HE (sprzedaż od 03.2026). Do 12.11.2026 karta opisywała
// P2425HE; ZUP Łódź sprzedaje od 23.09.2026 następcę, więc karta przeszła na nowy model.
// Parametry: dell.com/en-ie (SKU 210-BVKN), dell.com/en-us, instrukcja Della (03.2026, Rev. A00), EPREL.
const data: ProductData = {
  slug: 'dell-pro-p-24-p2426he',
  name: 'Dell Pro P 24 P2426HE z USB-C',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/P2426HE_1.png'],
  inquiry: {
    description: 'Monitor 23,8 cala ze stacją dokującą USB-C',
    specifications: '23,8″ Full HD 120 Hz · USB-C 96 W · RJ45 1GbE · MST · pivot',
  },
  whyNavLabel: 'Dlaczego P2426HE',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '23,8″ Full HD, 120 Hz' },
    { icon: ICON.usbc, label: 'USB-C', value: 'obraz i ładowanie do 96 W' },
    { icon: ICON.lan, label: 'Sieć', value: 'wbudowany RJ45 1GbE' },
    { icon: ICON.ergonomia, label: 'Ergonomia', value: 'regulacja 150 mm, pivot' },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '23,8″' },
        { k: 'Rozdzielczość', v: 'Full HD 1920 × 1080' },
        { k: 'Odświeżanie', v: '120 Hz' },
        { k: 'Matryca', v: 'IPS, kąty 178°/178°' },
        { k: 'Jasność', v: '300 cd/m², kontrast 1500:1' },
        { k: 'Czas reakcji', v: '5 ms GtG w trybie szybkim, 8 ms GtG' },
        { k: 'Gamut', v: '99% sRGB, 99% BT.709' },
      ],
    },
    {
      title: 'Koncentrator USB-C',
      rows: [
        { k: 'Power Delivery', v: 'do 96 W, do 100 W z kompatybilnymi laptopami Dell' },
        { k: 'DisplayPort', v: 'tryb alternatywny DP 1.4' },
        { k: 'Ethernet', v: 'RJ45 1GbE z MAPT, Wake on LAN i PXE Boot' },
        { k: 'USB-A', v: '2 × downstream 5 Gb/s, z tyłu' },
        { k: 'USB-C', v: '2 × downstream 5 Gb/s na dolnej krawędzi, zasilanie do 15 W' },
      ],
    },
    {
      title: 'Porty i funkcje',
      rows: [
        { k: 'Wideo', v: 'HDMI 2.1 (TMDS, do 1920 × 1080 przy 120 Hz), DisplayPort 1.4' },
        { k: 'Wyjście DP', v: 'DP 1.4 z MST' },
        { k: 'Power Button Sync', v: 'tak, przez USB-C, z komputerami Dell' },
        { k: 'Oprogramowanie', v: 'Dell Display and Peripheral Manager z Easy Arrange' },
        { k: 'TÜV Eye Comfort', v: '4 gwiazdki, ComfortView Plus' },
        { k: 'Gwarancja', v: '3 lata z wymianą z wyprzedzeniem i Premium Panel' },
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
        'Obraz, ładowanie do 96 W i sieć idą jednym przewodem USB-C — biurko zostaje bez zasilacza i przejściówki.',
    },
    {
      icon: ICON.daisy,
      title: 'Drugi monitor bez drugiego kabla',
      body:
        'Wyjście DisplayPort z obsługą MST pozwala połączyć dwa ekrany szeregowo, więc drugi monitor nie zajmuje kolejnego portu w laptopie.',
    },
    {
      icon: ICON.lan,
      title: 'Gniazdo RJ45 w monitorze',
      body:
        'Laptop bez portu Ethernet wchodzi do sieci kancelarii przez monitor, a obsługa Wake on LAN i rozruchu PXE ułatwia administratorowi zdalną obsługę stanowiska.',
    },
    {
      icon: ICON.ergonomia,
      title: 'Regulacja pod wzrost i pozycję',
      body:
        'Podnoszenie o 150 mm, obrót i pivot pozwalają dopasować ekran do stanowiska.',
    },
  ],
  usedBy: { device: 'Dell P2426HE' },
  signature: [
    {
      icon: ICON.usbc,
      title: 'Stacja dokująca wbudowana w monitor',
      body:
        'Jeden kabel USB-C przenosi obraz, ładuje laptop mocą do 96 W i podaje sieć z wbudowanego gniazda RJ45. Na biurku znika zasilacz i przejściówka do LAN.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Dell Pro 27 P2726HE z USB-C',
      href: '/produkt/dell-pro-27-p2726he',
      note: 'Te same funkcje na większym ekranie 27″',
    },
  ],
}

export default function DellP2426HEPage() {
  return <ProductPage data={data} />
}
