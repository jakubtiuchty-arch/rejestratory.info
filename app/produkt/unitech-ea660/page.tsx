'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'unitech-ea660',
  name: 'Unitech EA660',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/ea660_1.png'],
  inquiry: {
    description: 'Terminal z najdłuższym czasem pracy w zestawieniu',
    specifications: 'Android · 6″ FHD+ · Snapdragon 4490 · 6/128 GB · 5000 mAh · IP65/IP67',
  },
  whyNavLabel: 'Dlaczego EA660',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.czaspracy, label: 'Bateria', value: '5000 mAh, ponad 16 h' },
    { icon: ICON.upadek, label: 'Upadki', value: 'z 1,5 m, z osłoną 1,8 m' },
    { icon: ICON.przekatna, label: 'Ekran', value: '6″ FHD+' },
    { icon: ICON.mroz, label: 'Temperatura', value: 'od -20 °C do +55 °C' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['6 GB / 128 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6″' },
        { k: 'Rozdzielczość', v: '2160 × 1080 FHD+' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Snapdragon 4490, 8 rdzeni, 2,4 GHz' },
        { k: 'Pamięć RAM', v: '6 GB' },
        { k: 'Pamięć wbudowana', v: '128 GB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP65 i IP67' },
        { k: 'Upadki', v: 'z 1,5 m, z osłoną 1,8 m' },
        { k: 'Temperatura pracy', v: 'od -20 °C do +55 °C' },
      ],
    },
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Bateria', v: '5000 mAh' },
        { k: 'Czas pracy', v: 'ponad 16 godzin' },
        { k: 'Ładowanie', v: 'USB-C' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.czaspracy,
      title: 'Ponad 16 godzin pracy',
      body:
        'Największe ogniwo wśród terminali w katalogu — starcza na najdłuższy objazd i zostaje zapas na drogę powrotną.',
    },
    {
      icon: ICON.upadek,
      title: 'Upadek z 1,5 metra, z osłoną 1,8',
      body:
        'Dodatkowa osłona ochronna podnosi odporność o kolejne 30 centymetrów, co ma znaczenie przy pracy z pojazdu.',
    },
    {
      icon: ICON.mroz,
      title: 'Od -20 °C do +55 °C',
      body:
        'Szeroki zakres temperatur obejmuje mrozy i pracę w nagrzanej szoferce latem.',
    },
    {
      icon: ICON.rozdzielczosc,
      title: 'Ekran FHD+ na 6 calach',
      body:
        'Wysoka rozdzielczość ułatwia pracę z mapami i długimi zestawieniami bez ciągłego powiększania.',
    },
  ],
  usedBy: { device: 'Unitech EA660' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/rejestratory' }, { name: 'TAKMA' }],
  related: [
    {
      name: 'Unitech PA768',
      href: '/produkt/unitech-pa768',
      note: 'Większy ekran i bateria wymieniana w locie',
    },
  ],
}

export default function UnitechEA660Page() {
  return <ProductPage data={data} />
}
