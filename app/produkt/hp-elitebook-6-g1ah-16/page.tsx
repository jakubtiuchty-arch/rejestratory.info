'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'hp-elitebook-6-g1ah-16',
  name: 'HP EliteBook 6 G1ah 16',
  category: 'Laptopy',
  categoryHref: '/kategoria/laptopy',
  images: ['/hp_elite_16_1.png'],
  inquiry: {
    description: 'Laptop biznesowy 16 cali z AMD Ryzen',
    specifications: 'Windows 11 Pro · 16″ WUXGA · Ryzen 5 220 · 16 GB · SSD 512 GB · MIL-STD 810H',
  },
  whyNavLabel: 'Dlaczego EliteBook 6',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '16″ WUXGA IPS, 300 nitów' },
    { icon: ICON.procesor, label: 'Procesor', value: 'AMD Ryzen 5 220, do 4,9 GHz' },
    { icon: ICON.pamiec, label: 'Pamięć', value: '16 GB DDR5 + SSD 512 GB' },
    { icon: ICON.waga, label: 'Waga', value: 'od 1,75 kg' },
  ],
  variants: [
    { id: 'pamiec', label: 'Konfiguracja', options: ['16 GB / SSD 512 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '16″ (40,6 cm)' },
        { k: 'Matryca', v: 'WUXGA 1920 × 1200 IPS, powłoka antyrefleksyjna' },
        { k: 'Jasność', v: '300 nitów' },
        { k: 'Gama kolorów', v: '62,5% sRGB' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'AMD Ryzen 5 220, do 4,9 GHz' },
        { k: 'Rdzenie', v: '6 rdzeni, 12 wątków' },
        { k: 'Pamięć RAM', v: '16 GB DDR5-5600, 2 gniazda SODIMM' },
        { k: 'Dysk', v: 'SSD 512 GB PCIe NVMe' },
        { k: 'Grafika', v: 'AMD Radeon 740M' },
      ],
    },
    {
      title: 'Łączność i zabezpieczenia',
      rows: [
        { k: 'Sieć', v: 'Wi-Fi 6E RZ616, 2×2' },
        { k: 'Bluetooth', v: '5.3' },
        { k: 'Kamera', v: 'na podczerwień, 5 Mpx' },
        { k: 'Czytnik', v: 'linii papilarnych' },
        { k: 'Zabezpieczenia', v: 'HP Sure Platform, HP Tamper Lock' },
      ],
    },
    {
      title: 'Porty',
      rows: [
        { k: 'HDMI', v: '1 × HDMI 2.1' },
        { k: 'USB-C', v: '2 × Thunderbolt 4, 40 Gb/s' },
        { k: 'USB-A', v: '2 × USB-A 5 Gb/s' },
        { k: 'Sieć przewodowa', v: '1 × RJ-45' },
        { k: 'Audio', v: 'combo jack 3,5 mm' },
      ],
    },
    {
      title: 'Obudowa i zasilanie',
      rows: [
        { k: 'Klawiatura', v: 'odporna na zalanie, podświetlana, z częścią numeryczną' },
        { k: 'Bateria', v: '56 Wh HP Long Life, 50% w 30 minut' },
        { k: 'Zasilacz', v: '65 W USB-C' },
        { k: 'Waga', v: 'od 1,75 kg' },
        { k: 'Certyfikaty', v: 'MIL-STD 810H, ENERGY STAR, TCO Certified' },
        { k: 'System', v: 'Windows 11 Pro' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.norma,
      title: 'Obudowa przebadana normą MIL-STD 810H',
      body:
        'Laptop przeszedł testy wstrząsów, wibracji i temperatur, a klawiatura jest odporna na zalanie — to sprzęt na warunki biura terenowego, nie tylko gabinetu.',
    },
    {
      icon: ICON.porty,
      title: 'Komplet portów bez przejściówek',
      body:
        'Dwa Thunderbolt 4, dwa USB-A, HDMI 2.1 i RJ-45 na pokładzie — rzutnik na naradzie i kabel sieciowy w kancelarii działają od ręki.',
    },
    {
      icon: ICON.ladowanie,
      title: 'Połowa baterii w pół godziny',
      body:
        'Ogniwo 56 Wh HP Long Life ładuje się do 50% w 30 minut, więc krótka przerwa wystarcza na dojazd i pracę w terenie.',
    },
    {
      icon: ICON.odcisk,
      title: 'Logowanie odciskiem lub twarzą',
      body:
        'Czytnik linii papilarnych i kamera na podczerwień, a nad nimi HP Sure Platform i Tamper Lock chroniące przed ingerencją w sprzęt.',
    },
  ],
  usedBy: { device: 'HP EliteBook 6 G1ah 16' },
  whereToBuy: [{ name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.onsite,
      title: '3-letnie wsparcie sprzętowe HP',
      body:
        'Reakcja w następnym dniu roboczym w ramach wsparcia sprzętowego HP. Podstawowa gwarancja producenta obejmuje pierwszy rok.',
      tone: 'akcent',
    },
    {
      icon: ICON.ai,
      title: 'Copilot i jednostki AI w procesorze',
      body:
        'Dedykowany klawisz Copilot w systemie Windows oraz jednostki AI w procesorze AMD Ryzen, odpowiadające za zarządzanie wydajnością i bezpieczeństwem.',
      tone: 'ciemny',
    },
  ],
  related: [
    {
      name: 'Dell Pro 16 Plus',
      href: '/produkt/dell-pro-16-plus',
      note: 'Odpowiednik na platformie Intel vPro',
    },
  ],
}

export default function HPEliteBook6Page() {
  return <ProductPage data={data} />
}
