"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  BookOpen,
  Wrench,
  Brain,
  AlertOctagon,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Volume2,
  Heart,
  Tv,
} from "lucide-react";

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function KoreanRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({ 0: true });

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "fases", label: "🗺️ Las 6 Fases (0 a 5)", icon: Compass },
    { id: "recursos", label: "🔧 Recursos & Cursos", icon: Wrench },
    { id: "youtube", label: "▶️ YouTube & Canales", icon: YouTubeIcon },
    { id: "estrategias", label: "🧠 Estrategias Clave", icon: Brain },
    { id: "errores", label: "❌ Errores a Evitar", icon: AlertOctagon },
    { id: "faq", label: "❓ Preguntas Frecuentes", icon: HelpCircle },
  ];

  const stages = [
    {
      num: "0",
      ko: "한글",
      phase: "Fase 0 — Hangul (한글)",
      time: "Semana 1–2",
      goal: "Meta: leer y escribir cualquier palabra coreana, aunque no la entiendas todavía.",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      borderColor: "border-amber-500/30",
      dotColor: "border-amber-400 bg-amber-950",
      what: [
        "Las 14 consonantes y 10 vocales básicas",
        "Cómo se combinan en bloques silábicos (초성-중성-종성)",
        "Consonantes dobles (ㄲㄸㅃㅆㅉ) y diptongos",
        "Reglas básicas de pronunciación (받침 / batchim)",
      ],
      how: [
        "Nada de romanización desde el día 3: fuerza la lectura directa en hangul",
        "Escribe a mano 15-20 min/día: la memoria motriz fija las formas",
        "Practica leyendo en voz alta letreros, canciones de K-pop y K-dramas",
        "Haz un test de lectura cronometrado al final de la semana 2",
      ],
    },
    {
      num: "1",
      ko: "기초",
      phase: "Fase 1 — Fundamentos y Primeras Frases",
      time: "Mes 1–2",
      goal: "Meta: presentarte, pedir cosas básicas y entender frases cotidianas muy simples.",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      borderColor: "border-rose-500/30",
      dotColor: "border-rose-400 bg-rose-950",
      what: [
        "Partículas de sujeto/tema: 은/는, 이/가",
        "Partícula de objeto: 을/를",
        "Verbo 이다 (ser) y 있다/없다 (haber/tener/estar)",
        "Presente informal y formal educado (해요체)",
        "~150 a 300 palabras de vocabulario esencial",
      ],
      how: [
        "Empieza tu mazo de Anki (SRS) desde el primer día",
        "Usa un curso estructurado como columna vertebral (TTMIK)",
        "Aprende patrones y frases completas, no palabras sueltas",
        "Escucha 10 min diarios de coreano nativo para afinar el oído",
      ],
    },
    {
      num: "2",
      ko: "문법",
      phase: "Fase 2 — Gramática Básica (Nivel TOPIK I)",
      time: "Mes 3–6",
      goal: "Meta: mantener conversaciones simples del día a día y comprender textos cortos.",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      borderColor: "border-blue-500/30",
      dotColor: "border-blue-400 bg-blue-950",
      what: [
        "Pasado y futuro (았/었, (으)ㄹ 거예요)",
        "Conectores básicos: 그리고, 그런데, 왜냐하면, ~고, ~아서/어서",
        "Estilo informal (반말) vs. formal educado (존댓말)",
        "Adjetivos-verbo, negación y partículas interrogativas",
        "Números nativos coreanos y sino-coreanos (dos sistemas)",
      ],
      how: [
        "Ten a mano un libro de gramática de referencia (Korean Grammar in Use)",
        "Producción escrita activa: 3-5 frases propias por cada punto gramatical",
        "Inicia intercambios de idiomas (Tandem / HelloTalk)",
        "Considera el examen TOPIK I como un hito medible",
      ],
    },
    {
      num: "3",
      ko: "몰입",
      phase: "Fase 3 — Vocabulario e Inmersión Ligera",
      time: "Mes 6–12",
      goal: "Meta: pasar de traducir en tu mente a reconocer patrones coreanos directamente.",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      borderColor: "border-purple-500/30",
      dotColor: "border-purple-400 bg-purple-950",
      what: [
        "Ampliar a 1,500 – 2,500 palabras de vocabulario activo",
        "Verbos irregulares comunes (ㄷ, ㅂ, ㄹ, ㅅ, 르, ㅎ)",
        "Honoríficos básicos (사용/드리다/계시다)",
        "Expresiones coloquiales y frases de K-dramas y series",
      ],
      how: [
        "Input comprensible: contenido un 10% por encima de tu nivel actual",
        "Técnica de Shadowing (repetir en simultáneo con audio nativo) 10-15 min/día",
        "Ver K-dramas y variety shows con subtítulos en coreano",
        "Anotar y 'minar' frases reales para tu mazo de Anki",
      ],
    },
    {
      num: "4",
      ko: "중급",
      phase: "Fase 4 — Nivel Intermedio (TOPIK II)",
      time: "Año 2",
      goal: "Meta: opinar, argumentar y seguir conversaciones a velocidad natural.",
      badgeColor: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40",
      borderColor: "border-fuchsia-500/30",
      dotColor: "border-fuchsia-400 bg-fuchsia-950",
      what: [
        "Gramática de conexión intermedia (~는데, ~길래, ~잖아요, ~다가)",
        "Estilo indirecto (discurso reportado)",
        "Honoríficos completos y registro formal escrito (뉴스체)",
        "Modismos coreanos (관용어) y refranes populares (속담)",
      ],
      how: [
        "Reduce material de estudiantes y pasa a contenido 100% nativo",
        "Escribe un diario corto en coreano varias veces por semana",
        "Sesiones periódicas con tutores nativos en iTalki para pulir detalles",
        "Simulacros de examen TOPIK II si buscas certificación oficial",
      ],
    },
    {
      num: "5",
      ko: "유창",
      phase: "Fase 5 — Fluidez e Inmersión Total",
      time: "Año 2–3+",
      goal: "Meta: vivir en coreano — disfrutar series, música, cultura o viajes con total soltura.",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      borderColor: "border-emerald-500/30",
      dotColor: "border-emerald-400 bg-emerald-950",
      what: [
        "Registros especializados (profesional, académico, jerga moderna)",
        "Matices culturales profundos (indirectas, jerarquía social, humor)",
        "Variaciones dialectales y entonaciones regionales (사투리)",
      ],
      how: [
        "Consumo de medios coreanos sin subtítulos como rutina diaria",
        "Comunidades y foros coreanos en línea",
        "Viajes o inmersión cultural directa en Corea",
        "Mantener el idioma activo todos los días",
      ],
    },
  ];

  const resources = [
    {
      tag: "Hangul",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      title: "Aprende Hangul en un fin de semana",
      desc: "Guías visuales como 'Learn Hangul in 90 Minutes' (Ryan Estrada, gratis) o el canal Korean FM. Apps específicas como Dubu / Hangul.",
      icon: "🔤",
    },
    {
      tag: "Curso Estructurado",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      title: "Talk To Me In Korean (TTMIK)",
      desc: "El curso de referencia mundial para aprender coreano: lecciones ordenadas en audio y PDF, con explicaciones amables y claras.",
      icon: "🎧",
    },
    {
      tag: "App Diaria (SRS)",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      title: "Anki + Mazo 'Korean 6000'",
      desc: "La repetición espaciada es clave para no olvidar vocabulario ni hanja. Duolingo sirve de calentamiento, pero Anki fija la memoria.",
      icon: "🃏",
    },
    {
      tag: "Gramática de Referencia",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      title: "Korean Grammar in Use (Trilogía)",
      desc: "La serie de libros estándar utilizada incluso en universidades coreanas. Explicaciones directas y ejercicios estructurados.",
      icon: "📖",
    },
    {
      tag: "Escucha & Oído",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      title: "Podcasts & K-Dramas Reales",
      desc: "Iyagi (TTMIK, diálogos naturales por nivel), KBS World Radio y series como True Beauty o programas como Running Man.",
      icon: "📺",
    },
    {
      tag: "Habla & Conversación",
      badgeColor: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40",
      title: "Tandem, HelloTalk & iTalki",
      desc: "Intercambio de idiomas con hablantes nativos coreanos. Hablar desde temprano, aun cometiendo errores, acelera tu aprendizaje.",
      icon: "🤝",
    },
  ];

  const youtubeChannels = [
    {
      name: "Talk To Me In Korean",
      tag: "Nivel 0–1",
      desc: "Versión en video de su afamado curso, con explicaciones naturales y cultura coreana.",
    },
    {
      name: "Korean Unnie",
      tag: "Nivel 0–1",
      desc: "Lecciones amenas, divertidas y estructuradas perfectas para principiantes.",
    },
    {
      name: "Learn Korean with GO! Billy Korean",
      tag: "Nivel 0–2",
      desc: "Profundiza en gramática, matices y el 'por qué' de las estructuras del idioma.",
    },
    {
      name: "90 Day Korean",
      tag: "Nivel 1–2",
      desc: "Técnicas de memorización rápida y vocabulario temático práctico.",
    },
    {
      name: "Canales Coreanos Nativos (Vlogs, K-dramas, BTS)",
      tag: "Inmersión Real",
      desc: "A partir de la Fase 3, mira vlogs cotidianos y contenido hecho para coreanos para acostumbrar el oído al ritmo natural.",
    },
    {
      name: "Consejo Clave de YouTube",
      tag: "Aviso Importante",
      desc: "Úsalo como complemento visual, pero combínalo siempre con escritura a mano y repaso con Anki.",
    },
  ];

  const strategies = [
    {
      ko: "복습",
      title: "Repetición Espaciada (SRS)",
      desc: "El cerebro olvida según una curva predecible. Anki te muestra cada palabra justo antes de olvidarla, multiplicando la retención a largo plazo.",
      color: "border-amber-500/40 text-amber-300",
    },
    {
      ko: "그림자",
      title: "Técnica de Shadowing (Sombra)",
      desc: "Repite en voz alta y en simultáneo con un audio nativo, imitando ritmo, entonación y pausas. Es la forma más efectiva de sonar natural.",
      color: "border-purple-500/40 text-purple-300",
    },
    {
      ko: "입력",
      title: "Input Comprensible (i + 1)",
      desc: "Consume contenido que entiendas en un 70-80%: suficientemente accesible para seguirlo y con novedades suficientes para aprender.",
      color: "border-blue-500/40 text-blue-300",
    },
    {
      ko: "출력",
      title: "Output Activo desde el Día 1",
      desc: "Hablar y escribir activa conexiones neuronales distintas al simple reconocimiento pasivo. Empieza a crear tus propias oraciones temprano.",
      color: "border-rose-500/40 text-rose-300",
    },
    {
      ko: "문장",
      title: "Aprende Frases, No Palabras Sueltas",
      desc: "El coreano cambia según partículas y conjugaciones. Memorizar '학교에 가요 (voy a la escuela)' te enseña gramática y vocabulario juntos.",
      color: "border-emerald-500/40 text-emerald-300",
    },
    {
      ko: "꾸준함",
      title: "Constancia sobre Intensidad",
      desc: "30 minutos diarios durante un año superan por mucho a maratones de fin de semana. La consistencia crea automatismo neurológico.",
      color: "border-fuchsia-500/40 text-fuchsia-300",
    },
  ];

  const mistakes = [
    {
      title: "Quedarse estancada en la romanización",
      desc: "Leer coreano con letras latinas retrasa la lectura real y genera vicios de pronunciación difíciles de corregir.",
    },
    {
      title: "Coleccionar apps sin terminarlas",
      desc: "Es mucho mejor completar un curso ordenado que tener cinco a medias. La dispersión frena el avance real.",
    },
    {
      title: "Ignorar la diferencia entre 존댓말 y 반말",
      desc: "No distinguir el registro formal/educado del informal desde el inicio causa confusiones sociales al hablar.",
    },
    {
      title: "Solo memorizar gramática sin entrenar el oído",
      desc: "Saber reglas en el papel no equivale a comprender coreano hablado rápido y fluido en canciones o series.",
    },
    {
      title: "Miedo a hablar hasta 'estar 100% lista'",
      desc: "Ese momento nunca llega solo estudiando. Cuanto antes te animes a hablar y equivocarte con cariño, antes progresarás.",
    },
    {
      title: "No repasar con repetición espaciada",
      desc: "Sin un sistema como Anki, el vocabulario nuevo se disipa en pocos días. La clave es el repaso justo a tiempo.",
    },
  ];

  const faqs = [
    {
      q: "¿Cuánto tiempo se tarda en hablar coreano con soltura?",
      a: "Depende de la constancia: con 30-60 minutos diarios, las bases (Fases 0 a 2) se logran en 3 a 6 meses; un nivel intermedio cómodo (Fase 4) en 1.5 a 2 años; y fluidez natural con inmersión en 2 a 4 años.",
    },
    {
      q: "¿Necesito aprender Hanja (caracteres chinos)?",
      a: "No para el uso cotidiano. El coreano moderno se escribe íntegramente en Hangul. Los Hanja son útiles más adelante para entender raíces de palabras formales o académicas, pero no son obligatorios para conversar.",
    },
    {
      q: "¿Sirve Duolingo para coreano?",
      a: "Como calentamiento diario o juego de 10 minutos para mantener el hábito sí, pero no como método principal: necesitas un curso con gramática explicada como TTMIK y Anki.",
    },
    {
      q: "¿Vale la pena presentarse al examen oficial TOPIK?",
      a: "Si deseas estudiar o trabajar en Corea es indispensable. Si estudias por disfrute o pasión por los K-dramas y la música, es un hito opcional muy motivador para medir tu progreso.",
    },
    {
      q: "¿Es más difícil que otros idiomas por su alfabeto?",
      a: "¡Al contrario! El Hangul es considerado uno de los alfabetos más lógicos y fáciles del mundo (se aprende a leer en pocos días). El verdadero reto está en el orden de las oraciones y las partículas.",
    },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Hero Korean */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-red-950/30 via-purple-900/20 to-blue-950/30 backdrop-blur-xl border border-rose-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(244,63,94,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            배우다 · Aprender Coreano · 0 → 유창함
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Hoja de Ruta para </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-rose-300 via-purple-300 to-amber-300">
              Aprender Coreano (한국어)
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            El <strong className="text-rose-300">Hangul (한글)</strong> fue creado en 1443 por el rey Sejong para que cualquier persona pudiera aprenderlo en cuestión de días. Las formas de sus letras imitan la boca al pronunciarlas. ¡Un idioma lógico, hermoso y lleno de música!
          </p>

          {/* Interactive Hangul Blocks */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
            {[
              { char: "한", roman: "Han", desc: "Corea" },
              { char: "국", roman: "Guk", desc: "País" },
              { char: "어", roman: "Eo", desc: "Idioma" },
            ].map((block, i) => (
              <motion.div
                key={block.char}
                whileHover={{ y: -6, scale: 1.08 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-purple-400/30 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all cursor-pointer group"
              >
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-rose-300 transition-colors">
                  {block.char}
                </span>
                <span className="text-[10px] text-purple-200/60 tracking-widest uppercase">
                  {block.roman}
                </span>
              </motion.div>
            ))}
          </div>
          <span className="text-xs text-purple-200/60 mt-3">
            한 국 어 (Han-guk-eo) = &ldquo;Idioma Coreano&rdquo;
          </span>
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
                  ? "bg-rose-600/90 text-white border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)] scale-102 font-semibold"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. LAS 6 FASES */}
      {(activeSubTab === "all" || activeSubTab === "fases") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">단계 · Las 6 Fases</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-rose-400" />
              El Camino Progresivo (Desde el Hangul a la Fluidez)
            </h3>
            <p className="text-purple-200/70 text-sm">
              Primero aprendes a leer, luego a construir frases, después a entender a nativos y finalmente a sonar natural.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-2 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-linear-to-b before:from-amber-400 before:via-rose-500 before:to-emerald-500 before:opacity-40">
            {stages.map((st, idx) => (
              <motion.div
                key={st.phase}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`relative rounded-2xl bg-white/5 backdrop-blur-md border ${st.borderColor} p-5 sm:p-7 transition-all duration-300 hover:shadow-[0_0_25px_rgba(244,63,94,0.2)] hover:translate-x-1`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-6 sm:-left-10 top-6 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 ${st.dotColor} shadow-[0_0_10px_rgba(244,63,94,0.5)]`}
                />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${st.badgeColor}`}>
                    {st.phase}
                  </span>
                  <span className="text-xs font-medium text-purple-200/80 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    {st.time}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-amber-200/90 italic font-medium mb-4">{st.goal}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-purple-300">Qué aprender:</h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-purple-200/80">
                      {st.what.map((w, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Cómo aprenderlo:</h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-purple-200/80">
                      {st.how.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 2. RECURSOS POR CATEGORÍA */}
      {(activeSubTab === "all" || activeSubTab === "recursos") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">자료 · Materiales</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Wrench className="w-6 h-6 text-purple-400" />
              Recursos por Categoría Recomendados
            </h3>
            <p className="text-purple-200/70 text-sm">
              Escoge un recurso principal como columna vertebral y apóyate en 1 o 2 complementos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {resources.map((rec, idx) => (
              <div
                key={rec.title}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between hover:border-purple-400/40 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{rec.icon}</span>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${rec.badgeColor}`}>
                      {rec.tag}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-base mb-2">{rec.title}</h4>
                  <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed">{rec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 3. YOUTUBE */}
      {(activeSubTab === "all" || activeSubTab === "youtube") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">유튜브 · Video Lecciones</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <YouTubeIcon className="w-6 h-6 text-red-400" />
              ¿Se Puede Aprender Coreano por YouTube?
            </h3>
            <p className="text-purple-200/70 text-sm">
              Sí, como complemento visual y auditivo de alto valor junto a tus notas y mazo de Anki.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubeChannels.map((ch, idx) => (
              <div
                key={ch.name}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md flex flex-col justify-between hover:border-rose-400/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {ch.tag}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base mb-1.5">{ch.name}</h4>
                  <p className="text-xs text-purple-200/70 leading-relaxed">{ch.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 4. ESTRATEGIAS */}
      {(activeSubTab === "all" || activeSubTab === "estrategias") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">전략 · Métodos Efectivos</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-amber-400" />
              Estrategias que Marcan la Diferencia
            </h3>
            <p className="text-purple-200/70 text-sm">
              Técnicas respaldadas para acelerar el aprendizaje y retención del idioma coreano.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategies.map((st, i) => (
              <div
                key={st.title}
                className={`rounded-2xl bg-white/5 border border-purple-500/20 border-l-4 ${st.color} p-5 backdrop-blur-md hover:bg-white/8 transition-all`}
              >
                <span className="text-2xl font-serif font-bold text-amber-300 block mb-2">{st.ko}</span>
                <h4 className="font-bold text-white text-base mb-1.5">{st.title}</h4>
                <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 5. ERRORES */}
      {(activeSubTab === "all" || activeSubTab === "errores") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">실수 · Errores Comunes</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <AlertOctagon className="w-6 h-6 text-rose-400" />
              Errores que Retrasan el Progreso
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mistakes.map((m, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-rose-500/20 border-l-4 border-l-rose-500 p-5 backdrop-blur-md"
              >
                <h4 className="font-bold text-sm sm:text-base mb-1 text-rose-200">{m.title}</h4>
                <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 6. FAQ */}
      {(activeSubTab === "all" || activeSubTab === "faq") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">질문 · Preguntas Frecuentes</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-purple-400" />
              Dudas Habituales al Empezar Coreano
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = !!openFaq[index];

              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white/5 border border-purple-500/20 overflow-hidden backdrop-blur-md"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left font-semibold text-white text-sm sm:text-base flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-rose-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-purple-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-purple-200/80 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* Footer Encouragement */}
      <div className="rounded-3xl bg-linear-to-r from-rose-950/40 via-purple-950/30 to-blue-950/40 border border-rose-400/30 p-8 text-center backdrop-blur-xl space-y-3">
        <span className="font-serif text-3xl font-bold text-amber-300 block">화이팅! (¡Hwaiting!)</span>
        <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mx-auto leading-relaxed">
          ¡Mucho ánimo en tu camino con el coreano, Sofi! Aprende a tu propio ritmo disfrutando cada paso, cada canción y cada drama. 💖
        </p>
      </div>
    </div>
  );
}
