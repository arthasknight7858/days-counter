"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  Video,
  ExternalLink,
  Calendar,
  ChevronDown,
  Play,
  BookmarkCheck,
} from "lucide-react";

export interface KeepInMindItem {
  id: string;
  title: string;
  date: string;
  badge?: string;
  message: string;
  youtubeUrl?: string;
  authorSignature?: string;
}

export default function KeepInMindSection() {
  // Lista de cosas a tener en cuenta. Para agregar más elementos en el futuro,
  // simplemente añade un nuevo objeto al arreglo 'items' siguiendo la plantilla.
  const items: KeepInMindItem[] = [
    {
      id: "item-1",
      title: "Amor quiero que veas este video, Te Amo Mucho 💕",
      date: "28 de Agosto de 2026",
      badge: "🎬 Video Especial",
      message:
        "Mi amor hermosa, quiero que te tomes un momento para ver este video con calma. Te lo comparto de todo corazón porque pienso en ti en cada instante. ¡Te Amo Mucho!",
      youtubeUrl: "https://youtu.be/_pNAy7xRSN4?si=yC14_IM_k6SdY73H",
      authorSignature: "— Con todo mi amor: tu novio Axel ❤️",
    },
    // =========================================================================
    // PLANTILLA PARA AGREGAR MÁS EN EL FUTURO:
    // Copia el siguiente bloque, descoméntalo y pégalo aquí abajo:
    // {
    //   id: "item-2",
    //   title: "Título de la nueva recomendación o video",
    //   date: "Fecha",
    //   badge: "💡 Recomendación",
    //   message: "Mensaje o explicación de lo que quieres que tenga en cuenta...",
    //   youtubeUrl: "https://www.youtube.com/watch?v=...",
    //   authorSignature: "— Axel :3",
    // },
    // =========================================================================
  ];

  const [openItemId, setOpenItemId] = useState<string | null>(items.length > 0 ? items[0].id : null);

  const toggleItem = (id: string) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  // Helper para extraer el ID de YouTube
  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    try {
      if (url.includes("youtu.be/")) {
        const id = url.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube-nocookie.com/embed/${id}`;
      }
      if (url.includes("watch?v=")) {
        const id = url.split("watch?v=")[1]?.split("&")[0];
        return `https://www.youtube-nocookie.com/embed/${id}`;
      }
      if (url.includes("embed/")) {
        return url;
      }
    } catch {}
    return null;
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <BookmarkCheck className="w-4 h-4 text-fuchsia-400" />
          Rincón de Recomendaciones
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold mb-3 flex flex-wrap items-baseline gap-3">
          <span className="text-white">A tener</span>
          <span className="text-fuchsia-400 italic font-serif tracking-wide">en cuenta</span>
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-fuchsia-300 animate-pulse ml-1" />
        </h2>
        <p className="text-purple-200/70 text-base sm:text-lg tracking-wide">
          Videos, reflexiones y recordatorios especiales guardados con amor para que los veas a tu ritmo
        </p>
      </motion.div>

      {/* Items List */}
      <div className="space-y-5">
        {items.map((item, idx) => {
          const isOpen = openItemId === item.id;
          const embedUrl = getYouTubeEmbedUrl(item.youtubeUrl);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              suppressHydrationWarning
              className="border border-fuchsia-500/25 bg-slate-900/70 backdrop-blur-md rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_25px_rgba(217,70,239,0.1)] transition-all hover:border-fuchsia-500/50"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-7 text-left transition-colors gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3.5 rounded-2xl transition-all ${
                      isOpen
                        ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 shadow-[0_0_15px_rgba(217,70,239,0.3)]"
                        : "bg-white/5 text-fuchsia-400/80 border border-white/10"
                    }`}
                  >
                    <Video className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                        {item.title}
                      </h3>
                      {item.badge && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-fuchsia-200/70 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-fuchsia-400/70" />
                      {item.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center self-end sm:self-auto gap-3 text-fuchsia-300">
                  <span className="text-xs sm:text-sm font-medium opacity-80 sm:hidden">
                    {isOpen ? "Cerrar" : "Ver contenido"}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-fuchsia-400" />
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
                    <div className="p-4 sm:p-7 pt-2 border-t border-fuchsia-500/15 mx-2 sm:mx-6 space-y-6">
                      {/* Personal Message Card */}
                      <div className="bg-fuchsia-950/25 border border-fuchsia-500/20 rounded-2xl p-5 sm:p-7 relative shadow-inner space-y-3">
                        <p className="text-purple-100/90 text-base sm:text-lg leading-relaxed">
                          {item.message}
                        </p>

                        {item.authorSignature && (
                          <div className="pt-3 text-right font-bold text-fuchsia-300 font-serif text-base sm:text-lg flex items-center justify-end gap-2">
                            <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-heartbeat" />
                            <span>{item.authorSignature}</span>
                          </div>
                        )}
                      </div>

                      {/* YouTube Video Player */}
                      {embedUrl && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-300 flex items-center gap-1.5">
                              <Play className="w-3.5 h-3.5 text-fuchsia-400 fill-fuchsia-400" />
                              Reproductor de Video
                            </span>
                            {item.youtubeUrl && (
                              <a
                                href={item.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-purple-300/80 hover:text-fuchsia-300 flex items-center gap-1 transition-colors"
                              >
                                <span>Abrir en YouTube</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>

                          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-fuchsia-500/30 bg-black/60 shadow-[0_0_30px_rgba(217,70,239,0.15)]">
                            <iframe
                              src={embedUrl}
                              title={item.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full border-0"
                            />
                          </div>
                        </div>
                      )}
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
