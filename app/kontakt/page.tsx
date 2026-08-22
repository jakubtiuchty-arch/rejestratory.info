'use client'

/**
 * Strona kontaktu.
 *
 * NN/g: użytkownicy oczekują na stronie kontaktu adresu, telefonu i e-maila —
 * nie wolno chować ich za formularzem. Stąd dane firmy i trzy działy jako tekst
 * (z klikalnymi numerami), a formularz dopiero pod nimi jako jeden z kanałów,
 * nie jedyny. Układ dwukolumnowy (treść + formularz) to konwencja stron B2B.
 * Formularz trzyma się wytycznych GOV.UK: etykiety nad polami, pola
 * nieobowiązkowe oznaczone słowem, a nie gwiazdką przy obowiązkowych.
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ICON, naCiemnym } from '@/components/product/icons'

const DZIALY = [
  {
    icon: ICON.zamowienie,
    nazwa: 'Dział handlowy',
    zakres: 'Zapytania ofertowe, wyceny, przetargi, dobór sprzętu.',
    telefon: '607 819 688',
    telHref: 'tel:+48607819688',
    mail: 'handlowy@takma.com.pl',
  },
  {
    icon: ICON.naprawa,
    nazwa: 'Serwis',
    zakres: 'Zgłoszenia napraw, status naprawy, gwarancje, kontrakty serwisowe.',
    telefon: '601 619 898',
    telHref: 'tel:+48601619898',
    mail: 'serwis@takma.com.pl',
  },
  {
    icon: ICON.paragon,
    nazwa: 'Urządzenia fiskalne',
    zakres: 'Kasy i drukarki fiskalne, fiskalizacja, przeglądy ustawowe.',
    telefon: '607 778 977',
    telHref: 'tel:+48607778977',
    mail: 'fiskalne@takma.com.pl',
  },
]

const TEMATY = [
  ['general', 'Pytanie ogólne'],
  ['sales', 'Oferta lub wycena'],
  ['service', 'Serwis i naprawa'],
  ['fiscal', 'Urządzenia fiskalne'],
  ['other', 'Inna sprawa'],
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

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    department: 'general',
    message: '',
    website: '', // honeypot — ukryte przed ludźmi, boty je wypełniają
  })

  const zmien = (pole: string, wartosc: string) =>
    setFormData((d) => ({ ...d, [pole]: wartosc }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Błąd wysyłania formularza')
      setFormState('success')
      setTimeout(() => {
        setFormState('idle')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          department: 'general',
          message: '',
          website: '',
        })
      }, 6000)
    } catch (error) {
      console.error('Error:', error)
      setFormState('error')
      setTimeout(() => setFormState('idle'), 6000)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header activeTab="kontakt" />

      {/* ------------------------------------------------------------------ */}
      {/*  Nagłówek — dane firmy widoczne od razu, nie za formularzem        */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-stone-200 bg-white">
        <div className="container mx-auto px-4 pb-16 pt-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
                Kontakt
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
                Napisz albo zadzwoń
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-600">
                Dostarczamy i serwisujemy sprzęt IT dla Lasów Państwowych. Numery poniżej
                prowadzą prosto do osób, które zajmują się daną sprawą — bez centrali
                i przełączania.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#wiadomosc"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Napisz wiadomość
                  <img src={naCiemnym(ICON.strzalka)} alt="" className="h-4 w-4" />
                </a>
                <a
                  href="/serwis"
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-300 px-6 py-3.5 font-semibold text-stone-700 transition hover:border-stone-400"
                >
                  Zgłoś usterkę sprzętu
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex h-full flex-col rounded-2xl border border-stone-200 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">
                  Dane firmy
                </p>
                <p className="mt-3 text-lg font-semibold text-stone-900">TAKMA Tadeusz Tiuchty</p>
                <p className="text-sm text-stone-600">Centrum Systemów Mobilnych</p>

                <dl className="mt-5 divide-y divide-stone-100">
                  <div className="flex items-start gap-3 py-3.5">
                    <img
                      src={ICON.lokalizacja}
                      alt=""
                      className="mt-0.5 h-5 w-5 shrink-0 mix-blend-multiply"
                    />
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-stone-400">Adres</dt>
                      <dd className="font-medium text-stone-900">
                        ul. Poświęcka 1a
                        <br />
                        51-128 Wrocław
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 py-3.5">
                    <img
                      src={ICON.dokumenty}
                      alt=""
                      className="mt-0.5 h-5 w-5 shrink-0 mix-blend-multiply"
                    />
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-stone-400">NIP</dt>
                      <dd className="font-mono font-medium text-stone-900">915-100-43-77</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 py-3.5">
                    <img
                      src={ICON.zegar}
                      alt=""
                      className="mt-0.5 h-5 w-5 shrink-0 mix-blend-multiply"
                    />
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-stone-400">
                        Godziny pracy
                      </dt>
                      <dd className="font-medium text-stone-900">pon.–pt. 7:30–15:30</dd>
                    </div>
                  </div>
                </dl>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Po%C5%9Bwi%C4%99cka+1a+51-128+Wroc%C5%82aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 border-t border-stone-200 pt-5 text-sm font-semibold text-emerald-700 hover:underline"
                >
                  Otwórz w Mapach Google
                  <img src={ICON.strzalkaUkos} alt="" className="h-4 w-4 mix-blend-multiply" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Trzy działy — kierowanie sprawy od razu do właściwej osoby        */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-stone-200 bg-stone-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
              Kto się tym zajmuje
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
              Trzy numery, trzy sprawy
            </h2>
            <p className="mt-3 text-stone-600">
              Sprawę załatwia osoba, która ją prowadzi. Telefony odbieramy w godzinach pracy
              biura, na maile odpowiadamy w ciągu jednego dnia roboczego. Jeśli nie wiadomo,
              do kogo zadzwonić — wystarczy formularz niżej, sami skierujemy zgłoszenie.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {DZIALY.map((d) => (
              <div
                key={d.nazwa}
                className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <img src={d.icon} alt="" className="h-8 w-8 mix-blend-multiply" />
                <h3 className="mt-5 text-lg font-semibold text-stone-900">{d.nazwa}</h3>
                <p className="mb-5 mt-2 text-sm leading-relaxed text-stone-600">{d.zakres}</p>

                <dl className="mt-auto divide-y divide-stone-100 border-t border-stone-100 pt-1">
                  <div className="flex items-center gap-3 py-3">
                    <img
                      src={ICON.telefon}
                      alt=""
                      className="h-5 w-5 shrink-0 mix-blend-multiply"
                    />
                    <div>
                      <dt className="sr-only">Telefon</dt>
                      <dd>
                        <a
                          href={d.telHref}
                          className="text-lg font-semibold text-emerald-700 hover:underline"
                        >
                          {d.telefon}
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 py-3">
                    <img
                      src={ICON.koperta}
                      alt=""
                      className="h-5 w-5 shrink-0 mix-blend-multiply"
                    />
                    <div className="min-w-0">
                      <dt className="sr-only">E-mail</dt>
                      <dd className="truncate">
                        <a
                          href={`mailto:${d.mail}`}
                          className="font-medium text-emerald-700 hover:underline"
                        >
                          {d.mail}
                        </a>
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Formularz                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section id="wiadomosc" className="scroll-mt-8 border-b border-stone-200 bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
              Formularz
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
              Napisz wiadomość
            </h2>
            <p className="mt-3 text-stone-600">
              Wiadomość trafia do wybranego działu. Odpowiadamy w ciągu jednego dnia roboczego.
              Wszystkie pola są wymagane, chyba że zaznaczono inaczej.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-white">
                    <img src={ICON.ptaszek} alt="" className="h-6 w-6 mix-blend-multiply" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">Wiadomość wysłana</h3>
                    <p className="mt-2 leading-relaxed text-stone-700">
                      Trafiła do wybranego działu — odpowiemy w ciągu jednego dnia roboczego.
                      Jeśli sprawa jest pilna, najszybciej załatwimy ją telefonicznie: numery są
                      wyżej.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : formState === 'error' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-stone-300 bg-stone-50 p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-300 bg-white">
                    <img src={ICON.ostrzezenie} alt="" className="h-6 w-6 mix-blend-multiply" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">
                      Nie udało się wysłać wiadomości
                    </h3>
                    <p className="mt-2 leading-relaxed text-stone-700">
                      Spróbuj ponownie za chwilę albo zadzwoń:{' '}
                      <a
                        href="tel:+48607819688"
                        className="font-semibold text-emerald-700 hover:underline"
                      >
                        607 819 688
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-7 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
                  {/* honeypot */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      opacity: 0,
                      height: 0,
                      overflow: 'hidden',
                    }}
                  >
                    <label htmlFor="website">Website (nie wypełniaj tego pola)</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={(e) => zmien('website', e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <div className="min-w-[12rem] flex-1">
                      <Etykieta htmlFor="imie">Imię i nazwisko</Etykieta>
                      <input
                        id="imie"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => zmien('name', e.target.value)}
                        className={`mt-2 ${POLE}`}
                      />
                    </div>
                    <div className="min-w-[12rem] flex-1">
                      <Etykieta htmlFor="jednostka" opcjonalne>
                        Nadleśnictwo lub firma
                      </Etykieta>
                      <input
                        id="jednostka"
                        type="text"
                        value={formData.company}
                        onChange={(e) => zmien('company', e.target.value)}
                        className={`mt-2 ${POLE}`}
                        placeholder="np. Nadleśnictwo Miłomłyn"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-end gap-6">
                    <div className="w-[12rem]">
                      <Etykieta htmlFor="tel" opcjonalne>
                        Telefon
                      </Etykieta>
                      <input
                        id="tel"
                        type="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => zmien('phone', e.target.value)}
                        className={`mt-2 ${POLE}`}
                      />
                    </div>
                    <div className="min-w-[14rem] flex-1">
                      <Etykieta htmlFor="mail">E-mail</Etykieta>
                      <input
                        id="mail"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => zmien('email', e.target.value)}
                        className={`mt-2 ${POLE}`}
                        placeholder="na ten adres odpiszemy"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-end gap-6">
                    <div className="min-w-[13rem] flex-1">
                      <Etykieta htmlFor="temat">Temat</Etykieta>
                      <input
                        id="temat"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => zmien('subject', e.target.value)}
                        className={`mt-2 ${POLE}`}
                        placeholder="np. wycena rejestratorów"
                      />
                    </div>
                    <div className="w-[15rem]">
                      <Etykieta htmlFor="dzial">Do kogo</Etykieta>
                      <select
                        id="dzial"
                        value={formData.department}
                        onChange={(e) => zmien('department', e.target.value)}
                        className={`mt-2 ${POLE}`}
                      >
                        {TEMATY.map(([v, l]) => (
                          <option key={v} value={v}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Etykieta
                      htmlFor="tresc"
                      hint="Im więcej szczegółów, tym krótsza wymiana maili — model urządzenia, liczba sztuk, termin."
                    >
                      Wiadomość
                    </Etykieta>
                    <textarea
                      id="tresc"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => zmien('message', e.target.value)}
                      className={`mt-2 ${POLE}`}
                    />
                  </div>

                  <div className="border-t border-stone-200 pt-7">
                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-400 sm:w-auto"
                    >
                      {formState === 'submitting' ? 'Wysyłanie…' : 'Wyślij wiadomość'}
                      {formState !== 'submitting' && <img src={naCiemnym(ICON.strzalka)} alt="" className="h-4 w-4" />}
                    </button>
                    <p className="mt-3 text-sm text-stone-500">
                      Sprawy serwisowe szybciej załatwia{' '}
                      <a href="/serwis" className="font-medium text-emerald-700 hover:underline">
                        formularz zgłoszenia usterki
                      </a>{' '}
                      — od razu pyta o numer seryjny i adres odbioru.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Mapa — adres jest też tekstem wyżej, mapa go tylko uzupełnia      */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-stone-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
                Jak do nas trafić
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
                Biuro i serwis we Wrocławiu
              </h2>
              <p className="mt-3 leading-relaxed text-stone-600">
                Pod tym adresem przyjmujemy sprzęt dostarczany osobiście. Przy odbiorze kurierem
                adres nie jest potrzebny — etykietę przewozową wysyłamy mailem.
              </p>
              <p className="mt-5 font-medium text-stone-900">
                ul. Poświęcka 1a
                <br />
                51-128 Wrocław
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Po%C5%9Bwi%C4%99cka+1a+51-128+Wroc%C5%82aw"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline"
              >
                Wyznacz trasę
                <img src={ICON.strzalkaUkos} alt="" className="h-4 w-4 mix-blend-multiply" />
              </a>
            </div>

            <div className="lg:col-span-8">
              <div className="h-[420px] overflow-hidden rounded-2xl border border-stone-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2502.460744765366!2d17.029628030923618!3d51.15529464901004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fe97f5f92b64b%3A0x934750315b0d622b!2zUG_Fm3dpxJlja2EgMUEsIDUxLTEyOCBXcm9jxYJhdw!5e0!3m2!1spl!2spl!4v1762107458606!5m2!1spl!2spl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa dojazdu — TAKMA, ul. Poświęcka 1a, 51-128 Wrocław"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
