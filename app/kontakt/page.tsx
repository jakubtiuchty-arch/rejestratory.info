"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Phone,
  Mail,
  Clock,
  ShoppingCart,
  Wrench,
  Send,
  Loader2,
  CreditCard,
  AlertCircle
} from "lucide-react";

// Komponenty współdzielone
const Section = ({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    <div className="container mx-auto px-4">
      {children}
    </div>
  </section>
);

const ContactPage = () => {
  const [formState, setFormState] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    department: 'general',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Błąd wysyłania formularza');
      }

      setFormState('success');
      
      // Reset po 5 sekundach
      setTimeout(() => {
        setFormState('idle');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          department: 'general',
          message: ''
        });
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      setFormState('error');
      
      // Reset error state po 5 sekundach
      setTimeout(() => {
        setFormState('idle');
      }, 5000);
    }
  };

  return (
    <>
      {/* Header */}
      <Header activeTab="kontakt" />
      {/* STARY_HEADER_START
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/rejestratory_logo_footer_header.png" alt="Rejestartory.info" className="h-10 w-auto" />
            </div>
            
            <div className="flex items-center gap-8">
              <ul className="hidden md:flex items-center gap-8">
                <li><a href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">Strona główna</a></li>
                <li><a href="#produkty" className="text-gray-700 hover:text-emerald-600 transition-colors">Produkty</a></li>
                <li><a href="/serwis" className="text-gray-700 hover:text-emerald-600 transition-colors">Serwis</a></li>
                <li><a href="/kontakt" className="text-emerald-600">Kontakt</a></li>
              </ul>
              
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Zapytanie (0)
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <Section className="pt-24 md:pt-32 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-emerald-200">
            Jesteśmy do Twojej dyspozycji
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Skontaktuj się
            <span className="text-emerald-600"> z nami</span>
          </h1>
          
          <p className="text-xl text-gray-600">
            Nasz zespół jest gotowy odpowiedzieć na wszystkie pytania 
            i pomóc w doborze najlepszych rozwiązań IT dla Twojego nadleśnictwa.
          </p>
        </motion.div>

        {/* Szybki kontakt - Działy */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-6">
                <div className="mb-4 h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dział Handlowy</h3>
                <p className="text-gray-600 text-sm mb-4">Zapytania ofertowe, wyceny, przetargi</p>
                
                <div className="space-y-2 text-sm">
                  <a href="tel:+48607819688" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                    <Phone className="h-4 w-4" />
                    +48 607 819 688
                  </a>
                  <a href="mailto:handlowy@takma.com.pl" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                    <Mail className="h-4 w-4" />
                    handlowy@takma.com.pl
                  </a>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="h-4 w-4" />
                    Pon-Pt: 7:30-15:30
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-6">
                <div className="mb-4 h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Serwis</h3>
                <p className="text-gray-600 text-sm mb-4">Zgłoszenia napraw, status serwisu, gwarancje</p>
                
                <div className="space-y-2 text-sm">
                  <a href="tel:+48601619898" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                    <Phone className="h-4 w-4" />
                    +48 601 619 898
                  </a>
                  <a href="mailto:serwis@takma.com.pl" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                    <Mail className="h-4 w-4" />
                    serwis@takma.com.pl
                  </a>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="h-4 w-4" />
                    Pon-Pt: 7:30-15:30
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-6">
                <div className="mb-4 h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Urządzenia fiskalne</h3>
                <p className="text-gray-600 text-sm mb-4">Kasy fiskalne, drukarki fiskalne</p>
                
                <div className="space-y-2 text-sm">
                  <a href="tel:+48607778977" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                    <Phone className="h-4 w-4" />
                    +48 607 778 977
                  </a>
                  <a href="mailto:fiskalne@takma.com.pl" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                    <Mail className="h-4 w-4" />
                    fiskalne@takma.com.pl
                  </a>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="h-4 w-4" />
                    Pon-Pt: 7:30-15:30
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Główna sekcja kontaktowa */}
      <Section className="bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {/* Formularz */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Wyślij wiadomość
            </h2>
            
            {formState === 'success' ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <Card className="border-emerald-200 bg-emerald-50">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                      <Send className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-emerald-950">
                      Wiadomość wysłana!
                    </h3>
                    <p className="text-emerald-800">
                      Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : formState === 'error' ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                      <AlertCircle className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-red-950">
                      Wystąpił błąd
                    </h3>
                    <p className="text-red-800">
                      Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń: +48 607 819 688
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Imię i nazwisko *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={formState === 'submitting'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={formState === 'submitting'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={formState === 'submitting'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Nadleśnictwo / Firma</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          disabled={formState === 'submitting'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Temat *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          disabled={formState === 'submitting'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="department">Dział</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => handleSelectChange('department', value)}
                          disabled={formState === 'submitting'}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">Ogólne</SelectItem>
                            <SelectItem value="sales">Sprzedaż</SelectItem>
                            <SelectItem value="service">Serwis</SelectItem>
                            <SelectItem value="fiscal">Urządzenia fiskalne</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="message">Wiadomość *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          required
                          disabled={formState === 'submitting'}
                        />
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      size="lg"
                      disabled={formState === 'submitting'}
                      className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Wysyłanie...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Wyślij wiadomość
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </form>
            )}
          </motion.div>
        </div>
      </Section>

      {/* Sekcja mapy */}
      <section className="py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Mapa */}
          <div className="h-[500px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2502.460744765366!2d17.029628030923618!3d51.15529464901004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fe97f5f92b64b%3A0x934750315b0d622b!2zUG_Fm3dpxJlja2EgMUEsIDUxLTEyOCBXcm9jxYJhdw!5e0!3m2!1spl!2spl!4v1762107458606!5m2!1spl!2spl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa lokalizacji TAKMA - ul. Poświęcka 1a, 51-128 Wrocław"
            />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ContactPage;