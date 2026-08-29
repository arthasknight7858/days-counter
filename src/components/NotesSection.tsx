"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, StickyNote, Sparkles, Heart, Pin, Calendar } from "lucide-react";

export interface NoteItem {
  id: string;
  title: string;
  date: string;
  badge?: string;
  content: React.ReactNode;
}

export default function NotesSection() {
  const notes: NoteItem[] = [
    {
      id: "nota-1",
      title: "Consejos & Rutas para tu Aprendizaje",
      date: "22 de Agosto de 2026",
      badge: "🌟 Consejo de Axel",
      content: (
        <div className="space-y-4 text-purple-100/90 leading-relaxed font-sans text-base sm:text-lg">
          <p>
            Mi amor, todas las rutas y recursos que están aquí son para ti. Si quieres aprender más cosas o quieres cambios, no dudes en decirme. Mi recomendación es que aprendas inglés y a la par arquitectura dividiéndote el tiempo, y también hagas un poco de ejercicio, a diario si puedes o 3 veces a la semana.
          </p>
          <p>
            Quiero que no te rindas y le des la oportunidad a todo lo que quieres hacer y lograr mi amor. Cuentas con mi apoyo siempre y te ayudaré en todo lo que te propongas. Aprende el inglés poco a poco; el canal de <span className="text-amber-300 font-semibold">Inglés con el Güero</span> me pareció bastante bueno para ir iniciando, y cuando ya te vayas acostumbrando al idioma puedes recurrir a mí para practicar escribir y si quieres practicar hablar en inglés conmigo lo puedes hacer y yo te ayudaré.
          </p>
          <p>
            Si quieres aún más ayuda usa <span className="text-purple-300 font-semibold">ChatGPT</span> y <span className="text-purple-300 font-semibold">Claude</span> para buscar y aprender la información. Los módulos de estudio que te di tienen los temarios, así que ve por cada uno en orden: estúdialo, entiéndelo y continúa con el siguiente. La mejor opción es ver videos de YouTube y tomar apuntes en lo posible, y para la información ayudarte en la IA.
          </p>
          <p>
            Para los idiomas usa la app que te pasé de <span className="text-emerald-300 font-semibold">Duolingo</span>, puede serte útil para ir acostumbrándote también.
          </p>
          <p>
            Para hacer ejercicio te recomiendo los videos de YouTube, son bastante útiles y ahí te dejé algunos populares. Las recomendaciones están enfocadas a ti y a lo que me dijiste: son buenos los <span className="text-pink-300 font-semibold">videos de cardio en un rango de 20 o 30 minutos</span> (está más que bien), y <span className="text-pink-300 font-semibold">abdominales de 10 a 20 minutos</span> también están super bien. Si quieres más consejos me tienes a mí o a la IA para preguntar.
          </p>
          <p>
            Si necesitas ayuda o tienes preguntas puedes decirme también. Recuerda que siempre estaré ahí para ti y escucharte, y te ayudaré en todo lo que necesites y te propongas mi amor.
          </p>
          <div className="pt-6 text-right font-bold text-amber-300 font-serif text-lg sm:text-xl not-italic flex items-center justify-end gap-2">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-heartbeat" />
            <span>— Con amor: tu novio Axel :3</span>
          </div>
        </div>
      ),
    },
    // Para agregar más notas en el futuro:
    // Copia el bloque de arriba y pégalo aquí abajo cambiando id: "nota-2", título, fecha y contenido.
  ];

  const [openNoteId, setOpenNoteId] = useState<string | null>(
    notes.length > 0 ? notes[notes.length - 1].id : null
  );

  const toggleNote = (id: string) => {
    setOpenNoteId(openNoteId === id ? null : id);
  };

  return (
    <section className="w-full max-w-4xl mx-auto mt-6 sm:mt-10 px-4 pb-20 z-10" suppressHydrationWarning>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 sm:mb-10 text-left"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <StickyNote className="w-4 h-4 text-amber-400" />
          Tablón de Notas & Consejos
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold mb-3 flex flex-wrap items-baseline gap-3">
          <span className="text-white">Notas</span>
          <span className="text-amber-400 italic font-serif tracking-wide">para ti</span>
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300 animate-pulse ml-1" />
        </h2>
        <p className="text-purple-200/70 text-base sm:text-lg tracking-wide">
          Pequeños recordatorios, consejos y palabras de apoyo para tu día a día y tus metas
        </p>
      </motion.div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note, idx) => {
          const isOpen = openNoteId === note.id;

          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              suppressHydrationWarning
              className="border border-amber-500/20 bg-slate-900/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(245,158,11,0.08)] transition-all hover:border-amber-500/40"
            >
              <button
                onClick={() => toggleNote(note.id)}
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 text-left transition-colors gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl transition-colors ${isOpen ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-white/5 text-amber-400/80 border border-white/10'}`}>
                    <Pin className="w-6 h-6 animate-heartbeat" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                        {note.title}
                      </h3>
                      {note.badge && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {note.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-amber-200/70 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400/70" />
                      {note.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center self-end sm:self-auto gap-3 text-amber-300">
                  <span className="text-xs sm:text-sm font-medium opacity-80 sm:hidden">
                    {isOpen ? "Cerrar" : "Leer nota"}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-amber-400" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    suppressHydrationWarning
                  >
                    <div className="p-3 sm:p-6 pt-2 border-t border-amber-500/10 mx-2 sm:mx-6" suppressHydrationWarning>
                      <div className="bg-amber-950/20 border border-amber-500/20 rounded-2xl p-5 sm:p-8 relative shadow-inner" suppressHydrationWarning>
                        {/* Decorative quotes */}
                        <div className="absolute top-3 left-4 text-4xl text-amber-500/20 font-serif">&quot;</div>
                        <div className="absolute bottom-3 right-4 text-4xl text-amber-500/20 font-serif">&quot;</div>

                        <div className="relative z-10" suppressHydrationWarning>
                          {note.content}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
