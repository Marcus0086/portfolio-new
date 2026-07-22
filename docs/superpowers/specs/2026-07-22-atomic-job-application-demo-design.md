# Atomic Job Application Demo Design

## Purpose

Replace the collection of disconnected storage simulations with one workflow that explains why Atomic exists. A multi-step job application needs data in several places, but the server and browser cannot access those places in the same way. The demo must execute real cookie reads and writes, not display a fake `Set-Cookie` string.

This design supersedes the static-export and cookie-simulation constraints in `2026-07-22-atomic-playground-design.md`.

## Project List

Remove Tunnel.sh from the selected projects. Keep Atomic, Arx, the ETL pipeline, Burst, and phpMyAdmin for Termux. Do not renumber years or modify the remaining project links.

## Deployment Model

Remove `output: "export"` from the Next.js configuration. The portfolio will run as a normal Next.js application so `/playground` can read request cookies and a Server Action can write response cookies.

Atomic is not published to npm yet. The portfolio must still execute the real library instead of copying its behavior. Build package tarballs for `@ssr-storage/core`, `@ssr-storage/react`, and `@ssr-storage/next` from `/Users/raghavgupta/Documents/atomic`, place them under a committed `vendor/` directory, and install them through `file:` dependencies. This keeps Vercel builds independent of a sibling checkout. Replace these temporary dependencies with registry versions after the first npm release.

## Example Workflow

The playground centres on one fictional job application.

### Cookie: active application

`applicationIdCell` stores the active application ID in a cookie.

- A Server Component reads it before rendering.
- If the cookie is missing, the page starts with a clearly labelled new application.
- A Server Action creates or switches the application through `createNextActionStorage`.
- The action calls `set()` and `commit()`, producing a real response cookie.
- `router.refresh()` requests the page again and proves that the server reads the new value.

The page displays the server-read value and the current browser value. It never labels staged state as a completed server write.

### localStorage: unfinished answers

`applicationDraftCell` stores larger unfinished answers in localStorage.

- Text is saved while the visitor types.
- It survives reloads in the same browser profile.
- The server view explicitly says it cannot read this value.
- The UI shows stored byte size and a clear-draft command.

### sessionStorage: current step

`applicationStepCell` stores the current form step in sessionStorage.

- Reloading the tab keeps the current step.
- A new tab has separate progress.
- The server does not claim to know this value.

### Request memory: request facts

Request memory holds a request ID and an authorization result while the server renders the page.

- The values exist for one request only.
- A refresh produces a new request ID.
- The values are shown as server-only and are not persisted in browser storage.

### Hydration snapshot

The server exposes only the cookie-backed application ID to the hydration snapshot. `StorageProvider` gives React the same first value that produced the HTML. After hydration, `useSyncExternalStore` subscribes to browser-side changes. The explanation must state that localStorage and sessionStorage load in the browser because the server cannot snapshot values it cannot read.

## Page Structure

The first viewport states the problem in plain language: a server-rendered form needs one server-visible identifier, a large browser draft, tab-specific progress, and temporary request facts.

The page then renders:

1. A working job application form.
2. A storage inspector showing the four values and where each can be read.
3. A request timeline that updates after the real Server Action completes.
4. Short framework examples showing the same cell contract in React/Next, Vue/Nuxt, and Svelte/SvelteKit.
5. Links to focused documentation sections.

The previous small labs may remain only when they teach a separate guarantee, such as write ordering or retry identity. Repeated adapter demonstrations should be removed once the job application covers them.

## Documentation Visual Design

`/playground/docs` uses a solid near-black reading background. Remove the full-page mathematical grid from documentation. Keep restrained borders, code blocks, and cyan active states. The interactive playground may retain a much lighter grid because it is a tool surface rather than a long article.

Use Astryx buttons and controls for ordinary actions where the package already provides the needed primitive. Keep custom components for the request timeline, storage inspector, code examples, and capability table. Do not force generic cards around prose sections.

## Errors and Honesty

- A failed Server Action displays the real error and does not change the server-read value.
- localStorage and sessionStorage failures show that browser storage is unavailable or full.
- Unsupported server operations remain visible as capability errors.
- Cookie writes are only reported as complete after the action succeeds and the refreshed Server Component reads the new cookie.
- The demo does not claim database persistence, transactions, rollback, cross-process locks, or exactly-once delivery.

## Tests

### Automated

- The project contract test confirms Tunnel.sh is absent.
- A Next integration test invokes the action with a test cookie store and verifies the emitted cookie.
- The page test verifies that the cookie value read by the Server Component enters the hydration snapshot.
- Client tests cover draft persistence, tab-step persistence, and storage failure messages.
- Copy tests reject fake cookie language and unsupported durability claims.
- `pnpm lint` and `pnpm build` pass with dynamic Next output.

### Browser

Run the workflow in the browser at desktop and mobile widths:

1. Start without an application cookie.
2. Create an application through the Server Action.
3. Verify the cookie exists and the refreshed server value matches it.
4. Type a draft, reload, and verify the draft remains.
5. Advance a step, reload, and verify the tab remains on that step.
6. Open a second tab and verify session progress is separate.
7. Refresh and verify request memory changes.
8. Check the docs page for readable contrast, contained table scrolling, and no page-level horizontal overflow.

## Publication Follow-up

The vendored tarballs are temporary. Publishing Atomic remains a separate release task because package versions, npm authentication, provenance, and release tags require an explicit publication decision. The portfolio code should require no API changes when `file:` dependencies are replaced with published package versions.
