# Atomic Playground and Docs Design

## Purpose

Add Atomic to the selected works list and make it the first project that opens into a native portfolio experience. The playground should teach what SSR Storage does by letting visitors inspect state as it moves between server request, serialized snapshot, hydration, and browser storage. The companion docs should explain the same system without turning the playground into a long article.

## Routes

- `/playground`: interactive runtime observatory with framework filters and masonry labs.
- `/playground/docs`: static, linked documentation organized around the same examples.
- `/`: the Atomic work item links internally to `/playground`; external work items retain new-tab behavior.

Both routes must remain compatible with the repository's `output: "export"` configuration.

## Visual Direction

The playground extends the existing portfolio's signal-console language: void black, cool white, cyan active state, magenta conflict state, hairline borders, Chakra Petch display type, and JetBrains Mono telemetry. The signature element is a request trace that behaves like an oscilloscope: server request, transfer snapshot, and browser store are separate lanes connected by an animated signal.

The masonry is information-driven rather than decorative. Wide cells represent cross-runtime flows; narrow cells represent runtime-local adapters; taller cells contain controls or timelines. Cards stay square-edged and dense.

## Content Model

A single TypeScript module owns:

- framework identifiers and labels;
- adapter/runtime capability rows;
- playground lab metadata;
- documentation sections and code examples.

The model prevents framework labels, anchors, runtime claims, and examples from drifting between routes.

## Playground Behavior

- Framework tabs filter applicable labs without navigation.
- Cookie bridge shows request value, serialized snapshot, hydrated value, and a staged response cookie mutation.
- Local storage shows a client-only draft and makes the unavailable server state explicit.
- Session storage shows tab-scoped wizard progress.
- Request memory shows request-scoped server data and its end-of-request disposal.
- Layered storage shows ordered fallback reads and one explicit write target.
- Codec/migration lab demonstrates validation, migration, TTL, and decode failure.
- Lease lab demonstrates concurrent readers, a queued writer, and a later reader waiting behind the writer.
- Idempotency lab demonstrates replay for an identical fingerprint and conflict for a reused operation ID with different input.
- React lab explains `useSyncExternalStore`; Vue/Nuxt and Svelte labs show equivalent subscriptions to the same core contract.

Browser-capable examples execute locally. Server-only behavior is a deterministic simulation because the portfolio is a static export. Every simulation is labeled as such.

## Documentation

The docs route contains:

1. Mental model and public package boundaries.
2. Runtime and adapter capability matrix.
3. Typed cells and codecs.
4. Server request, snapshot, hydration, and response commit flow.
5. Cookie, local storage, session storage, request memory, and layered recipes.
6. React/Next, Vue/Nuxt, and Svelte integration examples.
7. Scoped leases, fairness, timeouts, and aborts.
8. Idempotency replay and conflict semantics.
9. Errors and capability failures.
10. Guarantee boundaries: lease isolation is not a transaction, rollback, or distributed durability.

Each relevant section links back to a playground lab. A compact sticky outline supports long-page scanning on desktop and becomes a horizontal section index on small screens.

## Accessibility and Responsiveness

- Native buttons and links retain visible focus states.
- Filters expose `aria-pressed`; status changes use an `aria-live` region.
- Color is paired with text labels.
- Motion is disabled under `prefers-reduced-motion`.
- The request trace stacks vertically below tablet width.
- Masonry collapses to one column on narrow screens without clipped code.

## Validation

- Static contract tests verify routes, content anchors, project linking, and runtime claims.
- `pnpm lint` and `pnpm build` must pass.
- Browser QA covers desktop and mobile screenshots, filter interaction, cookie simulation, lease sequence, docs navigation, and home-to-playground navigation.

