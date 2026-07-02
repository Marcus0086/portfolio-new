// Single source of truth for all portfolio copy.
// Commit SHAs are real — latest short SHAs from the referenced repos.

export type Commit = {
  sha: string
  side?: boolean
  head?: boolean
  pre?: boolean
  branch?: string
  msg: string
  year: string
  prose: string
}

export const commits: Commit[] = [
  {
    sha: '0000000',
    pre: true,
    msg: 'before code: the transmitter',
    year: '± 2009',
    prose:
      'Before code, there were remote-control cars — taken apart on the floor, never quite reassembled — because somewhere between the transmitter and the wheels was an invisible signal, and I needed to see it. Some kids wanted the toy. I wanted the transmitter.',
  },
  {
    sha: '1e52cd4',
    msg: 'root commit: make the phone a server',
    year: '2019',
    prose:
      'My first public repository taught an Android phone to run a full database server inside Termux — because that was the computer in my pocket. The README was rough. It worked. Twenty-nine strangers starred it: the first time something I built helped people I would never meet.',
  },
  {
    sha: 'fdecda3',
    side: true,
    branch: 'college',
    msg: 'sudoku api · toy db · rust regex',
    year: '2021 — 2022',
    prose:
      'College was a branch: apps built with friends, a sudoku API that still answers requests today. Then the experiments turned inward — a toy database in Go, a regex engine in Rust — the same question the RC cars asked, aimed deeper.',
  },
  {
    sha: '9cbbaf8',
    msg: 'tars: ship whisper in the browser',
    year: '2023',
    prose:
      'Out of college, into production at Tars: rebuilt the flagship chatbot, shipped Whisper speech recognition straight into the browser. But after three years of building for the web, the work sometimes felt soulless.',
  },
  {
    sha: '82ea071',
    side: true,
    branch: 'side/go',
    msg: 'burst → etl: down the stack',
    year: '2024',
    prose:
      'So — down the stack, not across it. A reverse proxy written from scratch to learn how a TCP connection becomes an HTTP request. Then containers, queues, and schedulers wired into an ETL system moving ten thousand records a second.',
  },
  {
    sha: '2e466e7',
    head: true,
    branch: 'HEAD → now',
    msg: 'featurely · arx · tunnel_sh',
    year: '2025 — ∞',
    prose:
      'The working tree today: days as first engineer at Featurely AI, building synthetic minds that run product research in real browsers. Nights on the distributed-systems branch — an encrypted object store in Rust, a remote desktop over WebRTC. Nothing is merged. Everything is in progress.',
  },
]

export type Work = {
  year: string
  title: string
  href: string
  tags: { label: string; live?: boolean }[]
}

export const works: Work[] = [
  {
    year: '2026',
    title: 'TUNNEL.SH',
    href: 'https://github.com/Marcus0086/tunnel_sh',
    tags: [
      { label: 'GO' },
      { label: 'WEBRTC' },
      { label: 'REMOTE DESKTOP' },
      { label: 'IN PROGRESS', live: true },
    ],
  },
  {
    year: '2025',
    title: 'ARX',
    href: 'https://github.com/Marcus0086/arx',
    tags: [
      { label: 'RUST' },
      { label: 'ENCRYPTED OBJECT STORE' },
      { label: 'FASTCDC' },
      { label: 'IN PROGRESS', live: true },
    ],
  },
  {
    year: '2024',
    title: 'ETL PIPELINE',
    href: 'https://github.com/Marcus0086/formdata-etl_ai',
    tags: [{ label: 'GO' }, { label: 'RABBITMQ' }, { label: 'DOCKER' }, { label: '10K+ TPS' }],
  },
  {
    year: '2024',
    title: 'BURST',
    href: 'https://github.com/Marcus0086/Burst',
    tags: [{ label: 'GO' }, { label: 'REVERSE PROXY' }, { label: 'LOAD BALANCING' }],
  },
  {
    year: '2019',
    title: 'PHPMYADMIN × TERMUX',
    href: 'https://github.com/Marcus0086/phpMyAdmin',
    tags: [{ label: 'FIRST REPO' }, { label: 'ANDROID' }, { label: '29 STARS' }],
  },
]

export const statements: { text: string; ghost?: boolean }[] = [
  { text: 'What is actually happening underneath?' },
  { text: 'Down the stack, not across it.', ghost: true },
  { text: 'Reliability is designed, not debugged.' },
  { text: 'Take it apart until it confesses.', ghost: true },
  { text: 'Every fix earns a regression test.' },
]

export const marqueeA = ['PYTHON', 'TYPESCRIPT', 'GO', 'FASTAPI', 'CELERY', 'REDIS', 'POSTGRESQL', 'REACT']

export const marqueeB = [
  'LANGGRAPH',
  'AGENT ORCHESTRATION',
  'RAG',
  'PLAYWRIGHT',
  'AWS',
  'DOCKER',
  'DISTRIBUTED SYSTEMS',
  'STREAMING',
]

export type TimelineEntry = { span: string; role: string; desc: string }

export const timeline: TimelineEntry[] = [
  {
    span: 'NOV 2024 — PRESENT',
    role: 'FEATURELY AI · FOUNDING ENGINEER',
    desc: 'First hire. Built the synthetic user-research platform end to end — census-grounded AI personas driving real browsers, the distributed FastAPI + Celery backend, and the AWS infrastructure behind them.',
  },
  {
    span: 'FEB 2023 — NOV 2024',
    role: 'TARS · FULL STACK DEVELOPER',
    desc: 'Built an event-driven backend for an AI agent spanning web, WhatsApp, and Slack; led the rebuild of the primary web chatbot used across customer deployments.',
  },
  {
    span: 'DEC 2021 — JAN 2023',
    role: 'TARS · MERN STACK INTERN',
    desc: 'Shipped hellotars.com on Next.js with edge caching and incremental static regeneration.',
  },
  {
    span: '2019 — 2023',
    role: 'CHANDIGARH UNIVERSITY',
    desc: 'Bachelor of Engineering, Computer Science.',
  },
]

export const contact = {
  email: 'guptamarcus42@gmail.com',
  linkedin: 'https://www.linkedin.com/in/raghav-gupta-4a63341b5/',
  github: 'https://github.com/Marcus0086',
}
