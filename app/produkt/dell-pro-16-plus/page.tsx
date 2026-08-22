'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'dell-pro-16-plus',
  name: 'Dell Pro 16 Plus',
  category: 'Laptopy',
  categoryHref: '/kategoria/laptopy',
  images: ['/dell_16_1.png'],
  inquiry: {
    description: 'Laptop do biura nadleśnictwa z ekranem 16 cali',
    specifications: 'Windows 11 Pro · 16″ FHD+ · Core Ultra 5 vPro · 16 GB · SSD 512 GB',
  },
  whyNavLabel: 'Dlaczego Dell Pro 16 Plus',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '16″ FHD+ IPS, 300 nitów' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Core Ultra 5 235U vPro' },
    { icon: ICON.pamiec, label: 'Pamięć', value: '16 GB DDR5 + SSD 512 GB' },
    { icon: ICON.onsite, label: 'Gwarancja', value: 'ProSupport, serwis u klienta' },
  ],
  variants: [
    { id: 'pamiec', label: 'Konfiguracja', options: ['16 GB / SSD 512 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '16″' },
        { k: 'Matryca', v: 'FHD+ IPS, powłoka przeciwodblaskowa' },
        { k: 'Jasność', v: '300 nitów, 45% NTSC' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Intel Core Ultra 5 235U vPro' },
        { k: 'Rdzenie', v: '12 rdzeni, do 4,9 GHz' },
        { k: 'NPU', v: '12 TOPS' },
        { k: 'Pamięć RAM', v: '16 GB DDR5, 5600 MT/s' },
        { k: 'Dysk', v: 'SSD 512 GB' },
        { k: 'Grafika', v: 'zintegrowana Intel Graphics' },
      ],
    },
    {
      title: 'Łączność i zabezpieczenia',
      rows: [
        { k: 'Sieć', v: 'Wi-Fi 6E AX211, 2×2' },
        { k: 'Bluetooth', v: '5.3' },
        { k: 'Kamera', v: 'FHD HDR z IR, rozpoznawanie twarzy' },
        { k: 'Czytniki', v: 'linii papilarnych, kart smart Control Vault 3+' },
      ],
    },
    {
      title: 'Klawiatura i zasilanie',
      rows: [
        { k: 'Klawiatura', v: 'podświetlana, z częścią numeryczną' },
        { k: 'Bateria', v: '55 Wh z ExpressCharge' },
        { k: 'Zasilacz', v: '65 W USB-C' },
        { k: 'System', v: 'Windows 11 Pro' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.przekatna,
      title: 'Szesnaście cali na dwa dokumenty',
      body:
        'Matryca 16″ mieści obok siebie SILP i arkusz kalkulacyjny, a powłoka przeciwodblaskowa nie męczy wzroku przy oknie.',
    },
    {
      icon: ICON.klawiatura,
      title: 'Pełna klawiatura z częścią numeryczną',
      body:
        'Wprowadzanie danych liczbowych idzie szybciej niż na klawiaturze bez bloku numerycznego — przy sprawozdaniach to realna oszczędność czasu.',
    },
    {
      icon: ICON.odcisk,
      title: 'Logowanie odciskiem lub twarzą',
      body:
        'Czytnik linii papilarnych i kamera na podczerwień skracają logowanie i zdejmują konieczność wpisywania hasła przy każdym otwarciu laptopa.',
    },
    {
      icon: ICON.ladowanie,
      title: 'Ładowanie jednym zasilaczem USB-C',
      body:
        'Zasilacz 65 W z ExpressCharge uzupełnia baterię w czasie przerwy, a to samo złącze zasila laptop z monitora ze stacją dokującą.',
    },
  ],
  usedBy: { device: 'Dell Pro 16 Plus' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/komputery-pc-laptopy-all-in-one' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.onsite,
      title: '5-letnia gwarancja Dell ProSupport',
      body:
        'Serwis u klienta w następnym dniu roboczym po zdalnej diagnozie i wsparcie techniczne przez całą dobę. Awaria nie oznacza wysyłki sprzętu ani przestoju stanowiska.',
      tone: 'akcent',
    },
    {
      icon: ICON.smartcard,
      title: 'Wbudowany czytnik SmartCard',
      body:
        'Czytnik kart inteligentnych Control Vault 3+ wraz z portem RJ-45 — logowanie kartą do systemów wymagających autoryzacji działa bez zewnętrznych przejściówek.',
      tone: 'ciemny',
    },
  ],
  related: [
    {
      name: 'Dell Pro 14 Plus',
      href: '/produkt/dell-pro-14-plus',
      note: 'Ta sama specyfikacja w mniejszej obudowie',
    },
    {
      name: 'Dell Pro 16',
      href: '/produkt/dell-pro-16',
      note: 'Wersja z Ubuntu, bez licencji Windows',
    },
  ],
}

export default function DellPro16PlusPage() {
  return <ProductPage data={data} />
}
