"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

export interface Song {
  title: string;
  file: string;
  cover: string;
}

export const songs: Song[] = [
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
    title: "INTENTIONS",
    file: "/music/Intentions.mp3",
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
  {
    title: "AGAIN",
    file: "/music/Again.mp3",
    cover: "/music/swag.png",
  },
  {
    title: "DRIVE",
    file: "/music/Drive.mp4",
    cover: "/music/swag.png",
  },
  {
    title: "GIVE ME LOVE",
    file: "/music/Give Me Love.mp3",
    cover: "/music/swag.png",
  },
  {
    title: "PERFECT",
    file: "/music/Perfect.mp3",
    cover: "/music/swag.png",
  },
  {
    title: "PHOTOGRAPH",
    file: "/music/Photograph.mp3",
    cover: "/music/swag.png",
  },
  {
    title: "SHAPE OF YOU",
    file: "/music/Shape of You.mp3",
    cover: "/music/swag.png",
  },
  {
    title: "THERE'S NOTHING HOLDING ME BACK",
    file: "/music/There's Nothing Holding Me Back.mp3",
    cover: "/music/swag.png",
  },
  {
    title: "THINKING OUT LOUD",
    file: "/music/Thinking out Loud.mp3",
    cover: "/music/swag.png",
  },
  {
    title: "WHEREVER YOU WILL GO",
    file: "/music/Wherever You Will Go.mp3",
    cover: "/music/swag.png",
  },
];

interface MusicContextType {
  songs: Song[];
  currentIndex: number;
  currentSong: Song;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  repeatMode: "off" | "all" | "one";
  direction: 1 | -1;
  togglePlay: () => void;
  playSong: (index: number) => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleProgressChange: (newTime: number) => void;
  handleVolumeChange: (newVol: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  formatTime: (time: number) => string;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  // Lazy state initializers to avoid hydration/render sync issues
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sofi_music_song_idx");
        if (saved !== null) {
          const idx = parseInt(saved, 10);
          if (!isNaN(idx) && idx >= 0 && idx < songs.length) return idx;
        }
      } catch {}
    }
    return 0;
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState<number>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedVol = localStorage.getItem("sofi_music_volume");
        if (savedVol !== null) {
          const v = parseFloat(savedVol);
          if (!isNaN(v) && v >= 0 && v <= 1) return v;
        }
      } catch {}
    }
    return 0.85;
  });

  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("all");
  const [direction, setDirection] = useState<1 | -1>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = songs[currentIndex] || songs[0];

  // Sync audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Persist song index
  useEffect(() => {
    try {
      localStorage.setItem("sofi_music_song_idx", currentIndex.toString());
    } catch {}
  }, [currentIndex]);

  // Handle song source changes
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

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [isPlaying]);

  const handleNext = useCallback(() => {
    setDirection(1);
    if (isShuffle) {
      const nextIdx = Math.floor(Math.random() * songs.length);
      setCurrentIndex(nextIdx);
    } else {
      setCurrentIndex((prev) => (prev + 1) % songs.length);
    }
  }, [isShuffle]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    if (isShuffle) {
      const prevIdx = Math.floor(Math.random() * songs.length);
      setCurrentIndex(prevIdx);
    } else {
      setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    }
  }, [isShuffle]);

  const playSong = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsPlaying(true);
  }, [currentIndex]);

  const handleSongEnd = useCallback(() => {
    if (repeatMode === "one") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    } else if (repeatMode === "all") {
      handleNext();
      setIsPlaying(true);
    } else {
      if (currentIndex < songs.length - 1) {
        handleNext();
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  }, [repeatMode, handleNext, currentIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleProgressChange = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    if (isMuted) setIsMuted(false);
    try {
      localStorage.setItem("sofi_music_volume", clamped.toString());
    } catch {}
  };

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      if (prev === "off") return "all";
      if (prev === "all") return "one";
      return "off";
    });
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Global keyboard shortcuts (Space, M, Shift+ArrowLeft, Shift+ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m" || e.key === "M") {
        toggleMute();
      } else if (e.key === "ArrowRight" && e.shiftKey) {
        handleNext();
      } else if (e.key === "ArrowLeft" && e.shiftKey) {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, toggleMute, handleNext, handlePrev]);

  return (
    <MusicContext.Provider
      value={{
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
      }}
    >
      <audio
        ref={audioRef}
        src={encodeURI(currentSong.file)}
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onCanPlay={handleTimeUpdate}
        onEnded={handleSongEnd}
        onError={() => {
          setIsPlaying(false);
        }}
        preload="metadata"
      />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
