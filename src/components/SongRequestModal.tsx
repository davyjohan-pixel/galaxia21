"use client";

import React, { useState } from "react";
import { X, Send, MessageCircle, Music, User, MapPin, CheckCircle2 } from "lucide-react";

interface SongRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SongRequestModal: React.FC<SongRequestModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [song, setSong] = useState("");
  const [greeting, setGreeting] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct formatted WhatsApp message
    const messageText = `📻 *PETICIÓN EN VIVO GALAXIA 21 HRNS*\n\n👤 *De:* ${name || "Oyente"}\n📍 *Desde:* ${city || "Gracias, Lempira"}\n🎵 *Canción solicitada:* ${song || "Cualquier éxito"}\n💬 *Saludo:* ${greeting || "¡Un saludo especial para todo Lempira!"}`;

    const encodedMessage = encodeURIComponent(messageText);

    // Open WhatsApp directly (can be configured with station number)
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-950 border border-yellow-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-900 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {sentSuccess ? (
          <div className="py-12 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-white">¡Petición Preparada!</h3>
            <p className="text-sm text-slate-300">
              Se ha abierto WhatsApp con tu mensaje formateado listo para enviar a la radio.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex p-3 rounded-full bg-yellow-400/10 text-yellow-400 mb-3 border border-yellow-400/20">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Pide tu Canción o Envía un Saludo
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tu mensaje llegará directamente a la cabina de transmisión en vivo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tu Nombre
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-yellow-400 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ciudad / Ubicación
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ej. Gracias, Lempira / EE. UU."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-yellow-400 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Canción o Artista Solicitado
                </label>
                <div className="relative">
                  <Music className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={song}
                    onChange={(e) => setSong(e.target.value)}
                    placeholder="Ej. La Cumbia del Sol - Los Temerarios"
                    className="w-full bg-slate-900 border border-slate-800 focus:border-yellow-400 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Mensaje o Saludo Especial
                </label>
                <textarea
                  rows={3}
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  placeholder="Un saludo para mi familia en Gracias, Lempira..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-yellow-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-yellow-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Send className="w-4 h-4" />
                Enviar Petición por WhatsApp
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};
