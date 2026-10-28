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
  Briefcase,
  Megaphone,
  CheckCircle2,
  Radio,
  ArrowRight,
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
  const [businessName, setBusinessName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [city, setCity] = useState("");
  const [adInterest, setAdInterest] = useState("Pauta publicitaria / Cuñas");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"adForm" | "info">("adForm");
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDirectWhatsAppAd = () => {
    const defaultText = encodeURIComponent(
      "Hola Administración de Radio Galaxia 21 (95.1 FM), me gustaría cotizar publicidad y espacios comerciales para mi negocio."
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultText}`, "_blank");
  };

  const handleSubmitAdQuote = (e: React.FormEvent) => {
    e.preventDefault();

    const quoteText = `💼 *SOLICITUD DE PUBLICIDAD — RADIO GALAXIA 21 HRNS (95.1 FM)*\n\n🏢 *Empresa / Negocio:* ${
      businessName || "No especificado"
    }\n👤 *Contacto:* ${contactPerson || "Interesado"}\n📍 *Ubicación:* ${
      city || "Gracias, Lempira"
    }\n🎯 *Interés:* ${adInterest}${
      message ? `\n📝 *Detalles de la consulta:* ${message}` : ""
    }\n\n_Enviado desde el sitio web oficial de Galaxia 21._`;

    const encoded = encodeURIComponent(quoteText);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 1800);
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
        {/* Top Header */}
        <div className="bg-[#061833] text-white p-5 sm:p-6 relative">
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
              <div className="inline-flex items-center gap-1.5 bg-[#facc15] text-[#081c38] px-2.5 py-0.5 rounded-full font-black text-[10px] uppercase tracking-wider mb-1">
                <Megaphone className="w-3 h-3" />
                <span>Administración & Publicidad</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white">
                Anúnciate en Galaxia 21
              </h2>
              <p className="text-xs text-slate-300 font-medium mt-1">
                La voz líder con cobertura en todo Lempira por 95.1 FM
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-white/10">
            <button
              onClick={() => setActiveTab("adForm")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === "adForm"
                  ? "bg-[#facc15] text-[#081c38] shadow-xs"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Cotizar Publicidad</span>
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === "info"
                  ? "bg-[#facc15] text-[#081c38] shadow-xs"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Datos Corporativos</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {sentSuccess ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-xl font-black text-[#081c38]">
                ¡Conectando con Administración!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Se está abriendo WhatsApp con tu consulta publicitaria preparada para el equipo comercial de Radio Galaxia 21.
              </p>
            </div>
          ) : activeTab === "adForm" ? (
            <div className="space-y-4">
              {/* Highlight Commercial Pitch */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50/70 border border-amber-200/80">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 block">
                      Línea Comercial y Ventas
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#081c38] block">
                      WhatsApp: {WHATSAPP_DISPLAY}
                    </span>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Llega a miles de oyentes en Gracias y municipios vecinos. Cotiza cuñas radiales, menciones en vivo, patrocinios de noticias o eventos especiales.
                    </p>
                  </div>
                </div>

                {/* Direct 1-Click WhatsApp Button */}
                <button
                  onClick={handleDirectWhatsAppAd}
                  className="mt-3.5 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chatear directamente con Publicidad</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Form to Prepare a Quote */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  O envía los datos de tu empresa:
                </span>

                <form onSubmit={handleSubmitAdQuote} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#081c38] mb-1">
                      Nombre de la Empresa o Negocio
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Ej. Comercial Los Ángeles / Farmacia San José"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#facc15] focus:bg-white rounded-xl px-3.5 py-2 text-sm text-[#081c38] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#081c38] mb-1">
                        Persona de Contacto
                      </label>
                      <input
                        type="text"
                        required
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="Ej. Lic. Carlos Rivera"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#facc15] focus:bg-white rounded-xl px-3.5 py-2 text-sm text-[#081c38] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#081c38] mb-1">
                        Ciudad / Municipio
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ej. Gracias, Lempira"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#facc15] focus:bg-white rounded-xl px-3.5 py-2 text-sm text-[#081c38] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#081c38] mb-1">
                      Tipo de Publicidad Requerida
                    </label>
                    <select
                      value={adInterest}
                      onChange={(e) => setAdInterest(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#facc15] focus:bg-white rounded-xl px-3.5 py-2 text-sm text-[#081c38] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Pauta publicitaria / Cuñas">
                        Pauta publicitaria / Cuñas radiales
                      </option>
                      <option value="Menciones en vivo de locutor">
                        Menciones en vivo de locutor
                      </option>
                      <option value="Patrocinio de programa radial">
                        Patrocinio de programa radial
                      </option>
                      <option value="Cobertura de inauguración o evento">
                        Cobertura de inauguración o evento
                      </option>
                      <option value="Paquete mensual para negocio local">
                        Paquete mensual para negocio local
                      </option>
                      <option value="Otro tipo de publicidad o consulta">
                        Otro tipo de publicidad o consulta
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#081c38] mb-1">
                      Comentarios o Detalles (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Deseamos anunciar una promoción durante el mes de..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-[#facc15] focus:bg-white rounded-xl px-3.5 py-2 text-sm text-[#081c38] focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#061833] hover:bg-[#0a2752] text-[#facc15] font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Solicitud al WhatsApp de Administración</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
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
                    Entidad operadora de Radio Galaxia 21 HRNS • Gracias, Lempira
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
                    Correo Electrónico de Administración
                  </span>
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="text-sm sm:text-base font-bold text-blue-700 hover:underline block break-all mt-0.5"
                  >
                    {EMAIL_ADDRESS}
                  </a>
                  <p className="text-xs text-slate-500 mt-1">
                    Para contratos publicitarios, comprobantes y correspondencia oficial.
                  </p>
                  <div className="flex gap-2 mt-2.5">
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

              {/* WhatsApp Administration Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    WhatsApp Administración & Ventas
                  </span>
                  <span className="text-base sm:text-lg font-black text-[#081c38] block mt-0.5">
                    {WHATSAPP_DISPLAY}
                  </span>
                  <p className="text-xs text-slate-600 mt-1">
                    Atención directa a empresas, patrocinadores y clientes comerciales.
                  </p>
                  <button
                    onClick={handleDirectWhatsAppAd}
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    Chatear con Administración ({WHATSAPP_DISPLAY})
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
