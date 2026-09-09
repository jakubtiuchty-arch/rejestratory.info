'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ICON, naCiemnym } from '@/components/product/icons'
import Drobinki from '@/components/product/Drobinki'

/**
 * Okno „Pobierz ofertę w PDF”. Klient wpisuje dane nadleśnictwa, serwer
 * generuje ofertę, plik zapisuje się od razu, a kopia idzie na e-mail.
 *
 * Układ: nagłówek i stopka z przyciskiem są poza obszarem przewijania
 * (`shrink-0`), przewijają się same pola — CTA widać bez scrollowania także
 * na niskich ekranach. Jasne tło, leśny akcent tylko w pasku nagłówka.
 */

type Props = {
  open: boolean
  onClose: () => void
  produkt: { slug: string; name: string }
}

type Pola = {
  nadlesnictwo: string
  adres: string
  nip: string
  osoba: string
  email: string
  telefon: string
  ilosc: number
  uwagi: string
  zgoda: boolean
  www: string
}

const PUSTE: Pola = {
  nadlesnictwo: '',
  adres: '',
  nip: '',
  osoba: '',
  email: '',
  telefon: '',
  ilosc: 1,
  uwagi: '',
  zgoda: false,
  www: '',
}

const pole =
  'w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'
const etykieta = 'mb-1 block text-sm font-medium text-stone-700'
const opcjonalnie = <span className="font-normal text-stone-400"> (opcjonalnie)</span>

export default function OfertaPdfModal({ open, onClose, produkt }: Props) {
  const [zamontowane, setZamontowane] = useState(false)
  const [pola, setPola] = useState<Pola>(PUSTE)
  const [stan, setStan] = useState<'formularz' | 'wysylka' | 'gotowe'>('formularz')
  const [blad, setBlad] = useState<string | null>(null)
  const [numer, setNumer] = useState<string | null>(null)

  useEffect(() => setZamontowane(true), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const ustaw = <K extends keyof Pola>(k: K, v: Pola[K]) => setPola((p) => ({ ...p, [k]: v }))

  const wyslij = async (e: FormEvent) => {
    e.preventDefault()
    setBlad(null)
    setStan('wysylka')
    try {
      const res = await fetch('/api/oferta-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...pola, slug: produkt.slug }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Nie udało się przygotować oferty.')
      }
      const nr = res.headers.get('X-Oferta-Numer')
      const blob = await res.blob()
      const nazwa =
        res.headers.get('Content-Disposition')?.match(/filename="([^"]+)"/)?.[1] ?? 'oferta.pdf'
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = nazwa
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 10_000)
      setNumer(nr)
      setStan('gotowe')
    } catch (err) {
      setBlad((err as Error).message)
      setStan('formularz')
    }
  }

  const zamknij = () => {
    onClose()
    if (stan === 'gotowe') {
      setTimeout(() => {
        setPola(PUSTE)
        setStan('formularz')
        setNumer(null)
      }, 300)
    }
  }

  if (!zamontowane) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={zamknij}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="oferta-pdf-tytul"
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* nagłówek — poza obszarem przewijania; to samo tło co przycisk w cenniku */}
            <div className="relative flex shrink-0 items-start justify-between gap-4 overflow-hidden px-6 py-4">
              <span aria-hidden className="oferta-tlo absolute inset-0" />
              <Drobinki />
              <div className="relative flex items-center gap-3">
                <img src={naCiemnym(ICON.pobierz)} alt="" className="h-6 w-6 shrink-0" />
                <div>
                  <h3 id="oferta-pdf-tytul" className="text-xl font-bold tracking-tight text-white">
                    Oferta w PDF
                  </h3>
                  <p className="text-sm text-emerald-50/70">{produkt.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={zamknij}
                aria-label="Zamknij"
                className="relative rounded-full p-1.5 transition hover:bg-white/10"
              >
                <img src={naCiemnym(ICON.zamknij)} alt="" className="h-5 w-5 opacity-80" />
              </button>
            </div>

            {stan === 'gotowe' ? (
              <div className="px-6 py-6">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
                    Oferta gotowa
                  </p>
                  <p className="mt-1.5 text-lg font-semibold text-stone-900">
                    {numer ? `Oferta nr ${numer}` : 'Plik zapisany'}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    Plik pobrał się na Państwa urządzenie, a kopię wysłaliśmy na adres{' '}
                    <b className="text-stone-900">{pola.email}</b>. Oferta jest ważna 30 dni. Pytania o
                    termin dostawy albo wdrożenie: 607 819 688.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={zamknij}
                  className="mt-5 w-full rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Zamknij
                </button>
              </div>
            ) : (
              <form onSubmit={wyslij} className="flex min-h-0 flex-1 flex-col">
                {/* jedyny obszar przewijany */}
                <div className="bez-paska min-h-0 flex-1 space-y-3.5 overflow-y-auto px-6 py-5">
                  <p className="text-sm leading-relaxed text-stone-600">
                    Oferta z cenami netto i brutto, warunkami zakupu oraz procesem wdrożenia. Plik
                    pobierze się na Państwa urządzenie, a kopia trafi na wskazany adres e-mail.
                  </p>

                  <div>
                    <label htmlFor="of-nadl" className={etykieta}>Nadleśnictwo / jednostka</label>
                    <input id="of-nadl" className={pole} required minLength={3} value={pola.nadlesnictwo}
                      onChange={(e) => ustaw('nadlesnictwo', e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="of-adres" className={etykieta}>Adres</label>
                    <input id="of-adres" className={pole} required minLength={5} value={pola.adres}
                      onChange={(e) => ustaw('adres', e.target.value)} />
                  </div>
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="of-nip" className={etykieta}>NIP{opcjonalnie}</label>
                      <input id="of-nip" className={pole} inputMode="numeric" value={pola.nip}
                        onChange={(e) => ustaw('nip', e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="of-ilosc" className={etykieta}>Ilość urządzeń</label>
                      <input id="of-ilosc" className={pole} type="number" min={1} max={50} required value={pola.ilosc}
                        onChange={(e) => ustaw('ilosc', Number(e.target.value))} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="of-osoba" className={etykieta}>Osoba do kontaktu</label>
                    <input id="of-osoba" className={pole} required minLength={3} value={pola.osoba}
                      onChange={(e) => ustaw('osoba', e.target.value)} />
                  </div>
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="of-email" className={etykieta}>E-mail</label>
                      <input id="of-email" className={pole} type="email" required value={pola.email}
                        onChange={(e) => ustaw('email', e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="of-tel" className={etykieta}>Telefon{opcjonalnie}</label>
                      <input id="of-tel" className={pole} type="tel" value={pola.telefon}
                        onChange={(e) => ustaw('telefon', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="of-uwagi" className={etykieta}>Uwagi do oferty{opcjonalnie}</label>
                    <textarea id="of-uwagi" className={`${pole} min-h-[64px]`} maxLength={500} value={pola.uwagi}
                      onChange={(e) => ustaw('uwagi', e.target.value)} />
                  </div>

                  {/* honeypot — poza ekranem, boty i tak wypełniają */}
                  <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                    <label htmlFor="of-www">Strona www</label>
                    <input id="of-www" tabIndex={-1} autoComplete="off" value={pola.www}
                      onChange={(e) => ustaw('www', e.target.value)} />
                  </div>

                  <label className="flex items-start gap-2.5 text-xs leading-relaxed text-stone-500">
                    <input type="checkbox" required checked={pola.zgoda}
                      onChange={(e) => ustaw('zgoda', e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600" />
                    <span>
                      Wyrażam zgodę na przetwarzanie podanych danych przez TAKMA w celu przygotowania i
                      przesłania oferty. Pola bez dopisku „opcjonalnie” są wymagane.
                    </span>
                  </label>

                  {blad && (
                    <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {blad}
                    </p>
                  )}
                </div>

                {/* stopka z CTA — zawsze widoczna, bez przewijania */}
                <div className="shrink-0 border-t border-stone-200 bg-stone-50 px-6 py-4">
                  <button
                    type="submit"
                    disabled={stan === 'wysylka'}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-70"
                  >
                    {stan === 'wysylka' ? 'Przygotowujemy ofertę…' : 'Pobierz ofertę w PDF'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
