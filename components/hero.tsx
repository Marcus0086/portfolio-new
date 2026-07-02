"use client";

import { useEffect, useRef } from "react";
import { SentientSphere } from "./sentient-sphere";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase">
      <span className="text-cyan">&gt; </span>
      {children}
      <span className="animate-blink ml-1.5 text-[8px] text-cyan">█</span>
    </p>
  );
}

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);

  // Scroll-out: typography fades and shrinks as the hero leaves the viewport.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const frame = () => {
      const p = Math.min(1, Math.max(0, scrollY / (innerHeight * 0.7)));
      if (contentRef.current) {
        contentRef.current.style.opacity = String(1 - p);
        contentRef.current.style.transform = `scale(${1 - p * 0.2})`;
      }
      if (extrasRef.current) extrasRef.current.style.opacity = String(1 - p * 1.6);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const title = "text-fg text-[clamp(2.1rem,5.5vw,4.75rem)] leading-[1.05] font-semibold tracking-[0.01em]";

  return (
    <section className="relative h-screen overflow-clip">
      <div className="absolute inset-0" aria-hidden>
        <SentientSphere />
      </div>

      <div
        ref={contentRef}
        className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-between px-6 pt-24 pb-30 md:px-12 md:pt-28 md:pb-32"
      >
        <div className="animate-rise [animation-delay:200ms]">
          <Eyebrow>01 — DISCIPLINE</Eyebrow>
          <h1 className={`animate-glitch mt-3 ${title}`}>
            FOUNDING <em className="font-medium">ENGINEER</em>
          </h1>
        </div>
        <div className="animate-rise self-end text-right [animation-delay:400ms]">
          <Eyebrow>02 — CRAFT</Eyebrow>
          <h2 className={`mt-3 ${title}`}>
            AI SYSTEMS <em className="font-medium">ARCHITECT</em>
          </h2>
        </div>
      </div>

      <div ref={extrasRef} className="contents">
        <a
          href="#works"
          className="animate-pop absolute top-1/2 left-1/2 z-[3] flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2.5 rounded-full border border-line-strong font-mono text-[10px] tracking-[0.3em] text-fg shadow-[0_0_24px_rgba(0,229,255,0.2),inset_0_0_14px_rgba(0,229,255,0.12)] transition-[border-color,box-shadow] duration-300 [animation-delay:600ms] hover:border-magenta hover:shadow-[0_0_28px_rgba(255,46,136,0.35),inset_0_0_14px_rgba(255,46,136,0.18)]"
        >
          <span className="animate-ping-node h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden />
          INITIALIZE
        </a>
        <div className="animate-fade absolute bottom-6 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2.5 [animation-delay:1500ms]">
          <span className="font-mono text-[9px] tracking-[0.3em] text-muted">SCROLL</span>
          <span className="animate-bounce-line h-12 w-px bg-gradient-to-b from-fg to-transparent" aria-hidden />
        </div>
      </div>
    </section>
  );
}
