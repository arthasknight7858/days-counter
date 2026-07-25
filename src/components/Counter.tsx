"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Counter({ startDate }: { startDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  const units = [
    { label: "DÍAS", value: timeLeft.days },
    { label: "HORAS", value: timeLeft.hours },
    { label: "MINUTOS", value: timeLeft.minutes },
    { label: "SEGUNDOS", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-12 mb-8">
      {units.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.8, type: "spring" }}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.4)" }}
          className="relative overflow-hidden group w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-[0_0_15px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center transition-all duration-300"
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/0 via-purple-500/5 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <motion.span 
            key={unit.value}
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-purple-300 mb-1 drop-shadow-[0_2px_10px_rgba(168,85,247,0.3)]"
          >
            {unit.value}
          </motion.span>
          <span className="text-xs sm:text-sm font-medium tracking-widest text-purple-200/70">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
