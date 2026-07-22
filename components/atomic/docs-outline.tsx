"use client";

import { useEffect, useState } from "react";

type OutlineItem = { id: string; title: string };

export function DocsOutline({ items }: { items: OutlineItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-15% 0px -70%", threshold: [0, 1] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="atomic-docs-outline" aria-label="Documentation sections">
      <span>IN THIS GUIDE</span>
      {items.map((item, index) => (
        <a key={item.id} href={`#${item.id}`} data-active={active === item.id}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {item.title}
        </a>
      ))}
    </nav>
  );
}
