"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  targetX: number;
  targetOpacity: number;
}

export default function BackgroundEffects() {
  // Generate random particles only after mounting to prevent hydration mismatch
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      targetX: Math.random() * 10 - 5,
      targetOpacity: Math.random() * 0.5 + 0.2,
    }));
    
    // eslint-disable-next-line
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return <div className="fixed inset-0 bg-[#070514] -z-10" />; // Fallback dark background

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#070514]">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-purple-900/20 via-[#070514] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-fuchsia-900/10 via-transparent to-transparent" />
      
      {/* Floating glowing orbs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[15%] w-64 h-64 sm:w-96 sm:h-96 bg-purple-600/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] right-[10%] w-72 h-72 sm:w-125 sm:h-125 bg-fuchsia-700/15 rounded-full blur-[120px]"
      />

      {/* Small floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-purple-300 shadow-[0_0_8px_rgba(216,180,254,0.8)]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [`${particle.y}%`, `${particle.y - 20}%`, `${particle.y}%`],
            x: [`${particle.x}%`, `${particle.x + particle.targetX}%`, `${particle.x}%`],
            opacity: [0, particle.targetOpacity, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
