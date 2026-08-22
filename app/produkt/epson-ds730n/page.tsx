'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'epson-ds730n',
  name: 'Epson DS-730n',
  category: 'Elektroniczne Zarządzanie Dokumentacją',
  categoryHref: '/kategoria/ezd',
  images: ['/ds730_1.png'],
  inquiry: {
    description: 'Skaner dokumentów do cyfryzacji akt',
    specifications: '40 str./min · dupleks jednoprzebiegowy · ADF 100 ark. · 6500 stron dziennie · Ethernet',
  },
  whyNavLabel: 'Dlaczego DS-730n',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W obiegu dokumentów',
  highlights: [
    { icon: ICON.szybkosc, label: 'Prędkość', value: '40 stron/min, 80 obrazów/min' },
    { icon: ICON.adf, label: 'Podajnik ADF', value: '100 arkuszy' },
    { icon: ICON.dwustronny, label: 'Dupleks', value: 'jednoprzebiegowy' },
    { icon: ICON.lan, label: 'Łączność', value: 'Ethernet 1000Base-T, USB 2.0' },
  ],
  specGroups: [
    {
      title: 'Skanowanie',
      rows: [
        { k: 'Typ', v: 'skaner z podajnikiem' },
        { k: 'Rozdzielczość optyczna', v: '600 × 600 dpi' },
        { k: 'Rozdzielczości wyjściowe', v: '75–1200 dpi' },
        { k: 'Przetwornik', v: 'CIS z podświetleniem ReadyScan LED' },
        { k: 'Głębia koloru', v: 'wejście 30 bit, wyjście 24 bit' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Prędkość', v: '40 stron/min mono i kolor przy 200–300 dpi' },
        { k: 'Obrazy', v: '80 obrazów/min w dupleksie' },
        { k: 'Dzienna wydajność', v: '6500 stron' },
        { k: 'ADF', v: '100 arkuszy' },
        { k: 'Dupleks', v: 'jednoprzebiegowy' },
      ],
    },
    {
      title: 'Obsługa dokumentów',
      rows: [
        { k: 'Formaty', v: 'A4, A5, A6, B4, B5, B6, Letter, Legal, wizytówki, karty plastikowe' },
        { k: 'Maksymalny dokument', v: '215,9 × 6096 mm' },
        { k: 'Gramatura', v: '27–413 g/m²' },
        { k: 'Czujnik ultradźwiękowy', v: 'tak — wykrywa pobranie dwóch kartek' },
      ],
    },
    {
      title: 'Funkcje i złącza',
      rows: [
        { k: 'Korekta położenia', v: 'automatyczna' },
        { k: 'Pomijanie pustych stron', v: 'tak' },
        { k: 'Odczyt kodów kreskowych', v: 'tak' },
        { k: 'Formaty zapisu', v: 'PDF, PDF/A, TIFF, JPEG, PNG, DOCX, XLSX, PPTX' },
        { k: 'Złącza', v: 'USB 2.0, Ethernet 10/100/1000' },
        { k: 'Skanowanie do chmury', v: 'tak' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.adf,
      title: 'Sto arkuszy w podajniku',
      body:
        'Teczkę wkłada się raz i wraca po gotowy plik — przy przenoszeniu akt do systemu EZD to różnica między pracą na godziny a na dni.',
    },
    {
      icon: ICON.dwustronny,
      title: 'Obie strony za jednym przejściem',
      body:
        'Skanowanie dwustronne jednoprzebiegowe daje 80 obrazów na minutę, a czujnik ultradźwiękowy wyłapuje sklejone kartki, zanim powstanie luka w dokumentacji.',
    },
    {
      icon: ICON.skandok,
      title: 'Gotowe pliki do systemu',
      body:
        'Zapis do PDF/A, DOCX czy XLSX, automatyczne prostowanie skanów, pomijanie pustych stron i odczyt kodów kreskowych z dokumentu.',
    },
    {
      icon: ICON.lan,
      title: 'Skaner dla całej kancelarii',
      body:
        'Gniazdo Ethernet oznacza, że z urządzenia korzysta kilka osób z własnych komputerów, bez przepinania kabla USB.',
    },
  ],
  whereToBuy: [{ name: 'ZUP Łódź' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.archiwum,
      title: 'Sześć i pół tysiąca stron dziennie',
      body:
        'Deklarowana dzienna wydajność pracy przy 40 stronach na minutę. Skaner do przeniesienia archiwum jednostki do systemu EZD, nie do pojedynczych pism.',
      tone: 'akcent',
    },
  ],
  usedBy: { device: 'Epson DS-730n' },
  related: [
    {
      name: 'Brother MFC-L5710DW',
      href: '/produkt/brother-mfc-l5710dw',
      note: 'Skanowanie dwustronne w urządzeniu wielofunkcyjnym',
    },
  ],
}

export default function EpsonDS730nPage() {
  return <ProductPage data={data} />
}
