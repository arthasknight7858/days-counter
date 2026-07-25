"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import BackgroundEffects from "@/components/BackgroundEffects";
import Counter from "@/components/Counter";
import MusicPlayer from "@/components/MusicPlayer";
import AboutSofi from "@/components/AboutSofi";
import Albums from "@/components/Albums";

export default function Home() {
  // 08.07.2026 - July 8th, 2026
  const startDate = new Date(2026, 6, 8, 0, 0, 0);

  return (
    <main className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden font-sans">
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
            <Heart className="w-12 h-12 text-purple-400 fill-purple-400" />
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
        <Counter startDate={startDate} />
      </div>

      {/* Music Player Section */}
      <div className="z-10 w-full mt-4 sm:mt-8">
        <MusicPlayer />
      </div>

      {/* About Section */}
      <div className="z-10 w-full mt-10">
        <AboutSofi />
      </div>

      {/* Albums Section */}
      <div className="z-10 w-full mt-10">
        <Albums />
      </div>
    </main>
  );
}
