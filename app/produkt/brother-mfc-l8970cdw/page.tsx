'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'brother-mfc-l8970cdw',
  name: 'Brother MFC-L8970CDW',
  category: 'Urządzenia wielofunkcyjne',
  categoryHref: '/kategoria/urzadzenia-wielofunkcyjne',
  images: ['/MFCL8970CDW_1.png', '/MFCL8970CDW_2.png', '/MFCL8970CDW_3.png', '/MFCL8970CDW_4.png'],
  inquiry: {
    description: 'Kolorowe urządzenie 4 w 1 z ekranem 7″ i szybkim skanerem',
    specifications: 'Kolor laser · druk 31 str./min · skan dwustronny 100 ipm · ekran 17,6 cm · NFC',
  },
  whyNavLabel: 'Dlaczego MFC-L8970CDW',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W kancelarii nadleśnictwa',
  highlights: [
    { icon: ICON.skandok, label: 'Skan dwustronny', value: 'do 100 obrazów/min' },
    { icon: ICON.przekatna, label: 'Panel', value: 'ekran dotykowy 17,6 cm (7″)' },
    { icon: ICON.kolor, label: 'Druk', value: 'kolorowy, 31 stron/min' },
    { icon: ICON.nfc, label: 'Logowanie', value: 'karta NFC, Secure Print' },
  ],
  specGroups: [
    {
      title: 'Ogólne',
      rows: [
        { k: 'Typ', v: 'kolorowa, laserowa' },
        { k: 'Funkcje', v: 'druk, kopiowanie, skanowanie, faks' },
        { k: 'Panel', v: 'kolorowy ekran dotykowy 17,6 cm (7″)' },
        { k: 'Procesor i pamięć', v: '1,2 GHz, 1 GB' },
        { k: 'Łączność', v: 'Gigabit Ethernet, Wi-Fi 2,4 i 5 GHz, USB host z przodu i z tyłu, NFC' },
      ],
    },
    {
      title: 'Drukowanie',
      rows: [
        { k: 'Prędkość', v: '31 stron/min w kolorze i w czerni (A4)' },
        { k: 'Dupleks', v: 'automatyczny, 20 stron/min' },
        { k: 'Pierwszy wydruk', v: 'poniżej 9,9 sekundy' },
        { k: 'Rozdzielczość', v: 'do 2400 × 600 dpi' },
        { k: 'Języki druku', v: 'PCL6, BR-Script3, PDF' },
      ],
    },
    {
      title: 'Obsługa papieru',
      rows: [
        { k: 'Podajnik główny', v: '250 arkuszy, rozbudowa do 1290 (podajniki 250 i 520 arkuszy)' },
        { k: 'Podajnik wielofunkcyjny', v: '50 arkuszy lub 10 kopert' },
        { k: 'ADF', v: '80 arkuszy, dwustronny' },
        { k: 'Odbiornik', v: '150 arkuszy' },
        { k: 'Formaty', v: 'A4, A5, A6, Letter, Legal, Executive' },
        { k: 'Gramatura', v: '60–105 g/m², z podajnika wielofunkcyjnego do 163 g/m²' },
      ],
    },
    {
      title: 'Skanowanie i kopiowanie',
      rows: [
        { k: 'Skaner', v: 'podwójny CIS, obie strony w jednym przejściu' },
        { k: 'Prędkość skanowania', v: '100 obrazów/min w czerni, 70 w kolorze' },
        { k: 'Rozdzielczość skanowania', v: '1200 × 1200 dpi' },
        { k: 'Skanowanie do', v: 'pamięci USB, e-maila, folderu sieciowego, SharePoint, SFTP, OCR' },
        { k: 'Kopiowanie', v: '31 kopii/min, 1200 × 600 dpi' },
        { k: 'Wymiary i waga', v: '454 × 505 × 460 mm, 26,7 kg' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.skandok,
      title: 'Sto obrazów na minutę',
      body:
        'Podwójny skaner czyta obie strony kartki w jednym przejściu — teczka 80 arkuszy z podajnika trafia do folderu sieciowego w niecałe dwie minuty.',
    },
    {
      icon: ICON.przekatna,
      title: 'Ekran jak w tablecie',
      body:
        'Dotykowy panel 7″ pokazuje skróty do najczęstszych zadań, więc skan do folderu czy kopia dwustronna to jedno dotknięcie, bez szukania w menu.',
    },
    {
      icon: ICON.nfc,
      title: 'Wydruk dopiero przy urządzeniu',
      body:
        'Logowanie kartą NFC i Secure Print sprawiają, że poufne dokumenty nie leżą na tacy — wychodzą, gdy właściciel stanie przy urządzeniu.',
    },
    {
      icon: ICON.kolor,
      title: 'Rzadsza wymiana tonerów',
      body:
        'Tonery TN625XXL drukują 7 500 stron w czerni i 6 500 w kolorze, a ultrawydajne TN627 do 10 000 stron na kasetę — mniej zamówień i mniej przestojów w kancelarii.',
    },
  ],
  usedBy: { device: 'Brother MFC-L8970CDW' },
  signature: [
    {
      icon: ICON.skandok,
      title: 'Skaner 100 obrazów na minutę',
      body:
        'W czerni prawie dwa razy szybszy niż w MFC-L8730CDW (100 wobec 56 obrazów), do tego 1 GB pamięci. Urządzenie dla sekretariatu, który codziennie digitalizuje korespondencję.',
      tone: 'ciemny',
    },
    {
      icon: ICON.przekatna,
      title: 'Ekran dotykowy 17,6 cm',
      body:
        'Panel 7″ mieści 64 konfigurowalne skróty do zadań, które kancelaria wykonuje każdego dnia — od skanu do folderu działu po kopię dwustronną.',
      tone: 'akcent',
    },
  ],
  accessoriesHeading: 'Materiały eksploatacyjne — dodaj do zapytania',
  accessories: [
    {
      id: 'tn625',
      name: 'Toner TN625',
      meta: '3 000 / 1 800 stron',
      description: 'Oryginalny toner Brother, czarny oraz cyan, magenta i żółty',
      image: '/TN625BK.jpg',
    },
    {
      id: 'tn625xl',
      name: 'Toner TN625XL',
      meta: '5 500 / 4 500 stron',
      description: 'Oryginalny toner Brother o zwiększonej wydajności, cztery kolory',
      image: '/TN625XLBK.jpg',
    },
    {
      id: 'tn625xxl',
      name: 'Toner TN625XXL',
      meta: '7 500 / 6 500 stron',
      description: 'Oryginalny toner Brother super wydajny, cztery kolory',
      image: '/TN625XXLBK.jpg',
    },
    {
      id: 'tn627',
      name: 'Toner TN627',
      meta: '10 000 stron',
      description: 'Oryginalny toner Brother ultrawydajny, cztery kolory',
      image: '/TN627BK.jpg',
    },
    {
      id: 'dr625cl',
      name: 'Bęben DR625CL',
      meta: '50 000 stron',
      description: 'Oryginalny zestaw czterech bębnów Brother',
      image: '/DR625CL.jpg',
    },
  ],
  related: [
    {
      name: 'Brother MFC-L8730CDW',
      href: '/produkt/brother-mfc-l8730cdw',
      note: 'Ten sam druk, ekran 8,8 cm i skaner 56 obrazów na minutę',
    },
  ],
}

export default function BrotherMFCL8970CDWPage() {
  return <ProductPage data={data} />
}
