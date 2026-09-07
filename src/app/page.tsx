"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { CoverageSection } from "@/components/CoverageSection";
import { SongRequestModal } from "@/components/SongRequestModal";
import { Footer } from "@/components/Footer";
import { AudioPlayer } from "@/components/AudioPlayer";

export default function Home() {
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col relative">
      {/* Top Navbar */}
      <Navbar onRequestSong={() => setRequestModalOpen(true)} />

      {/* Hero Section */}
      <HeroSection onRequestSong={() => setRequestModalOpen(true)} />

      {/* Schedule Section */}
      <ScheduleSection />

      {/* Coverage Section */}
      <CoverageSection />

      {/* Footer */}
      <Footer />

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
