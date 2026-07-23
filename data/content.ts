// Single source of truth for all portfolio copy.
// Commit SHAs are real. They are the latest short SHAs from the referenced repos.

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
      "I started by taking remote-control cars apart on the floor. I wanted to know how the transmitter made the wheels move. I did not always put them back together. That habit stayed. I still open systems until I understand what is actually running underneath.",
  },
  {
    sha: "1e52cd4",
    msg: "root commit: make the phone a server",
    year: "2019",
    prose:
      "In 2019, the computer I always had was an Android phone. So I made it run phpMyAdmin and a database server inside Termux. The README was rough. The code worked. Twenty-nine people starred it. That was the first time something I built helped people I had never met.",
  },
  {
    sha: "fdecda3",
    side: true,
    branch: "college",
    msg: "sudoku api · toy db · rust regex",
    year: "2021 / 2022",
    prose:
      "During college I built apps with friends and shipped a Sudoku API that still answers requests. Then I went lower. I wrote a small database in Go and a regex engine in Rust. Using a library was not enough. I wanted to know how the library worked.",
  },
  {
    sha: "9cbbaf8",
    msg: "tars: ship whisper in the browser",
    year: "2023",
    prose:
      "After college I joined Tars. I rebuilt its main web chatbot and shipped Whisper speech recognition in the browser. This was production work with real customers. It taught me how quickly a clean component becomes a messy system once users, old APIs, and deadlines enter the room.",
  },
  {
    sha: "82ea071",
    side: true,
    branch: "side/go",
    msg: "burst → etl: down the stack",
    year: "2024",
    prose:
      "I wanted stronger backend fundamentals. So I built Burst, a reverse proxy in Go, to learn how a TCP connection becomes an HTTP request. Then I built a distributed ETL pipeline with containers, RabbitMQ, workers, and schedulers. It moved more than 10,000 records per second.",
  },
  {
    sha: "2e466e7",
    head: true,
    branch: "HEAD → now",
    msg: "featurely · arx · tunnel_sh",
    year: "2025 / NOW",
    prose:
      "Today I am the founding engineer at Featurely. I build AI agents that use real browsers, the FastAPI and Celery backend that coordinates them, and the AWS systems that keep them running. Outside work I am building an encrypted object store in Rust, a WebRTC remote desktop in Go, and Atomic for SSR storage. I like hard systems. I keep building them.",
  },
];

export type Work = {
  year: string;
  title: string;
  href: string;
  description: string;
  external?: boolean;
  tags: { label: string; live?: boolean }[];
};

export const works: Work[] = [
  {
    year: "2026",
    title: "ATOMIC",
    href: "/playground",
    description: "Type-safe storage for React, Next.js, Vue, Nuxt, and Svelte. Read cookies on the server, start the browser with the same value, and keep writes in order.",
    external: false,
    tags: [
      { label: "TYPESCRIPT" },
      { label: "SSR STORAGE" },
      { label: "MULTI-FRAMEWORK" },
      { label: "PLAYGROUND", live: true },
    ],
  },
  {
    year: "2025",
    title: "ARX",
    href: "https://github.com/Marcus0086/arx",
    description: "An encrypted object store written in Rust. Content-defined chunking removes duplicate data before encrypted objects are stored.",
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
    description: "A distributed ETL pipeline in Go with RabbitMQ, Docker, workers, and schedulers. It processes more than 10,000 records per second.",
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
    description: "A reverse proxy built from scratch in Go to understand HTTP routing, load balancing, connection handling, and failure recovery.",
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
    description: "A way to run phpMyAdmin and a database server on Android through Termux. My first public repository and my first 29 stars.",
    tags: [
      { label: "FIRST REPO" },
      { label: "ANDROID" },
      { label: "29 STARS" },
    ],
  },
];

export type StoryBeat = { title: string; body: string };

export const story = {
  lead: "People have ideas. I like the part where the idea has to survive real users.",
  beats: [
    {
      title: "A Reddit message became Featurely",
      body: "In late 2024, I left Tars and posted on Reddit asking if anyone needed an engineer. A founder from San Francisco replied. For the next two months, I woke up for 3 AM calls. We built small experiments, argued about the bad ones, and kept the useful parts. In December, we met at a Starbucks in Indiranagar, Bengaluru. That is where Featurely started. The problem was easy to explain: product teams needed useful feedback before shipping. Building software that could test a product like a real person was the hard part.",
    },
    {
      title: "We stopped mapping screens and opened a browser",
      body: "We first tried to turn a Figma file into every path a user could take. It was the wrong fight. Designs show screens. They do not show hesitation, broken flows, slow pages, or the button a real user will ignore. So we changed the question. What if an AI agent opened the product and used it? The first version was one agent clicking through one webpage while we watched. Then I added different user goals, habits, and frustrations. The agent stopped following a fixed script and started making decisions. That became the core of Featurely.",
    },
    {
      title: "The prototype worked. Production was another problem",
      body: "People build MVPs. AI can help prototypes. But architecture? That is the heart. The blueprint of a production system. Let us take an example of real load. One browser per synthetic user worked in the demo. At 100 concurrent users, the system started choking. We needed 1,000. I called my teammate and spent the night pulling the backend apart. We fought AWS limits, reverse-engineered tools with almost no documentation, and failed more than thirty deployments. By morning, 1,000 synthetic users could explore 1,000 products at the same time. That is the work I love. Not the demo. The system that stays alive after the demo gets traffic.",
    },
    {
      title: "I tried management. I came back to the code",
      body: "As founding engineer, I did more than write software. I hired engineers, mentored interns, ran projects, and made hard calls when things did not work. I learned a lot. I also moved too far from the part I am best at. Building. So I stepped back from management and returned to the code. Now I work on agent behavior, distributed browser execution, backend reliability, and the infrastructure around it. I still take systems apart to understand them. The parts are just bigger now.",
    },
  ] satisfies StoryBeat[],
};

export const statements: { text: string; ghost?: boolean }[] = [
  { text: "The demo is not the system." },
  { text: "What breaks when real users arrive?", ghost: true },
  { text: "Build it. Load it. Break it. Fix it." },
  { text: "Read the source. Find the lie.", ghost: true },
  { text: "If it fails twice, it gets a test." },
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
    span: "NOV 2024 / PRESENT",
    role: "FEATURELY AI · FOUNDING ENGINEER",
    desc: "First engineer. Built AI agents that test products in real browsers, the FastAPI and Celery backend that runs them, and the AWS infrastructure that scales them to 1,000 concurrent users.",
  },
  {
    span: "FEB 2023 / NOV 2024",
    role: "TARS · FULL STACK DEVELOPER",
    desc: "Built an event-driven backend for an AI agent across web, WhatsApp, and Slack. Led the rebuild of the main customer-facing chatbot.",
  },
  {
    span: "DEC 2021 / JAN 2023",
    role: "TARS · MERN STACK INTERN",
    desc: "Built and shipped hellotars.com with Next.js, edge caching, and incremental static regeneration.",
  },
  {
    span: "2019 / 2023",
    role: "CHANDIGARH UNIVERSITY",
    desc: "Bachelor of Engineering, Computer Science.",
  },
];

export const contact = {
  email: "guptamarcus42@gmail.com",
  linkedin: "https://www.linkedin.com/in/raghav-gupta-4a63341b5/",
  github: "https://github.com/Marcus0086",
};
