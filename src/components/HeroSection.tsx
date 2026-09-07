"use client";

import React from "react";
import { Play, Pause } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export const HeroSection: React.FC = () => {
  const { isPlaying, togglePlay, isLoading } = useAudio();

  return (
    <section id="inicio" className="w-full bg-[#0b0f19] flex justify-center items-center py-4 sm:py-6 px-2 sm:px-4">
      {/* Banner Container maintaining exact image quality without any Next.js re-compression */}
      <div className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-slate-950">
        
        {/* Raw Lossless Banner Image (Image 2) */}
        <img
          src="/banner-galaxia21.png"
          alt="Radio Galaxia 21 - La Radio de Lempira"
          className="w-full h-auto block object-contain select-none"
          style={{ imageRendering: "crisp-edges" }}
        />

        {/* Hotspot click area positioned over the yellow button area on the bottom right of the banner image */}
        <div
          onClick={togglePlay}
          className="absolute bottom-[2%] right-[2%] w-[34%] sm:w-[32%] md:w-[30%] h-[28%] sm:h-[26%] md:h-[24%] cursor-pointer flex items-center justify-center group"
          title="Haz clic para escuchar la radio en vivo"
        >
          {/* Subtle feedback indicator on hover */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/80 text-yellow-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 border border-yellow-400/50 shadow-xl">
            {isLoading ? (
              <div className="w-3.5 h-3.5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>PAUSAR</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>EN VIVO</span>
              </>
            )}
          </div>
        </div>

        {/* Full image click handler */}
        <div
          onClick={togglePlay}
          className="absolute inset-0 cursor-pointer"
          aria-hidden="true"
        />

      </div>
    </section>
  );
};
