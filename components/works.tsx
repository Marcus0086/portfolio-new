"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { works } from "@/data/content";
import { Reveal } from "@/hooks/use-reveal";
import { SectionHead } from "./section-head";

export function Works() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches === false) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { ...pointer };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    addEventListener("mousemove", onMove, { passive: true });
    let raf = 0;
    const frame = () => {
      pos.x = lerp(pos.x, pointer.x, 0.12);
      pos.y = lerp(pos.y, pointer.y, 0.12);
      if (previewRef.current) {
        previewRef.current.style.left = `${pos.x}px`;
        previewRef.current.style.top = `${pos.y}px`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="works" className="relative scroll-mt-24 py-32">
      <SectionHead
        eyebrow="04 / PROJECTS"
        title={
          <>
            I wanted these tools, so I <em>built them</em>
          </>
        }
      />
      <div
        className="border-b border-line"
        onMouseLeave={() => setHovered(null)}
      >
        {works.map((work, index) => {
          const content = (
            <>
              <span
                aria-hidden
                className="absolute top-0 bottom-0 left-0 w-0.5 origin-top scale-y-0 bg-cyan shadow-[0_0_12px_var(--color-cyan)] transition-transform duration-350 ease-house group-hover:scale-y-100"
              />
              <span className="self-center font-mono text-[11px] tracking-[0.15em] text-muted [grid-area:year]">
                {work.year}
              </span>
              <span className="flex flex-col gap-3 transition-transform duration-350 ease-house [grid-area:title] group-hover:translate-x-4">
                <span className="text-[clamp(1.5rem,3.8vw,3.2rem)] leading-none font-medium transition-[text-shadow] duration-350 group-hover:[text-shadow:0_0_18px_rgba(0,229,255,0.6)]">
                  {work.title}
                </span>
                <span className="max-w-[64ch] text-sm leading-relaxed text-muted md:text-[15px]">
                  {work.description}
                </span>
              </span>
              <span className="flex flex-wrap items-center gap-2 [grid-area:tags] md:justify-end">
                {work.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`rounded-full border px-3 py-1.5 font-mono text-[9px] tracking-[0.15em] whitespace-nowrap ${
                      tag.live
                        ? "border-magenta text-magenta"
                        : "border-line text-muted"
                    }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </span>
              <span
                aria-hidden
                className="self-center font-mono text-xl text-muted transition-[transform,color] duration-350 [grid-area:arrow] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan"
              >
                {work.external === false ? "→" : "↗"}
              </span>
            </>
          );
          const className =
            "group relative grid grid-cols-[1fr_auto] gap-x-4 gap-y-2.5 border-t border-line px-6 py-8 transition-colors duration-300 [grid-template-areas:'year_arrow'_'title_title'_'tags_tags'] hover:bg-fg/3 md:grid-cols-[7rem_1fr_auto_3rem] md:items-center md:gap-6 md:px-12 md:py-10 md:[grid-template-areas:'year_title_tags_arrow']";

          return (
            <Reveal key={work.title} delay={index * 100}>
              {work.external === false ? (
                <Link
                  href={work.href}
                  onMouseEnter={() => setHovered(index)}
                  className={className}
                >
                  {content}
                </Link>
              ) : (
                <a
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHovered(index)}
                  className={className}
                >
                  {content}
                </a>
              )}
            </Reveal>
          );
        })}
      </div>

      {/* cursor-following dossier panel */}
      <div
        ref={previewRef}
        aria-hidden
        className={`pointer-events-none fixed z-90 hidden h-[190px] w-[300px] -translate-x-1/2 translate-y-[-130%] flex-col justify-between border border-line-strong p-5 backdrop-blur-sm transition-[opacity,transform] duration-250 md:flex ${
          hovered !== null ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--color-cyan) 22%, transparent), color-mix(in srgb, var(--color-magenta) 12%, transparent) 60%, color-mix(in srgb, var(--color-void) 92%, transparent))",
        }}
      >
        <span className="font-mono text-[34px] text-fg/85">
          {String((hovered ?? 0) + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-[9px] tracking-[0.3em] text-muted">
          {hovered !== null && works[hovered]?.external === false
            ? "OPEN PLAYGROUND →"
            : "OPEN FILE ↗"}
        </span>
      </div>
    </section>
  );
}
