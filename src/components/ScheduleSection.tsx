"use client";

import React, { useState } from "react";
import { Clock, Radio, Mic, Music, Calendar } from "lucide-react";

interface Show {
  time: string;
  title: string;
  host: string;
  description: string;
  genre: string;
}

const WEEKDAY_SHOWS: Show[] = [
  {
    time: "06:00 AM - 09:00 AM",
    title: "El Mañanero Galáctico",
    host: "Staff Galaxia 21",
    description: "Despierta con la mejor vibra, noticias locales de Lempira y la música más alegre de la mañana.",
    genre: "Noticias & Variedad",
  },
  {
    time: "09:00 AM - 12:00 PM",
    title: "Mañanas Tropicales",
    host: "DJ Estelar",
    description: "Los mejores ritmos de cumbia, merengue, bachata y éxitos rancheros para acompañar tu jornada.",
    genre: "Tropical & Éxitos",
  },
  {
    time: "12:00 PM - 01:30 PM",
    title: "El Noticiero HRNS",
    host: "Equipo de Prensa",
    description: "Resumen informativo completo con noticias departamentales, nacionales e internacionales.",
    genre: "Noticias en Vivo",
  },
  {
    time: "01:30 PM - 05:00 PM",
    title: "Tarde de Éxitos",
    host: "DJ Galaxia",
    description: "La selección con las canciones más pedidas por nuestros oyentes por WhatsApp y teléfono.",
    genre: "Pop, Baladas & Urbano",
  },
  {
    time: "05:00 PM - 07:00 PM",
    title: "Rancheras y Recuerdos",
    host: "Locutor Invitado",
    description: "La hora dorada de la música ranchera, del recuerdo y canciones para el corazón.",
    genre: "Ranchera & Boleros",
  },
  {
    time: "07:00 PM - 10:00 PM",
    title: "Noche Estelar 21",
    host: "Radio Show",
    description: "Música variada, compilados especiales y complacencias para cerrar la jornada.",
    genre: "Variado 24/7",
  },
];

const SATURDAY_SHOWS: Show[] = [
  {
    time: "07:00 AM - 11:00 AM",
    title: "Amanecer Ranchero",
    host: "Staff Galaxia 21",
    description: "Sábado de fiesta con los mejores corridos, rancheras y complacencias de fin de semana.",
    genre: "Ranchero",
  },
  {
    time: "11:00 AM - 03:00 PM",
    title: "El Reventón del Sábado",
    host: "DJ En Vivo",
    description: "Cumbia, reggaetón y ritmo para encender la tarde de fin de semana.",
    genre: "Fiesta Total",
  },
  {
    time: "03:00 PM - 08:00 PM",
    title: "Las 21 Más Galácticas",
    host: "Conteo Oficial",
    description: "El ranking oficial con las 21 canciones más votadas de la semana.",
    genre: "Hit Parade",
  },
];

const SUNDAY_SHOWS: Show[] = [
  {
    time: "08:00 AM - 12:00 PM",
    title: "Domingo de Recuerdo y Tradición",
    host: "Edición Especial",
    description: "Música nostálgica, temas clásicos y saludos para las familias de Lempira.",
    genre: "Clásicos",
  },
  {
    time: "12:00 PM - 06:00 PM",
    title: "Tarde Familiar y Deportes",
    host: "Equipo Deportivo",
    description: "Transmisiones especiales, resultados deportivos y buena música para el descanso.",
    genre: "Deportes & Música",
  },
];

export const ScheduleSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"weekdays" | "saturday" | "sunday">("weekdays");

  const getActiveShows = () => {
    switch (activeTab) {
      case "saturday":
        return SATURDAY_SHOWS;
      case "sunday":
        return SUNDAY_SHOWS;
      default:
        return WEEKDAY_SHOWS;
    }
  };

  return (
    <section id="programacion" className="py-20 bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-bold mb-3 border border-yellow-400/20">
            <Calendar className="w-3.5 h-3.5" />
            PARRILLA DE PROGRAMACIÓN
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Nuestros Programas en Vivo
          </h2>
          <p className="text-slate-400 mt-2 text-base">
            Conoce el horario de tus programas favoritos y los locutores que te acompañan día a día.
          </p>

          {/* Tabs Navigation */}
          <div className="flex items-center justify-center gap-2 mt-8 bg-slate-950/80 p-1.5 rounded-full border border-slate-800 w-fit mx-auto">
            <button
              onClick={() => setActiveTab("weekdays")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === "weekdays"
                  ? "bg-yellow-400 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Lunes a Viernes
            </button>
            <button
              onClick={() => setActiveTab("saturday")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === "saturday"
                  ? "bg-yellow-400 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Sábados
            </button>
            <button
              onClick={() => setActiveTab("sunday")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === "sunday"
                  ? "bg-yellow-400 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Domingos
            </button>
          </div>
        </div>

        {/* Schedule Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getActiveShows().map((show, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800/80 hover:border-yellow-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                  <Clock className="w-3.5 h-3.5" />
                  {show.time}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-md border border-slate-800">
                  {show.genre}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors mb-2">
                {show.title}
              </h3>

              <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mb-3">
                <Mic className="w-3.5 h-3.5 text-yellow-400" />
                Locución: <span className="text-slate-200">{show.host}</span>
              </p>

              <p className="text-sm text-slate-400 leading-relaxed">
                {show.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
