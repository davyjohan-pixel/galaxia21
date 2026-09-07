"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Signal, Maximize2, X, Globe, Radio } from "lucide-react";

export const CoverageSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="cobertura" className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-bold border border-yellow-400/20">
              <Signal className="w-3.5 h-3.5" />
              COBERTURA & ALCANCE
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Llegamos a todo <br />
              <span className="text-yellow-400">Gracias, Lempira y el Mundo</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Galaxia 21 HRNS cuenta con una potente señal terrestre que cubre los principales municipios del departamento de Lempira y zonas aledañas en el occidente de Honduras.
            </p>

            {/* Coverage Bullet points */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <MapPin className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-bold text-sm">Gracias, Lempira (Sede Principal)</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Señal clara y potente en el casco urbano y comunidades rurales circundantes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <Radio className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-bold text-sm">Municipios de Lempira y Occidente</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Cobertura en La Campa, Belén, San Manuel Colohete, Erandique, Lepaera y zonas vecinas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <Globe className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-bold text-sm">Transmisión Digital Global 24/7</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Para los compatriotas en EE. UU., España y todo el mundo a través de nuestro sitio web en vivo.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Coverage Map Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg group">
              <div className="relative rounded-2xl overflow-hidden border-2 border-yellow-400/40 shadow-2xl bg-slate-900 cursor-pointer" onClick={() => setModalOpen(true)}>
                <div className="relative h-80 sm:h-96 w-full">
                  <Image
                    src="/cobertura-galaxia.jpg"
                    alt="Mapa de Cobertura Galaxia 21"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Signal className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-bold text-white">Mapa Oficial de Cobertura</span>
                  </div>
                  <button className="flex items-center gap-1 text-xs text-yellow-400 font-semibold group-hover:underline">
                    <Maximize2 className="w-3.5 h-3.5" /> Ampliar
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal image viewer */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setModalOpen(false)}>
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden border border-yellow-500/30 p-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:text-yellow-400 border border-slate-700"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-[75vh]">
              <Image
                src="/cobertura-galaxia.jpg"
                alt="Mapa de Cobertura Galaxia 21 HRNS"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
