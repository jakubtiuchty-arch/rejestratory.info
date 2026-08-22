'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'dell-pro-16',
  name: 'Dell Pro 16',
  category: 'Laptopy',
  categoryHref: '/kategoria/laptopy',
  images: ['/dell_16_bs_1.png'],
  inquiry: {
    description: 'Laptop bez licencji Windows, z Ubuntu',
    specifications: 'Ubuntu 24.04 LTS · 16″ FHD+ · Core 3 100U · 8 GB · SSD 256 GB',
  },
  whyNavLabel: 'Dlaczego Dell Pro 16',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.linux, label: 'System', value: 'Ubuntu Linux 24.04 LTS' },
    { icon: ICON.przekatna, label: 'Ekran', value: '16″ FHD+ IPS, 300 nitów' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Intel Core 3 100U' },
    { icon: ICON.pamiec, label: 'Pamięć', value: '8 GB DDR5 + SSD 256 GB' },
  ],
  variants: [
    { id: 'pamiec', label: 'Konfiguracja', options: ['8 GB / SSD 256 GB'] },
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
        { k: 'Procesor', v: 'Intel Core 3 100U' },
        { k: 'Rdzenie', v: '6 rdzeni, do 4,7 GHz' },
        { k: 'Pamięć RAM', v: '8 GB DDR5, 5600 MT/s' },
        { k: 'Dysk', v: 'SSD TLC 256 GB' },
        { k: 'Grafika', v: 'zintegrowana Intel Graphics' },
      ],
    },
    {
      title: 'Łączność i multimedia',
      rows: [
        { k: 'Sieć', v: 'Wi-Fi 6E AX211, 2×2' },
        { k: 'Bluetooth', v: '5.3' },
        { k: 'Kamera', v: 'HD z redukcją szumów i zasłoną' },
      ],
    },
    {
      title: 'Klawiatura i zasilanie',
      rows: [
        { k: 'Klawiatura', v: 'podświetlana, z częścią numeryczną' },
        { k: 'Bateria', v: '55 Wh z ExpressCharge' },
        { k: 'Zasilacz', v: '65 W USB-C' },
        { k: 'System', v: 'Ubuntu Linux 24.04 LTS' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.przekatna,
      title: 'Duży ekran do pracy z dokumentami',
      body:
        'Szesnaście cali FHD+ z powłoką przeciwodblaskową to wygodna praca z dokumentacją także przy oknie.',
    },
    {
      icon: ICON.klawiatura,
      title: 'Klawiatura numeryczna w standardzie',
      body:
        'Pełny blok numeryczny przyspiesza wprowadzanie danych — mimo że to model podstawowy, klawiatura jest taka jak w wersjach Plus.',
    },
    {
      icon: ICON.antyodblask,
      title: 'Kamera z zasłoną prywatności',
      body:
        'Fizyczna zasłonka nad obiektywem zamyka temat podglądu bez naklejania taśmy na obudowę.',
    },
    {
      icon: ICON.ladowanie,
      title: 'Ładowanie przez USB-C',
      body:
        'Zasilacz 65 W z ExpressCharge uzupełnia baterię w przerwie, a to samo złącze łączy laptop ze stacją dokującą w monitorze.',
    },
  ],
  usedBy: { device: 'Dell Pro 16', exclude: 'Dell Pro 16 Plus' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/komputery-pc-laptopy-all-in-one' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.linux,
      title: 'Bez kosztu licencji Windows',
      body:
        'Laptop dostarczany z Ubuntu Linux 24.04 LTS. Dla stanowiska, na którym pracuje się w przeglądarce i pakiecie biurowym, znika koszt licencji systemu.',
      tone: 'akcent',
    },
    {
      icon: ICON.klawiatura,
      title: 'Pełna klawiatura z blokiem numerycznym',
      body:
        'Podświetlana klawiatura z częścią numeryczną — ta sama, co w droższych modelach Dell Pro. Wprowadzanie danych liczbowych bez kompromisów.',
      tone: 'ciemny',
    },
  ],
  related: [
    {
      name: 'Dell Pro 16 Plus',
      href: '/produkt/dell-pro-16-plus',
      note: 'Windows 11 Pro, mocniejszy układ i 16 GB pamięci',
    },
  ],
}

export default function DellPro16Page() {
  return <ProductPage data={data} />
}
