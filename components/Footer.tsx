"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/20 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
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
  );
}