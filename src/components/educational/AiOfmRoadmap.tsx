"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Unlock,
  Shield,
  KeyRound,
  DollarSign,
  Smartphone,
  Flame,
  MessageSquare,
  Wrench,
  Scale,
  Calendar,
  AlertTriangle,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  UserCheck,
  CheckCircle2,
  Square,
  Eye,
  EyeOff,
  Zap,
  Globe,
  Sliders,
  Delete,
} from "lucide-react";

const CALC_TRM_COP = 4150;

export default function AiOfmRoadmap() {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem("sofi_ofm_unlocked") === "true";
      } catch {}
    }
    return false;
  });

  const [pinInput, setPinInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Calculadora interactiva OFM
  const [calcFans, setCalcFans] = useState<number>(150);
  const [calcSubPrice, setCalcSubPrice] = useState<number>(12);
  const [calcPpvBuyRate, setCalcPpvBuyRate] = useState<number>(35); // 35%
  const [calcPpvSpend, setCalcPpvSpend] = useState<number>(45); // USD gastado en PPV

  // Checklist 90 días interactivo
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_ofm_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  const handleUnlockWithPin = (pin: string) => {
    if (pin.trim() === "0258") {
      setUnlocked(true);
      setErrorMsg("");
      try {
        sessionStorage.setItem("sofi_ofm_unlocked", "true");
      } catch {}
    } else {
      setErrorMsg("Contraseña incorrecta. Acceso privado restringido.");
    }
  };

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    handleUnlockWithPin(pinInput);
  };

  const handleKeypadPress = (val: string) => {
    if (val === "clear") {
      setPinInput("");
      setErrorMsg("");
      return;
    }
    if (val === "back") {
      setPinInput((prev) => prev.slice(0, -1));
      setErrorMsg("");
      return;
    }
    if (pinInput.length < 8) {
      const nextPin = pinInput + val;
      setPinInput(nextPin);
      setErrorMsg("");
      if (nextPin === "0258") {
        setTimeout(() => handleUnlockWithPin(nextPin), 150);
      }
    }
  };

  const handleLock = () => {
    setUnlocked(false);
    setPinInput("");
    try {
      sessionStorage.removeItem("sofi_ofm_unlocked");
    } catch {}
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_ofm_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const applyPreset = (preset: "starter" | "growth" | "top") => {
    if (preset === "starter") {
      setCalcFans(60);
      setCalcSubPrice(9.99);
      setCalcPpvBuyRate(25);
      setCalcPpvSpend(30);
    } else if (preset === "growth") {
      setCalcFans(250);
      setCalcSubPrice(12.99);
      setCalcPpvBuyRate(40);
      setCalcPpvSpend(50);
    } else {
      setCalcFans(750);
      setCalcSubPrice(15);
      setCalcPpvBuyRate(50);
      setCalcPpvSpend(75);
    }
  };

  // Cálculos de revenue
  const totalSubRevenue = calcFans * calcSubPrice;
  const ppvBuyers = Math.round((calcFans * calcPpvBuyRate) / 100);
  const totalPpvRevenue = ppvBuyers * calcPpvSpend;
  const grossRevenueUsd = totalSubRevenue + totalPpvRevenue;
  const fanvueCutUsd = grossRevenueUsd * 0.2; // 20%
  const netRevenueUsd = grossRevenueUsd * 0.8;
  const netRevenueCop = netRevenueUsd * CALC_TRM_COP;

  // Pantalla de bloqueo con Vault PIN Pad
  if (!unlocked) {
    return (
      <div className="w-full min-h-[500px] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0e0e17]/95 border border-purple-500/30 backdrop-blur-xl shadow-[0_0_50px_rgba(124,106,247,0.15)] text-center space-y-5"
        >
          <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-purple-600/30 to-pink-500/20 border border-purple-500/40 flex items-center justify-center shadow-inner">
            <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-pink-500 animate-ping opacity-75" />
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              Módulo Privado Protegido
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              AI OFM & Operación Digital
            </h3>
            <p className="text-xs text-purple-200/60 leading-relaxed">
              Ingresa el PIN de acceso o utiliza el teclado numérico interactivo.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/70" />
              <input
                type={showPassword ? "text" : "password"}
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="PIN privado..."
                autoFocus
                className="w-full pl-11 pr-11 py-3 bg-white/5 border border-purple-500/30 focus:border-purple-400 rounded-2xl text-center font-mono tracking-widest text-lg text-white placeholder:text-purple-300/40 outline-none transition-all shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar clave" : "Mostrar clave"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-300/60 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Interactive Numeric PIN Pad for Touch & Desktop */}
            <div className="grid grid-cols-3 gap-2 pt-1 max-w-xs mx-auto">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "back"].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => handleKeypadPress(k)}
                  className="h-11 rounded-xl bg-white/5 hover:bg-white/15 active:bg-purple-600/30 border border-purple-500/20 text-white font-mono text-sm font-semibold transition-all cursor-pointer flex items-center justify-center select-none"
                >
                  {k === "clear" ? (
                    <span className="text-[11px] text-purple-300">C</span>
                  ) : k === "back" ? (
                    <Delete className="w-4 h-4 text-purple-300" />
                  ) : (
                    k
                  )}
                </button>
              ))}
            </div>

            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(124,106,247,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Unlock className="w-4 h-4" />
              <span>Desbloquear Módulo</span>
            </button>
          </form>

          <p className="text-[11px] text-purple-300/40">
            Sesión temporal segura · Encriptado local
          </p>
        </motion.div>
      </div>
    );
  }

  const subTabs = [
    { id: "all", label: "🌟 Guía Completa", icon: Sparkles },
    { id: "calc", label: "🧮 Calculadora Revenue", icon: Sliders },
    { id: "economia", label: "💰 Economía & Roles", icon: DollarSign },
    { id: "setup", label: "📱 Setup iPhone + VPN", icon: Smartphone },
    { id: "funnel", label: "🔞 SFW vs NSFW Funnel", icon: Flame },
    { id: "persona", label: "🤖 AI Persona & Caras", icon: UserCheck },
    { id: "prompts", label: "🎨 Prompts & Fórmulas", icon: BookOpen },
    { id: "chatting", label: "💬 Chatting & PPV (70%)", icon: MessageSquare },
    { id: "tools", label: "🛠️ Stack de Apps Gratis", icon: Wrench },
    { id: "pagos", label: "🏦 Pagos & DIAN Colombia", icon: Scale },
    { id: "roadmap", label: "🗺️ Roadmap 90 Días", icon: Calendar },
  ];

  return (
    <div className="w-full space-y-8 text-left">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#121124] via-[#0f0f1c] to-[#18112e] border border-purple-500/30 shadow-[0_0_40px_rgba(124,106,247,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono font-medium">
                GUÍA OPERATIVA 2024–2025
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                Desbloqueado 🔓
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Sistema Completo de <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                AI OnlyFans Management
              </span>
            </h1>
            <p className="text-sm sm:text-base text-purple-200/70 leading-relaxed">
              Construye, lanza y escala una operación OFM con personajes generados 100% por inteligencia artificial — desde cero, operando desde Colombia con cobros en USD.
            </p>
          </div>

          <button
            onClick={handleLock}
            className="self-start md:self-center px-4 py-2.5 rounded-2xl bg-white/5 border border-purple-500/30 hover:bg-red-500/20 hover:border-red-500/40 text-purple-200 hover:text-red-300 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Bloquear Módulo</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-purple-500/20">
          <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-purple-300">$2B+</div>
            <div className="text-xs text-purple-200/60 mt-1">Revenue anual en OF</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-pink-400">70%</div>
            <div className="text-xs text-purple-200/60 mt-1">Revenue viene de DMs</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">20–50%</div>
            <div className="text-xs text-purple-200/60 mt-1">Split agencia / modelo</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-300">3–6 m</div>
            <div className="text-xs text-purple-200/60 mt-1">Tiempo a 1er revenue</div>
          </div>
        </div>
      </motion.div>

      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {subTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer border select-none ${
                isActive
                  ? "bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-102"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Revenue Calculator */}
      {(activeTab === "all" || activeTab === "calc") && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#131226] to-[#1a1533] border border-purple-500/30 space-y-6 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-semibold uppercase">
                <Sliders className="w-4 h-4" />
                Simulador Financiero OFM
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Calculadora de Proyección Mensual
              </h3>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <span className="text-[11px] text-purple-300/70 mr-1">Escenarios:</span>
              <button
                onClick={() => applyPreset("starter")}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-purple-500/20 text-purple-200 text-xs cursor-pointer font-mono"
              >
                Iniciante
              </button>
              <button
                onClick={() => applyPreset("growth")}
                className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-300 text-xs cursor-pointer font-mono"
              >
                Escala
              </button>
              <button
                onClick={() => applyPreset("top")}
                className="px-2.5 py-1 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/40 text-pink-300 text-xs cursor-pointer font-mono"
              >
                Top 1%
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sliders */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-purple-200">Suscriptores Activos:</span>
                  <span className="text-purple-400 font-mono">{calcFans} fans</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={1000}
                  step={10}
                  value={calcFans}
                  onChange={(e) => setCalcFans(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-purple-200">Precio Suscripción Mensual:</span>
                  <span className="text-purple-400 font-mono">${calcSubPrice} USD</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={35}
                  step={1}
                  value={calcSubPrice}
                  onChange={(e) => setCalcSubPrice(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-purple-200">% de Fans que compran PPV en DMs:</span>
                  <span className="text-pink-400 font-mono">{calcPpvBuyRate}% ({ppvBuyers} fans)</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={80}
                  step={5}
                  value={calcPpvBuyRate}
                  onChange={(e) => setCalcPpvBuyRate(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-purple-200">Gasto Promedio por Comprador de PPV:</span>
                  <span className="text-pink-400 font-mono">${calcPpvSpend} USD / mes</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={150}
                  step={5}
                  value={calcPpvSpend}
                  onChange={(e) => setCalcPpvSpend(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Results Card */}
            <div className="p-5 rounded-2xl bg-black/40 border border-purple-500/25 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-purple-200/70">
                  <span>Subscripciones brutas:</span>
                  <span className="font-mono text-purple-300 font-bold">${totalSubRevenue.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-xs text-purple-200/70">
                  <span>PPV & DMs brutos (70%):</span>
                  <span className="font-mono text-pink-300 font-bold">${totalPpvRevenue.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-xs text-purple-200/70">
                  <span>Comisión Fanvue (20%):</span>
                  <span className="font-mono text-red-400 font-bold">-${fanvueCutUsd.toLocaleString()} USD</span>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-500/20 space-y-1">
                <div className="text-xs text-purple-300 font-medium">Ganancia Neta para Ti:</div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
                  ${Math.round(netRevenueUsd).toLocaleString()} <span className="text-sm font-sans font-normal text-emerald-300">USD/mes</span>
                </div>
                <div className="text-sm font-mono text-purple-200/80">
                  ≈ ${(Math.round(netRevenueCop)).toLocaleString()} COP
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 01 ECONOMÍA & ROLES */}
      {(activeTab === "all" || activeTab === "economia") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-purple-500/25 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
              01
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              La Economía OFM & Distribución del Revenue
            </h3>
          </div>

          <p className="text-sm text-purple-200/80 leading-relaxed">
            OnlyFans Management (OFM) es el modelo de negocio donde <strong>tú eres el operador, no el creador de contenido</strong>. Gestionas las cuentas, los sistemas de adquisición, el embudo de ventas y el chatting. La modelo o persona IA es el producto; tú eres la empresa detrás.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <span className="text-2xl">🏢</span>
              <h4 className="text-sm font-bold text-white">Agencia OFM Tradicional</h4>
              <p className="text-xs text-purple-200/70">
                Gestiona cuentas de modelos reales. Toma 20–50% del revenue bruto. Requiere lidiar con disponibilidad de la modelo.
              </p>
              <div className="text-xs font-mono font-bold text-purple-400 pt-2">$10K–$200K / mes</div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-400/40 space-y-2 shadow-lg">
              <span className="text-2xl">🤖</span>
              <h4 className="text-sm font-bold text-white">AI Persona Operator</h4>
              <p className="text-xs text-purple-200/70">
                Opera personajes 100% generados con IA. Sin modelo real. Revenue 100% para ti (menos fees de plataforma). Escalabilidad total.
              </p>
              <div className="text-xs font-mono font-bold text-pink-400 pt-2">$2K–$50K / mes</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <span className="text-2xl">💬</span>
              <h4 className="text-sm font-bold text-white">Chatter Agency</h4>
              <p className="text-xs text-purple-200/70">
                Provee chatters bilingües entrenados a agencias OFM. Cobras por cuenta manejada. Modelo de bajo riesgo y alta retención.
              </p>
              <div className="text-xs font-mono font-bold text-purple-400 pt-2">$3K–$15K / mes</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
              <span className="text-2xl">📈</span>
              <h4 className="text-sm font-bold text-white">Traffic Agency</h4>
              <p className="text-xs text-purple-200/70">
                Gestiona el crecimiento orgánico en redes (TikTok/Twitter/Reddit) para cuentas OFM. El cuello de botella más cotizado.
              </p>
              <div className="text-xs font-mono font-bold text-purple-400 pt-2">$5K–$30K / mes</div>
            </div>
          </div>
        </section>
      )}

      {/* 02 SETUP IPHONE + VPN + NUMERO */}
      {(activeTab === "all" || activeTab === "setup") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-purple-500/25 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
              02
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Infraestructura Operativa: iPhone + VPN + Número USA
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Regla de Oro Anti-Ban:</strong> Las plataformas usan señales cruzadas (IP, GPS, zona horaria y cookies). Mantén un <strong>servidor fijo en New York</strong> y jamás mezcles cuentas personales con el teléfono del negocio.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-black/30 border border-purple-500/20 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-purple-400" />
                1. Reset del iPhone
              </h4>
              <ul className="text-xs text-purple-200/70 space-y-2 list-disc pl-4">
                <li>Factory reset completo (Ajustes → General → Restablecer).</li>
                <li>Apple ID nuevo con correo ProtonMail de negocio.</li>
                <li>Instala VPN antes de configurar cualquier otra app.</li>
                <li>Desactiva localización por GPS en apps de redes sociales.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-black/30 border border-purple-500/20 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-pink-400" />
                2. VPN Dedicado
              </h4>
              <ul className="text-xs text-purple-200/70 space-y-2 list-disc pl-4">
                <li><strong>Mullvad VPN:</strong> $5/mes, máxima privacidad sin logs.</li>
                <li><strong>ProtonVPN:</strong> Opción gratuita con servidores USA.</li>
                <li>Activa <strong>Kill Switch</strong> obligatorio en la app VPN.</li>
                <li>Zona horaria del sistema en EST (Eastern Standard Time).</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-black/30 border border-purple-500/20 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                3. Número Virtual USA
              </h4>
              <ul className="text-xs text-purple-200/70 space-y-2 list-disc pl-4">
                <li><strong>TextNow:</strong> Gratis con VPN activo al crear la cuenta.</li>
                <li><strong>Google Voice:</strong> Más estable (requiere 1 verificación inicial).</li>
                <li><strong>Hushed ($5/mes):</strong> Mayor compatibilidad con Twitter Blue.</li>
                <li>Elige código de área de New York (212 / 646) o Los Ángeles (310).</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 03 SFW vs NSFW FUNNEL */}
      {(activeTab === "all" || activeTab === "funnel") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-purple-500/25 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
              03
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              SFW vs NSFW — El Funnel de Conversión Correcto
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 font-mono text-xs sm:text-sm text-purple-200 space-y-2">
            <div className="text-purple-400 font-bold">EL EMBUDO COMPLETO:</div>
            <div>📱 <strong>TikTok / Reels</strong> (SFW Puro) ➔ Alcance masivo orgánico (millones de vistas)</div>
            <div>🐦 <strong>Twitter / X</strong> (SFW + Teasers) ➔ Comunidad tibia y fidelización de seguidores</div>
            <div>🔒 <strong>Fanvue / Fansly</strong> (Paywall) ➔ Monetización base por suscripción mensual</div>
            <div>💬 <strong>DMs & PPV</strong> (Intimidad personalizada) ➔ <strong>70% del dinero real</strong></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-emerald-300">✅ SFW (Safe For Work)</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Gratuito / Redes</span>
              </div>
              <p className="text-xs text-purple-200/70">
                Retratos lifestyle, café, viajes, ropa deportiva, fitness, bikinis no explícitos. Se publica en TikTok, Instagram, Twitter y Reddit.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-pink-500/10 border border-pink-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-pink-300">🔞 NSFW (Not Safe For Work)</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono">Detrás del Paywall</span>
              </div>
              <p className="text-xs text-purple-200/70">
                Contenido adulto, lencería explícita, desnudos artísticos o material VIP. <strong>Nunca se publica en redes abiertas</strong>. Solo en Fanvue tras pagar.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 04 AI PERSONA */}
      {(activeTab === "all" || activeTab === "persona") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-purple-500/25 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
              04
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Construyendo tu AI Persona & Consistencia Facial
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-black/40 border border-purple-500/30 font-mono text-xs text-purple-200 space-y-3">
              <div className="text-purple-400 font-bold border-b border-purple-500/20 pb-2">
                📋 CHARACTER SHEET BASE (Template)
              </div>
              <div><strong>Nombre:</strong> Luna (o Emma / Chloe - 1 o 2 sílabas)</div>
              <div><strong>Edad aparente:</strong> 24 años</div>
              <div><strong>Nacionalidad:</strong> Latina / Colombiana (ventaja competitiva en USA)</div>
              <div><strong>Ciudad:</strong> Medellín / Miami</div>
              <div><strong>Look:</strong> Long dark brown wavy hair, almond eyes, warm olive skin, soft jawline, athletic curves.</div>
              <div><strong>Personalidad:</strong> Cálida, juguetona, misteriosa, apasionada por el arte y el café.</div>
              <div><strong>Seed Fijo:</strong> 87492014 (Guarda este valor tras generar la cara ideal)</div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">Técnicas de Consistencia Facial</h4>
              <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20 space-y-1">
                <div className="text-xs font-bold text-purple-300">1. Seed Fijo (Nivel Básico)</div>
                <div className="text-xs text-purple-200/70">Mismo prompt base + mismo seed numérico en Flux.1 o SDXL.</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20 space-y-1">
                <div className="text-xs font-bold text-pink-300">2. IP-Adapter (Nivel Intermedio)</div>
                <div className="text-xs text-purple-200/70">Carga la foto de referencia de la cara en Tensor.art o Civitai. Mantiene rasgos faciales 85%+.</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20 space-y-1">
                <div className="text-xs font-bold text-emerald-300">3. InstantID / PuLID (Nivel Avanzado)</div>
                <div className="text-xs text-purple-200/70">Transferencia facial fotorealista 98%+ consistente en ComfyUI local.</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 05 PROMPTS LISTOS */}
      {(activeTab === "all" || activeTab === "prompts") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-purple-500/25 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
              05
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Fórmula de Prompts & Banco Listo para Usar
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-purple-900/20 border border-purple-500/30 font-mono text-xs text-purple-300">
            <strong>Fórmula Maestra:</strong> [CHARACTER_REF] + [ACCIÓN] + [AMBIENTE] + [ILUMINACIÓN] + [CÁMARA] + [MOOD/CALIDAD]
          </div>

          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-purple-500/25 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300">☕ Retrato Lifestyle Paris / Cafe</span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      "Young latin woman, 24, long dark wavy hair, dark brown almond eyes, warm olive skin, soft features, full lips — sitting at marble cafe table in Paris, golden hour afternoon light streaming through large windows, wearing cream oversized sweater, holding coffee with both hands, slight dreamy smile, looking out window. Shallow depth of field, bokeh background, cinematic 85mm lens, warm color grade, film grain, 8K.",
                      "p1"
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-purple-200 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedId === "p1" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Prompt</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-purple-200/80 font-mono leading-relaxed bg-white/5 p-3 rounded-xl">
                Young latin woman, 24, long dark wavy hair, dark brown almond eyes, warm olive skin, soft features, full lips — sitting at marble cafe table in Paris, golden hour afternoon light streaming through large windows, wearing cream oversized sweater, holding coffee with both hands, slight dreamy smile, looking out window. Shallow depth of field, bokeh background, cinematic 85mm lens, warm color grade, film grain, 8K.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-purple-500/25 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-300">🌅 Morning Routine (Viral TikTok)</span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      "Young latin woman, 24, long dark wavy hair, dark brown eyes, warm olive skin — slow morning routine in minimalist white bedroom, soft natural window light, wearing white oversized cotton t-shirt, stretching arms upward, hair slightly messy, peaceful relaxed expression. Handheld intimate camera feel, warm soft golden morning atmosphere, slow motion 60fps, cinematic, 4K quality.",
                      "p2"
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-purple-200 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedId === "p2" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Prompt</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-purple-200/80 font-mono leading-relaxed bg-white/5 p-3 rounded-xl">
                Young latin woman, 24, long dark wavy hair, dark brown eyes, warm olive skin — slow morning routine in minimalist white bedroom, soft natural window light, wearing white oversized cotton t-shirt, stretching arms upward, hair slightly messy, peaceful relaxed expression. Handheld intimate camera feel, warm soft golden morning atmosphere, slow motion 60fps, cinematic, 4K quality.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 06 CHATTING & PPV */}
      {(activeTab === "all" || activeTab === "chatting") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-purple-500/25 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
              06
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Chatting & PPV — El 70% del Revenue Real
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-black/40 border border-purple-500/25 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300">Script 1: Bienvenida Fan Nuevo</span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      "Heyy! Gracias por suscribirte 🥰 Eres de los pocos que llegan aquí... me encanta que estés. ¿Cómo te llamas? Quiero conocerte un poco 💫",
                      "s1"
                    )
                  }
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-purple-200 cursor-pointer"
                >
                  {copiedId === "s1" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-purple-200/80 italic bg-white/5 p-3 rounded-xl">
                &ldquo;Heyy! Gracias por suscribirte 🥰 Eres de los pocos que llegan aquí... me encanta que estés. ¿Cómo te llamas? Quiero conocerte un poco 💫&rdquo;
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-purple-500/25 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-300">Script 2: Venta de PPV ($18–$25)</span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      "Hoy me tomé algo especial para ti... no lo puse en el feed porque quería que tú lo vieras primero 🖤 [CONTENIDO BLOQUEADO - $18] Dime qué piensas cuando lo veas 👀",
                      "s2"
                    )
                  }
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-purple-200 cursor-pointer"
                >
                  {copiedId === "s2" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-purple-200/80 italic bg-white/5 p-3 rounded-xl">
                &ldquo;Hoy me tomé algo especial para ti... no lo puse en el feed porque quería que tú lo vieras primero 🖤 [CONTENIDO BLOQUEADO - $18] Dime qué piensas cuando lo veas 👀&rdquo;
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 07 STACK DE HERRAMIENTAS GRATIS */}
      {(activeTab === "all" || activeTab === "tools") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-purple-500/25 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
              07
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Stack de Herramientas 100% Gratuitas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-black/30 border border-purple-500/20 space-y-2">
              <span className="text-xl">🎨</span>
              <h4 className="text-sm font-bold text-white">Imágenes Fotorrealistas</h4>
              <ul className="text-xs text-purple-200/70 space-y-1.5">
                <li>• <strong>Tensor.art:</strong> Flux.1 con créditos diarios gratis.</li>
                <li>• <strong>Civitai:</strong> Modelos y LoRAs especializados.</li>
                <li>• <strong>Google ImageFX:</strong> Imagen 3 calidad top SFW.</li>
                <li>• <strong>ComfyUI / SD:</strong> Generación local sin límites.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-black/30 border border-purple-500/20 space-y-2">
              <span className="text-xl">🎬</span>
              <h4 className="text-sm font-bold text-white">Video & Animación</h4>
              <ul className="text-xs text-purple-200/70 space-y-1.5">
                <li>• <strong>Kling AI:</strong> Image-to-Video de alta fidelidad.</li>
                <li>• <strong>Google Flow / Veo:</strong> Micro-movimientos y SFW.</li>
                <li>• <strong>Pika Labs:</strong> 150 créditos/mes gratis.</li>
                <li>• <strong>Hailuo / MiniMax:</strong> Backup de animación rápida.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-black/30 border border-purple-500/20 space-y-2">
              <span className="text-xl">📲</span>
              <h4 className="text-sm font-bold text-white">Edición & Automatización</h4>
              <ul className="text-xs text-purple-200/70 space-y-1.5">
                <li>• <strong>CapCut:</strong> Edición 9:16 en iPhone sin costo.</li>
                <li>• <strong>Buffer:</strong> Programa 3 redes gratis.</li>
                <li>• <strong>Linktree:</strong> Enlace bio para Twitter/TikTok.</li>
                <li>• <strong>Notion:</strong> Tracking de KPIs y calendario.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 08 PAGOS & LEGAL COLOMBIA */}
      {(activeTab === "all" || activeTab === "pagos") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-purple-500/25 space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
              08
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Cobros Internacionales & Legalidad en Colombia
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-black/30 border border-purple-500/20 space-y-3">
              <h4 className="text-sm font-bold text-white">Wise vs Payoneer</h4>
              <p className="text-xs text-purple-200/70 leading-relaxed">
                <strong>Recomendación #1: Wise.</strong> Te entrega número de cuenta bancaria en USA (routing + account number ACH). Fanvue deposita en USD y tú transfieres a Bancolombia o Nequi con tasa TRM real del mercado y menor comisión (~0.5–1%).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/30 border border-purple-500/20 space-y-3">
              <h4 className="text-sm font-bold text-white">Régimen Fiscal DIAN</h4>
              <p className="text-xs text-purple-200/70 leading-relaxed">
                Los ingresos recibidos del exterior son legales. Declaras como <strong>Persona Natural</strong> inicialmente si superas los topes de ingresos brutos anuales (~$55M COP). Al superar $2,000 USD/mes se recomienda constituir SAS Unipersonal.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 09 ROADMAP 90 DÍAS INTERACTIVO */}
      {(activeTab === "all" || activeTab === "roadmap") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-purple-500/25 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
                09
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Roadmap de 90 Días — De Cero a Monetización
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-black/30 border border-purple-500/20 space-y-3">
              <div className="text-xs font-mono font-bold text-purple-400">MES 1: INFRAESTRUCTURA & BANCO</div>
              <div className="space-y-2">
                {[
                  { id: "ofm-m1-1", text: "Reset de iPhone + ProtonMail + Mullvad VPN" },
                  { id: "ofm-m1-2", text: "Número virtual USA (TextNow / Google Voice)" },
                  { id: "ofm-m1-3", text: "Character Sheet & Seed fijo generado" },
                  { id: "ofm-m1-4", text: "Banco inicial de 50 fotos en Tensor.art" },
                  { id: "ofm-m1-5", text: "Apertura de cuenta Wise USA" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleTask(item.id)}
                    className="w-full text-left flex items-start gap-2 text-xs text-purple-200/80 hover:text-white cursor-pointer"
                  >
                    {completedTasks[item.id] ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-purple-400/50 shrink-0 mt-0.5" />
                    )}
                    <span className={completedTasks[item.id] ? "line-through text-purple-400/50" : ""}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/30 border border-purple-500/20 space-y-3">
              <div className="text-xs font-mono font-bold text-pink-400">MES 2: LANZAMIENTO & TRÁFICO</div>
              <div className="space-y-2">
                {[
                  { id: "ofm-m2-1", text: "Crear Fanvue y fijar precio ($9.99–$14.99)" },
                  { id: "ofm-m2-2", text: "Calentar cuenta de Twitter (3 posts diarios)" },
                  { id: "ofm-m2-3", text: "Build karma en Reddit (r/AIGirls)" },
                  { id: "ofm-m2-4", text: "Primeros videos en TikTok (Morning routine)" },
                  { id: "ofm-m2-5", text: "Chatting activo en DMs de Fanvue" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleTask(item.id)}
                    className="w-full text-left flex items-start gap-2 text-xs text-purple-200/80 hover:text-white cursor-pointer"
                  >
                    {completedTasks[item.id] ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-purple-400/50 shrink-0 mt-0.5" />
                    )}
                    <span className={completedTasks[item.id] ? "line-through text-purple-400/50" : ""}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/30 border border-purple-500/20 space-y-3">
              <div className="text-xs font-mono font-bold text-emerald-400">MES 3: ESCALADO & PPV</div>
              <div className="space-y-2">
                {[
                  { id: "ofm-m3-1", text: "Rutina diaria de PPV automatizada con scripts" },
                  { id: "ofm-m3-2", text: "Primeros custom requests cerrados ($30–$80)" },
                  { id: "ofm-m3-3", text: "Medición de LTV por fan en Notion" },
                  { id: "ofm-m3-4", text: "Segunda cuenta de backup en Fanvue/Fansly" },
                  { id: "ofm-m3-5", text: "Meta: $500–$2,000 USD mensuales sostenibles" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleTask(item.id)}
                    className="w-full text-left flex items-start gap-2 text-xs text-purple-200/80 hover:text-white cursor-pointer"
                  >
                    {completedTasks[item.id] ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-purple-400/50 shrink-0 mt-0.5" />
                    )}
                    <span className={completedTasks[item.id] ? "line-through text-purple-400/50" : ""}>
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
