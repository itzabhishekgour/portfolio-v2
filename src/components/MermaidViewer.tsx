"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Eye,
  RefreshCw,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
} from "lucide-react";

interface MermaidViewerProps {
  chart: string;
  id?: string;
  title?: string;
  caption?: string;
}

export default function MermaidViewer({
  chart,
  id = "mermaid-diagram",
  title,
  caption,
}: MermaidViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [showCode, setShowCode] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [mounted, setMounted] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when fullscreen modal is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  useEffect(() => {
    let isMounted = true;

    async function renderChart() {
      setLoading(true);
      setError(null);

      try {
        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;

        const isDark = resolvedTheme === "dark";

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "var(--font-geist-sans), Inter, sans-serif",
          themeVariables: isDark
            ? {
                darkMode: true,
                background: "#0a0a0a",
                mainBkg: "#141414",
                primaryColor: "#083344",
                primaryTextColor: "#e2e8f0",
                primaryBorderColor: "#06b6d4",
                lineColor: "#22d3ee",
                secondaryColor: "#064e3b",
                secondaryBorderColor: "#10b981",
                tertiaryColor: "#1e1b4b",
                tertiaryBorderColor: "#8b5cf6",
                clusterBkg: "#0f172a80",
                clusterBorder: "#334155",
                nodeBorder: "#0891b2",
                titleColor: "#38bdf8",
                edgeLabelBackground: "#0f172a",
              }
            : {
                darkMode: false,
                background: "#ffffff",
                mainBkg: "#f8fafc",
                primaryColor: "#e0f2fe",
                primaryTextColor: "#0f172a",
                primaryBorderColor: "#0284c7",
                lineColor: "#0284c7",
                secondaryColor: "#dcfce7",
                secondaryBorderColor: "#059669",
                tertiaryColor: "#f3e8ff",
                tertiaryBorderColor: "#7c3aed",
                clusterBkg: "#f1f5f9",
                clusterBorder: "#cbd5e1",
                nodeBorder: "#0284c7",
                titleColor: "#0369a1",
                edgeLabelBackground: "#ffffff",
              },
        });

        const uniqueId = `mermaid-${id}-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(uniqueId, chart);

        if (isMounted) {
          setSvgContent(svg);
          setLoading(false);
        }
      } catch (err: any) {
        console.error("Mermaid render error:", err);
        if (isMounted) {
          setError(err?.message || "Failed to render diagram");
          setLoading(false);
        }
      }
    }

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart, id, resolvedTheme]);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };
    if (isFullscreen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.25, 3.5));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoomScale(1);

  const modalContent = (
    <AnimatePresence>
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-screen z-[99999] bg-[#090d16]/98 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-6 text-white overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsFullscreen(false);
            }
          }}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 relative z-20 shrink-0">
            <div>
              <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                {title || "Interactive System Architecture Diagram"}
              </h3>
              {caption && (
                <p className="text-xs text-cyan-300/70 font-mono mt-0.5">{caption}</p>
              )}
            </div>

            {/* Zoom Controls & Close */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col sm:flex-row items-center gap-1 bg-white/10 border border-white/15 rounded-xl p-1 shadow-lg">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400 py-1 sm:py-0 px-2 min-w-[45px] sm:min-w-[55px] text-center">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                  title="Zoom In (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors border-t sm:border-t-0 sm:border-l border-white/10 mt-1 pt-2 sm:mt-0 sm:ml-1 sm:pl-2"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-white/80 hover:text-white border border-white/15 hover:border-red-500/40 transition-all cursor-pointer shadow-lg"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body: Scalable Pan/Scroll Container */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-4 md:p-8 my-2 relative">
            <div
              className="transition-transform duration-200 ease-out origin-center flex justify-center items-center m-auto"
              style={{ transform: `scale(${zoomScale})` }}
            >
              <div
                className="shadow-2xl rounded-2xl bg-[#0d1322] p-6 md:p-8 border border-cyan-500/30 [&>svg]:min-w-[650px] md:[&>svg]:min-w-[850px] [&>svg]:w-full [&>svg]:h-auto [&>svg]:block [&>svg]:mx-auto"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            </div>
          </div>

          {/* Modal Footer Controls Hint */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-2 text-xs text-white/50 font-mono pt-3 border-t border-white/10 relative z-20 shrink-0">
            <span>Use Zoom controls above · Press ESC or click outside to close</span>
            <span className="text-cyan-400 font-semibold hidden sm:inline">Architecture Inspector</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="glass-card p-5 md:p-6 space-y-4 overflow-hidden border border-slate-200 dark:border-white/10">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
          <div>
            {title && (
              <h5 className="font-bold text-sm md:text-base text-slate-900 dark:text-white flex items-center gap-2">
                {title}
              </h5>
            )}
            {caption && (
              <p className="text-xs text-slate-500 dark:text-white/40 mt-0.5">{caption}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!showCode && svgContent && (
              <button
                onClick={() => {
                  setZoomScale(1);
                  setIsFullscreen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30 transition-all cursor-pointer"
                title="Expand & Zoom Diagram"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Zoom &amp; Expand</span>
              </button>
            )}

            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white/70 border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
            >
              {showCode ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  View Visual
                </>
              ) : (
                <>
                  <Code className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  Source
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Area */}
        {showCode ? (
          <div className="p-4 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs overflow-x-auto border border-cyan-500/20 max-h-[500px]">
            <pre>{chart}</pre>
          </div>
        ) : (
          <div className="relative min-h-[220px] flex items-center justify-center overflow-x-auto py-4 group">
            {loading && (
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-white/40 animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-500" />
                Rendering System Architecture Diagram...
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-400 font-mono">
                <p className="font-bold mb-1">Diagram Render Warning</p>
                <p className="opacity-80">{error}</p>
              </div>
            )}

            {!loading && !error && svgContent && (
              <div className="relative w-full cursor-pointer" onClick={() => { setZoomScale(1); setIsFullscreen(true); }}>
                <div
                  ref={containerRef}
                  className="w-full flex justify-center [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:mx-auto transition-all duration-300 group-hover:scale-[1.01]"
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                />
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors flex items-center justify-center pointer-events-none rounded-xl">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/90 text-white text-xs font-mono px-3 py-1.5 rounded-full border border-cyan-500/40 shadow-xl flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-400" /> Click to Zoom Fullscreen
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Render Fullscreen Modal via React Portal directly into document.body */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}


