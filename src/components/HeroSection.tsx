"use client";

import React from "react";
import { Play, Pause, ChevronRight } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export const HeroSection: React.FC = () => {
  const { isPlaying, togglePlay, isLoading } = useAudio();

  return (
    <section id="inicio" className="w-full relative">
      {/* Original Banner Image — displayed as-is, no compression */}
      <div className="relative w-full cursor-pointer" onClick={togglePlay}>
        <img
          src="/banner-galaxia21.png"
          alt="Radio Galaxia 21 - La Radio de Lempira"
          className="w-full h-auto block select-none"
          decoding="async"
          fetchPriority="high"
        />
      </div>
    </section>
  );
};
