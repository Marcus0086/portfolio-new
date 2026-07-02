"use client";

import { useEffect, useRef } from "react";

/** The SIGNAL spine — a fixed left rail whose cyan fill tracks scroll progress. */
export function SignalRail() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (fillRef.current) fillRef.current.style.height = "100%";
      return;
    }
    let raf = 0;
    const frame = () => {
      const total = document.documentElement.scrollHeight - innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0;
      if (fillRef.current) fillRef.current.style.height = `${p * 100}%`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 bottom-0 left-6 z-150 hidden w-0.5 bg-line md:block"
    >
      <div
        ref={fillRef}
        className="w-full bg-cyan shadow-[0_0_10px_rgba(0,229,255,0.4)]"
        style={{ height: "0%" }}
      />
    </div>
  );
}
