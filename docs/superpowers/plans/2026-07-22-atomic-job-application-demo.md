# Atomic Job Application Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the simulated storage cards with a real job-application workflow that reads and writes an Atomic cookie through Next.js while demonstrating browser-only and request-only storage honestly.

**Architecture:** The portfolio becomes a dynamic Next.js app and consumes built Atomic package tarballs through deployment-safe `file:` dependencies. A Server Component creates request storage and an exposed snapshot, a Server Action commits the cookie, and a client component uses Atomic React hooks for localStorage and sessionStorage. Focused concurrency and framework examples remain below the workflow.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Atomic core/react/next packages, Astryx controls, Node test runner, browser verification.

## Global Constraints

- Do not stage or modify the user's existing `CLAUDE.md` change.
- Execute Atomic package code; do not recreate its storage behavior in portfolio-only helpers.
- Report cookie success only after the Server Action commits and a refreshed Server Component reads the value.
- Do not claim database persistence, transactions, rollback, cross-process locks, or exactly-once delivery.
- Keep prose direct and remove the documentation page grid.
- Run package installation, tests, lint, and build serially.

---

### Task 1: Dynamic Runtime and Atomic Package Inputs

**Files:**
- Modify: `tests/atomic-playground.test.mjs`
- Modify: `tests/portfolio-copy.test.mjs`
- Modify: `data/content.ts`
- Modify: `next.config.ts`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `vendor/ssr-storage-core-0.0.0.tgz`
- Create: `vendor/ssr-storage-react-0.0.0.tgz`
- Create: `vendor/ssr-storage-next-0.0.0.tgz`

**Interfaces:**
- Produces installed `@ssr-storage/core`, `@ssr-storage/react`, and `@ssr-storage/next` imports.
- Produces a `vitest run` test command for TypeScript integration tests.
- Produces a request-time Next build with no `output: "export"`.

- [ ] **Step 1: Write failing contract assertions**

Assert that Tunnel.sh is absent, `next.config.ts` does not contain `output: "export"`, package dependencies use the three `vendor/*.tgz` files, and the old fake-cookie state names are absent.

- [ ] **Step 2: Run the contract tests and verify failure**

Run: `node --test tests/portfolio-copy.test.mjs tests/atomic-playground.test.mjs`

Expected: FAIL on Tunnel.sh and static export.

- [ ] **Step 3: Build and pack Atomic**

Run serially in `/Users/raghavgupta/Documents/atomic`:

```bash
pnpm build
pnpm --filter @ssr-storage/core pack --pack-destination /Users/raghavgupta/Documents/raghav_stuff/portfolio/vendor
pnpm --filter @ssr-storage/react pack --pack-destination /Users/raghavgupta/Documents/raghav_stuff/portfolio/vendor
pnpm --filter @ssr-storage/next pack --pack-destination /Users/raghavgupta/Documents/raghav_stuff/portfolio/vendor
```

- [ ] **Step 4: Switch runtime and install tarballs**

Remove static export, remove the Tunnel.sh work entry, add the three `file:vendor/...tgz` dependencies plus Vitest, add `"test": "vitest run"`, and run `pnpm install` in the portfolio.

- [ ] **Step 5: Run contract tests**

Expected: the setup assertions pass while workflow assertions added in Task 2 still fail.

### Task 2: Real Cookie and Storage Model

**Files:**
- Create: `app/playground/storage.ts`
- Create: `app/playground/application-server.ts`
- Create: `app/playground/actions.ts`
- Create: `app/playground/playground-provider.tsx`
- Modify: `app/playground/page.tsx`
- Modify: `components/atomic/request-trace.tsx`
- Modify: `tests/atomic-playground.test.mjs`
- Create: `tests/atomic-server-action.test.ts`

**Interfaces:**
- `applicationIdCell: Cell<string>` uses cookie `atomic-application`, path `/`, SameSite `lax`, and `expose: true`.
- `applicationDraftCell: Cell<ApplicationDraft>` uses localStorage key `atomic:application-draft`.
- `applicationStepCell: Cell<ApplicationStep>` uses sessionStorage key `atomic:application-step`.
- `requestTraceCell: Cell<string>` uses request memory and is not exposed.
- `commitApplicationCookie(applicationId: string, cookieFactory?: NextStorageOptions["cookies"]): Promise<void>` is the testable server boundary.
- `setActiveApplication(applicationId: string): Promise<{ applicationId: string }>` validates `APP-[0-9]{4}` and commits through `createNextActionStorage`.

- [ ] **Step 1: Extend failing source-contract tests**

Assert that the cells use the four adapters, the server helper calls `createNextActionStorage`, `set`, and `commit`, and the page calls `createNextServerStorage`, reads `applicationIdCell`, and passes `storage.snapshot()` to `StorageProvider`. Add a Vitest integration test with an injected cookie store whose `set()` calls are recorded.

- [ ] **Step 2: Verify the new assertions fail**

Run: `node --test tests/atomic-playground.test.mjs`

- [ ] **Step 3: Define immutable cells and provider**

Create the four typed cells and a client-only provider that renders:

```tsx
<StorageProvider cells={applicationCells} snapshot={snapshot}>
  {children}
</StorageProvider>
```

- [ ] **Step 4: Implement the Server Action**

Implement `commitApplicationCookie` with an injectable cookie factory. Validate the ID in the action, call the helper, and return only after the cookie store accepts the effect. The integration test must assert the exact `atomic-application=APP-1001` write and path/SameSite options.

- [ ] **Step 5: Convert the page to request-time rendering**

Create server storage, read the cookie cell, set and read a fresh request-memory trace, capture the snapshot, and pass all three to the client workflow. Replace the deterministic cookie trace with props that distinguish server-read, snapshot, and confirmed response values.

- [ ] **Step 6: Run contract tests and build**

Run:

```bash
node --test tests/atomic-playground.test.mjs
pnpm test tests/atomic-server-action.test.ts
pnpm build
```

Expected: tests pass and Next reports `/playground` as dynamic.

### Task 3: Job Application Client Workflow

**Files:**
- Create: `app/playground/application-demo.tsx`
- Modify: `app/playground/playground-client.tsx`
- Modify: `data/atomic.ts`
- Modify: `app/globals.css`
- Modify: `tests/atomic-playground.test.mjs`

**Interfaces:**
- `ApplicationDemoProps` contains `serverApplicationId`, `requestTrace`, and `snapshotApplicationId`.
- Cookie changes call `setActiveApplication`, then `router.refresh()`.
- Draft and step state use `useCell(applicationDraftCell)` and `useCell(applicationStepCell)`.

- [ ] **Step 1: Add failing workflow assertions**

Assert that the client imports `useCell`, calls the real action, refreshes after success, exposes draft clearing, and contains no `setStaged`, fake `Set-Cookie`, or manual local/session storage helpers.

- [ ] **Step 2: Verify failure**

Run: `node --test tests/atomic-playground.test.mjs`

- [ ] **Step 3: Build the application form**

Render three stable steps: role, experience, and review. Use Astryx buttons for switching the application, moving between steps, and clearing the draft. Keep the textarea native because it is a text-entry field, not a command.

- [ ] **Step 4: Build the storage inspector**

Show cookie, localStorage draft, sessionStorage step, and request-memory trace in four rows. Each row states server access, browser access, lifetime, and current value. Display action errors without changing the server-confirmed cookie row.

- [ ] **Step 5: Reduce the remaining lab list**

Remove duplicate cookie, draft, session, request-memory, layered, and codec simulations. Retain write ordering, retry identity, and framework subscription explanations because they teach different guarantees.

- [ ] **Step 6: Run tests**

Run: `node --test tests/portfolio-copy.test.mjs tests/atomic-playground.test.mjs`

### Task 4: Documentation Rewrite and Reading Surface

**Files:**
- Modify: `components/atomic/playground-shell.tsx`
- Modify: `app/playground/docs/page.tsx`
- Modify: `data/atomic.ts`
- Modify: `app/globals.css`
- Modify: `tests/portfolio-copy.test.mjs`

**Interfaces:**
- `PlaygroundShell` adds `atomic-page--docs` only when `active === "docs"`.
- `.atomic-page--docs` uses `background: var(--color-void)` with no grid images.

- [ ] **Step 1: Add failing documentation assertions**

Assert that docs explain the job-application flow, identify the Server Action as the cookie writer, and apply the docs-only solid background class.

- [ ] **Step 2: Verify failure**

Run: `node --test tests/portfolio-copy.test.mjs`

- [ ] **Step 3: Rewrite adapter and request-flow sections**

Use the four application values as the running example. Keep the API names in code blocks, but explain each term in the preceding sentence. Remove obsolete simulated-cookie instructions.

- [ ] **Step 4: Remove the docs grid**

Add the docs modifier class and a solid background. Keep borders and code blocks; do not add gradients, grid overlays, or prose cards.

- [ ] **Step 5: Run copy tests and lint**

Run:

```bash
node --test tests/portfolio-copy.test.mjs tests/atomic-playground.test.mjs
pnpm lint
```

### Task 5: Runtime Verification and Publication

**Files:**
- Modify only files required by verified failures.

**Interfaces:**
- Desktop viewport: 1440 x 900.
- Mobile viewport: 390 x 844.

- [ ] **Step 1: Start a clean Next dev server**

Run: `pnpm dev --hostname 127.0.0.1 --port 3001`.

- [ ] **Step 2: Verify the cookie round trip**

Open `/playground`, write `APP-1001`, wait for refresh, and verify both `document.cookie` and the visible server-read value contain `APP-1001`. Reload and verify the value remains.

- [ ] **Step 3: Verify browser-only storage**

Type a draft and advance a step. Reload and verify both remain. Open a second tab and verify the session step starts independently while the cookie and local draft remain shared.

- [ ] **Step 4: Verify request scope and docs**

Reload and verify the request ID changes. Inspect `/playground/docs` at both viewports for a solid background, readable contrast, contained table scrolling, and no page-level overflow.

- [ ] **Step 5: Run final verification**

Run serially:

```bash
node --test tests/portfolio-copy.test.mjs tests/atomic-playground.test.mjs
pnpm lint
pnpm build
git diff --check
```

- [ ] **Step 6: Commit and push**

Stage only the planned files and package artifacts. Leave `CLAUDE.md` untouched. Commit the implementation and push `main` through the repository-owning GitHub account, then restore the previously active account.
