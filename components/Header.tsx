"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { useInquiry } from '@/components/InquiryContext';

interface HeaderProps {
  activeTab?: 'home' | 'produkty' | 'serwis' | 'kontakt';
}

export default function Header({ activeTab = 'home' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { inquiryCount, openCart } = useInquiry();

  const isActive = (tab: string) => activeTab === tab;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <a href="/">
              <img src="/rejestratory_logo_footer_header.png" alt="Rejestartory.info" className="h-10 w-auto" />
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              <li>
                <a 
                  href="/" 
                  className={`transition-colors ${
                    isActive('home') 
                      ? 'text-emerald-600 font-semibold' 
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  Strona główna
                </a>
              </li>
              <li>
                <a 
                  href="/#produkty" 
                  className={`transition-colors ${
                    isActive('produkty') 
                      ? 'text-emerald-600 font-semibold' 
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  Produkty
                </a>
              </li>
              <li>
                <a 
                  href="/serwis" 
                  className={`transition-colors ${
                    isActive('serwis') 
                      ? 'text-emerald-600 font-semibold' 
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  Serwis
                </a>
              </li>
              <li>
                <a 
                  href="/kontakt" 
                  className={`transition-colors ${
                    isActive('kontakt') 
                      ? 'text-emerald-600 font-semibold' 
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  Kontakt
                </a>
              </li>
            </ul>
            
            <a 
              href="/panel-klienta"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-300 transition-colors"
            >
              <User className="h-4 w-4" />
              Panel Klienta
            </a>
            
            <button 
              onClick={openCart}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Zapytanie ({inquiryCount})
            </button>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="flex md:hidden items-center gap-3">
            <button 
              onClick={openCart}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              ({inquiryCount})
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200"
          >
            <ul className="py-4 space-y-2">
              <li>
                <a 
                  href="/" 
                  className={`block px-4 py-2 transition-colors ${
                    isActive('home')
                      ? 'text-emerald-600 bg-emerald-50 font-semibold'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Strona główna
                </a>
              </li>
              <li>
                <a 
                  href="/#produkty" 
                  className={`block px-4 py-2 transition-colors ${
                    isActive('produkty')
                      ? 'text-emerald-600 bg-emerald-50 font-semibold'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Produkty
                </a>
              </li>
              <li>
                <a 
                  href="/serwis" 
                  className={`block px-4 py-2 transition-colors ${
                    isActive('serwis')
                      ? 'text-emerald-600 bg-emerald-50 font-semibold'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Serwis
                </a>
              </li>
              <li>
                <a 
                  href="/kontakt" 
                  className={`block px-4 py-2 transition-colors ${
                    isActive('kontakt')
                      ? 'text-emerald-600 bg-emerald-50 font-semibold'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Kontakt
                </a>
              </li>
              <li className="pt-2 border-t border-gray-200 mt-2">
                <a 
                  href="/panel-klienta" 
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Panel Klienta
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </header>
  );
}