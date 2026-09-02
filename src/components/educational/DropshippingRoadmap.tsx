"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Megaphone,
  BarChart3,
  Sparkles,
  Package,
  AlertOctagon,
  CheckCircle2,
  Square,
  Zap,
  Compass,
  Sliders,
  CheckSquare,
} from "lucide-react";

const ALL_TASK_IDS = [
  "dp-m1-1", "dp-m1-2", "dp-m1-3", "dp-m1-4", "dp-m1-5",
  "dp-m2-1", "dp-m2-2", "dp-m2-3", "dp-m2-4", "dp-m2-5",
  "dp-m3-1", "dp-m3-2", "dp-m3-3", "dp-m3-4", "dp-m3-5"
];

export default function DropshippingRoadmap() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [currency, setCurrency] = useState<"USD" | "COP">("USD");
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_drop_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  // Calculadora interactiva de márgenes
  const [calcProductCost, setCalcProductCost] = useState<number>(9);
  const [calcSellingPrice, setCalcSellingPrice] = useState<number>(29.99);
  const [calcAdCpa, setCalcAdCpa] = useState<number>(8.5);
  const [calcMonthlyOrders, setCalcMonthlyOrders] = useState<number>(120);

  const TRM = 4150;

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_drop_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleAllTasks = () => {
    const allCompleted = ALL_TASK_IDS.every((id) => completedTasks[id]);
    const nextState: Record<string, boolean> = {};
    ALL_TASK_IDS.forEach((id) => {
      nextState[id] = !allCompleted;
    });
    setCompletedTasks(nextState);
    try {
      localStorage.setItem("sofi_drop_checklist", JSON.stringify(nextState));
    } catch {}
  };

  const completedCount = useMemo(() => {
    return ALL_TASK_IDS.filter((id) => completedTasks[id]).length;
  }, [completedTasks]);

  const progressPercent = Math.round((completedCount / ALL_TASK_IDS.length) * 100);

  // Cálculos de margen
  const grossProfitPerUnit = calcSellingPrice - calcProductCost;
  const netProfitPerUnit = grossProfitPerUnit - calcAdCpa;
  const netMarginPercent = calcSellingPrice > 0 ? (netProfitPerUnit / calcSellingPrice) * 100 : 0;
  const monthlyGrossRevenue = calcSellingPrice * calcMonthlyOrders;
  const monthlyNetProfit = netProfitPerUnit * calcMonthlyOrders;

  const formatAmount = (usdVal: number) => {
    if (currency === "COP") {
      return `$${Math.round(usdVal * TRM).toLocaleString()} COP`;
    }
    return `$${usdVal.toFixed(2)} USD`;
  };

  const subTabs = [
    { id: "all", label: "🌟 Plan Completo", icon: Sparkles },
    { id: "calc", label: "🧮 Calculadora de Margen", icon: Sliders },
    { id: "fases", label: "🗺️ 5 Fases del Negocio", icon: Compass },
    { id: "productos", label: "📦 Productos Ganadores", icon: Package },
    { id: "marketing", label: "📢 Canales de Marketing", icon: Megaphone },
    { id: "tools", label: "🛠️ Herramientas Top", icon: Zap },
    { id: "kpis", label: "📊 Métricas & KPIs", icon: BarChart3 },
    { id: "errores", label: "⚠️ Errores Fatales", icon: AlertOctagon },
    { id: "checklist", label: `🎯 Checklist (${progressPercent}%)`, icon: CheckCircle2 },
  ];

  return (
    <div className="w-full space-y-8 text-left">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#181126] via-[#10101c] to-[#1e1438] border border-purple-500/30 shadow-[0_0_40px_rgba(108,71,255,0.15)]"
      >
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-mono font-semibold uppercase tracking-wider">
            <ShoppingCart className="w-3.5 h-3.5 text-orange-400" />
            Plan de Acción E-commerce
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Negocio de <br />
            <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-emerald-300 bg-clip-text text-transparent">
              Dropshipping desde Cero
            </span>
          </h1>
          <p className="text-sm sm:text-base text-purple-200/70 leading-relaxed">
            Guía paso a paso sin conocimientos técnicos previos. Todo lo necesario para encontrar productos ganadores, montar la tienda en Shopify, generar tráfico orgánico en TikTok y escalar con anuncios rentables.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-purple-500/20">
          <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">$0</div>
            <div className="text-xs text-purple-200/60 mt-1">Inventario inicial requerido</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-orange-400">5</div>
            <div className="text-xs text-purple-200/60 mt-1">Fases estratégicas</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-purple-300">3–6 m</div>
            <div className="text-xs text-purple-200/60 mt-1">Tiempo para escalar</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-300">20–40%</div>
            <div className="text-xs text-purple-200/60 mt-1">Margen neto objetivo</div>
          </div>
        </div>
      </motion.div>

      {/* Sub-tabs Navigation */}
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

      {/* Interactive Margin Calculator */}
      {(activeTab === "all" || activeTab === "calc") && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#161226] to-[#1f1738] border border-orange-500/30 space-y-6 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2 text-orange-400 text-xs font-mono font-semibold uppercase">
                <Sliders className="w-4 h-4" />
                Simulador Unit Economics E-commerce
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Calculadora de Márgenes & Rentabilidad
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-purple-300/70">Moneda:</span>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  currency === "USD" ? "bg-orange-500 text-white" : "bg-white/5 text-purple-300"
                }`}
              >
                USD
              </button>
              <button
                onClick={() => setCurrency("COP")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  currency === "COP" ? "bg-orange-500 text-white" : "bg-white/5 text-purple-300"
                }`}
              >
                COP
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-purple-200">Costo del Producto en Proveedor (AliExpress/CJ):</span>
                  <span className="text-orange-400 font-mono">${calcProductCost} USD</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={50}
                  step={0.5}
                  value={calcProductCost}
                  onChange={(e) => setCalcProductCost(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-purple-200">Precio de Venta en tu Tienda (PVP):</span>
                  <span className="text-emerald-400 font-mono">${calcSellingPrice} USD</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={150}
                  step={1}
                  value={calcSellingPrice}
                  onChange={(e) => setCalcSellingPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-purple-200">Costo de Adquisición en Ads (CPA estimado):</span>
                  <span className="text-purple-300 font-mono">${calcAdCpa} USD / venta</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={30}
                  step={0.5}
                  value={calcAdCpa}
                  onChange={(e) => setCalcAdCpa(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-purple-200">Ventas Estimadas por Mes:</span>
                  <span className="text-amber-300 font-mono">{calcMonthlyOrders} pedidos</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={1000}
                  step={10}
                  value={calcMonthlyOrders}
                  onChange={(e) => setCalcMonthlyOrders(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Results Card */}
            <div className="p-5 rounded-2xl bg-black/40 border border-purple-500/25 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs text-purple-200/70">
                  <span>Margen Bruto por Unidad:</span>
                  <span className="font-mono text-purple-300 font-bold">{formatAmount(grossProfitPerUnit)}</span>
                </div>
                <div className="flex justify-between text-xs text-purple-200/70">
                  <span>Ganancia Neta por Venta:</span>
                  <span className={`font-mono font-bold ${netProfitPerUnit > 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {formatAmount(netProfitPerUnit)} ({netMarginPercent.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between text-xs text-purple-200/70">
                  <span>Facturación Bruta Mensual:</span>
                  <span className="font-mono text-purple-200 font-bold">{formatAmount(monthlyGrossRevenue)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-500/20 space-y-1">
                <div className="text-xs text-purple-300 font-medium">Ganancia Neta Mensual Estimada:</div>
                <div className={`text-3xl sm:text-4xl font-black font-mono ${monthlyNetProfit > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {formatAmount(monthlyNetProfit)}
                </div>
                <div className="text-xs text-purple-200/60 font-mono">
                  {currency === "USD" ? `≈ $${Math.round(monthlyNetProfit * TRM).toLocaleString()} COP` : `≈ $${Math.round(monthlyNetProfit).toLocaleString()} USD`}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* WHAT IS DROPSHIPPING FLOW */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-purple-500/25 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            ¿Cómo funciona el Modelo Dropshipping?
          </h3>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            Es un modelo de negocio donde <strong>tú vendes productos físicos online sin tener inventario</strong>. Cuando un cliente te compra, tú compras al proveedor con el dinero cobrado y el proveedor empaqueta y envía directo a la casa del comprador.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-2">
          <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/20 text-center space-y-1">
            <span className="text-2xl">👤</span>
            <div className="text-xs font-bold text-white">1. Cliente Compra</div>
            <div className="text-[11px] text-purple-200/60">En tu tienda Shopify</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/20 text-center space-y-1">
            <span className="text-2xl">💳</span>
            <div className="text-xs font-bold text-white">2. Tú Cobras</div>
            <div className="text-[11px] text-purple-200/60">Recibes pago total</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/20 text-center space-y-1">
            <span className="text-2xl">🏭</span>
            <div className="text-xs font-bold text-white">3. Pides a Proveedor</div>
            <div className="text-[11px] text-purple-200/60">Costo mayorista</div>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/20 text-center space-y-1">
            <span className="text-2xl">📦</span>
            <div className="text-xs font-bold text-white">4. Envío Directo</div>
            <div className="text-[11px] text-purple-200/60">Proveedor despacha</div>
          </div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-purple-500/10 border border-emerald-500/30 text-center space-y-1">
            <span className="text-2xl">💰</span>
            <div className="text-xs font-bold text-emerald-300">5. Tu Ganancia</div>
            <div className="text-[11px] text-emerald-200/80">Margen limpio</div>
          </div>
        </div>
      </section>

      {/* 5 PHASES */}
      {(activeTab === "all" || activeTab === "fases") && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-orange-500/20 text-orange-300 font-mono text-xs font-bold">
              ESTRATEGIA
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Las 5 Fases de Ejecución Paso a Paso
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/25 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300">
                  FASE 01 · Semana 1
                </span>
                <span className="text-xs text-purple-200/50">Investigación</span>
              </div>
              <h4 className="text-base font-bold text-white">Nicho & Cliente Ideal</h4>
              <p className="text-xs text-purple-200/70 leading-relaxed">
                Elige un nicho con alta pasión (ej: accesorios específicos para gatos, no solo mascotas). Valida en Google Trends y TikTok Shop que exista demanda de compra activa.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-orange-500/25 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-300">
                  FASE 02 · Semana 2
                </span>
                <span className="text-xs text-purple-200/50">Proveedores</span>
              </div>
              <h4 className="text-base font-bold text-white">Cadena de Suministro & Muestras</h4>
              <p className="text-xs text-purple-200/70 leading-relaxed">
                Selecciona proveedores con 4.7+ estrellas y más de 500 pedidos en AliExpress o CJ Dropshipping con almacén local. <strong>Regla de oro:</strong> pide la muestra tú primero para validar calidad y tiempo.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-emerald-500/25 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
                  FASE 03 · Semanas 3–4
                </span>
                <span className="text-xs text-purple-200/50">Tienda Online</span>
              </div>
              <h4 className="text-base font-bold text-white">Shopify & Branding de Confianza</h4>
              <p className="text-xs text-purple-200/70 leading-relaxed">
                Monta una tienda ultra-limpia con dominio propio (.com), páginas de producto enfocadas en beneficios, reseñas reales con fotos y pasarela de pago configurada (Shopify Payments / PayPal).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-pink-500/25 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300">
                  FASE 04 · Meses 2–3
                </span>
                <span className="text-xs text-purple-200/50">Tráfico</span>
              </div>
              <h4 className="text-base font-bold text-white">TikTok Orgánico & Meta Ads</h4>
              <p className="text-xs text-purple-200/70 leading-relaxed">
                Publica 3 videos al día en TikTok mostrando el problema y la solución del producto. Con los primeros ingresos reinvierte en Meta Ads y TikTok Ads con presupuesto diario controlado.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* PRODUCTS TO SELL */}
      {(activeTab === "all" || activeTab === "productos") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-purple-500/25 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              8 Categorías de Productos Recomendados
            </h3>
            <p className="text-xs text-purple-200/70">
              Productos con efecto &ldquo;¡Wow!&rdquo; visible en video en menos de 3 segundos:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { emoji: "💡", name: "Gadgets de Hogar", why: "Organizadores y luces LED", tag: "Estable", color: "text-purple-300" },
              { emoji: "🐾", name: "Accesorios Mascotas", why: "Gasto emocional sin límite", tag: "Top Ventas 🔥", color: "text-orange-400" },
              { emoji: "💪", name: "Fitness en Casa", why: "Bandas, rodillos, pilates", tag: "Top Ventas 🔥", color: "text-orange-400" },
              { emoji: "🌱", name: "Productos Eco", why: "Consumidor consciente paga más", tag: "Tendencia", color: "text-emerald-400" },
              { emoji: "👶", name: "Bebés & Niños", why: "Ticket repetitivo y confianza", tag: "Estable", color: "text-purple-300" },
              { emoji: "🎮", name: "Accesorios Gaming", why: "Soportes, luces, ergonomía", tag: "Top Ventas 🔥", color: "text-orange-400" },
              { emoji: "💆", name: "Belleza & Skincare", why: "Masajeadores y gua sha", tag: "Tendencia", color: "text-pink-400" },
              { emoji: "🚗", name: "Accesorios de Auto", why: "Organizadores y soportes", tag: "Estable", color: "text-purple-300" },
            ].map((p, i) => (
              <div key={i} className="p-4 rounded-2xl bg-black/30 border border-purple-500/20 text-center space-y-1.5">
                <span className="text-3xl">{p.emoji}</span>
                <div className="text-xs font-bold text-white">{p.name}</div>
                <div className="text-[11px] text-purple-200/60">{p.why}</div>
                <div className={`text-[10px] font-mono font-bold ${p.color}`}>{p.tag}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* KPIS TABLE */}
      {(activeTab === "all" || activeTab === "kpis") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-purple-500/25 space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Métricas Clave (KPIs) a Monitorear
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-purple-500/20">
            <table className="w-full text-left text-xs text-purple-200">
              <thead className="bg-white/5 text-purple-300 font-mono text-[11px] uppercase border-b border-purple-500/20">
                <tr>
                  <th className="p-3.5">Métrica</th>
                  <th className="p-3.5">¿Qué Mide?</th>
                  <th className="p-3.5">Meta Objetivo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10">
                <tr>
                  <td className="p-3.5 font-bold text-white">Tasa de Conversión (CVR)</td>
                  <td className="p-3.5 text-purple-200/70">% de visitas que compran</td>
                  <td className="p-3.5 font-mono text-emerald-400 font-bold">1.5% – 3.0%</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Costo por Adquisición (CPA)</td>
                  <td className="p-3.5 text-purple-200/70">Gasto en publicidad por cada venta</td>
                  <td className="p-3.5 font-mono text-emerald-400 font-bold">&lt; 30% del precio venta</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Ticket Promedio (AOV)</td>
                  <td className="p-3.5 text-purple-200/70">Valor medio por pedido</td>
                  <td className="p-3.5 font-mono text-emerald-400 font-bold">$35 – $80 USD</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">ROAS (Retorno en Ads)</td>
                  <td className="p-3.5 text-purple-200/70">Revenue generado por cada $1 en anuncios</td>
                  <td className="p-3.5 font-mono text-emerald-400 font-bold">Mínimo 2.5x</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Abandono de Carrito</td>
                  <td className="p-3.5 text-purple-200/70">% que agrega al carrito y no paga</td>
                  <td className="p-3.5 font-mono text-emerald-400 font-bold">&lt; 65%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* CHECKLIST 90 DIAS WITH BULK TOGGLE */}
      {(activeTab === "all" || activeTab === "checklist") && (
        <section className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-purple-500/25 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Checklist de 90 Días para tu Tienda
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-32 sm:w-48 h-2 rounded-full bg-black/40 overflow-hidden border border-purple-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-xs text-purple-300 font-mono">
                  {completedCount} de {ALL_TASK_IDS.length} ({progressPercent}%)
                </span>
              </div>
            </div>

            <button
              onClick={toggleAllTasks}
              className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-purple-500/20 text-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckSquare className="w-3.5 h-3.5 text-purple-400" />
              <span>{completedCount === ALL_TASK_IDS.length ? "Desmarcar todo" : "Marcar todo"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-black/30 border border-purple-500/20 space-y-3">
              <div className="text-xs font-mono font-bold text-purple-400">MES 1: SETUP & VALIDACIÓN</div>
              <div className="space-y-2">
                {[
                  { id: "dp-m1-1", text: "Elegir nicho de producto con alta demanda" },
                  { id: "dp-m1-2", text: "Validar proveedores y ordenar muestras físicas" },
                  { id: "dp-m1-3", text: "Crear tienda Shopify con dominio .com" },
                  { id: "dp-m1-4", text: "Diseñar logo e identidad con Canva" },
                  { id: "dp-m1-5", text: "Configurar pasarelas de pago y políticas legales" },
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
              <div className="text-xs font-mono font-bold text-orange-400">MES 2: TRÁFICO ORGÁNICO</div>
              <div className="space-y-2">
                {[
                  { id: "dp-m2-1", text: "Publicar 3 TikToks / Reels diarios con el producto" },
                  { id: "dp-m2-2", text: "Contactar a 10 micro-influencers para envío de muestra" },
                  { id: "dp-m2-3", text: "Recopilar primeras 10 reseñas reales con fotos" },
                  { id: "dp-m2-4", text: "Activar flujos de carritos abandonados con Klaviyo" },
                  { id: "dp-m2-5", text: "Alcanzar las primeras 20 ventas orgánicas" },
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
              <div className="text-xs font-mono font-bold text-emerald-400">MES 3: ADS & ESCALADO</div>
              <div className="space-y-2">
                {[
                  { id: "dp-m3-1", text: "Lanzar campañas de prueba en Meta Ads ($15/día)" },
                  { id: "dp-m3-2", text: "Identificar anuncio ganador y escalar presupuesto" },
                  { id: "dp-m3-3", text: "Automatizar procesamiento de pedidos con DSers" },
                  { id: "dp-m3-4", text: "Agregar upsell post-compra (+25% AOV)" },
                  { id: "dp-m3-5", text: "Meta: $2,000–$5,000 USD de facturación mensual" },
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
