'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'dell-poweredge-r550',
  name: 'Dell PowerEdge R550',
  category: 'Serwery',
  categoryHref: '/kategoria/serwery',
  images: ['/r550_1.png'],
  inquiry: {
    description: 'Serwer z przestrzenią na archiwum nadleśnictwa',
    specifications: 'Xeon Silver 4314 · 64 GB DDR4 ECC · 20 TB w RAID · iDRAC9 · ProSupport 60 mies.',
  },
  whyNavLabel: 'Dlaczego R550',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W serwerowni nadleśnictwa',
  highlights: [
    { icon: ICON.procesor, label: 'Procesor', value: 'Xeon Silver 4314, 16 rdzeni / 32 wątki' },
    { icon: ICON.pamiec, label: 'Pamięć', value: '64 GB DDR4 RDIMM ECC' },
    { icon: ICON.dyski, label: 'Przestrzeń', value: '20 TB (5 × 4 TB) w RAID' },
    { icon: ICON.wsparcie5, label: 'Gwarancja', value: 'ProSupport 60 miesięcy' },
  ],
  variants: [
    { id: 'konfiguracja', label: 'Konfiguracja', options: ['64 GB / 20 TB'] },
  ],
  specGroups: [
    {
      title: 'Procesor',
      rows: [
        { k: 'Model', v: 'Intel Xeon Silver 4314' },
        { k: 'Taktowanie', v: '2,4–3,4 GHz' },
        { k: 'Rdzenie', v: '16 rdzeni / 32 wątki' },
        { k: 'Cache', v: '24 MB' },
        { k: 'TDP', v: '135 W' },
      ],
    },
    {
      title: 'Pamięć',
      rows: [
        { k: 'Pojemność', v: '64 GB (2 × 32 GB)' },
        { k: 'Typ', v: 'DDR4 RDIMM ECC' },
        { k: 'Prędkość', v: '3200 MT/s' },
      ],
    },
    {
      title: 'Dyski i macierz',
      rows: [
        { k: 'Zatoki', v: 'do 8 dysków 3,5″ SAS/SATA hot-plug' },
        { k: 'Kontroler', v: 'PERC H755, 8 GB cache, 12 Gb/s' },
        { k: 'Poziomy RAID', v: '0/1/5/6/10/50/60' },
        { k: 'Zainstalowane', v: '20 TB — 5 × 4 TB, 7200 obr./min, SATA' },
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
      title: 'Dwadzieścia terabajtów na dane',
      body:
        'Pięć dysków po 4 TB w macierzy RAID daje miejsce na archiwum dokumentacji i kopie zapasowe z całej jednostki.',
    },
    {
      icon: ICON.procesor,
      title: 'Szesnaście rdzeni do wirtualizacji',
      body:
        'Xeon Silver 4314 z 32 wątkami pozwala uruchomić kilka maszyn wirtualnych na jednym urządzeniu zamiast stawiać osobne serwery.',
    },
    {
      icon: ICON.rozbudowa,
      title: 'Osiem zatok na dyski',
      body:
        'Zajęte jest pięć — pozostałe trzy pozwalają zwiększyć przestrzeń bez wymiany serwera.',
    },
    {
      icon: ICON.zdalne,
      title: 'Konsola przez sieć',
      body:
        'iDRAC9 Enterprise obsługuje zdalny restart, konsolę i monitoring stanu podzespołów bez wchodzenia do serwerowni.',
    },
  ],
  usedBy: { device: 'PowerEdge R550' },
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
      name: 'Dell PowerEdge R660xs',
      href: '/produkt/dell-poweredge-r660xs',
      note: 'Nowsza platforma z 128 GB DDR5 i dyskami SAS',
    },
  ],
}

export default function DellR550Page() {
  return <ProductPage data={data} />
}
