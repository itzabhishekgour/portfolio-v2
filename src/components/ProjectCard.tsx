"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "compact";
  index?: number;
}

// Category color mapping
const categoryColors: Record<string, string> = {
  Systems:
    "text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-400/10 border-cyan-200 dark:border-cyan-400/20",
  "AI/ML":
    "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-400/10 border-purple-200 dark:border-purple-400/20",
  "Full-Stack":
    "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 border-blue-200 dark:border-blue-400/20",
  Security:
    "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/20",
  Research:
    "text-pink-700 dark:text-pink-400 bg-pink-50 dark:bg-pink-400/10 border-pink-200 dark:border-pink-400/20",
  "Open-Source":
    "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 border-emerald-200 dark:border-emerald-400/20",
  Moonshot:
    "text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-400/10 border-violet-200 dark:border-violet-400/20",
};

export default function ProjectCard({
  project,
  variant = "compact",
  index = 0,
}: ProjectCardProps) {
  const isFeatured = variant === "featured";

  return (
    <motion.div
      className="h-full"
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.08,
            ease: [0.25, 0.4, 0.25, 1],
          },
        },
      }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <motion.div
          className={`glass-card gradient-border group cursor-pointer h-full flex flex-col ${
            isFeatured ? "p-8" : "p-6"
          }`}
          whileHover={{
            y: -4,
            transition: { duration: 0.2 },
          }}
        >
          {/* Gradient top accent bar */}
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-500/40 dark:via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category badge */}
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full border ${
                categoryColors[project.category] ||
                "text-slate-600 dark:text-gray-400 bg-slate-100 dark:bg-gray-400/10 border-slate-200 dark:border-gray-400/20"
              }`}
            >
              {project.category}
            </span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-white/30 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300" />
          </div>

          {/* Title */}
          <h3
            className={`font-bold text-slate-900 dark:text-white/90 group-hover:text-cyan-600 dark:group-hover:text-white transition-colors duration-300 ${
              isFeatured ? "text-xl mb-3" : "text-lg mb-2"
            }`}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className={`text-slate-600 dark:text-white/50 leading-relaxed ${
              isFeatured ? "text-sm mb-3" : "text-sm mb-4"
            }`}
          >
            {project.description}
          </p>

          {/* Origin frustration hook: featured cards only */}
          {isFeatured && project.originStory && (
            <p className="text-xs text-slate-400 dark:text-white/25 italic mb-5 line-clamp-2 border-l-2 border-cyan-500/20 dark:border-cyan-400/10 pl-3">
              &ldquo;{project.originStory.frustration.split('.')[0]}.&rdquo;
            </p>
          )}

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.techStack.slice(0, isFeatured ? 6 : 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-white/40 border border-slate-200/80 dark:border-white/[0.06] group-hover:text-slate-900 dark:group-hover:text-white/60 group-hover:border-slate-300 dark:group-hover:border-white/10 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* PR number for open source */}
          {project.isOpenSource && project.prNumber && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
              <span className="text-xs text-emerald-600 dark:text-emerald-400/80 font-mono font-medium">
                PR {project.prNumber}
              </span>
            </div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
}
