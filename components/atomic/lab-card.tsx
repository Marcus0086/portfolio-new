import { Badge } from "@astryxdesign/core";
import Link from "next/link";
import type { PlaygroundLab } from "@/data/atomic";
import { runtimeLabels } from "@/data/atomic";

type LabCardProps = {
  lab: PlaygroundLab;
  children: React.ReactNode;
};

export function LabCard({ lab, children }: LabCardProps) {
  return (
    <article
      id={lab.id}
      className={`atomic-lab atomic-lab-${lab.size} scroll-mt-24`}
      data-runtime={lab.runtime}
    >
      <header className="atomic-lab-header">
        <span>
          <small>{lab.eyebrow}</small>
          <h2>{lab.title}</h2>
        </span>
        <Badge
          variant={lab.runtime === "client" ? "pink" : "cyan"}
          label={runtimeLabels[lab.runtime]}
        />
      </header>
      <p className="atomic-lab-summary">{lab.summary}</p>
      <section className="atomic-lab-body">{children}</section>
      <footer className="atomic-lab-footer">
        <span>{lab.adapter ?? "Atomic core"}</span>
        <Link href={`/playground/docs#${lab.docsId}`}>READ HOW IT WORKS →</Link>
      </footer>
    </article>
  );
}
