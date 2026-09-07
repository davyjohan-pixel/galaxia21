"use client";

import React from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export const HeroSection: React.FC = () => {
  const { isPlaying, togglePlay, isLoading } = useAudio();

  return (
    <section id="inicio" className="w-full bg-[#0b0f19] flex justify-center items-center py-4 md:py-8 px-2 sm:px-4">
      {/* Banner Wrapper preserving natural aspect ratio without cropping */}
      <div className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-yellow-500/20 group cursor-pointer" onClick={togglePlay}>
        
        {/* Uncropped Responsive Banner Image */}
        <img
          src="/banner-galaxia21.png"
          alt="Radio Galaxia 21 - La Radio de Lempira"
          className="w-full h-auto block object-contain"
        />

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/80 text-yellow-400 px-6 py-3 rounded-full text-sm font-black uppercase tracking-wider shadow-2xl flex items-center gap-2 border border-yellow-400/40">
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>PAUSAR RADIO</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>CLIC PARA ESCUCHAR EN VIVO</span>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
