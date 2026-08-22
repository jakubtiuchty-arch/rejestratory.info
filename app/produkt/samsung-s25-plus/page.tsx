'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'samsung-s25-plus',
  name: 'Samsung Galaxy S25+',
  category: 'Telefony',
  categoryHref: '/kategoria/telefony',
  images: ['/s25plus_1.png'],
  inquiry: {
    description: 'Flagowy smartfon do dokumentacji terenowej',
    specifications: 'Android · 6,7″ QHD+ AMOLED · Snapdragon 8 Elite · 12/256 GB · 4900 mAh · IP68',
  },
  whyNavLabel: 'Dlaczego S25+',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W pracy terenowej',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '6,7″ QHD+ Dynamic AMOLED 2X' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Snapdragon 8 Elite' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '4900 mAh, do 15 h' },
    { icon: ICON.woda, label: 'Odporność', value: 'IP68, Gorilla Glass Victus 2' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['12 GB / 256 GB', '12 GB / 512 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,7″' },
        { k: 'Rozdzielczość', v: '1440 × 3120 QHD+' },
        { k: 'Matryca', v: 'Dynamic AMOLED 2X' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Snapdragon 8 Elite / Exynos 2500' },
        { k: 'Pamięć RAM', v: '12 GB' },
        { k: 'Pamięć wbudowana', v: '256 GB lub 512 GB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP68' },
        { k: 'Szkło', v: 'Gorilla Glass Victus 2' },
        { k: 'Temperatura pracy', v: 'od -10 °C do +40 °C' },
      ],
    },
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Bateria', v: '4900 mAh' },
        { k: 'Czas pracy', v: 'do 15 godzin' },
        { k: 'Ładowanie', v: 'USB-C, 45 W' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.rozdzielczosc,
      title: 'Ekran, na którym widać szczegół',
      body:
        'Panel QHD+ Dynamic AMOLED 2X pokazuje mapy i zdjęcia szkód z wyraźnym kontrastem także w pełnym słońcu.',
    },
    {
      icon: ICON.procesor,
      title: 'Moc na aplikacje pomiarowe',
      body:
        'Snapdragon 8 Elite z 12 GB pamięci przelicza obrazy i mapy bez czekania, więc telefon nadaje się do zadań cięższych niż poczta i formularze.',
    },
    {
      icon: ICON.szklo,
      title: 'IP68 i szkło Victus 2',
      body:
        'Uszczelnienie klasy IP68 i wzmocnione szkło pozwalają pracować w deszczu i nie kończą dnia po upadku na drogę.',
    },
    {
      icon: ICON.ladowanie,
      title: 'Dzień pracy i szybkie ładowanie',
      body:
        '4900 mAh wystarcza na 15 godzin, a ładowanie 45 W uzupełnia zapas w czasie postoju.',
    },
  ],
  usedBy: { device: 'Samsung S25+', exclude: 'Samsung S25 Ultra' },
  whereToBuy: [{ name: 'TAKMA' }],
  related: [
    {
      name: 'Samsung Galaxy S25 Ultra',
      href: '/produkt/samsung-s25-ultra',
      note: 'Większy ekran 6,9″, S Pen i ramka tytanowa',
    },
    {
      name: 'Samsung Galaxy S25 FE',
      href: '/produkt/samsung-s25-fe',
      note: 'Tańszy wariant flagowca z aparatem 50 Mpx',
    },
  ],
}

export default function SamsungS25PlusPage() {
  return <ProductPage data={data} />
}
