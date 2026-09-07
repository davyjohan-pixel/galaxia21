"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, ChevronUp, ChevronDown } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export const AudioPlayer: React.FC = () => {
  const { isPlaying, isLoading, isMuted, volume, togglePlay, handleVolumeChange, toggleMute } = useAudio();
  const [minimized, setMinimized] = useState(false);

  return (
    <aside
      aria-label="Reproductor flotante de Galaxia 21"
      className={`fixed bottom-0 left-0 right-0 z-50 bg-[#0B0F19] border-t border-slate-800 shadow-2xl transition-all duration-300 ${
        minimized ? "translate-y-16" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Title (Clean logo without yellow border/shadow) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
            <Image
              src="/logo-galaxia21.jpg"
              alt="Galaxia 21"
              fill
              className="object-cover"
            />
          </div>

          <div className="hidden sm:block">
            <h4 className="font-black text-white text-sm uppercase tracking-tight leading-none">
              GALAXIA 21
            </h4>
            <p className="text-[11px] font-semibold text-yellow-400 mt-1">
              La Radio de Lempira
            </p>
          </div>
        </div>

        {/* Center: Play/Pause Button & Volume Control */}
        <div className="flex items-center gap-4">
          {/* Big Yellow Play/Pause Button */}
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="w-12 h-12 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 flex items-center justify-center shadow-lg shadow-yellow-500/20 transition-all hover:scale-105 active:scale-95 shrink-0"
            aria-label={isPlaying ? "Pausar radio" : "Reproducir radio"}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-3 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current translate-x-0.5" />
            )}
          </button>

          {/* Volume Control */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-slate-400 hover:text-yellow-400 p-1 transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
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
            />
          </div>
        </div>

        {/* Right: Now Playing & Equalizer */}
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider block">
              Ahora Suena:
            </span>
            <span className="text-xs font-extrabold text-white block truncate max-w-[180px]">
              La Hora Grupera
            </span>
            <span className="text-[10px] text-slate-400 block">
              Galaxia 21
            </span>
          </div>

          {/* Yellow Equalizer sound wave */}
          <div className="flex items-end gap-1 h-6 px-1">
            <span className={`w-1 bg-yellow-400 rounded-full ${isPlaying ? "animate-bar-1" : "h-1"}`} />
            <span className={`w-1 bg-yellow-400 rounded-full ${isPlaying ? "animate-bar-2" : "h-2"}`} />
            <span className={`w-1 bg-yellow-400 rounded-full ${isPlaying ? "animate-bar-3" : "h-1.5"}`} />
            <span className={`w-1 bg-yellow-400 rounded-full ${isPlaying ? "animate-bar-4" : "h-2.5"}`} />
          </div>

          {/* Toggle Minimize Chevron */}
          <button
            onClick={() => setMinimized(!minimized)}
            className="text-slate-400 hover:text-white p-1"
          >
            {minimized ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

      </div>
    </aside>
  );
};
