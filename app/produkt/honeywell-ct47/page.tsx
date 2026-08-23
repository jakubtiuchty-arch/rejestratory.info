'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'honeywell-ct47',
  name: 'Honeywell CT47',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/ct47_1.png'],
  inquiry: {
    description: 'Terminal z ekranem Full HD do zadań ciężkich',
    specifications: 'Android · 5,5″ Full HD · QCM6490 2,7 GHz · 6/128 GB · 4775 mAh · IP65/IP68',
  },
  whyNavLabel: 'Dlaczego CT47',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.procesor, label: 'Procesor', value: 'Qualcomm QCM6490, 2,7 GHz' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '4775 mAh, ponad 14 h' },
    { icon: ICON.woda, label: 'Odporność', value: 'IP65 i IP68' },
    { icon: ICON.mroz, label: 'Temperatura', value: 'od -20 °C do +50 °C' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['6 GB / 128 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '5,5″' },
        { k: 'Rozdzielczość', v: '2160 × 1080 Full HD' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'Qualcomm QCM6490, 8 rdzeni, 2,7 GHz' },
        { k: 'Pamięć RAM', v: '6 GB' },
        { k: 'Pamięć wbudowana', v: '128 GB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP65 i IP68' },
        { k: 'Temperatura pracy', v: 'od -20 °C do +50 °C' },
      ],
    },
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Bateria', v: '4775 mAh' },
        { k: 'Czas pracy', v: 'ponad 14 godzin' },
        { k: 'Ładowanie', v: 'USB-C' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.mroz,
      title: 'Zimą nie odmawia posłuszeństwa',
      body:
        'Zakres pracy od -20 °C obejmuje mroźne poranki przy zrywce, gdy zwykły telefon wyłącza się po kilkunastu minutach.',
    },
    {
      icon: ICON.procesor,
      title: 'Najmocniejszy układ w zestawieniu',
      body:
        'QCM6490 taktowany 2,7 GHz i 128 GB pamięci radzą sobie z aplikacjami mapowymi i wieloma zadaniami naraz.',
    },
    {
      icon: ICON.rozdzielczosc,
      title: 'Ekran Full HD w kompaktowej obudowie',
      body:
        'Rozdzielczość 2160 × 1080 na 5,5 cala daje ostry obraz mapy przy rozmiarze mieszczącym się w dłoni.',
    },
    {
      icon: ICON.woda,
      title: 'Podwójna klasa szczelności',
      body:
        'Certyfikaty IP65 i IP68 obejmują zarówno strumień wody, jak i zanurzenie — sprzęt zniesie mycie po dniu w błocie.',
    },
  ],
  usedBy: { device: 'Honeywell CT47' },
  related: [
    {
      name: 'Honeywell CT30P',
      href: '/produkt/honeywell-ct30',
      note: 'Lżejszy model tej samej rodziny',
    },
  ],
}

export default function HoneywellCT47Page() {
  return <ProductPage data={data} />
}
