"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Pause,
  Download,
  Maximize2,
  Heart,
  Sparkles,
  Star,
  Trash2,
  Camera,
  Upload,
  Loader2,
} from "lucide-react";
import { FavoritesData, FavoritePhoto } from "@/types/favorites";
import CameraCapture from "@/components/CameraCapture";
import { uploadMediaFile } from "@/lib/notesStorage";

const FAVORITES_STORAGE_KEY = "sofi_axel_favorites_cache";

export function getPhotoSrc(folder: string, image: string): string {
  if (!image) return "";
  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:") ||
    image.startsWith("blob:")
  ) {
    return image;
  }
  if (folder === "uploads") {
    return image.startsWith("/uploads/") ? image : `/uploads/${image}`;
  }
  return `/assets/${folder}/${image}`;
}

interface AlbumItem {
  id: string;
  icon: string;
  title: string;
  folder: string;
  images: string[];
}

const albums: AlbumItem[] = [
  {
    id: "juntos",
    icon: "🫶",
    title: "Juntos",
    folder: "juntos",
    images: [
      "juntos 1.jpeg",
      "juntos 2.jpeg",
      "juntos 3.jpeg",
      "juntos 4.jpeg",
      "juntos 5.png",
      "juntos 6.png",
      "juntos 7.png",
      "juntos 8.png",
      "juntos 9.png",
      "juntos10.jpeg",
      "juntos11.jpeg",
      "juntos12.jpeg",
    ],
  },
  {
    id: "sofi",
    icon: "💖",
    title: "Sofi",
    folder: "Sofi",
    images: [
      "sofi.png",
      "sofi1.png",
      "sofi2.png",
      "sofi3.png",
      "sofi4.png",
      "sofi 5.png",
      "sofi 6.png",
      "sofi 7.png",
      "sofi 8.png",
      "sofi 9.png",
      "sofi10.png",
      "sofi 11.png",
      "sofi12.png",
      "sofi 13.png",
      "sofi14.png",
      "sofi 15.png",
      "sofi16.png",
      "sofi 17.png",
      "sofi 18.png",
      "sofi 19.png",
      "sofi20.png",
      "sofi21.png",
      "sofi22.png",
      "sofi23.png",
      "sofi 24.png",
      "sofi 25.png",
      "sofi26.png",
      "sofi27.png",
      "sofi28.png",
      "sofi30.png",
      "sofi31.png",
      "sofi32.png",
      "sofi33.png",
      "sofi34.png",
      "sofi35.png",
      "sofi36.png",
      "sofi37.png",
      "sofi38.png",
      "sofi39.jpeg",
      "sofi40.jpeg",
      "sofi41.jpeg",
      "sofi42.jpeg",
      "sofi43.jpeg",
      "sofi44.jpeg",
      "sofi45.jpeg",
      "sofi46.jpeg",
      "sofi47.jpeg",
      "sofi48.jpeg",
      "sofi49.jpeg",
      "sofi50.jpeg",
      "sofi51.jpeg",
      "sofi52.jpeg",
      "sofi53.jpeg",
      "sofi54.jpeg",
      "sofi55.jpeg",
      "sofi56.jpeg",
      "sofi57.jpeg",
      "sofi58.jpeg",
      "sofi59.jpeg",
      "sofi60.jpeg",
      "sofi61.jpeg",
      "sofi62.jpeg",
      "sofi63.jpeg",
      "sofi64.jpeg",
      "sofi65.jpeg",
      "sofi66.jpeg",
      "sofi67.jpeg",
      "sofi68.jpeg",
      "sofi69.jpeg",
      "sofi70.jpeg",
      "sofi71.jpeg",
      "sofi72.jpeg",
      "sofi73.jpeg",
      "sofi74.jpeg",
    ],
  },
  {
    id: "axel",
    icon: "🧑",
    title: "Axel",
    folder: "axel",
    images: [
      "axel1.jpeg",
      "axel2.jpeg",
      "axel3.jpeg",
      "axel4.jpeg",
      "axel5.jpeg",
      "axel6.jpeg",
      "axel7.jpeg",
      "axel8.jpeg",
      "axel9.jpeg",
      "axel10.jpeg",
      "axel11.jpeg",
      "axel12.jpeg",
      "axel13.jpeg",
      "axel14.jpeg",
      "axel15.jpeg",
      "axel16.jpeg",
      "axel17.jpeg",
      "axel18.jpeg",
      "axel19.jpeg",
      "axel20.png",
      "axel21.jpeg",
      "axel22.jpeg",
      "axel23.jpeg",
      "axel24.jpeg",
      "axel25.jpeg",
      "axel26.jpeg",
      "axel27.jpeg",
      "axel28.png",
      "axel29.jpeg",
      "axel30.jpeg",
      "axel31.png",
    ],
  },
  {
    id: "kukis",
    icon: "😻",
    title: "Kukiss",
    folder: "kukis",
    images: [
      "kukis 1.jpg",
      "kukis 2.jpg",
      "kukis 3.png",
      "kukis4.png",
      "kukis5.jpg",
      "kukis 6.jpg",
      "kukis7.jpg",
    ],
  },
  {
    id: "jacobo",
    icon: "🐶",
    title: "Jacobo",
    folder: "jacobo",
    images: [
      "jacobo1.jpeg",
      "jacobo2.jpeg",
      "jacobo3.jpeg",
      "jacobo4.jpeg",
      "jacobo5.jpeg",
      "jacobo6.jpeg",
      "jacobo7.jpeg",
      "jacobo8.jpeg",
      "jacobo9.jpeg",
    ],
  },
  {
    id: "besos",
    icon: "✨",
    title: "Momentos especiales",
    folder: "besos",
    images: [
      "beso1.png",
      "beso 2.png",
      "beso 3.png",
      "beso 4.png",
      "beso 5.png",
      "beso 6.png",
      "beso 7.png",
      "beso 8.png",
      "besito.png",
      "besote.jpeg",
    ],
  },
  {
    id: "anime",
    icon: "🌸",
    title: "Anime",
    folder: "anime",
    images: ["anime1.jpeg"],
  },
  {
    id: "xv",
    icon: "🎉",
    title: "Tu fiesta de XV",
    folder: "fiesta de XV",
    images: [
      "xv.png",
      "xv2.png",
      "xv3.jpeg",
      "xv4.jpeg",
      "xv5.jpeg",
      "xv6.jpeg",
      "xv7.jpeg",
      "xv8.jpeg",
      "xv9.jpeg",
      "xv10.jpeg",
      "xv11.jpeg",
      "xv12.jpeg",
      "xv13.jpeg",
      "xv14.jpeg",
      "xv15.jpeg",
      "xv16.jpeg",
      "xv17.jpeg",
    ],
  },
];

interface LightboxItem {
  folder: string;
  image: string;
  title: string;
  albumId: string;
}

export default function Albums() {
  const [openAlbum, setOpenAlbum] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoritesData>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && Array.isArray(parsed.axel) && Array.isArray(parsed.sofi)) {
            return parsed;
          }
        }
      } catch {
        // ignore cache error
      }
    }
    return { axel: [], sofi: [] };
  });
  const [lightbox, setLightbox] = useState<{
    albumId: string;
    imageIndex: number;
  } | null>(null);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estados para tomar o agregar foto en vivo a favoritas
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [isCapturingWithCamera, setIsCapturingWithCamera] = useState(false);
  const [targetPersonForPhoto, setTargetPersonForPhoto] = useState<"axel" | "sofi">("axel");
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState<string | null>(null);
  const photoFileInputRef = useRef<HTMLInputElement | null>(null);

  // Estados para modo de selección rápida y animaciones de corazones
  const [quickSelectMode, setQuickSelectMode] = useState(false);
  const [quickSelectTarget, setQuickSelectTarget] = useState<"axel" | "sofi">("sofi");
  const [burstPhotos, setBurstPhotos] = useState<{
    [key: string]: { person: "axel" | "sofi"; id: number };
  }>({});
  const [albumFilters, setAlbumFilters] = useState<{
    [albumId: string]: "all" | "axel" | "sofi";
  }>({});
  const lastTapRef = useRef<{ [key: string]: number }>({});

  // Touch tracking para swipe en móvil
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  }, []);

  const triggerBurst = useCallback((key: string, person: "axel" | "sofi") => {
    setBurstPhotos((prev) => ({
      ...prev,
      [key]: { person, id: Date.now() },
    }));
    setTimeout(() => {
      setBurstPhotos((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }, 1200);
  }, []);

  // Sincronizar favoritos con servidor al montar
  useEffect(() => {
    let isCancelled = false;
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled && data.favorites && Array.isArray(data.favorites.axel) && Array.isArray(data.favorites.sofi)) {
          setFavorites(data.favorites);
          if (typeof window !== "undefined") {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(data.favorites));
          }
        }
      })
      .catch((err) => console.error("Error fetching favorites:", err));

    return () => {
      isCancelled = true;
    };
  }, []);

  // Guardar favoritos
  const saveFavorites = useCallback((newFavs: FavoritesData) => {
    setFavorites(newFavs);
    if (typeof window !== "undefined") {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavs));
    }
    fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorites: newFavs }),
    }).catch((e) => console.error("Error saving favorites to API:", e));
  }, []);

  const isFavorite = useCallback(
    (person: "axel" | "sofi", folder: string, image: string) => {
      const list = favorites[person] || [];
      return list.some((f) => f.folder === folder && f.image === image);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (
      person: "axel" | "sofi",
      folder: string,
      image: string,
      albumId: string = "album",
      albumTitle: string = "Álbum"
    ) => {
      const list = favorites[person] || [];
      const alreadyFav = list.some((f) => f.folder === folder && f.image === image);
      const key = `${folder}-${image}`;

      let updatedList: FavoritePhoto[];
      if (alreadyFav) {
        updatedList = list.filter((f) => !(f.folder === folder && f.image === image));
        showToast(
          person === "axel"
            ? "Foto quitada de Favoritas de Axel 🧑"
            : "Foto quitada de Favoritas de Sofi 💖"
        );
      } else {
        const newFav: FavoritePhoto = {
          albumId,
          folder,
          image,
          albumTitle,
          addedAt: Date.now(),
        };
        updatedList = [newFav, ...list];
        triggerBurst(key, person);
        showToast(
          person === "axel"
            ? "¡Foto guardada en Favoritas de Axel! 🧑💙✨"
            : "¡Foto guardada en Favoritas de Sofi! 💖🌸✨"
        );
      }

      const updatedFavorites: FavoritesData = {
        ...favorites,
        [person]: updatedList,
      };

      saveFavorites(updatedFavorites);
    },
    [favorites, saveFavorites, showToast, triggerBurst]
  );

  const handlePhotoClick = useCallback(
    (folder: string, img: string, albumId: string, index: number) => {
      const key = `${folder}-${img}`;
      const now = Date.now();
      const lastTap = lastTapRef.current[key] || 0;

      if (quickSelectMode) {
        toggleFavorite(quickSelectTarget, folder, img, albumId);
        return;
      }

      // Doble tap rápido (< 320ms) guarda directamente como favorita
      if (now - lastTap < 320) {
        const isSofi = isFavorite("sofi", folder, img);
        const target = isSofi ? "axel" : "sofi";
        toggleFavorite(target, folder, img, albumId);
        lastTapRef.current[key] = 0;
        return;
      }

      lastTapRef.current[key] = now;
      setLightbox({ albumId, imageIndex: index });
      setIsSlideshow(false);
    },
    [quickSelectMode, quickSelectTarget, toggleFavorite, isFavorite]
  );

  const handlePhotosUploaded = async (files: FileList | File[] | File) => {
    const fileArray = files instanceof File ? [files] : Array.from(files);
    if (fileArray.length === 0) return;

    setIsCapturingWithCamera(false);
    setPhotoUploadError(null);
    setIsUploadingPhoto(true);

    try {
      const newFavs: FavoritePhoto[] = [];

      for (const file of fileArray) {
        try {
          const uploadResult = await uploadMediaFile(file);
          const imageIdentifier = uploadResult.url.startsWith("/uploads/")
            ? uploadResult.url.replace(/^\/uploads\//, "")
            : uploadResult.url;

          newFavs.push({
            albumId: targetPersonForPhoto === "axel" ? "fav-axel" : "fav-sofi",
            folder: "uploads",
            image: imageIdentifier,
            albumTitle: targetPersonForPhoto === "axel" ? "Favoritas de Axel" : "Favoritas de Sofi",
            addedAt: Date.now(),
          });
        } catch (singleErr) {
          console.warn("Aviso al subir foto individual:", singleErr);
        }
      }

      if (newFavs.length > 0) {
        const updatedFavorites: FavoritesData = {
          ...favorites,
          [targetPersonForPhoto]: [...newFavs, ...(favorites[targetPersonForPhoto] || [])],
        };
        saveFavorites(updatedFavorites);
        setIsAddingPhoto(false);
        showToast(
          targetPersonForPhoto === "axel"
            ? (newFavs.length === 1
                ? "¡Foto agregada a las Favoritas de Axel! 🧑📸"
                : `¡${newFavs.length} fotos agregadas a Favoritas de Axel! 🧑📸`)
            : (newFavs.length === 1
                ? "¡Foto agregada a las Favoritas de Sofi! 💖📸"
                : `¡${newFavs.length} fotos agregadas a Favoritas de Sofi! 💖📸`)
        );
      } else {
        throw new Error("No se pudo procesar la foto.");
      }
    } catch (err: unknown) {
      console.error("Error uploading photo:", err);
      setPhotoUploadError(
        err instanceof Error ? err.message : "Error al procesar la foto"
      );
    } finally {
      setIsUploadingPhoto(false);
      if (photoFileInputRef.current) {
        photoFileInputRef.current.value = "";
      }
    }
  };

  // Lista de items del lightbox actual
  const currentLightboxItems: LightboxItem[] = useMemo(() => {
    if (!lightbox) return [];

    if (lightbox.albumId === "fav-axel") {
      return (favorites.axel || []).map((f) => ({
        folder: f.folder,
        image: f.image,
        title: "Favoritas de Axel",
        albumId: "fav-axel",
      }));
    }

    if (lightbox.albumId === "fav-sofi") {
      return (favorites.sofi || []).map((f) => ({
        folder: f.folder,
        image: f.image,
        title: "Favoritas de Sofi",
        albumId: "fav-sofi",
      }));
    }

    const album = albums.find((a) => a.id === lightbox.albumId);
    if (!album) return [];

    return album.images.map((img) => ({
      folder: album.folder,
      image: img,
      title: album.title,
      albumId: album.id,
    }));
  }, [lightbox, favorites]);

  const currentItem = lightbox && currentLightboxItems.length > 0
    ? currentLightboxItems[lightbox.imageIndex]
    : null;

  const goToNextImage = useCallback(() => {
    if (!currentLightboxItems.length) return;
    setLightbox((prev) =>
      prev
        ? {
            ...prev,
            imageIndex: (prev.imageIndex + 1) % currentLightboxItems.length,
          }
        : null
    );
  }, [currentLightboxItems]);

  const goToPrevImage = useCallback(() => {
    if (!currentLightboxItems.length) return;
    setLightbox((prev) =>
      prev
        ? {
            ...prev,
            imageIndex:
              (prev.imageIndex - 1 + currentLightboxItems.length) %
              currentLightboxItems.length,
          }
        : null
    );
  }, [currentLightboxItems]);

  // Slideshow auto advance
  useEffect(() => {
    if (!isSlideshow || !lightbox || !currentLightboxItems.length) return;
    const timer = setInterval(() => {
      goToNextImage();
    }, 3500);
    return () => clearInterval(timer);
  }, [isSlideshow, lightbox, currentLightboxItems, goToNextImage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      goToNextImage();
    } else if (distance < -minSwipeDistance) {
      goToPrevImage();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox || !currentLightboxItems.length) return;
      if (e.key === "Escape") {
        setLightbox(null);
        setIsSlideshow(false);
      }
      if (e.key === "ArrowRight") goToNextImage();
      if (e.key === "ArrowLeft") goToPrevImage();
      if (e.key === " ") {
        e.preventDefault();
        setIsSlideshow((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, currentLightboxItems, goToNextImage, goToPrevImage]);

  const handleDownload = (folder: string, img: string) => {
    const link = document.createElement("a");
    link.href = getPhotoSrc(folder, img);
    link.download = img.split("/").pop() || "foto_recuerdo.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-purple-900/90 text-white font-medium text-sm backdrop-blur-md border border-purple-400/40 shadow-[0_4px_25px_rgba(168,85,247,0.5)] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-300 animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="w-full max-w-4xl mx-auto mt-8 px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 text-purple-400" />
            Galería de Recuerdos & Favoritas
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-3 flex items-baseline gap-3">
            <span className="text-white">Nuestros</span>
            <span className="text-purple-400 italic font-serif tracking-wide">
              álbumes
            </span>
          </h2>
          <p className="text-purple-200/70 text-lg tracking-wide">
            Revive cada momento, guarda tus fotos favoritas de Axel y de Sofi con el corazón y visualízalas en alta calidad
          </p>

          {/* Action buttons: Tomar/Añadir Foto + Modo Selección Rápida */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsAddingPhoto(!isAddingPhoto);
                setIsCapturingWithCamera(false);
                setPhotoUploadError(null);
              }}
              className="px-5 py-2.5 rounded-full bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>{isAddingPhoto ? "Cerrar captura" : "Tomar o Añadir Foto 📸"}</span>
            </button>

            <button
              type="button"
              onClick={() => setQuickSelectMode(!quickSelectMode)}
              className={`px-4 py-2.5 rounded-full font-medium text-xs sm:text-sm flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-md ${
                quickSelectMode
                  ? "bg-linear-to-r from-amber-500 via-pink-500 to-purple-600 text-white ring-2 ring-amber-300/70 shadow-[0_0_22px_rgba(245,158,11,0.5)]"
                  : "bg-white/10 hover:bg-white/15 text-purple-200 hover:text-white border border-purple-500/30"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>{quickSelectMode ? "Cerrar selección rápida" : "Modo Selección Rápida ✨"}</span>
            </button>
          </div>
        </motion.div>

        {/* Quick Select Mode Active Banner */}
        <AnimatePresence>
          {quickSelectMode && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="mb-8 p-4 sm:p-5 rounded-3xl bg-linear-to-r from-indigo-950/90 via-purple-950/90 to-fuchsia-950/90 border-2 border-purple-400/50 backdrop-blur-xl shadow-[0_10px_35px_rgba(168,85,247,0.35)] flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-xl shrink-0 shadow-inner">
                  ✨
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                    <span>Modo Selección Rápida Activo</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-black font-black uppercase tracking-wider">
                      1 toque = Favorita
                    </span>
                  </h4>
                  <p className="text-xs text-purple-200/80 mt-0.5">
                    Toca directamente cualquier foto de los álbumes abajo para guardarla o quitarla al instante.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-2xl border border-purple-400/30 shrink-0">
                <span className="text-[11px] font-semibold text-purple-200/70 pl-2 hidden xs:inline">
                  Guardar para:
                </span>
                <button
                  type="button"
                  onClick={() => setQuickSelectTarget("axel")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    quickSelectTarget === "axel"
                      ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.7)] border border-indigo-300"
                      : "text-indigo-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>🧑</span>
                  <span>Axel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setQuickSelectTarget("sofi")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    quickSelectTarget === "sofi"
                      ? "bg-fuchsia-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.7)] border border-fuchsia-300"
                      : "text-fuchsia-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>💖</span>
                  <span>Sofi</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden file input */}
        <input
          type="file"
          ref={photoFileInputRef}
          accept="image/*,.heic,.heif,.avif,.webp,.png,.jpg,.jpeg"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handlePhotosUploaded(e.target.files);
            }
          }}
        />

        {/* Add / Take Photo Card */}
        <AnimatePresence>
          {isAddingPhoto && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-5 sm:p-6 rounded-3xl bg-linear-to-b from-purple-950/60 to-black/60 border border-purple-500/30 backdrop-blur-xl shadow-[0_8px_30px_rgba(168,85,247,0.15)] overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Capturar o Guardar Foto Especial</h3>
                    <p className="text-xs text-purple-200/70">
                      Tómate una foto o sube cualquier imagen y guárdala directamente en favoritas
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsAddingPhoto(false);
                    setIsCapturingWithCamera(false);
                  }}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Destination selector */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-purple-200/80 mb-2 block uppercase tracking-wider">
                  ¿A qué colección deseas agregarla?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTargetPersonForPhoto("axel")}
                    className={`py-2.5 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      targetPersonForPhoto === "axel"
                        ? "bg-indigo-600/40 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <span>🧑</span>
                    <span>Favoritas de Axel</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetPersonForPhoto("sofi")}
                    className={`py-2.5 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      targetPersonForPhoto === "sofi"
                        ? "bg-fuchsia-600/40 border-fuchsia-400 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)]"
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <span>💖</span>
                    <span>Favoritas de Sofi</span>
                  </button>
                </div>
              </div>

              {/* Action method */}
              {isCapturingWithCamera ? (
                <CameraCapture
                  onPhotoCaptured={(file) => handlePhotosUploaded([file])}
                  onCancel={() => setIsCapturingWithCamera(false)}
                  title={`Tomar Foto para ${
                    targetPersonForPhoto === "axel" ? "Axel" : "Sofi"
                  }`}
                />
              ) : isUploadingPhoto ? (
                <div className="py-8 px-4 rounded-2xl bg-black/40 border border-purple-500/30 text-center flex flex-col items-center justify-center gap-2 text-xs text-purple-200">
                  <Loader2 className="w-6 h-6 text-pink-400 animate-spin" />
                  <span className="font-semibold text-white">
                    Guardando fotos en el álbum...
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCapturingWithCamera(true)}
                    className="py-4 px-4 rounded-2xl bg-pink-950/20 hover:bg-pink-900/30 border border-pink-500/40 hover:border-pink-400 text-pink-200 text-xs font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs group"
                  >
                    <div className="w-9 h-9 rounded-full bg-pink-500/20 group-hover:scale-110 flex items-center justify-center transition-transform">
                      <Camera className="w-5 h-5 text-pink-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white">Tomar foto con la cámara</div>
                      <div className="text-[10px] text-pink-300/70">Usa tu webcam o cámara del móvil</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => photoFileInputRef.current?.click()}
                    className="py-4 px-4 rounded-2xl bg-purple-950/20 hover:bg-purple-900/30 border border-purple-500/30 hover:border-purple-400 text-purple-200 text-xs font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xs group"
                  >
                    <div className="w-9 h-9 rounded-full bg-purple-500/20 group-hover:scale-110 flex items-center justify-center transition-transform">
                      <Upload className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white">Subir desde archivo</div>
                      <div className="text-[10px] text-purple-300/70">Cualquier foto (JPG, PNG, HEIC, WebP...)</div>
                    </div>
                  </button>
                </div>
              )}

              {photoUploadError && (
                <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                  {photoUploadError}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================== */}
        {/* SECCIÓN ESPECIAL: FAVORITAS DE AXEL & FAVORITAS DE SOFI */}
        {/* ======================================================== */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card Favoritas de Axel */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl border transition-all overflow-hidden backdrop-blur-md ${
                openAlbum === "fav-axel"
                  ? "border-indigo-400/60 bg-indigo-950/40 shadow-[0_0_25px_rgba(99,102,241,0.2)]"
                  : "border-indigo-500/20 bg-linear-to-br from-indigo-950/20 to-purple-950/20 hover:border-indigo-500/40"
              }`}
            >
              <button
                onClick={() =>
                  setOpenAlbum(openAlbum === "fav-axel" ? null : "fav-axel")
                }
                className="w-full p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-2xl shadow-inner">
                    🧑⭐
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-white tracking-wide flex items-center gap-2">
                      <span>Favoritas de Axel</span>
                    </h3>
                    <p className="text-xs text-indigo-200/70">
                      Las fotos que más le encantan a Axel
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">
                    {favorites.axel.length} fotos
                  </span>
                  <motion.div
                    animate={{ rotate: openAlbum === "fav-axel" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-indigo-400" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openAlbum === "fav-axel" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 sm:p-5 pt-0 border-t border-indigo-500/20">
                      {favorites.axel.length === 0 ? (
                        <div className="py-8 text-center text-sm text-indigo-200/70">
                          <p>Aún no hay fotos en las favoritas de Axel.</p>
                          <p className="text-xs text-indigo-300/50 mt-1">
                            Abre cualquier álbum abajo y toca el botón 🧑 en las fotos que te gusten para guardarlas aquí.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mt-3 mb-2 px-1">
                            <span className="text-xs text-indigo-300/80 font-medium">
                              Colección de fotos preferidas de Axel
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setLightbox({ albumId: "fav-axel", imageIndex: 0 });
                                setIsSlideshow(true);
                              }}
                              className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-400/40 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Ver Diapositivas</span>
                            </button>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                            {favorites.axel.map((fav, i) => (
                              <motion.div
                                key={`${fav.folder}-${fav.image}-${i}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (i % 8) * 0.03, duration: 0.3 }}
                                className="aspect-square relative rounded-xl overflow-hidden group cursor-pointer bg-indigo-950/30 border border-indigo-500/20 hover:border-indigo-400/50 transition-colors"
                                onClick={() => {
                                  setLightbox({ albumId: "fav-axel", imageIndex: i });
                                  setIsSlideshow(false);
                                }}
                              >
                                <img
                                  src={getPhotoSrc(fav.folder, fav.image)}
                                  alt={`Favorita de Axel ${i + 1}`}
                                  loading="lazy"
                                  decoding="async"
                                  className="object-cover w-full h-full group-hover:scale-108 transition-transform duration-500 ease-out"
                                />

                                {/* Album badge */}
                                <div className="absolute top-2 left-2 z-10">
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-indigo-200 border border-indigo-400/20">
                                    {fav.albumTitle || fav.folder}
                                  </span>
                                </div>

                                {/* Remove favorite button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite("axel", fav.folder, fav.image);
                                  }}
                                  className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/70 hover:bg-rose-600/90 text-white/80 hover:text-white transition-all cursor-pointer shadow-md"
                                  title="Quitar de favoritas de Axel"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                                  <span className="text-[11px] font-semibold text-white/90">
                                    #{i + 1}
                                  </span>
                                  <Maximize2 className="w-4 h-4 text-indigo-300" />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Card Favoritas de Sofi */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`rounded-2xl border transition-all overflow-hidden backdrop-blur-md ${
                openAlbum === "fav-sofi"
                  ? "border-fuchsia-400/60 bg-fuchsia-950/40 shadow-[0_0_25px_rgba(217,70,239,0.2)]"
                  : "border-fuchsia-500/20 bg-linear-to-br from-fuchsia-950/20 to-pink-950/20 hover:border-fuchsia-500/40"
              }`}
            >
              <button
                onClick={() =>
                  setOpenAlbum(openAlbum === "fav-sofi" ? null : "fav-sofi")
                }
                className="w-full p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-400/30 flex items-center justify-center text-2xl shadow-inner">
                    💖✨
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-white tracking-wide flex items-center gap-2">
                      <span>Favoritas de Sofi</span>
                    </h3>
                    <p className="text-xs text-fuchsia-200/70">
                      Las fotos que más le fascinan a Sofía
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-500/30">
                    {favorites.sofi.length} fotos
                  </span>
                  <motion.div
                    animate={{ rotate: openAlbum === "fav-sofi" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-fuchsia-400" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openAlbum === "fav-sofi" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 sm:p-5 pt-0 border-t border-fuchsia-500/20">
                      {favorites.sofi.length === 0 ? (
                        <div className="py-8 text-center text-sm text-fuchsia-200/70">
                          <p>Aún no hay fotos en las favoritas de Sofi.</p>
                          <p className="text-xs text-fuchsia-300/50 mt-1">
                            Abre cualquier álbum abajo y toca el botón 💖 en las fotos que te gusten para guardarlas aquí.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mt-3 mb-2 px-1">
                            <span className="text-xs text-fuchsia-300/80 font-medium">
                              Colección de fotos preferidas de Sofi
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setLightbox({ albumId: "fav-sofi", imageIndex: 0 });
                                setIsSlideshow(true);
                              }}
                              className="px-3 py-1 rounded-full text-xs font-semibold bg-fuchsia-600/30 hover:bg-fuchsia-600 text-fuchsia-200 hover:text-white border border-fuchsia-400/40 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Ver Diapositivas</span>
                            </button>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                            {favorites.sofi.map((fav, i) => (
                              <motion.div
                                key={`${fav.folder}-${fav.image}-${i}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (i % 8) * 0.03, duration: 0.3 }}
                                className="aspect-square relative rounded-xl overflow-hidden group cursor-pointer bg-fuchsia-950/30 border border-fuchsia-500/20 hover:border-fuchsia-400/50 transition-colors"
                                onClick={() => {
                                  setLightbox({ albumId: "fav-sofi", imageIndex: i });
                                  setIsSlideshow(false);
                                }}
                              >
                                <img
                                  src={getPhotoSrc(fav.folder, fav.image)}
                                  alt={`Favorita de Sofi ${i + 1}`}
                                  loading="lazy"
                                  decoding="async"
                                  className="object-cover w-full h-full group-hover:scale-108 transition-transform duration-500 ease-out"
                                />

                                {/* Album badge */}
                                <div className="absolute top-2 left-2 z-10">
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-fuchsia-200 border border-fuchsia-400/20">
                                    {fav.albumTitle || fav.folder}
                                  </span>
                                </div>

                                {/* Remove favorite button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite("sofi", fav.folder, fav.image);
                                  }}
                                  className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/70 hover:bg-rose-600/90 text-white/80 hover:text-white transition-all cursor-pointer shadow-md"
                                  title="Quitar de favoritas de Sofi"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                                  <span className="text-[11px] font-semibold text-white/90">
                                    #{i + 1}
                                  </span>
                                  <Maximize2 className="w-4 h-4 text-fuchsia-300" />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* LISTA DE ÁLBUMES PRINCIPALES */}
        {/* ======================================================== */}
        <div className="space-y-4">
          {albums.map((album, idx) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="border border-purple-500/20 bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(168,85,247,0.05)] transition-colors hover:border-purple-500/40"
            >
              <button
                onClick={() =>
                  setOpenAlbum(openAlbum === album.id ? null : album.id)
                }
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl inline-block animate-heartbeat">
                    {album.icon}
                  </span>
                  <span className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                    {album.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-purple-300">
                  <span className="text-sm font-medium opacity-80">
                    {album.images.length} fotos
                  </span>
                  <motion.div
                    animate={{ rotate: openAlbum === album.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-purple-400" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openAlbum === album.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 sm:p-6 pt-0">
                      {/* Filter Tabs within Album */}
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-3 border-b border-purple-500/20">
                        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
                          <button
                            type="button"
                            onClick={() =>
                              setAlbumFilters((prev) => ({ ...prev, [album.id]: "all" }))
                            }
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                              (albumFilters[album.id] || "all") === "all"
                                ? "bg-purple-600 text-white shadow-sm"
                                : "bg-white/5 hover:bg-white/10 text-purple-200/70 hover:text-white"
                            }`}
                          >
                            Todas ({album.images.length})
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setAlbumFilters((prev) => ({ ...prev, [album.id]: "axel" }))
                            }
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                              albumFilters[album.id] === "axel"
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "bg-indigo-950/30 hover:bg-indigo-900/40 text-indigo-300/80 hover:text-white border border-indigo-500/20"
                            }`}
                          >
                            <span>🧑 De Axel</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px]">
                              {album.images.filter((img) => isFavorite("axel", album.folder, img)).length}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setAlbumFilters((prev) => ({ ...prev, [album.id]: "sofi" }))
                            }
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                              albumFilters[album.id] === "sofi"
                                ? "bg-fuchsia-600 text-white shadow-sm"
                                : "bg-fuchsia-950/30 hover:bg-fuchsia-900/40 text-fuchsia-300/80 hover:text-white border border-fuchsia-500/20"
                            }`}
                          >
                            <span>💖 De Sofi</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px]">
                              {album.images.filter((img) => isFavorite("sofi", album.folder, img)).length}
                            </span>
                          </button>
                        </div>

                        <div className="text-[11px] text-purple-300/60 hidden sm:block">
                          {quickSelectMode
                            ? `✨ Modo activo: Toca para guardar para ${quickSelectTarget === "axel" ? "Axel 🧑" : "Sofi 💖"}`
                            : "Tip: Toca 🧑 o 💖, o doble clic en la foto"}
                        </div>
                      </div>

                      {(() => {
                        const currentFilter = albumFilters[album.id] || "all";
                        const displayedImages = album.images
                          .map((img, originalIndex) => ({ img, originalIndex }))
                          .filter(({ img }) => {
                            if (currentFilter === "axel") return isFavorite("axel", album.folder, img);
                            if (currentFilter === "sofi") return isFavorite("sofi", album.folder, img);
                            return true;
                          });

                        if (displayedImages.length === 0) {
                          return (
                            <div className="py-12 text-center text-sm text-purple-300/60">
                              <p>No hay fotos marcadas como favoritas de {currentFilter === "axel" ? "Axel 🧑" : "Sofi 💖"} en este álbum aún.</p>
                              <p className="text-xs mt-1 text-purple-400/50">
                                Cambia a &ldquo;Todas&rdquo; o toca el botón {currentFilter === "axel" ? "🧑" : "💖"} en cualquier foto para agregarla.
                              </p>
                            </div>
                          );
                        }

                        return (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                            {displayedImages.map(({ img, originalIndex }, i) => {
                              const isAxelFav = isFavorite("axel", album.folder, img);
                              const isSofiFav = isFavorite("sofi", album.folder, img);
                              const burstKey = `${album.folder}-${img}`;
                              const burst = burstPhotos[burstKey];

                              return (
                                <motion.div
                                  key={originalIndex}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    delay: (i % 8) * 0.03,
                                    duration: 0.3,
                                  }}
                                  className={`aspect-square relative rounded-xl overflow-hidden group cursor-pointer bg-purple-950/30 transition-all duration-300 ${
                                    isAxelFav && isSofiFav
                                      ? "ring-2 ring-purple-400/90 shadow-[0_0_18px_rgba(168,85,247,0.35)]"
                                      : isSofiFav
                                      ? "ring-2 ring-fuchsia-400/80 shadow-[0_0_15px_rgba(217,70,239,0.25)]"
                                      : isAxelFav
                                      ? "ring-2 ring-indigo-400/80 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                                      : "border border-white/5 hover:border-purple-400/40"
                                  }`}
                                  onClick={() => handlePhotoClick(album.folder, img, album.id, originalIndex)}
                                >
                                  <img
                                    src={`/assets/${album.folder}/${img}`}
                                    alt={`${album.title} foto ${originalIndex + 1}`}
                                    loading="lazy"
                                    decoding="async"
                                    className="object-cover w-full h-full group-hover:scale-108 transition-transform duration-500 ease-out"
                                  />

                                  {/* Favorite Status Badge on Top Left */}
                                  {(isAxelFav || isSofiFav) && (
                                    <div className="absolute top-2 left-2 z-10 pointer-events-none">
                                      <div
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md border shadow-md flex items-center gap-1 ${
                                          isAxelFav && isSofiFav
                                            ? "bg-purple-900/90 border-purple-400/50 text-white"
                                            : isSofiFav
                                            ? "bg-fuchsia-950/90 border-fuchsia-400/50 text-fuchsia-200"
                                            : "bg-indigo-950/90 border-indigo-400/50 text-indigo-200"
                                        }`}
                                      >
                                        {isAxelFav && isSofiFav ? (
                                          <>
                                            <span>⭐</span>
                                            <span>Ambos</span>
                                          </>
                                        ) : isSofiFav ? (
                                          <>
                                            <span>💖</span>
                                            <span>Sofi</span>
                                          </>
                                        ) : (
                                          <>
                                            <span>🧑</span>
                                            <span>Axel</span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {/* Interactive Favorite Buttons on Top Right */}
                                  <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
                                    {/* Axel Favorite Toggle */}
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite("axel", album.folder, img, album.id, album.title);
                                      }}
                                      className={`w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90 ${
                                        isAxelFav
                                          ? "bg-indigo-600 text-white border-2 border-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.9)] scale-105"
                                          : "bg-black/70 hover:bg-indigo-950 text-white/70 hover:text-white border border-white/20 hover:border-indigo-400/60"
                                      }`}
                                      title={
                                        isAxelFav
                                          ? "Quitar de favoritas de Axel 🧑"
                                          : "Marcar como favorita de Axel 🧑"
                                      }
                                    >
                                      <span className="text-xs sm:text-sm">🧑</span>
                                    </button>

                                    {/* Sofi Favorite Toggle */}
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite("sofi", album.folder, img, album.id, album.title);
                                      }}
                                      className={`w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90 ${
                                        isSofiFav
                                          ? "bg-fuchsia-600 text-white border-2 border-fuchsia-300 shadow-[0_0_12px_rgba(217,70,239,0.9)] scale-105"
                                          : "bg-black/70 hover:bg-fuchsia-950 text-white/70 hover:text-white border border-white/20 hover:border-fuchsia-400/60"
                                      }`}
                                      title={
                                        isSofiFav
                                          ? "Quitar de favoritas de Sofi 💖"
                                          : "Marcar como favorita de Sofi 💖"
                                      }
                                    >
                                      <span className="text-xs sm:text-sm">💖</span>
                                    </button>
                                  </div>

                                  {/* Heart Burst Animation */}
                                  <AnimatePresence>
                                    {burst && (
                                      <motion.div
                                        key={burst.id}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: [0, 1.4, 1.1], opacity: [0, 1, 0] }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30"
                                      >
                                        <div className="relative">
                                          <Heart
                                            className={`w-14 h-14 sm:w-16 sm:h-16 fill-current drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] ${
                                              burst.person === "axel"
                                                ? "text-indigo-400 fill-indigo-400"
                                                : "text-fuchsia-400 fill-fuchsia-400"
                                            }`}
                                          />
                                          <Sparkles className="w-5 h-5 text-yellow-300 absolute -top-1 -right-1 animate-spin" />
                                        </div>
                                        <span className="text-[11px] font-bold px-2 py-0.5 mt-1 rounded-full bg-black/80 text-white shadow-lg backdrop-blur-md">
                                          {burst.person === "axel"
                                            ? "¡Para Axel! 🧑💙"
                                            : "¡Para Sofi! 💖✨"}
                                        </span>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                  {/* Hover info bottom */}
                                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                                    <span className="text-[11px] font-semibold text-white/90">
                                      #{originalIndex + 1}
                                    </span>
                                    <Maximize2 className="w-4 h-4 text-purple-300" />
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* LIGHTBOX MODAL */}
      {/* ======================================================== */}
      <AnimatePresence>
        {lightbox && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Toolbar */}
            <div className="w-full max-w-5xl flex items-center justify-between z-10 text-white flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {currentItem.albumId === "fav-axel"
                    ? "🧑⭐"
                    : currentItem.albumId === "fav-sofi"
                    ? "💖✨"
                    : albums.find((a) => a.id === currentItem.albumId)?.icon || "📸"}
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold font-serif">
                    {currentItem.title}
                  </h4>
                  <p className="text-xs text-purple-300/70">
                    Foto {lightbox.imageIndex + 1} de {currentLightboxItems.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Favorite Toggle Buttons in Lightbox */}
                <button
                  type="button"
                  onClick={() =>
                    toggleFavorite(
                      "axel",
                      currentItem.folder,
                      currentItem.image,
                      currentItem.albumId,
                      currentItem.title
                    )
                  }
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer transform active:scale-95 ${
                    isFavorite("axel", currentItem.folder, currentItem.image)
                      ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.8)] border border-indigo-300 ring-2 ring-indigo-400/40"
                      : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                  }`}
                  title="Marcar como favorita de Axel"
                >
                  <span className="text-sm">🧑</span>
                  <span>{isFavorite("axel", currentItem.folder, currentItem.image) ? "Fav Axel ⭐" : "Fav Axel"}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    toggleFavorite(
                      "sofi",
                      currentItem.folder,
                      currentItem.image,
                      currentItem.albumId,
                      currentItem.title
                    )
                  }
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer transform active:scale-95 ${
                    isFavorite("sofi", currentItem.folder, currentItem.image)
                      ? "bg-fuchsia-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.8)] border border-fuchsia-300 ring-2 ring-fuchsia-400/40"
                      : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                  }`}
                  title="Marcar como favorita de Sofi"
                >
                  <span className="text-sm">💖</span>
                  <span>{isFavorite("sofi", currentItem.folder, currentItem.image) ? "Fav Sofi ✨" : "Fav Sofi"}</span>
                </button>

                {/* Slideshow Button */}
                <button
                  onClick={() => setIsSlideshow(!isSlideshow)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSlideshow
                      ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                  title={
                    isSlideshow
                      ? "Pausar presentación"
                      : "Iniciar presentación automática"
                  }
                >
                  {isSlideshow ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden sm:inline">Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden sm:inline">Diapositivas</span>
                    </>
                  )}
                </button>

                {/* Download Button */}
                <button
                  onClick={() =>
                    handleDownload(currentItem.folder, currentItem.image)
                  }
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Descargar foto"
                >
                  <Download className="w-4 h-4" />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setLightbox(null);
                    setIsSlideshow(false);
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                  title="Cerrar (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Central Image View */}
            <div className="relative flex-1 w-full max-w-5xl flex flex-col items-center justify-center my-2">
              <div className="relative flex items-center justify-center w-full">
                {/* Prev Button */}
                <button
                  onClick={goToPrevImage}
                  className="absolute left-1 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-purple-600/80 text-white backdrop-blur-md transition-all cursor-pointer"
                  title="Anterior (Flecha izquierda)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentItem.folder}-${currentItem.image}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    onDoubleClick={() => {
                      const isSofi = isFavorite("sofi", currentItem.folder, currentItem.image);
                      const target = isSofi ? "axel" : "sofi";
                      toggleFavorite(
                        target,
                        currentItem.folder,
                        currentItem.image,
                        currentItem.albumId,
                        currentItem.title
                      );
                    }}
                    className="relative max-w-full max-h-[75vh] flex items-center justify-center cursor-pointer select-none"
                    title="Doble clic para guardar en favoritas ❤️"
                  >
                    <img
                      src={getPhotoSrc(currentItem.folder, currentItem.image)}
                      alt={`Recuerdo especial de Axel & Sofía - ${currentItem.folder}`}
                      className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                    />

                    {/* Central Lightbox Heart Burst */}
                    <AnimatePresence>
                      {burstPhotos[`${currentItem.folder}-${currentItem.image}`] && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [0, 1.5, 1.2], opacity: [0, 1, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30"
                        >
                          <div className="relative">
                            <Heart
                              className={`w-24 h-24 fill-current drop-shadow-[0_0_35px_rgba(255,255,255,0.9)] ${
                                burstPhotos[`${currentItem.folder}-${currentItem.image}`].person === "axel"
                                  ? "text-indigo-400 fill-indigo-400"
                                  : "text-fuchsia-400 fill-fuchsia-400"
                              }`}
                            />
                            <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-spin" />
                          </div>
                          <span className="text-sm font-bold px-3 py-1 mt-2 rounded-full bg-black/80 text-white shadow-xl backdrop-blur-md">
                            {burstPhotos[`${currentItem.folder}-${currentItem.image}`].person === "axel"
                              ? "¡Guardada en Favoritas de Axel! 🧑💙"
                              : "¡Guardada en Favoritas de Sofi! 💖✨"}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>

                {/* Next Button */}
                <button
                  onClick={goToNextImage}
                  className="absolute right-1 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-purple-600/80 text-white backdrop-blur-md transition-all cursor-pointer"
                  title="Siguiente (Flecha derecha)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Helpful Hint under Image */}
              <div className="text-[11px] text-purple-300/60 flex items-center justify-center gap-1.5 mt-2 select-none">
                <Heart className="w-3 h-3 text-pink-400 fill-pink-400 animate-pulse" />
                <span>Tip: Doble clic en la imagen para guardar en tus favoritas</span>
              </div>
            </div>

            {/* Bottom Indicator / Thumbnails preview */}
            <div className="w-full max-w-2xl text-center z-10">
              <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-2 px-4 scrollbar-none">
                {currentLightboxItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setLightbox((prev) =>
                        prev ? { ...prev, imageIndex: i } : null
                      )
                    }
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      lightbox.imageIndex === i
                        ? "w-6 bg-purple-400"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
