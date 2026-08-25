'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'aio-dell-pro-24',
  name: 'Dell Pro 24 All in One',
  category: 'All in One',
  categoryHref: '/kategoria/all-in-one',
  images: ['/aio_dell_1.png'],
  inquiry: {
    description: 'Komputer w obudowie monitora, gotowy do pracy',
    specifications: 'Windows 11 Pro · 23,8″ FHD 100 Hz · Core Ultra 5 235 · 16 GB · SSD 512 GB',
  },
  whyNavLabel: 'Dlaczego Dell Pro 24 AIO',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na stanowisku w kancelarii',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '23,8″ FHD, 100 Hz' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Core Ultra 5 235, 14 rdzeni' },
    { icon: ICON.pamiec, label: 'Pamięć', value: '16 GB DDR5 + SSD 512 GB' },
    { icon: ICON.onsite, label: 'Gwarancja', value: 'ProSupport 60 miesięcy' },
  ],
  variants: [
    { id: 'konfiguracja', label: 'Konfiguracja', options: ['16 GB / SSD 512 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '23,8″' },
        { k: 'Matryca', v: 'FHD, 100 Hz, bez obsługi dotykowej' },
        { k: 'Kamera', v: 'FHD HDR' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Intel Core Ultra 5 235' },
        { k: 'Rdzenie', v: '14 rdzeni, do 5,0 GHz' },
        { k: 'NPU', v: '13 TOPS' },
        { k: 'Pamięć RAM', v: '16 GB DDR5, 5600 MT/s' },
        { k: 'Dysk', v: 'SSD 512 GB' },
        { k: 'Grafika', v: 'zintegrowana' },
      ],
    },
    {
      title: 'Łączność i zestaw',
      rows: [
        { k: 'Sieć', v: 'Wi-Fi 6E AX211, 2×2' },
        { k: 'Bluetooth', v: 'tak' },
        { k: 'Klawiatura', v: 'Dell KB216, multimedialna' },
        { k: 'Mysz', v: 'Dell MS116, przewodowa' },
      ],
    },
    {
      title: 'System i obsługa',
      rows: [
        { k: 'System', v: 'Windows 11 Pro' },
        { k: 'Podstawa', v: 'regulowana wysokość (HAS)' },
        { k: 'Gwarancja', v: 'ProSupport 60 miesięcy' },
        { k: 'Serwis', v: 'u klienta w następnym dniu roboczym' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.kompakt,
      title: 'Komputer schowany w monitorze',
      body:
        'Pod biurkiem nie stoi jednostka centralna, a z tyłu biegnie jeden kabel zasilający — sprzątanie stanowiska i przenoszenie go do innego pokoju zajmuje minutę.',
    },
    {
      icon: ICON.procesor,
      title: 'Czternaście rdzeni do pracy z SILP-em',
      body:
        'Core Ultra 5 235 z jednostką NPU obsługuje bez zwolnień równolegle otwarty system, pocztę i arkusze — przez cały okres pięcioletniej gwarancji.',
    },
    {
      icon: ICON.kamera,
      title: 'Kamera FHD HDR do narad zdalnych',
      body:
        'Wbudowana kamera zastępuje dokupywany zestaw i nie zajmuje kolejnego portu USB na stanowisku.',
    },
    {
      icon: ICON.ergonomia,
      title: 'Regulacja wysokości w podstawie',
      body:
        'Ekran ustawia się pod wzrost osoby pracującej, co przy stanowisku obsługiwanym na zmiany ma większe znaczenie niż w komputerze przypisanym do jednej osoby.',
    },
  ],
  signature: [
    {
      icon: ICON.onsite,
      title: 'Pięć lat gwarancji ProSupport',
      body:
        'Sześćdziesiąt miesięcy wsparcia z serwisem u klienta w następnym dniu roboczym. Awaria nie oznacza wysyłki sprzętu ani przestoju stanowiska.',
      tone: 'akcent',
    },
    {
      icon: ICON.klawiatura,
      title: 'Klawiatura i mysz w zestawie',
      body:
        'Multimedialna klawiatura Dell KB216 i mysz MS116 dołączone do zestawu — stanowisko jest kompletne od chwili rozpakowania.',
      tone: 'ciemny',
    },
  ],
  usedBy: { device: 'Dell AIO Pro 24' },
  related: [
    {
      name: 'Dell Pro 24 All in One bez systemu',
      href: '/produkt/aio-dell-pro-24-bez-systemu',
      note: 'Ta sama maszyna bez licencji, z 8 GB i dyskiem 256 GB',
    },
    {
      name: 'Dell Pro 16 Plus',
      href: '/produkt/dell-pro-16-plus',
      note: 'Ta sama platforma w laptopie, gdy stanowisko bywa mobilne',
    },
  ],
}

export default function DellAIOPro24Page() {
  return <ProductPage data={data} />
}
