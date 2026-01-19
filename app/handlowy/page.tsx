"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, Loader2, AlertCircle, Package } from "lucide-react";

// Dane logowania dla działu handlowego
const SALES_USERS = [
  { email: "dyk@takma.com.pl", password: "Takma4884", name: "Dział Handlowy" }
];

export default function HandlowyLogin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    // Sprawdź czy już zalogowany
    const authenticated = localStorage.getItem("handlowy_authenticated");
    if (authenticated === "true") {
      window.location.href = "/handlowy/dashboard";
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Symulacja opóźnienia logowania
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = SALES_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      localStorage.setItem("handlowy_authenticated", "true");
      localStorage.setItem("handlowy_user_email", user.email);
      localStorage.setItem("handlowy_user_name", user.name);
      window.location.href = "/handlowy/dashboard";
    } else {
      setError("Nieprawidłowy email lub hasło");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <Package className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Panel Handlowy</h1>
          <p className="text-blue-200">
            Zarządzanie produktami i protokołami
          </p>
        </div>

        {/* Formularz */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Adres email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@takma.com.pl"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Hasło */}
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">
                Hasło
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Błąd */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-400/30 rounded-lg"
              >
                <AlertCircle className="h-5 w-5 text-red-300" />
                <p className="text-sm text-red-200">{error}</p>
              </motion.div>
            )}

            {/* Przycisk */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Logowanie...
                </>
              ) : (
                "Zaloguj się"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-300 text-sm mt-6">
          TAKMA • Dział Handlowy
        </p>
      </motion.div>
    </div>
  );
}
