"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Sparkles,
  BookOpen,
  ShieldAlert,
  CheckSquare,
  Square,
  CheckCircle2,
  Layers,
  Compass,
  Scale,
  ChevronDown,
  Calculator,
  Brain,
  AlertTriangle,
  Flame,
  CandlestickChart,
  Search,
  ExternalLink,
  Zap,
  Target,
  BarChart3,
  Coins,
  ShieldCheck,
  Award,
  Clock,
  Lightbulb,
  Crosshair,
  TrendingDown,
  Info,
} from "lucide-react";

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function CryptoTradingRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({
    f1: true,
    f2: false,
    f3: false,
    f4: false,
    f5: false,
    f6: false,
  });
  const [patternFilter, setPatternFilter] = useState<"all" | "alcista" | "bajista" | "vela" | "figura">("all");
  const [glossarySearch, setGlossarySearch] = useState("");

  // Interactive Calculator State
  const [calcAccountBalance, setCalcAccountBalance] = useState<number>(1000);
  const [calcRiskPct, setCalcRiskPct] = useState<number>(1.5);
  const [calcEntryPrice, setCalcEntryPrice] = useState<number>(65000);
  const [calcStopLoss, setCalcStopLoss] = useState<number>(63500);
  const [calcTakeProfit, setCalcTakeProfit] = useState<number>(69500);
  const [calcLeverage, setCalcLeverage] = useState<number>(1);

  // LocalStorage Checklist
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_crypto_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  const toggleChecklist = (id: string) => {
    setCompletedChecklist((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_crypto_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const togglePhase = (id: string) => {
    setOpenPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculator Math
  const riskAmount = useMemo(() => {
    return (calcAccountBalance * calcRiskPct) / 100;
  }, [calcAccountBalance, calcRiskPct]);

  const priceDiffPerUnit = useMemo(() => {
    return Math.abs(calcEntryPrice - calcStopLoss);
  }, [calcEntryPrice, calcStopLoss]);

  const positionUnits = useMemo(() => {
    if (priceDiffPerUnit <= 0) return 0;
    return riskAmount / priceDiffPerUnit;
  }, [riskAmount, priceDiffPerUnit]);

  const totalPositionValue = useMemo(() => {
    return positionUnits * calcEntryPrice;
  }, [positionUnits, calcEntryPrice]);

  const marginRequired = useMemo(() => {
    if (calcLeverage <= 0) return totalPositionValue;
    return totalPositionValue / calcLeverage;
  }, [totalPositionValue, calcLeverage]);

  const rewardPerUnit = useMemo(() => {
    return Math.abs(calcTakeProfit - calcEntryPrice);
  }, [calcTakeProfit, calcEntryPrice]);

  const potentialProfit = useMemo(() => {
    return positionUnits * rewardPerUnit;
  }, [positionUnits, rewardPerUnit]);

  const riskRewardRatio = useMemo(() => {
    if (priceDiffPerUnit <= 0) return 0;
    return rewardPerUnit / priceDiffPerUnit;
  }, [rewardPerUnit, priceDiffPerUnit]);

  const breakEvenWinRate = useMemo(() => {
    if (riskRewardRatio <= 0) return 100;
    return (1 / (1 + riskRewardRatio)) * 100;
  }, [riskRewardRatio]);

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "fases", label: "🗺️ 6 Fases del Trader", icon: Compass },
    { id: "estrategias", label: "⚔️ Estrategias Principales", icon: Scale },
    { id: "patrones", label: "📐 Catálogo de Patrones & Velas", icon: CandlestickChart },
    { id: "calculadora", label: "🧮 Calculadora de Riesgo", icon: Calculator },
    { id: "onchain_smc", label: "📊 On-Chain, Wyckoff & SMC", icon: Layers },
    { id: "herramientas", label: "🛠️ Arsenal de Herramientas", icon: BarChart3 },
    { id: "youtube_libros", label: "📚 Canales & Biblioteca", icon: BookOpen },
    { id: "riesgo_psico", label: "🧠 Psicología & 12 Reglas", icon: Brain },
    { id: "plan_checklist", label: "🚀 Plan & Checklist", icon: CheckSquare },
    { id: "glosario", label: "📖 Glosario Cripto", icon: Info },
  ];

  const phasesData = [
    {
      id: "f1",
      num: "01",
      title: "Fundamentos del Mercado Cripto & Orientación",
      duration: "⏱ 2–4 semanas",
      level: "PRINCIPIANTE",
      color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-300",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      goal: "Dominar la terminología técnica, entender blockchain, la diferencia entre spot/futuros y operar plataformas sin arriesgar capital real.",
      topics: [
        {
          title: "🌐 Ecosistema & Arquitectura Blockchain",
          items: [
            "Historia y génesis de Bitcoin (Whitepaper de Satoshi Nakamoto, escasez digital de 21M).",
            "Ethereum y los Smart Contracts: de dinero programable a DeFi y Web3.",
            "Mercado 24/7/365: por qué cripto nunca duerme y su impacto en la liquidez y volatilidad.",
            "Métricas clave: Capitalización total (Total Market Cap), Dominancia de BTC (BTC.D) y ETH/BTC.",
            "Clasificación: Capa 1 (L1s), Capa 2 (L2 rollups), Stablecoins (USDT, USDC) y Altcoins.",
            "Diferencia vital: Invertir a largo plazo (HODL/Fundamentos) vs Tradear fluctuaciones de precio.",
          ],
        },
        {
          title: "🏛️ Exchanges, Wallets & Custodia Segura",
          items: [
            "CEX (Exchanges Centralizados: Binance, Bybit, Coinbase) vs DEX (Uniswap, Raydium).",
            "KYC (Know Your Customer) y normativas de seguridad en exchanges.",
            "Hot Wallets (MetaMask, Phantom, Rabby) vs Cold Hardware Wallets (Ledger, Trezor, Tangem).",
            "Seguridad de Seed Phrase: cómo resguardar tus 12/24 palabras (¡nunca en fotos ni notas en la nube!).",
            "Tipos de Órdenes: Market (inmediata), Limit (precio fijado), Stop-Market, Stop-Limit, Trailing Stop.",
            "Estructura de Comisiones: Maker fee (aportar liquidez) vs Taker fee (tomar liquidez), Funding rates.",
          ],
        },
        {
          title: "📊 Tipos de Mercados & Apalancamiento",
          items: [
            "Mercado Spot: compra y posesión física del activo sin riesgo de liquidación forzada.",
            "Futuros Tradicionales vs Perpetuos (Perps): contratos sin vencimiento atados por el Funding Rate.",
            "Apalancamiento (Leverage): amplifica el poder de compra y multiplica proporcionalmente las pérdidas.",
            "Posiciones Long (comprar esperando subida) vs Short (vender esperando caída).",
            "Margin Call y Liquidación: qué sucede cuando el margen de mantenimiento se agota.",
            "Margen Aislado (Isolated: riesgo confinado al trade) vs Margen Cruzado (Cross: arriesga toda la cuenta).",
          ],
        },
        {
          title: "🔒 Protocolo de Seguridad Contra Estafas",
          items: [
            "Autenticación en dos pasos (2FA) mediante Apps (Google Authenticator, Yubikey) — jamás por SMS.",
            "Phishing y dominios clonados: verificación estricta de URLs y bookmarks.",
            "Tokens trampa (Honeypots), Drainers en firmas Web3 y Revoke.cash para permisos.",
            "Esquemas Pump & Dump en Telegram/Twitter y manipulación de volumen por ballenas.",
          ],
        },
      ],
      proTip: "Abre hoy mismo una cuenta demo en Bybit Testnet o Binance Futures Testnet. Antes de meter $1 real, practica 50 compras y ventas simuladas hasta que la interfaz sea como una extensión de tu mano.",
    },
    {
      id: "f2",
      num: "02",
      title: "Análisis Técnico (AT) — La Anatomía del Gráfico",
      duration: "⏱ 2–3 meses",
      level: "BÁSICO–INTERMEDIO",
      color: "from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-300",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      goal: "Aprender a leer el lenguaje visual del precio, marcar soportes y resistencias institucionales y usar indicadores como confirmación, no como bola de cristal.",
      topics: [
        {
          title: "🕯️ Velas Japonesas (Price Action)",
          items: [
            "Anatomía: Cuerpo (Open-Close), Mechas/Sombras (High-Low) y qué nos dice el spread entre ambas.",
            "Velas de Indecisión: Doji, Rickshaw Man, Dragonfly Doji, Gravestone Doji.",
            "Velas de Rechazo y Reversión: Hammer (Martillo), Hanging Man, Inverted Hammer, Shooting Star.",
            "Patrones de Giro Fuerte: Engulfing Alcista/Bajista (Vela Envolvente), Piercing Line, Dark Cloud Cover.",
            "Patrones de 3 Velas: Morning Star (Estrella de la Mañana), Evening Star, Three White Soldiers.",
            "Marubozu de Impulso: volumen puro y convicción absoluta institucional.",
          ],
        },
        {
          title: "📈 Estructura de Mercado & Tendencias (Dow Theory)",
          items: [
            "Tendencia Alcista: Sucesión de Máximos Más Altos (HH) y Mínimos Más Altos (HL).",
            "Tendencia Bajista: Sucesión de Máximos Más Bajos (LH) y Mínimos Más Bajos (LL).",
            "Rango / Consolidación Lateral: acumulación de órdenes antes de una expansión violenta.",
            "Líneas de Tendencia válidas: regla de los 3 toques y falsos quiebres (fakeouts).",
            "Análisis Multi-Timeframe (Top-Down): 1D/4h para contexto macro, 1h/15m para gatillo de entrada.",
          ],
        },
        {
          title: "🧱 Soportes, Resistencias & Fibonacci",
          items: [
            "Zonas de Oferta y Demanda: por qué los niveles son franjas de precio y no líneas exactas.",
            "Principio de Polaridad (S/R Flip): el soporte roto se convierte en resistencia futura y viceversa.",
            "Niveles Psicológicos y Números Redondos (ej. BTC $60k, $70k, $100k) como imanes de liquidez.",
            "Retrocesos de Fibonacci: Niveles áureos 38.2%, 50%, 61.8% (Golden Pocket) y 78.6%.",
            "Extensiones de Fibonacci (1.272, 1.618) para proyectar objetivos de Take Profit.",
          ],
        },
        {
          title: "📊 Indicadores de Tendencia, Momentum & Volumen",
          items: [
            "Medias Móviles: EMA 20/50 (tendencia a corto plazo), EMA 200 (la frontera alcista/bajista institucional).",
            "Cruces Clásicos: Golden Cross (EMA 50 cruza sobre EMA 200) y Death Cross.",
            "RSI (Relative Strength Index): Sobrecompra (>70), Sobreventa (<30) y Divergencias Regulares/Ocultas.",
            "MACD (Moving Average Convergence Divergence): cruces de señal y lectura del histograma.",
            "Bandas de Bollinger: compresión de volatilidad (squeeze) previa a explosión de precio.",
            "Volumen & Volume Profile (VPVR): Point of Control (POC), Value Area High (VAH) y Low (VAL).",
          ],
        },
      ],
      proTip: "El error número 1 de los novatos es llenar el gráfico con 10 indicadores y sufrir de parálisis por análisis. Tu gráfico debe estar limpio: Estructura + S/R + Volumen + 1 indicador de momentum (RSI).",
    },
    {
      id: "f3",
      num: "03",
      title: "Gestión de Riesgo & Matemática del Trader",
      duration: "⏱ 1 mes + Práctica Continua",
      level: "CRÍTICO / NO NEGOCIABLE",
      color: "from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-300",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      goal: "Construir un escudo matemático infranqueable para no quebrar jamás, sin importar cuántas operaciones perdedoras consecutivas ocurran.",
      topics: [
        {
          title: "💰 Regla del 1%–2% & Tamaño de Posición",
          items: [
            "Nunca arriesgues más del 1% al 2% de tu capital total por trade individual.",
            "La fórmula sagrada: Tamaño de Posición = (Capital Total × % Riesgo) / |Precio Entrada - Stop Loss|.",
            "Diferenciar Tamaño de Posición de Riesgo: puedes entrar con $10,000 pero si tu SL está al 1%, tu riesgo es solo $100.",
            "Interés Compuesto en Trading: cómo hacer crecer tu cuenta sin subir el % de riesgo.",
          ],
        },
        {
          title: "🛑 Stop Loss: El Contrato Sagrado",
          items: [
            "Ubicación técnica del SL: siempre detrás de un swing high/low o nivel de invalidez estructural.",
            "Jamás alejar el Stop Loss cuando el precio va en contra: la causa #1 de cuentas quemadas.",
            "Trailing Stop: asegurar ganancias a medida que el trade corre a tu favor.",
            "Stop Loss basado en volatilidad con ATR (Average True Range) para evitar mechas de liquidación.",
          ],
        },
        {
          title: "🎯 Ratio Riesgo/Beneficio (R:R) & Expectativa",
          items: [
            "Regla de oro: R:R mínimo de 1:2 (arriesgar $1 para ganar al menos $2).",
            "Win Rate vs R:R: con un R:R 1:2 solo necesitas ganar el 34% de los trades para estar en tablas.",
            "Fórmula de Expectativa Matemática: E = (Win Rate × Ganancia Media) - (Loss Rate × Pérdida Media).",
            "Escalamiento de Salidas (Scaling Out): Tomar 50% de ganancia en TP1, mover SL a Breakeven y dejar correr el resto.",
          ],
        },
        {
          title: "📉 Control del Drawdown & Rachas Perdedoras",
          items: [
            "Tabla de recuperación: si pierdes 50% de tu cuenta necesitas ganar 100% solo para recuperar el saldo inicial.",
            "Racha de 5 pérdidas seguidas es estadísticamente normal incluso en sistemas con 60% de acierto.",
            "Regla de los 3 strikes: tras 3 pérdidas en un mismo día, la pantalla se apaga obligatoriamente.",
          ],
        },
      ],
      proTip: "Un trader profesional no busca tener la razón en cada trade; busca gestionar el riesgo matemáticamente para que cuando gane gane mucho, y cuando pierda pierda una migaja.",
    },
    {
      id: "f4",
      num: "04",
      title: "Análisis On-Chain, Ciclos Macro & Fundamentales",
      duration: "⏱ 1–2 meses",
      level: "INTERMEDIO–AVANZADO",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      goal: "Ver lo que las ballenas y los mineros hacen detrás de escena leyendo la blockchain y entender las fuerzas macroeconómicas que mueven a Bitcoin.",
      topics: [
        {
          title: "🔗 Métricas On-Chain (Glassnode & CryptoQuant)",
          items: [
            "Exchange Netflow: entradas masivas de BTC a exchanges = presión de venta; salidas a cold storage = acumulación.",
            "MVRV Z-Score: evalúa si Bitcoin está sobrevalorado o infravalorado respecto a su 'precio realizado'.",
            "SOPR (Spent Output Profit Ratio): detecta si el mercado está vendiendo con ganancias o capitulando en pérdidas.",
            "Open Interest (OI) & Funding Rates: cómo anticipar 'long squeezes' y 'short squeezes' brutales.",
            "Whale Wallet Tracking: seguimiento de movimientos de billeteras con más de 1,000 BTC.",
          ],
        },
        {
          title: "📅 Ciclos de 4 Años & Halving de Bitcoin",
          items: [
            "El Halving: reducción a la mitad de la emisión de nuevos BTC cada 210,000 bloques (~4 años).",
            "Fases del Ciclo: Criptoinvierno (Capitulación) -> Acumulación -> Expansión Parabólica -> Euforia/Distribución.",
            "Altseason Index y la rotación de liquidez: BTC -> Ethereum -> L1s/L2s de alta capitalización -> Memes/Microcaps.",
          ],
        },
        {
          title: "🌍 Factores Macroeconómicos & Correlación",
          items: [
            "Política Monetaria de la Reserva Federal (Fed): Tasas de interés, Quantitative Easing (QE) y Tightening (QT).",
            "DXY (Índice del Dólar estadounidense): correlación inversa histórica con Bitcoin.",
            "ETFs Spot de Bitcoin y Ethereum: flujos institucionales netos diarios (BlackRock, Fidelity).",
            "Correlación con índices tecnológicos (Nasdaq 100 y S&P 500) en épocas de 'Risk-On' vs 'Risk-Off'.",
          ],
        },
        {
          title: "🔍 Análisis Fundamental de Criptoproyectos",
          items: [
            "Auditoría de Tokenomics: Inflación anual, Cronograma de Desbloqueo (Vesting Cliff) y Allocations a VCs.",
            "Circulating Supply vs Total Supply / Fully Diluted Valuation (FDV) — el peligro de las monedas 'baja circulación, alto FDV'.",
            "Métricas de Adopción Real: TVL (Total Value Locked en DefiLlama), Ingresos por comisiones de red y Usuarios Activos Diarios (DAU).",
          ],
        },
      ],
      proTip: "Cuando el Fear & Greed Index marque Miedo Extremo (<20) y las métricas on-chain muestren acumulación de ballenas, es momento de buscar compras spot, no de vender por pánico.",
    },
    {
      id: "f5",
      num: "05",
      title: "Psicología del Trader & Dominio Emocional",
      duration: "⏱ Constante / De por vida",
      level: "EL FACTOR DETERMINANTE",
      color: "from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-300",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      goal: "Erradicar los sesgos psicológicos destructivos (FOMO, Revenge Trading, Avaricia) y convertirte en un ejecutor disciplinado y sereno.",
      topics: [
        {
          title: "🧠 Sesgos Cognitivos que Destruyen Cuentas",
          items: [
            "FOMO (Fear Of Missing Out): comprar en el techo verde tras una vela parabólica por miedo a quedarse fuera.",
            "Revenge Trading: abrir posiciones impulsivas y con mayor tamaño inmediatamente después de una pérdida para 'recuperar'.",
            "Overtrading: operar por aburrimiento o dopamina cuando el mercado no ofrece ningún setup claro.",
            "Sesgo de Confirmación: buscar solo noticias y tweets que apoyen tu posición e ignorar las señales bajistas evidentes.",
            "Efecto de Disposición: cerrar rápidamente trades ganadores con migajas por miedo a perder, y aguantar trades perdedores esperando el milagro.",
          ],
        },
        {
          title: "📓 El Diario de Trading (Trading Journal)",
          items: [
            "Campos obligatorios: Fecha, Par, Tipo de setup, Razón de entrada, Screenshot de entrada, SL, TP, R:R, Screenshot de salida y Emoción sentida.",
            "Auditoría mensual: calcular Win Rate, Ratio de Acierto por patrón, mejor día de la semana y mayor causa de pérdidas.",
            "Usa herramientas como Notion, Google Sheets o Edgewonk para documentar cada trade.",
          ],
        },
        {
          title: "🧘 Rutina & Mindset Profesional",
          items: [
            "Aceptar la incertidumbre: cualquier trade individual tiene un resultado probabilístico independiente.",
            "Foco en el PROCESO, nunca en el DINERO: si seguiste tus reglas al 100%, el trade fue excelente aunque haya tocado el Stop Loss.",
            "Condición física y mental: no operes con falta de sueño, resaca, estrés laboral o emociones alteradas.",
          ],
        },
      ],
      proTip: "Lee 'Trading in the Zone' de Mark Douglas. Si lo aplicas, habrás avanzado más en 1 semana de lo que la mayoría logra en 3 años tropezando con sus propias emociones.",
    },
    {
      id: "f6",
      num: "06",
      title: "Trading Institucional, SMC, Order Flow & Automatización",
      duration: "⏱ 3–6 meses",
      level: "AVANZADO / PROFESIONAL",
      color: "from-violet-500/20 to-fuchsia-500/10 border-violet-500/40 text-violet-300",
      badge: "bg-violet-500/20 text-violet-300 border-violet-500/30",
      goal: "Operar alineado con el dinero inteligente (Smart Money), entender la liquidez oculta, leer el libro de órdenes y automatizar estrategias con bots y Pine Script.",
      topics: [
        {
          title: "🏦 Smart Money Concepts (SMC) & ICT",
          items: [
            "Order Blocks (OB): la última vela contraria antes de un movimiento impulsivo donde reposan órdenes institucionales sin mitigar.",
            "Fair Value Gaps (FVG) / Imbalances: desbalances de liquidez de 3 velas que el precio tiende a rellenar como un imán.",
            "BOS (Break of Structure) vs CHOCH (Change of Character): diferenciando continuación de cambio estructural genuino.",
            "Liquidity Sweeps (Barridas de Liquidez): cazas de Stop Loss sobre máximos/mínimos iguales (Equal Highs/Lows) antes del movimiento real.",
            "Zonas Premium vs Discount: comprar siempre en descuento (<50% del rango) y vender en premium (>50%).",
          ],
        },
        {
          title: "📐 Metodología Wyckoff & VSA",
          items: [
            "Fases del Mercado: Acumulación, Reacumulación, Distribución y Redistribución.",
            "Eventos Clave: Selling Climax (SC), Automatic Rally (AR), Secondary Test (ST), Spring (trampa bajista institucional) y Sign of Strength (SOS).",
            "Volume Spread Analysis (VSA): correlación entre el rango de la vela y el volumen para detectar esfuerzo vs resultado.",
          ],
        },
        {
          title: "🌊 Order Flow & Tape Reading",
          items: [
            "Footprint Charts: visualización bid/ask en cada nivel de precio de la vela.",
            "Delta Acumulado (CVD): divergencias entre el precio y el volumen neto comprador/vendedor.",
            "Iceberg Orders: grandes órdenes institucionales fragmentadas en bloques diminutos en el libro de órdenes.",
            "Herramientas Pro: Bookmap, Sierra Chart y Coinglass Liquidations Heatmap.",
          ],
        },
        {
          title: "🤖 Automatización, Bots & Pine Script",
          items: [
            "Pine Script v5 en TradingView: creación y backtesting de indicadores y estrategias algorítmicas.",
            "Grid Trading Bots: captura automática de volatilidad en rangos laterales sin predicción direccional.",
            "DCA Bots: compras escalonadas con take profit dinámico en retrocesos.",
            "Python + CCXT: conexión a APIs de Binance/Bybit para algoritmos cuantitativos y arbitraje de funding rate.",
          ],
        },
      ],
      proTip: "No confundas la complejidad técnica con rentabilidad. El Smart Money no es magia: es simplemente entender dónde están atrapados los traders minoristas y dónde están los pools de liquidez.",
    },
  ];

  const strategiesData = [
    {
      title: "HODLing & Inversión Posicional",
      icon: "🐢",
      risk: "Riesgo Bajo / Plazo Largo (1 a 4 años)",
      color: "border-emerald-500/40 bg-emerald-500/5",
      badge: "bg-emerald-500/20 text-emerald-300",
      desc: "Comprar activos de altísima convicción fundamental en fases de acumulación o sobreventa y mantenerlos durante todo el ciclo alcista.",
      points: [
        "Dollar Cost Averaging (DCA): compras programadas semanales o mensuales fijas.",
        "Compras agresivas cuando el MVRV < 1 y el Fear & Greed < 25.",
        "Custodia 100% en Cold Storage (Hardware Wallet).",
        "Estrategia de toma de ganancias escalonada en euforia (vender 20% en cada nuevo ATH).",
        "Cero estrés frente a la volatilidad intradiaria.",
      ],
      timeframe: "Semanal (1W) / Mensual (1M)",
      idealFor: "Personas con trabajo a tiempo completo que no quieren estar pegadas a la pantalla.",
    },
    {
      title: "Swing Trading",
      icon: "🌊",
      risk: "Riesgo Medio / Plazo Días a Semanas",
      color: "border-cyan-500/40 bg-cyan-500/5",
      badge: "bg-cyan-500/20 text-cyan-300",
      desc: "Capturar oscilaciones completas de tendencia montándose en retrocesos a soportes clave y saliendo en resistencias mayores.",
      points: [
        "Análisis de contexto en 1D y 4h; gatillo de entrada en 1h o 15m.",
        "Entradas en confluencia: Soporte + Nivel 61.8% Fibonacci + Divergencia RSI.",
        "Stop Loss debajo del último Higher Low o Lower High estructural.",
        "R:R objetivo mínimo: 1:2.5 a 1:4.",
        "Máximo 3 a 5 operaciones abiertas simultáneamente.",
      ],
      timeframe: "Gráficos de 4 Horas (4h) y Diario (1D)",
      idealFor: "El estilo más equilibrado y recomendado para traders en desarrollo.",
    },
    {
      title: "Day Trading (Intradía)",
      icon: "⚡",
      risk: "Riesgo Alto / Plazo Horas (Mismo día)",
      color: "border-amber-500/40 bg-amber-500/5",
      badge: "bg-amber-500/20 text-amber-300",
      desc: "Aprovechar la volatilidad de las sesiones de Londres y Nueva York abriendo y cerrando operaciones durante el mismo día sin riesgo overnight.",
      points: [
        "Operar exclusivamente en ventanas de alta liquidez (Apertura Londres 8:00 UTC / New York 13:30 UTC).",
        "Identificar el High y Low del día anterior (PDH / PDL) y Asian Range.",
        "Operaciones de ruptura y retesteo de niveles intradía.",
        "Todas las posiciones se cierran antes de ir a dormir (sin riesgo de noticias nocturnas).",
        "Máximo 2 a 3 trades por jornada.",
      ],
      timeframe: "Gráficos de 15 Minutos (15m) y 5 Minutos (5m)",
      idealFor: "Traders con tiempo disponible y estricta disciplina emocional.",
    },
    {
      title: "Scalping de Alta Frecuencia",
      icon: "🎯",
      risk: "Riesgo Muy Alto / Plazo Segundos a Minutos",
      color: "border-rose-500/40 bg-rose-500/5",
      badge: "bg-rose-500/20 text-rose-300",
      desc: "Entrar y salir de posiciones buscando pequeños movimientos de 0.2% a 0.8% con apalancamiento controlado y ejecución ultra rápida.",
      points: [
        "Enfoque exclusivo en pares de máxima liquidez (BTC/USDT, ETH/USDT).",
        "Requiere nivel VIP de exchange con comisiones mínimas de Maker/Taker.",
        "Lectura de libro de órdenes (Order Book DOM) y Tape Reading.",
        "Stop Loss milimétrico e implacable.",
        "NO recomendado para principiantes: desgastante psicológicamente.",
      ],
      timeframe: "Gráficos de 1 Minuto (1m), 3 Minutos (3m) y Ticks",
      idealFor: "Traders avanzados con setups dedicados y alta velocidad de reacción.",
    },
    {
      title: "Breakout & Retest Trading",
      icon: "📐",
      risk: "Riesgo Medio–Alto / Variable",
      color: "border-purple-500/40 bg-purple-500/5",
      badge: "bg-purple-500/20 text-purple-300",
      desc: "Capturar el inicio explosivo de nuevas tendencias cuando el precio rompe una compresión o resistencia con volumen institucional.",
      points: [
        "Identificar patrones de consolidación: triángulos, cuñas, rangos de semanas.",
        "Regla de oro: NO entrar en la vela de ruptura; esperar el Retesteo del nivel roto.",
        "Confirmación obligatoria: volumen de ruptura significativamente superior a la media de 20 periodos.",
        "Stop Loss justo dentro de la estructura rota para un ratio R:R sobresaliente.",
        "Filtrar falsos quiebres (fakeouts) observando el Open Interest.",
      ],
      timeframe: "1 Hora (1h) / 4 Horas (4h)",
      idealFor: "Cazadores de movimientos direccionales fuertes.",
    },
    {
      title: "Mean Reversion / Grid Trading",
      icon: "🔄",
      risk: "Riesgo Medio / Lateralidad",
      color: "border-blue-500/40 bg-blue-500/5",
      badge: "bg-blue-500/20 text-blue-300",
      desc: "Explotar la tendencia natural del precio a volver a su valor medio cuando oscila dentro de canales o rangos definidos.",
      points: [
        "Comprar en la base del soporte del canal y vender en la resistencia superior.",
        "Uso de Bandas de Bollinger (2 desviaciones estándar) y RSI en extremos (<25 o >75).",
        "Ideal para bots de Grid Trading en mercados laterales.",
        "Stop Loss estricto fuera de los límites del rango por si ocurre una ruptura.",
      ],
      timeframe: "1 Hora (1h) a 1 Día (1D)",
      idealFor: "Fases de consolidación de mercado y estrategias algorítmicas pasivas.",
    },
  ];

  const patternsCatalog = [
    {
      name: "Head & Shoulders (Hombro-Cabeza-Hombro)",
      type: "figura",
      bias: "bajista",
      reliability: "⭐⭐⭐⭐⭐ (9/10)",
      desc: "Tres picos sucesivos donde el central es el más alto. Rompe la línea de cuello (neckline) hacia abajo.",
      entry: "En el retesteo del Neckline roto tras el cierre de vela.",
      sl: "Por encima del hombro derecho.",
      tp: "Proyección de la distancia vertical desde la cabeza hasta el cuello.",
    },
    {
      name: "Inverse Head & Shoulders (H-C-H Invertido)",
      type: "figura",
      bias: "alcista",
      reliability: "⭐⭐⭐⭐⭐ (9/10)",
      desc: "Tres valles donde el central es el más profundo. Marca el fin de una tendencia bajista y el inicio de un rally alcista.",
      entry: "En el retesteo del Neckline roto al alza.",
      sl: "Por debajo del hombro derecho.",
      tp: "Proyección de la altura de la cabeza sumada al punto de ruptura.",
    },
    {
      name: "Doble Techo (Double Top - Forma de 'M')",
      type: "figura",
      bias: "bajista",
      reliability: "⭐⭐⭐⭐ (8/10)",
      desc: "Dos intentos fallidos consecutivos de romper una resistencia al mismo nivel. Agotamiento de compradores.",
      entry: "Al romper y cerrar por debajo del soporte del valle central.",
      sl: "Por encima de los dos picos de resistencia.",
      tp: "Distancia entre la resistencia y el valle central proyectada hacia abajo.",
    },
    {
      name: "Doble Suelo (Double Bottom - Forma de 'W')",
      type: "figura",
      bias: "alcista",
      reliability: "⭐⭐⭐⭐ (8/10)",
      desc: "Dos testeos exitosos a un soporte clave sin poder perforarlo. Los vendedores están exhaustos.",
      entry: "Al romper la resistencia del pico intermedio.",
      sl: "Por debajo de los dos mínimos.",
      tp: "Altura de la figura proyectada al alza.",
    },
    {
      name: "Bull Flag (Bandera Alcista)",
      type: "figura",
      bias: "alcista",
      reliability: "⭐⭐⭐⭐⭐ (9/10)",
      desc: "Impulso vertical fuerte (mástil) seguido de un canal descendente estrecho de consolidación. Muy común en cripto.",
      entry: "Ruptura de la línea de tendencia superior del canal con volumen.",
      sl: "Por debajo del mínimo más bajo de la bandera.",
      tp: "Longitud del mástil inicial proyectada desde la base del breakout.",
    },
    {
      name: "Bear Flag (Bandera Bajista)",
      type: "figura",
      bias: "bajista",
      reliability: "⭐⭐⭐⭐⭐ (9/10)",
      desc: "Caída vertical agresiva seguida de un canal alcista débil. Señal de continuación de la sangría.",
      entry: "Ruptura del soporte inferior del canal.",
      sl: "Por encima del máximo de la bandera.",
      tp: "Longitud del mástil bajista proyectada a la baja.",
    },
    {
      name: "Triángulo Ascendente",
      type: "figura",
      bias: "alcista",
      reliability: "⭐⭐⭐⭐ (8/10)",
      desc: "Resistencia horizontal plana mientras los mínimos son cada vez más altos. Acumulación agresiva de compradores.",
      entry: "Cierre de vela por encima de la resistencia horizontal.",
      sl: "Debajo del último mínimo ascendente.",
      tp: "Altura máxima del triángulo proyectada hacia arriba.",
    },
    {
      name: "Triángulo Descendente",
      type: "figura",
      bias: "bajista",
      reliability: "⭐⭐⭐⭐ (8/10)",
      desc: "Soporte horizontal plano mientras los máximos son cada vez más bajos. Los vendedores están presionando el piso.",
      entry: "Cierre por debajo del soporte horizontal.",
      sl: "Por encima del último máximo descendente.",
      tp: "Altura máxima del triángulo proyectada a la baja.",
    },
    {
      name: "Martillo / Hammer (Vela Japonesa)",
      type: "vela",
      bias: "alcista",
      reliability: "⭐⭐⭐⭐ (8/10)",
      desc: "Mecha inferior que mide al menos 2x el tamaño del cuerpo pequeño superior en una zona de soporte clave.",
      entry: "En la apertura de la siguiente vela tras confirmación alcista.",
      sl: "1 o 2 pips por debajo de la mecha inferior del martillo.",
      tp: "Siguiente resistencia relevante (mínimo R:R 1:2).",
    },
    {
      name: "Shooting Star / Estrella Fugaz",
      type: "vela",
      bias: "bajista",
      reliability: "⭐⭐⭐⭐ (8/10)",
      desc: "Mecha superior larga que rechaza con fuerza una resistencia tras un movimiento alcista, con cuerpo pequeño inferior.",
      entry: "Al cierre de la vela o en la apertura de la siguiente.",
      sl: "Por encima de la mecha superior.",
      tp: "Próximo soporte o media móvil de 50 periodos.",
    },
    {
      name: "Engulfing Alcista (Vela Envolvente)",
      type: "vela",
      bias: "alcista",
      reliability: "⭐⭐⭐⭐⭐ (9/10)",
      desc: "Vela verde cuyo cuerpo cubre totalmente el cuerpo de la vela roja previa en soporte. Cambio abrupto de control.",
      entry: "Al cierre de la vela envolvente.",
      sl: "Por debajo del mínimo de la vela envolvente.",
      tp: "Resistencias previas o FVG superior.",
    },
    {
      name: "Engulfing Bajista (Vela Envolvente)",
      type: "vela",
      bias: "bajista",
      reliability: "⭐⭐⭐⭐⭐ (9/10)",
      desc: "Vela roja grande que 'engulle' por completo a la vela verde anterior en resistencia. Dominio vendedor total.",
      entry: "Al cierre de la vela envolvente bajista.",
      sl: "Por encima del máximo de la vela envolvente.",
      tp: "Siguiente zona de soporte o demanda institucional.",
    },
  ];

  const filteredPatterns = useMemo(() => {
    return patternsCatalog.filter((p) => {
      if (patternFilter === "all") return true;
      if (patternFilter === "alcista") return p.bias === "alcista";
      if (patternFilter === "bajista") return p.bias === "bajista";
      if (patternFilter === "vela") return p.type === "vela";
      if (patternFilter === "figura") return p.type === "figura";
      return true;
    });
  }, [patternsCatalog, patternFilter]);

  const toolsArsenal = [
    { name: "TradingView", cat: "Gráficos & Análisis", desc: "El estándar mundial de graficación técnica. Pinescript, alertas y miles de indicadores gratuitos.", url: "tradingview.com", free: "Gratis + Pro" },
    { name: "Bybit / Binance", cat: "Exchanges CEX", desc: "Plataformas líderes con mayor liquidez en Spot y Futuros. Cuentan con Testnet/Demo gratuita.", url: "bybit.com / binance.com", free: "Demo Gratis" },
    { name: "Coinglass", cat: "Derivados & Futuros", desc: "Mapas de calor de liquidaciones, Open Interest, Funding Rates y ratio Long/Short en tiempo real.", url: "coinglass.com", free: "100% Gratis" },
    { name: "Glassnode & CryptoQuant", cat: "Métricas On-Chain", desc: "Datos puros de blockchain: flujos de ballenas, reservas en exchanges, MVRV y SOPR.", url: "glassnode.com", free: "Versión Free útil" },
    { name: "DefiLlama", cat: "Ecosistema DeFi", desc: "La base de datos definitiva de TVL, yields, protocolos, blockchains, tokens y airdrops.", url: "defillama.com", free: "100% Gratis" },
    { name: "Alternative.me (Fear & Greed)", cat: "Sentimiento", desc: "Índice de miedo y codicia del mercado cripto. El mejor termómetro de psicología de masas.", url: "alternative.me/crypto", free: "100% Gratis" },
    { name: "CoinMarketCap & CoinGecko", cat: "Precios & Datos", desc: "Directorio completo de criptomonedas, market cap, volumen 24h, tokenomics y contratos oficiales.", url: "coingecko.com", free: "100% Gratis" },
    { name: "Notion / Edgewonk", cat: "Diario de Trading", desc: "Para registrar, auditar y estudiar tus operaciones. Sin un diario es imposible ser rentable.", url: "notion.so", free: "Gratis" },
    { name: "DeBank & Arkham Intelligence", cat: "Rastreo de Wallets", desc: "Visualiza portfolios de ballenas y rastrea movimientos de fondos en tiempo real.", url: "arkhamintelligence.com", free: "Gratis" },
    { name: "3Commas / Pionex", cat: "Bots & Automatización", desc: "Automatización de estrategias de Grid Trading y DCA sin saber programar código.", url: "pionex.com", free: "Freemium" },
  ];

  const youtubeChannels = [
    { name: "InvestAnswers", lang: "🇺🇸 Inglés", focus: "Macro + On-Chain + Modelos Matemáticos", desc: "Análisis técnico y fundamental riguroso, libre de hype. Excelentes modelos de ciclo de Bitcoin." },
    { name: "Benjamin Cowen (Into The Cryptoverse)", lang: "🇺🇸 Inglés", focus: "Análisis Técnico & Regresión Logarítmica", desc: "Enfoque puramente matemático y probabilístico sin emociones. Ideal para entender la dominancia de BTC." },
    { name: "The Chart Guys", lang: "🇺🇸 Inglés", focus: "Price Action Puro & Análisis Técnico", desc: "Lectura magistral de soportes, resistencias, consolidaciones y estructuras de mercado en vivo." },
    { name: "Coin Bureau", lang: "🇺🇸 Inglés", focus: "Análisis Fundamental & Ecosistema Cripto", desc: "Las mejores investigaciones sobre proyectos, tokenomics, regulación y tecnología blockchain." },
    { name: "Binance Academy", lang: "🌍 Multi / Español", focus: "Educación desde Cero", desc: "Cursos y tutoriales estructurados paso a paso sobre blockchain, trading y seguridad." },
    { name: "Satoshi Defenders", lang: "🇪🇸 Español", focus: "Educación Cripto & Macro", desc: "Contenido transparente enfocado en entender los ciclos económicos y la realidad del mercado." },
    { name: "Crypto Jefe", lang: "🇪🇸 Español", focus: "Trading & Psicología", desc: "Enfoque práctico de análisis técnico y gestión de riesgo para el público hispanohablante." },
    { name: "TraderLion", lang: "🇺🇸 Inglés", focus: "Mindset, Psicología & Entrevistas", desc: "Entrevistas con traders campeones mundiales y profundización en el control mental." },
  ];

  const legendaryBooks = [
    {
      title: "Trading in the Zone",
      author: "Mark Douglas",
      tag: "🧠 Psicología (Obligatorio #1)",
      desc: "El libro definitivo sobre la mentalidad del trader. Explica por qué pensar en probabilidades y aceptar la pérdida es el secreto de la consistencia.",
    },
    {
      title: "Technical Analysis of the Financial Markets",
      author: "John J. Murphy",
      tag: "📊 Análisis Técnico (La Biblia)",
      desc: "El manual más completo y respetado sobre patrones de gráficos, medias móviles, osciladores y teoría de Dow.",
    },
    {
      title: "Reminiscences of a Stock Operator",
      author: "Edwin Lefèvre",
      tag: "⚔️ Experiencia & Mercado",
      desc: "La biografía novelada de Jesse Livermore. Lecciones inmortales sobre el comportamiento de las masas y la gestión del capital.",
    },
    {
      title: "The Intelligent Investor",
      author: "Benjamin Graham",
      tag: "💎 Inversión Fundamental",
      desc: "Fundamentos de valoración, margen de seguridad y la metáfora del 'Señor Mercado' aplicada a la inversión a largo plazo.",
    },
    {
      title: "The Disciplined Trader",
      author: "Mark Douglas",
      tag: "🧘 Disciplina Emocional",
      desc: "Cómo desarrollar la autodisciplina sistemática para operar sin miedo, avaricia ni arrepentimiento.",
    },
  ];

  const goldenRules = [
    { num: "01", title: "Regla del 1%–2% de Riesgo", desc: "Nunca arriesgues más del 1% al 2% de tu capital total por trade. Si tienes $1,000, tu pérdida máxima por operación debe ser $10 a $20. Esto te permite sobrevivir 50 pérdidas seguidas sin quebrar." },
    { num: "02", title: "Stop Loss Sagrado y No Negociable", desc: "El Stop Loss se define ANTES de entrar al trade. Jamás operes sin él y NUNCA lo alejes cuando el precio se acerque. 'Esperaré a que se recupere' es la sentencia de muerte de una cuenta." },
    { num: "03", title: "Ratio Riesgo/Beneficio Mínimo 1:2", desc: "Si arriesgas $50, tu objetivo de ganancia debe ser al menos $100. Con un R:R 1:2, puedes fallar el 60% de tus operaciones y aun así terminar el mes ganando dinero." },
    { num: "04", title: "Cero Apalancamiento para Principiantes", desc: "Opera en SPOT hasta ser rentable durante 3 meses consecutivos. Cuando uses futuros, no excedas 2x a 3x. Con 10x de apalancamiento, un retroceso de solo 10% liquida el 100% de tu dinero." },
    { num: "05", title: "Regla de Pausa: 3 Pérdidas = Fin del Día", desc: "Si acumulas 3 Stop Loss seguidos en una jornada, cierra el computador inmediatamente. Tu mente entrará en estado de 'Revenge Trading' (deseo de venganza) y destruirás tu capital." },
    { num: "06", title: "El Efecto 'Estar Líquido' (Cash es Posición)", desc: "No tienes que estar en un trade las 24 horas. Estar en efectivo (USDT/USDC) a la espera de un setup perfecto con alta probabilidad es una estrategia ganadora de los mejores fondos." },
    { num: "07", title: "Diario de Trading Obligatorio", desc: "Anota cada trade con captura de pantalla y emoción sentida. Lo que no se mide no se puede mejorar. Al final de cada mes descubrirás exactamente qué errores te están costando dinero." },
    { num: "08", title: "Nunca Operes con Dinero Necesario", desc: "Usa únicamente capital de riesgo que puedas permitirte perder al 100%. Operar con dinero del alquiler o comida añade una presión psicológica que garantiza decisiones pésimas." },
    { num: "09", title: "Sigue la Tendencia Mayor (The Trend is Your Friend)", desc: "En un mercado alcista en gráfico diario, busca entradas en Long en los retrocesos. Oponerse a la tendencia macro intentando adivinar techos es la forma más rápida de perder capital." },
    { num: "10", title: "Desconfía de Señales y Grupos VIP", desc: "El 99% de los grupos de señales de Telegram y 'gurús' de TikTok ganan dinero de sus suscripciones o de liquidar a sus seguidores en Pumps & Dumps, no de operar." },
    { num: "11", title: "Escala tus Ganancias (Take Profit Parcial)", desc: "Cuando el trade alcance 1:1 o tu primer objetivo, vende el 50% de la posición y mueve el Stop Loss al precio de entrada (Breakeven). Ahora juegas con un trade con riesgo CERO." },
    { num: "12", title: "Cuida tu Salud Física y Sueño", desc: "El trading de criptomonedas exige la máxima agilidad cognitiva. La falta de sueño, la mala alimentación y el sedentarismo nublan el juicio y multiplican los errores emocionales." },
  ];

  const checklistItems = [
    { id: "c1", text: "Entiendo la diferencia entre Spot y Futuros / Perpetuos" },
    { id: "c2", text: "Tengo mi cuenta con 2FA por App activado (no por SMS)" },
    { id: "c3", text: "Sé identificar una tendencia alcista y bajista en gráfico diario" },
    { id: "c4", text: "Sé trazar soportes y resistencias como zonas y no como líneas fijas" },
    { id: "c5", text: "Sé calcular el tamaño de posición antes de dar clic a comprar" },
    { id: "c6", text: "Mi Stop Loss siempre está colocado en base a invalidez técnica" },
    { id: "c7", text: "Mi estrategia exige un Ratio Riesgo/Beneficio mínimo de 1:2" },
    { id: "c8", text: "Tengo mi Diario de Trading (Notion/Excel) listo para registrar trades" },
    { id: "c9", text: "Completé al menos 50 operaciones en cuenta demo con criterio fijo" },
    { id: "c10", text: "El capital asignado es 100% de riesgo (no lo necesito para vivir)" },
    { id: "c11", text: "Entiendo qué es el Funding Rate y cómo afecta a los perpetuos" },
    { id: "c12", text: "Comprendo el riesgo de liquidación con apalancamiento" },
    { id: "c13", text: "He leído al menos 'Trading in the Zone' de Mark Douglas" },
    { id: "c14", text: "Tengo la regla estricta de apagar la pantalla tras 3 pérdidas" },
    { id: "c15", text: "Sé distinguir un canal educativo serio de un canal de pump/señales" },
    { id: "c16", text: "Tengo un plan escrito de cuándo tomar ganancias y cuándo salir" },
  ];

  const completedCount = useMemo(() => {
    return Object.values(completedChecklist).filter(Boolean).length;
  }, [completedChecklist]);

  const checklistPct = useMemo(() => {
    return Math.round((completedCount / checklistItems.length) * 100);
  }, [completedCount, checklistItems.length]);

  const glossaryTerms = [
    { term: "ATH / ATL", def: "All-Time High (Máximo Histórico) / All-Time Low (Mínimo Histórico)." },
    { term: "DCA (Dollar Cost Averaging)", def: "Estrategia de inversión consistente en comprar una cantidad fija de dinero en intervalos regulares, sin importar el precio." },
    { term: "Funding Rate", def: "Pago periódico entre traders Long y Short en contratos perpetuos para mantener el precio del futuro alineado con el precio Spot." },
    { term: "Open Interest (OI)", def: "Número total de contratos de derivados (futuros/opciones) que permanecen abiertos y no liquidados en el mercado." },
    { term: "Liquidation (Liquidación)", def: "Cierre forzoso de una posición apalancada por parte del exchange cuando el margen del trader cae por debajo del margen de mantenimiento." },
    { term: "Slippage (Deslizamiento)", def: "Diferencia entre el precio esperado de una orden y el precio exacto al que se ejecuta en el mercado debido a la volatilidad o falta de liquidez." },
    { term: "FOMO", def: "Fear Of Missing Out (Miedo a quedarse fuera). Impulso emocional irracional de comprar cuando un activo ya ha subido demasiado." },
    { term: "FUD", def: "Fear, Uncertainty and Doubt (Miedo, Incertidumbre y Duda). Noticias o rumores negativos difundidos para provocar pánico vendedor." },
    { term: "HODL", def: "Término originado por un error tipográfico de 'HOLD'. Significa mantener criptomonedas a largo plazo sin vender." },
    { term: "Order Block (OB)", def: "En Smart Money Concepts, la última vela antes de un fuerte impulso donde las instituciones acumularon o distribuyeron grandes volúmenes." },
    { term: "Fair Value Gap (FVG)", def: "Desbalance de precio entre 3 velas donde la liquidez no fue eficiente, actuando como un imán para futuros retesteos." },
    { term: "BOS / CHOCH", def: "Break of Structure (quiebre de estructura que continúa la tendencia) y Change of Character (primer indicio de cambio de tendencia)." },
    { term: "MVRV Ratio", def: "Market Value to Realized Value. Compara la capitalización de mercado con la capitalización realizada en blockchain para detectar techos y suelos de ciclo." },
    { term: "Impermanent Loss", def: "Pérdida temporal sufrida al aportar liquidez en un pool de AMM en DeFi en comparación con simplemente mantener los tokens en la billetera." },
    { term: "MEV", def: "Maximal Extractable Value. Ganancia que los mineros/validadores obtienen reordenando, incluyendo o censurando transacciones en un bloque." },
    { term: "Halving", def: "Evento programado en el protocolo de Bitcoin cada 210,000 bloques (~4 años) que reduce a la mitad la recompensa por bloque minado." },
  ];

  const filteredGlossary = useMemo(() => {
    if (!glossarySearch.trim()) return glossaryTerms;
    const q = glossarySearch.toLowerCase();
    return glossaryTerms.filter(
      (t) => t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q)
    );
  }, [glossaryTerms, glossarySearch]);

  return (
    <div className="space-y-8 text-white">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/15 via-purple-500/10 to-cyan-500/15 border border-amber-500/30 p-6 sm:p-10 backdrop-blur-xl">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              Guía Maestra & Roadmap
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              <CandlestickChart className="w-3.5 h-3.5 text-cyan-400" />
              Desde Cero a Nivel Pro
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              Gestión de Riesgo Blindada
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white flex flex-wrap items-center gap-3">
            <span>Trading de</span>
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400 bg-clip-text text-transparent">
              Criptomonedas
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base max-w-3xl leading-relaxed">
            Tu mapa de ruta definitivo y libre de humo para entender blockchain, dominar el análisis técnico, proteger tu capital con rigor matemático, decodificar el dinero institucional y forjar una psicología invulnerable.
          </p>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-purple-500/20 flex flex-col">
              <span className="text-xs text-purple-300/70 font-medium">Fases de Estudio</span>
              <span className="text-xl font-bold text-cyan-400">6 Etapas</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-purple-500/20 flex flex-col">
              <span className="text-xs text-purple-300/70 font-medium">Estrategias Clave</span>
              <span className="text-xl font-bold text-amber-400">6 Estilos</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-purple-500/20 flex flex-col">
              <span className="text-xs text-purple-300/70 font-medium">Patrones Catalogados</span>
              <span className="text-xl font-bold text-emerald-400">12 Figuras & Velas</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-purple-500/20 flex flex-col">
              <span className="text-xs text-purple-300/70 font-medium">Checklist Pre-Trade</span>
              <span className="text-xl font-bold text-rose-400">{checklistPct}% Listo</span>
            </div>
          </div>
        </div>

        {/* Decorative Background Blob */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Critical Disclaimer Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3.5">
        <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-rose-200/90 leading-relaxed">
          <strong className="text-rose-300 font-semibold block">
            ⚠️ Aviso Importante de Gestión y Realidad del Mercado:
          </strong>
          El trading de criptomonedas y derivados conlleva un riesgo real de pérdida total del capital. Entre el 70% y 85% de los traders minoristas pierde dinero debido a falta de educación, exceso de apalancamiento y descontrol emocional. Este módulo es estrictamente educativo. Empieza siempre en cuentas demo y jamás arriesgues dinero vital.
        </div>
      </div>

      {/* Subtabs Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-500/30">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 border cursor-pointer select-none ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-purple-600 text-white border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-102"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-amber-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. SECCIÓN: 6 FASES DEL TRADER                             */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "fases") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">
                // 01 — Hoja de Ruta Gradual
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Compass className="w-6 h-6 text-cyan-400" />
                Las 6 Fases del Aprendizaje
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
              Sigue el orden metodológico. Saltar fases sin afianzar la anterior es la receta perfecta para perder capital.
            </p>
          </div>

          <div className="space-y-4">
            {phasesData.map((phase) => {
              const isOpen = openPhases[phase.id] || false;

              return (
                <div
                  key={phase.id}
                  className="rounded-3xl bg-white/5 border border-purple-500/20 overflow-hidden backdrop-blur-md transition-all"
                >
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="w-full p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-lg border bg-gradient-to-br ${phase.color}`}
                      >
                        {phase.num}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${phase.badge}`}
                          >
                            {phase.level}
                          </span>
                          <span className="text-xs text-purple-300/60 font-mono">
                            {phase.duration}
                          </span>
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-white">
                          {phase.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
                      <ChevronDown
                        className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-purple-500/20 p-5 sm:p-6 space-y-6 bg-black/20"
                      >
                        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-3">
                          <Target className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider block">
                              Objetivo Fundamental de la Fase:
                            </span>
                            <p className="text-sm text-cyan-100/90 mt-0.5">{phase.goal}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {phase.topics.map((t, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-3"
                            >
                              <h5 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-amber-400" />
                                {t.title}
                              </h5>
                              <ul className="space-y-2">
                                {t.items.map((item, iIdx) => (
                                  <li
                                    key={iIdx}
                                    className="text-xs sm:text-sm text-purple-200/80 pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-cyan-400 before:font-bold leading-relaxed"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                          <div className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                            <strong className="text-amber-300 font-semibold block">
                              💡 Consejo de Aplicación Práctica:
                            </strong>
                            {phase.proTip}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 2. SECCIÓN: CALCULADORA INTERACTIVA DE RIESGO              */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "calculadora") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-amber-400">
                // 02 — Herramienta de Ejecución
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Calculator className="w-6 h-6 text-amber-400" />
                Calculadora de Riesgo & Posición en Vivo
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
              Ingresa los parámetros de tu trade para calcular el tamaño exacto de posición, tu R:R y evitar liquidaciones forzosas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Controls */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-4">
              <h4 className="text-base font-bold text-purple-200 flex items-center gap-2 border-b border-purple-500/20 pb-3">
                <Crosshair className="w-4 h-4 text-purple-400" />
                Parámetros de Entrada del Trade
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-purple-300">
                    Capital de Cuenta ($ USD)
                  </label>
                  <input
                    type="number"
                    value={calcAccountBalance}
                    onChange={(e) => setCalcAccountBalance(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono text-sm focus:border-amber-400 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-purple-300">
                    Riesgo Deseado (% de Cuenta)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      value={calcRiskPct}
                      onChange={(e) => setCalcRiskPct(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono text-sm focus:border-amber-400 outline-none"
                    />
                    <span className="text-xs font-bold text-amber-400">%</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-cyan-300">
                    Precio de Entrada ($)
                  </label>
                  <input
                    type="number"
                    value={calcEntryPrice}
                    onChange={(e) => setCalcEntryPrice(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-cyan-500/30 text-white font-mono text-sm focus:border-cyan-400 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-rose-300">
                    Precio de Stop Loss ($)
                  </label>
                  <input
                    type="number"
                    value={calcStopLoss}
                    onChange={(e) => setCalcStopLoss(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-rose-500/30 text-white font-mono text-sm focus:border-rose-400 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-emerald-300">
                    Precio de Take Profit ($)
                  </label>
                  <input
                    type="number"
                    value={calcTakeProfit}
                    onChange={(e) => setCalcTakeProfit(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/30 text-white font-mono text-sm focus:border-emerald-400 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-purple-300">
                    Apalancamiento (1x = Spot)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={calcLeverage}
                    onChange={(e) => setCalcLeverage(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono text-sm focus:border-purple-400 outline-none"
                  />
                </div>
              </div>

              {/* Quick Risk Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-purple-300/70">Ajuste rápido de riesgo:</span>
                {[0.5, 1.0, 1.5, 2.0].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setCalcRiskPct(pct)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      calcRiskPct === pct
                        ? "bg-amber-500/30 text-amber-300 border-amber-400"
                        : "bg-white/5 text-purple-200/60 border-purple-500/20 hover:bg-white/10"
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Math Outputs */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-gradient-to-br from-purple-900/30 via-black/40 to-cyan-950/30 border border-purple-500/30 backdrop-blur-md flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-purple-500/20 pb-3">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  Resultados del Cálculo Matemático
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-rose-500/30">
                    <span className="text-[11px] text-rose-300/80 block">Dólares en Riesgo</span>
                    <span className="text-lg font-bold font-mono text-rose-400">
                      ${riskAmount.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-emerald-500/30">
                    <span className="text-[11px] text-emerald-300/80 block">Ganancia Potencial</span>
                    <span className="text-lg font-bold font-mono text-emerald-400">
                      ${potentialProfit.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-amber-500/30">
                    <span className="text-[11px] text-amber-300/80 block">Ratio R:R</span>
                    <span
                      className={`text-lg font-bold font-mono ${
                        riskRewardRatio >= 2 ? "text-emerald-400" : "text-amber-400"
                      }`}
                    >
                      1 : {riskRewardRatio.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-cyan-500/30">
                    <span className="text-[11px] text-cyan-300/80 block">Tamaño Posición ($)</span>
                    <span className="text-lg font-bold font-mono text-cyan-400">
                      ${totalPositionValue.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-purple-500/30">
                    <span className="text-[11px] text-purple-300/80 block">Unidades del Token</span>
                    <span className="text-lg font-bold font-mono text-purple-300">
                      {positionUnits.toFixed(4)}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-purple-500/30">
                    <span className="text-[11px] text-purple-300/80 block">Margen Requerido</span>
                    <span className="text-lg font-bold font-mono text-white">
                      ${marginRequired.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Alert */}
              <div
                className={`p-3.5 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                  riskRewardRatio >= 2
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                    : "bg-amber-500/10 border-amber-500/30 text-amber-200"
                }`}
              >
                {riskRewardRatio >= 2 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <strong>
                    {riskRewardRatio >= 2
                      ? "Excelente Ratio R:R (>= 1:2): "
                      : "Precaución con el Ratio R:R (< 1:2): "}
                  </strong>
                  Con este setup necesitas un Win Rate mínimo del{" "}
                  <strong className="font-mono text-white">{breakEvenWinRate.toFixed(1)}%</strong> para
                  estar en punto de equilibrio.
                  {calcLeverage > 5 && (
                    <span className="block text-rose-300 font-semibold mt-1">
                      ⚠️ Atención: El apalancamiento ({calcLeverage}x) es elevado. Reduce el apalancamiento para protegerte de mechas de volatilidad.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 3. SECCIÓN: 6 ESTRATEGIAS DE TRADING                       */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "estrategias") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-purple-400">
                // 03 — Metodologías Operativas
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Scale className="w-6 h-6 text-purple-400" />
                Las 6 Estrategias Principales
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
              Cada estrategia se adapta a un estilo de vida, horizonte temporal y perfil de riesgo diferente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {strategiesData.map((strat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border backdrop-blur-md flex flex-col justify-between space-y-4 ${strat.color}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{strat.icon}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${strat.badge}`}>
                      {strat.timeframe}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white">{strat.title}</h4>
                  <p className="text-xs text-purple-200/70 leading-relaxed">{strat.desc}</p>

                  <ul className="space-y-2 pt-2 border-t border-purple-500/20">
                    {strat.points.map((p, pIdx) => (
                      <li
                        key={pIdx}
                        className="text-xs text-purple-200/80 pl-4 relative before:content-['✓'] before:absolute before:left-0 before:text-emerald-400 before:font-bold leading-relaxed"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/20 text-[11px] text-purple-300/80">
                  <span className="font-semibold text-purple-200 block mb-0.5">Perfil Ideal:</span>
                  {strat.idealFor}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 4. SECCIÓN: CATÁLOGO DE PATRONES & VELAS                   */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "patrones") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-emerald-400">
                // 04 — Acción del Precio & Figuras
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <CandlestickChart className="w-6 h-6 text-emerald-400" />
                Catálogo de Patrones de Gráfico & Velas
              </h3>
            </div>

            {/* Pattern Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "Todos" },
                { id: "alcista", label: "🟢 Alcistas" },
                { id: "bajista", label: "🔴 Bajistas" },
                { id: "figura", label: "📐 Figuras" },
                { id: "vela", label: "🕯️ Velas" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setPatternFilter(f.id as any)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                    patternFilter === f.id
                      ? "bg-emerald-500 text-white border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                      : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPatterns.map((pat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-3 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-base font-bold text-white">{pat.name}</h4>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        pat.bias === "alcista"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          : "bg-rose-500/20 text-rose-300 border-rose-500/40"
                      }`}
                    >
                      {pat.bias}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-purple-300 border border-purple-500/30">
                      {pat.type}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">{pat.desc}</p>

                <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/20 space-y-1.5 text-xs">
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-semibold shrink-0">🎯 Entrada:</span>
                    <span className="text-purple-200/90">{pat.entry}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-semibold shrink-0">🛑 Stop Loss:</span>
                    <span className="text-purple-200/90">{pat.sl}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-semibold shrink-0">💰 Take Profit:</span>
                    <span className="text-purple-200/90">{pat.tp}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-purple-300/60 pt-1">
                  <span>Fiabilidad estadística en Cripto:</span>
                  <span className="font-semibold text-amber-300">{pat.reliability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 5. SECCIÓN: ON-CHAIN, WYCKOFF & SMART MONEY CONCEPTS       */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "onchain_smc") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">
                // 05 — Conceptos Institucionales
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-cyan-400" />
                Análisis On-Chain, Wyckoff & Smart Money
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
              Aprende a decodificar cómo operan los market makers, los fondos institucionales y las ballenas de Bitcoin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* On-Chain Metrics */}
            <div className="p-6 rounded-3xl bg-white/5 border border-cyan-500/30 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Métricas On-Chain</h4>
                  <span className="text-xs text-cyan-300/80 font-mono">Datos Puros de Blockchain</span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-purple-200/80">
                <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/20 space-y-1">
                  <strong className="text-cyan-300 block">Exchange Netflow:</strong>
                  Salidas sostenidas de BTC hacia billeteras frías indican fase de acumulación mayor.
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/20 space-y-1">
                  <strong className="text-cyan-300 block">MVRV Z-Score:</strong>
                  Puntuación &lt; 0.1 señala suelos históricos generacionales; &gt; 6 señala techos eufóricos.
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/20 space-y-1">
                  <strong className="text-cyan-300 block">Funding Rate & Open Interest:</strong>
                  Tasas de financiación extremadamente positivas con OI disparado alertan de liquidación de longs inminente.
                </div>
              </div>
            </div>

            {/* Smart Money Concepts */}
            <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/30 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Smart Money (SMC)</h4>
                  <span className="text-xs text-purple-300/80 font-mono">Liquidez Institucional</span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-purple-200/80">
                <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/20 space-y-1">
                  <strong className="text-purple-300 block">Order Blocks (OB):</strong>
                  Zonas donde las instituciones inyectan cientos de millones. El precio regresa a mitigar antes de expandir.
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/20 space-y-1">
                  <strong className="text-purple-300 block">Fair Value Gap (FVG):</strong>
                  Huecos de ineficiencia que actúan como imanes de liquidez para rebalancear el libro de órdenes.
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/20 space-y-1">
                  <strong className="text-purple-300 block">Liquidity Sweeps:</strong>
                  Falsos quiebres diseñados para activar los Stop Loss del público antes de mover el precio en la dirección real.
                </div>
              </div>
            </div>

            {/* Wyckoff Method */}
            <div className="p-6 rounded-3xl bg-white/5 border border-amber-500/30 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Método Wyckoff</h4>
                  <span className="text-xs text-amber-300/80 font-mono">Ciclos de Acumulación</span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-purple-200/80">
                <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/20 space-y-1">
                  <strong className="text-amber-300 block">Fase de Acumulación:</strong>
                  El 'Composite Man' compra silenciosamente en un rango mientras el público capitula en pánico.
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/20 space-y-1">
                  <strong className="text-amber-300 block">El 'Spring' (Manantial):</strong>
                  Una mecha violenta que perfora el soporte para barrer stops y comprobar la ausencia de oferta antes del despegue.
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/20 space-y-1">
                  <strong className="text-amber-300 block">Fase de Distribución:</strong>
                  Venta masiva institucional en máximos eufóricos (Upthrust) transferida a compradores minoristas con FOMO.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 6. SECCIÓN: ARSENAL DE HERRAMIENTAS                        */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "herramientas") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-purple-400">
                // 06 — Software & Plataformas
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Tu Arsenal de Herramientas Esenciales
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
              No necesitas pagar suscripciones caras para empezar. Estas plataformas ofrecen versiones gratuitas extraordinarias.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolsArsenal.map((t, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-3 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {t.cat}
                    </span>
                    <span className="text-[11px] text-cyan-300 font-semibold">{t.free}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-purple-200/70 leading-relaxed">{t.desc}</p>
                </div>

                <div className="pt-2 border-t border-purple-500/20 text-[11px] text-purple-300/60 font-mono flex items-center justify-between">
                  <span>{t.url}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 7. SECCIÓN: YOUTUBE & BIBLIOTECA DE LIBROS                 */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "youtube_libros") && (
        <div className="space-y-8">
          {/* YouTube Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-rose-400">
                  // 07.1 — Recursos Audiovisuales
                </span>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <YouTubeIcon className="w-6 h-6 text-rose-400" />
                  Canales de YouTube Recomendados
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
                Aprende de creadores transparentes con enfoque analítico y aléjate de los canales de hype o ventas de señales.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {youtubeChannels.map((yt, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-3 hover:border-rose-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-rose-300">{yt.lang}</span>
                      <span className="p-1.5 rounded-full bg-rose-500/20 text-rose-400">
                        <YouTubeIcon className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white">{yt.name}</h4>
                    <span className="text-[11px] font-semibold text-amber-300 block">{yt.focus}</span>
                    <p className="text-xs text-purple-200/70 leading-relaxed">{yt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legendary Books Library */}
          <div className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-amber-400">
                  // 07.2 — Biblioteca Imprescindible
                </span>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-amber-400" />
                  Los 5 Libros que Todo Trader Debe Leer
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
                El conocimiento perdurable no está en videos de 30 segundos, sino en estos clásicos inmortales.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {legendaryBooks.map((b, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-3 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block">
                      {b.tag}
                    </span>
                    <h4 className="text-lg font-bold text-white">{b.title}</h4>
                    <span className="text-xs text-purple-300/80 font-mono block">Autor: {b.author}</span>
                    <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 8. SECCIÓN: PSICOLOGÍA & 12 REGLAS DE ORO                  */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "riesgo_psico") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-rose-400">
                // 08 — Blindaje Emocional
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Brain className="w-6 h-6 text-rose-400" />
                Las 12 Reglas de Oro & Psicología
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
              El análisis técnico te dice DÓNDE entrar; tu psicología determina si serás rentable o quebrarás.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {goldenRules.map((rule) => (
              <div
                key={rule.num}
                className="p-5 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2.5 hover:border-rose-500/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-rose-400 px-2 py-0.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
                      REGLA #{rule.num}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{rule.title}</h4>
                  <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 9. SECCIÓN: PLAN DE APRENDIZAJE & CHECKLIST INTERACTIVO    */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "plan_checklist") && (
        <div className="space-y-8">
          {/* Realistic Timeline */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">
                  // 09.1 — Cronograma de Evolución
                </span>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Clock className="w-6 h-6 text-cyan-400" />
                  Plan de Aprendizaje Realista (12 Meses)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
                No existen atajos. Convertirse en un trader consistente requiere tiempo, disciplina y honestidad.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  period: "Meses 1–2",
                  title: "Fundamentos & Demo",
                  desc: "Aprende el vocabulario cripto, abre cuenta demo en Bybit Testnet, configura TradingView y no operes dinero real.",
                  color: "border-cyan-500/40 text-cyan-300",
                },
                {
                  period: "Meses 3–5",
                  title: "Análisis Técnico & 100 Trades",
                  desc: "Domina velas, soportes, tendencias y Fibonacci. Completa 100 operaciones registradas en tu diario.",
                  color: "border-purple-500/40 text-purple-300",
                },
                {
                  period: "Meses 5–7",
                  title: "Fuego Real Mínimo ($50–$100)",
                  desc: "Opera en Spot con cantidades mínimas. El objetivo no es ganar dinero, sino aprender a manejar el estrés emocional.",
                  color: "border-amber-500/40 text-amber-300",
                },
                {
                  period: "Meses 8–12",
                  title: "Consistencia & Reglas Claras",
                  desc: "Opera tu sistema backtesteado con R:R 1:2. Si eres rentable 3 meses seguidos, puedes subir capital gradualmente.",
                  color: "border-emerald-500/40 text-emerald-300",
                },
                {
                  period: "Año 2+",
                  title: "SMC, On-Chain & Escalado",
                  desc: "Profundiza en conceptos institucionales, automatización con bots y diversificación entre Spot, DeFi y futuros.",
                  color: "border-rose-500/40 text-rose-300",
                },
              ].map((tl, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-3xl bg-white/5 border ${tl.color} backdrop-blur-md space-y-2 flex flex-col justify-between`}
                >
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono font-bold tracking-wider">{tl.period}</span>
                    <h4 className="text-sm font-bold text-white">{tl.title}</h4>
                    <p className="text-xs text-purple-200/70 leading-relaxed">{tl.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Checklist with LocalStorage */}
          <div className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-purple-900/40 to-amber-900/40 border border-purple-500/30 backdrop-blur-md">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-amber-400">
                  // 09.2 — Auditoría de Preparación
                </span>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-6 h-6 text-amber-400" />
                  Checklist Pre-Trade Real ({completedCount}/{checklistItems.length})
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
                  Marca cada casilla a medida que domines cada concepto. Tu progreso queda guardado automáticamente.
                </p>
              </div>

              {/* Progress Bar & Badge */}
              <div className="w-full sm:w-64 space-y-2 shrink-0">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-purple-300">Nivel de Preparación:</span>
                  <span className="text-amber-400 font-mono font-bold">{checklistPct}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-black/40 border border-purple-500/30 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${checklistPct}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-[11px] text-purple-300/70 block text-right">
                  {checklistPct === 100
                    ? "🎉 ¡Listo para operar con disciplina!"
                    : checklistPct >= 60
                    ? "🚀 Buen avance, sigue practicando en demo"
                    : "🌱 Fase de estudio y fundamentos"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {checklistItems.map((item) => {
                const isChecked = completedChecklist[item.id] || false;
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 cursor-pointer select-none ${
                      isChecked
                        ? "bg-emerald-500/10 border-emerald-500/40 text-white shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                        : "bg-white/5 border-purple-500/20 text-purple-200/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-purple-400/50" />
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? "font-medium" : ""}`}>
                      {item.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 10. SECCIÓN: GLOSARIO CRIPTO & BUSCADOR                     */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "glosario") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">
                // 10 — Diccionario Técnico
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Info className="w-6 h-6 text-cyan-400" />
                Glosario Cripto & Búsqueda Rápida
              </h3>
            </div>

            {/* Glossary Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
              <input
                type="text"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Buscar término (ej. Funding, MVRV)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-purple-500/30 text-xs sm:text-sm text-white placeholder:text-purple-300/50 outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((g, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-1.5"
              >
                <span className="text-sm font-bold text-amber-300 font-mono block">
                  {g.term}
                </span>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">{g.def}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Encouragement Note */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-black/40 to-amber-950/40 border border-purple-500/20 text-center space-y-2">
        <Sparkles className="w-6 h-6 text-amber-400 mx-auto animate-pulse" />
        <h4 className="text-lg font-bold text-white">El Éxito en Trading es un Hábito de Disciplina</h4>
        <p className="text-xs sm:text-sm text-purple-200/70 max-w-xl mx-auto leading-relaxed">
          Recuerda: el mercado recompensa la paciencia, la gestión de riesgo matemática y el control emocional. Aprende con calma, registra cada paso y construye tu camino con convicción.
        </p>
      </div>
    </div>
  );
}
