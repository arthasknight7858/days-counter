"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Radio,
  Newspaper,
  Megaphone,
  Building2,
  Video,
  Share2,
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  Calendar,
  Layers,
  BookOpen,
  Brain,
  CheckSquare,
  Square,
} from "lucide-react";

export default function SocialCommunicationRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [checklist, setChecklist] = useState<Record<number, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_social_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  const toggleCheck = (idx: number) => {
    setChecklist((prev) => {
      const updated = { ...prev, [idx]: !prev[idx] };
      try {
        localStorage.setItem("sofi_social_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "panorama", label: "🗺️ Panorama & Ramas", icon: Layers },
    { id: "frecuencias", label: "📻 Las 7 Frecuencias (Fases)", icon: Radio },
    { id: "youtube", label: "▶️ ¿YouTube Sirve? & Libros", icon: BookOpen },
    { id: "estrategias", label: "🧠 Estrategias & Métodos", icon: Brain },
    { id: "errores", label: "❌ Errores a Evitar", icon: AlertOctagon },
    { id: "cronograma", label: "📅 Cronograma 12 Meses", icon: Calendar },
    { id: "checklist", label: "✅ Checklist de Inicio", icon: CheckSquare },
  ];

  const branches = [
    {
      title: "Periodismo",
      icon: Newspaper,
      desc: "Investigar, verificar y narrar hechos de interés público en texto, radio, TV o medios digitales.",
      color: "from-blue-500/20 to-cyan-500/10 border-blue-500/40 text-blue-300",
    },
    {
      title: "Publicidad & Marketing",
      icon: Megaphone,
      desc: "Crear mensajes persuasivos, storytelling de marca y campañas para posicionar productos o ideas.",
      color: "from-rose-500/20 to-pink-500/10 border-rose-500/40 text-rose-300",
    },
    {
      title: "RRPP & Institucional",
      icon: Building2,
      desc: "Gestionar la reputación, relaciones con medios y comunicación interna de empresas y organizaciones.",
      color: "from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-300",
    },
    {
      title: "Producción Audiovisual",
      icon: Video,
      desc: "Contar historias de impacto visual y sonoro mediante guiones, podcasts, videos y formatos multimedia.",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-300",
    },
    {
      title: "Comunicación Digital",
      icon: Share2,
      desc: "Estrategia de redes sociales, creación de contenido, gestión de comunidad, analítica y SEO.",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300",
    },
  ];

  const stages = [
    {
      freq: "88.1 FM",
      stageNum: "Fase 01",
      title: "Fundamentos Teóricos",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      desc: "Antes de escribir una nota o grabar un video, comprende qué pasa cuando alguien se comunica: quién emite, qué canal usa, el ruido y cómo se decodifica el mensaje.",
      blocks: [
        {
          title: "Qué aprender",
          items: [
            "Modelos de comunicación (Shannon-Weaver, Lasswell, Jakobson)",
            "Emisor, receptor, canal, código, ruido y feedback",
            "Historia y evolución de los medios de comunicación",
            "Comunicación verbal, no verbal y paraverbal",
            "Teoría de la información vs. Teoría crítica de la cultura",
          ],
        },
        {
          title: "Cómo aprenderlo",
          items: [
            "Un curso introductorio o manual base antes de ver videos sueltos",
            "Toma apuntes explicando cada modelo como si fuera a alguien de 12 años",
            "Busca un ejemplo real por cada concepto teórico que estudies",
          ],
        },
      ],
      tip: "💡 Truco de oro: No memorices los esquemas, dibújalos. Si puedes redibujar el modelo de Shannon-Weaver en una hoja en blanco de memoria, lo aprendiste de verdad.",
    },
    {
      freq: "91.3 FM",
      stageNum: "Fase 02",
      title: "Habilidades Transversales",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      desc: "Habilidades que usarás en cualquier rama. Son las que marcan la verdadera diferencia entre un comunicador junior y uno profesional independiente.",
      subCards: [
        {
          title: "✍️ Redacción",
          items: [
            "Ortografía y gramática impecable (no negociable)",
            "Pirámide invertida y titulación periodística",
            "Estilo claro: frases cortas y verbos activos",
            "Redacción web escaneable vs. impreso",
          ],
        },
        {
          title: "🗣️ Oratoria & Voz",
          items: [
            "Dicción, respiración y manejo de silencios",
            "Estructura de discurso (apertura, clímax, cierre)",
            "Lenguaje corporal y presencia en cámara",
          ],
        },
        {
          title: "🧠 Pensamiento Crítico",
          items: [
            "Verificación de fuentes y fact-checking",
            "Detección de sesgos y desinformación",
            "Argumentación lógica y debate",
          ],
        },
        {
          title: "🌍 Cultura General & Ética",
          items: [
            "Actualidad nacional e internacional",
            "Historia, política y economía básica",
            "Deontología y código ético del comunicador",
          ],
        },
      ],
      tip: "💡 Hábito: Escribe 300 palabras al día sobre cualquier tema y léelas en voz alta. Mejorarás redacción y dicción en un solo ejercicio.",
    },
    {
      freq: "94.5 FM",
      stageNum: "Fase 03",
      title: "Elegí tu Especialización",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      desc: "Elige una rama principal para enfocar tus próximos 6-12 meses. Siempre podrás combinarla o pivotar más adelante gracias a tu base sólida.",
      specializations: [
        {
          name: "Periodismo",
          items: ["Géneros (noticia, crónica, entrevista, reportaje)", "Periodismo de datos", "Leyes de prensa y libertad de expresión"],
        },
        {
          name: "Publicidad / Marketing",
          items: ["Copywriting y storytelling de marca", "Branding, buyer persona y funnels", "Fundamentos de marketing digital"],
        },
        {
          name: "RRPP / Institucional",
          items: ["Gestión y comunicación de crisis", "Gacetillas y media training", "Comunicación interna y stakeholders"],
        },
        {
          name: "Producción Audiovisual",
          items: ["Guion y narrativa cinematográfica", "Lenguaje de planos y cámara", "Edición de video y producción de podcasts"],
        },
        {
          name: "Comunicación Digital",
          items: ["Calendario editorial y content management", "Métricas: alcance, engagement y CTR", "Fundamentos de SEO y algoritmos"],
        },
      ],
      tip: "💡 Cómo elegir: Realiza una mini-tarea de cada rama en una semana (una crónica, un guion de 1 min, un plan de 5 posts). La que te apasione continuar de largo, esa es tu señal.",
    },
    {
      freq: "97.7 FM",
      stageNum: "Fase 04",
      title: "Herramientas Técnicas",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      desc: "La teoría sin herramientas no produce nada mostrable. Domina el software que utilizarás a diario en la industria.",
      tools: [
        {
          category: "🎨 Edición Visual & Audio",
          items: ["Canva (piezas rápidas)", "CapCut / Premiere (video)", "Photoshop / Photopea", "Audacity (audio/podcasts)"],
        },
        {
          category: "🌐 Publicación & Redes",
          items: ["WordPress u otro CMS", "Meta Business Suite / Buffer", "Newsletters (Substack, Mailchimp)"],
        },
        {
          category: "📊 Analítica & Datos",
          items: ["Google Analytics (básico)", "Métricas nativas de plataformas", "Hojas de cálculo para reportes"],
        },
        {
          category: "🤖 IA Aplicada",
          items: ["Asistentes para investigación", "Generación de ideas y piezas gráficas", "Uso ético y transparencia"],
        },
      ],
      tip: "💡 Enfoque: No necesitas ser un experto en 20 programas; domina 1 de diseño, 1 de video y 1 de gestión.",
    },
    {
      freq: "101.0 FM",
      stageNum: "Fase 05",
      title: "Práctica Real & Portafolio",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      desc: "Ningún curso reemplaza el acto de publicar cosas reales. Esta fase se trabaja en paralelo a todo lo aprendido.",
      blocks: [
        {
          title: "Proyectos Propios",
          items: [
            "Crear un blog, canal o podcast propio con identidad clara",
            "Cubrir un evento local o cultural como si fueras prensa oficial",
            "Diseñar una campaña o plan de comunicación ficticio para una marca real",
          ],
        },
        {
          title: "Práctica con Terceros",
          items: [
            "Medios estudiantiles, comunitarios o universitarios",
            "Pasantías y prácticas profesionales",
            "Colaborar con una ONG o emprendimiento a cambio de piezas para tu portafolio",
          ],
        },
      ],
      tip: "💡 Regla del portafolio: No necesitas 30 piezas. Con 5 a 8 piezas de alto nivel, cada una demostrando una habilidad distinta, es más que suficiente.",
    },
    {
      freq: "104.5 FM",
      stageNum: "Fase 06",
      title: "Networking & Empleabilidad",
      badgeColor: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40",
      desc: "En comunicación social, a quién conoces y cómo presentas tus resultados importa tanto como lo que sabes hacer.",
      blocks: [
        {
          title: "Presencia Profesional",
          items: [
            "Perfil de LinkedIn optimizado con portafolio enlazado",
            "CV enfocado en métricas y resultados, no solo tareas",
            "Web personal o carpeta pública impecable con tus mejores piezas",
          ],
        },
        {
          title: "Comunidad & Conexiones",
          items: [
            "Participar en foros y grupos del sector",
            "Asistir a charlas, eventos y meetups de medios",
            "Buscar mentorías con profesionales que admires",
          ],
        },
      ],
      tip: "💡 Consejo: Sé generosa compartiendo aprendizajes e interactuando con las publicaciones de colegas.",
    },
    {
      freq: "107.9 FM",
      stageNum: "Fase 07",
      title: "Actualización Constante",
      badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
      desc: "Esta frecuencia nunca se apaga: las plataformas, algoritmos y formatos cambian constantemente. La ruta se recorre en espiral.",
      tip: "💡 Hábito mensual: Dedica una tarde al mes a investigar qué cambió en tu rama (un nuevo algoritmo, herramienta o tendencia) y ajusta tus metodologías.",
    },
  ];

  const youtubeVsOther = [
    {
      yes: "Tutoriales de software (edición, Canva, CMS)",
      no: "Teoría de la comunicación estructurada y ordenada",
    },
    {
      yes: "Ejemplos reales de entrevistas, coberturas y spots",
      no: "Retroalimentación sobre tus propios textos o piezas",
    },
    {
      yes: "Charlas y conferencias TED de profesionales",
      no: "Ética, deontología y marco legal (requieren debate y lectura)",
    },
    {
      yes: "Estar al día con tendencias y nuevos formatos",
      no: "Certificación formal si el mercado laboral la solicita",
    },
  ];

  const booksAndResources = [
    {
      category: "📺 Qué buscar en YouTube",
      badge: "Video",
      items: [
        "OpenCourseWare de universidades con carrera de comunicación",
        "Charlas TED sobre medios, persuasión y opinión pública",
        "Tutoriales específicos de software de edición y diseño",
        "Making-of y detrás de cámaras de medios y producciones",
      ],
    },
    {
      category: "🎓 Plataformas de Cursos",
      badge: "Cursos",
      items: [
        "Coursera y edX (periodismo y comunicación universitaria)",
        "Domestika y Crehana (producción audiovisual y redacción)",
        "Google Actívate / Skillshop (marketing y analítica digital)",
        "Repositorios abiertos (OCW) de escuelas de periodismo",
      ],
    },
    {
      category: "📖 Libros Fundamentales",
      badge: "Lecturas",
      items: [
        "Teoría de la comunicación humana — Paul Watzlawick",
        "Comprender los medios de comunicación — Marshall McLuhan",
        "Los cínicos no sirven para este oficio — Ryszard Kapuściński",
        "Manual de estilo periodístico (El País, EFE o agencia nacional)",
      ],
    },
    {
      category: "🎙️ Podcasts de Comunicación",
      badge: "Audio",
      items: [
        "Podcasts de periodismo de investigación y análisis de medios",
        "Podcasts de marketing y estrategia digital",
        "Entrevistas long-form a periodistas y comunicadores referentes",
      ],
    },
  ];

  const strategies = [
    {
      num: "01",
      title: "Aprender Haciendo",
      desc: "Por cada concepto teórico, produce una pieza concreta la misma semana (una nota, un guion, un post). La teoría que no se aplica se olvida.",
    },
    {
      num: "02",
      title: "Técnica Feynman",
      desc: "Explica cada concepto en voz alta como si le estuvieras enseñando a alguien que no sabe nada del tema. Revelará tus verdaderas dudas.",
    },
    {
      num: "03",
      title: "Diario de Consumo Crítico",
      desc: "Analiza una pieza de comunicación al día (un titular, un anuncio o un video viral) y escribe en 3 líneas qué funcionó y qué falló.",
    },
    {
      num: "04",
      title: "Shadowing para Oratoria",
      desc: "Elige a un comunicador con dicción ejemplar y repite sus frases al unísono, imitando pausas y modulación para entrenar tu voz.",
    },
    {
      num: "05",
      title: "Feedback Externo",
      desc: "Haz que otra persona lea o mire tu trabajo cada semana. El criterio profesional se forja mucho más rápido con ojos ajenos.",
    },
    {
      num: "06",
      title: "Repetición Espaciada",
      desc: "Repasa los modelos de comunicación a los 2 días, a la semana y al mes para anclarlos en la memoria a largo plazo.",
    },
  ];

  const mistakes = [
    {
      title: "Coleccionar cursos sin producir",
      desc: "Inscribirse a decenas de talleres y no publicar nada. Más vale un solo curso terminado y aplicado que cinco a medias.",
    },
    {
      title: "Especializarse demasiado rápido",
      desc: "Elegir rama antes de probar al menos 2 o 3, conformándose con la primera opción por comodidad.",
    },
    {
      title: "Ignorar la ortografía y redacción",
      desc: "En comunicación social, un error ortográfico o de sintaxis resta credibilidad de inmediato.",
    },
    {
      title: "No mostrar el trabajo al público",
      desc: "Producir solo en privado y no publicar. El portafolio se crea compartiendo con el mundo, no acumulando borradores.",
    },
    {
      title: "Copiar ciegamente el tono ajeno",
      desc: "Imitar para aprender es válido al inicio, pero debes dejar espacio para encontrar tu propia voz y estilo.",
    },
  ];

  const chronogram = [
    { month: "Mes 1–2", freq: "88.1 – 91.3 FM", focus: "Fundamentos teóricos + habilidades transversales (redacción y oratoria diaria)" },
    { month: "Mes 3", freq: "94.5 FM", focus: "Explorar 2 o 3 ramas con mini-proyectos cortos de prueba" },
    { month: "Mes 4–6", freq: "94.5 – 97.7 FM", focus: "Especialización elegida + herramientas técnicas de dicha rama" },
    { month: "Mes 7–9", freq: "101.0 FM", focus: "Proyecto propio sostenido (blog, podcast, canal o colaboraciones)" },
    { month: "Mes 10", freq: "104.5 FM", focus: "Armar portafolio final de 5-8 piezas de oro, CV y perfil profesional" },
    { month: "Mes 11", freq: "104.5 FM", focus: "Networking activo, postulaciones y primeras entrevistas" },
    { month: "Mes 12+", freq: "107.9 FM", focus: "Actualización constante de tendencias — ciclo en espiral" },
  ];

  const checklistItems = [
    "Elegir una fuente teórica base (curso universitario o manual) y comenzar por ahí",
    "Escribir o grabar una pieza comunicativa esta semana, aunque sea breve",
    "Explorar y probar al menos 2 ramas antes de decidir especialización",
    "Crear un espacio público (blog, canal o perfil) para publicar tu trabajo",
    "Sumar una fuente de lectura profunda por cada tanda de videos consumidos",
    "Pedir retroalimentación a alguien real sobre tu primera pieza producida",
    "Optimizar tu perfil de LinkedIn en cuanto tengas 3-4 piezas de calidad",
    "Agendar una tarde al mes para revisar tendencias y novedades del sector",
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Hero Radio Tuner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-950/30 via-purple-900/20 to-teal-950/30 backdrop-blur-xl border border-amber-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(217,164,65,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Sintoniza tu Ruta · 88.1 a 107.9 FM
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Roadmap de </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-300 via-rose-300 to-teal-300">
              Comunicación Social
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            La comunicación no se aprende de memoria: se aprende sintonizando estación por estación. Desde las bases teóricas hasta construir un portafolio profesional empleable.
          </p>

          {/* Frequencies Badge Grid */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl">
            {["88.1 Teoría", "91.3 Habilidades", "94.5 Especialidad", "97.7 Tools", "101.0 Portafolio", "104.5 Network", "107.9 FM"].map((f, i) => (
              <span
                key={i}
                className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-amber-400/25 text-amber-200"
              >
                {f}
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
                  ? "bg-amber-600/90 text-white border-amber-400 shadow-[0_0_15px_rgba(217,164,65,0.4)] scale-102 font-semibold"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. PANORAMA & RAMAS */}
      {(activeSubTab === "all" || activeSubTab === "panorama") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Mapa Completo</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-amber-400" />
              ¿Qué es Estudiar Comunicación Social?
            </h3>
            <p className="text-purple-200/70 text-sm">
              Es el tronco común que estudia cómo se producen y transmiten mensajes entre personas, audiencias y organizaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className={`rounded-2xl bg-linear-to-br ${b.color} backdrop-blur-md border p-5 flex flex-col justify-between hover:scale-102 transition-transform`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-white" />
                      <h4 className="font-bold text-white text-base">{b.title}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* 2. LAS 7 FRECUENCIAS (FASES) */}
      {(activeSubTab === "all" || activeSubTab === "frecuencias") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Sintonizador Paso a Paso</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Radio className="w-6 h-6 text-amber-400" />
              Las 7 Frecuencias del Comunicador
            </h3>
          </div>

          <div className="space-y-6">
            {stages.map((st, idx) => (
              <motion.div
                key={st.freq}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 sm:p-7 backdrop-blur-md space-y-4 hover:border-amber-400/40 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg sm:text-xl font-mono font-bold text-amber-300">
                      {st.freq}
                    </span>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${st.badgeColor}`}>
                      {st.stageNum}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">{st.title}</h4>
                </div>

                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">{st.desc}</p>

                {/* Blocks (What / How) */}
                {st.blocks && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                    {st.blocks.map((blk, i) => (
                      <div key={i} className="space-y-2">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-amber-300">{blk.title}:</h5>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-purple-200/80">
                          {blk.items.map((it, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Subcards (for Phase 2) */}
                {st.subCards && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                    {st.subCards.map((sc, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-purple-500/20 space-y-1.5">
                        <h5 className="font-bold text-white text-xs sm:text-sm">{sc.title}</h5>
                        <ul className="space-y-1 text-xs text-purple-200/75">
                          {sc.items.map((it, j) => (
                            <li key={j}>• {it}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Specializations (for Phase 3) */}
                {st.specializations && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 border-t border-white/10">
                    {st.specializations.map((sp, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-purple-500/20 space-y-1">
                        <h5 className="font-bold text-purple-300 text-xs sm:text-sm">{sp.name}</h5>
                        <ul className="space-y-0.5 text-xs text-purple-200/70">
                          {sp.items.map((it, j) => (
                            <li key={j}>• {it}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tools (for Phase 4) */}
                {st.tools && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-white/10">
                    {st.tools.map((tl, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-purple-500/20 space-y-1">
                        <h5 className="font-bold text-teal-300 text-xs sm:text-sm">{tl.category}</h5>
                        <ul className="space-y-0.5 text-xs text-purple-200/70">
                          {tl.items.map((it, j) => (
                            <li key={j}>• {it}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {st.tip && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                    {st.tip}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 3. YOUTUBE & RECURSOS */}
      {(activeSubTab === "all" || activeSubTab === "youtube") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Guía Crítica</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              ¿Puedo Aprender Comunicación por YouTube?
            </h3>
            <p className="text-purple-200/70 text-sm">
              YouTube es excelente para herramientas y ejemplos prácticos, pero requiere complementarse con lectura y producción real.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-hidden rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-purple-500/20">
              <div className="p-5 bg-teal-950/20 space-y-3">
                <h4 className="font-bold text-teal-300 text-sm sm:text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-400" />
                  Para esto, YouTube funciona de maravilla:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-purple-200/80">
                  {youtubeVsOther.map((y, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">✓</span>
                      <span>{y.yes}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-rose-950/20 space-y-3">
                <h4 className="font-bold text-rose-300 text-sm sm:text-base flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5 text-rose-400" />
                  Para esto necesitas más que solo videos:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-purple-200/80">
                  {youtubeVsOther.map((n, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✗</span>
                      <span>{n.no}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Resources Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {booksAndResources.map((res) => (
              <div
                key={res.category}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md space-y-2 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {res.badge}
                  </span>
                  <h4 className="font-bold text-white text-sm sm:text-base mt-2 mb-2">{res.category}</h4>
                  <ul className="space-y-1.5 text-xs text-purple-200/75 leading-relaxed">
                    {res.items.map((it, j) => (
                      <li key={j}>• {it}</li>
                    ))}
                  </ul>
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
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Métodos de Alto Impacto</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-amber-400" />
              Estrategias y Trucos que Funcionan
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategies.map((st) => (
              <div
                key={st.num}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md space-y-2 hover:border-amber-400/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 block">{st.num}</span>
                  <h4 className="font-bold text-white text-base">{st.title}</h4>
                  <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed mt-1">{st.desc}</p>
                </div>
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
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Para Evitar Retrocesos</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <AlertOctagon className="w-6 h-6 text-rose-400" />
              Errores Comunes al Iniciar en Comunicación
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* 6. CRONOGRAMA 12 MESES */}
      {(activeSubTab === "all" || activeSubTab === "cronograma") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Plan Sugerido</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-teal-400" />
              Cronograma de 12 Meses (5 a 8 hrs/semana)
            </h3>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white/5 border border-purple-500/20 backdrop-blur-md">
            <div className="grid grid-cols-1 divide-y divide-purple-500/20">
              {chronogram.map((item, i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:w-56 shrink-0">
                    <span className="font-bold text-amber-300 text-sm sm:text-base">{item.month}</span>
                    <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {item.freq}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-100/90 grow leading-relaxed">{item.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* 7. CHECKLIST */}
      {(activeSubTab === "all" || activeSubTab === "checklist") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Antes de Cerrar la Señal</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <CheckSquare className="w-6 h-6 text-amber-400" />
              Checklist de Inicio
            </h3>
            <p className="text-purple-200/70 text-sm">Toca para marcar tus avances y objetivos cumplidos.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {checklistItems.map((chk, i) => {
              const isChecked = !!checklist[i];

              return (
                <button
                  key={i}
                  onClick={() => toggleCheck(i)}
                  className={`p-4 rounded-2xl border backdrop-blur-md transition-all text-left flex items-start gap-3 cursor-pointer select-none ${
                    isChecked
                      ? "bg-teal-950/30 border-teal-500/40 shadow-[0_0_15px_rgba(63,167,150,0.2)]"
                      : "bg-white/5 border-purple-500/20 hover:bg-white/8 hover:border-amber-400/40"
                  }`}
                >
                  <div className="mt-0.5">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-teal-400" />
                    ) : (
                      <Square className="w-5 h-5 text-purple-400/50" />
                    )}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-medium leading-relaxed ${
                      isChecked ? "text-teal-200 line-through opacity-80" : "text-white"
                    }`}
                  >
                    {chk}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* Footer Quote */}
      <div className="rounded-3xl bg-linear-to-r from-amber-950/40 via-purple-950/30 to-teal-950/40 border border-amber-400/30 p-8 text-center backdrop-blur-xl space-y-3">
        <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-300 block">107.9 FM · SEÑAL EN VIVO</span>
        <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mx-auto leading-relaxed">
          &ldquo;La comunicación social se aprende y domina practicando, narrando y conectando con las personas.&rdquo; 💖
        </p>
      </div>
    </div>
  );
}
