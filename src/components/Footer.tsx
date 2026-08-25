"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  Terminal,
  Copy,
  Check,
  Sparkles,
  Layers,
  Cpu,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyPyPiCommand = () => {
    navigator.clipboard.writeText("pip install voxpulse");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-white/[0.06] bg-slate-50/50 dark:bg-black/40 backdrop-blur-xl transition-colors duration-300 overflow-hidden">
      {/* Decorative gradient top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 dark:via-cyan-400/30 to-transparent" />

      {/* Subtle background glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-500/10 dark:bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200 dark:border-white/[0.06]">
          {/* Column 1: Brand & Philosophy (5 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-cyan-500/40 bg-black shadow-[0_0_20px_-3px_rgba(34,211,238,0.35)] flex-shrink-0">
                <Image
                  src="/tinexus-logo.png"
                  alt="Tinexus Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  TINEXUS<span className="text-cyan-600 dark:text-cyan-400 font-mono font-medium">.HQ</span>
                </span>
                <span className="block text-[11px] font-mono text-slate-500 dark:text-white/40">
                  by Abhishek Gour (Tinu)
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-white/60 leading-relaxed max-w-sm">
              Systems Engineer. Building web applications, developer tools, and systems to explore how software works under the hood.
            </p>

          </div>

          {/* Column 2: Systems & Compilers (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white/90 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              Low-Level Systems
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/projects/tinexus"
                  className="text-slate-600 dark:text-white/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center justify-between group"
                >
                  <span>Tinexus Wayland Compositor</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/dna-lang"
                  className="text-slate-600 dark:text-white/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center justify-between group"
                >
                  <span>DNA Lang (LLVM 18 Compiler)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/tinus-qpu"
                  className="text-slate-600 dark:text-white/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center justify-between group"
                >
                  <span>Tinu&apos;s-QPU (Base-4 Processor)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/google-closure"
                  className="text-slate-600 dark:text-white/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-between group"
                >
                  <span>Google Closure Compiler (PR #4333)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/alpha-pay"
                  className="text-slate-600 dark:text-white/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center justify-between group"
                >
                  <span>Alpha-Pay Distributed Wallet</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: AI & Live Deployments (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white/90 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              AI &amp; Live Products
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://smriti-40gk.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-white/50 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center justify-between group"
                >
                  <span className="flex items-center gap-1.5">
                    Smriti Secrets Vault
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      Live
                    </span>
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://tinexusflow-frontend.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-white/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                >
                  <span className="flex items-center gap-1.5">
                    TinexusFlow Branching UI
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      Live
                    </span>
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://pypi.org/project/voxpulse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-white/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-between group"
                >
                  <span className="flex items-center gap-1.5">
                    VoxPulse Audio ML
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      PyPI
                    </span>
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <Link
                  href="/projects/aguai"
                  className="text-slate-600 dark:text-white/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center justify-between group"
                >
                  <span>AguAI Multi-Agent Workforce</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/moonshot"
                  className="text-slate-600 dark:text-white/50 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-between group font-medium"
                >
                  <span className="flex items-center gap-1">
                    <span>Project Ax04 </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      Moonshot
                    </span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white/90">
              Connect
            </h4>
            <div className="flex flex-col space-y-2.5 text-xs">
              <a
                href="https://github.com/itzabhishekgour"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors group"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/itzabhishekgour"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-white/50 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors group"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/abhishekgour1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-white/50 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-2 transition-colors group"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Twitter / X</span>
              </a>
              <Link
                href="/contact"
                className="text-slate-600 dark:text-white/50 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-2 transition-colors group"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>Email &amp; Contact</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-white/40">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Abhishek Gour (Tinexus).</span>
            <span className="hidden sm:inline text-slate-300 dark:text-white/10">•</span>
            <span className="font-mono text-[11px]">All rights reserved.</span>
          </div>

          <p className="text-xs text-slate-400 dark:text-white/30 italic">
            Focusing on systems, compilers, and developer tooling.
          </p>
          <span className="font-mono text-[11px] text-slate-400 dark:text-white/25">
            Last updated: {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
          </span>
        </div>
      </div>
    </footer>
  );
}
