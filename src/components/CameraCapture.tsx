"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  RotateCcw,
  Check,
  X,
  FlipHorizontal,
  AlertCircle,
} from "lucide-react";

interface CameraCaptureProps {
  onPhotoCaptured: (file: File) => void;
  onCancel?: () => void;
  title?: string;
}

export default function CameraCapture({
  onPhotoCaptured,
  onCancel,
  title = "Tomar Foto con la Cámara",
}: CameraCaptureProps) {
  const [cameraState, setCameraState] = useState<"stream" | "preview">("stream");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera tracks helper
  const stopTracks = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Check available cameras
  useEffect(() => {
    if (navigator?.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const videoInputs = devices.filter((d) => d.kind === "videoinput");
          setHasMultipleCameras(videoInputs.length > 1);
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (cameraState === "stream") {
      stopTracks();

      Promise.resolve()
        .then(() => {
          if (!navigator?.mediaDevices?.getUserMedia) {
            throw new Error("UNSUPPORTED_MEDIA");
          }

          return navigator.mediaDevices.getUserMedia({
            video: {
              facingMode,
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            },
            audio: false,
          });
        })
        .then((stream) => {
          if (cancelled) {
            stream.getTracks().forEach((t) => t.stop());
            return;
          }
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(() => {});
          }
        })
        .catch((err: unknown) => {
          if (cancelled) return;
          console.error("Camera access error:", err);
          let msg = "No se pudo acceder a la cámara.";
          if (err instanceof Error) {
            if (err.message === "UNSUPPORTED_MEDIA") {
              msg = "Tu navegador no soporta captura de cámara.";
            } else if (
              err.name === "NotAllowedError" ||
              err.name === "PermissionDeniedError"
            ) {
              msg = "Permiso denegado. Permite el acceso a la cámara en tu navegador para tomar fotos.";
            } else if (
              err.name === "NotFoundError" ||
              err.name === "DevicesNotFoundError"
            ) {
              msg = "No se detectó ninguna cámara en este dispositivo.";
            }
          }
          setErrorMessage(msg);
        });
    }

    return () => {
      cancelled = true;
      stopTracks();
    };
  }, [cameraState, facingMode, stopTracks]);

  // Flip camera (front <-> back)
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  // Capture Photo
  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    // Flash animation effect
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // If front camera, mirror image for natural selfie feel
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
        setPhotoBlob(blob);
        setPhotoDataUrl(dataUrl);
        setCameraState("preview");
        stopTracks();
      },
      "image/jpeg",
      0.92
    );
  };

  const retakePhoto = () => {
    setPhotoBlob(null);
    setPhotoDataUrl(null);
    setCameraState("stream");
  };

  const confirmPhoto = () => {
    if (!photoBlob) return;
    const file = new File([photoBlob], `foto_camara_${Date.now()}.jpg`, {
      type: "image/jpeg",
    });
    onPhotoCaptured(file);
  };

  const handleCancel = () => {
    stopTracks();
    if (onCancel) onCancel();
  };

  return (
    <div className="w-full p-4 sm:p-5 rounded-2xl bg-black/50 border border-purple-500/30 backdrop-blur-md flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-400/30 flex items-center justify-center">
            <Camera className="w-4 h-4 text-pink-300" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide">{title}</h4>
            <p className="text-[11px] text-purple-300/70">
              Captura fotos en vivo con tu cámara o webcam
            </p>
          </div>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={handleCancel}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
            title="Cerrar cámara"
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

      {/* Viewfinder / Video Stream */}
      <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden bg-black border border-purple-500/30 flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        {/* Flash Effect */}
        <AnimatePresence>
          {isFlashing && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-white z-40 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {cameraState === "stream" && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${
                facingMode === "user" ? "scale-x-[-1]" : ""
              }`}
            />

            {/* Viewfinder Target Reticle */}
            <div className="absolute inset-6 pointer-events-none border border-white/20 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 border-t-2 border-l-2 border-pink-400/80 absolute top-0 left-0 rounded-tl-sm" />
              <div className="w-6 h-6 border-t-2 border-r-2 border-pink-400/80 absolute top-0 right-0 rounded-tr-sm" />
              <div className="w-6 h-6 border-b-2 border-l-2 border-pink-400/80 absolute bottom-0 left-0 rounded-bl-sm" />
              <div className="w-6 h-6 border-b-2 border-r-2 border-pink-400/80 absolute bottom-0 right-0 rounded-br-sm" />
            </div>

            {/* Flip camera button */}
            {hasMultipleCameras && (
              <button
                type="button"
                onClick={toggleFacingMode}
                className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                title="Cambiar entre cámara frontal y trasera"
              >
                <FlipHorizontal className="w-4 h-4" />
              </button>
            )}
          </>
        )}

        {/* Captured Photo Preview */}
        {cameraState === "preview" && photoDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoDataUrl}
            alt="Fotografía recién capturada con la cámara para compartir"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Control Actions */}
      <div className="mt-4 w-full flex items-center justify-center gap-3">
        {cameraState === "stream" ? (
          <div className="flex items-center gap-4">
            <motion.button
              type="button"
              onClick={takeSnapshot}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className="px-6 py-3 rounded-full bg-linear-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-semibold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(244,114,182,0.4)] cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span>Tomar foto ahora</span>
            </motion.button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full gap-3">
            <button
              type="button"
              onClick={retakePhoto}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tomar otra foto</span>
            </button>

            <motion.button
              type="button"
              onClick={confirmPhoto}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,114,182,0.4)] cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Usar esta foto</span>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
