"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media";

/** mix-blend-difference dot + ring cursor. Fine pointers only. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [overLink, setOverLink] = useState(false);
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const active = fine && !reduced;

  useEffect(() => {
    if (!active) return;

    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const dotPos = { ...pointer };
    const ringPos = { ...pointer };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      setOverLink(
        Boolean((e.target as Element | null)?.closest?.("a, button")),
      );
    };
    addEventListener("mousemove", onMove, { passive: true });
    addEventListener("mouseover", onOver);

    let raf = 0;
    const frame = () => {
      dotPos.x = lerp(dotPos.x, pointer.x, 0.35);
      dotPos.y = lerp(dotPos.y, pointer.y, 0.35);
      ringPos.x = lerp(ringPos.x, pointer.x, 0.16);
      ringPos.y = lerp(ringPos.y, pointer.y, 0.16);
      if (dotRef.current) {
        dotRef.current.style.left = `${dotPos.x}px`;
        dotRef.current.style.top = `${dotPos.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.x}px`;
        ringRef.current.style.top = `${ringPos.y}px`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  if (!active) return null;
  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className={`pointer-events-none fixed z-10000 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg mix-blend-difference transition-transform duration-300 ${
          overLink ? "scale-0" : "scale-[1.4]"
        }`}
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed z-10000 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg mix-blend-difference transition-transform duration-300 ${
          overLink ? "scale-100" : "scale-0"
        }`}
      />
    </>
  );
}
