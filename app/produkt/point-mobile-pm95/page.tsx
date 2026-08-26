'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Dane wyłącznie z druku ZUP Łódź „Oferta na urządzenie Point Mobile_03.2026”.
// UWAGA: dostawcą tej pozycji jest TAXUS IT, nie TAKMA — druk mówi to wprost,
// więc karta też. Blok serwisu kurierskiego wyłączony, bo naprawy nie idą do nas.
const data: ProductData = {
  slug: 'point-mobile-pm95',
  name: 'Point Mobile PM95',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/placeholder-produkt.png'],
  inquiry: {
    description: 'Urządzenie do raportów i pomiaru GNSS',
    specifications: 'Android 13 · 6″ · 6/64 GB · GNSS · 7020 mAh',
  },
  whyNavLabel: 'Dlaczego PM95',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W pracy terenowej',
  highlights: [
    { icon: ICON.lokalizacja, label: 'Pomiar', value: 'GNSS' },
    { icon: ICON.przekatna, label: 'Ekran', value: '6″' },
    { icon: ICON.czaspracy, label: 'Akumulator', value: '7020 mAh' },
    { icon: ICON.pamiec, label: 'Pamięć', value: '6 GB RAM + 64 GB' },
  ],
  variants: [{ id: 'pamiec', label: 'Pamięć', options: ['6 GB / 64 GB'] }],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [{ k: 'Przekątna', v: '6″' }],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 13' },
        { k: 'Pamięć RAM', v: '6 GB' },
        { k: 'Pamięć wbudowana', v: '64 GB' },
      ],
    },
    {
      title: 'Pomiar i łączność',
      rows: [
        { k: 'Zastosowanie', v: 'raporty i pomiar GNSS' },
        { k: 'BLE', v: 'obsługa beaconów' },
      ],
    },
    {
      title: 'Zasilanie i obsługa',
      rows: [
        { k: 'Akumulator', v: '7020 mAh' },
        { k: 'W zestawie', v: 'zasilacz sieciowy, kabel USB-C, folia ochronna na ekran' },
        { k: 'Gwarancja', v: '12 miesięcy' },
        { k: 'Kontrakt serwisowy', v: '36 miesięcy' },
        { k: 'Dostawca', v: 'TAXUS IT' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.lokalizacja,
      title: 'Pomiar GNSS bez osobnego odbiornika',
      body:
        'Urządzenie jest przeznaczone do wykonywania raportów i pomiaru GNSS, więc pozycję ' +
        'zdejmuje ten sam sprzęt, na którym powstaje dokumentacja.',
    },
    {
      icon: ICON.czaspracy,
      title: 'Akumulator ponad siedem tysięcy mAh',
      body:
        '7020 mAh to zapas liczony na całodzienną pracę w terenie z włączonym odbiornikiem ' +
        'pozycji, a nie na kilka godzin między ładowaniami.',
    },
    {
      icon: ICON.przekatna,
      title: 'Ekran sześciocalowy do formularzy',
      body:
        'Sześć cali mieści formularz bez ciągłego przewijania, a przy raportowaniu w terenie ' +
        'liczy się każde spojrzenie mniej.',
    },
    {
      icon: ICON.wsparcie,
      title: 'Trzyletni kontrakt serwisowy',
      body:
        'Do dwunastomiesięcznej gwarancji dochodzi kontrakt serwisowy na 36 miesięcy — ' +
        'urządzenie ma zaplanowaną obsługę na cały okres użytkowania.',
    },
  ],
  hideService: true,
  related: [
    {
      name: 'Zebra EM45',
      href: '/produkt/zebra-em45',
      note: 'Rejestrator w obudowie smartfona, z dostawą i serwisem po naszej stronie',
    },
  ],
}

export default function PointMobilePM95Page() {
  return <ProductPage data={data} />
}
