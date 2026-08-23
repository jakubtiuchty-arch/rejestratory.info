/**
 * Składnice Lasów Państwowych, przez które nadleśnictwa zamawiają sprzęt.
 * Ten sam model bywa dostępny w kilku — wtedy karta produktu pokazuje
 * porównanie cen zamiast pojedynczej kwoty.
 */

export type KodSkladnicy = 'zup-lodz' | 'zslp-stargard' | 'zpuh-olsztyn'

export type Skladnica = {
  nazwa: string
  pelnaNazwa: string
  miasto: string
  www: string
}

export const SKLADNICE: Record<KodSkladnicy, Skladnica> = {
  'zup-lodz': {
    nazwa: 'ZUP Łódź',
    pelnaNazwa: 'Zakład Usługowo-Produkcyjny Lasów Państwowych',
    miasto: 'Łódź',
    www: 'https://zup.lodz.lasy.gov.pl/rejestratory',
  },
  'zslp-stargard': {
    nazwa: 'ZSLP Stargard',
    pelnaNazwa: 'Zespół Składnic Lasów Państwowych w Stargardzie',
    miasto: 'Stargard',
    www: 'https://zslpstargard.szczecin.lasy.gov.pl',
  },
  'zpuh-olsztyn': {
    nazwa: 'ZPUH Olsztyn',
    pelnaNazwa: 'Zakład Produkcyjno-Usługowo-Handlowy Lasów Państwowych w Olsztynie',
    miasto: 'Olsztyn',
    www: 'https://zpuh.olsztyn.lasy.gov.pl',
  },
}
