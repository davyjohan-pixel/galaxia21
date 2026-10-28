import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";

export const metadata: Metadata = {
  title: "Galaxia 21 HRNS 95.1 FM — La Radio de Lempira",
  description:
    "Escucha en vivo Galaxia 21 HRNS 95.1 FM desde Gracias, Lempira. Música, información y la mejor compañía, siempre.",
  keywords: [
    "Galaxia 21",
    "HRNS",
    "95.1 FM",
    "Gracias Lempira",
    "Radio en vivo Honduras",
    "Radio Lempira",
  ],
  openGraph: {
    title: "Galaxia 21 HRNS 95.1 FM — La Radio de Lempira",
    description:
      "Transmitiendo la mejor música y noticias desde Gracias, Lempira para todo el mundo.",
    images: ["/logo-galaxia-hd.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#f8fafc] text-[#081c38] min-h-screen selection:bg-yellow-400 selection:text-slate-950">
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
