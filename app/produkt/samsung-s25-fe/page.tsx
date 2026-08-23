'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'samsung-s25-fe',
  name: 'Samsung Galaxy S25 FE',
  category: 'Telefony',
  categoryHref: '/kategoria/telefony',
  images: ['/s25fe_1.png'],
  inquiry: {
    description: 'Flagowe funkcje w przystępniejszej cenie',
    specifications: 'Android 16 · 6,7″ FHD+ AMOLED 120 Hz · Exynos 2400 · 8/128 GB · 4900 mAh · IP68',
  },
  whyNavLabel: 'Dlaczego S25 FE',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W pracy terenowej',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '6,7″ FHD+ AMOLED, 120 Hz' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Exynos 2400' },
    { icon: ICON.aparat, label: 'Aparaty', value: '50 Mpx z OIS + 12 i 8 Mpx' },
    { icon: ICON.woda, label: 'Odporność', value: 'IP68, Gorilla Glass Victus+' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['8 GB / 128 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,7″' },
        { k: 'Rozdzielczość', v: '2340 × 1080 FHD+' },
        { k: 'Matryca', v: 'Dynamic AMOLED 2X' },
        { k: 'Odświeżanie', v: '120 Hz' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 16, One UI 8' },
        { k: 'Procesor', v: 'Exynos 2400' },
        { k: 'Pamięć RAM', v: '8 GB' },
        { k: 'Pamięć wbudowana', v: '128 GB' },
      ],
    },
    {
      title: 'Aparaty',
      rows: [
        { k: 'Główny', v: '50 Mpx z OIS' },
        { k: 'Ultraszerokokątny', v: '12 Mpx' },
        { k: 'Teleobiektyw', v: '8 Mpx, zoom optyczny 3×' },
        { k: 'Przedni', v: '12 Mpx' },
      ],
    },
    {
      title: 'Odporność i zasilanie',
      rows: [
        { k: 'Klasa szczelności', v: 'IP68' },
        { k: 'Szkło', v: 'Gorilla Glass Victus+' },
        { k: 'Bateria', v: '4900 mAh' },
        { k: 'Ładowanie', v: 'USB-C 45 W, bezprzewodowo 15 W' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.aparat,
      title: 'Aparat 50 Mpx ze stabilizacją',
      body:
        'Główny obiektyw z OIS i zoom optyczny 3× pozwalają udokumentować szkodę i detal z dystansu bez rozmycia przy pracy z ręki.',
    },
    {
      icon: ICON.plynnosc,
      title: 'Płynny ekran 120 Hz',
      body:
        'AMOLED z odświeżaniem 120 Hz i trybem Vision Booster pozostaje czytelny w słońcu przy przewijaniu map.',
    },
    {
      icon: ICON.szklo,
      title: 'IP68 i wzmocnione szkło',
      body:
        'Uszczelnienie klasy IP68 wraz z Gorilla Glass Victus+ i aluminiową ramką znosi deszcz i codzienne obicia w kieszeni kurtki.',
    },
    {
      icon: ICON.ladowanie,
      title: 'Ładowanie przewodowo i bezprzewodowo',
      body:
        '4900 mAh z ładowaniem 45 W daje 65% w pół godziny, a ładowarka bezprzewodowa 15 W sprawdza się na biurku w kancelarii.',
    },
  ],
  usedBy: { device: 'Samsung S25 FE' },
  related: [
    {
      name: 'Samsung Galaxy S25+',
      href: '/produkt/samsung-s25-plus',
      note: 'Wyższy model: ekran QHD+ i Snapdragon 8 Elite',
    },
  ],
}

export default function SamsungS25FePage() {
  return <ProductPage data={data} />
}
