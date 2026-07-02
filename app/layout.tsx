import type { Metadata } from "next";
import { Chakra_Petch, JetBrains_Mono } from "next/font/google";
import { Cursor } from "@/components/cursor";
import { SignalRail } from "@/components/signal-rail";
import "./globals.css";

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Raghav Gupta — Founding Engineer",
  description:
    "Founding engineer and AI systems architect. Synthetic minds in real browsers by day; distributed systems in Go and Rust by night.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${chakra.variable} ${jetbrains.variable} antialiased`}>
      <body>
        {children}
        <div className="noise-overlay" aria-hidden />
        <div className="scanline-overlay" aria-hidden />
        <SignalRail />
        <Cursor />
      </body>
    </html>
  );
}
