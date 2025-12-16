"use client";
import React from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Laptop, 
  Printer, 
  Monitor, 
  Smartphone,
  Server,
  ChevronRight
} from "lucide-react";

const categories = [
  { name: "Rejestratory", href: "/kategoria/rejestratory", icon: Smartphone },
  { name: "Laptopy", href: "/kategoria/laptopy", icon: Laptop },
  { name: "Monitory", href: "/kategoria/monitory", icon: Monitor },
  { name: "Drukarki", href: "/kategoria/drukarki-laserowe", icon: Printer },
  { name: "Serwery", href: "/kategoria/serwery", icon: Server },
];

const quickLinks = [
  { name: "Strona główna", href: "/" },
  { name: "Wszystkie produkty", href: "/#produkty" },
  { name: "Serwis", href: "/serwis" },
  { name: "Kontakt", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Górna sekcja z gradientem */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        {/* Dekoracyjne elementy tła - ukryte na mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
          {/* Mobile Layout - kompaktowy */}
          <div className="md:hidden">
            {/* Logo */}
            <div className="mb-6">
              <img 
                src="/takma_logo_footer.png" 
                alt="TAKMA" 
                className="h-10 w-auto brightness-0 invert opacity-90"
              />
            </div>

            {/* Kontakt - kompaktowy grid */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              <a 
                href="mailto:takma@takma.com.pl"
                className="flex items-center gap-2 text-slate-400 text-sm"
              >
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                takma@takma.com.pl
              </a>
              <a 
                href="tel:+48607819688"
                className="flex items-center gap-2 text-slate-400 text-sm"
              >
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                607 819 688
              </a>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                ul. Poświęcka 1a, 51-128 Wrocław
              </div>
            </div>

            {/* Szybkie linki - w jednym rzędzie */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
              {quickLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Layout - pełny */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Logo i opis */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <img 
                  src="/takma_logo_footer.png" 
                  alt="TAKMA" 
                  className="h-16 lg:h-20 w-auto brightness-0 invert opacity-90"
                />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Specjalizujemy się w dostarczaniu nowoczesnego sprzętu IT 
                dla Lasów Państwowych. Profesjonalne rozwiązania dla leśnictwa.
              </p>
            </div>

            {/* Popularne kategorie */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-emerald-500 rounded-full"></span>
                Kategorie
              </h3>
              <ul className="space-y-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <li key={category.name}>
                      <a 
                        href={category.href}
                        className="group flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                        <span className="text-sm">{category.name}</span>
                        <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Szybkie linki */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-emerald-500 rounded-full"></span>
                Nawigacja
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="group flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm"
                    >
                      <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontakt */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-emerald-500 rounded-full"></span>
                Kontakt
              </h3>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="mailto:takma@takma.com.pl"
                    className="group flex items-start gap-3 text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors shrink-0">
                      <Mail className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Email</span>
                      <span className="text-sm">takma@takma.com.pl</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+48607819688"
                    className="group flex items-start gap-3 text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors shrink-0">
                      <Phone className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Telefon</span>
                      <span className="text-sm">607 819 688</span>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-slate-400">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Adres</span>
                      <span className="text-sm">ul. Poświęcka 1a<br />51-128 Wrocław</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Dolna sekcja - copyright */}
      <div className="bg-slate-950">
        <div className="container mx-auto px-4 py-3 md:py-5">
          <div className="flex items-center justify-center">
            <div className="text-slate-500 text-xs md:text-sm text-center">
              © {new Date().getFullYear()} <span className="text-slate-400">Rejestratory.info</span> — Wszystkie prawa zastrzeżone
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
