'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'zebra-zd421c',
  name: 'Zebra ZD421c',
  category: 'Elektroniczne Zarządzanie Dokumentacją',
  categoryHref: '/kategoria/ezd',
  images: ['/zd421c_1.png'],
  inquiry: {
    description: 'Drukarka etykiet do znakowania dokumentacji',
    specifications: 'Termotransfer i termika · 203 dpi · 152 mm/s · szerokość druku 104 mm · Link-OS',
  },
  whyNavLabel: 'Dlaczego ZD421c',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W obiegu dokumentów',
  highlights: [
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: 'do 152 mm/s, 203 dpi' },
    { icon: ICON.etykieta, label: 'Etykiety', value: 'szerokość 15–118 mm' },
    { icon: ICON.termotransfer, label: 'Metody druku', value: 'termotransfer i termika' },
    { icon: ICON.siec, label: 'Łączność', value: 'USB, opcjonalnie Ethernet i Wi-Fi' },
  ],
  variants: [
    { id: 'lacznosc', label: 'Łączność', options: ['USB', 'z modułem Ethernet', 'z modułem Wi-Fi'] },
  ],
  specGroups: [
    {
      title: 'Ogólne',
      rows: [
        { k: 'Typ', v: 'drukarka etykiet, termotransferowa' },
        { k: 'Rozdzielczość', v: '203 dpi (8 pkt/mm)' },
        { k: 'Szerokość druku', v: '104 mm' },
        { k: 'Prędkość', v: 'do 152 mm/s' },
      ],
    },
    {
      title: 'Nośniki',
      rows: [
        { k: 'Szerokość etykiety', v: '15–118 mm' },
        { k: 'Długość etykiety', v: '6,4–991 mm' },
        { k: 'Średnica rolki', v: 'do 127 mm' },
        { k: 'Metody druku', v: 'termotransferowa i termiczna bezpośrednia' },
      ],
    },
    {
      title: 'Łączność',
      rows: [
        { k: 'Standard', v: 'USB 2.0, USB Host' },
        { k: 'Opcjonalnie', v: 'Ethernet 10/100, Wi-Fi 802.11ac, Bluetooth 4.1' },
        { k: 'Konfiguracja mobilna', v: 'aplikacja Android i iOS przez Bluetooth LE' },
      ],
    },
    {
      title: 'Pamięć i obsługa',
      rows: [
        { k: 'Flash', v: '512 MB' },
        { k: 'SDRAM', v: '256 MB' },
        { k: 'Języki', v: 'ZPL II, EPL2' },
        { k: 'System', v: 'Link-OS' },
        { k: 'Zegar RTC', v: 'tak' },
        { k: 'Ładowanie mediów', v: 'OpenACCESS' },
        { k: 'Gwarancja', v: '2 lata' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.etykieta,
      title: 'Etykiety na teczki i segregatory',
      body:
        'Szerokość nośnika od 15 do 118 mm obejmuje zarówno drobne naklejki na akta, jak i opisy grzbietów segregatorów w kancelarii.',
    },
    {
      icon: ICON.termotransfer,
      title: 'Dwie metody druku w jednym urządzeniu',
      body:
        'Termotransfer dla etykiet trwałych, które mają przetrwać lata w archiwum, i termika bezpośrednia tam, gdzie liczy się koszt.',
    },
    {
      icon: ICON.szybkosc,
      title: 'Sto pięćdziesiąt dwa milimetry na sekundę',
      body:
        'Seria etykiet do opisania partii dokumentów wychodzi ciągiem, bez czekania między kolejnymi sztukami.',
    },
    {
      icon: ICON.siec,
      title: 'Konfiguracja z telefonu',
      body:
        'Aplikacja Zebry łączy się z drukarką przez Bluetooth Low Energy, więc ustawienia zmienia się bez podłączania komputera.',
    },
  ],
  signature: [
    {
      icon: ICON.wspolpraca,
      title: 'Najczęściej wybierana drukarka w cyfryzacji nadleśnictw',
      body:
        'Model, po który jednostki sięgają najczęściej przy wdrażaniu elektronicznego obiegu dokumentów. Sprawdzony w praktyce i znany osobom prowadzącym kancelarie.',
      tone: 'akcent',
    },
  ],
  usedBy: { device: 'Zebra ZD421c' },
  related: [
    {
      name: 'Honeywell PC45t',
      href: '/produkt/honeywell-pc45t',
      note: 'Odpowiednik z ekranem i obsługą RFID',
    },
  ],
}

export default function ZebraZD421cPage() {
  return <ProductPage data={data} />
}
