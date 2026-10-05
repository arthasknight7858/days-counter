"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  StickyNote,
  Sparkles,
  Heart,
  Pin,
  Calendar,
  Plus,
  Trash2,
  X,
  Search,
  MessageSquareHeart,
  Camera,
  Maximize2,
  Edit3,
  Copy,
  Check,
  Download,
  Upload,
  Music,
  Film,
  Mic,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { CustomNote, NoteColor, NoteCategory, MediaType } from "@/types/notes";
import {
  fetchAllNotes,
  syncNotesToServer,
  uploadMediaFile,
  deleteNoteFromServer,
} from "@/lib/notesStorage";
import { useMusic } from "@/context/MusicContext";
import NoteAudioPlayer from "@/components/NoteAudioPlayer";
import AudioRecorder from "@/components/AudioRecorder";
import CameraCapture from "@/components/CameraCapture";

export type { NoteColor, NoteCategory, MediaType, CustomNote };

const COLOR_STYLES: Record<
  NoteColor,
  {
    bg: string;
    border: string;
    badge: string;
    textAccent: string;
    glow: string;
    name: string;
  }
> = {
  purple: {
    bg: "bg-purple-950/40 hover:bg-purple-950/50",
    border: "border-purple-500/30 hover:border-purple-500/50",
    badge: "bg-purple-500/20 text-purple-200 border-purple-500/30",
    textAccent: "text-purple-300",
    glow: "rgba(168,85,247,0.15)",
    name: "Lavanda Romántico",
  },
  pink: {
    bg: "bg-pink-950/40 hover:bg-pink-950/50",
    border: "border-pink-500/30 hover:border-pink-500/50",
    badge: "bg-pink-500/20 text-pink-200 border-pink-500/30",
    textAccent: "text-pink-300",
    glow: "rgba(244,114,182,0.15)",
    name: "Rosa Algodón",
  },
  amber: {
    bg: "bg-amber-950/35 hover:bg-amber-950/45",
    border: "border-amber-500/30 hover:border-amber-500/50",
    badge: "bg-amber-500/20 text-amber-200 border-amber-500/30",
    textAccent: "text-amber-300",
    glow: "rgba(245,158,11,0.15)",
    name: "Miel & Atardecer",
  },
  emerald: {
    bg: "bg-emerald-950/35 hover:bg-emerald-950/45",
    border: "border-emerald-500/30 hover:border-emerald-500/50",
    badge: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30",
    textAccent: "text-emerald-300",
    glow: "rgba(16,185,129,0.15)",
    name: "Menta Fresca",
  },
  cyan: {
    bg: "bg-cyan-950/35 hover:bg-cyan-950/45",
    border: "border-cyan-500/30 hover:border-cyan-500/50",
    badge: "bg-cyan-500/20 text-cyan-200 border-cyan-500/30",
    textAccent: "text-cyan-300",
    glow: "rgba(6,182,212,0.15)",
    name: "Cielo Estrellado",
  },
  rose: {
    bg: "bg-rose-950/40 hover:bg-rose-950/50",
    border: "border-rose-500/30 hover:border-rose-500/50",
    badge: "bg-rose-500/20 text-rose-200 border-rose-500/30",
    textAccent: "text-rose-300",
    glow: "rgba(244,63,94,0.15)",
    name: "Cereza & Pasión",
  },
  indigo: {
    bg: "bg-indigo-950/40 hover:bg-indigo-950/50",
    border: "border-indigo-500/30 hover:border-indigo-500/50",
    badge: "bg-indigo-500/20 text-indigo-200 border-indigo-500/30",
    textAccent: "text-indigo-300",
    glow: "rgba(99,102,241,0.15)",
    name: "Medianoche Mágica",
  },
};

const CATEGORIES_INFO: Record<
  "amor" | "metas" | "recuerdos" | "recordatorios" | "citas",
  { label: string; icon: string }
> = {
  amor: { label: "Amor & Cartitas", icon: "💖" },
  metas: { label: "Metas & Sueños", icon: "🎯" },
  recuerdos: { label: "Recuerdos Lindos", icon: "✨" },
  recordatorios: { label: "Por Recordar", icon: "📌" },
  citas: { label: "Ideas para Citas", icon: "🍿" },
};

const AVAILABLE_EMOJIS = [
  "💖",
  "✨",
  "🌸",
  "💌",
  "🎀",
  "🍰",
  "🐱",
  "🐶",
  "💍",
  "☕",
  "🎬",
  "✈️",
  "🌟",
  "🌷",
  "🍓",
  "🌙",
  "🎵",
  "🎧",
  "📹",
  "🌹",
];

const INITIAL_AXEL_NOTE: CustomNote = {
  id: "axel-consejos-inicial",
  title: "Consejos & Rutas para tu Aprendizaje 🌟",
  content: `Mi amor, todas las rutas y recursos que están aquí son para ti. Si quieres aprender más cosas o quieres cambios, no dudes en decirme. Mi recomendación es que aprendas inglés y a la par arquitectura dividiéndote el tiempo, y también hagas un poco de ejercicio, a diario si puedes o 3 veces a la semana.

Quiero que no te rindas y le des la oportunidad a todo lo que quieres hacer y lograr mi amor. Cuentas con mi apoyo siempre y te ayudaré en todo lo que te propongas. Aprende el inglés poco a poco; el canal de Inglés con el Güero me pareció bastante bueno para ir iniciando, y cuando ya te vayas acostumbrando al idioma puedes recurrir a mí para practicar escribir y hablar juntos.

Si quieres aún más ayuda usa ChatGPT y Claude para buscar y aprender la información. Los módulos de estudio que te di tienen los temarios, así que ve por cada uno en orden: estúdialo, entiéndelo y continúa con el siguiente. Para los idiomas usa Duolingo.

Para hacer ejercicio son geniales los videos de cardio (20 a 30 min) y abdominales (10 a 20 min).

Recuerda que siempre estaré ahí para ti y escucharte, y te ayudaré en todo lo que necesites y te propongas mi amor. ¡Te amo con toda mi alma! ❤️`,
  date: "22 de Agosto de 2026",
  color: "amber",
  category: "amor",
  emoji: "🌟",
  isPinned: true,
  isAxelSpecial: true,
  createdAt: 1724300000000,
  reactions: 5,
};

export interface NoteTemplate {
  name: string;
  icon: string;
  title: string;
  category: "amor" | "metas" | "recuerdos" | "recordatorios" | "citas";
  color: NoteColor;
  emoji: string;
  starter: string;
}

export const NOTE_TEMPLATES: NoteTemplate[] = [
  {
    name: "Cartita de Amor",
    icon: "💌",
    title: "Un detalle con amor para ti",
    category: "amor",
    color: "pink",
    emoji: "💖",
    starter:
      "Mi cielo, hoy quería decirte lo mucho que te amo y lo infinitamente agradecido que estoy de tenerte a mi lado...",
  },
  {
    name: "Meta Juntos",
    icon: "🎯",
    title: "Nuestra próxima meta",
    category: "metas",
    color: "amber",
    emoji: "✨",
    starter: "Un sueño que vamos a cumplir juntos paso a paso: ",
  },
  {
    name: "Nota de Voz / Canción",
    icon: "🎵",
    title: "Una canción o mensaje especial para ti",
    category: "amor",
    color: "purple",
    emoji: "🎶",
    starter: "Escucha este audio que te dedico con todo mi corazón... 🎧💕",
  },
  {
    name: "Idea para Cita",
    icon: "🍿",
    title: "Plan para nuestra próxima salida",
    category: "citas",
    color: "rose",
    emoji: "🎬",
    starter: "Lugar o actividad: \nComida rica: \nLo especial de este día: ",
  },
  {
    name: "Recuerdo Bonito",
    icon: "🌸",
    title: "Un momento inolvidable",
    category: "recuerdos",
    color: "rose",
    emoji: "🌷",
    starter: "Me encanta recordar cuando nosotros...",
  },
  {
    name: "Recordatorio Dulce",
    icon: "📌",
    title: "¡No olvides lo increíble que eres!",
    category: "recordatorios",
    color: "emerald",
    emoji: "🌟",
    starter:
      "¡Tú puedes con todo lo que te propongas! Recuerda tomar agüita, descansar y que cuentas conmigo siempre.",
  },
];

export type SortOption =
  | "pinned"
  | "newest"
  | "oldest"
  | "photos"
  | "audios"
  | "videos";

export default function NotesSection() {
  const { isPlaying: isBgMusicPlaying, togglePlay: toggleBgMusic } = useMusic();
  const [notes, setNotes] = useState<CustomNote[]>([INITIAL_AXEL_NOTE]);
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);

  const handleAudioNotePlay = useCallback(() => {
    if (isBgMusicPlaying) {
      toggleBgMusic();
    }
  }, [isBgMusicPlaying, toggleBgMusic]);

  const [activeCategory, setActiveCategory] = useState<NoteCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("pinned");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<{ id: string; title: string } | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formColor, setFormColor] = useState<NoteColor>("pink");
  const [formCategory, setFormCategory] = useState<
    "amor" | "metas" | "recuerdos" | "recordatorios" | "citas"
  >("amor");
  const [formEmoji, setFormEmoji] = useState("💖");
  const [formIsPinned, setFormIsPinned] = useState(false);

  // Attached Media State
  const [mediaUploadType, setMediaUploadType] = useState<
    "image" | "audio" | "video"
  >("image");
  const [formMediaUrl, setFormMediaUrl] = useState<string | null>(null);
  const [formMediaType, setFormMediaType] = useState<MediaType | null>(null);
  const [formMediaName, setFormMediaName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [isCapturingCamera, setIsCapturingCamera] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const backupInputRef = useRef<HTMLInputElement | null>(null);

  // 1. Initial Load from Server & IndexedDB
  useEffect(() => {
    let isMounted = true;
    fetchAllNotes()
      .then((loadedNotes) => {
        if (isMounted) {
          if (Array.isArray(loadedNotes) && loadedNotes.length > 0) {
            setNotes(loadedNotes);
          }
          setIsLoadingNotes(false);
        }
      })
      .catch((err) => {
        console.error("Error al cargar notas:", err);
        if (isMounted) setIsLoadingNotes(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Synchronize state and persist permanently
  const updateAndSaveNotes = useCallback(
    (updater: CustomNote[] | ((prev: CustomNote[]) => CustomNote[])) => {
      setNotes((prevNotes) => {
        const nextNotes =
          typeof updater === "function" ? updater(prevNotes) : updater;
        syncNotesToServer(nextNotes);
        return nextNotes;
      });
    },
    []
  );

  // File Upload Handler (Images, MP3 Audios, Videos)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);

    try {
      const uploadResult = await uploadMediaFile(file);
      setFormMediaUrl(uploadResult.url);
      setFormMediaType(uploadResult.mediaType);
      setFormMediaName(uploadResult.mediaName);
    } catch (err: unknown) {
      console.error("Error uploading file:", err);
      const errMsg =
        err instanceof Error
          ? err.message
          : "Hubo un error al procesar el archivo.";
      setUploadError(errMsg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Handler for live captured audio or camera photo
  const handleMediaCaptured = async (file: File) => {
    setIsRecordingAudio(false);
    setIsCapturingCamera(false);
    setUploadError(null);
    setIsUploading(true);

    try {
      const uploadResult = await uploadMediaFile(file);
      setFormMediaUrl(uploadResult.url);
      setFormMediaType(uploadResult.mediaType);
      setFormMediaName(uploadResult.mediaName);
      showToast(
        uploadResult.mediaType === "audio"
          ? "¡Audio grabado y adjuntado con éxito! 🎙️💕"
          : "¡Foto tomada y adjuntada con éxito! 📷✨"
      );
    } catch (err: unknown) {
      console.error("Error uploading captured media:", err);
      const errMsg =
        err instanceof Error
          ? err.message
          : "Hubo un error al procesar y guardar la captura.";
      setUploadError(errMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const removeAttachedMedia = () => {
    setFormMediaUrl(null);
    setFormMediaType(null);
    setFormMediaName(null);
    setUploadError(null);
    setIsRecordingAudio(false);
    setIsCapturingCamera(false);
  };

  const openCreateModal = () => {
    setEditingNoteId(null);
    setFormTitle("");
    setFormContent("");
    setFormColor("pink");
    setFormCategory("amor");
    setFormEmoji("💖");
    setFormMediaUrl(null);
    setFormMediaType(null);
    setFormMediaName(null);
    setFormIsPinned(false);
    setUploadError(null);
    setIsRecordingAudio(false);
    setIsCapturingCamera(false);
    setIsModalOpen(true);
  };

  const applyTemplate = (tpl: NoteTemplate) => {
    setFormTitle(tpl.title);
    setFormContent(tpl.starter);
    setFormCategory(tpl.category);
    setFormColor(tpl.color);
    setFormEmoji(tpl.emoji);
  };

  const openEditModal = (note: CustomNote) => {
    setEditingNoteId(note.id);
    setFormTitle(note.title);
    setFormContent(note.content);
    setFormColor(note.color);
    setFormCategory(note.category);
    setFormEmoji(note.emoji);
    setFormMediaUrl(note.mediaUrl || note.imageUrl || null);
    setFormMediaType(
      note.mediaType || (note.mediaUrl || note.imageUrl ? "image" : null)
    );
    setFormMediaName(note.mediaName || null);
    setFormIsPinned(!!note.isPinned);
    setUploadError(null);
    setIsRecordingAudio(false);
    setIsCapturingCamera(false);
    setIsModalOpen(true);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() && !formContent.trim() && !formMediaUrl) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    if (editingNoteId) {
      updateAndSaveNotes((prev) =>
        prev.map((n) =>
          n.id === editingNoteId
            ? {
                ...n,
                title: formTitle.trim() || "Nota sin título",
                content: formContent.trim(),
                color: formColor,
                category: formCategory,
                emoji: formEmoji,
                mediaUrl: formMediaUrl || undefined,
                mediaType: formMediaType || undefined,
                mediaName: formMediaName || undefined,
                imageUrl:
                  formMediaType === "image"
                    ? formMediaUrl || undefined
                    : undefined,
                isPinned: formIsPinned,
              }
            : n
        )
      );
      showToast("¡Nota actualizada con éxito! ✨");
    } else {
      const newNote: CustomNote = {
        id: "note_" + Date.now(),
        title: formTitle.trim() || "Nota sin título",
        content: formContent.trim(),
        date: formattedDate,
        color: formColor,
        category: formCategory,
        emoji: formEmoji,
        mediaUrl: formMediaUrl || undefined,
        mediaType: formMediaType || undefined,
        mediaName: formMediaName || undefined,
        imageUrl:
          formMediaType === "image" ? formMediaUrl || undefined : undefined,
        isPinned: formIsPinned,
        isAxelSpecial: false,
        createdAt: Date.now(),
        reactions: 0,
      };

      updateAndSaveNotes((prev) => [newNote, ...prev]);

      // If user was on another category, ensure it's visible by resetting to 'all' or that category
      if (activeCategory !== "all" && activeCategory !== formCategory) {
        setActiveCategory("all");
      }
      showToast("¡Guardado en tu tablón de forma permanente! 💕");
    }

    setIsModalOpen(false);
    setEditingNoteId(null);
  };

  const handleDeleteNote = (id: string, title?: string) => {
    setNoteToDelete({ id, title: title || "esta nota" });
  };

  const confirmDeleteNote = (id: string) => {
    updateAndSaveNotes((prev) => prev.filter((n) => n.id !== id));
    deleteNoteFromServer(id);
    showToast("Nota eliminada del tablón 💕");
  };

  const handleTogglePin = (id: string) => {
    updateAndSaveNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  const handleReactNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    updateAndSaveNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, reactions: (n.reactions || 0) + 1 } : n
      )
    );
  };

  const copyToClipboard = useCallback((note: CustomNote) => {
    const textToCopy = `${note.emoji} ${note.title}\n\n${note.content}\n\n📅 ${note.date}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(note.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const handleExportNotes = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `tablon_axel_sofi_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          if (
            confirm(
              `¿Deseas restaurar ${imported.length} notas desde tu copia de seguridad?`
            )
          ) {
            updateAndSaveNotes(imported);
            showToast("¡Notas restauradas con éxito! ✨");
          }
        } else {
          alert("El archivo no tiene el formato correcto.");
        }
      } catch {
        alert("Error al leer el archivo de respaldo.");
      }
    };
    e.target.value = "";
  };

  const filteredNotes = useMemo(() => {
    return notes
      .filter((n) => {
        const matchesCat =
          activeCategory === "all" || n.category === activeCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.date.toLowerCase().includes(q) ||
          (n.mediaName && n.mediaName.toLowerCase().includes(q));

        let matchesMedia = true;
        const effectiveMediaType =
          n.mediaType || (n.mediaUrl || n.imageUrl ? "image" : undefined);

        if (sortBy === "photos") {
          matchesMedia = effectiveMediaType === "image";
        } else if (sortBy === "audios") {
          matchesMedia = effectiveMediaType === "audio";
        } else if (sortBy === "videos") {
          matchesMedia = effectiveMediaType === "video";
        }

        return matchesCat && matchesSearch && matchesMedia;
      })
      .sort((a, b) => {
        if (sortBy === "pinned") {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return b.createdAt - a.createdAt;
        }
        if (sortBy === "newest") return b.createdAt - a.createdAt;
        if (sortBy === "oldest") return a.createdAt - b.createdAt;
        return b.createdAt - a.createdAt;
      });
  }, [notes, activeCategory, searchQuery, sortBy]);

  // File accept attribute based on selected media type
  const fileAcceptString = useMemo(() => {
    if (mediaUploadType === "audio") {
      return "audio/*,.mp3,.wav,.m4a,.ogg,.aac,.flac,.opus,.weba";
    }
    if (mediaUploadType === "video") {
      return "video/*,.mp4,.webm,.mov,.mkv,.avi,.3gp,.m4v";
    }
    return "image/*,.heic,.heif,.avif,.webp,.png,.jpg,.jpeg";
  }, [mediaUploadType]);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 pb-20 z-10 space-y-8 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-slate-900/90 border border-pink-500/50 backdrop-blur-xl text-white text-sm font-semibold shadow-[0_10px_30px_rgba(236,72,153,0.3)] flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-pink-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <MessageSquareHeart className="w-4 h-4 text-pink-400" />
            Muro de Recuerdos, Audios & Notas
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold flex flex-wrap items-baseline gap-3">
            <span className="text-white">Tablón de</span>
            <span className="text-pink-400 italic font-serif tracking-wide">
              Notas, Audios & Fotos
            </span>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-pink-300 animate-pulse ml-1" />
          </h2>
          <p className="text-purple-200/70 text-base sm:text-lg tracking-wide mt-1">
            Sube fotitos, notas de voz en MP3, videos y pensamientos bonitos que
            se guardan para siempre
          </p>
        </div>

        {/* Action Buttons: Add Note + Backup Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={openCreateModal}
            className="px-5 py-3 rounded-2xl bg-linear-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Nueva Nota / Audio / Foto</span>
          </button>

          {/* Backup Menu */}
          <button
            onClick={handleExportNotes}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-purple-500/20 text-purple-300 hover:text-white transition-all cursor-pointer"
            title="Descargar copia de seguridad de mis notas (JSON)"
            aria-label="Descargar copia de seguridad"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => backupInputRef.current?.click()}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-purple-500/20 text-purple-300 hover:text-white transition-all cursor-pointer"
            title="Restaurar notas desde archivo de respaldo"
            aria-label="Restaurar copia de seguridad"
          >
            <Upload className="w-4 h-4" />
          </button>
          <input
            type="file"
            ref={backupInputRef}
            accept=".json"
            onChange={handleImportNotes}
            className="hidden"
          />
        </div>
      </motion.div>

      {/* Controls Bar: Search & Category Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative w-full max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar entre tus notas, audios, fotos o recuerdos..."
            className="w-full pl-11 pr-10 py-3 bg-white/5 border border-purple-500/25 focus:border-pink-400 rounded-2xl text-sm text-white placeholder:text-purple-300/50 outline-none backdrop-blur-md transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-purple-300/60 hover:text-white rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories & Sorting Controls */}
        <div className="flex flex-col items-center gap-3">
          {/* Categories Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border cursor-pointer select-none ${
                activeCategory === "all"
                  ? "bg-pink-600 text-white border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              🌟 Todas ({notes.length})
            </button>
            {(
              Object.keys(CATEGORIES_INFO) as Array<keyof typeof CATEGORIES_INFO>
            ).map((catKey) => {
              const info = CATEGORIES_INFO[catKey];
              const count = notes.filter((n) => n.category === catKey).length;
              const isSelected = activeCategory === catKey;

              return (
                <button
                  key={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all border cursor-pointer select-none flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-pink-600 text-white border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                      : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{info.icon}</span>
                  <span>{info.label}</span>
                  <span className="opacity-70 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Sort & Media Filter Pills */}
          <div className="flex items-center gap-2 text-xs text-purple-300/70 flex-wrap justify-center">
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              Filtrar / Ordenar:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {[
                { id: "pinned" as SortOption, label: "📌 Fijadas" },
                { id: "newest" as SortOption, label: "⏱️ Más recientes" },
                { id: "oldest" as SortOption, label: "⏳ Antiguas" },
                { id: "photos" as SortOption, label: "📷 Fotos" },
                { id: "audios" as SortOption, label: "🎵 Audios MP3" },
                { id: "videos" as SortOption, label: "🎬 Videos" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    sortBy === opt.id
                      ? "bg-purple-500/30 text-white border border-purple-400/50 shadow-sm"
                      : "bg-white/5 text-purple-300/60 hover:text-white border border-transparent"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loading state indicator */}
      {isLoadingNotes && (
        <div className="p-8 text-center text-purple-300/60 flex items-center justify-center gap-2.5">
          <Loader2 className="w-5 h-5 text-pink-400 animate-spin" />
          <span className="text-sm">Cargando tus notas y recuerdos...</span>
        </div>
      )}

      {/* Grid of Notes / Memories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filteredNotes.map((note) => {
            const style = COLOR_STYLES[note.color] || COLOR_STYLES.pink;
            const effectiveMediaUrl = note.mediaUrl || note.imageUrl;
            const effectiveMediaType: MediaType | undefined =
              note.mediaType || (effectiveMediaUrl ? "image" : undefined);

            return (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                style={{ boxShadow: `0 8px 30px ${style.glow}` }}
                className={`relative rounded-3xl p-5 sm:p-6 border backdrop-blur-xl flex flex-col justify-between transition-all duration-300 ${style.bg} ${style.border} group`}
              >
                {/* Pinned Ribbon Badge */}
                {note.isPinned && (
                  <div className="absolute -top-2.5 -right-2.5 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-linear-to-r from-amber-400 to-amber-500 text-black text-[10px] font-bold tracking-wider uppercase shadow-md animate-bounce">
                    <Pin className="w-3 h-3 fill-black" />
                    <span>Fijada</span>
                  </div>
                )}

                {/* Card Header: Emoji, Category, Actions */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl sm:text-3xl select-none filter drop-shadow">
                        {note.emoji}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${style.badge}`}
                      >
                        {CATEGORIES_INFO[note.category]?.label || "General"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      {/* Copy note text */}
                      <button
                        onClick={() => copyToClipboard(note)}
                        className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                        title="Copiar texto de la nota"
                      >
                        {copiedId === note.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {/* Pin / Unpin */}
                      <button
                        onClick={() => handleTogglePin(note.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          note.isPinned
                            ? "text-amber-400 hover:text-amber-300"
                            : "text-white/40 hover:text-white hover:bg-white/10"
                        }`}
                        title={note.isPinned ? "Desfijar" : "Fijar arriba"}
                      >
                        <Pin
                          className={`w-4 h-4 ${
                            note.isPinned ? "fill-current" : ""
                          }`}
                        />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => openEditModal(note)}
                        className="p-1.5 text-white/40 hover:text-purple-300 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                        title="Editar nota"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteNote(note.id, note.title)}
                        className="p-1.5 text-white/40 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar nota del tablón"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-lg sm:text-xl font-bold tracking-tight mb-2 text-white font-serif ${
                      note.isAxelSpecial ? "text-amber-200" : ""
                    }`}
                  >
                    {note.title}
                  </h3>

                  {/* MEDIA RENDERING: IMAGE, AUDIO, VIDEO */}
                  {effectiveMediaUrl && (
                    <div className="my-3">
                      {/* 1. Image */}
                      {effectiveMediaType === "image" && (
                        <div
                          onClick={() => setPreviewImage(effectiveMediaUrl)}
                          className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden cursor-pointer group/img border border-white/10 shadow-inner bg-black/20"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={effectiveMediaUrl}
                            alt={note.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold backdrop-blur-xs">
                            <Maximize2 className="w-4 h-4" />
                            <span>Ver foto completa</span>
                          </div>
                        </div>
                      )}

                      {/* 2. Audio (MP3) */}
                      {effectiveMediaType === "audio" && (
                        <NoteAudioPlayer
                          src={effectiveMediaUrl}
                          name={note.mediaName || "Audio MP3"}
                          color={note.color}
                          onPlay={handleAudioNotePlay}
                        />
                      )}

                      {/* 3. Video */}
                      {effectiveMediaType === "video" && (
                        <div className="rounded-2xl overflow-hidden border border-white/15 bg-black shadow-lg">
                          <video
                            src={effectiveMediaUrl}
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full max-h-56 object-contain bg-black"
                          />
                          {note.mediaName && (
                            <div className="p-2 bg-black/40 text-[11px] text-purple-200/70 truncate flex items-center gap-1.5">
                              <Film className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              <span className="truncate">{note.mediaName}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Text Content */}
                  {note.content && (
                    <p className="text-white/90 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans">
                      {note.content}
                    </p>
                  )}
                </div>

                {/* Footer: Date, Reactions & Signature */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-purple-200/60">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{note.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Love reaction button */}
                    <button
                      onClick={(e) => handleReactNote(note.id, e)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-pink-500/20 text-pink-300 border border-pink-500/20 hover:border-pink-500/40 transition-all text-xs cursor-pointer select-none active:scale-90"
                      title="Enviar amor a esta nota"
                    >
                      <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 animate-heartbeat" />
                      <span className="font-semibold text-[11px]">
                        {note.reactions || 0}
                      </span>
                    </button>

                    {note.isAxelSpecial ? (
                      <span className="text-amber-300 font-serif font-semibold flex items-center gap-1">
                        De Axel :3
                      </span>
                    ) : (
                      <span className="text-pink-300/80 font-medium">
                        ✨ Sofi & Axel
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredNotes.length === 0 && !isLoadingNotes && (
        <div className="p-12 text-center text-purple-300/70 flex flex-col items-center justify-center gap-3 bg-white/5 rounded-3xl border border-purple-500/20 backdrop-blur-md">
          <StickyNote className="w-10 h-10 text-pink-400" />
          <p className="text-lg font-medium text-white">
            No hay notas en esta categoría
          </p>
          <p className="text-sm text-purple-200/60 max-w-sm">
            ¡Sé la primera en escribir algo lindo, grabar o subir una foto o
            audio para recordar!
          </p>
          <button
            onClick={openCreateModal}
            className="mt-2 px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-400 text-white text-xs font-bold transition-all cursor-pointer"
          >
            + Crear mi primera nota
          </button>
        </div>
      )}

      {/* Modal: Create or Edit Note */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isUploading && setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-lg bg-[#110d28] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{formEmoji}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white font-serif">
                      {editingNoteId
                        ? "Editar Nota o Recuerdo"
                        : "Nueva Nota o Recuerdo"}
                    </h3>
                    <p className="text-xs text-purple-300/70">
                      Personaliza con colores, fotos, audios MP3 o videos
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-white/50 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveNote} className="space-y-4">
                {/* Quick Templates Selector */}
                {!editingNoteId && (
                  <div>
                    <label className="flex text-xs font-semibold text-purple-200/80 mb-1.5 items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                        <span>Ideas Rápidas (Plantillas)</span>
                      </span>
                      <span className="text-[10px] text-purple-300/60 font-normal">
                        Toca para autocompletar
                      </span>
                    </label>
                    <div className="flex flex-wrap gap-1.5 p-2 bg-white/5 rounded-xl border border-purple-500/20">
                      {NOTE_TEMPLATES.map((tpl) => (
                        <button
                          key={tpl.name}
                          type="button"
                          onClick={() => applyTemplate(tpl)}
                          className="px-2.5 py-1 rounded-lg text-xs bg-white/5 hover:bg-pink-500/20 hover:text-pink-200 border border-purple-500/20 transition-all flex items-center gap-1.5 cursor-pointer text-purple-200/80"
                        >
                          <span>{tpl.icon}</span>
                          <span>{tpl.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-purple-200/80 mb-1.5">
                    Título de la nota
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Ej: Nuestra próxima salida al cine 🍿 o Canción bonita"
                    className="w-full px-4 py-2.5 bg-white/5 border border-purple-500/30 focus:border-pink-400 rounded-xl text-white text-sm outline-none transition-all"
                  />
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-purple-200/80">
                      Mensaje o contenido
                    </label>
                    <span className="text-[10px] text-purple-300/60 font-mono">
                      {formContent.length} caracteres
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Escribe lo que sientes, una idea o un recordatorio lindo..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-purple-500/30 focus:border-pink-400 rounded-xl text-white text-sm outline-none transition-all resize-none"
                  />
                </div>

                {/* Category & Color Selectors */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-purple-200/80 mb-1.5">
                      Categoría
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) =>
                        setFormCategory(
                          e.target.value as
                            | "amor"
                            | "metas"
                            | "recuerdos"
                            | "recordatorios"
                            | "citas"
                        )
                      }
                      className="w-full px-3 py-2.5 bg-white/5 border border-purple-500/30 focus:border-pink-400 rounded-xl text-white text-xs outline-none cursor-pointer"
                    >
                      {Object.entries(CATEGORIES_INFO).map(([key, val]) => (
                        <option
                          key={key}
                          value={key}
                          className="bg-slate-900 text-white"
                        >
                          {val.icon} {val.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-200/80 mb-1.5">
                      Color de la tarjeta
                    </label>
                    <div className="flex items-center gap-1.5 py-1">
                      {(Object.keys(COLOR_STYLES) as NoteColor[]).map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={() => setFormColor(col)}
                          className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                            col === "pink"
                              ? "bg-pink-500"
                              : col === "purple"
                              ? "bg-purple-500"
                              : col === "amber"
                              ? "bg-amber-500"
                              : col === "emerald"
                              ? "bg-emerald-500"
                              : col === "cyan"
                              ? "bg-cyan-500"
                              : col === "rose"
                              ? "bg-rose-500"
                              : "bg-indigo-500"
                          } ${
                            formColor === col
                              ? "scale-125 border-white shadow-[0_0_8px_white]"
                              : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Emoji Selector */}
                <div>
                  <label className="block text-xs font-semibold text-purple-200/80 mb-1.5">
                    Elige un sticker / emoji
                  </label>
                  <div className="flex flex-wrap gap-2 p-2 bg-white/5 rounded-xl border border-purple-500/20 max-h-24 overflow-y-auto">
                    {AVAILABLE_EMOJIS.map((em) => (
                      <button
                        key={em}
                        type="button"
                        onClick={() => setFormEmoji(em)}
                        className={`text-lg p-1.5 rounded-lg transition-transform cursor-pointer ${
                          formEmoji === em
                            ? "bg-white/20 scale-125"
                            : "hover:bg-white/10"
                        }`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>

                {/* MULTIMEDIA ATTACHMENT SECTION (PHOTO / AUDIO MP3 / VIDEO) */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-purple-500/25 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-purple-200/90 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      <span>Adjuntar Archivo (Foto, Audio MP3 o Video)</span>
                    </label>
                    {formMediaUrl && (
                      <button
                        type="button"
                        onClick={removeAttachedMedia}
                        className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Quitar archivo</span>
                      </button>
                    )}
                  </div>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept={fileAcceptString}
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {/* Media Type Tabs (if no media attached yet) */}
                  {!formMediaUrl && !isUploading && (
                    <div>
                      {isCapturingCamera ? (
                        <CameraCapture
                          onPhotoCaptured={handleMediaCaptured}
                          onCancel={() => setIsCapturingCamera(false)}
                          title="Tomar Foto para la Nota"
                        />
                      ) : isRecordingAudio ? (
                        <AudioRecorder
                          onAudioCaptured={handleMediaCaptured}
                          onCancel={() => setIsRecordingAudio(false)}
                          title="Grabar Nota de Voz para la Nota"
                        />
                      ) : (
                        <>
                          <div className="grid grid-cols-3 gap-2 mb-3">
                            <button
                              type="button"
                              onClick={() => setMediaUploadType("image")}
                              className={`py-2 px-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                                mediaUploadType === "image"
                                  ? "bg-pink-500/25 border-pink-400 text-white shadow-sm"
                                  : "bg-white/5 border-purple-500/20 text-purple-300 hover:bg-white/10"
                              }`}
                            >
                              <Camera className="w-3.5 h-3.5 text-pink-400" />
                              <span>Foto</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setMediaUploadType("audio")}
                              className={`py-2 px-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                                mediaUploadType === "audio"
                                  ? "bg-purple-500/25 border-purple-400 text-white shadow-sm"
                                  : "bg-white/5 border-purple-500/20 text-purple-300 hover:bg-white/10"
                              }`}
                            >
                              <Music className="w-3.5 h-3.5 text-purple-400" />
                              <span>Audio</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setMediaUploadType("video")}
                              className={`py-2 px-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                                mediaUploadType === "video"
                                  ? "bg-indigo-500/25 border-indigo-400 text-white shadow-sm"
                                  : "bg-white/5 border-purple-500/20 text-purple-300 hover:bg-white/10"
                              }`}
                            >
                              <Film className="w-3.5 h-3.5 text-indigo-400" />
                              <span>Video</span>
                            </button>
                          </div>

                          {/* Action buttons per media type */}
                          {mediaUploadType === "image" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              <button
                                type="button"
                                onClick={() => setIsCapturingCamera(true)}
                                className="py-4 px-3 border border-pink-500/40 hover:border-pink-400 rounded-xl bg-pink-950/20 hover:bg-pink-900/30 text-pink-200 text-xs font-semibold flex flex-col items-center justify-center gap-2 transition-all cursor-pointer shadow-xs group"
                              >
                                <div className="w-9 h-9 rounded-full bg-pink-500/20 group-hover:scale-110 flex items-center justify-center transition-transform">
                                  <Camera className="w-5 h-5 text-pink-400" />
                                </div>
                                <span className="font-bold text-white">Tomar foto ahora</span>
                                <span className="text-[10px] text-pink-300/70">Usa tu cámara o webcam</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="py-4 px-3 border border-purple-500/30 hover:border-purple-400 rounded-xl bg-purple-950/20 hover:bg-purple-900/30 text-purple-200 text-xs font-medium flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
                              >
                                <div className="w-9 h-9 rounded-full bg-purple-500/20 group-hover:scale-110 flex items-center justify-center transition-transform">
                                  <Upload className="w-5 h-5 text-purple-400" />
                                </div>
                                <span className="font-bold text-white">Subir desde archivo</span>
                                <span className="text-[10px] text-purple-300/70">JPG, PNG o WebP</span>
                              </button>
                            </div>
                          )}

                          {mediaUploadType === "audio" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              <button
                                type="button"
                                onClick={() => setIsRecordingAudio(true)}
                                className="py-4 px-3 border border-purple-500/40 hover:border-purple-400 rounded-xl bg-purple-950/25 hover:bg-purple-900/35 text-purple-200 text-xs font-semibold flex flex-col items-center justify-center gap-2 transition-all cursor-pointer shadow-xs group"
                              >
                                <div className="w-9 h-9 rounded-full bg-purple-500/20 group-hover:scale-110 flex items-center justify-center transition-transform">
                                  <Mic className="w-5 h-5 text-purple-400 animate-pulse" />
                                </div>
                                <span className="font-bold text-white">Grabar audio en vivo</span>
                                <span className="text-[10px] text-purple-300/70">Graba con tu micrófono</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="py-4 px-3 border border-purple-500/30 hover:border-purple-400 rounded-xl bg-purple-950/20 hover:bg-purple-900/30 text-purple-200 text-xs font-medium flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group"
                              >
                                <div className="w-9 h-9 rounded-full bg-purple-500/20 group-hover:scale-110 flex items-center justify-center transition-transform">
                                  <Upload className="w-5 h-5 text-purple-400" />
                                </div>
                                <span className="font-bold text-white">Subir archivo de audio</span>
                                <span className="text-[10px] text-purple-300/70">MP3, WAV o M4A</span>
                              </button>
                            </div>
                          )}

                          {mediaUploadType === "video" && (
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full py-4 px-4 border border-dashed border-indigo-500/40 hover:border-indigo-400 rounded-xl bg-indigo-950/20 hover:bg-indigo-900/30 text-indigo-200 text-xs font-medium flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <Film className="w-5 h-5 text-indigo-400" />
                              <span className="font-semibold text-white">Seleccionar Video (MP4, WebM)</span>
                              <span className="text-[10px] text-purple-400/70">
                                Se guarda de forma permanente en el servidor
                              </span>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* Uploading progress spinner */}
                  {isUploading && (
                    <div className="py-6 px-4 rounded-xl bg-black/40 border border-purple-500/30 text-center flex flex-col items-center justify-center gap-2 text-xs text-purple-200">
                      <Loader2 className="w-6 h-6 text-pink-400 animate-spin" />
                      <span className="font-semibold text-white">
                        Subiendo y guardando archivo...
                      </span>
                      <span className="text-[10px] text-purple-300/60">
                        Procesando en el servidor para que permanezca siempre visible
                      </span>
                    </div>
                  )}

                  {/* Upload Error feedback */}
                  {uploadError && (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  {/* Live Media Previews inside Modal */}
                  {formMediaUrl && !isUploading && (
                    <div className="space-y-2">
                      {formMediaType === "image" && (
                        <div className="relative w-full h-36 rounded-xl overflow-hidden border border-purple-400/40 group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={formMediaUrl}
                            alt="Vista previa de imagen adjunta a la nota de amor"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeAttachedMedia}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-rose-600 transition-colors cursor-pointer"
                            title="Eliminar foto"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {formMediaType === "audio" && (
                        <div>
                          <NoteAudioPlayer
                            src={formMediaUrl}
                            name={formMediaName || "Audio MP3"}
                            color={formColor}
                            onPlay={handleAudioNotePlay}
                          />
                        </div>
                      )}

                      {formMediaType === "video" && (
                        <div className="relative rounded-xl overflow-hidden border border-purple-400/40 bg-black">
                          <video
                            src={formMediaUrl}
                            controls
                            playsInline
                            className="w-full max-h-44 object-contain"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Pin to top checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="pinCheckbox"
                    checked={formIsPinned}
                    onChange={(e) => setFormIsPinned(e.target.checked)}
                    className="w-4 h-4 accent-pink-500 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="pinCheckbox"
                    className="text-xs text-purple-200/90 cursor-pointer flex items-center gap-1"
                  >
                    <Pin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Fijar esta nota al inicio del tablón</span>
                  </label>
                </div>

                {/* Submit button / Delete option if editing */}
                {editingNoteId ? (
                  <div className="flex items-center gap-2.5 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        const currentNote = notes.find((n) => n.id === editingNoteId);
                        setIsModalOpen(false);
                        if (currentNote) {
                          setNoteToDelete({ id: currentNote.id, title: currentNote.title });
                        }
                      }}
                      className="py-3 px-4 rounded-xl border border-rose-500/30 hover:border-rose-400/50 hover:bg-rose-500/10 text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      title="Eliminar esta nota del tablón"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Eliminar</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isUploading}
                      className={`flex-1 py-3 rounded-xl bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all cursor-pointer ${
                        isUploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isUploading
                        ? "Subiendo archivo... Espera un momento"
                        : "Guardar Cambios ✨"}
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isUploading}
                    className={`w-full mt-4 py-3 rounded-xl bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all cursor-pointer ${
                      isUploading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isUploading
                      ? "Subiendo archivo... Espera un momento"
                      : "Guardar en mi Tablón ✨"}
                  </button>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox / Preview Full-screen for Attached Note Image */}
      <AnimatePresence>
        {previewImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] z-10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage}
                alt="Fotografía o recuerdo ampliado adjunto a la nota de amor"
                className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl border border-purple-500/30"
              />
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-3 -right-3 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-500 transition-colors shadow-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {noteToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNoteToDelete(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="relative w-full max-w-sm rounded-3xl bg-neutral-900 border border-rose-500/30 p-6 text-center shadow-[0_10px_40px_rgba(244,63,94,0.3)] z-10 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-serif">
                  ¿Eliminar nota del tablón?
                </h3>
                <p className="text-xs text-purple-200/80 mt-1 line-clamp-2">
                  &ldquo;{noteToDelete.title}&rdquo;
                </p>
                <p className="text-[11px] text-white/50 mt-1.5">
                  Esta nota se quitará del muro de recuerdos permanentemente.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNoteToDelete(null)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white/80 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    confirmDeleteNote(noteToDelete.id);
                    setNoteToDelete(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all cursor-pointer"
                >
                  Sí, eliminar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
