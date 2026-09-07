"use client";

import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";

interface Program {
  id: string;
  title: string;
  days: string;
  time: string;
  imageUrl: string;
}

const PROGRAMS: Program[] = [
  {
    id: "grupera",
    title: "LA HORA GRUPERA",
    days: "Lunes a Domingo",
    time: "6:00 AM - 10:00 AM",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "80s",
    title: "LO MEJOR DE LOS 80's",
    days: "Lunes a Domingo",
    time: "10:00 AM - 12:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "noticias",
    title: "NOTICIAS AL INSTANTE",
    days: "Lunes a Domingo",
    time: "12:00 PM - 2:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "rancheras",
    title: "RANCHERAS Y MÁS",
    days: "Lunes a Domingo",
    time: "2:00 PM - 6:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "recuerdos",
    title: "TARDE DE RECUERDOS",
    days: "Lunes a Domingo",
    time: "6:00 PM - 10:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
  },
];

export const ScheduleSection: React.FC = () => {
  return (
    <section id="programacion" className="py-16 bg-[#0b0f19] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 pb-4 border-b border-slate-800/80 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-wider uppercase relative inline-block">
              <span className="border-b-4 border-yellow-400 pb-1">NUESTROS</span> PROGRAMAS
            </h2>
          </div>
          <p className="text-slate-400 text-sm font-semibold italic">
            ¡La mejor programación para ti!
          </p>
        </div>

        {/* 5 Program Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {PROGRAMS.map((program) => (
            <div
              key={program.id}
              className="bg-[#121824] border border-slate-800 hover:border-yellow-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-yellow-500/10 group flex flex-col justify-between"
            >
              {/* Card Image */}
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={program.imageUrl}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-transparent opacity-90" />
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <h3 className="text-base font-black text-white group-hover:text-yellow-400 transition-colors uppercase tracking-tight">
                  {program.title}
                </h3>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <div className="w-6 h-6 rounded-full border border-yellow-400/50 flex items-center justify-center text-yellow-400 shrink-0 bg-yellow-400/10">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-300">{program.days}</p>
                    <p className="text-[11px] font-medium text-yellow-400">{program.time}</p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
