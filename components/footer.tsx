"use client";

import { useEffect, useRef } from "react";
import { contact } from "@/data/content";
import { Reveal } from "@/hooks/use-reveal";

export function Footer() {
  const clockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pad = (n: number, w: number) => String(n).padStart(w, "0");
    const tick = () => {
      const d = new Date();
      if (clockRef.current) {
        clockRef.current.textContent = `${pad(d.getHours(), 2)}:${pad(d.getMinutes(), 2)}:${pad(
          d.getSeconds(),
          2,
        )}.${pad(d.getMilliseconds(), 3)}`;
      }
    };
    tick();
    const id = setInterval(tick, 47);
    return () => clearInterval(id);
  }, []);

  return (
    <footer id="contact" className="scroll-mt-24 pt-32">
      <Reveal>
        <p className="text-center font-mono text-[10px] tracking-[0.3em] text-muted uppercase">
          <span
            aria-hidden
            className="mr-2.5 inline-block h-2 w-2 rounded-full border-2 border-cyan align-middle shadow-[0_0_8px_rgba(0,229,255,0.6)]"
          />
          09 — TRANSMISSION
        </p>
      </Reveal>
      <a
        href={`mailto:${contact.email}`}
        className="group relative mt-6 block overflow-hidden px-6 py-20 text-center"
      >
        <span
          aria-hidden
          className="absolute inset-0 translate-y-[101%] bg-linear-to-r from-cyan to-magenta transition-transform duration-500 ease-house group-hover:translate-y-0"
        />
        <span className="relative z-1 text-[clamp(2.2rem,7vw,6rem)] leading-[1.05] font-semibold transition-colors duration-400 group-hover:text-void">
          Let’s <em>Collaborate</em>
        </span>
        <span
          aria-hidden
          className="relative z-1 ml-4 inline-block text-[clamp(1.8rem,4vw,3.5rem)] text-cyan transition-[transform,color] duration-400 group-hover:rotate-45 group-hover:text-void"
        >
          ↗
        </span>
      </a>
      <div className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-line px-8 py-6 font-mono text-[10px] tracking-[0.15em] text-muted">
        <span className="flex items-center gap-3">
          <span>LOCAL TIME</span>
          <span ref={clockRef} className="text-fg tabular-nums">
            00:00:00.000
          </span>
        </span>
        <span className="flex gap-6">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-fg"
          >
            LINKEDIN
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-fg"
          >
            GITHUB
          </a>
        </span>
        <span>© {new Date().getFullYear()} RAGHAV GUPTA</span>
      </div>
    </footer>
  );
}
