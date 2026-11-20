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
  /** operator płatności kartą — pada w opisie prowizji i w „Jak zamówić” */
  operatorPlatnosci?: string
  /** dodatek: stała opłata od transakcji, druga linia pod stawką procentową */
  prowizje?: { label: string; value: string; dodatek?: string }[]
  /** krótka uwaga w linii nagłówka prowizji, np. o braku opłat dodatkowych */
  prowizjeUwaga?: string
  /** jedna linia pod stawkami */
  prowizjePrzypis?: string
  /** kroki wdrożenia — powtarzają oś z karty produktu */
  wdrozenie: { title: string; note: string }[]
}

export const PRODUKTY_OFERTY: Record<string, ProduktOferty> = {
  'posnet-pospay-2': {
    slug: 'posnet-pospay-2',
    nazwa: 'Posnet Pospay 2',
    opis:
      'W cenie: 24 miesiące gwarancji na urządzenie (standard producenta to 12 miesięcy), fiskalizacja, dostawa, szkolenie i integracja z rejestratorami. Przeglądy ustawowe co 2 lata rozliczane są osobno.',
    cenaNetto: 179_900,
    abonament: {
      nazwa: 'Abonament za terminal płatniczy',
      cenaNetto: 3_900,
      okres: 'miesięcznie',
      opis:
        'Wynajem terminala płatniczego z dożywotnią gwarancją, aplikacja sprzedażowa POS-UP z aktualizacjami oraz karta SIM z transmisją danych do Centralnego Repozytorium Kas.',
    },
    // stawki Planet Pay dla Pospay 2 (planetpay.pl/rozwiazania-fiskalne-pospay), sprawdzone 20.11.2026
    operatorPlatnosci: 'Planet Pay',
    prowizje: [
      { label: 'Karty krajowe', value: '0,79 %', dodatek: '+ 0,09 zł' },
      { label: 'BLIK zbliżeniowy', value: '0,79 %', dodatek: '+ 0,09 zł' },
      { label: 'BLIK kodem', value: '0,54 %', dodatek: '+ 0,09 zł' },
      { label: 'Karty zagraniczne', value: '1,79 %' },
    ],
    prowizjeUwaga: 'bez opłaty autoryzacyjnej i bez opłaty za raportowanie do KAS',
    prowizjePrzypis:
      // jedna linia w PDF — dłuższe zdanie łamie się i zabiera miejsce paskowi „Jak zamówić”
      'Polska Bezgotówkowa: 0 zł prowizji przez 12 miesięcy lub do 100 tys. zł obrotu, jeśli nadleśnictwo spełnia warunki programu.',
    // podpisy krótkie, po jednej linii — dłuższe łamią się na trzy wiersze
    // i cała oferta przestaje mieścić się na jednej stronie
    wdrozenie: [
      { title: 'Zamówienie', note: 'w TAKMA' },
      { title: 'Dokumenty', note: 'do fiskalizacji' },
      { title: 'Fiskalizacja', note: 'umowa Planet Pay' },
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
