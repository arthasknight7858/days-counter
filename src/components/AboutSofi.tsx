"use client";

import { motion } from "framer-motion";
import { Music, Tv, Palette, Utensils, Flower2, Trophy, Dog } from "lucide-react";

export default function AboutSofi() {
  const cards = [
    {
      id: "music",
      icon: <Music className="w-6 h-6 text-purple-400" />,
      title: "SU BANDA SONORA",
      content: "BTS (K-pop)",
    },
    {
      id: "series",
      icon: <Tv className="w-6 h-6 text-purple-400" />,
      title: "SERIES FAVORITAS",
      content: "True beauty, Beso de sirena, XOXO Kitty, Qué le pasa a la secretaria Kim?, Propuesta laboral, Perfect crown",
    },
    {
      id: "color",
      icon: <Palette className="w-6 h-6 text-purple-400" />,
      title: "COLOR FAVORITO",
      content: "Morado",
    },
    {
      id: "food",
      icon: <Utensils className="w-6 h-6 text-purple-400" />,
      title: "SABORES PREFERIDOS",
      content: "Salchipapa, tres leches arroz con leche, gomitas, pollito con papas",
    },
    {
      id: "flowers",
      icon: <Flower2 className="w-6 h-6 text-purple-400" />,
      title: "FLORES FAVORITAS",
      content: "Tulipanes y rosas",
    },
    {
      id: "sport",
      icon: <Trophy className="w-6 h-6 text-purple-400" />,
      title: "PASIÓN DEPORTIVA",
      content: "Voleyball",
    },
    {
      id: "pet",
      icon: <Dog className="w-6 h-6 text-purple-400" />,
      title: "SU FIEL GUARDIÁN",
      content: "Kukiss",
    },
  ];

  const letterParagraphs = [
    "Sofi, Mi amor...",
    "Quiero decirte que te amo muchisimo, entraste a mi vida en el mejor momento posible y este ultimo mes a tu lado la he pasado como nunca, cada segundo contigo es tan valioso como el oro y conocerte hace 3 meses fue lo mejor que me ha podido pasar, con cada abrazo me aferro mas a ti y cada beso me hace sentir la persona mas afortunada del mundo, a pesar de estar rodeados siempre de muchas personas somos solo nosotros siempre, amo tu carita tierna, tu hermosa sonrisa, tus ojitos, tus labios, amo como eres conmigo, como me hablas, como me celas porque me amas, te amo simplemente a ti.",
    "Gracias por permitirme ser parte de tu historia, por cada momento juntos, por ser mi lugar seguro. Eres mi persona favorita en el mundo, mi \"bebesita\", y esto apenas es un mes de todo lo que nos falta por vivir, recuerda que siempre estaré para ti.",
    "Gracias por estar conmigo, te amo mucho mi vida, feliz primer mes juntos:3.",
    "Te amo con toda mi alma, hoy y siempre."
  ];

  return (
    <section className="w-full max-w-5xl mx-auto mt-16 sm:mt-24 px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-3 flex items-baseline gap-3">
          <span className="text-white">Sobre</span>
          <span className="text-purple-400 italic font-serif tracking-wide">Sofía</span>
        </h2>
        <p className="text-purple-200/70 text-lg tracking-wide uppercase">El universo que encontré en ti</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.4)" }}
            className="bg-white/5 backdrop-blur-md border border-purple-500/20 rounded-2xl p-6 flex flex-col justify-center min-h-35 transition-all duration-300 group"
          >
            <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300 origin-left">
              {card.icon}
            </div>
            <h3 className="text-xs font-semibold tracking-widest text-purple-300/80 uppercase mb-2">
              {card.title}
            </h3>
            <p className="text-white/90 font-medium text-sm sm:text-base leading-relaxed">
              {card.content}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative bg-white/5 backdrop-blur-xl border-l-4 border-purple-500 rounded-r-3xl p-8 sm:p-12 shadow-[0_0_40px_rgba(168,85,247,0.1)]"
      >
        {/* Decorative quote mark */}
        <div className="absolute top-4 left-6 text-6xl text-purple-500/20 font-serif leading-none select-none">&quot;</div>
        
        <div className="relative z-10 space-y-6 text-purple-50/90 text-lg sm:text-xl font-serif italic leading-relaxed">
          {letterParagraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <div className="pt-6 text-right font-bold text-purple-300 not-italic">
            — tu novio Axel :3
          </div>
        </div>
      </motion.div>
    </section>
  );
}
