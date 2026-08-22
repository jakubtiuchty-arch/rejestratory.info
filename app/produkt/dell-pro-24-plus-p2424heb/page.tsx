'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'dell-pro-24-plus-p2424heb',
  name: 'Dell Pro 24 P2424HEB',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/P2424HEB_1.png'],
  inquiry: {
    description: 'Monitor 23,8 cala z kamerą i głośnikami',
    specifications: '23,8″ Full HD · kamera 4 Mpx + IR · głośniki 2 × 5 W · USB-C 90 W · Auto KVM',
  },
  whyNavLabel: 'Dlaczego P2424HEB',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.kamera, label: 'Kamera', value: 'RGB 4 Mpx + IR 2K' },
    { icon: ICON.glosnik, label: 'Dźwięk', value: 'głośniki 2 × 5 W, 2 mikrofony' },
    { icon: ICON.usbc, label: 'USB-C', value: 'obraz i ładowanie do 90 W' },
    { icon: ICON.kvm, label: 'Auto KVM', value: 'przełączanie między komputerami' },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '23,8″' },
        { k: 'Rozdzielczość', v: 'Full HD 1920 × 1080, 60 Hz' },
        { k: 'Matryca', v: 'IPS, kąty 178°/178°' },
        { k: 'Jasność', v: '250 cd/m²' },
        { k: 'Kontrast', v: '1000:1' },
        { k: 'Gamut', v: '99% sRGB' },
      ],
    },
    {
      title: 'Wideokonferencje',
      rows: [
        { k: 'Kamera', v: 'RGB 4 Mpx + IR 2K przy 30 kl./s' },
        { k: 'Mikrofony', v: '2 cyfrowe' },
        { k: 'Głośniki', v: '2 × 5 W' },
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
      icon: ICON.kamera,
      title: 'Kamera i mikrofony w obudowie',
      body:
        'Kamera 4 Mpx z podczerwienią oraz dwa mikrofony zastępują zestaw dokupywany osobno — narada zdalna rusza od razu.',
    },
    {
      icon: ICON.kvm,
      title: 'Dwa komputery, jedna klawiatura',
      body:
        'Auto KVM przełącza klawiaturę i mysz między laptopem służbowym a stacją, bez przepinania kabli.',
    },
    {
      icon: ICON.usbc,
      title: 'Jeden kabel do laptopa',
      body:
        'USB-C przenosi obraz, ładuje sprzęt mocą do 90 W i podaje sieć z gniazda RJ45 w monitorze.',
    },
    {
      icon: ICON.ergonomia,
      title: 'Pełna regulacja stanowiska',
      body:
        'Podnoszenie o 150 mm, obrót w obu osiach i pivot pozwalają ustawić ekran pod kątem pracy i rozmowy.',
    },
  ],
  usedBy: { device: 'Dell P2424HEB' },
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
      name: 'Dell Pro 27 P2724HEB',
      href: '/produkt/dell-pro-27-plus-p2724heb',
      note: 'Ten sam zestaw na 27 calach w QHD',
    },
  ],
}

export default function DellP2424HEBPage() {
  return <ProductPage data={data} />
}
