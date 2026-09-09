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
  /** zdania drobnym drukiem pod warunkami */
  uwagi: string[]
}

export const PRODUKTY_OFERTY: Record<string, ProduktOferty> = {
  'posnet-pospay-2': {
    slug: 'posnet-pospay-2',
    nazwa: 'Posnet Pospay 2',
    opis:
      'Kasa fiskalna online z drukarką i terminalem płatniczym. Ekran 4,5″, płatności kartą i BLIK, akumulator 6800 mAh, GSM i Wi-Fi, zgodna z Leśnik+.',
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
    wdrozenie: [
      { title: 'Zamówienie', note: 'Posnet Pospay 2 w TAKMA' },
      { title: 'Dokumenty', note: 'do fiskalizacji' },
      { title: 'Fiskalizacja', note: 'i zgłoszenie do eService' },
      { title: 'Dostawa', note: 'urządzenia do nadleśnictwa' },
      { title: 'Szkolenie', note: 'leśniczych z obsługi' },
      { title: 'Integracja', note: 'z rejestratorami' },
      { title: 'Przeglądy', note: 'ustawowe co 2 lata' },
    ],
    uwagi: ['Przeglądy ustawowe co 2 lata rozliczane są osobno.'],
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
