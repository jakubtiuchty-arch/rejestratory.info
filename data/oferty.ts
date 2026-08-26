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

/**
 * Najniższa cena netto urządzenia wśród składnic — `null`, gdy modelu nie
 * prowadzi żadna (np. iPhone'y i Galaxy S25+, wyceniane indywidualnie).
 */
export const najnizszaCena = (slug: string): number | null => {
  const kwoty = ofertyDla(slug).map((o) => o.urzadzenie.cenaNetto)
  return kwoty.length ? Math.min(...kwoty) : null
}

/**
 * Cena pozycji listingu kategorii.
 *
 * Listingi identyfikują produkt na cztery sposoby, zależnie od tego, kiedy
 * powstały: pełnym adresem (`link`, `customUrl`), samym slugiem albo wcale —
 * wtedy slug powstaje z nazwy. Zamiast ujednolicać trzynaście plików naraz,
 * pomocnik przyjmuje każdy z tych kształtów.
 *
 * Wcześniej listingi miały pole `price` wpisywane ręcznie. Nie było nigdzie
 * pokazywane, a rozjeżdżało się z ofertami w 45 przypadkach na 79 — sortowanie
 * po cenie liczyło zaś `parseFloat('4 500 PLN')`, czyli 4. Stąd ten pomocnik.
 */
export const cenaPozycjiListingu = (p: {
  customUrl?: string
  link?: string
  slug?: string
  name?: string
}): number | null => {
  const zeSciezki = (s?: string) => s?.match(/\/produkt\/([a-z0-9-]+)/)?.[1]
  const slug =
    zeSciezki(p.customUrl) ??
    zeSciezki(p.link) ??
    p.slug ??
    p.name
      ?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  return slug ? najnizszaCena(slug) : null
}

/** Porównanie do sortowania: pozycje bez ceny zawsze na końcu, w obie strony. */
export const porownajCeny = (
  a: Parameters<typeof cenaPozycjiListingu>[0],
  b: Parameters<typeof cenaPozycjiListingu>[0],
  kierunek: 1 | -1,
): number => {
  const ca = cenaPozycjiListingu(a)
  const cb = cenaPozycjiListingu(b)
  if (ca === null && cb === null) return 0
  if (ca === null) return 1
  if (cb === null) return -1
  return (ca - cb) * kierunek
}
