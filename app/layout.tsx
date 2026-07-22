import type { Metadata } from "next";
import { Chakra_Petch, JetBrains_Mono } from "next/font/google";
import { Cursor } from "@/components/cursor";
import { SignalRail } from "@/components/signal-rail";
import { contact, siteUrl } from "@/data/content";
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
  metadataBase: new URL(siteUrl),
  title: "Raghav Gupta | Founding Engineer & AI Systems Architect",
  description:
    "The story of a founding engineer who built Featurely from a cold DM into an AI platform that runs a thousand synthetic user tests at once.",
  keywords: [
    "Raghav Gupta",
    "founding engineer",
    "head of engineering",
    "AI engineer",
    "forward deployed engineer",
    "backend engineer",
    "synthetic users",
    "usability testing",
    "distributed systems",
    "MCP",
    "agent skills",
    "Featurely",
    "FastAPI",
    "Python",
    "Go",
    "Rust",
    "AWS",
    "Bengaluru",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Raghav Gupta | Founding Engineer & AI Systems Architect",
    description:
      "From a cold DM to a thousand synthetic users: how I built Featurely from zero.",
    type: "profile",
    firstName: "Raghav",
    lastName: "Gupta",
    url: "/",
    siteName: "Raghav Gupta",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghav Gupta | Founding Engineer",
    description:
      "From a cold DM to a thousand synthetic users: how I built Featurely from zero.",
  },
};

// Person schema so search engines connect the name to Featurely, the roles,
// and the profile links. `<` is escaped per the Next.js JSON-LD guide.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Raghav Gupta",
  jobTitle: "Founding Engineer & Head of Engineering",
  worksFor: { "@type": "Organization", name: "Featurely" },
  url: siteUrl,
  sameAs: [contact.linkedin, contact.github],
  knowsAbout: [
    "AI agents",
    "MCP",
    "agent skills",
    "synthetic users",
    "usability testing",
    "distributed systems",
    "FastAPI",
    "Celery",
    "AWS",
    "Python",
    "Go",
    "Rust",
  ],
  description:
    "Founding engineer who built Featurely, an AI platform that runs synthetic user tests on real browsers at scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${chakra.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <div className="noise-overlay" aria-hidden />
        <div className="scanline-overlay" aria-hidden />
        <SignalRail />
        <Cursor />
      </body>
    </html>
  );
}
