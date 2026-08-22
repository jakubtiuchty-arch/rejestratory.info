'use client'

/**
 * Strona serwisu — zbudowana jak „start page” z GOV.UK Service Manual: najpierw
 * tyle informacji, żeby leśniczy wiedział, czy trafił dobrze i co przygotować,
 * dopiero potem formularz. Formularz trzyma się wytycznych GOV.UK: pola pogrupowane
 * w sekcje z legendą, pytania zamknięte, pola nieobowiązkowe oznaczone słowem
 * „(opcjonalnie)” zamiast gwiazdek przy obowiązkowych. Warstwa wizualna ta sama,
 * co na kartach produktu.
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Wdrozenie } from '@/components/product/ProductPage'
import { ICON, naCiemnym } from '@/components/product/icons'

const PROCES = {
  label: 'Od zgłoszenia do sprawnego sprzętu',
  heading: 'Jak wygląda naprawa',
  navLabel: 'Proces',
  lead:
    'Pięć kroków od zgłoszenia do odesłania sprawnego urządzenia. Transport w obie strony organizujemy my.',
  steps: [
    { icon: ICON.formularz, title: 'Zgłoszenie', note: 'formularz albo telefon' },
    { icon: ICON.kurier, title: 'Odbiór', note: 'kurier zabiera sprzęt spod adresu' },
    { icon: ICON.diagnoza, title: 'Diagnoza', note: 'ustalamy, co się zepsuło' },
    { icon: ICON.wycena, title: 'Wycena', note: 'czekamy na Państwa akceptację' },
    { icon: ICON.naprawa, title: 'Naprawa', note: 'i odesłanie sprawnego urządzenia' },
  ],
}

const TYPY_URZADZEN = [
  ['rejestrator', 'Rejestrator'],
  ['telefon', 'Telefon'],
  ['laptop', 'Laptop'],
  ['drukarka-laserowa', 'Drukarka laserowa'],
  ['urzadzenie-wielofunkcyjne', 'Urządzenie wielofunkcyjne'],
  ['drukarka-termiczna', 'Drukarka termiczna'],
  ['urzadzenie-fiskalne', 'Urządzenie fiskalne'],
  ['inny', 'Inne urządzenie'],
]

const POLE =
  'w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'

const Etykieta = ({
  htmlFor,
  children,
  hint,
  opcjonalne,
}: {
  htmlFor: string
  children: React.ReactNode
  hint?: string
  opcjonalne?: boolean
}) => (
  <>
    <label htmlFor={htmlFor} className="block font-medium text-stone-900">
      {children}
      {opcjonalne && <span className="font-normal text-stone-500"> (opcjonalnie)</span>}
    </label>
    {hint && <p className="mt-1 text-sm text-stone-500">{hint}</p>}
  </>
)

const Sekcja = ({ tytul, children }: { tytul: string; children: React.ReactNode }) => (
  <fieldset className="border-t border-stone-200 pt-7">
    <legend className="float-left w-full pb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
      {tytul}
    </legend>
    <div className="clear-both space-y-6">{children}</div>
  </fieldset>
)

export default function ServicePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    forestDistrict: '',
    address: '',
    phone: '',
    email: '',
    deviceType: '',
    otherDevice: '',
    serialNumber: '',
    hasContract: '',
    courierPickup: '',
    problemDescription: '',
  })
  const [showLightbox, setShowLightbox] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [zamontowane, setZamontowane] = useState(false)

  React.useEffect(() => setZamontowane(true), [])

  const zmien = (pole: string, wartosc: string) =>
    setFormData((d) => ({ ...d, [pole]: wartosc }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Błąd wysyłania formularza')
      setIsSubmitting(false)
      setShowLightbox(true)
      const wybor = formData.courierPickup
      setFormData({
        firstName: '',
        lastName: '',
        forestDistrict: '',
        address: '',
        phone: '',
        email: '',
        deviceType: '',
        otherDevice: '',
        serialNumber: '',
        hasContract: '',
        courierPickup: wybor,
        problemDescription: '',
      })
    } catch (error) {
      console.error('Error:', error)
      alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.')
      setIsSubmitting(false)
    }
  }

  const kurier = formData.courierPickup === 'tak'

  return (
    <div className="min-h-screen bg-stone-50">
      <Header activeTab="serwis" />

      {/* ------------------------------------------------------------------ */}
      {/*  Wstęp — czym jest ta usługa i co przygotować przed zgłoszeniem     */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-stone-200 bg-white">
        <div className="container mx-auto px-4 pb-16 pt-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
                Serwis i naprawa
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
                Urządzenie nie działa?
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-600">
                Naprawiamy sprzęt dostarczony do nadleśnictw — rejestratory, telefony,
                drukarki, laptopy i urządzenia fiskalne. Zgłoszenie zajmuje kilka minut,
                a kurier odbiera sprzęt spod wskazanego adresu.
              </p>

              <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">
                  Co przygotować
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    'Numer seryjny urządzenia — zwykle na naklejce pod baterią lub z tyłu obudowy.',
                    'Krótki opis usterki: co się dzieje, od kiedy i przy jakiej czynności.',
                    'Adres, spod którego kurier ma odebrać sprzęt.',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-stone-700">
                      <img
                        src={ICON.ptaszek}
                        alt=""
                        className="mt-0.5 h-4 w-4 shrink-0 mix-blend-multiply"
                      />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#zgloszenie"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Zgłoś usterkę
                  <img src={naCiemnym(ICON.strzalka)} alt="" className="h-4 w-4" />
                </a>
                <a
                  href="#proces"
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-300 px-6 py-3.5 font-semibold text-stone-700 transition hover:border-stone-400"
                >
                  Zobacz, jak to działa
                </a>
              </div>
            </div>

            {/* Kontakt bezpośredni — dla tych, którzy wolą zadzwonić.
                Karta rozciąga się na wysokość kolumny obok, żeby miała wspólną
                górną i dolną krawędź z treścią po lewej. */}
            <div className="lg:col-span-5">
              <div className="flex h-full flex-col rounded-2xl border border-stone-200 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">
                  Wolisz zadzwonić
                </p>
                <p className="mt-3 text-lg font-semibold text-stone-900">Krzysztof Wójcik</p>
                <p className="text-sm text-stone-600">Kierownik działu serwisu</p>

                <dl className="mt-5 divide-y divide-stone-100">
                  {[
                    { icon: ICON.telefon, k: 'Telefon', v: '601 619 898', href: 'tel:601619898' },
                    {
                      icon: ICON.koperta,
                      k: 'E-mail',
                      v: 'serwis@takma.com.pl',
                      href: 'mailto:serwis@takma.com.pl',
                    },
                    { icon: ICON.zegar, k: 'Godziny pracy', v: 'pon.–pt. 7:30–15:30' },
                  ].map((r) => (
                    <div key={r.k} className="flex items-start gap-3 py-3.5">
                      <img src={r.icon} alt="" className="mt-0.5 h-5 w-5 shrink-0 mix-blend-multiply" />
                      <div className="min-w-0">
                        <dt className="text-xs uppercase tracking-wide text-stone-400">{r.k}</dt>
                        <dd className="font-medium text-stone-900">
                          {r.href ? (
                            <a href={r.href} className="text-emerald-700 hover:underline">
                              {r.v}
                            </a>
                          ) : (
                            r.v
                          )}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <p className="mt-auto border-t border-stone-200 pt-5 text-sm leading-relaxed text-stone-600">
                  Poza godzinami pracy najszybciej dotrzemy do sprawy przez formularz niżej —
                  zgłoszenie czeka na nas rano.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Proces naprawy — ta sama oś, co na kartach produktu               */}
      {/* ------------------------------------------------------------------ */}
      <div id="proces">
        <Wdrozenie timeline={PROCES} />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*  Formularz zgłoszenia                                              */}
      {/* ------------------------------------------------------------------ */}
      <section id="zgloszenie" className="scroll-mt-8 border-b border-stone-200 bg-stone-50">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
              Formularz
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">Zgłoś usterkę</h2>
            <p className="mt-3 text-stone-600">
              Odpowiadamy w ciągu jednego dnia roboczego. Wszystkie pola są wymagane, chyba że
              zaznaczono inaczej.
            </p>
          </div>

          {/* Jedna kolumna — badania CXL: wypełnienie o ~15 s szybsze niż w układzie
              wielokolumnowym, bo wzrok idzie jedną ścieżką w dół. Szerokość pola
              podpowiada długość odpowiedzi (GOV.UK: text input). */}
          <div className="mx-auto mt-10 max-w-3xl">
            <form onSubmit={handleSubmit}>
              <div className="space-y-7 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
                <Sekcja tytul="Zgłaszający">
                  <div className="flex flex-wrap gap-6">
                    <div className="min-w-[10rem] flex-1">
                      <Etykieta htmlFor="imie">Imię</Etykieta>
                      <input
                        id="imie"
                        type="text"
                        required
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={(e) => zmien('firstName', e.target.value)}
                        className={`mt-2 ${POLE}`}
                      />
                    </div>
                    <div className="min-w-[10rem] flex-1">
                      <Etykieta htmlFor="nazwisko">Nazwisko</Etykieta>
                      <input
                        id="nazwisko"
                        type="text"
                        required
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={(e) => zmien('lastName', e.target.value)}
                        className={`mt-2 ${POLE}`}
                      />
                    </div>
                  </div>

                  <div className="max-w-sm">
                    <Etykieta htmlFor="nadlesnictwo">Nadleśnictwo</Etykieta>
                    <input
                      id="nadlesnictwo"
                      type="text"
                      required
                      value={formData.forestDistrict}
                      onChange={(e) => zmien('forestDistrict', e.target.value)}
                      className={`mt-2 ${POLE}`}
                      placeholder="np. Miłomłyn"
                    />
                  </div>

                  <div className="flex flex-wrap items-end gap-6">
                    <div className="w-[12rem]">
                      <Etykieta htmlFor="telefon">Telefon</Etykieta>
                      <input
                        id="telefon"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => zmien('phone', e.target.value)}
                        className={`mt-2 ${POLE}`}
                      />
                    </div>
                    <div className="min-w-[14rem] flex-1">
                      <Etykieta htmlFor="email">E-mail</Etykieta>
                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => zmien('email', e.target.value)}
                        className={`mt-2 ${POLE}`}
                        placeholder="na ten adres wyślemy etykietę"
                      />
                    </div>
                  </div>

                  <div>
                    <Etykieta htmlFor="adres" hint="Ulica, numer, kod pocztowy i miejscowość.">
                      Adres odbioru
                    </Etykieta>
                    <input
                      id="adres"
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => zmien('address', e.target.value)}
                      className={`mt-2 ${POLE}`}
                      placeholder="ul. Leśna 1, 14-140 Miłomłyn"
                    />
                  </div>
                </Sekcja>

                <Sekcja tytul="Urządzenie i usterka">
                  <div className="flex flex-wrap items-end gap-6">
                  <div className="min-w-[13rem] flex-1">
                    <Etykieta htmlFor="typ">Rodzaj urządzenia</Etykieta>
                    <select
                      id="typ"
                      required
                      value={formData.deviceType}
                      onChange={(e) => {
                        zmien('deviceType', e.target.value)
                        zmien('otherDevice', '')
                      }}
                      className={`mt-2 ${POLE}`}
                    >
                      <option value="">Wybierz z listy</option>
                      {TYPY_URZADZEN.map(([v, l]) => (
                        <option key={v} value={v}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>

                  <AnimatePresence>
                    {formData.deviceType === 'inny' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="max-w-sm"
                      >
                        <Etykieta htmlFor="inne">Jakie to urządzenie?</Etykieta>
                        <input
                          id="inne"
                          type="text"
                          required
                          value={formData.otherDevice}
                          onChange={(e) => zmien('otherDevice', e.target.value)}
                          className={`mt-2 ${POLE}`}
                          placeholder="np. skaner Epson DS-730n"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="w-[13rem]">
                    <Etykieta htmlFor="sn" opcjonalne>
                      Numer seryjny
                    </Etykieta>
                    <input
                      id="sn"
                      type="text"
                      value={formData.serialNumber}
                      onChange={(e) => zmien('serialNumber', e.target.value)}
                      className={`mt-2 ${POLE}`}
                      placeholder="z naklejki na obudowie"
                    />
                  </div>
                  </div>

                  <div>
                    <Etykieta
                      htmlFor="usterka"
                      hint="Co się dzieje, od kiedy i przy jakiej czynności. Im konkretniej, tym szybsza diagnoza."
                    >
                      Opis usterki
                    </Etykieta>
                    <textarea
                      id="usterka"
                      required
                      rows={4}
                      value={formData.problemDescription}
                      onChange={(e) => zmien('problemDescription', e.target.value)}
                      className={`mt-2 ${POLE}`}
                    />
                  </div>

                  <fieldset>
                    <legend className="font-medium text-stone-900">
                      Czy urządzenie jest na kontrakcie serwisowym?
                    </legend>
                    <p className="mt-1 text-sm text-stone-500">
                      Zgłoszenia na kontrakcie obsługujemy w pierwszej kolejności i bez wyceny.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {[
                        ['tak', 'Tak'],
                        ['nie', 'Nie wiem lub nie'],
                      ].map(([v, l]) => (
                        <label
                          key={v}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                            formData.hasContract === v
                              ? 'border-emerald-600 bg-emerald-50/60'
                              : 'border-stone-300 hover:border-stone-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name="kontrakt"
                            required
                            value={v}
                            checked={formData.hasContract === v}
                            onChange={(e) => zmien('hasContract', e.target.value)}
                            className="h-4 w-4 accent-emerald-600"
                          />
                          <span className="font-medium text-stone-900">{l}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </Sekcja>

                <Sekcja tytul="Odbiór sprzętu">
                  <fieldset>
                    <legend className="font-medium text-stone-900">
                      Jak sprzęt trafi do serwisu?
                    </legend>
                    <p className="mt-1 text-sm text-stone-500">
                      Przy odbiorze kurierem etykietę przewozową wysyłamy mailem — paczki nie
                      nadajesz samodzielnie.
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {[
                        ['tak', 'Odbiór kurierem', 'Kurier przyjeżdża pod wskazany adres.'],
                        ['nie', 'Dostarczę osobiście', 'Adres serwisu podamy po zgłoszeniu.'],
                      ].map(([v, l, opis]) => (
                        <label
                          key={v}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition ${
                            formData.courierPickup === v
                              ? 'border-emerald-600 bg-emerald-50/60'
                              : 'border-stone-300 hover:border-stone-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name="kurier"
                            required
                            value={v}
                            checked={formData.courierPickup === v}
                            onChange={(e) => zmien('courierPickup', e.target.value)}
                            className="mt-1 h-4 w-4 shrink-0 accent-emerald-600"
                          />
                          <span>
                            <span className="block font-medium text-stone-900">{l}</span>
                            <span className="block text-sm text-stone-600">{opis}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </Sekcja>

                <div className="border-t border-stone-200 pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-400 sm:w-auto"
                  >
                    {isSubmitting ? 'Wysyłanie…' : 'Wyślij zgłoszenie'}
                    {!isSubmitting && <img src={naCiemnym(ICON.strzalka)} alt="" className="h-4 w-4" />}
                  </button>
                  <p className="mt-3 text-sm text-stone-500">
                    Potwierdzenie przyjęcia zgłoszenia wyślemy na podany adres e-mail.
                  </p>
                </div>
              </div>
            </form>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Potwierdzenie po wysłaniu — portal, żeby nic go nie przycięło     */}
      {/* ------------------------------------------------------------------ */}
      {zamontowane &&
        createPortal(
          <AnimatePresence>
            {showLightbox && (
              <motion.div
                className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/50 p-4 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowLightbox(false)}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl shadow-stone-900/20"
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex shrink-0 items-start justify-between gap-4 px-6 pb-5 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50">
                        <img src={ICON.ptaszek} alt="" className="h-6 w-6 mix-blend-multiply" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight text-stone-900">
                          Zgłoszenie przyjęte
                        </h3>
                        <p className="mt-0.5 text-sm text-stone-600">
                          {kurier
                            ? 'Etykietę kurierską wyślemy mailem'
                            : 'Czekamy na przesyłkę'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowLightbox(false)}
                      aria-label="Zamknij"
                      className="rounded-full p-2 transition hover:bg-stone-100"
                    >
                      <img src={ICON.zamknij} alt="" className="h-5 w-5 mix-blend-multiply" />
                    </button>
                  </div>

                  <div className="bez-paska min-h-0 flex-1 space-y-5 overflow-y-auto px-6 pb-5">
                    {kurier ? (
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
                          Co teraz
                        </p>
                        <ol className="mt-3 space-y-2">
                          {[
                            [
                              'Zabezpiecz dane',
                              'Zrób kopię zapasową i wyloguj się z kont na urządzeniu.',
                            ],
                            [
                              'Zapakuj sprzęt',
                              'Najlepiej w oryginalne pudełko albo inne opakowanie z wypełnieniem.',
                            ],
                            [
                              'Wydrukuj etykietę z maila',
                              'Naklej ją na paczkę przed przyjazdem kuriera.',
                            ],
                            [
                              'Dołącz dowód zakupu',
                              'Jeśli go masz — przyspiesza rozpatrzenie gwarancji.',
                            ],
                            [
                              'Czekaj na kuriera',
                              'Skontaktuje się w ciągu 24 godzin. Paczki nie nadajesz.',
                            ],
                          ].map(([t, o], i) => (
                            <li
                              key={t}
                              className="flex items-start gap-3 rounded-xl border border-stone-200 px-4 py-3"
                            >
                              <span className="mt-0.5 font-mono text-[11px] tracking-[0.18em] text-stone-400">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span>
                                <span className="block font-medium text-stone-900">{t}</span>
                                <span className="block text-sm text-stone-600">{o}</span>
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">
                          Adres serwisu
                        </p>
                        <p className="mt-3 text-lg font-semibold text-stone-900">TAKMA Serwis</p>
                        <p className="text-stone-700">ul. Poświęcka 1a</p>
                        <p className="text-stone-700">51-128 Wrocław</p>
                        <p className="mt-3 text-sm text-stone-600">
                          Telefon:{' '}
                          <a href="tel:601619898" className="font-medium text-emerald-700 hover:underline">
                            601 619 898
                          </a>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-4 border-t border-stone-200 bg-stone-50 px-6 py-4">
                    <p className="text-sm text-stone-600">
                      Pytania? <span className="font-medium text-stone-900">601 619 898</span>
                    </p>
                    <button
                      onClick={() => setShowLightbox(false)}
                      className="rounded-xl bg-[#0A1B12] px-5 py-2.5 font-semibold text-white transition hover:bg-[#14301F]"
                    >
                      Rozumiem
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      <Footer />
    </div>
  )
}
