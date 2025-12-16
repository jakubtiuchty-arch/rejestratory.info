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
  Laptop
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
        className="relative bg-white rounded-lg overflow-hidden cursor-pointer p-12"
        style={{ minHeight: '500px' }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src={images[currentImage]}
          alt="Zasilacz UPS Vertiv Liebert itON 600 VA"
          className="w-full h-full object-contain"
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
                src={images[currentImage]}
                alt="Zasilacz UPS Vertiv Liebert itON 600 VA - powiększenie"
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

// Main Product Page Component
export default function VertinItON600ProductPage() {
  const { inquiryCount, addToInquiry, openCart } = useInquiry()
  const [showRipple, setShowRipple] = useState(false)

  const productImages = [
    '/vertin_600_1.png'
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activeTab="produkty" />
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-500">
          <a href="/" className="hover:text-emerald-600">Strona główna</a>
          <span className="mx-2">/</span>
          <a href="/kategoria/akcesoria-komputerowe" className="hover:text-emerald-600">Akcesoria komputerowe</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Zasilacz UPS Vertiv Liebert itON 600 VA</span>
        </nav>
      </div>

      {/* Product Hero Section */}
      <div className="container mx-auto px-4 flex-grow pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={productImages} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  Zasilacz UPS
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Zasilacz UPS Vertiv Liebert itON 600 VA
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Niezawodny zasilacz UPS typu line-interactive zaprojektowany do ochrony komputerów stacjonarnych oraz autonomicznego sprzętu IT. Dzięki kompaktowej konstrukcji i łatwemu w obsłudze sterowaniu gwarantuje podtrzymywanie zasilania wystarczające do bezpiecznego zapisania pracy i płynnego wyłączenia systemu. Automatyczny regulator napięcia (AVR) zapewnia stabilność zasilania nawet w niestabilnych warunkach sieciowych. Idealny do pracy biurowej w nadleśnictwach - niezawodny, funkcjonalny i łatwy w obsłudze.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Najważniejsze cechy:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Moc:</strong> 600 VA / 360 W</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Napięcie wejściowe:</strong> 230 V (modyfikowana sinusoida), 50 Hz</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Gniazda wyjściowe:</strong> 2 gniazda Schuko</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Bateria:</strong> VRLA 7Ah 12V</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Funkcje:</strong> Automatyczny regulator napięcia (AVR), zabezpieczenie przed przeciążeniem, automatyczne ponowne uruchomienie, funkcja zimnego startu</span>
                  </li>
                </ul>
              </div>

              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'vertin-iton-600',
                      name: 'Zasilacz UPS Vertiv Liebert itON 600 VA',
                      image: '/vertin_600_1.png',
                      category: 'Zasilacze UPS',
                      description: 'Niezawodny zasilacz UPS typu line-interactive do ochrony komputerów i sprzętu IT',
                      specifications: '600 VA / 360 W, 230V, 2 gniazda Schuko, bateria VRLA 7Ah 12V, AVR'
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
      </div>

{/* Footer */}
<Footer />
</div>
  )
}