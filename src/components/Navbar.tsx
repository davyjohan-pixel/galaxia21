"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  onRequestSong?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestSong }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d1117] border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name (Clean without yellow shadow/border) */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
            <Image
              src="/logo-galaxia21.jpg"
              alt="Galaxia 21 HRNS"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-white leading-none">
              GALAXIA <span className="text-yellow-400">21</span>
            </span>
            <span className="text-[10px] font-bold text-yellow-400 tracking-wider uppercase mt-1">
              LA RADIO DE LEMPIRA
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider">
          <Link href="#inicio" className="text-yellow-400 border-b-2 border-yellow-400 py-2">
            INICIO
          </Link>
          <Link href="#nosotros" className="text-slate-300 hover:text-yellow-400 transition-colors py-2">
            NOSOTROS
          </Link>
          <Link href="#programacion" className="text-slate-300 hover:text-yellow-400 transition-colors py-2">
            PROGRAMACIÓN
          </Link>
          <Link href="#noticias" className="text-slate-300 hover:text-yellow-400 transition-colors py-2">
            NOTICIAS
          </Link>
          <Link href="#galeria" className="text-slate-300 hover:text-yellow-400 transition-colors py-2">
            GALERÍA
          </Link>
          <Link href="#contacto" className="text-slate-300 hover:text-yellow-400 transition-colors py-2">
            CONTACTO
          </Link>
        </nav>

        {/* Right Social Icons: ONLY Facebook & WhatsApp */}
        <div className="flex items-center space-x-4">
          {/* Facebook Icon */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-yellow-400 transition-colors p-1.5"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

          {/* WhatsApp Icon */}
          <button
            onClick={onRequestSong}
            className="text-[#25D366] hover:opacity-80 transition-opacity p-1.5"
            aria-label="WhatsApp"
            title="Pedir canción por WhatsApp"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
};
