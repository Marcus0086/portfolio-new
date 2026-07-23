"use client";

import { Button } from "@astryxdesign/core";
import { useState } from "react";
import { LabCard } from "@/components/atomic/lab-card";
import { RequestTrace } from "@/components/atomic/request-trace";
import {
  frameworks,
  playgroundLabs,
  type FrameworkId,
  type PlaygroundLab,
} from "@/data/atomic";
import { ApplicationDemo, type ApplicationDemoProps } from "./application-demo";

type FrameworkFilter = "all" | FrameworkId;

const labById = Object.fromEntries(playgroundLabs.map((lab) => [lab.id, lab])) as Record<
  string,
  PlaygroundLab
>;

const leaseFrames = [
  { label: "NOTHING RUNNING", readers: "waiting", writer: "waiting", laterRead: "waiting" },
  { label: "TWO READS RUN TOGETHER", readers: "read A + B", writer: "waits", laterRead: "waits" },
  { label: "THE WRITE RUNS ALONE", readers: "finished", writer: "write C", laterRead: "waits" },
  { label: "THE NEXT READ CAN RUN", readers: "finished", writer: "finished", laterRead: "read D" },
];

function StateRow({ label, value, tone }: { label: string; value: string; tone?: "cyan" | "pink" }) {
  return (
    <p className="atomic-state-row" data-tone={tone}>
      <span>{label}</span>
      <strong>{value}</strong>
    </p>
  );
}

function LeaseLab() {
  const [frame, setFrame] = useState(0);
  const current = leaseFrames[frame];

  return (
    <LabCard lab={labById["lease-queue"]}>
      <p className="atomic-timeline-label">{current.label}</p>
      <ol className="atomic-lease-lanes">
        <li><span>FIRST READS</span><strong>{current.readers}</strong></li>
        <li><span>WRITE</span><strong>{current.writer}</strong></li>
        <li><span>NEXT READ</span><strong>{current.laterRead}</strong></li>
      </ol>
      <Button
        label={frame === leaseFrames.length - 1 ? "Start again" : "Run next operation"}
        onClick={() => setFrame((value) => (value + 1) % leaseFrames.length)}
        variant="secondary"
      />
    </LabCard>
  );
}

function IdempotencyLab() {
  const [firstValue, setFirstValue] = useState("none");
  const [status, setStatus] = useState("No operation recorded");

  const run = (value: "alpha" | "beta") => {
    if (firstValue === "none") {
      setFirstValue(value);
      setStatus(`Saved ${value}`);
      return;
    }
    setStatus(firstValue === value ? "Same write: returned the first success" : "Different write: StorageIdempotencyError");
  };

  return (
    <LabCard lab={labById.idempotency}>
      <StateRow label="operation ID" value="op_792" />
      <StateRow label="first value" value={firstValue} />
      <StateRow label="result" value={status} tone={status.includes("Error") ? "pink" : "cyan"} />
      <menu className="atomic-button-row">
        <Button label="Run value alpha" onClick={() => run("alpha")} variant="secondary" />
        <Button label="Run value beta" onClick={() => run("beta")} variant="secondary" />
        <Button label="Clear saved operation" onClick={() => { setFirstValue("none"); setStatus("No operation recorded"); }} variant="ghost" />
      </menu>
    </LabCard>
  );
}

function FrameworkLab({ id }: { id: "react-external-store" | "vue-reactivity" | "svelte-store" }) {
  const content = {
    "react-external-store": ["server snapshot -> APP-1001", "first browser value -> APP-1001", "subscribe() -> later writes"],
    "vue-reactivity": ["Nuxt payload -> APP-1001", "shallowRef(APP-1001)", "storage.subscribe -> reactive updates"],
    "svelte-store": ["server value -> APP-1001", "readable(APP-1001)", "storage.subscribe -> store updates"],
  }[id];

  return (
    <LabCard lab={labById[id]}>
      <ol className="atomic-code-flow">
        {content.map((line) => <li key={line}>{line}</li>)}
      </ol>
    </LabCard>
  );
}

export function PlaygroundClient(props: ApplicationDemoProps) {
  const [filter, setFilter] = useState<FrameworkFilter>("all");
  const [announcement, setAnnouncement] = useState("Showing all framework examples");

  const visible = (id: string) => {
    const lab = labById[id];
    return filter === "all" || lab.frameworks.includes(filter);
  };

  const chooseFilter = (next: FrameworkFilter, label: string) => {
    setFilter(next);
    setAnnouncement(next === "all" ? "Showing all framework examples" : `Showing ${label} examples`);
  };

  return (
    <>
      <RequestTrace {...props} />
      <ApplicationDemo {...props} />

      <nav className="atomic-filterbar" aria-label="Filter framework examples">
        <span>FRAMEWORK SUBSCRIPTIONS</span>
        <Button label="All" aria-pressed={filter === "all"} onClick={() => chooseFilter("all", "all")} variant={filter === "all" ? "primary" : "ghost"} />
        {frameworks.map((framework) => (
          <Button
            key={framework.id}
            label={framework.shortLabel}
            aria-pressed={filter === framework.id}
            onClick={() => chooseFilter(framework.id, framework.label)}
            variant={filter === framework.id ? "primary" : "ghost"}
          />
        ))}
      </nav>
      <p className="sr-only" aria-live="polite">{announcement}</p>

      <section className="atomic-masonry" aria-label="Atomic guarantees and framework examples">
        {visible("lease-queue") && <LeaseLab />}
        {visible("idempotency") && <IdempotencyLab />}
        {visible("react-external-store") && <FrameworkLab id="react-external-store" />}
        {visible("vue-reactivity") && <FrameworkLab id="vue-reactivity" />}
        {visible("svelte-store") && <FrameworkLab id="svelte-store" />}
      </section>
    </>
  );
}
