'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'samsung-ssd-t9',
  name: 'Samsung SSD T9 1 TB',
  category: 'Akcesoria komputerowe',
  categoryHref: '/kategoria/akcesoria-komputerowe',
  images: ['/ssd_t7_1.png'],
  inquiry: {
    description: 'Zewnętrzny dysk SSD USB 3.2 Gen 2x2',
    specifications: '1 TB · odczyt do 2000 MB/s · USB-C 20 Gb/s · szyfrowanie AES 256 bit · 122 g',
  },
  whyNavLabel: 'Dlaczego T9',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.transfer, label: 'Odczyt', value: 'do 2000 MB/s' },
    { icon: ICON.pojemnosc, label: 'Pojemność', value: '1 TB' },
    { icon: ICON.usbc, label: 'Złącze', value: 'USB-C 3.2 Gen 2x2 (20 Gb/s)' },
    { icon: ICON.upadek, label: 'Odporność', value: 'upadki z 3 m' },
  ],
  specGroups: [
    {
      title: 'Wydajność',
      rows: [
        { k: 'Odczyt sekwencyjny', v: 'do 2000 MB/s' },
        { k: 'Zapis sekwencyjny', v: 'do 1950 MB/s' },
        { k: 'Interfejs', v: 'USB 3.2 Gen 2x2, przepustowość 20 Gb/s' },
        { k: 'Złącze', v: 'USB-C' },
      ],
    },
    {
      title: 'Obudowa',
      rows: [
        { k: 'Wymiary', v: '88 × 60 × 14 mm' },
        { k: 'Waga', v: '122 g' },
        { k: 'Odporność', v: 'upadki z wysokości do 3 m' },
        { k: 'Wykończenie', v: 'wzmocniona obudowa z powłoką antypoślizgową' },
      ],
    },
    {
      title: 'Zabezpieczenia i zgodność',
      rows: [
        { k: 'Szyfrowanie', v: 'sprzętowe AES 256 bit' },
        { k: 'Ochrona hasłem', v: 'tak, przez oprogramowanie Samsung' },
        { k: 'Systemy', v: 'Windows, macOS, Android' },
        { k: 'Gwarancja', v: '5 lat' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.transfer,
      title: 'Dwa tysiące megabajtów na sekundę',
      body:
        'Kopia zdjęć z powierzchni czy archiwum dokumentacji schodzi z dysku w tempie, przy którym nie warto już wychodzić po kawę.',
    },
    {
      icon: ICON.klodka,
      title: 'Dane pod hasłem, nie na wierzchu',
      body:
        'Sprzętowe szyfrowanie AES 256 bit z ochroną hasłem — dysk wyniesiony z biura albo zgubiony w terenie nie jest otwartą teczką.',
    },
    {
      icon: ICON.upadek,
      title: 'Zniesie upadek z trzech metrów',
      body:
        'Wzmocniona obudowa z gumową powłoką — sprzęt do noszenia w plecaku razem z resztą wyposażenia, nie do trzymania w szufladzie.',
    },
    {
      icon: ICON.usbc,
      title: 'Jeden przewód do laptopa',
      body:
        'USB-C w standardzie 3.2 Gen 2x2 — dysk podłącza się jednym kablem, bez zasilacza i bez przejściówek.',
    },
  ],
  signature: [
    {
      icon: ICON.klodka,
      title: 'Szyfrowanie sprzętowe AES 256 bit',
      body:
        'Dysk szyfruje dane układem w obudowie, a nie programem na komputerze. Bez hasła zawartość jest nieczytelna także po wyjęciu kości pamięci.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Samsung SSD T7',
      href: '/produkt/samsung-ssd-t7',
      note: 'Cieńsza obudowa, odczyt do 1050 MB/s',
    },
  ],
}

export default function SamsungSSDT9Page() {
  return <ProductPage data={data} />
}
