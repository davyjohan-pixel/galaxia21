"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Globe, Radio, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: About Station */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400">
                <Image
                  src="/logo-galaxia21.jpg"
                  alt="Galaxia 21 HRNS"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-extrabold text-lg text-white">
                GALAXIA <span className="text-yellow-400">21</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              Galaxia 21 HRNS es la emisora radial de Gracias, Lempira. Transmitiendo la mejor música, noticias en vivo, cultura y entretenimiento para todo el departamento y el mundo.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-yellow-400">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Transmisión Digital en Vivo 24/7</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#inicio" className="hover:text-yellow-400 transition-colors">
                  Inicio & Reproductor
                </Link>
              </li>
              <li>
                <Link href="#programacion" className="hover:text-yellow-400 transition-colors">
                  Programación Semanal
                </Link>
              </li>
              <li>
                <Link href="#cobertura" className="hover:text-yellow-400 transition-colors">
                  Mapa de Cobertura
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="hover:text-yellow-400 transition-colors">
                  Contactar con Cabina
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Ubicación y Contacto
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>Gracias, Lempira, Honduras, Centroamérica</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Atención a Oyentes & Publicidad</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="truncate">cp.usa8.fastcast4u.com/proxy/galaxia21v2</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Slogan & Badges */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Orgullo de Lempira
            </h4>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center space-y-2">
              <p className="text-xs text-slate-300 font-semibold">
                &quot;La radio que te acompaña donde quiera que estés&quot;
              </p>
              <span className="inline-block px-3 py-1 bg-yellow-400/10 text-yellow-400 text-[10px] font-bold rounded-full border border-yellow-400/20">
                HRNS — GALAXIA 21
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Galaxia 21 HRNS — Gracias, Lempira. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> para la comunidad de Lempira.
          </p>
        </div>
      </div>
    </footer>
  );
};
