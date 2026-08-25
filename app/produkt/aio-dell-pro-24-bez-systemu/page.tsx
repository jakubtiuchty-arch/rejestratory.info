'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'aio-dell-pro-24-bez-systemu',
  name: 'Dell Pro 24 All in One bez systemu',
  category: 'All in One',
  categoryHref: '/kategoria/all-in-one',
  images: ['/aio_dell_1.png'],
  inquiry: {
    description: 'Komputer w obudowie monitora, dostarczany bez systemu',
    specifications: 'Bez systemu · 23,8″ FHD 100 Hz · Core Ultra 5 235 · 8 GB · SSD 256 GB',
  },
  whyNavLabel: 'Dlaczego wersja bez systemu',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na stanowisku w kancelarii',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '23,8″ FHD, 100 Hz' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Core Ultra 5 235, 14 rdzeni' },
    { icon: ICON.pamiec, label: 'Pamięć', value: '8 GB DDR5 + SSD 256 GB' },
    { icon: ICON.onsite, label: 'Gwarancja', value: '60 miesięcy' },
  ],
  variants: [{ id: 'konfiguracja', label: 'Konfiguracja', options: ['8 GB / SSD 256 GB'] }],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '23,8″' },
        { k: 'Matryca', v: 'FHD, 100 Hz' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Intel Core Ultra 5 235' },
        { k: 'Rdzenie', v: '14 rdzeni, do 5,0 GHz' },
        { k: 'NPU', v: '13 TOPS' },
        { k: 'Pamięć RAM', v: '8 GB DDR5, 5600 MT/s' },
        { k: 'Dysk', v: 'SSD 256 GB' },
        { k: 'Grafika', v: 'zintegrowana' },
      ],
    },
    {
      title: 'Łączność i zestaw',
      rows: [
        { k: 'Sieć', v: 'Wi-Fi 6E AX211, 802.11ax' },
        { k: 'Bluetooth', v: 'tak' },
        { k: 'W zestawie', v: 'klawiatura i mysz' },
      ],
    },
    {
      title: 'System i obsługa',
      rows: [
        { k: 'System', v: 'brak — komputer dostarczany bez systemu operacyjnego' },
        { k: 'Gwarancja', v: '60 miesięcy' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.klucz,
      title: 'Bez kosztu licencji w cenie sprzętu',
      body:
        'Komputer przychodzi bez systemu, więc nadleśnictwo, które ma własną licencję Windows z umowy zbiorczej albo przenosi ją ze starego stanowiska, nie płaci za nią drugi raz.',
    },
    {
      icon: ICON.kompakt,
      title: 'Komputer schowany w monitorze',
      body:
        'Pod biurkiem nie stoi jednostka centralna, a z tyłu biegnie jeden kabel zasilający — przeniesienie stanowiska do innego pokoju zajmuje minutę.',
    },
    {
      icon: ICON.procesor,
      title: 'Ten sam procesor co w wersji z Windows',
      body:
        'Core Ultra 5 235 z jednostką NPU i czternastoma rdzeniami — różnica między wersjami leży w pamięci, dysku i systemie, nie w wydajności układu.',
    },
    {
      icon: ICON.onsite,
      title: 'Pięć lat gwarancji',
      body:
        'Sześćdziesiąt miesięcy, tyle samo co w wersji z systemem. Krótszy okres bywa pozorną oszczędnością przy sprzęcie, który stoi na stanowisku pełną kadencję.',
    },
  ],
  signature: [
    {
      icon: ICON.klucz,
      title: 'Tańszy o system i o połowę pamięci',
      body:
        'Wersja z Windows 11 Pro, 16 GB i dyskiem 512 GB kosztuje 6 260,00 zł netto — ta 4 687,00 zł. Różnica to licencja, pamięć i dysk; ekran, procesor, gwarancja i zestaw z klawiaturą są identyczne.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Dell Pro 24 All in One',
      href: '/produkt/aio-dell-pro-24',
      note: 'Ta sama maszyna z Windows 11 Pro, 16 GB i dyskiem 512 GB',
    },
    {
      name: 'Dell Pro 16',
      href: '/produkt/dell-pro-16',
      note: 'Laptop bez licencji Windows, gdy stanowisko bywa mobilne',
    },
  ],
}

export default function DellAIOPro24BezSystemuPage() {
  return <ProductPage data={data} />
}
