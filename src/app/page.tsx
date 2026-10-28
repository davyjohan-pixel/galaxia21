"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AudioPlayer } from "@/components/AudioPlayer";
import { AboutSection } from "@/components/AboutSection";
import { FooterSection } from "@/components/FooterSection";
import { SongRequestModal } from "@/components/SongRequestModal";

export default function Home() {
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col justify-between relative">
      {/* Top White Navigation Bar */}
      <Navbar onRequestSong={() => setRequestModalOpen(true)} />

      {/* Main Hero Banner with Curved Wave Bottom */}
      <HeroSection />

      {/* Inline Floating Card Audio Player */}
      <AudioPlayer />

      {/* "Nuestra Tierra" Two-Column Section */}
      <div className="flex-1 w-full">
        <AboutSection />
      </div>

      {/* Panoramic "Gracias, Lempira" Banner & Curved Dark Navy Footer */}
      <FooterSection />

      {/* Contact / Song Request Modal */}
      <SongRequestModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
      />
    </main>
  );
}
