import { timeline } from "@/data/content";
import { Reveal } from "@/hooks/use-reveal";
import { SectionHead } from "./section-head";

export function Timeline() {
  return (
    <section id="timeline" className="scroll-mt-24 py-24">
      <SectionHead eyebrow="07 — TIMELINE" title={<>The <em>Chronology</em></>} />
      <div className="border-b border-line">
        {timeline.map((entry) => (
          <Reveal key={entry.span}>
            <div className="grid grid-cols-1 items-baseline gap-2.5 border-t border-line px-6 py-8 transition-colors duration-300 hover:bg-fg/[0.03] md:grid-cols-[220px_1fr_1.4fr] md:gap-6 md:px-12">
              <span className="font-mono text-[10px] tracking-[0.2em] text-cyan">{entry.span}</span>
              <span className="font-mono text-xs tracking-[0.15em]">{entry.role}</span>
              <span className="text-[15px] leading-relaxed text-muted">{entry.desc}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
