'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'dell-poweredge-r360',
  name: 'Dell PowerEdge R360',
  category: 'Serwery',
  categoryHref: '/kategoria/serwery',
  images: ['/r360_1.png'],
  inquiry: {
    description: 'Serwer 1U dla nadleśnictwa — podstawowa konfiguracja',
    specifications: 'Xeon E-2436 · 32 GB DDR5 ECC · 8 TB w RAID · iDRAC9 · ProSupport 60 mies.',
  },
  whyNavLabel: 'Dlaczego R360',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W serwerowni nadleśnictwa',
  highlights: [
    { icon: ICON.procesor, label: 'Procesor', value: 'Xeon E-2436, 6 rdzeni / 12 wątków' },
    { icon: ICON.pamiec, label: 'Pamięć', value: '32 GB DDR5 ECC, 5600 MT/s' },
    { icon: ICON.dyski, label: 'Przestrzeń', value: '8 TB (4 × 2 TB) w RAID' },
    { icon: ICON.wsparcie5, label: 'Gwarancja', value: 'ProSupport 60 miesięcy' },
  ],
  variants: [
    { id: 'konfiguracja', label: 'Konfiguracja', options: ['32 GB / 8 TB'] },
  ],
  specGroups: [
    {
      title: 'Procesor',
      rows: [
        { k: 'Model', v: 'Intel Xeon E-2436' },
        { k: 'Taktowanie', v: '2,9–5,0 GHz' },
        { k: 'Rdzenie', v: '6 rdzeni / 12 wątków' },
        { k: 'Cache', v: '18 MB' },
        { k: 'TDP', v: '65 W' },
      ],
    },
    {
      title: 'Pamięć',
      rows: [
        { k: 'Pojemność', v: '32 GB (2 × 16 GB)' },
        { k: 'Typ', v: 'DDR5 UDIMM ECC' },
        { k: 'Prędkość', v: '5600 MT/s' },
      ],
    },
    {
      title: 'Dyski i macierz',
      rows: [
        { k: 'Zatoki', v: 'do 4 dysków 3,5″ SAS/SATA hot-plug' },
        { k: 'Kontroler', v: 'PERC H755, 8 GB cache, 12 Gb/s' },
        { k: 'Poziomy RAID', v: '0/1/5/6/10/50/60' },
        { k: 'Zainstalowane', v: '8 TB — 4 × 2 TB, 7200 obr./min, SATA' },
      ],
    },
    {
      title: 'Zarządzanie i sieć',
      rows: [
        { k: 'Zdalne zarządzanie', v: 'iDRAC9 Enterprise (1 × RJ-45)' },
        { k: 'OpenManage', v: 'Enterprise Advanced Plus' },
        { k: 'Karta sieciowa', v: 'Broadcom 5720 Dual Port, 2 × RJ-45 1 Gb/s' },
      ],
    },
    {
      title: 'Zasilanie i obudowa',
      rows: [
        { k: 'Zasilacze', v: '2 × 700 W Hot-Plug, 80 PLUS Titanium' },
        { k: 'Przewód', v: 'Rack PDU 2 m (C13/C14)' },
        { k: 'Maskownica', v: 'LCD Bezel 1U' },
        { k: 'Szyny', v: 'ReadyRails z ramieniem na przewody' },
      ],
    },
    {
      title: 'Gwarancja',
      rows: [
        { k: 'Wsparcie', v: 'ProSupport, reakcja Next Business Day Onsite' },
        { k: 'Okres', v: '60 miesięcy' },
        { k: 'Opcje', v: 'zachowanie dysków twardych' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.dyski,
      title: 'Osiem terabajtów w macierzy RAID',
      body:
        'Cztery dyski po 2 TB pracują w macierzy sprzętowej PERC H755 — awaria jednego nośnika nie oznacza utraty danych nadleśnictwa.',
    },
    {
      icon: ICON.pamiec,
      title: 'Pamięć ECC z korekcją błędów',
      body:
        '32 GB DDR5 ECC koryguje pojedyncze błędy w locie, co przy pracy ciągłej ma większe znaczenie niż surowa pojemność.',
    },
    {
      icon: ICON.zdalne,
      title: 'Zarządzanie bez wizyty w serwerowni',
      body:
        'iDRAC9 Enterprise daje dostęp do konsoli i zasilania przez sieć — informatyk RDLP wykona część zadań zdalnie.',
    },
    {
      icon: ICON.zasilacze,
      title: 'Dwa zasilacze zamiast jednego',
      body:
        'Redundantne zasilacze 700 W w standardzie 80 PLUS Titanium podtrzymują pracę, gdy jeden z nich ulegnie awarii.',
    },
  ],
  usedBy: { device: 'PowerEdge R360' },
  whereToBuy: [{ name: 'ZUP Łódź' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.wsparcie5,
      title: 'Pięć lat gwarancji ProSupport',
      body:
        'Sześćdziesiąt miesięcy wsparcia z reakcją w następnym dniu roboczym u klienta oraz opcją zachowania dysków twardych — dane nie opuszczają jednostki przy wymianie sprzętu.',
      tone: 'akcent',
    },
    {
      icon: ICON.rozbudowa,
      title: 'Możliwość rozbudowy',
      body:
        'Serwer rośnie razem z potrzebami nadleśnictwa: więcej pamięci RAM, kolejne dyski w zatokach hot-plug i dodatkowe karty rozszerzeń bez wymiany platformy.',
      tone: 'ciemny',
    },
  ],
  related: [
    {
      name: 'Dell PowerEdge R550',
      href: '/produkt/dell-poweredge-r550',
      note: 'Więcej rdzeni, 64 GB pamięci i 20 TB przestrzeni',
    },
  ],
}

export default function DellR360Page() {
  return <ProductPage data={data} />
}
