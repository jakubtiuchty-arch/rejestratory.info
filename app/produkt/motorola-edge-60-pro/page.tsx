'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Motorola edge 60 pro. Parametry: specyfikacja Motoroli dla EMEA i Polski (12/512 GB,
// nano SIM + eSIM), aparaty ze specyfikacji Motoroli (AU), polityka aktualizacji Motoroli.
// ZUP Łódź kupuje go w umowie NH.271.51.2026 z 02.11.2026 (część 1, „Mobilny komputer
// dotykowy typu smartfon”). Karta dodana 13.11.2026.
const data: ProductData = {
  slug: 'motorola-edge-60-pro',
  name: 'Motorola Edge 60 Pro',
  category: 'Telefony',
  categoryHref: '/kategoria/telefony',
  images: ['/edge60pro_1.png', '/edge60pro_2.png'],
  inquiry: {
    description: 'Smartfon z odpornością IP68/IP69 i baterią 6000 mAh',
    specifications: 'Android 15 · 6,7″ pOLED 120 Hz · Dimensity 8350 · 12/512 GB · 6000 mAh · IP68/IP69',
  },
  whyNavLabel: 'Dlaczego Edge 60 Pro',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W pracy terenowej',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '6,7″ pOLED, 120 Hz' },
    { icon: ICON.procesor, label: 'Procesor', value: 'MediaTek Dimensity 8350' },
    { icon: ICON.bateria, label: 'Bateria', value: '6000 mAh, ładowanie 90 W' },
    { icon: ICON.woda, label: 'Odporność', value: 'IP68 i IP69, MIL-STD-810H' },
  ],
  variants: [{ id: 'pamiec', label: 'Pamięć', options: ['12 GB / 512 GB'] }],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,7″, zakrzywiony na czterech krawędziach' },
        { k: 'Rozdzielczość', v: '2712 × 1220, 446 ppi' },
        { k: 'Matryca', v: 'pOLED, 120 Hz, HDR10+' },
        { k: 'Jasność', v: 'szczytowo 4500 nitów' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 15, aktualizacja do Androida 16' },
        { k: 'Aktualizacje', v: '3 wersje Androida, zabezpieczenia do 04.2029' },
        { k: 'Procesor', v: 'MediaTek Dimensity 8350, 8 rdzeni, do 3,35 GHz' },
        { k: 'Pamięć RAM', v: '12 GB' },
        { k: 'Pamięć wbudowana', v: '512 GB, bez karty microSD' },
      ],
    },
    {
      title: 'Aparaty',
      rows: [
        { k: 'Główny', v: '50 Mpx z OIS' },
        { k: 'Ultraszerokokątny', v: '50 Mpx, 120°, makro' },
        { k: 'Teleobiektyw', v: '10 Mpx z OIS, zoom optyczny 3×' },
        { k: 'Przedni', v: '50 Mpx' },
      ],
    },
    {
      title: 'Odporność i zasilanie',
      rows: [
        { k: 'Klasa szczelności', v: 'IP68 i IP69' },
        { k: 'Norma wojskowa', v: 'MIL-STD-810H' },
        { k: 'Bateria', v: '6000 mAh' },
        { k: 'Ładowanie', v: 'przewodowo 90 W, bezprzewodowo 15 W' },
        { k: 'Łączność', v: '5G, Wi-Fi 6E, Bluetooth 5.4, NFC, nano SIM i eSIM' },
        { k: 'Lokalizacja', v: 'GPS, GLONASS, Galileo, BeiDou, NavIC' },
        { k: 'Wymiary i waga', v: '160,7 × 73,1 × 8,2 mm, 186 g' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.woda,
      title: 'IP68, IP69 i norma wojskowa',
      body:
        'Poza zanurzeniem (IP68) telefon znosi strumień wody pod ciśnieniem (IP69), a obudowa ' +
        'przeszła testy MIL-STD-810H — deszcz i błoto w terenie nie są dla niego problemem.',
    },
    {
      icon: ICON.bateria,
      title: '6000 mAh na długi dzień w lesie',
      body:
        'Duży akumulator wystarcza na cały dzień nawigacji i zdjęć, a ładowarka 90 W uzupełnia go ' +
        'w przerwie w kancelarii.',
    },
    {
      icon: ICON.aparat,
      title: 'Teleobiektyw do dokumentacji',
      body:
        'Trzy aparaty, w tym teleobiektyw 3× z optyczną stabilizacją — szkodę w drzewostanie ' +
        'czy oznaczenie na kłodzie można sfotografować z dystansu.',
    },
    {
      icon: ICON.jasnosc,
      title: 'Ekran 4500 nitów',
      body:
        'Wyświetlacz pOLED rozjaśnia się szczytowo do 4500 nitów, więc mapa pozostaje czytelna ' +
        'nawet w ostrym słońcu.',
    },
  ],
  usedBy: { device: 'Motorola Edge 60 Pro' },
  related: [
    {
      name: 'Samsung Galaxy S26 FE',
      href: '/produkt/samsung-s26-fe',
      note: 'Zabezpieczenia do 2033 roku, Exynos 2500',
    },
    {
      name: 'Samsung Galaxy XCover7 Pro',
      href: '/produkt/samsung-xcover7',
      note: 'Smartfon przemysłowy z wymienną baterią',
    },
  ],
}

export default function MotorolaEdge60ProPage() {
  return <ProductPage data={data} />
}
