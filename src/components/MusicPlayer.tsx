"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Heart, Music } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
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
            Canción que me hace pensar en ti
          </h3>
          <Heart className="w-5 h-5 text-purple-400 fill-purple-400 animate-heartbeat" />
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 sm:p-8 w-full shadow-[0_10px_40px_rgba(168,85,247,0.15)] relative overflow-hidden group">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-600/10 via-transparent to-purple-900/20 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

          <audio 
            ref={audioRef} 
            src="/music/THINGS YOU DO.mp3" 
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onLoadedMetadata={handleTimeUpdate}
          />

          <div className="flex flex-col items-center relative z-10">
            {/* Album Cover */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8">
              <motion.div 
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full overflow-hidden border-4 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] relative"
              >
                <Image
                  src="/music/swag.png" 
                  alt="Album Cover" 
                  fill
                  className="object-cover"
                />
                {/* Vinyl hole */}
                <div className="absolute inset-0 m-auto w-12 h-12 bg-[#050505] rounded-full border-2 border-purple-500/30 flex items-center justify-center shadow-inner">
                   <div className="w-3 h-3 bg-purple-500/50 rounded-full"></div>
                </div>
              </motion.div>
            </div>

            {/* Song Info */}
            <div className="text-center w-full mb-8">
              <h4 className="text-2xl font-bold text-white mb-2 tracking-wide drop-shadow-md">THINGS YOU DO</h4>
              <p className="text-purple-300/90 font-medium tracking-widest uppercase text-sm flex items-center justify-center gap-2">
                <Music className="w-4 h-4 animate-heartbeat" /> Para mi amor
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full mb-8">
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
            <div className="flex items-center justify-center gap-8 w-full">
              <button 
                className="text-purple-300/50 hover:text-purple-300 hover:scale-110 transition-all"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    setProgress(0);
                  }
                }}
              >
                <SkipBack className="w-7 h-7 fill-current animate-heartbeat" />
              </button>
              
              <button 
                onClick={togglePlay}
                className="w-16 h-16 flex items-center justify-center bg-linear-to-br from-purple-400 to-purple-600 text-white rounded-full shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:scale-110 hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-current animate-heartbeat" />
                ) : (
                  <Play className="w-7 h-7 fill-current ml-1 animate-heartbeat" />
                )}
              </button>
              
              <button 
                className="text-purple-300/50 hover:text-purple-300 hover:scale-110 transition-all"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = duration;
                  }
                }}
              >
                <SkipForward className="w-7 h-7 fill-current animate-heartbeat" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
