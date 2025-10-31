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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { 
  Wrench,
  Clock,
  ShieldCheck,
  Truck,
  CheckCircle,
  AlertCircle,
  TreePine,
  Phone,
  Mail,
  MapPin,
  Package,
  Cpu,
  Monitor,
  Smartphone,
  Printer,
  Server,
  FileText,
  ChevronRight,
  Loader2
} from "lucide-react";

// Komponenty współdzielone
const Section = ({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    <div className="container mx-auto px-4">
      {children}
    </div>
  </section>
);

const ServicePage = () => {
  const [formState, setFormState] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    deviceType: '',
    model: '',
    serialNumber: '',
    description: '',
    warranty: 'yes'
  });

  // Stan dla modala statusu
  const [statusModalOpen, setStatusModalOpen] = React.useState(false);
  const [statusNumber, setStatusNumber] = React.useState('');
  const [statusData, setStatusData] = React.useState<any>(null);
  const [statusLoading, setStatusLoading] = React.useState(false);

  // Mockowe dane statusów napraw
  const mockStatuses = {
    '2024-1234': {
      number: '2024-1234',
      device: 'Zebra EM45',
      dateReceived: '2024-10-20',
      estimatedCompletion: '2024-10-27',
      currentStatus: 'in-repair',
      customer: 'Jan Kowalski',
      timeline: [
        { status: 'received', label: 'Przyjęte', date: '2024-10-20 14:30', completed: true },
        { status: 'diagnosis', label: 'W diagnozie', date: '2024-10-21 09:15', completed: true },
        { status: 'parts', label: 'Oczekuje na części', date: '2024-10-22 11:00', completed: true },
        { status: 'repair', label: 'W naprawie', date: '2024-10-24 08:45', completed: true, current: true },
        { status: 'ready', label: 'Gotowe do odbioru', date: '', completed: false }
      ]
    },
    '2024-1235': {
      number: '2024-1235',
      device: 'HP LaserJet Pro M404dn',
      dateReceived: '2024-10-22',
      estimatedCompletion: '2024-10-26',
      currentStatus: 'diagnosis',
      customer: 'Anna Nowak',
      timeline: [
        { status: 'received', label: 'Przyjęte', date: '2024-10-22 16:00', completed: true },
        { status: 'diagnosis', label: 'W diagnozie', date: '2024-10-23 10:00', completed: true, current: true },
        { status: 'parts', label: 'Oczekuje na części', date: '', completed: false },
        { status: 'repair', label: 'W naprawie', date: '', completed: false },
        { status: 'ready', label: 'Gotowe do odbioru', date: '', completed: false }
      ]
    },
    '2024-1236': {
      number: '2024-1236',
      device: 'Dell OptiPlex 7090',
      dateReceived: '2024-10-19',
      estimatedCompletion: '2024-10-24',
      currentStatus: 'ready',
      customer: 'Piotr Wiśniewski',
      timeline: [
        { status: 'received', label: 'Przyjęte', date: '2024-10-19 13:00', completed: true },
        { status: 'diagnosis', label: 'W diagnozie', date: '2024-10-19 15:30', completed: true },
        { status: 'parts', label: 'Oczekuje na części', date: 'Pominięte', completed: true },
        { status: 'repair', label: 'W naprawie', date: '2024-10-23 09:00', completed: true },
        { status: 'ready', label: 'Gotowe do odbioru', date: '2024-10-24 14:00', completed: true, current: true }
      ]
    }
  };

  const checkStatus = async () => {
    if (!statusNumber.trim()) return;
    
    setStatusLoading(true);
    // Symulacja opóźnienia API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const status = mockStatuses[statusNumber as keyof typeof mockStatuses];
    if (status) {
      setStatusData(status);
    } else {
      setStatusData({ error: 'Nie znaleziono zgłoszenia o podanym numerze' });
    }
    setStatusLoading(false);
  };

  const getStatusIcon = (status: string, completed: boolean, current?: boolean) => {
    if (current) {
      return <div className="w-4 h-4 bg-emerald-600 rounded-full animate-pulse" />;
    }
    if (completed) {
      return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    }
    return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'diagnosis': return 'bg-yellow-100 text-yellow-800';
      case 'parts': return 'bg-orange-100 text-orange-800';
      case 'repair': return 'bg-purple-100 text-purple-800';
      case 'ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
    
    // Reset formularza po 5 sekundach
    setTimeout(() => {
      setFormState('idle');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        deviceType: '',
        model: '',
        serialNumber: '',
        description: '',
        warranty: 'yes'
      });
    }, 5000);
  };

  const services = [
    {
      icon: Smartphone,
      title: "Rejestratory i telefony",
      description: "Naprawa urządzeń mobilnych Zebra, Honeywell, Datalogic",
      features: ["Wymiana ekranu", "Naprawa skanera", "Wymiana baterii", "Aktualizacja oprogramowania"]
    },
    {
      icon: Printer,
      title: "Drukarki",
      description: "Serwis drukarek mobilnych, laserowych i wielofunkcyjnych",
      features: ["Czyszczenie głowicy", "Kalibracja", "Wymiana części", "Konserwacja"]
    },
    {
      icon: Monitor,
      title: "Komputery i laptopy",
      description: "Naprawa sprzętu komputerowego wszystkich marek",
      features: ["Wymiana dysków", "Rozbudowa RAM", "Naprawa płyt głównych", "Odzyskiwanie danych"]
    },
    {
      icon: Server,
      title: "Serwery i infrastruktura",
      description: "Kompleksowa obsługa serwerów i systemów sieciowych",
      features: ["Diagnostyka", "Wymiana komponentów", "Konfiguracja RAID", "Wsparcie zdalne"]
    }
  ];

  const process = [
    {
      step: 1,
      title: "Zgłoszenie",
      description: "Wypełnij formularz lub zadzwoń",
      icon: FileText
    },
    {
      step: 2,
      title: "Diagnoza",
      description: "Bezpłatna wycena naprawy",
      icon: AlertCircle
    },
    {
      step: 3,
      title: "Naprawa",
      description: "Profesjonalny serwis",
      icon: Wrench
    },
    {
      step: 4,
      title: "Odbiór",
      description: "Dostawa lub odbiór osobisty",
      icon: Package
    }
  ];

  const faq = [
    {
      question: "Jak długo trwa naprawa?",
      answer: "Standardowy czas naprawy to 3-5 dni roboczych. W przypadku konieczności sprowadzenia części zamiennych, czas może się wydłużyć do 7-10 dni. Naprawy gwarancyjne realizujemy w trybie priorytetowym."
    },
    {
      question: "Czy oferujecie urządzenia zastępcze?",
      answer: "Tak, dla klientów biznesowych oferujemy urządzenia zastępcze na czas naprawy. Dostępność zależy od typu urządzenia i warunków umowy serwisowej."
    },
    {
      question: "Jakie marki obsługujecie?",
      answer: "Obsługujemy wszystkie główne marki: Zebra, Honeywell, Datalogic, HP, Dell, Lenovo, Brother, Epson i wiele innych. Jesteśmy autoryzowanym serwisem dla wybranych producentów."
    },
    {
      question: "Czy naprawiacie sprzęt po gwarancji?",
      answer: "Oczywiście! Naprawiamy zarówno sprzęt na gwarancji, jak i pogwarancyjny. Dla urządzeń pogwarancyjnych oferujemy konkurencyjne ceny i gwarancję na wykonaną naprawę."
    },
    {
      question: "Jak wygląda proces reklamacji?",
      answer: "Po zgłoszeniu reklamacji otrzymasz numer RMA. Następnie należy dostarczyć urządzenie do serwisu. Po diagnozie poinformujemy o zakresie naprawy i terminie realizacji."
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
              <li><a href="/serwis" className="text-emerald-600">Serwis</a></li>
              <li><a href="/kontakt" className="text-gray-700 hover:text-emerald-600 transition-colors">Kontakt</a></li>
            </ul>
            
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Phone className="h-4 w-4 mr-2" />
              Zadzwoń
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
          className="text-center max-w-4xl mx-auto"
        >
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-emerald-200">
            Autoryzowany Serwis
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Profesjonalny serwis IT
            <span className="text-emerald-600"> dla Lasów Państwowych</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Naprawiamy wszystkie urządzenia IT. Gwarancja na naprawy, 
            szybkie terminy realizacji i konkurencyjne ceny.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-emerald-600" />
              <span className="text-gray-700">Ekspresowe naprawy</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <span className="text-gray-700">Gwarancja do 24 miesięcy</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-emerald-600" />
              <span className="text-gray-700">Odbiór kurierem</span>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Zgłoś naprawę
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setStatusModalOpen(true)}
            >
              Sprawdź status naprawy
            </Button>
          </div>
        </motion.div>
      </Section>

      {/* Co naprawiamy */}
      <Section className="bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Co naprawiamy?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kompleksowy serwis wszystkich urządzeń IT wykorzystywanych w leśnictwie
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-emerald-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Proces serwisowy */}
      <Section className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Jak przebiega naprawa?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Prosty proces w 4 krokach
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {process.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative">
                <div className="mx-auto mb-4 h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center">
                  <item.icon className="h-10 w-10 text-emerald-700" />
                </div>
                {index < process.length - 1 && (
                  <ChevronRight className="hidden md:block absolute top-10 -right-12 h-6 w-6 text-gray-300" />
                )}
              </div>
              <div className="text-5xl font-bold text-emerald-600 mb-2">{item.step}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Formularz zgłoszenia */}
      <Section id="zgloszenie" className="bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Zgłoś naprawę online
            </h2>
            <p className="text-xl text-gray-600">
              Wypełnij formularz, a skontaktujemy się w ciągu 24 godzin
            </p>
          </motion.div>

          {formState === 'success' ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 text-center"
            >
              <Card className="max-w-md mx-auto border-emerald-200 bg-emerald-50">
                <CardContent className="p-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-emerald-950">Zgłoszenie wysłane!</h3>
                  <p className="text-emerald-800 mb-4">Otrzymałeś numer zgłoszenia: #2024-1234</p>
                  <p className="text-gray-600">Skontaktujemy się z Tobą w ciągu 24 godzin.</p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
            >
              <Card className="shadow-xl">
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
                  <CardTitle className="text-2xl">Formularz zgłoszenia serwisowego</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Dane kontaktowe */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Dane kontaktowe</h3>
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
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
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
                    </div>
                  </div>
                  
                  {/* Informacje o urządzeniu */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informacje o urządzeniu</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="deviceType">Typ urządzenia *</Label>
                        <Select
                          value={formData.deviceType}
                          onValueChange={(value) => handleSelectChange('deviceType', value)}
                          disabled={formState === 'submitting'}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Wybierz typ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rejestrator">Rejestrator mobilny</SelectItem>
                            <SelectItem value="telefon">Telefon</SelectItem>
                            <SelectItem value="tablet">Tablet</SelectItem>
                            <SelectItem value="drukarka-mobilna">Drukarka mobilna</SelectItem>
                            <SelectItem value="drukarka-laserowa">Drukarka laserowa</SelectItem>
                            <SelectItem value="laptop">Laptop</SelectItem>
                            <SelectItem value="komputer">Komputer stacjonarny</SelectItem>
                            <SelectItem value="serwer">Serwer</SelectItem>
                            <SelectItem value="inne">Inne</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="model">Model urządzenia *</Label>
                        <Input
                          id="model"
                          name="model"
                          value={formData.model}
                          onChange={handleChange}
                          placeholder="np. Zebra EM45"
                          required
                          disabled={formState === 'submitting'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="serialNumber">Numer seryjny</Label>
                        <Input
                          id="serialNumber"
                          name="serialNumber"
                          value={formData.serialNumber}
                          onChange={handleChange}
                          disabled={formState === 'submitting'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="warranty">Czy urządzenie jest na gwarancji?</Label>
                        <Select
                          value={formData.warranty}
                          onValueChange={(value) => handleSelectChange('warranty', value)}
                          disabled={formState === 'submitting'}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Tak</SelectItem>
                            <SelectItem value="no">Nie</SelectItem>
                            <SelectItem value="unknown">Nie wiem</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Opis usterki */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Opis usterki</h3>
                    <div className="space-y-2">
                      <Label htmlFor="description">Opisz problem *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Proszę dokładnie opisać usterkę..."
                        required
                        disabled={formState === 'submitting'}
                      />
                    </div>
                  </div>
                  
                  {/* Przyciski */}
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={formState === 'submitting'}
                      className="bg-emerald-600 hover:bg-emerald-700 flex-1"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Wysyłanie...
                        </>
                      ) : (
                        'Wyślij zgłoszenie'
                      )}
                    </Button>
                  </div>
                  
                  {formState === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <p className="text-red-800 text-center">
                        Wystąpił błąd. Spróbuj ponownie lub zadzwoń: +48 123 456 789
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.form>
          )}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Najczęściej zadawane pytania
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-emerald-700 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">
            Potrzebujesz natychmiastowej pomocy?
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            Nasi technicy są dostępni od poniedziałku do piątku w godzinach 8:00-16:00
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
              <Phone className="mr-2 h-5 w-5" />
              +48 123 456 789
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-emerald-600">
              <Mail className="mr-2 h-5 w-5" />
              serwis@itdlalasow.pl
            </Button>
          </div>
        </motion.div>
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
                Profesjonalny serwis IT dla Lasów Państwowych
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Serwis</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Status naprawy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Cennik</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Gwarancje</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Regulamin</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Produkty</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/produkty/rejestratory" className="hover:text-emerald-400 transition-colors">Rejestratory</a></li>
                <li><a href="/produkty/drukarki" className="hover:text-emerald-400 transition-colors">Drukarki</a></li>
                <li><a href="/produkty/laptopy" className="hover:text-emerald-400 transition-colors">Laptopy</a></li>
                <li><a href="/produkty" className="hover:text-emerald-400 transition-colors">Zobacz wszystkie</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Kontakt serwisu</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +48 123 456 789
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  serwis@itdlalasow.pl
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  ul. Leśna 10, 00-001 Warszawa
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2024 IT dla Lasów. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>

      {/* Modal sprawdzania statusu */}
      <Dialog open={statusModalOpen} onOpenChange={setStatusModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Sprawdź status naprawy</DialogTitle>
            <DialogDescription>
              Wpisz numer zgłoszenia, aby sprawdzić aktualny status naprawy
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <div className="flex gap-2">
              <Input
                placeholder="np. 2024-1234"
                value={statusNumber}
                onChange={(e) => setStatusNumber(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') checkStatus();
                }}
              />
              <Button 
                onClick={checkStatus}
                disabled={statusLoading}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {statusLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Sprawdź'
                )}
              </Button>
            </div>
            
            {/* Przykładowe numery */}
            <div className="mt-2 text-sm text-gray-500">
              Przykładowe numery: 2024-1234, 2024-1235, 2024-1236
            </div>
            
            {/* Wyniki */}
            {statusData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                {statusData.error ? (
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-4">
                      <p className="text-red-800">{statusData.error}</p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">
                            Zgłoszenie #{statusData.number}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {statusData.device} • {statusData.customer}
                          </p>
                        </div>
                        <Badge className={getStatusColor(statusData.currentStatus)}>
                          {statusData.timeline.find((t: any) => t.current)?.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Timeline */}
                      <div className="relative">
                        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                        <div className="space-y-6">
                          {statusData.timeline.map((item: any, index: number) => (
                            <div key={index} className="flex gap-4 items-start">
                              <div className="relative z-10 bg-white p-1">
                                {getStatusIcon(item.status, item.completed, item.current)}
                              </div>
                              <div className={`flex-1 ${!item.completed ? 'opacity-50' : ''}`}>
                                <h4 className="font-semibold text-gray-900">{item.label}</h4>
                                <p className="text-sm text-gray-600">{item.date || 'Oczekiwanie'}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Dodatkowe informacje */}
                      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Data przyjęcia</p>
                          <p className="font-semibold">{statusData.dateReceived}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Przewidywany termin</p>
                          <p className="font-semibold">{statusData.estimatedCompletion}</p>
                        </div>
                      </div>
                      
                      {/* Kontakt */}
                      <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                        <p className="text-sm text-emerald-800">
                          Masz pytania? Zadzwoń: <strong>+48 123 456 789</strong>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServicePage;