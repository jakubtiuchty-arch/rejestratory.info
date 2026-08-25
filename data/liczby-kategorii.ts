// PLIK GENEROWANY — nie edytować ręcznie.
// Liczba kart produktu w kategorii. Odświeżenie: node scripts/policz-karty.mjs
// (odpala się samo przed `npm run build`).

export const LICZBY_KATEGORII: Record<string, number> = {
  "akcesoria-komputerowe": 14,
  "all-in-one": 2,
  "drukarki-do-rejestratora": 6,
  "drukarki-laserowe": 3,
  "ezd": 8,
  "laptopy": 5,
  "monitory": 12,
  "rejestratory": 10,
  "serwery": 3,
  "tablety": 3,
  "telefony": 8,
  "urzadzenia-fiskalne": 2,
  "urzadzenia-wielofunkcyjne": 6
}

/** Ile kart ma kategoria spod danego adresu, np. `/kategoria/laptopy`. */
export const ileKart = (categoryHref: string): number =>
  LICZBY_KATEGORII[categoryHref.replace('/kategoria/', '')] ?? 0
