"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Eye } from "lucide-react";
import SidebarLink from "@/components/SidebarLink";
import ThemeToggle from "@/components/ThemeToggle";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ href: string; label: string }>;
}

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const socialLinks = [
  { name: "GitHub", href: "https://github.com/itzabhishekgour", icon: GithubIcon },
  { name: "LinkedIn", href: "https://linkedin.com/in/itzabhishekgour", icon: LinkedinIcon },
  { name: "Instagram", href: "https://instagram.com/itz_abhi_gour", icon: InstagramIcon },
  { name: "Email", href: "/contact", icon: MailIcon },
];

export default function MobileDrawer({ isOpen, onClose, navLinks }: MobileDrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop: Fullscreen Dark Blur Overlay */}
          <motion.div
            key="mobile-drawer-backdrop"
            className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel: Full Viewport Height Left Drawer */}
          <motion.div
            key="mobile-drawer-panel"
            className="fixed top-0 left-0 bottom-0 z-[1000] h-screen w-[280px] max-w-[85vw] bg-slate-50 dark:bg-[#0a0a0a] border-r border-slate-200 dark:border-white/10 shadow-2xl dark:shadow-[10px_0_30px_rgba(0,0,0,0.9)] flex flex-col justify-between p-6 overflow-y-auto md:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header: Monogram & Close Button */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/10">
                <Link href="/" onClick={onClose} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-black font-bold font-sans text-base tracking-tighter flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    AG
                  </div>
                  <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    TINEXUS<span className="text-cyan-600 dark:text-cyan-400 font-normal">.HQ</span>
                  </span>
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-500 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-slate-700 dark:text-white" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2 pt-6">
                <span className="px-4 text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-white/40 mb-2">
                  Navigation
                </span>
                {navLinks.map((link) => (
                  <SidebarLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    onClick={onClose}
                  />
                ))}
                <div className="mx-4 mt-4 grid grid-cols-2 gap-2">
                  <a
                    href="/abhishekgour_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-xl transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </a>
                  <a
                    href="/abhishekgour_resume.pdf"
                    download="Abhishek_Gour_Resume.pdf"
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-emerald-600 dark:text-emerald-450 bg-emerald-500/10 border border-emerald-500/20 rounded-xl transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </a>
                </div>
              </nav>
            </div>

            {/* Footer: Theme Toggle & Social Links */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/10 mt-8 flex flex-col gap-6">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-white/50">
                  Theme
                </span>
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-between px-2">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-slate-500 dark:text-white/50 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200/50 dark:hover:bg-white/10 transition-all duration-300"
                      aria-label={item.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
