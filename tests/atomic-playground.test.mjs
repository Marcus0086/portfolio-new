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
  assert.doesNotMatch(content, /title: "TUNNEL\.SH"/);
});

test("playground runs with real Atomic packages on a request-time Next server", () => {
  const nextConfig = read("next.config.ts");
  const packageJson = read("package.json");
  const client = read("app/playground/playground-client.tsx");

  assert.doesNotMatch(nextConfig, /output:\s*"export"/);
  assert.match(packageJson, /"@ssr-storage\/core":\s*"file:vendor\/ssr-storage-core-0\.0\.0\.tgz"/);
  assert.match(packageJson, /"@ssr-storage\/react":\s*"file:vendor\/ssr-storage-react-0\.0\.0\.tgz"/);
  assert.match(packageJson, /"@ssr-storage\/next":\s*"file:vendor\/ssr-storage-next-0\.0\.0\.tgz"/);
  assert.doesNotMatch(client, /setStaged|fake Set-Cookie/);
});

test("Vercel deploys the dynamic Next server instead of the old static export", () => {
  const vercel = JSON.parse(read("vercel.json"));
  const readme = read("README.md");

  assert.equal(vercel.framework, "nextjs");
  assert.equal(vercel.buildCommand, "pnpm build");
  assert.equal(vercel.outputDirectory, ".next");
  assert.doesNotMatch(JSON.stringify(vercel), /"out"/);
  assert.doesNotMatch(readme, /fully static export|static site in \.\/out|Deploy `out\/`/);
});

test("playground defines real cells, commits cookies, and hydrates the server value", () => {
  const storage = read("app/playground/storage.ts");
  const server = read("app/playground/application-server.ts");
  const page = read("app/playground/page.tsx");
  const provider = read("app/playground/playground-provider.tsx");

  for (const adapter of ["cookie(", "localStorage(", "sessionStorage(", "requestMemory("]) {
    assert.match(storage, new RegExp(adapter.replace("(", "\\(")));
  }
  assert.match(storage, /name: "atomic-application"/);
  assert.match(server, /createNextActionStorage/);
  assert.match(server, /import \{ cookies \} from "next\/headers"/);
  assert.match(server, /cookies: cookieFactory \?\? cookies/);
  assert.match(server, /storage\.set\(applicationIdCell, applicationId\)/);
  assert.match(server, /storage\.commit\(\)/);
  assert.match(page, /import \{ cookies \} from "next\/headers"/);
  assert.match(page, /createNextServerStorage/);
  assert.match(page, /createNextServerStorage\(\{ cells: applicationCells, cookies \}\)/);
  assert.match(page, /storage\.get\(applicationIdCell\)/);
  assert.match(page, /storage\.snapshot\(\)/);
  assert.match(provider, /<StorageProvider cells=\{applicationCells\} snapshot=\{snapshot\}>/);
});

test("job application uses Atomic hooks and refreshes after a real server write", () => {
  const demo = read("app/playground/application-demo.tsx");
  const client = read("app/playground/playground-client.tsx");

  assert.match(demo, /useCell\(applicationDraftCell\)/);
  assert.match(demo, /useCell\(applicationStepCell\)/);
  assert.match(demo, /setActiveApplication/);
  assert.match(demo, /router\.refresh\(\)/);
  assert.match(demo, /Clear browser draft/);
  assert.doesNotMatch(client, /useBrowserStorage|writeBrowserStorage|setStaged|stagedCookie/);
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

  assert.match(page, /A REAL SERVER REQUEST \/ A REAL COOKIE WRITE/);
  assert.match(shell, /\/playground\/docs/);
  assert.match(client, /aria-pressed/);
  assert.match(client, /aria-live="polite"/);
});

test("playground centers one storage workflow and keeps advanced guarantee labs", () => {
  const model = read("data/atomic.ts");
  const demo = read("app/playground/application-demo.tsx");

  for (const id of [
    "lease-queue",
    "idempotency",
    "react-external-store",
  ]) {
    assert.match(model, new RegExp(`id: "${id}"`));
  }

  for (const removedId of [
    "cookie-bridge",
    "local-draft",
    "session-wizard",
    "request-memory",
    "layered-storage",
    "codec-migration",
  ]) {
    assert.doesNotMatch(model, new RegExp(`id: "${removedId}"`));
  }

  assert.match(demo, /id="application-demo"/);
});

test("documentation and playground share stable anchors", () => {
  const model = read("data/atomic.ts");
  const docs = read("app/playground/docs/page.tsx");

  assert.match(model, /id: "adapters"/);
  assert.match(model, /docsId: "concurrency"/);
  assert.match(model, /docsId: "hydration"/);
  assert.match(docs, /adapterCapabilities/);
  assert.match(docs, /Lease isolation is not a transaction/);
  assert.match(model, /labId: "application-demo"/);
  assert.match(docs, /\/playground#\$\{labId\}/);
  assert.match(docs, /job application/i);
});

test("sitemap publishes playground and documentation routes", () => {
  const sitemap = read("app/sitemap.ts");

  assert.match(sitemap, /\$\{siteUrl\}\/playground`/);
  assert.match(sitemap, /\$\{siteUrl\}\/playground\/docs`/);
});
