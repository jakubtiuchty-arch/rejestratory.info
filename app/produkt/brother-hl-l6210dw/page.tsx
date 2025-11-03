'use client'

import CourierServiceSection from "@/components/CourierServiceSection";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInquiry } from '@/components/InquiryContext'
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
  Palette,
  Nfc
} from 'lucide-react'

// Image Gallery Component
const ImageGallery = ({ images }: { images: string[] }) => {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div>
      {/* Main Image */}
      <motion.div 
        className="relative bg-gray-100 rounded-lg overflow-hidden aspect-[4/3] cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src="/HLL6210DW_1.png"
          alt="Brother HL-L6210DW"
          className="w-full h-full object-contain"
          style={{ transform: 'scale(0.85) translateY(-2%)' }}
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white/80 rounded-full p-2">
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </motion.div>

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
                src="/HLL6210DW_1.png"
                alt="Brother HL-L6210DW - powiększenie"
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
    { category: "Ogólne", items: [
      { name: "Typ drukarki", value: "Mono, laserowa" },
      { name: "Funkcje", value: "Drukowanie" },
      { name: "Połączenie", value: "USB 2.0, Gigabit Ethernet, Wi-Fi 802.11b/g/n" },
      { name: "Panel sterowania", value: "Przyciski + 1-liniowy wyświetlacz LCD" },
      { name: "Pamięć", value: "256 MB" }
    ]},
    { category: "Drukowanie", items: [
      { name: "Prędkość druku mono", value: "50 stron/min (A4)" },
      { name: "Druk dwustronny", value: "Automatyczny (24 strony/min)" },
      { name: "Czas pierwszego wydruku", value: "Do 6,7 sekundy" },
      { name: "Rozdzielczość", value: "Do 1200 x 1200 dpi" },
      { name: "Cykl pracy", value: "Do 8000 stron miesięcznie" }
    ]},
    { category: "Obsługa papieru", items: [
      { name: "Wejście papieru", value: "Podajnik 520 ark. + wielofunkcyjny 100 ark." },
      { name: "Wyjście papieru", value: "150 arkuszy (stroną zadrukowaną w dół)" },
      { name: "Maksymalny format", value: "A4, Letter, Legal, A5, A6, B5" },
      { name: "Gramatura", value: "60 - 230 g/m²" }
    ]},
    { category: "Funkcje dodatkowe", items: [
      { name: "Druk mobilny", value: "AirPrint, Mopria, Brother Mobile Connect" },
      { name: "Tryb cichy", value: "Tak (50 dB)" },
      { name: "Secure Print", value: "Tak" },
      { name: "Języki drukowania", value: "PCL6, PDF 1.7, BR-Script3, IBM Proprinter XL" }
    ]},
    { category: "Materiały eksploatacyjne", items: [
      { name: "Toner startowy", value: "6000 stron" },
      { name: "Tonery zamienne", value: "TN3600 (3000), TN3600XL (6000), TN3600XXL (11000), TN3610 (18000 stron)" },
      { name: "Bęben", value: "DR3600 (12000 stron)" }
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

// Service Contract Lightbox Component
const ServiceContractLightbox = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
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
                <h3 className="text-xl font-bold text-gray-900">Brak kontraktów serwisowych dla urządzeń konsumenckich</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  Urządzenia konsumenckie, takie jak Brother HL-L6210DW, nie są objęte 
                  kontraktami serwisowymi dostępnymi dla sprzętu profesjonalnych, przystosowanych do pracy w terenie. Oznacza to szereg 
                  konsekwencji dla administratora i użytkowników terenowych:
                </p>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-700 mb-3">Co traci administrator i użytkownik?</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Brak gwarancji szybkiej naprawy lub wymiany urządzenia</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Długie oczekiwanie na serwis - nawet kilka tygodni</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Brak urządzeń zastępczych podczas naprawy</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Brak priorytetowego wsparcia technicznego 24/7</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Wyższe koszty długoterminowe i przestoje w pracy terenowej</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Brak regularnych aktualizacji bezpieczeństwa przez producenta</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Konsekwencje dla Nadleśnictwa:
                  </p>
                  <p className="text-sm">
                    Brak profesjonalnego wsparcia oznacza poważne ryzyko operacyjne - każda awaria może 
                    skutkować wielodniowym przestojem w pracy leśniczego. Administrator 
                    musi samodzielnie zarządzać rezerwowymi urządzeniami, co generuje dodatkowe koszty 
                    i komplikacje logistyczne. Pracownik w terenie pozostaje bez wsparcia, a ciągłość 
                    pracy zależy wyłącznie od sprawności urządzenia konsumenckiego.
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


// Accessories Section Component
const AccessoriesSection = ({ productName, onAddToInquiry }: { productName: string, onAddToInquiry: (accessory: any) => void }) => {
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])

  const accessories = [
    {
      id: 'drum',
      name: 'Bęben Brother DR3600',
      description: 'Oryginalny bęben Brother, wydajność 12000 stron',
      image: '/HLL6210DW_bęben.png',
      price: 'Zapytaj o cenę'
    },
    {
      id: 'toner-3000',
      name: 'Toner czarny Brother TN3600',
      description: 'Oryginalny toner Brother, wydajność 3000 stron',
      image: '/HLL6210DW_toner_3000.png',
      price: 'Zapytaj o cenę'
    },
    {
      id: 'toner-6000',
      name: 'Toner czarny Brother TN3600XL',
      description: 'Oryginalny toner Brother, wydajność 6000 stron',
      image: '/HLL6210DW_toner_6000.png',
      price: 'Zapytaj o cenę'
    },
    {
      id: 'toner-11000',
      name: 'Toner czarny Brother TN3600XXL',
      description: 'Oryginalny toner Brother, wydajność 11000 stron',
      image: '/HLL6210DW_toner_11000.png',
      price: 'Zapytaj o cenę'
    },
    {
      id: 'toner-18000',
      name: 'Toner czarny Brother TN3610',
      description: 'Oryginalny toner Brother, wydajność 18000 stron',
      image: '/HLL6210DW_toner_18000.png',
      price: 'Zapytaj o cenę'
    }
  ]

  const toggleAccessory = (accessoryId: string) => {
    setSelectedAccessories(prev => 
      prev.includes(accessoryId) 
        ? prev.filter(id => id !== accessoryId)
        : [...prev, accessoryId]
    )
  }

  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Materiały eksploatacyjne
            </h3>
          </div>
          {selectedAccessories.length > 0 && (
            <motion.button
              onClick={() => {
                selectedAccessories.forEach((accessoryId) => {
                  const accessory = accessories.find(a => a.id === accessoryId)
                  if (accessory) {
                    onAddToInquiry(accessory)
                  }
                })
                setSelectedAccessories([])
              }}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Package className="w-5 h-5" />
              <span>Dodaj do zapytania ({selectedAccessories.length})</span>
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessories.map((accessory) => {
            const isSelected = selectedAccessories.includes(accessory.id)
            return (
              <motion.div
                key={accessory.id}
                className={`bg-white rounded-lg border-2 transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
                onClick={() => toggleAccessory(accessory.id)}
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="relative mb-4">
                    <img
                      src={accessory.image}
                      alt={accessory.name}
                      className="w-full h-40 object-contain rounded-lg scale-[1.154]"
                    />
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{accessory.name}</h4>
                  <p className="text-sm text-gray-600 mb-3 flex-1">{accessory.description}</p>
                  <div className="flex items-center justify-end mt-auto">
                    <button
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        isSelected 
                          ? 'bg-emerald-700 text-white' 
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {isSelected ? 'Wybrane' : 'Dodaj do zapytania'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

// Main Product Page Component
export default function BrotherHLL6210DWProductPage() {
  const [activeTab, setActiveTab] = useState('specs')
  const [isServiceLightboxOpen, setIsServiceLightboxOpen] = useState(false)
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
              
              <motion.button 
                onClick={openCart}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 relative overflow-hidden"
                animate={showRipple ? {
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{ duration: 0.3 }}
              >
                <ShoppingCart className="h-4 w-4" />
                Zapytanie ({inquiryCount})
                
                {/* Ripple Effect */}
                <AnimatePresence>
                  {showRipple && (
                    <>
                      <motion.span
                        className="absolute inset-0 bg-white rounded-lg"
                        initial={{ scale: 0, opacity: 0.6 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      <motion.span
                        className="absolute inset-0 bg-white rounded-lg"
                        initial={{ scale: 0, opacity: 0.4 }}
                        animate={{ scale: 3, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                      />
                      <motion.span
                        className="absolute inset-0 bg-white rounded-lg"
                        initial={{ scale: 0, opacity: 0.3 }}
                        animate={{ scale: 3.5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      />
                    </>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>
        </div>
      </header>
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-500">
          <a href="/" className="hover:text-emerald-600">Strona główna</a>
          <span className="mx-2">/</span>
          <a href="/kategoria/drukarki-laserowe" className="hover:text-emerald-600">Drukarki laserowe</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Brother HL-L6210DW</span>
        </nav>
      </div>

      {/* Product Hero Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={[]} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  Drukarka laserowa
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Brother HL-L6210DW
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Brother HL-L6210DW to wydajna monochromatyczna drukarka laserowa stworzona dla wymagających środowisk biurowych i terenowych. Urządzenie charakteryzuje się imponującą prędkością druku oraz niezawodną konstrukcją, zapewniając ciągłość pracy nawet w intensywnie użytkowanych nadleśnictwach. Automatyczne drukowanie dwustronne oraz łączność przewodowa i bezprzewodowa umożliwiają elastyczną integrację z infrastrukturą sieciową. Funkcje druku mobilnego przez Brother Mobile Connect i AirPrint zwiększają wygodę codziennej obsługi. Urządzenie wyróżnia się ekonomiczną eksploatacją dzięki wysokowydajnym tonerom oraz solidną budową gwarantującą długotrwałą niezawodność w warunkach terenowych.
              </p>
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'brother-hl-l6210dw',
                      name: 'Brother HL-L6210DW',
                      image: '/HLL6210DW_1.png',
                      category: 'Drukarki laserowe',
                      description: 'Monochromatyczna drukarka laserowa z Wi-Fi',
                      specifications: 'Prędkość druku: 50 str/min, Druk dwustronny automatyczny, Wi-Fi, USB, Ethernet'
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

              {/* TONER STARTOWY - INFO BOX */}
              <div className="rounded-lg p-4 border-2 mb-6 shadow-md" style={{ background: 'linear-gradient(to right, #2e292b, #244c33, #f0d7cc)', borderColor: '#244c33' }}>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-white">Toner startowy na 6000 stron w zestawie</h4>
                    <p className="text-sm text-white">
                      Brother HL-L6210DW jest dostarczany z wysokowydajnym tonerem startowym o pojemności 6000 stron, 
                      co zapewnia długi okres pracy bez konieczności zakupu dodatkowych materiałów eksploatacyjnych. 
                      To idealne rozwiązanie dla nadleśnictw, które mogą od razu rozpocząć intensywne drukowanie.
                    </p>
                  </div>
                </div>
              </div>

              {/* Gdzie kupić - prosty design */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gdzie kupić?</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
                    <span className="font-medium text-gray-900">ZUP Łódź</span>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
                    <span className="font-medium text-gray-900">TAKMA</span>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Accessories Section */}
        <AccessoriesSection 
          productName="Brother HL-L6210DW" 
          onAddToInquiry={(accessory) => {
            addToInquiry({
              id: `accessory-${accessory.id}`,
              name: accessory.name,
              image: accessory.image,
              category: 'Akcesoria - Brother HL-L6210DW',
              description: accessory.description
            })
          }} 
        />

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'specs', label: 'Specyfikacja' },
              { id: 'downloads', label: 'Pliki do pobrania' },
              { id: 'service', label: 'Serwis', isScroll: true }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  tab.id === 'service'
                    ? 'border-transparent text-orange-600 hover:text-orange-700 hover:border-orange-300'
                    : activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => {
                  if (tab.isScroll) {
                    // Scroll to service section
                    const serviceSection = document.getElementById('service-section')
                    if (serviceSection) {
                      serviceSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  } else {
                    setActiveTab(tab.id)
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mb-16">
          <AnimatePresence mode="wait">


            {activeTab === 'specs' && (
              <motion.div
                key="specs"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Specifications />
              </motion.div>
            )}



            {activeTab === 'downloads' && (
              <motion.div
                key="downloads"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[
                  { title: "Karta katalogowa", type: "PDF", size: "1.2 MB" },
                  { title: "Instrukcja obsługi", type: "PDF", size: "3.4 MB" },
                  { title: "Specyfikacja techniczna", type: "PDF", size: "0.8 MB" }
                ].map((file, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg p-6 border border-gray-200 hover:border-emerald-300 cursor-pointer transition-colors"
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Service Contract Lightbox */}
      <ServiceContractLightbox 
        isOpen={isServiceLightboxOpen} 
        onClose={() => setIsServiceLightboxOpen(false)} 
      />

      {/* Courier Service Section */}
      <CourierServiceSection productName="Brother HL-L6210DW" />

    {/* Footer */}
<footer className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/20 py-12">
  <div className="container mx-auto px-4">
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-center gap-10">
        <img src="/takma_logo_footer.png" alt="TAKMA" className="h-14 w-auto" />
        <span className="text-gray-700 text-lg">takma@takma.com.pl</span>
        <span className="text-gray-700 text-lg">607 819 688</span>
        <span className="text-gray-700 text-lg">51-128 Wrocław, ul. Poświęcka 1a</span>
      </div>
      <div className="w-full max-w-4xl border-t border-gray-300"></div>
      <div className="text-gray-500 text-sm">
        © 2024 Rejestratory.info. Wszystkie prawa zastrzeżone.
      </div>
    </div>
  </div>
</footer>
</div>
  )
}
