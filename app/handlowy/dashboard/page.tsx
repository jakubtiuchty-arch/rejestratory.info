"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  LogOut,
  Home,
  Loader2,
  Plus,
  Smartphone,
  Printer,
  Laptop,
  Monitor,
  Server,
  LayoutGrid,
  FileText,
  Trash2,
  Save,
  X,
  ChevronDown,
  Calendar,
  Building2,
  Hash,
  ShoppingBag,
  Download,
  Settings,
  MessageCircle,
  Send,
  Bot,
  User,
  Sparkles,
  Upload,
  CheckCircle,
  AlertCircle,
  Pencil,
  Trash,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

// Mapowanie Nadleśnictw do RDLP (podstawowe)
const NADLESNICTWO_TO_RDLP: Record<string, string> = {
  // RDLP Olsztyn
  "Giżycko": "RDLP Olsztyn",
  "Mrągowo": "RDLP Olsztyn",
  "Wipsowo": "RDLP Olsztyn",
  "Olsztyn": "RDLP Olsztyn",
  "Szczytno": "RDLP Olsztyn",
  "Lidzbark": "RDLP Olsztyn",
  "Elbląg": "RDLP Olsztyn",
  "Iława": "RDLP Olsztyn",
  "Bartoszyce": "RDLP Olsztyn",
  "Jedwabno": "RDLP Olsztyn",
  "Strzałowo": "RDLP Olsztyn",
  "Korpele": "RDLP Olsztyn",
  "Jagiełek": "RDLP Olsztyn",
  // RDLP Białystok
  "Augustów": "RDLP Białystok",
  "Suwałki": "RDLP Białystok",
  "Hajnówka": "RDLP Białystok",
  "Białowieża": "RDLP Białystok",
  "Łomża": "RDLP Białystok",
  // RDLP Szczecin
  "Barlinek": "RDLP Szczecin",
  "Chojna": "RDLP Szczecin",
  "Gryfino": "RDLP Szczecin",
  "Myślibórz": "RDLP Szczecin",
  // RDLP Zielona Góra
  "Bierzwnik": "RDLP Zielona Góra",
  "Sulęcin": "RDLP Zielona Góra",
  "Świebodzin": "RDLP Zielona Góra",
  // RDLP Wrocław
  "Pieńsk": "RDLP Wrocław",
  "Legnica": "RDLP Wrocław",
  "Jawor": "RDLP Wrocław",
  // RDLP Toruń
  "Toruń": "RDLP Toruń",
  "Bydgoszcz": "RDLP Toruń",
  "Włocławek": "RDLP Toruń",
  // RDLP Gdańsk
  "Gdańsk": "RDLP Gdańsk",
  "Wejherowo": "RDLP Gdańsk",
  "Kartuzy": "RDLP Gdańsk",
  // RDLP Szczecinek
  "Szczecinek": "RDLP Szczecinek",
  "Koszalin": "RDLP Szczecinek",
  "Słupsk": "RDLP Szczecinek",
  // Inne
};

function getRDLPFromClient(clientName: string): string {
  const name = clientName.replace(/^Nadleśnictwo\s+/i, '').trim();
  return NADLESNICTWO_TO_RDLP[name] || "";
}

// Kategorie produktów
const PRODUCT_CATEGORIES = [
  { id: "rejestratory", name: "Rejestratory", icon: Smartphone, color: "blue" },
  { id: "drukarki_termiczne", name: "Drukarki termiczne", icon: Printer, color: "orange" },
  { id: "drukarki_laserowe", name: "Drukarki laserowe", icon: Printer, color: "purple" },
  { id: "laptopy", name: "Laptopy", icon: Laptop, color: "green" },
  { id: "urzadzenia_wielofunkcyjne", name: "Urządzenia wielofunkcyjne", icon: Printer, color: "pink" },
  { id: "monitory", name: "Monitory", icon: Monitor, color: "cyan" },
  { id: "serwery", name: "Serwery", icon: Server, color: "red" },
  { id: "all_in_one", name: "All in One", icon: LayoutGrid, color: "indigo" },
];

// Domyślne składnice (umowy ramowe)
const DEFAULT_SKLADNICE = [
  { id: "zup_lodz", name: "ZUP LP w Łodzi", contractNumber: "" },
  { id: "zslp_stargard", name: "ZSLP Stargard", contractNumber: "" },
  { id: "zpuh_olsztyn", name: "ZPUH Olsztyn", contractNumber: "" },
];

// Typy urządzeń w kategoriach
const DEVICE_TYPES: Record<string, string[]> = {
  rejestratory: ["Zebra EM45", "Zebra TC27", "Samsung A56", "Samsung S25 FE", "Samsung S25 Ultra", "Honeywell CT47", "Unitech EA660"],
  drukarki_termiczne: ["Bixolon SPP-R410", "Zebra ZQ521", "Honeywell RP4", "Seiko MPA40", "Sewoo LKP400"],
  drukarki_laserowe: ["Brother HL-L6210DW", "Brother HL-L6410DN", "HP LaserJet Pro"],
  laptopy: ["Dell Pro 14 Plus", "Dell Pro 16", "HP EliteBook", "Lenovo ThinkPad"],
  urzadzenia_wielofunkcyjne: ["Brother MFC-L5710DW", "Brother MFC-L6710DW", "Brother MFC-L8390CDW"],
  monitory: ["Dell Pro 24 Plus", "Dell Pro 27 Plus", "HP Serie 5 Pro"],
  serwery: ["Dell PowerEdge R360", "Dell PowerEdge R550", "Dell PowerEdge R660xs"],
  all_in_one: ["Dell AIO Pro 24", "HP Pro 324pv", "HP Pro 527pq"],
};

interface AccessoryItem {
  name: string;
  quantity: number;
  hasSerialNumbers?: boolean;
  serialNumbers?: string[];
}

interface SalesProduct {
  id: string;
  created_at: string;
  category: string;
  device_type: string;
  serial_number: string;
  client_name: string;
  sale_date: string;
  accessories: (string | AccessoryItem)[];
  notes?: string;
  added_by: string;
}

export default function HandlowyDashboard() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [userName, setUserName] = React.useState("");
  const [activeView, setActiveView] = React.useState<"dashboard" | "products">("dashboard");
  const [activeCategory, setActiveCategory] = React.useState("rejestratory");
  
  // Składnice - ładowane z localStorage
  const [skladnice, setSkladnice] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('handlowy_skladnice');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_SKLADNICE;
        }
      }
    }
    return DEFAULT_SKLADNICE;
  });
  const [products, setProducts] = React.useState<SalesProduct[]>([]);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isProtocolModalOpen, setIsProtocolModalOpen] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState<{ isOpen: boolean; message: string; count: number }>({
    isOpen: false,
    message: "",
    count: 0,
  });
  
  // Form states
  const [formData, setFormData] = React.useState({
    deviceType: "",
    serialNumbersText: "", // Masowe dodawanie - textarea
    clientName: "",
    saleDate: new Date().toISOString().split("T")[0],
    notes: "",
  });
  // Nowa struktura akcesoriów
  interface Accessory {
    name: string;
    quantity: number;
    hasSerialNumbers: boolean;
    serialNumbers: string[];
  }
  const [accessories, setAccessories] = React.useState<Accessory[]>([]);
  const [newAccessory, setNewAccessory] = React.useState({
    name: "",
    quantity: 1,
    hasSerialNumbers: false,
    serialNumbersText: "",
  });
  const [isSaving, setIsSaving] = React.useState(false);
  const [parsedSerials, setParsedSerials] = React.useState<string[]>([]);
  const [expandedClients, setExpandedClients] = React.useState<Set<string>>(new Set());

  // Edit mode state
  const [editingClient, setEditingClient] = React.useState<string | null>(null);
  const [editingProducts, setEditingProducts] = React.useState<SalesProduct[]>([]);
  const [newAccessoryName, setNewAccessoryName] = React.useState("");
  const [newAccessoryQuantity, setNewAccessoryQuantity] = React.useState(1);
  const [addingAccessoryToProductId, setAddingAccessoryToProductId] = React.useState<string | null>(null);

  // Toast notification state
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Auto-hide after 3 seconds
  };

  // Protocol form
  const [protocolData, setProtocolData] = React.useState({
    clientName: "",
    clientCity: "", // Miejscowość siedziby nadleśnictwa
    skladnicaId: "zup_lodz",
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split("T")[0],
  });
  const [clientProducts, setClientProducts] = React.useState<SalesProduct[]>([]);
  
  // Analytics state
  const [allProducts, setAllProducts] = React.useState<SalesProduct[]>([]);
  const [analyticsYear, setAnalyticsYear] = React.useState(new Date().getFullYear());
  const [analyticsMonth, setAnalyticsMonth] = React.useState<number | null>(null); // null = wszystkie miesiące
  const [dashboardTab, setDashboardTab] = React.useState<"analytics" | "skladnice" | "import">("skladnice");
  const [analyticsCategory, setAnalyticsCategory] = React.useState("rejestratory");
  
  // Import state
  const [importFile, setImportFile] = React.useState<File | null>(null);
  const [importLoading, setImportLoading] = React.useState(false);
  const [importData, setImportData] = React.useState<{
    invoiceNumber: string;
    invoiceDate: string;
    contractNumber: string;
    skladnica: string;
    clientName: string;
    devices: {
      name: string;
      quantity: number;
      serialNumbers: string[];
      imeis: string[];
      isAccessory: boolean;
    }[];
  } | null>(null);
  const [importError, setImportError] = React.useState<string | null>(null);
  const [importSuccess, setImportSuccess] = React.useState<{ count: number; client: string } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Chat AI state
  const [chatMessages, setChatMessages] = React.useState<{role: 'user' | 'assistant'; content: string}[]>([]);
  const [chatInput, setChatInput] = React.useState("");
  const [isChatLoading, setIsChatLoading] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  const fetchAllProducts = React.useCallback(async () => {
    const { data, error } = await supabase
      .from("sales_products")
      .select("*")
      .order("sale_date", { ascending: false });
    
    if (!error && data) {
      setAllProducts(data);
    }
  }, []);

  // Funkcja do wysyłania wiadomości do AI
  const sendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/analytics-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage })
      });

      const data = await response.json();
      
      if (data.answer) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'assistant', content: "Przepraszam, nie udało się uzyskać odpowiedzi." }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages(prev => [...prev, { role: 'assistant', content: "Wystąpił błąd podczas przetwarzania zapytania." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Handle file upload for import
  const handleFileUpload = async (file: File) => {
    setImportLoading(true);
    setImportError(null);
    setImportData(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/import-protocol", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Błąd importu");
      }

      if (result.data) {
        setImportData(result.data);
      }
    } catch (error) {
      console.error("Import error:", error);
      setImportError(error instanceof Error ? error.message : "Nieznany błąd");
    } finally {
      setImportLoading(false);
    }
  };

  // Handle import confirmation - save to database
  const handleImportConfirm = async () => {
    if (!importData) return;

    setImportLoading(true);
    try {
      // Determine category based on device name
      const getCategoryFromDevice = (name: string): string => {
        if (name.match(/EM45|TC27|TC58|Samsung|Honeywell|Unitech/i)) return "rejestratory";
        if (name.match(/drukark.*termiczn|Bixolon|Seiko|Sewoo/i)) return "drukarki_termiczne";
        if (name.match(/drukark.*laser|Brother|HP.*Laser/i)) return "drukarki_laserowe";
        if (name.match(/laptop|notebook|Dell.*Pro|HP.*EliteBook/i)) return "laptopy";
        if (name.match(/wielofunkcyjn|MFC|DCP/i)) return "urzadzenia_wielofunkcyjne";
        if (name.match(/monitor/i)) return "monitory";
        if (name.match(/serwer|PowerEdge/i)) return "serwery";
        if (name.match(/All.in.One|AIO/i)) return "all_in_one";
        return "rejestratory";
      };

      // Convert date format
      const parseDate = (dateStr: string): string => {
        const parts = dateStr.split('.');
        if (parts.length === 3) {
          return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
        return new Date().toISOString().split('T')[0];
      };

      const saleDate = parseDate(importData.invoiceDate);

      // Process main devices (not accessories)
      const mainDevices = importData.devices.filter(d => !d.isAccessory);
      const accessories = importData.devices.filter(d => d.isAccessory);

      let importedCount = 0;

      for (const device of mainDevices) {
        const category = getCategoryFromDevice(device.name);
        
        // Format accessories for this device
        const accessoryData = accessories.map(acc => ({
          name: acc.name,
          quantity: acc.quantity,
          hasSerialNumbers: false,
          serialNumbers: []
        }));

        // If device has serial numbers, create one record per serial number
        if (device.serialNumbers.length > 0) {
          for (let i = 0; i < device.serialNumbers.length; i++) {
            const serialNumber = device.serialNumbers[i];
            const imei = device.imeis[i] || null;
            
            // 1. Insert into sales_products (for analytics)
            const { error } = await supabase.from("sales_products").insert({
              category,
              device_type: device.name,
              serial_number: serialNumber,
              client_name: importData.clientName,
              sale_date: saleDate,
              accessories: accessoryData,
              notes: `Faktura: ${importData.invoiceNumber} | Umowa: ${importData.contractNumber} | IMEI: ${imei || 'brak'}`,
              added_by: userName,
            });

            // 2. Also insert into registrators table (for panel-klienta) - ALL categories
            await supabase.from("registrators").insert({
              client_name: importData.clientName,
              device_name: device.name,
              serial_number: serialNumber,
              purchase_date: saleDate,
              notes: `Faktura: ${importData.invoiceNumber} | IMEI: ${imei || 'brak'}`,
            }).then(({ error: regError }) => {
              if (regError && !regError.message.includes('duplicate')) {
                console.error("Registrator insert error:", regError);
              }
            });

            if (error) {
              console.error("Insert error:", error);
            } else {
              importedCount++;
            }
          }
        } else {
          // Device without serial numbers - create records based on quantity
          for (let i = 0; i < device.quantity; i++) {
            const autoSerial = `AUTO-${Date.now()}-${i}`;
            
            const { error } = await supabase.from("sales_products").insert({
              category,
              device_type: device.name,
              serial_number: autoSerial,
              client_name: importData.clientName,
              sale_date: saleDate,
              accessories: accessoryData,
              notes: `Faktura: ${importData.invoiceNumber} | Umowa: ${importData.contractNumber}`,
              added_by: userName,
            });

            // Also insert into registrators (for panel-klienta) - ALL categories
            await supabase.from("registrators").insert({
              client_name: importData.clientName,
              device_name: device.name,
              serial_number: autoSerial,
              purchase_date: saleDate,
              notes: `Faktura: ${importData.invoiceNumber}`,
            });

            if (!error) importedCount++;
          }
        }
      }

      setImportSuccess({ count: importedCount, client: importData.clientName });
      
      // Reset
      setImportData(null);
      setImportFile(null);
      setImportError(null);
      fetchAllProducts();
      
    } catch (error) {
      console.error("Import confirm error:", error);
      setImportError("Błąd podczas zapisywania do bazy danych");
    } finally {
      setImportLoading(false);
    }
  };

  // Scroll do końca czatu
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const fetchProducts = React.useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("sales_products")
        .select("*")
        .eq("category", activeCategory)
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Tabela sales_products może nie istnieć:", error);
        setProducts([]);
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  }, [activeCategory]);

  React.useEffect(() => {
    const authenticated = localStorage.getItem("handlowy_authenticated");
    const name = localStorage.getItem("handlowy_user_name");
    
    if (authenticated === "true") {
      setIsAuthenticated(true);
      setUserName(name || "Użytkownik");
      fetchProducts();
      fetchAllProducts();
    } else {
      window.location.href = "/handlowy";
    }
    setIsLoading(false);
  }, [fetchProducts]);

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [activeCategory, isAuthenticated, fetchProducts]);

  const handleLogout = () => {
    localStorage.removeItem("handlowy_authenticated");
    localStorage.removeItem("handlowy_user_email");
    localStorage.removeItem("handlowy_user_name");
    window.location.href = "/handlowy";
  };

  const handleAddAccessory = () => {
    if (newAccessory.name.trim()) {
      // Parsuj numery seryjne jeśli są
      const serialNumbers = newAccessory.hasSerialNumbers 
        ? newAccessory.serialNumbersText
            .split(/[\n,;\s]+/)
            .map(s => s.trim().toUpperCase())
            .filter(s => s.length > 0)
        : [];
      
      // Sprawdź czy ilość zgadza się z liczbą numerów seryjnych
      const finalQuantity = newAccessory.hasSerialNumbers && serialNumbers.length > 0
        ? serialNumbers.length
        : newAccessory.quantity;

      setAccessories([
        ...accessories,
        {
          name: newAccessory.name.trim(),
          quantity: finalQuantity,
          hasSerialNumbers: newAccessory.hasSerialNumbers,
          serialNumbers: serialNumbers,
        },
      ]);
      setNewAccessory({
        name: "",
        quantity: 1,
        hasSerialNumbers: false,
        serialNumbersText: "",
      });
    }
  };

  const handleRemoveAccessory = (index: number) => {
    setAccessories(accessories.filter((_, i) => i !== index));
  };

  // Grupowanie produktów po kliencie
  const productsByClient = React.useMemo(() => {
    const grouped: Record<string, SalesProduct[]> = {};
    products.forEach(p => {
      if (!grouped[p.client_name]) {
        grouped[p.client_name] = [];
      }
      grouped[p.client_name].push(p);
    });
    return grouped;
  }, [products]);

  // Analytics - filtrowane dane PO KATEGORII
  const analyticsData = React.useMemo(() => {
    // Filtruj po kategorii, roku i miesiącu
    const filtered = allProducts.filter(p => {
      const date = new Date(p.sale_date);
      const categoryMatch = p.category === analyticsCategory;
      const yearMatch = date.getFullYear() === analyticsYear;
      const monthMatch = analyticsMonth === null || date.getMonth() + 1 === analyticsMonth;
      return categoryMatch && yearMatch && monthMatch;
    });

    // Grupowanie po kliencie
    const byClient: Record<string, { count: number; devices: Record<string, number>; date: string }> = {};
    filtered.forEach(p => {
      if (!byClient[p.client_name]) {
        byClient[p.client_name] = { count: 0, devices: {}, date: p.sale_date };
      }
      byClient[p.client_name].count++;
      byClient[p.client_name].devices[p.device_type] = (byClient[p.client_name].devices[p.device_type] || 0) + 1;
    });

    // Grupowanie po typie urządzenia (np. EM45, TC27, S25 w ramach Rejestratorów)
    const byDevice: Record<string, number> = {};
    filtered.forEach(p => {
      byDevice[p.device_type] = (byDevice[p.device_type] || 0) + 1;
    });

    // Grupowanie po miesiącach (dla wykresu)
    const byMonth: Record<string, number> = {};
    filtered.forEach(p => {
      const date = new Date(p.sale_date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      byMonth[monthKey] = (byMonth[monthKey] || 0) + 1;
    });

    // Dostępne lata - zawsze 2024, 2025, 2026 + lata z danych
    const dataYears = allProducts.map(p => new Date(p.sale_date).getFullYear());
    const years = [...new Set([2024, 2025, 2026, ...dataYears])].sort((a, b) => b - a);

    // Statystyki dla wszystkich kategorii (do podsumowania)
    const allCategoriesStats: Record<string, number> = {};
    allProducts.filter(p => {
      const date = new Date(p.sale_date);
      return date.getFullYear() === analyticsYear && (analyticsMonth === null || date.getMonth() + 1 === analyticsMonth);
    }).forEach(p => {
      allCategoriesStats[p.category] = (allCategoriesStats[p.category] || 0) + 1;
    });

    return {
      total: filtered.length,
      byClient,
      byDevice,
      byMonth,
      years: years.length > 0 ? years : [new Date().getFullYear()],
      uniqueClients: Object.keys(byClient).length,
      allCategoriesStats,
    };
  }, [allProducts, analyticsYear, analyticsMonth, analyticsCategory]);

  const toggleClientExpand = (clientName: string) => {
    setExpandedClients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(clientName)) {
        newSet.delete(clientName);
      } else {
        newSet.add(clientName);
      }
      return newSet;
    });
  };

  const handleGenerateProtocolForClient = (clientName: string) => {
    setProtocolData({
      ...protocolData,
      clientName: clientName.replace(/^Nadleśnictwo\s+/i, ''),
    });
    fetchClientProducts(clientName);
    setIsProtocolModalOpen(true);
  };

  // === EDYCJA PRODUKTÓW ===
  const handleEditClient = (clientName: string, clientProducts: SalesProduct[]) => {
    setEditingClient(clientName);
    setEditingProducts([...clientProducts]);
    setAddingAccessoryToProductId(null);
    setNewAccessoryName("");
    setNewAccessoryQuantity(1);
  };

  const handleCloseEditModal = () => {
    setEditingClient(null);
    setEditingProducts([]);
    setAddingAccessoryToProductId(null);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Czy na pewno chcesz usunąć to urządzenie?")) return;
    
    try {
      // Usuń z sales_products
      const { error: salesError } = await supabase
        .from("sales_products")
        .delete()
        .eq("id", productId);
      
      if (salesError) throw salesError;

      // Usuń też z registrators jeśli istnieje
      const productToDelete = editingProducts.find(p => p.id === productId);
      if (productToDelete) {
        await supabase
          .from("registrators")
          .delete()
          .eq("serial_number", productToDelete.serial_number)
          .eq("client_name", productToDelete.client_name);
      }

      // Aktualizuj lokalny stan
      setEditingProducts(prev => prev.filter(p => p.id !== productId));
      setProducts(prev => prev.filter(p => p.id !== productId));
      
      showToast("Urządzenie zostało usunięte!", "success");
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast("Błąd podczas usuwania urządzenia", "error");
    }
  };

  const handleAddAccessoryToProduct = async (productId: string) => {
    if (!newAccessoryName.trim()) {
      showToast("Wpisz nazwę akcesorium", "error");
      return;
    }

    const product = editingProducts.find(p => p.id === productId);
    if (!product) return;

    // Parse existing accessories
    let existingAccs = product.accessories;
    if (typeof existingAccs === 'string') {
      try { existingAccs = JSON.parse(existingAccs); } catch { existingAccs = []; }
    }
    if (!Array.isArray(existingAccs)) existingAccs = [];

    // Add new accessory
    const newAccessory = {
      name: newAccessoryName.trim(),
      quantity: newAccessoryQuantity,
      hasSerialNumbers: false,
      serialNumbers: []
    };
    
    const updatedAccs = [...existingAccs, newAccessory];

    try {
      const { error } = await supabase
        .from("sales_products")
        .update({ accessories: updatedAccs })
        .eq("id", productId);

      if (error) throw error;

      // Update local state
      setEditingProducts(prev => prev.map(p => 
        p.id === productId ? { ...p, accessories: updatedAccs } : p
      ));
      setProducts(prev => prev.map(p => 
        p.id === productId ? { ...p, accessories: updatedAccs } : p
      ));

      // Reset form
      setNewAccessoryName("");
      setNewAccessoryQuantity(1);
      setAddingAccessoryToProductId(null);

      showToast("Akcesorium zostało dodane!", "success");
    } catch (error) {
      console.error("Error adding accessory:", error);
      showToast("Błąd podczas dodawania akcesorium", "error");
    }
  };

  const handleRemoveAccessoryFromProduct = async (productId: string, accessoryIndex: number) => {
    const product = editingProducts.find(p => p.id === productId);
    if (!product) return;

    let existingAccs = product.accessories;
    if (typeof existingAccs === 'string') {
      try { existingAccs = JSON.parse(existingAccs); } catch { existingAccs = []; }
    }
    if (!Array.isArray(existingAccs)) return;

    const updatedAccs = existingAccs.filter((_, i) => i !== accessoryIndex);

    try {
      const { error } = await supabase
        .from("sales_products")
        .update({ accessories: updatedAccs })
        .eq("id", productId);

      if (error) throw error;

      setEditingProducts(prev => prev.map(p => 
        p.id === productId ? { ...p, accessories: updatedAccs } : p
      ));
      setProducts(prev => prev.map(p => 
        p.id === productId ? { ...p, accessories: updatedAccs } : p
      ));
    } catch (error) {
      console.error("Error removing accessory:", error);
      showToast("Błąd podczas usuwania akcesorium", "error");
    }
  };

  // Zapisz składnice do localStorage
  const saveSkladnice = (newSkladnice: typeof skladnice) => {
    setSkladnice(newSkladnice);
    if (typeof window !== 'undefined') {
      localStorage.setItem('handlowy_skladnice', JSON.stringify(newSkladnice));
    }
  };

  const updateSkladnicaContract = (id: string, contractNumber: string) => {
    const updated = skladnice.map((s: any) => 
      s.id === id ? { ...s, contractNumber } : s
    );
    saveSkladnice(updated);
  };

  // Kolory dla wykresu kołowego
  const pieColors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', 
    '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
  ];

  // Funkcja do generowania ścieżki SVG dla wykresu kołowego
  const generatePieSlice = (startAngle: number, endAngle: number, radius: number = 100) => {
    const x1 = radius + radius * Math.cos((Math.PI * startAngle) / 180);
    const y1 = radius + radius * Math.sin((Math.PI * startAngle) / 180);
    const x2 = radius + radius * Math.cos((Math.PI * endAngle) / 180);
    const y2 = radius + radius * Math.sin((Math.PI * endAngle) / 180);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;
  };

  // Generuj PDF z analityką
  const handleGenerateAnalyticsPDF = async () => {
    const categoryName = PRODUCT_CATEGORIES.find(c => c.id === analyticsCategory)?.name || analyticsCategory;
    const monthNames = ['', 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 
                        'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    const periodText = analyticsMonth 
      ? `${monthNames[analyticsMonth]} ${analyticsYear}` 
      : `Rok ${analyticsYear}`;

    // Kolory dla kategorii
    const categoryColors: Record<string, string> = {
      'rejestratory': '#3b82f6',
      'drukarki-termiczne': '#10b981',
      'drukarki-laserowe': '#8b5cf6',
      'laptopy': '#f59e0b',
      'urzadzenia-wielofunkcyjne': '#ec4899',
      'monitory': '#06b6d4',
      'serwery': '#ef4444',
      'all-in-one': '#6366f1',
    };
    const accentColor = categoryColors[analyticsCategory] || '#3b82f6';

    try {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts') as any;
      
      const pdfMake = pdfMakeModule.default || pdfMakeModule;
      pdfMake.vfs = pdfFontsModule.default?.pdfMake?.vfs || pdfFontsModule.pdfMake?.vfs || pdfFontsModule.vfs;

      // Pobierz logo
      let logoBase64 = '';
      try {
        const response = await fetch('/takma_logo_footer.png');
        const blob = await response.blob();
        logoBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } catch (e) {
        console.log('Logo niedostępne');
      }

      // Sortowane dane urządzeń
      const sortedDevices = Object.entries(analyticsData.byDevice)
        .sort(([,a], [,b]) => (b as number) - (a as number));

      // Tabela rozkładu urządzeń z paskami postępu (symulowane kolorem)
      const deviceRows = sortedDevices.map(([device, count], index) => {
        const percentage = ((count as number) / analyticsData.total * 100);
        return [
          { text: device, fontSize: 10 },
          { 
            stack: [
              {
                canvas: [
                  { type: 'rect', x: 0, y: 0, w: 150, h: 12, r: 3, color: '#f3f4f6' },
                  { type: 'rect', x: 0, y: 0, w: Math.max(percentage * 1.5, 5), h: 12, r: 3, color: pieColors[index % pieColors.length] },
                ]
              }
            ],
            width: 150
          },
          { text: String(count), alignment: 'center', bold: true, fontSize: 11 },
          { text: `${percentage.toFixed(1)}%`, alignment: 'center', color: '#6b7280', fontSize: 10 }
        ];
      });

      // Tabela dostaw do klientów
      const clientRows = Object.entries(analyticsData.byClient)
        .sort(([,a], [,b]) => new Date((b as any).date).getTime() - new Date((a as any).date).getTime())
        .map(([client, data]: [string, any]) => [
          { text: client, fontSize: 10 },
          { 
            stack: Object.entries(data.devices).map(([d, c]) => ({
              text: `${d} (${c})`,
              fontSize: 8,
              color: '#6b7280',
              margin: [0, 1, 0, 1]
            }))
          },
          { text: String(data.count), alignment: 'center', bold: true, fontSize: 11 },
          { text: new Date(data.date).toLocaleDateString('pl-PL'), alignment: 'center', fontSize: 10 }
        ]);

      const docDefinition: any = {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 60],

        content: [
          // Nagłówek z logo i tytułem
          {
            columns: [
              logoBase64 ? {
                image: logoBase64,
                width: 100,
                margin: [0, 0, 0, 0]
              } : { text: '' },
              {
                stack: [
                  { text: 'RAPORT ANALITYCZNY', fontSize: 10, color: '#9ca3af', alignment: 'right' },
                  { text: new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }), fontSize: 10, color: '#6b7280', alignment: 'right', margin: [0, 2, 0, 0] }
                ]
              }
            ],
            margin: [0, 0, 0, 20]
          },

          // Kolorowy pasek z nazwą kategorii
          {
            table: {
              widths: ['*'],
              body: [[
                {
                  stack: [
                    { text: categoryName.toUpperCase(), fontSize: 24, bold: true, color: 'white' },
                    { text: periodText, fontSize: 12, color: 'rgba(255,255,255,0.8)', margin: [0, 5, 0, 0] }
                  ],
                  fillColor: accentColor,
                  margin: [20, 15, 20, 15]
                }
              ]]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 25]
          },

          // Statystyki w boxach
          {
            columns: [
              {
                width: '*',
                stack: [
                  { 
                    table: {
                      widths: ['*'],
                      body: [[{
                        stack: [
                          { text: String(analyticsData.total), fontSize: 32, bold: true, color: accentColor, alignment: 'center' },
                          { text: 'URZĄDZEŃ', fontSize: 9, color: '#6b7280', alignment: 'center', margin: [0, 5, 0, 0] }
                        ],
                        margin: [0, 15, 0, 15]
                      }]]
                    },
                    layout: {
                      hLineWidth: () => 1,
                      vLineWidth: () => 1,
                      hLineColor: () => '#e5e7eb',
                      vLineColor: () => '#e5e7eb',
                    }
                  }
                ]
              },
              { width: 15, text: '' },
              {
                width: '*',
                stack: [
                  { 
                    table: {
                      widths: ['*'],
                      body: [[{
                        stack: [
                          { text: String(analyticsData.uniqueClients), fontSize: 32, bold: true, color: '#10b981', alignment: 'center' },
                          { text: 'KLIENTÓW', fontSize: 9, color: '#6b7280', alignment: 'center', margin: [0, 5, 0, 0] }
                        ],
                        margin: [0, 15, 0, 15]
                      }]]
                    },
                    layout: {
                      hLineWidth: () => 1,
                      vLineWidth: () => 1,
                      hLineColor: () => '#e5e7eb',
                      vLineColor: () => '#e5e7eb',
                    }
                  }
                ]
              },
              { width: 15, text: '' },
              {
                width: '*',
                stack: [
                  { 
                    table: {
                      widths: ['*'],
                      body: [[{
                        stack: [
                          { text: String(Object.keys(analyticsData.byDevice).length), fontSize: 32, bold: true, color: '#8b5cf6', alignment: 'center' },
                          { text: 'MODELI', fontSize: 9, color: '#6b7280', alignment: 'center', margin: [0, 5, 0, 0] }
                        ],
                        margin: [0, 15, 0, 15]
                      }]]
                    },
                    layout: {
                      hLineWidth: () => 1,
                      vLineWidth: () => 1,
                      hLineColor: () => '#e5e7eb',
                      vLineColor: () => '#e5e7eb',
                    }
                  }
                ]
              },
            ],
            margin: [0, 0, 0, 30]
          },

          // Sekcja: Rozkład modeli
          {
            table: {
              widths: ['*'],
              body: [[{
                text: 'ROZKŁAD WEDŁUG MODELI',
                fontSize: 11,
                bold: true,
                color: 'white',
                fillColor: '#374151',
                margin: [10, 8, 10, 8]
              }]]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 0]
          },
          deviceRows.length > 0 ? {
            table: {
              headerRows: 0,
              widths: ['*', 150, 50, 60],
              body: deviceRows
            },
            layout: {
              fillColor: (rowIndex: number) => rowIndex % 2 === 0 ? '#f9fafb' : null,
              hLineWidth: () => 0.5,
              vLineWidth: () => 0,
              hLineColor: () => '#e5e7eb',
              paddingLeft: () => 10,
              paddingRight: () => 10,
              paddingTop: () => 8,
              paddingBottom: () => 8,
            },
            margin: [0, 0, 0, 30]
          } : { text: 'Brak danych dla wybranego okresu', italics: true, color: '#9ca3af', margin: [10, 15, 0, 30] },

          // Sekcja: Dostawy do klientów
          {
            table: {
              widths: ['*'],
              body: [[{
                text: 'DOSTAWY DO KLIENTÓW',
                fontSize: 11,
                bold: true,
                color: 'white',
                fillColor: '#374151',
                margin: [10, 8, 10, 8]
              }]]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 0]
          },
          clientRows.length > 0 ? {
            table: {
              headerRows: 1,
              widths: ['*', '*', 45, 70],
              body: [
                [
                  { text: 'Klient', bold: true, fontSize: 9, color: '#6b7280' },
                  { text: 'Modele', bold: true, fontSize: 9, color: '#6b7280' },
                  { text: 'Szt.', bold: true, fontSize: 9, color: '#6b7280', alignment: 'center' },
                  { text: 'Data', bold: true, fontSize: 9, color: '#6b7280', alignment: 'center' }
                ],
                ...clientRows
              ]
            },
            layout: {
              fillColor: (rowIndex: number) => rowIndex === 0 ? '#f3f4f6' : (rowIndex % 2 === 1 ? '#f9fafb' : null),
              hLineWidth: (i: number, node: any) => i === 1 ? 1 : 0.5,
              vLineWidth: () => 0,
              hLineColor: (i: number) => i === 1 ? '#d1d5db' : '#e5e7eb',
              paddingLeft: () => 10,
              paddingRight: () => 10,
              paddingTop: () => 8,
              paddingBottom: () => 8,
            }
          } : { text: 'Brak danych dla wybranego okresu', italics: true, color: '#9ca3af', margin: [10, 15, 0, 0] },
        ],

        footer: (currentPage: number, pageCount: number) => ({
          stack: [
            {
              canvas: [{ type: 'line', x1: 40, y1: 0, x2: 555, y2: 0, lineWidth: 0.5, lineColor: '#e5e7eb' }]
            },
            {
              columns: [
                { 
                  text: 'TAKMA Tadeusz Tiuchty | NIP: 9151004377 | ul. Poświęcka 1a, 51-128 Wrocław | serwis@takma.com.pl',
                  fontSize: 7,
                  color: '#9ca3af',
                  margin: [40, 10, 0, 0]
                },
                { 
                  text: `${currentPage} / ${pageCount}`,
                  alignment: 'right',
                  fontSize: 9,
                  bold: true,
                  color: '#6b7280',
                  margin: [0, 8, 40, 0]
                }
              ]
            }
          ],
          margin: [0, 0, 0, 0]
        }),

        defaultStyle: {
          fontSize: 10
        }
      };

      pdfMake.createPdf(docDefinition).download(`raport_${analyticsCategory}_${analyticsYear}${analyticsMonth ? '_' + String(analyticsMonth).padStart(2, '0') : ''}.pdf`);
    } catch (error) {
      console.error('Błąd generowania PDF:', error);
      showToast("Błąd podczas generowania PDF", "error");
    }
  };

  // Parsowanie numerów seryjnych z textarea
  const parseSerialNumbers = (text: string): string[] => {
    return text
      .split(/[\n,;\s]+/) // Dzieli po nowej linii, przecinku, średniku, spacji
      .map(s => s.trim().toUpperCase())
      .filter(s => s.length > 0);
  };

  // Aktualizacja parsowanych numerów przy zmianie tekstu
  React.useEffect(() => {
    const serials = parseSerialNumbers(formData.serialNumbersText);
    setParsedSerials(serials);
  }, [formData.serialNumbersText]);

  const handleSaveProduct = async () => {
    if (!formData.deviceType || parsedSerials.length === 0 || !formData.clientName) {
      showToast("Wypełnij wszystkie wymagane pola (typ urządzenia, numery seryjne, klient)", "error");
      return;
    }

    setIsSaving(true);
    try {
      // Przygotuj wszystkie produkty do dodania
      const productsToInsert = parsedSerials.map(serial => ({
        category: activeCategory,
        device_type: formData.deviceType,
        serial_number: serial,
        client_name: formData.clientName,
        sale_date: formData.saleDate,
        accessories: accessories,
        notes: formData.notes,
        added_by: localStorage.getItem("handlowy_user_email") || "unknown",
      }));

      const { error } = await supabase.from("sales_products").insert(productsToInsert);

      if (error) throw error;

      // Also insert into registrators table (for panel-klienta) - ALL categories
      const registratorsToInsert = parsedSerials.map(serial => ({
        client_name: formData.clientName,
        device_name: formData.deviceType,
        serial_number: serial,
        purchase_date: formData.saleDate,
        notes: formData.notes,
      }));

      // Insert to registrators (ignore duplicate errors)
      for (const reg of registratorsToInsert) {
        await supabase.from("registrators").insert(reg).then(({ error: regError }) => {
          if (regError && !regError.message.includes('duplicate')) {
            console.error("Registrator insert error:", regError);
          }
        });
      }

      // Reset form
      setFormData({
        deviceType: "",
        serialNumbersText: "",
        clientName: "",
        saleDate: new Date().toISOString().split("T")[0],
        notes: "",
      });
      const addedCount = parsedSerials.length;
      setAccessories([]);
      setParsedSerials([]);
      setIsAddModalOpen(false);
      fetchProducts();
      fetchAllProducts();
      
      // Pokaż ładny modal sukcesu
      setSuccessModal({
        isOpen: true,
        message: "Produkty zostały dodane pomyślnie!",
        count: addedCount,
      });
    } catch (error) {
      console.error("Error saving products:", error);
      setSuccessModal({
        isOpen: true,
        message: "Błąd podczas zapisywania. Sprawdź czy numery seryjne nie są duplikatami.",
        count: 0,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Pobierz produkty klienta do protokołu (wyszukiwanie częściowe)
  const fetchClientProducts = async (clientName: string) => {
    if (!clientName.trim()) {
      setClientProducts([]);
      return;
    }
    
    const { data, error } = await supabase
      .from("sales_products")
      .select("*")
      .ilike("client_name", `%${clientName.trim()}%`)
      .order("category", { ascending: true });
    
    if (!error && data) {
      setClientProducts(data);
    }
  };

  const handleGenerateProtocol = async () => {
    if (!protocolData.clientName || !protocolData.invoiceNumber || !protocolData.invoiceDate || !protocolData.clientCity) {
      showToast("Wypełnij wszystkie wymagane pola (w tym miejscowość)", "error");
      return;
    }

    if (clientProducts.length === 0) {
      showToast("Brak produktów dla tego klienta", "error");
      return;
    }

      const skladnica = skladnice.find((s: any) => s.id === protocolData.skladnicaId);
    if (!skladnica) {
      showToast("Wybierz składnicę", "error");
      return;
    }

    // Tworzenie pełnej nazwy nadleśnictwa w dopełniaczu
    const formatClientNameForProtocol = (name: string): string => {
      // Jeśli już zaczyna się od "Nadleśnictwo", odmień
      if (name.toLowerCase().startsWith('nadleśnictwo ')) {
        return name.replace(/^Nadleśnictwo\s+/i, 'Nadleśnictwa ');
      }
      // W przeciwnym razie dodaj "Nadleśnictwa " z przodu
      return `Nadleśnictwa ${name}`;
    };
    
    const clientNameDeclined = formatClientNameForProtocol(protocolData.clientName);

    // Generowanie PDF
    try {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts') as any;
      
      const pdfMake = pdfMakeModule.default || pdfMakeModule;
      const pdfFonts = pdfFontsModule.default || pdfFontsModule;
      pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

      // Ładowanie logo TAKMA jako base64
      const loadImageAsBase64 = (url: string): Promise<string> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
          };
          img.onerror = reject;
          img.src = url;
        });
      };

      const takmaLogoBase64 = await loadImageAsBase64('/takma_logo_footer.png');

      // Formatowanie daty faktury
      const invoiceDateFormatted = new Date(protocolData.invoiceDate).toLocaleDateString('pl-PL');

      // Grupowanie produktów po kategorii
      const productsByCategory: Record<string, SalesProduct[]> = {};
      clientProducts.forEach(p => {
        if (!productsByCategory[p.category]) {
          productsByCategory[p.category] = [];
        }
        productsByCategory[p.category].push(p);
      });

      // Tworzenie tabeli produktów
      const productRows: any[] = [];
      let lp = 1;
      
      Object.entries(productsByCategory).forEach(([category, prods]) => {
        const categoryName = PRODUCT_CATEGORIES.find(c => c.id === category)?.name || category;
        
        prods.forEach(p => {
          // Formatowanie akcesoriów - obsługa wszystkich formatów
          let accessoriesText = '-';
          let accs = p.accessories;
          
          // Jeśli cała tablica to string JSON - parsuj
          if (typeof accs === 'string') {
            try {
              accs = JSON.parse(accs);
            } catch {
              accs = [];
            }
          }
          
          if (accs && Array.isArray(accs) && accs.length > 0) {
            const formattedAccs = accs.map((acc: any) => {
              // Jeśli element to string JSON - parsuj
              let parsedAcc = acc;
              if (typeof acc === 'string') {
                try {
                  parsedAcc = JSON.parse(acc);
                } catch {
                  return acc; // Zwykły string
                }
              }
              
              // Obsługa obiektu
              if (typeof parsedAcc === 'object' && parsedAcc !== null && parsedAcc.name) {
                return parsedAcc.name;
              }
              return String(parsedAcc);
            });
            accessoriesText = formattedAccs.join(', ');
          }
          
          productRows.push([
            { text: lp.toString(), alignment: 'center' },
            { text: p.device_type },
            { text: p.serial_number, bold: true },
            { text: accessoriesText, fontSize: 8 },
          ]);
          lp++;
        });
      });

      const docDefinition: any = {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 80],
        footer: function(currentPage: number, pageCount: number) {
          // Stopka tylko na ostatniej stronie
          if (currentPage !== pageCount) {
            return { text: '', margin: [0, 0, 0, 0] };
          }
          return {
            stack: [
              { canvas: [{ type: 'line', x1: 40, y1: 0, x2: 555, y2: 0, lineWidth: 0.5, lineColor: '#d1d5db' }] },
              {
                margin: [40, 10, 40, 0],
                columns: [
                  {
                    width: '*',
                    stack: [
                      { text: 'TAKMA Tadeusz Tiuchty | NIP: 9151004377 | ul. Poświęcka 1a, 51-128 Wrocław', fontSize: 8, color: '#6b7280', alignment: 'center' },
                      { text: 'rejestratory.info | serwis@takma.com.pl', fontSize: 8, color: '#6b7280', alignment: 'center', margin: [0, 2, 0, 0] },
                      { text: `Dokument wygenerowany: ${new Date().toLocaleDateString('pl-PL')} ${new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}`, fontSize: 7, color: '#9ca3af', alignment: 'center', margin: [0, 3, 0, 0] },
                    ],
                  },
                ],
              },
            ],
          };
        },
        content: [
          // === NAGŁÓWEK ===
          {
            columns: [
              {
                image: takmaLogoBase64,
                width: 120,
              },
              { width: '*', text: '' },
              {
                width: 'auto',
                alignment: 'right',
                text: `${protocolData.clientCity}, ${invoiceDateFormatted}`,
                fontSize: 10,
                color: '#374151',
              },
            ],
            margin: [0, 0, 0, 15],
          },
          // Linia niebieska
          { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 2, lineColor: '#1e40af' }], margin: [0, 0, 0, 25] },
          
          // === TYTUŁ ===
          {
            text: 'PROTOKÓŁ ODBIORU SPRZĘTU',
            fontSize: 18,
            bold: true,
            alignment: 'center',
            color: '#1f2937',
            margin: [0, 0, 0, 25],
          },
          
          // === TREŚĆ WSTĘPNA ===
          {
            text: [
              'Firma ',
              { text: 'TAKMA', bold: true },
              ' z siedzibą we Wrocławiu przy ulicy Poświęckiej 1a, zgodnie z fakturą nr ',
              { text: protocolData.invoiceNumber, bold: true },
              ' z dnia ',
              { text: invoiceDateFormatted, bold: true },
              ' oraz z Umową nr ',
              { text: skladnica.contractNumber, bold: true },
              ' z ',
              { text: skladnica.name, bold: true },
              ' dostarczyła do ',
              { text: clientNameDeclined, bold: true },
              ' następujący sprzęt:',
            ],
            fontSize: 10,
            lineHeight: 1.5,
            margin: [0, 0, 0, 20],
          },
          
          // === LISTA SPRZĘTU ===
          {
            table: {
              widths: ['*'],
              body: [
                [{ text: 'PRZEKAZANY SPRZĘT', style: 'sectionHeader' }],
              ],
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 0],
          },
          {
            table: {
              headerRows: 1,
              widths: [25, '*', 130, '*'],
              body: [
                [
                  { text: 'Lp.', style: 'tableHeader', alignment: 'center' },
                  { text: 'Nazwa urządzenia', style: 'tableHeader' },
                  { text: 'Numer seryjny', style: 'tableHeader' },
                  { text: 'Akcesoria', style: 'tableHeader' },
                ],
                ...productRows.map((row, idx) => row.map((cell: any, cellIdx: number) => ({
                  ...cell,
                  fillColor: idx % 2 === 0 ? '#f9fafb' : '#ffffff',
                  margin: [cellIdx === 0 ? 0 : 5, 6, 5, 6],
                }))),
              ],
            },
            layout: {
              hLineWidth: (i: number, node: any) => (i === 0 || i === 1 || i === node.table.body.length) ? 0.5 : 0,
              vLineWidth: () => 0,
              hLineColor: () => '#e5e7eb',
            },
            margin: [0, 0, 0, 15],
          },
          
          // === NUMERY SERYJNE AKCESORIÓW (jeśli są) ===
          ...(() => {
            // Zbierz wszystkie akcesoria z numerami seryjnymi
            const accessoriesWithSN: { name: string; serialNumbers: string[] }[] = [];
            clientProducts.forEach(p => {
              let accs = p.accessories;
              
              // Parsuj jeśli to string JSON
              if (typeof accs === 'string') {
                try {
                  accs = JSON.parse(accs);
                } catch {
                  accs = [];
                }
              }
              
              if (accs && Array.isArray(accs)) {
                accs.forEach((acc: any) => {
                  // Parsuj pojedynczy element jeśli to string JSON
                  let parsedAcc = acc;
                  if (typeof acc === 'string') {
                    try {
                      parsedAcc = JSON.parse(acc);
                    } catch {
                      return;
                    }
                  }
                  
                  if (parsedAcc && typeof parsedAcc === 'object' && parsedAcc.hasSerialNumbers && parsedAcc.serialNumbers?.length > 0) {
                    // Sprawdź czy już mamy to akcesorium
                    const existing = accessoriesWithSN.find(a => a.name === parsedAcc.name);
                    if (existing) {
                      // Dodaj tylko nowe numery seryjne (bez duplikatów)
                      parsedAcc.serialNumbers.forEach((sn: string) => {
                        if (!existing.serialNumbers.includes(sn)) {
                          existing.serialNumbers.push(sn);
                        }
                      });
                    } else {
                      accessoriesWithSN.push({
                        name: parsedAcc.name,
                        serialNumbers: [...parsedAcc.serialNumbers],
                      });
                    }
                  }
                });
              }
            });
            
            if (accessoriesWithSN.length === 0) return [];
            
            return [
              {
                table: {
                  widths: ['*'],
                  body: [
                    [{ text: 'NUMERY SERYJNE AKCESORIÓW', style: 'sectionHeader' }],
                  ],
                },
                layout: 'noBorders',
                margin: [0, 15, 0, 0],
              },
              ...accessoriesWithSN.map(acc => ({
                stack: [
                  { text: `${acc.name} (${acc.serialNumbers.length} szt.):`, fontSize: 9, bold: true, margin: [0, 8, 0, 4] },
                  { text: acc.serialNumbers.join(', '), fontSize: 8, color: '#4b5563' },
                ],
              })),
            ];
          })(),
          
          // === PODPISY ===
          {
            margin: [0, 30, 0, 0],
            columns: [
              {
                width: '47%',
                stack: [
                  { text: 'Przekazujący:', fontSize: 10, bold: true, margin: [0, 0, 0, 5] },
                  {
                    table: {
                      widths: ['*'],
                      heights: [70],
                      body: [[{ text: '', border: [true, true, true, true] }]],
                    },
                    layout: {
                      hLineWidth: () => 1,
                      vLineWidth: () => 1,
                      hLineColor: () => '#d1d5db',
                      vLineColor: () => '#d1d5db',
                    },
                  },
                  { text: '(podpis i pieczęć)', fontSize: 8, color: '#666666', alignment: 'center', margin: [0, 5, 0, 0] },
                ],
              },
              { width: '6%', text: '' },
              {
                width: '47%',
                stack: [
                  { text: 'Odbierający:', fontSize: 10, bold: true, margin: [0, 0, 0, 5] },
                  {
                    table: {
                      widths: ['*'],
                      heights: [70],
                      body: [[{ text: '', border: [true, true, true, true] }]],
                    },
                    layout: {
                      hLineWidth: () => 1,
                      vLineWidth: () => 1,
                      hLineColor: () => '#d1d5db',
                      vLineColor: () => '#d1d5db',
                    },
                  },
                  { text: '(podpis i pieczęć)', fontSize: 8, color: '#666666', alignment: 'center', margin: [0, 5, 0, 0] },
                ],
              },
            ],
          },
        ],
        styles: {
          sectionHeader: {
            fontSize: 10,
            bold: true,
            color: '#ffffff',
            fillColor: '#374151',
            margin: [10, 6, 10, 6],
          },
          tableHeader: {
            bold: true,
            fontSize: 9,
            color: '#374151',
            fillColor: '#f3f4f6',
            margin: [5, 6, 5, 6],
          },
        },
        defaultStyle: {
          fontSize: 10,
        },
      };

      pdfMake.createPdf(docDefinition).download(`protokol_${protocolData.clientName.replace(/\s+/g, '_')}_${protocolData.invoiceNumber.replace(/\//g, '-')}.pdf`);
      
      setIsProtocolModalOpen(false);
      setProtocolData({
        clientName: "",
        clientCity: "",
        skladnicaId: "zup_lodz",
        invoiceNumber: "",
        invoiceDate: new Date().toISOString().split("T")[0],
      });
      setClientProducts([]);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      showToast("Błąd podczas generowania PDF", "error");
    }
  };

  const getCategoryConfig = (categoryId: string) => {
    const category = PRODUCT_CATEGORIES.find((c) => c.id === categoryId);
    if (!category) return { name: categoryId, icon: Package, color: "gray" };
    return category;
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; light: string }> = {
      blue: { bg: "bg-blue-600", text: "text-blue-600", border: "border-blue-600", light: "bg-blue-50" },
      orange: { bg: "bg-orange-600", text: "text-orange-600", border: "border-orange-600", light: "bg-orange-50" },
      purple: { bg: "bg-purple-600", text: "text-purple-600", border: "border-purple-600", light: "bg-purple-50" },
      green: { bg: "bg-green-600", text: "text-green-600", border: "border-green-600", light: "bg-green-50" },
      pink: { bg: "bg-pink-600", text: "text-pink-600", border: "border-pink-600", light: "bg-pink-50" },
      cyan: { bg: "bg-cyan-600", text: "text-cyan-600", border: "border-cyan-600", light: "bg-cyan-50" },
      red: { bg: "bg-red-600", text: "text-red-600", border: "border-red-600", light: "bg-red-50" },
      indigo: { bg: "bg-indigo-600", text: "text-indigo-600", border: "border-indigo-600", light: "bg-indigo-50" },
      gray: { bg: "bg-gray-600", text: "text-gray-600", border: "border-gray-600", light: "bg-gray-50" },
    };
    return colors[color] || colors.gray;
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const activeCategoryConfig = getCategoryConfig(activeCategory);
  const activeColors = getColorClasses(activeCategoryConfig.color);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-900">Panel handlowy</span>
              <span className="text-sm text-gray-500">• {userName}</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="text-gray-500 hover:text-blue-600 text-sm flex items-center gap-1">
                <Home className="w-4 h-4" />
                Strona główna
              </a>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                Wyloguj
              </button>
            </div>
          </div>

          {/* Nawigacja - Dashboard + Kategorie */}
          <nav className="flex gap-1 overflow-x-auto">
            {/* Dashboard */}
            <button
              onClick={() => setActiveView("dashboard")}
              className={`px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeView === "dashboard"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              Dashboard
            </button>
            
            {/* Separator */}
            <div className="w-px bg-gray-200 mx-1 my-1" />
            
            {/* Kategorie produktów */}
            {PRODUCT_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isActive = activeView === "products" && activeCategory === category.id;
              const colors = getColorClasses(category.color);
              
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveView("products");
                    setActiveCategory(category.id);
                  }}
                  className={`px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? colors.text
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {category.name}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Drugi header - zakładki Dashboard */}
      {activeView === "dashboard" && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-8">
              <button
                onClick={() => setDashboardTab("skladnice")}
                className={`px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2 ${
                  dashboardTab === "skladnice"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Building2 className="w-4 h-4" />
                Składnice
              </button>
              <button
                onClick={() => setDashboardTab("analytics")}
                className={`px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2 ${
                  dashboardTab === "analytics"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Analityka
              </button>
              <button
                onClick={() => setDashboardTab("import")}
                className={`px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2 ${
                  dashboardTab === "import"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Upload className="w-4 h-4" />
                Import WORD
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        {activeView === "dashboard" ? (
          /* ============ DASHBOARD ============ */
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {dashboardTab === "analytics" ? (
                /* ========== ANALITYKA ========== */
                <div className="p-6 space-y-6">
                  {/* Filtry - Kategoria i Okres */}
                  <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700">Kategoria:</span>
                      <select
                        value={analyticsCategory}
                        onChange={(e) => setAnalyticsCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white font-medium min-w-[200px]"
                      >
                        {PRODUCT_CATEGORIES.map(cat => {
                          const count = analyticsData.allCategoriesStats[cat.id] || 0;
                          return (
                            <option key={cat.id} value={cat.id}>
                              {cat.name} ({count})
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="h-8 w-px bg-gray-300" />
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700">Okres:</span>
                      <select
                        value={analyticsYear}
                        onChange={(e) => setAnalyticsYear(parseInt(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {analyticsData.years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <select
                        value={analyticsMonth ?? ''}
                        onChange={(e) => setAnalyticsMonth(e.target.value ? parseInt(e.target.value) : null)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="">Cały rok</option>
                        <option value="1">Styczeń</option>
                        <option value="2">Luty</option>
                        <option value="3">Marzec</option>
                        <option value="4">Kwiecień</option>
                        <option value="5">Maj</option>
                        <option value="6">Czerwiec</option>
                        <option value="7">Lipiec</option>
                        <option value="8">Sierpień</option>
                        <option value="9">Wrzesień</option>
                        <option value="10">Październik</option>
                        <option value="11">Listopad</option>
                        <option value="12">Grudzień</option>
                      </select>
                    </div>
                  </div>

                  {/* Przycisk PDF */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleGenerateAnalyticsPDF}
                      disabled={analyticsData.total === 0}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Pobierz raport PDF
                    </button>
                  </div>

                  {/* Statystyki dla kategorii */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                      <p className="text-sm opacity-80">Łącznie</p>
                      <p className="text-3xl font-bold">{analyticsData.total}</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white">
                      <p className="text-sm opacity-80">Klientów</p>
                      <p className="text-3xl font-bold">{analyticsData.uniqueClients}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                      <p className="text-sm opacity-80">Modeli</p>
                      <p className="text-3xl font-bold">{Object.keys(analyticsData.byDevice).length}</p>
                    </div>
                  </div>

                  {/* Wykres kołowy + Lista urządzeń */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Wykres kołowy */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Porównanie modeli - {PRODUCT_CATEGORIES.find(c => c.id === analyticsCategory)?.name}
                      </h3>
                      {Object.keys(analyticsData.byDevice).length === 0 ? (
                        <div className="flex items-center justify-center h-48 text-gray-400">
                          Brak danych
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <svg viewBox="0 0 200 200" className="w-48 h-48">
                            {(() => {
                              const devices = Object.entries(analyticsData.byDevice).sort(([,a], [,b]) => b - a);
                              let currentAngle = -90;
                              return devices.map(([device, count], index) => {
                                const percentage = (count / analyticsData.total) * 100;
                                const angle = (percentage / 100) * 360;
                                const startAngle = currentAngle;
                                const endAngle = currentAngle + angle;
                                currentAngle = endAngle;
                                
                                // Dla pojedynczego elementu (100%) rysuj pełne koło
                                if (devices.length === 1) {
                                  return (
                                    <circle
                                      key={device}
                                      cx="100"
                                      cy="100"
                                      r="80"
                                      fill={pieColors[index % pieColors.length]}
                                    />
                                  );
                                }
                                
                                return (
                                  <path
                                    key={device}
                                    d={generatePieSlice(startAngle, endAngle - 0.5, 80)}
                                    fill={pieColors[index % pieColors.length]}
                                    className="hover:opacity-80 transition-opacity cursor-pointer"
                                  />
                                );
                              });
                            })()}
                            {/* Środkowe koło (donut effect) */}
                            <circle cx="100" cy="100" r="40" fill="white" />
                            <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-gray-900">
                              {analyticsData.total}
                            </text>
                            <text x="100" y="112" textAnchor="middle" className="text-xs fill-gray-500">
                              urządzeń
                            </text>
                          </svg>
                        </div>
                      )}
                      {/* Legenda */}
                      <div className="mt-4 space-y-2">
                        {Object.entries(analyticsData.byDevice)
                          .sort(([,a], [,b]) => b - a)
                          .map(([device, count], index) => (
                            <div key={device} className="flex items-center gap-2 text-sm">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: pieColors[index % pieColors.length] }}
                              />
                              <span className="flex-1 text-gray-700">{device}</span>
                              <span className="font-medium text-gray-900">{count}</span>
                              <span className="text-gray-400">
                                ({((count / analyticsData.total) * 100).toFixed(1)}%)
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Lista szczegółowa urządzeń */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Szczegóły modeli</h3>
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {Object.entries(analyticsData.byDevice).length === 0 ? (
                          <p className="text-sm text-gray-400 text-center py-8">Brak danych dla wybranego okresu</p>
                        ) : (
                          Object.entries(analyticsData.byDevice)
                            .sort(([,a], [,b]) => b - a)
                            .map(([device, count], index) => (
                              <div key={device} className="bg-white rounded-lg p-3 border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="w-2 h-2 rounded-full" 
                                      style={{ backgroundColor: pieColors[index % pieColors.length] }}
                                    />
                                    <span className="font-medium text-gray-900">{device}</span>
                                  </div>
                                  <span className="text-lg font-bold text-gray-900">{count} szt.</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ 
                                      width: `${(count / analyticsData.total) * 100}%`,
                                      backgroundColor: pieColors[index % pieColors.length]
                                    }}
                                  />
                                </div>
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dostawy do klientów */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Dostawy - {PRODUCT_CATEGORIES.find(c => c.id === analyticsCategory)?.name}
                    </h3>
                    <div className="bg-gray-50 rounded-xl overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Klient</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">RDLP</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Urządzenia</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Ilość</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Data</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {Object.keys(analyticsData.byClient).length === 0 ? (
                            <tr>
                              <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                                Brak danych dla wybranego okresu
                              </td>
                            </tr>
                          ) : (
                            Object.entries(analyticsData.byClient)
                              .sort(([,a], [,b]) => new Date(b.date).getTime() - new Date(a.date).getTime())
                              .map(([client, data]) => {
                                const rdlp = getRDLPFromClient(client);
                                return (
                                  <tr key={client} className="bg-white hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{client}</td>
                                    <td className="px-4 py-3">
                                      {rdlp ? (
                                        <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">
                                          {rdlp}
                                        </span>
                                      ) : (
                                        <span className="text-gray-400 text-xs">—</span>
                                      )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                      {Object.entries(data.devices).map(([d, c]) => (
                                        <span key={d} className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs mr-1 mb-1">
                                          {d} ({c})
                                        </span>
                                      ))}
                                    </td>
                                    <td className="px-4 py-3 text-right font-bold text-gray-900">{data.count}</td>
                                    <td className="px-4 py-3 text-right text-sm text-gray-600">
                                      {new Date(data.date).toLocaleDateString('pl-PL')}
                                    </td>
                                  </tr>
                                );
                              })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                /* ========== SKŁADNICE ========== */
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-4">Wprowadź numery umów dla każdej składnicy. Będą używane przy generowaniu protokołów.</p>
                  <div className="space-y-3">
                    {skladnice.map((s: any) => (
                      <div key={s.id} className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-emerald-600" />
                          </div>
                          <h3 className="font-medium text-gray-900">{s.name}</h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={s.contractNumber || ''}
                            onChange={(e) => updateSkladnicaContract(s.id, e.target.value)}
                            placeholder="Numer umowy..."
                            className="w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                          {s.contractNumber ? (
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                              ✓ Aktywna
                            </span>
                          ) : (
                            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                              Brak umowy
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ============ PRODUKTY ============ */
          <>
        {/* Akcje */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {React.createElement(activeCategoryConfig.icon, { className: `w-5 h-5 ${activeColors.text}` })}
              {activeCategoryConfig.name}
            </h1>
            <p className="text-sm text-gray-500">{products.length} produktów</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setFormData({
                  deviceType: DEVICE_TYPES[activeCategory]?.[0] || "",
                  serialNumbersText: "",
                  clientName: "",
                  saleDate: new Date().toISOString().split("T")[0],
                  notes: "",
                });
                setAccessories([]);
                setParsedSerials([]);
                setIsAddModalOpen(true);
              }}
              className={`flex items-center gap-2 px-4 py-2 ${activeColors.bg} text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium`}
            >
              <Plus className="w-4 h-4" />
              Dodaj produkty
            </button>
          </div>
        </div>

        {/* Lista produktów pogrupowana po klientach */}
        {products.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            {React.createElement(activeCategoryConfig.icon, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" })}
            <p className="text-gray-500 mb-4">Brak produktów w tej kategorii</p>
            <button
              onClick={() => {
                setFormData({
                  deviceType: DEVICE_TYPES[activeCategory]?.[0] || "",
                  serialNumbersText: "",
                  clientName: "",
                  saleDate: new Date().toISOString().split("T")[0],
                  notes: "",
                });
                setAccessories([]);
                setParsedSerials([]);
                setIsAddModalOpen(true);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 ${activeColors.bg} text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium`}
            >
              <Plus className="w-4 h-4" />
              Dodaj pierwsze produkty
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(productsByClient).map(([clientName, clientProducts]) => {
              const isExpanded = expandedClients.has(clientName);
              const firstProduct = clientProducts[0];
              const saleDate = firstProduct ? new Date(firstProduct.sale_date).toLocaleDateString("pl-PL") : '';
              
              return (
                <motion.div
                  key={clientName}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  {/* Header boxa */}
                  <div 
                    className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleClientExpand(clientName)}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className={`w-5 h-5 text-gray-500 transform ${isExpanded ? '' : '-rotate-90'}`} />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{clientName}</h3>
                        <p className="text-sm text-gray-500">
                          {clientProducts.length} urządzeń • {saleDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleEditClient(clientName, clientProducts)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
                      >
                        <Pencil className="w-4 h-4" />
                        Edytuj
                      </button>
                      <button
                        onClick={() => handleGenerateProtocolForClient(clientName)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                      >
                        <FileText className="w-4 h-4" />
                        Generuj protokół
                      </button>
                    </div>
                  </div>
                  
                  {/* Rozwijana zawartość */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-gray-200">
                          <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Urządzenie</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Numer seryjny</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Akcesoria</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                              {clientProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                  <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                      {React.createElement(activeCategoryConfig.icon, { className: `w-4 h-4 ${activeColors.text}` })}
                                      <span className="font-medium text-gray-900 text-sm">{product.device_type}</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-2">
                                    <span className="text-sm text-gray-600 font-mono">{product.serial_number}</span>
                                  </td>
                                  <td className="px-4 py-2">
                                    <div className="flex flex-wrap gap-1">
                                      {(() => {
                                        let accs = product.accessories;
                                        if (typeof accs === 'string') {
                                          try { accs = JSON.parse(accs); } catch { accs = []; }
                                        }
                                        if (!accs || !Array.isArray(accs) || accs.length === 0) {
                                          return <span className="text-xs text-gray-400">—</span>;
                                        }
                                        return accs.map((acc: any, i: number) => {
                                          let parsedAcc = acc;
                                          if (typeof acc === 'string') {
                                            try { parsedAcc = JSON.parse(acc); } catch { return <span key={i} className={`text-xs px-2 py-0.5 rounded ${activeColors.light} ${activeColors.text}`}>{acc}</span>; }
                                          }
                                          const isObject = typeof parsedAcc === 'object' && parsedAcc !== null;
                                          const name = isObject ? parsedAcc.name : String(parsedAcc);
                                          const hasSN = isObject ? parsedAcc.hasSerialNumbers : false;
                                          return (
                                            <span key={i} className={`text-xs px-2 py-0.5 rounded ${activeColors.light} ${activeColors.text} flex items-center gap-1`}>
                                              {name}
                                              {hasSN && <span className="bg-amber-200 text-amber-800 px-1 rounded text-[10px]">S/N</span>}
                                            </span>
                                          );
                                        });
                                      })()}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
          </>
        )}
      </div>

      {/* Modal dodawania produktu */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${activeColors.light} rounded-lg flex items-center justify-center`}>
                      {React.createElement(activeCategoryConfig.icon, { className: `w-5 h-5 ${activeColors.text}` })}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Dodaj produkty</h3>
                      <p className="text-sm text-gray-500">{activeCategoryConfig.name} • Masowe dodawanie</p>
                    </div>
                  </div>
                  <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Typ urządzenia */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Typ urządzenia <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.deviceType}
                        onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      >
                        <option value="">Wybierz...</option>
                        {DEVICE_TYPES[activeCategory]?.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Numery seryjne - masowe dodawanie */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Numery seryjne <span className="text-red-500">*</span>
                      {parsedSerials.length > 0 && (
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold ${activeColors.light} ${activeColors.text}`}>
                          {parsedSerials.length} szt.
                        </span>
                      )}
                    </label>
                    <textarea
                      value={formData.serialNumbersText}
                      onChange={(e) => setFormData({ ...formData, serialNumbersText: e.target.value.toUpperCase() })}
                      placeholder="Wklej numery seryjne (każdy w nowej linii lub rozdzielone przecinkami):

ABC123456
DEF789012
GHI345678
..."
                      rows={6}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Wklej numery seryjne z Excela lub wpisz ręcznie (każdy w nowej linii, lub rozdzielone przecinkami/spacjami)
                    </p>
                    {parsedSerials.length > 0 && (
                      <div className="mt-2 p-2 bg-gray-50 rounded-lg max-h-24 overflow-y-auto">
                        <p className="text-xs text-gray-600 mb-1">Rozpoznane numery:</p>
                        <div className="flex flex-wrap gap-1">
                          {parsedSerials.slice(0, 10).map((serial, i) => (
                            <span key={i} className="text-xs bg-white border border-gray-200 px-1.5 py-0.5 rounded font-mono">
                              {serial}
                            </span>
                          ))}
                          {parsedSerials.length > 10 && (
                            <span className="text-xs text-gray-500">+{parsedSerials.length - 10} więcej...</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Klient */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nazwa klienta <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="Nadleśnictwo..."
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Data sprzedaży */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data sprzedaży <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={formData.saleDate}
                        onChange={(e) => setFormData({ ...formData, saleDate: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Akcesoria */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Akcesoria
                    </label>
                    
                    {/* Formularz dodawania akcesoriów */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-3">
                      <div className="grid grid-cols-12 gap-2 mb-2">
                        {/* Nazwa */}
                        <div className="col-span-5">
                          <input
                            type="text"
                            value={newAccessory.name}
                            onChange={(e) => setNewAccessory({ ...newAccessory, name: e.target.value })}
                            placeholder="Nazwa akcesoria..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        </div>
                        {/* Ilość */}
                        <div className="col-span-2">
                          <input
                            type="number"
                            min="1"
                            value={newAccessory.quantity}
                            onChange={(e) => setNewAccessory({ ...newAccessory, quantity: parseInt(e.target.value) || 1 })}
                            placeholder="Ilość"
                            disabled={newAccessory.hasSerialNumbers}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100 disabled:text-gray-500"
                          />
                        </div>
                        {/* Checkbox S/N */}
                        <div className="col-span-3 flex items-center">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={newAccessory.hasSerialNumbers}
                              onChange={(e) => setNewAccessory({ ...newAccessory, hasSerialNumbers: e.target.checked })}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">S/N</span>
                          </label>
                        </div>
                        {/* Przycisk dodaj */}
                        <div className="col-span-2">
                          <button
                            type="button"
                            onClick={handleAddAccessory}
                            disabled={!newAccessory.name.trim()}
                            className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors text-sm font-medium"
                          >
                            Dodaj
                          </button>
                        </div>
                      </div>
                      
                      {/* Pole na numery seryjne - pokazuje się gdy S/N zaznaczone */}
                      {newAccessory.hasSerialNumbers && (
                        <div className="mt-2">
                          <label className="block text-xs text-gray-600 mb-1">
                            Numery seryjne akcesoriów (każdy w nowej linii):
                          </label>
                          <textarea
                            value={newAccessory.serialNumbersText}
                            onChange={(e) => setNewAccessory({ ...newAccessory, serialNumbersText: e.target.value })}
                            placeholder="Wklej numery seryjne - każdy w nowej linii lub oddzielone przecinkiem..."
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono"
                          />
                          {newAccessory.serialNumbersText && (
                            <p className="text-xs text-blue-600 mt-1">
                              Rozpoznano: {newAccessory.serialNumbersText.split(/[\n,;\s]+/).filter(s => s.trim().length > 0).length} numerów seryjnych
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Lista dodanych akcesoriów */}
                    {accessories.length > 0 && (
                      <div className="space-y-2">
                        {accessories.map((acc, i) => (
                          <div
                            key={i}
                            className={`flex items-start justify-between p-2 rounded-lg ${activeColors.light} border border-gray-200`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className={`font-medium text-sm ${activeColors.text}`}>{acc.name}</span>
                                <span className="text-xs bg-white px-2 py-0.5 rounded-full text-gray-600">
                                  {acc.quantity} szt.
                                </span>
                                {acc.hasSerialNumbers && (
                                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                    S/N
                                  </span>
                                )}
                              </div>
                              {acc.hasSerialNumbers && acc.serialNumbers.length > 0 && (
                                <div className="mt-1 text-xs text-gray-500 font-mono">
                                  {acc.serialNumbers.slice(0, 3).join(', ')}
                                  {acc.serialNumbers.length > 3 && ` ... +${acc.serialNumbers.length - 3} więcej`}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => handleRemoveAccessory(i)}
                              className="text-gray-400 hover:text-red-500 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Notatki */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notatki
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Opcjonalne uwagi..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>

                {/* Przyciski */}
                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={handleSaveProduct}
                    disabled={isSaving || parsedSerials.length === 0}
                    className={`flex-1 px-4 py-2.5 ${activeColors.bg} text-white rounded-lg font-medium hover:opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2`}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Zapisywanie {parsedSerials.length} szt...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Zapisz {parsedSerials.length > 0 ? `(${parsedSerials.length} szt.)` : ""}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal edycji produktów klienta */}
      <AnimatePresence>
        {editingClient && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseEditModal}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-amber-50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Edycja produktów</h2>
                  <p className="text-sm text-gray-600">{editingClient}</p>
                </div>
                <button
                  onClick={handleCloseEditModal}
                  className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-4">
                  {editingProducts.map((product) => {
                    let accs = product.accessories;
                    if (typeof accs === 'string') {
                      try { accs = JSON.parse(accs); } catch { accs = []; }
                    }
                    if (!Array.isArray(accs)) accs = [];

                    return (
                      <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{product.device_type}</h3>
                            <p className="text-sm text-gray-500 font-mono">{product.serial_number}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Usuń urządzenie"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Akcesoria */}
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Akcesoria</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {accs.length === 0 ? (
                              <span className="text-sm text-gray-400">Brak akcesoriów</span>
                            ) : (
                              accs.map((acc: any, i: number) => {
                                // Parse if it's a JSON string
                                let parsedAcc = acc;
                                if (typeof acc === 'string') {
                                  try { parsedAcc = JSON.parse(acc); } catch { parsedAcc = { name: acc, quantity: 1 }; }
                                }
                                const isObject = typeof parsedAcc === 'object' && parsedAcc !== null;
                                const name = isObject ? parsedAcc.name : String(parsedAcc);
                                const qty = isObject ? (parsedAcc.quantity || 1) : 1;
                                return (
                                  <span 
                                    key={i} 
                                    className="inline-flex items-center gap-1 text-sm px-2 py-1 bg-gray-100 rounded group"
                                  >
                                    {name} {qty > 1 && `(${qty})`}
                                    <button
                                      onClick={() => handleRemoveAccessoryFromProduct(product.id, i)}
                                      className="ml-1 text-gray-400 hover:text-red-500"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </span>
                                );
                              })
                            )}
                          </div>

                          {/* Dodaj akcesorium */}
                          {addingAccessoryToProductId === product.id ? (
                            <div className="flex items-center gap-2 mt-2">
                              <input
                                type="text"
                                value={newAccessoryName}
                                onChange={(e) => setNewAccessoryName(e.target.value)}
                                placeholder="Nazwa akcesorium"
                                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                              />
                              <input
                                type="number"
                                value={newAccessoryQuantity}
                                onChange={(e) => setNewAccessoryQuantity(parseInt(e.target.value) || 1)}
                                min={1}
                                className="w-16 px-2 py-1.5 border border-gray-300 rounded-lg text-sm text-center focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                              />
                              <button
                                onClick={() => handleAddAccessoryToProduct(product.id)}
                                className="px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm font-medium"
                              >
                                Dodaj
                              </button>
                              <button
                                onClick={() => {
                                  setAddingAccessoryToProductId(null);
                                  setNewAccessoryName("");
                                  setNewAccessoryQuantity(1);
                                }}
                                className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                              >
                                Anuluj
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setAddingAccessoryToProductId(product.id)}
                              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                            >
                              + Dodaj akcesorium
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {editingProducts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Brak produktów do edycji
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={handleCloseEditModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                >
                  Zamknij
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal generowania protokołu */}
      <AnimatePresence>
        {isProtocolModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsProtocolModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Generuj protokół odbioru</h3>
                      <p className="text-sm text-gray-500">Protokół przekazania sprzętu</p>
                    </div>
                  </div>
                  <button onClick={() => setIsProtocolModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Składnica */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Składnica (umowa) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={protocolData.skladnicaId}
                        onChange={(e) => setProtocolData({ ...protocolData, skladnicaId: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
                      >
                        {skladnice.map((s: any) => (
                          <option key={s.id} value={s.id}>
                            {s.name} • Umowa {s.contractNumber}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Numer faktury */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Numer faktury <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={protocolData.invoiceNumber}
                      onChange={(e) => setProtocolData({ ...protocolData, invoiceNumber: e.target.value })}
                      placeholder="np. 1671/12/2025"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Data faktury */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data faktury <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={protocolData.invoiceDate}
                      onChange={(e) => setProtocolData({ ...protocolData, invoiceDate: e.target.value })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  {/* Nazwa klienta */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nazwa nadleśnictwa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={protocolData.clientName}
                      onChange={(e) => {
                        setProtocolData({ ...protocolData, clientName: e.target.value });
                        // Pobierz produkty dla tego klienta
                        fetchClientProducts(e.target.value);
                      }}
                      placeholder="np. Giżycko (bez słowa 'Nadleśnictwo')"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Wpisz samą nazwę (np. "Giżycko") - "Nadleśnictwa" doda się automatycznie na protokole
                    </p>
                  </div>

                  {/* Miejscowość */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Miejscowość (siedziba nadleśnictwa) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={protocolData.clientCity}
                      onChange={(e) => setProtocolData({ ...protocolData, clientCity: e.target.value })}
                      placeholder="np. Giżycko"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Pojawi się w prawym górnym rogu protokołu
                    </p>
                  </div>

                  {/* Podgląd produktów */}
                  {protocolData.clientName && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Produkty do protokołu:
                      </p>
                      {clientProducts.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">
                          Brak produktów dla tego klienta. Sprawdź poprawność nazwy.
                        </p>
                      ) : (
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {clientProducts.map((p) => (
                            <div key={p.id} className="flex items-center justify-between text-xs">
                              <span className="text-gray-700">{p.device_type}</span>
                              <span className="text-gray-500 font-mono">{p.serial_number}</span>
                            </div>
                          ))}
                          <div className="pt-2 border-t border-gray-200 mt-2">
                            <span className="text-sm font-semibold text-emerald-600">
                              Łącznie: {clientProducts.length} szt.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Podgląd nagłówka */}
                  {protocolData.clientName && protocolData.invoiceNumber && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        <strong>Podgląd nagłówka:</strong><br />
                        Firma <strong>TAKMA</strong> z siedzibą we Wrocławiu przy ulicy Poświęckiej 1a, 
                        zgodnie z fakturą nr <strong>{protocolData.invoiceNumber}</strong> z dnia{" "}
                        <strong>{new Date(protocolData.invoiceDate).toLocaleDateString('pl-PL')}</strong> oraz z Umową nr{" "}
                        <strong>{skladnice.find((s: any) => s.id === protocolData.skladnicaId)?.contractNumber}</strong> z{" "}
                        <strong>{skladnice.find((s: any) => s.id === protocolData.skladnicaId)?.name}</strong> dostarczyła do{" "}
                        <strong>{protocolData.clientName.toLowerCase().startsWith('nadleśnictwo ') 
                          ? protocolData.clientName.replace(/^Nadleśnictwo\s+/i, 'Nadleśnictwa ')
                          : `Nadleśnictwa ${protocolData.clientName}`}</strong> następujący sprzęt:
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setIsProtocolModalOpen(false);
                      setClientProducts([]);
                    }}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={handleGenerateProtocol}
                    disabled={clientProducts.length === 0 || !protocolData.invoiceNumber}
                    className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    Generuj PDF ({clientProducts.length} szt.)
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal sukcesu */}
      <AnimatePresence>
        {successModal.isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSuccessModal({ ...successModal, isOpen: false })}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                {successModal.count > 0 ? (
                  <>
                    {/* Ikona sukcesu */}
                    <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sukces!</h3>
                    <p className="text-gray-600 mb-2">{successModal.message}</p>
                    <p className="text-3xl font-bold text-emerald-600 mb-4">
                      +{successModal.count} <span className="text-lg font-normal text-gray-500">urządzeń</span>
                    </p>
                  </>
                ) : (
                  <>
                    {/* Ikona błędu */}
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Błąd</h3>
                    <p className="text-gray-600 mb-4">{successModal.message}</p>
                  </>
                )}
                <button
                  onClick={() => setSuccessModal({ ...successModal, isOpen: false })}
                  className={`w-full py-3 rounded-xl font-medium transition-colors ${
                    successModal.count > 0
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button - tylko w analityce */}
      {activeView === "dashboard" && dashboardTab === "analytics" && (
        <>
          {/* Chat Panel */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="fixed bottom-24 left-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">Asystent AI</h3>
                      <p className="text-white/70 text-xs">Analityka sprzedaży</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {chatMessages.length === 0 && (
                    <div className="text-center py-8">
                      <Bot className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">
                        Zapytaj mnie o statystyki sprzedaży!
                      </p>
                      <div className="mt-4 space-y-2">
                        {[
                          "Ile rejestratorów sprzedaliśmy do RDLP Olsztyn?",
                          "Pokaż sprzedaż Zebra EM45",
                          "Które RDLP kupiło najwięcej?"
                        ].map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setChatInput(suggestion);
                            }}
                            className="block w-full text-left px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-gray-600"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.role === 'user' 
                            ? 'bg-blue-600' 
                            : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                        }`}>
                          {msg.role === 'user' 
                            ? <User className="w-4 h-4 text-white" />
                            : <Bot className="w-4 h-4 text-white" />
                          }
                        </div>
                        <div className={`px-3 py-2 rounded-2xl text-sm ${
                          msg.role === 'user'
                            ? 'bg-blue-600 text-white rounded-br-md'
                            : 'bg-white border border-gray-200 text-gray-700 rounded-bl-md shadow-sm'
                        }`}>
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl rounded-bl-md shadow-sm">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                      placeholder="Zadaj pytanie o sprzedaż..."
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <button
                      onClick={sendChatMessage}
                      disabled={!chatInput.trim() || isChatLoading}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Button */}
          <motion.button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`fixed bottom-6 left-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors z-50 ${
              isChatOpen 
                ? 'bg-gray-600 hover:bg-gray-700' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isChatOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <MessageCircle className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </>
      )}

      {/* Import Section */}
      {activeView === "dashboard" && dashboardTab === "import" && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Import z protokołu WORD</h2>
            
            {/* Upload Area */}
            <div 
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${
                importFile ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const file = e.dataTransfer.files[0];
                if (file && (file.name.endsWith('.docx') || file.name.endsWith('.doc'))) {
                  setImportFile(file);
                  handleFileUpload(file);
                }
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImportFile(file);
                    handleFileUpload(file);
                  }
                }}
              />
              {importLoading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-3" />
                  <p className="text-gray-600">Analizowanie dokumentu...</p>
                </div>
              ) : importFile ? (
                <div className="flex flex-col items-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                  <p className="font-medium text-gray-900">{importFile.name}</p>
                  <p className="text-sm text-gray-500 mt-1">Kliknij aby zmienić plik</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="font-medium text-gray-900">Przeciągnij plik Word lub kliknij</p>
                  <p className="text-sm text-gray-500 mt-1">Obsługiwane formaty: .doc, .docx</p>
                </div>
              )}
            </div>

            {/* Error */}
            {importError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">Błąd importu</p>
                  <p className="text-sm text-red-600 mt-1">{importError}</p>
                </div>
              </div>
            )}

            {/* Parsed Data Preview */}
            {importData && (
              <div className="mt-6 space-y-4">
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Dane z protokołu</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Numer faktury</label>
                        <input
                          type="text"
                          value={importData.invoiceNumber}
                          onChange={(e) => setImportData({...importData, invoiceNumber: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Data faktury</label>
                        <input
                          type="text"
                          value={importData.invoiceDate}
                          onChange={(e) => setImportData({...importData, invoiceDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Numer umowy</label>
                        <input
                          type="text"
                          value={importData.contractNumber}
                          onChange={(e) => setImportData({...importData, contractNumber: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Składnica</label>
                        <input
                          type="text"
                          value={importData.skladnica}
                          onChange={(e) => setImportData({...importData, skladnica: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">Klient (Nadleśnictwo)</label>
                        <input
                          type="text"
                          value={importData.clientName}
                          onChange={(e) => setImportData({...importData, clientName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      </div>
                    </div>

                    {/* Devices */}
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Urządzenia i akcesoria
                      </h4>
                      <div className="space-y-3">
                        {importData.devices.map((device, idx) => (
                          <div key={idx} className={`p-4 rounded-xl ${device.isAccessory ? 'bg-gray-50' : 'bg-blue-50'}`}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                    device.isAccessory ? 'bg-gray-200 text-gray-700' : 'bg-blue-200 text-blue-700'
                                  }`}>
                                    {device.isAccessory ? 'Akcesorium' : 'Urządzenie'}
                                  </span>
                                  <span className="font-medium text-gray-900">{device.name}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Ilość: {device.quantity} szt.</p>
                                {device.serialNumbers.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs text-gray-500 mb-1">Numery seryjne ({device.serialNumbers.length}):</p>
                                    <div className="flex flex-wrap gap-1">
                                      {device.serialNumbers.slice(0, 5).map((sn, i) => (
                                        <span key={i} className="text-xs bg-white px-2 py-0.5 rounded border">{sn}</span>
                                      ))}
                                      {device.serialNumbers.length > 5 && (
                                        <span className="text-xs text-gray-500">+{device.serialNumbers.length - 5} więcej</span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => {
                                  const newDevices = [...importData.devices];
                                  newDevices.splice(idx, 1);
                                  setImportData({...importData, devices: newDevices});
                                }}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Import Button */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setImportData(null);
                      setImportFile(null);
                      setImportError(null);
                    }}
                    className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={handleImportConfirm}
                    disabled={importLoading || !importData.clientName}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl font-medium flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Importuj {importData.devices.filter(d => !d.isAccessory).reduce((sum, d) => sum + d.quantity, 0)} urządzeń
                  </button>
                </div>
              </div>
            )}

            {/* Success Modal */}
            <AnimatePresence>
              {importSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                  onClick={() => setImportSuccess(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Import zakończony!</h3>
                    <p className="text-gray-600 mb-6">
                      Zaimportowano <span className="font-semibold text-green-600">{importSuccess.count}</span> urządzeń 
                      dla <span className="font-semibold">{importSuccess.client}</span>
                    </p>
                    <button
                      onClick={() => setImportSuccess(null)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium w-full"
                    >
                      OK
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className={`fixed top-4 left-1/2 z-[100] px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 ${
              toast.type === 'success' 
                ? 'bg-green-600 text-white' 
                : toast.type === 'error' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-blue-600 text-white'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {toast.type === 'info' && <AlertCircle className="w-5 h-5" />}
            <span className="font-medium">{toast.message}</span>
            <button 
              onClick={() => setToast(null)}
              className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
