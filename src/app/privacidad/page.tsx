import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad — Radio Galaxia 21 (95.1 FM)",
  description:
    "Política de Privacidad oficial de la aplicación móvil y sitio web de Radio Galaxia 21 HRNS (95.1 FM), operada por Inversiones Lempira.",
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#081c38] py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_12px_40px_rgba(8,28,56,0.08)] border border-slate-100 p-6 sm:p-10 lg:p-12">
        <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
          <div className="flex items-center gap-3.5">
            <img
              src="/logo-galaxia-hd.png"
              alt="Radio Galaxia 21 HRNS"
              className="w-14 h-14 object-contain"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#081c38] leading-tight">
                Política de Privacidad
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Radio Galaxia 21 HRNS (95.1 FM) • Inversiones Lempira
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="bg-[#facc15] hover:bg-[#eab308] text-[#081c38] font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-colors shrink-0"
          >
            ← Volver a la Radio
          </Link>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Última actualización: Noviembre 2026
          </p>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-[#081c38]">
              1. Identidad del Responsable
            </h2>
            <p>
              La aplicación móvil para Android y el sitio web oficial de{" "}
              <strong>Radio Galaxia 21 (95.1 FM — HRNS)</strong> son operados
              por <strong>Inversiones Lempira</strong>, con domicilio en la
              ciudad de Gracias, departamento de Lempira, Honduras.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-[#081c38]">
              2. Datos que Recopilamos
            </h2>
            <p>
              Nuestra aplicación móvil y sitio web están diseñados para permitir
              a los oyentes sintonizar de forma gratuita nuestra señal de radio
              en vivo por Internet.{" "}
              <strong>
                No exigimos registro de cuentas ni recopilamos datos personales
                sensibles
              </strong>{" "}
              (como nombres, contraseñas, contactos, ubicación GPS precisa,
              micrófono o cámara) para reproducir la emisora.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-[#081c38]">
              3. Permisos de la Aplicación Android
            </h2>
            <p>
              La aplicación oficial de Radio Galaxia 21 en Google Play utiliza
              únicamente permisos técnicos estrictamente necesarios para el
              funcionamiento del reproductor de audio:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                <strong>Acceso a Internet y estado de red:</strong> Necesario
                para recibir el flujo de audio en vivo (streaming) desde nuestro
                servidor de transmisión.
              </li>
              <li>
                <strong>Servicio en primer plano (Foreground Service Media Playback) y Wake Lock:</strong>{" "}
                Permite que la radio continúe sonando sin interrupciones cuando
                el usuario apaga la pantalla del teléfono o utiliza otras
                aplicaciones.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-[#081c38]">
              4. Enlaces Externos (WhatsApp y Correo Electrónico)
            </h2>
            <p>
              La aplicación incluye botones opcionales de contacto que abren las
              aplicaciones externas de WhatsApp o cliente de correo del propio
              dispositivo cuando el usuario decide comunicarse voluntariamente
              con la emisora. Cualquier información enviada a través de dichos
              canales es utilizada únicamente para atender la consulta del
              usuario.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-[#081c38]">
              5. Privacidad de los Menores
            </h2>
            <p>
              Nuestro contenido es apto para todo público familiar y no
              recopilamos intencionalmente información personal de menores de
              edad.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-[#081c38]">
              6. Contacto Oficial
            </h2>
            <p>
              Para cualquier duda sobre esta Política de Privacidad, puede
              comunicarse con nosotros a través de:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Razón Social:</strong> Inversiones Lempira
              </li>
              <li>
                <strong>Correo Electrónico:</strong>{" "}
                <a
                  href="mailto:congolongalaxi@yahoo.com.mx"
                  className="text-blue-700 font-semibold hover:underline"
                >
                  congolongalaxi@yahoo.com.mx
                </a>
              </li>
              <li>
                <strong>WhatsApp / Teléfono:</strong> +504 9510-7057
              </li>
              <li>
                <strong>Ubicación:</strong> Gracias, Lempira, Honduras
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
