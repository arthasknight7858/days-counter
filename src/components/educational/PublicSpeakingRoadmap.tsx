"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Sparkles,
  Compass,
  Brain,
  BookOpen,
  CheckCircle2,
  Square,
  Zap,
  ChevronDown,
} from "lucide-react";

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function PublicSpeakingRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_speaking_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({ "sp-f1": true, "sp-f2": true });

  const toggleChecklist = (id: string) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_speaking_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const togglePhase = (id: string) => {
    setOpenPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "fases", label: "🗺️ 4 Fases de Dominio", icon: Compass },
    { id: "modulos", label: "🎙️ 6 Módulos Prácticos", icon: Mic },
    { id: "estrategias", label: "🧠 Hábitos & Estrategias", icon: Brain },
    { id: "youtube", label: "▶️ Canales YouTube", icon: YouTubeIcon },
    { id: "trucos", label: "⚡ 10 Trucos de Alto Impacto", icon: Zap },
    { id: "libros", label: "📚 Biblioteca Esencial", icon: BookOpen },
    { id: "plan", label: "🎯 Checklist de Práctica", icon: CheckCircle2 },
  ];

  const phases = [
    {
      id: "sp-f1",
      num: "Fase 01",
      duration: "⏱ 0–3 meses",
      title: "Fundamentos, Consciencia & Desbloqueo",
      color: "from-lime-500/20 to-emerald-500/10 border-lime-500/40 text-lime-300",
      badge: "bg-lime-500/20 text-lime-300 border-lime-500/30",
      desc: "Autodiagnóstico vocal y corporal, superación del miedo escénico (respuesta de cortisol), respiración diafragmática y escucha activa.",
      topics: [
        "Grabación de autodiagnóstico: ritmo, muletillas ('ehhh'), tono y volumen",
        "Manejo de la ansiedad social: respiración diafragmática y anclas mentales",
        "Vocabulario activo vs. pasivo: transformar lo que entiendes en lo que expresas",
        "Lenguaje no verbal base: postura de poder, triángulo ocular y brazos abiertos",
        "Escucha activa genuina: parafrasear y sintonizar antes de preparar respuesta",
      ],
    },
    {
      id: "sp-f2",
      num: "Fase 02",
      duration: "⏱ 3–8 meses",
      title: "Construcción de Herramientas & Estructura Mental",
      color: "from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-300",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      desc: "Estructuras PREP y SCQA, modulación de la voz (pausas dramáticas), agilidad de respuesta y persuasión fundamental (Cialdini).",
      topics: [
        "Estructura PREP: Punto principal → Razón → Ejemplo/Historia → Punto de cierre",
        "Estructura SCQA: Situación → Complicación → Pregunta → Respuesta/Solución",
        "Control vocal: uso estratégico de pausas de 3 segundos y tonos graves de autoridad",
        "Storytelling base: Héroe + Problema + Transformación + Resolución",
        "Los 6 Principios de Influencia de Cialdini aplicados a la conversación cotidiana",
      ],
    },
    {
      id: "sp-f3",
      num: "Fase 03",
      duration: "⏱ 8–18 meses",
      title: "Dominio, Carisma & Negociación de Alto Impacto",
      color: "from-orange-500/20 to-amber-500/10 border-orange-500/40 text-orange-300",
      badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      desc: "Retórica clásica, negociación FBI de Chris Voss (mirroring, labeling), manejo de objeciones hostiles y oratoria estilo TED.",
      topics: [
        "Retórica avanzada: metáforas, analogías, antítesis y regla del tricolon (listas de 3)",
        "Negociación Chris Voss: espejeo de palabras clave, etiquetado emocional y preguntas calibradas",
        "Carisma magnético: calidez (warmth) + competencia (power) + presencia absoluta",
        "Manejo de situaciones difíciles: técnica de la Comunicación No Violenta (CNV)",
        "Oratoria profesional: diseño de ganchos de apertura y llamadas a la acción memorables",
      ],
    },
    {
      id: "sp-f4",
      num: "Fase 04",
      duration: "⏱ 18 meses en adelante",
      title: "Maestría, Humor & Firma Comunicativa Única",
      color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/40 text-cyan-300",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      desc: "Timing cómico, subversión de expectativas, comunicación de liderazgo ejecutivo y presencia ante cámaras.",
      topics: [
        "Humor e ingenio: timing, autoironía y remates inesperados",
        "Liderazgo en reuniones: hablar con autoridad natural sin necesidad de alzar la voz",
        "Identidad vocal única: cadencia, vocabulario característico y estilo inconfundible",
        "Comunicación digital: hablar con naturalidad en video, podcasts y presentaciones remotas",
      ],
    },
  ];

  const modules = [
    {
      title: "🎙️ Módulo 1: La Voz como Instrumento",
      desc: "Respiración diafragmática, proyección sin forzar la garganta, modulación de graves para autoridad y el impacto de pausas de 3 segundos.",
      practice: "Lee en voz alta 15 minutos diarios y practica el calentamiento de 'humming' (zumbido) cada mañana.",
    },
    {
      title: "🤸 Módulo 2: Lenguaje No Verbal & Presencia",
      desc: "Postura erguida que ocupa espacio, contacto visual con técnica de triángulo ocular, gesticulación congruente y sincronización (mirroring).",
      practice: "Grábate en video durante 5 minutos y observa gestos involuntarios o posturas cerradas.",
    },
    {
      title: "🔮 Módulo 3: Persuasión & Retórica (Ethos, Pathos, Logos)",
      desc: "Credibilidad inicial (Ethos), conexión emocional (Pathos) y datos de respaldo (Logos). Uso de reciprocidad y preguntas socráticas.",
      practice: "Enmarca tus peticiones usando el 'pie en la puerta' o haciendo que el otro llegue a la conclusión mediante preguntas.",
    },
    {
      title: "📖 Módulo 4: Storytelling Magnético",
      desc: "Estructura Pixar: 'Había una vez... Todos los días... Hasta que un día... Por eso... Hasta que finalmente...'. Detalles sensoriales y vulnerabilidad.",
      practice: "Crea un 'banco personal de 10 historias' sobre fracasos, aprendizajes y momentos cómicos de tu vida.",
    },
    {
      title: "👂 Módulo 5: Escucha Activa & Rapport",
      desc: "El mejor comunicador es quien hace que el otro se sienta escuchado. Parafraseo ('lo que entiendo es...'), silencios cómodos y curiosidad real.",
      practice: "En tu próxima conversación, escucha sin pensar en tu respuesta hasta que la otra persona termine de hablar.",
    },
    {
      title: "⚡ Módulo 6: Manejo de Situaciones Difíciles & Bloqueos",
      desc: "Qué hacer ante la mente en blanco (pausa + pregunta retórica), manejo de críticas con CNV y responder preguntas agresivas con calma.",
      practice: "Aplica la regla del 5-5-5: 5 respiraciones profundas, 5 segundos de espera y visualizar 5 consecuencias antes de responder.",
    },
  ];

  const tricks = [
    { num: "01", title: "Abre siempre con una Pregunta Retórica", desc: "'¿Alguna vez te has preguntado por qué...?' Esto activa el cerebro del oyente inmediatamente y lo convierte en participante activo." },
    { num: "02", title: "El Poder de los 3 Puntos", desc: "El cerebro ama las ternas. Decir 'Hay 3 razones clave: primero X, segundo Y, y tercero Z' transmite orden y alta inteligencia." },
    { num: "03", title: "Habla más despacio de lo que crees", desc: "Al sentir nervios aceleramos el habla. La velocidad que a ti te parece 'un poco lenta' es exactamente la cadencia perfecta para el oyente." },
    { num: "04", title: "El Silencio como Respuesta de Poder", desc: "Tras hacer una propuesta o pregunta decisiva, cállate. Quien habla primero por incomodidad pierde el control de la negociación." },
    { num: "05", title: "Reemplaza 'Pero' por 'Y'", desc: "Decir 'Entiendo tu punto PERO...' anula al otro. Decir 'Entiendo tu punto Y también podríamos considerar...' crea cooperación instantánea." },
    { num: "06", title: "La Pausa de 3 Segundos", desc: "Detén la voz 3 segundos justo antes de dar tu idea más importante. La pausa genera expectativa y triplica el recuerdo del mensaje." },
    { num: "07", title: "Admite lo que no sabes con soltura", desc: "Decir 'No lo sé con certeza, pero lo investigaré' aumenta tu credibilidad. Nadie confía en quien finge saberlo todo." },
    { num: "08", title: "Vulnerabilidad Estratégica", desc: "Compartir un error real con su aprendizaje conecta emocionalmente 10 veces más que presumir éxitos continuos." },
  ];

  const books = [
    { title: "Cómo Ganar Amigos e Influir sobre las Personas", author: "Dale Carnegie", badge: "Pilar #1", desc: "El clásico eterno sobre escucha, aprecio sincero, diplomacia y liderazgo interpersonal." },
    { title: "Influencia: La Psicología de la Persuasión", author: "Robert Cialdini", badge: "Persuasión", desc: "Los 6 principios universales que explican por qué la gente dice 'sí'." },
    { title: "Never Split the Difference (Rompe la Barrera del No)", author: "Chris Voss", badge: "Negociación", desc: "Tácticas de negociación del ex-jefe del FBI: empatía táctica, mirroring y calibración." },
    { title: "Talk Like TED (Hable como en TED)", author: "Carmine Gallo", badge: "Oratoria", desc: "Los 9 secretos de las conferencias más vistas del mundo desglosados paso a paso." },
    { title: "El Mito del Carisma", author: "Olivia Fox Cabane", badge: "Presencia", desc: "Prueba que el carisma es una habilidad entrenable basada en presencia, calidez y poder." },
    { title: "Comunicación No Violenta (CNV)", author: "Marshall Rosenberg", badge: "Conflictos", desc: "El método definitivo para resolver tensiones y expresar necesidades sin generar hostilidad." },
  ];

  const checklistItems = [
    { id: "sp_recording", label: "Grabarte 5 minutos hablando y analizar ritmo, pausas y muletillas", stage: "Fase 1" },
    { id: "sp_reading_aloud", label: "Leer en voz alta 15 minutos diarios practicando proyección diafragmática", stage: "Fase 1" },
    { id: "sp_prep_framework", label: "Estructurar tus respuestas usando el modelo PREP (Punto, Razón, Ejemplo, Punto)", stage: "Fase 2" },
    { id: "sp_story_bank", label: "Crear tu banco de 5 historias personales con estructura narrativa Pixar", stage: "Fase 2" },
    { id: "sp_voss_mirroring", label: "Aplicar la técnica de espejeo (mirroring) y etiquetado emocional en una conversación", stage: "Fase 3" },
    { id: "sp_ted_opening", label: "Diseñar una apertura de presentación usando pregunta retórica y pausa de 3s", stage: "Fase 3" },
    { id: "sp_active_listening", label: "Tener una conversación completa aplicando escucha activa sin interrumpir", stage: "Fase 4" },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-lime-950/40 via-purple-950/30 to-black/60 backdrop-blur-xl border border-lime-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(200,255,0,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-500/15 border border-lime-400/30 text-lime-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Mic className="w-3.5 h-3.5 text-lime-400" />
            Comunicación · Oratoria · Persuasión
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Hablar, Expresarse &amp; </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-lime-300 via-emerald-300 to-purple-300">
              Persuadir con Poder
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            Desde el control de la voz y el lenguaje corporal hasta la retórica avanzada, storytelling y negociación de rehenes del FBI.
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-xl p-4 rounded-2xl bg-white/5 border border-lime-500/20 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-lime-300 block">4</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Fases</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-300 block">18</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Módulos</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-orange-300 block">Voss</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Método</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 block">TED</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Oratoria</span>
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
                  ? "bg-lime-500/90 text-black border-lime-300 shadow-[0_0_15px_rgba(200,255,0,0.4)] scale-102 font-bold"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. LAS 4 FASES */}
      {(activeSubTab === "all" || activeSubTab === "fases") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-lime-400">Ruta por Niveles</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-lime-400" />
              Las 4 Fases del Comunicador de Alto Impacto
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
                              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shrink-0 mt-1.5" />
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

      {/* 2. MÓDULOS EN PROFUNDIDAD */}
      {(activeSubTab === "all" || activeSubTab === "modulos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Áreas Clave</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Mic className="w-6 h-6 text-purple-400" />
              Los 6 Módulos de Entrenamiento
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md space-y-2">
                <h4 className="font-bold text-lime-300 text-base">{m.title}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{m.desc}</p>
                <div className="pt-2 border-t border-white/5 text-xs text-purple-300">
                  🎯 <strong>Cómo practicar:</strong> {m.practice}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 3. TRUCOS DE ALTO IMPACTO */}
      {(activeSubTab === "all" || activeSubTab === "trucos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Tácticas Secretas</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-400" />
              10 Trucos que los Grandes Comunicadores Usan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tricks.map((t, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-orange-950/15 border border-orange-500/20 space-y-1.5">
                <span className="text-xs font-mono font-bold text-orange-300 uppercase">Truco {t.num}</span>
                <h4 className="font-bold text-white text-sm sm:text-base">{t.title}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 4. LIBROS ESENCIALES */}
      {(activeSubTab === "all" || activeSubTab === "libros") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Biblioteca Recomendada</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              Los 6 Libros Fundamentales de Comunicación
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((b, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  {b.badge}
                </span>
                <h4 className="font-bold text-white text-base mt-1">{b.title}</h4>
                <span className="text-xs text-purple-300/70 font-mono block">{b.author}</span>
                <p className="text-xs text-purple-200/75 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 5. CHECKLIST DE PRÁCTICA */}
      {(activeSubTab === "all" || activeSubTab === "plan") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-lime-400">Entrenamiento Diario</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-lime-400" />
              Checklist de Comunicación Diaria
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
                      ? "bg-lime-950/30 border-lime-500/40 shadow-[0_0_15px_rgba(200,255,0,0.2)]"
                      : "bg-white/5 border-purple-500/20 hover:bg-white/8 hover:border-purple-400/40"
                  }`}
                >
                  <div className="mt-0.5">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-lime-400" />
                    ) : (
                      <Square className="w-5 h-5 text-purple-400/50" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-lime-300/80 block mb-0.5">
                      {item.stage}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                        isChecked ? "text-lime-200 line-through opacity-80" : "text-white"
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
