"use client";

import { Button } from "@astryxdesign/core";
import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { LabCard } from "@/components/atomic/lab-card";
import { RequestTrace } from "@/components/atomic/request-trace";
import {
  frameworks,
  playgroundLabs,
  type FrameworkId,
  type PlaygroundLab,
} from "@/data/atomic";

type FrameworkFilter = "all" | FrameworkId;

const labById = Object.fromEntries(playgroundLabs.map((lab) => [lab.id, lab])) as Record<
  string,
  PlaygroundLab
>;

const wizardSteps = ["cart", "address", "payment", "review"];
const browserStorageEvent = "atomic-playground-storage";
const leaseFrames = [
  { label: "READY", readers: "idle", writer: "idle", laterRead: "idle" },
  { label: "READS ACTIVE", readers: "read A + B", writer: "queued", laterRead: "queued" },
  { label: "WRITE ACTIVE", readers: "released", writer: "write C", laterRead: "waiting" },
  { label: "QUEUE DRAINED", readers: "released", writer: "committed", laterRead: "read D" },
];

type BrowserStorageKind = "localStorage" | "sessionStorage";

function useBrowserStorage(kind: BrowserStorageKind, key: string, serverValue: string) {
  const subscribe = useCallback((notify: () => void) => {
    const onStorage = (event: Event) => {
      if (event instanceof StorageEvent && event.key !== key) return;
      notify();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(browserStorageEvent, onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(browserStorageEvent, onStorage);
    };
  }, [key]);
  const getSnapshot = useCallback(() => window[kind].getItem(key) ?? serverValue, [key, kind, serverValue]);
  const getServerSnapshot = useCallback(() => serverValue, [serverValue]);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function writeBrowserStorage(kind: BrowserStorageKind, key: string, value: string) {
  window[kind].setItem(key, value);
  window.dispatchEvent(new Event(browserStorageEvent));
}

function StateRow({ label, value, tone }: { label: string; value: string; tone?: "cyan" | "pink" }) {
  return (
    <p className="atomic-state-row" data-tone={tone}>
      <span>{label}</span>
      <strong>{value}</strong>
    </p>
  );
}

function CookieLab({ onStage }: { onStage: (value: string | null) => void }) {
  const [clientValue, setClientValue] = useState("alpha");
  const [staged, setStaged] = useState<string | null>(null);

  const commit = () => {
    const next = clientValue === "alpha" ? "beta" : "alpha";
    setClientValue(next);
    setStaged(next);
    onStage(next);
  };

  return (
    <LabCard lab={labById["cookie-bridge"]}>
      <StateRow label="request read" value="alpha" />
      <StateRow label="snapshot" value="alpha" />
      <StateRow label="browser now" value={clientValue} tone="cyan" />
      <StateRow label="response effect" value={staged ? `workspace=${staged}` : "none"} tone={staged ? "pink" : undefined} />
      <Button label={`Commit ${clientValue === "alpha" ? "beta" : "alpha"}`} onClick={commit} variant="secondary" />
    </LabCard>
  );
}

function LocalDraftLab() {
  const draft = useBrowserStorage("localStorage", "atomic-playground-draft", "");

  const updateDraft = (value: string) => {
    if (typeof window !== "undefined") {
      writeBrowserStorage("localStorage", "atomic-playground-draft", value);
    }
  };

  return (
    <LabCard lab={labById["local-draft"]}>
      <StateRow label="server" value="capability denied" tone="pink" />
      <label className="atomic-field">
        <span>browser draft</span>
        <textarea
          value={draft}
          onChange={(event) => updateDraft(event.target.value)}
          placeholder="Write a durable browser draft..."
          rows={5}
        />
      </label>
      <StateRow label="stored bytes" value={String(new TextEncoder().encode(draft).length)} />
    </LabCard>
  );
}

function SessionWizardLab() {
  const storedStep = Number(useBrowserStorage("sessionStorage", "atomic-playground-step", "0"));
  const step = Number.isInteger(storedStep) && storedStep >= 0 && storedStep < wizardSteps.length ? storedStep : 0;

  const advance = () => {
    const next = (step + 1) % wizardSteps.length;
    if (typeof window !== "undefined") writeBrowserStorage("sessionStorage", "atomic-playground-step", String(next));
  };

  return (
    <LabCard lab={labById["session-wizard"]}>
      <ol className="atomic-stepper" aria-label="Checkout progress">
        {wizardSteps.map((label, index) => <li key={label} data-active={index === step}>{label}</li>)}
      </ol>
      <Button label="Advance step" onClick={advance} variant="secondary" />
    </LabCard>
  );
}

function RequestMemoryLab() {
  return (
    <LabCard lab={labById["request-memory"]}>
      <StateRow label="trace cell" value="req_04f2" tone="cyan" />
      <StateRow label="client read" value="capability denied" tone="pink" />
      <p className="atomic-callout">The request context and its memory are discarded after the response.</p>
    </LabCard>
  );
}

function LayeredLab() {
  const [cookiePresent, setCookiePresent] = useState(false);
  const resolved = cookiePresent ? "cookie / compact" : "localStorage / spacious";

  return (
    <LabCard lab={labById["layered-storage"]}>
      <ol className="atomic-layer-list">
        <li data-hit={cookiePresent}><span>1. cookie</span><strong>{cookiePresent ? "compact" : "miss"}</strong></li>
        <li data-hit={!cookiePresent}><span>2. localStorage</span><strong>spacious</strong></li>
        <li><span>3. default</span><strong>comfortable</strong></li>
      </ol>
      <StateRow label="resolved" value={resolved} tone="cyan" />
      <Button
        label={cookiePresent ? "Remove cookie layer" : "Add cookie layer"}
        onClick={() => setCookiePresent((value) => !value)}
        variant="secondary"
      />
    </LabCard>
  );
}

function CodecLab() {
  const [raw, setRaw] = useState('{"version":1,"density":"compact"}');
  const result = useMemo(() => {
    try {
      const parsed = JSON.parse(raw) as { version?: unknown; density?: unknown };
      if (parsed.version !== 1 && parsed.version !== 2) return { ok: false, value: "unsupported version" };
      if (!['compact', 'comfortable', 'spacious'].includes(String(parsed.density))) return { ok: false, value: "invalid density" };
      return { ok: true, value: parsed.version === 1 ? "migrated v1 -> v2" : "decoded v2" };
    } catch {
      return { ok: false, value: "malformed JSON" };
    }
  }, [raw]);

  return (
    <LabCard lab={labById["codec-migration"]}>
      <label className="atomic-field">
        <span>stored envelope</span>
        <textarea value={raw} onChange={(event) => setRaw(event.target.value)} rows={5} spellCheck={false} />
      </label>
      <StateRow label="decode" value={result.value} tone={result.ok ? "cyan" : "pink"} />
      <StateRow label="TTL" value="valid for 30 minutes" />
    </LabCard>
  );
}

function LeaseLab() {
  const [frame, setFrame] = useState(0);
  const current = leaseFrames[frame];

  return (
    <LabCard lab={labById["lease-queue"]}>
      <p className="atomic-timeline-label">{current.label}</p>
      <ol className="atomic-lease-lanes">
        <li><span>READERS</span><strong>{current.readers}</strong></li>
        <li><span>WRITER</span><strong>{current.writer}</strong></li>
        <li><span>LATER READ</span><strong>{current.laterRead}</strong></li>
      </ol>
      <Button
        label={frame === leaseFrames.length - 1 ? "Reset sequence" : "Advance queue"}
        onClick={() => setFrame((value) => (value + 1) % leaseFrames.length)}
        variant="secondary"
      />
    </LabCard>
  );
}

function IdempotencyLab() {
  const [ledger, setLedger] = useState("empty");
  const [status, setStatus] = useState("No operation recorded");

  const run = (fingerprint: "alpha" | "beta") => {
    if (ledger === "empty") {
      setLedger(fingerprint);
      setStatus(`op_792 committed ${fingerprint}`);
      return;
    }
    setStatus(ledger === fingerprint ? "same fingerprint: replayed original success" : "different fingerprint: StorageIdempotencyError");
  };

  return (
    <LabCard lab={labById["idempotency"]}>
      <StateRow label="operation ID" value="op_792" />
      <StateRow label="ledger" value={ledger} />
      <StateRow label="result" value={status} tone={status.includes("Error") ? "pink" : "cyan"} />
      <menu className="atomic-button-row">
        <Button label="Run value alpha" onClick={() => run("alpha")} variant="secondary" />
        <Button label="Run value beta" onClick={() => run("beta")} variant="secondary" />
        <Button label="Clear ledger" onClick={() => { setLedger("empty"); setStatus("No operation recorded"); }} variant="ghost" />
      </menu>
    </LabCard>
  );
}

function FrameworkLab({ id }: { id: "react-external-store" | "vue-reactivity" | "svelte-store" }) {
  const content = {
    "react-external-store": ["getServerSnapshot() -> alpha", "first getSnapshot() -> alpha", "subscribe() -> future writes"],
    "vue-reactivity": ["SSR payload -> alpha", "shallowRef(alpha)", "storage.subscribe -> reactive updates"],
    "svelte-store": ["server value -> alpha", "readable(alpha)", "storage.subscribe -> store updates"],
  }[id];

  return (
    <LabCard lab={labById[id]}>
      <ol className="atomic-code-flow">
        {content.map((line) => <li key={line}>{line}</li>)}
      </ol>
    </LabCard>
  );
}

export function PlaygroundClient() {
  const [filter, setFilter] = useState<FrameworkFilter>("all");
  const [stagedCookie, setStagedCookie] = useState<string | null>(null);
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
      <RequestTrace browserValue="alpha" stagedValue={stagedCookie} />

      <nav className="atomic-filterbar" aria-label="Filter labs by framework">
        <span>FRAMEWORK SIGNAL</span>
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

      <section className="atomic-masonry" aria-label="SSR Storage labs">
        {visible("cookie-bridge") && <CookieLab onStage={setStagedCookie} />}
        {visible("local-draft") && <LocalDraftLab />}
        {visible("session-wizard") && <SessionWizardLab />}
        {visible("request-memory") && <RequestMemoryLab />}
        {visible("layered-storage") && <LayeredLab />}
        {visible("codec-migration") && <CodecLab />}
        {visible("lease-queue") && <LeaseLab />}
        {visible("idempotency") && <IdempotencyLab />}
        {visible("react-external-store") && <FrameworkLab id="react-external-store" />}
        {visible("vue-reactivity") && <FrameworkLab id="vue-reactivity" />}
        {visible("svelte-store") && <FrameworkLab id="svelte-store" />}
      </section>
    </>
  );
}
