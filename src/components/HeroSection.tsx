"use client";

import React from "react";
import { Play, Pause, Music, Mic, Heart } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export const HeroSection: React.FC = () => {
  const { isPlaying, togglePlay, isLoading } = useAudio();

  return (
    <section id="inicio" className="w-full">
      {/* Banner built entirely in code over the background photo */}
      <div
        className="relative w-full overflow-hidden cursor-pointer"
        onClick={togglePlay}
        style={{ aspectRatio: "3 / 1" }}
      >
        {/* Background Photo — full quality, no compression */}
        <img
          src="/bg-gracias-lempira.jpg"
          alt="Vista aérea de Gracias, Lempira"
          className="absolute inset-0 w-full h-full object-cover select-none"
          decoding="async"
          fetchPriority="high"
        />

        {/* Dark overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/50" />

        {/* Content Layer */}
        <div className="relative z-10 h-full flex items-center px-4 sm:px-8 md:px-12 lg:px-16">
          
          {/* Left: Logo */}
          <div className="shrink-0 mr-4 sm:mr-6 md:mr-8">
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl shadow-yellow-400/20">
              <img
                src="/logo-galaxia21.jpg"
                alt="Logo Galaxia 21"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Center: Text */}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            {/* RADIO */}
            <span
              className="text-white font-black text-sm sm:text-xl md:text-2xl lg:text-3xl tracking-[0.3em] uppercase drop-shadow-lg"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
            >
              RADIO
            </span>

            {/* GALAXIA 21 */}
            <span
              className="text-yellow-400 font-black text-2xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight leading-none drop-shadow-lg"
              style={{
                textShadow: "3px 3px 12px rgba(0,0,0,0.9), 0 0 30px rgba(234,179,8,0.3)",
              }}
            >
              GALAXIA 21
            </span>

            {/* La Radio de Lempira */}
            <span
              className="text-white font-bold italic text-xs sm:text-lg md:text-xl lg:text-2xl mt-0.5 sm:mt-1 drop-shadow-lg"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
              }}
            >
              La Radio de Lempira
            </span>

            {/* La Más Entonada */}
            <span
              className="text-yellow-300 font-bold italic text-[10px] sm:text-sm md:text-base lg:text-lg mt-0.5 drop-shadow-md"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
              }}
            >
              La Más Entonada
            </span>
          </div>

          {/* Right: Microphone Icon */}
          <div className="hidden md:flex items-center justify-center shrink-0 ml-4">
            <div className="relative">
              <Mic
                className="w-16 h-16 lg:w-24 lg:h-24 text-white/80 drop-shadow-2xl"
                strokeWidth={1.2}
              />
              {/* Subtle glow behind mic */}
              <div className="absolute inset-0 bg-white/5 rounded-full blur-xl" />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Buena Música | Información | Nuestra Gente */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="bg-black/60 backdrop-blur-sm border-t border-yellow-400/30">
            <div className="flex items-center justify-center divide-x divide-yellow-400/40 px-4 py-1.5 sm:py-2.5">
              
              {/* Buena Música */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6">
                <Music className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span className="text-white font-bold text-[10px] sm:text-xs md:text-sm tracking-wide">
                  Buena Música
                </span>
              </div>

              {/* Información */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6">
                <Mic className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span className="text-white font-bold text-[10px] sm:text-xs md:text-sm tracking-wide">
                  Información
                </span>
              </div>

              {/* Nuestra Gente */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-bold text-[10px] sm:text-xs md:text-sm tracking-wide">
                  Nuestra Gente
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Play/Pause feedback overlay on hover */}
        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-sm rounded-full p-4 sm:p-6 shadow-2xl border border-yellow-400/40">
            {isLoading ? (
              <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 fill-yellow-400" />
            ) : (
              <Play className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-400 fill-yellow-400 translate-x-0.5" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
