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
  Lock,
  Edit3,
  Copy,
  Check,
  Download,
  Upload,
} from "lucide-react";

export type NoteColor =
  | "purple"
  | "pink"
  | "amber"
  | "emerald"
  | "cyan"
  | "rose"
  | "indigo";

export type NoteCategory =
  | "all"
  | "amor"
  | "metas"
  | "recuerdos"
  | "recordatorios"
  | "citas";

export interface CustomNote {
  id: string;
  title: string;
  content: string;
  date: string;
  color: NoteColor;
  category: "amor" | "metas" | "recuerdos" | "recordatorios" | "citas";
  emoji: string;
  imageUrl?: string;
  isPinned?: boolean;
  isAxelSpecial?: boolean;
  createdAt: number;
  reactions?: number;
}

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
    starter: "Mi cielo, hoy quería decirte lo mucho que te amo y lo infinitamente agradecido que estoy de tenerte a mi lado...",
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
    name: "Idea para Cita",
    icon: "🍿",
    title: "Plan para nuestra próxima salida",
    category: "citas",
    color: "purple",
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
    starter: "¡Tú puedes con todo lo que te propongas! Recuerda tomar agüita, descansar y que cuentas conmigo siempre.",
  },
];

export type SortOption = "pinned" | "newest" | "oldest" | "photos";

// Canvas image compressor to avoid exceeding LocalStorage quota
function compressImage(file: File, maxWidth = 900, maxHeight = 900, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export default function NotesSection() {
  const [notes, setNotes] = useState<CustomNote[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_axel_pinboard_notes");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
    }
    return [INITIAL_AXEL_NOTE];
  });

  const [activeCategory, setActiveCategory] = useState<NoteCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("pinned");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formColor, setFormColor] = useState<NoteColor>("pink");
  const [formCategory, setFormCategory] = useState<
    "amor" | "metas" | "recuerdos" | "recordatorios" | "citas"
  >("amor");
  const [formEmoji, setFormEmoji] = useState("💖");
  const [formImageBase64, setFormImageBase64] = useState<string | null>(null);
  const [formIsPinned, setFormIsPinned] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const backupInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("sofi_axel_pinboard_notes", JSON.stringify(notes));
    } catch (e) {
      console.warn("Storage quota exceeded or error saving notes:", e);
    }
  }, [notes]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const compressed = await compressImage(file);
      setFormImageBase64(compressed);
    } catch (err) {
      console.error("Error compressing image:", err);
      alert("Hubo un error al procesar la imagen.");
    } finally {
      setIsCompressing(false);
    }
  };

  const openCreateModal = () => {
    setEditingNoteId(null);
    setFormTitle("");
    setFormContent("");
    setFormColor("pink");
    setFormCategory("amor");
    setFormEmoji("💖");
    setFormImageBase64(null);
    setFormIsPinned(false);
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
    setFormImageBase64(note.imageUrl || null);
    setFormIsPinned(!!note.isPinned);
    setIsModalOpen(true);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() && !formContent.trim()) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    if (editingNoteId) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNoteId
            ? {
                ...n,
                title: formTitle.trim() || "Nota sin título",
                content: formContent.trim(),
                color: formColor,
                category: formCategory,
                emoji: formEmoji,
                imageUrl: formImageBase64 || undefined,
                isPinned: formIsPinned,
              }
            : n
        )
      );
    } else {
      const newNote: CustomNote = {
        id: "note_" + Date.now(),
        title: formTitle.trim() || "Nota sin título",
        content: formContent.trim(),
        date: formattedDate,
        color: formColor,
        category: formCategory,
        emoji: formEmoji,
        imageUrl: formImageBase64 || undefined,
        isPinned: formIsPinned,
        isAxelSpecial: false,
        createdAt: Date.now(),
        reactions: 0,
      };
      setNotes((prev) => [newNote, ...prev]);
    }

    setIsModalOpen(false);
    setEditingNoteId(null);
  };

  const handleDeleteNote = (id: string) => {
    if (confirm("¿Estás segura de eliminar esta nota de tu tablón? 💕")) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const handleTogglePin = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  const handleReactNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes((prev) =>
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
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `notas_axel_sofi_${new Date().toISOString().slice(0, 10)}.json`);
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
          if (confirm(`¿Deseas restaurar ${imported.length} notas desde tu copia de seguridad?`)) {
            setNotes(imported);
            alert("¡Notas restauradas con éxito! ✨");
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
          n.date.toLowerCase().includes(q);
        const matchesPhotos = sortBy === "photos" ? !!n.imageUrl : true;
        return matchesCat && matchesSearch && matchesPhotos;
      })
      .sort((a, b) => {
        if (sortBy === "pinned") {
          if (a.isPinned && !b.isPinned) return -1;
          if (!a.isPinned && b.isPinned) return 1;
          return b.createdAt - a.createdAt;
        }
        if (sortBy === "newest") return b.createdAt - a.createdAt;
        if (sortBy === "oldest") return a.createdAt - b.createdAt;
        if (sortBy === "photos") return b.createdAt - a.createdAt;
        return 0;
      });
  }, [notes, activeCategory, searchQuery, sortBy]);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 pb-20 z-10 space-y-8">
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
            Muro de Recuerdos & Notas
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold flex flex-wrap items-baseline gap-3">
            <span className="text-white">Tablón de</span>
            <span className="text-pink-400 italic font-serif tracking-wide">
              Notas & Fotos
            </span>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-pink-300 animate-pulse ml-1" />
          </h2>
          <p className="text-purple-200/70 text-base sm:text-lg tracking-wide mt-1">
            Un rincón interactivo para subir fotitos, crear notas bonitas, metas y pensamientos que se guardan en tu dispositivo
          </p>
        </div>

        {/* Action Buttons: Add Note + Backup Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={openCreateModal}
            className="px-5 py-3 rounded-2xl bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Nueva Nota / Foto</span>
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
            placeholder="Buscar entre tus notas, recuerdos o mensajes..."
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

          {/* Sort Pills */}
          <div className="flex items-center gap-2 text-xs text-purple-300/70">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Ordenar:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: "pinned" as SortOption, label: "📌 Fijadas" },
                { id: "newest" as SortOption, label: "⏱️ Más recientes" },
                { id: "oldest" as SortOption, label: "⏳ Antiguas" },
                { id: "photos" as SortOption, label: "📷 Con fotos" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    sortBy === opt.id
                      ? "bg-purple-500/30 text-white border border-purple-400/50"
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

      {/* Grid of Notes / Memories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filteredNotes.map((note) => {
            const style = COLOR_STYLES[note.color] || COLOR_STYLES.pink;

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
                        <Pin className={`w-4 h-4 ${note.isPinned ? "fill-current" : ""}`} />
                      </button>

                      {/* Edit (only for custom notes) */}
                      {!note.isAxelSpecial && (
                        <button
                          onClick={() => openEditModal(note)}
                          className="p-1.5 text-white/40 hover:text-purple-300 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                          title="Editar nota"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}

                      {/* Delete */}
                      {!note.isAxelSpecial ? (
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-1.5 text-white/40 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                          title="Eliminar nota"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <span
                          className="p-1.5 text-amber-400/80"
                          title="Nota especial fijada por Axel"
                        >
                          <Lock className="w-3.5 h-3.5" />
                        </span>
                      )}
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

                  {/* Attached Image if any */}
                  {note.imageUrl && (
                    <div
                      onClick={() => setPreviewImage(note.imageUrl!)}
                      className="relative w-full h-44 sm:h-52 my-3 rounded-2xl overflow-hidden cursor-pointer group/img border border-white/10 shadow-inner bg-black/20"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={note.imageUrl}
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

                  {/* Text Content */}
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans">
                    {note.content}
                  </p>
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
                      <span className="font-semibold text-[11px]">{note.reactions || 0}</span>
                    </button>

                    {note.isAxelSpecial ? (
                      <span className="text-amber-300 font-serif font-semibold flex items-center gap-1">
                        De Axel :3
                      </span>
                    ) : (
                      <span className="text-pink-300/80 font-medium">✨ Sofi & Axel</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredNotes.length === 0 && (
        <div className="p-12 text-center text-purple-300/70 flex flex-col items-center justify-center gap-3 bg-white/5 rounded-3xl border border-purple-500/20 backdrop-blur-md">
          <StickyNote className="w-10 h-10 text-pink-400" />
          <p className="text-lg font-medium text-white">No hay notas en esta categoría</p>
          <p className="text-sm text-purple-200/60 max-w-sm">
            ¡Sé la primera en escribir algo lindo o subir una foto para recordar!
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
              onClick={() => setIsModalOpen(false)}
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
                      {editingNoteId ? "Editar Nota o Recuerdo" : "Nueva Nota o Recuerdo"}
                    </h3>
                    <p className="text-xs text-purple-300/70">
                      Personaliza con colores, fotos y emojis
                    </p>
                  </div>
                </div>
                <button
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
                    placeholder="Ej: Nuestra próxima salida al cine 🍿"
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
                    required
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
                        <option key={key} value={key} className="bg-slate-900 text-white">
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
                  <div className="flex flex-wrap gap-2 p-2 bg-white/5 rounded-xl border border-purple-500/20">
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

                {/* Photo Upload (with Canvas auto-compression) */}
                <div>
                  <label className="block text-xs font-semibold text-purple-200/80 mb-1.5">
                    Adjuntar Foto (Opcional · Se optimiza automáticamente)
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {isCompressing ? (
                    <div className="py-3 px-4 rounded-xl bg-white/5 border border-purple-500/30 text-center text-xs text-purple-300 animate-pulse">
                      Optimizando imagen... 📸
                    </div>
                  ) : formImageBase64 ? (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden border border-purple-400/40 group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formImageBase64}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormImageBase64(null)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-rose-600 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-3 px-4 border border-dashed border-purple-500/40 hover:border-pink-400 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Camera className="w-4 h-4 text-pink-400" />
                      <span>Subir foto desde tu dispositivo</span>
                    </button>
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

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full mt-4 py-3 rounded-xl bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all cursor-pointer"
                >
                  {editingNoteId ? "Guardar Cambios ✨" : "Guardar en mi Tablón ✨"}
                </button>
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
                alt="Foto adjunta"
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
    </section>
  );
}
