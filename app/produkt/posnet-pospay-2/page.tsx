'use client'

import CourierServiceSection from "@/components/CourierServiceSection";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ZoomIn,
  Shield,
  Battery,
  Wifi,
  Smartphone,
  Download,
  X,
  Calculator,
  BarChart3,
  FileText,
  Phone,
  Mail,
  MapPin,
  Check,
  Package,
  ShoppingCart,
  Info,
  Truck,
  AlertTriangle,
  TreePine,
  CreditCard,
  Printer,
  Monitor
} from 'lucide-react'
import { useInquiry } from '@/components/InquiryContext'

// Image Gallery Component
const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div 
        className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src={images[currentImage] || images[0]}
          alt="Posnet Pospay 2"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white/80 rounded-full p-2">
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </motion.div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-3 gap-2">
        {images.slice(1).map((image, index) => (
          <motion.div
            key={index}
            className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${
              currentImage === index + 1 ? 'border-emerald-600' : 'border-transparent'
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentImage(index + 1)}
          >
            <img
              src={image}
              alt={`View ${index + 2}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            >
              <img
                src={images[currentImage] || images[0]}
                alt="Posnet Pospay 2 - powiększenie"
                className="max-w-full max-h-full object-contain"
              />
              <button
                className="absolute top-4 right-4 bg-white/20 rounded-full p-2 text-white hover:bg-white/30"
                onClick={() => setIsZoomed(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Specifications Component
const Specifications = () => {
  const specs = [
    { category: "Urządzenie", items: [
      { name: "Wersja", value: "ONLINE" },
      { name: "Pamięć chroniona", value: "Karta micro SDHC - 4 GB" },
      { name: "Komunikacja z CRK", value: "Modem GSM, WiFi" },
      { name: "Wymiary", value: "15,2 x 8 x 8,1 cm" },
      { name: "Waga", value: "~0,6 kg (z papierem)" }
    ]},
    { category: "Mechanizm drukujący", items: [
      { name: "Typ mechanizmu", value: "Termiczny \"drop in\" - wrzuć i drukuj" },
      { name: "Liczba znaków w wierszu", value: "Do 40" },
      { name: "Szerokość papieru", value: "57 mm" },
      { name: "Długość rolki papieru", value: "14 m" }
    ]},
    { category: "Wyświetlacze", items: [
      { name: "Wyświetlacz operatora", value: "4,5\", 1280 x 720 pikseli" },
      { name: "Wyświetlacz klienta", value: "LCD 2 x 16 znaków" }
    ]},
    { category: "Zasilanie", items: [
      { name: "Zasilacz", value: "Zewnętrzny, 5V/4A" },
      { name: "Akumulator drukarka", value: "Li-ion 6800 mAh" },
      { name: "Akumulator terminal", value: "Li-ion 2500 mAh" }
    ]},
    { category: "Bazy danych", items: [
      { name: "Stawki VAT", value: "7 (A...G)" },
      { name: "Liczba PLU", value: "4000 (aplikacja kasowa), 100 000 (aplikacja drukarkowa)" },
      { name: "Nazwa towarów", value: "80" },
      { name: "Kasjerzy", value: "200" },
      { name: "Formy płatności", value: "16" },
      { name: "Grupy towarowe", value: "32" }
    ]}
  ]

  return (
    <div className="space-y-6">
      {specs.map((category, index) => (
        <motion.div
          key={category.category}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-200">
            <h4 className="font-semibold text-emerald-700">{category.category}</h4>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Documents Required Lightbox Component
const DocumentsLightbox = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Dokumenty wymagane do fiskalizacji</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-900">
                    Jak otrzymamy od Państwa zamówienie, prześlemy w odpowiedzi szczegółową listę dokumentów wymaganych do zgłoszenia urządzeń do eService oraz Urzędu Skarbowego.
                  </p>
                </div>
                
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-700 mb-3">Wymagane dokumenty:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Dane Nadleśnictwa (NIP, REGON, nazwa)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Adres miejsca instalacji urządzenia</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Nazwy i adresy leśnictw</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Skan paragonu używanych urządzeń fiskalnych (jeśli są używane)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Numer telefonu kontaktowego</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Pomoc krok po kroku:
                  </p>
                  <p className="text-sm">
                    Nasz zespół pomoże Państwu w wypełnieniu wszystkich niezbędnych dokumentów oraz przeprowadzi przez cały proces fiskalizacji i zgłoszenia do eService.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Timeline Component
const PurchaseTimeline = () => {
  const [isDocumentsLightboxOpen, setIsDocumentsLightboxOpen] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const timelineRef = React.useRef(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (timelineRef.current) {
      observer.observe(timelineRef.current)
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current)
      }
    }
  }, [hasAnimated])

  const timelineSteps = [
    {
      title: "Zamówienie urządzeń",
      description: "Posnet Pospay 2 w TAKMA",
      icon: ShoppingCart
    },
    {
      title: "Przesłanie dokumentów",
      description: "do fiskalizacji",
      icon: FileText,
      hasButton: true
    },
    {
      title: "Fiskalizacja",
      description: "i zgłoszenie do eService",
      icon: Check
    },
    {
      title: "Dostawa",
      description: "urządzenia do Nadleśnictwa",
      icon: Truck
    },
    {
      title: "Szkolenie",
      description: "leśniczych",
      icon: Info
    },
    {
      title: "Integracja",
      description: "z rejestratorami",
      icon: Monitor
    },
    {
      title: "Przeglądy",
      description: "ustawowe co 2 lata",
      icon: Shield
    }
  ]

  return (
    <>
      <div className="mb-12" ref={timelineRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm"
        >
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Proces zakupu i wdrożenia
            </h3>
            <p className="text-gray-600">
              Od zamówienia do pełnej integracji - krok po kroku
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Linia łącząca - animowana */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200 hidden lg:block" 
                 style={{ left: '5%', right: '5%' }} />
            
            {/* Aktywna linia - rysuje się od lewej do prawej BARDZO WOLNO */}
            <motion.div 
              className="absolute top-8 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 hidden lg:block shadow-lg" 
              style={{ left: '5%' }}
              initial={{ width: 0 }}
              animate={hasAnimated ? { width: '90%' } : { width: 0 }}
              transition={{ 
                duration: 6.5,
                ease: "easeInOut"
              }}
            />
            
            {/* Świecący efekt na końcu linii */}
            <motion.div 
              className="absolute top-6 h-5 w-5 bg-emerald-500 rounded-full blur-md hidden lg:block" 
              style={{ left: '5%' }}
              initial={{ x: 0, opacity: 0 }}
              animate={hasAnimated ? { 
                x: 'calc(90vw * 0.9)',
                opacity: [0, 1, 1, 0]
              } : { x: 0, opacity: 0 }}
              transition={{ 
                duration: 6.5,
                ease: "easeInOut",
                opacity: {
                  times: [0, 0.1, 0.9, 1]
                }
              }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 relative">
              {timelineSteps.map((step, index) => {
                const Icon = step.icon
                const baseDelay = index * 0.9
                
                return (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 50, scale: 0.5 }}
                    animate={hasAnimated ? { 
                      opacity: 1, 
                      y: 0,
                      scale: 1
                    } : { 
                      opacity: 0, 
                      y: 50,
                      scale: 0.5
                    }}
                    transition={{ 
                      delay: baseDelay,
                      duration: 1.0,
                      ease: "easeOut",
                      type: "spring",
                      stiffness: 80,
                      damping: 18
                    }}
                  >
                    {/* Ikona z pulsującym ringiem */}
                    <div className="relative">
                      {/* Pulsujący ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-emerald-500"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={hasAnimated ? {
                          scale: [1, 1.5, 2],
                          opacity: [0.5, 0.3, 0]
                        } : { scale: 1, opacity: 0 }}
                        transition={{
                          delay: baseDelay + 0.5,
                          duration: 2.0,
                          ease: "easeOut"
                        }}
                      />
                      
                      {/* Ikona */}
                      <motion.div
                        className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-3 relative z-10 border-4 border-white shadow-xl"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={hasAnimated ? { 
                          scale: 1,
                          rotate: 0,
                          backgroundColor: ["#d1fae5", "#10b981", "#d1fae5"]
                        } : { scale: 0, rotate: -180 }}
                        transition={{ 
                          delay: baseDelay + 0.4,
                          duration: 1.0,
                          scale: {
                            type: "spring",
                            stiffness: 150,
                            damping: 12
                          },
                          rotate: {
                            duration: 1.0,
                            ease: "easeOut"
                          },
                          backgroundColor: {
                            delay: baseDelay + 1.0,
                            duration: 1.5,
                            times: [0, 0.5, 1]
                          }
                        }}
                        whileHover={{ 
                          scale: 1.15,
                          rotate: 5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={hasAnimated ? { scale: 1 } : { scale: 0 }}
                          transition={{ 
                            delay: baseDelay + 0.7,
                            duration: 0.5,
                            type: "spring",
                            stiffness: 250
                          }}
                        >
                          <Icon className="w-8 h-8 text-emerald-600" />
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    {/* Numer kroku */}
                    <motion.div 
                      className="text-xs font-bold text-emerald-600 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ 
                        delay: baseDelay + 0.8,
                        duration: 0.6
                      }}
                    >
                      KROK {index + 1}
                    </motion.div>
                    
                    {/* Tytuł */}
                    <motion.h4 
                      className="font-semibold text-gray-900 mb-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ 
                        delay: baseDelay + 0.95,
                        duration: 0.6
                      }}
                    >
                      {step.title}
                    </motion.h4>
                    
                    {/* Opis */}
                    <motion.p 
                      className="text-sm text-gray-600 mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ 
                        delay: baseDelay + 1.1,
                        duration: 0.6
                      }}
                    >
                      {step.description}
                    </motion.p>
                    
                    {/* Button jeśli wymagany */}
                    {step.hasButton && (
                      <motion.button
                        onClick={() => setIsDocumentsLightboxOpen(true)}
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={hasAnimated ? { 
                          opacity: 1, 
                          scale: 1
                        } : { 
                          opacity: 0, 
                          scale: 0.5 
                        }}
                        transition={{ 
                          delay: baseDelay + 1.3,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 180
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Jakie dokumenty?
                      </motion.button>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Documents Lightbox */}
      <DocumentsLightbox 
        isOpen={isDocumentsLightboxOpen} 
        onClose={() => setIsDocumentsLightboxOpen(false)} 
      />
    </>
  )
}


// Main Product Page Component
export default function PosnetPospay2ProductPage() {
  const [activeTab, setActiveTab] = useState('timeline')
  const { inquiryCount, addToInquiry, openCart } = useInquiry()
  const [showRipple, setShowRipple] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - IDENTYCZNY JAK STRONA GŁÓWNA */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/rejestratory_logo_footer_header.png" alt="Rejestartory.info" className="h-10 w-auto" />
            </div>
            
            <div className="flex items-center gap-8">
              <ul className="hidden md:flex items-center gap-8">
                <li><a href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">Strona główna</a></li>
                <li><a href="#produkty" className="text-gray-700 hover:text-emerald-600 transition-colors">Produkty</a></li>
                <li><a href="/serwis" className="text-gray-700 hover:text-emerald-600 transition-colors">Serwis</a></li>
                <li><a href="/kontakt" className="text-gray-700 hover:text-emerald-600 transition-colors">Kontakt</a></li>
              </ul>
              
              <button 
                onClick={openCart}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Zapytanie ({inquiryCount})
              </button>
            </div>
          </nav>
        </div>
      </header>
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-500">
          <a href="/" className="hover:text-emerald-600">Strona główna</a>
          <span className="mx-2">/</span>
          <a href="/kategoria/urzadzenia-fiskalne" className="hover:text-emerald-600">Urządzenia fiskalne</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Posnet Pospay 2</span>
        </nav>
      </div>

      {/* Product Hero Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={['/pospay_1.png', '/pospay_2.png', '/pospay_3.png', '/pospay_4.png']} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
                  Urządzenie fiskalne
                </span>
                <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                  Kompatybilne z Leśnik+
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Posnet Pospay 2
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Posnet Pospay 2 to nowoczesne urządzenie fiskalne typu online łączące funkcje kasy fiskalnej z terminalem płatniczym. Rozwiązanie idealne dla nadleśnictw i instytucji publicznych wymagających obsługi płatności gotówkowych i bezgotówkowych. Kompaktowa konstrukcja z intuicyjnym ekranem dotykowym 4,5" ułatwia codzienną obsługę sprzedaży. Wbudowany terminal płatniczy akceptuje karty i BLIK. Urządzenie w pełni kompatybilne z systemem Leśnik+, co zapewnia bezproblemową integrację z oprogramowaniem używanym przez administrację leśną. Bateria o pojemności 6800 mAh umożliwia mobilną pracę przez cały dzień. Objęty kompleksowym wsparciem technicznym oraz obowiązkowymi przeglądami co 2 lata.
              </p>
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'posnet-pospay-2',
                      name: 'Posnet Pospay 2',
                      image: '/pospay_1.png',
                      category: 'Urządzenia fiskalne',
                      description: 'Urządzenie fiskalne online z terminalem płatniczym',
                      specifications: 'Ekran 4,5", Terminal płatniczy, Bateria 6800 mAh, Kompatybilny z Leśnik+'
                    })
                    setShowRipple(true)
                    setTimeout(() => setShowRipple(false), 1000)
                  }}
                  className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Package className="w-5 h-5 mr-2" />
                  Zapytaj o produkt
                </motion.button>
              </div>

              {/* Box Ceny - na pełną szerokość */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-indigo-200 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-indigo-900 mb-3">Cennik i prowizje</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                        <span className="text-gray-700">Cena zakupu urządzenia:</span>
                        <span className="font-bold text-indigo-900">1 799 zł netto</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                        <span className="text-gray-700">Abonament miesięczny (wynajem terminala):</span>
                        <span className="font-bold text-indigo-900">39 zł netto</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg">
                        <p className="text-gray-700 font-medium mb-2">Prowizje od transakcji:</p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-indigo-50 rounded px-2 py-1">
                            <div className="text-xs text-gray-600">VISA</div>
                            <div className="font-bold text-indigo-900">0,69%</div>
                          </div>
                          <div className="bg-indigo-50 rounded px-2 py-1">
                            <div className="text-xs text-gray-600">MasterCard</div>
                            <div className="font-bold text-indigo-900">0,79%</div>
                          </div>
                          <div className="bg-indigo-50 rounded px-2 py-1">
                            <div className="text-xs text-gray-600">BLIK</div>
                            <div className="font-bold text-indigo-900">0,39%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gdzie kupić - prosty design */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gdzie kupić?</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
                    <span className="font-medium text-gray-900">TAKMA</span>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'timeline', label: 'Proces zakupu i wdrożenia' },
              { id: 'specs', label: 'Specyfikacja' },
              { id: 'downloads', label: 'Pliki do pobrania' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => {
                  setActiveTab(tab.id)
                  const element = document.getElementById(tab.id)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Timeline Section */}
        <div id="timeline" className="scroll-mt-24">
          <PurchaseTimeline />
        </div>

        {/* Specyfikacja Section */}
        <div id="specs" className="scroll-mt-24 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Specyfikacja</h3>
          <Specifications />
        </div>

        {/* Pliki do pobrania Section */}
        <div id="downloads" className="scroll-mt-24 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Pliki do pobrania</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Karta katalogowa", type: "PDF", size: "1.2 MB" },
              { title: "Instrukcja obsługi", type: "PDF", size: "2.8 MB" },
              { title: "Specyfikacja techniczna", type: "PDF", size: "890 KB" }
            ].map((file, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-emerald-300 cursor-pointer transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{file.title}</h4>
                    <p className="text-sm text-gray-500">{file.type} • {file.size}</p>
                  </div>
                </div>
                <button className="w-full bg-emerald-50 text-emerald-600 py-2 rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Pobierz
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Courier Service Section - POZA PORTALEM */}
      <CourierServiceSection productName="Posnet Pospay 2" />

 {/* Footer */}
<Footer />
</div>
  )
}
