'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'hp-seria-5-pro-527pu',
  name: 'HP Pro S5 QHD USB-C 527pu',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/527pu_1.png'],
  inquiry: {
    description: 'Monitor 27 cali QHD z USB-C i gniazdem sieciowym',
    specifications: '27″ QHD 100 Hz · USB-C · RJ-45 · daisy chain · 100% sRGB',
  },
  whyNavLabel: 'Dlaczego 527pu',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.rozdzielczosc, label: 'Ekran', value: '27″ QHD 2560 × 1440, 100 Hz' },
    { icon: ICON.usbc, label: 'USB-C', value: 'obraz i dane jednym kablem' },
    { icon: ICON.lan, label: 'Sieć', value: 'RJ-45 10/100/1000 Mb/s' },
    { icon: ICON.oko, label: 'Komfort', value: 'HP Eye Ease, TÜV Low Blue Light' },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '27″ (68,6 cm)' },
        { k: 'Rozdzielczość', v: 'QHD 2560 × 1440' },
        { k: 'Odświeżanie', v: '100 Hz' },
        { k: 'Matryca', v: 'IPS, kąty 178°/178°' },
        { k: 'Jasność', v: '350 nitów, kontrast 1500:1' },
        { k: 'Czas reakcji', v: '5 ms GtG z Overdrive' },
        { k: 'Gamut', v: '100% sRGB' },
      ],
    },
    {
      title: 'Łączność',
      rows: [
        { k: 'Wideo', v: 'HDMI 2.0, DisplayPort 1.4 (in/out), USB-C' },
        { k: 'USB-C', v: 'obraz i dane' },
        { k: 'Ethernet', v: 'RJ-45 10/100/1000 Mb/s' },
        { k: 'Daisy chain', v: 'tak, przez DisplayPort' },
        { k: 'HDCP', v: 'tak' },
      ],
    },
    {
      title: 'Komfort i certyfikaty',
      rows: [
        { k: 'HP Eye Ease', v: 'tak, TÜV Low Blue Light' },
        { k: 'Eliminacja migotania', v: 'tak' },
        { k: 'Powłoka', v: 'antyrefleksyjna 3H' },
        { k: 'Certyfikaty', v: 'TCO, EPEAT Gold, ENERGY STAR' },
        { k: 'Gwarancja', v: '3 lata ograniczona HP' },
      ],
    },
    {
      title: 'Ergonomia',
      rows: [
        { k: 'Regulacja wysokości', v: '150 mm' },
        { k: 'Przechylanie', v: '-5° / +20°' },
        { k: 'Obrót poziomy', v: '±45°' },
        { k: 'Pivot', v: '±90°' },
        { k: 'VESA', v: '100 × 100 mm' },
        { k: 'Waga', v: '7,2 kg z podstawą' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.rozdzielczosc,
      title: 'O 77% więcej miejsca niż Full HD',
      body:
        'Rozdzielczość QHD na 27 calach mieści równolegle mapę, arkusz i okno systemu, bez przewijania w bok.',
    },
    {
      icon: ICON.lan,
      title: 'Gniazdo sieciowe w monitorze',
      body:
        'Port RJ-45 wpina laptop do sieci kancelarii, gdy sam nie ma złącza Ethernet.',
    },
    {
      icon: ICON.daisy,
      title: 'Drugi ekran z pierwszego',
      body:
        'Wyjście DisplayPort pozwala połączyć monitory szeregowo i rozbudować stanowisko bez kolejnego kabla do komputera.',
    },
    {
      icon: ICON.oko,
      title: 'HP Eye Ease z certyfikatem TÜV',
      body:
        'Ograniczenie światła niebieskiego bez zmiany barw na ekranie oraz brak migotania przy pracy na pełen etat.',
    },
  ],
  usedBy: { device: '527pu' },
  signature: [
    {
      icon: ICON.rozdzielczosc,
      title: 'Rozdzielczość QHD 2560 × 1440',
      body:
        'Matryca IPS 27 cali w QHD daje o 77% więcej przestrzeni roboczej niż Full HD — praca z kilkoma oknami naraz przestaje wymagać przełączania.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'HP Pro S5 QHD 527pq',
      href: '/produkt/hp-seria-5-pro-527pq',
      note: 'Ta sama matryca bez USB-C i gniazda RJ-45',
    },
  ],
}

export default function HP527puPage() {
  return <ProductPage data={data} />
}
