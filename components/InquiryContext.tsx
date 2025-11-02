"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export type InquiryProduct = {
  id: string
  name: string
  image: string
  category?: string
  description?: string
  specifications?: string
}

type InquiryContextType = {
  items: InquiryProduct[]
  inquiryCount: number
  isCartOpen: boolean
  addToInquiry: (product: InquiryProduct) => void
  removeFromInquiry: (productId: string) => void
  clearInquiry: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined)

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryProduct[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load z localStorage po mount (unikamy hydration mismatch)
  useEffect(() => {
    const saved = localStorage.getItem('inquiry_items')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error('Błąd wczytywania zapytania:', e)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save do localStorage przy każdej zmianie
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('inquiry_items', JSON.stringify(items))
    }
  }, [items, isHydrated])

  const addToInquiry = (product: InquiryProduct) => {
    setItems(prev => {
      // Sprawdź czy produkt już istnieje
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev // Nie dodawaj duplikatów
      }
      return [...prev, product]
    })
  }

  const removeFromInquiry = (productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId))
  }

  const clearInquiry = () => {
    setItems([])
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen(prev => !prev)

  const value: InquiryContextType = {
    items,
    inquiryCount: items.length,
    isCartOpen,
    addToInquiry,
    removeFromInquiry,
    clearInquiry,
    openCart,
    closeCart,
    toggleCart
  }

  return (
    <InquiryContext.Provider value={value}>
      {children}
    </InquiryContext.Provider>
  )
}

export function useInquiry() {
  const context = useContext(InquiryContext)
  if (context === undefined) {
    throw new Error('useInquiry musi być użyty wewnątrz InquiryProvider')
  }
  return context
}
