"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronUp } from "lucide-react";

export const AboutSection: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="nuestra-tierra"
      className="w-full py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
        {/* Left Column: High-Res Photo of Fuerte San Cristóbal & GRACIAS Sign */}
        <div className="md:col-span-7 relative rounded-2xl overflow-hidden shadow-[0_14px_34px_rgba(8,28,56,0.12)] aspect-[4/3] bg-slate-900">
          <img
            src="/fuerte-san-cristobal.jpg"
            alt="Fuerte San Cristóbal - Gracias, Lempira"
            className="w-full h-full object-cover object-center select-none"
            decoding="async"
          />

          {/* Bottom-Left Location Overlay Pill */}
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:bottom-4 sm:left-4 bg-[#081c38]/90 backdrop-blur-xs text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-2.5 sm:gap-3 shadow-lg border border-white/10 sm:max-w-[78%]">
            {/* Yellow Location Pin Icon */}
            <div className="shrink-0 text-[#facc15]">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 sm:w-7 sm:h-7"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="flex flex-col leading-snug min-w-0">
              <span className="font-bold text-xs sm:text-sm text-white">
                Gracias, Lempira
              </span>
              <span className="text-[11px] sm:text-xs text-slate-200 font-normal truncate sm:whitespace-normal">
                Tierra de historia, cultura y gente trabajadora.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: "Nuestra Tierra" Text + Expandable 30-Year Trajectory */}
        <div className="md:col-span-5 flex flex-col justify-center px-1 sm:px-0">
          {/* Yellow Accent Line */}
          <div className="w-10 h-1 bg-[#facc15] rounded-full mb-2.5 sm:mb-3" />

          <h2 className="text-2xl sm:text-4xl font-black text-[#081c38] tracking-tight mb-3 sm:mb-4">
            Nuestra Tierra
          </h2>

          <p className="text-[#334155] text-sm sm:text-base leading-relaxed font-medium">
            Gracias, Lempira, un lugar lleno de historia, tradición y gente de
            gran corazón. Desde aquí llevamos la mejor música, la información
            veraz y el orgullo de nuestra tierra.
          </p>

          {/* Expandable 30 Years Trajectory Box */}
          {expanded && (
            <div className="mt-4 pt-4 border-t border-slate-200/80 text-[#334155] text-sm sm:text-base leading-relaxed font-medium">
              <p>
                Con más de 30 años de trayectoria ininterrumpida,{" "}
                <strong className="text-[#081c38]">Radio Galaxia 21</strong> es
                la emisora referente del departamento de Lempira. A través de la
                frecuencia <strong className="text-[#081c38]">95.1 FM</strong>,
                hemos consolidado un espacio de comunicación que trasciende el
                entretenimiento para convertirse en un verdadero pilar
                institucional y social de nuestra comunidad.
              </p>
            </div>
          )}

          <div className="mt-5 sm:mt-6">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full sm:w-auto justify-center inline-flex items-center gap-3 px-6 py-2.5 rounded-full border-2 border-[#facc15] bg-white hover:bg-yellow-50/80 text-[#081c38] font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer group"
            >
              <span>
                {expanded ? "Mostrar menos" : "Conoce más sobre nosotros"}
              </span>
              {expanded ? (
                <ChevronUp className="w-4 h-4 text-[#eab308]" />
              ) : (
                <ArrowRight className="w-4 h-4 text-[#eab308] group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
