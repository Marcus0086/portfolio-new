"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { commits } from "@/data/content";
import { Reveal } from "@/hooks/use-reveal";
import { SectionHead } from "./section-head";

type Geometry = {
  width: number;
  height: number;
  mainD: string;
  branches: { index: number; forkD: string; mergeD: string }[];
};

/**
 * The journey as `git log --graph --all`. Commit rows are ordinary DOM; the
 * rail is one SVG whose paths are computed from the *measured* node positions
 * (offsetTop/offsetLeft — layout values, immune to the reveal animation's
 * transforms), so lines always land exactly on the nodes at any breakpoint.
 */
export function GitGraph() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mainPathRef = useRef<SVGPathElement>(null);
  const branchGroupRef = useRef<SVGGElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const offsetWithin = (el: HTMLElement) => {
        let x = 0;
        let y = 0;
        let cur: HTMLElement | null = el;
        while (cur && cur !== list) {
          x += cur.offsetLeft;
          y += cur.offsetTop;
          cur = cur.offsetParent as HTMLElement | null;
        }
        return { x, y };
      };

      const points = commits.map((commit, index) => {
        const node = nodeRefs.current[index];
        if (!node) return null;
        const o = offsetWithin(node);
        return {
          index,
          x: o.x + node.offsetWidth / 2,
          y: o.y + node.offsetHeight / 2,
          side: Boolean(commit.side),
        };
      });
      if (points.some((p) => p === null)) return;
      const pts = points as NonNullable<(typeof points)[number]>[];

      const mainX = (pts.find((p) => !p.side) ?? pts[0]).x;
      const mainPts = pts.filter((p) => !p.side);
      const span = 72;
      const gap = 9;

      setGeometry({
        width: list.offsetWidth,
        height: list.scrollHeight,
        mainD: `M ${mainX} ${pts[0].y} L ${mainX} ${mainPts[mainPts.length - 1].y}`,
        branches: pts
          .filter((p) => p.side)
          .map((p) => ({
            index: p.index,
            forkD: `M ${mainX} ${p.y - span} C ${mainX} ${p.y - span * 0.35}, ${p.x} ${p.y - span * 0.65}, ${p.x} ${p.y - gap}`,
            mergeD: `M ${p.x} ${p.y + gap} C ${p.x} ${p.y + span * 0.65}, ${mainX} ${p.y + span * 0.35}, ${mainX} ${p.y + span}`,
          })),
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, []);

  // Draw choreography: the main line draws with the section's scroll progress;
  // each branch sweeps in when its commit row approaches the viewport.
  useEffect(() => {
    if (!geometry) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const main = mainPathRef.current;
    if (reduced) {
      if (main) main.style.strokeDashoffset = "0";
      branchGroupRef.current
        ?.querySelectorAll("path")
        .forEach((p) => ((p as SVGPathElement).style.strokeDashoffset = "0"));
      return;
    }
    const drawn = new Set<number>();
    let raf = 0;
    const frame = () => {
      const section = sectionRef.current;
      if (section && main) {
        const rect = section.getBoundingClientRect();
        const p = Math.min(
          1,
          Math.max(0, (innerHeight * 0.85 - rect.top) / rect.height),
        );
        main.style.strokeDashoffset = String(1 - p);
      }
      for (const branch of geometry.branches) {
        if (drawn.has(branch.index)) continue;
        const node = nodeRefs.current[branch.index];
        if (node && node.getBoundingClientRect().top < innerHeight * 0.85) {
          drawn.add(branch.index);
          branchGroupRef.current
            ?.querySelectorAll<SVGPathElement>(
              `[data-branch="${branch.index}"]`,
            )
            .forEach((p) => (p.style.strokeDashoffset = "0"));
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [geometry]);

  const pathBase = {
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    pathLength: 1,
  };

  return (
    <section
      ref={sectionRef}
      id="origin"
      className="scroll-mt-24 px-0 pt-32 pb-8"
    >
      <SectionHead
        eyebrow="03 — ORIGIN"
        title={
          <>
            git log <em>--graph --all</em>
          </>
        }
      />
      <div
        ref={listRef}
        className="relative mx-auto flex max-w-[880px] flex-col px-6 md:px-12"
      >
        {geometry && (
          <svg
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-0 overflow-visible"
            width={geometry.width}
            height={geometry.height}
          >
            <path
              ref={mainPathRef}
              d={geometry.mainD}
              stroke="var(--color-cyan)"
              style={{
                strokeDasharray: 1,
                strokeDashoffset: 1,
                filter: "drop-shadow(0 0 6px var(--color-cyan))",
              }}
              {...pathBase}
            />
            <g ref={branchGroupRef}>
              {geometry.branches.flatMap((b) =>
                [b.forkD, b.mergeD].map((d, i) => (
                  <path
                    key={`${b.index}-${i}`}
                    data-branch={b.index}
                    d={d}
                    stroke="var(--color-magenta)"
                    opacity={0.9}
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: 1,
                      filter: "drop-shadow(0 0 6px var(--color-magenta))",
                      transition: "stroke-dashoffset 0.9s var(--ease-house)",
                    }}
                    {...pathBase}
                  />
                )),
              )}
            </g>
          </svg>
        )}

        {commits.map((commit, index) => (
          <Reveal
            key={commit.sha}
            className="relative z-1 grid grid-cols-[64px_1fr] gap-x-4 pb-14"
          >
            <div className="relative">
              <div
                ref={(el) => {
                  nodeRefs.current[index] = el;
                }}
                aria-hidden
                className={`absolute top-[18px] left-[9px] h-2.5 w-2.5 rounded-full border-2 ${
                  commit.pre
                    ? "border-muted bg-void"
                    : commit.side
                      ? "left-[41px] border-magenta bg-void shadow-[0_0_12px_rgba(255,46,136,0.7)]"
                      : commit.head
                        ? "border-cyan bg-cyan shadow-[0_0_12px_rgba(0,229,255,0.7)]"
                        : "border-cyan bg-void shadow-[0_0_12px_rgba(0,229,255,0.7)]"
                }`}
              />
            </div>
            <div>
              <p className="mt-3 mb-3 flex flex-wrap items-center gap-2.5 font-mono text-xs tracking-[0.06em]">
                <span
                  className={`text-[11px] tracking-[0.12em] ${
                    commit.pre
                      ? "text-muted"
                      : commit.side
                        ? "text-magenta"
                        : "text-cyan"
                  }`}
                >
                  {commit.sha}
                </span>
                {commit.branch && (
                  <span
                    className={`rounded-[3px] border px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase ${
                      commit.head
                        ? "border-cyan text-cyan"
                        : "border-magenta text-magenta"
                    }`}
                  >
                    {commit.branch}
                  </span>
                )}
                <span className="text-fg">{commit.msg}</span>
                <span className="text-[9px] tracking-[0.25em] text-muted">
                  {commit.year}
                </span>
              </p>
              <p className="max-w-[62ch] text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.75] font-light">
                {commit.prose}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
