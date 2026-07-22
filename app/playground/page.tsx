import type { Metadata } from "next";
import { PlaygroundShell } from "@/components/atomic/playground-shell";
import { PlaygroundClient } from "./playground-client";

export const metadata: Metadata = {
  title: "Atomic SSR Storage Playground | Raghav Gupta",
  description:
    "Interactive SSR Storage labs for cookies, browser storage, hydration, scoped leases, and idempotent operations across React, Vue, and Svelte frameworks.",
  alternates: { canonical: "/playground" },
};

export default function PlaygroundPage() {
  return (
    <PlaygroundShell
      active="labs"
      eyebrow="STATIC SERVER SIMULATION / LIVE BROWSER STATE"
      title="Watch state cross the runtime boundary."
      intro="Atomic gives one typed cell different legal operations in a request, a transfer snapshot, and a browser. These labs expose the boundary instead of hiding it."
    >
      <PlaygroundClient />
    </PlaygroundShell>
  );
}

