"use client";

import React, { useState } from "react";
import {
  X,
  Mail,
  MessageCircle,
  Building2,
  Copy,
  Check,
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

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
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
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
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
                WhatsApp Oficial
              </span>
              <span className="text-base sm:text-lg font-black text-[#081c38] block mt-0.5">
                {WHATSAPP_DISPLAY}
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                Atención y contacto directo vía WhatsApp.
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

          {/* Official Facebook Button */}
          <a
            href="https://www.facebook.com/radiogalaxia21/?locale=es_LA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2.5 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-2xl shadow-md transition-all hover:scale-[1.01] active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
            Síguenos en Facebook Oficial
          </a>
        </div>
      </div>
    </div>
  );
};
