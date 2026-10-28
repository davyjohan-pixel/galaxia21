"use client";

import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

interface NavbarProps {
  onRequestSong?: () => void;
}

export const RadioTowerIcon: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9" />
    <path d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" />
    <circle cx="12" cy="9" r="2" fill="currentColor" />
    <path d="M16.2 4.7c2 2 2.26 5.11.8 7.47" />
    <path d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1" />
    <path d="M12 11v11" />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({ onRequestSong }) => {
  return (
    <header className="w-full bg-white relative z-30 shadow-[0_2px_15px_rgba(0,0,0,0.06)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        {/* Left: Overlapping Brand Emblem + Title + 95.1 FM Pill */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="#inicio"
            className="relative -mb-6 sm:-mb-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.18)] shrink-0 z-40 transition-transform hover:scale-105"
          >
            <img
              src="/logo-galaxia-hd.png"
              alt="Galaxia 21 HRNS - Gracias, Lempira"
              className="w-full h-full object-contain rounded-full select-none"
              decoding="async"
              fetchPriority="high"
            />
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            <Link href="#inicio" className="flex flex-col">
              <span className="font-black text-xl sm:text-3xl tracking-tight text-[#081c38] leading-none">
                GALAXIA 21
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#1e3a5f] tracking-normal mt-0.5">
                La Radio de Lempira
              </span>
            </Link>

            {/* 95.1 FM Yellow Pill Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#facc15] text-[#081c38] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-extrabold text-xs sm:text-sm shadow-sm">
              <RadioTowerIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>95.1 FM</span>
            </div>
          </div>
        </div>

        {/* Right: Navigation Links & Search Icon */}
        <nav className="flex items-center gap-2 sm:gap-6">
          <Link
            href="#inicio"
            className="bg-[#facc15] hover:bg-[#eab308] text-[#081c38] font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-lg transition-colors shadow-xs"
          >
            Inicio
          </Link>
          <Link
            href="#nuestra-tierra"
            className="hidden sm:inline-block text-[#0f172a] hover:text-[#081c38] font-semibold text-sm transition-colors px-2 py-1"
          >
            Galería
          </Link>
          <button
            onClick={onRequestSong}
            className="text-[#0f172a] hover:text-[#081c38] font-semibold text-xs sm:text-sm transition-colors px-2 py-1 cursor-pointer"
          >
            Contacto
          </button>
          <button
            onClick={onRequestSong}
            aria-label="Buscar o pedir canción"
            className="text-[#081c38] hover:text-yellow-600 p-1.5 transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5 stroke-[2.4]" />
          </button>
        </nav>
      </div>
    </header>
  );
};
