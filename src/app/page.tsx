"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles, Download, Eye } from "lucide-react";
import GlowOrb from "@/components/GlowOrb";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import MetricCounter from "@/components/MetricCounter";
import TechBadge from "@/components/TechBadge";
import { featuredProjects, openSourceProjects } from "@/data/projects";

// ═══════════════════════════════════════════════════
// TYPEWRITER HOOK
// ═══════════════════════════════════════════════════

const typewriterWords = [
  "C++20",
  "Java 21",
  "Python",
  "React",
  "Kotlin",
  "LLVM",
  "Spring Boot",
  "Next.js",
];

function useTypewriter(
  words: string[],
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDelay = 1800
) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));
          if (text.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseDelay);
          }
        } else {
          setText(currentWord.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDelay]);

  return text;
}

// ═══════════════════════════════════════════════════
// TECH TOOLBOX DATA
// ═══════════════════════════════════════════════════

const techCategories = [
  {
    label: "Languages",
    techs: ["C++", "Java", "Python", "TypeScript", "Kotlin"],
  },
  {
    label: "Frameworks",
    techs: ["Spring Boot", "React", "Next.js", "Qt6"],
  },
  {
    label: "AI / ML",
    techs: ["TensorFlow Lite", "LangChain4j", "Gemini"],
  },
  {
    label: "Infrastructure",
    techs: ["Docker", "PostgreSQL", "Redis", "Kubernetes"],
  },
];

// ═══════════════════════════════════════════════════
// HOMEPAGE
// ═══════════════════════════════════════════════════

export default function HomePage() {
  const typewriterText = useTypewriter(typewriterWords);
  const googlePR = openSourceProjects[0];
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative">
      {/* ─── SECTION 1: CINEMATIC HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center py-12 md:py-16 overflow-hidden grid-bg">
        {/* Floating glow orbs */}
        <GlowOrb
          color="rgba(34, 211, 238, 0.12)"
          size={500}
          top="10%"
          left="5%"
          delay={0}
        />
        <GlowOrb
          color="rgba(52, 211, 153, 0.08)"
          size={400}
          top="50%"
          left="70%"
          delay={2}
        />
        <GlowOrb
          color="rgba(139, 92, 246, 0.06)"
          size={350}
          top="70%"
          left="20%"
          delay={4}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Brand Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-6"
          >
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden border border-cyan-500/40 bg-black shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)]">
              <Image
                src="/tinexus-logo.png"
                alt="Tinexus Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-white/30 uppercase tracking-[0.2em]">
              <span className="w-8 h-px bg-gradient-to-r from-cyan-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400" />
              Systems Engineer
              <span className="w-8 h-px bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400" />
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="text-slate-950 dark:text-white">Abhishek</span>{" "}
            <span className="gradient-text">Gour</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-xl md:text-2xl text-slate-600 dark:text-white/50 font-light mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            I build web applications, developer tools, and systems to explore how software works under the hood.
          </motion.p>

          {/* Typewriter */}
          <motion.div
            className="text-lg md:text-xl font-mono text-cyan-600 dark:text-cyan-400/70 mb-10 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <span className="typewriter-cursor">{typewriterText}</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Link
              href="/projects"
              className="glow-button inline-flex items-center gap-2"
            >
              Explore My Work
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/moonshot"
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium text-slate-700 dark:text-white/50 border border-slate-300 dark:border-white/10 rounded-xl hover:text-slate-950 dark:hover:text-white/80 hover:border-slate-400 dark:hover:border-white/20 bg-white/40 dark:bg-transparent shadow-sm dark:shadow-none transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              The Moonshot
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsResumeOpen(!isResumeOpen)}
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium text-slate-700 dark:text-white/50 border border-slate-300 dark:border-white/10 rounded-xl hover:text-slate-950 dark:hover:text-white/80 hover:border-slate-400 dark:hover:border-white/20 bg-white/40 dark:bg-transparent shadow-sm dark:shadow-none transition-all duration-300 cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                Resume
              </button>
              <AnimatePresence>
                {isResumeOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsResumeOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 rounded-xl bg-white dark:bg-[#151515] border border-slate-200 dark:border-white/10 shadow-xl py-2 z-20 text-left text-sm font-sans"
                    >
                      <a
                        href="/abhishekgour_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsResumeOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-slate-700 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4 text-cyan-500" />
                        View Resume
                      </a>
                      <a
                        href="/abhishekgour_resume.pdf"
                        download="Abhishek_Gour_Resume.pdf"
                        onClick={() => setIsResumeOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-slate-700 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        <Download className="w-4 h-4 text-emerald-500" />
                        Download
                      </a>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 dark:text-white/20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em]">scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-cyan-500/40 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </motion.div>

        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-[#0a0a0a] to-transparent pointer-events-none" />
      </section>

      {/* ─── SECTION 2: METRICS BAR ─── */}
      <AnimatedSection className="py-16 border-y border-slate-200 dark:border-white/[0.03] transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <MetricCounter value={14} label="Repositories & Projects" />
          <MetricCounter value={1089} label="GitHub Contributions" />
          <MetricCounter value={2} label="Open Source PRs" />
          <MetricCounter value={1} label="PyPI Library" />
        </div>
      </AnimatedSection>

      {/* ─── SECTION 3: GRAND NARRATIVE ─── */}
      <AnimatedSection className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-medium text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-8">
            The Story
          </h2>
          <div className="space-y-6 text-lg text-slate-600 dark:text-white/50 leading-relaxed">
            <p>
              I graduated with a{" "}
              <span className="text-slate-900 dark:text-white/90 font-semibold">
                CSE degree in 2024
              </span>
              , which gave me a solid foundation in operating systems, compiler theory, and digital logic. Since then, I&apos;ve focused on building systems and tools that explore the layers beneath typical application abstractions.
            </p>
            <p>
              Rather than relying solely on pre-existing libraries, I prefer writing core components myself to understand how they work under the hood. This curiosity led me to write a custom{" "}
              <span className="text-cyan-700 dark:text-cyan-400 font-medium">
                Wayland compositor
              </span>{" "}
              in C++ to learn desktop graphics and window management, design a processor architecture utilizing quaternary logic, and implement a compiler targeting LLVM IR for my own programming language.
            </p>
            <p>
              When I encounter friction in my daily workflow, I build utilities to solve it. I created Smriti, a secrets manager, to handle environment variables securely across machines, TinexusFlow to map and navigate LLM conversations as tree-structured graphs, and VoxPulse, a custom wake-word library on PyPI, to bypass the constraints of commercial voice engines. I also enjoy contributing to open-source software, such as identifying and fixing a compiler pass bug in{" "}
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                Google&apos;s Closure Compiler
              </span>{" "}
              (PR #4333).
            </p>
            <p className="text-base text-slate-500 dark:text-white/30 border-l-2 border-cyan-500/30 dark:border-cyan-400/20 pl-5 italic">
              Understanding systems comes from building them.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* ─── SECTION 4: THE SHIPYARD: FEATURED PROJECTS ─── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-12">
            <h2 className="text-sm font-medium text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-3">
              The Shipyard
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white/90">
              What I&apos;ve built.
            </p>
          </AnimatedSection>

          <AnimatedSection
            stagger
            staggerDelay={0.08}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant="featured"
                index={i}
              />
            ))}
          </AnimatedSection>

          <AnimatedSection delay={0.4} className="mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 dark:text-white/30 dark:hover:text-white/60 transition-colors duration-300"
            >
              View all projects
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── SECTION 5: OPEN SOURCE HIGHLIGHT ─── */}
      {googlePR && (
        <AnimatedSection className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-sm font-medium text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-8">
              Open Source
            </h2>
            <Link href={`/projects/${googlePR.slug}`}>
              <motion.div
                className="glass-card p-8 pulse-glow cursor-pointer group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-400 dark:border-emerald-400/20 font-medium">
                      Google
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-white/30">
                      PR {googlePR.prNumber}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 dark:text-white/20 dark:group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white/90 mb-2 group-hover:text-cyan-600 dark:group-hover:text-white transition-colors">
                  {googlePR.title}
                </h3>
                <p className="text-slate-600 dark:text-white/40 text-sm mb-4">
                  Fixed NPE in InlineObjectLiterals. Passed Google CI pipeline.
                  Signed Google CLA.
                </p>
                <div className="flex flex-wrap gap-2">
                  {googlePR.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-white/40 border border-slate-200/80 dark:border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Link>
          </div>
        </AnimatedSection>
      )}

      {/* ─── SECTION 6: TECH TOOLBOX ─── */}
      <section className="py-24 px-6 border-t border-slate-200 dark:border-white/[0.03] transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="mb-12">
            <h2 className="text-sm font-medium text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-3">
              The Toolbox
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white/90">
              Technologies I work with.
            </p>
          </AnimatedSection>

          {techCategories.map((category, catIndex) => (
            <AnimatedSection
              key={category.label}
              delay={catIndex * 0.1}
              className="mb-8"
            >
              <h3 className="text-xs font-medium text-slate-400 dark:text-white/20 uppercase tracking-[0.15em] mb-3">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.techs.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ─── SECTION 7: MOONSHOT TEASER ─── */}
      <AnimatedSection className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/moonshot">
            <motion.div
              className="relative glass-card p-12 text-center cursor-pointer group overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10">
                <span className="text-4xl mb-6 block">🧠</span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white/90 mb-3">
                  The Moonshot:{" "}
                  <span className="gradient-text">Project Ax04</span>
                </h2>
                <p className="text-slate-600 dark:text-white/40 max-w-lg mx-auto mb-6 leading-relaxed">
                  An autonomous, self-improving agent system built with decentralized microservices, full OS automation, automated network failover, and recursive self-evolution (neuroplasticity).
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 group-hover:text-cyan-700 dark:text-cyan-400/60 dark:group-hover:text-cyan-400 transition-colors">
                  Explore the Vision
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
