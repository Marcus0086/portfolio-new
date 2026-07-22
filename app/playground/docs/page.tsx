import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/atomic/code-block";
import { DocsOutline } from "@/components/atomic/docs-outline";
import { PlaygroundShell } from "@/components/atomic/playground-shell";
import { adapterCapabilities, docsSections } from "@/data/atomic";

export const metadata: Metadata = {
  title: "Atomic Docs | SSR Storage Explained",
  description:
    "Learn how to use cookies, localStorage, sessionStorage, request memory, and typed storage across server rendering and the browser.",
  alternates: { canonical: "/playground/docs" },
};

const coreCell = `import { cell, literal, cookie } from "@ssr-storage/core";

export const workspaceCell = cell("workspace", {
  adapter: cookie({ name: "workspace" }),
  codec: literal("alpha", "beta"),
  default: "alpha",
  expose: true,
});`;

const requestFlow = `const server = await createServerStorage({ context, cells });
const workspace = await server.get(workspaceCell);

const snapshot = server.snapshot();
const serialized = serializeStorageSnapshot(snapshot);

// The browser starts with the value that the server rendered.
const client = createClientStorage({ snapshot, cells });`;

const nextRecipe = `// Server Components can read request cookies.
const storage = await createNextServerStorage({ cells });
const workspace = await storage.get(workspaceCell);

// Server Actions and Route Handlers can write response cookies.
const storage = await createNextActionStorage({ cells });
await storage.set(workspaceCell, "beta", { operationId: "workspace-beta" });
await storage.commit();`;

const reactRecipe = `function WorkspacePicker() {
  const [workspace, setWorkspace] = useCell(workspaceCell);
  return <button onClick={() => setWorkspace("beta")}>{workspace}</button>;
}

// Internally the binding uses:
useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);`;

const vueRecipe = `const storage = useStorage();
const workspace = useCell(workspaceCell);

// Nuxt gives Vue the server value before the page becomes interactive.
await workspace.set("beta");`;

const svelteRecipe = `const storage = getStorage();
const workspace = createCellStore(storage, workspaceCell);

$: currentWorkspace = $workspace;
await workspace.set("beta");`;

const leaseRecipe = `await storage.read(draftCell, async (lease) => {
  inspect(lease.get());
});

await storage.write(draftCell, async (lease) => {
  const current = lease.get();
  await lease.set({ ...current, status: "saved" });
}, { timeoutMs: 2_000, signal });`;

const idempotencyRecipe = `await storage.set(statusCell, "published", {
  operationId: "publish-post-42",
});

// The same ID and value returns the first success.
// The same ID with a different write throws StorageIdempotencyError.`;

function DocSection({
  id,
  title,
  summary,
  labId,
  children,
}: {
  id: string;
  title: string;
  summary: string;
  labId?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="atomic-doc-section scroll-mt-24">
      <header>
        <span>ATOMIC DOCS</span>
        <h2>{title}</h2>
        <p>{summary}</p>
      </header>
      {children}
      {labId ? <Link className="atomic-lab-link" href={`/playground#${labId}`}>TRY THIS EXAMPLE →</Link> : null}
    </section>
  );
}

export default function AtomicDocsPage() {
  return (
    <PlaygroundShell
      active="docs"
      eyebrow="SSR STORAGE EXPLAINED FROM THE FIRST REQUEST"
      title="The server and browser do not share storage."
      intro="A server and a browser cannot access the same storage in the same way. The server can read request cookies. The browser can read localStorage and sessionStorage. Atomic gives both sides one typed API, then rejects operations that cannot work."
    >
      <section className="atomic-docs-layout">
        <DocsOutline items={docsSections.map(({ id, title }) => ({ id, title }))} />

        <article className="atomic-docs-content">
          <DocSection {...docsSections[0]}>
            <p>
              Start with one value, such as a theme, draft, or workspace ID. Atomic calls that value a cell. The cell says
              where the value is stored, what TypeScript type it has, what to use when it is missing, and how to check data
              read from storage.
            </p>
            <ol className="atomic-principles">
              <li><strong>Cell</strong><span>The value you want to store, plus its type and default.</span></li>
              <li><strong>Adapter</strong><span>The place that stores it: cookie, localStorage, sessionStorage, or request memory.</span></li>
              <li><strong>Context</strong><span>The current server request, server response, or browser.</span></li>
              <li><strong>Storage</strong><span>The object your code uses to get, set, remove, and subscribe to cells.</span></li>
            </ol>
          </DocSection>

          <DocSection {...docsSections[1]}>
            <section className="atomic-package-grid">
              <article><strong>@ssr-storage/core</strong><p>Install this everywhere. It contains cells, storage adapters, server and browser storage, validation, ordering, and safe retries.</p></article>
              <article><strong>@ssr-storage/react</strong><p>Use this for React providers and hooks such as useCell, useCellValue, and useSetCell.</p></article>
              <article><strong>@ssr-storage/next</strong><p>Use this to read cookies in Server Components and write them from Server Actions or Route Handlers.</p></article>
              <article><strong>@ssr-storage/vue / nuxt</strong><p>Use these packages to turn a cell into a Vue ref and move the server value through Nuxt.</p></article>
              <article><strong>@ssr-storage/svelte</strong><p>Use this to turn a cell into a Svelte store and pass the server value into SvelteKit.</p></article>
            </section>
          </DocSection>

          <DocSection {...docsSections[2]}>
            <p>
              Storage contains strings, not trusted application data. A codec converts those strings into your TypeScript
              type. If the data is broken, the codec returns a clear decode error. If the format is old, a migration can
              upgrade it. If no value exists, the cell returns its default.
            </p>
            <CodeBlock label="shared/cells.ts" code={coreCell} />
            <p className="atomic-warning">TTL is checked when you read the value. An expired value acts like a missing value. Atomic does not run a background cleanup job.</p>
          </DocSection>

          <DocSection {...docsSections[3]}>
            <ol className="atomic-request-steps">
              <li><span>01</span><p><strong>The server reads.</strong> It can read cookies from the request and values kept in request memory.</p></li>
              <li><span>02</span><p><strong>The page includes safe values.</strong> Only cells with <code>expose: true</code> are sent to the browser.</p></li>
              <li><span>03</span><p><strong>The browser starts with those values.</strong> The first browser render now matches the server HTML.</p></li>
              <li><span>04</span><p><strong>The browser listens for changes.</strong> React, Vue, or Svelte updates when storage changes.</p></li>
              <li><span>05</span><p><strong>The server writes through a response.</strong> A cookie change needs a Server Action, Route Handler, or another response-writing context.</p></li>
            </ol>
            <CodeBlock label="request-flow.ts" code={requestFlow} />
          </DocSection>

          <DocSection {...docsSections[4]}>
            <section className="atomic-table-wrap" aria-label="Where each storage adapter works">
              <table>
                <thead><tr><th>Storage</th><th>Server can read?</th><th>Server can write?</th><th>Browser can read?</th><th>Browser can write?</th><th>How long it lasts</th><th>Works during server rendering?</th></tr></thead>
                <tbody>
                  {adapterCapabilities.map((adapter) => (
                    <tr key={adapter.name}>
                      <th>{adapter.name}</th><td>{adapter.serverRead}</td><td>{adapter.serverWrite}</td><td>{adapter.clientRead}</td><td>{adapter.clientWrite}</td><td>{adapter.lifetime}</td><td>{adapter.bridge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <p>
              Cookies solve the server-rendering problem because the browser sends them with the request. The server can
              read them before rendering the page. The server can also send a changed cookie in the response. localStorage
              and sessionStorage never reach the server. Request memory never reaches the browser unless you explicitly
              include that cell in the page data.
            </p>
          </DocSection>

          <DocSection {...docsSections[5]}>
            <p>
              React has one strict rule during hydration: the first browser value must match the value used to render the
              server HTML. `useSyncExternalStore` supports this directly. `getServerSnapshot` returns the server value.
              `getSnapshot` reads the current browser value. `subscribe` tells React when the value changes. Atomic keeps
              the first two values equal, then starts listening for browser updates.
            </p>
            <CodeBlock label="react/workspace-picker.tsx" code={reactRecipe} />
          </DocSection>

          <DocSection {...docsSections[6]}>
            <p>
              Define cells in a plain TypeScript file so the server and browser import the same definitions. Create a new
              server storage object for every request. Create one browser storage object when the app starts. The framework
              package only connects that storage object to the framework&apos;s state system.
            </p>
            <section className="atomic-recipe-grid">
              <CodeBlock label="next/action.ts" code={nextRecipe} />
              <CodeBlock label="nuxt/component.vue" code={vueRecipe} />
              <CodeBlock label="svelte/component.svelte" code={svelteRecipe} />
            </section>
          </DocSection>

          <DocSection {...docsSections[7]}>
            <p>
              Sometimes two parts of an app touch the same cell at the same time. Atomic lets several reads run together.
              A write waits for those reads, runs by itself, then lets the next operation continue. Once a write is waiting,
              newer reads wait behind it. This prevents an endless stream of reads from blocking the write forever.
            </p>
            <CodeBlock label="scoped-lease.ts" code={leaseRecipe} />
            <p className="atomic-warning"><strong>Lease isolation is not a transaction.</strong> If you update two cells and the second update fails, Atomic does not roll back the first one. Locks also do not cross processes unless the storage adapter explicitly supports that.</p>
          </DocSection>

          <DocSection {...docsSections[8]}>
            <p>
              A network retry can send the same write twice. Add an operation ID to prevent the second write. Atomic records
              the cell, action, and value used by the first successful operation. Sending the same ID with the same write
              returns the first success. Sending that ID with a different cell, action, or value throws an error.
            </p>
            <CodeBlock label="idempotent-write.ts" code={idempotencyRecipe} />
          </DocSection>

          <DocSection {...docsSections[9]}>
            <section className="atomic-error-list">
              <article><strong>StorageCapabilityError</strong><p>You tried an operation that cannot work here, such as reading localStorage on the server.</p></article>
              <article><strong>StorageDecodeError</strong><p>The stored data is broken or does not match the cell&apos;s codec.</p></article>
              <article><strong>StorageQuotaError</strong><p>The browser refused a write because storage is full or blocked.</p></article>
              <article><strong>StorageCommitError</strong><p>The server could not apply a staged cookie change to the response.</p></article>
              <article><strong>StorageOperationTimeoutError</strong><p>A read or write waited too long for another operation to finish.</p></article>
              <article><strong>StorageIdempotencyError</strong><p>You reused an operation ID for a different write.</p></article>
            </section>
            <p className="atomic-warning">
              Atomic keeps operations in order only within the scope reported by the adapter. Cookies, localStorage, and
              sessionStorage do not become database transactions. Atomic only claims cross-process safety when the backing
              store can actually provide it.
            </p>
          </DocSection>
        </article>
      </section>
    </PlaygroundShell>
  );
}
