"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { AboutSection } from "@/components/AboutSection";
import { CoverageSection } from "@/components/CoverageSection";
import { SongRequestModal } from "@/components/SongRequestModal";
import { Footer } from "@/components/Footer";
import { AudioPlayer } from "@/components/AudioPlayer";

export default function Home() {
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0b0f19] flex flex-col relative">
      {/* Top Navbar */}
      <Navbar onRequestSong={() => setRequestModalOpen(true)} />

      {/* Hero Banner Section (Image 2 Banner) */}
      <HeroSection />

      {/* Nuestros Programas Section (Image 1 Cards) */}
      <ScheduleSection />

      {/* ¿Quiénes Somos? & Síguenos Section (Image 1 Bottom Cards) */}
      <AboutSection onRequestSong={() => setRequestModalOpen(true)} />

      {/* Coverage Section */}
      <CoverageSection />

      {/* Footer */}
      <Footer />

      {/* Song Request Modal */}
      <SongRequestModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
      />

      {/* Sticky Bottom Audio Player (Image 1 Player) */}
      <AudioPlayer />
    </main>
  );
}
