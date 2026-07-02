"use client";

import { useEffect, useRef } from "react";
import { statements } from "@/data/content";
import { SectionHead } from "./section-head";

/** 300vh sticky section — statements slide horizontally with scroll progress. */
export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0;
    let raf = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const frame = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (section && track) {
        const rect = section.getBoundingClientRect();
        const total = rect.height - innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        const max = Math.max(0, track.scrollWidth - innerWidth * 0.6);
        x = lerp(x, -max * p, 0.08);
        track.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] motion-reduce:h-auto motion-reduce:py-24"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-14 overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible">
        <SectionHead
          eyebrow="04 — PHILOSOPHY"
          title={
            <>
              Stream of <em>Consciousness</em>
            </>
          }
        />
        <div
          ref={trackRef}
          className="flex w-max items-center gap-[10vw] pl-[8vw] will-change-transform motion-reduce:w-auto motion-reduce:flex-col motion-reduce:items-start motion-reduce:gap-8 motion-reduce:px-6"
        >
          {statements.map((s) => (
            <p
              key={s.text}
              className={`text-[clamp(1.8rem,4.2vw,3.6rem)] leading-[1.1] font-light whitespace-nowrap motion-reduce:whitespace-normal ${
                s.ghost ? "text-outline" : ""
              }`}
            >
              {s.text}
            </p>
          ))}
        </div>
        <div className="mx-6 h-px bg-linear-to-r from-transparent via-line-strong to-transparent md:mx-12" />
      </div>
    </section>
  );
}
