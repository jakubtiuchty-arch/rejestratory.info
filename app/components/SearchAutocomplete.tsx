"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Lista wszystkich produktów
const allProducts = [
  // Rejestratory Zebra
  { name: "Zebra EM45", category: "Rejestrator", url: "/produkt/zebra-em45", keywords: ["zebra", "em45", "rejestrator", "terminal", "android"] },
  { name: "Zebra TC27", category: "Rejestrator", url: "/produkt/zebra-tc27", keywords: ["zebra", "tc27", "rejestrator", "terminal", "android"] },
  { name: "Zebra TC58e", category: "Rejestrator", url: "/produkt/zebra-tc58e", keywords: ["zebra", "tc58e", "rejestrator", "terminal", "android"] },
  
  // Rejestratory Honeywell
  { name: "Honeywell CT30", category: "Rejestrator", url: "/produkt/honeywell-ct30", keywords: ["honeywell", "ct30", "rejestrator", "terminal"] },
  { name: "Honeywell CT40 XP", category: "Rejestrator", url: "/produkt/honeywell-ct40xp", keywords: ["honeywell", "ct40", "xp", "rejestrator", "terminal"] },
  { name: "Honeywell CT47", category: "Rejestrator", url: "/produkt/honeywell-ct47", keywords: ["honeywell", "ct47", "rejestrator", "terminal"] },
  { name: "Honeywell EDA52", category: "Rejestrator", url: "/produkt/honeywell-eda52", keywords: ["honeywell", "eda52", "rejestrator", "terminal"] },
  
  // Rejestratory Unitech
  { name: "Unitech EA660", category: "Rejestrator", url: "/produkt/unitech-ea660", keywords: ["unitech", "ea660", "rejestrator", "terminal"] },
  { name: "Unitech PA768", category: "Rejestrator", url: "/produkt/unitech-pa768", keywords: ["unitech", "pa768", "rejestrator", "terminal"] },
  
  // M3 Mobile
  { name: "M3 SL20", category: "Rejestrator", url: "/produkt/m3-sl20", keywords: ["m3", "sl20", "rejestrator", "terminal"] },
  
  // Telefony Samsung
  { name: "Samsung Galaxy A36", category: "Telefon", url: "/produkt/samsung-a36", keywords: ["samsung", "galaxy", "a36", "telefon", "smartfon"] },
  { name: "Samsung Galaxy A56", category: "Telefon", url: "/produkt/samsung-a56", keywords: ["samsung", "galaxy", "a56", "telefon", "smartfon"] },
  { name: "Samsung Galaxy S25 Plus", category: "Telefon", url: "/produkt/samsung-s25-plus", keywords: ["samsung", "galaxy", "s25", "plus", "telefon", "smartfon"] },
  { name: "Samsung Galaxy S25 Ultra", category: "Telefon", url: "/produkt/samsung-s25-ultra", keywords: ["samsung", "galaxy", "s25", "ultra", "telefon", "smartfon"] },
  { name: "Samsung Galaxy XCover7", category: "Telefon", url: "/produkt/samsung-xcover7", keywords: ["samsung", "galaxy", "xcover", "7", "telefon", "smartfon", "wytrzymały"] },
  
  // Laptopy Dell
  { name: "Dell Pro 14 Plus", category: "Laptop", url: "/produkt/dell-pro-14-plus", keywords: ["dell", "pro", "14", "plus", "laptop", "notebook"] },
  { name: "Dell Pro 16", category: "Laptop", url: "/produkt/dell-pro-16", keywords: ["dell", "pro", "16", "laptop", "notebook"] },
  { name: "Dell Pro 16 Plus", category: "Laptop", url: "/produkt/dell-pro-16-plus", keywords: ["dell", "pro", "16", "plus", "laptop", "notebook"] },
  
  // Laptop HP
  { name: "HP EliteBook 6 G1AH 16", category: "Laptop", url: "/produkt/hp-elitebook-6-g1ah-16", keywords: ["hp", "elitebook", "6", "g1ah", "16", "laptop", "notebook"] },
  
  // All in One
  { name: "AIO Dell Pro 24", category: "All in One", url: "/produkt/aio-dell-pro-24", keywords: ["dell", "pro", "24", "all", "in", "one", "aio", "komputer"] },
  
  // Monitory Dell
  { name: "Dell Pro 24 Plus P2424HEB", category: "Monitor", url: "/produkt/dell-pro-24-plus-p2424heb", keywords: ["dell", "pro", "24", "p2424heb", "monitor", "ekran"] },
  { name: "Dell Pro 24 Plus P2425HE", category: "Monitor", url: "/produkt/dell-pro-24-plus-p2425he", keywords: ["dell", "pro", "24", "p2425he", "monitor", "ekran"] },
  { name: "Dell Pro 24 Plus P2425HE USB-C", category: "Monitor", url: "/produkt/dell-pro-24-plus-p2425he-usbc", keywords: ["dell", "pro", "24", "p2425he", "usb-c", "monitor", "ekran"] },
  { name: "Dell Pro 27 Plus P2724HEB", category: "Monitor", url: "/produkt/dell-pro-27-plus-p2724heb", keywords: ["dell", "pro", "27", "p2724heb", "monitor", "ekran"] },
  { name: "Dell Pro 27 Plus P2725HE", category: "Monitor", url: "/produkt/dell-pro-27-plus-p2725he", keywords: ["dell", "pro", "27", "p2725he", "monitor", "ekran"] },
  { name: "Dell Pro 27 Plus P2725HE USB-C", category: "Monitor", url: "/produkt/dell-pro-27-plus-p2725he-usbc", keywords: ["dell", "pro", "27", "p2725he", "usb-c", "monitor", "ekran"] },
  
  // Monitory HP
  { name: "HP Seria 3 Pro 324PV", category: "Monitor", url: "/produkt/hp-seria-3-pro-324pv", keywords: ["hp", "seria", "3", "pro", "324pv", "monitor", "ekran"] },
  { name: "HP Seria 5 Pro 527PQ", category: "Monitor", url: "/produkt/hp-seria-5-pro-527pq", keywords: ["hp", "seria", "5", "pro", "527pq", "monitor", "ekran"] },
  { name: "HP Seria 5 Pro 527PU", category: "Monitor", url: "/produkt/hp-seria-5-pro-527pu", keywords: ["hp", "seria", "5", "pro", "527pu", "monitor", "ekran"] },
  
  // Serwery Dell
  { name: "Dell PowerEdge R360", category: "Serwer", url: "/produkt/dell-poweredge-r360", keywords: ["dell", "poweredge", "r360", "serwer", "server"] },
  { name: "Dell PowerEdge R550", category: "Serwer", url: "/produkt/dell-poweredge-r550", keywords: ["dell", "poweredge", "r550", "serwer", "server"] },
  { name: "Dell PowerEdge R660xs", category: "Serwer", url: "/produkt/dell-poweredge-r660xs", keywords: ["dell", "poweredge", "r660xs", "serwer", "server"] },
  
  // Urządzenia wielofunkcyjne Brother
  { name: "Brother MFC-L5710DW", category: "Urządzenie wielofunkcyjne", url: "/produkt/brother-mfc-l5710dw", keywords: ["brother", "mfc", "l5710dw", "wielofunkcyjne", "drukarka", "skaner"] },
  { name: "Brother MFC-L6710DW", category: "Urządzenie wielofunkcyjne", url: "/produkt/brother-mfc-l6710dw", keywords: ["brother", "mfc", "l6710dw", "wielofunkcyjne", "drukarka", "skaner"] },
  { name: "Brother MFC-L8390CDW", category: "Urządzenie wielofunkcyjne", url: "/produkt/brother-mfc-l8390cdw", keywords: ["brother", "mfc", "l8390cdw", "wielofunkcyjne", "drukarka", "skaner", "kolor"] },
  { name: "Brother MFC-L8690CDW", category: "Urządzenie wielofunkcyjne", url: "/produkt/brother-mfc-l8690cdw", keywords: ["brother", "mfc", "l8690cdw", "wielofunkcyjne", "drukarka", "skaner", "kolor"] },
  { name: "Brother MFC-L8900CDW", category: "Urządzenie wielofunkcyjne", url: "/produkt/brother-mfc-l8900cdw", keywords: ["brother", "mfc", "l8900cdw", "wielofunkcyjne", "drukarka", "skaner", "kolor"] },
  
  // Drukarki laserowe Brother
  { name: "Brother DCP-B7620DW", category: "Drukarka laserowa", url: "/produkt/brother-dcp-b7620dw", keywords: ["brother", "dcp", "b7620dw", "drukarka", "laserowa"] },
  { name: "Brother DCP-L5510DW", category: "Drukarka laserowa", url: "/produkt/brother-dcp-l5510dw", keywords: ["brother", "dcp", "l5510dw", "drukarka", "laserowa"] },
  { name: "Brother HL-L6210DW", category: "Drukarka laserowa", url: "/produkt/brother-hl-l6210dw", keywords: ["brother", "hl", "l6210dw", "drukarka", "laserowa"] },
  { name: "Brother HL-L6410", category: "Drukarka laserowa", url: "/produkt/brother-hl-l6410", keywords: ["brother", "hl", "l6410", "drukarka", "laserowa"] },
  
  // Drukarki do rejestratora
  { name: "Bixolon SPP-R410", category: "Drukarka do rejestratora", url: "/produkt/bixolon-spp-r410", keywords: ["bixolon", "spp", "r410", "drukarka", "mobilna", "paragon"] },
  { name: "Honeywell RP4", category: "Drukarka do rejestratora", url: "/produkt/honeywell-rp4", keywords: ["honeywell", "rp4", "drukarka", "mobilna", "paragon"] },
  { name: "Seiko MPA40", category: "Drukarka do rejestratora", url: "/produkt/seiko-mpa40", keywords: ["seiko", "mpa40", "drukarka", "mobilna", "paragon"] },
  { name: "Sewoo LKP400", category: "Drukarka do rejestratora", url: "/produkt/sewoo-lkp400", keywords: ["sewoo", "lkp400", "drukarka", "mobilna", "paragon"] },
  { name: "Sewoo LKP43", category: "Drukarka do rejestratora", url: "/produkt/sewoo-lkp43", keywords: ["sewoo", "lkp43", "drukarka", "mobilna", "paragon"] },
  { name: "Zebra ZQ521", category: "Drukarka do rejestratora", url: "/produkt/zebra-zq521", keywords: ["zebra", "zq521", "drukarka", "mobilna", "paragon"] },
  { name: "Honeywell PC45t", category: "Drukarka do rejestratora", url: "/produkt/honeywell-pc45t", keywords: ["honeywell", "pc45t", "drukarka", "etykiet"] },
  { name: "Zebra ZD421c", category: "Drukarka do rejestratora", url: "/produkt/zebra-zd421c", keywords: ["zebra", "zd421c", "drukarka", "etykiet"] },
  
  // Skanery
  { name: "Epson DS-730N", category: "Skaner", url: "/produkt/epson-ds730n", keywords: ["epson", "ds", "730n", "skaner", "dokumentów"] },
  { name: "Honeywell 1450g", category: "Skaner", url: "/produkt/honeywell-1450g", keywords: ["honeywell", "1450g", "skaner", "kodów"] },
  { name: "Zebra DS2208", category: "Skaner", url: "/produkt/zebra-ds2208", keywords: ["zebra", "ds2208", "skaner", "kodów"] },
  
  // Urządzenia fiskalne
  { name: "Posnet Pospay 2", category: "Urządzenie fiskalne", url: "/produkt/posnet-pospay-2", keywords: ["posnet", "pospay", "2", "kasa", "fiskalna", "terminal"] },
  { name: "Posnet Temo Online", category: "Urządzenie fiskalne", url: "/produkt/posnet-temo-online", keywords: ["posnet", "temo", "online", "kasa", "fiskalna", "drukarka"] }
]

interface SearchAutocompleteProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchAutocomplete({ value, onChange }: SearchAutocompleteProps) {
  const [filteredProducts, setFilteredProducts] = useState<typeof allProducts>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Zamknij dropdown po kliknięciu poza nim
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filtrowanie produktów (min. 3 znaki)
  useEffect(() => {
    if (value.length >= 3) {
      const query = value.toLowerCase().trim()
      const results = allProducts.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(query)
        const categoryMatch = product.category.toLowerCase().includes(query)
        const keywordsMatch = product.keywords.some(keyword => keyword.includes(query))
        return nameMatch || categoryMatch || keywordsMatch
      })
      setFilteredProducts(results.slice(0, 8)) // Max 8 wyników
      setIsOpen(results.length > 0)
      setSelectedIndex(-1)
    } else {
      setFilteredProducts([])
      setIsOpen(false)
    }
  }, [value])

  // Obsługa klawiatury (góra/dół/enter)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredProducts.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < filteredProducts.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      window.location.href = filteredProducts[selectedIndex].url
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const highlightMatch = (text: string, query: string) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase())
    if (index === -1) return text
    
    return (
      <>
        {text.slice(0, index)}
        <span className="bg-emerald-100 text-emerald-700 font-semibold">
          {text.slice(index, index + query.length)}
        </span>
        {text.slice(index + query.length)}
      </>
    )
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Szukaj produktów... (min. 3 znaki)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
        />
        {value && (
          <button
            onClick={() => {
              onChange('')
              setIsOpen(false)
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown z wynikami */}
      <AnimatePresence>
        {isOpen && filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-[9999] w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-[280px] overflow-y-auto scroll-smooth"
          >
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 font-medium">
                Znaleziono {filteredProducts.length} {filteredProducts.length === 1 ? 'produkt' : 'produktów'}
              </div>
              {filteredProducts.map((product, index) => (
                <motion.a
                  key={product.url}
                  href={product.url}
                  className={`block px-3 py-3 rounded-lg transition-colors ${
                    selectedIndex === index
                      ? 'bg-emerald-50 border-l-4 border-emerald-500'
                      : 'hover:bg-gray-50'
                  }`}
                  whileHover={{ x: 4 }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <Search className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">
                        {highlightMatch(product.name, value)}
                      </div>
                      <div className="text-xs text-emerald-600 mt-0.5">
                        {product.category}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info gdy za mało znaków */}
      {value.length > 0 && value.length < 3 && (
        <div className="absolute z-[9999] w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <Search className="h-4 w-4" />
            Wpisz co najmniej 3 znaki aby zobaczyć wyniki
          </div>
        </div>
      )}
    </div>
  )
}