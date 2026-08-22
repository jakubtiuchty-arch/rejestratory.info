'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'honeywell-ct40xp',
  name: 'Honeywell CT40XP',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/ct40xp_1.png'],
  inquiry: {
    description: 'Kompaktowy terminal z ekranem Full HD',
    specifications: 'Android · 5″ Full HD · Snapdragon 660 · 4/32 GB · 4020 mAh · IP67',
  },
  whyNavLabel: 'Dlaczego CT40XP',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '5″ Full HD' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '4020 mAh, ponad 12 h' },
    { icon: ICON.woda, label: 'Odporność', value: 'IP67, upadek z 1,2 m' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Snapdragon 660, 2,2 GHz' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['4 GB / 32 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '5″' },
        { k: 'Rozdzielczość', v: '1920 × 1080 Full HD' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Snapdragon 660, 8 rdzeni, 2,2 GHz' },
        { k: 'Pamięć RAM', v: '4 GB' },
        { k: 'Pamięć wbudowana', v: '32 GB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP67' },
        { k: 'Upadki', v: 'z 1,2 m' },
        { k: 'Temperatura pracy', v: 'od -10 °C do +50 °C' },
      ],
    },
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Bateria', v: '4020 mAh' },
        { k: 'Czas pracy', v: 'ponad 12 godzin' },
        { k: 'Ładowanie', v: 'USB-C' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.rozdzielczosc,
      title: 'Full HD na pięciu calach',
      body:
        'Gęsty obraz na małym ekranie ułatwia odczyt drobnych oznaczeń bez powiększania mapy.',
    },
    {
      icon: ICON.skaner,
      title: 'Skaner pod kciukiem',
      body:
        'Klawisze skanowania po bokach obudowy pozwalają czytać kody jedną ręką, bez patrzenia na ekran.',
    },
    {
      icon: ICON.woda,
      title: 'IP67 na trudne warunki',
      body:
        'Terminal znosi deszcz, kurz i upadek z 1,2 metra — konstrukcja przewidziana pod pracę w rękawicach.',
    },
    {
      icon: ICON.czaspracy,
      title: 'Ponad 12 godzin pracy',
      body:
        'Ogniwo 4020 mAh pokrywa pełną zmianę wraz z rezerwą na dojazd i raport.',
    },
  ],
  usedBy: { device: 'Honeywell CT40XP' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/rejestratory' }, { name: 'TAKMA' }],
  related: [
    {
      name: 'Honeywell CT47',
      href: '/produkt/honeywell-ct47',
      note: 'Mocniejszy układ i większa bateria',
    },
  ],
}

export default function HoneywellCT40XPPage() {
  return <ProductPage data={data} />
}
