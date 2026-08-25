"use client";
import React from "react";
import { motion } from "framer-motion";
import { ileKart } from "@/data/liczby-kategorii";
import { useInquiry } from '@/components/InquiryContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
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
  Server,
  Smartphone,
  Tablet,
} from "lucide-react";
import { ICON, naCiemnym } from '@/components/product/icons'

/** „1 produkt”, „3 produkty”, „11 produktów” — polska odmiana po liczebniku. */
const opisLiczbyProduktow = (ile: number) => {
  if (ile === 1) return "1 produkt";
  const dziesiatki = ile % 100;
  const jednosci = ile % 10;
  const mnoga = jednosci >= 2 && jednosci <= 4 && !(dziesiatki >= 12 && dziesiatki <= 14);
  return `${ile} ${mnoga ? "produkty" : "produktów"}`;
};

// Kategorie katalogu. Liczba produktów NIE jest tu wpisywana — bierze się
// z `data/liczby-kategorii.ts`, który przelicza karty w `app/produkt/` przed
// każdym buildem. Ręczne liczby rozjeżdżały się z rzeczywistością.
const categories = [
  // Ikona dobrana po funkcji urządzenia, nie po sylwetce — w 28 px kształt obudowy jest nieczytelny
  { id: 1, name: "Rejestratory", href: "/kategoria/rejestratory", Icon: ScanBarcode },
  { id: 2, name: "Telefony", href: "/kategoria/telefony", Icon: Smartphone },
  { id: 14, name: "Tablety", href: "/kategoria/tablety", Icon: Tablet },
  { id: 3, name: "Laptopy", href: "/kategoria/laptopy", Icon: Laptop },
  { id: 4, name: "Urządzenia wielofunkcyjne", href: "/kategoria/urzadzenia-wielofunkcyjne", Icon: PrinterCheck },
  { id: 5, name: "Monitory", href: "/kategoria/monitory", Icon: Monitor },
  { id: 7, name: "Serwery", href: "/kategoria/serwery", Icon: Server },
  { id: 8, name: "Drukarki do rejestratora", href: "/kategoria/drukarki-do-rejestratora", Icon: ScrollText },
  { id: 9, name: "Drukarki laserowe", href: "/kategoria/drukarki-laserowe", Icon: Printer },
  { id: 10, name: "All in One", href: "/kategoria/all-in-one", Icon: Computer },
  { id: 11, name: "Elektroniczne Zarządzanie Dokumentacją", href: "/kategoria/ezd", Icon: FolderCheck },
  { id: 12, name: "Urządzenia fiskalne", href: "/kategoria/urzadzenia-fiskalne", Icon: ReceiptText },
  { id: 13, name: "Akcesoria komputerowe", href: "/kategoria/akcesoria-komputerowe", Icon: Keyboard }
];

const getCategoryUrl = (categoryName: string) =>
  categories.find((c) => c.name === categoryName)?.href ?? "#";

type PolecanyProdukt = {
  slug: string;
  nazwa: string;
  kategoria: string;
  opis: string;
  zdjecie: string;
  sztuk?: number;
  nadlesnictwa?: number;
};

/**
 * Zapas na wypadek, gdyby ranking z panelu nie odpowiedział — trzy modele
 * najczęściej występujące u klientów w chwili pisania kodu. Normalnie sekcja
 * bierze dane z `/api/najczestsze-urzadzenia`, więc sama nadąża za sprzedażą.
 */
const POLECANE_ZAPASOWO: PolecanyProdukt[] = [
  {
    slug: 'zebra-zq521',
    nazwa: 'Zebra ZQ521',
    kategoria: 'Drukarka do rejestratora',
    opis: 'Mobilna drukarka 4-calowa do pracy w terenie',
    zdjecie: '/zq521_1.png',
  },
  {
    slug: 'zebra-em45',
    nazwa: 'Zebra EM45',
    kategoria: 'Rejestrator',
    opis: 'Terminal terenowy w obudowie smartfona',
    zdjecie: '/em45_1.webp',
  },
  {
    slug: 'samsung-a56',
    nazwa: 'Samsung Galaxy A56',
    kategoria: 'Telefon',
    opis: 'Smartfon służbowy z zapasem pamięci',
    zdjecie: '/a56_1.png',
  },
];

export default function HomePage() {
  const [categoriesView, setCategoriesView] = React.useState(0); // 0=4, 1=8, 2=all
  const [promoOpen, setPromoOpen] = React.useState(false);
  const [polecane, setPolecane] = React.useState<PolecanyProdukt[]>(POLECANE_ZAPASOWO);

  // ranking liczony z panelu: co faktycznie stoi w nadleśnictwach
  React.useEffect(() => {
    let aktualne = true;
    fetch('/api/najczestsze-urzadzenia?ile=3')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (aktualne && d?.ranking?.length) setPolecane(d.ranking);
      })
      .catch(() => {});
    return () => {
      aktualne = false;
    };
  }, []);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Force video to play on mount
  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.log("Video autoplay was prevented:", error);
      });
    }
  }, []);
  
  // Logika wyświetlania kategorii w trzech krokach
  const getVisibleCategories = () => {
    switch (categoriesView) {
      case 0: return categories.slice(0, 4);  // Pierwsze 4
      case 1: return categories.slice(0, 8);  // Pierwsze 8
      default: return categories;             // Wszystkie
    }
  };
  
  const visibleCategories = getVisibleCategories();
  const hasMoreCategories = categories.length > 4;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banerek promocyjny */}
      <motion.div
        className="text-white relative overflow-hidden"
        style={{
          backgroundImage: "image-set(url('/baner_em45_header.webp') type('image/webp'), url('/baner_em45_header.jpeg') type('image/jpeg')), url('/baner_em45_header.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        animate={{
          height: promoOpen ? 'auto' : 'auto'
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
        {/* Ciemny overlay - tylko gdy zamknięte */}
        <motion.div
          className="absolute inset-0 bg-black/80"
          animate={{
            opacity: promoOpen ? 0 : 1
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
        ></motion.div>

        {/* Subtelny gradient overlay dla lepszej czytelności CTA */}
        {promoOpen && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col">
          <motion.button
            onClick={() => setPromoOpen(!promoOpen)}
            className="w-full py-3 flex items-center justify-center gap-3 transition-all relative"
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-semibold text-base sm:text-lg drop-shadow-lg">
              Zobacz nasz bestseller - Zebra EM45
            </span>
            <motion.div
              animate={{
                rotate: promoOpen ? 180 : 0,
                scale: promoOpen ? 1 : [1, 1.3, 1]
              }}
              transition={{
                rotate: { duration: 0.3, ease: "easeInOut" },
                scale: {
                  duration: 1.5,
                  repeat: promoOpen ? 0 : Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{
                scale: 1.4,
                y: [0, -3, 0],
                transition: {
                  y: {
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }
              }}
              className="relative"
            >
              <img src={naCiemnym(ICON.chevronDol)} alt="" className="h-5 w-5 sm:h-6 sm:w-6" />
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                animate={{
                  scale: promoOpen ? 0 : [1, 1.8, 1],
                  opacity: promoOpen ? 0 : [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: promoOpen ? 0 : Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.button>

          {/* CTA Button - subtelny, elegancki design */}
          {promoOpen && (
            <motion.div
              className="flex-1 flex items-end justify-center sm:justify-end pb-6 sm:pb-8 md:pb-12 pt-48 sm:pt-64 md:pt-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.a
                href="/produkt/zebra-em45"
                className="inline-flex items-center gap-2 text-white font-medium px-6 py-2.5 rounded-full border-2 border-white/40 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all shadow-lg"
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(255, 255, 255, 0.6)",
                  backgroundColor: "rgba(255, 255, 255, 0.25)"
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-sm sm:text-base">Sprawdź</span>
                <motion.span
                  animate={{
                    x: [0, 4, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Header */}
      <Header activeTab="home" />


      {/* Hero Section */}
      {/* Film jest 16:9, a `object-cover` przycina go do kształtu sekcji, więc
          im niższa sekcja, tym więcej ucina z góry i z dołu. Wysokość rośnie
          więc z szerokością okna, ale z sufitem 600 px — bez niego na szerokim
          monitorze hero zajmowałby cały ekran. Na wąskich ekranach o wysokości
          decyduje długość tekstu. */}
      <section className="relative flex items-center py-16 text-white md:min-h-[clamp(460px,42vw,600px)]">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            // kadr wycinany nieco powyżej środka — na dole zwykle jest sam blat albo droga
            className="absolute inset-0 h-full w-full object-cover object-[50%_42%]"
          >
            <source src="/hero-nadlesnictwo.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Przyciemnienie tylko tam, gdzie leży treść. Płaska nakładka 40% na
            całej szerokości gasiła film — a to on ma tu opowiadać. Gradient od
            lewej trzyma kontrast pod nagłówkiem i akapitem, prawa strona
            zostaje jasna; dodatkowy cień u dołu ratuje wyszukiwarkę. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        
        {/* Zakomentowane zielone tło - może wrócić */}
        {/* bg-gradient-to-r from-emerald-600 to-emerald-800 */}
        
        <div className="container relative z-10 mx-auto w-full px-4">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Rejestartory.info
                <span className="block text-emerald-200">jedyne takie miejsce w internecie</span>
              </h1>
              <p className="text-xl text-emerald-100 mb-8">
                Od 25 lat specjalizujemy się w dostarczaniu nowoczesnego sprzętu IT dostosowanego 
                do potrzeb leśnictwa. Terminale terenowe, komputery, drukarki i więcej.
              </p>
              
              <div className="flex gap-4">
                <a href="#produkty" className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Zobacz produkty
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Categories Section */}
      <section id="produkty" className="relative py-16 bg-emerald-50/50">
        {/* Leśne tło sekcji: tekstura igliwia pod siatką kafelków */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "url('/kategorie/igliwie.svg')", backgroundSize: "170px" }}
        />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategorie produktów</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferujemy szeroki wybór sprzętu IT dostosowanego do specyficznych potrzeb Lasów Państwowych
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {visibleCategories.map((category) => {
              return (
                <motion.a
                  key={category.id}
                  href={getCategoryUrl(category.name)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: category.id * 0.1 }}
                  className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 transition-colors group-hover:bg-emerald-100">
                    <category.Icon className="h-7 w-7" strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-snug text-slate-900">{category.name}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{opisLiczbyProduktow(ileKart(category.href))}</span>
                  </span>
                  <img src={ICON.strzalka} alt="" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 mix-blend-multiply" />
                </motion.a>
              );
            })}
          </div>
          
          {hasMoreCategories && (
            <div className="text-center mt-12">
              <motion.button
                onClick={() => {
                  if (categoriesView === 0) {
                    setCategoriesView(1); // 4 → 8 kategorii
                  } else if (categoriesView === 1) {
                    setCategoriesView(2); // 8 → wszystkie
                  } else {
                    setCategoriesView(0); // wszystkie → 4
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl"
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -4, 0],
                  boxShadow: [
                    "0 10px 20px rgba(0, 0, 0, 0.1)",
                    "0 15px 30px rgba(0, 0, 0, 0.15)",
                    "0 10px 20px rgba(0, 0, 0, 0.1)"
                  ]
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                {categoriesView === 0 && (
                  <>
                    <img src={naCiemnym(ICON.chevronDol)} alt="" className="h-5 w-5" />
                    Zobacz więcej
                    <img src={naCiemnym(ICON.chevronDol)} alt="" className="h-5 w-5" />
                  </>
                )}
                {categoriesView === 1 && (
                  <>
                    <img src={naCiemnym(ICON.chevronDol)} alt="" className="h-5 w-5" />
                    Zobacz wszystkie kategorie
                    <img src={naCiemnym(ICON.chevronDol)} alt="" className="h-5 w-5" />
                  </>
                )}
                {categoriesView === 2 && (
                  <>
                    <img src={ICON.chevronGora} alt="" className="h-5 w-5 mix-blend-multiply" />
                    Pokaż mniej
                    <img src={ICON.chevronGora} alt="" className="h-5 w-5 mix-blend-multiply" />
                  </>
                )}
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Polecane produkty</h2>
            <p className="text-stone-600">Sprzęt, który najczęściej pracuje w nadleśnictwach</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {polecane.map((produkt, i) => (
              <motion.a
                key={produkt.slug}
                href={`/produkt/${produkt.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
                className="group flex flex-col rounded-2xl border border-stone-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl">
                  <img
                    src={produkt.zdjecie}
                    alt={produkt.nazwa}
                    className="h-4/5 w-4/5 object-contain"
                  />
                </div>
                <div className="border-t border-stone-200"></div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
                    {produkt.kategoria}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-stone-900">{produkt.nazwa}</h3>
                  <p className="mt-2 text-stone-600">{produkt.opis}</p>
                  {typeof produkt.nadlesnictwa === 'number' && produkt.nadlesnictwa > 0 && (
                    <p className="mt-3 text-sm text-stone-500">
                      Pracuje w {produkt.nadlesnictwa}{' '}
                      {produkt.nadlesnictwa === 1 ? 'nadleśnictwie' : 'nadleśnictwach'}
                    </p>
                  )}
                  <span className="mt-5 inline-flex items-center gap-2 self-start rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white transition group-hover:bg-emerald-700">
                    Zobacz więcej
                    <img src={naCiemnym(ICON.strzalka)} alt="" className="h-4 w-4" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Crisp Chat */}
    </div>
  );
}