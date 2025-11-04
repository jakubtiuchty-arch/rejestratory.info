import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { InquiryProvider } from '@/components/InquiryContext'
import InquiryCartPanel from '@/components/InquiryCartPanel'
import CrispChat from '@/components/CrispChat'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IT dla Lasów - Katalog produktów",
  description: "Kompleksowe rozwiązania IT dla Lasów Państwowych",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="pl">
    <body
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <InquiryProvider>
        {children}
        <InquiryCartPanel />
      </InquiryProvider>
      <CrispChat />
    </body>
  </html>
);
}