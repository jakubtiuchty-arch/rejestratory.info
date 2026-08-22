'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'dell-pro-27-plus-p2724heb',
  name: 'Dell Pro 27 P2724HEB',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/P2424HEB_1.png'],
  inquiry: {
    description: 'Monitor 27 cali QHD z kamerą i głośnikami',
    specifications: '27″ QHD · kamera 4 Mpx + IR · głośniki 2 × 5 W · USB-C 90 W · Auto KVM',
  },
  whyNavLabel: 'Dlaczego P2724HEB',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.rozdzielczosc, label: 'Ekran', value: '27″ QHD 2560 × 1440' },
    { icon: ICON.kamera, label: 'Kamera', value: 'RGB 4 Mpx + IR 2K' },
    { icon: ICON.usbc, label: 'USB-C', value: 'obraz i ładowanie do 90 W' },
    { icon: ICON.kvm, label: 'Auto KVM', value: 'przełączanie między komputerami' },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '27″' },
        { k: 'Rozdzielczość', v: 'QHD 2560 × 1440, 60 Hz' },
        { k: 'Matryca', v: 'IPS, kąty 178°/178°' },
        { k: 'Jasność', v: '350 cd/m²' },
        { k: 'Kontrast', v: '1000:1' },
        { k: 'Gamut', v: '99% sRGB' },
      ],
    },
    {
      title: 'Wideokonferencje',
      rows: [
        { k: 'Kamera', v: 'RGB 4 Mpx + IR 2K przy 30 kl./s, FHD przy 60 kl./s' },
        { k: 'Mikrofony', v: '2 cyfrowe' },
        { k: 'Głośniki', v: '2 × 5 W' },
        { k: 'Audio', v: 'combo jack 3,5 mm' },
        { k: 'Auto KVM', v: 'tak' },
      ],
    },
    {
      title: 'Koncentrator USB-C',
      rows: [
        { k: 'Power Delivery', v: 'do 90 W' },
        { k: 'Ethernet', v: 'RJ45 1GbE' },
        { k: 'Wideo', v: 'HDMI 1.4, DisplayPort 1.2' },
        { k: 'USB', v: '4 × USB 3.2 (Type-A i Type-C)' },
        { k: 'Auto KVM', v: 'tak' },
      ],
    },
    {
      title: 'Ergonomia',
      rows: [
        { k: 'Regulacja wysokości', v: 'do 150 mm' },
        { k: 'Przechylanie', v: '-5° / +21°' },
        { k: 'Obrót poziomy', v: '±45°' },
        { k: 'Pivot', v: '±90°' },
        { k: 'VESA', v: '100 × 100 mm' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.rozdzielczosc,
      title: 'QHD na dwadzieścia siedem cali',
      body:
        'Rozdzielczość 2560 × 1440 daje więcej przestrzeni roboczej niż Full HD — mapa i arkusz mieszczą się obok siebie bez zmniejszania.',
    },
    {
      icon: ICON.kamera,
      title: 'Zestaw do narady w monitorze',
      body:
        'Kamera 4 Mpx z podczerwienią, dwa mikrofony i głośniki 2 × 5 W — bez dokładania osobnej kamery i słuchawek.',
    },
    {
      icon: ICON.daisy,
      title: 'Łączenie szeregowe monitorów',
      body:
        'Wyjście DisplayPort z MST pozwala podpiąć drugi ekran bez prowadzenia kolejnego kabla do laptopa.',
    },
    {
      icon: ICON.kvm,
      title: 'Dwa komputery na jednym stanowisku',
      body:
        'Auto KVM przełącza klawiaturę i mysz między urządzeniami, co ułatwia pracę na sprzęcie służbowym i stacjonarnym.',
    },
  ],
  usedBy: { device: 'P2724HEB' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/monitory' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.kamera,
      title: 'Monitor do wideokonferencji',
      body:
        'Kamera RGB 4 Mpx z podczerwienią 2K, dwa mikrofony cyfrowe i głośniki 2 × 5 W w obudowie. Narada zdalna nie wymaga dokładania sprzętu do stanowiska.',
      tone: 'ciemny',
    },
  ],
  related: [
    {
      name: 'Dell Pro 24 P2424HEB',
      href: '/produkt/dell-pro-24-plus-p2424heb',
      note: 'Ten sam zestaw na 23,8 cala w Full HD',
    },
  ],
}

export default function DellP2724HEBPage() {
  return <ProductPage data={data} />
}
