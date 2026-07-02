"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll-reveal state for a single element. Elements already at or above the
 * viewport on mount are shown immediately (scroll-restored loads and fast
 * scrolling never re-intersect, so waiting on the observer would leave them
 * invisible forever). Reduced-motion users see everything immediately.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || el.getBoundingClientRect().top < window.innerHeight) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {};
  return (
    <div
      ref={ref}
      style={style}
      className={`transition-[opacity,transform] duration-[800ms] ease-house motion-reduce:transition-none ${
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
