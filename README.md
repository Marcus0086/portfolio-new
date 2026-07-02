# SIGNAL — Raghav Gupta's Portfolio

A cyberpunk single-page portfolio. One thread runs through the whole page — the
invisible signal from the remote-control cars I took apart as a kid — rendered
as a scroll-progress rail, a noise-displaced wireframe sphere, and a journey
section that draws itself as an animated `git log --graph --all` with my real
commit SHAs.

## Stack

- **Next.js 16** (App Router, `output: "export"` — fully static)
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **@react-three/fiber + three** — hero sphere (GLSL simplex-noise displacement)
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
"Next.js" — the static export is detected automatically.

## Where things live

- `data/content.ts` — every word on the page: commits, works, timeline, contact.
  Edit copy here, not in components.
- `components/git-graph.tsx` — the journey graph. Commit rows are DOM; the rail
  is one SVG computed from measured node positions (`offsetTop`/`offsetLeft`,
  immune to entrance-animation transforms), redrawn on resize and font load.
- `components/sentient-sphere.tsx` — the hero sphere, including the responsive
  camera-fit that keeps it framed on portrait screens.
- `app/globals.css` — design tokens (`--color-void`, `--color-cyan`,
  `--color-magenta`, …), keyframes, grain + scanline overlays.

All motion respects `prefers-reduced-motion`.
