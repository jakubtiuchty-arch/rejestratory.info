/**
 * Jedno wejście do ofert składnic: dane wyciągnięte skryptem z druków .docx
 * plus wpisy przepisane ręcznie ze źródeł, których nie da się sparsować.
 */

import { OFERTY_SKLADNICY, type OfertaSkladnicy } from './oferty-skladnicy'
import { OFERTY_RECZNE } from './oferty-reczne'

export type { OfertaSkladnicy, PozycjaOferty } from './oferty-skladnicy'

/**
 * Komplet ofert — używane też przez cron kontrolujący ich aktualność.
 *
 * Przy tym samym modelu w tej samej składnicy wygrywa wpis ręczny: powstał
 * świadomie (najczęściej ze zrzutu albo z poprawkami), a wersja generowana
 * nadpisałaby te decyzje przy każdym uruchomieniu parsera.
 */
const klucz = (o: OfertaSkladnicy) => `${o.slug}::${o.skladnica}`
const reczne = new Set(OFERTY_RECZNE.map(klucz))

export const WSZYSTKIE_OFERTY: OfertaSkladnicy[] = [
  ...OFERTY_RECZNE,
  ...OFERTY_SKLADNICY.filter((o) => !reczne.has(klucz(o))),
]

/** Wszystkie oferty na dany model — po jednej z każdej składnicy, która go ma. */
export const ofertyDla = (slug: string): OfertaSkladnicy[] =>
  WSZYSTKIE_OFERTY.filter((o) => o.slug === slug)
