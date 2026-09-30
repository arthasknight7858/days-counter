"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  Square,
  Play,
  Pause,
  RotateCcw,
  Check,
  X,
  Volume2,
  AlertCircle,
} from "lucide-react";

interface AudioRecorderProps {
  onAudioCaptured: (file: File) => void;
  onCancel?: () => void;
  title?: string;
}

export default function AudioRecorder({
  onAudioCaptured,
  onCancel,
  title = "Grabar Nota de Voz",
}: AudioRecorderProps) {
  const [recordingState, setRecordingState] = useState<
    "idle" | "recording" | "paused" | "recorded"
  >("idle");
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [previewProgress, setPreviewProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [volumeLevels, setVolumeLevels] = useState<number[]>([10, 15, 8, 20, 12, 25, 18, 14]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(remainingSecs).padStart(2, "0")}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Audio waveform visualizer loop
  const updateVisualizer = useCallback(() => {
    function loop() {
      if (!analyserRef.current) return;
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Pick 10 sample bands across frequencies
      const step = Math.floor(dataArray.length / 10);
      const newLevels = Array.from({ length: 10 }).map((_, i) => {
        const val = dataArray[i * step] || 0;
        return Math.max(10, Math.min(100, Math.round((val / 255) * 100)));
      });

      setVolumeLevels(newLevels);
      animationFrameRef.current = requestAnimationFrame(loop);
    }

    loop();
  }, []);

  const startRecording = async () => {
    setErrorMessage(null);
    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error("Tu navegador no soporta grabación de audio");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      // Audio context for visualizer
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        audioContextRef.current = ctx;
        analyserRef.current = analyser;
        updateVisualizer();
      } catch (err) {
        console.warn("Visualizer not supported or failed:", err);
      }

      // Pick supported mime type
      const mimeTypes = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/mp4",
        "audio/ogg",
        "",
      ];
      let selectedMime = "";
      for (const mime of mimeTypes) {
        if (!mime || MediaRecorder.isTypeSupported(mime)) {
          selectedMime = mime;
          break;
        }
      }

      const recorder = new MediaRecorder(
        stream,
        selectedMime ? { mimeType: selectedMime } : undefined
      );
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const mime = recorder.mimeType || "audio/webm";
        const blob = new Blob(audioChunksRef.current, { type: mime });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        setRecordingState("recorded");

        // Stop visualizer
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (audioContextRef.current && audioContextRef.current.state !== "closed") {
          audioContextRef.current.close().catch(() => {});
        }
        // Stop stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };

      recorder.start(200); // 200ms slices
      setRecordingState("recording");
      setDuration(0);

      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: unknown) {
      console.error("Error accessing microphone:", err);
      let msg = "No se pudo acceder al micrófono.";
      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          msg = "Permiso denegado. Permite el acceso al micrófono en tu navegador para grabar.";
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          msg = "No se detectó ningún micrófono en este dispositivo.";
        }
      }
      setErrorMessage(msg);
      setRecordingState("idle");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingState("paused");
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
      setRecordingState("recording");
    }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const cancelRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setAudioBlob(null);
    setRecordingState("idle");
    setDuration(0);
    if (onCancel) onCancel();
  };

  const resetRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setAudioBlob(null);
    setRecordingState("idle");
    setDuration(0);
    setIsPlayingPreview(false);
  };

  const togglePreviewPlay = () => {
    if (!previewAudioRef.current) return;
    if (isPlayingPreview) {
      previewAudioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      previewAudioRef.current.play();
      setIsPlayingPreview(true);
    }
  };

  const confirmAudio = () => {
    if (!audioBlob) return;
    const extension = audioBlob.type.includes("mp4")
      ? "m4a"
      : audioBlob.type.includes("ogg")
      ? "ogg"
      : "webm";
    const file = new File(
      [audioBlob],
      `audio_grabado_${Date.now()}.${extension}`,
      { type: audioBlob.type || "audio/webm" }
    );
    onAudioCaptured(file);
  };

  return (
    <div className="w-full p-4 sm:p-5 rounded-2xl bg-black/40 border border-purple-500/30 backdrop-blur-md flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center">
            <Mic className="w-4 h-4 text-purple-300" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide">{title}</h4>
            <p className="text-[11px] text-purple-300/70">
              Graba tu voz directamente desde el micrófono
            </p>
          </div>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={cancelRecording}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
            title="Cerrar grabadora"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="w-full p-3 mb-4 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STATE 1: IDLE */}
      {recordingState === "idle" && (
        <div className="flex flex-col items-center justify-center py-4 w-full text-center">
          <motion.button
            type="button"
            onClick={startRecording}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full bg-linear-to-tr from-purple-600 via-pink-600 to-rose-500 flex items-center justify-center text-white shadow-[0_0_25px_rgba(217,70,239,0.5)] cursor-pointer mb-3"
          >
            <Mic className="w-7 h-7" />
          </motion.button>
          <span className="text-xs font-semibold text-white">
            Toca el micrófono para comenzar a grabar
          </span>
          <span className="text-[11px] text-purple-300/60 mt-1">
            Ideal para notas de voz cariñosas, dedicatorias o mensajes de amor
          </span>
        </div>
      )}

      {/* STATE 2: RECORDING OR PAUSED */}
      {(recordingState === "recording" || recordingState === "paused") && (
        <div className="flex flex-col items-center justify-center w-full py-2">
          {/* Pulsing indicator & Timer */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex items-center justify-center">
              <span
                className={`w-3 h-3 rounded-full ${
                  recordingState === "recording"
                    ? "bg-rose-500 animate-ping"
                    : "bg-amber-400"
                }`}
              />
              <span
                className={`absolute w-3 h-3 rounded-full ${
                  recordingState === "recording" ? "bg-rose-500" : "bg-amber-400"
                }`}
              />
            </div>
            <span className="text-2xl font-mono font-bold text-white tracking-widest">
              {formatTime(duration)}
            </span>
            <span className="text-xs text-purple-300/70 uppercase tracking-wider font-semibold">
              {recordingState === "recording" ? "Grabando..." : "En pausa"}
            </span>
          </div>

          {/* Sound wave visualizer bars */}
          <div className="flex items-center justify-center gap-1.5 h-14 w-full max-w-xs mb-5 bg-purple-950/30 rounded-xl px-4 border border-purple-500/20">
            {volumeLevels.map((lvl, idx) => (
              <motion.div
                key={idx}
                animate={{
                  height: recordingState === "recording" ? `${Math.max(12, lvl)}%` : "15%",
                }}
                transition={{ duration: 0.1 }}
                className="w-1.5 rounded-full bg-linear-to-t from-purple-500 to-pink-400"
              />
            ))}
          </div>

          {/* Controls: Pause/Resume, Stop */}
          <div className="flex items-center gap-3">
            {recordingState === "recording" ? (
              <button
                type="button"
                onClick={pauseRecording}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                title="Pausar grabación"
              >
                <Pause className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={resumeRecording}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                title="Reanudar grabación"
              >
                <Play className="w-5 h-5 fill-current" />
              </button>
            )}

            <motion.button
              type="button"
              onClick={stopRecording}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(225,29,72,0.4)] cursor-pointer"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Finalizar grabación</span>
            </motion.button>

            <button
              type="button"
              onClick={cancelRecording}
              className="p-3 rounded-full hover:bg-rose-950/40 text-rose-300 hover:text-rose-200 transition-all cursor-pointer"
              title="Descartar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STATE 3: RECORDED (PREVIEW & CONFIRM) */}
      {recordingState === "recorded" && audioUrl && (
        <div className="flex flex-col items-center w-full py-2">
          {/* Hidden audio element for preview */}
          <audio
            ref={previewAudioRef}
            src={audioUrl}
            onEnded={() => {
              setIsPlayingPreview(false);
              setPreviewProgress(0);
            }}
            onTimeUpdate={(e) => {
              const el = e.currentTarget;
              if (el.duration) {
                setPreviewProgress((el.currentTime / el.duration) * 100);
              }
            }}
            className="hidden"
          />

          {/* Player card */}
          <div className="w-full p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between gap-3 mb-4">
            <button
              type="button"
              onClick={togglePreviewPlay}
              className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-md cursor-pointer transition-all"
            >
              {isPlayingPreview ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-purple-200 font-medium mb-1.5">
                <span>{isPlayingPreview ? "Reproduciendo audio grabado..." : "Audio listo para usar"}</span>
                <span className="font-mono">{formatTime(duration)}</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-purple-400 to-pink-400 transition-all duration-150"
                  style={{ width: `${previewProgress}%` }}
                />
              </div>
            </div>

            <Volume2 className="w-5 h-5 text-purple-300 shrink-0" />
          </div>

          {/* Confirmation buttons */}
          <div className="flex items-center justify-between w-full gap-3">
            <button
              type="button"
              onClick={resetRecording}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Volver a grabar</span>
            </button>

            <motion.button
              type="button"
              onClick={confirmAudio}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Usar este audio adjunto</span>
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
