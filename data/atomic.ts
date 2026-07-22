export type FrameworkId = "react-next" | "vue-nuxt" | "svelte-sveltekit";
export type RuntimeId = "server" | "transfer" | "client" | "cross-runtime";

export type Framework = {
  id: FrameworkId;
  shortLabel: string;
  label: string;
  packages: string[];
};

export type PlaygroundLab = {
  id: string;
  docsId: string;
  title: string;
  eyebrow: string;
  runtime: RuntimeId;
  adapter?: "cookie" | "localStorage" | "sessionStorage" | "requestMemory" | "layered";
  frameworks: FrameworkId[];
  size: "compact" | "wide" | "tall";
  summary: string;
};

export type AdapterCapability = {
  name: "cookie" | "localStorage" | "sessionStorage" | "requestMemory" | "layered";
  serverRead: string;
  serverWrite: string;
  clientRead: string;
  clientWrite: string;
  lifetime: string;
  bridge: string;
};

export type DocsSection = {
  id: string;
  title: string;
  summary: string;
  labId?: string;
};

export const frameworks: Framework[] = [
  {
    id: "react-next",
    shortLabel: "React / Next",
    label: "React and Next.js",
    packages: ["@ssr-storage/react", "@ssr-storage/next"],
  },
  {
    id: "vue-nuxt",
    shortLabel: "Vue / Nuxt",
    label: "Vue and Nuxt",
    packages: ["@ssr-storage/vue", "@ssr-storage/nuxt"],
  },
  {
    id: "svelte-sveltekit",
    shortLabel: "Svelte / Kit",
    label: "Svelte and SvelteKit",
    packages: ["@ssr-storage/svelte"],
  },
];

const everyFramework = frameworks.map(({ id }) => id);

export const playgroundLabs: PlaygroundLab[] = [
  {
    id: "cookie-bridge",
    docsId: "adapters",
    title: "Cookie bridge",
    eyebrow: "REQUEST TO BROWSER",
    runtime: "cross-runtime",
    adapter: "cookie",
    frameworks: everyFramework,
    size: "wide",
    summary: "Read during SSR, serialize the same value for hydration, then stage a response cookie mutation.",
  },
  {
    id: "local-draft",
    docsId: "adapters",
    title: "Draft autosave",
    eyebrow: "BROWSER DURABILITY",
    runtime: "client",
    adapter: "localStorage",
    frameworks: everyFramework,
    size: "tall",
    summary: "Persist a draft in this browser while making the unavailable server read explicit.",
  },
  {
    id: "session-wizard",
    docsId: "adapters",
    title: "Checkout step",
    eyebrow: "TAB SCOPE",
    runtime: "client",
    adapter: "sessionStorage",
    frameworks: everyFramework,
    size: "compact",
    summary: "Keep multi-step progress across reloads without sharing it with another tab.",
  },
  {
    id: "request-memory",
    docsId: "adapters",
    title: "Request trace",
    eyebrow: "SERVER SCOPE",
    runtime: "server",
    adapter: "requestMemory",
    frameworks: everyFramework,
    size: "compact",
    summary: "Carry ephemeral values through one render or handler and discard them with the request.",
  },
  {
    id: "layered-storage",
    docsId: "adapters",
    title: "Layered preference",
    eyebrow: "ORDERED FALLBACK",
    runtime: "cross-runtime",
    adapter: "layered",
    frameworks: everyFramework,
    size: "wide",
    summary: "Read through explicit fallbacks and write to one declared target without hiding capability gaps.",
  },
  {
    id: "codec-migration",
    docsId: "cells-codecs",
    title: "Codec checkpoint",
    eyebrow: "VALIDATE AND MIGRATE",
    runtime: "cross-runtime",
    frameworks: everyFramework,
    size: "tall",
    summary: "Decode typed data, migrate older envelopes, reject malformed input, and expire stale values.",
  },
  {
    id: "lease-queue",
    docsId: "concurrency",
    title: "Scoped lease queue",
    eyebrow: "READERS AND WRITER",
    runtime: "cross-runtime",
    frameworks: everyFramework,
    size: "wide",
    summary: "Run concurrent reads, queue an exclusive writer, then hold later reads behind that writer.",
  },
  {
    id: "idempotency",
    docsId: "idempotency",
    title: "Operation replay",
    eyebrow: "STRICT FINGERPRINT",
    runtime: "cross-runtime",
    frameworks: everyFramework,
    size: "wide",
    summary: "Replay one successful operation ID and reject the same ID when its action or payload changes.",
  },
  {
    id: "react-external-store",
    docsId: "hydration",
    title: "External store sync",
    eyebrow: "REACT HYDRATION",
    runtime: "cross-runtime",
    frameworks: ["react-next"],
    size: "compact",
    summary: "Keep getServerSnapshot and the first client snapshot identical before subscriptions take over.",
  },
  {
    id: "vue-reactivity",
    docsId: "frameworks",
    title: "Reactive cell",
    eyebrow: "VUE AND NUXT",
    runtime: "cross-runtime",
    frameworks: ["vue-nuxt"],
    size: "compact",
    summary: "Seed a reactive value from the SSR payload, then follow core storage subscriptions on the client.",
  },
  {
    id: "svelte-store",
    docsId: "frameworks",
    title: "Readable bridge",
    eyebrow: "SVELTE AND KIT",
    runtime: "cross-runtime",
    frameworks: ["svelte-sveltekit"],
    size: "compact",
    summary: "Expose the same cell contract through a Svelte-readable subscription and typed setter.",
  },
];

export const adapterCapabilities: AdapterCapability[] = [
  {
    name: "cookie",
    serverRead: "Request headers",
    serverWrite: "Response commit only",
    clientRead: "document.cookie",
    clientWrite: "document.cookie",
    lifetime: "Configured expiry",
    bridge: "Yes - SSR and browser",
  },
  {
    name: "localStorage",
    serverRead: "Unavailable",
    serverWrite: "Unavailable",
    clientRead: "Available",
    clientWrite: "Available",
    lifetime: "Browser profile",
    bridge: "No - client only",
  },
  {
    name: "sessionStorage",
    serverRead: "Unavailable",
    serverWrite: "Unavailable",
    clientRead: "Available",
    clientWrite: "Available",
    lifetime: "Browser tab",
    bridge: "No - client only",
  },
  {
    name: "requestMemory",
    serverRead: "Available",
    serverWrite: "Current request",
    clientRead: "Unavailable",
    clientWrite: "Unavailable",
    lifetime: "One request/context",
    bridge: "Snapshot only if exposed",
  },
  {
    name: "layered",
    serverRead: "Depends on layers",
    serverWrite: "Declared target",
    clientRead: "Depends on layers",
    clientWrite: "Declared target",
    lifetime: "Layer dependent",
    bridge: "Only through capable layers",
  },
];

export const docsSections: DocsSection[] = [
  { id: "mental-model", title: "Mental model", summary: "Cells define meaning; adapters define where bytes live; contexts define which operations are legal." },
  { id: "packages", title: "Package boundaries", summary: "Core stays platform-neutral while framework packages translate subscriptions and request APIs." },
  { id: "cells-codecs", title: "Cells and codecs", summary: "Typed immutable descriptors pair defaults, codecs, migrations, TTL, and exposure policy." , labId: "codec-migration" },
  { id: "request-flow", title: "Request to hydration", summary: "Server reads become a safe snapshot, then seed the first browser render without changing value." , labId: "cookie-bridge" },
  { id: "adapters", title: "Adapters", summary: "Cookie, browser storage, request memory, and layered storage advertise honest runtime capabilities." , labId: "layered-storage" },
  { id: "hydration", title: "Hydration contracts", summary: "Framework bindings subscribe to core storage while preserving the server snapshot during hydration." , labId: "react-external-store" },
  { id: "frameworks", title: "Framework recipes", summary: "React, Next, Vue, Nuxt, Svelte, and SvelteKit share cells while respecting their request boundaries." , labId: "vue-reactivity" },
  { id: "concurrency", title: "Scoped leases", summary: "Multiple readers may proceed together; writers are exclusive and queued fairly." , labId: "lease-queue" },
  { id: "idempotency", title: "Idempotency", summary: "An operation ID replays only when the cell, action, and payload fingerprint are identical." , labId: "idempotency" },
  { id: "errors", title: "Errors and guarantees", summary: "Capability and operation errors explain the boundary without claiming transactions or distributed durability." },
];

export const runtimeLabels: Record<RuntimeId, string> = {
  server: "SERVER ONLY",
  transfer: "TRANSFER",
  client: "CLIENT ONLY",
  "cross-runtime": "SERVER TO CLIENT",
};

