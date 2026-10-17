'use client'

import React, { useLayoutEffect, useRef } from 'react'

/**
 * Tabela „Który wybrać?” pod kafelkami kategorii — tylko to, czym modele się różnią.
 *
 * Wygląd jak w tabelach wpisanych ręcznie w kategoriach (rejestratory, telefony…):
 * pełna szerokość karty, a wolne miejsce rozkłada się po równo między kolumny
 * (Jakub: ani rozciągnięta jedna kolumna, ani pusta przestrzeń po prawej).
 * Szerokości liczy się z treści po wyrenderowaniu, więc nie trzeba ich kalibrować ręcznie.
 * Na wąskim ekranie kolumny mają szerokość treści, a tabela przewija się w bok.
 */

export type KolumnaPorownania = { klucz: string; naglowek: string }

export type WierszPorownania = {
  model: string
  href: string
  wartosci: Record<string, string>
  /** wartości wyróżnione na zielono (najlepsze w kolumnie) */
  naj?: string[]
  /** wartości wyszarzone (wyraźnie słabsze albo brak) */
  slabe?: string[]
}

export type GrupaPorownania = { grupa?: string; wiersze: WierszPorownania[] }

type Props = {
  kolumny: KolumnaPorownania[]
  grupy: GrupaPorownania[]
  /** nagłówek nad tabelą — dla podtabel w kategoriach z różnymi rodzajami sprzętu */
  tytul?: string
  przypis?: string
}

export default function TabelaPorownania({ kolumny, grupy, tytul, przypis }: Props) {
  const tabela = useRef<HTMLTableElement>(null)

  useLayoutEffect(() => {
    const t = tabela.current
    if (!t) return
    const ustaw = () => {
      const naglowki = Array.from(t.querySelectorAll<HTMLTableCellElement>('thead th'))
      naglowki.forEach((th) => (th.style.width = ''))
      t.style.width = 'auto'
      const naturalne = naglowki.map((th) => th.getBoundingClientRect().width)
      t.style.width = ''
      const W = t.parentElement?.clientWidth ?? 0
      const odstep = 32 // px-4 z obu stron
      const tresc = naturalne.map((w) => w - odstep)
      const zapas = (W - tresc.reduce((a, b) => a + b, 0)) / tresc.length
      if (zapas <= odstep) return // za wąsko — zostają szerokości treści i przewijanie
      naglowki.forEach((th, i) => (th.style.width = `${((tresc[i] + zapas) / W) * 100}%`))
    }
    ustaw()
    const obserwator = new ResizeObserver(ustaw)
    if (t.parentElement) obserwator.observe(t.parentElement)
    return () => obserwator.disconnect()
  }, [kolumny, grupy])

  const kolumnOgolem = kolumny.length + 1

  return (
    <div className="mt-6">
      {tytul && <h3 className="text-lg font-semibold text-gray-900">{tytul}</h3>}
      <div className={`${tytul ? 'mt-3' : ''} overflow-x-auto rounded-lg bg-white shadow-md`}>
        <table ref={tabela} className="w-full whitespace-nowrap text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="sticky left-0 bg-white px-4 py-3 font-medium">Model</th>
              {kolumny.map((k) => (
                <th key={k.klucz} className="px-4 py-3 font-medium">
                  {k.naglowek}
                </th>
              ))}
            </tr>
          </thead>
          {grupy.map((g, gi) => (
            <tbody key={g.grupa ?? gi}>
              {g.grupa && (
                <tr className="bg-gray-50">
                  <th colSpan={kolumnOgolem} className="py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    <span className="sticky left-0 inline-block px-4">{g.grupa}</span>
                  </th>
                </tr>
              )}
              {g.wiersze.map((w, wi) => (
                <tr key={w.model} className={g.grupa || wi > 0 ? 'border-t border-gray-100' : ''}>
                  <td className="sticky left-0 bg-white px-4 py-3 font-medium">
                    <a href={w.href} className="text-gray-900 hover:text-emerald-700">
                      {w.model}
                    </a>
                  </td>
                  {kolumny.map((k) => (
                    <td
                      key={k.klucz}
                      className={`px-4 py-3 ${
                        w.naj?.includes(k.klucz)
                          ? 'font-semibold text-emerald-700'
                          : w.slabe?.includes(k.klucz)
                            ? 'text-gray-400'
                            : 'text-gray-700'
                      }`}
                    >
                      {w.wartosci[k.klucz] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      {przypis && <p className="mt-3 text-xs text-gray-500">{przypis}</p>}
    </div>
  )
}
