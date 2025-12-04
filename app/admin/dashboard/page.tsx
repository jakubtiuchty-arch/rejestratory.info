"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Eye,
  MousePointerClick,
  TrendingUp,
  LogOut,
  BarChart3,
  Globe,
  Clock,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

// Typy dla danych z API
interface AnalyticsData {
  users: {
    value: number;
    change: number;
  };
  pageviews: {
    value: number;
    change: number;
  };
  bounceRate: {
    value: number;
    change: number;
  };
  avgSessionDuration: {
    value: string;
    change: number;
  };
  topPages: Array<{
    path: string;
    views: number;
    users: number;
  }>;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [analyticsData, setAnalyticsData] = React.useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);

  // Funkcja do pobierania danych z API
  const fetchAnalyticsData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analytics');

      if (!response.ok) {
        throw new Error('Nie udało się pobrać danych Analytics');
      }

      const data: AnalyticsData = await response.json();
      setAnalyticsData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
      console.error('Error fetching analytics:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    // Sprawdzenie autoryzacji
    const authenticated = localStorage.getItem("admin_authenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
      // Pobierz dane przy pierwszym załadowaniu
      fetchAnalyticsData();
    } else {
      window.location.href = "/admin";
    }
  }, [fetchAnalyticsData]);

  // Auto-odświeżanie co 5 minut
  React.useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      fetchAnalyticsData();
    }, 5 * 60 * 1000); // 5 minut

    return () => clearInterval(interval);
  }, [isAuthenticated, fetchAnalyticsData]);

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    window.location.href = "/admin";
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Sprawdzanie autoryzacji...</p>
        </div>
      </div>
    );
  }

  // Formatowanie liczby z separatorem tysięcy
  const formatNumber = (num: number) => {
    return num.toLocaleString('pl-PL');
  };

  // Przygotowanie danych do wyświetlenia
  const stats = analyticsData ? [
    {
      label: "Użytkownicy (30 dni)",
      value: formatNumber(analyticsData.users.value),
      change: `${analyticsData.users.change >= 0 ? '+' : ''}${analyticsData.users.change}%`,
      icon: Users,
      color: "emerald",
    },
    {
      label: "Odsłony stron",
      value: formatNumber(analyticsData.pageviews.value),
      change: `${analyticsData.pageviews.change >= 0 ? '+' : ''}${analyticsData.pageviews.change}%`,
      icon: Eye,
      color: "blue",
    },
    {
      label: "Współczynnik odrzuceń",
      value: `${analyticsData.bounceRate.value}%`,
      change: `${analyticsData.bounceRate.change >= 0 ? '+' : ''}${analyticsData.bounceRate.change}%`,
      icon: MousePointerClick,
      color: "purple",
    },
    {
      label: "Średni czas sesji",
      value: analyticsData.avgSessionDuration.value,
      change: `${analyticsData.avgSessionDuration.change >= 0 ? '+' : ''}${analyticsData.avgSessionDuration.change}%`,
      icon: Clock,
      color: "orange",
    },
  ] : [];

  // Oblicz procenty dla top pages
  const totalViews = analyticsData?.topPages.reduce((sum, page) => sum + page.views, 0) || 0;
  const topPages = analyticsData?.topPages.map(page => ({
    path: page.path,
    views: formatNumber(page.views),
    percentage: totalViews > 0 ? `${Math.round((page.views / totalViews) * 100)}%` : '0%',
  })) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Panel Administratora
                </h1>
                <p className="text-sm text-gray-600">Analityka strony</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchAnalyticsData}
                disabled={isLoading}
                className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium border border-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Odśwież
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium border border-red-200"
              >
                <LogOut className="h-4 w-4" />
                Wyloguj
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Błąd lub Info o Google Analytics */}
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">
                  Błąd podczas pobierania danych
                </h3>
                <p className="text-sm text-red-800 mb-2">
                  {error}
                </p>
                <p className="text-sm text-red-700">
                  Upewnij się, że skonfigurowałeś Google Analytics Data API zgodnie z instrukcjami w pliku <code>KONFIGURACJA_GA4_API.md</code>
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Google Analytics 4
                </h3>
                <p className="text-sm text-blue-800 mb-2">
                  Twoja strona jest zintegrowana z Google Analytics (ID: G-FDR8NNEMJN).
                  {analyticsData ? ' Dane poniżej są pobierane w czasie rzeczywistym z GA4.' : ' Ładowanie danych...'}
                </p>
                <p className="text-sm text-blue-700">
                  Więcej statystyk dostępnych na{" "}
                  <a
                    href="https://analytics.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-900"
                  >
                    analytics.google.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Statystyki - karty */}
        {isLoading && !analyticsData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="w-16 h-5 bg-gray-200 rounded"></div>
                </div>
                <div className="w-24 h-8 bg-gray-200 rounded mb-2"></div>
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isPositive = stat.change.startsWith("+");

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Najpopularniejsze strony */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">
              Najpopularniejsze strony
            </h2>
          </div>

          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div
                key={page.path}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-full text-emerald-700 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {page.path}
                    </p>
                    <p className="text-sm text-gray-500">{page.views} wyświetleń</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-600 h-2 rounded-full"
                      style={{ width: page.percentage }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 w-12 text-right">
                    {page.percentage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>
            Dane aktualizowane automatycznie co 5 minut
            {lastUpdated && ` • Ostatnia aktualizacja: ${lastUpdated.toLocaleString("pl-PL")}`}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
