import { story } from "@/data/content";
import { SectionHead } from "./section-head";
import { Reveal } from "@/hooks/use-reveal";

/** Long-form founding story — the page's prose payload for crawlers,
 *  set as a log: four beats hung on a commit rail like the git graph. */
export function Story() {
  return (
    <section id="story" className="scroll-mt-24 py-24">
      <SectionHead
        eyebrow="05 — SIGNAL LOG"
        title={
          <>
            From a Cold DM to a <em>Thousand Synthetic Users</em>
          </>
        }
      />
      <div className="px-6 md:px-12">
        <div className="max-w-[720px]">
          <Reveal>
            <p className="text-[clamp(1.35rem,2.4vw,1.9rem)] leading-snug font-light">
              {story.lead}
            </p>
          </Reveal>
          <div className="mt-16 space-y-14 border-l border-line pl-8 md:pl-10">
            {story.beats.map((beat, i) => (
              <Reveal key={beat.title} delay={i * 80} className="relative">
                <span
                  aria-hidden
                  className="absolute top-0.5 -left-[35.5px] h-2 w-2 rounded-full border-2 border-cyan bg-void shadow-[0_0_8px_rgba(0,229,255,0.6)] md:-left-[43.5px]"
                />
                <p className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase">
                  <span className="text-cyan">&gt; </span>
                  LOG 0{i + 1}
                </p>
                <h3 className="mt-3 text-[clamp(1.15rem,1.8vw,1.5rem)] font-medium italic">
                  {beat.title}
                </h3>
                <p className="mt-4 leading-[1.75] font-light text-fg/85">
                  {beat.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
