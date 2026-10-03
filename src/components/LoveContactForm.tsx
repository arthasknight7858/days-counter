"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Heart, CheckCircle2, AlertCircle, Sparkles, MessageSquareHeart } from "lucide-react";

interface LoveContactFormProps {
  onNoteCreated?: () => void;
}

export default function LoveContactForm({ onNoteCreated }: LoveContactFormProps) {
  const [author, setAuthor] = useState<"Axel" | "Sofí">("Axel");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<"amor" | "metas" | "recuerdos" | "recordatorios" | "citas">("amor");
  const [honey, setHoney] = useState(""); // Honeypot anti-bot
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Validación de longitud
  const MAX_MESSAGE_LENGTH = 1000;
  const remainingChars = MAX_MESSAGE_LENGTH - message.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Validación de campos requeridos
    if (!message.trim()) {
      setErrorMsg("Por favor escribe tu mensajito de amor antes de enviarlo.");
      return;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      setErrorMsg(`El mensaje no puede superar los ${MAX_MESSAGE_LENGTH} caracteres.`);
      return;
    }

    // 2. Honeypot check (si se llenó el campo oculto, es un bot)
    if (honey.trim() !== "") {
      // Fingir éxito para no alertar al bot
      setShowThankYouModal(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const defaultTitle = title.trim() || `Mensajito de ${author} 💌`;
      const dateString = new Date().toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const notePayload = {
        id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        title: defaultTitle,
        content: message.trim(),
        date: dateString,
        color: author === "Axel" ? "indigo" : "pink",
        category,
        emoji: author === "Axel" ? "💙" : "💖",
        isPinned: false,
        isAxelSpecial: author === "Axel",
        createdAt: Date.now(),
        reactions: 1,
      };

      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          note: notePayload,
          _honey: honey, // Campo honeypot
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "No se pudo entregar el mensaje");
      }

      // Éxito: abrir pantalla de agradecimientos
      setShowThankYouModal(true);
      setTitle("");
      setMessage("");
      if (onNoteCreated) onNoteCreated();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Error al enviar el mensaje");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/5 border border-purple-500/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-inner">
              <MessageSquareHeart className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Buzón de Mensajes & Dedicatorias
                <Sparkles className="w-4 h-4 text-purple-400 inline" />
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/70">
                Envía una dedicatoria que se guardará directamente en nuestro tablón de recuerdos.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Campo trampa Honeypot (invisible para humanos, detectable para bots) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_url_honey">No llenar si eres humano</label>
              <input
                id="website_url_honey"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honey}
                onChange={(e) => setHoney(e.target.value)}
              />
            </div>

            {/* Selector de autor */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300/80">
                ¿Quién escribe?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAuthor("Axel")}
                  className={`py-2.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    author === "Axel"
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
                      : "bg-white/5 text-purple-200/70 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span>👦</span>
                  <span>Axel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthor("Sofí")}
                  className={`py-2.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    author === "Sofí"
                      ? "bg-pink-600 text-white shadow-lg shadow-pink-600/30 border border-pink-400/40"
                      : "bg-white/5 text-purple-200/70 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span>👑</span>
                  <span>Sofía</span>
                </button>
              </div>
            </div>

            {/* Categoría */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300/80">
                Tipo de Mensaje
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "amor", label: "💖 Amor" },
                  { id: "recuerdos", label: "🌟 Recuerdo" },
                  { id: "metas", label: "🎯 Meta Juntos" },
                  { id: "citas", label: "☕ Cita" },
                  { id: "recordatorios", label: "💌 Dulce Nota" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id as typeof category)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      category === cat.id
                        ? "bg-purple-500/30 border border-purple-400 text-white shadow-xs"
                        : "bg-white/5 border border-purple-500/20 text-purple-200/70 hover:bg-white/10"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Título opcional */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="msg-title" className="text-xs font-semibold uppercase tracking-wider text-purple-300/80">
                Título del Mensaje (Opcional)
              </label>
              <input
                id="msg-title"
                type="text"
                maxLength={80}
                placeholder="Ej. Eres lo mejor de mis días..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-purple-500/20 focus:border-purple-400 focus:bg-white/10 outline-none text-white text-sm transition-all placeholder:text-purple-300/30"
              />
            </div>

            {/* Mensaje */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="msg-content" className="text-xs font-semibold uppercase tracking-wider text-purple-300/80">
                  Tu Mensaje *
                </label>
                <span
                  className={`text-[11px] ${
                    remainingChars < 50 ? "text-amber-400" : "text-purple-300/50"
                  }`}
                >
                  {remainingChars} caracteres restantes
                </span>
              </div>
              <textarea
                id="msg-content"
                required
                rows={4}
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder="Escribe aquí tus sentimientos, un recordatorio lindo o una promesa..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border focus:bg-white/10 outline-none text-white text-sm transition-all placeholder:text-purple-300/30 resize-none ${
                  errorMsg
                    ? "border-rose-500/60 focus:border-rose-400"
                    : "border-purple-500/20 focus:border-purple-400"
                }`}
              />
            </div>

            {/* Feedback de error accesible */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botón de Enviar con microinteracciones */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Guardando recuerdo...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensajito de Amor</span>
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>

      {/* MODAL / PÁGINA DE AGRADECIMIENTOS (Principio 4: Página de agradecimientos) */}
      <AnimatePresence>
        {showThankYouModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowThankYouModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#0d0926] border border-purple-500/30 rounded-3xl p-8 text-center shadow-2xl flex flex-col items-center gap-5 overflow-hidden"
            >
              {/* Glow circular */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-0.5 flex items-center justify-center shadow-lg shadow-pink-500/30">
                <div className="w-full h-full rounded-full bg-[#0d0926] flex items-center justify-center text-pink-400">
                  <Heart className="w-10 h-10 fill-pink-500 text-pink-400 animate-heartbeat" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-purple-300 font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ¡Mensaje Entregado con Éxito!
                </span>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-300">
                  ¡Gracias por este momento!
                </h3>
                <p className="text-sm text-purple-200/80 leading-relaxed">
                  Tu dedicatoria ha sido guardada en nuestro tablón y permanecerá como testigo de nuestro amor infinito.
                </p>
              </div>

              <div className="w-full p-4 rounded-2xl bg-white/5 border border-purple-500/20 text-xs text-purple-300/80 italic">
                &ldquo;Cada palabra que nos dedicamos construye el futuro que soñamos juntos.&rdquo;
              </div>

              <button
                type="button"
                onClick={() => setShowThankYouModal(false)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium text-sm transition-all transform hover:scale-[1.02] shadow-lg cursor-pointer"
              >
                Volver y Seguir Navegando ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
