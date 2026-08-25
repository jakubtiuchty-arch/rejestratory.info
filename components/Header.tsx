"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInquiry } from '@/components/InquiryContext';
import { AnimatePresence } from "framer-motion";
import { ICON, naCiemnym } from '@/components/product/icons'
import SearchAutocomplete from '@/app/components/SearchAutocomplete'

interface HeaderProps {
  activeTab?: 'home' | 'produkty' | 'serwis' | 'kontakt';
}

export default function Header({ activeTab = 'home' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { inquiryCount, openCart } = useInquiry();

  // po otwarciu kursor od razu w polu — inaczej trzeba klikać dwa razy
  React.useEffect(() => {
    if (!searchOpen) return;
    const t = setTimeout(() => {
      document.querySelector<HTMLInputElement>('#szukaj-naglowek input')?.focus();
    }, 120);
    return () => clearTimeout(t);
  }, [searchOpen]);

  // Escape zamyka i czyści
  React.useEffect(() => {
    if (!searchOpen) return;
    const naKlawisz = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); }
    };
    document.addEventListener('keydown', naKlawisz);
    return () => document.removeEventListener('keydown', naKlawisz);
  }, [searchOpen]);

  const isActive = (tab: string) => activeTab === tab;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <a href="/">
              <img src="/rejestratory_logo_footer_header.png" alt="Rejestartory.info" className="h-10 w-auto" />
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              <li>
                <a 
                  href="/" 
                  className={`transition-colors ${
                    isActive('home') 
                      ? 'text-emerald-600 font-semibold' 
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  Strona główna
                </a>
              </li>
              <li>
                <a 
                  href="/#produkty" 
                  className={`transition-colors ${
                    isActive('produkty') 
                      ? 'text-emerald-600 font-semibold' 
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  Produkty
                </a>
              </li>
              <li>
                <a 
                  href="/serwis" 
                  className={`transition-colors ${
                    isActive('serwis') 
                      ? 'text-emerald-600 font-semibold' 
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  Serwis
                </a>
              </li>
              <li>
                <a 
                  href="/kontakt" 
                  className={`transition-colors ${
                    isActive('kontakt') 
                      ? 'text-emerald-600 font-semibold' 
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  Kontakt
                </a>
              </li>
            </ul>
            
            {/* Wyszukiwarka w nagłówku: lupa rozwijająca pole. Delikatna pulsująca
                obwódka co kilka sekund, żeby ikona nie ginęła w rzędzie — sama
                lupa bez żadnego sygnału bywa przeoczana. Animacja wyłącza się,
                gdy pole jest otwarte i gdy system prosi o ograniczenie ruchu. */}
            <button
              type="button"
              onClick={() => setSearchOpen((o) => !o)}
              aria-label="Szukaj produktów"
              aria-expanded={searchOpen}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-100"
            >
              {!searchOpen && (
                <span className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-emerald-500/70 motion-safe:animate-[puls-lupy_4s_ease-out_infinite] motion-reduce:hidden" />
              )}
              <img
                src={searchOpen ? ICON.zamknij : ICON.lupa}
                alt=""
                className="h-5 w-5 mix-blend-multiply"
              />
            </button>

            <a 
              href="/panel-klienta"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-300 transition-colors"
            >
              <img src={ICON.uzytkownik} alt="" className="h-4 w-4 mix-blend-multiply" />
              Panel Klienta
            </a>
            
            <button 
              onClick={openCart}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <img src={naCiemnym(ICON.zamowienie)} alt="" className="h-4 w-4" />
              Zapytanie ({inquiryCount})
            </button>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen((o) => !o)}
              aria-label="Szukaj produktów"
              aria-expanded={searchOpen}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700"
            >
              {!searchOpen && (
                <span className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-emerald-500/70 motion-safe:animate-[puls-lupy_4s_ease-out_infinite] motion-reduce:hidden" />
              )}
              <img src={searchOpen ? ICON.zamknij : ICON.lupa} alt="" className="h-5 w-5 mix-blend-multiply" />
            </button>

            <button 
              onClick={openCart}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
            >
              <img src={naCiemnym(ICON.zamowienie)} alt="" className="h-4 w-4" />
              ({inquiryCount})
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              {mobileMenuOpen ? <img src={ICON.zamknij} alt="" className="h-6 w-6 mix-blend-multiply" /> : <img src={ICON.menu} alt="" className="h-6 w-6 mix-blend-multiply" />}
            </button>
          </div>
        </nav>

        {/* Pole wyszukiwania rozwijane pod nagłówkiem — na całą szerokość, więc
            podpowiedzi mają miejsce i nie przepychają układu strony. */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              id="szukaj-naglowek"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-visible"
            >
              <div className="border-t border-gray-200 py-4">
                <div className="mx-auto max-w-3xl [&_input]:border-slate-300 [&_input]:py-3 [&_input]:text-base [&_input]:placeholder:text-slate-500">
                  <SearchAutocomplete value={searchQuery} onChange={setSearchQuery} withButton />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200"
          >
            <ul className="py-4 space-y-2">
              <li>
                <a 
                  href="/" 
                  className={`block px-4 py-2 transition-colors ${
                    isActive('home')
                      ? 'text-emerald-600 bg-emerald-50 font-semibold'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Strona główna
                </a>
              </li>
              <li>
                <a 
                  href="/#produkty" 
                  className={`block px-4 py-2 transition-colors ${
                    isActive('produkty')
                      ? 'text-emerald-600 bg-emerald-50 font-semibold'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Produkty
                </a>
              </li>
              <li>
                <a 
                  href="/serwis" 
                  className={`block px-4 py-2 transition-colors ${
                    isActive('serwis')
                      ? 'text-emerald-600 bg-emerald-50 font-semibold'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Serwis
                </a>
              </li>
              <li>
                <a 
                  href="/kontakt" 
                  className={`block px-4 py-2 transition-colors ${
                    isActive('kontakt')
                      ? 'text-emerald-600 bg-emerald-50 font-semibold'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kontakt
                </a>
              </li>
              <li className="pt-2 border-t border-gray-200 mt-2">
                <a 
                  href="/panel-klienta" 
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <img src={ICON.uzytkownik} alt="" className="h-4 w-4 mix-blend-multiply" />
                  Panel Klienta
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </header>
  );
}