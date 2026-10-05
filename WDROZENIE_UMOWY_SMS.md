# Umowy i SMS TAKMA — przygotowane wdrożenie

Stan wdrożenia: 30.09.2026. Portal produkcyjny przełączony na dpl_GF8rxuWaKEk7fz6RwatS6FHutEWn. Migracja prywatnych tabel i magazynu wykonana. Operator jakub.tiuchty@takma.com.pl zatwierdzony. SMSAPI TAKMA, podpisany Auth Hook i serwerowe zmienne skonfigurowane. Pełny test rzeczywistego SMS, odblokowania i pobrania demonstracyjnego PDF zakończony pomyślnie.

## Gotowy przepływ

- Dotychczasowy panel otwiera się numerem urządzenia. Umowy są osobną sekcją pod Przydatnymi dokumentami.
- Tylko operator umów z imiennym kontem Supabase oraz TOTP może dodać klienta, zatwierdzić telefon i wgrać umowę PDF z Pospay Studio.
- Klient nie wpisuje ani nie zmienia numeru telefonu. SMS trafia na zatwierdzony numer; treść umowy nie jest przekazywana SMSAPI.
- Kod ma 6 cyfr, dostęp do umów 15 minut. Limit 5 prób na wyzwanie, wysyłka co najmniej co 60 sekund, maksymalnie 5/h i 10/dobę na telefon oraz 20/h na IP.
- Supabase Auth tworzy/weryfikuje kod. Podpisany Send SMS Hook przekazuje go SMSAPI z `from=TAKMA`. Publiczne wywołanie Auth nie może ominąć limitów: hook wymaga wcześniej utworzonego, jednorazowego wyzwania.
- Serwerowy cookie jest HttpOnly/Secure/SameSite Strict. Tokeny Auth nie trafiają do przeglądarki. Sesja umów jest przypisana do UUID klienta i aktualnej wersji uprawnienia. Zmiana telefonu/cofnięcie dostępu unieważnia sesje.
- Osobne tabele i prywatny Storage; brak publicznych linków PDF. Każde pobranie sprawdza uprawnienia i skrót oryginalnego pliku, wymaga zapisu śladu dostępu. Tytuły i lista umów dostępne dopiero po SMS.
- PDF do 50 MB. Produkcja używa jawnie wybranego trybu `CONTRACT_SCAN_MODE=structural`: parser w ograniczonym pamięciowo wątku, limit czasu 8 s, kontrola poprawności, szyfrowania, aktywnych treści, akcji i załączników, także w skompresowanych obiektach. To kontrola struktury PDF, nie pełny antywirus. Oryginalne bajty i podpis pozostają niezmienione. Błąd kontroli blokuje publikację. Opcjonalny zewnętrzny skaner antywirusowy wymaga osobnego serwera; nie ma automatycznego przejścia do trybu strukturalnego przy jego awarii.
- Przesyłanie zachowuje UUID żądania, dane i skrót w prywatnym szkicu; powtórzenie potwierdzonej wysyłki nie tworzy duplikatu. Ten sam operator może wznowić nieukończony upload: plik jest ponownie skanowany, a już zapisany oryginał sprawdzany po SHA-256, bez nadpisywania.
- Dodanie dokumentu nie wysyła maila ani SMS-a. SMS wysyła klient kliknięciem przycisku.

## Konfiguracja przed uruchomieniem

1. Konto SMSAPI prepaid, zatwierdzone pole nadawcy **TAKMA**, środki na koncie. Token API tylko na serwerze, nigdy w kodzie przeglądarki/Mac ani w rozmowie.
2. Uruchomić `MIGRACJA_UMOWY_SMS.sql` jako właściciel bazy. Migracja jest powtarzalna; nie dodaje operatorów i nie przenosi starych dokumentów do prywatnego magazynu.
3. Serwerowe zmienne środowiska:

   | Zmienna | Znaczenie |
   |---|---|
   | `CONTRACTS_ENABLED` | Domyślnie wyłączone. `true` dopiero po konfiguracji i zakończeniu testów bezpieczeństwa. |
   | `SUPABASE_SERVICE_ROLE_KEY` | Serwerowy klucz Supabase; omija RLS i nigdy nie trafia do aplikacji klienta. |
   | `SMSAPI_TOKEN` | Token wysyłki SMSAPI. |
   | `SMSAPI_SENDER` | Dokładnie `TAKMA`. |
   | `SUPABASE_SMS_HOOK_SECRET` | Sekret podpisu hooka z Supabase (`v1,whsec_…`). |
   | `CONTRACT_PORTAL_ORIGIN` | Dokładny główny origin, np. `https://www.rejestratory.info`. |
   | `CONTRACT_IP_HASH_KEY` | Losowy sekret minimum 32 znaki do skrótów IP. |
   | `CONTRACT_SCAN_MODE` | `structural` na obecnym hostingu; bez tej wartości wymagany zewnętrzny skaner. |
   | `CONTRACT_SCAN_URL` | HTTPS `/scan` na kontrolowanym przez TAKMA serwerze. |
   | `CONTRACT_SCAN_TOKEN` | Losowy sekret skanera, minimum 32 znaki. |

   Istniejące `NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY` pozostają wymagane. Moduł nie wykorzystuje starego tokena fiskalizacji ani publicznego hasła administratora.

4. W Supabase włączyć logowanie telefonem, wyłączyć publiczną rejestrację nowych użytkowników telefonem, ustawić **6 cyfr / 300 sekund / 60 sekund między kodami**. Włączyć podpisany HTTP Send SMS Hook: `https://www.rejestratory.info/api/contracts/sms-hook`. Sprawdzić projektowe limity Supabase (zwykle wymagają dostosowania do ruchu). Ten hook obejmuje wszystkie SMS-y Auth w tym projekcie; przed aktywacją sprawdzić, czy nie ma innego używanego logowania SMS.
5. Utworzyć imienne konto operatora (np. Jakub), bez publicznego samonadawania roli. Nadać mu wpis w `contract_operators` przez administratora:

   ```sql
   insert into public.contract_operators(user_id,active,can_manage_clients)
   values ('UUID_KONTA_OPERATORA',true,true);
   ```

   Operator przy pierwszym logowaniu w Pospay Studio dodaje TOTP do aplikacji uwierzytelniającej. Zwykły operator (`can_manage_clients=false`) widzi/wgrywa tylko klientów z `contract_operator_clients`. Cofnięcie `active` odcina go natychmiast. SMS jest osobnym uwierzytelnieniem klienta, a nie pełnym MFA całego panelu.
6. Opcjonalny pełny antywirus (nie uruchomiony w obecnym wdrożeniu): `tools/contracts-scanner/server.py` z `qpdf`, `clamscan` i codziennym `freshclam` na serwerze TAKMA. Nasłuch HTTP wyłącznie lokalnie; wystawić poprzez chroniony reverse proxy z TLS, limitami czasu/rozmiaru i ograniczeniem dostępu. Nie wysyłać umów do publicznych serwisów skanowania. Skaner odmawia pracy przy bazie sygnatur starszej niż 48 h.
7. W Pospay Studio: Panel Klienta → Umowy → Zaloguj operatora → klient → telefon z rejestracji i potwierdzenie uprawnienia → numery urządzeń → import PDF → automatyczny odczyt numeru, tytułu i jawnie oznaczonej daty → Dodaj umowę. Numerów rejestracyjnych nie ma w obecnym zgłoszeniu fiskalizacji; operator zatwierdza je w tym formularzu. Nie przypisujemy wszystkich telefonów leśniczych automatycznie do wszystkich umów nadleśnictwa.

## Źródła produkcji i granice weryfikacji

Lokalny portal był starszy od repo produkcyjnego. Potwierdzony z GitHub HEAD: `c29d4b0110dc79267e40af39826f7a4eba0f4b42`. Jego archiwum jest zachowane w `.vercel/pospay-integration/current-portal.tar.gz`. Przygotowano kopię aktualnych źródeł z modułem umów i aktualizacją platformy w `.vercel/contracts-candidate`; zachowuje bieżący wygląd i ofertę portalu. Zmiany tej kopii będą zachowane w `UMOWY_SMS_AKTUALIZACJA_PORTALU.patch`, do zastosowania na tym samym HEAD. Nie zastępować całej strony starym checkoutem. Migracja wykonana na projekcie produkcyjnym jwonohhnzvwyplnmfqgp. Nie przesyłano rzeczywistych umów klientów.

Testy lokalne: `npm run test:contracts` (7/7), `npx tsc --noEmit`, build Pospay Studio i jego testy. Kopia aktualnego portalu przeszła pełne buildy Next.js 14 → 15 → 16.3.7. Test w przeglądarce na atrapach potwierdził kolejność sekcji, ukrytą listę przed SMS, odmowę błędnego kodu, odblokowanie poprawnego kodu oraz ponowną blokadę; skrypt `tools/test-contracts-ui.cjs` w kopii portalu. Zrzuty podglądu Mac i panelu są lokalne i zawierają tylko dane demonstracyjne. Testy SQL działają na odizolowanym PostgreSQL (PGlite), SMS/skaner używają atrap i niczego nie wysyłają. Po konfiguracji wymagany pełny test: prawdziwy SMS do uzgodnionego numeru, sztuczny PDF, klient A/B, bezpośredni odczyt przez anon/authenticated, wygaśnięcie, cofnięcie telefonu oraz ponowienie uploadu. Sprawdzić wspólne odtworzenie kopii bazy i plików oraz uprawnienia kont administracyjnych przed rzeczywistymi umowami.

Konto SMSAPI, TAKMA, Auth Hook, telefon, sekrety i operator są skonfigurowane. Portal przełączony i przetestowany na rzeczywistym backendzie, magazynie i SMS. Operator sam dodaje TOTP przy pierwszym logowaniu; dotychczasowe hasło konta pozostaje ważne.

### Aktualizacja platformy przed prawdziwymi umowami

`npm audit` z 30.09.2026 wykazał znane podatności krytyczne w obecnej produkcyjnej bazie Next.js 14.2.15. Przygotowana kopia została zaktualizowana kolejno przez Next.js 15.5.26 do **16.3.7**, z React 19, asynchronicznymi API cookies/params i aktualizacją zgodnych zależności. Podatny narzędziowy sharp-cli został zaktualizowany do 6.1.0. Końcowy `npm audit` w tej kopii: **0 low / 0 moderate / 0 high / 0 critical**. Oznacza to brak zgłoszeń w rejestrze na dzień sprawdzenia, nie gwarancję braku wszystkich podatności.

Kopia używa npm (`packageManager`, `package-lock.json`) i builda webpack; nie zawiera yarn.lock; wdrożenie korzysta z aktualnego locka npm. Baza robocza głównego checkoutu nadal jest starsza, dlatego wdrożenie należy wykonać z przygotowanej kopii/patcha na bieżącym HEAD. Przed produkcyjnym włączeniem `CONTRACTS_ENABLED` wdrożyć tę aktualizację, skonfigurować zależności i przeprowadzić test prawdziwego SMS-a oraz odtworzenia kopii bazy i plików. Produkcja zaktualizowana do Next.js 16.3.7, React 19.3.0. Dotychczasowe zmienne innych modułów zachowane.

## Weryfikacja backendu po wdrożeniu

- Testy lokalne 7/7 i pełny build udane; npm audit produkcyjnych zależności: 0 podatności.
- Rzeczywisty backend: operator bez TOTP odrzucony, po TOTP dopuszczony, kontrola aktywnego PDF odrzuca publikację, poprawny demonstracyjny PDF zapisany prywatnie, ponowienie nie tworzy duplikatu.
- Publiczny klucz nie czyta nowych tabel ani prywatnego magazynu. Główny adres odrzuca odczyt bez sesji i wysyłkę z obcego origin.
- SMS wysłany wyłącznie na uzgodniony numer operatora, dla odrębnego klienta demonstracyjnego. Nie wykorzystano żadnej rzeczywistej umowy klienta.
- Supabase: globalna publiczna rejestracja wyłączona, telefon włączony, kod 6 cyfr / 300 sekund; limit SMS 30/h dla projektu. Konta klientów tworzy zatwierdzony operator.
- Pełnego antywirusa i odtworzenia wspólnej kopii bazy oraz plików nie testowano w tym wdrożeniu.

### Końcowy test produkcyjny

SMS dostarczony od TAKMA na uzgodniony numer, kod wprowadzony przez użytkownika: poprawna weryfikacja, niepoprawny kod odrzucony. Cookie ma HttpOnly/Secure/SameSite Strict. Lista udostępnia wyłącznie umowę klienta, inny numer urządzenia jest odrzucony, cudzy identyfikator dokumentu nie udostępnia pliku. Pobranie PDF zachowało SHA-256 oryginału. Bezpośredni odczyt tabel przez zalogowanego użytkownika jest odrzucony (42501). Cofnięcie uprawnienia klienta natychmiast odrzuciło już wydany cookie. Dane i konta demonstracyjne usunięte po teście. Nie zmieniono hasła ani nie dodano TOTP do rzeczywistego konta operatora; operator przeprowadzi to przy swoim pierwszym logowaniu.


## Aktualizacja 30.09.2026 — skany i duże PDF

Produkcyjny adres `https://www.rejestratory.info` korzysta z wdrożenia `dpl_GF8rxuWaKEk7fz6RwatS6FHutEWn`. Limit bazy i prywatnego magazynu podniesiony do 50 MB. Nie zmieniono uprawnień klienta ani operatora.

Pospay Studio 1.5.3 (20) odczytuje numer z tekstu PDF albo lokalnym OCR Apple Vision. Tytuł i data z wyraźnie oznaczonego nagłówka również są odczytywane. OCR nie wysyła dokumentu do usług zewnętrznych. Test rzeczywistego 12-stronicowego skanu około 20 MB potwierdził odczyt numeru i zgodność oryginalnych bajtów; dokument klienta nie był przesyłany do portalu w ramach testów.

Duży PDF omija limit rozmiaru żądania Vercel: `/prepare` sprawdza operatora i klienta oraz wydaje dwugodzinne prawo wysyłki do jednego losowego obiektu prywatnego Storage. Ten token nie daje prawa odczytu ani publikacji i nie jest kluczem serwera. Aplikacja przesyła oryginał bez tokena operatora/klucza serwera w żądaniu Storage. `/finalize` ponownie sprawdza uprawnienia, rozmiar, SHA-256 i strukturę PDF przed publikacją. Ponowienie jest idempotentne; zmiana metadanych przy tym samym UUID jest odrzucana.

Portal pobiera plik w blokach do 3 MiB i składa oryginalne bajty. Każdy blok wymaga aktualnej sesji SMS, jest ograniczony zakresem klienta i ponownie sprawdza cofnięcie dostępu. Oryginał i podpis elektroniczny nie są przepisywane. W przypadku przerwania dostępu nie powstaje częściowy plik do pobrania.

Test rzeczywistego backendu na sztucznym PDF 20 MiB: odmowa anonymous/AAL1, brak publikacji przed wysyłką, odmowa zmienionych metadanych, prywatny upload, kontrola oryginału, publikacja i powtórzenie bez kopii, złożenie bloków o identycznym SHA-256, natychmiastowa odmowa kolejnego bloku po cofnięciu dostępu. Wszystkie dane, pliki i konta tego testu usunięte. Telefon/SMS nie były wysyłane w tym teście. Główna domena: zwykły panel 200, prywatne API bez sesji 401.

Aplikacja zainstalowana na Macu, podpis sprawdzony. Zachowano wybranego klienta i przygotowano lokalny szkic załączonej umowy z automatycznie rozpoznanym numerem. Publikacja następuje po kliknięciu „Dodaj umowę do panelu” przez operatora.
