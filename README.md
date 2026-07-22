# Raghav Gupta's Portfolio

A portfolio for Raghav Gupta, a founding engineer in Bengaluru who builds AI
agents, backend systems, and developer tools. The site follows the work from
early experiments to production systems. It includes an interactive Atomic
playground that explains storage across server rendering and the browser.

## Stack

- **Next.js 16** (App Router with a fully static export)
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **@react-three/fiber + three** for the interactive hero sphere
- **Chakra Petch + JetBrains Mono** via `next/font`

## Develop

```sh
bun install
bun run dev        # http://localhost:3000
```

## Build & deploy

```sh
bun run build      # static site in ./out
```

Deploy `out/` to any static host. For Vercel: import the repo, framework preset
"Next.js". The static export is detected automatically.

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
