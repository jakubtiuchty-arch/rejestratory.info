'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'hp-seria-5-pro-524pu',
  name: 'HP Pro S5 FHD USB-C 524pu',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/524pu_1.png'],
  inquiry: {
    description: 'Monitor 23,8 cala ze stacją dokującą w obudowie',
    specifications: '23,8″ Full HD 100 Hz · USB-C 100 W · RJ-45 · daisy chain · 100% sRGB',
  },
  whyNavLabel: 'Dlaczego 524pu',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '23,8″ Full HD, 100 Hz' },
    { icon: ICON.usbc, label: 'USB-C', value: 'obraz i ładowanie do 100 W' },
    { icon: ICON.lan, label: 'Sieć', value: 'RJ-45 z MAPT, WoL i PXE' },
    { icon: ICON.zasilacze, label: 'Zasilacz', value: 'wbudowany w obudowę' },
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
        { k: 'Powłoka', v: 'antyrefleksyjna, utwardzenie 3H' },
      ],
    },
    {
      title: 'Stacja dokująca w monitorze',
      rows: [
        { k: 'USB-C zasilający', v: '5 Gb/s, ładowanie do 100 W, DisplayPort 1.4' },
        { k: 'USB-C danych', v: '5 Gb/s, zasilanie urządzeń do 15 W' },
        { k: 'DisplayPort', v: '1 × wejście 1.4, 1 × wyjście 1.4' },
        { k: 'HDMI', v: '1 × HDMI 2.0' },
        { k: 'USB-A', v: '3 × 5 Gb/s, w tym jeden ładujący' },
        { k: 'Ethernet', v: 'RJ-45 10/100/1000 Mb/s z MAPT, Wake on LAN i PXE Boot' },
      ],
    },
    {
      title: 'Komfort pracy',
      rows: [
        { k: 'Redukcja migotania', v: 'tak' },
        { k: 'Redukcja niebieskiego światła', v: 'tak' },
        { k: 'Zabezpieczenie', v: 'gniazdo na linkę' },
        { k: 'W zestawie', v: 'przewód zasilający i przewód USB-C, po 1,8 m' },
      ],
    },
    {
      title: 'Ergonomia',
      rows: [
        { k: 'Regulacja wysokości', v: 'do 150 mm' },
        { k: 'Przechylanie', v: '-5° / +23°' },
        { k: 'Obrót poziomy', v: '±45°' },
        { k: 'Pivot', v: '±90°' },
        { k: 'VESA', v: '100 × 100 mm' },
        { k: 'Waga bez podstawy', v: '4,4 kg' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.usbc,
      title: 'Ładuje laptop mocą stu watów',
      body:
        'Jeden przewód USB-C podaje obraz, dane i zasilanie do 100 W, więc laptop leży na biurku bez własnego zasilacza i odpina się jednym ruchem przed wyjazdem w teren.',
    },
    {
      icon: ICON.lan,
      title: 'Sieć z monitora, także przed startem systemu',
      body:
        'Gniazdo RJ-45 obsługuje MAC Address Pass-Through, Wake on LAN i rozruch PXE — administrator obsłuży stanowisko zdalnie, nawet gdy laptop nie ma portu Ethernet.',
    },
    {
      icon: ICON.daisy,
      title: 'Drugi ekran z pierwszego',
      body:
        'Wyjście DisplayPort 1.4 pozwala połączyć monitory szeregowo, więc drugi ekran nie zajmuje kolejnego portu w laptopie.',
    },
    {
      icon: ICON.zasilacze,
      title: 'Bez kostki zasilacza pod biurkiem',
      body:
        'Zasilacz jest wbudowany trwale w obudowę — pod blatem zostaje sam kabel sieciowy, bez plączącej się przejściówki.',
    },
  ],
  signature: [
    {
      icon: ICON.usbc,
      title: 'Stacja dokująca wbudowana w monitor',
      body:
        'Monitor zastępuje osobną stację: podaje obraz, sieć i 100 W zasilania po jednym kablu USB-C, a do tego rozdaje trzy porty USB-A i drugie wyjście DisplayPort.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'HP Pro S5 FHD USB-C Conferencing 524pm',
      href: '/produkt/hp-seria-5-pro-524pm',
      note: 'Ta sama matryca z kamerą i głośnikami',
    },
    {
      name: 'HP Pro S5 QHD USB-C 527pu',
      href: '/produkt/hp-seria-5-pro-527pu',
      note: 'Wersja 27 cali w rozdzielczości QHD',
    },
  ],
}

export default function HP524puPage() {
  return <ProductPage data={data} />
}
