"use client";

import { Button } from "@astryxdesign/core";
import { useState } from "react";

export function CodeBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <figure className="atomic-code-block">
      <figcaption>
        <span>{label}</span>
        <Button label={copied ? "Copied" : "Copy code"} onClick={copy} variant="ghost" size="sm" />
      </figcaption>
      <pre><code>{code}</code></pre>
    </figure>
  );
}

