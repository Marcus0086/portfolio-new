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
  title: "Raghav Gupta | Founding Engineer, AI and Backend Systems",
  description:
    "Raghav Gupta is a founding engineer in Bengaluru who builds AI agents, distributed backend systems, and production infrastructure with Python, FastAPI, Celery, Go, Rust, and AWS.",
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
    title: "Raghav Gupta | Founding Engineer, AI and Backend Systems",
    description:
      "I build AI agents, distributed backends, and production infrastructure that handles real users and real load.",
    type: "profile",
    firstName: "Raghav",
    lastName: "Gupta",
    url: "/",
    siteName: "Raghav Gupta",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghav Gupta | Founding Engineer and Backend Builder",
    description:
      "AI agents, distributed systems, backend infrastructure, and the projects I build to understand the stack.",
  },
};

// The home page is about one person, so ProfilePage wraps the Person entity.
// `<` is escaped per the Next.js JSON-LD guide.
const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Raghav Gupta",
    jobTitle: "Founding Engineer and Backend Engineer",
    worksFor: { "@type": "Organization", name: "Featurely" },
    homeLocation: { "@type": "Place", name: "Bengaluru, India" },
    url: siteUrl,
    sameAs: [contact.linkedin, contact.github],
    knowsAbout: [
      "AI agents",
      "backend engineering",
      "distributed systems",
      "synthetic users",
      "browser automation",
      "FastAPI",
      "Celery",
      "AWS",
      "Python",
      "Go",
      "Rust",
    ],
    description:
      "Founding engineer in Bengaluru who builds AI agents, distributed backends, and production infrastructure.",
  },
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
            __html: JSON.stringify(profilePageJsonLd).replace(/</g, "\\u003c"),
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
