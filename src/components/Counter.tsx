"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Clock, CalendarHeart, ChevronDown } from "lucide-react";

export default function Counter({ startDate }: { startDate: Date }) {
  const [showMilestones, setShowMilestones] = useState(false);
  const [timeStats, setTimeStats] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalHours: 0,
    totalMinutes: 0,
    heartbeats: 0,
    daysToNextMonth: 0,
    monthsCompleted: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        const totalHours = Math.floor(difference / (1000 * 60 * 60));
        const totalMinutes = Math.floor(difference / (1000 * 60));
        // Average resting heart rate ~80 bpm
        const heartbeats = Math.floor(totalMinutes * 80);

        // Next month anniversary calculation (Day 8 of upcoming month)
        const nextMonth = new Date(now.getFullYear(), now.getMonth(), 8);
        if (now.getDate() >= 8) {
          nextMonth.setMonth(nextMonth.getMonth() + 1);
        }
        const diffToNext = nextMonth.getTime() - now.getTime();
        const daysToNextMonth = Math.max(0, Math.ceil(diffToNext / (1000 * 60 * 60 * 24)));

        // Approximate months completed
        let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
        if (now.getDate() < startDate.getDate()) {
          months--;
        }

        setTimeStats({
          days,
          hours,
          minutes,
          seconds,
          totalHours,
          totalMinutes,
          heartbeats,
          daysToNextMonth,
          monthsCompleted: Math.max(0, months),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  const units = [
    { label: "DÍAS", value: timeStats.days },
    { label: "HORAS", value: timeStats.hours },
    { label: "MINUTOS", value: timeStats.minutes },
    { label: "SEGUNDOS", value: timeStats.seconds },
  ];

  return (
    <div className="flex flex-col items-center w-full mt-10 mb-6">
      {/* 4 Main Cards */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
        {units.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(168, 85, 247, 0.4)" }}
            className="relative overflow-hidden group w-20 h-22 sm:w-28 sm:h-28 rounded-2xl bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-[0_0_15px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center transition-all duration-300"
          >
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/0 via-purple-500/5 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <motion.span
              key={unit.value}
              initial={{ opacity: 0.5, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-2xl sm:text-4xl font-bold text-purple-300 mb-0.5 sm:mb-1 drop-shadow-[0_2px_10px_rgba(168,85,247,0.3)] font-mono"
            >
              {unit.value}
            </motion.span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-purple-200/70">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Romantic Stats Toggle */}
      <button
        onClick={() => setShowMilestones(!showMilestones)}
        className="mt-5 flex items-center gap-2 text-xs text-purple-300/80 hover:text-purple-200 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full border border-purple-500/20 transition-all cursor-pointer shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
        <span>{showMilestones ? "Ocultar detalles de nuestra historia" : "Ver estadísticas de nuestro amor"}</span>
        <motion.div animate={{ rotate: showMilestones ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
        </motion.div>
      </button>

      {/* Milestones Card */}
      <AnimatePresence>
        {showMilestones && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-xl mt-4 px-2"
          >
            <div className="bg-purple-950/40 border border-purple-500/25 rounded-2xl p-4 sm:p-5 backdrop-blur-xl grid grid-cols-2 sm:grid-cols-3 gap-3 text-center shadow-lg">
              <div className="p-3 bg-white/5 rounded-xl border border-purple-500/10 flex flex-col items-center justify-center">
                <CalendarHeart className="w-5 h-5 text-pink-400 mb-1 animate-heartbeat" />
                <span className="text-lg sm:text-xl font-bold text-white font-mono">
                  {timeStats.monthsCompleted} {timeStats.monthsCompleted === 1 ? "mes" : "meses"}
                </span>
                <span className="text-[11px] text-purple-300/70">Cumplidos juntos</span>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-purple-500/10 flex flex-col items-center justify-center">
                <Clock className="w-5 h-5 text-purple-400 mb-1" />
                <span className="text-lg sm:text-xl font-bold text-white font-mono">
                  {timeStats.totalHours.toLocaleString()}h
                </span>
                <span className="text-[11px] text-purple-300/70">Horas compartidas</span>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-purple-500/10 flex flex-col items-center justify-center col-span-2 sm:col-span-1">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400 mb-1 animate-heartbeat" />
                <span className="text-lg sm:text-xl font-bold text-white font-mono">
                  ~{(timeStats.heartbeats / 1000).toFixed(0)}k
                </span>
                <span className="text-[11px] text-purple-300/70">Latidos compartidos</span>
              </div>

              <div className="col-span-2 sm:col-span-3 p-2.5 bg-pink-500/10 border border-pink-500/20 rounded-xl text-xs text-pink-200/90 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                <span>
                  Faltan solo <strong className="text-white font-bold">{timeStats.daysToNextMonth} días</strong> para nuestro próximo mesario el día 8 ✨
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
