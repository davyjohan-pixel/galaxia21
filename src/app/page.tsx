"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SongRequestModal } from "@/components/SongRequestModal";
import { AudioPlayer } from "@/components/AudioPlayer";

export default function Home() {
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0b0f19] flex flex-col justify-between relative pb-24">
      {/* Top Navbar */}
      <Navbar onRequestSong={() => setRequestModalOpen(true)} />

      {/* Clean Full Banner Section */}
      <div className="flex-1 flex items-center justify-center py-6">
        <HeroSection />
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
