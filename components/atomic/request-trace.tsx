type RequestTraceProps = {
  serverApplicationId: string;
  snapshotApplicationId: string;
  requestTrace: string;
};

export function RequestTrace({ serverApplicationId, snapshotApplicationId, requestTrace }: RequestTraceProps) {
  const stages = [
    { label: "01 / REQUEST ARRIVES", value: `cookie: ${serverApplicationId}`, note: "server can read" },
    { label: "02 / REQUEST MEMORY", value: requestTrace, note: "one request" },
    { label: "03 / PAGE SENDS SNAPSHOT", value: `application: ${snapshotApplicationId}`, note: "safe JSON" },
    { label: "04 / BROWSER STARTS", value: `application: ${snapshotApplicationId}`, note: "same first value" },
  ];

  return (
    <section className="atomic-trace" aria-label="How a cookie moves from the server to the browser">
      {stages.map((stage, index) => (
        <article className="atomic-trace-stage" key={stage.label}>
          <header>
            <span>{stage.label}</span>
            <span>{stage.note}</span>
          </header>
          <strong>{stage.value}</strong>
          {index < stages.length - 1 ? <span className="atomic-trace-arrow" aria-hidden>→</span> : null}
        </article>
      ))}
    </section>
  );
}
