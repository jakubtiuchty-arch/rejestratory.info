'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'hp-elitebook-6-g1ah-14',
  name: 'HP EliteBook 6 G1ah 14',
  category: 'Laptopy',
  categoryHref: '/kategoria/laptopy',
  images: ['/hp_elite_14_1.png'],
  modelCode: 'C51GKET',
  inquiry: {
    description: 'Laptop biznesowy 14 cali ze stacją dokującą HP',
    specifications:
      'Windows 11 Pro · 14″ WUXGA · Ryzen 5 220 · 16 GB · SSD 512 GB · Smart Card · gwarancja 36 miesięcy',
  },
  whyNavLabel: 'Dlaczego EliteBook 6 G1ah',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '14″ WUXGA' },
    { icon: ICON.procesor, label: 'Procesor', value: 'AMD Ryzen 5 220' },
    { icon: ICON.pamiec, label: 'Pamięć', value: '16 GB + SSD 512 GB' },
    { icon: ICON.waga, label: 'Waga', value: '1,4 kg' },
  ],
  variants: [{ id: 'pamiec', label: 'Konfiguracja', options: ['16 GB / SSD 512 GB'] }],
  specGroups: [
    {
      title: 'Wyświetlacz i kamera',
      rows: [
        { k: 'Przekątna', v: '14″ (35,6 cm)' },
        { k: 'Matryca', v: 'WUXGA 1920 × 1200' },
        { k: 'Kamera', v: 'FHD, wbudowana w obudowę ekranu' },
        { k: 'Przesłona kamery', v: 'mechaniczna, zasłaniana ręcznie' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'Procesor', v: 'AMD Ryzen 5 220' },
        { k: 'Pamięć RAM', v: '16 GB DDR5, rozbudowa do 64 GB' },
        { k: 'Dysk', v: 'SSD 512 GB' },
        { k: 'Grafika', v: 'zintegrowana' },
        { k: 'System', v: 'Windows 11 Pro' },
      ],
    },
    {
      title: 'Łączność i zabezpieczenia',
      rows: [
        { k: 'Sieć', v: 'WLAN AX Wi-Fi 6E, 160 MHz' },
        { k: 'Bluetooth', v: '5.3 COMBO' },
        { k: 'Karty kryptograficzne', v: 'czytnik Smart Card' },
        { k: 'Czytnik', v: 'linii papilarnych' },
        { k: 'Gładzik', v: 'Clickpad' },
      ],
    },
    {
      title: 'Porty',
      rows: [
        { k: 'HDMI', v: '1 × HDMI 2.1' },
        { k: 'USB-C', v: '2 × USB4 40 Gb/s z Power Delivery i DisplayPort 1.4' },
        { k: 'USB-A', v: '2 × USB 3.2 Gen 1 5 Gb/s, w tym jeden dosilony' },
        { k: 'Sieć przewodowa', v: '1 × RJ-45' },
        { k: 'Audio', v: 'combo jack stereo/mikrofonowy' },
      ],
    },
    {
      title: 'Obudowa i zasilanie',
      rows: [
        { k: 'Klawiatura', v: '98 klawiszy, podświetlana' },
        { k: 'Dźwięk', v: '2 głośniki i 2 mikrofony' },
        { k: 'Bateria', v: '56 Wh' },
        { k: 'Waga', v: '1,4 kg' },
        { k: 'Gwarancja', v: '36 miesięcy' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.usbc,
      title: 'Jeden kabel do stacji dokującej',
      body:
        'Dwa porty USB4 40 Gb/s obsługują Power Delivery i DisplayPort 1.4, więc jedno wpięcie do stacji HP Dock G6 daje zasilanie, monitory i sieć. Stacja jest w tej samej ofercie ZUP Łódź.',
    },
    {
      icon: ICON.smartcard,
      title: 'Czytnik kart kryptograficznych na pokładzie',
      body:
        'Smart Card wbudowany w obudowę, a obok czytnik linii papilarnych — logowanie kartą albo palcem bez dokupywania zewnętrznego czytnika i kabla na biurku.',
    },
    {
      icon: ICON.ladowanie,
      title: 'Ładuje telefon przy wyłączonym laptopie',
      body:
        'Jeden z portów USB-A jest dosilony i podaje prąd nawet wtedy, gdy notebook jest wyłączony — rejestrator albo telefon uzupełni baterię z torby w trasie.',
    },
    {
      icon: ICON.porty,
      title: 'RJ-45 i HDMI bez przejściówek',
      body:
        'Gniazdo sieciowe i HDMI 2.1 są w obudowie, więc kabel w kancelarii i rzutnik na naradzie działają od ręki — bez szukania adaptera przed spotkaniem.',
    },
  ],
  signature: [
    {
      icon: ICON.wsparcie5,
      title: 'Trzy lata gwarancji w cenie',
      body:
        'Oferta ZUP Łódź obejmuje 36 miesięcy gwarancji. Dostawę oraz serwis gwarancyjny i pogwarancyjny prowadzi TAKMA.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'HP EliteBook 6 G1ah 16',
      href: '/produkt/hp-elitebook-6-g1ah-16',
      note: 'Ten sam model z ekranem 16 cali',
    },
    {
      name: 'Dell Pro 14 Plus',
      href: '/produkt/dell-pro-14-plus',
      note: 'Odpowiednik 14 cali na platformie Intel',
    },
  ],
}

export default function HPEliteBook6G1ah14Page() {
  return <ProductPage data={data} />
}
