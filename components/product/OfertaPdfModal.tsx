'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ContourTexture from '@/components/ContourTexture'
import { naCiemnym } from '@/components/product/icons'

/**
 * Okno „Pobierz ofertę w PDF”. Klient wpisuje dane nadleśnictwa, serwer
 * generuje ofertę, plik zapisuje się od razu, a kopia idzie na e-mail.
 * Kolorystyka i mechanika (portal do body, Escape) jak w oknie „Jakie dokumenty?”.
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
  'w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-emerald-50/35 focus:border-[#A8F000] focus:bg-white/[0.06]'
const etykieta = 'mb-1.5 block text-sm font-medium text-emerald-50/85'
const opcjonalnie = <span className="font-normal text-emerald-50/45"> (opcjonalnie)</span>

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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={zamknij}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="oferta-pdf-tytul"
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0A1B12] shadow-2xl shadow-black/60"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ContourTexture className="text-[#A8F000]/[0.07]" />

            <div className="relative flex shrink-0 items-start justify-between gap-4 px-6 pb-4 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04]">
                  <img src={naCiemnym('/icons/line/pobierz.png')} alt="" className="h-6 w-6" />
                </div>
                <div>
                  <h3 id="oferta-pdf-tytul" className="text-2xl font-bold tracking-tight text-white">
                    Oferta w PDF
                  </h3>
                  <p className="mt-0.5 text-sm text-emerald-50/60">{produkt.name} dla Państwa nadleśnictwa</p>
                </div>
              </div>
              <button
                type="button"
                onClick={zamknij}
                aria-label="Zamknij"
                className="rounded-full p-2 transition hover:bg-white/10"
              >
                <img src={naCiemnym('/icons/line/zamknij.png')} alt="" className="h-5 w-5 opacity-70" />
              </button>
            </div>

            {stan === 'gotowe' ? (
              <div className="bez-paska relative min-h-0 flex-1 overflow-y-auto px-6 pb-6">
                <div className="rounded-2xl border border-[#A8F000]/40 bg-[#A8F000]/10 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A8F000]">
                    Oferta gotowa
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {numer ? `Oferta nr ${numer}` : 'Plik zapisany'}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-emerald-50/80">
                    Plik PDF pobrał się na Państwa urządzenie, a kopię wysłaliśmy na adres{' '}
                    <b className="text-white">{pola.email}</b>. Oferta jest ważna 30 dni. Pytania o
                    termin dostawy albo wdrożenie: 607 819 688.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={zamknij}
                  className="mt-5 w-full rounded-xl bg-[#A8F000] px-6 py-3.5 font-semibold text-[#0A1B12] transition hover:brightness-110"
                >
                  Zamknij
                </button>
              </div>
            ) : (
              <form onSubmit={wyslij} className="bez-paska relative flex min-h-0 flex-1 flex-col overflow-y-auto">
                <div className="space-y-4 px-6 pb-5">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm leading-relaxed text-emerald-50/85">
                      Gotowa oferta z cenami netto i brutto, warunkami zakupu oraz procesem wdrożenia.
                      Dokument pobierze się na Państwa urządzenie, a kopia trafi na wskazany adres
                      e-mail. Ważna 30 dni.
                    </p>
                    <p className="mt-2 text-xs text-emerald-50/45">
                      Pola bez dopisku „opcjonalnie” są wymagane.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="of-nadl" className={etykieta}>Nadleśnictwo / jednostka</label>
                    <input id="of-nadl" className={pole} required minLength={3} value={pola.nadlesnictwo}
                      onChange={(e) => ustaw('nadlesnictwo', e.target.value)} placeholder="Nadleśnictwo Wipsowo" />
                  </div>
                  <div>
                    <label htmlFor="of-adres" className={etykieta}>Adres</label>
                    <input id="of-adres" className={pole} required minLength={5} value={pola.adres}
                      onChange={(e) => ustaw('adres', e.target.value)} placeholder="ul. Leśna 3, 11-010 Barczewo" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="of-nip" className={etykieta}>NIP{opcjonalnie}</label>
                      <input id="of-nip" className={pole} inputMode="numeric" value={pola.nip}
                        onChange={(e) => ustaw('nip', e.target.value)} placeholder="739-000-00-00" />
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
                      onChange={(e) => ustaw('osoba', e.target.value)} placeholder="Imię i nazwisko" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="of-email" className={etykieta}>E-mail</label>
                      <input id="of-email" className={pole} type="email" required value={pola.email}
                        onChange={(e) => ustaw('email', e.target.value)} placeholder="nazwisko@rdlp.lasy.gov.pl" />
                    </div>
                    <div>
                      <label htmlFor="of-tel" className={etykieta}>Telefon{opcjonalnie}</label>
                      <input id="of-tel" className={pole} type="tel" value={pola.telefon}
                        onChange={(e) => ustaw('telefon', e.target.value)} placeholder="601 234 567" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="of-uwagi" className={etykieta}>Uwagi do oferty{opcjonalnie}</label>
                    <textarea id="of-uwagi" className={`${pole} min-h-[72px]`} maxLength={500} value={pola.uwagi}
                      onChange={(e) => ustaw('uwagi', e.target.value)} placeholder="np. termin dostawy, liczba leśnictw" />
                  </div>

                  {/* honeypot — poza ekranem, boty i tak wypełniają */}
                  <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                    <label htmlFor="of-www">Strona www</label>
                    <input id="of-www" tabIndex={-1} autoComplete="off" value={pola.www}
                      onChange={(e) => ustaw('www', e.target.value)} />
                  </div>

                  <label className="flex items-start gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-emerald-50/75">
                    <input type="checkbox" required checked={pola.zgoda}
                      onChange={(e) => ustaw('zgoda', e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#A8F000]" />
                    <span>
                      Wyrażam zgodę na przetwarzanie podanych danych przez TAKMA w celu przygotowania i
                      przesłania oferty.
                    </span>
                  </label>

                  {blad && (
                    <p role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      {blad}
                    </p>
                  )}
                </div>

                <div className="relative shrink-0 border-t border-white/10 bg-white/[0.03] px-6 py-4">
                  <button
                    type="submit"
                    disabled={stan === 'wysylka'}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#A8F000] px-6 py-3.5 font-semibold text-[#0A1B12] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
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
