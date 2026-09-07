"use client";

import React from "react";
import Image from "next/image";
import { Play, Pause, Radio, MessageCircle, MapPin, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

interface HeroSectionProps {
  onRequestSong: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRequestSong }) => {
  const { isPlaying, togglePlay, isLoading } = useAudio();

  return (
    <section id="inicio" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background glow graphics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-yellow-500/30 text-yellow-400 text-xs font-semibold shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              <span>GALAXIA 21 HRNS — TRANSMISIÓN DIGITAL Y FM</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
              La Voz que Ilumina <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Gracias, Lempira
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Escucha la mejor selección musical, noticias al instante, deportes y entretenimiento en vivo las 24 horas del día.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={togglePlay}
                disabled={isLoading}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-extrabold text-base shadow-xl shadow-yellow-500/25 hover:scale-105 active:scale-95 transition-all"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 fill-current" />
                    <span>PAUSAR REPRODUCCIÓN</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    <span>ESCUCHAR EN VIVO</span>
                  </>
                )}
              </button>

              <button
                onClick={onRequestSong}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-900 border border-slate-700 hover:border-yellow-400 text-white font-bold text-base transition-all hover:bg-slate-800"
              >
                <MessageCircle className="w-5 h-5 text-yellow-400" />
                <span>Pedir Canción / Saludo</span>
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl font-bold text-yellow-400">24/7</p>
                <p className="text-xs text-slate-400 mt-0.5">Señal Ininterrumpida</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">HD</p>
                <p className="text-xs text-slate-400 mt-0.5">Audio Digital Limpio</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">100%</p>
                <p className="text-xs text-slate-400 mt-0.5">Orgullo Lempira</p>
              </div>
            </div>
          </div>

          {/* Right Column: Radio Logo & Graphic Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Outer Glowing Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

              {/* Logo Card */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl bg-slate-950 flex items-center justify-center p-2">
                <Image
                  src="/logo-galaxia21.jpg"
                  alt="Galaxia 21 HRNS Logo Oficial"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Decorative Floating Pill */}
              <div className="absolute -bottom-4 right-4 bg-slate-900 border border-yellow-500/40 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 backdrop-blur-md">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-xs font-semibold text-white">HRNS Galaxia 21</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
