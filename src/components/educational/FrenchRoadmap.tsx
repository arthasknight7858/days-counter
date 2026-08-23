"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  BookOpen,
  Wrench,
  Brain,
  Calendar,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Clock,
  Volume2,
  Mic,
  PenTool,
  BookMarked,
  Layers,
  ChevronDown,
  ChevronUp,
  Heart,
  Lightbulb,
} from "lucide-react";

export default function FrenchRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [openLevels, setOpenLevels] = useState<Record<string, boolean>>({ a1: true });

  const toggleLevel = (lvl: string) => {
    setOpenLevels((prev) => ({ ...prev, [lvl]: !prev[lvl] }));
  };

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "fases", label: "🗺️ Las 5 Fases", icon: Compass },
    { id: "niveles", label: "🎯 Niveles MCER", icon: Layers },
    { id: "pilares", label: "🏛️ Los 6 Pilares", icon: BookMarked },
    { id: "youtube", label: "▶️ YouTube & Canales", icon: BookOpen },
    { id: "recursos", label: "🔧 Recursos por Tipo", icon: Wrench },
    { id: "trucos", label: "🧠 Trucos & Estrategias", icon: Brain },
    { id: "temario", label: "📚 Temario Detallado", icon: BookOpen },
    { id: "errores", label: "⚠️ Faux Amis & Errores", icon: AlertTriangle },
    { id: "plan", label: "📅 Plan Semanal", icon: Calendar },
  ];

  const mcerLevels = [
    {
      level: "A1",
      name: "Descubrimiento",
      desc: "Frases sueltas, presentarte y pedir cosas básicas.",
      hours: "≈ 80–100 h",
      color: "from-blue-500/20 to-cyan-500/10 border-blue-400/40 text-blue-300",
    },
    {
      level: "A2",
      name: "Supervivencia",
      desc: "Rutinas, pasado simple y conversaciones cortas.",
      hours: "≈ 180–200 h",
      color: "from-teal-500/20 to-emerald-500/10 border-teal-400/40 text-teal-300",
    },
    {
      level: "B1",
      name: "Umbral de Autonomía",
      desc: "Te defiendes sola: viajar, trabajar y opinar.",
      hours: "≈ 350–400 h",
      color: "from-purple-500/20 to-indigo-500/10 border-purple-400/40 text-purple-300",
    },
    {
      level: "B2",
      name: "Avanzado / Fluido",
      desc: "Debates, matices y francés real sin subtítulos.",
      hours: "≈ 550–600 h",
      color: "from-rose-500/20 to-pink-500/10 border-rose-400/40 text-rose-300",
    },
    {
      level: "C1",
      name: "Dominio & Maestría",
      desc: "Precisión, registros formales y soltura nativa.",
      hours: "≈ 750+ h",
      color: "from-amber-500/20 to-yellow-500/10 border-amber-400/40 text-amber-300",
    },
  ];

  const phases = [
    {
      when: "Fase 0 · Semanas 1–4 · Cimientos",
      title: "Oído y Sonidos antes que Reglas",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      desc: "Entrena el oído y familiarízate con la fonética antes de obsesionarte con la escritura formal.",
      what: [
        "Alfabeto y sonidos clave (vocales nasales, la 'r' francesa, 'u' vs 'ou')",
        "Saludos, presentación personal y números del 0 al 100",
        "Verbos être, avoir, aller y faire en presente",
        "Artículos (le/la/les, un/une) y género de sustantivos",
      ],
      how: [
        "15 min diarios de fonética y pronunciación",
        "Repetición en voz alta (técnica de Shadowing) desde el primer día",
        "App básica (Duolingo) para afianzar el hábito diario",
      ],
      note: "✍️ Consejo: No te preocupes por escribir perfecto al inicio; entrena tu oído, lo demás se construye sobre esa base.",
    },
    {
      when: "Fase 1 · Mes 2–4 · Supervivencia (A1 → A2)",
      title: "Frases Útiles del Día a Día",
      badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
      desc: "Comienzas a formular oraciones completas y entender situaciones cotidianas.",
      what: [
        "Presente de verbos regulares (-er, -ir, -re) e irregulares frecuentes",
        "Estructura de negación (ne...pas) y preguntas (est-ce que, inversión)",
        "Vocabulario: comida, familia, ciudad, compras y clima",
        "Introducción al passé composé (pasado compuesto)",
      ],
      how: [
        "Crear mazo propio en Anki con frases completas en contexto",
        "Ver 10 min diarios de canales de YouTube para principiantes",
        "Escribir 3 frases diarias sobre tu rutina",
      ],
    },
    {
      when: "Fase 2 · Mes 4–8 · Construcción (A2 → B1)",
      title: "Empiezas a Contar Historias",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      desc: "El salto clave: comienzas a expresarte en pasado, futuro y expresar tus opiniones.",
      what: [
        "Passé composé vs. Imparfait (el gran reto de los tiempos pasados)",
        "Futur simple, condicional y pronombres COD/COI ('y' / 'en')",
        "Primeros usos del subjuntivo ('il faut que...')",
        "Vocabulario temático amplio: trabajo, salud y opiniones",
      ],
      how: [
        "Primera sesión de intercambio o tutoría (Tandem o italki)",
        "Podcasts a ritmo moderado para nivel intermedio",
        "Cambiar el idioma del móvil y redes sociales a francés",
      ],
      note: "💡 Aquí la gramática se vuelve más densa: baja el ritmo si lo necesitas, pero mantén la constancia diaria.",
    },
    {
      when: "Fase 3 · Mes 8–14 · Consolidación (B1 → B2)",
      title: "Matices y Francés 'Real'",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      desc: "Comprendes francés hablado natural, modismos y participas en conversaciones profundas.",
      what: [
        "Subjuntivo completo y discurso indirecto",
        "Conectores de argumentación (cependant, néanmoins, dès lors)",
        "Registros formal e informal ('j'sais pas', 'chuis')",
      ],
      how: [
        "Series y podcasts sin subtítulos (o solo con subtítulos en francés)",
        "Escritura semanal corregida por tutor o IA",
        "Lectura de novelas cortas o noticias adaptadas",
      ],
    },
    {
      when: "Fase 4 · Mes 12 en Adelante · Fluidez (B2 → C1)",
      title: "Inmersión Total & Pensamiento en Francés",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      desc: "El francés se convierte en un idioma que simplemente disfrutas y usas a diario.",
      what: [
        "Humor, referencias culturales y expresiones idiomáticas",
        "Vocabulario especializado según tus gustos personales y profesionales",
      ],
      how: [
        "Vive en francés: lectura de libros, radio y música",
        "Deja de traducir mentalmente: piensa directamente en francés",
      ],
    },
  ];

  const pillars = [
    {
      icon: Volume2,
      title: "👂 Escucha (Écoute)",
      desc: "El músculo que más tarda en afinarse. Escucha aunque no entiendas todo: el oído se entrena por exposición constante.",
    },
    {
      icon: Mic,
      title: "🗣️ Habla (Parole)",
      desc: "Habla en voz alta desde el primer mes narrando lo que haces. No esperes a 'estar lista' para tu primera conversación real.",
    },
    {
      icon: BookOpen,
      title: "📖 Lectura (Lecture)",
      desc: "Empieza con lecturas graduadas (A1/A2) antes de saltar a novelas complejas. Subraya y comprende por contexto.",
    },
    {
      icon: PenTool,
      title: "✍️ Escritura (Écriture)",
      desc: "Escribe poco pero seguido: 3 a 5 frases diarias valen mucho más que un texto largo cada dos semanas.",
    },
    {
      icon: Layers,
      title: "🔤 Gramática (Grammaire)",
      desc: "Estúdiala para comprender patrones lógicos, no para memorizar tablas frías. Aplica cada regla en frases propias.",
    },
    {
      icon: Sparkles,
      title: "🎤 Pronunciación (Prononciation)",
      desc: "El francés no se lee como se escribe. Aprende las reglas de liaisons y letras mudas finales desde el día uno.",
    },
  ];

  const youtubeGroups = [
    {
      category: "Para empezar desde cero (en español)",
      badge: "Nivel A1–A2",
      channels: [
        { name: "Français avec Pierre", desc: "Uno de los catálogos más completos del mundo, incluye preparación para el DELF." },
        { name: "Learn French with Alexa", desc: "Lecciones muy estructuradas, ritmo pausado y explicaciones amables." },
        { name: "Pariseando", desc: "Pareja franco-mexicana, explican en español con mucha cultura práctica cotidiana." },
        { name: "Aprender Francés con Judy", desc: "Explicaciones directas pensadas para hispanohablantes desde nivel A1." },
      ],
    },
    {
      category: "Para oído e input comprensible",
      badge: "Nivel A2–B1+",
      channels: [
        { name: "InnerFrench", desc: "Historias fascinantes narradas a ritmo claro, diseñadas para comprensión progresiva." },
        { name: "Français Authentique", desc: "Francés hablado a ritmo natural con vocabulario del día a día." },
        { name: "Easy French", desc: "Entrevistas en las calles de París con subtítulos simultáneos en francés e inglés." },
      ],
    },
    {
      category: "Para cultura y expresiones naturales",
      badge: "Nivel B1–B2+",
      channels: [
        { name: "Comme une Française", desc: "Expresiones auténticas, matices culturales y cómo hablan los franceses de verdad." },
        { name: "Piece of French", desc: "Vlogs de vida cotidiana en Francia con un tono cálido y actual." },
      ],
    },
  ];

  const resourcesByType = [
    {
      type: "📱 Apps de Estudio",
      items: [
        "Anki — repetición espaciada para vocabulario que se queda de por vida",
        "Duolingo — útil para calentar 10 minutos y mantener el hábito",
        "italki / Preply — clases de conversación con profesores nativos",
        "Tandem / HelloTalk — intercambio de idiomas gratuito con nativos",
        "LingQ — lee y escucha textos con traducción de palabras al instante",
      ],
    },
    {
      type: "🎙️ Podcasts Recomendados",
      items: [
        "Journal en français facile (RFI) — noticias mundiales a ritmo lento",
        "InnerFrench (Podcast) — reflexiones y cultura para nivel intermedio",
        "Coffee Break French — lecciones guiadas en episodios cortos",
        "News in Slow French — actualidad semanal con vocabulario explicado",
      ],
    },
    {
      type: "🎬 Series y Películas",
      items: [
        "Extra French — comedia creada para estudiantes de francés (A1–A2)",
        "Dix pour cent (Call My Agent) — francés cotidiano dinámico (B1+)",
        "Amélie / Intouchables — clásicos accesibles con subtítulos en francés",
      ],
    },
    {
      type: "📖 Lecturas y Medios",
      items: [
        "Lecturas graduadas por nivel (Lectures faciles A1/A2)",
        "Cómics y BD (Bandes dessinées) como Tintin o Astérix",
        "Prensa fácil: 1jour1actu, Le Monde en français facile",
      ],
    },
  ];

  const studyTricks = [
    {
      num: "01",
      title: "Shadowing (Sombra)",
      desc: "Escucha una frase nativa corta y repítela al instante imitando entonación y ritmo, no solo los sonidos.",
    },
    {
      num: "02",
      title: "Repetición Espaciada en Anki",
      desc: "Crea tarjetas con oraciones completas hechas por ti. Se recuerdan mucho mejor dentro de un contexto real.",
    },
    {
      num: "03",
      title: "Cambia tu Entorno a Francés",
      desc: "Configura el idioma de tu móvil, redes sociales y listas en francés a partir del nivel A2.",
    },
    {
      num: "04",
      title: "Habla Sola en Voz Alta",
      desc: "Narra tus actividades cotidianas en francés. No necesitas a nadie enfrente para entrenar la producción oral.",
    },
    {
      num: "05",
      title: "Vocabulario por Frecuencia (80/20)",
      desc: "Las 1,000 palabras más comunes cubren cerca del 80% de una conversación diaria. Domínalas primero.",
    },
    {
      num: "06",
      title: "Diario Personal en Francés",
      desc: "Escribe 5 líneas al día sobre tu jornada. Consolidarás gramática de forma natural y automática.",
    },
    {
      num: "07",
      title: "Intercambio de Idiomas (Tándem)",
      desc: "Hablar cada semana con alguien que te corrija con paciencia multiplica tu confianza exponencialmente.",
    },
    {
      num: "08",
      title: "Tolera la Ambigüedad",
      desc: "No pauses un audio cada vez que haya una palabra desconocida. Sigue escuchando: tu cerebro deducirá por contexto.",
    },
  ];

  const syllabus = [
    {
      id: "a1",
      level: "Nivel A1 · Descubrimiento",
      grammar: [
        "Être, avoir, aller, faire (en presente)",
        "Verbos regulares terminados en -er",
        "Artículos definidos, indefinidos y género",
        "Negación simple (ne...pas)",
        "Preguntas básicas (est-ce que, qui, où, quand)",
        "Adjetivos posesivos y demostrativos",
      ],
      vocab: [
        "Saludos y presentación personal",
        "Números, días de la semana, meses y la hora",
        "Familia, colores y alimentos cotidianos",
        "Objetos y lugares frecuentes de la ciudad",
      ],
    },
    {
      id: "a2",
      level: "Nivel A2 · Supervivencia",
      grammar: [
        "Passé composé (avoir / être + participio)",
        "Imparfait (introducción a descripciones pasadas)",
        "Futur proche y futur simple",
        "Comparativos y superlativos",
        "Pronombres de objeto directo e indirecto (básico)",
      ],
      vocab: [
        "Ciudad, transportes y cómo pedir direcciones",
        "Compras, prendas de vestir y restaurantes",
        "Salud básica, estados de ánimo y clima",
      ],
    },
    {
      id: "b1",
      level: "Nivel B1 · Umbral de Autonomía",
      grammar: [
        "Passé composé vs. Imparfait (uso avanzado)",
        "Condicional presente",
        "Subjuntivo presente (usos frecuentes)",
        "Pronombres adverbiales 'y' / 'en'",
        "Pronombres relativos (qui, que, où, dont)",
      ],
      vocab: [
        "Trabajo, estudios y expresión de opiniones",
        "Emociones complejas y relaciones interpersonales",
        "Medio ambiente y actualidad general",
      ],
    },
    {
      id: "b2",
      level: "Nivel B2 y Superior",
      grammar: [
        "Subjuntivo completo (todos sus matices)",
        "Discurso indirecto y concordancia de tiempos",
        "Voz pasiva, gerundio y conectores argumentativos",
        "Registros formal/informal y francés coloquial",
      ],
      vocab: [
        "Vocabulario abstracto y debates de opinión",
        "Expresiones idiomáticas y humor",
        "Terminología profesional o académica",
      ],
    },
  ];

  const fauxAmis = [
    { fr: "Attendre", fake: "Atender", real: "Esperar" },
    { fr: "Librairie", fake: "Librería (biblioteca)", real: "Tienda donde se compran libros" },
    { fr: "Sensible", fake: "Sensato", real: "Sensible (emocionalmente)" },
    { fr: "Assister à", fake: "Ayudar (asistir)", real: "Asistir / acudir a un evento" },
    { fr: "Blesser", fake: "Bendecir", real: "Herir / lastimar" },
    { fr: "Journée", fake: "Jornada laboral solo", real: "El día en general (duración)" },
  ];

  const weeklySchedule = [
    { day: "Lunes", focus: "Vocabulario + Anki (15-20 min)" },
    { day: "Martes", focus: "Gramática + ejercicios prácticos (30 min)" },
    { day: "Miércoles", focus: "Escucha activa (podcast / YouTube con InnerFrench)" },
    { day: "Jueves", focus: "Escritura (diario personal en francés)" },
    { day: "Viernes", focus: "Conversación o intercambio en Tandem" },
    { day: "Sábado", focus: "Disfrute: lectura graduada, cómic o serie" },
    { day: "Domingo", focus: "Repaso libre de notas + descanso reparador" },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Hero French Notebook */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-950/30 via-purple-900/20 to-rose-950/30 backdrop-blur-xl border border-blue-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(59,130,246,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            NIVEAU ZÉRO ★ DÉPART ★ DELF / DALF
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Hoja de Ruta para </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-purple-300 to-rose-300">
              Aprender Francés (Français)
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            Una guía honesta y estructurada: más del <strong className="text-blue-300">30% del vocabulario</strong> es reconocible por su raíz latina con el español. La clave principal está en entrenar el oído y la pronunciación con constancia.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {["A1 Débutant", "A2 Survie", "B1 Seuil", "B2 Avancé", "C1 Maîtrise"].map((lvl, i) => (
              <span
                key={i}
                className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/5 border border-purple-400/30 text-purple-200"
              >
                {lvl}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sub-navigation Pills */}
      <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-2 my-4">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border select-none ${
                isActive
                  ? "bg-blue-600/90 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)] scale-102 font-semibold"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. NIVELES MCER */}
      {(activeSubTab === "all" || activeSubTab === "niveles") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Escala Internacional</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-blue-400" />
              El Mapa Completo: Niveles del MCER (DELF / DALF)
            </h3>
            <p className="text-purple-200/70 text-sm">
              La escala oficial para clasificar tu nivel de francés y medir tu progreso paso a paso.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {mcerLevels.map((lvl) => (
              <div
                key={lvl.level}
                className={`rounded-2xl bg-linear-to-br ${lvl.color} backdrop-blur-md border p-4 sm:p-5 flex flex-col justify-between hover:scale-102 transition-transform`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-white">{lvl.level}</span>
                    <span className="text-[10px] font-mono uppercase font-bold text-purple-200">{lvl.hours}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">{lvl.name}</h4>
                  <p className="text-xs text-purple-100/80 leading-relaxed">{lvl.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-xs sm:text-sm text-blue-200/90 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
            <span>
              <strong>Ventaja del hispanohablante:</strong> Compartimos lógica gramatical (género, tiempos subjuntivos) y gran parte del vocabulario latino. El foco principal debe ir a la pronunciación y comprensión auditiva.
            </span>
          </div>
        </motion.section>
      )}

      {/* 2. LAS 5 FASES */}
      {(activeSubTab === "all" || activeSubTab === "fases") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Paso a Paso</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-teal-400" />
              Las 5 Fases del Aprendizaje
            </h3>
            <p className="text-purple-200/70 text-sm">
              Cada fase construye la base sólida para la siguiente con ~30 a 45 minutos diarios de práctica.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-2 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-linear-to-b before:from-blue-400 before:via-teal-500 before:to-rose-500 before:opacity-40">
            {phases.map((ph, idx) => (
              <motion.div
                key={ph.when}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="relative rounded-2xl bg-white/5 border border-purple-500/20 p-5 sm:p-7 backdrop-blur-md space-y-4 hover:border-blue-400/40 transition-colors"
              >
                {/* Dot */}
                <div className="absolute -left-6 sm:-left-10 top-6 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-blue-400 bg-blue-950 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${ph.badgeColor}`}>
                    {ph.when}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-white">{ph.title}</h4>
                </div>

                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">{ph.desc}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-blue-300">Qué aprender:</h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-purple-200/80">
                      {ph.what.map((it, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-teal-300">Cómo aprenderlo:</h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-purple-200/80">
                      {ph.how.map((it, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {ph.note && (
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs sm:text-sm text-purple-200/90 italic">
                    {ph.note}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 3. LOS 6 PILARES */}
      {(activeSubTab === "all" || activeSubTab === "pilares") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Destrezas Fundamentales</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <BookMarked className="w-6 h-6 text-purple-400" />
              Los 6 Pilares a Entrenar por Separado
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md space-y-2 hover:border-purple-400/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-5 h-5 text-blue-300" />
                    <h4 className="font-bold text-white text-base">{p.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* 4. YOUTUBE & CANALES */}
      {(activeSubTab === "all" || activeSubTab === "youtube") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Aprender con Video</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-rose-400" />
              ¿Puedo Aprender Francés solo con YouTube?
            </h3>
            <p className="text-purple-200/70 text-sm">
              Sí para vocabulario, oído, cultura y explicaciones de gramática. Combínalo con práctica oral interactiva (tutor o tándem).
            </p>
          </div>

          <div className="space-y-6">
            {youtubeGroups.map((grp) => (
              <div key={grp.category} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">{grp.category}</h4>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {grp.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {grp.channels.map((ch) => (
                    <div
                      key={ch.name}
                      className="rounded-2xl bg-white/5 border border-purple-500/20 p-4 backdrop-blur-md hover:border-rose-400/40 transition-colors"
                    >
                      <h5 className="font-bold text-white text-sm sm:text-base mb-1">{ch.name}</h5>
                      <p className="text-xs text-purple-200/70 leading-relaxed">{ch.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 5. RECURSOS POR TIPO */}
      {(activeSubTab === "all" || activeSubTab === "recursos") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Caja de Herramientas</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Wrench className="w-6 h-6 text-teal-400" />
              Recursos Recomendados por Tipo
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resourcesByType.map((res) => (
              <div
                key={res.type}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md space-y-3"
              >
                <h4 className="font-bold text-teal-300 text-sm sm:text-base border-b border-white/10 pb-2">
                  {res.type}
                </h4>
                <ul className="space-y-1.5 text-xs text-purple-200/80 leading-relaxed">
                  {res.items.map((it, i) => (
                    <li key={i}>• {it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 6. TRUCOS & ESTRATEGIAS */}
      {(activeSubTab === "all" || activeSubTab === "trucos") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Métodos Comprobados</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-amber-400" />
              8 Trucos y Técnicas de Estudio
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studyTricks.map((tr) => (
              <div
                key={tr.num}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md space-y-2 hover:border-amber-400/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 block">{tr.num}</span>
                  <h4 className="font-bold text-white text-sm sm:text-base">{tr.title}</h4>
                  <p className="text-xs text-purple-200/75 leading-relaxed mt-1">{tr.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 7. TEMARIO DETALLADO */}
      {(activeSubTab === "all" || activeSubTab === "temario") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Checklist Nivel por Nivel</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              Gramática y Vocabulario Detallados
            </h3>
            <p className="text-purple-200/70 text-sm">Toca cada nivel para desplegar su temario específico.</p>
          </div>

          <div className="space-y-3">
            {syllabus.map((s) => {
              const isOpen = !!openLevels[s.id];

              return (
                <div
                  key={s.id}
                  className="rounded-2xl bg-white/5 border border-purple-500/20 overflow-hidden backdrop-blur-md"
                >
                  <button
                    onClick={() => toggleLevel(s.id)}
                    className="w-full p-4 sm:p-5 text-left font-semibold text-white text-sm sm:text-base flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span>{s.level}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-blue-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-purple-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-6 sm:pb-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                      <div className="space-y-2">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-blue-300">Gramática Clave:</h5>
                        <ul className="space-y-1 text-xs sm:text-sm text-purple-200/80">
                          {s.grammar.map((g, i) => (
                            <li key={i}>• {g}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-teal-300">Vocabulario Esencial:</h5>
                        <ul className="space-y-1 text-xs sm:text-sm text-purple-200/80">
                          {s.vocab.map((v, i) => (
                            <li key={i}>• {v}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* 8. FAUX AMIS & ERRORES */}
      {(activeSubTab === "all" || activeSubTab === "errores") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Trampas del Idioma</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-rose-400" />
              Falsos Amigos (Faux Amis) & Errores Típicos
            </h3>
            <p className="text-purple-200/70 text-sm">
              Palabras que suenan parecidas al español pero tienen significados totalmente distintos.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md">
            <div className="grid grid-cols-3 p-4 bg-purple-500/15 border-b border-purple-500/20 text-xs font-bold uppercase tracking-wider text-purple-300">
              <span>Palabra Francesa</span>
              <span>Parece Decir</span>
              <span>Realmente Significa</span>
            </div>
            <div className="divide-y divide-purple-500/10 text-xs sm:text-sm">
              {fauxAmis.map((fa, i) => (
                <div key={i} className="grid grid-cols-3 p-4 hover:bg-white/5 transition-colors">
                  <span className="font-bold text-white">{fa.fr}</span>
                  <span className="text-rose-300/80 line-through">{fa.fake}</span>
                  <span className="text-teal-300 font-medium">{fa.real}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs sm:text-sm text-purple-200/90 space-y-1">
            <strong>Otros tropiezos típicos:</strong>
            <p className="leading-relaxed">
              El género no siempre coincide (ej. <em>la table</em> pero <em>le fromage</em>), las letras finales suelen ser mudas, y en el francés hablado rápido el &ldquo;ne&rdquo; de la negación suele omitirse (ej. <em>&ldquo;j&apos;sais pas&rdquo;</em> en lugar de <em>&ldquo;je ne sais pas&rdquo;</em>).
            </p>
          </div>
        </motion.section>
      )}

      {/* 9. PLAN SEMANAL */}
      {(activeSubTab === "all" || activeSubTab === "plan") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Rutina Sostenible</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-teal-400" />
              Ejemplo de Rutina Semanal (30 a 45 min/día)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {weeklySchedule.map((d, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-4 text-center backdrop-blur-md space-y-1 hover:border-teal-400/40 transition-colors"
              >
                <span className="text-xs font-bold text-teal-300 uppercase block">{d.day}</span>
                <p className="text-[11px] text-purple-200/80 leading-snug">{d.focus}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Footer Encouragement */}
      <div className="rounded-3xl bg-linear-to-r from-blue-950/40 via-purple-950/30 to-rose-950/40 border border-blue-400/30 p-8 text-center backdrop-blur-xl space-y-3">
        <span className="text-2xl sm:text-3xl font-serif font-bold text-blue-200 block">
          Bon courage — continue ainsi 📝
        </span>
        <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mx-auto leading-relaxed">
          &ldquo;Lo único que de verdad predice tu nivel de francés en un año es la constancia, no el método perfecto. ¡Tú puedes, Sofi!&rdquo; 💖
        </p>
      </div>
    </div>
  );
}
