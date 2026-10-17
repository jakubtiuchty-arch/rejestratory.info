'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'brother-mfc-l8730cdw',
  name: 'Brother MFC-L8730CDW',
  category: 'Urządzenia wielofunkcyjne',
  categoryHref: '/kategoria/urzadzenia-wielofunkcyjne',
  images: ['/MFCL8730CDW_1.png'],
  inquiry: {
    description: 'Kolorowe urządzenie 4 w 1 z podajnikiem ADF na 80 arkuszy',
    specifications: 'Kolor laser · druk 31 str./min · skan dwustronny 56 ipm · faks · NFC',
  },
  whyNavLabel: 'Dlaczego MFC-L8730CDW',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W kancelarii nadleśnictwa',
  highlights: [
    { icon: ICON.kolor, label: 'Druk', value: 'kolorowy, 31 stron/min' },
    { icon: ICON.adf, label: 'Podajnik ADF', value: '80 arkuszy, dwustronny' },
    { icon: ICON.skandok, label: 'Skan dwustronny', value: '56 obrazów/min' },
    { icon: ICON.nfc, label: 'Logowanie', value: 'karta NFC, Secure Print' },
  ],
  specGroups: [
    {
      title: 'Ogólne',
      rows: [
        { k: 'Typ', v: 'kolorowa, laserowa' },
        { k: 'Funkcje', v: 'druk, kopiowanie, skanowanie, faks' },
        { k: 'Panel', v: 'kolorowy ekran dotykowy 8,8 cm' },
        { k: 'Procesor i pamięć', v: '1,2 GHz, 512 MB' },
        { k: 'Łączność', v: 'Gigabit Ethernet, Wi-Fi 2,4 i 5 GHz, USB host, NFC' },
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
        { k: 'Podajnik główny', v: '250 arkuszy, rozbudowa do 750' },
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
        { k: 'Prędkość skanowania', v: '56 obrazów/min, w kolorze i w czerni' },
        { k: 'Rozdzielczość skanowania', v: '1200 × 1200 dpi' },
        { k: 'Skanowanie do', v: 'pamięci USB, e-maila, folderu sieciowego, SharePoint, SFTP, OCR' },
        { k: 'Kopiowanie', v: '31 kopii/min, 1200 × 600 dpi' },
        { k: 'Wymiary i waga', v: '404 × 473 × 460 mm, 25,6 kg' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.kolor,
      title: 'Kolor w tempie wydruku czarno-białego',
      body:
        'Trzydzieści jeden stron na minutę w kolorze i w czerni — mapy, zestawienia i materiały informacyjne bez czekania i bez zlecania na zewnątrz.',
    },
    {
      icon: ICON.adf,
      title: 'Cała teczka za jednym razem',
      body:
        'Podajnik dokumentów mieści 80 arkuszy, a podwójny skaner czyta obie strony kartki w jednym przejściu, z prędkością 56 obrazów na minutę.',
    },
    {
      icon: ICON.nfc,
      title: 'Wydruk dopiero przy urządzeniu',
      body:
        'Logowanie kartą NFC i Secure Print sprawiają, że dokument wychodzi z drukarki dopiero wtedy, gdy właściciel stanie obok — także na stanowisku wspólnym dla kilku osób.',
    },
    {
      icon: ICON.skandok,
      title: 'Skan prosto do folderu sieciowego',
      body:
        'Zeskanowane dokumenty trafiają od razu do folderu sieciowego, na e-mail, do SharePoint albo na pamięć USB, z rozpoznawaniem tekstu (OCR).',
    },
  ],
  usedBy: { device: 'Brother MFC-L8730CDW' },
  signature: [
    {
      icon: ICON.adf,
      title: 'Podajnik ADF na 80 arkuszy',
      body:
        'MFC-L8690CDW i MFC-L8900CDW mają podajnik dokumentów na 50 arkuszy, ten model na 80, ze skanowaniem obu stron w jednym przejściu. Rozwiązanie dla sekretariatu, przez który przechodzi dużo dokumentów do zeskanowania.',
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
      description: 'Oryginalny toner Brother o najwyższej wydajności, cztery kolory',
      image: '/TN625XXLBK.jpg',
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
      name: 'Brother MFC-L8970CDW',
      href: '/produkt/brother-mfc-l8970cdw',
      note: 'Ekran 7″ i skanowanie do 100 obrazów na minutę',
    },
  ],
}

export default function BrotherMFCL8730CDWPage() {
  return <ProductPage data={data} />
}
