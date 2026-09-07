"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Radio, Menu, X, Play, Pause, MessageCircle, MapPin } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

interface NavbarProps {
  onRequestSong: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestSong }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isPlaying, togglePlay, isLoading } = useAudio();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400 shadow-md shadow-yellow-500/20 group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/logo-galaxia21.jpg"
              alt="Galaxia 21 HRNS"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                GALAXIA <span className="text-yellow-400">21</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-yellow-400 text-slate-950 rounded">
                HRNS
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-yellow-400" /> Gracias, Lempira
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="#inicio" className="text-slate-300 hover:text-yellow-400 transition-colors">
            Inicio
          </Link>
          <Link href="#programacion" className="text-slate-300 hover:text-yellow-400 transition-colors">
            Programación
          </Link>
          <Link href="#cobertura" className="text-slate-300 hover:text-yellow-400 transition-colors">
            Cobertura
          </Link>
          <Link href="#contacto" className="text-slate-300 hover:text-yellow-400 transition-colors">
            Contacto
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={onRequestSong}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-900 bg-yellow-400 hover:bg-yellow-300 rounded-full shadow-lg shadow-yellow-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            Pedir Canción
          </button>

          <button
            onClick={togglePlay}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-full transition-all border ${
              isPlaying
                ? "bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/30"
                : "bg-slate-800 text-white border-yellow-500/30 hover:border-yellow-400"
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current text-yellow-400" />
            )}
            <span>{isPlaying ? "EN VIVO" : "Escuchar en Vivo"}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-yellow-400 text-slate-950 font-bold"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-4">
          <Link
            href="#inicio"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-yellow-400 py-2 font-medium"
          >
            Inicio
          </Link>
          <Link
            href="#programacion"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-yellow-400 py-2 font-medium"
          >
            Programación
          </Link>
          <Link
            href="#cobertura"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-yellow-400 py-2 font-medium"
          >
            Cobertura
          </Link>
          <Link
            href="#contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-yellow-400 py-2 font-medium"
          >
            Contacto
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onRequestSong();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-slate-900 bg-yellow-400 rounded-full"
          >
            <MessageCircle className="w-4 h-4" />
            Pedir Canción / Saludo
          </button>
        </div>
      )}
    </header>
  );
};
