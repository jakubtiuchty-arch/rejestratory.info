'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'hp-seria-5-pro-527pm',
  name: 'HP Pro S5 QHD USB-C Conferencing 527pm',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/527pm_1.png'],
  inquiry: {
    description: 'Monitor 27 cali QHD z kamerą, głośnikami i stacją dokującą',
    specifications: '27″ QHD 100 Hz · kamera 5 Mpix pop-up · 4 głośniki · USB-C 100 W · RJ-45',
  },
  whyNavLabel: 'Dlaczego 527pm',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.rozdzielczosc, label: 'Ekran', value: '27″ QHD 2560 × 1440, 100 Hz' },
    { icon: ICON.kamera, label: 'Kamera', value: '5 Mpix pop-up z podczerwienią' },
    { icon: ICON.glosnik, label: 'Dźwięk', value: '4 głośniki, 2 mikrofony' },
    { icon: ICON.usbc, label: 'USB-C', value: 'obraz i ładowanie do 100 W' },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '27″ (68,6 cm)' },
        { k: 'Rozdzielczość', v: 'QHD 2560 × 1440' },
        { k: 'Odświeżanie', v: '100 Hz' },
        { k: 'Matryca', v: 'IPS z podświetleniem WLED, matowa' },
        { k: 'Jasność', v: '350 nitów, kontrast 1500:1' },
        { k: 'Czas reakcji', v: '5 ms' },
        { k: 'Gamut', v: '100% sRGB' },
        { k: 'Powłoka', v: 'antyodblaskowa, utwardzenie 3H' },
      ],
    },
    {
      title: 'Kamera i dźwięk',
      rows: [
        { k: 'Kamera', v: '5 Mpix, 2592 × 1944, kąt widzenia 80°' },
        { k: 'Chowanie', v: 'pop-up w obrysie ekranu' },
        { k: 'Pochylenie kamery', v: '+5° / -20°' },
        { k: 'Windows Hello', v: 'sensor podczerwieni' },
        { k: 'Czujnik zbliżeniowy', v: 'automatyczne blokowanie i odblokowanie stanowiska' },
        { k: 'Głośniki', v: '4 wbudowane, o mocy 3 W i 5 W' },
        { k: 'Mikrofony', v: '2 z redukcją hałasu DNN' },
      ],
    },
    {
      title: 'Stacja dokująca w monitorze',
      rows: [
        { k: 'USB-C zasilający', v: '5 Gb/s, ładowanie do 100 W, DisplayPort 1.4' },
        { k: 'USB-C danych', v: '5 Gb/s, zasilanie urządzeń do 15 W' },
        { k: 'DisplayPort', v: '1 × wejście 1.4, 1 × wyjście 1.4' },
        { k: 'HDMI', v: '1 × HDMI 2.0' },
        { k: 'USB-A', v: '3 × 5 Gb/s, w tym jeden ładujący, oraz 1 × USB-B' },
        { k: 'Ethernet', v: 'RJ-45 10/100/1000 Mb/s z MAPT, Wake on LAN i PXE Boot' },
      ],
    },
    {
      title: 'Ergonomia i wymiary',
      rows: [
        { k: 'Regulacja wysokości', v: 'do 150 mm' },
        { k: 'Przechylanie', v: '-5° / +20°' },
        { k: 'Obrót poziomy', v: '±45°' },
        { k: 'Pivot', v: '±90°' },
        { k: 'VESA', v: '100 × 100 mm' },
        { k: 'Waga bez podstawy', v: '6,2 kg' },
        { k: 'Zabezpieczenie', v: 'gniazdo na linkę' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.rozdzielczosc,
      title: 'QHD na dwa dokumenty obok siebie',
      body:
        'Rozdzielczość 2560 × 1440 na 27 calach mieści mapę i arkusz jednocześnie, bez zmniejszania widoku do nieczytelnego.',
    },
    {
      icon: ICON.kamera,
      title: 'Kamera chowa się w obudowie',
      body:
        'Moduł 5 Mpix wysuwa się na czas narady i chowa po niej w obrysie ekranu — nie trzeba zaklejać obiektywu taśmą ani wozić kamery na USB.',
    },
    {
      icon: ICON.odcisk,
      title: 'Blokuje stanowisko, gdy odchodzisz',
      body:
        'Czujnik zbliżeniowy w kamerze wygasza i blokuje komputer po odejściu od biurka, a przy powrocie loguje przez Windows Hello czujnikiem podczerwieni.',
    },
    {
      icon: ICON.lan,
      title: 'Sieć z monitora, także przed startem systemu',
      body:
        'Gniazdo RJ-45 obsługuje MAC Address Pass-Through, Wake on LAN i rozruch PXE, więc administrator obsłuży stanowisko zdalnie.',
    },
  ],
  signature: [
    {
      icon: ICON.kamera,
      title: 'Zestaw do narady wbudowany w monitor',
      body:
        'Kamera 5 Mpix z podczerwienią, cztery głośniki i dwa mikrofony z redukcją hałasu siedzą w obudowie, a jeden kabel USB-C podaje laptopowi obraz, sieć i 100 W zasilania.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'HP Pro S5 FHD USB-C Conferencing 524pm',
      href: '/produkt/hp-seria-5-pro-524pm',
      note: 'Ten sam zestaw na 23,8 cala w Full HD',
    },
    {
      name: 'HP Pro S5 QHD USB-C 527pu',
      href: '/produkt/hp-seria-5-pro-527pu',
      note: 'Ta sama matryca bez kamery i głośników',
    },
  ],
}

export default function HP527pmPage() {
  return <ProductPage data={data} />
}
