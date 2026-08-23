'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'samsung-xcover7',
  name: 'Samsung Galaxy XCover7',
  category: 'Telefony',
  categoryHref: '/kategoria/telefony',
  images: ['/xcover7_1.png'],
  inquiry: {
    description: 'Wzmocniony smartfon z wymienną baterią',
    specifications: 'Android · 6,6″ FHD+ · Dimensity 6100+ · 6/128 GB · 4050 mAh wymienna · IP68, MIL-STD-810H',
  },
  whyNavLabel: 'Dlaczego XCover7',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W pracy terenowej',
  highlights: [
    { icon: ICON.norma, label: 'Odporność', value: 'IP68, MIL-STD-810H' },
    { icon: ICON.wymiana, label: 'Bateria', value: '4050 mAh, wymienna' },
    { icon: ICON.przekatna, label: 'Ekran', value: '6,6″ Full HD+' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Dimensity 6100+' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['6 GB / 128 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,6″' },
        { k: 'Rozdzielczość', v: '1080 × 2408 Full HD+' },
        { k: 'Matryca', v: 'TFT LCD' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'MediaTek Dimensity 6100+' },
        { k: 'Pamięć RAM', v: '6 GB' },
        { k: 'Pamięć wbudowana', v: '128 GB, rozszerzalna do 1 TB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP68' },
        { k: 'Norma', v: 'MIL-STD-810H' },
        { k: 'Szkło', v: 'Gorilla Glass Victus+' },
        { k: 'Temperatura pracy', v: 'od -10 °C do +50 °C' },
      ],
    },
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Bateria', v: '4050 mAh, wymienna' },
        { k: 'Czas pracy', v: 'do 12 godzin' },
        { k: 'Ładowanie', v: 'USB-C 15 W oraz złącze POGO' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.wymiana,
      title: 'Bateria do wymiany w terenie',
      body:
        'Ogniwo wyjmuje się bez narzędzi, więc zapasowa bateria w plecaku zastępuje szukanie gniazdka i przedłuża pracę na drugą zmianę.',
    },
    {
      icon: ICON.norma,
      title: 'Norma wojskowa i IP68',
      body:
        'MIL-STD-810H obejmuje wstrząsy, wibracje i pracę w mrozie do -10 °C, a klasa IP68 deszcz i mycie pod bieżącą wodą.',
    },
    {
      icon: ICON.upadek,
      title: 'Zniesie upadek na leśną drogę',
      body:
        'Wzmocniona obudowa i szkło Gorilla Glass Victus+ są projektowane pod pracę w rękawicach i codzienne obicia, nie pod gablotę.',
    },
    {
      icon: ICON.dok,
      title: 'Ładowanie przez złącze POGO',
      body:
        'Poza USB-C telefon ładuje się stykami POGO w stacji dokującej — wygodne w samochodzie i na stanowisku w kancelarii.',
    },
  ],
  usedBy: { device: 'Samsung XCover Pro 6' },
  related: [
    {
      name: 'Zebra EM45',
      href: '/produkt/zebra-em45',
      note: 'Terminal leśniczego z kontraktem serwisowym',
    },
  ],
}

export default function SamsungXCover7Page() {
  return <ProductPage data={data} />
}
