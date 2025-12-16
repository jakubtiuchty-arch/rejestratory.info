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
  ChevronDown
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
        className="relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer flex items-center justify-center"
        style={{ minHeight: '600px' }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src="/eda52_1.png"
          alt="Honeywell EDA52"
          className="w-1/2 h-auto object-contain"
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
                src="/api/placeholder/800/800"
                alt="Honeywell EDA52 - powiększenie"
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
    { category: "Wyświetlacz", items: [
      { name: "Rozmiar", value: "Ekran 5,5''" },
      { name: "Rozdzielczość", value: "1280 x 720 HD" },
    ]},
    { category: "Wydajność", items: [
      { name: "Procesor", value: "Qualcomm Snapdragon Octa-Core 2,0 GHz" },
      { name: "RAM", value: "4GB" },
      { name: "Pamięć", value: "64 GB Flash" }
    ]},
    { category: "Wytrzymałość", items: [
      { name: "Norma", value: "IP67" },
      { name: "Upadki", value: "Wytrzymuje upadki z 1.2 m" },
      { name: "Temperatura", value: "-10°C do +50°C" }
    ]},
    { category: "Bateria", items: [
      { name: "Pojemność", value: "4500 mAh" },
      { name: "Czas pracy", value: "Do 14 godzin" },
      { name: "Ładowanie", value: "USB-C" }
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
                <h3 className="text-xl font-bold text-gray-900">Kontrakty serwisowe Honeywell</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  Kontrakty serwisowe Honeywell to kompleksowe programy wsparcia technicznego, 
                  które zapewniają ciągłość działania Twoich urządzeń mobilnych.
                </p>
                
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 mb-2">Co obejmuje kontrakt?</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Priorytetowe wsparcie techniczne 24/7</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Gwarancja wymiany urządzenia w 24h</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Regularne aktualizacje bezpieczeństwa</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Zdalne rozwiązywanie problemów</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Pokrycie kosztów napraw i części</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm">
                  Dostępne są różne poziomy kontraktów - od podstawowego wsparcia 
                  po zaawansowane pakiety z gwarancją wymiany następnego dnia roboczego.
                </p>
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
  const [showAllAccessories, setShowAllAccessories] = useState(false)

  const accessories = [
    {
      id: 'case',
      name: 'Etui ochronne',
      description: 'Wytrzymałe etui ochronne z paskiem na nadgarstek'
    },
    {
      id: 'screen',
      name: 'Szkło hartowane na ekran',
      description: 'Ochrona wyświetlacza przed zadrapaniami'
    },
    {
      id: 'mount',
      name: 'Uchwyt samochodowy',
      description: 'Uniwersalny uchwyt do montażu w pojeździe'
    },
    {
      id: 'carcharger',
      name: 'Ładowarka samochodowa',
      description: 'Szybka ładowarka do samochodu z kablem USB-C'
    },
    {
      id: 'dock-charging',
      name: 'Stacja dokująca służąca jedynie do ładowania urządzenia + zasilacz',
      description: 'Prosta stacja dokująca do ładowania'
    },
    {
      id: 'battery-4500',
      name: 'Akumulator 4500mAh',
      description: 'Akumulator zapasowy o pojemności 4500mAh'
    },
    {
      id: 'wrist-strap',
      name: 'Pasek na rękę',
      description: 'Wygodny pasek zabezpieczający na nadgarstek'
    },
    {
      id: 'protective-cover',
      name: 'Nakładka na obudowę zabezpieczająca przed uszkodzeniami',
      description: 'Dodatkowa ochrona obudowy przed uszkodzeniami'
    }
  ]

  const visibleAccessories = showAllAccessories ? accessories : accessories.slice(0, 4)

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
              Akcesoria
            </h3>
          </div>
          {selectedAccessories.length > 0 && (
            <motion.button
              onClick={() => {
                // Dodaj każde wybrane akcesorium do zapytania
                selectedAccessories.forEach(accessoryId => {
                  const accessory = accessories.find(a => a.id === accessoryId)
                  if (accessory) {
                    onAddToInquiry(accessory)
                  }
                })
                // Wyczyść zaznaczenie
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleAccessories.map((accessory) => {
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
                      {isSelected ? 'Wybrane' : 'Wybierz'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Show More Button */}
        {accessories.length > 4 && (
          <div className="mt-6 flex justify-center">
            <motion.button
              onClick={() => setShowAllAccessories(!showAllAccessories)}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{showAllAccessories ? 'Zwiń akcesoria' : 'Zobacz więcej akcesoriów'}</span>
              <motion.div
                animate={{ rotate: showAllAccessories ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

// Main Product Page Component
export default function HoneywellEDA52ProductPage() {
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
          <a href="/kategoria/rejestratory" className="hover:text-emerald-600">Rejestratory</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Honeywell EDA52</span>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Honeywell EDA52
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
               Honeywell EDA52 to niezawodny komputer mobilny zaprojektowany dla profesjonalistów pracujących w trudnych warunkach terenowych. W leśnictwie sprawdza się doskonale podczas inwentaryzacji drewna, szacowania zasobów leśnych oraz dokumentowania stanu drzewostanu. Wyposażony w procesor Qualcomm Snapdragon Octa-Core 2,0 GHz oraz 4GB RAM zapewnia płynną pracę z aplikacjami branżowymi jak SILP czy Leśnik+. Ekran 5,5" czytelny w słońcu pozwala na komfortową pracę podczas oględzin terenowych. Zintegrowany skaner kodów umożliwia szybkie skanowanie plakietek na drzewach. Certyfikat IP67 gwarantuje odporność na deszcz, błoto i kurz. Bateria 4500 mAh wystarcza na cały dzień intensywnej pracy. EDA52 to idealne narzędzie wspierające codzienne zadania leśnika
              </p>
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'honeywell-eda52',
                      name: 'Honeywell EDA52',
                      image: '/eda52_1.png',
                      category: 'Rejestratory',
                      description: 'Niezawodny komputer mobilny dla profesjonalistów',
                      specifications: 'Snapdragon Octa-Core 2.0 GHz, 4GB RAM, 64GB Flash, IP67'
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

              {/* Kontrakty serwisowe */}
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-emerald-700">Kontrakty serwisowe dostępne</h4>
                      <button
                        onClick={() => setIsServiceLightboxOpen(true)}
                        className="p-1 hover:bg-emerald-200 rounded-full transition-colors"
                      >
                        <Info className="w-4 h-4 text-emerald-600" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      Kontrakt serwisowy to spokój dla administratora i gwarancja ciągłości pracy dla leśniczego w terenie. 
                      Profesjonalne wsparcie zapewnia, że urządzenia zawsze będą gotowe do pracy.
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
          productName="Honeywell EDA52"
          onAddToInquiry={(accessory) => {
            addToInquiry({
              id: `eda52-accessory-${accessory.id}`,
              name: `${accessory.name} (do EDA52)`,
              image: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
              category: 'Akcesoria',
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
                  { title: "Karta katalogowa", type: "PDF", size: "2.1 MB" },
                  { title: "Instrukcja obsługi", type: "PDF", size: "8.7 MB" },
                  { title: "Specyfikacja techniczna", type: "PDF", size: "1.3 MB" },
                  { title: "Certyfikaty IP67", type: "PDF", size: "0.9 MB" },
                  { title: "Aplikacje mobilne", type: "APK", size: "45 MB" },
                  { title: "Narzędzia deweloperskie", type: "ZIP", size: "156 MB" }
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
      <CourierServiceSection productName="Honeywell EDA52" />

{/* Footer */}
<Footer />
</div>
  )
}
