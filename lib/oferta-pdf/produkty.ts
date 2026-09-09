/**
 * Dane produktów, dla których klient może sam wygenerować ofertę w PDF.
 * Kwoty w GROSZACH (liczby całkowite), żeby sumy nie łapały błędów zmiennoprzecinkowych.
 * Źródłem prawdy są karty produktów w app/produkt/<slug>/page.tsx — tu tylko
 * powtarzamy liczby, które mają trafić do dokumentu.
 */

export type ProduktOferty = {
  slug: string
  nazwa: string
  /** jedno zdanie pod nazwą pozycji w tabeli */
  opis: string
  /** cena netto za sztukę, w groszach */
  cenaNetto: number
  /** opłata cykliczna poza tabelą pozycji jednorazowych */
  abonament?: { nazwa: string; cenaNetto: number; okres: string; opis: string }
  prowizje?: { label: string; value: string }[]
  /** kroki wdrożenia — powtarzają oś z karty produktu */
  wdrozenie: { title: string; note: string }[]
}

export const PRODUKTY_OFERTY: Record<string, ProduktOferty> = {
  'posnet-pospay-2': {
    slug: 'posnet-pospay-2',
    nazwa: 'Posnet Pospay 2',
    opis:
      'W cenie: fiskalizacja, dostawa, szkolenie i integracja z rejestratorami. Przeglądy ustawowe co 2 lata rozliczane są osobno.',
    cenaNetto: 179_900,
    abonament: {
      nazwa: 'Abonament za terminal płatniczy',
      cenaNetto: 3_900,
      okres: 'miesięcznie',
      opis:
        'Wynajem terminala płatniczego z dożywotnią gwarancją, aplikacja sprzedażowa POS-UP z aktualizacjami oraz karta SIM z transmisją danych do Centralnego Repozytorium Kas.',
    },
    prowizje: [
      { label: 'VISA', value: '0,69 %' },
      { label: 'MasterCard', value: '0,79 %' },
      { label: 'BLIK', value: '0,39 %' },
    ],
    // podpisy krótkie, po jednej linii — dłuższe łamią się na trzy wiersze
    // i cała oferta przestaje mieścić się na jednej stronie
    wdrozenie: [
      { title: 'Zamówienie', note: 'w TAKMA' },
      { title: 'Dokumenty', note: 'do fiskalizacji' },
      { title: 'Fiskalizacja', note: 'w eService' },
      { title: 'Dostawa', note: 'do nadleśnictwa' },
      { title: 'Szkolenie', note: 'leśniczych' },
      { title: 'Integracja', note: 'z rejestratorami' },
      { title: 'Przeglądy', note: 'co 2 lata' },
    ],
  },
}

export const WARUNKI_OFERTY = {
  /** liczba dni ważności od daty wystawienia */
  waznoscDni: 30,
  platnosc: 'przelew, 14 dni od daty faktury',
  realizacja: 'do uzgodnienia z nadleśnictwem',
  vat: 0.23,
}

export const SPRZEDAWCA = {
  nazwa: 'TAKMA',
  adres1: 'ul. Poświęcka 1a',
  adres2: '51-128 Wrocław',
  nip: '915-100-43-77',
  email: 'takma@takma.com.pl',
  telefon: '607 819 688',
  www: 'www.rejestratory.info',
}
