'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'samsung-s25-ultra',
  name: 'Samsung Galaxy S25 Ultra',
  category: 'Telefony',
  categoryHref: '/kategoria/telefony',
  images: ['/s25ultra_1.png'],
  inquiry: {
    description: 'Topowy smartfon z S Pen do pracy w terenie',
    specifications: 'Android · 6,9″ QHD+ AMOLED · Snapdragon 8 Elite · 12/256 GB · 5000 mAh · IP68 · S Pen',
  },
  whyNavLabel: 'Dlaczego S25 Ultra',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W pracy terenowej',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '6,9″ QHD+ Dynamic AMOLED 2X' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Snapdragon 8 Elite' },
    { icon: ICON.rysik, label: 'S Pen', value: 'w zestawie' },
    { icon: ICON.woda, label: 'Odporność', value: 'IP68, ramka tytanowa' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['12 GB / 256 GB', '12 GB / 512 GB', '16 GB / 1 TB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,9″' },
        { k: 'Rozdzielczość', v: '1440 × 3120 QHD+' },
        { k: 'Matryca', v: 'Dynamic AMOLED 2X' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Snapdragon 8 Elite / Exynos 2500' },
        { k: 'Pamięć RAM', v: '12 GB lub 16 GB' },
        { k: 'Pamięć wbudowana', v: '256 GB, 512 GB lub 1 TB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP68' },
        { k: 'Obudowa', v: 'Gorilla Glass Victus 2, ramka tytanowa' },
        { k: 'Temperatura pracy', v: 'od -10 °C do +40 °C' },
      ],
    },
    {
      title: 'Zasilanie i obsługa',
      rows: [
        { k: 'Bateria', v: '5000 mAh' },
        { k: 'Czas pracy', v: 'do 16 godzin' },
        { k: 'Ładowanie', v: 'USB-C, 45 W' },
        { k: 'Rysik', v: 'S Pen w zestawie' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.rysik,
      title: 'S Pen do podpisu i szkicu',
      body:
        'Rysik pozwala podpisać dokument, opisać zdjęcie szkody i zaznaczyć obrys na mapie bez zdejmowania rękawic.',
    },
    {
      icon: ICON.przekatna,
      title: 'Największy ekran w serii',
      body:
        'Panel 6,9″ QHD+ mieści mapę i formularz jednocześnie, a jasność wystarcza do pracy na otwartej powierzchni.',
    },
    {
      icon: ICON.procesor,
      title: 'Rezerwa mocy na lata',
      body:
        'Snapdragon 8 Elite z 12 lub 16 GB pamięci obsłuży aplikacje pomiarowe i pracę na wielu warstwach map przez cały okres użytkowania.',
    },
    {
      icon: ICON.woda,
      title: 'IP68 i ramka tytanowa',
      body:
        'Uszczelnienie i tytanowa ramka znoszą deszcz, kurz i upadki — bez etui pancernego znanego z terminali.',
    },
  ],
  usedBy: { device: 'Samsung S25 Ultra' },
  related: [
    {
      name: 'Samsung Galaxy S25+',
      href: '/produkt/samsung-s25-plus',
      note: 'Ten sam układ, ekran 6,7″ i bez S Pena',
    },
  ],
}

export default function SamsungS25UltraPage() {
  return <ProductPage data={data} />
}
