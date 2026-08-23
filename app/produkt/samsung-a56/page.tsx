'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'samsung-a56',
  name: 'Samsung Galaxy A56',
  category: 'Telefony',
  categoryHref: '/kategoria/telefony',
  images: ['/a56_1.png'],
  inquiry: {
    description: 'Smartfon służbowy z zapasem pamięci',
    specifications: 'Android · 6,7″ FHD+ · Exynos 1480 · 8/128 GB · 5000 mAh · IP67',
  },
  whyNavLabel: 'Dlaczego A56',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W pracy terenowej',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '6,7″ Full HD+' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Exynos 1480, 8 rdzeni' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '5000 mAh, do 12 h' },
    { icon: ICON.woda, label: 'Odporność', value: 'IP67' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['8 GB / 128 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,7″' },
        { k: 'Rozdzielczość', v: '1080 × 2400 Full HD+' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Exynos 1480, 8 rdzeni' },
        { k: 'Pamięć RAM', v: '8 GB' },
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
      icon: ICON.procesor,
      title: 'Zapas mocy na aplikacje leśne',
      body:
        'Exynos 1480 i 8 GB pamięci obsługują mapy, SILP i pocztę otwarte równolegle — telefon nie zwalnia po roku użytkowania.',
    },
    {
      icon: ICON.czaspracy,
      title: 'Bateria na cały objazd',
      body:
        '5000 mAh starcza na dzień pracy z GPS-em, a ładowanie 25 W uzupełnia zapas między wyjazdami.',
    },
    {
      icon: ICON.przekatna,
      title: 'Ekran 6,7″ do pracy z mapą',
      body:
        'Większy panel Full HD+ pokazuje więcej wydzielenia naraz i ułatwia wpisywanie danych bezpośrednio w terenie.',
    },
    {
      icon: ICON.tarcza,
      title: 'Zarządzanie flotą telefonów',
      body:
        'Samsung Knox pozwala wpiąć urządzenie w politykę bezpieczeństwa jednostki i zarządzać nim zdalnie.',
    },
  ],
  usedBy: { device: 'Samsung A56' },
  related: [
    {
      name: 'Samsung Galaxy A36',
      href: '/produkt/samsung-a36',
      note: 'Tańszy wariant: 6 GB RAM i ekran 6,6″',
    },
  ],
}

export default function SamsungA56Page() {
  return <ProductPage data={data} />
}
