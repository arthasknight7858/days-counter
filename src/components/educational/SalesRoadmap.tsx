"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Sparkles,
  Compass,
  Target,
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

export default function SalesRoadmap() {
  const [activeSubTab, setActiveSubTab] = useState<string>("all");
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_sales_checklist");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({ "sl-f1": true, "sl-f2": true });

  const toggleChecklist = (id: string) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("sofi_sales_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const togglePhase = (id: string) => {
    setOpenPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const subTabs = [
    { id: "all", label: "🌟 Todo el Contenido", icon: Sparkles },
    { id: "fases", label: "🗺️ 5 Fases de Ventas", icon: Compass },
    { id: "proceso", label: "🎯 El Proceso (SPIN/ACURA)", icon: Target },
    { id: "trucos", label: "⚡ 15 Hacks & Tácticas", icon: Zap },
    { id: "youtube", label: "▶️ Canales YouTube", icon: YouTubeIcon },
    { id: "libros", label: "📚 Biblioteca de Ventas", icon: BookOpen },
    { id: "plan", label: "🎯 Checklist Semanal", icon: CheckCircle2 },
  ];

  const phases = [
    {
      id: "sl-f1",
      num: "Fase 01",
      duration: "⏱ 0–2 meses",
      title: "Fundamentos & Psicología del Comprador",
      color: "from-indigo-500/20 to-purple-500/10 border-indigo-500/40 text-indigo-300",
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      desc: "Comprender que la gente compra por emoción y justifica con lógica. Tipos de venta (B2B, B2C, Inbound/Outbound), los 6 principios de Cialdini y definición de tu Perfil de Cliente Ideal (ICP).",
      topics: [
        "Vender es transferir certeza y ayudar a resolver un dolor real, no manipular",
        "Diferencias estratégicas entre B2C (emocional, rápido) y B2B (racional, comités)",
        "Motivadores universales: ganar tiempo, ahorrar dinero, evitar esfuerzo o ganar estatus",
        "Los 6 Principios de Cialdini: Reciprocidad, Compromiso, Prueba Social, Autoridad, Simpatía y Escasez",
        "Fórmula FAB: Característica → Función → Beneficio tangible → Resultado emocional",
        "Definición de ICP (Ideal Customer Profile) y Buyer Persona con dolores específicos",
      ],
    },
    {
      id: "sl-f2",
      num: "Fase 02",
      duration: "⏱ 2–5 meses",
      title: "El Proceso de Venta Completo (De Prospección a Cierre)",
      color: "from-orange-500/20 to-red-500/10 border-orange-500/40 text-orange-300",
      badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      desc: "Prospección multicanal, llamadas en frío, emails efectivos, metodología SPIN Selling, manejo de objeciones ACURA, técnicas de cierre y cadencias de follow-up.",
      topics: [
        "Prospección sistemática: Cold outreach, Inbound, referidos y social selling diario",
        "Estructura del Cold Email de 5 líneas: Asunto curioso + Personalización + Valor + CTA fácil",
        "Llamada en frío de 30s: Permiso + Motivo concreto + Pregunta de descubrimiento",
        "Metodología SPIN Selling: Situación → Problema → Implicación → Necesidad/Beneficio",
        "Manejo de objeciones con ACURA: Acknowledge → Clarify → Understand → Respond → Ask",
        "Técnicas de Cierre: Asuntivo, Alternativo, Resumen y Urgencia legítima",
        "Follow-up implacable: El 80% de las ventas cierran tras el 5to contacto",
      ],
    },
    {
      id: "sl-f3",
      num: "Fase 03",
      duration: "⏱ 4–8 meses",
      title: "Persuasión, Ofertas Irresistibles & Copywriting",
      color: "from-teal-500/20 to-emerald-500/10 border-teal-500/40 text-teal-300",
      badge: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      desc: "Storytelling de clientes reales, escucha activa (70% cliente / 30% vendedor), ofertas $100M Offers de Hormozi, negociación de precio y fórmulas de copy (AIDA, PAS).",
      topics: [
        "Estructura de la historia de ventas: Personaje → Problema → Fracaso previo → Solución → Resultado medible",
        "Escucha Activa: Regla 70/30, espejeo (mirroring) y pausas de 4 segundos",
        "Ofertas irresistibles ($100M Offers): Valor percibido = (Resultado soñado × Certeza) / (Tiempo × Esfuerzo)",
        "Negociación de precio: Nunca justificar el costo, anclar el valor y preguntar '¿caro respecto a qué?'",
        "Copywriting para ventas: Fórmulas AIDA (Atención, Interés, Deseo, Acción) y PAS (Problema, Agitar, Solución)",
      ],
    },
    {
      id: "sl-f4",
      num: "Fase 04",
      duration: "⏱ 6–12 meses",
      title: "Sistemas, CRM, Escalado & Automatización",
      color: "from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-300",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      desc: "Implementación de HubSpot CRM, métricas clave (CAC, LTV, conversión de pipeline), videos Loom de 60s, Upsell/Cross-sell y creación de playbooks.",
      topics: [
        "Configuración de CRM (HubSpot/Notion): Etapas de pipeline, recordatorios y notas detalladas",
        "Métricas esenciales: Tasa de conversión, ticket promedio, ciclo de venta, CAC y LTV",
        "Social Selling en LinkedIn e Instagram: Contenido que atrae compradores sin hacer spam",
        "Tech Stack moderno: Apollo.io + HubSpot + Calendly + Loom (video prospección)",
        "Estrategias de Retención, Upsell y Cross-sell para multiplicar el valor de clientes existentes",
        "Construcción del equipo comercial: Roles de SDR (prospección) y AE (cierre de cuentas)",
      ],
    },
    {
      id: "sl-f5",
      num: "Fase 05",
      duration: "⏱ 12+ meses",
      title: "Maestría en Ventas: Challenger Sale & Enterprise",
      color: "from-pink-500/20 to-rose-500/10 border-pink-500/40 text-pink-300",
      badge: "bg-pink-500/20 text-pink-300 border-pink-500/30",
      desc: "Metodologías avanzadas (The Challenger Sale, Gap Selling, MEDDIC), inteligencia emocional bajo presión, account management y marca personal.",
      topics: [
        "The Challenger Sale: Enseñar insights nuevos, adaptar el mensaje y tomar el control del deal",
        "Metodología MEDDIC para grandes empresas: Métricas, Comprador Económico, Criterios de Decisión",
        "Sandler Selling System: Técnica del 'no pain, no deal' y descalificación temprana",
        "Inteligencia Emocional: Manejo de la frustración tras perder un deal y resiliencia ante el rechazo",
        "Marca personal de autoridad: Convertirse en el referente del sector para recibir prospectos inbound",
      ],
    },
  ];

  const tactics = [
    { num: "01", title: "El Silencio Vendedor tras el Precio", desc: "Tras decir el precio, guarda silencio absoluto. Quien habla primero después del precio por incomodidad termina haciéndose descuentos a sí mismo." },
    { num: "02", title: "La Pregunta del '¿Qué más?'", desc: "Cuando el cliente termine de explicar su problema, pregunta: '¿Qué más te preocupa sobre eso?'. Revelarás el dolor emocional real que no dijo al inicio." },
    { num: "03", title: "Video Loom Personalizado de 60s", desc: "Graba un video corto mostrando el perfil o web del cliente. Genera una tasa de respuesta 3x a 5x mayor que cualquier email de texto frío." },
    { num: "04", title: "Ancla Alto, Ofrece Menos", desc: "Muestra primero la versión más completa y de mayor inversión. Si luego ofreces la opción estándar, parecerá una ganga indiscutible." },
    { num: "05", title: "El Email de Ruptura (Break-up)", desc: "Si un prospecto no responde tras 5 intentos: 'Entiendo que esto no es prioridad ahora. ¿Prefieres que cierre tu expediente?'. La tasa de respuesta se dispara por aversión a la pérdida." },
    { num: "06", title: "El '¿Qué te impediría empezar?'", desc: "Antes del cierre final: 'Si todo lo que vimos tiene sentido, ¿qué te impediría arrancar esta semana?'. Saca a la luz la objeción oculta a tiempo." },
    { num: "07", title: "Regla de las 24 Horas", desc: "Envía siempre un resumen por escrito de los acuerdos tomados en menos de 24 horas tras la reunión para mantener el impulso." },
    { num: "08", title: "Haz que el Cliente Diga el Número", desc: "En vez de decir 'ahorrarás $10 millones', pregunta: '¿Cuánto dinero pierde tu empresa cada mes con este fallo?'. Cuando ellos dicen la cifra, la venta está hecha." },
  ];

  const books = [
    { title: "Cómo Ganar Amigos e Influir en las Personas", author: "Dale Carnegie", badge: "Fundacional", desc: "La base de toda relación comercial: hacer que las personas se sientan valoradas y escuchadas." },
    { title: "Influence: The Psychology of Persuasion", author: "Robert Cialdini", badge: "Psicología", desc: "Los 6 principios universales que mueven a las personas a decir que sí." },
    { title: "SPIN Selling", author: "Neil Rackham", badge: "Metodología", desc: "Basado en 35,000 llamadas reales. El sistema de preguntas más efectivo para ventas de alto valor." },
    { title: "$100M Offers", author: "Alex Hormozi", badge: "Oferta", desc: "Cómo crear una propuesta tan atractiva que los clientes se sientan estúpidos diciendo que no." },
    { title: "The Challenger Sale", author: "Matthew Dixon", badge: "B2B Pro", desc: "Los vendedores que enseñan y toman el control superan a los que solo buscan caer bien." },
    { title: "Never Split the Difference", author: "Chris Voss", badge: "Negociación", desc: "Negociación del FBI aplicada a acuerdos comerciales y precios." },
  ];

  const checklistItems = [
    { id: "sl_icp", label: "Definir por escrito tu Perfil de Cliente Ideal (ICP) y dolores principales", stage: "Fase 1" },
    { id: "sl_cold_script", label: "Redactar tu secuencia de Cold Email de 5 líneas con propuesta de valor", stage: "Fase 2" },
    { id: "sl_spin_questions", label: "Crear tu banco de preguntas SPIN (Situación, Problema, Implicación, Necesidad)", stage: "Fase 2" },
    { id: "sl_acura_objections", label: "Preparar respuestas para las 4 objeciones clásicas (Caro, Tiempo, Pensar, Confianza)", stage: "Fase 2" },
    { id: "sl_crm_setup", label: "Configurar un CRM (HubSpot/Notion) y registrar prospectos diariamente", stage: "Fase 4" },
    { id: "sl_loom_videos", label: "Enviar 5 videos Loom personalizados de prospección comercial", stage: "Fase 4" },
    { id: "sl_closing_practice", label: "Pedir el cierre directamente en 3 reuniones usando la técnica asuntiva", stage: "Fase 3" },
  ];

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-950/40 via-orange-950/30 to-black/60 backdrop-blur-xl border border-orange-500/30 p-6 sm:p-10 shadow-[0_0_40px_rgba(255,107,53,0.15)]"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-400/30 text-orange-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
            Ventas Profesionales · De Cero a Closer de Élite
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Aprende a </span>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-orange-300 via-amber-300 to-indigo-300">
              Vender &amp; Cerrar Acuerdos
            </span>
          </h2>

          <p className="text-purple-200/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            La habilidad #1 de los negocios: psicología del comprador, prospección multicanal, SPIN Selling, ofertas irresistibles de Hormozi y manejo de objeciones.
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-xl p-4 rounded-2xl bg-white/5 border border-orange-500/20 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-orange-300 block">5</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Fases</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 block">SPIN</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Método</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-300 block">$100M</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Ofertas</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-teal-300 block">15+</span>
              <span className="text-[10px] sm:text-xs text-purple-200/70 uppercase tracking-wider font-medium">Hacks</span>
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
                  ? "bg-orange-500/90 text-black border-orange-300 shadow-[0_0_15px_rgba(255,107,53,0.4)] scale-102 font-bold"
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
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Ruta Progresiva</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-orange-400" />
              Las 5 Fases de la Maestría en Ventas
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
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5" />
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

      {/* 2. TÁCTICAS & HACKS */}
      {(activeSubTab === "all" || activeSubTab === "trucos") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Armas de Alto Rendimiento</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-400" />
              Tácticas Probadas en Negociaciones Reales
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tactics.map((t, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-amber-950/15 border border-amber-500/20 space-y-1.5">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">Táctica {t.num}</span>
                <h4 className="font-bold text-white text-sm sm:text-base">{t.title}</h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 3. LIBROS */}
      {(activeSubTab === "all" || activeSubTab === "libros") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Biblioteca Imprescindible</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-orange-400" />
              Los 6 Mejores Libros de Ventas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((b, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">
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

      {/* 4. CHECKLIST */}
      {(activeSubTab === "all" || activeSubTab === "plan") && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Acción Práctica</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-orange-400" />
              Checklist de Cierre Comercial
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
                      ? "bg-orange-950/30 border-orange-500/40 shadow-[0_0_15px_rgba(255,107,53,0.2)]"
                      : "bg-white/5 border-purple-500/20 hover:bg-white/8 hover:border-purple-400/40"
                  }`}
                >
                  <div className="mt-0.5">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-orange-400" />
                    ) : (
                      <Square className="w-5 h-5 text-purple-400/50" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-orange-300/80 block mb-0.5">
                      {item.stage}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                        isChecked ? "text-orange-200 line-through opacity-80" : "text-white"
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
