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
