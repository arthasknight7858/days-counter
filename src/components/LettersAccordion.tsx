"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, Heart } from "lucide-react";

interface Letter {
  id: string;
  title: string;
  date: string;
  content: React.ReactNode;
}

export default function LettersAccordion() {
  const letters: Letter[] = [
    {
      id: "mes-1",
      title: "Carta del Primer Mes",
      date: "8 de Agosto de 2026",
      content: (
        <div className="space-y-4 text-purple-100/90 leading-relaxed font-serif text-xl">
          <p>Sofi, Mi amor...</p>
          <p>Quiero decirte que te amo muchisimo, entraste a mi vida en el mejor momento posible y este ultimo mes a tu lado la he pasado como nunca, cada segundo contigo es tan valioso como el oro y conocerte hace 3 meses fue lo mejor que me ha podido pasar, con cada abrazo me aferro mas a ti y cada beso me hace sentir la persona mas afortunada del mundo, a pesar de estar rodeados siempre de muchas personas somos solo nosotros siempre, amo tu carita tierna, tu hermosa sonrisa, tus ojitos, tus labios, amo como eres conmigo, como me hablas, como me celas porque me amas, te amo simplemente a ti.</p>
          <p>Gracias por permitirme ser parte de tu historia, por cada momento juntos, por ser mi lugar seguro. Eres mi persona favorita en el mundo, mi &quot;bebesita&quot;, y esto apenas es un mes de todo lo que nos falta por vivir, recuerda que siempre estaré para ti.</p>
          <p>Gracias por estar conmigo, te amo mucho mi vida, feliz primer mes juntos:3.</p>
          <p>Te amo con toda mi alma, hoy y siempre.</p>
          <div className="pt-6 text-right font-bold text-pink-300 not-italic">
            — tu novio Axel :3
          </div>
        </div>
      )
    }
    // Puedes agregar más cartas aquí para el mes 2, mes 3, copiando el bloque de arriba y pegándolo debajo.
  ];

  // Iniciar con la última carta abierta
  const [openLetterId, setOpenLetterId] = useState<string | null>(
    letters.length > 0 ? letters[letters.length - 1].id : null
  );

  const toggleLetter = (id: string) => {
    // Si se abre otra se cierra la otra que estaba abierta
    setOpenLetterId(openLetterId === id ? null : id);
  };

  return (
    <section className="w-full max-w-4xl mx-auto mt-8 px-4 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-3 flex items-center gap-3">
          <span className="text-white">Cartas</span>
          <span className="text-pink-400 italic font-serif tracking-wide">para ti</span>
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400 fill-pink-400 animate-heartbeat ml-1" />
        </h2>
        <p className="text-purple-200/70 text-lg tracking-wide">
          Palabras de amor para cada mes que pasamos juntos
        </p>
      </motion.div>

      <div className="space-y-4">
        {letters.map((letter, idx) => {
          const isOpen = openLetterId === letter.id;

          return (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="border border-pink-500/20 bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(236,72,153,0.05)] transition-colors hover:border-pink-500/40"
            >
              <button
                onClick={() => toggleLetter(letter.id)}
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 text-left transition-colors gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full transition-colors ${isOpen ? 'bg-pink-500/20 text-pink-300' : 'bg-white/10 text-white/70'}`}>
                    {isOpen ? <Heart className="w-6 h-6 fill-pink-400 text-pink-400 animate-heartbeat" /> : <Mail className="w-6 h-6 animate-heartbeat" />}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                      {letter.title}
                    </h3>
                    <p className="text-sm text-pink-200/70 mt-1">{letter.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center self-end sm:self-auto gap-3 text-pink-300">
                  <span className="text-sm font-medium opacity-80 sm:hidden">
                    {isOpen ? "Cerrar" : "Leer carta"}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-pink-400 animate-heartbeat" />
                  </motion.div>
                </div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-2 border-t border-white/5 mx-6">
                      <div className="bg-white/5 rounded-xl p-6 sm:p-8 relative">
                        {/* Decorative quotes */}
                        <div className="absolute top-4 left-4 text-4xl text-pink-500/20 font-serif">&quot;</div>
                        <div className="absolute bottom-4 right-4 text-4xl text-pink-500/20 font-serif">&quot;</div>
                        
                        <div className="relative z-10">
                          {letter.content}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
