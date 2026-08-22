'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'samsung-a36',
  name: 'Samsung Galaxy A36',
  category: 'Telefony',
  categoryHref: '/kategoria/telefony',
  images: ['/a36_1.png'],
  inquiry: {
    description: 'Smartfon służbowy do biura i objazdu',
    specifications: 'Android · 6,6″ FHD+ · Exynos 1380 · 6/128 GB · 5000 mAh · IP67',
  },
  whyNavLabel: 'Dlaczego A36',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W pracy terenowej',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '6,6″ Full HD+' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Exynos 1380, 8 rdzeni' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '5000 mAh, do 12 h' },
    { icon: ICON.woda, label: 'Odporność', value: 'IP67' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['6 GB / 128 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,6″' },
        { k: 'Rozdzielczość', v: '1080 × 2340 Full HD+' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Exynos 1380, 8 rdzeni' },
        { k: 'Pamięć RAM', v: '6 GB' },
        { k: 'Pamięć wbudowana', v: '128 GB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP67' },
        { k: 'Temperatura pracy', v: 'od 0 °C do +35 °C' },
      ],
    },
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Bateria', v: '5000 mAh' },
        { k: 'Czas pracy', v: 'do 12 godzin' },
        { k: 'Ładowanie', v: 'USB-C, 25 W' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.czaspracy,
      title: 'Bateria na cały objazd',
      body:
        'Ogniwo 5000 mAh wystarcza na dzień pracy z mapą i transmisją danych, a ładowanie 25 W uzupełnia zapas w czasie przerwy na kawę.',
    },
    {
      icon: ICON.woda,
      title: 'Deszcz mu nie szkodzi',
      body:
        'Klasa IP67 obejmuje pył i zachlapanie — telefon zniesie pracę w mżawce, choć nie jest sprzętem do zanurzania jak wersje wzmocnione.',
    },
    {
      icon: ICON.przekatna,
      title: 'Duży ekran do dokumentów',
      body:
        'Panel 6,6″ Full HD+ mieści formularz i mapę bez ciągłego przewijania, co ułatwia pracę z systemami w terenie.',
    },
    {
      icon: ICON.tarcza,
      title: 'Zarządzanie flotą telefonów',
      body:
        'Samsung Knox pozwala wpiąć urządzenie w politykę bezpieczeństwa jednostki i zarządzać nim zdalnie razem z resztą sprzętu.',
    },
  ],
  usedBy: { device: 'Samsung A36' },
  whereToBuy: [{ name: 'ZUP Łódź' }, { name: 'TAKMA' }],
  related: [
    {
      name: 'Samsung Galaxy A56',
      href: '/produkt/samsung-a56',
      note: 'Mocniejszy wariant: 8 GB RAM i ekran 6,7″',
    },
  ],
}

export default function SamsungA36Page() {
  return <ProductPage data={data} />
}
