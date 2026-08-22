'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'brother-mfc-l8900cdw',
  name: 'Brother MFC-L8900CDW',
  category: 'Urządzenia wielofunkcyjne',
  categoryHref: '/kategoria/urzadzenia-wielofunkcyjne',
  images: ['/MFCL8900CDW_1.png'],
  inquiry: {
    description: 'Kolorowe urządzenie 4 w 1 z obsługą NFC',
    specifications: 'Kolor laser · druk 31 str./min · NFC · skan dwustronny · faks',
  },
  whyNavLabel: 'Dlaczego MFC-L8900CDW',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W kancelarii nadleśnictwa',
  highlights: [
    { icon: ICON.kolor, label: 'Druk', value: 'kolorowy, 31 stron/min' },
    { icon: ICON.nfc, label: 'Druk mobilny', value: 'NFC, AirPrint, Mopria' },
    { icon: ICON.adf, label: 'Podajnik ADF', value: '50 arkuszy, dwustronny' },
    { icon: ICON.wsparcie, label: 'Cykl pracy', value: 'do 4000 stron miesięcznie' },
  ],
  specGroups: [
    {
      title: 'Ogólne',
      rows: [
        { k: 'Typ', v: 'kolorowa, laserowa' },
        { k: 'Funkcje', v: 'druk, kopiowanie, skanowanie, faks' },
        { k: 'Panel', v: 'ekran dotykowy' },
        { k: 'Łączność', v: 'USB 2.0, Gigabit Ethernet, Wi-Fi' },
      ],
    },
    {
      title: 'Drukowanie',
      rows: [
        { k: 'Prędkość mono', v: '31 stron/min (A4)' },
        { k: 'Prędkość kolor', v: '31 stron/min (A4)' },
        { k: 'Dupleks', v: 'automatyczny, 14 stron/min' },
        { k: 'Pamięć', v: '512 MB' },
      ],
    },
    {
      title: 'Obsługa papieru',
      rows: [
        { k: 'Podajnik główny', v: '250 arkuszy' },
        { k: 'Podajnik wielofunkcyjny', v: '50 arkuszy' },
        { k: 'Odbiornik', v: '150 arkuszy' },
        { k: 'ADF', v: '50 arkuszy, dwustronny' },
      ],
    },
    {
      title: 'Skanowanie i eksploatacja',
      rows: [
        { k: 'Skaner', v: 'dwustronny CIS, 28 ipm mono i kolor' },
        { k: 'Kopiowanie', v: '31 kopii/min' },
        { k: 'Cykl pracy', v: 'do 4000 stron miesięcznie' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.nfc,
      title: 'Wydruk po zbliżeniu telefonu',
      body:
        'Moduł NFC pozwala wysłać dokument przez zbliżenie urządzenia i obsłużyć logowanie kartą przy stanowisku wspólnym dla kilku osób.',
    },
    {
      icon: ICON.kolor,
      title: 'Kolor bez utraty prędkości',
      body:
        'Trzydzieści jeden stron na minutę zarówno w kolorze, jak i w czerni — bez wyboru między szybkością a formą wydruku.',
    },
    {
      icon: ICON.skandok,
      title: 'Skanowanie dwustronne z podajnika',
      body:
        'Dwustronny skaner CIS czyta 28 obrazów na minutę, a podajnik na 50 arkuszy obsługuje całą teczkę bez nadzoru.',
    },
    {
      icon: ICON.wsparcie,
      title: 'Cykl pracy do 4000 stron',
      body:
        'Wyższy miesięczny cykl pracy niż w modelu podstawowym — sprzęt na stanowisko o większym ruchu.',
    },
  ],
  usedBy: { device: 'Brother MFC-L8900CDW' },
  whereToBuy: [{ name: 'ZUP Łódź' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.nfc,
      title: 'Technologia NFC',
      body:
        'Drukowanie z urządzeń mobilnych przez zbliżenie telefonu, bez konfigurowania połączenia. NFC obsługuje też logowanie kartą na stanowisku współdzielonym.',
      tone: 'ciemny',
    },
    {
      icon: ICON.kolor,
      title: 'Pełny kolor w prędkości 31 stron na minutę',
      body:
        'Druk laserowy w kolorze i w czerni z tą samą prędkością, przy cyklu pracy do 4000 stron miesięcznie.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Brother MFC-L8690CDW',
      href: '/produkt/brother-mfc-l8690cdw',
      note: 'Ten sam druk bez modułu NFC',
    },
  ],
}

export default function BrotherMFCL8900CDWPage() {
  return <ProductPage data={data} />
}
