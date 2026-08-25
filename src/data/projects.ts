export interface OriginStory {
  frustration: string;
  solution: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  slug: string;
  techStack: string[];
  featured: boolean;
  category: "Systems" | "AI/ML" | "Full-Stack" | "Security" | "Research" | "Open-Source" | "Moonshot";
  githubUrl: string;
  liveUrl: string;
  metrics: string[];
  isOpenSource: boolean;
  prNumber?: string;
  originStory?: OriginStory;
}

export const projects: Project[] = [
  // ═══════════════════════════════════════════════════
  // THE FEATURED SIX (Top Tier)
  // ═══════════════════════════════════════════════════
  {
    id: 1,
    title: "Tinexus Platform",
    description: "Wayland Compositor & Linux Desktop Shell (Active Work in Progress)",
    longDescription:
      "A Wayland compositor and desktop shell built from scratch in C++20. Currently in active development, but fully functional. Sub-150MB RAM, sub-100ms launcher latency. Features direct wlroots integration, a Qt6 panel, D-Bus IPC services, and a damage-tracked rendering pipeline.",
    slug: "tinexus",
    techStack: ["C++20", "wlroots", "Qt6", "D-Bus", "Wayland", "Meson"],
    featured: true,
    category: "Systems",
    githubUrl: "https://github.com/itzabhishekgour/TinexusShell",
    liveUrl: "",
    metrics: [
      "Active Work in Progress - Core Compositor Functional",
      "Custom Wayland compositor from scratch",
      "Qt6 panel & app launcher",
      "D-Bus IPC integration",
      "Sub-150MB RAM memory footprint",
    ],
    isOpenSource: false,
    originStory: {
      frustration: "I wanted to understand Linux at the lowest level: how windows are drawn, how input is processed. Every tutorial stopped at 'use a library.' Nobody explained what happens beneath.",
      solution: "So I built the entire desktop shell from scratch: a Wayland compositor, a Qt6 panel, and D-Bus IPC. The full stack from framebuffer to taskbar.",
    },
  },
  {
    id: 2,
    title: "DNA Lang & Ribosome",
    description: "Custom Programming Language & LLVM Compiler",
    longDescription:
      "A custom compiled language with its reference Ribosome compiler targeting LLVM 18 IR. Features a hand-written lexer, Pratt parser, custom 3-Address Code (3AC) IR, and Microsoft x64 ABI code generation that emits native Windows .exe binaries.",
    slug: "dna-lang",
    techStack: ["C++", "LLVM", "CMake", "Assembly"],
    featured: true,
    category: "Systems",
    githubUrl: "https://github.com/itzabhishekgour/dna-lang",
    liveUrl: "https://github.com/itzabhishekgour/dna-lang/releases/tag/v0.2.0-alpha",
    metrics: [
      "v0.2.0 Alpha public release",
      "157-case automated test suite & fuzzer",
      "Pratt parser + LLVM 18 backend",
      "Native Windows x64 .exe emission",
    ],
    isOpenSource: false,
    originStory: {
      frustration: "Reading compiler theory was not enough: I had to build one. Every 'intro to compilers' course hand-waved code generation and ABI calling conventions.",
      solution: "I wrote a full programming language from scratch: hand-written lexer, Pratt parser, 3AC IR, and LLVM backend that outputs native Windows executables.",
    },
  },
  {
    id: 3,
    title: "Tinu's-QPU",
    description: "Base-4 Processor Architecture Blueprint",
    longDescription:
      "A post-binary processor architecture using Base-4 (quaternary) logic instead of traditional binary. Includes formal proofs for Multi-Valued Logic (MVL) gates, complete ISA specification, ALU blueprints, and memory subsystem design.",
    slug: "tinus-qpu",
    techStack: ["Research", "MVL", "Formal Proofs", "Digital Logic", "LaTeX"],
    featured: true,
    category: "Research",
    githubUrl: "https://github.com/itzabhishekgour/tinus-qpu-arch",
    liveUrl: "https://itzabhishekgour.github.io/tinus-qpu-arch/",
    metrics: [
      "Base-4 quaternary logic gates",
      "Complete ISA specification",
      "Formal correctness proofs",
      "Live Interactive Specification",
    ],
    isOpenSource: false,
    originStory: {
      frustration: "I tried to hack my Intel i3 to recognize 4 voltage states. I nearly fried it. Binary felt like a ceiling: why are we still stuck with 0s and 1s?",
      solution: "I designed a processor architecture that actually runs on Base-4: formal proofs for MVL gates, a complete ISA, and ALU blueprints.",
    },
  },
  {
    id: 4,
    title: "Smriti",
    description: "Context-Aware Secrets Vault",
    longDescription:
      "I kept losing API keys across two laptops. Smriti stores them with context: where they came from, why, and when they expire. Encrypted with AES-256-GCM, private AI context search, and password+OTP magic links.",
    slug: "smriti",
    techStack: ["Java", "Spring Boot", "React", "Gemini AI", "AES-256", "PostgreSQL"],
    featured: true,
    category: "Security",
    githubUrl: "https://github.com/itzabhishekgour/smriti",
    liveUrl: "https://smriti-40gk.onrender.com/",
    metrics: [
      "Live production deployment on Render",
      "AES-256-GCM encryption at rest",
      "Role-based access control (RBAC)",
      "Zero-secret Gemini AI integration",
    ],
    isOpenSource: false,
    originStory: {
      frustration: "I work across two laptops. Every time I cloned a project, I had to hunt down missing .env files: scattered across devices, forgotten keys. I lost an entire day once to a missing database key.",
      solution: "I built Smriti to store secrets with their origin story. AES-256-GCM encrypted, private Gemini search, and 2FA magic links for sharing.",
    },
  },
  {
    id: 5,
    title: "TinexusFlow",
    description: "Tree-Structured Conversation Navigation Engine",
    longDescription:
      "TinexusFlow turns AI chats into a tree. Branch into any tangent, explore it, and jump back to your original thread without losing context. Built with React Flow, Spring Boot 3.5+, and selective context pruning so sibling branches never pollute the LLM prompt.",
    slug: "tinexusflow",
    techStack: ["React", "Spring Boot", "WebSockets", "PostgreSQL"],
    featured: true,
    category: "Full-Stack",
    githubUrl: "https://github.com/itzabhishekgour/tinexusflow",
    liveUrl: "https://tinexusflow-frontend.onrender.com/",
    metrics: [
      "Live deployment on Render",
      "Real-time WebSocket communication",
      "Branching dialogue trees",
      "Materialized path navigation",
    ],
    isOpenSource: false,
    originStory: {
      frustration: "I asked an AI 'How does Wayland work?' The answer mentioned X11. My chat history became a jumbled mess of two different topics. Linear conversations are broken.",
      solution: "I built a conversation engine that supports branching: fork any dialogue into separate threads, explore different paths, and jump back without context pollution.",
    },
  },
  {
    id: 6,
    title: "VoxPulse",
    description: "Custom Wake Word Detection Library (PyPI)",
    longDescription:
      "A lightweight, offline custom wake-word library for Python published on PyPI. Uses a 2D CNN compiled to TensorFlow Lite with RMS silence gating so CPU drops to ~0% when the room is quiet. Train any custom wake word in 5 minutes.",
    slug: "voxpulse",
    techStack: ["Python", "TensorFlow Lite", "PyPI", "NumPy", "Librosa"],
    featured: true,
    category: "AI/ML",
    githubUrl: "https://github.com/itzabhishekgour/VoxPulse",
    liveUrl: "https://pypi.org/project/voxpulse/",
    metrics: [
      "Published on PyPI",
      "TFLite edge inference",
      "Custom wake word training",
      "RMS silence gating (~0% idle CPU)",
    ],
    isOpenSource: false,
    originStory: {
      frustration: "Every wake word tool forced me to use 'Alexa' or 'Hey Google', or pay hundreds of dollars for a custom one. I wanted my own custom wake word, offline and free.",
      solution: "I built a lightweight wake word library with TFLite, automatic audio augmentation, and RMS silence gating, and published it to PyPI.",
    },
  },

  // ═══════════════════════════════════════════════════
  // OPEN SOURCE CONTRIBUTION
  // ═══════════════════════════════════════════════════
  {
    id: 7,
    title: "Google Closure Compiler",
    description: "Bug Fix (Merged PR #4333)",
    longDescription:
      "Fixed a NullPointerException in the InlineObjectLiterals compiler pass of Google's Closure Compiler. Traced the root cause, wrote JUnit regression tests, passed Google's full CI pipeline, signed the Google CLA, and merged to production.",
    slug: "google-closure",
    techStack: ["Java", "Google CI", "JUnit", "JavaScript"],
    featured: false,
    category: "Open-Source",
    githubUrl: "https://github.com/google/closure-compiler/pull/4333",
    liveUrl: "",
    metrics: [
      "Fixed NPE in InlineObjectLiterals",
      "Passed Google CI pipeline",
      "Signed Google CLA",
      "Merged to production",
    ],
    isOpenSource: true,
    prNumber: "#4333",
    originStory: {
      frustration: "I found a NullPointerException in Google's Closure Compiler while testing edge cases. Production code used by millions had a bug. I couldn't just file an issue and walk away.",
      solution: "I traced the root cause in InlineObjectLiterals, wrote the fix with regression tests, passed Google's full CI pipeline, signed the CLA, and submitted PR #4333.",
    },
  },

  // ═══════════════════════════════════════════════════
  // OTHER WORK (Secondary Grid)
  // ═══════════════════════════════════════════════════
  {
    id: 8,
    title: "AguAI",
    description: "Autonomous Multi-Agent AI Development Workforce",
    longDescription:
      "A multi-agent development engine built in Java 21 and Spring Boot 3.x. Give it a text brief, and specialized AI agents (Architect, Tracker, prototype Coder pool, FileSystemHandler) plan, track in PostgreSQL, and write a full working project directory to disk.",
    slug: "aguai",
    techStack: ["Java 21", "Spring Boot 3.x", "LangChain4j", "Google Gemini", "PostgreSQL", "Spring Data JPA", "Gradle"],
    featured: false,
    category: "AI/ML",
    githubUrl: "https://github.com/itzabhishekgour/aguai-test",
    liveUrl: "",
    metrics: [
      "Autonomous 4-agent pipeline",
      "Prototype-scoped CoderAgent pool",
      "PostgreSQL task state & failure tracking",
      "Zero-human code generation to disk",
      "LangChain4j 0.36 + Gemini integration",
    ],
    isOpenSource: false,
    originStory: {
      frustration: "Single-threaded AI writes toy snippets with markdown wrappers that break on multi-file projects. One prompt cannot plan, track, and write an entire repository without breaking.",
      solution: "I built an autonomous agent pool in Java 21: Architect plans the JSON structure, Tracker logs state in PostgreSQL, prototype Coders write files concurrently, and FileSystemHandler writes the full repository to disk.",
    },
  },
  {
    id: 9,
    title: "Alpha-Pay",
    description: "Distributed Digital Wallet (Microservices)",
    longDescription:
      "A distributed wallet system handling account balances, transfers, and transaction logs. Built with Spring Cloud, Eureka service discovery, API gateway routing, and Docker orchestration with eventual consistency.",
    slug: "alpha-pay",
    techStack: ["Java", "Spring Cloud", "Eureka", "Docker", "PostgreSQL", "Redis"],
    featured: false,
    category: "Full-Stack",
    githubUrl: "https://github.com/itzabhishekgour/Alpha-Pay",
    liveUrl: "",
    metrics: [
      "Microservices architecture",
      "Service discovery (Eureka)",
      "Distributed transactions",
      "Docker containerized",
    ],
    isOpenSource: false,
    originStory: {
      frustration: "I wanted to understand distributed systems not from a textbook, but by building one that handles real money. Most tutorials were glorified TODO apps.",
      solution: "I built a distributed wallet with Eureka discovery, an API gateway, distributed transactions, and Docker orchestration.",
    },
  },
  {
    id: 10,
    title: "Shree Engineers Platform",
    description: "Enterprise Monorepo (Freelance Client Project)",
    longDescription:
      "A commercial freelancing platform built for an engineering consulting firm as a monorepo using TurboRepo. Features a Next.js frontend, Spring Boot backend API, shared component library, and automated deployment pipelines.",
    slug: "shree-engineers",
    techStack: ["Next.js", "Spring Boot", "TurboRepo", "TypeScript", "PostgreSQL"],
    featured: false,
    category: "Full-Stack",
    githubUrl: "https://github.com/itzabhishekgour/shree-engineers",
    liveUrl: "https://shree-engineers-platform-web.vercel.app/",
    metrics: [
      "Freelance Client Production System",
      "TurboRepo enterprise monorepo",
      "Shared component library & Spring Boot API",
      "Full CI/CD automated deployment pipeline",
    ],
    isOpenSource: false,
  },
  {
    id: 11,
    title: "Comedy Lab",
    description: "Event & Ticket Management Platform (Freelance Project)",
    longDescription:
      "A commercial freelancing client project for live show ticketing and event management. Built with a React web application, Spring Boot REST API backend, PostgreSQL database, and PhonePe payment gateway integration.",
    slug: "comedy-lab",
    techStack: ["React", "Spring Boot", "PhonePe", "PostgreSQL", "REST API"],
    featured: false,
    category: "Full-Stack",
    githubUrl: "https://github.com/itzabhishekgour/comedy-lab",
    liveUrl: "",
    metrics: [
      "Freelance Client Project",
      "PhonePe Payment Gateway Integration",
      "Real-Time Event & Ticket Booking System",
    ],
    isOpenSource: false,
  },
  {
    id: 13,
    title: "InterConnecter",
    description: "Student Networking Platform",
    longDescription:
      "A real-time student networking platform with profiles, messaging, and connection requests. Built with React, Spring Boot, and WebSockets.",
    slug: "interconnecter",
    techStack: ["React", "Spring Boot", "WebSockets", "PostgreSQL"],
    featured: false,
    category: "Full-Stack",
    githubUrl: "https://github.com/itzabhishekgour/interconnecter",
    liveUrl: "",
    metrics: [
      "Real-time messaging",
      "Connection management",
      "Student profiles & discovery",
    ],
    isOpenSource: false,
  },
  {
    id: 14,
    title: "Chitrakosh",
    description: "Movie Discovery SPA",
    longDescription:
      "A single-page movie search app built with React and Vite. Queries OMDb API for movie metadata, search, filtering, and local watchlist management.",
    slug: "chitrakosh",
    techStack: ["React", "Vite", "OMDb API", "TypeScript"],
    featured: false,
    category: "Full-Stack",
    githubUrl: "https://github.com/itzabhishekgour/Chitrakosh",
    liveUrl: "",
    metrics: [
      "OMDb API integration",
      "Search & filtering",
      "Watchlist management",
    ],
    isOpenSource: false,
  },

  // ═══════════════════════════════════════════════════
  // THE MOONSHOT (Separate Page)
  // ═══════════════════════════════════════════════════
  {
    id: 15,
    title: "Project Ax04",
    description: "Experimental Modular Agent Routing & Execution System (Stealth Codename)",
    longDescription:
      "An autonomous, self-improving agent system built with decentralized microservices, full OS automation, automated network failover, and recursive self-evolution (neuroplasticity).",
    slug: "ax04",
    techStack: ["Systems Design", "LLM Orchestration", "OS Automation", "Research Blueprint"],
    featured: false,
    category: "Moonshot",
    githubUrl: "",
    liveUrl: "",
    metrics: [
      "Modular routing blueprint (caching, LLM router, execution controller)",
      "Prototype script synthesis for on-demand capabilities",
      "Connectivity-driven local model fallback checks",
      "Dynamic module loading and runtime import validation",
    ],
    isOpenSource: false,
  },
];

// Helper functions
export const featuredProjects = projects.filter((p) => p.featured);
export const openSourceProjects = projects.filter((p) => p.isOpenSource);
export const secondaryProjects = projects.filter(
  (p) => !p.featured && !p.isOpenSource && p.category !== "Moonshot"
);
export const moonshotProject = projects.find((p) => p.category === "Moonshot")!;
export const allDisplayProjects = projects.filter((p) => p.category !== "Moonshot");

export const categories = [
  "All",
  "Systems",
  "AI/ML",
  "Full-Stack",
  "Security",
  "Research",
  "Open-Source",
] as const;

export type Category = (typeof categories)[number];
