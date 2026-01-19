"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Loader2,
  Download,
  MessageCircle,
  Send,
  Bot,
  User,
  Sparkles,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface SalesProduct {
  id: string;
  category: string;
  device_type: string;
  serial_number: string;
  client_name: string;
  sale_date: string;
  accessories: string | null;
  notes: string | null;
  created_at: string;
}

const NADLESNICTWO_TO_RDLP: Record<string, string> = {
  "Giżycko": "RDLP Olsztyn", "Mrągowo": "RDLP Olsztyn", "Wipsowo": "RDLP Olsztyn",
  "Olsztyn": "RDLP Olsztyn", "Bierzwnik": "RDLP Zielona Góra", "Pieńsk": "RDLP Wrocław",
};

function getRDLPFromClient(clientName: string): string {
  const name = clientName.replace(/^Nadleśnictwo\s+/i, '').trim();
  return NADLESNICTWO_TO_RDLP[name] || "";
}

const CATEGORIES = [
  { id: "rejestratory", name: "Rejestratory" },
  { id: "drukarki-termiczne", name: "Drukarki termiczne" },
  { id: "drukarki-laserowe", name: "Drukarki laserowe" },
  { id: "laptopy", name: "Laptopy" },
  { id: "urzadzenia-wielofunkcyjne", name: "Urządzenia wielofunkcyjne" },
  { id: "monitory", name: "Monitory" },
  { id: "serwery", name: "Serwery" },
  { id: "all-in-one", name: "All in One" },
];

const pieColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

export default function SzefDashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
  const [allProducts, setAllProducts] = React.useState<SalesProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState("rejestratory");
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = React.useState<number | null>(null);
  
  const [chatMessages, setChatMessages] = React.useState<{role: 'user' | 'assistant'; content: string}[]>([]);
  const [chatInput, setChatInput] = React.useState("");
  const [isChatLoading, setIsChatLoading] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);
  const [showAllDeliveries, setShowAllDeliveries] = React.useState(false);

  React.useEffect(() => {
    const auth = localStorage.getItem("szef_authenticated");
    if (auth !== "true") {
      router.push("/szef");
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [router]);

  React.useEffect(() => {
    if (isAuthenticated) {
      supabase.from("sales_products").select("*").order("sale_date", { ascending: false })
        .then(({ data }) => { if (data) setAllProducts(data); });
    }
  }, [isAuthenticated]);

  const analyticsData = React.useMemo(() => {
    const filtered = allProducts.filter(p => {
      const date = new Date(p.sale_date);
      return p.category === selectedCategory && 
             date.getFullYear() === selectedYear && 
             (selectedMonth === null || date.getMonth() + 1 === selectedMonth);
    });

    const byClient: Record<string, { count: number; devices: Record<string, number>; date: string }> = {};
    const byDevice: Record<string, number> = {};
    
    filtered.forEach(p => {
      if (!byClient[p.client_name]) byClient[p.client_name] = { count: 0, devices: {}, date: p.sale_date };
      byClient[p.client_name].count++;
      byClient[p.client_name].devices[p.device_type] = (byClient[p.client_name].devices[p.device_type] || 0) + 1;
      byDevice[p.device_type] = (byDevice[p.device_type] || 0) + 1;
    });

    const allCategoriesStats: Record<string, number> = {};
    allProducts.filter(p => {
      const date = new Date(p.sale_date);
      return date.getFullYear() === selectedYear && (selectedMonth === null || date.getMonth() + 1 === selectedMonth);
    }).forEach(p => { allCategoriesStats[p.category] = (allCategoriesStats[p.category] || 0) + 1; });

    const dataYears = allProducts.map(p => new Date(p.sale_date).getFullYear());
    const years = [...new Set([2024, 2025, 2026, ...dataYears])].sort((a, b) => b - a);

    return { total: filtered.length, byClient, byDevice, years, 
             uniqueClients: Object.keys(byClient).length, allCategoriesStats };
  }, [allProducts, selectedYear, selectedMonth, selectedCategory]);

  // Reset deliveries view on filter change
  React.useEffect(() => {
    setShowAllDeliveries(false);
  }, [selectedYear, selectedMonth, selectedCategory]);

  // Pie slice generator
  const generatePieSlice = (startAngle: number, endAngle: number, radius: number = 80) => {
    const x1 = 100 + radius * Math.cos((Math.PI * startAngle) / 180);
    const y1 = 100 + radius * Math.sin((Math.PI * startAngle) / 180);
    const x2 = 100 + radius * Math.cos((Math.PI * endAngle) / 180);
    const y2 = 100 + radius * Math.sin((Math.PI * endAngle) / 180);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M100,100 L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;
  };

  // PDF
  const handleGeneratePDF = async () => {
    const categoryName = CATEGORIES.find(c => c.id === selectedCategory)?.name || selectedCategory;
    const monthNames = ['', 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    const periodText = selectedMonth ? `${monthNames[selectedMonth]} ${selectedYear}` : `Rok ${selectedYear}`;

    try {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      const pdfMake = pdfMakeModule.default || pdfMakeModule;
      pdfMake.vfs = pdfFontsModule.default?.pdfMake?.vfs || pdfFontsModule.pdfMake?.vfs;

      const deviceRows = Object.entries(analyticsData.byDevice).sort(([,a], [,b]) => b - a)
        .map(([device, count]) => [{ text: device }, { text: String(count), alignment: 'center', bold: true }, 
          { text: `${((count / analyticsData.total) * 100).toFixed(1)}%`, alignment: 'center', color: '#6b7280' }]);

      const clientRows = Object.entries(analyticsData.byClient).sort(([,a], [,b]) => b.count - a.count)
        .map(([client, data]) => [{ text: client }, { text: getRDLPFromClient(client) || '—', color: '#059669' },
          { text: Object.entries(data.devices).map(([d, c]) => `${d} (${c})`).join(', '), fontSize: 9 },
          { text: String(data.count), alignment: 'center', bold: true }]);

      const docDefinition: any = {
        pageSize: 'A4', pageMargins: [40, 40, 40, 60],
        content: [
          { text: 'RAPORT ANALITYCZNY', fontSize: 20, bold: true, margin: [0, 0, 0, 5] },
          { text: `${categoryName} • ${periodText}`, fontSize: 12, color: '#6b7280', margin: [0, 0, 0, 20] },
          { columns: [
            { width: '*', stack: [{ text: String(analyticsData.total), fontSize: 28, bold: true, color: '#3b82f6', alignment: 'center' }, { text: 'urządzeń', fontSize: 10, color: '#6b7280', alignment: 'center' }]},
            { width: '*', stack: [{ text: String(analyticsData.uniqueClients), fontSize: 28, bold: true, color: '#10b981', alignment: 'center' }, { text: 'klientów', fontSize: 10, color: '#6b7280', alignment: 'center' }]},
            { width: '*', stack: [{ text: String(Object.keys(analyticsData.byDevice).length), fontSize: 28, bold: true, color: '#8b5cf6', alignment: 'center' }, { text: 'modeli', fontSize: 10, color: '#6b7280', alignment: 'center' }]},
          ], margin: [0, 0, 0, 25] },
          { text: 'ROZKŁAD WEDŁUG MODELI', fontSize: 11, bold: true, margin: [0, 0, 0, 10] },
          deviceRows.length > 0 ? { table: { widths: ['*', 60, 60], body: deviceRows }, layout: { fillColor: (i: number) => i % 2 === 0 ? '#f9fafb' : null, hLineWidth: () => 0.5, vLineWidth: () => 0, hLineColor: () => '#e5e7eb', paddingLeft: () => 10, paddingRight: () => 10, paddingTop: () => 8, paddingBottom: () => 8 }, margin: [0, 0, 0, 25] } : { text: 'Brak danych', italics: true, color: '#9ca3af', margin: [0, 0, 0, 25] },
          { text: 'DOSTAWY DO KLIENTÓW', fontSize: 11, bold: true, margin: [0, 0, 0, 10] },
          clientRows.length > 0 ? { table: { headerRows: 1, widths: ['*', 80, '*', 40], body: [[{ text: 'Klient', bold: true, fontSize: 9, color: '#6b7280' }, { text: 'RDLP', bold: true, fontSize: 9, color: '#6b7280' }, { text: 'Modele', bold: true, fontSize: 9, color: '#6b7280' }, { text: 'Szt.', bold: true, fontSize: 9, color: '#6b7280', alignment: 'center' }], ...clientRows] }, layout: { fillColor: (i: number) => i === 0 ? '#f3f4f6' : (i % 2 === 1 ? '#f9fafb' : null), hLineWidth: (i: number) => i === 1 ? 1 : 0.5, vLineWidth: () => 0, hLineColor: (i: number) => i === 1 ? '#d1d5db' : '#e5e7eb', paddingLeft: () => 8, paddingRight: () => 8, paddingTop: () => 6, paddingBottom: () => 6 } } : { text: 'Brak danych', italics: true, color: '#9ca3af' },
        ],
        footer: { columns: [{ text: 'TAKMA • Panel Szefa', fontSize: 8, color: '#9ca3af', margin: [40, 0, 0, 0] }, { text: new Date().toLocaleDateString('pl-PL'), fontSize: 8, color: '#9ca3af', alignment: 'right', margin: [0, 0, 40, 0] }] },
        defaultStyle: { fontSize: 10 }
      };

      pdfMake.createPdf(docDefinition).download(`raport_${selectedCategory}_${selectedYear}${selectedMonth ? '_' + String(selectedMonth).padStart(2, '0') : ''}.pdf`);
    } catch (error) { alert('Błąd generowania PDF'); }
  };

  // Chat
  const sendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsChatLoading(true);
    try {
      const response = await fetch("/api/analytics-chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: userMessage }) });
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.answer || "Nie udało się uzyskać odpowiedzi." }]);
    } catch { setChatMessages(prev => [...prev, { role: 'assistant', content: "Wystąpił błąd." }]); }
    finally { setIsChatLoading(false); }
  };

  React.useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const handleLogout = () => { localStorage.removeItem("szef_authenticated"); router.push("/szef"); };

  if (isLoading || !isAuthenticated) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 text-sm">Analiza sprzedaży do LP</span>
          </div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-red-500">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="p-4 pb-24">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            
            {/* Filtry */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 p-3 md:p-4 bg-gray-50 rounded-xl">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                <span className="text-xs md:text-sm font-medium text-gray-700">Kategoria:</span>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white w-full md:w-auto md:min-w-[200px]">
                  {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name} ({analyticsData.allCategoriesStats[cat.id] || 0})</option>)}
                </select>
              </div>
              <div className="hidden md:block h-8 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm font-medium text-gray-700">Okres:</span>
                <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white flex-1 md:flex-none">
                  {analyticsData.years.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
                <select value={selectedMonth ?? ''} onChange={(e) => setSelectedMonth(e.target.value ? parseInt(e.target.value) : null)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white flex-1 md:flex-none">
                  <option value="">Cały rok</option>
                  {['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'].map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                </select>
              </div>
            </div>

            {/* PDF Button */}
            <div className="hidden md:flex justify-end">
              <button onClick={handleGeneratePDF} disabled={analyticsData.total === 0}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium">
                <Download className="w-4 h-4" /> Pobierz PDF
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 md:p-4 text-white">
                <p className="text-xs md:text-sm opacity-80">Łącznie</p>
                <p className="text-xl md:text-3xl font-bold">{analyticsData.total}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-3 md:p-4 text-white">
                <p className="text-xs md:text-sm opacity-80">Klientów</p>
                <p className="text-xl md:text-3xl font-bold">{analyticsData.uniqueClients}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 md:p-4 text-white">
                <p className="text-xs md:text-sm opacity-80">Modeli</p>
                <p className="text-xl md:text-3xl font-bold">{Object.keys(analyticsData.byDevice).length}</p>
              </div>
            </div>

            {/* Chart + List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Pie Chart */}
              <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-4">
                  Porównanie modeli - {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </h3>
                {Object.keys(analyticsData.byDevice).length === 0 ? (
                  <div className="flex items-center justify-center h-40 text-gray-400 text-sm">Brak danych</div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-40 h-40 md:w-48 md:h-48">
                      {(() => {
                        const devices = Object.entries(analyticsData.byDevice).sort(([,a], [,b]) => b - a);
                        let currentAngle = -90;
                        return devices.map(([device, count], index) => {
                          const percentage = (count / analyticsData.total) * 100;
                          const angle = (percentage / 100) * 360;
                          const startAngle = currentAngle;
                          const endAngle = currentAngle + angle;
                          currentAngle = endAngle;
                          if (devices.length === 1) return <circle key={device} cx="100" cy="100" r="80" fill={pieColors[index % pieColors.length]} />;
                          return <path key={device} d={generatePieSlice(startAngle, endAngle - 0.5, 80)} fill={pieColors[index % pieColors.length]} />;
                        });
                      })()}
                      <circle cx="100" cy="100" r="40" fill="white" />
                      <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-gray-900">{analyticsData.total}</text>
                      <text x="100" y="112" textAnchor="middle" className="text-xs fill-gray-500">urządzeń</text>
                    </svg>
                  </div>
                )}
                {/* Legend */}
                <div className="mt-4 space-y-2">
                  {Object.entries(analyticsData.byDevice).sort(([,a], [,b]) => b - a).map(([device, count], index) => (
                    <div key={device} className="flex items-center gap-2 text-xs md:text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pieColors[index % pieColors.length] }} />
                      <span className="flex-1 text-gray-700 truncate">{device}</span>
                      <span className="font-medium text-gray-900">{count}</span>
                      <span className="text-gray-400">({((count / analyticsData.total) * 100).toFixed(0)}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Device Details */}
              <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-4">Szczegóły modeli</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {Object.entries(analyticsData.byDevice).length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-8">Brak danych</p>
                  ) : (
                    Object.entries(analyticsData.byDevice).sort(([,a], [,b]) => b - a).map(([device, count], index) => (
                      <div key={device} className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pieColors[index % pieColors.length] }} />
                            <span className="font-medium text-gray-900 text-sm">{device}</span>
                          </div>
                          <span className="text-base font-bold text-gray-900">{count} szt.</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(count / analyticsData.total) * 100}%`, backgroundColor: pieColors[index % pieColors.length] }} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Deliveries */}
            <div>
              {(() => {
                const sortedClients = Object.entries(analyticsData.byClient)
                  .sort(([,a], [,b]) => new Date(b.date).getTime() - new Date(a.date).getTime());
                const totalClients = sortedClients.length;
                const displayedClients = showAllDeliveries ? sortedClients : sortedClients.slice(0, 5);
                const hiddenCount = totalClients - 5;
                
                return (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                        Dostawy ({totalClients})
                      </h3>
                      {totalClients > 5 && (
                        <button
                          onClick={() => setShowAllDeliveries(!showAllDeliveries)}
                          className="text-blue-600 text-sm font-medium"
                        >
                          {showAllDeliveries ? 'Zwiń' : `+${hiddenCount} więcej`}
                        </button>
                      )}
                    </div>
                    
                    {totalClients === 0 ? (
                      <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-400 text-sm">Brak danych</div>
                    ) : (
                      <div className="space-y-3">
                        {displayedClients.map(([client, data]) => {
                          const rdlp = getRDLPFromClient(client);
                          return (
                            <div key={client} className="bg-white border border-gray-200 rounded-xl p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1 min-w-0 pr-3">
                                  <p className="font-semibold text-gray-900 text-sm">{client}</p>
                                  {rdlp && (
                                    <span className="inline-block mt-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">
                                      {rdlp}
                                    </span>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-blue-600">{data.count}</p>
                                  <p className="text-xs text-gray-400">{new Date(data.date).toLocaleDateString('pl-PL')}</p>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {Object.entries(data.devices).map(([d, c]) => (
                                  <span key={d} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                    {d} <span className="font-semibold">({c})</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

          </div>
        </div>
      </div>

      {/* Chat */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-4 bottom-20 md:left-4 md:right-auto md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white font-semibold text-sm">Asystent AI</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white/70 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {chatMessages.length === 0 && <div className="text-center py-6"><Bot className="w-10 h-10 text-gray-300 mx-auto mb-2" /><p className="text-gray-500 text-sm">Zapytaj o sprzedaż</p></div>}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-blue-600' : 'bg-indigo-600'}`}>
                      {msg.role === 'user' ? <User className="w-3 h-3 text-white" /> : <Bot className="w-3 h-3 text-white" />}
                    </div>
                    <div className={`px-3 py-2 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-white border border-gray-200 text-gray-700 rounded-bl-md'}`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isChatLoading && <div className="flex justify-start"><div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl rounded-bl-md"><div className="flex gap-1"><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" /><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} /><div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} /></div></div></div>}
              <div ref={chatEndRef} />
            </div>
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()} placeholder="Zadaj pytanie..." className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={sendChatMessage} disabled={!chatInput.trim() || isChatLoading} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl"><Send className="w-4 h-4" /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button onClick={() => setIsChatOpen(!isChatOpen)} whileTap={{ scale: 0.95 }}
        className={`fixed bottom-4 left-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 ${isChatOpen ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}>
        {isChatOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </motion.button>
    </div>
  );
}
