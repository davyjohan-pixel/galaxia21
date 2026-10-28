"use client";

import React from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export const AudioPlayer: React.FC = () => {
  const {
    isPlaying,
    isLoading,
    isMuted,
    volume,
    togglePlay,
    handleVolumeChange,
    toggleMute,
  } = useAudio();

  const currentVolume = isMuted ? 0 : volume;

  // Waveform bar heights for the inline equalizer display
  const yellowBars = [14, 24, 34, 18, 28, 12];
  const subtleBars = [10, 16, 8, 14, 20, 10, 12, 8, 10, 6];

  return (
    <section
      aria-label="Reproductor en vivo de Galaxia 21"
      className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-3 sm:-mt-5"
    >
      <div className="bg-white rounded-2xl shadow-[0_12px_36px_rgba(8,28,56,0.09)] border border-slate-100 px-5 sm:px-8 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Left: Big Yellow Play/Pause Button + Station Title */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#facc15] hover:bg-[#eab308] text-[#081c38] flex items-center justify-center shadow-[0_6px_18px_rgba(250,204,21,0.45)] transition-transform hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
            aria-label={isPlaying ? "Pausar radio" : "Escuchar en vivo"}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-[#081c38] border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-7 h-7 fill-current stroke-[2.2]" />
            ) : (
              <Play className="w-7 h-7 fill-current translate-x-0.5 stroke-[2.2]" />
            )}
          </button>

          <div className="flex flex-col">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#081c38] tracking-tight leading-tight">
              Escúchanos en vivo
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Radio Galaxia 21 HRNS{" "}
              <span className="mx-1.5 text-slate-300">|</span>
              <span className="font-bold text-[#081c38]">95.1 FM</span>
            </p>
          </div>
        </div>

        {/* Center: Dynamic Audio Waveform & Track Line */}
        <div className="flex items-center gap-2 flex-1 max-w-xs w-full justify-center">
          {/* Active Yellow Bars */}
          <div className="flex items-center gap-1 h-9">
            {yellowBars.map((h, i) => (
              <span
                key={`y-${i}`}
                style={{ height: `${h}px` }}
                className={`w-1 rounded-full bg-[#facc15] origin-center transition-transform ${
                  isPlaying
                    ? i % 3 === 0
                      ? "animate-wave-1"
                      : i % 3 === 1
                      ? "animate-wave-2"
                      : "animate-wave-3"
                    : ""
                }`}
              />
            ))}
          </div>

          {/* Secondary Subtle Bars */}
          <div className="flex items-center gap-1 h-9 ml-1">
            {subtleBars.map((h, i) => (
              <span
                key={`s-${i}`}
                style={{ height: `${h}px` }}
                className={`w-1 rounded-full ${
                  i < 3 ? "bg-[#facc15]/60" : "bg-slate-200"
                } origin-center ${
                  isPlaying && i < 5 ? "animate-wave-2" : ""
                }`}
              />
            ))}
          </div>

          {/* Horizontal Progress Line */}
          <div className="flex-1 h-[2px] bg-slate-200 rounded-full min-w-[40px]" />
        </div>

        {/* Right: "En transmisión" Pill + Volume Slider */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3">
          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-2 bg-[#081c38] text-white text-xs font-semibold px-3.5 py-1 rounded-full shadow-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying
                  ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"
                  : "bg-emerald-400"
              }`}
            />
            <span>En transmisión</span>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              className="text-[#081c38] hover:text-yellow-600 transition-colors cursor-pointer"
            >
              {isMuted || currentVolume === 0 ? (
                <VolumeX className="w-5 h-5 text-red-500" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={currentVolume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              aria-label="Volumen"
              className="volume-slider w-28 sm:w-36 h-1.5 rounded-full"
              style={{
                background: `linear-gradient(to right, #facc15 0%, #facc15 ${
                  currentVolume * 100
                }%, #e2e8f0 ${currentVolume * 100}%, #e2e8f0 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
