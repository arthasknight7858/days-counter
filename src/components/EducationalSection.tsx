"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, BrainCircuit, Landmark, Loader2 } from "lucide-react";

// Skeletons de carga dinámicos para reducir el bundle JS inicial
const RoadmapSkeleton = ({ title }: { title: string }) => (
  <div className="w-full p-8 sm:p-12 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md flex flex-col items-center justify-center gap-4 min-h-[300px]">
    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
    <p className="text-purple-200/80 font-medium text-sm sm:text-base animate-pulse">
      Cargando guía de {title}...
    </p>
  </div>
);

const EnglishRoadmap = dynamic(() => import("./educational/EnglishRoadmap"), {
  loading: () => <RoadmapSkeleton title="Inglés" />,
});

const KoreanRoadmap = dynamic(() => import("./educational/KoreanRoadmap"), {
  loading: () => <RoadmapSkeleton title="Coreano" />,
});

const FrenchRoadmap = dynamic(() => import("./educational/FrenchRoadmap"), {
  loading: () => <RoadmapSkeleton title="Francés" />,
});

const SocialCommunicationRoadmap = dynamic(() => import("./educational/SocialCommunicationRoadmap"), {
  loading: () => <RoadmapSkeleton title="Comunicación Social" />,
});

const ArchitectureRoadmap = dynamic(() => import("./educational/ArchitectureRoadmap"), {
  loading: () => <RoadmapSkeleton title="Arquitectura" />,
});

const HabitsRoadmap = dynamic(() => import("./educational/HabitsRoadmap"), {
  loading: () => <RoadmapSkeleton title="Hábitos & Productividad" />,
});

export type EducationalTopic = "ingles" | "coreano" | "frances" | "comunicacion" | "arquitectura" | "desarrollo";

export default function EducationalSection() {
  const [activeTopic, setActiveTopic] = useState<EducationalTopic>("ingles");

  const topics = [
    {
      id: "ingles" as EducationalTopic,
      label: "🇬🇧 Inglés",
      icon: BookOpen,
    },
    {
      id: "coreano" as EducationalTopic,
      label: "🇰🇷 Coreano",
      icon: BookOpen,
    },
    {
      id: "frances" as EducationalTopic,
      label: "🇫🇷 Francés",
      icon: BookOpen,
    },
    {
      id: "comunicacion" as EducationalTopic,
      label: "🎙️ Comunicación Social",
      icon: BookOpen,
    },
    {
      id: "arquitectura" as EducationalTopic,
      label: "🏛️ Arquitectura",
      icon: Landmark,
    },
    {
      id: "desarrollo" as EducationalTopic,
      label: "🧠 Hábitos & Productividad",
      icon: BrainCircuit,
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 pb-20 z-10">
      {/* Educational Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 sm:mb-10 text-left"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3">
          <GraduationCap className="w-4 h-4 text-purple-400" />
          Rincón de Aprendizaje
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold mb-3 flex flex-wrap items-baseline gap-3">
          <span className="text-white">Espacio</span>
          <span className="text-purple-400 italic font-serif tracking-wide">Educativo</span>
        </h2>
        <p className="text-purple-200/70 text-base sm:text-lg tracking-wide">
          Guías, recursos y conocimientos preparados con amor para tu crecimiento continuo
        </p>
      </motion.div>

      {/* Clean Module Switcher Bar (Fully Responsive & Wrapped) */}
      <div className="mb-10 w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {topics.map((t) => {
          const isActive = activeTopic === t.id;
          const Icon = t.icon;

          return (
            <button
              key={t.id}
              onClick={() => setActiveTopic(t.id)}
              className={`relative px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer border select-none ${
                isActive
                  ? "bg-purple-600/90 text-white border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-102"
                  : "bg-white/5 text-purple-200/70 border-purple-500/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-purple-400"}`} />
              <span className="whitespace-nowrap">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Topic Content Switcher */}
      <AnimatePresence mode="wait">
        {activeTopic === "ingles" && (
          <motion.div
            key="ingles"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <EnglishRoadmap />
          </motion.div>
        )}

        {activeTopic === "coreano" && (
          <motion.div
            key="coreano"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <KoreanRoadmap />
          </motion.div>
        )}

        {activeTopic === "frances" && (
          <motion.div
            key="frances"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <FrenchRoadmap />
          </motion.div>
        )}

        {activeTopic === "comunicacion" && (
          <motion.div
            key="comunicacion"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <SocialCommunicationRoadmap />
          </motion.div>
        )}

        {activeTopic === "arquitectura" && (
          <motion.div
            key="arquitectura"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <ArchitectureRoadmap />
          </motion.div>
        )}

        {activeTopic === "desarrollo" && (
          <motion.div
            key="desarrollo"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <HabitsRoadmap />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
