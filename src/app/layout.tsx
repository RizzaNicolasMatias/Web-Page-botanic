import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/data/products";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | Vivero en San Miguel de Tucumán · Envíos con Uber`,
  description:
    "Catálogo online de plantas de interior, exterior, árboles frutales, suculentas, macetas artesanales y sustratos en San Miguel de Tucumán. Hacé tu pedido por WhatsApp con envíos mediante Uber.",
  keywords: [
    "vivero en tucuman",
    "plantas san miguel de tucuman",
    "piccolo giardino",
    "plantas de interior tucuman",
    "macetas tucuman",
    "envio de plantas tucuman",
  ],
  openGraph: {
    title: `${SITE_CONFIG.name} — Vivero en San Miguel de Tucumán`,
    description:
      "Explorá nuestro catálogo con fotos y precios en pesos argentinos. Pedí por WhatsApp y recibí en el día mediante Uber.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GardenStore",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.tagline,
    telephone: `+${SITE_CONFIG.whatsappNumber}`,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address,
      addressLocality: "San Miguel de Tucumán",
      addressRegion: "Tucumán",
      addressCountry: "AR",
    },
    areaServed: ["San Miguel de Tucumán", "Yerba Buena", "Tafí Viejo"],
    priceRange: "$$",
  };

  return (
    <html lang="es-AR" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="antialiased selection:bg-[#1B3B2B] selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}