type RequestTraceProps = {
  browserValue: string;
  stagedValue: string | null;
};

export function RequestTrace({ browserValue, stagedValue }: RequestTraceProps) {
  const stages = [
    { label: "01 / SERVER READS COOKIE", value: "cookie: workspace=alpha", note: "available in request" },
    { label: "02 / PAGE SENDS VALUE", value: '{ workspace: "alpha" }', note: "safe JSON" },
    { label: "03 / BROWSER STARTS", value: `workspace: ${browserValue}`, note: "same first value" },
    {
      label: "04 / SERVER WRITES COOKIE",
      value: stagedValue ? `Set-Cookie: workspace=${stagedValue}` : "no cookie change",
      note: "response required",
    },
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
