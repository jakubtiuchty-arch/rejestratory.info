/**
 * Oferty przepisane ręcznie ze źródeł, których nie da się sparsować — cenników
 * przetargowych, skanów i tabel przysyłanych mailem. Plik `oferty-skladnicy.ts`
 * jest generowany skryptem i nadpisywany, więc ręczne wpisy trzymamy osobno.
 *
 * Zasada: przepisujemy dokładnie to, co jest w źródle. Gdy dokument nie podaje
 * okresu obowiązywania, zostaje `okres: null` — lepszy brak terminu niż termin
 * zmyślony.
 */

import type { OfertaSkladnicy } from './oferty-skladnicy'

export const OFERTY_RECZNE: OfertaSkladnicy[] = [
  {
    slug: 'zebra-zq521',
    skladnica: 'zup-lodz',
    plik: 'Oferta na drukarki termiczne, ZUP Łódź',
    formularz: null,
    // ZUP Łódź trzyma rejestratory i drukarki na jednej podstronie
    strona: 'https://zup.lodz.lasy.gov.pl/rejestratory',
    // dokument nie podaje okresu obowiązywania
    okres: null,
    urzadzenie: {
      nazwa: 'Zebra ZQ521',
      cenaNetto: 2514.5,
      wZestawie: [
        'Moduł Bluetooth',
        'Akumulator, ładowarka sieciowa i samochodowa',
        'Torba na zestaw z rejestratorem',
      ],
    },
    dodatki: [
      { nazwa: 'Ładowarka sieciowa', cenaNetto: 104.5 },
      { nazwa: 'Ładowarka samochodowa', cenaNetto: 99 },
      { nazwa: 'Akumulator o pojemności standardowej', cenaNetto: 467.5 },
      { nazwa: 'Akumulator o pojemności rozszerzonej', cenaNetto: 665.5 },
      {
        nazwa: 'Stacja dokująca dla pojedynczego akumulatora, wersja standardowa i rozszerzona',
        cenaNetto: 544.5,
      },
      { nazwa: 'Papier termiczny', cenaNetto: 6.55 },
      { nazwa: 'Kontrakt serwisowy', cenaNetto: 460.9 },
    ],
  },
  {
    slug: 'zebra-zq521',
    skladnica: 'zpuh-olsztyn',
    plik: 'Oferta na drukarkę termiczną ZEBRA ZQ521, ZPUH Olsztyn',
    formularz: null,
    strona: 'https://zpuh.olsztyn.lasy.gov.pl/drukarki',
    // dokument nie podaje okresu obowiązywania
    okres: null,
    urzadzenie: {
      nazwa: 'Zebra ZQ521',
      cenaNetto: 2596,
      wZestawie: ['Akumulator', 'Ładowarka sieciowa i samochodowa', 'Torba', 'Gwarancja 24 miesiące'],
    },
    dodatki: [
      { nazwa: 'Ładowarka sieciowa', cenaNetto: 181.5 },
      { nazwa: 'Ładowarka samochodowa', cenaNetto: 143 },
      { nazwa: 'Akumulator', cenaNetto: 466.4 },
    ],
  },
  {
    slug: 'zebra-zq521',
    skladnica: 'zslp-stargard',
    plik: 'Cennik — zadanie 25, poz. 25a, ZSLP Stargard',
    formularz: null,
    okres: { od: '2025-04-16', do: '2027-04-03' },
    urzadzenie: {
      nazwa: 'Zebra ZQ521',
      cenaNetto: 2444,
      // cennik podaje samą cenę jednostkową, bez opisu zestawu
      wZestawie: [],
    },
    dodatki: [],
  },
]
