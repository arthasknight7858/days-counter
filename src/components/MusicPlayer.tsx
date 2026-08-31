"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  Music,
  ChevronDown,
  Volume2,
  VolumeX,
  Volume1,
  Shuffle,
  Repeat,
  Repeat1,
  Keyboard,
  Search,
  X,
  ListMusic,
  Sparkles,
} from "lucide-react";
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
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [playlistSearch, setPlaylistSearch] = useState("");

  const filteredSongs = useMemo(() => {
    if (!playlistSearch.trim()) return songs;
    const q = playlistSearch.toLowerCase().trim();
    return songs.filter((s) => s.title.toLowerCase().includes(q));
  }, [songs, playlistSearch]);

  const handleSelectSong = (index: number) => {
    playSong(index);
    setShowPlaylist(false);
    setPlaylistSearch("");
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
          <div className="absolute inset-0 bg-linear-to-br from-purple-600/10 via-transparent to-purple-900/20 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="flex flex-col items-center relative z-10">
            {/* Album Cover with slide animation and spinning vinyl */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({
                      x: d * 80,
                      opacity: 0,
                      scale: 0.85,
                    }),
                    center: { x: 0, opacity: 1, scale: 1 },
                    exit: (d: number) => ({
                      x: d * -80,
                      opacity: 0,
                      scale: 0.85,
                    }),
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
                      priority
                      className="object-cover"
                    />
                    {/* Vinyl Center Hole */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#0a071b] rounded-full border-4 border-purple-500/30 flex items-center justify-center">
                      <div className="w-3 h-3 bg-purple-400 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Song Info */}
            <div className="text-center mb-6 w-full">
              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-wide truncate">
                {currentSong.title}
              </h4>
              <p className="text-xs uppercase tracking-widest text-purple-300/70 mt-1 font-semibold flex items-center justify-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-purple-400" />
                <span>Nuestra Playlist ({currentIndex + 1} de {songs.length})</span>
              </p>
            </div>

            {/* Progress Bar with smooth scrubbing */}
            <div className="w-full mb-6">
              <div className="relative flex items-center group/slider">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={progress}
                  onChange={(e) => handleProgressChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-400 focus:outline-none"
                />
              </div>
              <div className="flex justify-between text-xs text-purple-300/60 font-mono mt-2">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Audio Spectrum Visualizer */}
            <div className="flex items-end justify-center gap-1 h-5 mb-6">
              {[0.4, 0.9, 0.5, 0.8, 0.3, 1, 0.6, 0.7, 0.3, 0.8, 0.5, 0.9].map((height, i) => (
                <motion.span
                  key={i}
                  animate={
                    isPlaying
                      ? {
                          height: [
                            `${height * 25}%`,
                            `${Math.min(100, height * 100 + 20)}%`,
                            `${height * 25}%`,
                          ],
                        }
                      : { height: "20%" }
                  }
                  transition={{
                    duration: 0.55,
                    repeat: Infinity,
                    delay: (i % 4) * 0.1,
                    ease: "easeInOut",
                  }}
                  className="w-1 bg-linear-to-t from-purple-500 to-fuchsia-400 rounded-full"
                />
              ))}
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-between w-full mb-6 px-2">
              {/* Shuffle */}
              <button
                onClick={toggleShuffle}
                className={`p-2.5 rounded-full transition-all cursor-pointer ${
                  isShuffle
                    ? "text-purple-400 bg-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                    : "text-purple-300/50 hover:text-white hover:bg-white/5"
                }`}
                title={isShuffle ? "Aleatorio activado" : "Activar aleatorio"}
              >
                <Shuffle className="w-4 h-4" />
              </button>

              {/* Prev */}
              <button
                onClick={handlePrev}
                className="text-purple-300 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all transform active:scale-95 cursor-pointer"
                title="Canción anterior (Shift + Flecha Izq)"
              >
                <SkipBack className="w-6 h-6 fill-current" />
              </button>

              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title={isPlaying ? "Pausar (Espacio)" : "Reproducir (Espacio)"}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-current" />
                ) : (
                  <Play className="w-8 h-8 fill-current ml-1" />
                )}
              </button>

              {/* Next */}
              <button
                onClick={handleNext}
                className="text-purple-300 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all transform active:scale-95 cursor-pointer"
                title="Siguiente canción (Shift + Flecha Der)"
              >
                <SkipForward className="w-6 h-6 fill-current" />
              </button>

              {/* Repeat */}
              <button
                onClick={toggleRepeat}
                className={`p-2.5 rounded-full transition-all cursor-pointer ${
                  repeatMode !== "off"
                    ? "text-purple-400 bg-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                    : "text-purple-300/50 hover:text-white hover:bg-white/5"
                }`}
                title={
                  repeatMode === "all"
                    ? "Repetir todo"
                    : repeatMode === "one"
                    ? "Repetir una canción"
                    : "No repetir"
                }
              >
                {repeatMode === "one" ? (
                  <Repeat1 className="w-4 h-4" />
                ) : (
                  <Repeat className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 w-full px-2 mb-6">
              <button
                onClick={toggleMute}
                className="text-purple-300/70 hover:text-white transition-colors cursor-pointer"
                title={isMuted ? "Desactivar silencio (M)" : "Silenciar (M)"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-400 focus:outline-none"
              />
              <span className="text-[11px] font-mono text-purple-300/60 w-8 text-right">
                {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
              </span>
            </div>

            {/* Secondary Toolbar: Playlist & Shortcuts */}
            <div className="flex items-center justify-between w-full pt-4 border-t border-purple-500/20 text-xs">
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="flex items-center gap-1.5 text-purple-300/80 hover:text-purple-200 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
              >
                <ListMusic className="w-3.5 h-3.5 text-purple-400" />
                <span>Lista ({songs.length})</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    showPlaylist ? "rotate-180" : ""
                  }`}
                />
              </button>

              <button
                onClick={() => setShowShortcuts(!showShortcuts)}
                className="flex items-center gap-1 text-purple-300/60 hover:text-purple-200 px-2 py-1 transition-colors cursor-pointer"
                title="Ver atajos de teclado"
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span>Atajos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Shortcuts Dropdown */}
        <AnimatePresence>
          {showShortcuts && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full mt-3 bg-slate-950/80 border border-purple-500/20 rounded-2xl p-4 text-xs text-purple-200/80 backdrop-blur-md"
            >
              <p className="font-bold text-white mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Atajos de teclado globales:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-purple-300">Espacio</kbd> Play / Pausa</div>
                <div><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-purple-300">M</kbd> Silenciar / Activar</div>
                <div><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-purple-300">Shift + →</kbd> Siguiente</div>
                <div><kbd className="px-1.5 py-0.5 bg-white/10 rounded text-purple-300">Shift + ←</kbd> Anterior</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playlist Modal / Accordion */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              className="w-full mt-4 bg-slate-950/90 border border-purple-500/30 rounded-2xl p-4 shadow-xl backdrop-blur-xl max-h-80 flex flex-col"
            >
              {/* Search in Playlist */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-400" />
                <input
                  type="text"
                  value={playlistSearch}
                  onChange={(e) => setPlaylistSearch(e.target.value)}
                  placeholder="Buscar canción..."
                  className="w-full pl-9 pr-8 py-1.5 bg-white/5 border border-purple-500/20 focus:border-purple-400 rounded-xl text-xs text-white placeholder:text-purple-300/50 outline-none"
                />
                {playlistSearch && (
                  <button
                    onClick={() => setPlaylistSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-white/50 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Song List */}
              <div className="overflow-y-auto space-y-1 flex-1 pr-1">
                {filteredSongs.map((song) => {
                  const originalIdx = songs.findIndex((s) => s.file === song.file);
                  const isCurrent = originalIdx === currentIndex;

                  return (
                    <button
                      key={song.file}
                      onClick={() => handleSelectSong(originalIdx)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all text-xs cursor-pointer ${
                        isCurrent
                          ? "bg-purple-600/30 text-white border border-purple-500/40"
                          : "hover:bg-white/5 text-purple-200/80"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="w-4 font-mono text-[10px] text-purple-400 shrink-0">
                          {(originalIdx + 1).toString().padStart(2, "0")}
                        </span>
                        <span className="truncate font-medium">{song.title}</span>
                      </div>

                      {isCurrent && (
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                          <span className="text-[10px] font-bold text-purple-300">
                            {isPlaying ? "Sonando" : "Pausada"}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
