"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Brain,
  Database,
  FileCode,
  Layers,
  Terminal,
  Workflow,
  Sparkles,
  Server,
  Zap,
  CheckCircle2,
  HardDrive,
  Cpu,
  Boxes,
  ShieldCheck,
} from "lucide-react";
import MermaidViewer from "@/components/MermaidViewer";

const aguaiPipelineChart = `graph TD
    UserBrief["User Brief (Text Requirement)"] --> Architect["ArchitectAgent (Master Planner)\nGemini API → Strict JSON Map"]
    Architect -->|"JSON File Structure Map"| Tracker["TrackerAgent (Supervisor DB)\nLogs assignments to PostgreSQL"]
    Tracker -->|"File Assignment Queue"| Coders["CoderAgent × N (Prototype Workers)\nDedicated Gemini Prompts per File"]
    Coders -->|"Raw LLM Code Strings"| FSHandler["FileSystemHandler (Physical Writer)\nStrips Markdown & executes mkdirs()"]
    FSHandler -->|"Clean Source Files"| OutputDir["generate_project/ (Complete Production Project)"]`;

interface AgentRole {
  name: string;
  badge: string;
  scope: string;
  role: string;
  description: string;
  outputExample: string;
  color: string;
}

const agentRoles: AgentRole[] = [
  {
    name: "ArchitectAgent",
    badge: "Master Planner",
    scope: "Singleton Bean",
    role: "Translates abstract user briefs into a deterministic JSON file-to-responsibility map",
    description:
      "The first AI in the chain. Takes user prompts (e.g. 'Build a React documentation site with Tailwind') and queries Gemini with strict structural constraints to output a machine-readable JSON mapping of filepaths to component duties. No conversational filler.",
    outputExample: `{
  "src/App.jsx": "Main React component with documentation layout and navigation",
  "src/index.css": "Tailwind-powered global CSS custom properties and styles",
  "index.html": "Root HTML5 entrypoint with metadata and container div"
}`,
    color: "border-cyan-500/40 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400",
  },
  {
    name: "TrackerAgent",
    badge: "Supervisor DB",
    scope: "Service Layer + JPA",
    role: "Guarantees task persistence, worker assignment, and state machine tracking",
    description:
      "Before any code generation starts, the Tracker records the project and every individual file assignment into PostgreSQL. It assigns unique worker IDs (AI-Coder-1, AI-Coder-2...) and updates live status (ASSIGNED → IN_PROGRESS → DONE). If an API call fails, the database pinpoints the exact failure point.",
    outputExample: `[PostgreSQL Record]
Project ID: prj_89104
File: src/App.jsx
Worker: AI-Coder-1
Status: DONE
Timestamp: 2026-08-24 05:20:11`,
    color: "border-purple-500/40 bg-purple-500/5 text-purple-600 dark:text-purple-400",
  },
  {
    name: "CoderAgent (× N)",
    badge: "Prototype AI Workers",
    scope: "@Scope('prototype')",
    role: "Writes production-ready, standalone code for its assigned single file",
    description:
      "The scalable workforce. For every file in the architect's JSON plan, a fresh Spring prototype bean is instantiated. Each CoderAgent receives an isolated prompt, interacts with Gemini through LlmCommunicationService, and returns pure code without conversational markdown.",
    outputExample: `import React from 'react';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar title="AguAI Docs" />
      {/* Generated component body */}
    </div>
  );
}`,
    color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  },
  {
    name: "FileSystemHandler",
    badge: "Physical Writer",
    scope: "IO Component",
    role: "Sanitizes LLM outputs, creates directories, and flushes code to disk",
    description:
      "Performs regex sanitization to strip unwanted markdown wrappers (e.g. ```javascript ... ```), ensures required parent directories exist via java.io.File.mkdirs(), and writes pure executable files into the generate_project/ output workspace.",
    outputExample: `[Disk Operation]
Target: generate_project/src/App.jsx
Status: Written (2,418 bytes)
Directories Created: generate_project/src/`,
    color: "border-amber-500/40 bg-amber-500/5 text-amber-600 dark:text-amber-400",
  },
];

const technicalDesignChoices = [
  { feature: "Multi-Agent Concurrency", implementation: "Spring @Scope('prototype') ensures each coder agent gets its own independent bean instance." },
  { feature: "Background Execution", implementation: "REST endpoint triggers generation in an asynchronous worker thread. API responds instantly with project token." },
  { feature: "Dynamic Prompt Engineering", implementation: "PromptBuilderService dynamically injects role constraints, system architecture rules, and file schemas." },
  { feature: "Rate-Limit AI Cooldown", implementation: "Automatic 6–7s thread sleep throttling between Gemini API calls to respect free-tier quotas and prevent 429s." },
  { feature: "Regex Code Sanitization", implementation: "Strict regex parser strips backtick markdown fences before passing buffers to Java FileWriter." },
  { feature: "Task State Persistence", implementation: "Spring Data JPA with PostgreSQL stores project metadata, worker IDs, and execution logs." },
  { feature: "REST API Ready", implementation: "Exposes POST /api/automation/build for integration with Web and Electron desktop frontends." },
];

export default function AguAIArchitecture() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "agents" | "specs" | "api">("pipeline");

  return (
    <div className="space-y-12">
      {/* Document Header Banner */}
      <div className="glass-card p-6 md:p-8 border border-cyan-500/30 dark:border-cyan-400/20 bg-gradient-to-br from-cyan-500/5 via-slate-900/10 to-transparent relative overflow-hidden">
        <div className="hidden sm:block absolute top-0 right-0 px-4 py-1.5 bg-purple-500/20 text-purple-700 dark:text-purple-300 border-b border-l border-purple-500/30 text-xs font-mono font-semibold tracking-wider uppercase rounded-bl-xl">
          MULTI-AGENT AUTONOMOUS SYSTEM
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <span className="sm:hidden px-3 py-1 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30 text-xs font-mono font-semibold">
            MULTI-AGENT SYSTEM
          </span>
          <span className="px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium">
            The AguAI Platform
          </span>
          <span className="text-xs text-slate-500 dark:text-white/40 font-mono">
            Java 21 · Spring Boot 3.x · LangChain4j · Google Gemini
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          The AguAI | Autonomous AI Development Workforce
        </h3>
        <p className="text-sm md:text-base text-slate-600 dark:text-white/60 max-w-3xl leading-relaxed italic">
          &ldquo;Give it a requirement, watch an AI army build the entire project for you.&rdquo;
        </p>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-white/10 text-center">
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">4 Agent Roles</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Architect, Tracker, Coder, FS</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">@Scope(&quot;prototype&quot;)</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Concurrent Coder Pool</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-purple-600 dark:text-purple-400">PostgreSQL JPA</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Persistent Task Tracking</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-amber-600 dark:text-amber-400">Zero-Human Code</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Full Directory Output</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto whitespace-nowrap gap-2 border-b border-slate-200 dark:border-white/10 pb-4 scrollbar-none">
        {[
          { id: "pipeline", label: "Multi-Agent Pipeline", icon: Workflow },
          { id: "agents", label: "4 Agent Roles & Specs", icon: Bot },
          { id: "specs", label: "Technical Design Choices", icon: Cpu },
          { id: "api", label: "REST API & Execution", icon: Terminal },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex-shrink-0 whitespace-nowrap transition-all ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30 shadow-sm"
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
        {/* 1. PIPELINE TAB */}
        {activeTab === "pipeline" && (
          <motion.div
            key="pipeline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Mermaid Pipeline Diagram */}
            <MermaidViewer
              id="aguai-pipeline-chart"
              chart={aguaiPipelineChart}
              title="Autonomous Multi-Agent Build Pipeline (graph TD)"
              caption="From natural language requirement to structured multi-file repository on disk with zero human intervention"
            />

            {/* Step-by-Step Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl glass-card border border-cyan-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400">Step 1: Planning</span>
                  <Brain className="w-4 h-4 text-cyan-500" />
                </div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">Architect Agent</h5>
                <p className="text-xs text-slate-600 dark:text-white/50 leading-relaxed">
                  Queries Gemini with system-architect prompts to yield a clean JSON map of file paths and component duties.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-card border border-purple-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-purple-600 dark:text-purple-400">Step 2: Tracking</span>
                  <Database className="w-4 h-4 text-purple-500" />
                </div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">Tracker Agent</h5>
                <p className="text-xs text-slate-600 dark:text-white/50 leading-relaxed">
                  Registers all file assignments into PostgreSQL with status <code className="font-mono text-purple-400">ASSIGNED</code> for live tracking and resilience.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-card border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">Step 3: Coding</span>
                  <Bot className="w-4 h-4 text-emerald-500" />
                </div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">CoderAgent &times; N</h5>
                <p className="text-xs text-slate-600 dark:text-white/50 leading-relaxed">
                  Spring prototype worker beans generate production-ready code concurrently with role-targeted prompts.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-card border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-amber-600 dark:text-amber-400">Step 4: Writing</span>
                  <HardDrive className="w-4 h-4 text-amber-500" />
                </div>
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">FileSystemHandler</h5>
                <p className="text-xs text-slate-600 dark:text-white/50 leading-relaxed">
                  Regex strips markdown wrappers, executes <code className="font-mono text-amber-400">mkdirs()</code>, and writes clean files into <code className="font-mono">generate_project/</code>.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. AGENTS TAB */}
        {activeTab === "agents" && (
          <motion.div
            key="agents"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                Specialized Agent Roles &amp; Responsibilities
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agentRoles.map((agent) => (
                  <div key={agent.name} className={`p-6 rounded-xl border ${agent.color} space-y-4`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                          {agent.name}
                        </h5>
                        <span className="text-xs font-mono opacity-80">{agent.role}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 font-bold block mb-1">
                          {agent.badge}
                        </span>
                        <span className="text-[10px] opacity-60 font-mono">{agent.scope}</span>
                      </div>
                    </div>

                    <p className="text-xs opacity-90 leading-relaxed">
                      {agent.description}
                    </p>

                    {/* Output sample snippet */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono uppercase tracking-wider opacity-70">
                        Sample Agent Output:
                      </span>
                      <div className="p-3 rounded-lg bg-slate-950 text-cyan-300 font-mono text-[11px] overflow-x-auto border border-cyan-500/20 max-h-36">
                        <pre>{agent.outputExample}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. SPECS & DESIGN CHOICES TAB */}
        {activeTab === "specs" && (
          <motion.div
            key="specs"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="glass-card p-6 md:p-8 space-y-6"
          >
            <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              Key Technical Design Choices
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/30 uppercase text-xs tracking-wider">
                    <th className="pb-3 w-1/3">Architectural Feature</th>
                    <th className="pb-3">Implementation Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {technicalDesignChoices.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 font-semibold text-slate-800 dark:text-white/90 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        {item.feature}
                      </td>
                      <td className="py-3.5 text-slate-600 dark:text-white/60 leading-relaxed font-mono text-xs">
                        {item.implementation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Roadmap */}
            <div className="p-5 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-3">
              <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                Evolution Roadmap
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-white/60">
                <div>&bull; <strong>Electron Desktop UI:</strong> Live graphical monitor for watching agent code streams</div>
                <div>&bull; <strong>Java 21 Virtual Threads:</strong> Project Loom parallelization for high-throughput scaling</div>
                <div>&bull; <strong>WebSocket Live Stream:</strong> Real-time chunk streaming of file generation directly to client</div>
                <div>&bull; <strong>Autonomous Self-Correction:</strong> Dynamic compiler feedback loop with retry logic for failed APIs</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. API & EXECUTION TAB */}
        {activeTab === "api" && (
          <motion.div
            key="api"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                REST API Endpoint &amp; Output Workspace
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                {/* REST API Call */}
                <div className="space-y-3">
                  <span className="text-slate-700 dark:text-white/80 font-bold uppercase tracking-wider">
                    Trigger via REST API:
                  </span>
                  <div className="p-4 rounded-xl bg-slate-950 text-cyan-300 border border-cyan-500/20 overflow-x-auto space-y-2">
                    <div className="text-emerald-400">POST /api/automation/build</div>
                    <pre>{`curl -X POST http://localhost:8080/api/automation/build \\
  -H "Content-Type: application/json" \\
  -d '{
    "projectName": "DocsPortal",
    "brief": "Build a responsive React documentation site with Tailwind CSS and dark mode"
  }'`}</pre>
                  </div>
                </div>

                {/* Output Directory Structure */}
                <div className="space-y-3">
                  <span className="text-slate-700 dark:text-white/80 font-bold uppercase tracking-wider">
                    Physical Generated Workspace:
                  </span>
                  <div className="p-4 rounded-xl bg-slate-950 text-emerald-400 border border-emerald-500/20 overflow-x-auto">
                    <pre>{`generate_project/
├── index.html
├── package.json
├── tailwind.config.js
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    └── components/
        ├── Navbar.jsx
        ├── Sidebar.jsx
        └── DocContent.jsx`}</pre>
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
