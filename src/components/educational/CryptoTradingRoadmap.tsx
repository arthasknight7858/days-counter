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
  Clock,
  Lightbulb,
  Crosshair,
  TrendingDown,
  Info,
  DollarSign,
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Gauge,
  Percent,
} from "lucide-react";

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// ── Static Definitions Outside Component ──
const LEVERAGE_TABLE_DATA = [
  { lev: "1x", longDrop: "-100.0%", shortRise: "+∞", margin: "100%", risk: "Equivale a Spot", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { lev: "2x", longDrop: "-50.0%", shortRise: "+50.0%", margin: "50%", risk: "Bajo (Swing Trading)", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { lev: "3x", longDrop: "-33.3%", shortRise: "+33.3%", margin: "33.3%", risk: "Moderado / Recomendado inicial", badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
  { lev: "5x", longDrop: "-20.0%", shortRise: "+20.0%", margin: "20%", risk: "Intermedio (Stop Loss obligatorio)", badge: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  { lev: "10x", longDrop: "-10.0%", shortRise: "+10.0%", margin: "10%", risk: "Alto (Solo posiciones pequeñas)", badge: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  { lev: "20x", longDrop: "-5.0%", shortRise: "+5.0%", margin: "5%", risk: "Muy Alto (Scalping intradía)", badge: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  { lev: "50x", longDrop: "-2.0%", shortRise: "+2.0%", margin: "2%", risk: "Extremo (Ruleta / Peligro)", badge: "bg-red-600/30 text-red-300 border-red-500/40" },
  { lev: "100x", longDrop: "-1.0%", shortRise: "+1.0%", margin: "1%", risk: "❌ Prohibido — Liquidación instantánea", badge: "bg-red-700/40 text-red-200 border-red-500/50" },
];

const FUTURES_FORMULAS = [
  {
    title: "Precio de Liquidación — Long",
    formula: "Liq Long = Entrada × (1 - 1/Apalancamiento + MM%)",
    example: "Ej: Entrada $60,000 a 10x (MM 0.5%) → Liq ≈ $54,300 (-9.5%)",
    desc: "El precio al que el margen de garantía se consume por completo.",
  },
  {
    title: "Precio de Liquidación — Short",
    formula: "Liq Short = Entrada × (1 + 1/Apalancamiento - MM%)",
    example: "Ej: Entrada $60,000 a 10x (MM 0.5%) → Liq ≈ $65,700 (+9.5%)",
    desc: "El precio al que la subida del activo consume tu margen disponible.",
  },
  {
    title: "Fórmula de Tamaño de Posición (Position Sizing)",
    formula: "Posición ($) = (Capital × Riesgo%) ÷ (|Entrada - StopLoss| / Entrada)",
    example: "Ej: Cuenta $2,000, Riesgo 1% ($20), SL a 2% → Posición = $1,000",
    desc: "Calcula el tamaño notional ANTES de abrir el trade para arriesgar el % exacto.",
  },
  {
    title: "Ratio de Margen (Margin Ratio)",
    formula: "Margin Ratio = (Margen Mantenimiento ÷ Margen Balance) × 100",
    example: "Zona segura: < 50% | Zona de alerta: 50–80% | 🚨 Liquidación: 100%",
    desc: "Termómetro del exchange. Por encima del 80% debes añadir margen o reducir tamaño.",
  },
  {
    title: "Costo por Funding Rate (Cada 8 Horas)",
    formula: "Costo = Valor Notional × Funding Rate %",
    example: "Posición notional de $10,000 con FR de +0.01% paga $1.00 cada 8h ($3/día)",
    desc: "Pago periódico entre Longs y Shorts para equilibrar el precio del futuro con el Spot.",
  },
  {
    title: "PnL Realizado con Apalancamiento",
    formula: "PnL = [(Precio Cierre - Entrada) / Entrada] × Margen Invertido × Apalancamiento",
    example: "Margen $100 con 5x ($500 notional) y subida de 4% → Ganancia = $20 (+20% ROI)",
    desc: "El retorno se amplifica exactamente por el multiplicador de apalancamiento.",
  },
];

const ORDER_TYPES_DATA = [
  {
    name: "Market Order (Orden a Mercado)",
    tag: "EJECUCIÓN INMEDIATA",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    desc: "Se ejecuta al instante al mejor precio disponible en el Order Book. Garantiza la entrada o salida, pero no garantiza el precio exacto (sujeta a slippage y taker fee).",
    useCase: "Salidas de emergencia, cierres rápidos en Stop Loss.",
  },
  {
    name: "Limit Order (Orden Límite)",
    tag: "PRECIO FIJADO",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    desc: "Se coloca en el libro de órdenes y solo se ejecuta al precio especificado o mejor. Paga comisiones más bajas (Maker Fee) pero no garantiza ejecución si el precio no llega.",
    useCase: "Entradas planificadas con paciencia en retrocesos y Take Profits.",
  },
  {
    name: "Stop Market",
    tag: "PROTECCIÓN INFALIBLE",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    desc: "Al tocar el precio de activación (Trigger Price), lanza automáticamente una orden Market. Garantiza que tu posición se cerrará sin importar la velocidad de la caída.",
    useCase: "El Stop Loss estándar y obligatorio en contratos de futuros.",
  },
  {
    name: "Stop Limit",
    tag: "PROTECCIÓN CONDICIONAL",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    desc: "Al tocar el trigger, coloca una orden Limit. Peligro en cripto: en caídas violentas o 'flash crashes', el precio puede saltarse tu orden sin cerrarla.",
    useCase: "Evitar en Stop Loss de futuros de alta volatilidad.",
  },
  {
    name: "Trailing Stop (Stop Dinámico)",
    tag: "ASEGURAR GANANCIAS",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    desc: "Un Stop Loss que persigue al precio automáticamente a una distancia porcentual fija (Callback Rate) a medida que avanza a favor.",
    useCase: "Tendencias parabólicas donde quieres dejar correr la ganancia máxima.",
  },
  {
    name: "Reduce-Only (Solo Reducir)",
    tag: "CONFIGURACIÓN CRÍTICA",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    desc: "Casilla que asegura que la orden SOLO cerrará o reducirá la posición existente y jamás abrirá una posición accidental en sentido contrario si ya fuiste liquidado o saliste antes.",
    useCase: "Activar SIEMPRE en todas las órdenes de Take Profit y Stop Loss.",
  },
  {
    name: "OCO (One Cancels Other)",
    tag: "AUTOMATIZACIÓN",
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    desc: "Combina un Take Profit y un Stop Loss en una sola orden vinculada. En cuanto uno de los dos se ejecuta, el otro se cancela automáticamente.",
    useCase: "Gestión completa del trade 'set-and-forget' sin mirar la pantalla.",
  },
  {
    name: "Post-Only",
    tag: "AHORRO DE COMISIONES",
    badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    desc: "Garantiza que la orden se añadirá al libro como Maker (aportando liquidez). Si fuera a ejecutarse como Market/Taker, se cancela automáticamente.",
    useCase: "Scalping y trading recurrente para pagar las menores comisiones posibles.",
  },
];

const HIGH_PROBABILITY_SETUPS = [
  {
    id: "s1",
    dir: "LONG",
    title: "Pullback a Soporte + Confluencia Multitemporal",
    subtitle: "El setup más confiable para principiantes e intermedios en tendencias alcistas.",
    timeframes: "4H (Sesgo) / 1H (Estructura) / 15M (Gatillo)",
    color: "border-emerald-500/40 bg-emerald-500/5",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    steps: [
      { num: "01", name: "Sesgo Macro (4H)", desc: "Confirma estructura alcista en 4h con máximos y mínimos ascendentes (HH + HL) y precio cotizando sobre la EMA 20 y EMA 50." },
      { num: "02", name: "Zona de Confluencia", desc: "Identifica zona de soporte que coincida con al menos 2 factores: S/R previo roto, Fair Value Gap (FVG) no mitigado o retroceso Fibonacci 50%–61.8%." },
      { num: "03", name: "Paciencia en Retroceso", desc: "No compres mientras la vela roja va cayendo con fuerza. Espera a que el precio ingrese a la zona marcada y desacelere su momentum." },
      { num: "04", name: "Gatillo de Entrada (15M)", desc: "Busca vela de reversión (Martillo / Pin Bar alcista o Vela Envolvente / Engulfing) con incremento de volumen comprador." },
      { num: "05", name: "Ejecución & Stop Loss", desc: "Entra al cierre de la vela de confirmación. Coloca el Stop Loss 0.5% por debajo del mínimo de la estructura (invalidez técnica)." },
      { num: "06", name: "Gestión de TP & R:R", desc: "TP1 en la resistencia anterior (mínimo 1:2 R:R). Al tocar TP1, toma el 50% de ganancias y mueve el SL a Breakeven (precio de entrada)." },
    ],
  },
  {
    id: "s2",
    dir: "SHORT",
    title: "Retesteo de Resistencia Rota (S/R Flip Bajista)",
    subtitle: "Vender el rebote en el nivel que antes era soporte y ahora es un techo infranqueable.",
    timeframes: "4H / 1H / 15M",
    color: "border-rose-500/40 bg-rose-500/5",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    steps: [
      { num: "01", name: "Sesgo Bajista (4H)", desc: "Estructura bajista confirmada con Lower Highs y Lower Lows. Precio cotizando por debajo de las EMAs principales." },
      { num: "02", name: "Quiebre de Soporte", desc: "El precio perfora con violencia un soporte diario o de 4h con vela de cuerpo sólido cerrada por debajo (BOS bajista)." },
      { num: "03", name: "El Retesteo (Pullback)", desc: "El precio sube en un rebote débil con bajo volumen a testear el antiguo soporte (que ahora se convierte en resistencia)." },
      { num: "04", name: "Gatillo Bajista (15M)", desc: "Aparición de vela de rechazo en la resistencia (Shooting Star o Vela Envolvente Bajista) con caída en el Open Interest." },
      { num: "05", name: "Ejecución Short", desc: "Abre la posición Short. Stop Loss colocado de forma segura por encima de la zona de resistencia recién testeada." },
      { num: "06", name: "Objetivos de Toma de Beneficios", desc: "TP en el último mínimo relativo o en el siguiente soporte clave de 4h (R:R mínimo 1:2.5)." },
    ],
  },
  {
    id: "s3",
    dir: "AMBOS",
    title: "Liquidity Sweep + Reversión Smart Money",
    subtitle: "Capturar la trampa institucional — cazar el movimiento justo tras la barrida de Stops.",
    timeframes: "15M / 5M",
    color: "border-amber-500/40 bg-amber-500/5",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    steps: [
      { num: "01", name: "Identificar Piscinas de Liquidez", desc: "Localiza zonas obvias con Equal Highs (máximos iguales) o Equal Lows donde la masa de traders ha colocado sus Stop Loss." },
      { num: "02", name: "Esperar la Barrida (Stop Hunt)", desc: "El precio perfora brevemente el nivel con una mecha rápida (wick) para activar las órdenes de liquidación institucionales." },
      { num: "03", name: "Reversión Instantánea", desc: "La vela no puede sostenerse fuera del rango y cierra con fuerza de regreso al interior de la estructura previa." },
      { num: "04", name: "Confirmación en Datos (Coinglass)", desc: "Revisa si la mecha coincidió con un pico masivo de liquidaciones en Coinglass y una divergencia en el CVD." },
      { num: "05", name: "Entrada en Dirección Contraria", desc: "Entra en la dirección opuesta a la trampa al cerrar la vela de reversión de 5m o 15m." },
      { num: "06", name: "Stop Loss Milimétrico", desc: "Coloca el SL justo más allá de la punta de la mecha de la barrida. Objetivo: el extremo opuesto del rango." },
    ],
  },
  {
    id: "s4",
    dir: "LONG / SHORT",
    title: "Breakout con Expansión de Volumen y Open Interest",
    subtitle: "Montarse en el inicio de un movimiento impulsivo tras una compresión de volatilidad.",
    timeframes: "4H / 1H",
    color: "border-purple-500/40 bg-purple-500/5",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    steps: [
      { num: "01", name: "Identificar Compresión", desc: "Patrón de consolidación definido (Triángulo, Bandera o Rango lateral de varios días) con disminución paulatina del volumen." },
      { num: "02", name: "Ruptura Institucional", desc: "Una vela de cuerpo grande rompe el soporte o resistencia con un volumen que duplica la media de los últimos 20 periodos." },
      { num: "03", name: "Confirmación con Open Interest", desc: "El Open Interest (OI) en Coinglass/Velo debe aumentar drásticamente durante el quiebre, demostrando entrada de dinero fresco." },
      { num: "04", name: "Entrada Segura", desc: "Opción A: Al cierre de la vela de quiebre (agresiva). Opción B: En el retesteo del nivel roto en 15m (conservadora y recomendada)." },
      { num: "05", name: "Ubicación de Stop Loss", desc: "SL situado dentro del rango previo de consolidación, invalidando el breakout si el precio regresa." },
      { num: "06", name: "Proyección de Beneficios", desc: "TP basado en la altura del rango previo proyectada desde el punto de quiebre o en el siguiente nivel macro." },
    ],
  },
];

const FUTURES_PSYCHOLOGY_ERRORS = [
  {
    num: "01",
    name: "FOMO Apalancado",
    desc: "Ver una vela verde enorme y entrar apresuradamente en Long con 10x o 20x en el techo. En futuros, una corrección mínima del 3% liquida el 60% de tu margen.",
    solution: "Regla sagrada: si el movimiento ya ocurrió, la oportunidad terminó. Espera el próximo retroceso a soporte.",
  },
  {
    num: "02",
    name: "Revenge Trading (Trading de Venganza)",
    desc: "Perder un trade y abrir inmediatamente otra posición impulsiva con el doble de apalancamiento para 'recuperar el dinero'. Es la causa #1 de cuentas quemadas en una sola tarde.",
    solution: "Regla inquebrantable de los 3 strikes: tras 3 pérdidas en un día, apaga el computador obligatoriamente.",
  },
  {
    num: "03",
    name: "Mover o Cancelar el Stop Loss",
    desc: "'Seguro rebota aquí, alejaré el SL un poco más'. En futuros con apalancamiento, un movimiento en cascada puede llevarse tu cuenta entera a cero.",
    solution: "El Stop Loss es un contrato inalterable que se define antes de abrir la posición. Jamás se mueve en contra.",
  },
  {
    num: "04",
    name: "Overtrading por Dopamina",
    desc: "Operar por aburrimiento o necesidad de acción cuando el mercado está en rango lateral sucio sin setups claros. Más operaciones solo significan más comisiones para el exchange.",
    solution: "Los traders de élite operan solo 2 a 5 veces por semana. Estar fuera del mercado ('en liquidez') es una posición activa.",
  },
  {
    num: "05",
    name: "Sesgo de Confirmación",
    desc: "Estar en Long y buscar desesperadamente en Twitter/Telegram solo a personas que digan que el precio subirá, ignorando las señales bajistas evidentes del gráfico.",
    solution: "Busca activamente razones por las que tu trade podría estar equivocado. El mercado no sabe ni le importa cuál es tu posición.",
  },
  {
    num: "06",
    name: "Aversión a la Pérdida & Negación",
    desc: "Negarse a aceptar una pérdida pequeña de $20 y dejar que se transforme en una catástrofe de $500 con la esperanza de un milagro.",
    solution: "Aceptar las pérdidas como el costo ordinario del negocio (como la electricidad de un restaurante).",
  },
  {
    num: "07",
    name: "Cerrar el Take Profit Prematuramente",
    desc: "Cerrar un trade ganador a las primeras migajas por miedo a que se devuelva, destruyendo la matemática del ratio R:R de tu sistema.",
    solution: "Toma parcial del 50% en TP1, mueve SL a Breakeven y deja correr el resto hacia el objetivo final con un Trailing Stop.",
  },
  {
    num: "08",
    name: "Aumentar Tamaño tras Racha Ganadora",
    desc: "Ganar 4 trades seguidos, sentirse infalible y quintuplicar el tamaño de la posición en el quinto trade, perdiendo todas las ganancias acumuladas.",
    solution: "El tamaño de riesgo porcentual (1%–2%) es estricto y no cambia jamás, sin importar qué tan confiado te sientas.",
  },
];

const PHASES_DATA = [
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

const STRATEGIES_DATA = [
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
    title: "Swing Trading Cripto",
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
    title: "Day Trading Intradía",
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
    title: "Hedging & Arbitraje de Funding Rate",
    icon: "🏦",
    risk: "Riesgo Bajo / Delta Neutral",
    color: "border-emerald-500/40 bg-emerald-500/5",
    badge: "bg-emerald-500/20 text-emerald-300",
    desc: "Comprar activo en Spot y abrir un Short en Futuros Perpetuos del mismo tamaño exacto cuando el Funding Rate es muy alto positivo.",
    points: [
      "Posición Delta Neutral: si el precio sube o baja, la ganancia de una cubre la pérdida de la otra.",
      "Cobras el pago del Funding Rate de los Longs cada 8 horas.",
      "Rentabilidad anualizada (APR) histórica del 10% al 45% en mercados alcistas.",
      "Riesgo casi nulo de mercado, solo riesgo de contraparte de exchange.",
    ],
    timeframe: "Indefinido / Semanas",
    idealFor: "Inversores conservadores que buscan rentabilidad pasiva en dólares.",
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
];

const PATTERNS_CATALOG = [
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

const TOOLS_ARSENAL = [
  { name: "TradingView", cat: "Gráficos & Análisis", desc: "El estándar mundial de graficación técnica. Pinescript, alertas y miles de indicadores gratuitos.", url: "tradingview.com", free: "Gratis + Pro" },
  { name: "Bybit / Binance", cat: "Exchanges CEX", desc: "Plataformas líderes con mayor liquidez en Spot y Futuros. Cuentan con Testnet/Demo gratuita.", url: "bybit.com / binance.com", free: "Demo Gratis" },
  { name: "Coinglass", cat: "Derivados & Futuros", desc: "Mapas de calor de liquidaciones, Open Interest, Funding Rates y ratio Long/Short en tiempo real.", url: "coinglass.com", free: "100% Gratis" },
  { name: "Velo.xyz", cat: "Open Interest & Datos", desc: "Open Interest agregado multiexchange, tasas de funding comparadas y CVD en tiempo real.", url: "velo.xyz", free: "100% Gratis" },
  { name: "Glassnode & CryptoQuant", cat: "Métricas On-Chain", desc: "Datos puros de blockchain: flujos de ballenas, reservas en exchanges, MVRV y SOPR.", url: "glassnode.com", free: "Versión Free útil" },
  { name: "DefiLlama", cat: "Ecosistema DeFi", desc: "La base de datos definitiva de TVL, yields, protocolos, blockchains, tokens y airdrops.", url: "defillama.com", free: "100% Gratis" },
  { name: "Alternative.me (Fear & Greed)", cat: "Sentimiento", desc: "Índice de miedo y codicia del mercado cripto. El mejor termómetro de psicología de masas.", url: "alternative.me/crypto", free: "100% Gratis" },
  { name: "CoinMarketCap & CoinGecko", cat: "Precios & Datos", desc: "Directorio completo de criptomonedas, market cap, volumen 24h, tokenomics y contratos oficiales.", url: "coingecko.com", free: "100% Gratis" },
  { name: "Notion / Edgewonk", cat: "Diario de Trading", desc: "Para registrar, auditar y estudiar tus operaciones. Sin un diario es imposible ser rentable.", url: "notion.so", free: "Gratis" },
  { name: "DeBank & Arkham Intelligence", cat: "Rastreo de Wallets", desc: "Visualiza portfolios de ballenas y rastrea movimientos de fondos en tiempo real.", url: "arkhamintelligence.com", free: "Gratis" },
  { name: "3Commas / Pionex", cat: "Bots & Automatización", desc: "Automatización de estrategias de Grid Trading y DCA sin saber programar código.", url: "pionex.com", free: "Freemium" },
  { name: "CoinDesk & The Block", cat: "Noticias Macro", desc: "Cobertura de eventos macroeconómicos, decisiones de la Fed y aprobaciones regulatorias.", url: "coindesk.com", free: "Gratis" },
];

const YOUTUBE_CHANNELS = [
  { name: "The Matrix Trader", lang: "🇺🇸 Inglés", focus: "Order Flow & Futuros Pro", desc: "Análisis técnico institucional y futuros sin censura. Muestra procesos transparentes y gestión de pérdidas." },
  { name: "Trader Dante", lang: "🇺🇸 Inglés", focus: "Price Action & Wyckoff", desc: "Metodología de estructura de mercado pura y psicología de trading aplicada a derivados." },
  { name: "InvestAnswers", lang: "🇺🇸 Inglés", focus: "Macro + On-Chain + Modelos", desc: "Análisis técnico y fundamental riguroso, libre de hype. Excelentes modelos de ciclo de Bitcoin." },
  { name: "Benjamin Cowen (Into The Cryptoverse)", lang: "🇺🇸 Inglés", focus: "Análisis Técnico & Ciclos BTC", desc: "Enfoque puramente matemático y probabilístico sin emociones. Ideal para entender la dominancia de BTC." },
  { name: "Satoshi Defenders", lang: "🇪🇸 Español", focus: "Educación Cripto & Macro", desc: "Contenido transparente enfocado en entender los ciclos económicos y la realidad del mercado." },
  { name: "Crypto Jefe", lang: "🇪🇸 Español", focus: "Trading de Futuros & Psicología", desc: "Enfoque práctico de análisis técnico, órdenes avanzadas y gestión de riesgo para la comunidad hispana." },
  { name: "Uncomplication", lang: "🇺🇸 Inglés", focus: "Mecánica de Futuros & Perps", desc: "Explicaciones visuales impecables de Funding Rate, Open Interest y liquidez sin tecnicismos innecesarios." },
  { name: "Bybit Learn (Oficial)", lang: "🌍 Multi / Español", focus: "Tutoriales de Plataforma", desc: "Guías oficiales sobre tipos de órdenes, calculadoras de margen y contratos perpetuos." },
];

const LEGENDARY_BOOKS = [
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
    title: "The Art and Science of Technical Analysis",
    author: "Adam Grimes",
    tag: "📐 AT Cuantitativo & Probabilístico",
    desc: "Una mirada rigurosa y libre de mitos sobre cómo encontrar un 'edge' estadístico real en los mercados financieros modernos.",
  },
  {
    title: "Reminiscences of a Stock Operator",
    author: "Edwin Lefèvre",
    tag: "⚔️ Experiencia & Mercado",
    desc: "La biografía novelada de Jesse Livermore. Lecciones inmortales sobre el comportamiento de las masas y la gestión del capital.",
  },
  {
    title: "Market Wizards (Magos del Mercado)",
    author: "Jack D. Schwager",
    tag: "🏆 Entrevistas a los Mejores",
    desc: "Entrevistas en profundidad con los traders más exitosos del mundo, revelando sus rutinas, fracasos y reglas de gestión.",
  },
  {
    title: "The Disciplined Trader",
    author: "Mark Douglas",
    tag: "🧘 Disciplina Emocional",
    desc: "Cómo desarrollar la autodisciplina sistemática para operar sin miedo, avaricia ni arrepentimiento.",
  },
];

const GOLDEN_RULES = [
  { num: "01", title: "Regla del 1%–2% de Riesgo", desc: "Nunca arriesgues más del 1% al 2% de tu capital total por trade. Si tienes $1,000, tu pérdida máxima por operación debe ser $10 a $20. Esto te permite sobrevivir 50 pérdidas seguidas sin quebrar." },
  { num: "02", title: "Stop Loss Sagrado y No Negociable", desc: "El Stop Loss se define ANTES de entrar al trade. Jamás operes sin él y NUNCA lo alejes cuando el precio se acerque. 'Esperaré a que se recupere' es la sentencia de muerte de una cuenta." },
  { num: "03", title: "Ratio Riesgo/Beneficio Mínimo 1:2", desc: "Si arriesgas $50, tu objetivo de ganancia debe ser al menos $100. Con un R:R 1:2, puedes fallar el 60% de tus operaciones y aun así terminar el mes ganando dinero." },
  { num: "04", title: "Cero Apalancamiento Excesivo", desc: "Opera en SPOT o máximo 2x a 3x hasta ser rentable 3 meses seguidos. Con 10x de apalancamiento, un retroceso de solo 10% liquida el 100% de tu dinero." },
  { num: "05", title: "Regla de Pausa: 3 Pérdidas = Fin del Día", desc: "Si acumulas 3 Stop Loss seguidos en una jornada, cierra el computador inmediatamente. Tu mente entrará en estado de 'Revenge Trading' (deseo de venganza) y destruirás tu capital." },
  { num: "06", title: "El Efecto 'Estar Líquido' (Cash es Posición)", desc: "No tienes que estar en un trade las 24 horas. Estar en efectivo (USDT/USDC) a la espera de un setup perfecto con alta probabilidad es una estrategia ganadora de los mejores fondos." },
  { num: "07", title: "Diario de Trading Obligatorio", desc: "Anota cada trade con captura de pantalla y emoción sentida. Lo que no se mide no se puede mejorar. Al final de cada mes descubrirás exactamente qué errores te están costando dinero." },
  { num: "08", title: "Nunca Operes con Dinero Necesario", desc: "Usa únicamente capital de riesgo que puedas permitirte perder al 100%. Operar con dinero del alquiler o comida añade una presión psicológica que garantiza decisiones pésimas." },
  { num: "09", title: "Sigue la Tendencia Mayor (The Trend is Your Friend)", desc: "En un mercado alcista en gráfico diario, busca entradas en Long en los retrocesos. Oponerse a la tendencia macro intentando adivinar techos es la forma más rápida de perder capital." },
  { num: "10", title: "Desconfía de Señales y Grupos VIP", desc: "El 99% de los grupos de señales de Telegram y 'gurús' de TikTok ganan dinero de sus suscripciones o de liquidar a sus seguidores en Pumps & Dumps, no de operar." },
  { num: "11", title: "Escala tus Ganancias (Take Profit Parcial)", desc: "Cuando el trade alcance 1:1 o tu primer objetivo, vende el 50% de la posición y mueve el Stop Loss al precio de entrada (Breakeven). Ahora juegas con un trade con riesgo CERO." },
  { num: "12", title: "Cuida tu Salud Física y Sueño", desc: "El trading de criptomonedas exige la máxima agilidad cognitiva. La falta de sueño, la mala alimentación y el sedentarismo nublan el juicio y multiplican los errores emocionales." },
];

const CHECKLIST_ITEMS = [
  { id: "c1", text: "Entiendo qué es un contrato perpetuo y cómo funciona el Funding Rate cada 8h" },
  { id: "c2", text: "Sé calcular el precio exacto de liquidación antes de abrir cualquier posición" },
  { id: "c3", text: "Sé calcular el tamaño notional de posición según mi riesgo del 1% o 2%" },
  { id: "c4", text: "Utilizo Margen Aislado (Isolated Margin) para no arriesgar el balance total de mi cuenta" },
  { id: "c5", text: "Tengo mi orden de Stop Loss colocada inmediatamente al abrir la posición" },
  { id: "c6", text: "Mi apalancamiento no supera 3x–5x (lejos del riesgo de mechas de liquidación)" },
  { id: "c7", text: "El Ratio Riesgo/Beneficio (R:R) de mi setup es igual o superior a 1:2" },
  { id: "c8", text: "He verificado el Mark Price y no solo el Last Price para evitar sustos de spread" },
  { id: "c9", text: "He revisado el mapa de calor de liquidaciones y Open Interest en Coinglass" },
  { id: "c10", text: "He activado la opción 'Reduce-Only' en mis órdenes de Take Profit y Stop Loss" },
  { id: "c11", text: "Sé identificar un setup de Pullback o S/R Flip con confirmación en 15m" },
  { id: "c12", text: "Tengo mi Diario de Trading preparado para registrar este trade con screenshot" },
  { id: "c13", text: "Tengo al menos 50 operaciones completadas en cuenta demo (Bybit/Binance Testnet)" },
  { id: "c14", text: "El dinero utilizado es 100% de riesgo y no lo necesito para mis gastos vitales" },
  { id: "c15", text: "Tengo definida mi regla de pausa diaria: tras 3 pérdidas consecutivas no opero más" },
  { id: "c16", text: "He leído y comprendido 'Trading in the Zone' de Mark Douglas" },
  { id: "c17", text: "Tengo activada la autenticación en dos pasos (2FA) por App en mi exchange" },
  { id: "c18", text: "Mi estado mental es sereno, descansado y libre de FOMO o deseo de revancha" },
];

const GLOSSARY_TERMS = [
  { term: "Contrato Perpetuo (Perp)", def: "Contrato de futuros sin fecha de expiración que sigue el precio del mercado Spot mediante el mecanismo del Funding Rate." },
  { term: "Long (Posición Larga)", def: "Comprar un contrato esperando que el precio suba. Ganas si el activo se revaloriza y pierdes si cae." },
  { term: "Short (Posición Corta)", def: "Vender un contrato esperando que el precio baje. Ganas si el activo cae y pierdes si sube." },
  { term: "Funding Rate (Tasa de Financiación)", def: "Pago periódico (usualmente cada 8h) entre traders Long y Short para evitar que el precio del contrato perpetuo se desvíe del precio Spot." },
  { term: "Open Interest (OI)", def: "Valor total o número de contratos de derivados que permanecen abiertos en el mercado y no han sido cerrados ni liquidados." },
  { term: "Mark Price (Precio de Marca)", def: "Precio estimado justo del contrato basado en un índice ponderado de múltiples exchanges Spot. Se usa para calcular PnL no realizado y liquidaciones para evitar manipulaciones con mechas." },
  { term: "Last Price (Último Precio)", def: "El precio exacto al que se ejecutó la última transacción en el libro de órdenes del exchange." },
  { term: "Isolated Margin (Margen Aislado)", def: "Modo donde el riesgo está confinado únicamente al capital asignado a esa posición individual. Si te liquidan, solo pierdes ese margen." },
  { term: "Cross Margin (Margen Cruzado)", def: "Modo donde todo el balance disponible de la cuenta se utiliza como garantía compartida. Muy peligroso: un solo trade perdedor puede quemar tu cuenta entera." },
  { term: "Liquidación Forzosa", def: "Cierre automático de tu posición ejecutado por el motor de riesgo del exchange cuando tu margen cae por debajo del margen de mantenimiento." },
  { term: "Slippage (Deslizamiento)", def: "Diferencia entre el precio esperado de una orden y el precio exacto al que se ejecuta en el mercado debido a volatilidad o falta de liquidez." },
  { term: "Cumulative Volume Delta (CVD)", def: "Indicador acumulativo que mide la diferencia entre las compras agresivas (a mercado) y las ventas agresivas para detectar divergencias de volumen." },
  { term: "Reduce-Only", def: "Parámetro que garantiza que una orden solo podrá reducir o cerrar una posición abierta, impidiendo abrir una posición contraria por error." },
  { term: "DCA (Dollar Cost Averaging)", def: "Estrategia de inversión consistente en comprar una cantidad fija de dinero en intervalos regulares, sin importar el precio." },
  { term: "Order Block (OB)", def: "En Smart Money Concepts, la última vela contraria antes de un fuerte impulso donde las instituciones acumularon o distribuyeron grandes volúmenes." },
  { term: "Fair Value Gap (FVG)", def: "Desbalance de precio entre 3 velas donde la liquidez no fue eficiente, actuando como un imán para futuros retesteos." },
  { term: "BOS / CHOCH", def: "Break of Structure (quiebre de estructura que continúa la tendencia) y Change of Character (primer indicio de cambio de tendencia)." },
  { term: "MVRV Ratio", def: "Market Value to Realized Value. Compara la capitalización de mercado con la capitalización realizada en blockchain para detectar techos y suelos de ciclo." },
  { term: "FOMO / FUD", def: "Fear Of Missing Out (Miedo a quedarse fuera) y Fear, Uncertainty & Doubt (Campaña de miedo y desinformación mediática)." },
  { term: "Halving", def: "Evento programado en el protocolo de Bitcoin cada 210,000 bloques (~4 años) que reduce a la mitad la recompensa por bloque minado." },
];

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
  const [openFuturesModules, setOpenFuturesModules] = useState<Record<string, boolean>>({
    fut1: true,
    fut2: true,
    fut3: false,
    fut4: false,
    fut5: false,
  });
  const [openSetups, setOpenSetups] = useState<Record<string, boolean>>({
    s1: true,
    s2: false,
    s3: false,
    s4: false,
  });
  const [patternFilter, setPatternFilter] = useState<"all" | "alcista" | "bajista" | "vela" | "figura">("all");
  const [glossarySearch, setGlossarySearch] = useState("");

  // 1. Calculadora de Posición
  const [calcAccountBalance, setCalcAccountBalance] = useState<number>(1000);
  const [calcRiskPct, setCalcRiskPct] = useState<number>(1.5);
  const [calcEntryPrice, setCalcEntryPrice] = useState<number>(65000);
  const [calcStopLoss, setCalcStopLoss] = useState<number>(63500);
  const [calcTakeProfit, setCalcTakeProfit] = useState<number>(69500);
  const [calcLeverage, setCalcLeverage] = useState<number>(3);

  // 2. Calculadora de Liquidación
  const [liqDirection, setLiqDirection] = useState<"long" | "short">("long");
  const [liqEntryPrice, setLiqEntryPrice] = useState<number>(65000);
  const [liqLeverage, setLiqLeverage] = useState<number>(10);
  const [liqMaintenanceMarginPct, setLiqMaintenanceMarginPct] = useState<number>(0.5);

  // 3. Calculadora de Funding Rate
  const [fundPositionValue, setFundPositionValue] = useState<number>(10000);
  const [fundRatePct, setFundRatePct] = useState<number>(0.01);
  const [fundDaysHolding, setFundDaysHolding] = useState<number>(30);

  // LocalStorage Checklist
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_crypto_futures_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  const toggleChecklist = (id: string) => {
    setCompletedChecklist((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_crypto_futures_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const togglePhase = (id: string) => {
    setOpenPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFuturesModule = (id: string) => {
    setOpenFuturesModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSetup = (id: string) => {
    setOpenSetups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Cálculos de Posición
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

  // Cálculos de Liquidación
  const calculatedLiqPrice = useMemo(() => {
    if (liqLeverage <= 0 || liqEntryPrice <= 0) return 0;
    const mm = liqMaintenanceMarginPct / 100;
    if (liqDirection === "long") {
      const factor = 1 - 1 / liqLeverage + mm;
      return Math.max(0, liqEntryPrice * factor);
    } else {
      const factor = 1 + 1 / liqLeverage - mm;
      return liqEntryPrice * factor;
    }
  }, [liqDirection, liqEntryPrice, liqLeverage, liqMaintenanceMarginPct]);

  const distanceToLiqPct = useMemo(() => {
    if (liqEntryPrice <= 0) return 0;
    return (Math.abs(liqEntryPrice - calculatedLiqPrice) / liqEntryPrice) * 100;
  }, [liqEntryPrice, calculatedLiqPrice]);

  // Cálculos de Funding Rate
  const fundCostPer8h = useMemo(() => {
    return fundPositionValue * (fundRatePct / 100);
  }, [fundPositionValue, fundRatePct]);

  const fundCostPerDay = useMemo(() => {
    return fundCostPer8h * 3;
  }, [fundCostPer8h]);

  const fundTotalPeriod = useMemo(() => {
    return fundCostPerDay * fundDaysHolding;
  }, [fundCostPerDay, fundDaysHolding]);

  const fundAnnualizedAPR = useMemo(() => {
    return (fundRatePct * 3 * 365);
  }, [fundRatePct]);

  // Subtabs
  const subTabs = useMemo(() => [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "futuros_pro", label: "⚡ Futuros & Mecánica Pro", icon: Flame },
    { id: "setups_pro", label: "🎯 Setups de Alta Probabilidad", icon: Target },
    { id: "calculadoras", label: "🧮 Suite de Calculadoras", icon: Calculator },
    { id: "fases", label: "🗺️ 6 Fases del Trader", icon: Compass },
    { id: "estrategias", label: "⚔️ Estrategias de Mercado", icon: Scale },
    { id: "patrones", label: "📐 Catálogo de Patrones & Velas", icon: CandlestickChart },
    { id: "onchain_smc", label: "📊 On-Chain, Wyckoff & SMC", icon: Layers },
    { id: "riesgo_psico", label: "🧠 Psicología & 12 Reglas", icon: Brain },
    { id: "herramientas", label: "🛠️ Arsenal de Herramientas", icon: BarChart3 },
    { id: "youtube_libros", label: "📚 Canales & Biblioteca", icon: BookOpen },
    { id: "plan_checklist", label: "🚀 Plan & Checklist", icon: CheckSquare },
    { id: "glosario", label: "📖 Glosario Cripto", icon: Info },
  ], []);

  const filteredPatterns = useMemo(() => {
    return PATTERNS_CATALOG.filter((p) => {
      if (patternFilter === "all") return true;
      if (patternFilter === "alcista") return p.bias === "alcista";
      if (patternFilter === "bajista") return p.bias === "bajista";
      if (patternFilter === "vela") return p.type === "vela";
      if (patternFilter === "figura") return p.type === "figura";
      return true;
    });
  }, [patternFilter]);

  const completedCount = useMemo(() => {
    return Object.values(completedChecklist).filter(Boolean).length;
  }, [completedChecklist]);

  const checklistPct = useMemo(() => {
    return Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);
  }, [completedCount]);

  const filteredGlossary = useMemo(() => {
    if (!glossarySearch.trim()) return GLOSSARY_TERMS;
    const q = glossarySearch.toLowerCase();
    return GLOSSARY_TERMS.filter(
      (t) => t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q)
    );
  }, [glossarySearch]);

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
              <Flame className="w-3.5 h-3.5 text-cyan-400" />
              Futuros Cripto: Long & Short
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              Gestión de Riesgo & Liquidaciones
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white flex flex-wrap items-center gap-3">
            <span>Trading de</span>
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400 bg-clip-text text-transparent">
              Cripto & Futuros
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base max-w-3xl leading-relaxed">
            El roadmap más completo y riguroso para entender el mercado cripto, dominar los contratos de futuros perpetuos (Longs & Shorts), descifrar el Open Interest y el Funding Rate, calcular liquidaciones matemáticas y operar con disciplina profesional.
          </p>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-purple-500/20 flex flex-col">
              <span className="text-xs text-purple-300/70 font-medium">Fases de Estudio</span>
              <span className="text-xl font-bold text-cyan-400">6 Etapas</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-purple-500/20 flex flex-col">
              <span className="text-xs text-purple-300/70 font-medium">Setups de Futuros</span>
              <span className="text-xl font-bold text-amber-400">4 Setups Pro</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-purple-500/20 flex flex-col">
              <span className="text-xs text-purple-300/70 font-medium">Suite Calculadoras</span>
              <span className="text-xl font-bold text-emerald-400">3 Herramientas</span>
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
            🚨 Advertencia de Alto Riesgo — Mercado de Derivados & Futuros:
          </strong>
          Los futuros apalancados son instrumentos financieros de altísimo riesgo. Según datos de brokers regulados, entre el 80% y 85% de los traders minoristas pierde dinero debido al mal uso del apalancamiento y falta de gestión. Este módulo es estrictamente educativo. Empieza siempre en cuentas demo (mínimo 3 meses) y jamás operes con dinero vital para vivir.
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
      {/* 1. SECCIÓN DEDICADA: FUTUROS CRIPTO & MECÁNICA PRO         */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "futuros_pro") && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">
                {"// 01 — Derivados & Contratos Perpetuos"}
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Flame className="w-6 h-6 text-amber-400" />
                Mecánica Profunda de Futuros: Long, Short & Liquidación
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
              Aprende exactamente qué ocurre detrás de escena al abrir una posición apalancada y cómo operan los exchanges.
            </p>
          </div>

          {/* Módulos Desplegables de Futuros */}
          <div className="space-y-4">
            {/* Módulo 1: Fundamentos de Futuros */}
            <div className="rounded-3xl bg-white/5 border border-purple-500/20 overflow-hidden backdrop-blur-md">
              <button
                onClick={() => toggleFuturesModule("fut1")}
                className="w-full p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-lg border bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-300">
                    F1
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                        FUNDAMENTOS DE CONTRATOS
                      </span>
                      <span className="text-xs text-purple-300/60 font-mono">Spot vs Futuros</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      ¿Qué es un Contrato de Futuros Perpetuo?
                    </h4>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${
                    openFuturesModules.fut1 ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openFuturesModules.fut1 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-purple-500/20 p-5 sm:p-6 space-y-6 bg-black/20"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                        <h5 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                          <Coins className="w-4 h-4 text-cyan-400" />
                          Spot vs Futuros
                        </h5>
                        <ul className="space-y-1.5 text-xs text-purple-200/80">
                          <li>• <strong>Spot:</strong> Compras el activo real, lo posees en tu wallet y no hay liquidación.</li>
                          <li>• <strong>Futuros:</strong> Tienes un contrato de derivados basado en el precio. Puedes ir Long o Short.</li>
                          <li>• <strong>Apalancamiento:</strong> En futuros puedes mover $10,000 con solo $1,000 de margen.</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                        <h5 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-400" />
                          Perpetuos vs Fechados
                        </h5>
                        <ul className="space-y-1.5 text-xs text-purple-200/80">
                          <li>• <strong>Perpetuos (Perps):</strong> Sin fecha de vencimiento. Mantienen el precio spot con el Funding Rate.</li>
                          <li>• <strong>Fechados (Quarterly):</strong> Expiran en fecha fija (ej. trimestral) y convergen al spot al vencer.</li>
                          <li>• En cripto, más del 95% del volumen se negocia en perpetuos (Bybit, Binance, OKX).</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                        <h5 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          Margen Aislado vs Cruzado
                        </h5>
                        <ul className="space-y-1.5 text-xs text-purple-200/80">
                          <li>• <strong>Isolated (Aislado):</strong> El riesgo se limita al dinero asignado al trade. ¡Recomendado para todos!</li>
                          <li>• <strong>Cross (Cruzado):</strong> Todo el dinero de tu cuenta respalda el trade. Un error quema toda la cuenta.</li>
                          <li>• <strong>USDT-M vs Coin-M:</strong> Margen en dólares (USDT/USDC) o en cripto nativa (BTC inverso).</li>
                        </ul>
                      </div>
                    </div>

                    {/* Mark Price vs Last Price Box */}
                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-start gap-3.5">
                      <Gauge className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                        <strong className="text-purple-300 font-semibold block">
                          {"// ⚖️ Mark Price vs Last Price — Por qué evita liquidaciones injustas:"}
                        </strong>
                        El <strong>Last Price</strong> es el precio de la última operación en el exchange (puede ser manipulado por una mecha rápida). El <strong>Mark Price</strong> es el precio justo calculado como promedio de múltiples exchanges spot. Las liquidaciones se calculan <strong>EXCLUSIVAMENTE sobre el Mark Price</strong>, protegiéndote de mechas de manipulación artificiales.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Módulo 2: Funding Rate & Arbitraje */}
            <div className="rounded-3xl bg-white/5 border border-purple-500/20 overflow-hidden backdrop-blur-md">
              <button
                onClick={() => toggleFuturesModule("fut2")}
                className="w-full p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-lg border bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-300">
                    F2
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border bg-amber-500/20 text-amber-300 border-amber-500/30">
                        EL COSTO OCULTO
                      </span>
                      <span className="text-xs text-purple-300/60 font-mono">Cada 8 Horas</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      Funding Rate (Tasa de Financiación) & Arbitraje Delta Neutral
                    </h4>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${
                    openFuturesModules.fut2 ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openFuturesModules.fut2 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-purple-500/20 p-5 sm:p-6 space-y-6 bg-black/20"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                        <h5 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                          Funding Rate Positivo (+)
                        </h5>
                        <p className="text-xs text-purple-200/80 leading-relaxed">
                          Ocurre cuando el precio del futuro cotiza por encima del precio Spot. <strong>Los traders en Long pagan a los traders en Short cada 8 horas.</strong>
                        </p>
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200">
                          <strong>Señal de mercado:</strong> Si el Funding es extremadamente positivo (+0.05% a +0.1%), el mercado está sobrecalentado y eufórico. Alta probabilidad de un Long Squeeze (caída correctiva).
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                        <h5 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                          <TrendingDown className="w-4 h-4 text-rose-400" />
                          Funding Rate Negativo (-)
                        </h5>
                        <p className="text-xs text-purple-200/80 leading-relaxed">
                          Ocurre cuando el futuro cotiza por debajo del Spot por pánico. <strong>Los traders en Short pagan a los traders en Long cada 8 horas.</strong>
                        </p>
                        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-200">
                          <strong>Señal de mercado:</strong> Funding muy negativo (-0.05% a -0.1%) indica pánico bajista extremo. Suele preceder un Short Squeeze masivo (rally alcista repentino).
                        </div>
                      </div>
                    </div>

                    {/* Arbitrage Explanation */}
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                      <h5 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-amber-400" />
                        Estrategia Cash & Carry / Arbitraje de Funding (Delta Neutral)
                      </h5>
                      <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                        Si compras $10,000 en BTC Spot y abres simultáneamente un Short en Futuros Perpetuos por $10,000 con 1x de apalancamiento, tu posición es <strong>Delta Neutral</strong> (inmune a si Bitcoin sube o baja). En mercados alcistas donde el Funding Rate anualizado es del 20%–40%, cobras los pagos de financiación cada 8 horas en dólares sin ningún riesgo de precio.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Módulo 3: Tabla de Apalancamiento & Fórmulas */}
            <div className="rounded-3xl bg-white/5 border border-purple-500/20 overflow-hidden backdrop-blur-md">
              <button
                onClick={() => toggleFuturesModule("fut3")}
                className="w-full p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-lg border bg-gradient-to-br from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-300">
                    F3
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border bg-rose-500/20 text-rose-300 border-rose-500/30">
                        MATEMÁTICA PURA
                      </span>
                      <span className="text-xs text-purple-300/60 font-mono">Tabla de Liquidación</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      Tabla de Liquidación por Apalancamiento & Fórmulas Clave
                    </h4>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${
                    openFuturesModules.fut3 ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openFuturesModules.fut3 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-purple-500/20 p-5 sm:p-6 space-y-6 bg-black/20"
                  >
                    {/* Tabla de Liquidación */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-purple-500/30 text-purple-300 font-mono uppercase tracking-wider">
                            <th className="py-3 px-3">Apalancamiento</th>
                            <th className="py-3 px-3">Caída que liquida (Long)</th>
                            <th className="py-3 px-3">Subida que liquida (Short)</th>
                            <th className="py-3 px-3">Margen Requerido</th>
                            <th className="py-3 px-3">Nivel de Riesgo & Uso</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-500/10">
                          {LEVERAGE_TABLE_DATA.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                              <td className="py-3 px-3 font-mono font-bold text-amber-300">{row.lev}</td>
                              <td className="py-3 px-3 font-mono font-semibold text-rose-400">{row.longDrop}</td>
                              <td className="py-3 px-3 font-mono font-semibold text-rose-400">{row.shortRise}</td>
                              <td className="py-3 px-3 font-mono text-cyan-300">{row.margin}</td>
                              <td className="py-3 px-3">
                                <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${row.badge}`}>
                                  {row.risk}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Fórmulas Grid */}
                    <div className="space-y-3 pt-4 border-t border-purple-500/20">
                      <h5 className="text-sm font-bold text-white flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-cyan-400" />
                        Fórmulas Esenciales del Trader de Futuros
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {FUTURES_FORMULAS.map((f, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 font-mono block">
                              {f.title}
                            </span>
                            <div className="p-2.5 rounded-xl bg-black/40 border border-amber-500/30 text-amber-300 font-mono text-xs leading-relaxed">
                              {f.formula}
                            </div>
                            <span className="text-[11px] text-cyan-300 font-mono block">{f.example}</span>
                            <p className="text-[11px] text-purple-200/70">{f.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Módulo 4: Tipos de Órdenes */}
            <div className="rounded-3xl bg-white/5 border border-purple-500/20 overflow-hidden backdrop-blur-md">
              <button
                onClick={() => toggleFuturesModule("fut4")}
                className="w-full p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-lg border bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border-blue-500/40 text-blue-300">
                    F4
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border bg-blue-500/20 text-blue-300 border-blue-500/30">
                        EJECUCIÓN TÁCTICA
                      </span>
                      <span className="text-xs text-purple-300/60 font-mono">8 Tipos de Órdenes</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      Tipos de Órdenes en Futuros & Control de Slippage
                    </h4>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${
                    openFuturesModules.fut4 ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openFuturesModules.fut4 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-purple-500/20 p-5 sm:p-6 space-y-6 bg-black/20"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {ORDER_TYPES_DATA.map((ord, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-2">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border inline-block ${ord.badge}`}>
                              {ord.tag}
                            </span>
                            <h5 className="text-sm font-bold text-white">{ord.name}</h5>
                            <p className="text-xs text-purple-200/75 leading-relaxed">{ord.desc}</p>
                          </div>
                          <div className="p-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-[11px] text-cyan-300 font-mono">
                            → {ord.useCase}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Módulo 5: Market Data Avanzado (OI, Liquidaciones, CVD) */}
            <div className="rounded-3xl bg-white/5 border border-purple-500/20 overflow-hidden backdrop-blur-md">
              <button
                onClick={() => toggleFuturesModule("fut5")}
                className="w-full p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-lg border bg-gradient-to-br from-violet-500/20 to-purple-500/10 border-violet-500/40 text-violet-300">
                    F5
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border bg-violet-500/20 text-violet-300 border-violet-500/30">
                        DATOS INSTITUCIONALES
                      </span>
                      <span className="text-xs text-purple-300/60 font-mono">Coinglass / Velo</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      Open Interest (OI), Mapas de Liquidación & CVD
                    </h4>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${
                    openFuturesModules.fut5 ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openFuturesModules.fut5 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-purple-500/20 p-5 sm:p-6 space-y-6 bg-black/20"
                  >
                    {/* 4 Cuadrantes de Open Interest */}
                    <div className="space-y-3">
                      <h5 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-amber-400" />
                        {"// Los 4 Cuadrantes del Open Interest (OI)"}
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                          <strong className="text-emerald-300 font-bold block">1. OI Sube ↗ + Precio Sube ↗</strong>
                          <p className="text-emerald-100/90">Tendencia alcista genuina y fuerte. Nuevos contratos Long entrando agresivamente al mercado.</p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1">
                          <strong className="text-rose-300 font-bold block">2. OI Sube ↗ + Precio Baja ↘</strong>
                          <p className="text-rose-100/90">Tendencia bajista con fuerte convicción. Nuevos contratos Short abriéndose en masa.</p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                          <strong className="text-amber-300 font-bold block">3. OI Baja ↘ + Precio Sube ↗</strong>
                          <p className="text-amber-100/90">Subida por &apos;Short Covering&apos; (cierre obligado de shorts). Rally frágil sin dinero nuevo.</p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-1">
                          <strong className="text-cyan-300 font-bold block">4. OI Baja ↘ + Precio Baja ↘</strong>
                          <p className="text-cyan-100/90">Capitulación y cierre forzoso de Longs. Señal potencial de agotamiento vendedor y suelo.</p>
                        </div>
                      </div>
                    </div>

                    {/* Liquidations & Heatmaps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                        <h6 className="text-sm font-bold text-cyan-300">🗺️ Mapa de Calor de Liquidaciones (Coinglass)</h6>
                        <p className="text-xs text-purple-200/80 leading-relaxed">
                          Muestra las bandas de precio exactas donde están concentradas las mayores órdenes de liquidación. Las zonas con colores brillantes actúan como <strong>imanes de liquidez</strong>: el precio tiende a barrerlas antes de cambiar de dirección.
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                        <h6 className="text-sm font-bold text-purple-300">📊 Delta Acumulado de Volumen (CVD)</h6>
                        <p className="text-xs text-purple-200/80 leading-relaxed">
                          Mide la agresividad neta de compradores vs vendedores a mercado. Si el precio sube pero el CVD baja, revela que las compras no tienen fuerza y se avecina una reversión bajista (divergencia).
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 2. SECCIÓN: SETUPS DE ALTA PROBABILIDAD                    */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "setups_pro") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-emerald-400">
                {"// 02 — Gatillos de Entrada & Ejecución"}
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Target className="w-6 h-6 text-emerald-400" />
                4 Setups de Futuros Paso a Paso
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
              Un setup es un algoritmo mental estricto. Si falta una sola condición, no hay trade. Domina 2 de ellos.
            </p>
          </div>

          <div className="space-y-4">
            {HIGH_PROBABILITY_SETUPS.map((setup) => {
              const isOpen = openSetups[setup.id] || false;
              return (
                <div
                  key={setup.id}
                  className={`rounded-3xl border backdrop-blur-md overflow-hidden transition-all ${setup.color}`}
                >
                  <button
                    onClick={() => toggleSetup(setup.id)}
                    className="w-full p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-xl text-xs font-bold font-mono uppercase tracking-wider border ${setup.badge}`}>
                        {setup.dir}
                      </span>
                      <div>
                        <h4 className="text-lg font-bold text-white">{setup.title}</h4>
                        <p className="text-xs text-purple-200/70 mt-0.5">{setup.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono text-purple-300/70 hidden sm:inline-block">
                        {setup.timeframes}
                      </span>
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
                        className="border-t border-purple-500/20 p-5 sm:p-6 bg-black/30"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {setup.steps.map((st) => (
                            <div
                              key={st.num}
                              className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-1.5"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-mono font-bold text-amber-400">
                                  PASO {st.num}
                                </span>
                              </div>
                              <h5 className="text-sm font-bold text-white">{st.name}</h5>
                              <p className="text-xs text-purple-200/80 leading-relaxed">{st.desc}</p>
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
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 3. SECCIÓN: SUITE DE CALCULADORAS INTERACTIVAS             */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "calculadoras") && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-amber-400">
                {"// 03 — Suite Matemática"}
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Calculator className="w-6 h-6 text-amber-400" />
                Suite de Calculadoras en Vivo (Posición, Liquidación & Funding)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
              Herramientas interactivas en tiempo real para no entrar a ciegas a ningún trade.
            </p>
          </div>

          {/* 1. Calculadora de Tamaño de Posición y Riesgo */}
          <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-6">
            <h4 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-purple-500/20 pb-3">
              <Crosshair className="w-5 h-5 text-cyan-400" />
              1. Calculadora de Tamaño de Posición & Ratio Riesgo/Beneficio (R:R)
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Inputs */}
              <div className="lg:col-span-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-purple-300">Capital de Cuenta ($ USD)</label>
                    <input
                      type="number"
                      value={calcAccountBalance}
                      onChange={(e) => setCalcAccountBalance(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono text-sm focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-purple-300">Riesgo Deseado (% Cuenta)</label>
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
                    <label className="text-xs font-semibold text-cyan-300">Precio Entrada ($)</label>
                    <input
                      type="number"
                      value={calcEntryPrice}
                      onChange={(e) => setCalcEntryPrice(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-cyan-500/30 text-white font-mono text-sm focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-rose-300">Precio Stop Loss ($)</label>
                    <input
                      type="number"
                      value={calcStopLoss}
                      onChange={(e) => setCalcStopLoss(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-rose-500/30 text-white font-mono text-sm focus:border-rose-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-emerald-300">Precio Take Profit ($)</label>
                    <input
                      type="number"
                      value={calcTakeProfit}
                      onChange={(e) => setCalcTakeProfit(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-500/30 text-white font-mono text-sm focus:border-emerald-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-purple-300">Apalancamiento</label>
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

                <div className="flex flex-wrap items-center gap-2 pt-1">
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

              {/* Outputs */}
              <div className="lg:col-span-6 p-5 rounded-2xl bg-black/40 border border-purple-500/30 flex flex-col justify-between space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-rose-500/30">
                    <span className="text-[11px] text-rose-300/80 block">Dólares en Riesgo</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-rose-400">
                      ${riskAmount.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-emerald-500/30">
                    <span className="text-[11px] text-emerald-300/80 block">Ganancia Potencial</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-emerald-400">
                      ${potentialProfit.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-amber-500/30">
                    <span className="text-[11px] text-amber-300/80 block">Ratio R:R</span>
                    <span
                      className={`text-base sm:text-lg font-bold font-mono ${
                        riskRewardRatio >= 2 ? "text-emerald-400" : "text-amber-400"
                      }`}
                    >
                      1 : {riskRewardRatio.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-cyan-500/30">
                    <span className="text-[11px] text-cyan-300/80 block">Tamaño Posición ($)</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-cyan-400">
                      ${totalPositionValue.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-purple-500/30">
                    <span className="text-[11px] text-purple-300/80 block">Unidades del Token</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-purple-300">
                      {positionUnits.toFixed(4)}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-purple-500/30">
                    <span className="text-[11px] text-purple-300/80 block">Margen Requerido</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-white">
                      ${marginRequired.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
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
                      {riskRewardRatio >= 2 ? "Ratio R:R Óptimo: " : "Atención con el R:R: "}
                    </strong>
                    Necesitas acertar al menos el <strong className="font-mono text-white">{breakEvenWinRate.toFixed(1)}%</strong> de tus operaciones para ser rentable.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Calculadora de Precio de Liquidación */}
          <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-6">
            <h4 className="text-lg font-bold text-rose-300 flex items-center gap-2 border-b border-purple-500/20 pb-3">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              2. Calculadora de Precio de Liquidación (Long vs Short)
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setLiqDirection("long")}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider border cursor-pointer transition-all flex items-center justify-center gap-2 ${
                      liqDirection === "long"
                        ? "bg-emerald-500 text-white border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                        : "bg-white/5 text-purple-300/70 border-purple-500/20"
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    Posición Long (Compra)
                  </button>
                  <button
                    onClick={() => setLiqDirection("short")}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider border cursor-pointer transition-all flex items-center justify-center gap-2 ${
                      liqDirection === "short"
                        ? "bg-rose-500 text-white border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.3)]"
                        : "bg-white/5 text-purple-300/70 border-purple-500/20"
                    }`}
                  >
                    <ArrowDownRight className="w-4 h-4" />
                    Posición Short (Venta)
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-purple-300">Precio de Entrada ($)</label>
                    <input
                      type="number"
                      value={liqEntryPrice}
                      onChange={(e) => setLiqEntryPrice(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono text-sm focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-purple-300">Apalancamiento ({liqLeverage}x)</label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={liqLeverage}
                      onChange={(e) => setLiqLeverage(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-purple-300/60">
                      <span>1x</span>
                      <span>10x</span>
                      <span>25x</span>
                      <span>50x</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-purple-300">
                    Margen de Mantenimiento del Exchange ({liqMaintenanceMarginPct}%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={liqMaintenanceMarginPct}
                    onChange={(e) => setLiqMaintenanceMarginPct(Number(e.target.value) || 0.5)}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono text-xs focus:border-purple-400 outline-none"
                  />
                </div>
              </div>

              {/* Result Box */}
              <div className="lg:col-span-6 p-5 rounded-2xl bg-black/40 border border-rose-500/30 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-rose-300 block">
                    Precio Estimado de Liquidación
                  </span>
                  <div className="text-3xl font-black font-mono text-rose-400">
                    ${calculatedLiqPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-purple-200/80">
                    El activo debe moverse un <strong className="font-mono text-white">{distanceToLiqPct.toFixed(2)}%</strong> en tu contra para liquidar el 100% de tu margen asignado.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200 space-y-1">
                  <strong>💡 Regla de Invalidez:</strong> Tu Stop Loss debe estar siempre ubicado mucho más cerca del precio de entrada que este precio de liquidación. ¡Jamás permitas que sea el exchange quien cierre tu posición!
                </div>
              </div>
            </div>
          </div>

          {/* 3. Calculadora de Funding Rate */}
          <div className="p-6 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-6">
            <h4 className="text-lg font-bold text-amber-300 flex items-center gap-2 border-b border-purple-500/20 pb-3">
              <Percent className="w-5 h-5 text-amber-400" />
              3. Calculadora de Costo de Funding Rate & Rendimiento Delta Neutral
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-purple-300">Valor Notional ($)</label>
                    <input
                      type="number"
                      value={fundPositionValue}
                      onChange={(e) => setFundPositionValue(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono text-sm focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-purple-300">Funding Rate % (8h)</label>
                    <input
                      type="number"
                      step="0.001"
                      value={fundRatePct}
                      onChange={(e) => setFundRatePct(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono text-sm focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-purple-300">Días de Hold</label>
                    <input
                      type="number"
                      value={fundDaysHolding}
                      onChange={(e) => setFundDaysHolding(Number(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono text-sm focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 p-5 rounded-2xl bg-black/40 border border-amber-500/30 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-purple-500/20">
                  <span className="text-[11px] text-purple-300/80 block">Pago cada 8h</span>
                  <span className="text-base font-bold font-mono text-amber-300">
                    ${fundCostPer8h.toFixed(2)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-purple-500/20">
                  <span className="text-[11px] text-purple-300/80 block">Pago Diario (3x)</span>
                  <span className="text-base font-bold font-mono text-amber-300">
                    ${fundCostPerDay.toFixed(2)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-purple-500/20">
                  <span className="text-[11px] text-purple-300/80 block">Total en {fundDaysHolding} días</span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    ${fundTotalPeriod.toFixed(2)}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200">
                  <strong>Rendimiento Anualizado Estimado (APR):</strong>{" "}
                  <span className="font-mono font-bold text-white text-sm">{fundAnnualizedAPR.toFixed(2)}%</span> (si mantienes una posición de arbitraje Short cobrando la tasa).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 4. SECCIÓN: 6 FASES DEL TRADER                             */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "fases") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">
                {"// 04 — Hoja de Ruta Gradual"}
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
            {PHASES_DATA.map((phase) => {
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
                              {"// Objetivo Fundamental de la Fase:"}
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
                              {"// 💡 Consejo de Aplicación Práctica:"}
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
      {/* 5. SECCIÓN: ESTRATEGIAS DE TRADING                         */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "estrategias") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-purple-400">
                {"// 05 — Metodologías Operativas"}
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Scale className="w-6 h-6 text-purple-400" />
                Estrategias por Estilo & Horizonte Temporal
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
              Cada estrategia se adapta a un estilo de vida, disponibilidad horaria y perfil de tolerancia al riesgo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STRATEGIES_DATA.map((strat, idx) => (
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
      {/* 6. SECCIÓN: CATÁLOGO DE PATRONES & VELAS                   */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "patrones") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-emerald-400">
                {"// 06 — Acción del Precio & Figuras"}
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <CandlestickChart className="w-6 h-6 text-emerald-400" />
                Catálogo de Patrones de Gráfico & Velas Japonesas
              </h3>
            </div>

            {/* Pattern Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all" as const, label: "Todos" },
                { id: "alcista" as const, label: "🟢 Alcistas" },
                { id: "bajista" as const, label: "🔴 Bajistas" },
                { id: "figura" as const, label: "📐 Figuras" },
                { id: "vela" as const, label: "🕯️ Velas" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setPatternFilter(f.id)}
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
      {/* 7. SECCIÓN: ON-CHAIN, WYCKOFF & SMART MONEY CONCEPTS       */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "onchain_smc") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">
                {"// 07 — Conceptos Institucionales"}
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-cyan-400" />
                Análisis On-Chain, Wyckoff & Smart Money Concepts
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
                  El &apos;Composite Man&apos; compra silenciosamente en un rango mientras el público capitula en pánico.
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/20 space-y-1">
                  <strong className="text-amber-300 block">El &apos;Spring&apos; (Manantial):</strong>
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
      {/* 8. SECCIÓN: PSICOLOGÍA & 8 ERRORES EN FUTUROS              */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "riesgo_psico") && (
        <div className="space-y-8">
          {/* 8 Errores Mentales de Futuros */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-rose-400">
                  {"// 08.1 — Lo Que Nadie Te Dice"}
                </span>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Brain className="w-6 h-6 text-rose-400" />
                  Los 8 Errores Mentales que Destruyen Cuentas de Futuros
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
                El apalancamiento no solo amplifica las ganancias; amplifica exponencialmente el pánico y la avaricia.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FUTURES_PSYCHOLOGY_ERRORS.map((err) => (
                <div
                  key={err.num}
                  className="p-5 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-3 hover:border-rose-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 inline-block">
                      ERROR #{err.num}
                    </span>
                    <h4 className="text-base font-bold text-white">{err.name}</h4>
                    <p className="text-xs text-purple-200/75 leading-relaxed">{err.desc}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-emerald-500/20 text-[11px] text-emerald-300">
                    <strong>Antídoto:</strong> {err.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 12 Reglas de Oro Generales */}
          <div className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-amber-400">
                  {"// 08.2 — Blindaje Operativo"}
                </span>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-amber-400" />
                  Las 12 Reglas de Oro del Trading Profesional
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GOLDEN_RULES.map((rule) => (
                <div
                  key={rule.num}
                  className="p-5 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2 hover:border-amber-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono font-bold text-amber-400">REGLA #{rule.num}</span>
                    <h4 className="text-base font-bold text-white">{rule.title}</h4>
                    <p className="text-xs text-purple-200/80 leading-relaxed">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 9. SECCIÓN: ARSENAL DE HERRAMIENTAS                        */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "herramientas") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-purple-400">
                {"// 09 — Software & Plataformas"}
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Arsenal de Herramientas Recomendadas
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
              No necesitas pagar suscripciones caras para empezar. Estas plataformas ofrecen versiones gratuitas extraordinarias.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS_ARSENAL.map((t, idx) => (
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
      {/* 10. SECCIÓN: YOUTUBE & BIBLIOTECA DE LIBROS                */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "youtube_libros") && (
        <div className="space-y-8">
          {/* YouTube Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-rose-400">
                  {"// 10.1 — YouTube: Sí, pero así"}
                </span>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <YouTubeIcon className="w-6 h-6 text-rose-400" />
                  Canales de YouTube Transparentes
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
                Aprende de creadores con rigor analítico y huye de canales de &apos;señales VIP&apos; y promesas de dinero rápido.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {YOUTUBE_CHANNELS.map((yt, idx) => (
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
                  {"// 10.2 — Biblioteca Imprescindible"}
                </span>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-amber-400" />
                  Los Libros Obligatorios para Traders
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LEGENDARY_BOOKS.map((b, idx) => (
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
      {/* 11. SECCIÓN: PLAN DE EVOLUCIÓN & CHECKLIST INTERACTIVO     */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "plan_checklist") && (
        <div className="space-y-8">
          {/* Realistic Timeline */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">
                  {"// 11.1 — Cronograma de Evolución Realista"}
                </span>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Clock className="w-6 h-6 text-cyan-400" />
                  Timeline de Aprendizaje Honesto (18 Meses a 2+ Años)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-purple-200/60 max-w-md">
                No existen atajos. Convertirse en un trader rentable exige paciencia, práctica deliberada y humildad.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  period: "Meses 1–2",
                  title: "Fundamentos & Demo 1x",
                  desc: "Aprende mecánica de perpetuos, funding rate, tipos de órdenes. Opera en Bybit/Binance Testnet sin apalancamiento. Lee 'Trading in the Zone'.",
                  color: "border-cyan-500/40 text-cyan-300",
                },
                {
                  period: "Meses 3–4",
                  title: "AT & Estructura (2x)",
                  desc: "Domina soportes, tendencias, velas y Fibonacci. Completa 50 trades demo documentados con razonamiento en tu diario.",
                  color: "border-purple-500/40 text-purple-300",
                },
                {
                  period: "Meses 5–6",
                  title: "Setups & Gestión Real",
                  desc: "Elige 2 setups y domínalos. Aplica la regla estricta del 1% de riesgo. Si eres positivo 2 meses seguidos en demo, pasa a real.",
                  color: "border-amber-500/40 text-amber-300",
                },
                {
                  period: "Meses 7–9",
                  title: "Fuego Real Mínimo ($100–$300)",
                  desc: "Opera exactamente igual que en demo (máximo 2x–3x). El objetivo no es ganar dinero, sino dominar las emociones con dinero real.",
                  color: "border-emerald-500/40 text-emerald-300",
                },
                {
                  period: "Año 2+",
                  title: "Especialización & Consistencia",
                  desc: "Trader con edge estadístico probado. Explora Order Flow, arbitraje de funding rate, automatización con bots y gestión de fondos.",
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

          {/* Interactive Checklist */}
          <div className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-purple-900/40 via-black/40 to-amber-900/40 border border-purple-500/30 backdrop-blur-md">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-amber-400">
                  {"// 11.2 — Auditoría de Preparación Pre-Trade"}
                </span>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-6 h-6 text-amber-400" />
                  Checklist de Futuros ({completedCount}/{CHECKLIST_ITEMS.length})
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
                  Marca cada casilla a medida que domines cada concepto. Tu progreso se guarda automáticamente en tu navegador.
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
                    ? "🎉 ¡Listo para operar con disciplina estricta!"
                    : checklistPct >= 65
                    ? "🚀 Buen avance, continúa practicando en demo"
                    : "🌱 Fase de estudio y fundamentos esenciales"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CHECKLIST_ITEMS.map((item) => {
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
      {/* 12. SECCIÓN: GLOSARIO CRIPTO & FUTUROS                     */}
      {/* ────────────────────────────────────────────────────────── */}
      {(activeSubTab === "all" || activeSubTab === "glosario") && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">
                {"// 12 — Diccionario de Cripto & Derivados"}
              </span>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Info className="w-6 h-6 text-cyan-400" />
                Glosario Técnico & Búsqueda Rápida
              </h3>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
              <input
                type="text"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Buscar término (ej. Funding, Mark Price)..."
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
        <h4 className="text-lg font-bold text-white">El Edge del Trader es la Gestión de Riesgo y la Paciencia</h4>
        <p className="text-xs sm:text-sm text-purple-200/70 max-w-xl mx-auto leading-relaxed">
          Recuerda: el mercado de futuros siempre estará ahí mañana. Lo que pierdes por precipitarte y sobreapalancarte se va para siempre. Opera con reglas claras, protege tu capital y disfruta del proceso de aprendizaje.
        </p>
      </div>
    </div>
  );
}
