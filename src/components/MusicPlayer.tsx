"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Heart, Music, ChevronDown } from "lucide-react";

const songs = [
  {
    title: "THINGS YOU DO",
    file: "/music/THINGS YOU DO.mp3",
    cover: "/music/swag.png",
  },
  {
    title: "COME AROUND ME",
    file: "/music/Come Around Me.mp3",
    cover: "/music/changes.jpg",
  },
  {
    title: "SAILOR SONG",
    file: "/music/001 - Sailor Song.mp3",
    cover: "/music/swag.png",
  },
  {
    title: "DUSK TILL DAWN",
    file: "/music/002 - Dusk Till Dawn (Radio Edit).mp3",
    cover: "/music/swag.png",
  },
  {
    title: "RIPTIDE",
    file: "/music/003 - Riptide.mp3",
    cover: "/music/swag.png",
  },
  {
    title: "BETTER MAN",
    file: "/music/BETTER MAN.mp3",
    cover: "/music/swag.png",
  },
  {
    title: "BUTTERFLIES",
    file: "/music/BUTTERFLIES.mp3",
    cover: "/music/swag.png",
  },
  {
    title: "DAISIES",
    file: "/music/DAISIES.mp3",
    cover: "/music/swag.png",
  },
  {
    title: "LOVE SONG",
    file: "/music/LOVE SONG.mp3",
    cover: "/music/swag.png",
  },
];

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = songs[currentIndex];

  // When song changes, load and optionally autoplay
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setProgress(0);
      setDuration(0);
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const handleSongEnd = () => {
    handleNext();
    setIsPlaying(true);
  };

  const handleSelectSong = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsPlaying(true);
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

          <audio
            ref={audioRef}
            src={currentSong.file}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleSongEnd}
            onLoadedMetadata={handleTimeUpdate}
          />

          <div className="flex flex-col items-center relative z-10">
            {/* Album Cover with slide animation */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8 overflow-hidden rounded-full">
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
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full rounded-full overflow-hidden border-4 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] relative"
                  >
                    <Image
                      src={currentSong.cover}
                      alt={currentSong.title}
                      fill
                      className="object-cover"
                    />
                    {/* Vinyl hole */}
                    <div className="absolute inset-0 m-auto w-12 h-12 bg-[#050505] rounded-full border-2 border-purple-500/30 flex items-center justify-center shadow-inner" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute" }}>
                      <div className="w-3 h-3 bg-purple-500/50 rounded-full"></div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Song Info with slide animation */}
            <div className="text-center w-full mb-6 min-h-[64px]">
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
                  className={`transition-all duration-300 rounded-full ${
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
                onChange={handleProgressChange}
                className="w-full h-2 bg-purple-900/50 rounded-full appearance-none cursor-pointer accent-purple-400 shadow-inner"
              />
              <div className="flex justify-between text-sm text-purple-300/80 mt-2 font-mono font-medium">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8 w-full mb-5">
              <button
                className="text-purple-300/70 hover:text-purple-300 hover:scale-110 transition-all active:scale-90"
                onClick={handlePrev}
                aria-label="Canción anterior"
              >
                <SkipBack className="w-7 h-7 fill-current" />
              </button>

              <button
                onClick={togglePlay}
                className="w-16 h-16 flex items-center justify-center bg-linear-to-br from-purple-400 to-purple-600 text-white rounded-full shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:scale-110 hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all active:scale-95"
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-current" />
                ) : (
                  <Play className="w-7 h-7 fill-current ml-1" />
                )}
              </button>

              <button
                className="text-purple-300/70 hover:text-purple-300 hover:scale-110 transition-all active:scale-90"
                onClick={handleNext}
                aria-label="Siguiente canción"
              >
                <SkipForward className="w-7 h-7 fill-current" />
              </button>
            </div>

            {/* Show playlist button */}
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="flex items-center gap-2 text-purple-400/70 hover:text-purple-300 text-xs tracking-widest uppercase font-medium transition-all hover:gap-3"
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
                  className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-all duration-200 hover:bg-purple-500/10 ${
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
