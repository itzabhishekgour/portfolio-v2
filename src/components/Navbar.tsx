"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Download, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import NavLink from "@/components/NavLink";
import MobileDrawer from "@/components/MobileDrawer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/moonshot", label: "Moonshot" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Scroll detection (past 50px)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Navbar: Horizontal on Desktop, Top Bar on Mobile */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-slate-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/[0.05] shadow-sm dark:shadow-black/20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between">
          {/* Logo (Left Side): AG Monogram + Brand Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Abhishek Gour Portfolio Home"
          >
            <div
              onDoubleClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.dispatchEvent(new CustomEvent("thanos-snap"));
              }}
              title="Double-click to snap fingers"
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-black font-bold font-sans text-sm tracking-tighter flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer"
            >
              AG
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                TINEXUS<span className="text-cyan-500 font-normal">.HQ</span>
              </span>
              <span className="text-[10px] text-slate-400 dark:text-white/40 font-mono -mt-1 hidden sm:block">
                Abhishek Gour
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links & Theme Toggle (Center/Right) */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </nav>
            <div className="relative">
              <button
                onClick={() => setIsResumeOpen(!isResumeOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-lg transition-all duration-300 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
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
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-[#151515] border border-slate-200/80 dark:border-white/10 shadow-lg py-1.5 z-20 font-sans text-xs"
                    >
                      <a
                        href="/abhishekgour_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsResumeOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-500" />
                        View Resume
                      </a>
                      <a
                        href="/abhishekgour_resume.pdf"
                        download="Abhishek_Gour_Resume.pdf"
                        onClick={() => setIsResumeOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-500" />
                        Download
                      </a>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <div className="pl-4 border-l border-slate-200/60 dark:border-white/10">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Actions: Theme Toggle + Hamburger Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-lg text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200/50 dark:hover:bg-white/5 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Left Slide-in Drawer */}
      <MobileDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
