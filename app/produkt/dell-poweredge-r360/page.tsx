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
  Palette,
  Nfc,
  Server,
  HardDrive,
  Cpu
} from 'lucide-react'
import { useInquiry } from '@/components/InquiryContext'

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
          src="/r360_1.png"
          alt="Dell PowerEdge R360"
          className="w-full h-full object-contain"
          style={{ transform: 'scale(0.935) translateY(-2%)' }}
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
                src="/r360_1.png"
                alt="Dell PowerEdge R360 - powiększenie"
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
    { category: "Procesor", items: [
      { name: "Model", value: "Intel® Xeon™ E-2436" },
      { name: "Taktowanie", value: "2.9 GHz - 5.0 GHz" },
      { name: "Rdzenie/Wątki", value: "6 rdzeni / 12 wątków" },
      { name: "Cache", value: "18 MB" },
      { name: "TDP", value: "65 W" }
    ]},
    { category: "Pamięć RAM", items: [
      { name: "Pojemność", value: "32 GB (2 x 16 GB)" },
      { name: "Typ", value: "DDR5 UDIMM ECC" },
      { name: "Prędkość", value: "5600 MT/s" }
    ]},
    { category: "Dyski i macierz RAID", items: [
      { name: "Zatoki na dyski", value: "Maksymalnie 4 dyski 3.5″ SAS/SATA (Hot-Plug)" },
      { name: "Kontroler RAID", value: "PERC H755 (Sprzętowy, 8 GB cache, 12 Gb/s)" },
      { name: "Poziomy RAID", value: "0/1/5/6/10/50/60" },
      { name: "Dyski twarde", value: "8 TB (4 x 2TB HDD, 7200 obr./min, SATA 6 Gb/s, 3.5″, Hot-Plug)" }
    ]},
    { category: "Zarządzanie i sieć", items: [
      { name: "Zdalne zarządzanie", value: "iDRAC9 Enterprise (1x RJ-45)" },
      { name: "Licencja OpenManage", value: "OpenManage Enterprise Advanced Plus" },
      { name: "Karta sieciowa", value: "Broadcom® 5720 Dual Port (2 x RJ-45, 1 Gb/s)" }
    ]},
    { category: "Zasilanie i obudowa", items: [
      { name: "Zasilacz", value: "2 x 700 W Hot-Plug (80 PLUS Titanium)" },
      { name: "Przewód zasilający", value: "Rack PDU 2 m (C13/C14)" },
      { name: "Maskownica", value: "LCD Bezel (1U)" },
      { name: "Szyny montażowe", value: "Ruchome ReadyRails™ z ramieniem na przewody" }
    ]},
    { category: "Gwarancja i wsparcie", items: [
      { name: "Gwarancja", value: "ProSupport z czasem reakcji Next Business Day Onsite" },
      { name: "Okres gwarancji", value: "60 miesięcy" },
      { name: "Dodatkowe opcje", value: "Zachowanie dysków twardych" }
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
                <h3 className="text-xl font-bold text-gray-900">Wsparcie serwisowe Dell ProSupport</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  Dell PowerEdge R360 jest objęty profesjonalnym wsparciem ProSupport, 
                  zapewniającym kompleksową ochronę i wsparcie techniczne dla infrastruktury serwerowej.
                </p>
                
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-700 mb-3">Korzyści z ProSupport:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Reakcja serwisu następnego dnia roboczego</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Priorytetowe wsparcie techniczne 24/7</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Zachowanie dysków twardych po wymianie</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Gwarancja przez 60 miesięcy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


// Main Product Page Component
export default function DellPowerEdgeR360ProductPage() {
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
          <a href="/kategoria/serwery" className="hover:text-emerald-600">Serwery</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Dell PowerEdge R360</span>
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
                  Serwer rack 1U
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dell PowerEdge R360
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Dell PowerEdge R360 to kompaktowy serwer rack 1U, idealny dla małych i średnich nadleśnictw. 
                Wydajny procesor Intel Xeon zapewnia sprawne przetwarzanie danych leśnych, a konstrukcja 1U 
                pozwala na efektywne wykorzystanie przestrzeni w szafie rack. System zarządzania iDRAC9 Enterprise 
                umożliwia zdalne monitorowanie i administrację, co jest szczególnie ważne dla rozproszonych 
                lokalizacji leśnych. Redundantne zasilacze Hot-Plug gwarantują ciągłość pracy nawet w przypadku 
                awarii jednego z nich.
              </p>
              
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'dell-poweredge-r360',
                      name: 'Dell PowerEdge R360',
                      image: '/r360_1.png',
                      category: 'Serwery',
                      description: 'Kompaktowy serwer rack 1U dla małych i średnich nadleśnictw',
                      specifications: 'Intel Xeon E-2436, 32GB RAM DDR5, 8TB HDD'
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

              {/* BOX 1 - RAM i HDD - niebieski gradient */}
              <div className="rounded-lg p-4 border-2 mb-4 shadow-md" style={{ background: 'linear-gradient(to right, #1e3a8a, #3b82f6, #93c5fd)', borderColor: '#3b82f6' }}>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                    <HardDrive className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-white">Wysoka pojemność pamięci i dysku</h4>
                    <p className="text-sm text-white">
                      Serwer wyposażony w 32 GB pamięci RAM DDR5 ECC oraz 8 TB przestrzeni dyskowej 
                      (4 x 2TB HDD w macierzy RAID). Zapewnia to wystarczającą wydajność i pojemność 
                      do obsługi systemów leśnych, baz danych i aplikacji biurowych.
                    </p>
                  </div>
                </div>
              </div>

              {/* BOX 2 - Rozbudowa - szary gradient */}
              <div className="rounded-lg p-4 border-2 mb-6 shadow-md" style={{ background: 'linear-gradient(to right, #374151, #6b7280, #9ca3af)', borderColor: '#6b7280' }}>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                    <Cpu className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1 text-white">Możliwość rozbudowy</h4>
                    <p className="text-sm text-white">
                      Serwer można swobodnie rozbudowywać w miarę wzrostu potrzeb nadleśnictwa. 
                      Możliwa jest rozbudowa pamięci RAM, dodanie większej ilości dysków twardych, 
                      wymiana kontrolera RAID na wydajniejszy oraz instalacja dodatkowych kart 
                      rozszerzeń. Elastyczna architektura pozwala na dostosowanie serwera do 
                      zmieniających się wymagań.
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
      <CourierServiceSection productName="Dell PowerEdge R360" />

 {/* Footer */}
<Footer />
</div>
  )
}
