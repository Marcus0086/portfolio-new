"use client";

import { useEffect, useState } from "react";

const links = [
  { num: "01", label: "ABOUT", href: "#origin" },
  { num: "02", label: "WORKS", href: "#works" },
  { num: "03", label: "CONTACT", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sync = () => setScrolled(scrollY > 50);
    sync();
    addEventListener("scroll", sync, { passive: true });
    return () => removeEventListener("scroll", sync);
  }, []);

  return (
    <header
      className={`animate-nav-down fixed inset-x-0 top-0 z-200 flex items-center justify-between border-b px-8 py-5 transition-colors duration-300 ${
        scrolled
          ? "border-line bg-void/80 backdrop-blur-md"
          : "border-transparent"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className="h-2 w-2 rounded-full bg-cyan" aria-hidden />
        <span className="font-mono text-[11px] tracking-[0.2em]">
          RAGHAV GUPTA
        </span>
      </div>
      <nav className="hidden gap-8 md:flex">
        {links.map((l) => (
          <a
            key={l.num}
            href={l.href}
            className="group relative pb-1 font-mono text-[10px] tracking-[0.25em] text-muted transition-colors duration-300 hover:text-fg"
          >
            <span className="mr-1 text-cyan">{l.num}</span>
            {l.label}
            <span className="absolute bottom-0 left-0 h-px w-0 bg-fg transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </nav>
      <div className="hidden items-center gap-2.5 font-mono text-[10px] tracking-[0.2em] text-muted md:flex">
        <span
          className="animate-ping-node h-1.5 w-1.5 rounded-full bg-cyan"
          aria-hidden
        />
        AVAILABLE FOR WORK
      </div>
    </header>
  );
}
