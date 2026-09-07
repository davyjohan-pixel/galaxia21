import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Galaxia 21 HRNS — Radio en Vivo desde Gracias, Lempira",
  description: "Escucha en vivo Galaxia 21 HRNS desde Gracias, Lempira. La mejor música, noticias, deportes y entretenimiento las 24 horas del día.",
  keywords: ["Galaxia 21", "HRNS", "Gracias Lempira", "Radio en vivo Honduras", "Radio Lempira", "Streaming Radio"],
  openGraph: {
    title: "Galaxia 21 HRNS — Radio en Vivo",
    description: "Transmitiendo la mejor música y noticias desde Gracias, Lempira para todo el mundo.",
    images: ["/logo-galaxia21.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100 min-h-screen selection:bg-yellow-400 selection:text-slate-950`}
      >
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
