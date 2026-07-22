import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/atomic/code-block";
import { DocsOutline } from "@/components/atomic/docs-outline";
import { PlaygroundShell } from "@/components/atomic/playground-shell";
import { adapterCapabilities, docsSections } from "@/data/atomic";

export const metadata: Metadata = {
  title: "Atomic SSR Storage Documentation | Raghav Gupta",
  description:
    "A practical guide to typed SSR storage cells, runtime capabilities, hydration, framework bindings, scoped leases, and idempotent operations.",
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

// Browser boot: the first value is still workspace from SSR.
const client = createClientStorage({ snapshot, cells });`;

const nextRecipe = `// Server Component: read authority
const storage = await createNextServerStorage({ cells });
const workspace = await storage.get(workspaceCell);

// Server Action or Route Handler: response write authority
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

// Nuxt plugin seeds the ref from the SSR snapshot before mount.
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

// Same ID + same fingerprint replays the original success.
// Same ID + another cell/action/value throws StorageIdempotencyError.`;

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
        <span>CONTRACT / {id.toUpperCase()}</span>
        <h2>{title}</h2>
        <p>{summary}</p>
      </header>
      {children}
      {labId ? <Link className="atomic-lab-link" href={`/playground#${labId}`}>OPEN RELATED LAB →</Link> : null}
    </section>
  );
}

export default function AtomicDocsPage() {
  return (
    <PlaygroundShell
      active="docs"
      eyebrow="API CONTRACT / RUNTIME SEMANTICS / FRAMEWORK RECIPES"
      title="The boundary is the feature."
      intro="Atomic does not pretend all storage is universal. Cells describe typed meaning, adapters advertise capabilities, and each request or browser context supplies the authority to act."
    >
      <section className="atomic-docs-layout">
        <DocsOutline items={docsSections.map(({ id, title }) => ({ id, title }))} />

        <article className="atomic-docs-content">
          <DocSection {...docsSections[0]}>
            <p>
              A cell is an immutable description of one value. It owns an ID, codec, default, adapter, migration policy,
              TTL, and whether the value may enter a hydration snapshot. A storage instance owns runtime context,
              decoded caches, staged effects, subscriptions, lease queues, and its operation ledger.
            </p>
            <ol className="atomic-principles">
              <li><strong>Cell</strong><span>What the value means and how bytes become a type.</span></li>
              <li><strong>Adapter</strong><span>Where bytes live and which operations it can honestly perform.</span></li>
              <li><strong>Context</strong><span>The current request, response, browser, or injected platform authority.</span></li>
              <li><strong>Storage</strong><span>The composed runtime that enforces ordering, capability, and subscriptions.</span></li>
            </ol>
          </DocSection>

          <DocSection {...docsSections[1]}>
            <section className="atomic-package-grid">
              <article><strong>@ssr-storage/core</strong><p>Cells, codecs, adapters, contexts, snapshots, leases, and operation semantics. No framework dependency.</p></article>
              <article><strong>@ssr-storage/react</strong><p>Provider, hydration script, and typed hooks backed by the core subscription contract.</p></article>
              <article><strong>@ssr-storage/next</strong><p>Thin request and cookie helpers that separate Server Component reads from Action and Route writes.</p></article>
              <article><strong>@ssr-storage/vue / nuxt</strong><p>Reactive bindings and Nuxt request payload integration over the same cells.</p></article>
              <article><strong>@ssr-storage/svelte</strong><p>Svelte-readable stores and SSR context helpers without changing core semantics.</p></article>
            </section>
          </DocSection>

          <DocSection {...docsSections[2]}>
            <p>
              Codecs are the trust boundary. Stored data is untrusted until decode succeeds. Defaults handle absence;
              migrations handle known older versions; decode errors preserve the difference between missing and corrupt data.
            </p>
            <CodeBlock label="shared/cells.ts" code={coreCell} />
            <p className="atomic-warning">TTL is evaluated when a value is read. Expiry makes the value absent; it does not create a background cleanup service.</p>
          </DocSection>

          <DocSection {...docsSections[3]}>
            <ol className="atomic-request-steps">
              <li><span>01</span><p><strong>Read.</strong> A server context exposes request cookies and request-local memory.</p></li>
              <li><span>02</span><p><strong>Expose.</strong> Only cells marked for exposure enter the safe serialized snapshot.</p></li>
              <li><span>03</span><p><strong>Hydrate.</strong> The browser starts with exactly that snapshot, preventing a first-render mismatch.</p></li>
              <li><span>04</span><p><strong>Subscribe.</strong> Framework bindings then follow client mutations through core subscribers.</p></li>
              <li><span>05</span><p><strong>Commit.</strong> Server cookie writes become response effects only in a context that controls the response.</p></li>
            </ol>
            <CodeBlock label="request-flow.ts" code={requestFlow} />
          </DocSection>

          <DocSection {...docsSections[4]}>
            <section className="atomic-table-wrap" aria-label="Adapter capability matrix">
              <table>
                <thead><tr><th>Adapter</th><th>Server read</th><th>Server write</th><th>Client read</th><th>Client write</th><th>Lifetime</th><th>SSR bridge</th></tr></thead>
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
              Cookies fill the SSR gap because a request can carry them to the server and a response can carry mutations
              back to the browser. Local and session storage cannot participate in server rendering; request memory cannot
              survive into the browser unless its cell is deliberately exposed in a snapshot.
            </p>
          </DocSection>

          <DocSection {...docsSections[5]}>
            <p>
              React needs three functions: subscribe to future writes, read the current browser snapshot, and read the
              server snapshot. `useSyncExternalStore` is effective here because Atomic already has stable snapshots and a
              subscription boundary. The server snapshot and first browser snapshot must be identical; reading
              `localStorage` before hydration would break that contract.
            </p>
            <CodeBlock label="react/workspace-picker.tsx" code={reactRecipe} />
          </DocSection>

          <DocSection {...docsSections[6]}>
            <p>
              Framework packages translate lifecycle and request APIs; they do not redefine storage. Share cells from a
              framework-neutral module, create one request storage per SSR request, and create one client storage for the
              browser application root.
            </p>
            <section className="atomic-recipe-grid">
              <CodeBlock label="next/action.ts" code={nextRecipe} />
              <CodeBlock label="nuxt/component.vue" code={vueRecipe} />
              <CodeBlock label="svelte/component.svelte" code={svelteRecipe} />
            </section>
          </DocSection>

          <DocSection {...docsSections[7]}>
            <p>
              Leases are scoped callbacks. Multiple reads of one cell may run together. A write waits for active readers,
              runs exclusively, and blocks later readers once queued so the writer cannot starve. Completion, throw,
              timeout, or abort releases the lease automatically.
            </p>
            <CodeBlock label="scoped-lease.ts" code={leaseRecipe} />
            <p className="atomic-warning"><strong>Lease isolation is not a transaction.</strong> It does not imply multi-cell rollback, cross-process locks, or durable commit unless an adapter explicitly declares a stronger backend capability.</p>
          </DocSection>

          <DocSection {...docsSections[8]}>
            <p>
              Idempotency is strict replay, not deduplication by name. The ledger fingerprints the cell, action, and encoded
              value. Reusing an ID for identical work returns the original success; changing any fingerprint component is
              an error. Scope is adapter-declared: instance-local for ordinary MVP adapters and shared-store scope for the
              persistent memory proof adapter.
            </p>
            <CodeBlock label="idempotent-write.ts" code={idempotencyRecipe} />
          </DocSection>

          <DocSection {...docsSections[9]}>
            <section className="atomic-error-list">
              <article><strong>StorageCapabilityError</strong><p>The adapter cannot perform this operation in the current runtime or response context.</p></article>
              <article><strong>StorageDecodeError</strong><p>Stored bytes did not satisfy the cell codec or a known migration.</p></article>
              <article><strong>StorageQuotaError</strong><p>The browser storage backend rejected a write for capacity or policy.</p></article>
              <article><strong>StorageCommitError</strong><p>A staged server effect failed while applying to the response.</p></article>
              <article><strong>StorageOperationTimeoutError</strong><p>A queued lease did not acquire before its deadline.</p></article>
              <article><strong>StorageIdempotencyError</strong><p>An operation ID was reused with a different fingerprint.</p></article>
            </section>
            <p className="atomic-warning">
              Atomic guarantees ordering only at the scope declared by the adapter. It does not turn cookies or browser
              storage into database transactions, and it never claims distributed durability without a backend that can provide it.
            </p>
          </DocSection>
        </article>
      </section>
    </PlaygroundShell>
  );
}

