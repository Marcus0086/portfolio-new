# The Featurely Story: Portfolio Copy (Raghav Gupta)

**SEO title:** Raghav Gupta | Founding Engineer & AI Systems Architect
**Meta description:** The story of a founding engineer who built Featurely from a cold DM into an AI platform that runs a thousand synthetic user tests at once.
**Primary keywords:** founding engineer, head of engineering, AI engineer, synthetic users, usability testing, distributed systems, Featurely, Bengaluru, backend, Go, Rust

---

## From a Cold DM to a Thousand Synthetic Users

Everything I have built started with a message from a stranger.

### A stranger, a Starbucks, and a dream

In late 2024 I left Tars with no plan, just a Reddit thread asking if anyone needed an engineer. A founder from San Francisco messaged me out of nowhere and said he wanted to build something. I was skeptical, but I gave him my number, and for two months I woke in the middle of the night to talk across timezones and build small things with him. In December we finally sat down at a Starbucks in Indiranagar, Bangalore, and sketched a dream: help product teams build products that people actually love.

### Teaching software to think like a user

The first problem nearly broke us. We tried to turn a Figma design into a map of every path a user could take, and it fought us at every step. So I asked a different question. What if software could just try the flow itself, the way a real person would, and what if hundreds of different people, each with their own habits and frustrations, all tried it at once? That became Featurely. The first version was scrappy and beautiful to me, a lone agent fumbling through a webpage while we watched it live and held our breath. I took on Head of Engineering, hired our first engineers and interns, and lived between that Starbucks and a WeWork on Church Street, forgetting to eat, forgetting to drink, locking myself in a room until it worked.

### The night I rebuilt everything to scale

Then it would not scale. One browser per user buckled the moment real usage arrived. I called my teammate late one night and rebuilt the entire architecture before morning, reverse-engineering open tools nobody had bothered to document and fighting cloud limits through more than thirty failed attempts, until a thousand synthetic users could explore a thousand products at the same time. When it finally held, I just sat there, wrecked and grinning.

### What two years as a founding engineer taught me

Quality was the next mountain, so I read about how people think, fast and slow, and taught the system to pause and choose its next move the way a human would. I have lived every season of this company. Three generations of engineers. People I hired, guided, and had to let go. I have been messy, I have been wrong, and I stepped back from managing so I could build again, because building is the thing I love most. As a kid I took apart remote-control cars to find the invisible signal that made them move. I am still chasing that signal, only now it lives in software that watches how people move. I am the first engineer who fueled Featurely into the living codebase it is today, and I am not done.

---

## Ready to paste: Next.js metadata (app/layout.tsx)

```ts
export const metadata: Metadata = {
  title: "Raghav Gupta | Founding Engineer & AI Systems Architect",
  description:
    "The story of a founding engineer who built Featurely from a cold DM into an AI platform that runs a thousand synthetic user tests at once.",
  keywords: [
    "Raghav Gupta",
    "founding engineer",
    "head of engineering",
    "AI engineer",
    "forward deployed engineer",
    "backend engineer",
    "synthetic users",
    "usability testing",
    "distributed systems",
    "MCP",
    "agent skills",
    "Featurely",
    "FastAPI",
    "Python",
    "Go",
    "Rust",
    "AWS",
    "Bengaluru",
  ],
  openGraph: {
    title: "Raghav Gupta | Founding Engineer & AI Systems Architect",
    description:
      "From a cold DM to a thousand synthetic users: how I built Featurely from zero.",
    type: "profile",
    url: "https://your-domain.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghav Gupta | Founding Engineer",
    description:
      "From a cold DM to a thousand synthetic users: how I built Featurely from zero.",
  },
};
```

## Ready to paste: JSON-LD Person schema (helps Google build a rich profile)

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Raghav Gupta",
      jobTitle: "Founding Engineer & Head of Engineering",
      worksFor: { "@type": "Organization", name: "Featurely" },
      url: "https://your-domain.com",
      sameAs: [
        "https://www.linkedin.com/in/raghav-gupta-4a63341b5",
        "https://github.com/Marcus0086",
      ],
      knowsAbout: [
        "AI agents",
        "MCP",
        "agent skills",
        "synthetic users",
        "usability testing",
        "distributed systems",
        "FastAPI",
        "Celery",
        "AWS",
        "Python",
        "Go",
        "Rust",
      ],
      description:
        "Founding engineer who built Featurely, an AI platform that runs synthetic user tests on real browsers at scale.",
    }),
  }}
/>
```

## How to drop it into your site

1. Add the prose to `data/content.ts` as a `story` block (heading, lead, and the four beats), then render a new `<Story>` section between `<Philosophy>` and `<Works>` in `app/page.tsx`.
2. Replace the `metadata` export in `app/layout.tsx` with the block above (swap `your-domain.com` for your real URL).
3. Paste the JSON-LD `<script>` inside `<body>` in `app/layout.tsx`.

SEO notes: the story leads with a keyword-rich H2 and uses H3 beats so crawlers see structure, real prose on the page (your current site is very sparse text, which hurts ranking), and a Person schema so search engines can connect your name to Featurely, your roles, and your links. The copy contains zero em dashes and stays human.
