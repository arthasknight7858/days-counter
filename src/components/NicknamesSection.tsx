"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Heart,
  Plus,
  Trash2,
  Sparkles,
  Smile,
  Send,
  Mic,
  Play,
  Pause,
  X,
  Loader2,
  GripVertical,
} from "lucide-react";
import { Nickname } from "@/types/nicknames";
import AudioRecorder from "@/components/AudioRecorder";
import { uploadMediaFile } from "@/lib/notesStorage";

const STORAGE_KEY = "sofi_axel_nicknames_cache_v3";

const capitalizeFirst = (str: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

export default function NicknamesSection() {
  const [nicknames, setNicknames] = useState<Nickname[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // ignore cache error
      }
    }
    return [];
  });

  // Form states
  const [axelText, setAxelText] = useState("");
  const [axelMeaning, setAxelMeaning] = useState("");
  const [sofiText, setSofiText] = useState("");
  const [sofiMeaning, setSofiMeaning] = useState("");

  // Audio recording states
  const [axelAudioUrl, setAxelAudioUrl] = useState<string | null>(null);
  const [sofiAudioUrl, setSofiAudioUrl] = useState<string | null>(null);
  const [isRecordingAxel, setIsRecordingAxel] = useState(false);
  const [isRecordingSofi, setIsRecordingSofi] = useState(false);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);

  // Playback state
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const [playingNickId, setPlayingNickId] = useState<string | null>(null);

  const togglePlayAudio = (id: string, url: string) => {
    if (playingNickId === id) {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
      }
      setPlayingNickId(null);
      return;
    }

    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
    }

    const audio = new Audio(url);
    activeAudioRef.current = audio;
    setPlayingNickId(id);

    audio.play().catch((err) => {
      console.error("Audio playback error:", err);
      setPlayingNickId(null);
    });

    audio.onended = () => {
      setPlayingNickId(null);
    };
  };

  const handleAxelAudioCaptured = async (file: File) => {
    setIsRecordingAxel(false);
    setIsUploadingAudio(true);
    try {
      const res = await uploadMediaFile(file);
      setAxelAudioUrl(res.url);
      showToast("¡Nota de voz para Sofi grabada con éxito! 🎙️🌸");
    } catch (e) {
      console.error("Error uploading audio:", e);
      showToast("Error al procesar el audio.");
    } finally {
      setIsUploadingAudio(false);
    }
  };

  const handleSofiAudioCaptured = async (file: File) => {
    setIsRecordingSofi(false);
    setIsUploadingAudio(true);
    try {
      const res = await uploadMediaFile(file);
      setSofiAudioUrl(res.url);
      showToast("¡Nota de voz para Axel grabada con éxito! 🎙️🧑");
    } catch (e) {
      console.error("Error uploading audio:", e);
      showToast("Error al procesar el audio.");
    } finally {
      setIsUploadingAudio(false);
    }
  };

  const [submittingTarget, setSubmittingTarget] = useState<"sofi" | "axel" | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  // Cargar apodos desde API y sincronizar
  useEffect(() => {
    let isCancelled = false;
    fetch("/api/nicknames")
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled && data.nicknames && Array.isArray(data.nicknames)) {
          setNicknames(data.nicknames);
          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.nicknames));
          }
        }
      })
      .catch((err) => {
        console.error("Error loading nicknames from server:", err);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  // Cleanup audio upon component unmount
  useEffect(() => {
    return () => {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current = null;
      }
    };
  }, []);

  const saveNicknames = (updated: Nickname[]) => {
    setNicknames(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const handleAddNickname = async (
    target: "sofi" | "axel",
    text: string,
    meaning: string,
    audioUrl: string | null,
    setText: (v: string) => void,
    setMeaning: (v: string) => void,
    setAudioUrl: (v: string | null) => void
  ) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    setSubmittingTarget(target);

    const capitalizedText = capitalizeFirst(trimmedText);
    const tempId = `nick-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newNick: Nickname = {
      id: tempId,
      text: capitalizedText,
      meaning: meaning.trim() || undefined,
      target,
      createdAt: Date.now(),
      hearts: 1,
      audioUrl: audioUrl || undefined,
    };

    const nextList = [newNick, ...nicknames];
    saveNicknames(nextList);
    setText("");
    setMeaning("");
    setAudioUrl(null);

    showToast(
      target === "sofi"
        ? "¡Nuevo apodo para Sofi agregado con amor! 🌸"
        : "¡Nuevo apodo para Axel agregado con amor! 🧑"
    );

    try {
      const res = await fetch("/api/nicknames", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          nickname: {
            text: trimmedText,
            meaning: meaning.trim() || undefined,
            target,
            audioUrl: audioUrl || undefined,
          },
        }),
      });
      const data = await res.json();
      if (data.nicknames) {
        saveNicknames(data.nicknames);
      }
    } catch (e) {
      console.error("Error saving nickname:", e);
    } finally {
      setSubmittingTarget(null);
    }
  };

  const handleDelete = async (id: string, text: string) => {
    const nextList = nicknames.filter((n) => n.id !== id);
    saveNicknames(nextList);
    showToast(`Apodo "${text}" eliminado`);

    try {
      const res = await fetch("/api/nicknames", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      const data = await res.json();
      if (data.nicknames) {
        saveNicknames(data.nicknames);
      }
    } catch (e) {
      console.error("Error deleting nickname:", e);
    }
  };

  const handleLike = async (id: string) => {
    const nextList = nicknames.map((n) =>
      n.id === id ? { ...n, hearts: (n.hearts || 0) + 1 } : n
    );
    saveNicknames(nextList);

    try {
      fetch("/api/nicknames", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like", id }),
      }).catch(() => {});
    } catch {
      // optimistic
    }
  };

  const axelForSofiList = useMemo(
    () => nicknames.filter((n) => n.target === "sofi"),
    [nicknames]
  );

  const sofiForAxelList = useMemo(
    () => nicknames.filter((n) => n.target === "axel"),
    [nicknames]
  );

  const reorderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (reorderTimeoutRef.current) {
        clearTimeout(reorderTimeoutRef.current);
      }
    };
  }, []);

  const syncReorderToServer = useCallback((updated: Nickname[]) => {
    if (reorderTimeoutRef.current) {
      clearTimeout(reorderTimeoutRef.current);
    }
    reorderTimeoutRef.current = setTimeout(async () => {
      try {
        await fetch("/api/nicknames", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nicknames: updated }),
        });
      } catch (e) {
        console.error("Error saving reordered nicknames to server:", e);
      }
    }, 500);
  }, []);

  const handleReorderAxel = useCallback(
    (newAxelList: Nickname[]) => {
      const currentSofi = nicknames.filter((n) => n.target === "axel");
      const updated = [...newAxelList, ...currentSofi];
      saveNicknames(updated);
      syncReorderToServer(updated);
    },
    [nicknames, syncReorderToServer]
  );

  const handleReorderSofi = useCallback(
    (newSofiList: Nickname[]) => {
      const currentAxel = nicknames.filter((n) => n.target === "sofi");
      const updated = [...currentAxel, ...newSofiList];
      saveNicknames(updated);
      syncReorderToServer(updated);
    },
    [nicknames, syncReorderToServer]
  );

  return (
    <section className="w-full max-w-5xl mx-auto mt-16 sm:mt-24 px-4 pb-16 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-purple-900/90 text-white font-medium text-sm backdrop-blur-md border border-purple-400/40 shadow-[0_4px_25px_rgba(168,85,247,0.5)] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-300 animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center sm:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Smile className="w-3.5 h-3.5 text-purple-400" />
          Nuestras Palabras de Amor
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold flex flex-wrap items-baseline gap-3 justify-center sm:justify-start">
          <span className="text-white">Nuestros lindos</span>
          <span className="text-purple-400 italic font-serif tracking-wide">
            apodos
          </span>
        </h2>
        <p className="text-purple-200/70 text-base sm:text-lg tracking-wide mt-2">
          De Axel para su consentida Sofi, y de Sofi para su amado Axel. ¡Añadan más apodos siempre que quieran!
        </p>
      </motion.div>

      {/* Parallel Side-by-Side Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
        {/* COLUMN 1: Apodos de Axel para Sofi */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-linear-to-b from-indigo-950/40 via-purple-950/20 to-black/40 border border-indigo-500/30 backdrop-blur-xl p-5 sm:p-7 shadow-[0_8px_30px_rgba(99,102,241,0.1)] flex flex-col"
        >
          {/* Column Header */}
          <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-indigo-500/20">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-xl shrink-0 shadow-inner">
                🧑
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-white tracking-wide flex items-center gap-2">
                  <span>Apodos de Axel para Sofi</span>
                </h3>
                <p className="text-xs text-indigo-300/80 flex items-center gap-2 mt-0.5 flex-wrap">
                  <span>Como Axel llama a su reina hermosa 👑</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-indigo-300/90 bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    <GripVertical className="w-3 h-3 text-indigo-400" /> Arrastra para ordenar
                  </span>
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 shrink-0">
              {axelForSofiList.length} apodos
            </span>
          </div>

          {/* Add Nickname Form */}
          <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-indigo-500/20 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-200/80 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-indigo-400" />
              <span>Añadir apodo para Sofi</span>
            </div>
            <input
              type="text"
              placeholder="Ej: Mi Muñequita, Amor de mi vida..."
              value={axelText}
              onChange={(e) => setAxelText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddNickname(
                    "sofi",
                    axelText,
                    axelMeaning,
                    axelAudioUrl,
                    setAxelText,
                    setAxelMeaning,
                    setAxelAudioUrl
                  );
                }
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-indigo-500/30 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-indigo-400 transition-colors"
            />
            <input
              type="text"
              placeholder="¿Por qué o qué significa? (opcional)"
              value={axelMeaning}
              onChange={(e) => setAxelMeaning(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddNickname(
                    "sofi",
                    axelText,
                    axelMeaning,
                    axelAudioUrl,
                    setAxelText,
                    setAxelMeaning,
                    setAxelAudioUrl
                  );
                }
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-indigo-500/20 text-white placeholder-purple-300/30 text-xs focus:outline-none focus:border-indigo-400 transition-colors"
            />

            {/* Audio Voice Recording for Axel */}
            {isRecordingAxel ? (
              <AudioRecorder
                onAudioCaptured={handleAxelAudioCaptured}
                onCancel={() => setIsRecordingAxel(false)}
                title="Grabar tu voz diciendo este apodo para Sofi"
              />
            ) : isUploadingAudio && submittingTarget === null ? (
              <div className="py-2.5 px-3 rounded-xl bg-black/40 border border-indigo-500/20 text-center flex items-center justify-center gap-2 text-xs text-indigo-200">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>Guardando nota de voz...</span>
              </div>
            ) : axelAudioUrl ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200">
                <div className="flex items-center gap-2">
                  <Mic className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Nota de voz lista para enviar</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAxelAudioUrl(null)}
                  className="p-1 hover:text-white text-indigo-300/70"
                  title="Quitar audio"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsRecordingAxel(true)}
                className="w-full py-2 px-3 rounded-xl border border-dashed border-indigo-500/30 hover:border-indigo-400 bg-white/5 hover:bg-white/10 text-indigo-200 text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Mic className="w-3.5 h-3.5 text-indigo-400" />
                <span>Grabar tu voz diciendo este apodo (opcional)</span>
              </button>
            )}

            <button
              onClick={() =>
                handleAddNickname(
                  "sofi",
                  axelText,
                  axelMeaning,
                  axelAudioUrl,
                  setAxelText,
                  setAxelMeaning,
                  setAxelAudioUrl
                )
              }
              disabled={!axelText.trim() || submittingTarget === "sofi"}
              className="w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Guardar apodo para Sofi</span>
            </button>
          </div>

          {/* Nicknames List */}
          <Reorder.Group
            axis="y"
            values={axelForSofiList}
            onReorder={handleReorderAxel}
            as="div"
            className="space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin"
          >
            {axelForSofiList.length === 0 ? (
              <div className="text-center py-8 text-sm text-purple-300/60">
                Aún no hay apodos aquí. ¡Sé el primero en agregar uno!
              </div>
            ) : (
              axelForSofiList.map((nick) => (
                <Reorder.Item
                  key={nick.id}
                  value={nick}
                  as="div"
                  whileDrag={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                    borderColor: "rgba(129, 140, 248, 0.8)",
                    zIndex: 50,
                  }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-indigo-500/20 hover:border-indigo-400/40 transition-colors flex items-center justify-between gap-3 group relative cursor-grab active:cursor-grabbing select-none"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    {/* Drag Handle */}
                    <div
                      className="text-indigo-400/40 group-hover:text-indigo-300 transition-colors shrink-0 p-1"
                      title="Arrastrar para mover de lugar"
                    >
                      <GripVertical className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-base sm:text-lg text-white">
                          {capitalizeFirst(nick.text)}
                        </span>
                      </div>
                      {nick.meaning && (
                        <p className="text-xs text-indigo-200/80 mt-0.5 italic leading-relaxed">
                          &ldquo;{nick.meaning}&rdquo;
                        </p>
                      )}

                      {/* Voice Note Button */}
                      {nick.audioUrl && (
                        <button
                          type="button"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={() => togglePlayAudio(nick.id, nick.audioUrl!)}
                          className="mt-2 px-2.5 py-1 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-200 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer w-fit"
                        >
                          {playingNickId === nick.id ? (
                            <>
                              <Pause className="w-3 h-3 fill-current text-indigo-300" />
                              <span>Pausar voz</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 fill-current text-indigo-300 ml-0.5" />
                              <span>Escuchar voz 🎙️</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {/* Like button */}
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => handleLike(nick.id)}
                      className="px-2 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-200 text-xs flex items-center gap-1 transition-all cursor-pointer"
                      title="Enviar amor a este apodo"
                    >
                      <Heart className="w-3.5 h-3.5 fill-indigo-400 text-indigo-400" />
                      <span>{nick.hearts || 0}</span>
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => handleDelete(nick.id, nick.text)}
                      className="p-1.5 rounded-lg opacity-40 hover:opacity-100 hover:bg-rose-500/20 text-rose-300 transition-all cursor-pointer"
                      title="Eliminar apodo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Reorder.Item>
              ))
            )}
          </Reorder.Group>
        </motion.div>

        {/* COLUMN 2: Apodos de Sofi para Axel */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-linear-to-b from-fuchsia-950/40 via-rose-950/20 to-black/40 border border-fuchsia-500/30 backdrop-blur-xl p-5 sm:p-7 shadow-[0_8px_30px_rgba(217,70,239,0.1)] flex flex-col"
        >
          {/* Column Header */}
          <div className="flex items-center justify-between gap-3 pb-5 mb-5 border-b border-fuchsia-500/20">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-400/30 flex items-center justify-center text-xl shrink-0 shadow-inner">
                💖
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-white tracking-wide flex items-center gap-2">
                  <span>Apodos de Sofi para Axel</span>
                </h3>
                <p className="text-xs text-fuchsia-300/80 flex items-center gap-2 mt-0.5 flex-wrap">
                  <span>Como Sofi llama a su príncipe querido 🧑</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-fuchsia-300/90 bg-fuchsia-500/20 px-2 py-0.5 rounded-full border border-fuchsia-500/30">
                    <GripVertical className="w-3 h-3 text-fuchsia-400" /> Arrastra para ordenar
                  </span>
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-500/30 shrink-0">
              {sofiForAxelList.length} apodos
            </span>
          </div>

          {/* Add Nickname Form */}
          <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-fuchsia-500/20 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-fuchsia-200/80 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>Añadir apodo para Axel</span>
            </div>
            <input
              type="text"
              placeholder="Ej: Mi Vida, Mi Gordito, Amor Mío..."
              value={sofiText}
              onChange={(e) => setSofiText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddNickname(
                    "axel",
                    sofiText,
                    sofiMeaning,
                    sofiAudioUrl,
                    setSofiText,
                    setSofiMeaning,
                    setSofiAudioUrl
                  );
                }
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-fuchsia-500/30 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-fuchsia-400 transition-colors"
            />
            <input
              type="text"
              placeholder="¿Por qué o qué significa? (opcional)"
              value={sofiMeaning}
              onChange={(e) => setSofiMeaning(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddNickname(
                    "axel",
                    sofiText,
                    sofiMeaning,
                    sofiAudioUrl,
                    setSofiText,
                    setSofiMeaning,
                    setSofiAudioUrl
                  );
                }
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-fuchsia-500/20 text-white placeholder-purple-300/30 text-xs focus:outline-none focus:border-fuchsia-400 transition-colors"
            />

            {/* Audio Voice Recording for Sofi */}
            {isRecordingSofi ? (
              <AudioRecorder
                onAudioCaptured={handleSofiAudioCaptured}
                onCancel={() => setIsRecordingSofi(false)}
                title="Grabar tu voz diciendo este apodo para Axel"
              />
            ) : isUploadingAudio && submittingTarget === null ? (
              <div className="py-2.5 px-3 rounded-xl bg-black/40 border border-fuchsia-500/20 text-center flex items-center justify-center gap-2 text-xs text-fuchsia-200">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-fuchsia-400" />
                <span>Guardando nota de voz...</span>
              </div>
            ) : sofiAudioUrl ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-fuchsia-950/40 border border-fuchsia-500/30 text-xs text-fuchsia-200">
                <div className="flex items-center gap-2">
                  <Mic className="w-3.5 h-3.5 text-fuchsia-400" />
                  <span>Nota de voz lista para enviar</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSofiAudioUrl(null)}
                  className="p-1 hover:text-white text-fuchsia-300/70"
                  title="Quitar audio"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsRecordingSofi(true)}
                className="w-full py-2 px-3 rounded-xl border border-dashed border-fuchsia-500/30 hover:border-fuchsia-400 bg-white/5 hover:bg-white/10 text-fuchsia-200 text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Mic className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Grabar tu voz diciendo este apodo (opcional)</span>
              </button>
            )}

            <button
              onClick={() =>
                handleAddNickname(
                  "axel",
                  sofiText,
                  sofiMeaning,
                  sofiAudioUrl,
                  setSofiText,
                  setSofiMeaning,
                  setSofiAudioUrl
                )
              }
              disabled={!sofiText.trim() || submittingTarget === "axel"}
              className="w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50 disabled:hover:bg-fuchsia-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Guardar apodo para Axel</span>
            </button>
          </div>

          {/* Nicknames List */}
          <Reorder.Group
            axis="y"
            values={sofiForAxelList}
            onReorder={handleReorderSofi}
            as="div"
            className="space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin"
          >
            {sofiForAxelList.length === 0 ? (
              <div className="text-center py-8 text-sm text-purple-300/60">
                Aún no hay apodos aquí. ¡Sé el primero en agregar uno!
              </div>
            ) : (
              sofiForAxelList.map((nick) => (
                <Reorder.Item
                  key={nick.id}
                  value={nick}
                  as="div"
                  whileDrag={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(217, 70, 239, 0.4)",
                    borderColor: "rgba(232, 121, 249, 0.8)",
                    zIndex: 50,
                  }}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-fuchsia-500/20 hover:border-fuchsia-400/40 transition-colors flex items-center justify-between gap-3 group relative cursor-grab active:cursor-grabbing select-none"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    {/* Drag Handle */}
                    <div
                      className="text-fuchsia-400/40 group-hover:text-fuchsia-300 transition-colors shrink-0 p-1"
                      title="Arrastrar para mover de lugar"
                    >
                      <GripVertical className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-base sm:text-lg text-white">
                          {capitalizeFirst(nick.text)}
                        </span>
                      </div>
                      {nick.meaning && (
                        <p className="text-xs text-fuchsia-200/80 mt-0.5 italic leading-relaxed">
                          &ldquo;{nick.meaning}&rdquo;
                        </p>
                      )}

                      {/* Voice Note Button */}
                      {nick.audioUrl && (
                        <button
                          type="button"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={() => togglePlayAudio(nick.id, nick.audioUrl!)}
                          className="mt-2 px-2.5 py-1 rounded-full bg-fuchsia-500/20 hover:bg-fuchsia-500/30 border border-fuchsia-500/30 text-fuchsia-200 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer w-fit"
                        >
                          {playingNickId === nick.id ? (
                            <>
                              <Pause className="w-3 h-3 fill-current text-fuchsia-300" />
                              <span>Pausar voz</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 fill-current text-fuchsia-300 ml-0.5" />
                              <span>Escuchar voz 🎙️</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {/* Like button */}
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => handleLike(nick.id)}
                      className="px-2 py-1 rounded-lg bg-fuchsia-500/10 hover:bg-fuchsia-500/25 border border-fuchsia-500/30 text-fuchsia-200 text-xs flex items-center gap-1 transition-all cursor-pointer"
                      title="Enviar amor a este apodo"
                    >
                      <Heart className="w-3.5 h-3.5 fill-fuchsia-400 text-fuchsia-400" />
                      <span>{nick.hearts || 0}</span>
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => handleDelete(nick.id, nick.text)}
                      className="p-1.5 rounded-lg opacity-40 hover:opacity-100 hover:bg-rose-500/20 text-rose-300 transition-all cursor-pointer"
                      title="Eliminar apodo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Reorder.Item>
              ))
            )}
          </Reorder.Group>
        </motion.div>
      </div>
    </section>
  );
}
