"use client";

import { motion } from "framer-motion";
import { Heart, GraduationCap, Dumbbell, Sparkles, StickyNote, BookmarkCheck } from "lucide-react";

export type SectionType = "para-ti" | "educativo" | "ejercicio" | "notas" | "a-tener-en-cuenta";

interface SectionTabsProps {
  activeSection: SectionType;
  onChangeSection: (section: SectionType) => void;
}

export default function SectionTabs({ activeSection, onChangeSection }: SectionTabsProps) {
  const tabs = [
    {
      id: "para-ti" as SectionType,
      label: "Para ti",
      icon: Heart,
      badge: "💖 Especial",
    },
    {
      id: "educativo" as SectionType,
      label: "Educativo",
      icon: GraduationCap,
      badge: "📚 Aprende",
    },
    {
      id: "ejercicio" as SectionType,
      label: "Ejercicio",
      icon: Dumbbell,
      badge: "⚡ Fitness",
    },
    {
      id: "notas" as SectionType,
      label: "Notas",
      icon: StickyNote,
      badge: "📝 Mensajes",
    },
    {
      id: "a-tener-en-cuenta" as SectionType,
      label: "A tener en cuenta",
      icon: BookmarkCheck,
      badge: "💡 Especial",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center my-6 sm:my-10 z-20 px-4">
      {/* Glow background behind tabs */}
      <div className="relative p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-white/5 backdrop-blur-xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)] flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-2">
        {tabs.map((tab) => {
          const isActive = activeSection === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeSection(tab.id)}
              className={`relative px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl sm:rounded-full font-medium text-sm sm:text-base transition-all duration-300 flex items-center gap-2.5 cursor-pointer select-none outline-none ${
                isActive
                  ? "text-white font-semibold shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                  : "text-purple-200/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSectionIndicator"
                  className="absolute inset-0 bg-linear-to-r from-purple-600/90 via-fuchsia-600/90 to-purple-600/90 rounded-xl sm:rounded-full -z-10 border border-purple-300/40"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <Icon
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                  isActive ? "text-white scale-110 animate-heartbeat" : "text-purple-400 group-hover:scale-110"
                }`}
              />
              <span className="tracking-wide">{tab.label}</span>

              {isActive && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="hidden md:inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs"
                >
                  <Sparkles className="w-2.5 h-2.5 mr-1 text-purple-200" />
                  Activo
                </motion.span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
