"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cake,
  Sparkles,
  Heart,
  Gift,
  Star,
  PartyPopper,
  Calendar,
  Clock,
  Edit3,
  Plus,
  Trash2,
} from "lucide-react";

interface BirthdayPerson {
  id: "axel" | "sofi";
  name: string;
  day: number;
  month: number; // 0-indexed: 0 = Enero, 7 = Agosto
  dateString: string;
  zodiac: string;
  zodiacSymbol: string;
  element: string;
  elementIcon: string;
  avatar: string;
  themeColor: {
    border: string;
    glow: string;
    gradient: string;
    textAccent: string;
    badgeBg: string;
  };
}

const BIRTHDAYS: BirthdayPerson[] = [
  {
    id: "axel",
    name: "Axel",
    day: 18,
    month: 0, // Enero
    dateString: "18 de Enero",
    zodiac: "Capricornio",
    zodiacSymbol: "♑",
    element: "Tierra",
    elementIcon: "🌍",
    avatar: "/assets/axel/axel11.jpeg",
    themeColor: {
      border: "border-indigo-500/30",
      glow: "rgba(99, 102, 241, 0.3)",
      gradient: "from-indigo-600/20 via-purple-600/10 to-transparent",
      textAccent: "text-indigo-300",
      badgeBg: "bg-indigo-500/20 text-indigo-200 border-indigo-500/30",
    },
  },
  {
    id: "sofi",
    name: "Sofía",
    day: 14,
    month: 7, // Agosto
    dateString: "14 de Agosto",
    zodiac: "Leo",
    zodiacSymbol: "♌",
    element: "Fuego",
    elementIcon: "🔥",
    avatar: "/assets/Sofi/sofi28.png",
    themeColor: {
      border: "border-fuchsia-500/30",
      glow: "rgba(217, 70, 239, 0.3)",
      gradient: "from-fuchsia-600/20 via-rose-600/10 to-transparent",
      textAccent: "text-fuchsia-300",
      badgeBg: "bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-500/30",
    },
  },
];

interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  totalDays: number;
  nextDate: Date;
}

export default function BirthdaysSection() {
  const [celebratingTarget, setCelebratingTarget] = useState<string | null>(null);
  const [now, setNow] = useState<Date>(() => new Date());

  // Mensajes de cumpleaños persistentes
  const [messages, setMessages] = useState<{ axel: string; sofi: string }>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("sofi_axel_birthday_messages_v1");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === "object") {
            return {
              axel: typeof parsed.axel === "string" ? parsed.axel : "",
              sofi: typeof parsed.sofi === "string" ? parsed.sofi : "",
            };
          }
        }
      } catch {}
    }
    return {
      axel: "",
      sofi: "",
    };
  });
  const [editingPerson, setEditingPerson] = useState<"axel" | "sofi" | null>(null);
  const [inputText, setInputText] = useState("");
  const [isSavingMessage, setIsSavingMessage] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    fetch("/api/birthday-messages")
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled && data.messages) {
          setMessages(data.messages);
          if (typeof window !== "undefined") {
            localStorage.setItem(
              "sofi_axel_birthday_messages_v1",
              JSON.stringify(data.messages)
            );
          }
        }
      })
      .catch((err) => console.error("Error loading birthday messages:", err));

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleSaveMessage = async (person: "axel" | "sofi") => {
    const trimmed = inputText.trim();
    const updated = { ...messages, [person]: trimmed };
    setMessages(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "sofi_axel_birthday_messages_v1",
        JSON.stringify(updated)
      );
    }
    setEditingPerson(null);
    setInputText("");
    try {
      setIsSavingMessage(true);
      await fetch("/api/birthday-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person, message: trimmed }),
      });
    } catch (e) {
      console.error("Error saving birthday message:", e);
    } finally {
      setIsSavingMessage(false);
    }
  };

  const handleDeleteMessage = async (person: "axel" | "sofi") => {
    const updated = { ...messages, [person]: "" };
    setMessages(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "sofi_axel_birthday_messages_v1",
        JSON.stringify(updated)
      );
    }
    try {
      await fetch("/api/birthday-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person, message: "" }),
      });
    } catch (e) {
      console.error("Error deleting birthday message:", e);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getCountdown = useCallback(
    (month: number, day: number): CountdownData => {
      const currentYear = now.getFullYear();
      let target = new Date(currentYear, month, day, 0, 0, 0);

      // Si ya pasó este año, el próximo es el año siguiente
      if (
        now.getMonth() > month ||
        (now.getMonth() === month && now.getDate() > day)
      ) {
        target = new Date(currentYear + 1, month, day, 0, 0, 0);
      }

      const isToday = now.getMonth() === month && now.getDate() === day;

      const diff = target.getTime() - now.getTime();

      if (isToday) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
          totalDays: 0,
          nextDate: target,
        };
      }

      const totalDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      return {
        days,
        hours,
        minutes,
        seconds,
        isToday: false,
        totalDays,
        nextDate: target,
      };
    },
    [now]
  );

  const countdowns = useMemo(() => {
    return {
      axel: getCountdown(0, 18),
      sofi: getCountdown(7, 14),
    };
  }, [getCountdown]);

  // Quién tiene el cumple más cercano
  const nextCelebration = useMemo(() => {
    if (countdowns.axel.isToday) return { person: BIRTHDAYS[0], isToday: true };
    if (countdowns.sofi.isToday) return { person: BIRTHDAYS[1], isToday: true };

    if (countdowns.axel.totalDays <= countdowns.sofi.totalDays) {
      return {
        person: BIRTHDAYS[0],
        days: countdowns.axel.totalDays,
        isToday: false,
      };
    }
    return {
      person: BIRTHDAYS[1],
      days: countdowns.sofi.totalDays,
      isToday: false,
    };
  }, [countdowns]);

  const triggerCelebration = (target: string) => {
    setCelebratingTarget(target);
    setTimeout(() => {
      setCelebratingTarget(null);
    }, 4000);
  };

  return (
    <section className="w-full max-w-5xl mx-auto mt-16 sm:mt-24 px-4 pb-16 relative">
      {/* Floating Confetti / Particles on celebration */}
      <AnimatePresence>
        {celebratingTarget && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
            {Array.from({ length: 32 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  scale: 0.2,
                  x: 0,
                  y: 0,
                  rotate: 0,
                }}
                animate={{
                  opacity: 0,
                  scale: [0.5, 1.6, 1.2],
                  x: (i % 2 === 0 ? 1 : -1) * (50 + (i % 8) * 45),
                  y: -120 - (i % 7) * 50,
                  rotate: (i % 2 === 0 ? 1 : -1) * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3.2, ease: "easeOut" }}
                className="absolute text-2xl sm:text-3xl"
              >
                {i % 5 === 0
                  ? "🎂"
                  : i % 5 === 1
                  ? "💖"
                  : i % 5 === 2
                  ? "🎉"
                  : i % 5 === 3
                  ? "✨"
                  : "🥳"}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cake className="w-3.5 h-3.5 text-purple-400 animate-bounce" />
            Fechas Inolvidables
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold flex flex-wrap items-baseline gap-3 justify-center sm:justify-start">
            <span className="text-white">Cumpleaños</span>
            <span className="text-purple-400 italic font-serif tracking-wide">
              de ambos
            </span>
          </h2>
          <p className="text-purple-200/70 text-base sm:text-lg tracking-wide mt-2">
            El día que llegaron al mundo para encontrarse y amarse para siempre
          </p>
        </div>

        {/* Global celebration button */}
        <button
          onClick={() => triggerCelebration("both")}
          className="self-center sm:self-end px-5 py-2.5 rounded-full bg-linear-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <PartyPopper className="w-4 h-4" />
          <span>¡Celebrar a ambos! 🎉</span>
        </button>
      </motion.div>

      {/* Next Celebration Highlight Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 p-4 sm:p-5 rounded-2xl bg-linear-to-r from-purple-950/60 via-fuchsia-950/40 to-indigo-950/60 border border-purple-500/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_4px_25px_rgba(168,85,247,0.1)]"
      >
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-purple-300 animate-spin" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-purple-300/80">
              Próxima gran celebración
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <span>Cumpleaños de {nextCelebration.person.name}</span>
              <span className="text-sm px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
                {nextCelebration.person.dateString}
              </span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {nextCelebration.isToday ? (
            <span className="px-4 py-2 rounded-xl bg-pink-500/30 border border-pink-400 text-pink-200 font-bold text-sm animate-pulse">
              🎉 ¡HOY ES SU CUMPLE! 🎂
            </span>
          ) : (
            <div className="text-center sm:text-right">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-300">
                {nextCelebration.days}
              </span>
              <span className="text-xs uppercase tracking-wider text-purple-200/70 ml-1.5 font-medium">
                días restantes
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Side-by-Side Birthday Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {BIRTHDAYS.map((person, idx) => {
          const cd = countdowns[person.id];
          const isAxel = person.id === "axel";

          return (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className={`relative rounded-3xl bg-linear-to-b ${person.themeColor.gradient} bg-white/5 backdrop-blur-xl border ${person.themeColor.border} p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 group`}
            >
              {/* Subtle background glow */}
              <div
                className="absolute -right-20 -top-20 w-52 h-52 rounded-full blur-3xl pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity"
                style={{ backgroundColor: person.themeColor.glow }}
              />

              {/* Card Header with Avatar & Details */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    {/* Glowing Avatar */}
                    <div className="relative">
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 shadow-lg object-cover"
                        style={{ borderColor: isAxel ? "#818cf8" : "#f472b6" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#0a071e] border border-white/20 flex items-center justify-center text-sm shadow-md">
                        {isAxel ? "🧑" : "👑"}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-wide">
                          {person.name}
                        </h3>
                        <span className="text-lg">{person.zodiacSymbol}</span>
                      </div>
                    </div>
                  </div>

                  {/* Zodiac & Element pill */}
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${person.themeColor.badgeBg} flex items-center gap-1`}
                    >
                      <span>{person.elementIcon}</span>
                      <span>{person.zodiac}</span>
                    </span>
                    <span className="text-[10px] text-white/50 tracking-wider">
                      Elemento {person.element}
                    </span>
                  </div>
                </div>

                {/* Date Highlight */}
                <div className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-2xl bg-black/30 border border-white/10 w-fit">
                  <Calendar className="w-4 h-4 text-purple-300" />
                  <span className="text-sm font-semibold text-white tracking-wide">
                    {person.dateString}
                  </span>
                </div>

                {/* Countdown Block */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-purple-200/70 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      Cuenta regresiva
                    </span>
                    {cd.isToday ? (
                      <span className="text-pink-300 font-bold">¡Día especial!</span>
                    ) : (
                      <span>Próximo festejo</span>
                    )}
                  </div>

                  {cd.isToday ? (
                    <div className="p-4 rounded-2xl bg-pink-500/20 border border-pink-400/40 text-center animate-pulse">
                      <p className="text-lg font-bold text-pink-200">
                        🎂 ¡Hoy es el cumpleaños de {person.name}! 🎉
                      </p>
                      <p className="text-xs text-white/80 mt-1">
                        ¡Llénalo/a de besos, abrazos y todo el amor del mundo!
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: "DÍAS", value: cd.days },
                        { label: "HORAS", value: cd.hours },
                        { label: "MIN", value: cd.minutes },
                        { label: "SEG", value: cd.seconds },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="p-2 sm:p-2.5 rounded-xl bg-black/40 border border-white/10 flex flex-col items-center justify-center text-center"
                        >
                          <span className="text-lg sm:text-xl font-bold font-mono text-white">
                            {String(item.value).padStart(2, "0")}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-purple-200/60 font-semibold">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Custom Birthday Message Section */}
                <div className="mb-6">
                  {editingPerson === person.id ? (
                    <div className="p-4 rounded-2xl bg-black/50 border border-purple-500/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-purple-200/90 flex items-center gap-1.5">
                          <Edit3 className="w-3.5 h-3.5 text-purple-400" />
                          <span>
                            {isAxel
                              ? "Mensaje de cumpleaños para Axel 🧑"
                              : "Mensaje de cumpleaños para Sofi 💖"}
                          </span>
                        </label>
                      </div>
                      <textarea
                        rows={3}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={
                          isAxel
                            ? "Escribe tus lindos deseos y palabras para Axel en su cumpleaños..."
                            : "Escribe tus lindos deseos y palabras para Sofi en su cumpleaños..."
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-purple-500/30 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-purple-400 transition-colors resize-none"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPerson(null);
                            setInputText("");
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs text-purple-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          disabled={isSavingMessage || !inputText.trim()}
                          onClick={() => handleSaveMessage(person.id)}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold text-white shadow-md disabled:opacity-50 transition-all cursor-pointer ${
                            isAxel
                              ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30"
                              : "bg-fuchsia-600 hover:bg-fuchsia-500 shadow-fuchsia-600/30"
                          }`}
                        >
                          Guardar mensaje 💌
                        </button>
                      </div>
                    </div>
                  ) : messages[person.id] ? (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 relative group">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-purple-100/90 italic leading-relaxed font-sans flex-1">
                          &ldquo;{messages[person.id]}&rdquo;
                        </p>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPerson(person.id);
                              setInputText(messages[person.id]);
                            }}
                            className="p-1.5 rounded-lg opacity-60 hover:opacity-100 hover:bg-white/10 text-purple-300 transition-all cursor-pointer"
                            title="Editar mensaje"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMessage(person.id)}
                            className="p-1.5 rounded-lg opacity-40 hover:opacity-100 hover:bg-rose-500/20 text-rose-300 transition-all cursor-pointer"
                            title="Eliminar mensaje"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPerson(person.id);
                        setInputText("");
                      }}
                      className="w-full py-3.5 px-4 rounded-2xl border border-dashed border-purple-500/30 hover:border-purple-400 bg-white/5 hover:bg-white/10 text-purple-200 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer group"
                    >
                      <Plus className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span>
                        {isAxel
                          ? "Agregar mensaje de cumpleaños para Axel ✍️"
                          : "Agregar mensaje de cumpleaños para Sofía ✍️"}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => triggerCelebration(person.id)}
                className={`w-full py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAxel
                    ? "bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-100 border border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                    : "bg-fuchsia-600/30 hover:bg-fuchsia-600/50 text-fuchsia-100 border border-fuchsia-500/40 shadow-[0_0_15px_rgba(217,70,239,0.2)]"
                }`}
              >
                <Gift className="w-4 h-4" />
                <span>Desear feliz cumpleaños a {person.name} 🎁</span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Cosmic Connection & Fun Facts Footer */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8 p-5 sm:p-6 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-purple-300 fill-purple-300 animate-heartbeat" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Nuestra Armonía Cósmica: Capricornio ♑ & Leo ♌
            </h4>
            <p className="text-xs text-purple-200/70 mt-0.5">
              Tierra y Fuego: La firmeza protectora de Axel y la luz brillante y tierna de Sofi. ¡208 días de magia entre nuestros cumpleaños!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
          <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          <span>Destinados a brillar juntos</span>
        </div>
      </motion.div>
    </section>
  );
}
