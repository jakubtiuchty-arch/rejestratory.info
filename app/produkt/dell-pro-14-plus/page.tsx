'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'dell-pro-14-plus',
  name: 'Dell Pro 14 Plus',
  category: 'Laptopy',
  categoryHref: '/kategoria/laptopy',
  images: ['/dell_14_1.png'],
  inquiry: {
    description: 'Laptop do biura i w teren, ekran 14 cali',
    specifications: 'Windows 11 Pro · 14″ FHD+ · Core Ultra 5 vPro · 16 GB · SSD 512 GB',
  },
  whyNavLabel: 'Dlaczego Dell Pro 14 Plus',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '14″ FHD+ (1920 × 1200)' },
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
        { k: 'Przekątna', v: '14″' },
        { k: 'Rozdzielczość', v: 'FHD+ 1920 × 1200, powłoka przeciwodblaskowa' },
        { k: 'Jasność', v: '300 nitów, 45% NTSC' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Intel Core Ultra 5 235U vPro' },
        { k: 'Rdzenie', v: '12 rdzeni, do 4,9 GHz' },
        { k: 'Pamięć RAM', v: '16 GB DDR5, 5600 MT/s' },
        { k: 'Dysk', v: 'SSD 512 GB' },
      ],
    },
    {
      title: 'Łączność',
      rows: [
        { k: 'Sieć', v: 'Wi-Fi 6E AX211, 2×2' },
        { k: 'Bluetooth', v: '5.3' },
        { k: 'Kamera', v: '5 Mpx HDR z IR i wykrywaniem obecności' },
      ],
    },
    {
      title: 'Mobilność',
      rows: [
        { k: 'Bateria', v: '55 Wh z ExpressCharge' },
        { k: 'Zasilacz', v: '65 W USB-C' },
        { k: 'System', v: 'Windows 11 Pro' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.waga,
      title: 'Mniejszy, gdy jeździ w teren',
      body:
        'Czternastocalowa obudowa mieści się w typowej torbie i waży mniej od wersji szesnastocalowej — bez straty na wydajności, bo układ jest ten sam.',
    },
    {
      icon: ICON.odcisk,
      title: 'Wykrywanie obecności użytkownika',
      body:
        'Kamera 5 Mpx z podczerwienią loguje twarzą i blokuje ekran, gdy odchodzisz od biurka — przydatne w pokoju z ruchem interesantów.',
    },
    {
      icon: ICON.procesor,
      title: 'Ten sam układ co w modelu 16″',
      body:
        'Core Ultra 5 vPro z 16 GB pamięci obsługuje SILP, pocztę i arkusze naraz, więc mniejszy rozmiar nie oznacza słabszego sprzętu.',
    },
    {
      icon: ICON.ladowanie,
      title: 'Jeden zasilacz do wszystkiego',
      body:
        'Zasilanie 65 W przez USB-C pozwala ładować laptop z tego samego kabla, którym podłączasz monitor ze stacją dokującą.',
    },
  ],
  usedBy: { device: 'Dell Pro 14 Plus' },
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
      name: 'Dell Pro 16 Plus',
      href: '/produkt/dell-pro-16-plus',
      note: 'Ten sam laptop z ekranem 16″ i klawiaturą numeryczną',
    },
  ],
}

export default function DellPro14PlusPage() {
  return <ProductPage data={data} />
}
