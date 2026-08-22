'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'honeywell-ct30',
  name: 'Honeywell CT30P',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/ct30p_1.png'],
  inquiry: {
    description: 'Terminal do pracy z dokumentacją w terenie',
    specifications: 'Android · 5,5″ HD · Snapdragon 2,0 GHz · 4/64 GB · 4500 mAh · IP67',
  },
  whyNavLabel: 'Dlaczego CT30P',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.czaspracy, label: 'Bateria', value: '4500 mAh, do 14 h' },
    { icon: ICON.woda, label: 'Odporność', value: 'IP67, upadek z 1,2 m' },
    { icon: ICON.przekatna, label: 'Ekran', value: '5,5″ HD' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Snapdragon, 2,0 GHz' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['4 GB / 64 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '5,5″' },
        { k: 'Rozdzielczość', v: '1280 × 720 HD' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Snapdragon, 8 rdzeni, 2,0 GHz' },
        { k: 'Pamięć RAM', v: '4 GB' },
        { k: 'Pamięć wbudowana', v: '64 GB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP67' },
        { k: 'Upadki', v: 'z 1,2 m' },
        { k: 'Temperatura pracy', v: 'od -10 °C do +50 °C' },
      ],
    },
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Bateria', v: '4500 mAh' },
        { k: 'Czas pracy', v: 'do 14 godzin' },
        { k: 'Ładowanie', v: 'USB-C' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.ladowanie,
      title: 'Pełna zmiana bez ładowania',
      body:
        '4500 mAh wystarcza na 14 godzin pracy ze skanowaniem, transmisją danych i włączonym GPS-em.',
    },
    {
      icon: ICON.skaner,
      title: 'Odczyt kodów w rękawicach',
      body:
        'Dedykowany skaner i fizyczne klawisze działają bez zdejmowania rękawic, czego dotykowy telefon nie zapewni.',
    },
    {
      icon: ICON.woda,
      title: 'IP67 na deszcz i błoto',
      body:
        'Uszczelniona obudowa znosi zachlapanie i pył, a upadek z 1,2 metra nie kończy się wizytą w serwisie.',
    },
    {
      icon: ICON.wsparcie,
      title: 'Sprzęt pod aplikacje terenowe',
      body:
        'Android z aktualizacjami i przewidywalna dostępność modelu pozwalają planować flotę na kilka sezonów.',
    },
  ],
  usedBy: { device: 'Honeywell CT30P' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/rejestratory' }, { name: 'TAKMA' }],
  related: [
    {
      name: 'Honeywell EDA52',
      href: '/produkt/honeywell-eda52',
      note: 'Ta sama specyfikacja, inna obudowa',
    },
  ],
}

export default function HoneywellCT30PPage() {
  return <ProductPage data={data} />
}
