import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const copyFiles = [
  "app/layout.tsx",
  "app/opengraph-image.tsx",
  "app/playground/page.tsx",
  "app/playground/playground-client.tsx",
  "app/playground/docs/page.tsx",
  "components/footer.tsx",
  "components/git-graph.tsx",
  "components/hero.tsx",
  "components/marquee.tsx",
  "components/philosophy.tsx",
  "components/story.tsx",
  "components/timeline.tsx",
  "components/works.tsx",
  "components/atomic/playground-shell.tsx",
  "components/atomic/docs-outline.tsx",
  "components/atomic/lab-card.tsx",
  "components/atomic/request-trace.tsx",
  "data/atomic.ts",
  "data/content.ts",
];

test("public copy contains no em dashes or vague portfolio language", () => {
  const copy = copyFiles.map(read).join("\n");

  assert.doesNotMatch(copy, /\u2014/);
  assert.doesNotMatch(
    copy,
    /Stream of Consciousness|Distortion Gallery|Technical Arsenal|Tools of Extraction|The Chronology|TRANSMISSION|ON THIS SIGNAL|READ CONTRACT|core contract|architecture nearly broke us|beautiful to me|quality was the next mountain/i,
  );
});

test("homepage copy names the person, role, work, and location", () => {
  const layout = read("app/layout.tsx");
  const hero = read("components/hero.tsx");
  const content = read("data/content.ts");

  assert.match(hero, /RAGHAV/);
  assert.match(hero, /GUPTA/);
  assert.match(hero, /FOUNDING ENGINEER/);
  assert.match(hero, /AI SYSTEMS/);
  assert.match(layout, /Founding Engineer, AI and Backend Systems/);
  assert.match(layout, /Bengaluru/);
  assert.match(layout, /"@type": "ProfilePage"/);
  assert.match(content, /People build MVPs/);
  assert.match(content, /description: "/);
});

test("Atomic starts with a plain problem and solution", () => {
  const playground = read("app/playground/page.tsx");
  const docs = read("app/playground/docs/page.tsx");

  assert.match(playground, /Server rendering happens before browser storage exists/);
  assert.match(playground, /Atomic gives each value one typed API/);
  assert.doesNotMatch(playground, /runtime boundary|legal operations|expose the boundary/i);
  assert.match(docs, /A server and a browser cannot access the same storage in the same way/);
  assert.doesNotMatch(docs, /typed meaning|advertise capabilities|authority to act/i);
});

test("every project explains what was built", () => {
  const content = read("data/content.ts");
  const works = read("components/works.tsx");

  assert.match(content, /description: "Type-safe storage/);
  assert.match(content, /description: "A self-hosted remote desktop/);
  assert.match(content, /description: "An encrypted object store/);
  assert.match(works, /work\.description/);
});
