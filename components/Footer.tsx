'use client'

/**
 * Stopka wg wzorców NN/g „Web Page Footers 101”:
 *  — utility links (kontakt i obsługa) są w stopce zawsze, bo tam ludzie ich szukają,
 *  — site map: pełna lista kategorii, nie przypadkowe pięć z trzynastu,
 *  — linki pogrupowane w kolumny z konkretnymi nagłówkami („Sprzęt”, „Obsługa”,
 *    „Kontakt”), a nie ogólnikami w rodzaju „Informacje” czy „Zasoby”,
 *  — bez zwijania i bez mikroskopijnego druku: minimalny rozmiar linku to 14 px.
 */

import React from 'react'
import ContourTexture from '@/components/ContourTexture'
import { ICON, naCiemnym } from '@/components/product/icons'

const KATEGORIE = [
  ['Rejestratory', '/kategoria/rejestratory'],
  ['Telefony', '/kategoria/telefony'],
  ['Tablety', '/kategoria/tablety'],
  ['Laptopy', '/kategoria/laptopy'],
  ['All in One', '/kategoria/all-in-one'],
  ['Monitory', '/kategoria/monitory'],
  ['Drukarki laserowe', '/kategoria/drukarki-laserowe'],
  ['Urządzenia wielofunkcyjne', '/kategoria/urzadzenia-wielofunkcyjne'],
  ['Drukarki do rejestratora', '/kategoria/drukarki-do-rejestratora'],
  ['Urządzenia fiskalne', '/kategoria/urzadzenia-fiskalne'],
  ['Zarządzanie dokumentacją', '/kategoria/ezd'],
  ['Akcesoria komputerowe', '/kategoria/akcesoria-komputerowe'],
]

const OBSLUGA = [
  ['Zgłoś usterkę', '/serwis#zgloszenie'],
  ['Jak wygląda naprawa', '/serwis'],
  ['Panel klienta', '/panel-klienta'],
  ['Kontakt', '/kontakt'],
  ['Wszystkie produkty', '/#produkty'],
]

const KONTAKT = [
  {
    icon: ICON.telefon,
    etykieta: 'Dział handlowy',
    wartosc: '607 819 688',
    href: 'tel:+48607819688',
  },
  {
    icon: ICON.naprawa,
    etykieta: 'Serwis',
    wartosc: '601 619 898',
    href: 'tel:+48601619898',
  },
  {
    icon: ICON.koperta,
    etykieta: 'E-mail',
    wartosc: 'takma@takma.com.pl',
    href: 'mailto:takma@takma.com.pl',
  },
]

const Naglowek = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#A8F000]">{children}</h2>
)

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#0A1B12]">
      <ContourTexture className="text-[#A8F000]/[0.06]" />

      <div className="container relative mx-auto px-4 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Kto prowadzi katalog */}
          <div className="lg:col-span-3">
            <img
              src="/takma_logo_footer.png"
              alt="TAKMA"
              className="h-16 w-auto opacity-90 brightness-0 invert lg:h-20"
            />
            <p className="mt-5 text-sm leading-relaxed text-emerald-50/60">
              Dostarczamy i serwisujemy sprzęt IT dla Lasów Państwowych — od rejestratorów
              terenowych po wyposażenie kancelarii.
            </p>
            <address className="mt-5 space-y-1 text-sm not-italic text-emerald-50/60">
              <p className="font-medium text-white">TAKMA Tadeusz Tiuchty</p>
              <p>ul. Poświęcka 1a, 51-128 Wrocław</p>
              <p className="font-mono text-xs text-emerald-50/45">NIP 915-100-43-77</p>
            </address>
          </div>

          {/* Pełna lista kategorii — stopka jako mapa katalogu */}
          <div className="lg:col-span-5">
            <Naglowek>Sprzęt</Naglowek>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 lg:gap-x-8">
              {KATEGORIE.map(([nazwa, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-emerald-50/70 transition hover:text-[#A8F000]"
                  >
                    {nazwa}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Zadania poboczne */}
          <div className="lg:col-span-2">
            <Naglowek>Obsługa</Naglowek>
            <ul className="mt-5 space-y-2.5">
              {OBSLUGA.map(([nazwa, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-emerald-50/70 transition hover:text-[#A8F000]"
                  >
                    {nazwa}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt — to, po co ludzie najczęściej schodzą do stopki */}
          <div className="lg:col-span-2">
            <Naglowek>Kontakt</Naglowek>
            <ul className="mt-5 space-y-4">
              {KONTAKT.map((k) => (
                <li key={k.etykieta}>
                  <a href={k.href} className="group flex items-start gap-3">
                    <img
                      src={naCiemnym(k.icon)}
                      alt=""
                      className="mt-0.5 h-4 w-4 shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
                    />
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wide text-emerald-50/45">
                        {k.etykieta}
                      </span>
                      <span className="block break-words text-sm text-emerald-50/80 transition group-hover:text-[#A8F000]">
                        {k.wartosc}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <img
                  src={naCiemnym(ICON.zegar)}
                  alt=""
                  className="mt-0.5 h-4 w-4 shrink-0 opacity-60"
                />
                <span>
                  <span className="block text-xs uppercase tracking-wide text-emerald-50/45">
                    Godziny pracy
                  </span>
                  <span className="block text-sm text-emerald-50/80">pon.–pt. 7:30–15:30</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container mx-auto flex flex-col gap-2 px-4 py-5 text-sm text-emerald-50/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} <span className="text-emerald-50/70">Rejestratory.info</span>{' '}
            — katalog prowadzony przez TAKMA
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href="/polityka-prywatnosci" className="transition hover:text-[#A8F000]">
              Polityka prywatności
            </a>
            <span>Wszystkie prawa zastrzeżone</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
