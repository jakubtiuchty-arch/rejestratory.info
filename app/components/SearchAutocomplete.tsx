"use client"
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ICON } from '@/components/product/icons'
import { INDEKS_PRODUKTOW } from '@/data/wyszukiwarka'

const allProducts = INDEKS_PRODUKTOW

interface SearchAutocompleteProps {
  value: string
  onChange: (value: string) => void
  /** przycisk „Szukaj” obok pola — na stronie głównej, gdzie wyszukiwanie jest
   *  główną drogą do produktu; w mniejszych kontekstach zbędny */
  withButton?: boolean
}

export default function SearchAutocomplete({ value, onChange, withButton = false }: SearchAutocompleteProps) {
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

  /**
   * Otwiera wybraną podpowiedź, a gdy żadna nie jest podświetlona — pierwszą
   * z listy. Katalog nie ma osobnej strony wyników, więc to jest całe
   * „zatwierdzenie” wyszukiwania: Enter i przycisk robią to samo.
   */
  const otworz = () => {
    const cel = filteredProducts[selectedIndex >= 0 ? selectedIndex : 0]
    if (cel) window.location.href = cel.url
  }

  // Obsługa klawiatury (góra/dół/enter)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredProducts.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < filteredProducts.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      otworz()
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
      <div className="relative flex gap-2">
        <div className="relative min-w-0 flex-1">
        <img src={ICON.lupa} alt="" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 mix-blend-multiply" />
        <input
          type="text"
          placeholder="np. Zebra EM45, drukarka etykiet, monitor 24 cale"
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
            <img src={ICON.zamknij} alt="" className="h-4 w-4 mix-blend-multiply" />
          </button>
        )}
        </div>
        {withButton && (
          <button
            type="button"
            onClick={otworz}
            className="shrink-0 rounded-lg bg-emerald-700 px-6 font-semibold text-white transition hover:bg-emerald-800"
          >
            Szukaj
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
                      <img src={ICON.lupa} alt="" className="h-5 w-5 mix-blend-multiply" />
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
            <img src={ICON.lupa} alt="" className="h-4 w-4 mix-blend-multiply" />
            Wpisz co najmniej 3 znaki aby zobaczyć wyniki
          </div>
        </div>
      )}
    </div>
  )
}