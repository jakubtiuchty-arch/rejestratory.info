'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'hp-seria-5-pro-524pm',
  name: 'HP Pro S5 FHD USB-C Conferencing 524pm',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/524pm_1.png'],
  inquiry: {
    description: 'Monitor 23,8 cala z kamerą, głośnikami i stacją dokującą',
    specifications: '23,8″ Full HD 100 Hz · kamera 5 Mpix pop-up · 4 głośniki · USB-C 100 W · RJ-45',
  },
  whyNavLabel: 'Dlaczego 524pm',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '23,8″ Full HD, 100 Hz' },
    { icon: ICON.kamera, label: 'Kamera', value: '5 Mpix pop-up z podczerwienią' },
    { icon: ICON.glosnik, label: 'Dźwięk', value: '4 głośniki, 2 mikrofony' },
    { icon: ICON.usbc, label: 'USB-C', value: 'obraz i ładowanie do 100 W' },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '23,8″ (60,5 cm)' },
        { k: 'Rozdzielczość', v: 'Full HD 1920 × 1080' },
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
        { k: 'Głośniki', v: '4 wbudowane' },
        { k: 'Mikrofony', v: '2 z redukcją hałasu DNN' },
      ],
    },
    {
      title: 'Stacja dokująca w monitorze',
      rows: [
        { k: 'USB-C', v: 'obraz, dane i ładowanie laptopa' },
        { k: 'DisplayPort', v: '1 × wejście 1.4, 1 × wyjście 1.4' },
        { k: 'W zestawie', v: 'USB-C, USB A–B, DisplayPort 1.4 i przewód zasilający, po 1,8 m' },
        { k: 'Zasilacz', v: 'wbudowany trwale w obudowę' },
      ],
    },
    {
      title: 'Ergonomia i wymiary',
      rows: [
        { k: 'Regulacja wysokości', v: 'do 150 mm' },
        { k: 'Przechylanie', v: '-5° / +23°' },
        { k: 'Obrót poziomy', v: '±45°' },
        { k: 'Pivot', v: '±90°' },
        { k: 'VESA', v: '100 × 100 mm' },
        { k: 'Waga', v: '9,5 kg z podstawą, 5,0 kg bez' },
        { k: 'Zabezpieczenie', v: 'gniazdo na linkę' },
      ],
    },
  ],
  why: [
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
      icon: ICON.glosnik,
      title: 'Cztery głośniki i mikrofony z redukcją szumu',
      body:
        'Narada z RDLP idzie przez zestaw w monitorze: cztery głośniki i dwa mikrofony z redukcją hałasu DNN wycinającą szum kancelarii.',
    },
    {
      icon: ICON.usbc,
      title: 'Jeden kabel do laptopa',
      body:
        'USB-C przenosi obraz, dane, dźwięk i zasilanie, więc na biurku nie leży ani osobna kamera, ani zasilacz, ani przejściówka.',
    },
  ],
  signature: [
    {
      icon: ICON.kamera,
      title: 'Zestaw do narady wbudowany w monitor',
      body:
        'Kamera 5 Mpix z podczerwienią, cztery głośniki i dwa mikrofony z redukcją hałasu siedzą w obudowie. Stanowisko do wideokonferencji powstaje bez dokupywania czegokolwiek.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'HP Pro S5 FHD USB-C 524pu',
      href: '/produkt/hp-seria-5-pro-524pu',
      note: 'Ta sama matryca bez kamery i głośników',
    },
    {
      name: 'HP Pro S5 QHD USB-C Conferencing 527pm',
      href: '/produkt/hp-seria-5-pro-527pm',
      note: 'Ten sam zestaw na 27 calach w QHD',
    },
  ],
}

export default function HP524pmPage() {
  return <ProductPage data={data} />
}
