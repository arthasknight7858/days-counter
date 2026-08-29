"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  BookOpen,
  Wrench,
  Brain,
  Calendar,
  AlertOctagon,
  Zap,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Clock,
  Layers,
  Volume2,
  Mic,
  PenTool,
  BookMarked,
  Lightbulb,
} from "lucide-react";

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function EnglishRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "roadmap", label: "🗺️ Roadmap (A1-C2)", icon: Compass },
    { id: "temario", label: "📚 Temario Detallado", icon: BookOpen },
    { id: "youtube", label: "▶️ Guía YouTube", icon: YouTubeIcon },
    { id: "recursos", label: "🔧 Recursos & Apps", icon: Wrench },
    { id: "estrategias", label: "🧠 Métodos & Estrategias", icon: Brain },
    { id: "horario", label: "📅 Horario Semanal", icon: Calendar },
    { id: "errores", label: "❌ Errores a Evitar", icon: AlertOctagon },
    { id: "trucos", label: "⚡ Trucos & Hacks", icon: Zap },
  ];

  const phases = [
    {
      level: "Fase 1 · A1",
      title: "Cimientos absolutos",
      time: "Meses 1–2 · 30 min/día",
      color: "from-emerald-500/20 to-teal-500/10",
      borderColor: "border-emerald-400/30",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      dotColor: "border-emerald-400 bg-emerald-950",
      desc: "Tu único objetivo aquí es sobrevivir. Aprende las estructuras mínimas para presentarte y entender instrucciones básicas. ¡No te preocupes por el acento todavía!",
      items: [
        "Alfabeto y pronunciación de los 44 fonemas del inglés",
        "Números, colores, días, meses, saludos",
        "Verbo 'to be' + pronombres (I, you, he, she…)",
        "Presente simple con verbos cotidianos (have, go, like, work)",
        "Vocabulario: las 500 palabras más comunes",
      ],
      topics: ["Verb to be", "Presente simple", "Saludos", "Números", "Preguntas WH"],
    },
    {
      level: "Fase 2 · A2",
      title: "Supervivencia diaria",
      time: "Meses 3–4 · 45 min/día",
      color: "from-amber-500/20 to-yellow-500/10",
      borderColor: "border-amber-400/30",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      dotColor: "border-amber-400 bg-amber-950",
      desc: "Empiezas a tener conversaciones simples sobre tu vida. Puedes comprar algo en una tienda o pedir indicaciones. Entiendes un poco de inglés lento y claro.",
      items: [
        "Presente continuo (I am reading)",
        "Pasado simple — verbos regulares e irregulares",
        "Futuro con 'will' y 'going to'",
        "Vocabulario: familia, casa, comida, trabajo, ropa",
        "Artículos (a, an, the) y plurales",
      ],
      topics: ["Pasado simple", "Presente continuo", "Futuro básico", "Adjetivos"],
    },
    {
      level: "Fase 3 · B1",
      title: "Conversación real",
      time: "Meses 5–7 · 1 hora/día",
      color: "from-purple-500/20 to-indigo-500/10",
      borderColor: "border-purple-400/30",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      dotColor: "border-purple-400 bg-purple-950",
      desc: "Aquí empieza lo emocionante. Puedes ver series con subtítulos en inglés y entender la mayoría. Puedes tener conversaciones aunque cometas algunos errores.",
      items: [
        "Present perfect (I have seen / I have been)",
        "Modal verbs (can, could, should, must, might)",
        "Condicionales 0 y 1 (If it rains, I will…)",
        "Vocabulario: 1000–2000 palabras más comunes",
        "Phrasal verbs básicos (give up, look for, turn on)",
        "Inicia el speaking con intercambios de idiomas",
      ],
      topics: ["Present perfect", "Modales", "Conditionals", "Phrasal verbs"],
    },
    {
      level: "Fase 4 · B2",
      title: "Fluidez funcional (Objetivo de Oro)",
      time: "Meses 8–10 · 1–2 horas/día",
      color: "from-rose-500/20 to-pink-500/10",
      borderColor: "border-rose-400/30",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      dotColor: "border-rose-400 bg-rose-950",
      desc: "El nivel más buscado por empleadores y universidades. Puedes trabajar o estudiar en inglés, entender películas sin subtítulos y redactar correos profesionales.",
      items: [
        "Past perfect, future perfect",
        "Condicionales 2 y 3 (If I were you… / If I had known…)",
        "Passive voice (The letter was sent by John)",
        "Reported speech (She said that she was tired)",
        "Vocabulario temático: negocios, ciencia, cultura",
        "Practica con hablantes nativos regularmente",
      ],
      topics: ["Passive voice", "Reported speech", "Conditionals 2&3", "Collocations"],
    },
    {
      level: "Fase 5 · C1",
      title: "Dominio avanzado",
      time: "Meses 11–14 · Inmersión total",
      color: "from-blue-500/20 to-cyan-500/10",
      borderColor: "border-blue-400/30",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      dotColor: "border-blue-400 bg-blue-950",
      desc: "Piensas en inglés de forma natural. Te expresas con matices, ironía y humor. Entiendes acentos regionales difíciles.",
      items: [
        "Inversiones y énfasis estilístico (Never had I seen…)",
        "Idioms y expresiones idiomáticas complejas",
        "Inglés académico y profesional de alto impacto",
        "Acento y entonación avanzada",
        "Leer libros y periódicos originales (NYT, BBC)",
      ],
      topics: ["Inversiones", "Idioms avanzados", "Inglés académico", "Acento nativo"],
    },
    {
      level: "Fase 6 · C2",
      title: "Nivel nativo / Maestría",
      time: "Mes 15 en adelante · Estilo de vida",
      color: "from-purple-500/30 to-fuchsia-500/20",
      borderColor: "border-purple-300/40",
      badgeColor: "bg-purple-500/30 text-purple-200 border-purple-400/40",
      dotColor: "border-purple-300 bg-purple-900",
      desc: "No es un destino, es un modo de vida. El inglés ya no es un idioma que 'estudias', es uno que simplemente usas todos los días en tu rutina.",
      items: [
        "Comprensión absoluta de lenguaje figurado y cultural",
        "Fluidez espontánea sin vacilaciones",
        "Escritura de nivel editorial o literario",
      ],
      topics: ["Inmersión natural", "Bilingüismo real"],
    },
  ];

  const pillars = [
    {
      icon: Layers,
      title: "🔤 Gramática esencial",
      color: "text-purple-400",
      items: [
        "Tiempos verbales: todos los presentes, pasados y futuros",
        "Verbos modales y semi-modales (can, must, should)",
        "Condicionales (0, 1, 2, 3 y mixtos)",
        "Voz pasiva y reported speech",
        "Preposiciones de tiempo y lugar (in, on, at)",
        "Artículos determinados e indeterminados (a, an, the)",
        "Comparativos y superlativos",
        "Cláusulas relativas (who, which, that)",
        "Gerundios e infinitivos",
        "Phrasal verbs (los 200+ más comunes)",
      ],
    },
    {
      icon: BookMarked,
      title: "📖 Vocabulario por niveles",
      color: "text-amber-400",
      items: [
        "A1–A2: 500–1000 palabras más frecuentes",
        "B1: 2000 palabras fundamentales (Oxford 3000)",
        "B2: 4000–5000 palabras activas",
        "C1–C2: 8000+ palabras activas y técnicas",
        "Vocabulario por campos: trabajo, viajes, salud, tecnología",
        "Collocations (make a decision, take a break)",
        "Idioms y expresiones fijas",
        "Falsos cognados (embarrassed ≠ embarazada)",
      ],
    },
    {
      icon: Volume2,
      title: "👂 Comprensión auditiva (Listening)",
      color: "text-teal-400",
      items: [
        "Fonética inglesa: los 44 fonemas clave",
        "Entonación y ritmo de oraciones nativas",
        "Linking words (connected speech fluido)",
        "Reducción de palabras (gonna, wanna, lemme)",
        "Acentos: americano, británico, australiano",
        "Práctica con podcasts, series y canciones favoritas",
        "Dictados y ejercicios de transcripción",
      ],
    },
    {
      icon: Mic,
      title: "🗣️ Producción oral (Speaking)",
      color: "text-rose-400",
      items: [
        "Pronunciación fonema por fonema con guía visual",
        "Shadowing (técnica de imitación de nativos)",
        "Filler words naturales (well, you know, I mean…)",
        "Hablar solo en voz alta (monólogos diarios)",
        "Intercambios con nativos (iTalki, Tandem)",
        "Conversaciones guiadas sobre temas cotidianos",
        "Grabarse y escucharse para autocorregir",
      ],
    },
    {
      icon: PenTool,
      title: "✍️ Escritura (Writing)",
      color: "text-blue-400",
      items: [
        "Puntuación y reglas de mayúsculas en inglés",
        "Emails formales e informales paso a paso",
        "Conectores y cohesión (however, moreover, therefore)",
        "Párrafos con idea principal y soporte",
        "Redacción académica y profesional",
        "Herramientas de apoyo: Grammarly, LanguageTool",
      ],
    },
    {
      icon: BookOpen,
      title: "📚 Comprensión lectora (Reading)",
      color: "text-emerald-400",
      items: [
        "Lectura de textos por niveles (graded readers)",
        "Inferencia de significado por contexto",
        "Vocabulario académico (Academic Word List)",
        "Artículos de noticias (BBC, The Guardian)",
        "Libros simplificados → novelas originales",
        "Lectura extensiva vs. lectura intensiva",
      ],
    },
  ];

  const youtubeChannels = [
    {
      name: "Aprender Inglés Americano",
      desc: "Lecciones paso a paso de inglés americano real, pronunciación, phrasal verbs y vocabulario práctico para hispanohablantes.",
      badge: "Inglés Americano & Fonética",
      icon: "🇺🇸",
      url: "https://www.youtube.com/@AprenderIngl%C3%A9sAmericano",
    },
    {
      name: "English at the Ready",
      desc: "Explicaciones ultra claras de gramática, errores comunes y frases cotidianas con un enfoque directo y pedagógico.",
      badge: "Gramática & Fluidez",
      icon: "⚡",
      url: "https://www.youtube.com/@englishattheready",
    },
    {
      name: "Inglés con el Güero",
      desc: "Clases desde cero para hispanohablantes. Domina pronunciación, modismos, diferencias inglés-español y cómo pensar en inglés.",
      badge: "De Cero a Avanzado",
      icon: "🤠",
      url: "https://www.youtube.com/@Ingl%C3%A9sconelG%C3%BCero",
    },
    {
      name: "EngVid",
      desc: "Profesores nativos reales explicando gramática. Ideal para A1–B2 con cientos de lecciones organizadas.",
      badge: "Gramática & Estructura",
      icon: "📺",
      url: "https://www.youtube.com/@EngVid",
    },
    {
      name: "BBC Learning English",
      desc: "El canal oficial de la BBC. Pronunciación, vocabulario, gramática y cultura británica ultra confiable.",
      badge: "Oficial & Fonética",
      icon: "🇬🇧",
      url: "https://www.youtube.com/@bbclearningenglish",
    },
    {
      name: "English with Lucy",
      desc: "Pronunciación británica elegante, vocabulario y expresiones del día a día muy claras y estructuradas.",
      badge: "Pronunciación",
      icon: "✨",
      url: "https://www.youtube.com/@EnglishwithLucy",
    },
    {
      name: "Speak English with Vanessa",
      desc: "Especializada en conversación real, expresiones naturales y confianza al hablar. Perfecta para B1+.",
      badge: "Conversación Real",
      icon: "🗣️",
      url: "https://www.youtube.com/@SpeakEnglishWithVanessa",
    },
    {
      name: "JamesESL English Lessons",
      desc: "Lecciones ultra dinámicas y entretenidas. Excelente para dominar phrasal verbs, idioms y fluidez.",
      badge: "Phrasal Verbs & Tips",
      icon: "🔥",
      url: "https://www.youtube.com/@JamesESL",
    },
    {
      name: "Easy English (Street Interviews)",
      desc: "Entrevistas en la calle con subtítulos reales. Inglés cotidiano no actuado para afinar el oído.",
      badge: "Listening Cotidiano",
      icon: "🎧",
      url: "https://www.youtube.com/@EasyEnglishVideos",
    },
    {
      name: "Dreaming Spanish / English",
      desc: "Demostración práctica del método de input comprensible para adquirir el idioma de forma natural.",
      badge: "Input Comprensible",
      icon: "🌱",
      url: "https://www.youtube.com/@DreamingEnglish",
    },
  ];

  const resources = {
    apps: [
      {
        name: "Anki (Flashcards)",
        desc: "La herramienta de repetición espaciada más poderosa. Memoriza vocabulario de por vida de forma automática.",
        tag: "100% Gratis",
        icon: "🃏",
      },
      {
        name: "Duolingo",
        desc: "Excelente para construir el hábito diario los primeros meses. Úsalo como warmup de 10 minutos.",
        tag: "Gratis",
        icon: "🦉",
      },
      {
        name: "iTalki",
        desc: "Tutores y hablantes nativos por videollamada desde $5/hora. La herramienta definitiva para el speaking.",
        tag: "Desde $5/h",
        icon: "📡",
      },
      {
        name: "Tandem / HelloTalk",
        desc: "Intercambio de idiomas gratuito: enseñas español y ellos te ayudan con el inglés.",
        tag: "100% Gratis",
        icon: "🤝",
      },
      {
        name: "Elsa Speak",
        desc: "Inteligencia Artificial que evalúa tu pronunciación fonema por fonema con feedback en tiempo real.",
        tag: "Freemium",
        icon: "🎯",
      },
      {
        name: "LingQ / ReadLang",
        desc: "Lee textos y noticias en inglés con traducción instantánea con un clic para aprender leyendo.",
        tag: "Freemium",
        icon: "📰",
      },
    ],
    podcasts: [
      {
        name: "6 Minute English (BBC)",
        desc: "6 minutos de conversación nativa amena sobre temas actuales con vocabulario explicado. Ideal para A2–B1.",
        tag: "Gratis en Spotify",
        icon: "🎙️",
      },
      {
        name: "English Learning for Curious Minds",
        desc: "Historias fascinantes de ciencia, historia y cultura contadas a velocidad moderada para B1–C1.",
        tag: "Gratis",
        icon: "🧠",
      },
      {
        name: "All Ears English",
        desc: "Dos profesoras estadounidenses hablando de la vida diaria y expresiones naturales sin rodeos.",
        tag: "Gratis",
        icon: "🎧",
      },
    ],
    books: [
      {
        name: "British Council — LearnEnglish",
        desc: "Plataforma oficial con ejercicios organizados por nivel en gramática, listening, reading y writing.",
        tag: "100% Gratis",
        icon: "🌐",
      },
      {
        name: "Perfect English Grammar",
        desc: "La web más limpia y directa para comprender cualquier regla gramatical con explicaciones claras.",
        tag: "Web Gratuita",
        icon: "📖",
      },
      {
        name: "English Grammar in Use (Raymond Murphy)",
        desc: "El libro de gramática de referencia más vendido del mundo (ediciones Basic, Intermediate, Advanced).",
        tag: "Libro Referente",
        icon: "📕",
      },
    ],
  };

  const strategies = [
    {
      title: "🔁 Repetición Espaciada (SRS)",
      desc: "Revisar vocabulario justo antes del punto de olvido multiplica la retención a largo plazo. Anki lo calcula automáticamente: 15 minutos diarios superan a 2 horas en fin de semana.",
      accent: "border-purple-500/40 text-purple-300",
    },
    {
      title: "📥 Input Comprensible (i + 1)",
      desc: "El lingüista Stephen Krashen demostró que adquirimos el idioma cuando entendemos el 95% del contexto y desciframos el 5% nuevo. Consume contenido ligeramente por encima de tu nivel actual.",
      accent: "border-emerald-500/40 text-emerald-300",
    },
    {
      title: "🪞 Técnica de Shadowing",
      desc: "Escucha un audio nativo y repite en tiempo real imitando entonación, pausas y ritmo. Es el método más rápido para desbloquear la fluidez y suavizar el acento.",
      accent: "border-rose-500/40 text-rose-300",
    },
    {
      title: "🗺️ Inmersión en tu Entorno",
      desc: "Cambia el idioma de tu teléfono, videojuegos, redes sociales y plataformas de streaming a inglés para asociarlo a momentos de disfrute.",
      accent: "border-amber-500/40 text-amber-300",
    },
    {
      title: "📓 Diario Personal en Inglés",
      desc: "Escribe de 5 a 10 oraciones al día sobre tu jornada o pensamientos. Activa tu vocabulario pasivo y te muestra qué palabras cotidianas necesitas aprender.",
      accent: "border-blue-500/40 text-blue-300",
    },
    {
      title: "🎯 Output Forzado",
      desc: "Hablar y escribir hace visibles tus verdaderas dudas. Es normal cometer errores; la producción activa es lo que consolida las conexiones neuronales del idioma.",
      accent: "border-fuchsia-500/40 text-fuchsia-300",
    },
  ];

  const weeklySchedule = [
    { day: "Lunes", act: "📚 Gramática nueva (30 min) + Anki / repaso de vocabulario (15 min)", focus: "Estructura" },
    { day: "Martes", act: "👂 Listening + técnica de Shadowing (30 min) + Anki (15 min)", focus: "Escucha & Ritmo" },
    { day: "Miércoles", act: "📖 Lectura comprensiva (30 min) + repaso de dudas y notas (15 min)", focus: "Lectura & Contexto" },
    { day: "Jueves", act: "🗣️ Speaking: práctica con Tandem, iTalki o monólogo guiado (45 min)", focus: "Conversación Activa" },
    { day: "Viernes", act: "✍️ Writing: diario en inglés + redacción libre (30 min) + Anki (15 min)", focus: "Expresión Escrita" },
    { day: "Sábado", act: "🎬 Inmersión libre: serie, película, música o podcast en inglés (60 min+)", focus: "Disfrute & Flow" },
    { day: "Domingo", act: "🔄 Repaso semanal + Anki + organización de metas para la semana (30 min)", focus: "Consolidación" },
  ];

  const mistakes = [
    {
      num: "01",
      title: "Esperar a 'estar listo' para hablar",
      desc: "Esperar a saber el 100% de la gramática antes de pronunciar una palabra es una trampa. Comienza a hablar desde el mes 1; la fluidez se construye en la práctica real.",
    },
    {
      num: "02",
      title: "Traducir mentalmente palabra por palabra",
      desc: "Pensar en español y traducir genera lentitud y bloqueos. El truco es asociar conceptos e imágenes directamente a la palabra en inglés sin intermediarios.",
    },
    {
      num: "03",
      title: "Cambiar de método constantemente",
      desc: "Probar un método nuevo cada semana dispersa tu energía. Escoge 2 o 3 herramientas de confianza y mantén la constancia al menos durante 3 meses.",
    },
    {
      num: "04",
      title: "Estudiar gramática de forma aislada",
      desc: "Memorizar listas de reglas sin contexto no sirve. La gramática debe ser tu mapa de consulta cuando surjan dudas mientras lees, escuchas o hablas.",
    },
    {
      num: "05",
      title: "Solo consumir de forma pasiva sin producir",
      desc: "Ver videos acostado es agradable, pero sin hablar ni escribir tu cerebro no consolida las estructuras. La producción activa es la clave del progreso.",
    },
    {
      num: "06",
      title: "Compararse con hablantes nativos",
      desc: "Los nativos llevan décadas de inmersión 24/7. Tu meta no es imitar un acento perfecto, sino comunicarte con total seguridad, naturalidad y claridad.",
    },
    {
      num: "07",
      title: "Limitar el idioma solo a la 'hora de estudio'",
      desc: "Si el inglés solo existe durante la sesión de estudio, el camino será más largo. Deja que el idioma entre en tus canciones, recetas, series y pasatiempos.",
    },
  ];

  const hacks = [
    {
      icon: "🏷️",
      title: "Etiqueta objetos de tu entorno",
      desc: "Pega notas adhesivas con nombres en inglés en tu habitación. Tu mente los asociará decenas de veces al día sin esfuerzo consciente.",
    },
    {
      icon: "🚿",
      title: "Monólogo interno en la ducha",
      desc: "Narra lo que vas a hacer en el día o describe lo que piensas en inglés. Es práctica libre de juicios y totalmente gratis.",
    },
    {
      icon: "📺",
      title: "Subtítulos estratégicos por nivel",
      desc: "A1: Subtítulos en español. A2: Subtítulos en inglés. B1/B2: Desactiva subtítulos gradualmente en contenido familiar.",
    },
    {
      icon: "🎵",
      title: "Aprende y canta tus canciones favoritas",
      desc: "Busca la letra y significado de tus temas preferidos. La música activa centros emocionales del cerebro que fijan la memoria.",
    },
    {
      icon: "🤖",
      title: "Usa IA como tutor de conversación 24/7",
      desc: "Pídele a ChatGPT o Claude que simule diálogos en inglés sobre tus temas favoritos y te corrija de manera constructiva.",
    },
    {
      icon: "🎮",
      title: "Videojuegos en inglés",
      desc: "Cambiar los textos y voces de tus juegos favoritos te expone a vocabulario dinámico en situaciones interactivas naturales.",
    },
    {
      icon: "⏰",
      title: "Alarmas y recordatorios en inglés",
      desc: "Nombra tus recordatorios cotidianos en inglés (Morning routine, Coffee break, Gym time) para mantener el chip encendido.",
    },
    {
      icon: "🎙️",
      title: "Grábate 2 minutos a la semana",
      desc: "Guarda una nota de voz corta hablando en inglés cada semana. Comparar tu audio del mes 1 con el del mes 6 es el mayor boost de motivación.",
    },
    {
      icon: "🌐",
      title: "Busca tus dudas en Google en inglés",
      desc: "Prueba buscando tus preguntas en inglés ('How to...', 'Best way to...'). Obtendrás mejores resultados y aprenderás vocabulario real.",
    },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Hero Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-purple-900/30 via-white/5 to-fuchsia-900/20 backdrop-blur-xl border border-purple-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Guía de Aprendizaje Completa 2025 – 2026
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Aprende Inglés </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-300 via-purple-300 to-fuchsia-300">
              desde Cero a Fluido
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
            Un roadmap honesto, práctico y estructurado para llevar tu nivel desde las bases hasta la conversación fluida
            sin cursos costosos, con los mejores recursos comprobados.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg">
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-purple-500/20 text-center">
              <span className="block text-2xl sm:text-3xl font-bold text-emerald-300">6</span>
              <span className="text-[11px] sm:text-xs uppercase font-medium text-purple-200/70 tracking-wider">
                Fases Claras
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-purple-500/20 text-center">
              <span className="block text-2xl sm:text-3xl font-bold text-purple-300">+40</span>
              <span className="text-[11px] sm:text-xs uppercase font-medium text-purple-200/70 tracking-wider">
                Recursos Gratis
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-purple-500/20 text-center">
              <span className="block text-2xl sm:text-3xl font-bold text-fuchsia-300">12</span>
              <span className="text-[11px] sm:text-xs uppercase font-medium text-purple-200/70 tracking-wider">
                Meses Sugeridos
              </span>
            </div>
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
                  ? "bg-purple-600/90 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-102 font-semibold"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. ROADMAP SECTION */}
      {(activeSubTab === "all" || activeSubTab === "roadmap") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">De 0 a Fluidez Total</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-purple-400" />
              El Roadmap Completo por Fases (CEFR)
            </h3>
            <p className="text-purple-200/70 text-sm">
              Sigue el Marco Europeo de Referencia. Cada fase sienta las bases sólidas para la siguiente.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-2 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-linear-to-b before:from-emerald-400 before:via-purple-500 before:to-fuchsia-500 before:opacity-40">
            {phases.map((phase, idx) => (
              <motion.div
                key={phase.level}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`relative rounded-2xl bg-linear-to-br ${phase.color} backdrop-blur-md border ${phase.borderColor} p-5 sm:p-7 transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] hover:translate-x-1`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-6 sm:-left-10 top-6 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 ${phase.dotColor} shadow-[0_0_10px_rgba(168,85,247,0.6)]`}
                />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${phase.badgeColor}`}>
                    {phase.level}
                  </span>
                  <span className="text-xs font-medium text-purple-200/80 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    {phase.time}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{phase.title}</h4>
                <p className="text-sm text-purple-100/80 leading-relaxed mb-4">{phase.desc}</p>

                <div className="space-y-2 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-300/90 block">
                    Puntos clave a dominar:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {phase.items.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm text-purple-200/80 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Topic chips */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                  {phase.topics.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/10 text-purple-100 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 2. TEMARIO POR ÁREAS */}
      {(activeSubTab === "all" || activeSubTab === "temario") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Pilares del Aprendizaje</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              Temario Completo por Habilidad
            </h3>
            <p className="text-purple-200/70 text-sm">
              El inglés requiere balance entre consumir (reading/listening) y producir (speaking/writing).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.3)" }}
                className="bg-white/5 backdrop-blur-md border border-purple-500/20 rounded-2xl p-5 sm:p-6 flex flex-col justify-between group"
              >
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <span>{pillar.title}</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-purple-200/80">
                    {pillar.items.map((it, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 80/20 Highlight */}
          <div className="rounded-2xl bg-linear-to-r from-emerald-500/10 via-purple-500/10 to-fuchsia-500/10 border border-emerald-500/30 p-5 sm:p-6 backdrop-blur-md flex items-start gap-4">
            <Zap className="w-6 h-6 text-emerald-400 shrink-0 mt-1 animate-pulse" />
            <div className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
              <strong className="text-emerald-300 font-semibold block mb-1">⚡ Regla del 80/20 en el Inglés:</strong>
              El 20% del vocabulario cubre el 80% de las conversaciones cotidianas. Domina las 2,000 palabras más frecuentes
              de la lista Oxford 3000 antes de intentar memorizar palabras raras o rebuscadas.
            </div>
          </div>
        </motion.section>
      )}

      {/* 3. GUÍA YOUTUBE */}
      {(activeSubTab === "all" || activeSubTab === "youtube") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">Aprender sin costo</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <YouTubeIcon className="w-6 h-6 text-red-400" />
              ¿Es posible aprender inglés solo con YouTube?
            </h3>
            <p className="text-purple-200/70 text-sm">
              Sí, YouTube puede llevarte a nivel B2. Solo necesitas saber cómo aprovecharlo y combinarlo con práctica activa.
            </p>
          </div>

          {/* Pros and Cons Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/30 p-5 sm:p-6 backdrop-blur-md">
              <h4 className="text-base font-bold text-emerald-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Lo que YouTube sí te brinda con excelencia
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-purple-200/80">
                <li>• Explicaciones de gramática visuales y dinámicas</li>
                <li>• Pronunciación nativa y fonética detallada</li>
                <li>• Vocabulario contextualizado en situaciones reales</li>
                <li>• Exposición masiva y natural al idioma sin pagar</li>
                <li>• Canales bilingües para despejar dudas iniciales</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-rose-950/20 border border-rose-500/30 p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-rose-300 mb-3 flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5 text-rose-400" />
                  Lo que debes complementar por fuera
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-purple-200/80">
                  <li>• Práctica de speaking interactivo (alguien que te escuche)</li>
                  <li>• Corrección en tiempo real de tus errores</li>
                  <li>• Estructura fija y evaluación de progreso</li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-500/20 text-xs text-purple-300 font-medium">
                👉 <span className="text-emerald-300 font-semibold">Combinación ideal:</span> YouTube + Anki + Tandem / iTalki.
              </div>
            </div>
          </div>

          {/* Recommended Channels */}
          <div className="space-y-3 pt-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-purple-300">
              Canales Recomendados de Alto Valor:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {youtubeChannels.map((ch) => (
                <div
                  key={ch.name}
                  className="rounded-2xl bg-white/5 border border-purple-500/20 p-4.5 backdrop-blur-md flex flex-col justify-between hover:border-purple-400/40 hover:bg-white/8 transition-all duration-200 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl p-1.5 rounded-xl bg-white/5 border border-white/10">{ch.icon}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {ch.badge}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-base mb-1.5 group-hover:text-purple-300 transition-colors">
                        {ch.name}
                      </h5>
                      <p className="text-xs text-purple-200/70 leading-relaxed">{ch.desc}</p>
                    </div>
                  </div>

                  {ch.url && (
                    <div className="pt-4 mt-2 border-t border-white/5">
                      <a
                        href={ch.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                      >
                        <YouTubeIcon className="w-3.5 h-3.5 text-red-400" />
                        <span>Ver Canal en YouTube</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* 4. RECURSOS Y APPS */}
      {(activeSubTab === "all" || activeSubTab === "recursos") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Herramientas probadas</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Wrench className="w-6 h-6 text-purple-400" />
              Recursos Esenciales: Apps, Podcasts y Libros
            </h3>
            <p className="text-purple-200/70 text-sm">
              Menos es más: escoge máximo 2 o 3 herramientas fijas y sé constante.
            </p>
          </div>

          {/* Apps */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <span>📱 Aplicaciones y Plataformas</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.apps.map((app) => (
                <div
                  key={app.name}
                  className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md flex flex-col justify-between hover:border-purple-400/40 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl shrink-0">{app.icon}</span>
                    <div>
                      <h5 className="font-bold text-white text-sm sm:text-base">{app.name}</h5>
                      <p className="text-xs text-purple-200/70 mt-1 leading-relaxed">{app.desc}</p>
                    </div>
                  </div>
                  <span className="self-start mt-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {app.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Podcasts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-fuchsia-400 flex items-center gap-2">
              <span>🎧 Podcasts para Afinar el Oído</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {resources.podcasts.map((pod) => (
                <div
                  key={pod.name}
                  className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md flex flex-col justify-between hover:border-fuchsia-400/40 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl shrink-0">{pod.icon}</span>
                    <div>
                      <h5 className="font-bold text-white text-sm sm:text-base">{pod.name}</h5>
                      <p className="text-xs text-purple-200/70 mt-1 leading-relaxed">{pod.desc}</p>
                    </div>
                  </div>
                  <span className="self-start mt-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                    {pod.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Books & Webs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <span>📖 Libros y Sitios de Referencia</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {resources.books.map((bk) => (
                <div
                  key={bk.name}
                  className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md flex flex-col justify-between hover:border-amber-400/40 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl shrink-0">{bk.icon}</span>
                    <div>
                      <h5 className="font-bold text-white text-sm sm:text-base">{bk.name}</h5>
                      <p className="text-xs text-purple-200/70 mt-1 leading-relaxed">{bk.desc}</p>
                    </div>
                  </div>
                  <span className="self-start mt-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {bk.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* 5. ESTRATEGIAS CIENTÍFICAS */}
      {(activeSubTab === "all" || activeSubTab === "estrategias") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Ciencia del aprendizaje</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-400" />
              Estrategias y Métodos que Funcionan de Verdad
            </h3>
            <p className="text-purple-200/70 text-sm">
              Métodos respaldados por la lingüística y la neurociencia para aprender el doble en la mitad del tiempo.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-linear-to-r from-purple-900/40 to-fuchsia-900/40 border-l-4 border-purple-400 text-white font-medium text-base sm:text-lg italic backdrop-blur-md">
            &ldquo;El mejor método de aprendizaje es el que practicas todos los días. La consistencia supera a la intensidad ocasional.&rdquo;
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {strategies.map((st, i) => (
              <div
                key={i}
                className={`rounded-2xl bg-white/5 border border-purple-500/20 border-l-4 ${st.accent} p-5 backdrop-blur-md hover:bg-white/8 transition-all duration-200`}
              >
                <h4 className="font-bold text-white text-base mb-2">{st.title}</h4>
                <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 6. HORARIO SEMANAL */}
      {(activeSubTab === "all" || activeSubTab === "horario") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Rutina sostenible</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-purple-400" />
              Horario Semanal Recomendado (45 a 60 min/día)
            </h3>
            <p className="text-purple-200/70 text-sm">
              Diseñado para avanzar con paso firme sin agotarte ni interferir con tus demás actividades.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md">
            <div className="grid grid-cols-1 divide-y divide-purple-500/20">
              {weeklySchedule.map((item) => (
                <div
                  key={item.day}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:w-48 shrink-0">
                    <span className="font-bold text-emerald-300 text-sm sm:text-base">{item.day}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {item.focus}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-100/90 grow leading-relaxed">{item.act}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs sm:text-sm text-purple-200/90 flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              <strong>Tip de oro:</strong> Hacer 15 minutos diarios es 10 veces mejor que acumular 2 horas solo un día a la semana.
            </span>
          </div>
        </motion.section>
      )}

      {/* 7. ERRORES QUE DEBES EVITAR */}
      {(activeSubTab === "all" || activeSubTab === "errores") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Atajos para no tropezar</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <AlertOctagon className="w-6 h-6 text-rose-400" />
              7 Errores Comunes que Frenan a la Mayoría
            </h3>
            <p className="text-purple-200/70 text-sm">
              Identificar estos errores a tiempo te ahorrará meses de frustración.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mistakes.map((m) => (
              <div
                key={m.num}
                className="rounded-2xl bg-white/5 border border-rose-500/20 p-5 backdrop-blur-md flex items-start gap-4 hover:border-rose-400/40 transition-all duration-200"
              >
                <span className="text-2xl sm:text-3xl font-black text-rose-400/70 font-mono shrink-0">
                  {m.num}
                </span>
                <div>
                  <h4 className="font-bold text-sm sm:text-base mb-1 text-rose-200">{m.title}</h4>
                  <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 8. TRUCOS Y HACKS */}
      {(activeSubTab === "all" || activeSubTab === "trucos") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Pequeñas optimizaciones</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-400" />
              9 Trucos y Hacks Probados para Acelerar
            </h3>
            <p className="text-purple-200/70 text-sm">
              Hábitos sencillos que incorporan el inglés en tu día a día sin que se sienta como tarea obligatoria.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hacks.map((h, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md hover:border-amber-400/40 hover:bg-white/8 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl mb-2 block">{h.icon}</span>
                  <h4 className="font-bold text-white text-sm sm:text-base mb-1.5">{h.title}</h4>
                  <p className="text-xs text-purple-200/70 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Inspiring Footer Card */}
      <div className="rounded-3xl bg-linear-to-r from-purple-900/40 via-fuchsia-900/30 to-purple-900/40 border border-purple-400/30 p-8 text-center backdrop-blur-xl space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-white">
          &ldquo;El mejor momento para empezar fue ayer. El segundo mejor es <span className="text-emerald-300">hoy</span>.&rdquo;
        </h3>
        <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mx-auto">
          Confía en tu proceso, Sofi. Cada palabra que aprendes y cada audio que escuchas te acerca más a tus metas. 💖
        </p>
      </div>
    </div>
  );
}
