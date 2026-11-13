'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Logitech Rally Plus (EMEA 960-001224: 2 głośniki i 2 panele mikrofonowe). Parametry: strona
// produktu logitech.com (en-eu), datasheet Rally Plus (2023), tabela certyfikacji Logitech Sync Hub.
// ZUP Łódź kupuje go w umowie NH.271.51.2026 z 02.11.2026 (część 2, „Modularny system do
// wideokonferencji dedykowany do sal z projektorem”). Karta dodana 13.11.2026.
const data: ProductData = {
  slug: 'logitech-rally-plus',
  name: 'Logitech Rally Plus',
  category: 'Wideokonferencje',
  categoryHref: '/kategoria/wideokonferencje',
  images: ['/rallyplus_1.png', '/rallyplus_2.png'],
  inquiry: {
    description: 'Modułowy system wideokonferencyjny do dużych sal',
    specifications: 'Kamera 4K PTZ, zoom 15× · 2 głośniki · 2 panele mikrofonowe, do 7 · do 16 osób · USB',
  },
  whyNavLabel: 'Dlaczego Rally Plus',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W sali narad',
  highlights: [
    { icon: ICON.kamera, label: 'Kamera', value: '4K PTZ, zoom 15× (5× optyczny)' },
    { icon: ICON.glosnik, label: 'Głośniki', value: '2 × Rally Speaker, do 100 dB' },
    { icon: ICON.daisy, label: 'Mikrofony', value: '2 panele, łączone do 7' },
    { icon: ICON.lan, label: 'Okablowanie', value: 'jeden kabel CAT6A stół–ekran' },
  ],
  specGroups: [
    {
      title: 'Kamera',
      rows: [
        { k: 'Rozdzielczość', v: '4K przy 30 kl./s, 1080p i 720p przy 60 kl./s' },
        { k: 'Ruch kamery', v: 'obrót 180° (±90°), pochylenie +50° / −90°' },
        { k: 'Zoom', v: '15× HD (5× optyczny i 3× cyfrowy)' },
        { k: 'Pole widzenia', v: '90° po przekątnej, pokrycie 262° × 192°' },
      ],
    },
    {
      title: 'Dźwięk',
      rows: [
        { k: 'Głośniki', v: '2 × Rally Speaker, do 100 dB SPL' },
        { k: 'Mikrofony', v: '2 panele Rally Mic Pod (4 mikrofony, 8 wiązek w każdym)' },
        { k: 'Rozbudowa', v: 'do 7 paneli połączonych szeregowo' },
        { k: 'Wielkość sali', v: 'do 16 osób, z 7 panelami do 46' },
      ],
    },
    {
      title: 'Praca i połączenia',
      rows: [
        { k: 'Z komputerem', v: 'przez USB (UVC) z komputerem w sali albo laptopem: Windows, macOS, ChromeOS' },
        { k: 'Platformy', v: 'certyfikaty Microsoft Teams, Zoom i Google Meet' },
        { k: 'Koncentrator wyświetlacza', v: '2 × HDMI, USB-C kamery, USB-B do komputera, 2 × mini XLR na głośniki' },
        { k: 'Koncentrator stołowy', v: 'HDMI, USB-B, gniazdo paneli mikrofonowych' },
        { k: 'Połączenie stół–ekran', v: 'jeden kabel CAT6A, 5 m w zestawie, do 50 m' },
        { k: 'Zarządzanie', v: 'Logitech Sync' },
      ],
    },
    {
      title: 'Zestaw',
      rows: [
        { k: 'W zestawie', v: 'kamera Rally, 2 głośniki, 2 panele mikrofonowe, 2 koncentratory, pilot, kable i zasilacze' },
        { k: 'Gwarancja', v: '2 lata' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.daisy,
      title: 'Mikrofony wzdłuż całego stołu',
      body:
        'Panele mikrofonowe łączy się jeden za drugim — przy długim stole narad każdy uczestnik ' +
        'jest słyszalny, a system rośnie do 7 paneli i 46 osób.',
    },
    {
      icon: ICON.glosnik,
      title: 'Głośniki przy ekranie',
      body:
        'Dwa osobne głośniki stawia się przy ekranie albo projektorze, więc dźwięk z rozmowy ' +
        'dochodzi z tej strony, z której widać obraz.',
    },
    {
      icon: ICON.lan,
      title: 'Jeden kabel od stołu do ekranu',
      body:
        'Koncentrator stołowy i koncentrator wyświetlacza łączy jeden kabel CAT6A (do 50 m) — ' +
        'obraz, dźwięk i USB idą nim razem, bez prowadzenia wiązki kabli przez salę.',
    },
    {
      icon: ICON.kamera,
      title: 'Kamera 4K z zoomem 15×',
      body:
        'Kamera obraca się o 180° i przybliża 15×, więc obejmuje także dużą salę z projektorem ' +
        'i pokazuje z bliska tablicę albo mapę.',
    },
  ],
  related: [
    {
      name: 'Logitech Rally Bar',
      href: '/produkt/logitech-rally-bar',
      note: 'Wszystko w jednej belce, praca także bez komputera',
    },
    {
      name: 'Logitech Rally Board 65',
      href: '/produkt/logitech-rally-board-65',
      note: 'Ekran dotykowy 65″ z kamerą i głośnikami',
    },
  ],
}

export default function LogitechRallyPlusPage() {
  return <ProductPage data={data} />
}
