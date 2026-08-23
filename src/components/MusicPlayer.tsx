"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Heart, Music, ChevronDown, Volume2, VolumeX, Volume1, Shuffle, Repeat, Repeat1 } from "lucide-react";
import { useMusic } from "@/context/MusicContext";

export default function MusicPlayer() {
  const {
    songs,
    currentIndex,
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    direction,
    togglePlay,
    playSong,
    handleNext,
    handlePrev,
    handleProgressChange,
    handleVolumeChange,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    formatTime,
  } = useMusic();

  const [showPlaylist, setShowPlaylist] = useState(false);

  const handleSelectSong = (index: number) => {
    playSong(index);
    setShowPlaylist(false);
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 mt-8 sm:mt-16 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-5 h-5 text-purple-400 fill-purple-400 animate-heartbeat" />
          <h3 className="text-xl sm:text-2xl font-serif italic text-purple-200 tracking-wide text-center">
            Canciones que me hacen pensar en ti
          </h3>
          <Heart className="w-5 h-5 text-purple-400 fill-purple-400 animate-heartbeat" />
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 sm:p-8 w-full shadow-[0_10px_40px_rgba(168,85,247,0.15)] relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-600/10 via-transparent to-purple-900/20 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="flex flex-col items-center relative z-10">
            {/* Album Cover with slide animation */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ x: d * 80, opacity: 0, scale: 0.85 }),
                    center: { x: 0, opacity: 1, scale: 1 },
                    exit: (d: number) => ({ x: d * -80, opacity: 0, scale: 0.85 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div
                    className="w-full h-full rounded-full overflow-hidden border-4 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] relative animate-spin"
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
                      sizes="(max-width: 640px) 192px, 224px"
                      className="object-cover"
                      priority
                    />
                    {/* Vinyl hole */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#050505] rounded-full border-2 border-purple-500/30 flex items-center justify-center shadow-inner">
                      <div className="w-3 h-3 bg-purple-500/50 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Song Info with slide animation */}
            <div className="text-center w-full mb-6 min-h-16">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ x: d * 40, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (d: number) => ({ x: d * -40, opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                >
                  <h4 className="text-2xl font-bold text-white mb-2 tracking-wide drop-shadow-md">
                    {currentSong.title}
                  </h4>
                  <p className="text-purple-300/90 font-medium tracking-widest uppercase text-sm flex items-center justify-center gap-2">
                    <Music className="w-4 h-4 animate-heartbeat" /> Para mi amor
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Song counter hint */}
            <div className="flex items-center gap-2 mb-5">
              {songs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectSong(i)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i === currentIndex
                      ? "w-5 h-2 bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                      : "w-2 h-2 bg-purple-700/60 hover:bg-purple-500/80"
                  }`}
                  aria-label={`Ir a ${songs[i].title}`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full mb-6">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={progress}
                onChange={(e) => handleProgressChange(Number(e.target.value))}
                className="w-full h-2 bg-purple-900/50 rounded-full appearance-none cursor-pointer accent-purple-400 shadow-inner"
              />
              <div className="flex justify-between text-sm text-purple-300/80 mt-2 font-mono font-medium">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Controls with Shuffle & Repeat */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 w-full mb-5">
              <button
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  isShuffle
                    ? "text-purple-300 bg-purple-500/20 border border-purple-400/40 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                    : "text-purple-300/40 hover:text-purple-300/80"
                }`}
                onClick={toggleShuffle}
                aria-label="Modo aleatorio"
                title={isShuffle ? "Aleatorio: Activado" : "Aleatorio: Desactivado"}
              >
                <Shuffle className="w-4 h-4" />
              </button>

              <button
                className="text-purple-300/70 hover:text-purple-300 hover:scale-110 transition-all active:scale-90 p-1 cursor-pointer"
                onClick={handlePrev}
                aria-label="Canción anterior"
              >
                <SkipBack className="w-6 h-6 fill-current" />
              </button>

              <button
                onClick={togglePlay}
                className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-linear-to-br from-purple-400 to-purple-600 text-white rounded-full shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:scale-110 hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all active:scale-95 cursor-pointer"
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
                ) : (
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
                )}
              </button>

              <button
                className="text-purple-300/70 hover:text-purple-300 hover:scale-110 transition-all active:scale-90 p-1 cursor-pointer"
                onClick={handleNext}
                aria-label="Siguiente canción"
              >
                <SkipForward className="w-6 h-6 fill-current" />
              </button>

              <button
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  repeatMode !== "off"
                    ? "text-purple-300 bg-purple-500/20 border border-purple-400/40 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                    : "text-purple-300/40 hover:text-purple-300/80"
                }`}
                onClick={toggleRepeat}
                aria-label="Repetir"
                title={repeatMode === "all" ? "Repetir todo" : repeatMode === "one" ? "Repetir esta canción" : "Repetir: Desactivado"}
              >
                {repeatMode === "one" ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
              </button>
            </div>

            {/* Volume Control Bar */}
            <div className="flex items-center gap-3 w-full max-w-[240px] px-2 py-1.5 rounded-full bg-white/5 border border-purple-500/10 mb-6">
              <button
                onClick={toggleMute}
                className="text-purple-300/70 hover:text-white transition-colors cursor-pointer"
                aria-label={isMuted ? "Desactivar silencio" : "Silenciar"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-purple-950 rounded-full appearance-none cursor-pointer accent-purple-400"
                aria-label="Control de volumen"
              />
              <span className="text-[10px] font-mono text-purple-300/60 w-7 text-right">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>

            {/* Show playlist button */}
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="flex items-center gap-2 text-purple-400/70 hover:text-purple-300 text-xs tracking-widest uppercase font-medium transition-all hover:gap-3 cursor-pointer"
              aria-label="Ver lista de canciones"
            >
              <span>Ver playlist</span>
              <motion.div animate={{ rotate: showPlaylist ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Playlist Dropdown */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="w-full mt-3 bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(168,85,247,0.12)]"
            >
              {songs.map((song, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectSong(index)}
                  className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-all duration-200 hover:bg-purple-500/10 cursor-pointer ${
                    index === currentIndex ? "bg-purple-500/15 border-l-2 border-purple-400" : "border-l-2 border-transparent"
                  } ${index !== songs.length - 1 ? "border-b border-purple-500/10" : ""}`}
                >
                  <span className="text-xs text-purple-500/60 font-mono w-5 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${index === currentIndex && isPlaying ? "bg-purple-400 animate-pulse" : "bg-purple-700/40"}`} />
                  <span className={`text-sm font-medium tracking-wide ${index === currentIndex ? "text-purple-200" : "text-purple-300/60"}`}>
                    {song.title}
                  </span>
                  {index === currentIndex && isPlaying && (
                    <span className="ml-auto text-xs text-purple-400 animate-pulse">♪</span>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
