import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("Atomic is an internal selected work", () => {
  const content = read("data/content.ts");
  const works = read("components/works.tsx");

  assert.match(content, /title: "ATOMIC"/);
  assert.match(content, /href: "\/playground"/);
  assert.match(content, /external: false/);
  assert.match(works, /from "next\/link"/);
  assert.match(works, /work\.external/);
});

test("playground exposes every runtime and framework family", () => {
  const model = read("data/atomic.ts");
  const page = read("app/playground/page.tsx");
  const client = read("app/playground/playground-client.tsx");
  const shell = read("components/atomic/playground-shell.tsx");

  for (const framework of ["react-next", "vue-nuxt", "svelte-sveltekit"]) {
    assert.match(model, new RegExp(`id: "${framework}"`));
  }

  for (const adapter of ["cookie", "localStorage", "sessionStorage", "requestMemory", "layered"]) {
    assert.match(model, new RegExp(adapter));
  }

  assert.match(page, /STATIC SERVER SIMULATION/);
  assert.match(shell, /\/playground\/docs/);
  assert.match(client, /aria-pressed/);
  assert.match(client, /aria-live="polite"/);
  assert.match(client, /typeof window/);
});

test("playground includes storage, concurrency, and hydration labs", () => {
  const model = read("data/atomic.ts");

  for (const id of [
    "cookie-bridge",
    "local-draft",
    "session-wizard",
    "request-memory",
    "layered-storage",
    "codec-migration",
    "lease-queue",
    "idempotency",
    "react-external-store",
  ]) {
    assert.match(model, new RegExp(`id: "${id}"`));
  }
});

test("documentation and playground share stable anchors", () => {
  const model = read("data/atomic.ts");
  const docs = read("app/playground/docs/page.tsx");

  assert.match(model, /docsId: "adapters"/);
  assert.match(model, /docsId: "concurrency"/);
  assert.match(model, /docsId: "hydration"/);
  assert.match(docs, /adapterCapabilities/);
  assert.match(docs, /Lease isolation is not a transaction/);
  assert.match(docs, /\/playground#/);
});

test("sitemap publishes playground and documentation routes", () => {
  const sitemap = read("app/sitemap.ts");

  assert.match(sitemap, /\$\{siteUrl\}\/playground`/);
  assert.match(sitemap, /\$\{siteUrl\}\/playground\/docs`/);
});
