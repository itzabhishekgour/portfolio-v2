"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode2,
  Cpu,
  Layers,
  CheckCircle2,
  Terminal,
  Boxes,
  Zap,
  Workflow,
  Sparkles,
  ArrowRight,
  Database,
  Binary,
  GitCommit,
  ShieldCheck,
} from "lucide-react";
import MermaidViewer from "@/components/MermaidViewer";

const compilerPipelineChart = `graph TD
    Source["DNA Source (.dna)"] --> LexerStage["Lexer Stage (lexer/)"]
    LexerStage -->|"Tokens (Token.h)"| ParserStage["Parser Stage (parser/)"]
    ParserStage -->|"AST (ast/ASTNode.h)"| SemanticStage["Semantic Analysis (semantic/)"]
    SemanticStage -->|"Validated AST"| IRStage["DNA IR Generation (ir/)"]
    IRStage -->|"3-Address Code (3AC) IR"| LLVMStage["LLVM IR Generation (codegen/)"]
    LLVMStage -->|"LLVM Assembly & Bitcode"| ObjStage["Object File Emission (.obj)"]
    ObjStage -->|"Native Object (.obj)"| LinkerStage["Native Linker (VS link.exe)"]
    LinkerStage -->|"dnaruntime.lib"| Executable["Native Windows Executable (.exe)"]`;

interface ModuleItem {
  id: string;
  name: string;
  files: string[];
  role: string;
  responsibilities: string[];
  color: string;
}

const compilerModules: ModuleItem[] = [
  {
    id: "lexer",
    name: "Lexical Analysis",
    files: ["Lexer.h", "Lexer.cpp", "Token.h"],
    role: "Sequential character scanning and tokenization",
    responsibilities: [
      "Reads DNA source text sequentially, stripping whitespace and comments",
      "Recognizes keywords: action, int, bool, void, String, while, for, if, else, break, continue, load",
      "Tokenizes identifiers, numerical literals, string literals, and symbol boundaries",
      "Maintains precise line and column coordinates for rich diagnostic error reporting",
    ],
    color: "border-cyan-500/40 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400",
  },
  {
    id: "parser",
    name: "Parsing & Grammar",
    files: ["Parser.h", "Parser.cpp"],
    role: "Syntactic structure analysis & AST construction",
    responsibilities: [
      "Employs recursive descent parsing combined with a Pratt parser for binary and unary expressions",
      "Constructs the Abstract Syntax Tree (AST) hierarchy",
      "Implements statement-boundary error synchronization to report multiple errors without crashing",
    ],
    color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "ast",
    name: "Abstract Syntax Tree",
    files: ["ASTNode.h"],
    role: "High-level polymorphic structural code representation",
    responsibilities: [
      "Defines core AST nodes: ProgramNode, VarDeclNode, FunctionDeclNode, ClassDeclNode, IfStmtNode, WhileStmtNode, ReturnStmtNode",
      "Implements the AST Visitor pattern allowing analyzers, printers, and codegen passes to traverse nodes uniformly",
    ],
    color: "border-purple-500/40 bg-purple-500/5 text-purple-600 dark:text-purple-400",
  },
  {
    id: "semantic",
    name: "Semantic Analysis",
    files: ["SemanticAnalyzer.h", "SemanticAnalyzer.cpp"],
    role: "Scoping, symbol tables, and type inference validation",
    responsibilities: [
      "Traverses the AST using Visitor methods to populate lexical scoping levels and symbol tables",
      "Validates return type matches and parameter signatures across all function invocations",
      "Enforces strict type safety constraints (boolean condition checks for loops/branches, mathematical operands)",
      "Verifies the required global entrypoint 'action void main()' and prevents duplicate symbol collisions",
    ],
    color: "border-blue-500/40 bg-blue-500/5 text-blue-600 dark:text-blue-400",
  },
  {
    id: "ir",
    name: "DNA Intermediate Representation",
    files: ["IRInstruction.h", "IRProgram.h", "IRBuilder.h", "IRGenerator.cpp", "IRPrinter.cpp"],
    role: "Lowers high-level AST into a flat 3-Address Code (3AC) instruction stream",
    responsibilities: [
      "Implements a custom 3-Address Code (3AC) instruction set with virtual registers (t0, t1, ...)",
      "Translates control flow statements (if/while/for) into structural jump targets using local branch labels",
      "Generates global metadata tables describing user-declared structures, functions, and parameters",
      "Provides readable IR text stream emission via the --ir compiler CLI flag",
    ],
    color: "border-amber-500/40 bg-amber-500/5 text-amber-600 dark:text-amber-400",
  },
  {
    id: "codegen",
    name: "LLVM Backend Code Generation",
    files: ["LLVMCodeGen.cpp", "LLVMContextManager.h", "LLVMTypeMapper.h", "LLVMValueMapper.h"],
    role: "Translates DNA IR into LLVM Assembly and emits native machine code",
    responsibilities: [
      "Maps DNA primitive types (int -> i32, bool -> i1, String -> ptr) to LLVM type equivalents",
      "Manages LLVM Context, Module, and IRBuilder instances via LLVMContextManager",
      "Lowers 3AC instructions to LLVM SSA values",
      "Configures target triples, data layouts, and compiles module down to a native Windows object file (.obj)",
    ],
    color: "border-pink-500/40 bg-pink-500/5 text-pink-600 dark:text-pink-400",
  },
  {
    id: "runtime",
    name: "Native Runtime Support",
    files: ["DNAString.h", "DNAString.cpp"],
    role: "Execution helper layer and compound struct runtime layout",
    responsibilities: [
      "Defines runtime compound layout of DNAString (16 bytes: data pointer, length, capacity)",
      "Provides C-linkage APIs (dna_print_string, dna_string_literal) invoked by generated assembly",
      "Manages string literal memory construction and formatted console I/O routines",
    ],
    color: "border-teal-500/40 bg-teal-500/5 text-teal-600 dark:text-teal-400",
  },
  {
    id: "linker",
    name: "Native Linking Stage",
    files: ["main.cpp", "link.bat"],
    role: "Discovers system toolchains and emits standalone native executable",
    responsibilities: [
      "Dynamically discovers Microsoft Visual Studio Build Tools / MSVC installation paths",
      "Writes a temporary link.bat script executing link.exe",
      "Links compiler-emitted .obj with dnaruntime.lib and Windows CRT libraries to emit a standalone .exe",
    ],
    color: "border-indigo-500/40 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400",
  },
];

export default function DNALangArchitecture() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "modules" | "abi" | "ir" | "release">("pipeline");

  return (
    <div className="space-y-12">
      {/* Document Header Banner */}
      <div className="glass-card p-6 md:p-8 border border-cyan-500/30 dark:border-cyan-400/20 bg-gradient-to-br from-cyan-500/5 via-slate-900/10 to-transparent relative overflow-hidden">
        <div className="hidden sm:block absolute top-0 right-0 px-4 py-1.5 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-b border-l border-emerald-500/30 text-xs font-mono font-semibold tracking-wider uppercase rounded-bl-xl">
          v0.2.0-ALPHA RELEASED · NATIVE x64 .EXE
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <span className="sm:hidden px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold">
            v0.2.0-ALPHA RELEASED
          </span>
          <span className="px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium">
            DNA Programming Language
          </span>
          <span className="text-xs text-slate-500 dark:text-white/40 font-mono">
            Ribosome Reference Compiler · LLVM Backend
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Ribosome Compiler Architecture &amp; Pipeline
        </h3>
        <p className="text-sm md:text-base text-slate-600 dark:text-white/60 max-w-3xl leading-relaxed">
          Comprehensive architectural design of the reference Ribosome compiler for the DNA programming language. Tracing the full lowering from raw <code className="text-cyan-600 dark:text-cyan-400 font-mono">.dna</code> source code through Pratt parsing, custom 3-Address Code (3AC) IR, LLVM SSA emission, and MSVC native linking.
        </p>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-white/10 text-center">
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">Pratt + RD</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Hybrid Parser</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">157 Tests</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Automated Test Suite</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-purple-600 dark:text-purple-400">LLVM 18+</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Target Machine Backend</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-amber-600 dark:text-amber-400">v0.2.0-Alpha</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Public Windows x64</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto whitespace-nowrap gap-2 border-b border-slate-200 dark:border-white/10 pb-4 scrollbar-none">
        {[
          { id: "pipeline", label: "Compilation Pipeline", icon: Workflow },
          { id: "modules", label: "8 Compiler Modules", icon: Boxes },
          { id: "abi", label: "Windows x64 ABI & Calling Conv", icon: Binary },
          { id: "ir", label: "DNA IR & Biology Metaphor", icon: Sparkles },
          { id: "release", label: "v0.2.0 Alpha Release & Tests", icon: Zap },
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
              id="dna-pipeline-chart"
              chart={compilerPipelineChart}
              title="End-to-End Compilation Pipeline (graph TD)"
              caption="From .dna raw text to Token stream -> AST -> Validated AST -> 3AC IR -> LLVM Bitcode -> MSVC link.exe -> .exe"
            />

            {/* Stepped Pipeline Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl glass-card border border-cyan-500/20 space-y-2">
                <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400">Phase 1: Frontend</span>
                <p className="text-xs text-slate-600 dark:text-white/60">
                  <strong>Lexer &amp; Pratt Parser:</strong> Tokenizes characters, builds AST, and performs statement-boundary synchronization.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-card border border-emerald-500/20 space-y-2">
                <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">Phase 2: Semantic Analysis</span>
                <p className="text-xs text-slate-600 dark:text-white/60">
                  <strong>AST Visitor:</strong> Resolves symbols across nested scopes, validates return signatures, and verifies the <code className="font-mono">action void main()</code> entrypoint.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-card border border-purple-500/20 space-y-2">
                <span className="text-xs font-bold font-mono text-purple-600 dark:text-purple-400">Phase 3: 3AC DNA IR</span>
                <p className="text-xs text-slate-600 dark:text-white/60">
                  <strong>Three-Address Code:</strong> Flattens AST into linear virtual register instructions (<code className="font-mono">t0 = a + b</code>) with explicit jump labels.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-card border border-amber-500/20 space-y-2">
                <span className="text-xs font-bold font-mono text-amber-600 dark:text-amber-400">Phase 4: LLVM &amp; Native Link</span>
                <p className="text-xs text-slate-600 dark:text-white/60">
                  <strong>LLVM CodeGen &amp; MSVC:</strong> Lowers to LLVM IR, emits <code className="font-mono">.obj</code>, and dynamically calls <code className="font-mono">link.exe</code> with <code className="font-mono">dnaruntime.lib</code>.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. MODULES TAB */}
        {activeTab === "modules" && (
          <motion.div
            key="modules"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Boxes className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                8 Core Compiler Subsystems &amp; File Map
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {compilerModules.map((mod) => (
                  <div key={mod.id} className={`p-5 rounded-xl border ${mod.color} space-y-3`}>
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        {mod.name}
                      </h5>
                      <span className="text-xs font-mono opacity-70">
                        {mod.id}/
                      </span>
                    </div>

                    <p className="text-xs font-medium opacity-90">{mod.role}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {mod.files.map((file) => (
                        <span
                          key={file}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10"
                        >
                          {file}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-1 text-xs opacity-85 pt-2 border-t border-black/5 dark:border-white/5 list-disc pl-4">
                      {mod.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. ABI & CALLING CONVENTIONS */}
        {activeTab === "abi" && (
          <motion.div
            key="abi"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Binary className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                Windows x64 ABI &amp; Calling Conventions
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Struct Passing Constraints (&gt; 8 Bytes)
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
                      Under the target Windows x64 ABI, compound structures larger than 8 bytes (such as the 16-byte <code className="font-mono text-cyan-600 dark:text-cyan-400">DNAString</code> layout containing pointer, length, and capacity) cannot fit in a single GPR register and must be passed and returned by reference.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                      Struct Return Mappings (<code className="font-mono text-cyan-600 dark:text-cyan-400">sret</code>)
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
                      Any action returning a <code className="font-mono">DNAString</code> is compiled into a C-function returning <code className="font-mono">void</code> where the first hidden argument is a pointer (<code className="font-mono">sret</code>) pointing to an allocated temporary variable in the caller&apos;s stack frame.
                    </p>
                  </div>
                </div>

                {/* Runtime Layout Visual */}
                <div className="p-5 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs border border-cyan-500/20 space-y-4">
                  <div className="text-white font-bold flex items-center justify-between border-b border-white/10 pb-2">
                    <span>DNAString 16-Byte Memory Layout</span>
                    <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">x64 Native</span>
                  </div>

                  <pre className="text-[11px] leading-relaxed text-slate-300">{`struct DNAString {
    const char* data;      // 8 bytes (pointer to heap buffer)
    uint32_t    length;    // 4 bytes (character count)
    uint32_t    capacity;  // 4 bytes (allocated buffer size)
};

// C-Linkage Runtime Helpers:
extern "C" {
    void dna_print_string(const DNAString* str);
    void dna_string_literal(DNAString* sret, const char* lit);
}`}</pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. DNA IR & BIOLOGY METAPHOR */}
        {activeTab === "ir" && (
          <motion.div
            key="ir"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                The Biological Metaphor &amp; 3AC Intermediate Representation
              </h4>

              <div className="p-5 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 border border-cyan-500/20 space-y-2">
                <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                  DNA (Source Code) &rarr; Ribosome (Compiler Engine) &rarr; Protein (Native Executable Binary)
                </div>
                <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
                  Named after cellular translation, the Ribosome compiler treats DNA language source code as genetic instruction sequences, transcribes them into linear 3-Address Code (mRNA), and synthesizes native machine executables.
                </p>
              </div>

              {/* Sample DNA Source vs 3AC IR */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-slate-950 text-emerald-400 border border-emerald-500/20 space-y-2">
                  <div className="text-white font-bold pb-2 border-b border-white/10">DNA Source Language (.dna)</div>
                  <pre>{`action void main() {
    int a = 10;
    int b = 20;
    int c = a + b * 2;
    if (c > 30) {
        print("DNA Lang Native Executable!");
    }
}`}</pre>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 text-cyan-300 border border-cyan-500/20 space-y-2">
                  <div className="text-white font-bold pb-2 border-b border-white/10">DNA 3AC Intermediate Code (--ir)</div>
                  <pre>{`FUNCTION main:
    t0 = 10
    a = t0
    t1 = 20
    b = t1
    t2 = b * 2
    t3 = a + t2
    c = t3
    t4 = c > 30
    IF NOT t4 GOTO L0
    CALL dna_print_string("DNA Lang Native Executable!")
L0:
    RETURN`}</pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 5. RELEASE & TEST SUITE */}
        {activeTab === "release" && (
          <motion.div
            key="release"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    DNA v0.2.0 Alpha Release &amp; Compiler Test Rig
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-white/40 font-mono">
                    Official Windows x64 Binary Release · Published by Abhishek Gour
                  </p>
                </div>

                <a
                  href="https://github.com/itzabhishekgour/dna-lang/releases/tag/v0.2.0-alpha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-button text-xs inline-flex items-center gap-2"
                >
                  Download Release (.zip)
                </a>
              </div>

              {/* Release Metadata Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-slate-950 text-cyan-300 border border-cyan-500/20 space-y-1">
                  <div className="text-slate-400">Binary Artifact</div>
                  <div className="text-white font-bold">dna-v0.2.0-alpha-windows-x64.zip</div>
                  <div className="text-[11px] text-cyan-400">Size: 29.04 MB · Target: Win-x64</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 text-emerald-300 border border-emerald-500/20 space-y-1">
                  <div className="text-slate-400">Automated Testing</div>
                  <div className="text-white font-bold">157 Test Cases Passed</div>
                  <div className="text-[11px] text-emerald-400">tests/run_tests.py</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 text-purple-300 border border-purple-500/20 space-y-1">
                  <div className="text-slate-400">Grammar Fuzzer</div>
                  <div className="text-white font-bold">Zero-Crash Diagnostics</div>
                  <div className="text-[11px] text-purple-400">tests/fuzz_test.py</div>
                </div>
              </div>

              {/* Verification & Test Suite Details */}
              <div className="p-5 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-3 text-xs leading-relaxed text-slate-600 dark:text-white/60">
                <h5 className="font-bold text-sm text-slate-900 dark:text-white font-sans">
                  Comprehensive Quality Assurance &amp; Fuzzing Rig:
                </h5>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li><strong>157-Case Unit &amp; Integration Suite:</strong> Systematically exercises Lexer, Pratt Parser, Semantic Analyzer, 3AC IR generation, and LLVM native code emission.</li>
                  <li><strong>Automated Grammar-Broken Fuzzer:</strong> Feeds malformed tokens and corrupt AST nodes to verify that statement boundaries synchronize cleanly and emit rich diagnostics instead of crashing or hanging.</li>
                  <li><strong>Native MSVC Discovery:</strong> Host system dynamically searches for Visual Studio Build Tools to run <code className="font-mono text-cyan-500">link.exe</code> with <code className="font-mono text-cyan-500">dnaruntime.lib</code>.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
