"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitFork,
  Workflow,
  Layers,
  Database,
  Terminal,
  Cpu,
  Boxes,
  Sparkles,
  ArrowRight,
  GitBranch,
  Network,
  CheckCircle2,
  Compass,
  CornerDownRight,
} from "lucide-react";
import MermaidViewer from "@/components/MermaidViewer";

const tinexusFlowTopologyChart = `graph TD
    Client["React Client (Chat View + React Flow Canvas)\nZustand State Store"] -->|"REST API Messages"| Controllers["Spring Boot 3.5+ Controllers"]
    Client -->|"Double-Click Node Jumps / Returns"| Controllers
    Controllers --> ChatService["ChatService Orchestration Layer"]
    ChatService --> IntentClass["IntentClassifier & BranchDetector"]
    ChatService --> ContextBuilder["ContextBuilderService\nSelective Active Path Pruning"]
    ContextBuilder -->|"Only Active Ancestor Nodes"| LLM["LangChain4j / Google Gemini API"]
    ChatService --> FlowMgr["FlowStateManager"]
    FlowMgr -->|"Persist Tree Nodes & Materialized Paths"| DB[("Neon PostgreSQL Database")]
    Controllers -->|"Refresh Tree & Active Flow State"| Client`;

interface CoreModule {
  name: string;
  badge: string;
  role: string;
  description: string;
  color: string;
}

const coreModules: CoreModule[] = [
  {
    name: "NodeEngine",
    badge: "Structural Entity Mutations",
    role: "Validates tree hierarchy and prevents orphan nodes",
    description:
      "Handles entity mutations and structural validations (guaranteeing root nodes lack parents and child nodes contain valid parent references) before persisting nodes to disk.",
    color: "border-cyan-500/40 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400",
  },
  {
    name: "BranchEngine",
    badge: "Materialized Path Manager",
    role: "Assigns hierarchical materialized path tokens",
    description:
      "Assigns materialized path tokens (e.g. '/' for root, '/rootId' for depth 1, and '/rootId/depth1Id' for depth 2) to maintain instantaneous subtree querying.",
    color: "border-purple-500/40 bg-purple-500/5 text-purple-600 dark:text-purple-400",
  },
  {
    name: "PathEngine",
    badge: "Zero-Recursion Traversal",
    role: "Builds ancestor and descendant chains without SQL self-joins",
    description:
      "Traverses materialized path tokens in O(N) memory to construct ordered ancestor message lists without expensive recursive database self-joins.",
    color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  },
  {
    name: "ReturnEngine",
    badge: "Cursor Navigation & History",
    role: "Controls backtracking and lastVisitedNodeId tracking",
    description:
      "When a user navigates up the conversation tree, ReturnEngine updates the FlowState active cursor, saves the deep branch tip as lastVisitedNodeId, and resets the context path.",
    color: "border-amber-500/40 bg-amber-500/5 text-amber-600 dark:text-amber-400",
  },
];

const intelligenceModules = [
  {
    name: "IntentClassifier",
    role: "Determines user navigation intent (RETURN_PARENT, RETURN_ROOT, NEW_TOPIC, CLARIFICATION, CONTINUE_CURRENT).",
  },
  {
    name: "BranchDetector",
    role: "Resolves whether a reply spawns a sub-branch (drill-down), continuation (current node), or sibling topic.",
  },
  {
    name: "AmbiguityResolver",
    role: "Detects ambiguous commands like 'continue' after navigation, resolving whether to resume the deep leaf node or start a new branch.",
  },
  {
    name: "ContextResolver",
    role: "Interfaces with PathEngine to filter and supply only active branch nodes into the LLM context window.",
  },
];

const apiEndpoints = [
  { method: "POST", path: "/api/chat/message", desc: "Main message dispatcher; returns new node, state, and ambiguity status" },
  { method: "POST", path: "/api/flow/branch", desc: "Manually spawns a clarification branch at the current cursor" },
  { method: "POST", path: "/api/flow/return-parent", desc: "Backtracks active conversation cursor to immediate parent" },
  { method: "POST", path: "/api/flow/return-root", desc: "Resets active conversation cursor back to root node" },
  { method: "POST", path: "/api/flow/navigate", desc: "Jumps active cursor to any target node ID on the canvas" },
  { method: "GET", path: "/api/flow/tree/{conversationId}", desc: "Retrieves complete tree node list, edges, and FlowState" },
  { method: "GET", path: "/api/flow/path/{conversationId}", desc: "Retrieves chronological active path nodes for LLM context" },
];

export default function TinexusFlowArchitecture() {
  const [activeTab, setActiveTab] = useState<"topology" | "engines" | "context" | "api">("topology");

  return (
    <div className="space-y-12">
      {/* Document Header Banner */}
      <div className="glass-card p-6 md:p-8 border border-blue-500/30 dark:border-blue-400/20 bg-gradient-to-br from-blue-500/5 via-slate-900/10 to-transparent relative overflow-hidden">
        <div className="hidden sm:block absolute top-0 right-0 px-4 py-1.5 bg-blue-500/20 text-blue-700 dark:text-blue-300 border-b border-l border-blue-500/30 text-xs font-mono font-semibold tracking-wider uppercase rounded-bl-xl">
          BRANCHING CONVERSATION NAVIGATION ENGINE
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <span className="sm:hidden px-3 py-1 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30 text-xs font-mono font-semibold">
            BRANCHING ENGINE
          </span>
          <span className="px-3 py-1 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 text-xs font-mono font-medium">
            TinexusFlow Engine
          </span>
          <span className="text-xs text-slate-500 dark:text-white/40 font-mono">
            React Flow · Zustand · Spring Boot 3.5+ · Neon PostgreSQL · LangChain4j
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Tree-Structured Conversation Navigation Architecture
        </h3>
        <p className="text-sm md:text-base text-slate-600 dark:text-white/60 max-w-3xl leading-relaxed">
          Structures human-AI interactions as dynamic tree topologies rather than flat linear message histories. Eliminates conversational confusion through materialized path tokens, selective context window pruning, and interactive node jumping.
        </p>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-white/10 text-center">
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-blue-600 dark:text-blue-400">Tree Topology</div>
            <div className="text-xs text-slate-500 dark:text-white/40">React Flow Canvas</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">Materialized Paths</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Zero SQL Self-Joins</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-purple-600 dark:text-purple-400">Context Pruning</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Active Path Only</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">Neon DB</div>
            <div className="text-xs text-slate-500 dark:text-white/40">PostgreSQL FlowState</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto whitespace-nowrap gap-2 border-b border-slate-200 dark:border-white/10 pb-4 scrollbar-none">
        {[
          { id: "topology", label: "System Topology", icon: Workflow },
          { id: "engines", label: "Core & Intelligence Engines", icon: Boxes },
          { id: "context", label: "Selective Context Pruning", icon: GitBranch },
          { id: "api", label: "REST API Specification", icon: Terminal },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex-shrink-0 whitespace-nowrap transition-all ${
                isActive
                  ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/30 shadow-sm"
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
        {/* 1. TOPOLOGY TAB */}
        {activeTab === "topology" && (
          <motion.div
            key="topology"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Mermaid Topology Diagram */}
            <MermaidViewer
              id="tinexusflow-topology-chart"
              chart={tinexusFlowTopologyChart}
              title="System Topology &amp; Orchestration Flow (graph TD)"
              caption="React Flow Split-Panel Client communicating with Spring Boot 3.5+ controllers, LangChain4j, and Neon PostgreSQL"
            />

            {/* Split-panel overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl glass-card border border-blue-500/20 space-y-2">
                <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Network className="w-4 h-4 text-blue-500" />
                  Split-Panel UI (React Flow + Zustand)
                </h5>
                <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
                  Left panel hosts the traditional conversational chat view. Right panel renders an interactive, real-time node-graph canvas powered by React Flow where users can double-click any past node to jump the conversational cursor.
                </p>
              </div>

              <div className="p-5 rounded-xl glass-card border border-purple-500/20 space-y-2">
                <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-500" />
                  Spring Boot 3.5+ &amp; Neon PostgreSQL
                </h5>
                <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
                  Maintains hierarchical message entities with materialized path strings and the live <code className="font-mono text-purple-400">FlowState</code> active cursor pointer, allowing instant branching without re-querying the whole database.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. ENGINES & INTELLIGENCE */}
        {activeTab === "engines" && (
          <motion.div
            key="engines"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Core Engines */}
            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                The TinexusFlow Core Engine
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coreModules.map((engine) => (
                  <div key={engine.name} className={`p-5 rounded-xl border ${engine.color} space-y-2`}>
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        {engine.name}
                      </h5>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 font-medium">
                        {engine.badge}
                      </span>
                    </div>
                    <p className="text-xs font-semibold opacity-90">{engine.role}</p>
                    <p className="text-xs opacity-75 leading-relaxed pt-1">{engine.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Intelligence Layer */}
            <div className="glass-card p-6 md:p-8 space-y-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                The Intelligence Layer
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {intelligenceModules.map((mod, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white text-sm block">{mod.name}</span>
                    <p className="text-slate-600 dark:text-white/60 leading-relaxed">{mod.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. CONTEXT PRUNING PIPELINE */}
        {activeTab === "context" && (
          <motion.div
            key="context"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Selective Active Path Context Window Management
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-white/60 leading-relaxed">
                Standard conversational interfaces dump the entire linear history into the LLM context, leading to topic pollution and context bloat. TinexusFlow filters messages so that <strong>only ancestors along the active path</strong> are submitted to Gemini:
              </p>

              {/* Active Path Visual Tree */}
              <div className="p-6 rounded-xl bg-slate-950 text-xs font-mono border border-blue-500/20 space-y-3">
                <div className="text-emerald-400 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  [ROOT Node] Q: &quot;What is AI?&quot; &rarr; A: &quot;AI is the simulation of human intelligence...&quot; (INCLUDED)
                </div>
                <div className="pl-6 text-cyan-300 font-bold flex items-center gap-2 border-l-2 border-cyan-500/30">
                  <CornerDownRight className="w-4 h-4 text-cyan-400" />
                  └── [Node 2] Q: &quot;Tell me about LLMs&quot; &rarr; A: &quot;Large Language Models...&quot; (ACTIVE CURRENT NODE &mdash; INCLUDED)
                </div>
                <div className="pl-6 text-slate-500 flex items-center gap-2 border-l-2 border-transparent opacity-60">
                  <CornerDownRight className="w-4 h-4 text-slate-600" />
                  └── [Node 3] Q: &quot;What are computer vision systems?&quot; &rarr; (IGNORED SIBLING BRANCH &mdash; PRUNED FROM LLM)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300">
                <strong>Result:</strong> Zero topic confusion. When you drill into LLMs, the computer vision branch never pollutes the model&apos;s token memory.
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. REST API */}
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
                <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                REST API Specification
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/30 uppercase text-xs tracking-wider">
                      <th className="pb-3 w-20">Method</th>
                      <th className="pb-3">Endpoint Path</th>
                      <th className="pb-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-mono text-xs">
                    {apiEndpoints.map((ep, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            ep.method === "POST"
                              ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20"
                              : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                          }`}>
                            {ep.method}
                          </span>
                        </td>
                        <td className="py-3 font-semibold text-slate-800 dark:text-white/90">{ep.path}</td>
                        <td className="py-3 text-slate-600 dark:text-white/50 font-sans text-xs">{ep.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
