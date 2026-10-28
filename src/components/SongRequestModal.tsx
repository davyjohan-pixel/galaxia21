"use client";

import React, { useState } from "react";
import {
  X,
  Mail,
  Send,
  MessageCircle,
  Building2,
  Copy,
  Check,
  Phone,
  Music,
  User,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface SongRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "50495107057";
const WHATSAPP_DISPLAY = "+504 9510-7057";
const EMAIL_ADDRESS = "congolongalaxi@yahoo.com.mx";
const LEGAL_NAME = "Inversiones Lempira";

export const SongRequestModal: React.FC<SongRequestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [song, setSong] = useState("");
  const [greeting, setGreeting] = useState("");
  const [activeTab, setActiveTab] = useState<"info" | "request">("info");
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();

    const messageText = `📻 *MENSAJE PARA RADIO GALAXIA 21 HRNS (95.1 FM)*\n\n👤 *De:* ${
      name || "Oyente"
    }\n📍 *Desde:* ${city || "Gracias, Lempira"}${
      song ? `\n🎵 *Canción solicitada:* ${song}` : ""
    }${greeting ? `\n💬 *Mensaje:* ${greeting}` : ""}`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 1800);
  };

  const handleDirectWhatsApp = () => {
    const defaultText = encodeURIComponent(
      "Hola Radio Galaxia 21 (95.1 FM), me gustaría ponerme en contacto con ustedes."
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultText}`, "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#061833]/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_20px_60px_rgba(6,24,51,0.25)] border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Brand Accent */}
        <div className="bg-[#061833] text-white p-5 sm:p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5 pr-8">
            <div className="w-12 h-12 rounded-full bg-white p-1 shrink-0 shadow-md">
              <img
                src="/logo-galaxia-hd.png"
                alt="Galaxia 21"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white">
                Contacto Oficial
              </h2>
              <p className="text-xs sm:text-sm text-yellow-400 font-semibold mt-1">
                Radio Galaxia 21 HRNS • 95.1 FM
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-white/10">
            <button
              onClick={() => setActiveTab("info")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "info"
                  ? "bg-[#facc15] text-[#081c38] shadow-xs"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Datos de Contacto
            </button>
            <button
              onClick={() => setActiveTab("request")}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "request"
                  ? "bg-[#facc15] text-[#081c38] shadow-xs"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Pedir Canción / Mensaje
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {sentSuccess ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-xl font-black text-[#081c38]">
                ¡Abriendo WhatsApp!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Tu mensaje ya está formateado y listo para ser enviado a la cabina de Radio Galaxia 21.
              </p>
            </div>
          ) : activeTab === "info" ? (
            <div className="space-y-4">
              {/* Legal Name Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#061833] text-[#facc15] flex items-center justify-center shrink-0 shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Nombre Legal / Razón Social
                  </span>
                  <span className="text-base sm:text-lg font-black text-[#081c38] block mt-0.5">
                    {LEGAL_NAME}
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    Gracias, Lempira, Honduras
                  </span>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Correo Electrónico
                  </span>
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="text-sm sm:text-base font-bold text-blue-700 hover:underline block break-all mt-0.5"
                  >
                    {EMAIL_ADDRESS}
                  </a>
                  <div className="flex gap-2 mt-2">
                    <a
                      href={`mailto:${EMAIL_ADDRESS}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#081c38] bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      Escribir correo
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    WhatsApp Oficial de Cabina
                  </span>
                  <span className="text-base sm:text-lg font-black text-[#081c38] block mt-0.5">
                    {WHATSAPP_DISPLAY}
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Envía tus saludos, peticiones musicales o consultas publicitarias.
                  </p>
                  <button
                    onClick={handleDirectWhatsApp}
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    Chatear por WhatsApp ({WHATSAPP_DISPLAY})
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendCustomMessage} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#081c38] mb-1">
                  Tu Nombre
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#facc15] focus:bg-white rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#081c38] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#081c38] mb-1">
                  Ciudad / Ubicación
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ej. Gracias, Lempira / EE. UU."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#facc15] focus:bg-white rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#081c38] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#081c38] mb-1">
                  Canción o Artista (Opcional)
                </label>
                <div className="relative">
                  <Music className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={song}
                    onChange={(e) => setSong(e.target.value)}
                    placeholder="Ej. La Cumbia del Sol"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#facc15] focus:bg-white rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#081c38] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#081c38] mb-1">
                  Mensaje o Saludo Especial
                </label>
                <textarea
                  rows={2}
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  placeholder="Un saludo especial para toda la familia..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#facc15] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-[#081c38] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                Enviar Mensaje a WhatsApp (+504 9510-7057)
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
