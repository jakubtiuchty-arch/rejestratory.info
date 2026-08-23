/**
 * Jedno wejście do ofert składnic: dane wyciągnięte skryptem z druków .docx
 * plus wpisy przepisane ręcznie ze źródeł, których nie da się sparsować.
 */

import { OFERTY_SKLADNICY, type OfertaSkladnicy } from './oferty-skladnicy'
import { OFERTY_RECZNE } from './oferty-reczne'

export type { OfertaSkladnicy, PozycjaOferty } from './oferty-skladnicy'

/** Komplet ofert — używane też przez cron kontrolujący ich aktualność. */
export const WSZYSTKIE_OFERTY: OfertaSkladnicy[] = [...OFERTY_SKLADNICY, ...OFERTY_RECZNE]

/** Wszystkie oferty na dany model — po jednej z każdej składnicy, która go ma. */
export const ofertyDla = (slug: string): OfertaSkladnicy[] =>
  WSZYSTKIE_OFERTY.filter((o) => o.slug === slug)
