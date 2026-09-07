"use client";

import React from "react";
import Image from "next/image";
import { Play, Pause, Music, Mic, Heart, ChevronRight } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export const HeroSection: React.FC = () => {
  const { isPlaying, togglePlay, isLoading } = useAudio();

  return (
    <section id="inicio" className="w-full bg-[#0b0f19] py-4 sm:py-6 px-3 sm:px-6 flex justify-center">
      {/* Main Native Hero Banner Container */}
      <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-yellow-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 min-h-[380px] sm:min-h-[460px] md:min-h-[520px] flex items-center">
        
        {/* High Definition Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cobertura-galaxia.jpg"
            alt="Gracias, Lempira Landscape"
            fill
            className="object-cover object-center opacity-40 brightness-75 contrast-125 scale-105"
            priority
          />
          {/* Subtle gradient overlays for flawless text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/70 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-[#0b0f19]/50 z-10" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 py-8 flex flex-col justify-between h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px]">
          
          {/* Top/Middle: Logo Badge & Main Typography */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
            
            {/* Left: HD Round Logo Badge */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full border-4 border-yellow-400 shadow-2xl shadow-yellow-500/30 overflow-hidden bg-slate-950 transform hover:scale-105 transition-transform duration-500 shrink-0">
                <Image
                  src="/logo-galaxia-hd.png"
                  alt="Galaxia 21 HRNS Logo Oficial"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right/Center: Crisp Native Vector Typography */}
            <div className="lg:col-span-8 text-center lg:text-left space-y-2 sm:space-y-3">
              
              {/* "RADIO" Tag */}
              <span className="block text-xl sm:text-2xl md:text-3xl font-black text-white tracking-widest uppercase italic font-serif opacity-90 drop-shadow-md">
                RADIO
              </span>

              {/* Main "GALAXIA 21" Title */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-yellow-400 drop-shadow-[0_5px_15px_rgba(250,204,21,0.3)]">
                GALAXIA <span className="text-white">21</span>
              </h1>

              {/* Subtitle "La Radio de Lempira" */}
              <p className="text-2xl sm:text-4xl md:text-5xl font-serif italic text-white drop-shadow-md font-bold">
                La Radio de Lempira
              </p>

              {/* Tagline with Yellow Brush Accent Line */}
              <div className="inline-block relative pt-1">
                <span className="text-lg sm:text-2xl md:text-3xl font-serif italic text-yellow-300 font-bold tracking-wide">
                  La Más Entonada
                </span>
                <div className="h-1 sm:h-1.5 w-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mt-1 shadow-sm" />
              </div>

            </div>

          </div>

          {/* Bottom Bar: Feature Badges & Native Interactive Live Button */}
          <div className="pt-6 border-t border-yellow-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Feature Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-extrabold text-slate-200">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-yellow-400" />
                <span>Buena Música</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-yellow-400" />
                <span>Información</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-yellow-400" />
                <span>Nuestra Gente</span>
              </div>
            </div>

            {/* Native Ultra-Crisp Interactive Live Button */}
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className="group flex items-center gap-4 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 font-black shadow-xl shadow-yellow-500/30 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-yellow-300 shrink-0"
              aria-label={isPlaying ? "Pausar radio" : "Escuchar en vivo"}
            >
              {/* Black Play/Pause Circle Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950 flex items-center justify-center text-yellow-400 shrink-0 group-hover:scale-110 transition-transform">
                {isLoading ? (
                  <div className="w-5 h-5 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current translate-x-0.5" />
                )}
              </div>

              {/* Button Typography */}
              <div className="text-left">
                <span className="block text-sm sm:text-base md:text-lg font-black tracking-tight leading-none uppercase">
                  {isPlaying ? "REPRODUCIENDO" : "ESCUCHA EN VIVO"}
                </span>
                <span className="block text-[10px] sm:text-xs font-black text-slate-900 tracking-widest mt-0.5 uppercase">
                  HAZ CLICK AQUÍ
                </span>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform ml-1" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
