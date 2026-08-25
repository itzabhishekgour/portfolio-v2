"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Key,
  Database,
  Sparkles,
  Terminal,
  Layers,
  Workflow,
  Search,
  CheckCircle2,
  Cpu,
  RefreshCw,
  GitBranch,
  Mail,
  Send,
  EyeOff,
  Server,
} from "lucide-react";
import MermaidViewer from "@/components/MermaidViewer";

const smritiArchitectureChart = `graph TD
    subgraph Clients["Client Access Layer"]
        SPA["React 19 SPA (Vite + Tailwind)\nGlobal Ctrl+K 'Ask Smriti'"]
        CLI["Node.js CLI (smriti)\nDynamic Env Injection & Pull"]
        CI["CI/CD Git-Leak Hooks\n(Pre-commit scanner)"]
    end

    subgraph Gateway["API Gateway & Security Filter"]
        SEC["Spring Security + JWT Filter\n(RBAC: Owner / Editor / Viewer)"]
    end

    subgraph Services["Core Application Services (Java 21 / Spring Boot 3.x)"]
        AUTH_SRV["Auth & OAuth Service\n(GitHub Login & Account Linking)"]
        SECRET_SRV["Secret Management Service\n(Version History & Rollbacks)"]
        MAGIC_SRV["Magic Link 2FA Service\n(Password + 6-Digit Email OTP)"]
        AI_SRV["Context AI Engine (LangChain4j)\n(Auto-Parser & Bulk Importer)"]
        SYNC_SRV["Sync & Webhook Service\n(GitHub Actions & Render Sync)"]
    end

    subgraph Crypto["Cryptographic & Privacy Layer"]
        AES["AES-256-GCM Encryption Engine\n(Secret values encrypted at rest)"]
        LLM_FILTER["Zero-Secret Prompt Filter\n(LLM receives ONLY metadata/context)"]
    end

    subgraph AIBackend["External AI Backend"]
        GEMINI["Google Gemini API (via LangChain4j)\n(Embeddings & Semantic Context Query)"]
    end

    subgraph Storage["Persistent Storage"]
        POSTGRES[("Neon PostgreSQL Database\n• Encrypted Secrets\n• Version History\n• Immutable Audit Trail")]
    end

    SPA -->|HTTPS / JWT| SEC
    CLI -->|HTTPS / Bearer Token| SEC
    CI -->|Scan Requests| SEC

    SEC --> AUTH_SRV
    SEC --> SECRET_SRV
    SEC --> MAGIC_SRV
    SEC --> AI_SRV
    SEC --> SYNC_SRV

    SECRET_SRV --> AES
    AES -->|Ciphertext| POSTGRES

    AI_SRV --> LLM_FILTER
    LLM_FILTER -->|Metadata Only| GEMINI

    MAGIC_SRV -->|SMTP OTP Challenge| Storage
    AUTH_SRV --> POSTGRES
    SECRET_SRV --> POSTGRES
    SYNC_SRV -->|External Webhooks| POSTGRES`;

interface FeatureHighlight {
  title: string;
  badge: string;
  description: string;
  color: string;
}

const smritiHighlights: FeatureHighlight[] = [
  {
    title: "AI-Powered Context Search",
    badge: "Semantic Retrieval",
    description:
      "Search for secrets by their natural-language origin story (e.g. 'that stripe key I generated for the checkout bug') rather than cryptic key names like SK_TEST_XYZ.",
    color: "border-cyan-500/40 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400",
  },
  {
    title: "Ask Smriti (Private Ctrl+K)",
    badge: "Zero-Knowledge AI",
    description:
      "Global command palette allows natural questions while the Zero-Secret prompt filter strictly excludes decrypted secrets from entering the LLM context window.",
    color: "border-purple-500/40 bg-purple-500/5 text-purple-600 dark:text-purple-400",
  },
  {
    title: "AES-256-GCM Encryption at Rest",
    badge: "AES-256-GCM Cryptography",
    description:
      "All secret values are authenticated and encrypted using AES-256 in Galois/Counter Mode before touching persistent PostgreSQL storage.",
    color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Secure Magic Links (2FA)",
    badge: "Client / Contractor Sharing",
    description:
      "Share secrets externally without requiring a Smriti account. Protected by password challenge, 6-digit email OTP, rate-limiting, and 15-minute brute-force lockout.",
    color: "border-amber-500/40 bg-amber-500/5 text-amber-600 dark:text-amber-400",
  },
];

export default function SmritiArchitecture() {
  const [activeTab, setActiveTab] = useState<"architecture" | "privacy" | "magiclinks" | "cli">("architecture");

  return (
    <div className="space-y-12">
      {/* Document Header Banner */}
      <div className="glass-card p-6 md:p-8 border border-amber-500/30 dark:border-amber-400/20 bg-gradient-to-br from-amber-500/5 via-slate-900/10 to-transparent relative overflow-hidden">
        <div className="hidden sm:block absolute top-0 right-0 px-4 py-1.5 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-b border-l border-emerald-500/30 text-xs font-mono font-semibold tracking-wider uppercase rounded-bl-xl">
          CONTEXT-AWARE SECRETS MANAGER
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <span className="sm:hidden px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold">
            SECRETS VAULT
          </span>
          <span className="px-3 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-mono font-medium">
            Smriti Vault
          </span>
          <span className="text-xs text-slate-500 dark:text-white/40 font-mono">
            Java 21 · Spring Boot 3.x · React 19 · AES-256-GCM · Neon PostgreSQL · Gemini AI
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Smriti | Context-Aware Secrets Vault Architecture
        </h3>
        <p className="text-sm md:text-base text-slate-600 dark:text-white/60 max-w-3xl leading-relaxed italic">
          &ldquo;Smriti remembers the context behind your secrets, not just the values.&rdquo;
        </p>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-white/10 text-center">
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-amber-600 dark:text-amber-400">AES-256-GCM</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Encrypted at Rest</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">Zero-Secret AI</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Private Context Only</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">Magic Link 2FA</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Password + Email OTP</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-purple-600 dark:text-purple-400">CLI &amp; CI/CD</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Dynamic Env Injection</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto whitespace-nowrap gap-2 border-b border-slate-200 dark:border-white/10 pb-4 scrollbar-none">
        {[
          { id: "architecture", label: "Multi-Tier Architecture", icon: Workflow },
          { id: "privacy", label: "Zero-Secret AI Security", icon: EyeOff },
          { id: "magiclinks", label: "Magic Links & 2FA Model", icon: Lock },
          { id: "cli", label: "CLI & CI/CD Sync", icon: Terminal },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex-shrink-0 whitespace-nowrap transition-all ${
                isActive
                  ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 shadow-sm"
                  : "text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        {/* 1. ARCHITECTURE TAB */}
        {activeTab === "architecture" && (
          <motion.div
            key="architecture"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Mermaid Architecture Chart */}
            <MermaidViewer
              id="smriti-arch-chart"
              chart={smritiArchitectureChart}
              title="Smriti Multi-Tier System &amp; Crypto Architecture (graph TD)"
              caption="Client Layer (React 19 / CLI) → Spring Boot 3.x Gateway & Security → Cryptographic Engine → LangChain4j Context AI → Neon PostgreSQL"
            />

            {/* Core Differentiator Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {smritiHighlights.map((feat) => (
                <div key={feat.title} className={`p-5 rounded-xl border ${feat.color} space-y-2`}>
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {feat.title}
                    </h5>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 font-semibold">
                      {feat.badge}
                    </span>
                  </div>
                  <p className="text-xs opacity-90 leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 2. ZERO-SECRET AI PRIVACY */}
        {activeTab === "privacy" && (
          <motion.div
            key="privacy"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                Zero-Knowledge Context AI Security Model
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                    The Problem with Traditional AI Assistants
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
                    Most AI-augmented tools dump the entire database record (including sensitive plaintext API keys and database passwords) into the LLM context prompt, risking data leakages and vendor logging.
                  </p>
                  <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-mono">
                    ❌ PROMPT: &ldquo;Here is AWS_KEY: AKIAIOSFODNN7EXAMPLE for prod db...&rdquo; (UNSAFE)
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                    Smriti&apos;s Zero-Secret Context Filter
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
                    Smriti decomposes secrets into <strong>Encrypted Value</strong> (AES-256-GCM) and <strong>Context Metadata</strong> (service, environment, origin story). When querying Gemini via LangChain4j, ONLY sanitized metadata is transmitted.
                  </p>
                  <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 font-mono">
                    ✅ PROMPT: &ldquo;User created key for AWS US-East checkout bug. Key ID: sec_941&rdquo;
                  </div>
                </div>
              </div>

              {/* Secret Decryption Workflow */}
              <div className="p-5 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs border border-cyan-500/20 space-y-2">
                <div className="text-white font-bold">Decryption Flow:</div>
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  1. User searches in Ctrl+K &rarr; Gemini resolves matching secret metadata token.<br />
                  2. Client requests secret ID with active JWT &rarr; Spring Security evaluates RBAC.<br />
                  3. Spring Boot pulls encrypted blob &rarr; Decrypts AES-256-GCM on-the-fly in RAM.<br />
                  4. Value delivered directly to user UI &rarr; Audit trail logs &lsquo;SECRET_VIEWED&rsquo; with timestamp and user ID.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. MAGIC LINKS & 2FA */}
        {activeTab === "magiclinks" && (
          <motion.div
            key="magiclinks"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                External Magic Link 2FA Sharing Pipeline
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2 text-xs">
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 block">1. Link Generation</span>
                  <p className="text-slate-600 dark:text-white/60">
                    Owner sets expiry time (e.g. 24 hours), optional view limit (single-use), and a mandatory master passphrase.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2 text-xs">
                  <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400 block">2. Email OTP Challenge</span>
                  <p className="text-slate-600 dark:text-white/60">
                    Recipient enters passphrase &rarr; Smriti automatically sends a dynamic 6-digit verification code to the authorized email via SMTP.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2 text-xs">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 block">3. Brute-Force Lockout</span>
                  <p className="text-slate-600 dark:text-white/60">
                    Enforces 3-attempt limit with automatic 15-minute brute-force lockout and rate-limited OTP resend triggers.
                  </p>
                </div>
              </div>

              {/* RBAC Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/30 uppercase tracking-wider">
                      <th className="pb-2">Role</th>
                      <th className="pb-2">Read Secrets</th>
                      <th className="pb-2">Create / Edit</th>
                      <th className="pb-2">Rollback Version</th>
                      <th className="pb-2">Manage Members &amp; Audit Logs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono text-[11px]">
                    <tr>
                      <td className="py-2.5 font-bold text-amber-500">OWNER</td>
                      <td className="py-2.5 text-emerald-500">✅ YES</td>
                      <td className="py-2.5 text-emerald-500">✅ YES</td>
                      <td className="py-2.5 text-emerald-500">✅ YES</td>
                      <td className="py-2.5 text-emerald-500">✅ Full Project Audit</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-cyan-500">EDITOR</td>
                      <td className="py-2.5 text-emerald-500">✅ YES</td>
                      <td className="py-2.5 text-emerald-500">✅ YES</td>
                      <td className="py-2.5 text-emerald-500">✅ YES</td>
                      <td className="py-2.5 text-slate-400">❌ Own Activity Only</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-400">VIEWER</td>
                      <td className="py-2.5 text-emerald-500">✅ YES</td>
                      <td className="py-2.5 text-slate-400">❌ NO</td>
                      <td className="py-2.5 text-slate-400">❌ NO</td>
                      <td className="py-2.5 text-slate-400">❌ Own Activity Only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. CLI & CI/CD */}
        {activeTab === "cli" && (
          <motion.div
            key="cli"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 font-mono text-xs"
          >
            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
                <Terminal className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                Terminal CLI &amp; CI/CD Secret Scanning
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CLI Commands */}
                <div className="space-y-3">
                  <span className="text-slate-700 dark:text-white/80 font-bold uppercase tracking-wider">
                    Node.js CLI Tool (smriti):
                  </span>
                  <div className="p-4 rounded-xl bg-slate-950 text-cyan-300 border border-cyan-500/20 space-y-3">
                    <div>
                      <span className="text-slate-500"># Authenticate CLI</span>
                      <div>smriti login</div>
                    </div>
                    <div>
                      <span className="text-slate-500"># Inject secrets dynamically into app process</span>
                      <div className="text-emerald-400">smriti run my-project -- npm run dev</div>
                    </div>
                    <div>
                      <span className="text-slate-500"># Export environment to file</span>
                      <div>smriti pull my-project &gt; .env</div>
                    </div>
                  </div>
                </div>

                {/* Secret Scanning & CI/CD Sync */}
                <div className="space-y-3">
                  <span className="text-slate-700 dark:text-white/80 font-bold uppercase tracking-wider">
                    CI/CD Integrations:
                  </span>
                  <div className="p-4 rounded-xl bg-slate-950 text-slate-300 border border-slate-800 space-y-2">
                    <div>
                      <strong className="text-amber-400 font-sans">GitHub Actions Sync:</strong>
                      <p className="text-[11px] text-slate-400 font-sans">One-click sync of secrets into GitHub repository environment variables via GitHub REST API.</p>
                    </div>
                    <div>
                      <strong className="text-cyan-400 font-sans">Render Sync:</strong>
                      <p className="text-[11px] text-slate-400 font-sans">Auto-deploys updated secret bundles directly to Render backend services.</p>
                    </div>
                    <div>
                      <strong className="text-emerald-400 font-sans">Git-Leak Prevention:</strong>
                      <p className="text-[11px] text-slate-400 font-sans">Pre-commit CLI hook prevents accidental commits of secrets into git history.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
