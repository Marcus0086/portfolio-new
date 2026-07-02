import { marqueeA, marqueeB } from "@/data/content";
import { SectionHead } from "./section-head";

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const seq = (key: string) => (
    <span key={key} className="flex items-center gap-12 pr-12">
      {items.map((item) => (
        <span key={`${key}-${item}`} className="contents">
          <span className="text-outline text-[clamp(2.4rem,6vw,5rem)] font-light whitespace-nowrap transition-colors duration-300 hover:text-cyan hover:[-webkit-text-stroke-color:transparent] hover:[text-shadow:0_0_22px_rgba(0,229,255,0.55)]">
            {item}
          </span>
          <span className="text-xl text-cyan" aria-hidden>
            •
          </span>
        </span>
      ))}
    </span>
  );
  return (
    <div
      className={`overflow-hidden border-t border-line py-10 ${reverse ? "border-b" : ""}`}
    >
      <div
        className={`flex w-max ${reverse ? "animate-marquee-right" : "animate-marquee-left"}`}
      >
        {seq("a")}
        {seq("b")}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section id="arsenal" className="scroll-mt-24 py-24">
      <SectionHead
        eyebrow="06 — TECHNICAL ARSENAL"
        title={
          <>
            Tools of <em>Extraction</em>
          </>
        }
      />
      <Row items={marqueeA} />
      <Row items={marqueeB} reverse />
    </section>
  );
}
