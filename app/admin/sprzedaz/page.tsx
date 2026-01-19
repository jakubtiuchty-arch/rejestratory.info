"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  LogOut,
  BarChart3,
  Printer,
  FileText,
  Plus,
  DollarSign,
  Building2,
  RefreshCw,
  Loader2,
  Download,
  Home,
  Calendar,
  Filter,
  Smartphone,
} from "lucide-react";
import { supabase } from '@/lib/supabase';

const PRICE_PER_DEVICE = 150;

interface DeviceData {
  client_name: string;
  fiscalization_date: string | null;
}

interface ClientStats {
  client_name: string;
  device_count: number;
  earnings: number;
  fiscalization_date: string | null;
}

const MONTHS = [
  { value: 1, label: 'Styczeń' },
  { value: 2, label: 'Luty' },
  { value: 3, label: 'Marzec' },
  { value: 4, label: 'Kwiecień' },
  { value: 5, label: 'Maj' },
  { value: 6, label: 'Czerwiec' },
  { value: 7, label: 'Lipiec' },
  { value: 8, label: 'Sierpień' },
  { value: 9, label: 'Wrzesień' },
  { value: 10, label: 'Październik' },
  { value: 11, label: 'Listopad' },
  { value: 12, label: 'Grudzień' },
];

export default function AdminSprzedaz() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [allDevices, setAllDevices] = React.useState<DeviceData[]>([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = React.useState(false);
  
  // Filters
  const [selectedYear, setSelectedYear] = React.useState<number | 'all'>('all');
  const [selectedMonth, setSelectedMonth] = React.useState<number | 'all'>('all');
  const [availableYears, setAvailableYears] = React.useState<number[]>([]);

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: devices, error } = await supabase
        .from('devices')
        .select('client_name, fiscalization_date')
        .is('last_inspection_date', null)
        .order('fiscalization_date', { ascending: false });

      if (error) throw error;

      setAllDevices(devices || []);
      
      // Extract available years from data
      const years = new Set<number>();
      (devices || []).forEach(device => {
        if (device.fiscalization_date) {
          const year = new Date(device.fiscalization_date).getFullYear();
          years.add(year);
        }
      });
      setAvailableYears(Array.from(years).sort((a, b) => b - a));
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const authenticated = localStorage.getItem("admin_authenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
      fetchData();
    } else {
      window.location.href = "/admin";
    }
  }, [fetchData]);

  // Filter devices based on selected year and month
  const filteredDevices = React.useMemo(() => {
    return allDevices.filter(device => {
      if (!device.fiscalization_date) return selectedYear === 'all' && selectedMonth === 'all';
      
      const date = new Date(device.fiscalization_date);
      const deviceYear = date.getFullYear();
      const deviceMonth = date.getMonth() + 1;
      
      if (selectedYear !== 'all' && deviceYear !== selectedYear) return false;
      if (selectedMonth !== 'all' && deviceMonth !== selectedMonth) return false;
      
      return true;
    });
  }, [allDevices, selectedYear, selectedMonth]);

  // Calculate stats from filtered devices
  const clientStats = React.useMemo(() => {
    const statsMap = new Map<string, ClientStats>();
    
    filteredDevices.forEach(device => {
      const existing = statsMap.get(device.client_name);
      if (existing) {
        existing.device_count++;
        existing.earnings = existing.device_count * PRICE_PER_DEVICE;
      } else {
        statsMap.set(device.client_name, {
          client_name: device.client_name,
          device_count: 1,
          earnings: PRICE_PER_DEVICE,
          fiscalization_date: device.fiscalization_date,
        });
      }
    });

    return Array.from(statsMap.values()).sort((a, b) => b.device_count - a.device_count);
  }, [filteredDevices]);

  const totalDevices = filteredDevices.length;
  const totalEarnings = totalDevices * PRICE_PER_DEVICE;

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    window.location.href = "/admin";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getFilterLabel = () => {
    if (selectedYear === 'all' && selectedMonth === 'all') return 'Wszystkie';
    if (selectedYear !== 'all' && selectedMonth === 'all') return `Rok ${selectedYear}`;
    if (selectedYear === 'all' && selectedMonth !== 'all') return MONTHS.find(m => m.value === selectedMonth)?.label || '';
    return `${MONTHS.find(m => m.value === selectedMonth)?.label} ${selectedYear}`;
  };

  // Generowanie PDF z pdfmake
  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      
      const pdfMake = pdfMakeModule.default || pdfMakeModule;
      const pdfFonts = pdfFontsModule.default || pdfFontsModule;
      
      if (pdfFonts.pdfMake) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      } else if (pdfFonts.vfs) {
        pdfMake.vfs = pdfFonts.vfs;
      }

      const today = new Date().toLocaleDateString('pl-PL');
      const filterLabel = getFilterLabel();
      
      const tableBody = [
        [
          { text: '#', style: 'tableHeader', alignment: 'center' },
          { text: 'Klient', style: 'tableHeader' },
          { text: 'Urządzenia', style: 'tableHeader', alignment: 'center' },
          { text: 'Data fiskalizacji', style: 'tableHeader', alignment: 'center' },
          { text: 'Zarobek', style: 'tableHeader', alignment: 'right' },
        ],
        ...clientStats.map((client, index) => [
          { text: (index + 1).toString(), alignment: 'center' },
          { text: client.client_name },
          { text: client.device_count.toString(), alignment: 'center' },
          { text: formatDate(client.fiscalization_date), alignment: 'center' },
          { text: formatCurrency(client.earnings), alignment: 'right' },
        ]),
        [
          { text: '', border: [false, true, false, false] },
          { text: 'RAZEM', style: 'totalRow', border: [false, true, false, false] },
          { text: totalDevices.toString(), style: 'totalRow', alignment: 'center', border: [false, true, false, false] },
          { text: '', border: [false, true, false, false] },
          { text: formatCurrency(totalEarnings), style: 'totalRowGreen', alignment: 'right', border: [false, true, false, false] },
        ],
      ];

      const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 40],
        content: [
          {
            text: 'RAPORT SPRZEDAŻY',
            style: 'header',
            alignment: 'center',
            margin: [0, 0, 0, 5],
          },
          {
            text: `Urządzenia fiskalne - ${filterLabel}`,
            style: 'subheader',
            alignment: 'center',
            margin: [0, 0, 0, 20],
          },
          {
            table: {
              widths: ['*'],
              body: [
                [{
                  stack: [
                    { text: `Data raportu: ${today}`, margin: [0, 0, 0, 3] },
                    { text: `Okres: ${filterLabel}`, margin: [0, 0, 0, 3] },
                    { text: `Cena za urządzenie: ${PRICE_PER_DEVICE} zł`, margin: [0, 0, 0, 3] },
                    { text: `Liczba klientów: ${clientStats.length}`, margin: [0, 0, 0, 3] },
                    { text: `Liczba urządzeń: ${totalDevices}`, margin: [0, 0, 0, 3] },
                    { text: `ŁĄCZNY ZAROBEK: ${formatCurrency(totalEarnings)}`, style: 'highlight', margin: [0, 5, 0, 0] },
                  ],
                  fillColor: '#f0fdf4',
                  margin: [10, 10, 10, 10],
                }]
              ]
            },
            layout: {
              hLineWidth: () => 1,
              vLineWidth: () => 1,
              hLineColor: () => '#bbf7d0',
              vLineColor: () => '#bbf7d0',
            },
            margin: [0, 0, 0, 20],
          },
          {
            text: 'Szczegóły sprzedaży:',
            style: 'sectionTitle',
            margin: [0, 0, 0, 10],
          },
          {
            table: {
              headerRows: 1,
              widths: [30, '*', 60, 80, 70],
              body: tableBody,
            },
            layout: {
              hLineWidth: (i: number, node: { table: { body: unknown[] } }) => (i === 0 || i === 1 || i === node.table.body.length) ? 1 : 0.5,
              vLineWidth: () => 0,
              hLineColor: (i: number) => i === 1 ? '#059669' : '#e5e7eb',
              fillColor: (i: number) => i === 0 ? '#059669' : null,
            },
          },
        ],
        footer: {
          text: 'Wygenerowano z systemu rejestratory.info',
          alignment: 'center',
          fontSize: 8,
          color: '#9ca3af',
          margin: [0, 0, 0, 0],
        },
        styles: {
          header: { fontSize: 22, bold: true, color: '#059669' },
          subheader: { fontSize: 12, color: '#6b7280' },
          sectionTitle: { fontSize: 12, bold: true, color: '#374151' },
          tableHeader: { bold: true, fontSize: 10, color: 'white', fillColor: '#059669' },
          totalRow: { bold: true, fontSize: 11 },
          totalRowGreen: { bold: true, fontSize: 12, color: '#059669' },
          highlight: { bold: true, fontSize: 14, color: '#059669' },
        },
        defaultStyle: { fontSize: 10, color: '#374151' },
      };

      const filterSuffix = selectedYear !== 'all' || selectedMonth !== 'all' 
        ? `_${selectedYear !== 'all' ? selectedYear : ''}${selectedMonth !== 'all' ? '-' + String(selectedMonth).padStart(2, '0') : ''}`
        : '';
      const fileName = `raport_sprzedazy${filterSuffix}_${today.replace(/\./g, '-')}.pdf`;
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (pdfMake as any).createPdf(docDefinition).download(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Błąd podczas generowania PDF. Sprawdź konsolę przeglądarki.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header z nawigacją */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-900">Panel SuperAdmin</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="text-gray-500 hover:text-emerald-600 text-sm flex items-center gap-1">
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
          
          <nav className="flex gap-1">
            <a
              href="/admin/dashboard"
              className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </span>
            </a>
            <a
              href="/admin/urzadzenia"
              className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Urządzenia fiskalne
              </span>
            </a>
            <a
              href="/admin/rejestratory"
              className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Rejestratory
              </span>
            </a>
            <a
              href="/admin/dokumenty"
              className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Dokumenty
              </span>
            </a>
            <a
              href="/admin/sprzedaz"
              className="px-4 py-3 text-sm font-medium border-b-2 border-emerald-600 text-emerald-600 bg-emerald-50"
            >
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Sprzedaż
              </span>
            </a>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Filtry */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-4 mb-6"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filtruj:</span>
            </div>
            
            {/* Rok */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-500">Rok:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">Wszystkie</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Miesiąc */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-500">Miesiąc:</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">Wszystkie</option>
                {MONTHS.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>

            {/* Reset */}
            {(selectedYear !== 'all' || selectedMonth !== 'all') && (
              <button
                onClick={() => { setSelectedYear('all'); setSelectedMonth('all'); }}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Wyczyść filtry
              </button>
            )}

            <div className="flex-1" />

            {/* Odśwież */}
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="text-gray-500 hover:text-emerald-600 p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              title="Odśwież dane"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Podsumowanie */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Klientów</p>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : clientStats.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Urządzeń sprzedanych</p>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : totalDevices}
                </p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Printer className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-4 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-100">Łączny zarobek</p>
                <p className="text-2xl font-bold">
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : formatCurrency(totalEarnings)}
                </p>
                <p className="text-xs text-emerald-200 mt-1">{PRICE_PER_DEVICE} zł / urządzenie</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabela + PDF */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Szczegóły sprzedaży</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {getFilterLabel()}
              </p>
            </div>
            <button
              onClick={generatePDF}
              disabled={isGeneratingPDF || clientStats.length === 0}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {isGeneratingPDF ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Pobierz PDF
            </button>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-600 mx-auto" />
            </div>
          ) : clientStats.length === 0 ? (
            <div className="p-8 text-center">
              <Printer className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Brak danych dla wybranego okresu</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">#</th>
                    <th className="px-4 py-3 text-left font-medium">Klient</th>
                    <th className="px-4 py-3 text-center font-medium">Urządzenia</th>
                    <th className="px-4 py-3 text-center font-medium">Fiskalizacja</th>
                    <th className="px-4 py-3 text-right font-medium">Zarobek</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {clientStats.map((client, index) => (
                    <tr key={client.client_name} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{client.client_name}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold">
                          {client.device_count}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500">{formatDate(client.fiscalization_date)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-emerald-600">{formatCurrency(client.earnings)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-emerald-50">
                  <tr>
                    <td className="px-4 py-3 font-bold text-gray-900" colSpan={2}>RAZEM</td>
                    <td className="px-4 py-3 text-center font-bold text-gray-900">{totalDevices}</td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700 text-base">{formatCurrency(totalEarnings)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
