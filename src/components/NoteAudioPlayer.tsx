"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Music, Download } from "lucide-react";
import { NoteColor } from "@/types/notes";

interface NoteAudioPlayerProps {
  src: string;
  name?: string;
  color?: NoteColor;
  onPlay?: () => void;
}

function formatAudioTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function NoteAudioPlayer({
  src,
  name,
  color = "pink",
  onPlay,
}: NoteAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
    };
    const onEnded = () => setIsPlaying(false);
    const onPlayEvent = () => {
      setIsPlaying(true);
      if (onPlay) onPlay();
    };
    const onPauseEvent = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("canplay", updateDuration);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlayEvent);
    audio.addEventListener("pause", onPauseEvent);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("canplay", updateDuration);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlayEvent);
      audio.removeEventListener("pause", onPauseEvent);
    };
  }, [src, onPlay]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.warn("Audio play blocked:", err));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Theme accents based on card color
  const colorMap: Record<NoteColor, { btn: string; bar: string; wave: string }> = {
    pink: {
      btn: "from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white shadow-pink-500/30",
      bar: "bg-pink-500",
      wave: "bg-pink-400",
    },
    purple: {
      btn: "from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white shadow-purple-500/30",
      bar: "bg-purple-500",
      wave: "bg-purple-400",
    },
    amber: {
      btn: "from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-amber-500/30",
      bar: "bg-amber-500",
      wave: "bg-amber-400",
    },
    emerald: {
      btn: "from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-500/30",
      bar: "bg-emerald-500",
      wave: "bg-emerald-400",
    },
    cyan: {
      btn: "from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-cyan-500/30",
      bar: "bg-cyan-500",
      wave: "bg-cyan-400",
    },
    rose: {
      btn: "from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white shadow-rose-500/30",
      bar: "bg-rose-500",
      wave: "bg-rose-400",
    },
    indigo: {
      btn: "from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-indigo-500/30",
      bar: "bg-indigo-500",
      wave: "bg-indigo-400",
    },
  };

  const theme = colorMap[color] || colorMap.pink;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="my-3 p-3.5 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md flex flex-col gap-2.5 transition-all shadow-inner"
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Top bar: Music info & wave animation */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="p-1.5 rounded-lg bg-white/10 text-white/80 shrink-0">
            <Music className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium text-white/90 truncate text-xs">
            {name || "Mensaje de Audio / MP3"}
          </span>
        </div>

        {/* Animated Sound Wave Bars when playing */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3 shrink-0">
            {[40, 90, 60, 100, 50].map((h, i) => (
              <span
                key={i}
                className={`w-0.75 rounded-full ${theme.wave} animate-pulse`}
                style={{
                  height: `${h}%`,
                  animationDuration: `${0.4 + i * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Player Controls & Scrubber */}
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          className={`w-9 h-9 rounded-full bg-linear-to-tr ${theme.btn} shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 shrink-0`}
          title={isPlaying ? "Pausar audio" : "Reproducir audio"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-white" />
          ) : (
            <Play className="w-4 h-4 fill-white ml-0.5" />
          )}
        </button>

        {/* Scrubber & Time Display */}
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <div className="relative w-full flex items-center group">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              disabled={isLoading || duration === 0}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white transition-all focus:outline-hidden"
              style={{
                background: `linear-gradient(to right, currentColor ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`,
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-white/60 font-mono">
            <span>{formatAudioTime(currentTime)}</span>
            <span>{isLoading ? "Cargando..." : formatAudioTime(duration)}</span>
          </div>
        </div>

        {/* Mute toggle */}
        <button
          type="button"
          onClick={toggleMute}
          className="p-1.5 text-white/50 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
          title={isMuted ? "Activar sonido" : "Silenciar"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Download file */}
        <a
          href={src}
          download={name || "audio.mp3"}
          className="p-1.5 text-white/50 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
          title="Descargar archivo de audio"
        >
          <Download className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
