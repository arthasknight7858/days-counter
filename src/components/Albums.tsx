"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Albums() {
  const [openAlbum, setOpenAlbum] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ albumId: string, imageIndex: number } | null>(null);

  const albums = [
    {
      id: "juntos",
      icon: "🫶",
      title: "Juntos",
      folder: "juntos",
      images: [
        "juntos 1.jpeg", "juntos 2.jpeg", "juntos 3.jpeg", "juntos 4.jpeg", 
        "juntos 5.png", "juntos 6.png", "juntos 7.png", "juntos 8.png", "juntos 9.png"
      ]
    },
    {
      id: "ella",
      icon: "💖",
      title: "Ella",
      folder: "Sofi",
      images: [
        "sofi.png", "sofi1.png", "sofi2.png", "sofi3.png", "sofi4.png", 
        "sofi 5.png", "sofi 6.png", "sofi 7.png", "sofi 8.png", "sofi 9.png", 
        "sofi10.png", "sofi 11.png", "sofi12.png", "sofi 13.png", "sofi14.png", 
        "sofi 15.png", "sofi16.png", "sofi 17.png", "sofi 18.png", "sofi 19.png", 
        "sofi20.png", "sofi21.png", "sofi22.png", "sofi23.png", "sofi 24.png", 
        "sofi 25.png", "sofi26.png", "sofi27.png"
      ]
    },
    {
      id: "kukis",
      icon: "😻",
      title: "Kukiss",
      folder: "kukis",
      images: [
        "kukis 1.jpg", "kukis 2.jpg", "kukis 3.png", "kukis4.png", 
        "kukis5.jpg", "kukis 6.jpg", "kukis7.jpg"
      ]
    },
    {
      id: "besos",
      icon: "✨",
      title: "Momentos especiales",
      folder: "besos",
      images: [
        "beso1.png", "beso 2.png", "beso 3.png", "beso 4.png", 
        "beso 5.png", "beso 6.png", "beso 7.png", "beso 8.png", "besito.png"
      ]
    },
    {
      id: "xv",
      icon: "🎉",
      title: "Imaginando fiesta de XV",
      folder: "juntos",
      images: [
        "xv.png", "xv2.png"
      ]
    }
  ];

  const currentAlbum = lightbox ? albums.find(a => a.id === lightbox.albumId) : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox || !currentAlbum) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") {
        setLightbox(prev => prev ? { ...prev, imageIndex: (prev.imageIndex + 1) % currentAlbum.images.length } : null);
      }
      if (e.key === "ArrowLeft") {
        setLightbox(prev => prev ? { ...prev, imageIndex: (prev.imageIndex - 1 + currentAlbum.images.length) % currentAlbum.images.length } : null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, currentAlbum]);

  return (
    <>
      <section className="w-full max-w-4xl mx-auto mt-8 px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-3 flex items-baseline gap-3">
            <span className="text-white">Nuestros</span>
            <span className="text-purple-400 italic font-serif tracking-wide">álbumes</span>
          </h2>
          <p className="text-purple-200/70 text-lg tracking-wide">
            Toca cada álbum para revivir nuestros recuerdos
          </p>
        </motion.div>

        <div className="space-y-4">
          {albums.map((album, idx) => (
            <motion.div 
              key={album.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="border border-purple-500/20 bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(168,85,247,0.05)] transition-colors hover:border-purple-500/40"
            >
              <button
                onClick={() => setOpenAlbum(openAlbum === album.id ? null : album.id)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl">{album.icon}</span>
                  <span className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                    {album.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-purple-300">
                  <span className="text-sm font-medium opacity-80">{album.images.length} fotos</span>
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                        {album.images.map((img, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (i % 10) * 0.05, duration: 0.3 }}
                            className="aspect-square relative rounded-xl overflow-hidden group cursor-pointer"
                            onClick={() => setLightbox({ albumId: album.id, imageIndex: i })}
                          >
                            <img 
                              src={`/assets/${album.folder}/${img}`}
                              alt={`${album.title} photo ${i + 1}`}
                              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/20 transition-colors duration-300" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && currentAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all z-10"
              onClick={() => setLightbox(null)}
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Prev button */}
            <button 
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(prev => prev ? { ...prev, imageIndex: (prev.imageIndex - 1 + currentAlbum.images.length) % currentAlbum.images.length } : null);
              }}
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Next button */}
            <button 
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(prev => prev ? { ...prev, imageIndex: (prev.imageIndex + 1) % currentAlbum.images.length } : null);
              }}
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Image container */}
            <motion.div
              key={lightbox.imageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <img 
                src={`/assets/${currentAlbum.folder}/${currentAlbum.images[lightbox.imageIndex]}`}
                alt={`${currentAlbum.title} photo ${lightbox.imageIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Image counter */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/70 text-sm tracking-wide bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
                {lightbox.imageIndex + 1} / {currentAlbum.images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
