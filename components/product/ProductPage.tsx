'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { createPortal } from 'react-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContourTexture from '@/components/ContourTexture'
import CourierServiceSection from '@/components/CourierServiceSection'
import { useInquiry } from '@/components/InquiryContext'
import { ICON } from '@/components/product/icons'
import { ofertyDla, type OfertaSkladnicy as OfertaZUP } from '@/data/oferty'
import { SKLADNICE } from '@/data/skladnice'

/* -------------------------------------------------------------------------- */
/*  Dane karty produktu — jeden kształt dla wszystkich urządzeń               */
/* -------------------------------------------------------------------------- */

export type SpecGroup = { title: string; rows: { k: string; v: string }[] }
export type WhyCard = { icon: string; title: string; body: string }
export type Accessory = {
  id: string
  name: string
  description: string
  /** zdjęcie materiału — gdy podane, sekcja renderuje siatkę z miniaturami */
  image?: string
  /** wyróżniona wartość, np. wydajność w stronach */
  meta?: string
}
export type Highlight = { icon: string; label: string; value: string }
export type VariantGroup = { id: string; label: string; options: string[] }
export type RelatedProduct = { name: string; href: string; note: string }
/** Wyróżnik decyzyjny — cecha, która sama w sobie przesądza o wyborze modelu. */
export type Signature = {
  icon: string
  title: string
  body: string
  /** 'akcent' = jasny zielony (korzyść handlowa), 'ciemny' = leśny panel (wyróżnik techniczny) */
  tone?: 'akcent' | 'ciemny'
}

/** Krok wdrożenia — używane przez urządzenia fiskalne, gdzie zakup to proces, nie dostawa. */
export type TimelineStep = {
  icon: string
  title: string
  note?: string
  /** krok, przy którym pokazujemy przycisk otwierający listę dokumentów */
  documents?: boolean
}
export type Timeline = {
  steps: TimelineStep[]
  heading?: string
  label?: string
  navLabel?: string
  /** zdanie pod nagłówkiem — streszcza, ile kroków i czego dotyczą */
  lead?: string
  /** treść okna „Jakie dokumenty?” */
  documents?: { heading: string; intro: string; items: string[]; footer?: string }
}
/** Cennik z prowizjami — tylko urządzenia rozliczane abonamentowo (terminal płatniczy). */
export type Pricing = {
  heading?: string
  /** kwota główna — wyróżniona wielkością, żeby cennik miał punkt zaczepienia */
  main?: { k: string; v: string; unit?: string }
  rows?: { k: string; v: string }[]
  commissions?: { label: string; value: string }[]
  note?: string
}

export type ProductData = {
  /** slug używany w id pozycji zapytania, np. 'zebra-em45' */
  slug: string
  name: string
  category: string
  categoryHref: string
  /** zdjęcia galerii — pierwsze trafia też do zapytania */
  images: string[]
  /** krótki opis i skrót specyfikacji dodawane do koszyka zapytań */
  inquiry: { description: string; specifications: string }
  specGroups: SpecGroup[]
  why: WhyCard[]
  /** nagłówek sekcji argumentów — domyślnie „Dlaczego to urządzenie” */
  whyHeading?: string
  whyLabel?: string
  /** etykieta sekcji w nawigacji, np. „Dlaczego EM45” */
  whyNavLabel?: string
  accessories?: Accessory[]
  /** nagłówek sekcji akcesoriów, np. „Materiały eksploatacyjne” */
  accessoriesHeading?: string
  /** skrót 3–4 kluczowych parametrów tuż pod nazwą — wzorzec x-kom/Baymard */
  highlights?: Highlight[]
  /** numer katalogowy producenta, np. „A3358” */
  modelCode?: string
  /** konfiguracje do wyboru — trafiają do treści zapytania */
  variants?: VariantGroup[]
  /** karty pokrewne, np. druga generacja tego samego modelu */
  related?: RelatedProduct[]
  /** 1–2 wyróżniki decyzyjne pokazywane pod CTA */
  signature?: Signature[]
  /** sekcja „Pracuje już w nadleśnictwach” — nazwa modelu szukana w sprzedaży */
  usedBy?: { device: string; exclude?: string; heading?: string; label?: string }
  /** proces zakupu i wdrożenia — sekcja z animowaną osią kroków */
  timeline?: Timeline
  /** cennik urządzenia i prowizje od transakcji */
  pricing?: Pricing
  /** kontrakt serwisowy pokazywany w bloku serwisu, np. '3 lub 5 lat' */
  serviceContract?: string
  /** ukrywa blok serwisu kurierskiego — dla licencji i drobnych akcesoriów,
   *  których nikt nie odsyła kurierem do naprawy */
  hideService?: boolean
  /** opcjonalny baner dedykowanej strony produktu */
  microsite?: {
    href: string
    label: string
    heading: string
    body: string
    image?: string
  }
}

/**
 * Ikony w zestawie mają białe tło i ciemną kreskę — na leśnym panelu potrzebna
 * jest wersja odwrotna. `public/icons/white/**` to te same pliki z przezroczystym
 * tłem i białą kreską (filtry CSS odpadają: `opacity` na rodzicu izoluje blend).
 */
const naCiemnym = (src: string) => src.replace('/icons/', '/icons/white/')

/* -------------------------------------------------------------------------- */
/*  Tekstura poziomicowa — leśny akcent bez kiczu                             */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*  Galeria z lightboxem                                                      */
/* -------------------------------------------------------------------------- */

const Gallery = ({ images, name }: { images: string[]; name: string }) => {
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(false)
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoom, next, prev])

  return (
    <div className="flex h-full flex-col justify-start">
      <div className="group relative max-h-[560px] min-h-[340px] flex-1 overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-b from-white to-stone-100">
        <button
          type="button"
          onClick={() => setZoom(true)}
          className="absolute inset-0 flex cursor-zoom-in items-center justify-center"
          aria-label="Powiększ zdjęcie"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              alt={`${name} — zdjęcie ${index + 1}`}
              className="max-h-full w-full object-contain p-8"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        </button>

        <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/80 p-2 text-stone-500 shadow-sm backdrop-blur transition-opacity group-hover:text-emerald-700">
          <img src={ICON.lupa} alt="" className="h-4 w-4 mix-blend-multiply" />
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Poprzednie zdjęcie"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-stone-200 bg-white/90 p-2 text-stone-600 opacity-0 shadow-sm transition hover:text-emerald-700 group-hover:opacity-100"
        >
          <img src={ICON.chevronLewo} alt="" className="h-4 w-4 mix-blend-multiply" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Następne zdjęcie"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-stone-200 bg-white/90 p-2 text-stone-600 opacity-0 shadow-sm transition hover:text-emerald-700 group-hover:opacity-100"
        >
          <img src={ICON.chevronPrawo} alt="" className="h-4 w-4 mix-blend-multiply" />
        </button>
      </div>

      <div className="mt-3 grid shrink-0 grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Zdjęcie ${i + 1}`}
            className={`overflow-hidden rounded-xl border bg-white transition ${
              index === i
                ? 'border-emerald-600 ring-1 ring-emerald-600/30'
                : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            <img src={img} alt="" className="h-20 w-full object-contain p-2.5" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#06140E]/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
          >
            <motion.img
              key={images[index]}
              src={images[index]}
              alt={`${name} — powiększenie`}
              className="max-h-[85vh] max-w-4xl object-contain"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={() => setZoom(false)}
              aria-label="Zamknij"
              className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
            >
              <img src={ICON.zamknij} alt="" className="h-5 w-5 mix-blend-multiply" />
            </button>
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 font-mono text-xs text-white/70">
              <button type="button" onClick={(e) => { e.stopPropagation(); prev() }} className="rounded-full bg-white/10 p-2 hover:bg-white/20">
                <img src={ICON.chevronLewo} alt="" className="h-4 w-4 mix-blend-multiply" />
              </button>
              <span>
                {index + 1} / {images.length}
              </span>
              <button type="button" onClick={(e) => { e.stopPropagation(); next() }} className="rounded-full bg-white/10 p-2 hover:bg-white/20">
                <img src={ICON.chevronPrawo} alt="" className="h-4 w-4 mix-blend-multiply" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Akcesoria                                                                 */
/* -------------------------------------------------------------------------- */

const Accessories = ({
  items,
  productName,
  slug,
  image,
  heading,
}: {
  items: Accessory[]
  productName: string
  slug: string
  image: string
  heading?: string
}) => {
  const [selected, setSelected] = useState<string[]>([])
  const { addToInquiry, openCart } = useInquiry()

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const zeZdjeciami = items.some((a) => a.image)

  const addSelected = () => {
    selected.forEach((id) => {
      const acc = items.find((a) => a.id === id)
      if (!acc) return
      addToInquiry({
        id: `${slug}-accessory-${acc.id}`,
        name: `${productName} — ${acc.name}`,
        image: acc.image ?? image,
        category: 'Akcesoria',
        description: acc.description,
      })
    })
    setSelected([])
    openCart()
  }

  return (
    <section id="akcesoria" className="border-b border-stone-200 bg-white">
      <div className="container mx-auto px-4 py-10">
      <div className="overflow-hidden rounded-2xl border border-stone-200">
      <div className="flex items-center justify-between gap-3 border-b border-stone-100 bg-stone-50 px-5 py-3.5">
        <p className="text-sm font-semibold text-stone-900">
          {heading ?? 'Dobierz akcesoria do zapytania'}
        </p>
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.button
              type="button"
              onClick={addSelected}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
            >
              Dodaj ({selected.length})
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <ul
        className={
          zeZdjeciami
            ? 'grid grid-cols-2 gap-px bg-stone-100 sm:grid-cols-3 lg:grid-cols-6'
            : 'grid grid-cols-1 divide-y divide-stone-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4'
        }
      >
        {items.map((acc) => {
          const on = selected.includes(acc.id)
          return (
            <li key={acc.id} className={zeZdjeciami ? 'bg-white' : 'sm:border-r sm:border-stone-100 sm:last:border-r-0'}>
              <button
                type="button"
                onClick={() => toggle(acc.id)}
                aria-pressed={on}
                className={
                  zeZdjeciami
                    ? `flex h-full w-full flex-col items-center px-4 py-5 text-center transition ${
                        on ? 'bg-emerald-50/60' : 'hover:bg-stone-50'
                      }`
                    : `flex h-full w-full items-start gap-3 px-5 py-4 text-left transition ${
                        on ? 'bg-emerald-50/50' : 'hover:bg-stone-50'
                      }`
                }
              >
                {zeZdjeciami && acc.image && (
                  <img src={acc.image} alt="" className="mb-3 h-24 w-24 object-contain" />
                )}
                {!zeZdjeciami && (
                  /* ptaszek pokazujemy dopiero po zaznaczeniu — `text-transparent`
                     nie ukrywa obrazka, więc wcześniej każda pozycja wyglądała
                     na zaznaczoną */
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                      on ? 'border-emerald-600 bg-emerald-600' : 'border-stone-300 bg-white'
                    }`}
                  >
                    {on && (
                      <img src={naCiemnym(ICON.ptaszek)} alt="" className="h-3.5 w-3.5" />
                    )}
                  </span>
                )}
                <span className={zeZdjeciami ? 'flex flex-col items-center gap-1' : ''}>
                  <span className="block text-sm font-medium text-stone-900">{acc.name}</span>
                  {acc.meta && (
                    <span className="block font-mono text-xs text-emerald-700">{acc.meta}</span>
                  )}
                  <span className="block text-xs leading-relaxed text-stone-500">{acc.description}</span>
                  {zeZdjeciami && (
                    <span
                      className={`mt-2 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium transition ${
                        on
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-stone-300 text-stone-700'
                      }`}
                    >
                      {on ? 'W zapytaniu' : 'Dodaj'}
                    </span>
                  )}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Nadleśnictwa, które mają już to urządzenie                                */
/* -------------------------------------------------------------------------- */

const UsedBy = ({
  device,
  exclude,
  name,
  heading,
  label,
}: {
  device: string
  /** warianty do odsiania, np. „Dell Pro 16 Plus” przy karcie „Dell Pro 16” */
  exclude?: string
  /** pełna nazwa modelu — trafia do nagłówka, żeby nie było wątpliwości, czego dotyczy lista */
  name: string
  heading?: string
  label?: string
}) => {
  const [list, setList] = useState<string[] | null>(null)
  // tyle logotypów mieści się w jednym rzędzie bez zawijania na typowym ekranie
  const MAKS_W_RZEDZIE = 4

  useEffect(() => {
    let alive = true
    const zapytanie = `/api/uzytkownicy-sprzetu?device=${encodeURIComponent(device)}${
      exclude ? `&exclude=${encodeURIComponent(exclude)}` : ''
    }`
    fetch(zapytanie)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d?.nadlesnictwa) return
        const wszystkie: string[] = d.nadlesnictwa
        setList(wszystkie)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [device, exclude])

  if (!list || list.length === 0) return null

  const przewijaj = list.length > MAKS_W_RZEDZIE

  return (
    <section id="nadlesnictwa" className="border-t border-stone-200 bg-white">
      <div className="container mx-auto scroll-mt-16 px-4 py-14">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
            {label ?? 'Sprzęt w służbie leśnej'}
          </p>
          <h2 className="mt-2 whitespace-nowrap text-3xl font-bold tracking-tight text-stone-900">
            {heading ?? `${name} pracuje w nadleśnictwach:`}
          </h2>
        </div>

        {przewijaj ? (
          <div
            className="karuzela relative mt-8 overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            }}
          >
            <ul
              className="karuzela-tor"
              style={{ animationDuration: `${Math.max(24, list.length * 1.7)}s` }}
            >
              {[...list, ...list].map((n, i) => (
                <li
                  key={`${n}-${i}`}
                  aria-hidden={i >= list.length}
                  className="flex shrink-0 items-center gap-3 pr-12"
                >
                  <img
                    src="/lasy-panstwowe.png"
                    alt="Lasy Państwowe"
                    className="h-[52px] w-[52px] shrink-0"
                  />
                  <span className="whitespace-nowrap text-base font-bold leading-tight text-[#14532d]">
                    Nadleśnictwo {n}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-6">
            {list.map((n) => (
              <li key={n} className="flex items-center gap-3">
                <img
                  src="/lasy-panstwowe.png"
                  alt="Lasy Państwowe"
                  className="h-[52px] w-[52px] shrink-0"
                />
                <span className="text-base font-bold leading-tight text-[#14532d]">
                  Nadleśnictwo {n}
                </span>
              </li>
            ))}
          </ul>
        )}

      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Proces wdrożenia — oś kroków rysująca się przy wejściu w kadr             */
/* -------------------------------------------------------------------------- */

/**
 * Okno „Jakie dokumenty?”. Renderowane portalem do `body` — sekcja wdrożenia ma
 * `overflow-hidden` i przycinała warstwę `fixed`. Kolorystyka leśnego panelu,
 * żeby okno czytało się jako część tej sekcji, a nie wtręt z reszty karty.
 */
const DokumentyModal = ({
  open,
  onClose,
  tresc,
}: {
  open: boolean
  onClose: () => void
  tresc: NonNullable<Timeline['documents']>
}) => {
  const [zamontowane, setZamontowane] = useState(false)
  useEffect(() => setZamontowane(true), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!zamontowane) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0A1B12] shadow-2xl shadow-black/60"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ContourTexture className="text-[#A8F000]/[0.07]" />

            <div className="relative flex shrink-0 items-start justify-between gap-4 px-6 pb-5 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04]">
                  <img
                    src={naCiemnym('/icons/em45/line/formularz.png')}
                    alt=""
                    className="h-6 w-6"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">{tresc.heading}</h3>
                  <p className="mt-0.5 text-sm text-emerald-50/60">
                    Zgłoszenie do eService i Urzędu Skarbowego
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Zamknij"
                className="rounded-full p-2 transition hover:bg-white/10"
              >
                <img src={naCiemnym('/icons/line/zamknij.png')} alt="" className="h-5 w-5 opacity-70" />
              </button>
            </div>

            <div className="bez-paska relative min-h-0 flex-1 space-y-5 overflow-y-auto px-6 pb-5">
              <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-emerald-50/75">
                {tresc.intro}
              </p>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A8F000]">
                  Co przygotować
                </p>
                <ul className="mt-3 space-y-2">
                  {tresc.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-emerald-50/85"
                    >
                      <img
                        src={naCiemnym('/icons/line/ptaszek.png')}
                        alt=""
                        className="mt-0.5 h-4 w-4 shrink-0 opacity-80"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {tresc.footer && (
              <div className="relative shrink-0 border-t border-white/10 bg-white/[0.03] px-6 py-4">
                <p className="text-sm leading-relaxed text-emerald-50/65">{tresc.footer}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

/**
 * Pojedynczy krok osi. Zapala się, gdy pasek postępu do niego dojedzie —
 * postęp jest sterowany przewijaniem, więc czytelnik sam prowadzi opowieść.
 */
const Krok = ({
  krok,
  indeks,
  ile,
  postep,
  onDokumenty,
}: {
  krok: TimelineStep
  indeks: number
  ile: number
  postep: MotionValue<number>
  onDokumenty: () => void
}) => {
  const prog = ile > 1 ? indeks / (ile - 1) : 0
  // krok zapala się tuż przed dojazdem paska, żeby ruch wyprzedzał wzrok
  const zapal = useTransform(postep, [Math.max(prog - 0.12, 0), prog], [0, 1])
  const poswiata = useTransform(zapal, (v) => 0.55 * v)
  const uniesienie = useTransform(zapal, [0, 1], [10, 0])
  const skala = useTransform(zapal, [0, 1], [0.9, 1])

  return (
    <motion.li
      className="relative flex items-start gap-5 lg:flex-1 lg:flex-col lg:items-center lg:gap-0 lg:px-2 lg:text-center"
      style={{ opacity: useTransform(zapal, [0, 1], [0.35, 1]) }}
    >
      <div className="relative shrink-0">
        {/* poświata pod węzłem */}
        <motion.span
          aria-hidden
          className="absolute -inset-3 rounded-full bg-[#A8F000] blur-xl"
          style={{ opacity: useTransform(poswiata, (v) => v * 0.35) }}
        />
        <motion.span
          aria-hidden
          className="absolute -inset-1 rounded-full border border-[#A8F000]"
          style={{ opacity: poswiata, scale: useTransform(zapal, [0, 1], [1, 1.12]) }}
        />
        <motion.div
          className="relative flex h-14 w-14 items-center justify-center rounded-full border bg-white/[0.03] backdrop-blur-sm"
          style={{
            scale: skala,
            borderColor: useTransform(
              zapal,
              [0, 1],
              ['rgba(255,255,255,0.14)', 'rgba(168,240,0,0.75)']
            ),
          }}
        >
          <motion.img
            src={naCiemnym(krok.icon)}
            alt=""
            className="h-7 w-7"
            style={{ opacity: useTransform(zapal, [0, 1], [0.4, 1]) }}
          />
        </motion.div>
      </div>

      <motion.div className="min-w-0 pb-2 lg:pb-0" style={{ y: uniesienie }}>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#A8F000]/80 lg:mt-4">
          Krok {indeks + 1}
        </p>
        <h3 className="mt-1.5 font-semibold leading-snug text-white">{krok.title}</h3>
        {krok.note && <p className="mt-1 text-sm leading-snug text-emerald-50/60">{krok.note}</p>}
        {krok.documents && (
          <button
            type="button"
            onClick={onDokumenty}
            className="mt-3 rounded-lg border border-white/25 px-3 py-1.5 text-xs font-medium text-white/85 transition hover:border-[#A8F000]/70 hover:bg-white/5 hover:text-white"
          >
            Jakie dokumenty?
          </button>
        )}
      </motion.div>
    </motion.li>
  )
}

/** Oś procesu — używana na kartach urządzeń fiskalnych i na stronie /serwis. */
export const Wdrozenie = ({ timeline }: { timeline: Timeline }) => {
  const [dokumenty, setDokumenty] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  const kroki = timeline.steps
  // tor biegnie od środka pierwszej do środka ostatniej ikony
  const margines = `${50 / kroki.length}%`

  // Oś przejeżdża sama, gdy sekcja wejdzie w kadr — nie każdy przewinie niżej,
  // a proces ma się pokazać w całości bez żadnego udziału czytelnika.
  const postep = useMotionValue(0)
  const procent = useTransform(postep, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const bezRuchu = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const obserwator = new IntersectionObserver(
      (wpisy) => {
        if (!wpisy.some((w) => w.isIntersecting)) return
        obserwator.disconnect()
        if (bezRuchu) {
          postep.set(1)
          return
        }
        animate(postep, 1, {
          // równy rytm: każdy krok dostaje tyle samo czasu, żeby dało się przeczytać podpis
          duration: Math.min(kroki.length * 1.25, 9.5),
          ease: 'linear',
          delay: 0.4,
        })
      },
      { threshold: 0.2 }
    )
    obserwator.observe(el)
    return () => obserwator.disconnect()
  }, [postep, kroki.length])

  return (
    <section id="wdrozenie" className="relative isolate scroll-mt-16 overflow-hidden bg-[#0A1B12]">
      <ContourTexture className="text-[#A8F000]/[0.07]" />

      <div className="container relative mx-auto px-4 py-20" ref={ref}>
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A8F000]">
            {timeline.label ?? 'Od zamówienia do pierwszego paragonu'}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {timeline.heading ?? 'Proces zakupu i wdrożenia'}
          </h2>
          {timeline.lead && <p className="mt-3 text-emerald-50/60">{timeline.lead}</p>}
        </div>

        <div className="relative mt-14">
          {/* tor poziomy — szerokie ekrany */}
          <div
            className="pointer-events-none absolute top-7 hidden lg:block"
            style={{ left: margines, right: margines }}
          >
            <div className="h-[2px] w-full rounded-full bg-white/10" />
            <motion.div
              className="absolute inset-y-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 to-[#A8F000] shadow-[0_0_14px_rgba(168,240,0,0.4)]"
              style={{ width: procent }}
            />
            <motion.span
              className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A8F000] shadow-[0_0_18px_6px_rgba(168,240,0,0.45)]"
              style={{ left: procent, opacity: useTransform(postep, [0, 0.02, 0.99, 1], [0, 1, 1, 0]) }}
            />
          </div>

          {/* tor pionowy — telefon i tablet */}
          <div className="pointer-events-none absolute bottom-7 left-7 top-7 w-[2px] lg:hidden">
            <div className="h-full w-[2px] rounded-full bg-white/10" />
            <motion.div
              className="absolute inset-x-0 top-0 w-[2px] origin-top rounded-full bg-gradient-to-b from-emerald-400 to-[#A8F000] shadow-[0_0_14px_rgba(168,240,0,0.4)]"
              style={{ height: procent }}
            />
          </div>

          <ol className="relative flex flex-col gap-10 lg:flex-row lg:gap-0">
            {kroki.map((krok, i) => (
              <Krok
                key={krok.title}
                krok={krok}
                indeks={i}
                ile={kroki.length}
                postep={postep}
                onDokumenty={() => setDokumenty(true)}
              />
            ))}
          </ol>
        </div>
      </div>

      {timeline.documents && (
        <DokumentyModal
          open={dokumenty}
          onClose={() => setDokumenty(false)}
          tresc={timeline.documents}
        />
      )}
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Ceny w składnicach — osobna sekcja na pełną szerokość                     */
/* -------------------------------------------------------------------------- */

const VAT = 0.23

/**
 * Formatowanie bez `toLocaleString` — Node na serwerze bywa zbudowany
 * z okrojonym ICU i gubi wtedy spację tysięczną, co dawało „2563,00 zł”
 * w HTML i inny wynik po hydracji.
 */
const zloty = (kwota: number) => {
  const [calosc, grosze] = kwota.toFixed(2).split('.')
  const zGrupami = calosc.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `${zGrupami},${grosze} zł`
}

const kluczPozycji = (nazwa: string) =>
  nazwa.toLowerCase().replace(/[\s\-_.+,]/g, '').slice(0, 40)

/**
 * Ceny ze składnic.
 *
 * NN/g: cena to potrzeba informacyjna numer jeden, także w zakupach służbowych,
 * a jej ukrywanie odbierane jest jako wymijanie. Kwoty pochodzą z oficjalnych
 * ofert składnic, więc podajemy je wprost — netto dla LP, jak w dokumencie.
 *
 * Ten sam model bywa w kilku składnicach po różnych cenach, dlatego układ jest
 * tabelą: wiersz to pozycja z oferty, kolumna to składnica, a najniższa cena
 * w wierszu jest wyróżniona. Przy jednej składnicy tabela degeneruje się do
 * czytelnych dwóch kolumn.
 *
 * Terminów ważności nie pokazujemy — leśnika interesuje kwota, nie data ważności
 * druku, a „obowiązuje do…” tylko zaśmieca tabelę. Aktualność pilnuje cron
 * `/api/cron/kontrola-ofert`: w dniu wygaśnięcia zgłasza ofertę do sprawdzenia,
 * a my ją wtedy odświeżamy albo usuwamy z danych.
 */
const CenySkladnic = ({ oferty: wejscie, nazwa }: { oferty: OfertaZUP[]; nazwa: string }) => {
  // kolumny od najtańszej — tabela ma wprost odpowiadać na pytanie „gdzie taniej”
  const oferty = [...wejscie].sort((a, b) => a.urzadzenie.cenaNetto - b.urzadzenie.cenaNetto)

  // wiersze tabeli: urządzenie na górze, potem pozycje dodatkowe w kolejności
  // z pierwszego druku, dołączając te, które ma tylko któraś ze składnic
  const wiersze: { klucz: string; nazwa: string; glowna?: boolean }[] = [
    { klucz: '__urzadzenie', nazwa, glowna: true },
  ]
  for (const o of oferty) {
    for (const d of o.dodatki) {
      const k = kluczPozycji(d.nazwa)
      if (!wiersze.some((w) => w.klucz === k)) wiersze.push({ klucz: k, nazwa: d.nazwa })
    }
  }

  const cena = (o: OfertaZUP, klucz: string) => {
    if (klucz === '__urzadzenie') return o.urzadzenie
    return o.dodatki.find((d) => kluczPozycji(d.nazwa) === klucz) ?? null
  }

  // Druk wskazuje, kto odpowiada za dostawę i serwis — nie zawsze TAKMA (przy
  // Dellach bez systemu i Galaxy A36 jest to SCANTER). Nazwę podajemy tylko
  // wtedy, gdy wszystkie oferty na ten model mówią to samo; przy rozbieżności
  // albo braku informacji zdanie się urywa, zamiast zgadywać.
  const dostawcy = new Set(oferty.map((o) => o.dostawca ?? null))
  const dostawca = dostawcy.size === 1 ? [...dostawcy][0] : null

  // to samo urządzenie w różnych składnicach ma ten sam zestaw; bierzemy
  // pierwszy niepusty, żeby nie powtarzać tej samej listy w każdej kolumnie
  const wZestawie = oferty.map((o) => o.urzadzenie.wZestawie ?? []).find((x) => x.length) ?? []

  // „najtaniej” ma sens tylko wtedy, gdy któraś składnica jest realnie tańsza —
  // przy jednakowych kwotach oznaczenie przy każdej kolumnie niczego nie mówi
  const najtansza = (klucz: string) => {
    const kwoty = oferty.map((o) => cena(o, klucz)?.cenaNetto).filter((k): k is number => !!k)
    return new Set(kwoty).size > 1 ? Math.min(...kwoty) : null
  }

  return (
    <section id="ceny" className="scroll-mt-16 border-b border-stone-200 bg-white">
      <div className="container mx-auto px-4 py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
              {oferty.length > 1 ? 'Ceny w składnicach' : 'Cena w składnicy'}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
              {oferty.length > 1
                ? `${nazwa} w ${oferty.length} składnicach`
                : `Ile kosztuje ${nazwa}`}
            </h2>
            <p className="mt-3 leading-relaxed text-stone-600">
              Kwoty netto dla Lasów Państwowych. Zamówienie składa nadleśnictwo w składnicy
              {dostawca
                ? `; dostawę oraz serwis gwarancyjny i pogwarancyjny prowadzi ${dostawca}.`
                : '.'}
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-stone-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50">
                  <th className="px-5 py-4" />
                  {oferty.map((o) => {
                    const s = SKLADNICE[o.skladnica]
                    return (
                      <th key={o.skladnica} className="px-5 py-4 align-top font-semibold text-stone-900">
                        {s.nazwa}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {wiersze.map((w) => {
                  const min = najtansza(w.klucz)
                  return (
                    <tr
                      key={w.klucz}
                      className={`border-b border-stone-100 last:border-b-0 ${
                        w.glowna ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      <td className="px-5 py-3.5 align-top">
                        <span
                          className={
                            w.glowna
                              ? 'font-semibold text-stone-900'
                              : 'text-sm text-stone-600'
                          }
                        >
                          {w.nazwa}
                        </span>
                        {/* druk wymienia, co wchodzi w tę cenę — bez tego
                            czytelnik nie wie, czy ładowarki trzeba dokupić.
                            Przy kilku składnicach zestaw bywa różny, więc
                            wtedy opis idzie do kolumn, nie pod nazwę. */}
                        {w.glowna && oferty.length === 1 && wZestawie.length > 0 && (
                          <span className="mt-1.5 block text-sm text-stone-600">
                            <span className="text-stone-500">W cenie: </span>
                            {wZestawie.join(' · ')}
                          </span>
                        )}
                      </td>
                      {oferty.map((o) => {
                        const poz = cena(o, w.klucz)
                        return (
                          <td key={o.skladnica} className="whitespace-nowrap px-5 py-3.5 align-top">
                            {poz ? (
                              <>
                                <span
                                  className={
                                    w.glowna
                                      ? 'text-xl font-bold tracking-tight text-stone-900'
                                      : 'text-sm font-semibold text-stone-900'
                                  }
                                >
                                  {zloty(poz.cenaNetto)}
                                </span>
                                {w.glowna && (
                                  <span className="mt-0.5 block text-xs text-stone-500">
                                    {zloty(poz.cenaNetto * (1 + VAT))} z VAT
                                  </span>
                                )}
                                <span className="mt-0.5 flex flex-wrap items-center gap-1.5">
                                  {poz.promocja && (
                                    <span className="font-mono text-[10px] uppercase tracking-wide text-emerald-700">
                                      promocja
                                    </span>
                                  )}
                                  {min !== null && poz.cenaNetto === min && (
                                    <span className="font-mono text-[10px] uppercase tracking-wide text-emerald-700">
                                      najtaniej
                                    </span>
                                  )}
                                </span>
                                {w.glowna && oferty.length > 1 && !!poz.wZestawie?.length && (
                                  <span className="mt-2 block max-w-[16rem] whitespace-normal text-xs leading-relaxed text-stone-600">
                                    <span className="text-stone-500">W cenie: </span>
                                    {poz.wZestawie.join(' · ')}
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="text-sm text-stone-400">—</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
                <tr className="border-t border-stone-200 bg-stone-50">
                  <td className="px-5 py-4 align-top">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">
                      Jak zamówić
                    </span>
                  </td>
                  {oferty.map((o) => {
                    const s = SKLADNICE[o.skladnica]
                    return (
                      <td key={o.skladnica} className="px-5 py-4 align-top">
                        <a
                          href={o.formularz ?? o.strona ?? s.www}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline"
                        >
                          {o.formularz ? 'Pobierz formularz' : 'Otwórz stronę składnicy'}
                          <img
                            src={o.formularz ? ICON.pobierz : ICON.strzalkaUkos}
                            alt=""
                            className="h-3.5 w-3.5 mix-blend-multiply"
                          />
                        </a>
                      </td>
                    )
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-stone-200 px-5 py-4">
            <p className="text-xs leading-relaxed text-stone-500">
              Ceny netto; do kwot dolicza się VAT 23%. Pozycje pod urządzeniem są płatne
              dodatkowo. Płatność przelewem, termin realizacji ustalany przy zamówieniu.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Skrót ceny w kolumnie obok galerii — bez rozciągania nagłówka karty. */
const CenaWSkrocie = ({ oferty }: { oferty: OfertaZUP[] }) => {
  if (!oferty.length) return null

  const najnizsza = Math.min(...oferty.map((o) => o.urzadzenie.cenaNetto))
  const wielu = oferty.length > 1

  return (
    <a
      href="#ceny"
      className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white px-5 py-4 transition hover:border-emerald-300 hover:bg-emerald-50/40"
    >
      <span className="min-w-0">
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">
          {wielu ? `Cena w ${oferty.length} składnicach` : 'Cena w składnicy'}
        </span>
        <span className="mt-1 flex flex-wrap items-baseline gap-x-2">
          {wielu && <span className="text-sm text-stone-500">od</span>}
          <span className="text-2xl font-bold tracking-tight text-stone-900">
            {zloty(najnizsza)}
          </span>
          <span className="text-sm text-stone-500">netto</span>
        </span>
        <span className="mt-0.5 block text-xs text-stone-500">
          {wielu
            ? 'Zobacz porównanie i pozycje dodatkowe'
            : `${SKLADNICE[oferty[0].skladnica].nazwa} · zobacz pozycje dodatkowe`}
        </span>
      </span>
      <img
        src={ICON.strzalka}
        alt=""
        className="h-4 w-4 shrink-0 mix-blend-multiply transition group-hover:translate-x-0.5"
      />
    </a>
  )
}

/* -------------------------------------------------------------------------- */
/*  Nawigacja po sekcjach — sticky pod nagłówkiem karty                       */
/* -------------------------------------------------------------------------- */

type Section = { id: string; label: string }

const SectionNav = ({ sections }: { sections: Section[] }) => {
  const [active, setActive] = useState(sections[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  return (
    <div className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="container mx-auto px-4">
        <nav className="flex gap-7 overflow-x-auto">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`whitespace-nowrap border-b-2 py-4 text-sm font-medium transition ${
                active === id
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Strona                                                                    */
/* -------------------------------------------------------------------------- */

export default function ProductPage({ data }: { data: ProductData }) {
  const { addToInquiry, openCart } = useInquiry()
  const cover = data.images[0]
  const [variant, setVariant] = useState<Record<string, string>>(() =>
    Object.fromEntries((data.variants ?? []).map((g) => [g.id, g.options[0]]))
  )

  const oferty = ofertyDla(data.slug)

  /**
   * Kafelki sekcji „dlaczego”: cechy wyróżnione (dawne boksy w prawej kolumnie
   * nagłówka) plus zwykłe powody, wszystko w jednej siatce.
   *
   * Cecha wyróżniona zwykle mówi o tym samym, co któryś z powodów — obie
   * powstały z tego samego faktu, tylko w innym miejscu karty (np. „Pięć lat
   * gwarancji producenta” obok „Pięć lat gwarancji”). Postawione obok siebie
   * czytają się jak zacinająca się płyta, więc parę o tej samej ikonie łączymy
   * w jeden kafelek i zostaje ten z obszerniejszym opisem — żaden fakt nie
   * ginie, bo oba mówią o tej samej rzeczy.
   */
  const wyrozniki = data.signature ?? []
  const scalone = new Map(
    wyrozniki.map((w) => {
      const bliznjak = data.why.find((p) => p.icon === w.icon)
      const lepszy = bliznjak && bliznjak.body.length > w.body.length ? bliznjak : w
      return [w.icon, { ...lepszy, tone: w.tone, wyrozniony: true as const }]
    }),
  )
  const kafelki = [
    ...Array.from(scalone.values()),
    ...data.why
      .filter((p) => !scalone.has(p.icon))
      .map((p) => ({ ...p, tone: undefined, wyrozniony: false as const })),
  ]
  // nieparzysta liczba kafelków zostawiłaby dziurę w ostatnim wierszu — pierwszy
  // (wyróżniony) rozpina się wtedy na obie kolumny i siatka kończy się równo
  const rozpiety = kafelki.length % 2 === 1 ? kafelki[0] : null

  const sections: Section[] = [
    { id: 'dlaczego', label: data.whyNavLabel ?? 'Dlaczego to urządzenie' },
    ...(data.timeline
      ? [{ id: 'wdrozenie', label: data.timeline.navLabel ?? 'Wdrożenie' }]
      : []),
    { id: 'specyfikacja', label: 'Specyfikacja' },
    ...(oferty.length > 0 ? [{ id: 'ceny', label: 'Ceny' }] : []),
    ...(data.hideService ? [] : [{ id: 'service-section', label: 'Serwis' }]),
  ]

  const chosen = (data.variants ?? [])
    .map((g) => `${g.label}: ${variant[g.id]}`)
    .join(', ')

  const askForProduct = () => {
    addToInquiry({
      // konfiguracja jest częścią identyfikatora — dwie różne konfiguracje tego
      // samego urządzenia to dwie pozycje zapytania (kontekst dedupliakcji w InquiryContext)
      id: chosen ? `${data.slug}::${chosen}` : data.slug,
      name: data.name,
      image: cover,
      category: data.category,
      description: data.inquiry.description,
      specifications: chosen
        ? `${data.inquiry.specifications} · wybrana konfiguracja: ${chosen}`
        : data.inquiry.specifications,
    })
    openCart()
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header activeTab="produkty" />

      {/* ---------------------------------------------------------------- */}
      {/*  Nagłówek karty — galeria + dane, bez foto-hero                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b border-stone-200 bg-white">
        <div className="container mx-auto px-4 pb-14 pt-6">
          <nav className="font-mono text-[11px] uppercase tracking-[0.16em] text-stone-400">
            <a href="/" className="transition hover:text-emerald-700">
              Strona główna
            </a>
            <span className="mx-2">/</span>
            <a href={data.categoryHref} className="transition hover:text-emerald-700">
              {data.category}
            </a>
            <span className="mx-2">/</span>
            <span className="text-stone-700">{data.name}</span>
          </nav>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Galeria */}
            <div className="lg:col-span-7">
              <Gallery images={data.images} name={data.name} />
            </div>

            {/* Dane i akcje */}
            <div className="flex flex-col lg:col-span-5">
              <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
                {data.name}
              </h1>

              {data.modelCode && (
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-stone-400">
                  Nr katalogowy {data.modelCode}
                </p>
              )}

              {data.highlights && data.highlights.length > 0 && (
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-stone-100 py-5">
                  {data.highlights.map((h) => (
                    <div key={h.label} className="flex items-start gap-3">
                      <img src={h.icon} alt="" className="mt-0.5 h-5 w-5 shrink-0 mix-blend-multiply" />
                      <div className="min-w-0">
                        <dt className="text-xs uppercase tracking-wide text-stone-400">{h.label}</dt>
                        <dd className="text-sm font-medium leading-snug text-stone-900">{h.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              )}

              {data.variants && data.variants.length > 0 && (
                <div className="mt-6 space-y-4">
                  {data.variants.map((group) => (
                    <div key={group.id}>
                      <p className="text-xs uppercase tracking-wide text-stone-400">{group.label}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {group.options.map((opt) => {
                          const on = variant[group.id] === opt
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setVariant((v) => ({ ...v, [group.id]: opt }))}
                              aria-pressed={on}
                              className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                                on
                                  ? 'border-emerald-600 bg-emerald-50 font-medium text-emerald-800'
                                  : 'border-stone-200 text-stone-700 hover:border-stone-300'
                              }`}
                            >
                              {opt}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={askForProduct}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Zapytaj o produkt
                </button>
                <a
                  href="#specyfikacja"
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-300 px-6 py-3.5 font-semibold text-stone-700 transition hover:border-stone-400"
                >
                  Specyfikacja
                  <img src={ICON.strzalka} alt="" className="h-4 w-4 mix-blend-multiply" />
                </a>
              </div>


              {oferty.length > 0 && <CenaWSkrocie oferty={oferty} />}

              {data.pricing && (
                <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200 bg-white">
                  <p className="border-b border-stone-200 bg-stone-50 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">
                    {data.pricing.heading ?? 'Cennik i prowizje'}
                  </p>

                  <div className="px-5 py-4">
                    {data.pricing.main && (
                      <div>
                        <p className="text-sm text-stone-600">{data.pricing.main.k}</p>
                        <p className="mt-1 flex items-baseline gap-2">
                          <span className="text-3xl font-bold tracking-tight text-stone-900">
                            {data.pricing.main.v}
                          </span>
                          {data.pricing.main.unit && (
                            <span className="text-sm text-stone-500">{data.pricing.main.unit}</span>
                          )}
                        </p>
                      </div>
                    )}

                    {data.pricing.rows && data.pricing.rows.length > 0 && (
                      <dl
                        className={`divide-y divide-stone-100 ${
                          data.pricing.main ? 'mt-4 border-t border-stone-100 pt-1' : ''
                        }`}
                      >
                        {data.pricing.rows.map((row) => (
                          <div key={row.k} className="flex items-baseline justify-between gap-6 py-3">
                            <dt className="text-sm text-stone-600">{row.k}</dt>
                            <dd className="whitespace-nowrap text-sm font-semibold text-stone-900">
                              {row.v}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>

                  {data.pricing.commissions && data.pricing.commissions.length > 0 && (
                    <div className="border-t border-stone-200 bg-stone-50 px-5 py-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">
                        Prowizja od transakcji
                      </p>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {data.pricing.commissions.map((c) => (
                          <div
                            key={c.label}
                            className="rounded-xl border border-stone-200 bg-white px-2 py-2.5 text-center"
                          >
                            <div className="text-[11px] font-medium uppercase tracking-wide text-stone-500">
                              {c.label}
                            </div>
                            <div className="mt-0.5 text-base font-bold text-emerald-700">{c.value}</div>
                          </div>
                        ))}
                      </div>
                      {data.pricing.note && (
                        <p className="mt-3 text-xs leading-relaxed text-stone-500">{data.pricing.note}</p>
                      )}
                    </div>
                  )}

                  {data.pricing.note && !data.pricing.commissions && (
                    <p className="border-t border-stone-200 bg-stone-50 px-5 py-3 text-xs leading-relaxed text-stone-500">
                      {data.pricing.note}
                    </p>
                  )}
                </div>
              )}

              {data.related && data.related.length > 0 && (
                <div className="mt-4 space-y-2">
                  {data.related.map((r) => (
                    <a
                      key={r.href}
                      href={r.href}
                      className="group/rel flex items-center justify-between gap-3 rounded-2xl border border-stone-200 px-4 py-3 transition hover:border-emerald-300 hover:bg-emerald-50/40"
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-stone-900">{r.name}</span>
                        <span className="block text-xs text-stone-500">{r.note}</span>
                      </span>
                      <img src={ICON.strzalka} alt="" className="h-4 w-4 shrink-0 transition group-hover/rel: mix-blend-multiply" />
                    </a>
                  ))}
                </div>
              )}

              <div className="mt-4 rounded-2xl border border-stone-200 p-4">
                <p className="text-sm font-semibold text-stone-900">Pytanie o konfigurację lub termin?</p>
                <p className="mt-1 text-sm text-stone-600">
                  Doradzamy przy doborze sprzętu dla nadleśnictw.
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  <a href="tel:+48607819688" className="font-medium text-emerald-700 hover:underline">
                    607 819 688
                  </a>
                  <a
                    href={`mailto:takma@takma.com.pl?subject=${encodeURIComponent(`Pytanie o ${data.name}`)}`}
                    className="font-medium text-emerald-700 hover:underline"
                  >
                    takma@takma.com.pl
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {data.accessories && data.accessories.length > 0 && (
        <Accessories
          items={data.accessories}
          productName={data.name}
          slug={data.slug}
          image={cover}
          heading={data.accessoriesHeading}
        />
      )}

      <SectionNav sections={sections} />

      {/* ---------------------------------------------------------------- */}
      {/*  Dlaczego nie zwykły telefon                                     */}
      {/* ---------------------------------------------------------------- */}
      <section id="dlaczego" className="container mx-auto scroll-mt-16 px-4 py-16">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
            {data.whyLabel ?? 'W warunkach leśnych'}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
            {data.whyHeading ?? 'Dlaczego to urządzenie'}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {kafelki.map((k) => {
            const ciemny = k.wyrozniony && k.tone === 'ciemny'
            return (
              <div
                key={k.title}
                className={`rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-md ${
                  k === rozpiety ? 'md:col-span-2' : ''
                } ${
                  ciemny
                    ? 'bg-[#0A1B12] text-emerald-50/80'
                    : k.wyrozniony
                      ? 'border border-emerald-200 bg-emerald-50/60 text-emerald-950/75'
                      : 'border border-stone-200 bg-white text-stone-600'
                }`}
              >
                <img
                  src={ciemny ? naCiemnym(k.icon) : k.icon}
                  alt=""
                  className={`h-8 w-8 ${ciemny ? 'opacity-90' : 'mix-blend-multiply'}`}
                />
                <h3
                  className={`mt-5 text-lg font-semibold ${
                    ciemny ? 'text-white' : k.wyrozniony ? 'text-emerald-900' : 'text-stone-900'
                  }`}
                >
                  {k.title}
                </h3>
                <p className="mt-2 leading-relaxed">{k.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      {data.timeline && <Wdrozenie timeline={data.timeline} />}

      {/* ---------------------------------------------------------------- */}
      {/*  Specyfikacja                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section id="specyfikacja" className="relative isolate scroll-mt-16 overflow-hidden border-y border-stone-200 bg-white">
        <ContourTexture className="text-emerald-900/[0.05]" />
        <div className="container relative mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">Dane techniczne</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">Specyfikacja</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {data.specGroups.map((group) => (
              <div key={group.title}>
                <h3 className="border-b border-stone-900/10 pb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500">
                  {group.title}
                </h3>
                <dl className="divide-y divide-stone-100">
                  {group.rows.map((row) => (
                    <div key={row.k} className="flex items-baseline justify-between gap-6 py-3">
                      <dt className="text-stone-600">{row.k}</dt>
                      <dd className="text-right font-mono text-sm font-medium text-stone-900">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {oferty.length > 0 && <CenySkladnic oferty={oferty} nazwa={data.name} />}

      {/* ---------------------------------------------------------------- */}
      {/*  Baner dedykowanej strony produktu (opcjonalny)                  */}
      {/* ---------------------------------------------------------------- */}
      {data.microsite && (
        <section className="container mx-auto px-4 py-14">
          <a
            href={data.microsite.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative isolate block overflow-hidden rounded-3xl bg-[#0A1B12] p-8 sm:p-10"
          >
            {data.microsite.image && (
              <>
                <img
                  src={data.microsite.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-500 group-hover:opacity-45"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1B12] via-[#0A1B12]/90 to-[#0A1B12]/60" />
              </>
            )}
            <ContourTexture className="text-[#A8F000]/10" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A8F000]">
                  {data.microsite.label}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{data.microsite.heading}</h2>
                <p className="mt-3 text-emerald-50/80">{data.microsite.body}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#A8F000] px-6 py-3.5 font-semibold text-[#0A1B12] transition group-hover:gap-3">
                Otwórz stronę
                <img src={ICON.strzalkaUkos} alt="" className="h-5 w-5 mix-blend-multiply" />
              </span>
            </div>
          </a>
        </section>
      )}

      {data.usedBy && (
        <UsedBy
          device={data.usedBy.device}
          exclude={data.usedBy.exclude}
          name={data.name}
          heading={data.usedBy.heading}
          label={data.usedBy.label}
        />
      )}

      {/* Serwis kurierski (wspólny komponent) */}
      {!data.hideService && (
        <CourierServiceSection
          productName={data.name}
          serviceContract={data.serviceContract}
          variant="v2"
        />
      )}

      <Footer />

      {/* Mobilne CTA przyklejone do dołu */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 p-3 backdrop-blur sm:hidden">
        <button
          type="button"
          onClick={askForProduct}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white"
        >
          Zapytaj o {data.name}
        </button>
      </div>
      <div className="h-20 sm:hidden" />
    </div>
  )
}
