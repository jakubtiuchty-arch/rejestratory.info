'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'samsung-ssd-t7',
  name: 'Samsung SSD T7',
  category: 'Akcesoria komputerowe',
  categoryHref: '/kategoria/akcesoria-komputerowe',
  images: ['/ssd_t9_1.png'],
  inquiry: {
    description: 'Zewnętrzny dysk SSD USB 3.2 Gen 2',
    specifications: 'Odczyt do 1050 MB/s · USB-C 10 Gb/s · szyfrowanie AES 256 bit · 58 g · 8 mm grubości',
  },
  whyNavLabel: 'Dlaczego T7',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.transfer, label: 'Odczyt', value: 'do 1050 MB/s' },
    { icon: ICON.dyskzew, label: 'Grubość', value: '8 mm, waga 58 g' },
    { icon: ICON.usbc, label: 'Złącze', value: 'USB-C 3.2 Gen 2 (10 Gb/s)' },
    { icon: ICON.klodka, label: 'Zabezpieczenie', value: 'AES 256 bit i hasło' },
  ],
  variants: [
    { id: 'pojemnosc', label: 'Pojemność', options: ['500 GB', '1 TB', '2 TB'] },
  ],
  specGroups: [
    {
      title: 'Wydajność',
      rows: [
        { k: 'Odczyt sekwencyjny', v: 'do 1050 MB/s' },
        { k: 'Zapis sekwencyjny', v: 'do 1000 MB/s' },
        { k: 'Interfejs', v: 'USB 3.2 Gen 2, przepustowość 10 Gb/s' },
        { k: 'Złącze', v: 'USB-C' },
      ],
    },
    {
      title: 'Obudowa',
      rows: [
        { k: 'Wymiary', v: '85 × 57 × 8 mm' },
        { k: 'Waga', v: '58 g' },
        { k: 'Materiał', v: 'aluminium' },
        { k: 'Chłodzenie', v: 'warstwa rozpraszająca ciepło pod obudową' },
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
      icon: ICON.dyskzew,
      title: 'Osiem milimetrów grubości',
      body:
        'Pięćdziesiąt osiem gramów w aluminiowej obudowie — dysk wchodzi do przedniej kieszeni torby na laptopa i nie przypomina o sobie ciężarem.',
    },
    {
      icon: ICON.transfer,
      title: 'Kopia zapasowa w tle',
      body:
        'Tysiąc pięćdziesiąt megabajtów na sekundę wystarcza, żeby archiwizacja dokumentacji leśnictwa przestała być zadaniem na koniec dnia.',
    },
    {
      icon: ICON.klodka,
      title: 'Dane pod hasłem',
      body:
        'Sprzętowe szyfrowanie AES 256 bit z ochroną hasłem — zawartość dysku zostaje zamknięta razem z nim.',
    },
    {
      icon: ICON.usbc,
      title: 'Podłączasz i pracujesz',
      body:
        'USB-C bez dodatkowego zasilania, zgodny z komputerami i telefonami z Androidem.',
    },
  ],
  signature: [
    {
      icon: ICON.dyskzew,
      title: 'Najlżejszy dysk w tym zestawieniu',
      body:
        'Pięćdziesiąt osiem gramów i osiem milimetrów grubości. Jeśli dysk ma jeździć w terenie razem z laptopem, waga zaczyna mieć znaczenie.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Samsung SSD T9 1 TB',
      href: '/produkt/samsung-ssd-t9',
      note: 'Dwa razy szybszy, odporny na upadki z 3 m',
    },
  ],
}

export default function SamsungSSDT7Page() {
  return <ProductPage data={data} />
}
