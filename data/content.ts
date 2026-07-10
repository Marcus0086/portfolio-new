// Single source of truth for all portfolio copy.
// Commit SHAs are real — latest short SHAs from the referenced repos.

export const siteUrl = "https://portfolio-new.vercel.app";

export type Commit = {
  sha: string;
  side?: boolean;
  head?: boolean;
  pre?: boolean;
  branch?: string;
  msg: string;
  year: string;
  prose: string;
};

export const commits: Commit[] = [
  {
    sha: "0000000",
    pre: true,
    msg: "before code: the transmitter",
    year: "± 2009",
    prose:
      "Before code, there were remote-control cars — taken apart on the floor, never quite reassembled — because somewhere between the transmitter and the wheels was an invisible signal, and I needed to see it. Some kids wanted the toy. I wanted the transmitter.",
  },
  {
    sha: "1e52cd4",
    msg: "root commit: make the phone a server",
    year: "2019",
    prose:
      "My first public repository taught an Android phone to run a full database server inside Termux — because that was the computer in my pocket. The README was rough. It worked. Twenty-nine strangers starred it: the first time something I built helped people I would never meet.",
  },
  {
    sha: "fdecda3",
    side: true,
    branch: "college",
    msg: "sudoku api · toy db · rust regex",
    year: "2021 — 2022",
    prose:
      "College was a branch: apps built with friends, a sudoku API that still answers requests today. Then the experiments turned inward — a toy database in Go, a regex engine in Rust — the same question the RC cars asked, aimed deeper.",
  },
  {
    sha: "9cbbaf8",
    msg: "tars: ship whisper in the browser",
    year: "2023",
    prose:
      "Out of college, into production at Tars: rebuilt the flagship chatbot, shipped Whisper speech recognition straight into the browser. But after three years of building for the web, the work sometimes felt soulless.",
  },
  {
    sha: "82ea071",
    side: true,
    branch: "side/go",
    msg: "burst → etl: down the stack",
    year: "2024",
    prose:
      "So — down the stack, not across it. A reverse proxy written from scratch to learn how a TCP connection becomes an HTTP request. Then containers, queues, and schedulers wired into an ETL system moving ten thousand records a second.",
  },
  {
    sha: "2e466e7",
    head: true,
    branch: "HEAD → now",
    msg: "featurely · arx · tunnel_sh",
    year: "2025 — ∞",
    prose:
      "The working tree today: days as first engineer at Featurely AI, building synthetic minds that run product research in real browsers. Nights on the distributed-systems branch — an encrypted object store in Rust, a remote desktop over WebRTC. Nothing is merged. Everything is in progress.",
  },
];

export type Work = {
  year: string;
  title: string;
  href: string;
  tags: { label: string; live?: boolean }[];
};

export const works: Work[] = [
  {
    year: "2026",
    title: "TUNNEL.SH",
    href: "https://github.com/Marcus0086/tunnel_sh",
    tags: [
      { label: "GO" },
      { label: "WEBRTC" },
      { label: "REMOTE DESKTOP" },
      { label: "IN PROGRESS", live: true },
    ],
  },
  {
    year: "2025",
    title: "ARX",
    href: "https://github.com/Marcus0086/arx",
    tags: [
      { label: "RUST" },
      { label: "ENCRYPTED OBJECT STORE" },
      { label: "FASTCDC" },
      { label: "IN PROGRESS", live: true },
    ],
  },
  {
    year: "2024",
    title: "ETL PIPELINE",
    href: "https://github.com/Marcus0086/formdata-etl_ai",
    tags: [
      { label: "GO" },
      { label: "RABBITMQ" },
      { label: "DOCKER" },
      { label: "10K+ TPS" },
    ],
  },
  {
    year: "2024",
    title: "BURST",
    href: "https://github.com/Marcus0086/Burst",
    tags: [
      { label: "GO" },
      { label: "REVERSE PROXY" },
      { label: "LOAD BALANCING" },
    ],
  },
  {
    year: "2019",
    title: "PHPMYADMIN × TERMUX",
    href: "https://github.com/Marcus0086/phpMyAdmin",
    tags: [
      { label: "FIRST REPO" },
      { label: "ANDROID" },
      { label: "29 STARS" },
    ],
  },
];

export type StoryBeat = { title: string; body: string };

export const story = {
  lead: "Everything I have built started with a message from a stranger.",
  beats: [
    {
      title: "A stranger, a Starbucks, and a dream",
      body: "In late 2024 I left Tars with no plan, just a Reddit thread asking if anyone needed an engineer. A founder from San Francisco messaged me out of nowhere and said he wanted to build something. I was skeptical, but I gave him my number, and for two months I woke in the middle of the night to talk across timezones and build small things with him. In December we finally sat down at a Starbucks in Indiranagar, Bangalore, and sketched a dream: help product teams build products that people actually love.",
    },
    {
      title: "Teaching software to think like a user",
      body: "The first problem nearly broke us. We tried to turn a Figma design into a map of every path a user could take, and it fought us at every step. So I asked a different question. What if software could just try the flow itself, the way a real person would, and what if hundreds of different people, each with their own habits and frustrations, all tried it at once? That became Featurely. The first version was scrappy and beautiful to me, a lone agent fumbling through a webpage while we watched it live and held our breath. I took on Head of Engineering, hired our first engineers and interns, and lived between that Starbucks and a WeWork on Church Street, forgetting to eat, forgetting to drink, locking myself in a room until it worked.",
    },
    {
      title: "The night I rebuilt everything to scale",
      body: "Then it would not scale. One browser per user buckled the moment real usage arrived. I called my teammate late one night and rebuilt the entire architecture before morning, reverse-engineering open tools nobody had bothered to document and fighting cloud limits through more than thirty failed attempts, until a thousand synthetic users could explore a thousand products at the same time. When it finally held, I just sat there, wrecked and grinning.",
    },
    {
      title: "What two years as a founding engineer taught me",
      body: "Quality was the next mountain, so I read about how people think, fast and slow, and taught the system to pause and choose its next move the way a human would. I have lived every season of this company. Three generations of engineers. People I hired, guided, and had to let go. I have been messy, I have been wrong, and I stepped back from managing so I could build again, because building is the thing I love most. As a kid I took apart remote-control cars to find the invisible signal that made them move. I am still chasing that signal, only now it lives in software that watches how people move. I am the first engineer who fueled Featurely into the living codebase it is today, and I am not done.",
    },
  ] satisfies StoryBeat[],
};

export const statements: { text: string; ghost?: boolean }[] = [
  { text: "What is actually happening underneath?" },
  { text: "Down the stack, not across it.", ghost: true },
  { text: "Reliability is designed, not debugged." },
  { text: "Take it apart until it confesses.", ghost: true },
  { text: "Every fix earns a regression test." },
];

export const marqueeA = [
  "PYTHON",
  "TYPESCRIPT",
  "GO",
  "FASTAPI",
  "CELERY",
  "REDIS",
  "POSTGRESQL",
  "REACT",
];

export const marqueeB = [
  "LANGGRAPH",
  "AGENT ORCHESTRATION",
  "RAG",
  "PLAYWRIGHT",
  "AWS",
  "DOCKER",
  "DISTRIBUTED SYSTEMS",
  "STREAMING",
];

export type TimelineEntry = { span: string; role: string; desc: string };

export const timeline: TimelineEntry[] = [
  {
    span: "NOV 2024 — PRESENT",
    role: "FEATURELY AI · FOUNDING ENGINEER",
    desc: "First hire. Built the synthetic user-research platform end to end — census-grounded AI personas driving real browsers, the distributed FastAPI + Celery backend, and the AWS infrastructure behind them.",
  },
  {
    span: "FEB 2023 — NOV 2024",
    role: "TARS · FULL STACK DEVELOPER",
    desc: "Built an event-driven backend for an AI agent spanning web, WhatsApp, and Slack; led the rebuild of the primary web chatbot used across customer deployments.",
  },
  {
    span: "DEC 2021 — JAN 2023",
    role: "TARS · MERN STACK INTERN",
    desc: "Shipped hellotars.com on Next.js with edge caching and incremental static regeneration.",
  },
  {
    span: "2019 — 2023",
    role: "CHANDIGARH UNIVERSITY",
    desc: "Bachelor of Engineering, Computer Science.",
  },
];

export const contact = {
  email: "guptamarcus42@gmail.com",
  linkedin: "https://www.linkedin.com/in/raghav-gupta-4a63341b5/",
  github: "https://github.com/Marcus0086",
};
