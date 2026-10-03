"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Star,
  Heart,
  Clock,
  Share2,
  Check,
  Sparkles,
  Users,
  Compass,
} from "lucide-react";

export default function FaqAndReviewsSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const faqs = [
    {
      q: "¿Cómo funciona el reproductor de música y los atajos de teclado?",
      a: "El reproductor cuenta con 39 canciones seleccionadas especialmente para nosotros. Puedes controlarlo con la barra espaciadora (Play/Pausa), la tecla 'M' para silenciar, y Shift + flecha derecha/izquierda para cambiar de canción. Además, mientras navegas por otras secciones, el mini reproductor flotante seguirá acompañándote.",
    },
    {
      q: "¿Cómo se guardan las notas, fotos y audios que subimos?",
      a: "Todas las notas, fotos de los álbumes y mensajes se sincronizan automáticamente en Supabase y cuentan con un respaldo local. Además, puedes descargar una copia de seguridad en JSON desde el tablón de notas en cualquier momento.",
    },
    {
      q: "¿Cómo puedo agregar fotos a mis favoritas?",
      a: "Al navegar por cualquiera de los 8 álbumes de fotos, puedes hacer doble clic en cualquier fotografía en el visor grande, o tocar el botón con la estrella/corazón para guardarla instantáneamente en tu galería de favoritas de Axel o Sofí.",
    },
    {
      q: "¿Qué secciones educativas y de bienestar incluye la web?",
      a: "Contamos con más de 18 módulos educativos estructurados (Inglés, Francés, Coreano, Arquitectura, ICFES, Ciberseguridad, Finanzas, etc.) y un centro de bienestar con rutinas de ejercicio, tracker diario de hábitos y temporizador HIIT.",
    },
    {
      q: "¿Cuál es el tiempo de respuesta y soporte de este espacio?",
      a: "¡Tiempo de respuesta garantizado: Inmediato con amor infinito! Cualquier nueva idea, canción o módulo que queramos añadir se actualiza con dedicación y cariño mutuo.",
    },
  ];

  const loveReviews = [
    {
      author: "Axel",
      role: "Para mi niña hermosa",
      avatar: "👦",
      rating: 5,
      date: "Octubre 2026",
      quote:
        "Cada línea de código y cada detalle de este rincón fue hecho pensando en tu sonrisa. Eres mi mayor inspiración y mi lugar seguro. ¡Te amo con toda mi alma!",
    },
    {
      author: "Sofía",
      role: "Para mi amor",
      avatar: "👑",
      rating: 5,
      date: "Octubre 2026",
      quote:
        "Tener un lugar tan lindo donde recordar cada momento, nuestras fotos, canciones y metas juntos me llena el corazón. ¡Eres el mejor novio del mundo!",
    },
  ];

  const milestones = [
    {
      date: "8 de Julio de 2026",
      title: "El Inicio de Nuestra Historia",
      desc: "El día oficial en que decidimos caminar juntos y construir este amor incondicional.",
    },
    {
      date: "Cada 8 del Mes",
      title: "Celebración de Mesario",
      desc: "Una fecha especial para celebrar los meses compartidos, renovar promesas y sumar recuerdos.",
    },
    {
      date: "Metas a Futuro",
      title: "Crecer, Viajar y Cumplir Sueños",
      desc: "Graduaciones, estudios, proyectos, viajes juntos y una vida llena de complicidad.",
    },
  ];

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://axelysofi.com";
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Axel & Sofía ✨ Nuestra Historia",
          text: "¡Mira nuestro espacio especial de recuerdos y amor!",
          url,
        });
        return;
      } catch {
        // Fallback al portapapeles
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      // Ignorar
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto my-16 px-4 space-y-16">
      {/* 1. SECCIÓN DE CASOS DE ESTUDIO / HITOS DE NUESTRA HISTORIA */}
      <div>
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold flex items-center justify-center gap-1.5 mb-2">
            <Compass className="w-4 h-4" />
            Nuestra Trayectoria
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-300">
            Hitos & Momentos Inolvidables
          </h2>
          <p className="text-sm text-purple-200/70 mt-2 max-w-xl mx-auto">
            Los pasos firmes que hemos dado y los sueños que construimos día a día.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.3)" }}
              className="p-6 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-400/30 mb-3">
                  {m.date}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">
                  {m.desc}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-purple-300/60">
                <span>Capítulo #{idx + 1}</span>
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. PRESENTACIÓN DE EQUIPO (Axel & Sofía) & BADGE TIEMPO DE RESPUESTA */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-pink-950/40 border border-purple-500/20 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 p-0.5 flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-2xl bg-[#0a071e] flex items-center justify-center text-2xl">
                👫
              </div>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                El Equipo Detrás del Proyecto
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Axel & Sofía</h3>
              <p className="text-xs sm:text-sm text-purple-200/80">
                Creadores, cómplices y soñadores de esta aventura.
              </p>
            </div>
          </div>

          {/* Badge compromiso de tiempo de respuesta */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Tiempo de respuesta: ¡Siempre presente con amor!</span>
            </div>

            {/* Botón de Compartir en RRSS */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 text-purple-200 text-xs font-medium transition-all cursor-pointer transform hover:scale-105 active:scale-95"
              title="Compartir enlace"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>¡Enlace Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Compartir</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. RESEÑAS REALES / TESTIMONIOS DE AMOR */}
      <div>
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold flex items-center justify-center gap-1 mb-1">
            <Heart className="w-3.5 h-3.5 fill-pink-400" />
            Nuestras Reseñas de Amor
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Lo que sentimos en el corazón
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loveReviews.map((rev) => (
            <motion.div
              key={rev.author}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{rev.avatar}</span>
                    <div>
                      <h4 className="font-bold text-white text-base leading-tight">
                        {rev.author}
                      </h4>
                      <p className="text-xs text-purple-300/70">{rev.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-purple-100/90 italic leading-relaxed pt-2">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-purple-300/40">
                <span>{rev.date}</span>
                <span>Calificación: 10/10 Amor Infinito</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. PREGUNTAS FRECUENTES (FAQs) */}
      <div>
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold flex items-center justify-center gap-1.5 mb-2">
            <HelpCircle className="w-4 h-4" />
            Preguntas Frecuentes
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-300">
            Todo lo que necesitas saber
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-purple-500/20 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-medium text-white hover:text-purple-300 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-purple-200/80 leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
