"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

export default function CrispChat() {
  const pathname = usePathname();

  useEffect(() => {
    // Sprawdź czy Crisp już nie został załadowany
    if (typeof window !== 'undefined' && !window.$crisp) {
      // Inicjalizacja Crisp
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "8028d4ea-27db-4f84-abe5-4f0c5bce91c7";

      // Tworzenie i dodawanie skryptu
      const script = document.createElement("script");
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  }, []);

  // Aktualizuj dane sesji przy zmianie strony
  useEffect(() => {
    if (typeof window !== 'undefined' && window.$crisp) {
      
      // Określ segment/dział na podstawie URL
      let segment = 'Ogólne zapytania';
      let customData: any = {};
      
      if (pathname?.includes('/serwis')) {
        segment = 'Serwis';
        customData = {
          department: 'serwis',
          page_type: 'Strona serwisowa'
        };
      } else if (pathname?.includes('/kontakt')) {
        segment = 'Kontakt';
        customData = {
          department: 'kontakt',
          page_type: 'Formularz kontaktowy'
        };
      } else if (pathname?.includes('/produkt/')) {
        segment = 'Pytania o produkt';
        // Wyciągnij nazwę produktu z URL
        const productName = pathname.split('/produkt/')[1]?.replace(/-/g, ' ') || 'Nieznany';
        customData = {
          department: 'produkty',
          page_type: 'Karta produktu',
          product_name: productName
        };
      } else if (pathname?.includes('/kategoria/')) {
        segment = 'Pytania o kategorie';
        const categoryName = pathname.split('/kategoria/')[1]?.replace(/-/g, ' ') || 'Nieznana';
        customData = {
          department: 'kategorie',
          page_type: 'Strona kategorii',
          category_name: categoryName
        };
      }

      // Ustaw segment (widoczny w panelu Crisp)
      window.$crisp.push(['set', 'session:segments', [[segment]]]);
      
      // Ustaw dane niestandardowe
      window.$crisp.push(['set', 'session:data', [[
        ['current_page', pathname],
        ['segment', segment],
        ...Object.entries(customData)
      ]]]);
    }
  }, [pathname]);

  return null;
}