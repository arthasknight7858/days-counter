"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Calculator,
  Globe,
  FlaskConical,
  Languages,
  Calendar,
  Zap,
  CheckCircle2,
  Square,
  Clock,
  Award,
  Compass,
  Brain,
  CheckSquare,
  Target,
  BookCheck,
} from "lucide-react";
import IcfesCuadernillos from "./IcfesCuadernillos";

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function IcfesRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_icfes_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  const toggleChecklist = (id: string) => {
    setCompletedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_icfes_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "cuadernillos", label: "📑 Cuadernillos Oficiales (199+ Pts)", icon: BookCheck },
    { id: "estructura", label: "📋 Estructura & Puntajes", icon: Award },
    { id: "areas", label: "📚 Las 5 Pruebas", icon: BookOpen },
    { id: "roadmap", label: "🗺️ Roadmap por Fases", icon: Compass },
    { id: "estrategias", label: "🧠 Métodos de Estudio", icon: Brain },
    { id: "youtube", label: "▶️ Canales YouTube", icon: YouTubeIcon },
    { id: "horario", label: "📅 Horario Semanal", icon: Calendar },
    { id: "trucos", label: "⚡ Trucos para el Día D", icon: Zap },
    { id: "recursos", label: "🎯 Recursos & Checklist", icon: CheckSquare },
  ];

  const subjects = [
    {
      id: "matematicas",
      name: "Matemáticas",
      icon: Calculator,
      questions: "~45 preguntas · Peso muy alto",
      difficulty: "Dificultad: Alta",
      diffBadge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      color: "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
      iconBg: "bg-blue-500/20 text-blue-300",
      desc: "Evalúa la capacidad para resolver situaciones reales usando herramientas matemáticas. NO pide procedimientos de memoria, sino razonamiento y aplicación en contexto.",
      topics: [
        {
          title: "Álgebra y Funciones",
          sub: "Expresiones algebraicas, ecuaciones lineales y cuadráticas, sistemas de ecuaciones, inecuaciones, funciones (lineal, cuadrática, exponencial, logarítmica) y gráficas.",
        },
        {
          title: "Geometría y Medición",
          sub: "Figuras planas (área, perímetro), sólidos geométricos (volumen, superficie), teorema de Pitágoras, semejanza, congruencia y transformaciones.",
        },
        {
          title: "Pensamiento Numérico y Variacional",
          sub: "Números reales, razones y proporciones, regla de tres, porcentajes, interés simple/compuesto, variación directa e inversa.",
        },
        {
          title: "Estadística y Probabilidad",
          sub: "Tablas y gráficas estadísticas, medidas de tendencia central (media, mediana, moda), medidas de dispersión, probabilidad clásica y combinatoria básica.",
        },
        {
          title: "Trigonometría Básica",
          sub: "Razones trigonométricas (sen, cos, tan), triángulo rectángulo y aplicaciones contextuales (no cálculo avanzado).",
        },
      ],
    },
    {
      id: "lectura",
      name: "Lectura Crítica",
      icon: BookOpen,
      questions: "~45 preguntas · Transversal a todo",
      difficulty: "Dificultad: Media-Alta",
      diffBadge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      color: "from-purple-500/20 to-pink-500/10 border-purple-500/30",
      iconBg: "bg-purple-500/20 text-purple-300",
      desc: "Es la prueba con mayor impacto global porque sus competencias de comprensión se usan en todas las demás. Evalúa comprensión local, articulación global y reflexión crítica.",
      topics: [
        {
          title: "Tipos de Texto",
          sub: "Continuos (narrativos, argumentativos, expositivos, filosóficos) y discontinuos (infografías, gráficas, tablas, caricaturas y mapas).",
        },
        {
          title: "Identificación de Ideas",
          sub: "Idea principal vs secundaria, tema central, intención comunicativa del autor y público objetivo.",
        },
        {
          title: "Estructura Textual & Conectores",
          sub: "Coherencia, cohesión, conectores lógicos (sin embargo, por lo tanto, en consecuencia, no obstante).",
        },
        {
          title: "Evaluación de Argumentos",
          sub: "Identificar premisas y conclusiones, detectar falacias lógicas y juzgar la validez de una tesis.",
        },
        {
          title: "Inferencias & Tono del Autor",
          sub: "Deducir información implícita, significado por contexto y tonos (irónico, crítico, informativo, escéptico).",
        },
      ],
    },
    {
      id: "sociales",
      name: "Sociales y Ciudadanas",
      icon: Globe,
      questions: "~45 preguntas · Enfoque analítico",
      difficulty: "Dificultad: Media",
      diffBadge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
      iconBg: "bg-emerald-500/20 text-emerald-300",
      desc: "Evalúa la comprensión del mundo social, historia, geografía, economía y competencias ciudadanas. Enfoque analítico, no de memorizar fechas sueltas.",
      topics: [
        {
          title: "Historia de Colombia y el Mundo",
          sub: "Independencia, siglo XX, conflicto armado, Frente Nacional, Constitución de 1991. Guerras mundiales, Guerra Fría y globalización.",
        },
        {
          title: "Geografía Humana y Física",
          sub: "Regiones de Colombia, recursos naturales, demografía, migraciones, urbanización y cambio climático.",
        },
        {
          title: "Economía Básica",
          sub: "Oferta y demanda, PIB, inflación, desempleo, mercado laboral y papel del Estado en la economía.",
        },
        {
          title: "Constitución & Mecanismos de Participación",
          sub: "Derechos fundamentales, ramas del poder público, Acción de Tutela, referendo, plebiscito y cabildo abierto.",
        },
        {
          title: "Pensamiento Social Crítico",
          sub: "Analizar múltiples perspectivas frente a un dilema social y reconocer causas y consecuencias multidimensionales.",
        },
      ],
    },
    {
      id: "ciencias",
      name: "Ciencias Naturales (Bio + Quím + Fís)",
      icon: FlaskConical,
      questions: "~45 preguntas · 3 disciplinas integradas",
      difficulty: "Dificultad: Alta",
      diffBadge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
      iconBg: "bg-amber-500/20 text-amber-300",
      desc: "Integra Biología, Química y Física. Evalúa explicación de fenómenos, uso comprensivo del conocimiento científico e indagación a partir de experimentos.",
      topics: [
        {
          title: "Biología: Célula, Genética & Ecosistemas",
          sub: "Mitosis/meiosis, ADN y síntesis de proteínas, leyes de Mendel, cadenas tróficas, ciclos biogeoquímicos y evolución.",
        },
        {
          title: "Química: Materia, Reacciones & Soluciones",
          sub: "Estructura atómica, enlaces químicos, estados de la materia, estequiometría, balanceo, pH, escala de acidez y concentración de soluciones.",
        },
        {
          title: "Física: Mecánica, Cinemática & Fuerzas",
          sub: "MRU, MRUV, leyes de Newton, trabajo, energía cinética y potencial, conservación de la energía mecánica y caída libre.",
        },
        {
          title: "Física: Ondas, Termodinámica & Circuitos",
          sub: "Ondas sonoras y lumínicas, reflexión/refracción, calor y temperatura, Ley de Ohm y circuitos en serie/paralelo.",
        },
      ],
    },
    {
      id: "ingles",
      name: "Inglés (Lectura A1–B2)",
      icon: Languages,
      questions: "~45 preguntas · MCE A1 a B2",
      difficulty: "Dificultad: Fácil-Media (gran margen de subida)",
      diffBadge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      color: "from-pink-500/20 to-rose-500/10 border-pink-500/30",
      iconBg: "bg-pink-500/20 text-pink-300",
      desc: "Evalúa comprensión lectora en 7 partes (avisos, emparejamiento, completar textos, preguntas de lectura literal e inferencial). No hay prueba oral ni de escucha.",
      topics: [
        {
          title: "Vocabulario en Contexto",
          sub: "Avisos en lugares públicos, descripciones cotidianas, viajes, trabajo y entornos académicos.",
        },
        {
          title: "Gramática Funcional",
          sub: "Tiempos verbales (presente, pasado, presente perfecto), modales (can, must, should), voz pasiva y condicionales.",
        },
        {
          title: "Comprensión de Textos Cortos y Medios",
          sub: "Identificar propósito del autor, detalles específicos, opiniones implícitas y conectores (however, therefore, although).",
        },
      ],
    },
  ];

  const roadmapPhases = [
    {
      phase: "Fase 1 · Meses 1–2",
      title: "Diagnóstico & Cimientos",
      color: "border-emerald-500/40 bg-emerald-950/20 text-emerald-300",
      steps: [
        "Presenta un simulacro diagnóstico completo cronometrado (cuadernillos oficiales del ICFES).",
        "Identifica tus áreas fuertes y débiles sin adivinar.",
        "Refuerza bases críticas: álgebra básica, lectura de gráficas y comprensión lectora.",
        "Estudia la Guía de Orientación oficial del ICFES para conocer los tipos de preguntas.",
      ],
    },
    {
      phase: "Fase 2 · Meses 3–5",
      title: "Estudio Profundo por Áreas",
      color: "border-blue-500/40 bg-blue-950/20 text-blue-300",
      steps: [
        "Mes 3: Enfoque prioritario en Matemáticas (álgebra, geometría, estadística) y Lectura Crítica.",
        "Mes 4: Ciencias Naturales (alternar Biología, Química y Física) y Sociales (mapas conceptuales y líneas de tiempo).",
        "Mes 5: Inglés diario (textos, gramática en contexto) + resolución continua de preguntas tipo ICFES.",
      ],
    },
    {
      phase: "Fase 3 · Meses 6–7",
      title: "Simulacros Intensivos & Corrección",
      color: "border-purple-500/40 bg-purple-950/20 text-purple-300",
      steps: [
        "1 simulacro completo por semana en condiciones reales (mismo horario, sin celular, cronometrado).",
        "Lleva un 'Cuaderno de Errores': analiza cada fallo y el porqué de la respuesta correcta.",
        "Entrena la velocidad: promedio de 1.8 a 2 minutos por pregunta.",
      ],
    },
    {
      phase: "Fase 4 · Semana del Examen",
      title: "Puesta a Punto & Ejecución",
      color: "border-amber-500/40 bg-amber-950/20 text-amber-300",
      steps: [
        "Días –7 a –3: Repaso ligero de fórmulas clave, conectores y apuntes breves. Cero temas nuevos.",
        "Días –2 a –1: Descanso total, preparar documentos (cédula/TI), lápiz Mirado 2, borrador y tajalápiz.",
        "Día D: Desayuno nutritivo, hidratación, leer con calma y NUNCA dejar preguntas en blanco.",
      ],
    },
  ];

  const studyStrategies = [
    {
      title: "Técnica Feynman",
      icon: "🗣️",
      desc: "Explica cada tema difícil de matemáticas o ciencias con palabras simples como a un niño de 10 años. Si no puedes simplificarlo, aún no lo dominas.",
    },
    {
      title: "Técnica Pomodoro (25/5)",
      icon: "⏱️",
      desc: "25 min de estudio enfocado sin distracciones + 5 min de descanso activo. Mantiene la mente fresca durante maratones de estudio.",
    },
    {
      title: "Flashcards con Anki",
      icon: "🎴",
      desc: "Usa repetición espaciada para memorizar vocabulario de inglés, fórmulas de física y conceptos de química sin saturarte.",
    },
    {
      title: "Cuaderno de Errores",
      icon: "📓",
      desc: "Anota cada pregunta que falles en simulacros y explica con tus palabras cuál era la trampa y por qué la correcta es la correcta.",
    },
    {
      title: "Ley de Pareto (80/20)",
      icon: "🎯",
      desc: "El 20% de los temas genera el 80% del puntaje. Domina primero álgebra, estadística, lectura crítica e indagación científica.",
    },
    {
      title: "Sueño y Memoria",
      icon: "🌙",
      desc: "Dormir 8 horas consolida lo estudiado. Estudiar 3 horas bien descansado supera a estudiar 6 horas con fatiga y desvelo.",
    },
  ];

  const youtubeChannels = [
    { name: "Matemáticas con el Profe Alex", cat: "Matemáticas", desc: "Explicaciones paso a paso de álgebra, geometría y estadística con enfoque pedagógico claro." },
    { name: "Khan Academy en Español", cat: "Todas las áreas", desc: "Cursos interactivos gratuitos desde cero en matemáticas, biología, química, física e historia." },
    { name: "ICFES Interactivo (Oficial)", cat: "Oficial", desc: "Canal del Instituto con videos explicativos de la prueba, ejemplos oficiales y directrices." },
    { name: "BBC Learning English", cat: "Inglés", desc: "Videos cortos y prácticos para mejorar comprensión lectora, vocabulario cotidiano y gramática." },
    { name: "Química con el Profe / Física Profe", cat: "Ciencias", desc: "Explicación de reacciones, estequiometría, cinemática y leyes de Newton aplicadas a preguntas tipo Saber 11." },
  ];

  const weeklySchedule = [
    { day: "Lunes", subject: "🔢 Matemáticas", activity: "Tema nuevo (ej. funciones / estadística) + 15 preguntas ICFES", time: "90 min" },
    { day: "Martes", subject: "📖 Lectura Crítica", activity: "2 textos (argumentativo + infografía) + análisis de preguntas", time: "75 min" },
    { day: "Miércoles", subject: "🔬 Ciencias Naturales", activity: "Alternar Bio/Química/Física + resolución de preguntas de indagación", time: "90 min" },
    { day: "Jueves", subject: "🌍 Sociales & Ciudadanas", activity: "Constitución, historia o economía + mapas conceptuales", time: "60 min" },
    { day: "Viernes", subject: "🗣️ Inglés", activity: "Lectura de textos cortos + gramática en contexto + 15 preguntas", time: "45 min" },
    { day: "Sábado", subject: "🎯 Simulacro / Repaso", activity: "Semanas 1-2: repaso de errores. Semanas 3-4: simulacro cronometrado", time: "2–3 hrs" },
    { day: "Domingo", subject: "😴 Descanso Activo", activity: "Desconexión total o lectura ligera / documental. Cero estrés", time: "Libre" },
  ];

  const dayDTricks = [
    { trick: "Regla de los 2 Minutos", desc: "Si una pregunta te toma más de 2 minutos, marca tu mejor opción provisional, ponle una seña en el cuadernillo y continúa. Vuelve al final con mente despejada." },
    { trick: "Descarte Activo Sistemático", desc: "Elimina de inmediato las 2 opciones patentemente absurdas o extremistas. Tu probabilidad de acertar sube del 25% al 50% al instante." },
    { trick: "Lee la Pregunta ANTES del Texto", desc: "En Lectura Crítica y Sociales, lee el enunciado antes del párrafo. Así tu cerebro sabe exactamente qué dato o argumento buscar." },
    { trick: "NUNCA Dejes Preguntas en Blanco", desc: "El ICFES NO tiene penalización por respuesta incorrecta. Siempre responde todas las casillas de la hoja de respuestas." },
    { trick: "En Matemáticas, Sustituye Opciones", desc: "Si no sabes despejar la ecuación, prueba reemplazando los valores de las opciones A, B, C, D hasta que la igualdad cuadre." },
    { trick: "Alerta con Palabras Trampa", desc: "Palabras como 'siempre', 'nunca', 'únicamente', 'excepto' o 'NO es' suelen indicar trampas o falsedades. Subráyalas siempre." },
  ];

  const checklist = [
    { id: "icf_diag", label: "Presentar simulacro diagnóstico completo y calificarlo", stage: "Mes 1" },
    { id: "icf_guia", label: "Leer la Guía de Orientación Saber 11 oficial de icfes.gov.co", stage: "Mes 1" },
    { id: "icf_math_base", label: "Dominar álgebra lineal, porcentajes, áreas, volúmenes y regla de tres", stage: "Mes 2" },
    { id: "icf_lect_types", label: "Practicar textos continuos y discontinuos (infografías y caricaturas)", stage: "Mes 3" },
    { id: "icf_ciencias_indag", label: "Comprender la competencia de indagación en experimentos de ciencias", stage: "Mes 4" },
    { id: "icf_constitucion", label: "Repasar derechos fundamentales, Tutela y ramas del poder público", stage: "Mes 4" },
    { id: "icf_simulacros_cron", label: "Realizar mínimo 4 simulacros completos cronometrados en tiempo real", stage: "Mes 6" },
    { id: "icf_cuaderno_fallos", label: "Tener el Cuaderno de Errores revisado y corregido al 100%", stage: "Mes 7" },
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
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
            🇨🇴 Guía Maestra ICFES Saber 11° · Edición 2026
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Roadmap </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-purple-300 to-emerald-300">
              Saber 11°
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            Todo para dominar las 5 pruebas del examen de Estado: temarios completos, estrategias comprobadas, simulacros y tácticas para puntaje alto.
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-xl p-4 rounded-2xl bg-white/5 border border-blue-500/20 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-300 block">5</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Pruebas</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-300 block">~230</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Preguntas</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-300 block">9h</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Duración</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 block">500</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Puntaje Máx</span>
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

      {/* 0. CUADERNILLOS OFICIALES DE PREGUNTAS */}
      {(activeSubTab === "all" || activeSubTab === "cuadernillos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <IcfesCuadernillos />
        </motion.section>
      )}

      {/* 1. ESTRUCTURA & PUNTAJES */}
      {(activeSubTab === "all" || activeSubTab === "estructura") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Reglas del Juego</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-400" />
              ¿Cómo Funciona el Examen Saber 11°?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2">
              <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
                <Target className="w-4 h-4" /> ¿Qué evalúa?
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Mide competencias de razonamiento, análisis y aplicación en contextos reales. NO evalúa memoria de datos aislados.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <Calculator className="w-4 h-4" /> ¿Cómo se puntúa?
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                Cada prueba puntúa de 0 a 100. El puntaje global es el ponderado hasta 500 puntos. <strong>Sin puntos negativos por fallar.</strong>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                <Clock className="w-4 h-4" /> ¿Cuánto dura?
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                2 sesiones de 4 horas y media el mismo domingo, con receso intermedio para almorzar e hidratarse.
              </p>
            </div>
          </div>

          {/* Scoring Reference */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-black/25 border border-white/10 text-center space-y-1">
              <span className="text-2xl font-black text-purple-300">0–100</span>
              <span className="text-[11px] text-purple-200/70 block">Puntaje por Área</span>
            </div>
            <div className="p-4 rounded-2xl bg-black/25 border border-white/10 text-center space-y-1">
              <span className="text-2xl font-black text-blue-300">300+</span>
              <span className="text-[11px] text-purple-200/70 block">Puntaje Decente</span>
            </div>
            <div className="p-4 rounded-2xl bg-black/25 border border-white/10 text-center space-y-1">
              <span className="text-2xl font-black text-emerald-300">380+</span>
              <span className="text-[11px] text-purple-200/70 block">Puntaje Alto (Becas)</span>
            </div>
            <div className="p-4 rounded-2xl bg-black/25 border border-white/10 text-center space-y-1">
              <span className="text-2xl font-black text-amber-300">450+</span>
              <span className="text-[11px] text-purple-200/70 block">Puntaje Excepcional</span>
            </div>
          </div>
        </motion.section>
      )}

      {/* 2. LAS 5 PRUEBAS A FONDO */}
      {(activeSubTab === "all" || activeSubTab === "areas") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Temario Completo</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              Las 5 Pruebas Explicadas al Detalle
            </h3>
          </div>

          <div className="space-y-5">
            {subjects.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  className={`rounded-2xl border backdrop-blur-md p-5 sm:p-6 bg-linear-to-br ${s.color} space-y-4`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${s.iconBg}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-white">{s.name}</h4>
                        <span className="text-xs text-purple-200/70">{s.questions}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${s.diffBadge}`}>
                      {s.difficulty}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">{s.desc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2 border-t border-white/10">
                    {s.topics.map((t, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-1">
                        <span className="text-xs font-bold text-white block">{t.title}</span>
                        <p className="text-[11px] text-purple-200/75 leading-relaxed">{t.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* 3. ROADMAP POR FASES */}
      {(activeSubTab === "all" || activeSubTab === "roadmap") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Plan de Ataque</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-purple-400" />
              Roadmap: De 0 a Puntaje Alto
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roadmapPhases.map((rp, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border backdrop-blur-md space-y-3 ${rp.color}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase">{rp.phase}</span>
                </div>
                <h4 className="text-lg font-bold text-white">{rp.title}</h4>
                <ul className="space-y-2 text-xs text-purple-100/90 pt-2 border-t border-white/10">
                  {rp.steps.map((st, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 4. MÉTODOS DE ESTUDIO */}
      {(activeSubTab === "all" || activeSubTab === "estrategias") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Eficiencia de Aprendizaje</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-amber-400" />
              Estrategias de Estudio Comprobadas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyStrategies.map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2 hover:border-amber-400/40 transition-colors"
              >
                <span className="text-2xl">{st.icon}</span>
                <h4 className="font-bold text-white text-base">{st.title}</h4>
                <p className="text-xs text-purple-200/75 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 5. CANALES YOUTUBE */}
      {(activeSubTab === "all" || activeSubTab === "youtube") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">Preicfes Gratuito</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <YouTubeIcon className="w-6 h-6 text-red-500" />
              YouTube como Preicfes de Alto Nivel
            </h3>
            <p className="text-purple-200/70 text-sm">
              Puedes prepararte 100% gratis combinando videos conceptuales con cuadernillos oficiales del ICFES.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeChannels.map((ch, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2 hover:border-red-400/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                    {ch.cat}
                  </span>
                </div>
                <h4 className="font-bold text-white text-base">{ch.name}</h4>
                <p className="text-xs text-purple-200/75 leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 6. HORARIO SEMANAL */}
      {(activeSubTab === "all" || activeSubTab === "horario") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Planificación Realista</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-teal-400" />
              Horario Semanal Sugerido (6–8 Meses)
            </h3>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-purple-500/20 bg-white/5 backdrop-blur-md">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-white/5 text-purple-200 uppercase font-mono text-[11px] border-b border-purple-500/20">
                <tr>
                  <th className="p-3.5 sm:p-4">Día</th>
                  <th className="p-3.5 sm:p-4">Área Principal</th>
                  <th className="p-3.5 sm:p-4">Actividad Clave</th>
                  <th className="p-3.5 sm:p-4">Tiempo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-purple-100">
                {weeklySchedule.map((ws, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-teal-300">{ws.day}</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">{ws.subject}</td>
                    <td className="p-3.5 sm:p-4 text-xs text-purple-200/90">{ws.activity}</td>
                    <td className="p-3.5 sm:p-4 font-mono text-purple-300">{ws.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      )}

      {/* 7. TRUCOS DÍA D */}
      {(activeSubTab === "all" || activeSubTab === "trucos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Tácticas de Examen</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-400" />
              Trucos para Ganar Puntos el Día del Examen
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayDTricks.map((tr, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-amber-950/15 border border-amber-500/20 backdrop-blur-md space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">⚡</span>
                  <h4 className="font-bold text-white text-sm sm:text-base">{tr.trick}</h4>
                </div>
                <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed">{tr.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 8. RECURSOS & CHECKLIST */}
      {(activeSubTab === "all" || activeSubTab === "recursos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Seguimiento de Metas</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <CheckSquare className="w-6 h-6 text-emerald-400" />
              Checklist de Preparación ICFES
            </h3>
            <p className="text-purple-200/70 text-sm">Marca los hitos conforme los vayas logrando.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {checklist.map((item) => {
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

          <div className="p-6 rounded-2xl bg-linear-to-r from-blue-950/40 via-purple-950/30 to-emerald-950/40 border border-blue-400/30 text-center space-y-2">
            <span className="text-xl sm:text-2xl font-bold text-blue-200 block">
              🚀 Recuerda: La disciplina vence al talento
            </span>
            <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mx-auto leading-relaxed">
              El ICFES premia a quien practica con preguntas reales y entiende el porqué de cada opción. ¡Con constancia y este roadmap vas a lograr un puntaje extraordinario! 💖
            </p>
          </div>
        </motion.section>
      )}
    </div>
  );
}
