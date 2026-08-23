'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const WDROZENIE_DOKUMENTY = {
  heading: 'Dokumenty do fiskalizacji',
  intro:
    'Po otrzymaniu zamówienia odsyłamy szczegółową listę dokumentów potrzebnych do zgłoszenia urządzenia do eService oraz do Urzędu Skarbowego. Poniżej to, co warto przygotować wcześniej.',
  items: [
    'Dane nadleśnictwa — NIP, REGON, pełna nazwa',
    'Adres miejsca instalacji urządzenia',
    'Nazwy i adresy leśnictw',
    'Skan paragonu dotychczasowych urządzeń fiskalnych, jeśli takie są w użyciu',
    'Numer telefonu kontaktowego',
  ],
  footer:
    'Wypełnienie dokumentów i zgłoszenie do eService prowadzimy razem z Państwem — nie zostawiamy nadleśnictwa z formularzami samego.',
}

const data: ProductData = {
  slug: 'posnet-temo-online',
  name: 'Posnet Temo Online',
  category: 'Urządzenia fiskalne',
  categoryHref: '/kategoria/urzadzenia-fiskalne',
  images: ['/temo_online_1.png', '/temo_online_2.png'],
  inquiry: {
    description: 'Mobilna drukarka fiskalna online do sprzedaży w terenie',
    specifications:
      '315 g · akumulator na 50 000 wierszy · druk 22 linie/s · USB i Wi-Fi · zgodna z Leśnik+',
  },
  whyNavLabel: 'Dlaczego Temo Online',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Sprzedaż drewna i usług',
  highlights: [
    { icon: ICON.waga, label: 'Waga', value: '315 g bez papieru' },
    { icon: ICON.czaspracy, label: 'Akumulator', value: '50 000 wierszy wydruku' },
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: '22 linie na sekundę' },
    { icon: ICON.chmura, label: 'Komunikacja z CRK', value: 'USB, opcjonalnie Wi-Fi' },
  ],
  specGroups: [
    {
      title: 'Urządzenie',
      rows: [
        { k: 'Wersja', v: 'ONLINE' },
        { k: 'Pamięć chroniona', v: 'karta micro SDHC 4 GB' },
        { k: 'Komunikacja z CRK', v: 'USB, Wi-Fi po zastosowaniu modułu rozszerzeń' },
        { k: 'Wymiary', v: '86 × 46 × 128 mm' },
        { k: 'Waga', v: '~0,315 kg, 0,36 kg z papierem' },
      ],
    },
    {
      title: 'Mechanizm drukujący',
      rows: [
        { k: 'Typ mechanizmu', v: 'termiczny Seiko „drop in”' },
        { k: 'Znaków w wierszu', v: '40' },
        { k: 'Szerokość papieru', v: '57 mm' },
        { k: 'Długość rolki', v: '14 m' },
        { k: 'Szybkość wydruku', v: '22 linie/s' },
      ],
    },
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Operatora', v: 'wspólny z wyświetlaczem klienta' },
        { k: 'Klienta', v: 'alfanumeryczny LCD 2 × 16 znaków' },
      ],
    },
    {
      title: 'Zasilanie i bazy danych',
      rows: [
        { k: 'Zasilanie', v: 'przez port USB lub zasilacz zewnętrzny' },
        { k: 'Akumulator', v: 'Li-ion 7,4 V / 2150 mAh' },
        { k: 'Wydajność akumulatora', v: 'wydruk 50 000 wierszy paragonu' },
        { k: 'Stawki VAT', v: '7 (A…G)' },
        { k: 'Liczba PLU', v: '100 000' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.kompakt,
      title: 'Mieści się w kieszeni kurtki',
      body:
        'Osiem i pół centymetra szerokości i 315 gramów — drukarka jedzie na powierzchnię razem z rejestratorem, a nie zostaje w kancelarii.',
    },
    {
      icon: ICON.czaspracy,
      title: 'Pięćdziesiąt tysięcy wierszy na akumulatorze',
      body:
        'Deklarowana wydajność jednego ładowania. Dzień sprzedaży w terenie kończy się bez szukania gniazdka.',
    },
    {
      icon: ICON.chmura,
      title: 'Raportuje do CRK sama',
      body:
        'Każda transakcja trafia do Centralnego Repozytorium Kas prowadzonego przez Ministerstwo Finansów — bez ręcznych odczytów i bez ryzyka zaległości.',
    },
    {
      icon: ICON.integracja,
      title: 'Współpracuje z Leśnik+',
      body:
        'Pozycje sprzedaży idą z rejestratora prosto na paragon, więc leśniczy nie przepisuje asortymentu drugi raz.',
    },
  ],
  timeline: {
    label: 'Od zamówienia do pierwszego paragonu',
    heading: 'Proces zakupu i wdrożenia',
    navLabel: 'Wdrożenie',
    lead:
      'Siedem kroków od złożenia zamówienia do przeglądów ustawowych — całość prowadzimy z nadleśnictwem.',
    documents: WDROZENIE_DOKUMENTY,
    steps: [
      { icon: ICON.zamowienie, title: 'Zamówienie', note: 'w składnicy ZUP Łódź' },
      { icon: ICON.formularz, title: 'Dokumenty', note: 'do fiskalizacji', documents: true },
      { icon: ICON.fiskalizacja, title: 'Fiskalizacja', note: 'numer ewidencyjny online' },
      { icon: ICON.kurier, title: 'Dostawa', note: 'urządzenia do nadleśnictwa' },
      { icon: ICON.szkolenie, title: 'Szkolenie', note: 'leśniczych z obsługi' },
      { icon: ICON.integracja, title: 'Integracja', note: 'z rejestratorami' },
      { icon: ICON.kalendarz, title: 'Przeglądy', note: 'ustawowe co 2 lata' },
    ],
  },
  signature: [
    {
      icon: ICON.kompakt,
      title: 'Najmniejsza i najlżejsza drukarka fiskalna na rynku',
      body:
        'Osiem i pół na cztery i pół na trzynaście centymetrów, 315 gramów. Sprzęt pomyślany do pracy na powierzchni, nie na biurku.',
      tone: 'akcent',
    },
  ],
  // BEZ `usedBy`: w module przeglądów „Posnet Temo” to egzemplarze OFFLINE, a nie
  // ten model. Nie podpinać tej nazwy pod kartę Temo Online.
  related: [
    {
      name: 'Posnet Pospay 2',
      href: '/produkt/posnet-pospay-2',
      note: 'Kasa, drukarka i terminal w jednej obudowie',
    },
  ],
}

export default function PosnetTemoOnlinePage() {
  return <ProductPage data={data} />
}
