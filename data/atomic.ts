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
    title: "Cookie from server to browser",
    eyebrow: "COOKIE / BOTH SIDES",
    runtime: "cross-runtime",
    adapter: "cookie",
    frameworks: everyFramework,
    size: "wide",
    summary: "The server reads a cookie before rendering. The browser starts with the same value and can change it for the next request.",
  },
  {
    id: "local-draft",
    docsId: "adapters",
    title: "Draft autosave",
    eyebrow: "LOCALSTORAGE / BROWSER ONLY",
    runtime: "client",
    adapter: "localStorage",
    frameworks: everyFramework,
    size: "tall",
    summary: "Save a draft in this browser. It survives a reload, but the server cannot read it.",
  },
  {
    id: "session-wizard",
    docsId: "adapters",
    title: "Checkout step",
    eyebrow: "SESSIONSTORAGE / ONE TAB",
    runtime: "client",
    adapter: "sessionStorage",
    frameworks: everyFramework,
    size: "compact",
    summary: "Keep checkout progress after a reload. A different browser tab gets its own progress.",
  },
  {
    id: "request-memory",
    docsId: "adapters",
    title: "Temporary request data",
    eyebrow: "REQUEST MEMORY / SERVER ONLY",
    runtime: "server",
    adapter: "requestMemory",
    frameworks: everyFramework,
    size: "compact",
    summary: "Keep temporary server data for one request. It disappears when the response is finished.",
  },
  {
    id: "layered-storage",
    docsId: "adapters",
    title: "Try cookie, then localStorage",
    eyebrow: "MORE THAN ONE STORAGE SOURCE",
    runtime: "cross-runtime",
    adapter: "layered",
    frameworks: everyFramework,
    size: "wide",
    summary: "Try storage sources in order. Use the first value found, then write changes to one chosen source.",
  },
  {
    id: "codec-migration",
    docsId: "cells-codecs",
    title: "Check stored data",
    eyebrow: "BROKEN, OLD, OR EXPIRED DATA",
    runtime: "cross-runtime",
    frameworks: everyFramework,
    size: "tall",
    summary: "Check stored data before using it. Upgrade old formats, reject broken data, and ignore expired values.",
  },
  {
    id: "lease-queue",
    docsId: "concurrency",
    title: "One writer at a time",
    eyebrow: "KEEP OPERATIONS IN ORDER",
    runtime: "cross-runtime",
    frameworks: everyFramework,
    size: "wide",
    summary: "Several reads can run together. A write waits for them, runs alone, then lets the next read continue.",
  },
  {
    id: "idempotency",
    docsId: "idempotency",
    title: "Retry without writing twice",
    eyebrow: "SAFE RETRIES",
    runtime: "cross-runtime",
    frameworks: everyFramework,
    size: "wide",
    summary: "Retry the same write without doing it twice. Reusing the ID for a different write is an error.",
  },
  {
    id: "react-external-store",
    docsId: "hydration",
    title: "React without hydration flicker",
    eyebrow: "REACT / USESYNCEXTERNALSTORE",
    runtime: "cross-runtime",
    frameworks: ["react-next"],
    size: "compact",
    summary: "React receives the server value first. After hydration, it subscribes to new browser values.",
  },
  {
    id: "vue-reactivity",
    docsId: "frameworks",
    title: "Vue after server render",
    eyebrow: "VUE / NUXT",
    runtime: "cross-runtime",
    frameworks: ["vue-nuxt"],
    size: "compact",
    summary: "Nuxt sends the server value to Vue. The reactive value then updates when browser storage changes.",
  },
  {
    id: "svelte-store",
    docsId: "frameworks",
    title: "Svelte after server render",
    eyebrow: "SVELTE / SVELTEKIT",
    runtime: "cross-runtime",
    frameworks: ["svelte-sveltekit"],
    size: "compact",
    summary: "Svelte starts with the server value, then uses a readable store for browser updates.",
  },
];

export const adapterCapabilities: AdapterCapability[] = [
  {
    name: "cookie",
    serverRead: "Request headers",
    serverWrite: "Yes, in a response",
    clientRead: "document.cookie",
    clientWrite: "document.cookie",
    lifetime: "Configured expiry",
    bridge: "Yes",
  },
  {
    name: "localStorage",
    serverRead: "Unavailable",
    serverWrite: "Unavailable",
    clientRead: "Available",
    clientWrite: "Available",
    lifetime: "Browser profile",
    bridge: "No",
  },
  {
    name: "sessionStorage",
    serverRead: "Unavailable",
    serverWrite: "Unavailable",
    clientRead: "Available",
    clientWrite: "Available",
    lifetime: "Browser tab",
    bridge: "No",
  },
  {
    name: "requestMemory",
    serverRead: "Available",
    serverWrite: "Current request",
    clientRead: "Unavailable",
    clientWrite: "Unavailable",
    lifetime: "One server request",
    bridge: "Only when added to page data",
  },
  {
    name: "layered",
    serverRead: "Depends on layers",
    serverWrite: "Depends on the chosen storage",
    clientRead: "Depends on layers",
    clientWrite: "Depends on the chosen storage",
    lifetime: "Depends on the chosen storage",
    bridge: "Only when one layer supports it",
  },
];

export const docsSections: DocsSection[] = [
  { id: "mental-model", title: "Start here", summary: "A server and a browser cannot access the same storage in the same way. Atomic makes that difference explicit." },
  { id: "packages", title: "Which package to install", summary: "Core owns storage rules. Framework packages connect those rules to React, Next.js, Vue, Nuxt, and Svelte." },
  { id: "cells-codecs", title: "Define a value", summary: "A cell gives a stored value a name, a TypeScript type, a default, and rules for checking old or broken data.", labId: "codec-migration" },
  { id: "request-flow", title: "Move data from server to browser", summary: "Read on the server, include safe values in the page, and start the browser with the exact same values.", labId: "cookie-bridge" },
  { id: "adapters", title: "Choose where data lives", summary: "Cookies work on the server and in the browser. Browser storage and request memory only work on one side.", labId: "layered-storage" },
  { id: "hydration", title: "Avoid hydration flicker", summary: "The server render and the first browser render must use the same value. Browser-only storage loads after that.", labId: "react-external-store" },
  { id: "frameworks", title: "Use it with a framework", summary: "The framework packages connect the same cells to React, Next.js, Vue, Nuxt, Svelte, and SvelteKit.", labId: "vue-reactivity" },
  { id: "concurrency", title: "Keep reads and writes in order", summary: "Reads can run together. A write waits, runs alone, and blocks newer reads until it finishes.", labId: "lease-queue" },
  { id: "idempotency", title: "Retry a write safely", summary: "Give a write an operation ID. Retrying the same write returns the first result instead of writing twice.", labId: "idempotency" },
  { id: "errors", title: "Know what is guaranteed", summary: "Atomic reports unsupported operations clearly. It does not pretend browser storage is a database transaction." },
];

export const runtimeLabels: Record<RuntimeId, string> = {
  server: "SERVER ONLY",
  transfer: "PAGE DATA",
  client: "CLIENT ONLY",
  "cross-runtime": "SERVER + BROWSER",
};
