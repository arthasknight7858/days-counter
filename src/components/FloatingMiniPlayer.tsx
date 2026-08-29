"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Music, Volume2, VolumeX } from "lucide-react";
import { useMusic } from "@/context/MusicContext";

interface FloatingMiniPlayerProps {
  activeSection: string;
  onGoToMusic: () => void;
}

export default function FloatingMiniPlayer({ activeSection, onGoToMusic }: FloatingMiniPlayerProps) {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    handleNext,
    handlePrev,
    progress,
    duration,
    isMuted,
    toggleMute,
    formatTime,
  } = useMusic();

  // Solo mostrar el mini player si no estamos en la sección "para-ti"
  const shouldShow = activeSection !== "para-ti";

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-4 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50 pointer-events-auto"
        >
          <div className="bg-slate-950/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-2.5 sm:p-3.5 shadow-[0_10px_35px_rgba(168,85,247,0.35)] flex items-center justify-between gap-3 text-white">
            {/* Left: Album cover with spinning disc + info */}
            <div
              className="flex items-center gap-3 cursor-pointer group min-w-0 flex-1"
              onClick={onGoToMusic}
              title="Volver al reproductor principal"
            >
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0">
                <div
                  className="w-full h-full rounded-full overflow-hidden border-2 border-purple-400/50 shadow-[0_0_12px_rgba(168,85,247,0.5)] relative animate-spin"
                  style={{
                    animationDuration: "8s",
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                    animationPlayState: isPlaying ? "running" : "paused",
                  }}
                >
                  <Image
                    src={currentSong.cover}
                    alt={currentSong.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#050505] rounded-full border border-purple-500/30" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                  {currentSong.title}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-purple-300/70 font-medium">
                  <Music className="w-3 h-3 text-purple-400 animate-pulse" />
                  <span className="truncate">{formatTime(progress)} / {formatTime(duration)}</span>

                  {/* Dynamic mini equalizer */}
                  <div className="flex items-end gap-0.5 h-2.5 ml-1">
                    {[1, 2, 3].map((b) => (
                      <motion.span
                        key={b}
                        animate={
                          isPlaying
                            ? { height: ["20%", "100%", "30%"] }
                            : { height: "20%" }
                        }
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: b * 0.15,
                          ease: "easeInOut",
                        }}
                        className="w-0.5 bg-purple-400 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                onClick={toggleMute}
                className="p-1.5 text-purple-300/60 hover:text-white rounded-full transition-colors cursor-pointer hidden xs:flex"
                aria-label={isMuted ? "Desactivar silencio" : "Silenciar"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={handlePrev}
                className="p-1.5 text-purple-300/70 hover:text-purple-200 transition-transform active:scale-90 cursor-pointer"
                aria-label="Canción anterior"
              >
                <SkipBack className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={togglePlay}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-linear-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all active:scale-95 cursor-pointer"
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-1.5 text-purple-300/70 hover:text-purple-200 transition-transform active:scale-90 cursor-pointer"
                aria-label="Siguiente canción"
              >
                <SkipForward className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
