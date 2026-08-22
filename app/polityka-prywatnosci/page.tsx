import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Polityka prywatności — Rejestratory.info',
  description:
    'Kto przetwarza dane osobowe podane w serwisie Rejestratory.info, w jakim celu, jak długo i jakie prawa przysługują osobom, których dane dotyczą.',
}

const AKTUALIZACJA = '22 sierpnia 2026'

/** Numerowana sekcja — numer w mono, tak jak nadtytuły na pozostałych stronach. */
const Sekcja = ({
  numer,
  tytul,
  children,
}: {
  numer: string
  tytul: string
  children: React.ReactNode
}) => (
  <section className="border-t border-stone-200 pt-10">
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
      Punkt {numer}
    </p>
    <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">{tytul}</h2>
    <div className="mt-4 space-y-4 leading-relaxed text-stone-700">{children}</div>
  </section>
)

const Lista = ({ pozycje }: { pozycje: React.ReactNode[] }) => (
  <ul className="space-y-2">
    {pozycje.map((p, i) => (
      <li key={i} className="flex gap-3">
        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
        <span>{p}</span>
      </li>
    ))}
  </ul>
)

export default function PolitykaPrywatnosciPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      <section className="border-b border-stone-200 bg-white">
        <div className="container mx-auto px-4 pb-14 pt-12">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
              Dane osobowe
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
              Polityka prywatności
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              Dokument opisuje, kto przetwarza dane podane w serwisie Rejestratory.info, w jakim
              celu i na jakiej podstawie, komu je powierzamy i jakie prawa przysługują osobom,
              których dane dotyczą.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-stone-400">
              Ostatnia aktualizacja: {AKTUALIZACJA}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-stone-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl space-y-10">
            <Sekcja numer="1" tytul="Kto jest administratorem danych">
              <p>
                Administratorem danych osobowych jest <strong>TAKMA Tadeusz Tiuchty</strong>,
                ul. Poświęcka 1a, 51-128 Wrocław, NIP 915-100-43-77 — dalej „TAKMA”.
              </p>
              <p>
                W sprawach dotyczących danych osobowych można pisać na{' '}
                <a
                  href="mailto:takma@takma.com.pl"
                  className="font-medium text-emerald-700 hover:underline"
                >
                  takma@takma.com.pl
                </a>{' '}
                albo dzwonić pod numer{' '}
                <a href="tel:+48607819688" className="font-medium text-emerald-700 hover:underline">
                  607 819 688
                </a>
                . Można też napisać na adres siedziby.
              </p>
              <p>
                Nie powołaliśmy inspektora ochrony danych — korespondencję w tych sprawach obsługuje
                bezpośrednio administrator.
              </p>
            </Sekcja>

            <Sekcja numer="2" tytul="Skąd mamy dane i jakie to dane">
              <p>
                Dane pochodzą wyłącznie od osób, które same je podają w serwisie. Serwis zawiera
                cztery formularze i wyszukiwarkę urządzeń:
              </p>
              <Lista
                pozycje={[
                  <>
                    <strong>Formularz kontaktowy</strong> — imię i nazwisko, adres e-mail, opcjonalnie
                    telefon oraz nazwa nadleśnictwa lub firmy, temat i treść wiadomości, wskazanie
                    działu.
                  </>,
                  <>
                    <strong>Zgłoszenie usterki</strong> — imię i nazwisko, nadleśnictwo, telefon,
                    e-mail, adres odbioru sprzętu, rodzaj urządzenia, numer seryjny, opis usterki,
                    informacja o kontrakcie serwisowym i sposobie dostarczenia sprzętu.
                  </>,
                  <>
                    <strong>Zapytanie ofertowe</strong> (koszyk zapytań) — imię i nazwisko, e-mail,
                    telefon, nadleśnictwo, treść wiadomości oraz lista wybranych produktów.
                  </>,
                  <>
                    <strong>Zamówienie kuriera</strong> — imię i nazwisko, nadleśnictwo, adres odbioru,
                    nazwa i numer seryjny urządzenia, opis usterki.
                  </>,
                  <>
                    <strong>Panel klienta</strong> — dostęp uzyskuje się przez podanie numeru seryjnego
                    urządzenia. Numer zapisuje się w pamięci przeglądarki (localStorage), żeby nie
                    trzeba go było wpisywać przy kolejnym wejściu. Panel pokazuje nazwę jednostki,
                    do której przypisano urządzenie, oraz historię i terminy przeglądów.
                  </>,
                ]}
              />
              <p>
                Poza tym gromadzimy dane statystyczne o korzystaniu z serwisu — opisane w punkcie 8.
              </p>
            </Sekcja>

            <Sekcja numer="3" tytul="Po co przetwarzamy dane i na jakiej podstawie">
              <Lista
                pozycje={[
                  <>
                    <strong>Obsługa zapytań ofertowych i korespondencji handlowej</strong> — art. 6
                    ust. 1 lit. b RODO, czyli działania podejmowane na żądanie osoby przed zawarciem
                    umowy, a po jej zawarciu — wykonanie umowy.
                  </>,
                  <>
                    <strong>Przyjęcie i realizacja zgłoszenia serwisowego</strong>, w tym zamówienie
                    kuriera, diagnoza, naprawa i odesłanie sprzętu — art. 6 ust. 1 lit. b RODO.
                  </>,
                  <>
                    <strong>Prowadzenie ewidencji urządzeń i terminów przeglądów</strong> oraz
                    przypominanie o przeglądach ustawowych urządzeń fiskalnych — art. 6 ust. 1 lit. b
                    i lit. c RODO, w zakresie, w jakim obowiązek wynika z przepisów o kasach
                    rejestrujących.
                  </>,
                  <>
                    <strong>Rozliczenia i dokumentacja księgowa</strong> — art. 6 ust. 1 lit. c RODO
                    w związku z przepisami podatkowymi i ustawą o rachunkowości.
                  </>,
                  <>
                    <strong>Obrona przed roszczeniami i dochodzenie roszczeń</strong>, a także
                    zapewnienie bezpieczeństwa serwisu i statystyka odwiedzin — art. 6 ust. 1 lit. f
                    RODO, czyli prawnie uzasadniony interes administratora.
                  </>,
                ]}
              />
              <p>
                Podanie danych jest dobrowolne, ale bez nich nie da się odpowiedzieć na zapytanie ani
                przyjąć sprzętu do serwisu. Pola oznaczone w formularzach jako opcjonalne można
                pominąć.
              </p>
            </Sekcja>

            <Sekcja numer="4" tytul="Jak długo przechowujemy dane">
              <Lista
                pozycje={[
                  <>
                    <strong>Korespondencja i zapytania</strong> — przez czas potrzebny do załatwienia
                    sprawy, a następnie przez okres przedawnienia ewentualnych roszczeń.
                  </>,
                  <>
                    <strong>Zgłoszenia serwisowe i dokumentacja napraw</strong> — przez okres
                    gwarancji lub obowiązywania kontraktu serwisowego, a po jego zakończeniu przez
                    okres przedawnienia roszczeń.
                  </>,
                  <>
                    <strong>Ewidencja urządzeń i przeglądów</strong> — przez czas, w którym urządzenie
                    pozostaje pod naszą opieką serwisową.
                  </>,
                  <>
                    <strong>Dokumenty księgowe</strong> — 5 lat, licząc od końca roku kalendarzowego,
                    w którym upłynął termin płatności podatku.
                  </>,
                ]}
              />
            </Sekcja>

            <Sekcja numer="5" tytul="Komu przekazujemy dane">
              <p>
                Danych nie sprzedajemy i nie udostępniamy w celach marketingowych podmiotom trzecim.
                Powierzamy je wyłącznie dostawcom, bez których serwis nie mógłby działać, na
                podstawie umów powierzenia przetwarzania:
              </p>
              <Lista
                pozycje={[
                  <>
                    <strong>Vercel Inc.</strong> — hosting serwisu i statystyka odwiedzin.
                  </>,
                  <>
                    <strong>Resend</strong> — dostarczanie wiadomości e-mail wysyłanych z formularzy.
                  </>,
                  <>
                    <strong>Supabase</strong> — baza danych, w której prowadzimy ewidencję urządzeń
                    i terminów przeglądów.
                  </>,
                  <>
                    <strong>Google Ireland Ltd.</strong> — statystyka odwiedzin w usłudze Google
                    Analytics.
                  </>,
                  <>
                    <strong>Firma kurierska</strong> — imię, nazwisko, adres i telefon, gdy zamawiany
                    jest odbiór sprzętu.
                  </>,
                ]}
              />
              <p>
                Dane mogą być też ujawnione organom państwowym, jeżeli wystąpią o nie na podstawie
                przepisów prawa.
              </p>
            </Sekcja>

            <Sekcja numer="6" tytul="Przekazywanie danych poza Europejski Obszar Gospodarczy">
              <p>
                Część wymienionych dostawców to podmioty ze Stanów Zjednoczonych. Przekazywanie danych
                odbywa się na podstawie decyzji Komisji Europejskiej o odpowiednim stopniu ochrony
                (Data Privacy Framework) albo standardowych klauzul umownych zatwierdzonych przez
                Komisję Europejską.
              </p>
            </Sekcja>

            <Sekcja numer="7" tytul="Prawa osoby, której dane dotyczą">
              <p>W związku z przetwarzaniem danych przysługuje prawo do:</p>
              <Lista
                pozycje={[
                  'dostępu do swoich danych i otrzymania ich kopii,',
                  'sprostowania danych nieprawidłowych lub uzupełnienia niekompletnych,',
                  'usunięcia danych, jeżeli nie ma podstawy do dalszego ich przetwarzania,',
                  'ograniczenia przetwarzania,',
                  'przenoszenia danych przetwarzanych na podstawie umowy,',
                  <>
                    wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym
                    interesie administratora,
                  </>,
                ]}
              />
              <p>
                Żądanie wystarczy przesłać na{' '}
                <a
                  href="mailto:takma@takma.com.pl"
                  className="font-medium text-emerald-700 hover:underline"
                >
                  takma@takma.com.pl
                </a>
                . Odpowiadamy bez zbędnej zwłoki, najpóźniej w ciągu miesiąca.
              </p>
              <p>
                Osobie, która uzna, że przetwarzamy dane niezgodnie z prawem, przysługuje skarga do
                Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.
              </p>
            </Sekcja>

            <Sekcja numer="8" tytul="Pliki cookies i statystyka odwiedzin">
              <p>
                Serwis korzysta z Google Analytics, które zapisuje w przeglądarce pliki cookies
                pozwalające policzyć odwiedziny i sprawdzić, które strony są otwierane. Analityka
                Vercel działa bez plików cookies i bez identyfikowania pojedynczych osób.
              </p>
              <p>
                Panel klienta zapisuje w pamięci przeglądarki (localStorage) numer seryjny urządzenia,
                którego dotyczy sprawdzenie — po to, by nie trzeba było wpisywać go ponownie. Dane te
                pozostają na urządzeniu użytkownika i można je usunąć, czyszcząc dane witryny
                w ustawieniach przeglądarki.
              </p>
              <p>
                Obsługę plików cookies można ograniczyć lub wyłączyć w ustawieniach przeglądarki.
                Serwis działa wtedy normalnie — przestaje jedynie zliczać odwiedziny.
              </p>
            </Sekcja>

            <Sekcja numer="9" tytul="Automatyczne decyzje i profilowanie">
              <p>
                Nie podejmujemy decyzji w sposób zautomatyzowany i nie profilujemy osób
                odwiedzających serwis. Formularze obsługują ludzie.
              </p>
            </Sekcja>

            <Sekcja numer="10" tytul="Zmiany polityki">
              <p>
                Jeżeli zmieni się zakres zbieranych danych albo lista dostawców, zaktualizujemy ten
                dokument i zmienimy datę widoczną na górze strony. Poprzednie wersje udostępniamy na
                żądanie.
              </p>
            </Sekcja>

            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">
                Kontakt w sprawie danych
              </p>
              <p className="mt-3 leading-relaxed text-stone-700">
                TAKMA Tadeusz Tiuchty, ul. Poświęcka 1a, 51-128 Wrocław
                <br />
                <a
                  href="mailto:takma@takma.com.pl"
                  className="font-medium text-emerald-700 hover:underline"
                >
                  takma@takma.com.pl
                </a>{' '}
                ·{' '}
                <a href="tel:+48607819688" className="font-medium text-emerald-700 hover:underline">
                  607 819 688
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
