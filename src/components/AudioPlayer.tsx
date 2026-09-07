"use client";

import React from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Radio, Sparkles } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export const AudioPlayer: React.FC = () => {
  const { isPlaying, isLoading, isMuted, volume, togglePlay, handleVolumeChange, toggleMute } = useAudio();

  return (
    <aside aria-label="Reproductor de radio en vivo" className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-yellow-500/30 shadow-2xl shadow-yellow-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Station Info & Equalizer */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-yellow-400/40 shrink-0 shadow-inner">
            <Image
              src="/logo-galaxia21.jpg"
              alt="Galaxia 21 HRNS"
              fill
              className="object-cover"
            />
          </div>

          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm md:text-base truncate">
                Galaxia 21 HRNS
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black rounded-full uppercase tracking-wider ${
                  isPlaying
                    ? "bg-red-600 text-white animate-pulse"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                <Radio className="w-2.5 h-2.5" />
                {isPlaying ? "EN VIVO" : "PAUSADO"}
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate">
              {isPlaying
                ? "Transmitiendo la mejor música en directo desde Gracias, Lempira"
                : "Haz clic en reproducir para escuchar la señal en vivo"}
            </p>
          </div>
        </div>

        {/* Center: Play/Pause Button & Animated Equalizer */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Animated sound wave */}
          {isPlaying && (
            <div className="hidden sm:flex items-end gap-1 h-6 px-2">
              <span className="w-1 bg-yellow-400 rounded-full animate-bar-1" />
              <span className="w-1 bg-yellow-400 rounded-full animate-bar-2" />
              <span className="w-1 bg-yellow-400 rounded-full animate-bar-3" />
              <span className="w-1 bg-yellow-400 rounded-full animate-bar-4" />
            </div>
          )}

          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="relative p-3.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-lg shadow-yellow-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-75"
            aria-label={isPlaying ? "Pausar radio" : "Escuchar radio en vivo"}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            )}
          </button>
        </div>

        {/* Right: Volume Controls */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={toggleMute}
            className="text-slate-400 hover:text-yellow-400 transition-colors p-1"
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5 text-red-400" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-24 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
            aria-label="Nivel de volumen"
          />
        </div>
      </div>
    </aside>
  );
};
