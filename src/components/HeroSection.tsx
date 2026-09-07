"use client";

import React from "react";
import { Play, Pause } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export const HeroSection: React.FC = () => {
  const { isPlaying, togglePlay, isLoading } = useAudio();

  return (
    <section id="inicio" className="w-full bg-[#0b0f19] flex justify-center items-center py-2 sm:py-4 md:py-6 px-2 sm:px-4">
      {/* Banner Container with exact aspect ratio */}
      <div className="relative w-full max-w-7xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-slate-950">
        
        {/* Full Uncropped Banner Image */}
        <img
          src="/banner-galaxia21.png"
          alt="Radio Galaxia 21 - La Radio de Lempira"
          className="w-full h-auto block object-contain select-none"
        />

        {/* Clickable Hotspot Button overlay right over the yellow "ESCUCHA EN VIVO / HAZ CLICK AQUÍ" area on the bottom right */}
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="absolute bottom-[4%] right-[3%] w-[32%] sm:w-[30%] md:w-[28%] lg:w-[26%] h-[22%] sm:h-[24%] md:h-[26%] opacity-0 hover:opacity-100 transition-opacity bg-yellow-400/20 rounded-full border-2 border-yellow-400 flex items-center justify-center cursor-pointer shadow-2xl backdrop-blur-xs"
          aria-label={isPlaying ? "Pausar radio" : "Escuchar en vivo"}
          title="Haz clic para escuchar la radio en vivo"
        >
          <div className="bg-slate-950/90 text-yellow-400 p-2 sm:p-3 rounded-full shadow-lg border border-yellow-400/50 flex items-center gap-2">
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
            ) : (
              <Play className="w-4 sm:w-5 h-4 sm:h-5 fill-current translate-x-0.5" />
            )}
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider hidden sm:inline">
              {isPlaying ? "PAUSAR" : "EN VIVO"}
            </span>
          </div>
        </button>

        {/* Invisible full banner click handler so anywhere on the banner triggers playback */}
        <div
          onClick={togglePlay}
          className="absolute inset-0 cursor-pointer"
          aria-hidden="true"
        />

      </div>
    </section>
  );
};
