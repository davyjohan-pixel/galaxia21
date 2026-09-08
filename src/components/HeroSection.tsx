"use client";

import React from "react";
import { Play, Pause, Music, Mic, Heart } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export const HeroSection: React.FC = () => {
  const { isPlaying, togglePlay, isLoading } = useAudio();

  return (
    <section id="inicio" className="w-full">
      {/* Wide panoramic banner — matching original 3:1 aspect ratio */}
      <div
        className="relative w-full overflow-hidden cursor-pointer"
        onClick={togglePlay}
      >
        {/* Background Photo — full quality, covers entire banner */}
        <img
          src="/bg-gracias-lempira.jpg"
          alt="Vista aérea de Gracias, Lempira"
          className="w-full object-cover select-none"
          style={{ height: "clamp(180px, 28vw, 420px)" }}
          decoding="async"
          fetchPriority="high"
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* ─── Content ─── */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center gap-4 sm:gap-6 md:gap-10">

            {/* Logo circular con borde amarillo */}
            <div className="shrink-0">
              <div
                className="rounded-full overflow-hidden border-[3px] border-yellow-400 shadow-xl"
                style={{ width: "clamp(60px, 10vw, 150px)", height: "clamp(60px, 10vw, 150px)" }}
              >
                <img
                  src="/logo-galaxia21.jpg"
                  alt="Logo Galaxia 21"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Textos principales */}
            <div className="flex-1 min-w-0 flex flex-col">
              <span
                className="text-white font-extrabold tracking-[0.25em] uppercase leading-none"
                style={{
                  fontSize: "clamp(10px, 1.8vw, 28px)",
                  textShadow: "2px 2px 10px rgba(0,0,0,0.9)",
                }}
              >
                RADIO
              </span>

              <span
                className="text-yellow-400 font-black tracking-tight leading-[0.95] whitespace-nowrap"
                style={{
                  fontSize: "clamp(22px, 5vw, 80px)",
                  textShadow: "3px 4px 15px rgba(0,0,0,0.95), 0 0 40px rgba(234,179,8,0.2)",
                }}
              >
                GALAXIA 21
              </span>

              <span
                className="text-white font-semibold italic leading-none mt-0.5"
                style={{
                  fontSize: "clamp(10px, 1.8vw, 26px)",
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.9)",
                }}
              >
                La Radio de Lempira
              </span>

              <span
                className="text-yellow-300 font-semibold italic leading-none mt-0.5 sm:mt-1"
                style={{
                  fontSize: "clamp(8px, 1.3vw, 20px)",
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  textShadow: "1px 1px 6px rgba(0,0,0,0.9)",
                }}
              >
                La Más Entonada
              </span>
            </div>

            {/* Micrófono a la derecha (solo en pantallas medianas+) */}
            <div className="hidden sm:flex items-end justify-center shrink-0 self-end mb-2">
              <svg
                viewBox="0 0 64 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-2xl opacity-80"
                style={{ width: "clamp(40px, 6vw, 100px)", height: "auto" }}
              >
                {/* Mic head */}
                <ellipse cx="32" cy="24" rx="18" ry="24" fill="#333" stroke="#555" strokeWidth="1.5" />
                <ellipse cx="32" cy="24" rx="14" ry="20" fill="#444" />
                {/* Grill lines */}
                <line x1="22" y1="12" x2="42" y2="12" stroke="#666" strokeWidth="0.8" />
                <line x1="20" y1="17" x2="44" y2="17" stroke="#666" strokeWidth="0.8" />
                <line x1="19" y1="22" x2="45" y2="22" stroke="#666" strokeWidth="0.8" />
                <line x1="20" y1="27" x2="44" y2="27" stroke="#666" strokeWidth="0.8" />
                <line x1="22" y1="32" x2="42" y2="32" stroke="#666" strokeWidth="0.8" />
                <line x1="24" y1="37" x2="40" y2="37" stroke="#666" strokeWidth="0.8" />
                {/* Highlight */}
                <ellipse cx="26" cy="18" rx="4" ry="8" fill="white" opacity="0.12" />
                {/* Stem */}
                <rect x="29" y="48" width="6" height="30" rx="3" fill="#444" />
                {/* Base */}
                <ellipse cx="32" cy="82" rx="16" ry="5" fill="#333" />
                <rect x="16" y="78" width="32" height="4" rx="2" fill="#444" />
              </svg>
            </div>
          </div>
        </div>

        {/* ─── Barra inferior: Buena Música | Información | Nuestra Gente ─── */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="bg-black/70 backdrop-blur-sm border-t border-yellow-400/30">
            <div className="flex items-center justify-center divide-x divide-yellow-400/40 py-1.5 sm:py-2">

              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-8">
                <Music className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 shrink-0" />
                <span className="text-white font-bold text-[9px] sm:text-xs md:text-sm whitespace-nowrap">
                  Buena Música
                </span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-8">
                <Mic className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 shrink-0" />
                <span className="text-white font-bold text-[9px] sm:text-xs md:text-sm whitespace-nowrap">
                  Información
                </span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-8">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400 shrink-0" />
                <span className="text-white font-bold text-[9px] sm:text-xs md:text-sm whitespace-nowrap">
                  Nuestra Gente
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Hover Play/Pause indicator */}
        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-sm rounded-full p-3 sm:p-5 shadow-2xl border border-yellow-400/40">
            {isLoading ? (
              <div className="w-6 h-6 sm:w-10 sm:h-10 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6 sm:w-10 sm:h-10 text-yellow-400 fill-yellow-400" />
            ) : (
              <Play className="w-6 h-6 sm:w-10 sm:h-10 text-yellow-400 fill-yellow-400 translate-x-0.5" />
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
