"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Albums() {
  const [openAlbum, setOpenAlbum] = useState<string | null>(null);

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
        "sofi 25.png"
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

  return (
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
  );
}
