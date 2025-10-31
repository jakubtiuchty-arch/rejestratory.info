"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { 
  Phone,
  Mail,
  MapPin,
  Clock,
  TreePine,
  Building,
  Users,
  ShoppingCart,
  Wrench,
  MessageSquare,
  Send,
  ChevronRight,
  Loader2,
  Navigation,
  Car,
  Train,
  Bus
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
    
    // Symulacja wysyłania
    await new Promise(resolve => setTimeout(resolve, 1500));
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
  };

  const departments = [
    {
      id: 'sales',
      name: 'Dział Handlowy',
      icon: ShoppingCart,
      phone: '+48 123 456 789',
      email: 'sprzedaz@itdlalasow.pl',
      hours: 'Pon-Pt: 8:00-16:00',
      description: 'Zapytania ofertowe, wyceny, przetargi'
    },
    {
      id: 'service',
      name: 'Serwis',
      icon: Wrench,
      phone: '+48 123 456 788',
      email: 'serwis@itdlalasow.pl',
      hours: 'Pon-Pt: 8:00-16:00',
      description: 'Zgłoszenia napraw, status serwisu, gwarancje'
    },
    {
      id: 'support',
      name: 'Wsparcie Techniczne',
      icon: MessageSquare,
      phone: '+48 123 456 787',
      email: 'pomoc@itdlalasow.pl',
      hours: 'Pon-Pt: 7:00-17:00',
      description: 'Pomoc techniczna, konfiguracja, szkolenia'
    },
    {
      id: 'accounting',
      name: 'Księgowość',
      icon: Building,
      phone: '+48 123 456 786',
      email: 'ksiegowosc@itdlalasow.pl',
      hours: 'Pon-Pt: 9:00-15:00',
      description: 'Faktury, płatności, rozliczenia'
    }
  ];

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <TreePine className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">IT dla Lasów</span>
            </div>
            
            <ul className="hidden md:flex items-center gap-8">
              <li><a href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">Strona główna</a></li>
              <li><a href="/produkty" className="text-gray-700 hover:text-emerald-600 transition-colors">Produkty</a></li>
              <li><a href="/serwis" className="text-gray-700 hover:text-emerald-600 transition-colors">Serwis</a></li>
              <li><a href="/kontakt" className="text-emerald-600">Kontakt</a></li>
            </ul>
            
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Phone className="h-4 w-4 mr-2" />
              +48 123 456 789
            </Button>
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
            Nasz zespół ekspertów jest gotowy odpowiedzieć na wszystkie pytania 
            i pomóc w doborze najlepszych rozwiązań IT dla Twojego nadleśnictwa.
          </p>
        </motion.div>

        {/* Szybki kontakt */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Zadzwoń</h3>
                <p className="text-emerald-600 font-semibold text-lg">+48 123 456 789</p>
                <p className="text-sm text-gray-500 mt-1">Pon-Pt: 8:00-16:00</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Napisz</h3>
                <p className="text-emerald-600 font-semibold text-lg">kontakt@itdlalasow.pl</p>
                <p className="text-sm text-gray-500 mt-1">Odpowiadamy w 24h</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Odwiedź</h3>
                <p className="text-emerald-600 font-semibold">ul. Leśna 10</p>
                <p className="text-sm text-gray-500 mt-1">00-001 Warszawa</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Główna sekcja kontaktowa */}
      <Section className="bg-gray-50">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formularz */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
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
                            <SelectItem value="support">Wsparcie</SelectItem>
                            <SelectItem value="accounting">Księgowość</SelectItem>
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

          {/* Informacje kontaktowe */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Dane kontaktowe
            </h2>
            
            {/* Dane firmy */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">IT dla Lasów Sp. z o.o.</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="font-medium">ul. Leśna 10</p>
                      <p className="text-gray-600">00-001 Warszawa</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="text-gray-600">NIP: 123-456-78-90</p>
                      <p className="text-gray-600">REGON: 123456789</p>
                      <p className="text-gray-600">KRS: 0000123456</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Mapa */}
            <Card className="mb-6 overflow-hidden">
              <div className="h-64 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Mapa Google</p>
                    <p className="text-sm text-gray-400">Tu będzie osadzona mapa</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <Button variant="outline" className="w-full">
                  <Navigation className="mr-2 h-4 w-4" />
                  Otwórz w Google Maps
                </Button>
              </CardContent>
            </Card>
            
            {/* Dojazd */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Jak dojechać?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Car className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Samochodem</p>
                    <p className="text-sm text-gray-600">Parking bezpłatny dla klientów</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Train className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Metro</p>
                    <p className="text-sm text-gray-600">Stacja Centrum (5 min pieszo)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Bus className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Autobus</p>
                    <p className="text-sm text-gray-600">Linie: 175, 128, 507</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Działy */}
      <Section className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Skontaktuj się z właściwym działem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wybierz dział, który najlepiej odpowiada Twoim potrzebom
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <dept.icon className="h-6 w-6 text-emerald-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{dept.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{dept.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <a href={`tel:${dept.phone}`} className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                      <Phone className="h-4 w-4" />
                      {dept.phone}
                    </a>
                    <a href={`mailto:${dept.email}`} className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                      <Mail className="h-4 w-4" />
                      {dept.email}
                    </a>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="h-4 w-4" />
                      {dept.hours}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TreePine className="h-6 w-6 text-emerald-400" />
                <span className="text-lg font-bold text-white">IT dla Lasów</span>
              </div>
              <p className="text-sm">
                Kompleksowe rozwiązania IT dla Lasów Państwowych
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Produkty</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/produkty/rejestratory" className="hover:text-emerald-400 transition-colors">Rejestratory</a></li>
                <li><a href="/produkty/drukarki" className="hover:text-emerald-400 transition-colors">Drukarki</a></li>
                <li><a href="/produkty/laptopy" className="hover:text-emerald-400 transition-colors">Komputery</a></li>
                <li><a href="/produkty/serwery" className="hover:text-emerald-400 transition-colors">Serwery</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Usługi</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/serwis" className="hover:text-emerald-400 transition-colors">Serwis</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Gwarancje</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Szkolenia</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Wdrożenia</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Kontakt</h4>
              <ul className="space-y-2 text-sm">
                <li>tel: +48 123 456 789</li>
                <li>email: kontakt@itdlalasow.pl</li>
                <li>pon-pt: 8:00-16:00</li>
                <li className="pt-2">
                  <a href="/kontakt" className="text-emerald-400 hover:text-emerald-300">
                    Zobacz pełne dane kontaktowe →
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2024 IT dla Lasów. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactPage;