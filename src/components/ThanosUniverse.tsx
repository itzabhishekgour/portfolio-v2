"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import html2canvas from "html2canvas-pro";

export default function ThanosUniverse() {
  const [isSnapped, setIsSnapped] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Base64-encoded snap (short click sound in WAV format)
  const SNAP_BASE64 = "UklGRiQAAABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACABAAZGF0YQAAAAA=";


  const playSnapAudio = (isReverse = false) => {

    const src = isReverse ? "/snap-reverse.mp3" : "/snap.mp3";
    const audio = new Audio(src);
  audio.currentTime = 0.8; // Start from 0.5 sec


    const fallback = () => {
      console.log("Main snap audio failed, using fallback/silent mode");

      const binary = atob(SNAP_BASE64);
      const array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
      const blob = new Blob([array.buffer], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);
      const fallbackAudio = new Audio(url);
      fallbackAudio.volume = 0.7;
    fallbackAudio.currentTime = 0.8; // Start from 0.5 sec
      console.log("Fallback snap audio (base64 WAV) playing");
      fallbackAudio.play().catch(() => {
        // If even this fails, keep silent
      });
    };

    audio.addEventListener("canplaythrough", () => {
      audio.volume = 0.7;
      audio.play().catch(fallback);
    });

    audio.addEventListener("error", fallback);


    audio.load();
  };

  // Trigger Snap Effect
  const triggerSnap = async () => {
    console.log("Thanos Snap triggerSnap initiated! isSnapped:", isSnapped, "isProcessing:", isProcessing);
    if (isSnapped || isProcessing) return;
    setIsProcessing(true);
    playSnapAudio(false);

    const wrapper = document.getElementById("universe-wrapper");
    if (!wrapper) {
      console.error("universe-wrapper not found!");
      setIsProcessing(false);
      return;
    }

    try {
      console.log("Starting html2canvas capture on wrapper:", wrapper);
      // 1. Capture visible viewport using html2canvas
      const canvas = await html2canvas(wrapper, {
        x: window.scrollX,
        y: window.scrollY,
        width: window.innerWidth,
        height: window.innerHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        backgroundColor: null,
        useCORS: true,
        scale: 1, // Capture at 1:1 resolution for speed
      });

      console.log("html2canvas capture completed. Canvas size:", canvas.width, "x", canvas.height);

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      const width = canvas.width;
      const height = canvas.height;
      const imgData = ctx.getImageData(0, 0, width, height);

      // Create overlay container
      const overlay = document.createElement("div");
      overlay.className = "fixed inset-0 z-[9998] pointer-events-none overflow-hidden";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      document.body.appendChild(overlay);
      overlayRef.current = overlay;

      // Slicing canvases (12 layers for great balance between performance and detail)
      const canvasCount = 12;
      const layers: HTMLCanvasElement[] = [];
      const layersCtx: CanvasRenderingContext2D[] = [];
      const layersImgData: ImageData[] = [];

      for (let i = 0; i < canvasCount; i++) {
        const c = document.createElement("canvas");
        c.width = width;
        c.height = height;
        c.style.position = "absolute";
        c.style.top = "0";
        c.style.left = "0";
        c.style.width = "100%";
        c.style.height = "100%";
        c.style.transform = "translate(0, 0) rotate(0deg) scale(1)";
        c.style.opacity = "1";
        c.style.filter = "blur(0px)";
        c.style.transitionProperty = "transform, opacity, filter";
        c.style.transitionTimingFunction = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        c.style.pointerEvents = "none";
        
        const cCtx = c.getContext("2d")!;
        layers.push(c);
        layersCtx.push(cCtx);
        layersImgData.push(cCtx.createImageData(width, height));
      }

      // Distribute pixels randomly across layers
      let nonZeroAlphaCount = 0;
      const dataLength = imgData.data.length;
      for (let i = 0; i < dataLength; i += 4) {
        if (imgData.data[i + 3] === 0) continue; // skip fully transparent pixels
        nonZeroAlphaCount++;

        // Random assignment
        const layerIdx = Math.floor(Math.random() * canvasCount);
        const targetData = layersImgData[layerIdx].data;

        targetData[i] = imgData.data[i];
        targetData[i + 1] = imgData.data[i + 1];
        targetData[i + 2] = imgData.data[i + 2];
        targetData[i + 3] = imgData.data[i + 3];
      }
      console.log("Pixel distribution completed. Non-zero alpha pixel count:", nonZeroAlphaCount);

      // Write pixel layers to canvases and append to overlay
      for (let i = 0; i < canvasCount; i++) {
        layersCtx[i].putImageData(layersImgData[i], 0, 0);
        overlay.appendChild(layers[i]);
      }

      // 2. Hide original DOM wrapper
      wrapper.style.transition = "opacity 0.3s ease";
      wrapper.style.opacity = "0";
      wrapper.style.pointerEvents = "none";

      setIsSnapped(true);
      setIsProcessing(false);

      // 3. Trigger GPU-accelerated CSS transition animations on the layers
      setTimeout(() => {
        layers.forEach((c, idx) => {
          // Pixels drift rightwards (wind) and float upwards (rising smoke)
          const tx = 80 + Math.random() * 120; // horizontal drift
          const ty = -60 - Math.random() * 80; // vertical lift
          const rot = Math.random() * 30 - 15; // rotate slightly
          const blurVal = 6 + Math.random() * 10; // dynamic blur
          const duration = 2.0 + Math.random() * 1.5; // staggered durations
          const delay = (idx * 0.05).toFixed(2); // staggered delays

          c.style.transitionDuration = `${duration}s`;
          c.style.transitionDelay = `${delay}s`;
          c.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(0.92)`;
          c.style.opacity = "0";
          c.style.filter = `blur(${blurVal}px)`;
        });
      }, 60);

      // Show reset CTA after 3.5 seconds
      setTimeout(() => {
        setShowReset(true);
      }, 3500);
    } catch (err) {
      console.error("Disintegration failed:", err);
      setIsProcessing(false);
    }
  };

  // Revert Snap Effect
  const restoreUniverse = () => {
    playSnapAudio(true);
    setShowReset(false);

    // Apply bright flash effect
    const flash = document.createElement("div");
    flash.className = "fixed inset-0 bg-white dark:bg-cyan-500/25 z-[9999] pointer-events-none transition-opacity duration-1000 opacity-100";
    document.body.appendChild(flash);
    setTimeout(() => {
      flash.style.opacity = "0";
      setTimeout(() => flash.remove(), 1000);
    }, 50);

    const wrapper = document.getElementById("universe-wrapper");
    if (wrapper) {
      // Fade wrapper back in
      wrapper.style.opacity = "1";
      wrapper.style.pointerEvents = "auto";
      
      // Clean up canvas overlays
      setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.remove();
          overlayRef.current = null;
        }
        setIsSnapped(false);
      }, 600);
    }
  };

  useEffect(() => {
    const handleSnapEvent = () => triggerSnap();
    window.addEventListener("thanos-snap", handleSnapEvent);

    return () => {
      window.removeEventListener("thanos-snap", handleSnapEvent);
    };
  }, [isSnapped, isProcessing]);

  return (
    <AnimatePresence>
      {showReset && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
        >
          <div className="glass-card max-w-sm w-full p-8 text-center border border-cyan-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />
            
            <span className="text-5xl mb-4 block animate-pulse">🫰✨</span>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Universe Snapped
            </h3>
            <p className="text-xs text-slate-500 dark:text-white/40 mb-6 leading-relaxed">
              You clicked the logo and dissolved the portfolio to dust. Half of all resources have ceased to exist.
            </p>

            <button
              onClick={restoreUniverse}
              className="glow-button w-full inline-flex items-center justify-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Restore Universe
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
