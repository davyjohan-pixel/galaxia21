"use client";

import React from "react";
import Image from "next/image";
import { Play, Pause, ChevronRight } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export const HeroSection: React.FC = () => {
  const { isPlaying, togglePlay, isLoading } = useAudio();

  return (
    <section id="inicio" className="relative w-full overflow-hidden bg-slate-950">
      {/* Banner Container */}
      <div className="relative w-full h-[420px] sm:h-[500px] md:h-[550px] lg:h-[600px] flex items-end">
        {/* Main Banner Image (Image 2) */}
        <Image
          src="/banner-galaxia21.png"
          alt="Radio Galaxia 21 - La Radio de Lempira - La Más Entonada"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Gradient overlays for crisp text & button readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none" />

        {/* Content Overlay & Interactive Live Button */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-12 flex justify-end">
          
          {/* Yellow Live Play Button (Identical to Mockup 1) */}
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="group relative flex items-center gap-4 px-6 py-4 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black shadow-2xl shadow-yellow-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-yellow-300"
          >
            {/* Round Black Circle with Play/Pause Icon */}
            <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center text-yellow-400 shrink-0 group-hover:scale-110 transition-transform">
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current translate-x-0.5" />
              )}
            </div>

            {/* Button Text */}
            <div className="text-left">
              <span className="block text-sm sm:text-base md:text-lg font-black tracking-tight leading-none uppercase">
                {isPlaying ? "REPRODUCIENDO RADIO" : "ESCUCHA EN VIVO"}
              </span>
              <span className="block text-[11px] sm:text-xs font-extrabold text-slate-900 tracking-wider mt-0.5 uppercase">
                HAZ CLICK AQUÍ
              </span>
            </div>

            <ChevronRight className="w-6 h-6 text-slate-950 group-hover:translate-x-1 transition-transform ml-2" />
          </button>

        </div>
      </div>
    </section>
  );
};
