'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'm3-sl20',
  name: 'M3 Mobile SL20+',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/sl20_1.png'],
  inquiry: {
    description: 'Ośmiocalowy tablet terenowy z najdłuższą baterią',
    specifications: 'Android · 8″ WXGA · MSM8953 2,2 GHz · 4/64 GB · 6300 mAh · IP65 · upadek z 1,5 m',
  },
  whyNavLabel: 'Dlaczego SL20+',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '8″ WXGA' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '6300 mAh, do 16 h' },
    { icon: ICON.upadek, label: 'Upadki', value: 'z 1,5 m' },
    { icon: ICON.mroz, label: 'Temperatura', value: 'od -20 °C do +60 °C' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['4 GB / 64 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '8″' },
        { k: 'Rozdzielczość', v: '1280 × 800 WXGA' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Qualcomm MSM8953, 8 rdzeni, 2,2 GHz' },
        { k: 'Pamięć RAM', v: '4 GB' },
        { k: 'Pamięć wbudowana', v: '64 GB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP65' },
        { k: 'Upadki', v: 'z 1,5 m' },
        { k: 'Temperatura pracy', v: 'od -20 °C do +60 °C' },
      ],
    },
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Bateria', v: '6300 mAh' },
        { k: 'Czas pracy', v: 'do 16 godzin' },
        { k: 'Ładowanie', v: 'USB-C' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.przekatna,
      title: 'Osiem cali do pracy z mapą',
      body:
        'Największy ekran wśród rejestratorów pokazuje wydzielenie w całości — bez przewijania i powiększania przy każdym pomiarze.',
    },
    {
      icon: ICON.czaspracy,
      title: 'Do 16 godzin pracy',
      body:
        'Ogniwo 6300 mAh pokrywa najdłuższy dzień w terenie z zapasem na powrót i raport.',
    },
    {
      icon: ICON.mroz,
      title: 'Od -20 °C do +60 °C',
      body:
        'Najszerszy zakres temperatur w zestawieniu — sprzęt pracuje zimą przy zrywce i latem w nagrzanej szoferce.',
    },
    {
      icon: ICON.upadek,
      title: 'Upadek z 1,5 metra',
      body:
        'Wzmocniona obudowa przewidziana pod pracę z pojazdu i przekazywanie urządzenia między osobami.',
    },
  ],
  usedBy: { device: 'SL20' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/rejestratory' }, { name: 'TAKMA' }],
  related: [
    {
      name: 'Samsung Galaxy Tab Active5',
      href: '/produkt/samsung-galaxy-tab-active5',
      note: 'Mniejszy tablet wzmocniony z wymienną baterią',
    },
  ],
}

export default function M3SL20Page() {
  return <ProductPage data={data} />
}
