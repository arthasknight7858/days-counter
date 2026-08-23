"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import BackgroundEffects from "@/components/BackgroundEffects";
import Counter from "@/components/Counter";
import SectionTabs, { SectionType } from "@/components/SectionTabs";
import MusicPlayer from "@/components/MusicPlayer";
import FloatingMiniPlayer from "@/components/FloatingMiniPlayer";
import AboutSofi from "@/components/AboutSofi";
import Albums from "@/components/Albums";
import LettersAccordion from "@/components/LettersAccordion";
import EducationalSection from "@/components/EducationalSection";
import ExerciseSection from "@/components/ExerciseSection";
import NotesSection from "@/components/NotesSection";
import { MusicProvider } from "@/context/MusicContext";

// 08.07.2026 - July 8th, 2026 (Definido fuera del componente para evitar re-instanciaciones)
const START_DATE = new Date(2026, 6, 8, 0, 0, 0);

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionType>("para-ti");

  return (
    <MusicProvider>
      <main className="min-h-screen w-full relative flex flex-col items-center justify-start p-4 sm:p-8 overflow-hidden font-sans" suppressHydrationWarning>
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

          {/* Navigation Tabs (Para ti, Educativo, Ejercicio, Notas) */}
          <SectionTabs activeSection={activeSection} onChangeSection={setActiveSection} />
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
              {/* Music Player Section */}
              <div className="z-10 w-full mt-2 sm:mt-4">
                <MusicPlayer />
              </div>

              {/* About Section */}
              <div className="z-10 w-full mt-10">
                <AboutSofi />
              </div>

              {/* Letters Section */}
              <div className="z-10 w-full mt-10">
                <LettersAccordion />
              </div>

              {/* Albums Section */}
              <div className="z-10 w-full mt-10">
                <Albums />
              </div>
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
        </AnimatePresence>

        {/* Floating Mini Player for when browsing outside 'para-ti' */}
        <FloatingMiniPlayer
          activeSection={activeSection}
          onGoToMusic={() => setActiveSection("para-ti")}
        />
      </main>
    </MusicProvider>
  );
}

