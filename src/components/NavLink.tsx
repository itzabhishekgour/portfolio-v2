"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  mobile?: boolean;
}

export default function NavLink({
  href,
  label,
  onClick,
  mobile = false,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (mobile) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`group relative flex items-center justify-between py-3 text-xl font-medium transition-all duration-300 ${
          isActive
            ? "text-white font-semibold"
            : "text-white/70 hover:text-white"
        }`}
      >
        <span className="transition-transform duration-300 group-hover:translate-x-2">
          {label}
        </span>
        {isActive ? (
          <motion.span
            layoutId="mobile-active-indicator"
            className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative px-1 py-1 text-sm font-medium transition-all duration-300 ${
        isActive
          ? "text-slate-950 dark:text-white"
          : "text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white"
      }`}
    >
      <motion.span
        className="inline-block"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
      {isActive && (
        <motion.div
          layoutId="desktop-active-link"
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.4)]"
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        />
      )}
    </Link>
  );
}
