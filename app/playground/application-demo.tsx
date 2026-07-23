"use client";

import { Button } from "@astryxdesign/core";
import { useCell, useCellValue } from "@ssr-storage/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { setActiveApplication } from "./actions";
import {
  applicationDraftCell,
  applicationIdCell,
  applicationStepCell,
  type ApplicationStep,
} from "./storage";

const steps: Array<{ id: ApplicationStep; label: string }> = [
  { id: "role", label: "Choose role" },
  { id: "experience", label: "Add experience" },
  { id: "review", label: "Review" },
];

export type ApplicationDemoProps = {
  serverApplicationId: string;
  snapshotApplicationId: string;
  requestTrace: string;
};

export function ApplicationDemo({
  serverApplicationId,
  snapshotApplicationId,
  requestTrace,
}: ApplicationDemoProps) {
  const router = useRouter();
  const clientApplicationId = useCellValue(applicationIdCell);
  const [draft, setDraft] = useCell(applicationDraftCell);
  const [step, setStep] = useCell(applicationStepCell);
  const [isPending, startTransition] = useTransition();
  const [actionError, setActionError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState("No cookie has been written in this visit.");
  const pendingApplication = useRef<string | null>(null);

  useEffect(() => {
    if (pendingApplication.current === serverApplicationId) {
      setConfirmation(`Server read ${serverApplicationId} from the new request cookie.`);
      pendingApplication.current = null;
    }
  }, [serverApplicationId]);

  const switchApplication = () => {
    const nextId = serverApplicationId === "APP-1001" ? "APP-2042" : "APP-1001";
    setActionError(null);
    setConfirmation(`Writing ${nextId} in a Server Action...`);
    pendingApplication.current = nextId;

    startTransition(async () => {
      try {
        await setActiveApplication(nextId);
        router.refresh();
      } catch (error) {
        pendingApplication.current = null;
        setConfirmation("The server did not confirm a cookie write.");
        setActionError(error instanceof Error ? error.message : "Cookie write failed.");
      }
    });
  };

  const moveStep = (next: ApplicationStep) => {
    void setStep(next);
  };

  const updateDraft = (patch: Partial<typeof draft>) => {
    void setDraft({ ...draft, ...patch });
  };

  const clearDraft = () => {
    void setDraft({ role: "Backend Engineer", experience: "" });
  };

  return (
    <section id="application-demo" className="atomic-application scroll-mt-24" aria-labelledby="application-demo-title">
      <header className="atomic-application-header">
        <span>ONE WORKFLOW / FOUR STORAGE RULES</span>
        <h2 id="application-demo-title">Apply for a backend engineering role.</h2>
        <p>
          The server needs an application ID before it renders. Your unfinished answer can stay in this
          browser. Your current step belongs to this tab. The request ID should disappear after one request.
        </p>
      </header>

      <div className="atomic-application-grid">
        <section className="atomic-form-panel" aria-label="Job application form">
          <ol className="atomic-stepper" aria-label="Application progress">
            {steps.map((item) => (
              <li key={item.id} data-active={step === item.id}>{item.label}</li>
            ))}
          </ol>

          {step === "role" ? (
            <div className="atomic-form-step">
              <label className="atomic-field">
                <span>Role</span>
                <select value={draft.role} onChange={(event) => updateDraft({ role: event.target.value })}>
                  <option>Backend Engineer</option>
                  <option>AI Systems Engineer</option>
                  <option>Founding Engineer</option>
                </select>
              </label>
              <Button label="Continue to experience" onClick={() => moveStep("experience")} variant="secondary" />
            </div>
          ) : null}

          {step === "experience" ? (
            <div className="atomic-form-step">
              <label className="atomic-field">
                <span>What production system have you built?</span>
                <textarea
                  value={draft.experience}
                  onChange={(event) => updateDraft({ experience: event.target.value })}
                  placeholder="Explain the load, what broke, and what you changed."
                  rows={8}
                />
              </label>
              <div className="atomic-button-row">
                <Button label="Back" onClick={() => moveStep("role")} variant="ghost" />
                <Button label="Review application" onClick={() => moveStep("review")} variant="secondary" />
              </div>
            </div>
          ) : null}

          {step === "review" ? (
            <div className="atomic-form-step">
              <dl className="atomic-review-list">
                <div><dt>Application</dt><dd>{serverApplicationId}</dd></div>
                <div><dt>Role</dt><dd>{draft.role}</dd></div>
                <div><dt>Experience</dt><dd>{draft.experience || "No answer yet"}</dd></div>
              </dl>
              <div className="atomic-button-row">
                <Button label="Edit answer" onClick={() => moveStep("experience")} variant="ghost" />
                <Button label="Clear browser draft" onClick={clearDraft} variant="secondary" />
              </div>
            </div>
          ) : null}
        </section>

        <aside className="atomic-storage-inspector" aria-label="Where the application data is stored">
          <header>
            <span>LIVE STORAGE INSPECTOR</span>
            <Button
              label={isPending ? "Writing cookie..." : "Switch application on server"}
              onClick={switchApplication}
              isDisabled={isPending}
              variant="secondary"
            />
          </header>

          <dl>
            <div data-storage="cookie">
              <dt>Cookie</dt>
              <dd><strong>{serverApplicationId}</strong><span>Server and browser / 30 days</span></dd>
            </div>
            <div data-storage="snapshot">
              <dt>Page snapshot</dt>
              <dd><strong>{snapshotApplicationId}</strong><span>First browser render</span></dd>
            </div>
            <div data-storage="localStorage">
              <dt>localStorage</dt>
              <dd><strong>{new TextEncoder().encode(JSON.stringify(draft)).length} bytes</strong><span>Browser only / survives reload</span></dd>
            </div>
            <div data-storage="sessionStorage">
              <dt>sessionStorage</dt>
              <dd><strong>{step}</strong><span>Browser tab only</span></dd>
            </div>
            <div data-storage="requestMemory">
              <dt>Request memory</dt>
              <dd><strong>{requestTrace}</strong><span>Server only / one request</span></dd>
            </div>
          </dl>

          <p className="atomic-confirmation" aria-live="polite">{confirmation}</p>
          <p className="atomic-client-value">Browser cookie value: <strong>{clientApplicationId}</strong></p>
          {actionError ? <p className="atomic-callout" role="alert">{actionError}</p> : null}
        </aside>
      </div>
    </section>
  );
}
