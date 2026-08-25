"use client";

import { motion } from "framer-motion";

interface TechBadgeProps {
  name: string;
  size?: "sm" | "md";
}

export default function TechBadge({ name, size = "md" }: TechBadgeProps) {
  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/[0.06] bg-slate-100/70 dark:bg-white/[0.03] text-slate-700 dark:text-white/60 font-medium transition-all duration-300 hover:text-slate-950 dark:hover:text-white/90 hover:border-cyan-500/30 dark:hover:border-cyan-400/20 hover:bg-cyan-50 dark:hover:bg-cyan-400/[0.06] hover:shadow-[0_0_16px_-4px_rgba(8,145,178,0.2)] dark:hover:shadow-[0_0_16px_-4px_rgba(34,211,238,0.2)] cursor-default ${
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm"
      }`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {name}
    </motion.span>
  );
}
