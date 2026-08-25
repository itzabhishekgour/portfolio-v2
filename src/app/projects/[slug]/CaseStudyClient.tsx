"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, GitFork, ExternalLink, Zap } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import TinexusArchitecture from "@/components/TinexusArchitecture";
import DNALangArchitecture from "@/components/DNALangArchitecture";
import AguAIArchitecture from "@/components/AguAIArchitecture";
import VoxPulseArchitecture from "@/components/VoxPulseArchitecture";
import TinexusFlowArchitecture from "@/components/TinexusFlowArchitecture";
import SmritiArchitecture from "@/components/SmritiArchitecture";
import type { Project } from "@/data/projects";

// Category gradient mapping
const categoryGradients: Record<string, string> = {
  Systems: "from-cyan-500/10 dark:from-cyan-400/20 to-blue-500/10 dark:to-blue-500/20",
  "AI/ML": "from-purple-500/10 dark:from-purple-400/20 to-pink-500/10 dark:to-pink-500/20",
  "Full-Stack": "from-blue-500/10 dark:from-blue-400/20 to-indigo-500/10 dark:to-indigo-500/20",
  Security: "from-amber-500/10 dark:from-amber-400/20 to-orange-500/10 dark:to-orange-500/20",
  Research: "from-pink-500/10 dark:from-pink-400/20 to-rose-500/10 dark:to-rose-500/20",
  "Open-Source": "from-emerald-500/10 dark:from-emerald-400/20 to-green-500/10 dark:to-green-500/20",
};

export default function CaseStudyClient({ project }: { project: Project }) {
  const gradient =
    categoryGradients[project.category] ||
    "from-cyan-500/10 dark:from-cyan-400/20 to-emerald-500/10 dark:to-emerald-400/20";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className={`relative pt-20 pb-16 px-6 bg-gradient-to-b ${gradient} to-transparent`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 dark:text-white/30 dark:hover:text-white/60 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Logo Badge for Tinexus */}
          {project.slug === "tinexus" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="mb-6"
            >
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-cyan-500/40 bg-black shadow-[0_0_25px_-5px_rgba(34,211,238,0.4)]">
                <Image
                  src="/tinexus-logo.png"
                  alt="Tinexus Platform Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          )}

          {/* Category */}
          <motion.span
            className="inline-block text-xs font-semibold text-cyan-700 dark:text-cyan-400/70 uppercase tracking-[0.15em] mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {project.category}
          </motion.span>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white/95 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-slate-600 dark:text-white/50 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.description}
          </motion.p>

          {/* Tech stack pills */}
          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-sm px-3.5 py-1.5 rounded-lg bg-slate-100/90 dark:bg-white/[0.05] text-slate-700 dark:text-white/60 border border-slate-200 dark:border-white/[0.08] font-medium"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-white/70 border border-slate-300 dark:border-white/10 rounded-xl hover:text-slate-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/20 bg-white/40 dark:bg-transparent shadow-sm dark:shadow-none transition-all duration-300"
              >
                <GitFork className="w-4 h-4" />
                {project.isOpenSource ? "View PR" : "View Source"}
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-button inline-flex items-center gap-2 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Origin Story */}
      {project.originStory && (
        <AnimatedSection className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-sm font-medium text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-8">
              Why This Exists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* The Frustration */}
              <motion.div
                className="glass-card p-6 relative overflow-hidden group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500/60 to-orange-500/60 dark:from-red-400/40 dark:to-orange-400/40" />
                <div className="pl-3">
                  <span className="text-xs font-semibold text-red-600/80 dark:text-red-400/60 uppercase tracking-[0.15em] mb-3 block">
                    The Frustration
                  </span>
                  <p className="text-sm text-slate-600 dark:text-white/50 leading-relaxed italic">
                    &ldquo;{project.originStory.frustration}&rdquo;
                  </p>
                </div>
              </motion.div>

              {/* The Solution */}
              <motion.div
                className="glass-card p-6 relative overflow-hidden group"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500/60 to-emerald-500/60 dark:from-cyan-400/40 dark:to-emerald-400/40" />
                <div className="pl-3">
                  <span className="text-xs font-semibold text-cyan-600/80 dark:text-cyan-400/60 uppercase tracking-[0.15em] mb-3 block">
                    The Solution
                  </span>
                  <p className="text-sm text-slate-700 dark:text-white/60 leading-relaxed">
                    {project.originStory.solution}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Overview */}
      <AnimatedSection className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-medium text-slate-400 dark:text-white/30 uppercase tracking-[0.15em] mb-6">
            Overview
          </h2>
          <p className="text-lg text-slate-600 dark:text-white/50 leading-relaxed">
            {project.longDescription}
          </p>
        </div>
      </AnimatedSection>

      {/* Key Achievements / Metrics */}
      {project.metrics.length > 0 && (
        <AnimatedSection className="py-20 px-6 border-t border-slate-200 dark:border-white/[0.03] transition-colors duration-300">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-sm font-medium text-slate-400 dark:text-white/30 uppercase tracking-[0.15em] mb-8">
              Key Achievements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-5 flex items-start gap-3"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400/60 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-white/60">
                    {metric}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Architecture Deep Dive */}
      <AnimatedSection className="py-20 px-6 border-t border-slate-200 dark:border-white/[0.03] transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-medium text-slate-400 dark:text-white/30 uppercase tracking-[0.15em] mb-8">
            System Architecture
          </h2>

          {project.slug === "tinexus" ? (
            <TinexusArchitecture />
          ) : project.slug === "dna-lang" ? (
            <DNALangArchitecture />
          ) : project.slug === "aguai" ? (
            <AguAIArchitecture />
          ) : project.slug === "voxpulse" ? (
            <VoxPulseArchitecture />
          ) : project.slug === "tinexusflow" ? (
            <TinexusFlowArchitecture />
          ) : project.slug === "smriti" ? (
            <SmritiArchitecture />
          ) : (
            <div className="glass-card p-12 text-center">
              <p className="text-slate-400 dark:text-white/30 text-sm">
                Detailed architecture diagrams and deep-dive documentation coming
                soon.
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
