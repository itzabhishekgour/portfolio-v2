"use client";

import { motion } from "framer-motion";

interface GlowOrbProps {
  /** CSS color, e.g. "rgba(34, 211, 238, 0.15)" */
  color: string;
  /** Size in pixels */
  size: number;
  /** Position from top (%) */
  top: string;
  /** Position from left (%) */
  left: string;
  /** Animation delay in seconds */
  delay?: number;
}

export default function GlowOrb({
  color,
  size,
  top,
  left,
  delay = 0,
}: GlowOrbProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        width: size,
        height: size,
        top,
        left,
        filter: "blur(60px)",
      }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
