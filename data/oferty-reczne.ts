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
    slug: 'honeywell-eda52',
    skladnica: 'zpuh-olsztyn',
    plik: 'Cennik — Mobilny komputer dotykowy Honeywell EDA 52, ZPUH Olsztyn',
    formularz: null,
    strona: 'https://zpuh.olsztyn.lasy.gov.pl/rejestratory',
    // cennik nie podaje okresu obowiązywania
    okres: null,
    urzadzenie: {
      nazwa: 'Mobilny komputer dotykowy Honeywell EDA 52',
      cenaNetto: 2838,
      // z listy „W zestawie” bierzemy rzeczy, które klient dostaje w pudełku;
      // przekątna, RAM i skaner to parametry — te karta podaje w specyfikacji
      wZestawie: [
        'System Android 11',
        'Akumulator',
        'Karta pamięci micro SD 64 GB',
        'Ładowarka sieciowa oraz ładowarka samochodowa',
        'Gwarancja 24 miesiące',
      ],
    },
    // Nazwy pozycji celowo takie same jak w druku ZUP Łódź. Obie składnice
    // opisują te same akcesoria innymi słowami („Akumulator” kontra „Akumulator
    // 4500mAh”, „szkło ochronne” kontra „szkło lub folia ochronna”) i po tych
    // samych cenach — przy dosłownym przepisaniu tabela porównawcza robiła
    // z nich osobne wiersze i pokazywała myślnik tam, gdzie składnica akcesorium
    // jednak ma. Kwoty i sam fakt dostępności pozostają zgodne ze źródłem.
    dodatki: [
      { nazwa: 'Kontrakt serwisowy producenta (3 letni) do HONEYWELL EDA52', cenaNetto: 649 },
      { nazwa: 'Nakładka na obudowę zabezpieczająca przed uszkodzeniami', cenaNetto: 82.5 },
      { nazwa: 'Pasek na rękę', cenaNetto: 44 },
      { nazwa: 'Szkło lub folia ochronna na ekran', cenaNetto: 64.9 },
      { nazwa: 'Ładowarka sieciowa', cenaNetto: 97.9 },
      { nazwa: 'Ładowarka samochodowa', cenaNetto: 97.9 },
      { nazwa: 'Stacja dokująca służąca jedynie od ładowania urządzenia + zasilacz', cenaNetto: 715 },
      { nazwa: 'Akumulator 4500mAh', cenaNetto: 275 },
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
