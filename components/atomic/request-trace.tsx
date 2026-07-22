type RequestTraceProps = {
  browserValue: string;
  stagedValue: string | null;
};

export function RequestTrace({ browserValue, stagedValue }: RequestTraceProps) {
  const stages = [
    { label: "01 / SERVER REQUEST", value: "cookie: workspace=alpha", note: "read authority" },
    { label: "02 / SAFE SNAPSHOT", value: '{ workspace: "alpha" }', note: "serialized transfer" },
    { label: "03 / FIRST RENDER", value: `workspace: ${browserValue}`, note: "hydration match" },
    {
      label: "04 / RESPONSE EFFECT",
      value: stagedValue ? `Set-Cookie: workspace=${stagedValue}` : "no staged mutation",
      note: "commit authority",
    },
  ];

  return (
    <section className="atomic-trace" aria-label="SSR storage request trace">
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

