"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Activity,
  Cpu,
  Volume2,
  Layers,
  Terminal,
  Sparkles,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Radio,
  Sliders,
  Play,
  FileAudio,
} from "lucide-react";
import MermaidViewer from "@/components/MermaidViewer";

const voxpulsePipelineChart = `graph TD
    UserAudio["Raw Audio Input (dataset/positive + negative)"] --> Augment["Audio Augmentation Pipeline\n(Pitch Shift, Time Stretch, Noise Mix)"]
    Augment --> MelSpec["Mel-Spectrogram Feature Extraction\n(STFT & Log-Mel Filterbank)"]
    MelSpec --> CNN["Custom 2D Convolutional Neural Network\n(Feature map convolution & pooling)"]
    CNN --> TFLite["TFLite Quantization & Model Export\n(Lightweight .tflite binary)"]
    TFLite --> Engine["Real-Time Inference Engine\n(RMS Silence Gating → Edge Inference)"]
    Engine --> Trigger["trigger_my_action() Callback (On-Device Event)"]`;

export default function VoxPulseArchitecture() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "features" | "quickstart" | "inference">("pipeline");

  return (
    <div className="space-y-12">
      {/* Document Header Banner */}
      <div className="glass-card p-6 md:p-8 border border-purple-500/30 dark:border-purple-400/20 bg-gradient-to-br from-purple-500/5 via-slate-900/10 to-transparent relative overflow-hidden">
        <div className="hidden sm:block absolute top-0 right-0 px-4 py-1.5 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-b border-l border-emerald-500/30 text-xs font-mono font-semibold tracking-wider uppercase rounded-bl-xl">
          PUBLISHED ON PYPI · PIP INSTALL VOXPULSE
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <span className="sm:hidden px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold">
            PUBLISHED ON PYPI
          </span>
          <span className="px-3 py-1 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20 text-xs font-mono font-medium">
            VoxPulse Framework
          </span>
          <span className="text-xs text-slate-500 dark:text-white/40 font-mono">
            Python · TensorFlow Lite · NumPy · Librosa · Edge AI
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Custom Wake Word Detection Library
        </h3>
        <p className="text-sm md:text-base text-slate-600 dark:text-white/60 max-w-3xl leading-relaxed">
          A lightweight, offline, and 100% private DIY custom wake-word detection library for Python. Train custom voice triggers (e.g. &ldquo;Hey Friday&rdquo;) in any language with zero cloud dependencies and automatic data augmentation.
        </p>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-white/10 text-center">
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-purple-600 dark:text-purple-400">100% Offline</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Zero Cloud Data</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">RMS Gating</div>
            <div className="text-xs text-slate-500 dark:text-white/40">~0% Idle CPU Usage</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">2D CNN</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Mel-Spectrogram AI</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-amber-600 dark:text-amber-400">TFLite</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Edge Device Ready</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto whitespace-nowrap gap-2 border-b border-slate-200 dark:border-white/10 pb-4 scrollbar-none">
        {[
          { id: "pipeline", label: "Audio ML Pipeline", icon: Activity },
          { id: "features", label: "Architecture & Gating", icon: Cpu },
          { id: "quickstart", label: "Quick Start & Training", icon: Terminal },
          { id: "inference", label: "Real-Time Inference", icon: Play },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex-shrink-0 whitespace-nowrap transition-all ${
                isActive
                  ? "bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/30 shadow-sm"
                  : "text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        {/* 1. PIPELINE TAB */}
        {activeTab === "pipeline" && (
          <motion.div
            key="pipeline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Mermaid Pipeline Diagram */}
            <MermaidViewer
              id="voxpulse-pipeline-chart"
              chart={voxpulsePipelineChart}
              title="Automated Audio Data &amp; Training Pipeline (graph TD)"
              caption="From raw positive/negative .wav recordings to augmented Mel-Spectrograms, 2D CNN training, and .tflite edge model export"
            />

            {/* Pipeline Stage Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl glass-card border border-purple-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-purple-600 dark:text-purple-400">1. Data Augmentation</span>
                  <Sliders className="w-4 h-4 text-purple-500" />
                </div>
                <p className="text-xs text-slate-600 dark:text-white/60">
                  Automatically blends background noise, pitch shifts (&plusmn;2 semitones), and time stretches raw 1.5s voice samples into a rich training set.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-card border border-cyan-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400">2. Mel-Spectrograms</span>
                  <Volume2 className="w-4 h-4 text-cyan-500" />
                </div>
                <p className="text-xs text-slate-600 dark:text-white/60">
                  Computes Short-Time Fourier Transforms (STFT) with Log-Mel filterbanks to convert acoustic waves into 2D time-frequency visual representations.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-card border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">3. TFLite Quantization</span>
                  <Cpu className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-xs text-slate-600 dark:text-white/60">
                  Compiles trained 2D CNN weights into quantized TensorFlow Lite (<code className="font-mono">.tflite</code>) binaries for sub-millisecond edge inference.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. FEATURES & RMS GATING */}
        {activeTab === "features" && (
          <motion.div
            key="features"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Core Architectural Advantages
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-500" />
                    RMS Silence Gating (~0% Idle CPU)
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
                    Unlike naive wake-word loops that run neural inference continuously (draining laptop/IoT battery), VoxPulse calculates continuous Root Mean Square (RMS) audio energy. The neural network remains asleep until voice energy exceeds the noise threshold.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-3">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-500" />
                    100% Offline &amp; Privacy-First
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-white/60 leading-relaxed">
                    Zero cloud telemetry. Voice streams are processed in local volatile memory buffers and never touch disk or external APIs, making it compliant with strict air-gapped security environments.
                  </p>
                </div>
              </div>

              {/* Pros vs Cons Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2 text-xs">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block">Pros (The Good Stuff)</span>
                  <ul className="space-y-1 text-slate-600 dark:text-white/60 list-disc pl-4">
                    <li>100% Privacy: Local execution, no internet needed</li>
                    <li>Automated augmentation pipeline (pitch, stretch, noise)</li>
                    <li>RMS silence gate ensures &le; 1% idle CPU consumption</li>
                    <li>Lightweight 2D CNN compiled to portable .tflite</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2 text-xs">
                  <span className="font-bold text-amber-600 dark:text-amber-400 block">DIY Considerations</span>
                  <ul className="space-y-1 text-slate-600 dark:text-white/60 list-disc pl-4">
                    <li>Requires 5 minutes of custom recording (10-15 .wav samples)</li>
                    <li>Accuracy depends on the quality of provided background noise</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. QUICKSTART & TRAINING */}
        {activeTab === "quickstart" && (
          <motion.div
            key="quickstart"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8 space-y-6 font-mono text-xs">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
                <Terminal className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Quick Start: Install &amp; Train in 3 Steps
              </h4>

              {/* Step 1: Install */}
              <div className="space-y-1.5">
                <span className="text-slate-700 dark:text-white/80 font-bold uppercase tracking-wider">
                  Step 1: Install from PyPI
                </span>
                <div className="p-3.5 rounded-xl bg-slate-950 text-cyan-300 border border-cyan-500/20">
                  <pre>pip install voxpulse</pre>
                </div>
              </div>

              {/* Step 2: Dataset Directory */}
              <div className="space-y-1.5">
                <span className="text-slate-700 dark:text-white/80 font-bold uppercase tracking-wider">
                  Step 2: Prepare Audio Samples
                </span>
                <div className="p-3.5 rounded-xl bg-slate-950 text-emerald-400 border border-emerald-500/20">
                  <pre>{`dataset/
├── positive/  # 10-15 short (1.5s) .wav files of your wake word (e.g., "Hey Friday")
└── negative/  # 5-10 min .wav file of normal background room noise`}</pre>
                </div>
              </div>

              {/* Step 3: Train Python Script */}
              <div className="space-y-1.5">
                <span className="text-slate-700 dark:text-white/80 font-bold uppercase tracking-wider">
                  Step 3: Execute Training &amp; TFLite Export (train.py)
                </span>
                <div className="p-4 rounded-xl bg-slate-950 text-purple-300 border border-purple-500/20">
                  <pre>{`from voxpulse.model import VoxPulseTrainer

# Automatically augments data, extracts Mel-Spectrograms, and compiles CNN!
trainer = VoxPulseTrainer(dataset_dir="dataset")
trainer.train_and_export(epochs=20, export_name="my_custom_model.tflite")`}</pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. REAL-TIME INFERENCE */}
        {activeTab === "inference" && (
          <motion.div
            key="inference"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8 space-y-6 font-mono text-xs">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
                <Play className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Real-Time Inference Engine (run.py)
              </h4>

              <div className="p-5 rounded-xl bg-slate-950 text-emerald-300 border border-emerald-500/20 overflow-x-auto space-y-3">
                <div className="text-slate-400 text-[11px] font-sans">
                  Load your exported <code className="text-cyan-400 font-mono">.tflite</code> model to trigger background events instantly upon voice detection:
                </div>
                <pre>{`from voxpulse.inference import VoxPulseEngine

def trigger_my_action():
    print("✨ Custom Wake Word Detected! Executing home automation...")
    # Add your custom actions (e.g. open Spotify, activate lights, query LLM)

# Initialize engine with confidence threshold (0.0 to 1.0)
engine = VoxPulseEngine(model_path="my_custom_model.tflite", threshold=0.70)

# Start listening in a background thread with RMS silence gating
engine.start_listening(on_detect_callback=trigger_my_action)`}</pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
