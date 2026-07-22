import type { Metadata } from "next";
import { PlaygroundShell } from "@/components/atomic/playground-shell";
import { PlaygroundClient } from "./playground-client";

export const metadata: Metadata = {
  title: "Atomic Playground | SSR Cookies and Browser Storage",
  description:
    "See how cookies, localStorage, sessionStorage, request memory, hydration, write ordering, and safe retries work across Next.js, Nuxt, React, Vue, and Svelte.",
  alternates: { canonical: "/playground" },
};

export default function PlaygroundPage() {
  return (
    <PlaygroundShell
      active="labs"
      eyebrow="THE PROBLEM: SERVER STORAGE AND BROWSER STORAGE ARE DIFFERENT"
      title="Use the same value on the server and in the browser."
      intro="Server rendering happens before browser storage exists. Cookies can cross that gap, but localStorage and sessionStorage cannot. Atomic gives each value one typed API and tells you which reads and writes are possible. Try the examples below."
    >
      <PlaygroundClient />
    </PlaygroundShell>
  );
}
