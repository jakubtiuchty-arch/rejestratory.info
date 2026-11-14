'use client'

/**
 * Menu „Produkty” w nagłówku: kategorie, a w wybranej kategorii jej produkty.
 *
 * Komputer: rozwijany panel pod nagłówkiem. Lewa kolumna to kategorie (najechanie,
 * fokus lub kliknięcie wybiera), prawa to produkty wybranej kategorii i link do
 * całej kategorii. Kategorie są przyciskami, nie linkami, żeby na ekranie dotykowym
 * pierwsze stuknięcie pokazało produkty zamiast od razu przenosić na stronę.
 * Telefon: w menu pod hamburgerem „Produkty” rozwija kategorie, a kategoria
 * swoje produkty (akordeon).
 *
 * Dane: `data/menu-produktow.ts`, generowane z kart (`scripts/menu-produktow.mjs`).
 */

import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Computer,
  FolderCheck,
  Keyboard,
  Laptop,
  Monitor,
  Printer,
  PrinterCheck,
  ReceiptText,
  ScanBarcode,
  ScrollText,
  Smartphone,
  Tablet,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { MENU_PRODUKTOW, type KategoriaMenu, type PolecanyMenu } from '@/data/menu-produktow'

/** Te same ikony co w kafelkach kategorii na stronie głównej. */
const IKONY: Record<string, LucideIcon> = {
  rejestratory: ScanBarcode,
  telefony: Smartphone,
  tablety: Tablet,
  laptopy: Laptop,
  'urzadzenia-wielofunkcyjne': PrinterCheck,
  monitory: Monitor,
  'drukarki-do-rejestratora': ScrollText,
  'drukarki-laserowe': Printer,
  'all-in-one': Computer,
  ezd: FolderCheck,
  'urzadzenia-fiskalne': ReceiptText,
  'akcesoria-komputerowe': Keyboard,
  wideokonferencje: Video,
}

const ikona = (slug: string) => IKONY[slug] ?? Monitor

/** 1 produkt, 2–4 produkty (bez 12–14), 5+ produktów. */
export const ileProduktow = (n: number) => {
  const d = n % 10
  const s = n % 100
  if (n === 1) return '1 produkt'
  if (d >= 2 && d <= 4 && !(s >= 12 && s <= 14)) return `${n} produkty`
  return `${n} produktów`
}

/** Bez `toLocaleString` — Node z okrojonym ICU gubi spację tysięczną (jak w ProductPage). */
const zloty = (kwota: number) => {
  const [calosc, grosze] = kwota.toFixed(2).split('.')
  return `${calosc.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')},${grosze} zł`
}

/**
 * Karta „Polecany produkt” po prawej stronie listy produktów (wzór: menu x-kom).
 * Cała karta jest linkiem do produktu. Cena to najniższa cena netto ze składnic.
 */
function KartaPolecana({ p }: { p: PolecanyMenu }) {
  return (
    <a
      href={p.href}
      className="group relative hidden min-h-[22rem] min-w-0 flex-1 gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-stone-50 via-white to-emerald-50/70 p-6 ring-1 ring-gray-100 transition-shadow hover:shadow-md hover:ring-emerald-200 lg:flex"
    >
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <p className="text-sm font-semibold text-gray-500">Polecany produkt</p>
        <p className="mt-5 text-2xl font-bold tracking-tight text-gray-900">{p.name}</p>
        {p.opis && <p className="mt-1 text-sm text-gray-600">{p.opis}</p>}
        <ul className="mt-5 space-y-1.5 text-sm leading-snug text-gray-500">
          {p.cechy.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          {p.cenaOd !== null ? (
            <>
              <p className="text-sm text-gray-500">w składnicy od</p>
              <p className="whitespace-nowrap text-2xl font-semibold tabular-nums text-gray-900 xl:text-3xl">
                {zloty(p.cenaOd)}
                <span className="ml-1.5 text-sm font-normal text-gray-500">netto</span>
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-500">cena na zapytanie</p>
          )}
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-emerald-700">
            Zobacz produkt
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
      {/* zdjęcie we własnej kolumnie: duże, przechylone i przycięte dołem jak w x-kom,
          ale nie wchodzi na tekst przy węższym ekranie */}
      {p.image && (
        <div aria-hidden className="relative w-[38%] max-w-[13rem] shrink-0">
          <img
            src={p.image}
            alt=""
            className="pointer-events-none absolute -bottom-16 left-1/2 w-[92%] -translate-x-1/2 rotate-[8deg] drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[6deg]"
          />
        </div>
      )}
    </a>
  )
}

/* ───────────────────────────── komputer ───────────────────────────── */

export function MenuProduktowDesktop({ aktywny }: { aktywny: boolean }) {
  const [otwarte, setOtwarte] = React.useState(false)
  const [wybrana, setWybrana] = React.useState(MENU_PRODUKTOW[0]?.slug)
  const wezel = React.useRef<HTMLLIElement>(null)
  const przycisk = React.useRef<HTMLButtonElement>(null)
  const panelProduktow = React.useRef<HTMLDivElement>(null)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const kat: KategoriaMenu | undefined =
    MENU_PRODUKTOW.find((k) => k.slug === wybrana) ?? MENU_PRODUKTOW[0]

  const wyczysc = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }
  // krótkie opóźnienia: przejechanie kursorem przez nagłówek nie otwiera menu,
  // a zjechanie z „Produkty” na panel przez szczelinę go nie zamyka
  const otworzZaChwile = () => {
    wyczysc()
    timer.current = setTimeout(() => setOtwarte(true), 120)
  }
  const zamknijZaChwile = () => {
    wyczysc()
    timer.current = setTimeout(() => setOtwarte(false), 200)
  }
  React.useEffect(() => wyczysc, [])

  // Escape zamyka i wraca na przycisk, kliknięcie poza menu zamyka
  React.useEffect(() => {
    if (!otwarte) return
    const klawisz = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOtwarte(false)
        przycisk.current?.focus()
      }
    }
    const klik = (e: MouseEvent) => {
      if (!wezel.current?.contains(e.target as Node)) setOtwarte(false)
    }
    document.addEventListener('keydown', klawisz)
    document.addEventListener('mousedown', klik)
    return () => {
      document.removeEventListener('keydown', klawisz)
      document.removeEventListener('mousedown', klik)
    }
  }, [otwarte])

  // strzałki w kolumnie kategorii; w prawo / Enter przechodzi do produktów
  const naKlawiszKategorii = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const przyciski = Array.from(
      wezel.current?.querySelectorAll<HTMLButtonElement>('[data-kategoria]') ?? [],
    )
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const j = (i + (e.key === 'ArrowDown' ? 1 : -1) + przyciski.length) % przyciski.length
      przyciski[j]?.focus()
    } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
      e.preventDefault()
      panelProduktow.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    }
  }

  const kolorPrzycisku =
    aktywny || otwarte ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'

  return (
    <li ref={wezel} onMouseEnter={otworzZaChwile} onMouseLeave={zamknijZaChwile}>
      <button
        ref={przycisk}
        type="button"
        aria-haspopup="true"
        aria-expanded={otwarte}
        aria-controls="menu-produkty"
        onClick={() => {
          wyczysc()
          setOtwarte((o) => !o)
        }}
        className={`flex items-center gap-1 transition-colors ${kolorPrzycisku} ${aktywny ? 'font-semibold' : ''}`}
      >
        Produkty
        <ChevronDown
          aria-hidden
          className={`h-4 w-4 transition-transform duration-200 ${otwarte ? 'rotate-180' : ''}`}
        />
      </button>

      {/* bez animacji wyjścia: z AnimatePresence przezroczysty panel potrafił zostać
          w drzewie po zamknięciu i zasłaniać stronę przed kliknięciami */}
      {otwarte && kat && (
          <motion.div
            id="menu-produkty"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-x-0 top-full z-50"
          >
            <div className="container mx-auto px-4">
              <div
                className={`mx-auto flex max-h-[calc(100vh-5rem)] overflow-hidden rounded-b-2xl border border-t-0 border-gray-200 bg-white text-left shadow-xl ${
                  kat.polecany ? 'max-w-6xl' : 'max-w-5xl'
                }`}
              >
                {/* kategorie */}
                <div className="flex w-72 shrink-0 flex-col overflow-y-auto border-r border-gray-100 bg-gray-50 py-2">
                  <ul>
                    {MENU_PRODUKTOW.map((k, i) => {
                      const Ikona = ikona(k.slug)
                      const wybrany = k.slug === kat.slug
                      return (
                        <li key={k.slug}>
                          <button
                            type="button"
                            data-kategoria
                            aria-pressed={wybrany}
                            onMouseEnter={() => setWybrana(k.slug)}
                            onFocus={() => setWybrana(k.slug)}
                            onClick={() => setWybrana(k.slug)}
                            onKeyDown={(e) => naKlawiszKategorii(e, i)}
                            className={`relative flex w-full items-center gap-3 px-4 py-2 text-left text-[15px] transition-colors ${
                              wybrany
                                ? 'bg-white font-semibold text-emerald-700'
                                : 'text-gray-700 hover:bg-white hover:text-emerald-700'
                            }`}
                          >
                            {wybrany && (
                              <span aria-hidden className="absolute inset-y-1 left-0 w-1 rounded-r bg-emerald-600" />
                            )}
                            <Ikona aria-hidden className="h-5 w-5 shrink-0 text-emerald-600" strokeWidth={1.75} />
                            <span className="flex-1 leading-snug">{k.name}</span>
                            <span className="text-xs font-normal tabular-nums text-gray-400">{k.produkty.length}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                  <a
                    href="/#produkty"
                    className="mx-4 mt-2 border-t border-gray-200 pt-3 pb-1 text-sm text-gray-600 hover:text-emerald-700"
                  >
                    Wszystkie kategorie na stronie głównej
                  </a>
                </div>

                {/* produkty wybranej kategorii */}
                <div ref={panelProduktow} className="min-w-0 flex-1 overflow-y-auto p-6">
                  <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-gray-100 pb-3">
                    <p className="text-lg font-semibold text-gray-900">
                      {kat.name}
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        {ileProduktow(kat.produkty.length)}
                      </span>
                    </p>
                    <a
                      href={kat.href}
                      className="group flex shrink-0 items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                    >
                      Cała kategoria
                      <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                  <div className="flex gap-6">
                    {/* kolumny czytane z góry na dół, w kolejności ze strony kategorii;
                        przy polecanym produkcie lista ma jedną kolumnę, a obok stoi karta */}
                    <ul className={kat.polecany ? 'w-full lg:w-64 lg:shrink-0' : 'w-full gap-x-4 lg:columns-2'}>
                      {kat.produkty.map((p) => (
                        <li key={p.href} className="break-inside-avoid">
                          <a
                            href={p.href}
                            className={`block rounded-lg px-3 text-[15px] leading-snug transition-colors hover:bg-emerald-50 hover:text-emerald-700 focus-visible:bg-emerald-50 ${
                              kat.polecany ? 'py-1.5' : 'py-2'
                            } ${p.href === kat.polecany?.href ? 'font-semibold text-gray-900' : 'text-gray-700'}`}
                          >
                            {p.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                    {kat.polecany && <KartaPolecana p={kat.polecany} />}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
      )}
    </li>
  )
}

/* ───────────────────────────── telefon ───────────────────────────── */

export function MenuProduktowMobile({
  aktywny,
  onWybor,
}: {
  aktywny: boolean
  onWybor: () => void
}) {
  const [otwarte, setOtwarte] = React.useState(false)
  const [rozwinieta, setRozwinieta] = React.useState<string | null>(null)

  return (
    <li>
      <button
        type="button"
        aria-expanded={otwarte}
        onClick={() => setOtwarte((o) => !o)}
        className={`flex w-full items-center justify-between px-4 py-2 transition-colors ${
          aktywny
            ? 'bg-emerald-50 font-semibold text-emerald-600'
            : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
        }`}
      >
        Produkty
        <ChevronDown aria-hidden className={`h-5 w-5 transition-transform ${otwarte ? 'rotate-180' : ''}`} />
      </button>

      {otwarte && (
        <ul className="pb-2">
          {MENU_PRODUKTOW.map((k) => {
            const Ikona = ikona(k.slug)
            const rozwiniety = rozwinieta === k.slug
            return (
              <li key={k.slug}>
                <button
                  type="button"
                  aria-expanded={rozwiniety}
                  onClick={() => setRozwinieta(rozwiniety ? null : k.slug)}
                  className={`flex w-full items-center gap-3 py-2.5 pl-6 pr-4 text-left transition-colors ${
                    rozwiniety ? 'font-semibold text-emerald-700' : 'text-gray-700 hover:text-emerald-700'
                  }`}
                >
                  <Ikona aria-hidden className="h-5 w-5 shrink-0 text-emerald-600" strokeWidth={1.75} />
                  <span className="flex-1">{k.name}</span>
                  <span className="text-xs font-normal tabular-nums text-gray-400">{k.produkty.length}</span>
                  <ChevronRight
                    aria-hidden
                    className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${rozwiniety ? 'rotate-90' : ''}`}
                  />
                </button>
                {rozwiniety && (
                  <ul className="mb-2 ml-[2.1rem] border-l-2 border-emerald-100">
                    <li>
                      <a
                        href={k.href}
                        onClick={onWybor}
                        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-emerald-700"
                      >
                        Cała kategoria
                        <ArrowRight aria-hidden className="h-4 w-4" />
                      </a>
                    </li>
                    {k.produkty.map((p) => (
                      <li key={p.href}>
                        <a
                          href={p.href}
                          onClick={onWybor}
                          className="block px-4 py-2 text-[15px] text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          {p.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}
