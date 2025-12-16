'use client'

import CourierServiceSection from "@/components/CourierServiceSection";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image'
import {
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
  AlertTriangle
} from 'lucide-react'
import { useInquiry } from '@/components/InquiryContext'

// Image Gallery Component
const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div 
        className="relative rounded-lg overflow-hidden aspect-square p-10"
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/s25ultra_1.png"
            alt="Samsung S25 Ultra"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </motion.div>
    </div>
  )
}


// Specifications Component
const Specifications = () => {
  const specs = [
    { category: "Wyświetlacz", items: [
      { name: "Rozmiar", value: "6.9 cala" },
      { name: "Rozdzielczość", value: "1440 x 3120 QHD+ Dynamic AMOLED 2X" },
    ]},
    { category: "Wydajność", items: [
      { name: "Procesor", value: "Snapdragon 8 Elite / Exynos 2500" },
      { name: "RAM", value: "12 GB / 16 GB" },
      { name: "Pamięć", value: "256 GB / 512 GB / 1 TB" }
    ]},
    { category: "Wytrzymałość", items: [
      { name: "Norma", value: "IP68 - pyłoszczelny i wodoodporny" },
      { name: "Upadki", value: "Gorilla Glass Victus 2 + ramka tytanowa" },
      { name: "Temperatura", value: "-10°C do +40°C" }
    ]},
    { category: "Bateria", items: [
      { name: "Pojemność", value: "5000 mAh" },
      { name: "Czas pracy", value: "Do 16 godzin" },
      { name: "Ładowanie", value: "USB-C, 45W + S Pen" }
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
                  Urządzenia konsumenckie, takie jak Samsung Galaxy S25 Ultra, nie są objęte 
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
const AccessoriesSection = ({ productName }: { productName: string }) => {
  const { addToInquiry } = useInquiry()
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])

  const accessories = [
    {
      id: 'charger',
      name: 'Ładowarka sieciowa USB-C',
      description: 'Szybka ładowarka 45W z kablem USB-C',
      price: '89 zł'
    },
    {
      id: 'case',
      name: 'Etui ochronne Premium',
      description: 'Etui z miejscem na S Pen',
      price: '99 zł'
    },
    {
      id: 'glass',
      name: 'Szkło hartowane 9H',
      description: 'Hartowane szkło ochronne na ekran',
      price: '49 zł'
    },
    {
      id: 'mount',
      name: 'Uchwyt samochodowy',
      description: 'Uniwersalny uchwyt do montażu w pojeździe',
      price: '159 zł'
    }
  ]

  const toggleAccessory = (accessoryId: string) => {
    setSelectedAccessories(prev => 
      prev.includes(accessoryId) 
        ? prev.filter(id => id !== accessoryId)
        : [...prev, accessoryId]
    )
  }

  const handleAddSelectedToInquiry = () => {
    selectedAccessories.forEach(accessoryId => {
      const accessory = accessories.find(a => a.id === accessoryId)
      if (accessory) {
        addToInquiry({
          id: `samsung-s25ultra-accessory-${accessory.id}`,
          name: accessory.name,
          image: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
          category: 'Akcesoria',
          description: accessory.description
        })
      }
    })
    setSelectedAccessories([])
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
              Akcesoria
            </h3>
          </div>
          {selectedAccessories.length > 0 && (
            <motion.button
              onClick={handleAddSelectedToInquiry}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Package className="w-5 h-5" />
              <span>Dodaj do zapytania ({selectedAccessories.length})</span>
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
export default function SamsungS25UltraProductPage() {
  const [activeTab, setActiveTab] = useState('specs')
  const [isServiceLightboxOpen, setIsServiceLightboxOpen] = useState(false)
  const { inquiryCount, addToInquiry, openCart } = useInquiry()
  const [showRipple, setShowRipple] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab="produkty" />
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-500">
          <a href="/" className="hover:text-emerald-600">Strona główna</a>
          <span className="mx-2">/</span>
          <a href="/kategoria/telefony" className="hover:text-emerald-600">Telefony</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Samsung S25 Ultra</span>
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
                  Telefon konsumencki
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Samsung Galaxy S25 Ultra
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Samsung Galaxy S25 Ultra to najwyższej klasy smartfon konsumencki z ekranem 6.9 cala, zaprojektowany z myślą o rozrywce multimedialnej i zaawansowanych zastosowaniach mobilnych. 
                Duży wyświetlacz Dynamic AMOLED 2X oraz wydajny procesor zapewniają doskonałe doświadczenia podczas grania w gry mobilne i oglądania treści wideo w wysokiej rozdzielczości. 
                Dołączony rysik S Pen umożliwia precyzyjne notowanie i rysowanie. 
                Urządzenie nie jest jednak przeznaczone do intensywnej pracy w trudnych warunkach terenowych - jego konstrukcja konsumencka, wysoka cena nabycia oraz charakter systemu operacyjnego ograniczają zastosowania profesjonalne. 
                Integracja z wyspecjalizowanymi urządzeniami peryferyjnymi, takimi jak drukarki fiskalne może wymagać dodatkowych rozwiązań programowych ze względu na ograniczoną natywną kompatybilność protokołów komunikacyjnych.
              </p>
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'samsung-galaxy-s25-ultra',
                      name: 'Samsung Galaxy S25 Ultra',
                      image: '/s25ultra_1.png',
                      category: 'Telefony',
                      description: 'Najwyższej klasy smartfon konsumencki z ekranem 6.9 cala i rysikiem S Pen',
                      specifications: '6.9" QHD+ Dynamic AMOLED 2X, Snapdragon 8 Elite, 12-16GB RAM, S Pen, IP68'
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

              {/* Kontrakty serwisowe - NIEDOSTĘPNE */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-200 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-red-700">Kontrakty serwisowe niedostępne</h4>
                      <motion.button
                        onClick={() => setIsServiceLightboxOpen(true)}
                        className="p-1 hover:bg-red-200 rounded-full transition-colors"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      >
                        <Info className="w-4 h-4 text-red-600" />
                      </motion.button>
                    </div>
                    <p className="text-sm text-gray-600">
                      Urządzenia konsumenckie nie są objęte kontraktami serwisowymi. 
                      Oznacza to brak gwarancji szybkiej naprawy, długie przestoje i brak urządzeń zastępczych. 
                      Administrator nie ma spokoju, a ciągłość pracy leśniczego w terenie jest zagrożona przy każdej awarii.
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
        <AccessoriesSection productName="Samsung Galaxy S25 Ultra" />

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
                  { title: "Karta katalogowa", type: "PDF", size: "2.1 MB" },
                  { title: "Instrukcja obsługi", type: "PDF", size: "5.3 MB" },
                  { title: "Specyfikacja techniczna", type: "PDF", size: "1.4 MB" }
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
      <CourierServiceSection productName="Samsung Galaxy S25 Ultra" />

  {/* Footer */}
<Footer />
</div>
  )
}
