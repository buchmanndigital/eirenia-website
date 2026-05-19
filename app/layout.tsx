import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const lato = localFont({
  src: [
    { path: "./fonts/lato-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/lato-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/lato-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-lato",
  display: "swap",
});

const playfair = localFont({
  src: [
    { path: "./fonts/playfair-normal.woff2", weight: "400 700", style: "normal" },
    { path: "./fonts/playfair-italic.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = localFont({
  src: [
    { path: "./fonts/cormorant-normal.woff2", weight: "300 500", style: "normal" },
    { path: "./fonts/cormorant-italic.woff2", weight: "300 500", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EIRENIA – The Return to Peace",
  description:
    "Ein offener, liebevoller Raum für innere Ruhe, Weisheit und menschliche Begegnung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${lato.variable} ${playfair.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
