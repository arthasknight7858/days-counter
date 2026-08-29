"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  Compass,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Square,
  Scale,
  Zap,
  TrendingUp,
  Layers,
  ChevronDown,
} from "lucide-react";

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function CriticalThinkingRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_thinking_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({ "th-f1": true, "th-f2": true });

  const toggleChecklist = (id: string) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_thinking_checklist", JSON.stringify(updated));
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
    { id: "sesgos", label: "🧠 Sesgos Cognitivos", icon: AlertTriangle },
    { id: "falacias", label: "⚖️ Falacias Lógicas", icon: Scale },
    { id: "modelos", label: "🧩 Modelos Mentales", icon: Layers },
    { id: "sistemas", label: "⚙️ Pensamiento Sistémico", icon: TrendingUp },
    { id: "youtube", label: "▶️ Canales YouTube", icon: YouTubeIcon },
    { id: "libros", label: "📚 Biblioteca Esencial", icon: BookOpen },
    { id: "trucos", label: "⚡ Hacks Cognitivos", icon: Zap },
    { id: "plan", label: "🎯 Plan 90 Días", icon: CheckCircle2 },
  ];

  const phases = [
    {
      id: "th-f1",
      num: "Fase 01",
      duration: "⏱ 1–2 meses",
      title: "Fundamentos: Conocer tu Mente Tal Como Es",
      color: "from-blue-500/20 to-indigo-500/10 border-blue-500/40 text-blue-300",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      desc: "Comprender la arquitectura cognitiva antes de entrenarla: Sistema 1 vs. Sistema 2 de Daniel Kahneman, sesgos inconscientes y la ilusión de comprensión.",
      topics: [
        "Sistema 1 (rápido, intuitivo, automático) y Sistema 2 (lento, deliberado, analítico)",
        "Más de 180 sesgos cognitivos documentados (confirmación, anclaje, disponibilidad)",
        "Heurísticas: atajos mentales evolutivos y cuándo fallan",
        "Efecto Dunning-Kruger: por qué la incompetencia genera exceso de confianza",
        "Metacognición: el arte de monitorear tu propio proceso de razonamiento",
      ],
    },
    {
      id: "th-f2",
      num: "Fase 02",
      duration: "⏱ 2–3 meses",
      title: "Lógica & Argumentación Rigurosa",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      desc: "La gramática del pensamiento: estructura de premisas y conclusiones, razonamiento inductivo/deductivo/abductivo y detección de falacias.",
      topics: [
        "Lógica informal: premisas válidas, inferencia y conclusiones sólidas",
        "Deducción (de la regla al caso), Inducción (del caso a la regla) y Abducción",
        "Catálogo de falacias: Ad Hominem, Hombre de Paja, Pendiente Resbaladiza, Falsa Dicotomía",
        "El Método Socrático: formular preguntas que revelan contradicciones",
        "Distinción científica estricta entre correlación y causalidad",
      ],
    },
    {
      id: "th-f3",
      num: "Fase 03",
      duration: "⏱ 2–3 meses",
      title: "Epistemología Práctica & Calibración de Creencias",
      color: "from-purple-500/20 to-fuchsia-500/10 border-purple-500/40 text-purple-300",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      desc: "¿Cómo sabemos lo que creemos saber? Evaluación rigurosa de evidencia, actualización Bayesiana de probabilidades y falsabilidad de Popper.",
      topics: [
        "Grados de certeza: hablar en probabilidades (ej. 70% seguro) en lugar de absolutos",
        "Pensamiento Bayesiano: actualizar creencias previas con la fuerza de nueva evidencia",
        "Principio de Falsabilidad: una afirmación que no puede ser refutada no es conocimiento",
        "Evaluación de fuentes: consenso científico vs. anécdotas individuales",
        "Steel-Manning: construir la versión más fuerte y convincente del argumento contrario",
      ],
    },
    {
      id: "th-f4",
      num: "Fase 04",
      duration: "⏱ 3–4 meses",
      title: "Pensamiento Sistémico & Modelos Mentales Multidisciplinarios",
      color: "from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-300",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      desc: "La rejilla de modelos mentales de Charlie Munger: primeros principios, inversión, efectos de segundo orden y teoría de sistemas (Donella Meadows).",
      topics: [
        "Teoría de Sistemas: stocks, flujos, bucles de retroalimentación y efectos emergentes",
        "Primeros Principios: descomponer cualquier problema en verdades fundamentales irreducibles",
        "Inversión de Munger: resolver problemas preguntando qué causaría el desastre y evitarlo",
        "Pensamiento de Segundo Orden: analizar las consecuencias de las consecuencias",
        "Costo de Oportunidad: la alternativa más valiosa a la que renuncias al elegir",
        "La Navaja de Occam y el principio de parsimonia",
      ],
    },
    {
      id: "th-f5",
      num: "Fase 05",
      duration: "⏱ Toda la vida",
      title: "Integración, Filosofía Práctica & Maestría",
      color: "from-rose-500/20 to-red-500/10 border-rose-500/40 text-rose-300",
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      desc: "Aplicación diaria en decisiones reales, escritura argumentativa, lectura analítica de textos difíciles (Mortimer Adler) y filosofía estoica.",
      topics: [
        "Escritura argumentativa diaria como prueba de fuego de claridad mental",
        "Diario de Pensamiento (Thinking Journal) para auditar errores recurrentes",
        "Lectura analítica profunda de ensayos filosóficos y científicos complejos",
        "Filosofía estoica aplicada (Marco Aurelio, Séneca, Epicteto)",
        "Humildad intelectual: la disposición constante a cambiar de opinión ante la verdad",
      ],
    },
  ];

  const biases = [
    { name: "Sesgo de Confirmación", desc: "Buscar y recordar solo información que respalde lo que ya crees.", fix: "Busca activamente las mejores pruebas que contradigan tu hipótesis." },
    { name: "Efecto Anclaje", desc: "Quedar condicionado por el primer dato o número que escuchas.", fix: "Calcula tu propio estimado antes de escuchar las propuestas de otros." },
    { name: "Sesgo de Disponibilidad", desc: "Evaluar la probabilidad de un suceso por lo fácil que recuerdas un ejemplo dramático.", fix: "Apóyate en estadísticas y datos fríos, no en anécdotas de noticias." },
    { name: "Sesgo del Punto Ciego", desc: "Creer que los demás están llenos de sesgos mientras uno mismo es objetivo.", fix: "Pide retroalimentación externa y asume que tienes sesgos activos." },
    { name: "Pensamiento Grupal", desc: "La presión social de un grupo suprime las dudas y el análisis crítico individual.", fix: "Escribe tus conclusiones de forma privada antes de la reunión de grupo." },
    { name: "Aversión a la Pérdida", desc: "El dolor de perder $100 es el doble de intenso que la alegría de ganar $100.", fix: "Evalúa las decisiones por su valor esperado matemático sin miedo irracional." },
  ];

  const fallacies = [
    { name: "Ad Hominem", desc: "Atacar a la persona que expone el argumento en lugar de refutar la idea misma." },
    { name: "Hombre de Paja", desc: "Caricaturizar o distorsionar la postura contraria para destruirla fácilmente." },
    { name: "Pendiente Resbaladiza", desc: "Afirmar que un paso pequeño conducirá inevitablemente a una catástrofe extrema sin pruebas." },
    { name: "Falsa Dicotomía", desc: "Reducir un problema complejo a solo dos opciones extremas ('o blanco o negro')." },
    { name: "Apelación a la Mayoría (Ad Populum)", desc: "Sostener que algo es verdadero solo porque la mayoría de las personas lo cree." },
    { name: "Post Hoc Ergo Propter Hoc", desc: "Concluir erróneamente que porque B ocurrió después de A, A causó B." },
  ];

  const mentalModels = [
    { name: "🔬 Primeros Principios", desc: "Desarma el problema hasta sus piezas atómicas y reconstruye la solución desde cero sin copiar analogías." },
    { name: "🔄 Inversión (Munger)", desc: "'Invierte, siempre invierte'. Para tener una buena relación o negocio, averigua qué lo destruiría y evítalo." },
    { name: "🗺️ El Mapa ≠ Territorio", desc: "Los modelos y gráficos son simplificaciones de la realidad. Nunca confundas la teoría con el mundo real." },
    { name: "🎯 Costo de Oportunidad", desc: "El costo real de cualquier decisión es el valor de la mejor opción a la que estás renunciando." },
    { name: "🌐 Efectos de Segundo Orden", desc: "No te quedes con la consecuencia inmediata (orden 1). Pregunta: '¿Y después de eso, qué pasará?'" },
    { name: "📐 Ley de Rendimientos Decrecientes", desc: "Identifica el punto exacto donde añadir más tiempo o recursos produce cada vez menos beneficio." },
  ];

  const tricks = [
    { num: "01", title: "Steel-Manning (Hombre de Acero)", desc: "Antes de refutar a tu oponente, construye la versión más sólida y brillante de su argumento. Solo refútalo cuando admita que entendiste su punto." },
    { num: "02", title: "Las 5 Preguntas Socráticas", desc: "1. ¿Qué significa exactamente? · 2. ¿Cómo lo sabes? · 3. ¿Es siempre cierto? · 4. ¿Qué suposiciones hay? · 5. ¿Qué consecuencias tiene?" },
    { num: "03", title: "Pre-Mortem de Gary Klein", desc: "Antes de lanzar un proyecto, imagina que pasaron 6 meses y fue un fracaso absoluto. Escribe exactamente qué causó la ruina y arréglalo ya." },
    { num: "04", title: "El Test del Titular Opuesto", desc: "Al leer una noticia sensacionalista, imagina cómo sería el titular con el enfoque opuesto para detectar el sesgo editorial." },
    { num: "05", title: "Estimaciones Fermi", desc: "Aprende a estimar números complejos dividiéndolos en órdenes de magnitud lógicos para desarrollar intuición cuantitativa." },
    { num: "06", title: "Principio de Caridad Hermenéutica", desc: "Interpreta las palabras ajenas en su sentido más racional e inteligente posible antes de juzgarlas." },
  ];

  const checklistItems = [
    { id: "th_kahneman", label: "Leer 'Pensar Rápido, Pensar Despacio' y reconocer el Sistema 1 vs 2", stage: "Fase 1" },
    { id: "th_biases", label: "Auditar los 6 sesgos cognitivos más frecuentes en tus decisiones diarias", stage: "Fase 1" },
    { id: "th_fallacies", label: "Identificar y desmontar falacias lógicas en noticias y debates", stage: "Fase 2" },
    { id: "th_steelman", label: "Practicar la técnica de Steel-Manning en una discusión real", stage: "Fase 3" },
    { id: "th_bayes", label: "Expresar opiniones con porcentajes de probabilidad bayesiana", stage: "Fase 3" },
    { id: "th_first_principles", label: "Aplicar Primeros Principios e Inversión de Munger a un dilema personal", stage: "Fase 4" },
    { id: "th_journal", label: "Mantener un Diario de Pensamiento semanal con lecciones y errores", stage: "Fase 5" },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-950/40 via-purple-950/30 to-black/60 backdrop-blur-xl border border-indigo-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(99,102,241,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            Entrenamiento Mental Superior · De Cero a Pensador Riguroso
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Pensamiento </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-300 via-purple-300 to-amber-300">
              Crítico, Profundo &amp; Sistemático
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            El arte de pensar sobre tu propio pensamiento: sesgos cognitivos, lógica formal, epistemología bayesiana y modelos mentales multidisciplinarios.
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-xl p-4 rounded-2xl bg-white/5 border border-indigo-500/20 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-300 block">5</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Fases</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-300 block">180+</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Sesgos</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 block">Munger</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Modelos</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-300 block">90 Días</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Plan</span>
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
                  ? "bg-indigo-600/90 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)] scale-102 font-bold"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. LAS 5 FASES */}
      {(activeSubTab === "all" || activeSubTab === "fases") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Ruta por Niveles</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-indigo-400" />
              Las 5 Fases del Pensador Riguroso
            </h3>
          </div>

          <div className="space-y-4">
            {phases.map((p) => {
              const isOpen = !!openPhases[p.id];
              return (
                <div
                  key={p.id}
                  className={`rounded-2xl border backdrop-blur-md transition-all overflow-hidden bg-linear-to-br ${p.color}`}
                >
                  <div
                    onClick={() => togglePhase(p.id)}
                    className="p-5 sm:p-6 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className={`text-xs font-mono font-bold uppercase px-3 py-1 rounded-lg border ${p.badge}`}>
                        {p.num}
                      </span>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-white">{p.title}</h4>
                        <span className="text-xs text-purple-200/70 font-mono">{p.duration}</span>
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
                        <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed pt-3">{p.desc}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
                          {p.topics.map((t, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-black/30 border border-white/10 text-xs text-purple-100 font-medium flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                              <span>{t}</span>
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

      {/* 2. SESGOS COGNITIVOS */}
      {(activeSubTab === "all" || activeSubTab === "sesgos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Trampas Mentales</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Los Sesgos Cognitivos más Frecuentes
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {biases.map((b, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2">
                <h4 className="font-bold text-amber-300 text-base">{b.name}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{b.desc}</p>
                <div className="pt-2 border-t border-white/5 text-xs text-emerald-300">
                  🛡️ <strong>Defensa:</strong> {b.fix}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 3. FALACIAS LÓGICAS */}
      {(activeSubTab === "all" || activeSubTab === "falacias") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Errores de Argumentación</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Scale className="w-6 h-6 text-rose-400" />
              Catálogo de Falacias Lógicas
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fallacies.map((f, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-rose-950/15 border border-rose-500/20 space-y-1.5">
                <h4 className="font-bold text-rose-200 text-base">{f.name}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 4. MODELOS MENTALES */}
      {(activeSubTab === "all" || activeSubTab === "modelos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Rejilla Multidisciplinaria</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-purple-400" />
              Los Mejores Modelos Mentales (Charlie Munger)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentalModels.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                <h4 className="font-bold text-purple-300 text-base">{m.name}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 5. TRUCOS & HACKS */}
      {(activeSubTab === "all" || activeSubTab === "trucos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Hacks Cognitivos</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-400" />
              Tácticas para Pensar 10x Más Claro
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tricks.map((t, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-amber-950/15 border border-amber-500/20 space-y-1.5">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">Hack {t.num}</span>
                <h4 className="font-bold text-white text-sm sm:text-base">{t.title}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 6. CHECKLIST & PLAN */}
      {(activeSubTab === "all" || activeSubTab === "plan") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Plan de 90 Días</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              Checklist de Evolución Crítica
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {checklistItems.map((item) => {
              const isChecked = !!completedTasks[item.id];
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
                    <span className="text-[10px] uppercase font-mono font-bold text-indigo-300/80 block mb-0.5">
                      {item.stage}
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
        </motion.section>
      )}
    </div>
  );
}
