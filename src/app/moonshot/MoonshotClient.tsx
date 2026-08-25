"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Zap,
  Brain,
  Cog,
  Dna,
  Lock,
  ArrowRight,
  FolderTree,
  Activity,
  Workflow,
  Radio,
  Eye,
  Mic,
  Database,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  FileCode,
  HardDrive,
  RefreshCw,
  Server,
  Code2,
} from "lucide-react";
import GlowOrb from "@/components/GlowOrb";
import AnimatedSection from "@/components/AnimatedSection";
import MermaidViewer from "@/components/MermaidViewer";

const aasthaTopologyChart = `graph TD
    Sensory["6. Sensory Cortex (Vision & Voice I/O)\nDeepgram / Whisper / Gemini Vision / OpenCV"] -->|"Sensory Input Stream"| SpinalCord["1. Spinal Cord (Reflex Arc & Cache)\n<50ms Low-Latency Semantic Interception"]
    
    SpinalCord -->|"Known Reflex Hit (<50ms)"| MotorFast["Fast Motor Action (Volume, Mute, App Open)"]
    SpinalCord -->|"Complex / Uncached Query"| Cerebrum["2. Cerebrum (Master Decision Engine)\nSpring Boot: Groq (Online) / Ollama (Survival Mode)"]
    
    Cerebrum <-->|"Heartbeat & Security Directives"| BrainStem["3. Brain Stem (Failsafes & Gatekeeper)\nNetwork Ping + Master Override Code '1083'"]
    
    Cerebrum <-->|"Active Context & RAG"| Hippocampus["5a. Hippocampus (Vector DB)\nLocal ChromaDB RAG Engine"]
    Cerebrum <-->|"Long-Term Sync"| Limbic["5b. Limbic System (Dual Memory)\nFirebase Cloud + Offline SQLite Buffer"]
    
    Cerebrum -->|"Execution Directives"| Cerebellum["4. Cerebellum (Motor Controller)\nPyAutoGUI / Android ADB / Cron Subprocesses"]
    
    Cerebrum -->|"Skill Gap Trigger (Missing Tool)"| Neuro["7. Neuroplasticity Engine (Self-Evolution)\ncode_generator.py + module_hot_reloader.py"]
    BrainStem -->|"Auth Validated ('Code 1083')"| Neuro
    Neuro -->|"Writes & Hot-Reloads"| DynamicSkills["dynamic_skills/ (Live Upgraded Capabilities)"]
    DynamicSkills -->|"Instant Tool Invocation"| Cerebellum`;

interface BiologicalSystem {
  id: string;
  name: string;
  emoji: string;
  badge: string;
  tech: string;
  description: string;
  files: string[];
  color: string;
}

const biologicalSystems: BiologicalSystem[] = [
  {
    id: "spinal",
    name: "1. The Spinal Cord",
    emoji: "⚡",
    badge: "Reflex Arc & Semantic Cache",
    tech: "Python · Redis · Gateway API",
    description:
      "The ultra-low latency interception layer. Intercepts sensory input and executes repetitive cached commands (e.g., 'Mute volume', 'Open YouTube') in under 50ms without waking the heavy Cerebrum reasoning LLM.",
    files: ["cache_manager.py", "reflex_rules.json", "gateway_api.py"],
    color: "border-amber-500/40 bg-amber-500/5 text-amber-600 dark:text-amber-400",
  },
  {
    id: "cerebrum",
    name: "2. The Cerebrum",
    emoji: "🧠",
    badge: "Master Decision Engine",
    tech: "Java 21 · Spring Boot 3.x · Groq · Ollama",
    description:
      "The seat of intelligence. Handles multi-step reasoning, task planning, and tool delegation. Operates in Cloud Mode (Groq API) for high-speed inference or auto-switches to Survival Mode (Local Ollama Mistral/Llama) when offline.",
    files: ["GroqClient.java", "OllamaClient.java", "LLMRouter.java", "Orchestrator.java"],
    color: "border-cyan-500/40 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400",
  },
  {
    id: "brainstem",
    name: "3. The Brain Stem",
    emoji: "🛡️",
    badge: "Immutable Failsafes & Autopilot",
    tech: "Java 21 · Security Sandbox · Heartbeat Logic",
    description:
      "The survival layer and security gatekeeper. Continuously pings external networks to manage Cloud/Offline failover and guards write-permissions for self-modification by listening for the Master Override Voice Code '1083'.",
    files: ["SecurityConfig.java", "immutable_rules.json", "NetworkHeartbeat.java", "FailoverSwitch.java", "AuthValidator.java"],
    color: "border-rose-500/40 bg-rose-500/5 text-rose-600 dark:text-rose-400",
  },
  {
    id: "cerebellum",
    name: "4. The Cerebellum",
    emoji: "🦾",
    badge: "Motor Controller & OS Execution",
    tech: "Python · PyAutoGUI · Android ADB · Subprocesses",
    description:
      "The physical execution arm. Translates Cerebrum directives into OS-level commands, mouse/keyboard movements, Android ADB triggers, and background cron monitoring routines.",
    files: ["pc_control/", "mobile_control/", "background_jobs/", "executor.py"],
    color: "border-blue-500/40 bg-blue-500/5 text-blue-600 dark:text-blue-400",
  },
  {
    id: "memory",
    name: "5. Dual-Memory System",
    emoji: "🗄️",
    badge: "Hippocampus & Limbic DB",
    tech: "ChromaDB (Vector RAG) · Firebase · SQLite Buffer",
    description:
      "Hippocampus provides sub-second active context RAG (e.g. syllabus PDFs, source codebases). Limbic System maintains long-term logs, buffering to local SQLite offline and auto-syncing to Firebase on reconnect.",
    files: ["firebase_config.js", "sqlite_buffer.db", "sync_manager.js", "vector_db_setup.py", "active_context.json"],
    color: "border-purple-500/40 bg-purple-500/5 text-purple-600 dark:text-purple-400",
  },
  {
    id: "sensory",
    name: "6. Sensory Cortex",
    emoji: "👁️👂",
    badge: "Multimodal Vision & Voice I/O",
    tech: "Porcupine · Deepgram/Whisper · Cartesia/Kokoro · Gemini Vision",
    description:
      "Always-on offline wake word detection, dual-tier Speech-to-Text (Cloud Deepgram vs Local Whisper), dual-tier TTS (Cartesia vs Kokoro), and screen perception via Gemini Vision and OpenCV heuristics.",
    files: ["wake_word.py", "stt_deepgram.py", "stt_local_whisper.py", "tts_cartesia.py", "vision_gemini.py", "vision_opencv.py"],
    color: "border-teal-500/40 bg-teal-500/5 text-teal-600 dark:text-teal-400",
  },
  {
    id: "neuroplasticity",
    name: "7. Neuroplasticity Engine",
    emoji: "🧬",
    badge: "Recursive Self-Evolution",
    tech: "Python importlib · Dynamic ClassLoaders · LLM Synthesis",
    description:
      "The self-evolving breakthrough. When a missing capability is requested, Cerebrum generates code, validates it with Brain Stem via Override Code 1083, saves to dynamic_skills/, and hot-reloads it in-memory without restart.",
    files: ["code_generator.py", "module_hot_reloader.py", "dynamic_skills/"],
    color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  },
];

const folderBlueprintTree = `Ax04-Core/
├── .env                              # API Keys, DB URLs & Secrets
├── docker-compose.yml                # Microservices Multi-Container Orchestration
├── README.md                         # V4.0 Master Blueprint
│
├── 1_spinal_cord/                    # ⚡ Reflex Arc & Semantic Cache (Local/Offline)
│   ├── cache_manager.py              # Redis connection & TTL semantic key logic
│   ├── reflex_rules.json             # Pre-compiled high-speed command lookup
│   ├── gateway_api.py                # Zero-latency unified entrypoint
│   └── requirements.txt
│
├── 2_cerebrum/                       # 🧠 Master Decision Engine (Java Spring Boot)
│   ├── pom.xml                       # Maven dependencies & LangChain4j setup
│   └── src/main/java/com/ax04/core/
│       ├── orchestrator/             # Task planning & dynamic function routing
│       ├── llm_clients/
│       │   ├── GroqClient.java       # [ONLINE] Ultra-fast Cloud Inference
│       │   ├── OllamaClient.java     # [OFFLINE] Local Llama/Mistral Survival Mode
│       │   └── LLMRouter.java        # Heartbeat-driven Online/Offline switch
│       └── communication/            # High-speed WebSockets / gRPC channels
│
├── 3_brain_stem/                     # 🛡️ Immutable Failsafes & Autopilot (Java)
│   ├── SecurityConfig.java           # Sandbox security permissions
│   ├── immutable_rules.json          # Hardcoded rules AI cannot mutate
│   ├── NetworkHeartbeat.java         # 5-second ICMP ping & connectivity probe
│   ├── FailoverSwitch.java           # Automated Survival Mode activator
│   └── AuthValidator.java            # "Code 1083" Master Override verification
│
├── 4_cerebellum/                     # 🦾 Motor Controller (Python OS Client)
│   ├── pc_control/                   # PyAutoGUI & OS native subprocess hooks
│   ├── mobile_control/               # Android ADB & Tasker socket triggers
│   ├── background_jobs/              # Autonomous cron daemons
│   ├── executor.py                   # Cerebrum execution worker
│   └── requirements.txt
│
├── 5_memory_system/                  # 🗄️ Dual-Memory Database
│   ├── limbic_system/                # Long-term Memory (Cloud + Buffer)
│   │   ├── firebase_config.js        # [ONLINE] Cloud Firestore connection
│   │   ├── sqlite_buffer.db          # [OFFLINE] Offline transaction buffer
│   │   └── sync_manager.js           # Reconnection auto-sync pipeline
│   └── hippocampus/                  # Short-term / RAG Memory (Local)
│       ├── vector_db_setup.py        # Local ChromaDB Vector Store
│       └── active_context.json       # Session memory scratchpad
│
├── 6_sensory_cortex/                 # 👁️👂 Vision & Voice I/O (Online + Offline)
│   ├── auditory/
│   │   ├── wake_word.py              # Porcupine (Offline audio stream listener)
│   │   ├── stt_deepgram.py           # [ONLINE] Cloud Speech-to-Text
│   │   ├── stt_local_whisper.py      # [OFFLINE] Faster-Whisper fallback
│   │   ├── tts_cartesia.py           # [ONLINE] Ultra-low latency voice synthesis
│   │   └── tts_local_kokoro.py       # [OFFLINE] Local Kokoro/pyttsx3 TTS
│   └── visual/
│       ├── screen_capture.py         # Frame capture & region cropping
│       ├── vision_gemini.py          # [ONLINE] Multimodal visual reasoning
│       └── vision_opencv.py          # [OFFLINE] Local visual heuristics
│
└── 7_neuroplasticity_engine/         # 🧬 Self-Evolution & Dynamic Coding
    ├── code_generator.py             # LLM code synthesis for missing skills
    ├── module_hot_reloader.py        # In-memory runtime hot reloader (zero restart)
    └── dynamic_skills/               # [EMPTY] Synthesized Python skills land here`;

export default function MoonshotClient() {
  const [activeTab, setActiveTab] = useState<"topology" | "systems" | "neuro" | "tree">("topology");

  return (
    <div className="relative min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Glow orbs */}
        <GlowOrb
          color="rgba(139, 92, 246, 0.14)"
          size={550}
          top="10%"
          left="10%"
          delay={0}
        />
        <GlowOrb
          color="rgba(34, 211, 238, 0.10)"
          size={450}
          top="60%"
          left="65%"
          delay={3}
        />
        <GlowOrb
          color="rgba(52, 211, 153, 0.08)"
          size={380}
          top="30%"
          left="80%"
          delay={5}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-semibold tracking-wider uppercase mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            EXPERIMENTAL V4.0 · AGENTIC BIOLOGICAL ARCHITECTURE
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="gradient-text">Project Ax04</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-white/80 font-medium mb-3 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Artificial And Superintelligent Tactical Heuristic Architect
          </motion.p>

          <motion.p
            className="text-slate-600 dark:text-white/50 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Project Ax04 is an autonomous, self-improving agent system built with decentralized microservices, full OS automation, automated network failover, and <strong>recursive self-evolution (neuroplasticity)</strong> .
          </motion.p>

          {/* Quick Metrics Banner */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-slate-200 dark:border-white/10 text-center font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="p-3 rounded-xl glass-card">
              <div className="text-xl font-bold text-amber-600 dark:text-amber-400">&lt;50ms</div>
              <div className="text-[11px] text-slate-500 dark:text-white/40">Reflex Arc Cache</div>
            </div>
            <div className="p-3 rounded-xl glass-card">
              <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">Survival Mode</div>
              <div className="text-[11px] text-slate-500 dark:text-white/40">Offline Failover</div>
            </div>
            <div className="p-3 rounded-xl glass-card">
              <div className="text-xl font-bold text-rose-600 dark:text-rose-400">Code 1083</div>
              <div className="text-[11px] text-slate-500 dark:text-white/40">Master Override</div>
            </div>
            <div className="p-3 rounded-xl glass-card">
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">Zero-Restart</div>
              <div className="text-[11px] text-slate-500 dark:text-white/40">Self-Evolution</div>
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 dark:from-[#0a0a0a] to-transparent pointer-events-none" />
      </section>

      {/* ─── SYSTEM EXPLORER SECTION ─── */}
      <section className="py-16 px-6 border-t border-slate-200 dark:border-white/[0.03]">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto whitespace-nowrap gap-2 border-b border-slate-200 dark:border-white/10 pb-4 scrollbar-none">
            {[
              { id: "topology", label: "Biological Topology Flow", icon: Workflow },
              { id: "systems", label: "7 Biological Microservices", icon: Layers },
              { id: "neuro", label: "Self-Evolution & Override 1083", icon: Dna },
              { id: "tree", label: "Master Folder Blueprint", icon: FolderTree },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex-shrink-0 whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/30 shadow-sm"
                      : "text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* TAB 1: TOPOLOGY */}
            {activeTab === "topology" && (
              <motion.div
                key="topology"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <MermaidViewer
                  id="aastha-topology-mermaid"
                  chart={aasthaTopologyChart}
                  title="Biological Microservice Orchestration Flow (graph TD)"
                  caption="Sensory Cortex → Spinal Cord Reflex Interception → Cerebrum Master Cognition → Brain Stem Failover & Override → Cerebellum Execution → Neuroplasticity Self-Evolution"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-xl glass-card border border-amber-500/20 space-y-2">
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      Reflex Interception (&lt;50ms)
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
                      Frequent commands hit Redis semantic rules in the Spinal Cord instantly without incurring heavy LLM token latencies or cloud bills.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl glass-card border border-cyan-500/20 space-y-2">
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-cyan-500" />
                      Cloud / Survival Mode Failover
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
                      The Brain Stem pings networks every 5 seconds. If the internet drops, Cerebrum switches from Groq to local Ollama Mistral/Llama without missing a beat.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl glass-card border border-emerald-500/20 space-y-2">
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Dna className="w-4 h-4 text-emerald-500" />
                      Autonomous Hot-Reload
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
                      When requested skills are missing, A.A.S.T.H.A. writes the code, validates permissions via Master Override 1083, and hot-reloads the module live.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: 7 BIOLOGICAL SYSTEMS */}
            {activeTab === "systems" && (
              <motion.div
                key="systems"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {biologicalSystems.map((sys) => (
                    <div key={sys.id} className={`p-6 rounded-xl border ${sys.color} space-y-3`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{sys.emoji}</span>
                          <div>
                            <h4 className="font-bold text-base text-slate-900 dark:text-white">{sys.name}</h4>
                            <span className="text-xs font-mono opacity-80">{sys.badge}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] font-mono opacity-70 bg-black/10 dark:bg-white/10 px-2.5 py-1 rounded-md inline-block">
                        {sys.tech}
                      </div>

                      <p className="text-xs opacity-90 leading-relaxed">
                        {sys.description}
                      </p>

                      <div className="pt-2 border-t border-black/5 dark:border-white/5 space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">Source Modules:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {sys.files.map((f) => (
                            <span key={f} className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 3: NEUROPLASTICITY & CODE 1083 */}
            {activeTab === "neuro" && (
              <motion.div
                key="neuro"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* 4-Step Evolutionary Protocol */}
                <div className="glass-card p-6 md:p-8 space-y-6">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Dna className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    The 4-Step Neurogenesis &amp; Hot-Reload Protocol
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2">
                      <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 block">Step 1: Skill Gap</span>
                  <p className="text-slate-600 dark:text-white/60">
                        User asks for a new task (e.g. &ldquo;Build a new endpoint for mock scores&rdquo;). Cerebrum detects the required tool is missing.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2">
                      <span className="font-mono font-bold text-purple-600 dark:text-purple-400 block">Step 2: Proposal Prompt</span>
                      <p className="text-slate-600 dark:text-white/60 italic">
                        &ldquo;Skill missing. Do I have authorization to write and integrate this module?&rdquo;
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 space-y-2">
                      <span className="font-mono font-bold text-rose-600 dark:text-rose-400 block">Step 3: Master Override</span>
                      <p className="text-slate-800 dark:text-white font-medium">
                        User commands: &ldquo;Command function override code 1083.&rdquo;
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 block">Step 4: Hot-Reload</span>
                      <p className="text-slate-600 dark:text-white/60">
                        Brain Stem unlocks permissions. Script is synthesized into <code className="font-mono text-emerald-400">dynamic_skills/</code> and reloaded in-memory without restart.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Master Override Security Card */}
                <div className="glass-card p-6 md:p-8 border border-amber-300/80 dark:border-amber-400/30 space-y-4">
                  <div className="flex items-center gap-3">
                    <Lock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        Master Override Voice Code: <span className="font-mono text-amber-600 dark:text-amber-400">1083</span>
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-white/40 font-mono">
                        Hardware-level authentication &amp; Evolutionary Throttle
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">
                    The Master Override Code is the immutable failsafe governed by the Brain Stem. No autonomous self-modification or file creation in the root codebase can proceed without matching this biometric/voice authorization token. It prevents rogue mutations while enabling boundless self-directed evolution.
                  </p>
                </div>
              </motion.div>
            )}

            {/* TAB 4: FOLDER BLUEPRINT */}
            {activeTab === "tree" && (
              <motion.div
                key="tree"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="glass-card p-6 md:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FolderTree className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Ax04-Core Repository Architecture
                  </h4>
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      7 Subsystems
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs overflow-x-auto border border-cyan-500/20 max-h-[600px]">
                    <pre className="leading-relaxed">{folderBlueprintTree}</pre>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <AnimatedSection className="py-24 px-6 border-t border-slate-200 dark:border-white/[0.03]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white/90 mb-4">
            Project Ax04 Research Project
          </p>
          <p className="text-slate-600 dark:text-white/40 mb-8 text-sm sm:text-base">
            Project Ax04 is an autonomous, self-improving agent system built with decentralized microservices, full OS automation, automated network failover, and recursive self-evolution (neuroplasticity).
          </p>
          <Link
            href="/contact"
            className="glow-button inline-flex items-center gap-2 text-sm"
          >
            Collaborate on Ax04
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
