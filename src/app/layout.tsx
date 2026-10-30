import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://galaxia21.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Radio Galaxia 21 (95.1 FM) — Radio en Gracias, Lempira En Vivo | HRNS",
  description:
    "Escucha en vivo Radio Galaxia 21 HRNS (95.1 FM), la emisora de radio referente en Gracias, Lempira, Honduras. Más de 30 años transmitiendo música, noticias e información en vivo.",
  keywords: [
    "Radio Galaxia 21",
    "Galaxia 21",
    "Radio en Gracias Lempira",
    "Radios de Gracias Lempira",
    "Radio en Lempira Honduras",
    "Galaxia 21 95.1 FM",
    "Galaxia 21 HRNS",
    "95.1 FM Gracias Lempira",
    "Radio Galaxia 21 en vivo",
    "Inversiones Lempira",
    "Emisoras de Lempira",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "gj2SUldqBHkBxdNTIs6RM3QIvKQXKphxlnLO6ZJAL4g",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "96x96", type: "image/x-icon" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-white.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "es_HN",
    url: SITE_URL,
    siteName: "Radio Galaxia 21 (95.1 FM)",
    title: "Radio Galaxia 21 (95.1 FM) — La Radio de Gracias, Lempira En Vivo",
    description:
      "Sintoniza en vivo Radio Galaxia 21 HRNS 95.1 FM desde Gracias, Lempira, Honduras. Música, información y la mejor compañía, siempre.",
    images: [
      {
        url: "/lockscreen-cover.png",
        width: 960,
        height: 640,
        alt: "Radio Galaxia 21 95.1 FM — Gracias, Lempira",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Radio Galaxia 21 (95.1 FM) — Radio en Gracias, Lempira",
    description:
      "Escucha en vivo Radio Galaxia 21 HRNS 95.1 FM desde Gracias, Lempira, Honduras.",
    images: ["/lockscreen-cover.png"],
  },
  other: {
    "geo.region": "HN-LE",
    "geo.placename": "Gracias, Lempira, Honduras",
    "geo.position": "14.5903;-88.5819",
    ICBM: "14.5903, -88.5819",
  },
};

const radioStationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RadioStation",
  name: "Radio Galaxia 21",
  alternateName: ["Galaxia 21", "Galaxia 21 HRNS", "Radio Galaxia 21 95.1 FM"],
  legalName: "Inversiones Lempira",
  description:
    "Con más de 30 años de trayectoria ininterrumpida, Radio Galaxia 21 (95.1 FM HRNS) es la emisora de radio referente de Gracias y todo el departamento de Lempira, Honduras.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-galaxia-hd.png`,
  image: `${SITE_URL}/lockscreen-cover.png`,
  telephone: "+50495107057",
  email: "congolongalaxi@yahoo.com.mx",
  broadcastDisplayName: "Radio Galaxia 21 — 95.1 FM",
  callSign: "HRNS",
  broadcastFrequency: {
    "@type": "BroadcastFrequencySpecification",
    broadcastFrequencyValue: 95.1,
    broadcastFrequencyUnit: "MHz",
    broadcastSignalModulation: "FM",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gracias",
    addressRegion: "Lempira",
    addressCountry: "HN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 14.5903,
    longitude: -88.5819,
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Gracias, Lempira, Honduras",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(radioStationJsonLd),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[#f8fafc] text-[#081c38] min-h-screen selection:bg-yellow-400 selection:text-slate-950">
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
