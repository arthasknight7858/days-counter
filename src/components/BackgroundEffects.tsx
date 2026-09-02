"use client";

import React, { useMemo } from "react";

interface ParticleData {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  tx: number;
  targetOpacity: number;
}

export default function BackgroundEffects() {
  const particles = useMemo<ParticleData[]>(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: ((i * 4.3 + 3) % 96),
      top: ((i * 7.7 + 5) % 94),
      size: (i % 3) + 1.5,
      duration: 12 + (i % 7) * 2,
      delay: (i % 6) * 1.2,
      tx: (i % 2 === 0 ? 1 : -1) * (15 + (i % 20)),
      targetOpacity: 0.25 + (i % 4) * 0.12,
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#070514]"
      style={{ contain: "paint" }}
    >
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-purple-900/25 via-[#070514] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-fuchsia-900/15 via-transparent to-transparent" />

      {/* Floating glowing orbs with pure CSS GPU acceleration */}
      <div className="absolute top-[18%] left-[12%] w-64 h-64 sm:w-96 sm:h-96 bg-purple-600/20 rounded-full blur-[90px] will-change-transform transform-gpu animate-orb-1" />
      <div className="absolute bottom-[20%] right-[8%] w-72 h-72 sm:w-110 sm:h-110 bg-fuchsia-700/15 rounded-full blur-[100px] will-change-transform transform-gpu animate-orb-2" />
      <div className="absolute top-[60%] left-[30%] w-48 h-48 sm:w-72 sm:h-72 bg-violet-600/10 rounded-full blur-[80px] will-change-transform transform-gpu animate-orb-1" />

      {/* Small floating glowing particles running entirely via CSS GPU keyframes */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-purple-300 shadow-[0_0_6px_rgba(216,180,254,0.8)] bg-particle pointer-events-none transform-gpu"
          style={
            {
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              "--duration": `${p.duration}s`,
              "--delay": `${p.delay}s`,
              "--tx": `${p.tx}px`,
              "--target-opacity": p.targetOpacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
