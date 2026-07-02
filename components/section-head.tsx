import { Reveal } from "@/hooks/use-reveal";

export function SectionHead({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  return (
    <Reveal className="mb-14 px-6 md:px-12">
      <p className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase">
        <span
          aria-hidden
          className="mr-2.5 inline-block h-2 w-2 rounded-full border-2 border-cyan align-middle shadow-[0_0_8px_rgba(0,229,255,0.6)]"
        />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.4rem)] font-medium italic">{title}</h2>
    </Reveal>
  );
}
