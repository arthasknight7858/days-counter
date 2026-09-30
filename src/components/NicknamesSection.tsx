"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence, Reorder, useDragControls } from "framer-motion";
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
  ChevronDown,
  MessageCircle,
  ChevronsUpDown,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Nickname } from "@/types/nicknames";
import AudioRecorder from "@/components/AudioRecorder";
import { uploadMediaFile } from "@/lib/notesStorage";

const STORAGE_KEY = "sofi_axel_nicknames_cache_v3";

const capitalizeFirst = (str: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

// ==========================================
// INDIVIDUAL NICKNAME ACCORDION CARD
// ==========================================
interface NicknameAccordionCardProps {
  nick: Nickname;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onLike: (id: string) => void;
  onDelete: (id: string, text: string) => void;
  isPlaying: boolean;
  onToggleAudio: (id: string, url: string) => void;
  theme: "indigo" | "fuchsia";
}

function NicknameAccordionCard({
  nick,
  isExpanded,
  onToggleExpand,
  onLike,
  onDelete,
  isPlaying,
  onToggleAudio,
  theme,
}: NicknameAccordionCardProps) {
  const dragControls = useDragControls();
  const isIndigo = theme === "indigo";

  return (
    <Reorder.Item
      key={nick.id}
      value={nick}
      as="div"
      dragListener={false}
      dragControls={dragControls}
      whileDrag={{
        scale: 1.02,
        boxShadow: isIndigo
          ? "0 12px 28px -4px rgba(99, 102, 241, 0.45)"
          : "0 12px 28px -4px rgba(217, 70, 239, 0.45)",
        borderColor: isIndigo
          ? "rgba(129, 140, 248, 0.9)"
          : "rgba(232, 121, 249, 0.9)",
        zIndex: 50,
      }}
      className={`rounded-2xl border transition-all duration-200 select-none overflow-hidden ${
        isIndigo
          ? isExpanded
            ? "bg-indigo-950/40 border-indigo-500/50 shadow-[0_4px_20px_rgba(99,102,241,0.15)]"
            : "bg-white/5 border-indigo-500/20 hover:border-indigo-400/40 hover:bg-white/[0.08]"
          : isExpanded
          ? "bg-fuchsia-950/40 border-fuchsia-500/50 shadow-[0_4px_20px_rgba(217,70,239,0.15)]"
          : "bg-white/5 border-fuchsia-500/20 hover:border-fuchsia-400/40 hover:bg-white/[0.08]"
      }`}
    >
      {/* Compact Row (Header of Accordion) */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Dedicated Drag Handle - isolated so normal touch on mobile scrolls smoothly */}
        <div
          onPointerDown={(e) => {
            e.preventDefault();
            dragControls.start(e);
          }}
          style={{ touchAction: "none" }}
          className={`p-2.5 sm:p-3 cursor-grab active:cursor-grabbing transition-colors shrink-0 flex items-center justify-center ${
            isIndigo
              ? "text-indigo-400/40 hover:text-indigo-300"
              : "text-fuchsia-400/40 hover:text-fuchsia-300"
          }`}
          title="Mantén y arrastra para reordenar"
        >
          <GripVertical className="w-4 h-4" />
        </div>

        {/* Tappable Accordion Area */}
        <div
          onClick={onToggleExpand}
          className="flex-1 flex items-center justify-between py-3 pr-2.5 min-w-0 cursor-pointer"
        >
          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-base sm:text-lg text-white tracking-wide truncate">
                {capitalizeFirst(nick.text)}
              </span>

              {/* Badges indicating extra content */}
              {nick.audioUrl && (
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${
                    isIndigo
                      ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/30"
                      : "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30"
                  }`}
                >
                  <Mic className="w-2.5 h-2.5" />
                  <span>Voz</span>
                </span>
              )}

              {nick.meaning && (
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full border shrink-0 ${
                    isIndigo
                      ? "bg-indigo-500/10 text-indigo-300/80 border-indigo-500/20"
                      : "bg-fuchsia-500/10 text-fuchsia-300/80 border-fuchsia-500/20"
                  }`}
                  title="Tiene significado"
                >
                  <MessageCircle className="w-2.5 h-2.5" />
                </span>
              )}
            </div>
          </div>

          {/* Quick Actions (Like + Accordion Chevron) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Like button */}
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onLike(nick.id);
              }}
              className={`px-2.5 py-1 rounded-xl text-xs flex items-center gap-1 font-semibold transition-all cursor-pointer ${
                isIndigo
                  ? "bg-indigo-500/15 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-200"
                  : "bg-fuchsia-500/15 hover:bg-fuchsia-500/30 border border-fuchsia-500/30 text-fuchsia-200"
              }`}
              title="Dar amor a este apodo"
            >
              <Heart
                className={`w-3.5 h-3.5 fill-current ${
                  isIndigo ? "text-indigo-400" : "text-fuchsia-400"
                }`}
              />
              <span>{nick.hearts || 0}</span>
            </button>

            {/* Accordion expand/collapse Chevron */}
            <div
              className={`p-1 text-white/50 transition-transform duration-300 ${
                isExpanded ? "rotate-180 text-white" : ""
              }`}
            >
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Body Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className={`px-4 pb-4 pt-2 border-t space-y-3 ${
                isIndigo
                  ? "border-indigo-500/20 bg-indigo-950/20"
                  : "border-fuchsia-500/20 bg-fuchsia-950/20"
              }`}
            >
              {/* Meaning Section */}
              {nick.meaning ? (
                <div
                  className={`p-3 rounded-xl border text-xs sm:text-sm relative ${
                    isIndigo
                      ? "bg-indigo-950/40 border-indigo-500/30 text-indigo-200"
                      : "bg-fuchsia-950/40 border-fuchsia-500/30 text-fuchsia-200"
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-1">
                    ¿Por qué o qué significa?
                  </div>
                  <p className="italic leading-relaxed font-serif text-white/95">
                    &ldquo;{nick.meaning}&rdquo;
                  </p>
                </div>
              ) : (
                <div className="text-xs text-purple-200/50 italic py-0.5">
                  Un apodo tierno nacido del corazón 💕
                </div>
              )}

              {/* Voice Note Audio Player */}
              {nick.audioUrl && (
                <div
                  className={`flex items-center justify-between p-2.5 rounded-xl border ${
                    isIndigo
                      ? "bg-indigo-950/60 border-indigo-500/30"
                      : "bg-fuchsia-950/60 border-fuchsia-500/30"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => onToggleAudio(nick.id, nick.audioUrl!)}
                      className={`p-2 rounded-xl transition-all cursor-pointer ${
                        isPlaying
                          ? isIndigo
                            ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                            : "bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]"
                          : isIndigo
                          ? "bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30 border border-indigo-500/30"
                          : "bg-fuchsia-500/20 text-fuchsia-200 hover:bg-fuchsia-500/30 border border-fuchsia-500/30"
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {isPlaying ? "Reproduciendo nota de voz..." : "Nota de voz grabada"}
                      </p>
                      <p className="text-[10px] text-white/60">
                        {isPlaying ? "Toca para pausar" : "Escuchar con amor 🎙️"}
                      </p>
                    </div>
                  </div>

                  {/* Equalizer animation when playing */}
                  {isPlaying && (
                    <div className="flex items-end gap-1 h-5 pr-2">
                      <span className={`w-1 rounded-full animate-bounce h-3 ${isIndigo ? "bg-indigo-400" : "bg-fuchsia-400"}`} />
                      <span className={`w-1 rounded-full animate-bounce delay-100 h-5 ${isIndigo ? "bg-indigo-300" : "bg-fuchsia-300"}`} />
                      <span className={`w-1 rounded-full animate-bounce delay-200 h-2 ${isIndigo ? "bg-indigo-400" : "bg-fuchsia-400"}`} />
                    </div>
                  )}
                </div>
              )}

              {/* Details & Delete Action */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-white/40">
                  {nick.createdAt
                    ? `Guardado el ${new Date(nick.createdAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                      })}`
                    : "Guardado en nuestra historia"}
                </span>
                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => onDelete(nick.id, nick.text)}
                  className="text-xs text-rose-400/80 hover:text-rose-200 hover:bg-rose-500/15 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Eliminar este apodo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar apodo</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reorder.Item>
  );
}

// ==========================================
// MAIN NICKNAMES SECTION
// ==========================================
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

  // Mobile View mode filter: "all" (both), "sofi" (Axel para Sofi), "axel" (Sofi para Axel)
  const [viewFilter, setViewFilter] = useState<"all" | "sofi" | "axel">("all");

  // Section Accordion open states (both open by default, collapsible independently)
  const [isAxelSectionOpen, setIsAxelSectionOpen] = useState(true);
  const [isSofiSectionOpen, setIsSofiSectionOpen] = useState(true);

  // Form Accordion open states (collapsed by default to save precious vertical space on mobile)
  const [isAxelAddOpen, setIsAxelAddOpen] = useState(false);
  const [isSofiAddOpen, setIsSofiAddOpen] = useState(false);

  // Container height expansion mode (toggle between compact scrollable box and full expanded view)
  const [isAxelFullList, setIsAxelFullList] = useState(false);
  const [isSofiFullList, setIsSofiFullList] = useState(false);

  // Expanded individual nickname cards (Set of nickname IDs)
  const [expandedNicknames, setExpandedNicknames] = useState<Record<string, boolean>>({});

  const toggleNicknameAccordion = (id: string) => {
    setExpandedNicknames((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAllNicknames = (targetList: Nickname[]) => {
    const areAllExpanded = targetList.every((n) => expandedNicknames[n.id]);
    const nextState = { ...expandedNicknames };
    targetList.forEach((n) => {
      nextState[n.id] = !areAllExpanded;
    });
    setExpandedNicknames(nextState);
  };

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
    setAudioUrl: (v: string | null) => void,
    closeAddForm: () => void
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
    closeAddForm();

    // Auto expand the newly created nickname
    setExpandedNicknames((prev) => ({ ...prev, [tempId]: true }));

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

  const showAxelColumn = viewFilter === "all" || viewFilter === "sofi";
  const showSofiColumn = viewFilter === "all" || viewFilter === "axel";

  const allAxelExpanded =
    axelForSofiList.length > 0 &&
    axelForSofiList.every((n) => expandedNicknames[n.id]);

  const allSofiExpanded =
    sofiForAxelList.length > 0 &&
    sofiForAxelList.every((n) => expandedNicknames[n.id]);

  return (
    <section className="w-full max-w-5xl mx-auto mt-12 sm:mt-20 px-3 sm:px-6 pb-16 relative">
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
        className="mb-8 text-center sm:text-left"
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
        <p className="text-purple-200/70 text-sm sm:text-base tracking-wide mt-2 max-w-2xl">
          De Axel para su consentida Sofi, y de Sofi para su amado Axel. Toca cualquier apodo para desplegar su significado y nota de voz.
        </p>

        {/* Mobile / Responsive Filter View Switcher */}
        <div className="flex items-center justify-center sm:justify-start gap-2 mt-6 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setViewFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              viewFilter === "all"
                ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/40"
                : "bg-white/5 text-purple-200/70 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            <span>✨ Ver ambos</span>
            <span className="text-[11px] opacity-75">({nicknames.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setViewFilter("sofi")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              viewFilter === "sofi"
                ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-indigo-400/40"
                : "bg-white/5 text-indigo-200/70 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            <span>🧑 Axel para Sofi</span>
            <span className="text-[11px] opacity-75">({axelForSofiList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setViewFilter("axel")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              viewFilter === "axel"
                ? "bg-fuchsia-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)] border border-fuchsia-400/40"
                : "bg-white/5 text-fuchsia-200/70 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            <span>💖 Sofi para Axel</span>
            <span className="text-[11px] opacity-75">({sofiForAxelList.length})</span>
          </button>
        </div>
      </motion.div>

      {/* Accordion Columns Grid */}
      <div
        className={`grid gap-6 sm:gap-8 items-start ${
          viewFilter === "all" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-2xl mx-auto"
        }`}
      >
        {/* ========================================================
            COLUMN 1: APODOS DE AXEL PARA SOFI (ACCORDION SECTION)
           ======================================================== */}
        {showAxelColumn && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-linear-to-b from-indigo-950/40 via-purple-950/20 to-black/50 border border-indigo-500/30 backdrop-blur-xl p-4 sm:p-6 shadow-[0_8px_30px_rgba(99,102,241,0.12)] flex flex-col transition-all"
          >
            {/* Main Section Accordion Trigger / Header */}
            <button
              type="button"
              onClick={() => setIsAxelSectionOpen((prev) => !prev)}
              className="w-full flex items-center justify-between gap-3 text-left cursor-pointer group focus:outline-none"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-xl shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  🧑
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-white tracking-wide flex items-center gap-2">
                    <span className="truncate">Apodos de Axel para Sofi</span>
                  </h3>
                  <p className="text-xs text-indigo-300/80 truncate">
                    Como Axel llama a su reina hermosa 👑
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">
                  {axelForSofiList.length} apodos
                </span>
                <div
                  className={`p-1.5 rounded-full bg-white/5 border border-indigo-500/30 text-indigo-300 transition-transform duration-300 ${
                    isAxelSectionOpen ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </button>

            {/* Section Accordion Body */}
            <AnimatePresence initial={false}>
              {isAxelSectionOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 border-t border-indigo-500/20 mt-4 space-y-4">
                    {/* Collapsible "Add Nickname" Accordion Form */}
                    <div className="rounded-2xl border border-indigo-500/25 bg-black/40 overflow-hidden transition-colors">
                      <button
                        type="button"
                        onClick={() => setIsAxelAddOpen((prev) => !prev)}
                        className="w-full p-3 sm:p-3.5 flex items-center justify-between text-xs font-semibold text-indigo-200 hover:text-white transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 uppercase tracking-wider">
                          <Plus
                            className={`w-4 h-4 text-indigo-400 transition-transform duration-300 ${
                              isAxelAddOpen ? "rotate-45 text-rose-400" : "group-hover:scale-110"
                            }`}
                          />
                          <span>
                            {isAxelAddOpen ? "Cerrar formulario" : "Añadir apodo para Sofi"}
                          </span>
                        </div>
                        <span className="text-[11px] text-indigo-300/60 group-hover:text-indigo-200">
                          {isAxelAddOpen ? "Ocultar" : "+ Escribir"}
                        </span>
                      </button>

                      {/* Add Form Accordion Content */}
                      <AnimatePresence initial={false}>
                        {isAxelAddOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-1 space-y-3 border-t border-indigo-500/15">
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
                                      setAxelAudioUrl,
                                      () => setIsAxelAddOpen(false)
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
                                      setAxelAudioUrl,
                                      () => setIsAxelAddOpen(false)
                                    );
                                  }
                                }}
                                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-indigo-500/20 text-white placeholder-purple-300/30 text-xs focus:outline-none focus:border-indigo-400 transition-colors"
                              />

                              {/* Audio Voice Recording */}
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
                                type="button"
                                onClick={() =>
                                  handleAddNickname(
                                    "sofi",
                                    axelText,
                                    axelMeaning,
                                    axelAudioUrl,
                                    setAxelText,
                                    setAxelMeaning,
                                    setAxelAudioUrl,
                                    () => setIsAxelAddOpen(false)
                                  )
                                }
                                disabled={!axelText.trim() || submittingTarget === "sofi"}
                                className="w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all cursor-pointer"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>Guardar apodo para Sofi</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Nicknames List Control Bar */}
                    <div className="flex items-center justify-between px-1 text-[11px] text-indigo-300/70 select-none">
                      <span className="flex items-center gap-1">
                        <GripVertical className="w-3 h-3 text-indigo-400" />
                        Arrastra el ícono para reordenar
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleAllNicknames(axelForSofiList)}
                          className="hover:text-indigo-200 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <ChevronsUpDown className="w-3 h-3" />
                          <span>{allAxelExpanded ? "Contraer" : "Expandir todo"}</span>
                        </button>
                        {axelForSofiList.length > 5 && (
                          <button
                            type="button"
                            onClick={() => setIsAxelFullList((prev) => !prev)}
                            className="hover:text-indigo-200 flex items-center gap-1 cursor-pointer transition-colors"
                            title={isAxelFullList ? "Modo compacto" : "Ver lista completa"}
                          >
                            {isAxelFullList ? (
                              <>
                                <Minimize2 className="w-3 h-3" />
                                <span>Compacto</span>
                              </>
                            ) : (
                              <>
                                <Maximize2 className="w-3 h-3" />
                                <span>Ver todos</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Scrollable Accordion List */}
                    <div className="relative">
                      <Reorder.Group
                        axis="y"
                        values={axelForSofiList}
                        onReorder={handleReorderAxel}
                        as="div"
                        className={`space-y-2.5 overflow-y-auto overscroll-contain pr-1 custom-scrollbar-indigo transition-all duration-300 ${
                          isAxelFullList
                            ? "max-h-none"
                            : "max-h-[380px] sm:max-h-[460px] md:max-h-[500px]"
                        }`}
                      >
                        {axelForSofiList.length === 0 ? (
                          <div className="text-center py-10 text-sm text-purple-300/60 rounded-2xl bg-white/5 border border-dashed border-indigo-500/20">
                            Aún no hay apodos aquí. ¡Toca en &quot;Añadir apodo&quot; para crear el primero! ✨
                          </div>
                        ) : (
                          axelForSofiList.map((nick) => (
                            <NicknameAccordionCard
                              key={nick.id}
                              nick={nick}
                              isExpanded={!!expandedNicknames[nick.id]}
                              onToggleExpand={() => toggleNicknameAccordion(nick.id)}
                              onLike={handleLike}
                              onDelete={handleDelete}
                              isPlaying={playingNickId === nick.id}
                              onToggleAudio={togglePlayAudio}
                              theme="indigo"
                            />
                          ))
                        )}
                      </Reorder.Group>

                      {/* Bottom Gradient Shadow for smooth scroll cue */}
                      {!isAxelFullList && axelForSofiList.length > 4 && (
                        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-8 bg-linear-to-t from-[#070514]/90 via-[#070514]/40 to-transparent rounded-b-2xl" />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ========================================================
            COLUMN 2: APODOS DE SOFI PARA AXEL (ACCORDION SECTION)
           ======================================================== */}
        {showSofiColumn && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-linear-to-b from-fuchsia-950/40 via-rose-950/20 to-black/50 border border-fuchsia-500/30 backdrop-blur-xl p-4 sm:p-6 shadow-[0_8px_30px_rgba(217,70,239,0.12)] flex flex-col transition-all"
          >
            {/* Main Section Accordion Trigger / Header */}
            <button
              type="button"
              onClick={() => setIsSofiSectionOpen((prev) => !prev)}
              className="w-full flex items-center justify-between gap-3 text-left cursor-pointer group focus:outline-none"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-400/30 flex items-center justify-center text-xl shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  💖
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-white tracking-wide flex items-center gap-2">
                    <span className="truncate">Apodos de Sofi para Axel</span>
                  </h3>
                  <p className="text-xs text-fuchsia-300/80 truncate">
                    Como Sofi llama a su príncipe querido 🧑
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-500/30">
                  {sofiForAxelList.length} apodos
                </span>
                <div
                  className={`p-1.5 rounded-full bg-white/5 border border-fuchsia-500/30 text-fuchsia-300 transition-transform duration-300 ${
                    isSofiSectionOpen ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </button>

            {/* Section Accordion Body */}
            <AnimatePresence initial={false}>
              {isSofiSectionOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 border-t border-fuchsia-500/20 mt-4 space-y-4">
                    {/* Collapsible "Add Nickname" Accordion Form */}
                    <div className="rounded-2xl border border-fuchsia-500/25 bg-black/40 overflow-hidden transition-colors">
                      <button
                        type="button"
                        onClick={() => setIsSofiAddOpen((prev) => !prev)}
                        className="w-full p-3 sm:p-3.5 flex items-center justify-between text-xs font-semibold text-fuchsia-200 hover:text-white transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 uppercase tracking-wider">
                          <Plus
                            className={`w-4 h-4 text-fuchsia-400 transition-transform duration-300 ${
                              isSofiAddOpen ? "rotate-45 text-rose-400" : "group-hover:scale-110"
                            }`}
                          />
                          <span>
                            {isSofiAddOpen ? "Cerrar formulario" : "Añadir apodo para Axel"}
                          </span>
                        </div>
                        <span className="text-[11px] text-fuchsia-300/60 group-hover:text-fuchsia-200">
                          {isSofiAddOpen ? "Ocultar" : "+ Escribir"}
                        </span>
                      </button>

                      {/* Add Form Accordion Content */}
                      <AnimatePresence initial={false}>
                        {isSofiAddOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-1 space-y-3 border-t border-fuchsia-500/15">
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
                                      setSofiAudioUrl,
                                      () => setIsSofiAddOpen(false)
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
                                      setSofiAudioUrl,
                                      () => setIsSofiAddOpen(false)
                                    );
                                  }
                                }}
                                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-fuchsia-500/20 text-white placeholder-purple-300/30 text-xs focus:outline-none focus:border-fuchsia-400 transition-colors"
                              />

                              {/* Audio Voice Recording */}
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
                                type="button"
                                onClick={() =>
                                  handleAddNickname(
                                    "axel",
                                    sofiText,
                                    sofiMeaning,
                                    sofiAudioUrl,
                                    setSofiText,
                                    setSofiMeaning,
                                    setSofiAudioUrl,
                                    () => setIsSofiAddOpen(false)
                                  )
                                }
                                disabled={!sofiText.trim() || submittingTarget === "axel"}
                                className="w-full py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50 disabled:hover:bg-fuchsia-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all cursor-pointer"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>Guardar apodo para Axel</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Nicknames List Control Bar */}
                    <div className="flex items-center justify-between px-1 text-[11px] text-fuchsia-300/70 select-none">
                      <span className="flex items-center gap-1">
                        <GripVertical className="w-3 h-3 text-fuchsia-400" />
                        Arrastra el ícono para reordenar
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleAllNicknames(sofiForAxelList)}
                          className="hover:text-fuchsia-200 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <ChevronsUpDown className="w-3 h-3" />
                          <span>{allSofiExpanded ? "Contraer" : "Expandir todo"}</span>
                        </button>
                        {sofiForAxelList.length > 5 && (
                          <button
                            type="button"
                            onClick={() => setIsSofiFullList((prev) => !prev)}
                            className="hover:text-fuchsia-200 flex items-center gap-1 cursor-pointer transition-colors"
                            title={isSofiFullList ? "Modo compacto" : "Ver lista completa"}
                          >
                            {isSofiFullList ? (
                              <>
                                <Minimize2 className="w-3 h-3" />
                                <span>Compacto</span>
                              </>
                            ) : (
                              <>
                                <Maximize2 className="w-3 h-3" />
                                <span>Ver todos</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Scrollable Accordion List */}
                    <div className="relative">
                      <Reorder.Group
                        axis="y"
                        values={sofiForAxelList}
                        onReorder={handleReorderSofi}
                        as="div"
                        className={`space-y-2.5 overflow-y-auto overscroll-contain pr-1 custom-scrollbar-fuchsia transition-all duration-300 ${
                          isSofiFullList
                            ? "max-h-none"
                            : "max-h-[380px] sm:max-h-[460px] md:max-h-[500px]"
                        }`}
                      >
                        {sofiForAxelList.length === 0 ? (
                          <div className="text-center py-10 text-sm text-purple-300/60 rounded-2xl bg-white/5 border border-dashed border-fuchsia-500/20">
                            Aún no hay apodos aquí. ¡Toca en &quot;Añadir apodo&quot; para crear el primero! ✨
                          </div>
                        ) : (
                          sofiForAxelList.map((nick) => (
                            <NicknameAccordionCard
                              key={nick.id}
                              nick={nick}
                              isExpanded={!!expandedNicknames[nick.id]}
                              onToggleExpand={() => toggleNicknameAccordion(nick.id)}
                              onLike={handleLike}
                              onDelete={handleDelete}
                              isPlaying={playingNickId === nick.id}
                              onToggleAudio={togglePlayAudio}
                              theme="fuchsia"
                            />
                          ))
                        )}
                      </Reorder.Group>

                      {/* Bottom Gradient Shadow for smooth scroll cue */}
                      {!isSofiFullList && sofiForAxelList.length > 4 && (
                        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-8 bg-linear-to-t from-[#070514]/90 via-[#070514]/40 to-transparent rounded-b-2xl" />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
