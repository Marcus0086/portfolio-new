# Raghav Gupta's Portfolio

A portfolio for Raghav Gupta, a founding engineer in Bengaluru who builds AI
agents, backend systems, and developer tools. The site follows the work from
early experiments to production systems. It includes an interactive Atomic
playground that explains storage across server rendering and the browser.

## Stack

- **Next.js 16** (App Router with dynamic server rendering for the Atomic playground)
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **@react-three/fiber + three** for the interactive hero sphere
- **Chakra Petch + JetBrains Mono** via `next/font`

## Develop

```sh
pnpm install
pnpm dev        # http://localhost:3000
```

## Build & deploy

```sh
pnpm build
```

Vercel uses the Next.js framework output. The Atomic playground needs a server
runtime because it reads request cookies and writes response cookies through
Server Actions.

## Where things live

- `data/content.ts` contains the project, story, timeline, and contact copy.
  Edit copy here, not in components.
- `components/git-graph.tsx` contains the journey graph. Commit rows are DOM; the rail
  is one SVG computed from measured node positions (`offsetTop`/`offsetLeft`,
  immune to entrance-animation transforms), redrawn on resize and font load.
- `components/sentient-sphere.tsx` contains the hero sphere and the responsive
  camera-fit that keeps it framed on portrait screens.
- `app/globals.css` contains design tokens (`--color-void`, `--color-cyan`,
  `--color-magenta`, …), keyframes, grain + scanline overlays.

All motion respects `prefers-reduced-motion`.
