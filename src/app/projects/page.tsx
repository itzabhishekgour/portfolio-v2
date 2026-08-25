"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import {
  allDisplayProjects,
  categories,
  type Category,
} from "@/data/projects";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Category | "All">("All");

  const filtered =
    activeFilter === "All"
      ? allDisplayProjects
      : allDisplayProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen pt-20 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection className="mb-12">
          <h2 className="text-sm font-medium text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] mb-3">
            All Projects
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white/90 mb-2">
            The complete inventory.
          </h1>
          <p className="text-slate-600 dark:text-white/40 max-w-lg">
            13 repositories and projects spanning systems programming, AI/ML,
            full-stack, security, and open source.
          </p>
        </AnimatedSection>

        {/* Filter bar */}
        <AnimatedSection delay={0.1} className="mb-12">
          <div className="flex overflow-x-auto whitespace-nowrap gap-2 scrollbar-none pb-2">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg flex-shrink-0 whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "text-slate-900 dark:text-white bg-slate-200/80 dark:bg-white/[0.08] border border-slate-300/80 dark:border-white/10 shadow-sm"
                      : "text-slate-500 dark:text-white/30 border border-transparent hover:text-slate-900 dark:hover:text-white/60 hover:bg-slate-100 dark:hover:bg-white/[0.03]"
                  }`}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                       className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 rounded-full"
                      layoutId="filter-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Project Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                <ProjectCard project={project} variant="compact" index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 dark:text-white/30 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}

        {/* Count */}
        <div className="mt-12 text-center">
          <span className="text-xs text-slate-400 dark:text-white/20 font-mono">
            {filtered.length} artifact{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
