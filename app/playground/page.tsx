import type { Metadata } from "next";
import { serializeStorageSnapshotContent } from "@ssr-storage/core";
import { createNextServerStorage } from "@ssr-storage/next";
import { PlaygroundShell } from "@/components/atomic/playground-shell";
import { PlaygroundClient } from "./playground-client";
import { PlaygroundProvider } from "./playground-provider";
import { applicationCells, applicationIdCell, requestTraceCell } from "./storage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Atomic Playground | SSR Cookies and Browser Storage",
  description:
    "See how cookies, localStorage, sessionStorage, request memory, hydration, write ordering, and safe retries work across Next.js, Nuxt, React, Vue, and Svelte.",
  alternates: { canonical: "/playground" },
};

export default async function PlaygroundPage() {
  const storage = await createNextServerStorage({ cells: applicationCells });
  const serverApplicationId = await storage.get(applicationIdCell);
  const generatedTrace = `REQ-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  await storage.set(requestTraceCell, generatedTrace);
  const requestTrace = await storage.get(requestTraceCell);
  const snapshot = storage.snapshot();

  return (
    <PlaygroundShell
      active="labs"
      eyebrow="A REAL SERVER REQUEST / A REAL COOKIE WRITE"
      title="One application. Four places to keep its state."
      intro="Server rendering happens before browser storage exists. This form still needs an application ID on the server, a saved browser draft, a tab-specific step, and temporary request data. Atomic gives each value one typed API and rejects operations that cannot work."
    >
      <PlaygroundProvider snapshot={snapshot}>
        <PlaygroundClient
          requestTrace={requestTrace}
          serverApplicationId={serverApplicationId}
          snapshotApplicationId={serverApplicationId}
        />
      </PlaygroundProvider>
      <script
        id="__SSR_STORAGE__"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: serializeStorageSnapshotContent(snapshot) }}
      />
    </PlaygroundShell>
  );
}
