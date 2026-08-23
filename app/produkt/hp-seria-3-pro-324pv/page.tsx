'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'hp-seria-3-pro-324pv',
  name: 'HP S3 Pro 324pv',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/hp_series_1.png'],
  inquiry: {
    description: 'Ekonomiczny monitor 23,8 cala do administracji',
    specifications: '23,8″ Full HD 100 Hz · VA · kontrast 3000:1 · HDMI i VGA',
  },
  whyNavLabel: 'Dlaczego 324pv',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '23,8″ Full HD, 100 Hz' },
    { icon: ICON.rozdzielczosc, label: 'Matryca', value: 'VA, kontrast 3000:1' },
    { icon: ICON.porty, label: 'Porty', value: 'HDMI 1.4, VGA' },
    { icon: ICON.oko, label: 'Komfort', value: 'HP Eye Ease, TÜV Low Blue Light' },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '23,8″ (60,5 cm)' },
        { k: 'Rozdzielczość', v: 'Full HD 1920 × 1080' },
        { k: 'Odświeżanie', v: '100 Hz' },
        { k: 'Matryca', v: 'VA, kąty 178°/178°' },
        { k: 'Jasność', v: '250 nitów, kontrast 3000:1' },
        { k: 'Czas reakcji', v: '5 ms GtG z Overdrive' },
        { k: 'Gamut', v: '72% NTSC' },
      ],
    },
    {
      title: 'Łączność',
      rows: [
        { k: 'Wideo', v: 'HDMI 1.4, VGA' },
        { k: 'HDCP', v: 'tak, przez HDMI' },
        { k: 'Częstotliwość', v: '50–100 Hz przez HDMI, 50–60 Hz przez VGA' },
      ],
    },
    {
      title: 'Komfort i certyfikaty',
      rows: [
        { k: 'HP Eye Ease', v: 'tak, TÜV Low Blue Light' },
        { k: 'Eliminacja migotania', v: 'tak, certyfikat TÜV' },
        { k: 'Powłoka', v: 'antyrefleksyjna 3H' },
        { k: 'Gwarancja', v: '3 lata ograniczona HP' },
      ],
    },
    {
      title: 'Ergonomia',
      rows: [
        { k: 'Przechylanie', v: '-5° / +23°' },
        { k: 'Podstawa', v: 'stała wysokość' },
        { k: 'VESA', v: '100 × 100 mm' },
        { k: 'Waga', v: '3,56 kg' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.rozdzielczosc,
      title: 'Kontrast 3000:1 na matrycy VA',
      body:
        'Głęboka czerń i wyraźny tekst przy dokumentach — mocna strona matryc VA względem tańszych paneli.',
    },
    {
      icon: ICON.porty,
      title: 'Złącze VGA dla starszych komputerów',
      body:
        'Poza HDMI monitor ma wyjście VGA, więc podłączysz go także do sprzętu, który został w kancelarii z poprzedniej wymiany.',
    },
    {
      icon: ICON.oko,
      title: 'HP Eye Ease z certyfikatem TÜV',
      body:
        'Ograniczenie światła niebieskiego i brak migotania — istotne przy pracy biurowej na pełen etat.',
    },
    {
      icon: ICON.waga,
      title: 'Lekki i łatwy do przeniesienia',
      body:
        'Trzy i pół kilograma oraz mocowanie VESA ułatwiają przestawienie stanowiska lub powieszenie ekranu na ramieniu.',
    },
  ],
  usedBy: { device: '324pv' },
  signature: [
    {
      icon: ICON.wsparcie,
      title: 'Ekonomiczne rozwiązanie biznesowe',
      body:
        'Monitor dla administracji publicznej łączący niską cenę z trzyletnią gwarancją HP i certyfikatami komfortu pracy. Wybór na stanowiska, gdzie nie jest potrzebne QHD ani USB-C.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'HP Pro S5 QHD 527pq',
      href: '/produkt/hp-seria-5-pro-527pq',
      note: 'Większy ekran w QHD z pełną regulacją',
    },
  ],
}

export default function HP324pvPage() {
  return <ProductPage data={data} />
}
