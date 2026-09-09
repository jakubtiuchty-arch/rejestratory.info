/**
 * Warstwa ledwo widocznych drobinek nad ciemnym, zielonym tłem: zapalają się,
 * dryfują w górę i gasną. Używa jej przycisk „Pobierz ofertę w PDF” w cenniku
 * i nagłówek okna z formularzem oferty, więc pozycje siedzą w jednym miejscu.
 *
 * Pozycje są wypisane na stałe, a nie losowane przy renderze — losowanie
 * rozjeżdża hydratację (serwer wylicza inne wartości niż przeglądarka).
 * Sama animacja jest w `globals.css` (`oferta-drobinka`).
 */
'use client'

const DROBINKI = [
  { left: '1.4%', top: '22.9%', size: 3.5, delay: '0.19s', dur: '4.24s', jasna: true },
  { left: '6.6%', top: '77.5%', size: 2, delay: '0.15s', dur: '3.47s', jasna: true },
  { left: '9.4%', top: '42.6%', size: 3, delay: '0.5s', dur: '3.05s', jasna: false },
  { left: '16.5%', top: '53.6%', size: 2.5, delay: '0.2s', dur: '3.04s', jasna: false },
  { left: '18.3%', top: '42.2%', size: 3, delay: '0.47s', dur: '3.22s', jasna: false },
  { left: '22.8%', top: '53.9%', size: 3.5, delay: '0.75s', dur: '2.79s', jasna: false },
  { left: '28.4%', top: '56.6%', size: 2.5, delay: '2.72s', dur: '3.46s', jasna: true },
  { left: '32.8%', top: '44.6%', size: 2, delay: '0.99s', dur: '2.96s', jasna: false },
  { left: '35.6%', top: '33.6%', size: 2.5, delay: '3.5s', dur: '4.06s', jasna: true },
  { left: '42.8%', top: '20.5%', size: 2.5, delay: '0.66s', dur: '3.28s', jasna: false },
  { left: '45.4%', top: '81.3%', size: 1.5, delay: '3.06s', dur: '3.75s', jasna: false },
  { left: '49.4%', top: '62.1%', size: 3, delay: '1.99s', dur: '4.19s', jasna: true },
  { left: '53.1%', top: '31.4%', size: 3.5, delay: '2.66s', dur: '2.72s', jasna: false },
  { left: '59.2%', top: '83.5%', size: 2.5, delay: '1.14s', dur: '3.37s', jasna: false },
  { left: '61.6%', top: '45.2%', size: 2, delay: '2.44s', dur: '3.59s', jasna: true },
  { left: '66.8%', top: '65.2%', size: 2.5, delay: '1.56s', dur: '4.34s', jasna: true },
  { left: '71.7%', top: '51.6%', size: 2, delay: '3.28s', dur: '4.33s', jasna: true },
  { left: '75.9%', top: '37.8%', size: 2.5, delay: '3.83s', dur: '2.9s', jasna: true },
  { left: '79.7%', top: '28.8%', size: 2.5, delay: '3.32s', dur: '2.96s', jasna: true },
  { left: '83.8%', top: '50.5%', size: 3, delay: '2.27s', dur: '4.51s', jasna: false },
  { left: '89.3%', top: '56.5%', size: 3.5, delay: '2.96s', dur: '3.51s', jasna: false },
  { left: '95.1%', top: '61.0%', size: 3, delay: '1.57s', dur: '3.4s', jasna: true },
]

export default function Drobinki({ className = 'opacity-40' }: { className?: string }) {
  return (
    <span aria-hidden className={`absolute inset-0 overflow-hidden ${className}`}>
      {DROBINKI.map((d, i) => (
        <span
          key={i}
          className="oferta-drobinka absolute rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            backgroundColor: d.jasna ? '#ffffff' : '#A8F000',
            boxShadow: d.jasna ? '0 0 4px 0 rgba(255,255,255,0.4)' : '0 0 4px 0 rgba(168,240,0,0.35)',
            animationDelay: d.delay,
            animationDuration: d.dur,
          }}
        />
      ))}
    </span>
  )
}
