"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface SidebarLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

export default function SidebarLink({
  href,
  label,
  onClick,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-400 font-semibold shadow-sm shadow-cyan-500/5"
          : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.04]"
      }`}
    >
      {/* Active Left Indicator Bar */}
      {isActive && (
        <motion.div
          layoutId="active-sidebar-indicator"
          className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b from-cyan-400 to-emerald-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        />
      )}

      {/* Label with subtle hover translate right */}
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        {label}
      </span>
    </Link>
  );
}
