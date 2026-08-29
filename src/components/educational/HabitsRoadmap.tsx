"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  CheckCircle2,
  CheckSquare,
  Square,
  Sun,
  Moon,
  Timer,
  Target,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

export default function HabitsRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [completedHabits, setCompletedHabits] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_habits_tracker");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  const toggleHabit = (id: string) => {
    setCompletedHabits((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_habits_tracker", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "leyes", label: "⚡ Las 4 Leyes de los Hábitos", icon: Zap },
    { id: "tecnicas", label: "⏱️ Técnicas de Enfoque", icon: Timer },
    { id: "rutinas", label: "☀️ Rutinas de Día & Noche", icon: Sun },
    { id: "procrastinacion", label: "🛡️ Vencer la Procrastinación", icon: Target },
    { id: "tracker", label: "✅ Tracker de Hábitos", icon: CheckSquare },
    { id: "libros", label: "📖 Libros Recomendados", icon: BookOpen },
  ];

  const fourLaws = [
    {
      num: "1ª Ley",
      title: "Hacerlo Obvio (La Señal)",
      color: "from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-300",
      desc: "Si quieres que un hábito forme parte de tu vida, haz que la señal para iniciarlo sea imposible de ignorar.",
      tips: [
        "Diseño del entorno: Deja el libro en tu almohada o la botella de agua en tu escritorio.",
        "Apilamiento de hábitos (Habit Stacking): 'Después de [hábito actual], haré [nuevo hábito]'.",
        "Intención de implementación: Define la hora exacta y lugar donde lo harás.",
      ],
    },
    {
      num: "2ª Ley",
      title: "Hacerlo Atractivo (El Deseo)",
      color: "from-rose-500/20 to-pink-500/10 border-rose-500/40 text-rose-300",
      desc: "Nuestro cerebro se mueve por anticipación de placer y dopamina.",
      tips: [
        "Emparejamiento de tentaciones: Une lo que necesitas hacer con algo que te encanta hacer.",
        "Crea un ritual de inicio: Escuchar tu canción favorita de BTS antes de ponerte a estudiar.",
        "Rodéate de personas con los hábitos que deseas tener.",
      ],
    },
    {
      num: "3ª Ley",
      title: "Hacerlo Fácil (La Respuesta)",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-300",
      desc: "La energía humana busca la menor resistencia. Reduce la fricción al mínimo.",
      tips: [
        "Regla de los 2 Minutos: Al iniciar un nuevo hábito, que tome menos de 2 minutos (ej. leer 1 página).",
        "Prepara el terreno: Deja todo listo la noche anterior para empezar sin esfuerzo.",
        "Automatiza decisiones para no gastar fuerza de voluntad innecesaria.",
      ],
    },
    {
      num: "4ª Ley",
      title: "Hacerlo Satisfactorio (La Recompensa)",
      color: "from-purple-500/20 to-indigo-500/10 border-purple-500/40 text-purple-300",
      desc: "Lo que es recompensado de inmediato se repite. Lo que es castigado se evita.",
      tips: [
        "Celebra las micro-victorias: Tacha la tarea con orgullo inmediatamente.",
        "Regla de oro: 'Nunca faltes dos días seguidos'. Si fallas un día por imprevisto, retómalo al siguiente.",
        "Visualiza tu racha y progreso acumulado con cariño.",
      ],
    },
  ];

  const techniques = [
    {
      name: "🍅 Técnica Pomodoro (25 / 5)",
      desc: "25 minutos de enfoque total sin celular ni distracciones + 5 minutos de descanso activo. Cada 4 ciclos, toma un descanso largo de 20 minutos.",
      benefit: "Evita el cansancio mental y mantiene tu mente fresca y motivada.",
    },
    {
      name: "🗓️ Time Blocking (Bloques Sagrados)",
      desc: "Asigna bloques fijos en tu calendario para tareas importantes en vez de una lista infinita de pendientes.",
      benefit: "Elimina la duda de '¿qué hago ahora?' y te da control sobre tu día.",
    },
    {
      name: "🎯 Matriz de Eisenhower",
      desc: "Divide tus tareas en: 1) Urgente e Importante (Hazlo ya), 2) Importante no Urgente (Planifícalo), 3) No importante (Delega o simplifica).",
      benefit: "Te enfoca en lo que verdaderamente aporta a tus metas a largo plazo.",
    },
    {
      name: "⚡ Regla de los 2 Minutos",
      desc: "Si una tarea toma menos de dos minutos (responder un mensaje clave, ordenar tu mesa, tomar agua), hazla en ese preciso instante.",
      benefit: "Evita la acumulación de pequeñas cargas mentales que generan estrés.",
    },
  ];

  const routines = {
    morning: [
      { step: "1", title: "Despertar sin redes sociales (primeros 20 min)", desc: "Dale a tu mente paz y calma antes de recibir información del mundo." },
      { step: "2", title: "Hidratación con un vaso de agua", desc: "Reactiva tu organismo y energía tras las horas de sueño." },
      { step: "3", title: "Luz natural y estiramiento suave", desc: "Abre la ventana, respira y estira tu cuerpo 3-5 minutos." },
      { step: "4", title: "Definir las 3 prioridades del día", desc: "Elige las 3 cosas que harán que tu día haya valido la pena." },
    ],
    night: [
      { step: "1", title: "Cierre de pantallas 30-45 min antes de dormir", desc: "La luz azul inhibe la melatonina; protege tu descanso." },
      { step: "2", title: "Dejar preparado el espacio de mañana", desc: "Ropa lista, cuaderno a mano y escritorio despejado." },
      { step: "3", title: "3 Agradecimientos del día", desc: "Anota 3 cosas bonitas que pasaron hoy por sencillas que parezcan." },
      { step: "4", title: "Lectura relajante o respiración profunda", desc: "Induce a un sueño reparador y profundo." },
    ],
  };

  const antiProcrastination = [
    {
      title: "1. La Regla de los 5 Segundos",
      desc: "Cuando sientas pereza de empezar, cuenta regresivamente 5-4-3-2-1 y muévete físicamente a iniciar. Interrumpe el piloto automático de la mente.",
    },
    {
      title: "2. Hazlo 'Ridículamente Pequeño'",
      desc: "¿Pereza de estudiar 1 hora? Comprométete solo a abrir el libro y leer 1 párrafo. Una vez que comienzas, continuar es mucho más fácil.",
    },
    {
      title: "3. Oculta las Tentaciones",
      desc: "Pon el teléfono en otra habitación o en modo concentración mientras estudias. Lo que no ves, no te distrae.",
    },
    {
      title: "4. Perdónate si Tienes un Mal Día",
      desc: "La culpa y la autocrítica aumentan la procrastinación. Trátate con amabilidad y retoma con calma al día siguiente.",
    },
  ];

  const dailyTracker = [
    { id: "water", label: "Tomar 2 Litros de Agua", cat: "Salud" },
    { id: "read", label: "Leer 10 Páginas de un Libro", cat: "Mente" },
    { id: "study", label: "Sesión de Estudio / Idiomas (25-30 min)", cat: "Aprendizaje" },
    { id: "exercise", label: "Movimiento / Ejercicio o Caminata", cat: "Cuerpo" },
    { id: "tidy", label: "Espacio de Estudio Ordenado", cat: "Entorno" },
    { id: "sleep", label: "Descanso Reparador (7-8 Horas)", cat: "Bienestar" },
  ];

  const recommendedBooks = [
    {
      title: "Hábitos Atómicos",
      author: "James Clear",
      desc: "El libro definitivo sobre cómo pequeños cambios de 1% diario producen resultados gigantescos con el tiempo.",
      tag: "Lectura Clave",
    },
    {
      title: "El Poder de los Hábitos",
      author: "Charles Duhigg",
      desc: "La ciencia neurológica detrás de cómo se forman los bucles de hábitos y cómo reprogramarlos.",
      tag: "Neurociencia",
    },
    {
      title: "Céntrate (Deep Work)",
      author: "Cal Newport",
      desc: "Reglas para el éxito enfocado en un mundo lleno de distracciones constantes y ruido digital.",
      tag: "Productividad",
    },
    {
      title: "El Método Bullet Journal",
      author: "Ryder Carroll",
      desc: "Organización analógica para clarificar tu mente, tus metas y tu tiempo diario.",
      tag: "Organización",
    },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Hero Habits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-950/30 via-purple-900/20 to-emerald-950/30 backdrop-blur-xl border border-amber-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(217,164,65,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Hábitos Atómicos & Productividad
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">El Poder del </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-300 via-rose-300 to-emerald-300">
              1% Mejor Cada Día
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            No necesitas cambiar tu vida de la noche a la mañana. Mejorar un 1% cada día te hace <strong className="text-amber-300">37 veces mejor</strong> al cabo de un año. La constancia amable transforma tus sueños en realidades.
          </p>

          <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/30 text-center max-w-lg">
            <p className="text-xs sm:text-sm text-purple-100 italic">
              &ldquo;No nos elevamos al nivel de nuestras metas; caemos al nivel de nuestros sistemas y hábitos cotidianos.&rdquo;
            </p>
            <span className="text-[11px] text-amber-300 font-bold mt-1 block">— James Clear</span>
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

      {/* 1. LAS 4 LEYES */}
      {(activeSubTab === "all" || activeSubTab === "leyes") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Sistema de Hábitos Atómicos</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-400" />
              Las 4 Leyes del Cambio de Conducta
            </h3>
            <p className="text-purple-200/70 text-sm">
              Cómo construir hábitos que perduran y eliminar los que te restan energía.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fourLaws.map((law) => (
              <div
                key={law.num}
                className={`rounded-2xl bg-linear-to-br ${law.color} backdrop-blur-md border p-6 space-y-3 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      {law.num}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">{law.title}</h4>
                  <p className="text-xs sm:text-sm text-purple-100/85 leading-relaxed mb-3">{law.desc}</p>

                  <div className="space-y-1.5 pt-2 border-t border-white/15">
                    {law.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-purple-100/90">
                        <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 2. TÉCNICAS DE ENFOQUE */}
      {(activeSubTab === "all" || activeSubTab === "tecnicas") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Concentración & Flujo</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Timer className="w-6 h-6 text-emerald-400" />
              Técnicas de Productividad que Cuidan tu Mente
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techniques.map((tc) => (
              <div
                key={tc.name}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md space-y-2 hover:border-emerald-400/40 transition-colors"
              >
                <h4 className="font-bold text-white text-base sm:text-lg">{tc.name}</h4>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">{tc.desc}</p>
                <div className="pt-2 text-xs text-emerald-300 font-medium border-t border-white/5">
                  ✨ Beneficio: {tc.benefit}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 3. RUTINAS DE DÍA Y NOCHE */}
      {(activeSubTab === "all" || activeSubTab === "rutinas") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Rituales Cotidianos</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Sun className="w-6 h-6 text-amber-400" />
              Rutinas para Iniciar y Cerrar tu Día con Paz
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Morning */}
            <div className="rounded-2xl bg-amber-950/20 border border-amber-500/30 p-6 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2">
                <Sun className="w-6 h-6 text-amber-400" />
                <h4 className="font-bold text-white text-lg">☀️ Rutina de Mañana (Con Calma)</h4>
              </div>
              <div className="space-y-3">
                {routines.morning.map((m) => (
                  <div key={m.step} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {m.step}
                    </span>
                    <div>
                      <h5 className="font-bold text-white text-xs sm:text-sm">{m.title}</h5>
                      <p className="text-xs text-purple-200/70 leading-snug">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Night */}
            <div className="rounded-2xl bg-purple-950/20 border border-purple-500/30 p-6 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-2">
                <Moon className="w-6 h-6 text-purple-400" />
                <h4 className="font-bold text-white text-lg">🌙 Rutina de Noche (Desconexión)</h4>
              </div>
              <div className="space-y-3">
                {routines.night.map((n) => (
                  <div key={n.step} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {n.step}
                    </span>
                    <div>
                      <h5 className="font-bold text-white text-xs sm:text-sm">{n.title}</h5>
                      <p className="text-xs text-purple-200/70 leading-snug">{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* 4. CONTRA LA PROCRASTINACIÓN */}
      {(activeSubTab === "all" || activeSubTab === "procrastinacion") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Escudo Mental</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-rose-400" />
              Estrategias Amables contra la Procrastinación
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {antiProcrastination.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-rose-500/20 p-5 backdrop-blur-md space-y-1.5"
              >
                <h4 className="font-bold text-rose-200 text-sm sm:text-base">{item.title}</h4>
                <p className="text-xs sm:text-sm text-purple-200/75 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 5. TRACKER INTERACTIVO */}
      {(activeSubTab === "all" || activeSubTab === "tracker") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Seguimiento Diario</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <CheckSquare className="w-6 h-6 text-teal-400" />
              Tracker de Hábitos Atómicos de Sofi
            </h3>
            <p className="text-purple-200/70 text-sm">Toca para marcar tus logros cumplidos de hoy.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {dailyTracker.map((hb) => {
              const isChecked = !!completedHabits[hb.id];

              return (
                <button
                  key={hb.id}
                  onClick={() => toggleHabit(hb.id)}
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
                    <span className="text-[10px] uppercase font-bold text-purple-300/70 block mb-0.5">{hb.cat}</span>
                    <span
                      className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                        isChecked ? "text-emerald-200 line-through opacity-80" : "text-white"
                      }`}
                    >
                      {hb.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* 6. LIBROS RECOMENDADOS */}
      {(activeSubTab === "all" || activeSubTab === "libros") && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Biblioteca Esencial</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-400" />
              Lecturas Clave sobre Hábitos y Enfoque
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedBooks.map((bk) => (
              <div
                key={bk.title}
                className="rounded-2xl bg-white/5 border border-purple-500/20 p-5 backdrop-blur-md flex flex-col justify-between hover:border-amber-400/40 transition-colors"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {bk.tag}
                  </span>
                  <h4 className="font-bold text-white text-base mt-2 mb-0.5">{bk.title}</h4>
                  <span className="text-xs text-purple-300/80 font-medium block mb-2">{bk.author}</span>
                  <p className="text-xs text-purple-200/70 leading-relaxed">{bk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Footer Encouragement */}
      <div className="rounded-3xl bg-linear-to-r from-amber-950/40 via-purple-950/30 to-emerald-950/40 border border-amber-400/30 p-8 text-center backdrop-blur-xl space-y-3">
        <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 block">
          Pequeños pasos todos los días ✨
        </span>
        <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mx-auto leading-relaxed">
          No busques la perfección inmediata, Sofi; celebra cada pequeño paso y cada hábito completado. ¡Lo estás haciendo increíble! 💖
        </p>
      </div>
    </div>
  );
}
