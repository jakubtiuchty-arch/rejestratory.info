'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'hp-seria-5-pro-527pq',
  name: 'HP Pro S5 QHD 527pq',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/527pq_1.png'],
  inquiry: {
    description: 'Monitor 27 cali QHD do pracy biurowej',
    specifications: '27″ QHD 100 Hz · IPS · 100% sRGB · pivot · HP Eye Ease',
  },
  whyNavLabel: 'Dlaczego 527pq',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.rozdzielczosc, label: 'Ekran', value: '27″ QHD 2560 × 1440, 100 Hz' },
    { icon: ICON.plynnosc, label: 'Odświeżanie', value: '100 Hz' },
    { icon: ICON.ergonomia, label: 'Ergonomia', value: 'regulacja 150 mm, pivot' },
    { icon: ICON.oko, label: 'Komfort', value: 'HP Eye Ease, TÜV Low Blue Light' },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Rozdzielczość', v: 'QHD 2560 × 1440' },
        { k: 'Odświeżanie', v: '100 Hz' },
        { k: 'Matryca', v: 'IPS, kąty 178°/178°' },
        { k: 'Jasność', v: '350 nitów' },
        { k: 'Kontrast', v: '1500:1 statyczny' },
        { k: 'Czas reakcji', v: '5 ms GtG z Overdrive' },
        { k: 'Gamut', v: '100% sRGB, True 8 bit' },
      ],
    },
    {
      title: 'Łączność',
      rows: [
        { k: 'Wideo', v: 'HDMI 2.0, DisplayPort 1.2' },
        { k: 'HDCP', v: 'tak' },
        { k: 'Częstotliwość', v: '50–100 Hz pionowo, 30–152 kHz poziomo' },
      ],
    },
    {
      title: 'Komfort i certyfikaty',
      rows: [
        { k: 'HP Eye Ease', v: 'tak, TÜV Low Blue Light' },
        { k: 'Eliminacja migotania', v: 'tak, certyfikat TÜV' },
        { k: 'Powłoka', v: 'antyrefleksyjna 3H' },
        { k: 'Certyfikaty', v: 'TCO, EPEAT Gold Climate+, ENERGY STAR' },
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
        { k: 'Waga', v: '6,2 kg z podstawą' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.plynnosc,
      title: 'Sto herców przy przewijaniu',
      body:
        'Wyższe odświeżanie sprawia, że przewijanie długich dokumentów i tabel jest płynne, a oczy mniej się męczą.',
    },
    {
      icon: ICON.rozdzielczosc,
      title: 'QHD i pełna paleta sRGB',
      body:
        'Dwa i pół tysiąca pikseli w poziomie i 100% sRGB — obraz czytelny i wierny przy pracy z mapami.',
    },
    {
      icon: ICON.oko,
      title: 'HP Eye Ease z certyfikatem TÜV',
      body:
        'Filtr światła niebieskiego działa bez zmiany barw, a matryca nie migocze.',
    },
    {
      icon: ICON.ergonomia,
      title: 'Pełna regulacja i pivot',
      body:
        'Podnoszenie o 150 mm i obrót do pionu pozwalają dopasować monitor do stanowiska i rodzaju dokumentu.',
    },
  ],
  usedBy: { device: '527pq' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/monitory' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.plynnosc,
      title: 'Odświeżanie 100 Hz',
      body:
        'Płynny obraz przy przewijaniu dokumentów, pracy z arkuszami i przeglądaniu map — komfort odczuwalny przez cały dzień pracy.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'HP Pro S5 QHD USB-C 527pv',
      href: '/produkt/hp-seria-5-pro-527pu',
      note: 'Ta sama matryca z USB-C i gniazdem RJ-45',
    },
  ],
}

export default function HP527pqPage() {
  return <ProductPage data={data} />
}
