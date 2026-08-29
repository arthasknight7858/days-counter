"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Sparkles,
  BookOpen,
  PieChart,
  ShieldAlert,
  CheckSquare,
  Square,
  CheckCircle2,
  Layers,
  Compass,
  Scale,
  ChevronDown,
} from "lucide-react";

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function EconomyRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_economy_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({ "f1": true, "m1": true });

  const toggleChecklist = (id: string) => {
    setCompletedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_economy_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const togglePhase = (id: string) => {
    setOpenPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "fases", label: "🗺️ 5 Fases de Formación", icon: Compass },
    { id: "modulos", label: "📚 Curso Módulos (01–07)", icon: BookOpen },
    { id: "portafolio", label: "🥧 Portafolio & Reglas de Oro", icon: PieChart },
    { id: "activos", label: "📊 Tabla de Activos", icon: Layers },
    { id: "estrategias", label: "⚔️ Estrategias de Inversión", icon: Scale },
    { id: "libros", label: "📖 Biblioteca Esencial", icon: BookOpen },
    { id: "youtube", label: "▶️ Canales YouTube", icon: YouTubeIcon },
    { id: "errores", label: "💀 12 Errores Fatales", icon: ShieldAlert },
    { id: "plan", label: "🚀 Plan 90 Días & Checklist", icon: CheckSquare },
  ];

  const learningPhases = [
    {
      id: "f1",
      num: "Fase 1",
      title: "Fundamentos de Economía (Micro & Macro)",
      duration: "3–6 meses · Cimientos conceptuales",
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/40 text-blue-300",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      desc: "Sin entender cómo funciona la economía, tus decisiones financieras son intuición disfrazada de análisis. No te saltes este bloque.",
      modules: [
        {
          name: "Microeconomía",
          items: ["Oferta y Demanda & Elasticidad", "Teoría del Consumidor & Utilidad Marginal", "Teoría de la Empresa & Costos Marginales", "Estructuras de mercado (Competencia, Monopolio, Oligopolio)", "Economías de escala y Teoría de Juegos"],
        },
        {
          name: "Macroeconomía",
          items: ["PIB, Inflación (IPC) y Desempleo", "Política Fiscal vs Monetaria (Bancos Centrales)", "Dinero, Banca y Reserva Fraccionaria", "Ciclos Económicos & Curva de Rendimientos", "Comercio Internacional, Divisas y Balanza de Pagos"],
        },
        {
          name: "Matemáticas Financieras",
          items: ["Tasas de variación y Porcentajes", "Valor Presente (PV) y Valor Futuro (FV)", "Interés Compuesto: VF = P × (1 + r)ⁿ", "Estadística descriptiva: media, desviación estándar, correlación"],
        },
      ],
    },
    {
      id: "f2",
      num: "Fase 2",
      title: "Finanzas Personales & Corporativas",
      duration: "4–8 meses · El manejo real del dinero",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      desc: "No puedes construir riqueza sobre una base rota. Aprende a dominar tu flujo de caja y analizar estados financieros de empresas.",
      modules: [
        {
          name: "Finanzas Personales",
          items: ["Presupuesto 50/30/20 y Flujo de Caja", "Fondo de Emergencia (3 a 6 meses de gastos)", "Eliminación de deudas de alto interés (Bola de nieve vs Avalancha)", "Psicología financiera: sesgos y control de impulsos"],
        },
        {
          name: "Contabilidad Corporativa",
          items: ["Balance General (Activo = Pasivo + Patrimonio)", "Estado de Resultados (P&L, Ganancias & Pérdidas)", "Estado de Flujos de Efectivo (Cash Flow)", "Ratios clave: P/E, EV/EBITDA, ROE, ROA, Margen Operativo"],
        },
        {
          name: "Valoración de Empresas",
          items: ["Valor en libros vs Valor de mercado", "Descuento de Flujos de Caja (DCF)", "Ventajas competitivas (Moats de Warren Buffett)", "Finanzas de Startups: Runway, Burn rate, VC vs Bootstrapping"],
        },
      ],
    },
    {
      id: "f3",
      num: "Fase 3",
      title: "Inversiones: Mercados & Tipos de Activos",
      duration: "6–12 meses · Haz que tu capital trabaje",
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/40 text-purple-300",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      desc: "Aprende el ecosistema bursátil: acciones, bonos, ETFs indexados, criptoactivos, REITs y cómo opera cada mercado.",
      modules: [
        {
          name: "Mercados Financieros",
          items: ["Bolsa de Valores (NYSE, NASDAQ, BVC)", "Brokers digitales internacionales (Interactive Brokers, Charles Schwab)", "Renta Fija: Bonos del Tesoro, Letras y CDTs", "ETFs de índice (VOO, VTI, QQQ, MSCI World)"],
        },
        {
          name: "Análisis de Inversión",
          items: ["Análisis Fundamental (estados financieros, equipo, foso económico)", "Análisis Técnico básico (soportes, resistencias, medias móviles)", "Dollar Cost Averaging (DCA): automatizar aportes mensuales", "Inversión en dólares como cobertura contra devaluación"],
        },
      ],
    },
    {
      id: "f4",
      num: "Fase 4",
      title: "Construcción de Portafolios & Gestión del Riesgo",
      duration: "6–12 meses · Uniendo todo con visión",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      desc: "Diversificación inteligente, gestión emocional en caídas del 30%+, rebalanceo y formulación de objetivos a décadas.",
      modules: [
        {
          name: "Teoría de Portafolios",
          items: ["Teoría Moderna de Portafolios (Markowitz) & Frontera Eficiente", "Asignación estratégica de activos (Asset Allocation)", "All Weather Portfolio (Ray Dalio) y 60/40 clásico", "Métricas de riesgo: Sharpe Ratio, Beta, Max Drawdown"],
        },
        {
          name: "Independencia Financiera",
          items: ["Regla del 4% de retiro seguro", "Filosofía FIRE (Financial Independence, Retire Early)", "Eficiencia fiscal y protección de patrimonio", "Disciplina a largo plazo: pensar en décadas, no en días"],
        },
      ],
    },
    {
      id: "f5",
      num: "Fase 5",
      title: "Especialización Avanzada",
      duration: "1–2 años · Elige tu pasión",
      color: "from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-300",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      desc: "Análisis cuantitativo con Python, Real Estate profesional, Private Equity, Macro Trading global o certificaciones CFA/FRM.",
      modules: [
        {
          name: "Caminos Especializados",
          items: ["Python para Finanzas (Pandas, NumPy, Backtesting)", "Real Estate & Desarrollo Inmobiliario profesional", "Private Equity & Fusiones/Adquisiciones (M&A)", "Temario CFA / FRM para rigor institucional"],
        },
      ],
    },
  ];

  const courseModules = [
    {
      id: "m1",
      num: "01",
      title: "Fundamentos de Economía",
      desc: "La economía es la ciencia que estudia cómo personas, empresas y gobiernos toman decisiones con recursos escasos.",
      concepts: [
        { title: "Oferta y Demanda", text: "Si la demanda sube y la oferta se mantiene, el precio sube. Aplica a acciones, crypto, bienes raíces y servicios." },
        { title: "Inflación", text: "Pérdida del poder adquisitivo. Si el dinero está quieto y la inflación es del 10% anual, pierdes 10% de valor cada año. Invertir es la respuesta." },
        { title: "Interés Compuesto", text: "La octava maravilla del mundo. Los rendimientos generan nuevos rendimientos: VF = P × (1 + r)ⁿ." },
        { title: "Costo de Oportunidad", text: "Todo lo que decides hacer tiene el costo de lo que dejas de hacer con esos recursos y tiempo." },
      ],
    },
    {
      id: "m2",
      num: "02",
      title: "El Sistema Financiero",
      desc: "Conjunto de instituciones, mercados e instrumentos que canalizan el ahorro hacia la inversión productiva.",
      concepts: [
        { title: "Bancos Centrales (Fed / BanRep)", text: "Fijan tasas de interés. Si la Fed sube tasas, el dinero seguro rinde más y caen activos de riesgo. Si baja tasas, el dinero fluye a acciones y crypto." },
        { title: "Bancos Comerciales", text: "Captan depósitos y prestan. La brecha es su margen. Tu CDT rinde menos que invertir de forma directa." },
        { title: "Bolsas de Valores", text: "Mercados organizados donde cotizan acciones, ETFs y futuros (NYSE, NASDAQ, BVC)." },
        { title: "Brokers Digitales", text: "Intermediarios autorizados para operar en bolsas mundiales con mínimas comisiones (Interactive Brokers, Charles Schwab)." },
      ],
    },
    {
      id: "m3",
      num: "03",
      title: "Finanzas Personales en Orden",
      desc: "Antes de invertir un solo peso, necesitas una base sólida. Riqueza = Ingresos − Gastos invertidos con sabiduría.",
      concepts: [
        { title: "1. Flujo de Caja", text: "Conoce exactamente lo que entra y lo que sale cada mes en una hoja de cálculo o app." },
        { title: "2. Fondo de Emergencia", text: "3 a 6 meses de gastos fijos en cuenta líquida o CDT de alta liquidez para no malvender inversiones en crisis." },
        { title: "3. Cero Deudas Tóxicas", text: "Pagar una tarjeta de crédito al 25%+ es el mejor rendimiento garantizado sin riesgo que existe." },
        { title: "4. Regla 50/30/20", text: "50% necesidades, 30% estilo de vida/deseos, 20% ahorro e inversión constante." },
      ],
    },
    {
      id: "m4",
      num: "04",
      title: "Mercados e Inversión",
      desc: "Invertir es poner tu capital a trabajar para generar más capital en el tiempo.",
      concepts: [
        { title: "Riesgo vs Rendimiento", text: "Siempre van juntos. No existe alta rentabilidad sin riesgo (si alguien te la ofrece, es una estafa)." },
        { title: "El Factor Tiempo", text: "$1,000 invertidos a los 25 años al 8% = ~$21,700 a los 65. A los 35 = ~$10,000. Empezar tarde es el error más caro." },
        { title: "Análisis Fundamental vs Técnico", text: "Fundamental: analiza el negocio real (ganancias, deuda, equipo). Técnico: patrones de precio en gráficos." },
      ],
    },
    {
      id: "m5",
      num: "05",
      title: "Tipos de Activos & Cobertura USD",
      desc: "Invertir en activos denominados en USD protege tu patrimonio contra la devaluación histórica del peso latinoamericano.",
      concepts: [
        { title: "Dólar como Cobertura", text: "Si el USD sube 10% y tu inversión rinde 8% en USD, en moneda local ganas ~18% compuesto." },
        { title: "ETFs de Índice (VOO/VTI)", text: "Diversificación instantánea en 500+ empresas globales con costo casi nulo (~0.03% anual)." },
        { title: "Bitcoin / Criptoactivos", text: "Activo asimétrico con alta volatilidad; ideal mantenerlo en porcentaje controlado (10–20%)." },
      ],
    },
    {
      id: "m6",
      num: "06",
      title: "Guía para Empezar (Paso a Paso)",
      desc: "No necesitas miles de dólares. Plataformas modernas permiten empezar con $1 USD. Lo crucial es la consistencia.",
      concepts: [
        { title: "Paso 1: Abrir Broker", text: "Abre cuenta en Interactive Brokers (gratis, regulado, sin mínimo)." },
        { title: "Paso 2: Compra ETF Base", text: "Compra fracciones de VOO (S&P 500) o VTI (Total Stock Market)." },
        { title: "Paso 3: Automatiza DCA", text: "Dollar Cost Averaging: aporta una suma fija mes a mes sin importar si el mercado sube o baja." },
        { title: "Paso 4: No tocar el dinero", text: "La mayor trampa es vender en pánico cuando el mercado corrige. Las caídas son descuentos temporales." },
      ],
    },
    {
      id: "m7",
      num: "07",
      title: "Estrategia & Portafolio Sugerido",
      desc: "Estrategia para perfil ofensivo-moderado con horizonte a largo plazo.",
      concepts: [
        { title: "Asignación Recomendada", text: "40% ETFs S&P 500 (VOO) · 20% Acciones individuales · 20% Bitcoin (BTC) · 10% Renta fija USD · 10% Reinversión negocio." },
        { title: "Tu Mayor Activo eres Tú", text: "Invertir en habilidades que aumentan tus ingresos (programación, marketing, ventas, IA) tiene el ROI más alto." },
      ],
    },
  ];

  const assetsTable = [
    { name: "Acciones (S&P 500)", risk: "Medio", returnRate: "~10% anual hist.", liquidity: "Alta", idealFor: "Largo plazo, base sólida de riqueza", badge: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    { name: "ETFs Indexados (VOO/VTI)", risk: "Bajo-Medio", returnRate: "~8–10% anual", liquidity: "Alta", idealFor: "Principiantes & automatización DCA", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    { name: "Bonos del Tesoro EE.UU.", risk: "Muy Bajo", returnRate: "4–5% en USD", liquidity: "Alta", idealFor: "Estabilidad y reserva de liquidez", badge: "bg-teal-500/20 text-teal-300 border-teal-500/30" },
    { name: "Bitcoin (BTC)", risk: "Alto", returnRate: ">100% alzas / -70% ciclos", liquidity: "Alta", idealFor: "Posición asimétrica (10–20% máx)", badge: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
    { name: "Bienes Raíces / Físico", risk: "Medio", returnRate: "6–12% (renta + plusvalía)", liquidity: "Baja", idealFor: "Mediano/largo plazo con mayor capital", badge: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
    { name: "REITs (Bienes Raíces en Bolsa)", risk: "Medio", returnRate: "7–10% + dividendos", liquidity: "Alta", idealFor: "Exposición inmobiliaria sin comprar casas", badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
    { name: "CDTs / Renta Fija Local", risk: "Bajo", returnRate: "9–13% en moneda local", liquidity: "Baja-Media", idealFor: "Fondo de emergencia en moneda local", badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
    { name: "Negocio Propio / Skills", risk: "Alto", returnRate: "Ilimitado (Mayor ROI)", liquidity: "Baja", idealFor: "Multiplicar capacidad de generar capital", badge: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  ];

  const goldenRules = [
    { icon: "🧠", title: "1. Nunca inviertas en lo que no entiendes", desc: "Si no puedes explicar en 2 minutos cómo ese activo genera valor, no pongas tu dinero en él. La complejidad excesiva suele ocultar trampas." },
    { icon: "📅", title: "2. Piensa en décadas, no en días", desc: "El 90% de quienes intentan hacer day-trading pierden dinero. El 10% que gana de verdad invierte en activos sólidos y deja trabajar el interés compuesto. 'Nadie quiere enriquecerse lentamente' — Warren Buffett." },
    { icon: "🚨", title: "3. Desconfía del FOMO y la euforia", desc: "Cuando todos en redes sociales o en la calle hablan de un activo que sube sin freno, suele ser tarde. Compra en pánico y desinterés, vende o mantén con calma." },
    { icon: "💰", title: "4. Solo invierte lo que puedes permitirte no tocar", desc: "Los mejores retornos provienen del tiempo en el mercado. Si necesitas ese dinero en menos de 3 años para pagar cuentas, no debe estar en activos volátiles." },
    { icon: "📚", title: "5. Tu mayor activo eres tú mismo", desc: "Aprender habilidades de alto valor (desarrollo de software, marketing digital, ventas, IA) multiplica tus ingresos, lo cual alimenta tu portafolio de inversión cada mes." },
  ];

  const books = [
    { title: "La Psicología del Dinero", author: "Morgan Housel", category: "Comportamiento", desc: "El mejor libro moderno sobre cómo las emociones y el comportamiento importan más que el coeficiente intelectual en finanzas.", tag: "Lectura Obligatoria", color: "border-amber-400/40 text-amber-300" },
    { title: "El Inversor Inteligente", author: "Benjamin Graham", category: "Value Investing", desc: "La biblia de la inversión en valor. Conceptos clave como el 'Margen de Seguridad' y 'Mr. Market'.", tag: "Clásico Supremo", color: "border-blue-400/40 text-blue-300" },
    { title: "Un Paso por Delante de Wall Street", author: "Peter Lynch", category: "Renta Variable", desc: "Cómo el inversor individual puede detectar grandes empresas cotidianas antes que los fondos de inversión.", tag: "Práctico & Amable", color: "border-emerald-400/40 text-emerald-300" },
    { title: "Principios de Economía", author: "N. Gregory Mankiw", category: "Fundamentos", desc: "El libro de texto universitario referente mundial para comprender microeconomía y macroeconomía con rigor y claridad.", tag: "Bases Sólidas", color: "border-purple-400/40 text-purple-300" },
    { title: "Principios", author: "Ray Dalio", category: "Macro & Portafolios", desc: "La visión del fundador de Bridgewater sobre cómo funciona la máquina económica y cómo diversificar en cualquier clima.", tag: "Estratégico", color: "border-teal-400/40 text-teal-300" },
    { title: "A Random Walk Down Wall Street", author: "Burton Malkiel", category: "Indexación", desc: "El argumento académico definitivo de por qué la inversión indexada pasiva vence al 90% de los gestores activos.", tag: "Evidencia Real", color: "border-indigo-400/40 text-indigo-300" },
  ];

  const youtubeChannels = [
    { name: "Khan Academy en Español (Economía)", lang: "ES", desc: "Microeconomía, macroeconomía y finanzas explicadas desde cero, con rigor y sin vender humo.", type: "Fundamentos", badge: "bg-blue-500/20 text-blue-300" },
    { name: "Aswath Damodaran (NYU Stern)", lang: "EN", desc: "El profesor referente mundial en valoración de empresas. Cursos completos gratuitos de Corporate Finance y Valuation.", type: "Valoración", badge: "bg-purple-500/20 text-purple-300" },
    { name: "Ben Felix (Common Sense Investing)", lang: "EN", desc: "Finanzas e inversiones basadas 100% en evidencia académica, factor investing y fondos indexados.", type: "Inversión Pasiva", badge: "bg-emerald-500/20 text-emerald-300" },
    { name: "Economía Simple / EconomiTube", lang: "ES", desc: "Explicaciones visuales y animadas de conceptos macroeconómicos, inflación, bancos centrales y deuda.", type: "Macroeconomía", badge: "bg-amber-500/20 text-amber-300" },
    { name: "Academia de Inversión", lang: "ES", desc: "Value investing, análisis de estados financieros y tesis de inversión en empresas públicas.", type: "Análisis de Acciones", badge: "bg-rose-500/20 text-rose-300" },
    { name: "Patrick Boyle", lang: "EN", desc: "Profesor universitario y ex-gestor de hedge funds con explicaciones entretenidas y rigurosas de eventos financieros.", type: "Mercados Globales", badge: "bg-teal-500/20 text-teal-300" },
  ];

  const mistakes = [
    { num: "01", title: "No tener fondo de emergencia antes de invertir", desc: "Cualquier imprevisto te obligará a liquidar inversiones en el peor momento de mercado con pérdidas realizadas." },
    { num: "02", title: "Intentar hacer 'Market Timing'", desc: "Ni los mejores fondos adivinan techos y suelos. 'El tiempo en el mercado supera al timing del mercado'." },
    { num: "03", title: "Invertir en lo que no entiendes", desc: "Comprar memecoins o derivados complejos solo porque 'están subiendo' es una apuesta de casino, no una inversión." },
    { num: "04", title: "Vender en pánico durante caídas normales", desc: "Las caídas del 15–30% ocurren cada pocos años. Históricamente el mercado siempre se ha recuperado y marcado nuevos máximos." },
    { num: "05", title: "Ignorar las comisiones y costos de intermediación", desc: "Comisiones anuales del 2% vs 0.03% se comen hasta el 40% del capital final en un horizonte de 25 años." },
    { num: "06", title: "Seguir consejos de 'gurús' y 'señales de trading'", desc: "El 95% de los influencers financieros viven de vender cursos o referidos de brokers dudosos, no de invertir." },
    { num: "07", title: "Concentrar todo en un solo activo o país", desc: "La diversificación inteligente entre monedas, geografías y sectores reduce el riesgo sin sacrificar retorno." },
    { num: "08", title: "Apalancarse sin experiencia profesional", desc: "El apalancamiento multiplica pérdidas tan rápido que puede dejarte en números negativos en cuestión de horas." },
  ];

  const checklistItems = [
    { id: "eco_net_worth", label: "Calcular patrimonio neto real (Activos − Pasivos)", phase: "Mes 1" },
    { id: "eco_budget", label: "Establecer presupuesto 50/30/20 y registrar gastos 1 mes", phase: "Mes 1" },
    { id: "eco_emergency", label: "Construir fondo de emergencia de 3 a 6 meses", phase: "Mes 1–2" },
    { id: "eco_read_housel", label: "Leer 'La Psicología del Dinero' de Morgan Housel", phase: "Mes 2" },
    { id: "eco_understand_fed", label: "Entender el impacto de tasas de interés, inflación y la Fed", phase: "Mes 2" },
    { id: "eco_open_broker", label: "Abrir cuenta en broker internacional (Interactive Brokers / Charles Schwab)", phase: "Mes 3" },
    { id: "eco_first_etf", label: "Comprar primera fracción de ETF indexado (VOO o VTI)", phase: "Mes 3" },
    { id: "eco_automate_dca", label: "Configurar aporte mensual automático (Dollar Cost Averaging)", phase: "Mes 3+" },
    { id: "eco_financial_statements", label: "Aprender a leer un Balance General y Estado de Resultados", phase: "Mes 4" },
    { id: "eco_asset_allocation", label: "Definir porcentaje objetivo de portafolio y reglas escritas", phase: "Mes 5+" },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-950/40 via-purple-950/20 to-emerald-950/30 backdrop-blur-xl border border-blue-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(59,130,246,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            Economía, Finanzas & Inversión · Edición Completa
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">De Cero a </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-teal-300 to-emerald-300">
              Portafolio Real
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            Todo lo necesario para entender cómo funciona el dinero, los mercados globales y cómo hacer que tu capital trabaje por ti a través del interés compuesto.
          </p>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg p-4 rounded-2xl bg-white/5 border border-blue-500/20 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-300 block">5</span>
              <span className="text-[11px] text-purple-200/70 uppercase tracking-wider font-medium">Fases</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-300 block">7</span>
              <span className="text-[11px] text-purple-200/70 uppercase tracking-wider font-medium">Módulos</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 block">∞</span>
              <span className="text-[11px] text-purple-200/70 uppercase tracking-wider font-medium">Retorno</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Pills */}
      <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-2 my-4">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border flex items-center gap-2 select-none ${
                isActive
                  ? "bg-blue-600/90 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)] scale-102 font-semibold"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. FASES DE FORMACIÓN (ROADMAP) */}
      {(activeSubTab === "all" || activeSubTab === "fases") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Ruta de Formación Continua</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-blue-400" />
              Las 5 Fases del Inversor Sólido
            </h3>
            <p className="text-purple-200/70 text-sm">
              Aprende en espiral: cada fase construye sobre la anterior para darte criterio real y juicio financiero.
            </p>
          </div>

          <div className="space-y-4">
            {learningPhases.map((phase) => {
              const isOpen = !!openPhases[phase.id];
              return (
                <div
                  key={phase.id}
                  className={`rounded-2xl border backdrop-blur-md transition-all overflow-hidden bg-linear-to-br ${phase.color}`}
                >
                  <div
                    onClick={() => togglePhase(phase.id)}
                    className="p-5 sm:p-6 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className={`text-xs font-mono font-bold uppercase px-3 py-1 rounded-lg border ${phase.badge}`}>
                        {phase.num}
                      </span>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-white">{phase.title}</h4>
                        <span className="text-xs text-purple-200/70">{phase.duration}</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-purple-300 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 pb-6 sm:px-6 space-y-4 border-t border-white/10"
                      >
                        <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed pt-3">{phase.desc}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {phase.modules.map((m, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-black/25 border border-white/10 space-y-2">
                              <h5 className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                {m.name}
                              </h5>
                              <ul className="space-y-1 text-xs text-purple-200/75">
                                {m.items.map((item, i) => (
                                  <li key={i} className="flex items-start gap-1.5">
                                    <span className="text-blue-300 shrink-0">·</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* 2. MÓDULOS DEL CURSO COMPLETO */}
      {(activeSubTab === "all" || activeSubTab === "modulos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Guía Modular Exhaustiva</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              Módulos 01 al 07: Conceptos & Mecánicas Clave
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseModules.map((mod) => (
              <div
                key={mod.id}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 sm:p-6 backdrop-blur-md space-y-4 hover:border-emerald-400/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-mono font-bold flex items-center justify-center">
                    {mod.num}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-base sm:text-lg">{mod.title}</h4>
                    <p className="text-xs text-purple-200/70 leading-snug">{mod.desc}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  {mod.concepts.map((c, i) => (
                    <div key={i} className="p-3 rounded-xl bg-black/20 border border-white/5 space-y-1">
                      <span className="text-xs font-bold text-emerald-300 block">{c.title}</span>
                      <p className="text-xs text-purple-200/80 leading-relaxed">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 3. PORTAFOLIO & REGLAS DE ORO */}
      {(activeSubTab === "all" || activeSubTab === "portafolio") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Estrategia Ofensiva-Moderada</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <PieChart className="w-6 h-6 text-amber-400" />
              Estructura de Portafolio & Las 5 Reglas de Oro
            </h3>
            <p className="text-purple-200/70 text-sm">
              Diseñado para horizonte a largo plazo con protección en dólares y exposición al crecimiento exponencial.
            </p>
          </div>

          {/* Portfolio Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 text-center space-y-1">
              <span className="text-3xl font-extrabold text-blue-400">40%</span>
              <h5 className="font-bold text-white text-xs">ETFs S&P 500</h5>
              <p className="text-[11px] text-purple-200/70">VOO / VTI (Base sólida)</p>
            </div>
            <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/30 text-center space-y-1">
              <span className="text-3xl font-extrabold text-teal-400">20%</span>
              <h5 className="font-bold text-white text-xs">Acciones Ind.</h5>
              <p className="text-[11px] text-purple-200/70">Empresas con Foso (Moats)</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-center space-y-1">
              <span className="text-3xl font-extrabold text-amber-400">20%</span>
              <h5 className="font-bold text-white text-xs">Bitcoin</h5>
              <p className="text-[11px] text-purple-200/70">BTC (Activo asimétrico)</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-center space-y-1">
              <span className="text-3xl font-extrabold text-purple-400">10%</span>
              <h5 className="font-bold text-white text-xs">Renta Fija USD</h5>
              <p className="text-[11px] text-purple-200/70">Bonos / Liquidez segura</p>
            </div>
            <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-center space-y-1">
              <span className="text-3xl font-extrabold text-rose-400">10%</span>
              <h5 className="font-bold text-white text-xs">Reinversión</h5>
              <p className="text-[11px] text-purple-200/70">Negocios propios & Skills</p>
            </div>
          </div>

          {/* 5 Golden Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {goldenRules.map((rule, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md flex items-start gap-4"
              >
                <span className="text-3xl shrink-0 mt-0.5">{rule.icon}</span>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm sm:text-base">{rule.title}</h4>
                  <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 4. TABLA COMPARATIVA DE ACTIVOS */}
      {(activeSubTab === "all" || activeSubTab === "activos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Análisis de Instrumentos</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-teal-400" />
              Comparativa de Activos de Inversión
            </h3>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-purple-500/20 bg-white/5 backdrop-blur-md">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-white/5 text-purple-200 uppercase font-mono text-[11px] border-b border-purple-500/20">
                <tr>
                  <th className="p-3.5 sm:p-4">Activo</th>
                  <th className="p-3.5 sm:p-4">Riesgo</th>
                  <th className="p-3.5 sm:p-4">Retorno Histórico</th>
                  <th className="p-3.5 sm:p-4">Liquidez</th>
                  <th className="p-3.5 sm:p-4">Ideal Para</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-purple-100">
                {assetsTable.map((a, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-white">{a.name}</td>
                    <td className="p-3.5 sm:p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${a.badge}`}>
                        {a.risk}
                      </span>
                    </td>
                    <td className="p-3.5 sm:p-4 text-emerald-300 font-mono font-medium">{a.returnRate}</td>
                    <td className="p-3.5 sm:p-4 text-purple-200/80">{a.liquidity}</td>
                    <td className="p-3.5 sm:p-4 text-xs text-purple-200/90">{a.idealFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      )}

      {/* 5. ESTRATEGIAS DE INVERSIÓN */}
      {(activeSubTab === "all" || activeSubTab === "estrategias") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Filosofías Bursátiles</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-purple-400" />
              Principales Estrategias en los Mercados
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">Inversión Pasiva Indexada (Bogleheads)</h4>
                <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono">Dificultad: Baja</span>
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Comprar fondos indexados (S&P 500 o MSCI World) con aportaciones periódicas automáticas (DCA). Supera al 90% de los gestores profesionales a 15+ años.
              </p>
              <span className="text-[11px] text-purple-300 block pt-2 border-t border-white/5">🎯 Para el 95% de las personas que buscan paz mental y máximo resultado.</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">Value Investing (Warren Buffett / Graham)</h4>
                <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono">Dificultad: Media-Alta</span>
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Comprar acciones de empresas excelentes cotizando por debajo de su valor intrínseco. Exige análisis riguroso de balances, márgenes y fosos competitivos.
              </p>
              <span className="text-[11px] text-purple-300 block pt-2 border-t border-white/5">🎯 Para inversores analíticos dispuestos a leer informes anuales 10-K.</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">Growth Investing (Crecimiento Secular)</h4>
                <span className="text-xs px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-mono">Dificultad: Media</span>
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Empresas con crecimiento acelerado de ingresos en industrias del futuro (IA, computación en la nube, biotecnología). Mayor volatilidad, alto potencial.
              </p>
              <span className="text-[11px] text-purple-300 block pt-2 border-t border-white/5">🎯 Para perfiles jóvenes con alta tolerancia a oscilaciones de corto plazo.</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-base">Movimiento FIRE (Independencia Financiera)</h4>
                <span className="text-xs px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 font-mono">Dificultad: Media</span>
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Ahorro e inversión agresivos (30–60% del ingreso) + indexación para acumular 25 veces tu gasto anual y vivir de rendimientos (Regla del 4%).
              </p>
              <span className="text-[11px] text-purple-300 block pt-2 border-t border-white/5">🎯 Para quienes priorizan libertad de tiempo y control de su vida.</span>
            </div>
          </div>
        </motion.section>
      )}

      {/* 6. BIBLIOTECA ESENCIAL */}
      {(activeSubTab === "all" || activeSubTab === "libros") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Lecturas de Oro</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              Libros Imprescindibles de Finanzas & Economía
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((bk, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md flex flex-col justify-between hover:border-blue-400/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/10 text-purple-200">
                      {bk.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${bk.color}`}>
                      {bk.tag}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-base mt-1">{bk.title}</h4>
                  <span className="text-xs text-purple-300/80 font-medium block mb-2">{bk.author}</span>
                  <p className="text-xs text-purple-200/75 leading-relaxed">{bk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 7. CANALES YOUTUBE */}
      {(activeSubTab === "all" || activeSubTab === "youtube") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">Educación Audiovisual</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <YouTubeIcon className="w-6 h-6 text-red-500" />
              Canales Rigurosos de YouTube (Sin Humo)
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 text-xs sm:text-sm text-purple-200/85 space-y-1">
            <strong className="text-red-300 block">💡 Cómo usar YouTube con sabiduría:</strong>
            <p>
              Usa YouTube para comprender conceptos visuales (animaciones de inflación, cómo opera una subasta de bonos). Pero desconfía de quien prometa ganancias rápidas o venda cursos de trading millonario.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeChannels.map((c, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2 hover:border-red-400/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${c.badge}`}>
                    {c.type}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-purple-200 font-bold">
                    {c.lang}
                  </span>
                </div>
                <h4 className="font-bold text-white text-base">{c.name}</h4>
                <p className="text-xs text-purple-200/75 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 8. ERRORES FATALES */}
      {(activeSubTab === "all" || activeSubTab === "errores") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Escudo Financiero</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-400" />
              Los Errores que Destruyen Portafolios
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mistakes.map((m, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-rose-950/15 border border-rose-500/20 backdrop-blur-md space-y-2"
              >
                <span className="text-2xl font-black text-rose-400/40 font-mono block">{m.num}</span>
                <h4 className="font-bold text-rose-200 text-sm">{m.title}</h4>
                <p className="text-xs text-purple-200/75 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 9. PLAN DE ACCIÓN 90 DÍAS & CHECKLIST */}
      {(activeSubTab === "all" || activeSubTab === "plan") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Ejecución Inmediata</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <CheckSquare className="w-6 h-6 text-teal-400" />
              Checklist Interactivo del Inversor
            </h3>
            <p className="text-purple-200/70 text-sm">Marca cada hito conforme avances en tu formación práctica.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {checklistItems.map((item) => {
              const isChecked = !!completedItems[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-4 rounded-2xl border backdrop-blur-md transition-all text-left flex items-start gap-3 cursor-pointer select-none ${
                    isChecked
                      ? "bg-emerald-950/30 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "bg-white/5 border-purple-500/20 hover:bg-white/8 hover:border-purple-400/40"
                  }`}
                >
                  <div className="mt-0.5">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-purple-400/50" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-purple-300/70 block mb-0.5">
                      {item.phase}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                        isChecked ? "text-emerald-200 line-through opacity-80" : "text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-linear-to-r from-blue-950/40 via-purple-950/30 to-emerald-950/40 border border-blue-400/30 text-center space-y-2">
            <span className="text-xl sm:text-2xl font-bold text-blue-200 block">
              🎯 Tu primer paso esta semana:
            </span>
            <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mx-auto leading-relaxed">
              1. Abre cuenta en <strong>Interactive Brokers</strong> (es gratis). 2. Transfiere $20–50 USD. 3. Compra una fracción de <strong>VOO</strong>. 4. Configura tu ahorro mensual. El mejor momento para empezar fue hace 10 años; el segundo mejor momento es hoy.
            </p>
          </div>
        </motion.section>
      )}
    </div>
  );
}
