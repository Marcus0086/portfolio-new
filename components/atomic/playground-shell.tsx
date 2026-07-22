import Link from "next/link";

type PlaygroundShellProps = {
  active: "labs" | "docs";
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
};

export function PlaygroundShell({
  active,
  eyebrow,
  title,
  intro,
  children,
}: PlaygroundShellProps) {
  return (
    <main className="atomic-page min-h-screen pb-24">
      <header className="atomic-topbar">
        <Link href="/" className="atomic-wordmark">
          <span className="atomic-signal-dot" aria-hidden />
          RAGHAV / ATOMIC
        </Link>
        <nav className="atomic-route-tabs" aria-label="Atomic sections">
          <Link data-active={active === "labs"} href="/playground">
            LABS
          </Link>
          <Link data-active={active === "docs"} href="/playground/docs">
            DOCS
          </Link>
          <a href="https://github.com/Marcus0086/atomic" target="_blank" rel="noopener noreferrer">
            SOURCE ↗
          </a>
        </nav>
      </header>

      <section className="atomic-hero">
        <p className="atomic-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="atomic-intro">{intro}</p>
      </section>

      {children}
    </main>
  );
}

