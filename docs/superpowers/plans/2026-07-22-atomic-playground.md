# Atomic Playground and Documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Atomic to the portfolio and ship a static-export-compatible interactive `/playground` plus linked `/playground/docs` reference.

**Architecture:** A shared typed content module defines frameworks, labs, capabilities, and documentation anchors. Server route files provide metadata and structure; focused client components own framework filtering and deterministic simulations. Existing home-page styling remains global, while playground-specific styles are scoped to reusable observatory classes.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Astryx core primitives, Node test runner.

## Global Constraints

- Preserve `output: "export"`; no request-time Next server APIs or dynamic routes.
- Do not add Atomic as a cross-repository or unpublished runtime dependency.
- Execute browser APIs only in client components and guard access by capability.
- Label server-side behavior as deterministic simulation in the static portfolio.
- Preserve existing changes in `CLAUDE.md`, `package.json`, and `pnpm-lock.yaml`.
- Use the existing void/cyan/magenta visual language and typography.
- Lease isolation must not be described as transaction, rollback, or distributed durability.

---

### Task 1: Route and Content Contract

**Files:**
- Create: `tests/atomic-playground.test.mjs`
- Create: `data/atomic.ts`
- Modify: `data/content.ts`
- Modify: `components/works.tsx`

**Interfaces:**
- Produces `frameworks`, `adapterCapabilities`, `playgroundLabs`, and `docsSections` from `data/atomic.ts`.
- Extends `Work` with optional `external?: boolean`; Atomic sets `href: "/playground"` and `external: false`.

- [ ] **Step 1: Write a failing Node contract test**

Assert that Atomic exists as an internal project, both route files exist, every playground lab has a matching docs anchor, and capability copy includes server/client limits.

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/atomic-playground.test.mjs`

Expected: failure because Atomic routes and content do not exist.

- [ ] **Step 3: Add the shared model and internal project link**

Use literal unions for framework and runtime identifiers. Infer internal navigation from `external: false`, render it with Next `Link`, and preserve external target behavior for all current work items.

- [ ] **Step 4: Run the contract test**

Run: `node --test tests/atomic-playground.test.mjs`

Expected: route assertions still fail; content and internal-link assertions pass.

- [ ] **Step 5: Commit**

```bash
git add tests/atomic-playground.test.mjs data/atomic.ts data/content.ts components/works.tsx
git commit -m "feat(portfolio): add Atomic project contract"
```

### Task 2: Interactive Runtime Observatory

**Files:**
- Create: `app/playground/page.tsx`
- Create: `app/playground/playground-client.tsx`
- Create: `components/atomic/playground-shell.tsx`
- Create: `components/atomic/request-trace.tsx`
- Create: `components/atomic/lab-card.tsx`
- Modify: `app/globals.css`
- Test: `tests/atomic-playground.test.mjs`

**Interfaces:**
- `PlaygroundClient` consumes `playgroundLabs` and owns `FrameworkId | "all"` filter state.
- Browser lab state uses `localStorage` and `sessionStorage` only after mount.
- Simulations expose deterministic state through button-driven reducers.

- [ ] **Step 1: Extend the failing contract test**

Assert that the playground has framework filters, adapter labs, a server simulation label, live region, docs link, and no unguarded browser API in a Server Component.

- [ ] **Step 2: Run the test and verify the new assertions fail**

Run: `node --test tests/atomic-playground.test.mjs`

- [ ] **Step 3: Build the page shell and request trace**

Create route metadata, portfolio return navigation, Labs/Docs segmented navigation, server-transfer-client trace, and the responsive masonry surface.

- [ ] **Step 4: Implement focused interactive labs**

Implement framework filtering, cookie commit simulation, local draft persistence, session step persistence, layered fallback, codec input validation, lease sequence playback, and idempotency replay/conflict behavior. Keep each state machine local to the relevant lab.

- [ ] **Step 5: Run test, lint, and build**

```bash
node --test tests/atomic-playground.test.mjs
pnpm lint
pnpm build
```

Expected: all commands pass and static output includes `/playground/index.html`.

- [ ] **Step 6: Commit**

```bash
git add app/playground components/atomic app/globals.css tests/atomic-playground.test.mjs
git commit -m "feat(portfolio): build Atomic runtime playground"
```

### Task 3: Linked Documentation Route

**Files:**
- Create: `app/playground/docs/page.tsx`
- Create: `components/atomic/docs-outline.tsx`
- Create: `components/atomic/code-block.tsx`
- Modify: `app/sitemap.ts`
- Modify: `tests/atomic-playground.test.mjs`

**Interfaces:**
- The docs route consumes `docsSections` and `adapterCapabilities`.
- `DocsOutline` receives `{ id: string; title: string }[]` and updates active state from `IntersectionObserver`.
- Playground links use `/playground/docs#<section-id>`; docs back-links use `/playground#<lab-id>`.

- [ ] **Step 1: Extend the failing contract test**

Assert that all docs sections render stable IDs, every adapter appears in the capability matrix, guarantee boundaries are explicit, and the sitemap includes both routes.

- [ ] **Step 2: Run the test and verify the new assertions fail**

Run: `node --test tests/atomic-playground.test.mjs`

- [ ] **Step 3: Build the docs route**

Render a compact introduction, sticky outline, capability matrix, setup examples, framework recipes, concurrency semantics, error taxonomy, and guarantee boundary. Use semantic sections and copyable code blocks.

- [ ] **Step 4: Update static discovery**

Add `/playground` and `/playground/docs` to the sitemap with appropriate priorities.

- [ ] **Step 5: Run test, lint, and build**

```bash
node --test tests/atomic-playground.test.mjs
pnpm lint
pnpm build
```

Expected: all commands pass and static output includes both route documents.

- [ ] **Step 6: Commit**

```bash
git add app/playground/docs components/atomic data/atomic.ts app/sitemap.ts tests/atomic-playground.test.mjs
git commit -m "docs(portfolio): add Atomic developer guide"
```

### Task 4: Browser Verification and Publication

**Files:**
- Modify only files required by issues found during verification.

**Interfaces:**
- Desktop viewport: 1440 x 1000.
- Mobile viewport: 390 x 844.

- [ ] **Step 1: Start a clean development server**

Run: `pnpm dev --hostname 127.0.0.1 --port 3001`

- [ ] **Step 2: Verify the home project link**

Open `/`, navigate to Atomic, and confirm same-tab client navigation to `/playground`.

- [ ] **Step 3: Verify playground interactions**

Exercise each framework filter, cookie commit, local draft reload, session step reload, codec failure, lease playback, and idempotency conflict. Capture desktop and mobile screenshots.

- [ ] **Step 4: Verify documentation navigation**

Open `/playground/docs`, use the outline, follow at least one lab back-link, and confirm code and matrix content fit both viewports.

- [ ] **Step 5: Run final verification**

```bash
node --test tests/atomic-playground.test.mjs
pnpm lint
pnpm build
git diff --check
```

- [ ] **Step 6: Commit fixes and push**

Stage only files created or intentionally modified for Atomic. Do not stage `CLAUDE.md`, `package.json`, or `pnpm-lock.yaml` unless separately requested.

