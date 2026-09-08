"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SongRequestModal } from "@/components/SongRequestModal";
import { AudioPlayer } from "@/components/AudioPlayer";
import { AboutSection } from "@/components/AboutSection";

export default function Home() {
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0b0f19] flex flex-col justify-between relative pb-24">
      {/* Unified Header (Navbar + Banner) */}
      <header className="w-full bg-[#0d1117] shadow-2xl z-40">
        <Navbar onRequestSong={() => setRequestModalOpen(true)} />
        <div className="w-full">
          <HeroSection />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 w-full bg-[#f4f6f8]">
        <AboutSection />
      </div>

      {/* Song Request Modal */}
      <SongRequestModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
      />

      {/* Sticky Bottom Audio Player */}
      <AudioPlayer />
    </main>
  );
}
