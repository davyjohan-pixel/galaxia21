"use client";

import React from "react";
import { Play, Pause, ChevronRight } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export const HeroSection: React.FC = () => {
  const { isPlaying, togglePlay, isLoading } = useAudio();

  return (
    <section id="inicio" className="w-full relative">
      {/* Original Banner Image — displayed as-is, no compression */}
      <div className="relative w-full">
        <img
          src="/banner-galaxia21.png"
          alt="Radio Galaxia 21 - La Radio de Lempira"
          className="w-full h-auto block select-none"
          decoding="async"
          fetchPriority="high"
        />

        {/* Yellow "ESCUCHA EN VIVO" button — bottom right, like the mockup */}
        <button
          onClick={togglePlay}
          className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 md:bottom-6 md:right-8 flex items-center gap-2 sm:gap-3 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-slate-950 rounded-lg sm:rounded-xl px-3 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3.5 shadow-xl hover:shadow-2xl transition-all group z-10"
          aria-label={isPlaying ? "Pausar radio" : "Escuchar en vivo"}
        >
          {/* Play/Pause circle icon */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-slate-900 flex items-center justify-center shrink-0 group-hover:bg-slate-800 transition-colors">
            {isLoading ? (
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-[2.5px] border-yellow-400 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400 translate-x-[1px]" />
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col leading-tight">
            <span className="font-black text-xs sm:text-sm md:text-base uppercase tracking-wide">
              ESCUCHA EN VIVO
            </span>
            <span className="font-bold text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider opacity-70">
              HAZ CLICK AQUÍ
            </span>
          </div>

          {/* Arrow */}
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-60 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>
      </div>
    </section>
  );
};
