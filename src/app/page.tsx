"use client";

import { useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import BackgroundEffects from "@/components/BackgroundEffects";
import Counter from "@/components/Counter";
import SectionTabs, { SectionType } from "@/components/SectionTabs";
import MusicPlayer from "@/components/MusicPlayer";
import FloatingMiniPlayer from "@/components/FloatingMiniPlayer";
import AboutSofi from "@/components/AboutSofi";
import Albums from "@/components/Albums";
import LettersAccordion from "@/components/LettersAccordion";
import BackToTop from "@/components/BackToTop";
import { MusicProvider } from "@/context/MusicContext";

// Skeletons de carga dinámicos para optimizar el bundle JS inicial
const SectionLoadingSkeleton = ({ title }: { title: string }) => (
  <div className="w-full max-w-5xl mx-auto p-8 sm:p-12 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md flex flex-col items-center justify-center gap-4 min-h-75">
    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
    <p className="text-purple-200/80 font-medium text-sm sm:text-base animate-pulse">
      Cargando {title}...
    </p>
  </div>
);

const BirthdaysSection = dynamic(() => import("@/components/BirthdaysSection"), {
  loading: () => <SectionLoadingSkeleton title="Cumpleaños de ambos" />,
});

const NicknamesSection = dynamic(() => import("@/components/NicknamesSection"), {
  loading: () => <SectionLoadingSkeleton title="Nuestros lindos apodos" />,
});

const EducationalSection = dynamic(() => import("@/components/EducationalSection"), {
  loading: () => <SectionLoadingSkeleton title="Espacio Educativo" />,
});

const ExerciseSection = dynamic(() => import("@/components/ExerciseSection"), {
  loading: () => <SectionLoadingSkeleton title="Rutinas de Ejercicio" />,
});

const NotesSection = dynamic(() => import("@/components/NotesSection"), {
  loading: () => <SectionLoadingSkeleton title="Tablón de Notas" />,
});

const KeepInMindSection = dynamic(() => import("@/components/KeepInMindSection"), {
  loading: () => <SectionLoadingSkeleton title="Recomendaciones" />,
});

const LoveContactForm = dynamic(() => import("@/components/LoveContactForm"), {
  loading: () => <SectionLoadingSkeleton title="Buzón de Mensajes" />,
});

const FaqAndReviewsSection = dynamic(() => import("@/components/FaqAndReviewsSection"), {
  loading: () => <SectionLoadingSkeleton title="Preguntas Frecuentes y Recuerdos" />,
});

// 08.07.2026 - July 8th, 2026
const START_DATE = new Date(2026, 6, 8, 0, 0, 0);

const emptySubscribe = () => () => {};

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionType>("para-ti");
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const getSectionLabel = (sec: SectionType) => {
    switch (sec) {
      case "para-ti":
        return "Para ti";
      case "apodos":
        return "Apodos";
      case "cumpleanos":
        return "Cumpleaños";
      case "educativo":
        return "Espacio Educativo";
      case "ejercicio":
        return "Rutinas de Ejercicio";
      case "notas":
        return "Tablón de Notas";
      case "a-tener-en-cuenta":
        return "Recomendaciones";
      default:
        return "Inicio";
    }
  };

  if (!mounted) {
    return (
      <main className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden font-sans bg-[#070514]" suppressHydrationWarning>
        <BackgroundEffects />
      </main>
    );
  }

  return (
    <MusicProvider>
      <main className="min-h-screen w-full relative flex flex-col items-center justify-start p-4 sm:p-8 pb-24 sm:pb-12 overflow-hidden font-sans" suppressHydrationWarning>
        <BackgroundEffects />

        <div className="z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
          {/* Floating Heart Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="mb-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                filter: ["drop-shadow(0 0 10px rgba(168,85,247,0.5))", "drop-shadow(0 0 25px rgba(217,70,239,0.8))", "drop-shadow(0 0 10px rgba(168,85,247,0.5))"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-12 h-12 text-purple-400 fill-purple-400 animate-heartbeat" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-4 flex flex-wrap justify-center gap-x-4 items-center">
              <span className="bg-clip-text text-transparent bg-linear-to-br from-white via-purple-100 to-purple-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Axel</span>
              <span className="text-4xl sm:text-5xl md:text-6xl text-purple-400 font-light italic">&</span>
              <span className="bg-clip-text text-transparent bg-linear-to-br from-white via-purple-100 to-purple-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Sofía</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl font-medium text-purple-200/80 tracking-widest uppercase mt-4 sm:mt-6"
            >
              Desde el 8 de Julio de 2026
            </motion.p>
          </motion.div>

          {/* Separator line */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="w-32 sm:w-64 h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent mt-10 mb-2"
          />

          {/* Counter Component */}
          <Counter startDate={START_DATE} />

          {/* CTA ANTES DEL SCROLL (Above the fold CTA bar) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-2.5 my-5 z-10 px-2"
          >
            <button
              onClick={() => {
                setActiveSection("para-ti");
                setTimeout(() => {
                  const el = document.getElementById("buzon");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>💌</span>
              <span>Dejar Mensajito</span>
            </button>
            <a
              href="#musica"
              onClick={() => setActiveSection("para-ti")}
              className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white border border-purple-500/20 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-xs"
            >
              <span>🎵</span>
              <span>Nuestra Música</span>
            </a>
            <a
              href="#albumes"
              onClick={() => setActiveSection("para-ti")}
              className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white border border-purple-500/20 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-xs"
            >
              <span>📸</span>
              <span>Ver Álbumes</span>
            </a>
            <button
              onClick={() => {
                setActiveSection("para-ti");
                setTimeout(() => {
                  const el = document.getElementById("faqs");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
              className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white border border-purple-500/20 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
            >
              <span>✨</span>
              <span>Hitos & FAQs</span>
            </button>
          </motion.div>

          {/* Navigation Tabs */}
          <SectionTabs activeSection={activeSection} onChangeSection={setActiveSection} />

          {/* MIGAS DE PAN (Breadcrumbs) */}
          <nav aria-label="Migas de pan" className="z-10 flex items-center gap-2 text-xs text-purple-300/70 my-3 px-4 py-1.5 rounded-full bg-white/5 border border-purple-500/15 backdrop-blur-md">
            <button
              type="button"
              onClick={() => {
                setActiveSection("para-ti");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-purple-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>🏠</span>
              <span>Inicio</span>
            </button>
            <span className="text-purple-500/50">/</span>
            <button
              type="button"
              onClick={() => setActiveSection("para-ti")}
              className="hover:text-purple-200 transition-colors cursor-pointer"
            >
              Axel & Sofía
            </button>
            <span className="text-purple-500/50">/</span>
            <span className="text-white font-medium">
              {getSectionLabel(activeSection)}
            </span>
          </nav>
        </div>

        {/* Dynamic Sections Content */}
        <AnimatePresence mode="wait">
          {activeSection === "para-ti" && (
            <motion.div
              key="para-ti"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              {/* Quick Jump Navigation Chips */}
              <div className="z-10 flex flex-wrap items-center justify-center gap-2 mt-1 mb-4 px-2">
                {[
                  { label: "Música", icon: "🎵", href: "#musica" },
                  { label: "Sobre Sofi", icon: "🌸", href: "#sobre-sofi" },
                  { label: "Cartas", icon: "💌", href: "#cartas" },
                  { label: "Álbumes & Favoritas", icon: "📸", href: "#albumes" },
                  { label: "Buzón de Amor", icon: "✍️", href: "#buzon" },
                  { label: "Hitos & FAQs", icon: "❓", href: "#faqs" },
                ].map((chip) => (
                  <a
                    key={chip.label}
                    href={chip.href}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white border border-purple-500/20 hover:border-purple-400/40 transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <span>{chip.icon}</span>
                    <span>{chip.label}</span>
                  </a>
                ))}
              </div>

              {/* Music Player Section */}
              <div id="musica" className="z-10 w-full mt-4">
                <MusicPlayer />
              </div>

              {/* About Section */}
              <div id="sobre-sofi" className="z-10 w-full mt-10">
                <AboutSofi />
              </div>

              {/* Letters Section */}
              <div id="cartas" className="z-10 w-full mt-10">
                <LettersAccordion />
              </div>

              {/* Albums Section */}
              <div id="albumes" className="z-10 w-full mt-10">
                <Albums />
              </div>

              {/* Love Contact Form (Buzón de Mensajes & Dedicatorias) */}
              <div id="buzon" className="z-10 w-full mt-10">
                <LoveContactForm />
              </div>

              {/* FAQs, Hitos, Equipo y Reseñas de Amor */}
              <div id="faqs" className="z-10 w-full mt-10">
                <FaqAndReviewsSection />
              </div>
            </motion.div>
          )}

          {activeSection === "apodos" && (
            <motion.div
              key="apodos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full mt-2 sm:mt-4"
            >
              <NicknamesSection />
            </motion.div>
          )}

          {activeSection === "cumpleanos" && (
            <motion.div
              key="cumpleanos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full mt-2 sm:mt-4"
            >
              <BirthdaysSection />
            </motion.div>
          )}

          {activeSection === "educativo" && (
            <motion.div
              key="educativo"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full mt-2 sm:mt-4"
            >
              <EducationalSection />
            </motion.div>
          )}

          {activeSection === "ejercicio" && (
            <motion.div
              key="ejercicio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full mt-2 sm:mt-4"
            >
              <ExerciseSection />
            </motion.div>
          )}

          {activeSection === "notas" && (
            <motion.div
              key="notas"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full mt-2 sm:mt-4"
            >
              <NotesSection />
            </motion.div>
          )}

          {activeSection === "a-tener-en-cuenta" && (
            <motion.div
              key="a-tener-en-cuenta"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full mt-2 sm:mt-4"
            >
              <KeepInMindSection />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Mini Player for when browsing outside 'para-ti' */}
        <FloatingMiniPlayer
          activeSection={activeSection}
          onGoToMusic={() => setActiveSection("para-ti")}
        />

        {/* STICKY MOBILE NAVIGATION DOCK (CTA fijo en móvil) */}
        <div className="sm:hidden fixed bottom-3 left-3 right-3 z-40 bg-slate-950/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl py-2 px-3 flex items-center justify-around shadow-[0_10px_30px_rgba(168,85,247,0.35)]">
          {[
            { id: "para-ti", label: "Para ti", icon: "💖" },
            { id: "notas", label: "Notas", icon: "💌" },
            { id: "educativo", label: "Estudio", icon: "📚" },
            { id: "ejercicio", label: "Fitness", icon: "⚡" },
            { id: "apodos", label: "Apodos", icon: "✨" },
          ].map((tab) => {
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSection(tab.id as SectionType);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "text-purple-300 font-semibold scale-110"
                    : "text-purple-300/60 hover:text-white"
                }`}
              >
                <span className="text-base leading-none">{tab.icon}</span>
                <span className="text-[10px] leading-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Floating Back to Top with circular scroll indicator */}
        <BackToTop />
      </main>
    </MusicProvider>
  );
}
