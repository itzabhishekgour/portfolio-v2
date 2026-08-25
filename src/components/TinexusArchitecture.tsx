"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Cpu,
  Layers,
  CheckCircle2,
  Terminal,
  BookOpen,
  Boxes,
  Zap,
  Search,
  Lock,
  Workflow,
  Radio,
  FileCode,
  Gauge,
  Sparkles,
  ArrowRight,
  Database,
  Network,
  Activity,
  GitBranch,
} from "lucide-react";
import MermaidViewer from "@/components/MermaidViewer";

interface ComponentEntry {
  name: string;
  process: string;
  lang: string;
  framework: string;
  role: string;
  tier: "Core" | "Service" | "UI" | "Native App" | "Runtime";
}

const componentInventory: ComponentEntry[] = [
  { name: "Compositor", process: "tinexus-comp", lang: "C++20", framework: "wlroots 0.18+", role: "Wayland compositor, window manager, rendering pipeline, damage tracking", tier: "Core" },
  { name: "Session Manager", process: "tinexus-session", lang: "C++20", framework: "libsystemd", role: "Session lifecycle, ordered startup, daemon health supervision", tier: "Core" },
  { name: "Universal Launcher", process: "tinexus-launcher", lang: "C++20 + QML", framework: "Qt6 / QtQuick", role: "Ctrl+K command palette, pluggable search orchestration", tier: "UI" },
  { name: "Notification Daemon", process: "tinexus-notif", lang: "C++20", framework: "Qt6 (headless)", role: "org.freedesktop.Notifications implementation with urgency queues", tier: "Service" },
  { name: "Settings Daemon", process: "tinexus-settings", lang: "C++20", framework: "TOML / inotify", role: "Atomic config read/write, change events over D-Bus", tier: "Service" },
  { name: "Settings UI", process: "tinexus-settings-ui", lang: "C++20 + QML", framework: "Qt6", role: "Graphical configuration panel and theme token manager", tier: "UI" },
  { name: "Clipboard Manager", process: "tinexus-clip", lang: "C++20", framework: "Wayland Protocols", role: "Clipboard history, FIFO session storage, mime-type negotiation", tier: "Service" },
  { name: "App & Search Indexer", process: "tinexus-indexer", lang: "C++20", framework: "Trigram Engine", role: ".desktop parsing, trigram L2 RAM index, inotify cache invalidation", tier: "Service" },
  { name: "Wallpaper Engine", process: "tinexus-wallpaper", lang: "C++20", framework: "Qt6 / OpenGL", role: "zwlr_layer_shell_v1 BACKGROUND surface with async crossfade", tier: "Service" },
  { name: "Lock Screen", process: "tinexus-lock", lang: "C++20 + QML", framework: "Qt6 + PAM", role: "ext-session-lock-v1 protocol, secure PAM authentication", tier: "UI" },
  { name: "Spring Dock", process: "tinexus-dock", lang: "C++20", framework: "txui", role: "Optional bottom dock with spring physics & pinned applications", tier: "UI" },
  { name: "Native Terminal", process: "tinexus-terminal", lang: "C++20", framework: "txui + libvte", role: "Hardware-accelerated Wayland-native PTY terminal emulator", tier: "Native App" },
  { name: "File Manager", process: "tinexus-files", lang: "C++20", framework: "txui", role: "Miller-column native file explorer with instant preview", tier: "Native App" },
  { name: "App Installer", process: "tinexus-app-installer", lang: "C++20", framework: "txui", role: "AppImage, Flatpak, and package installer UI with sandboxing", tier: "Native App" },
  { name: "Plugin Host", process: "tinexus-plugin-host", lang: "C++20", framework: "seccomp-bpf", role: "Isolated out-of-process plugin sandbox communicating over Unix sockets", tier: "Runtime" },
];

const layersData = [
  { level: "Layer 7", title: "Native Apps & Sandboxed Plugins", desc: "tinexus-terminal, tinexus-files, isolated plugin host (seccomp-bpf restricted)", color: "border-purple-500/40 bg-purple-500/5 text-purple-600 dark:text-purple-400" },
  { level: "Layer 6", title: "Tinexus Shell UI Surfaces", desc: "tinexus-launcher (Qt6/QML), dock, lock screen (PAM), settings UI over zwlr_layer_shell_v1", color: "border-pink-500/40 bg-pink-500/5 text-pink-600 dark:text-pink-400" },
  { level: "Layer 5", title: "Platform Daemons & Microservices", desc: "tinexus-settings, tinexus-notif, tinexus-clip, tinexus-indexer (Trigram), tinexus-wallpaper", color: "border-blue-500/40 bg-blue-500/5 text-blue-600 dark:text-blue-400" },
  { level: "Layer 4", title: "Session & Process Supervisor", desc: "tinexus-session (PID tracking, SIGCHLD watchdog, ordered startup & 3x restart recovery)", color: "border-indigo-500/40 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400" },
  { level: "Layer 3", title: "Compositor Core (tinexus-comp)", desc: "C++20 + wlroots 0.18+: Scene graph, window layout, damage accumulator, frame scheduling", color: "border-cyan-500/40 bg-cyan-500/5 text-cyan-600 dark:text-cyan-400" },
  { level: "Layer 2", title: "System Libraries & Protocols", desc: "wlroots, libinput, pixman, EGL/Vulkan, libdbus (sd-bus), libsystemd, libpam", color: "border-teal-500/40 bg-teal-500/5 text-teal-600 dark:text-teal-400" },
  { level: "Layer 1", title: "Linux Kernel Subsystems", desc: "DRM/KMS (Direct Rendering Manager), GBM buffer allocator, evdev input, DMA-BUF", color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400" },
  { level: "Layer 0", title: "Physical Hardware", desc: "GPU (Mesa/DRM drivers), Displays (KMS), Input devices (evdev), PipeWire Audio", color: "border-slate-400/40 bg-slate-500/5 text-slate-700 dark:text-slate-300" },
];

const protocolsList = [
  { name: "xdg-shell", purpose: "Application window lifecycle & state", type: "Stable" },
  { name: "wlr-layer-shell-unstable-v1", purpose: "Launcher, lock screen, wallpaper layers", type: "Core wlroots" },
  { name: "xdg-decoration-unstable-v1", purpose: "Server-side vs Client-side window borders", type: "Desktop" },
  { name: "ext-session-lock-v1", purpose: "Cryptographically secure session locking", type: "Security" },
  { name: "wlr-output-management-unstable-v1", purpose: "Multi-monitor layout, HiDPI & refresh rate", type: "Display" },
  { name: "zwp-idle-inhibit-unstable-v1", purpose: "Prevent sleep during fullscreen video/gaming", type: "Power" },
  { name: "zwlr-screencopy-v1", purpose: "DMA-BUF zero-copy screenshot & recording", type: "Media" },
  { name: "xwayland", purpose: "Legacy X11 compatibility sandbox", type: "Compatibility" },
];

const adrs = [
  { id: "ADR-001", title: "wlroots as Compositor Core", rationale: "Handles DRM/KMS, GBM, libinput, DMA-BUF, and ~30 protocols; cuts compositor development time by 90%." },
  { id: "ADR-002", title: "Hybrid IPC: D-Bus + Unix Sockets", rationale: "D-Bus for discovery/settings; binary Unix sockets for ultra-low latency frame sync." },
  { id: "ADR-003", title: "Qt6 + QML (QtQuick) for UI", rationale: "GPU-accelerated scene graph via Qt RHI (Vulkan primary, OpenGL fallback)." },
  { id: "ADR-004", title: "TOML Configuration Architecture", rationale: "Human-readable, typed, atomic file write protocol (~/.config/tinexus/*.toml)." },
  { id: "ADR-005", title: "Zero In-Process Plugins", rationale: "Security non-negotiable; plugins run as isolated child processes with seccomp filters." },
  { id: "ADR-006", title: "Pluggable ISearchProvider", rationale: "Enables fuzzy search, calculator, shell commands, and future local NLP without modifying core." },
  { id: "ADR-007", title: "Optional Minimal Spring Dock", rationale: "Defaults to empty desktop for power users while offering accessibility affordance." },
  { id: "ADR-008", title: "Strict API Stability Tiers", rationale: "STABLE, UNSTABLE, and PRIVATE contracts with Semantic Versioning." },
  { id: "ADR-009", title: "Reproducible CMake 3.28+ Matrix", rationale: "ASan and UBSan sanitizers enforced across GCC & Clang debug pipelines." },
  { id: "ADR-010", title: "Local NLP AI Layer (No Cloud)", rationale: "Offline-first, zero telemetry, privacy-preserving command parsing via llama.cpp." },
];

// ═══════════════════════════════════════════════════════════
// COMPLETE MERMAID ARCHITECTURE CHARTS (03_SYSTEM_ARCHITECTURE.md)
// ═══════════════════════════════════════════════════════════

// 1. Layered Architecture (graph TB)
const layeredArchitectureChart = `graph TB
    subgraph L0["Layer 0: Hardware"]
        HW_GPU["GPU (Mesa/DRM)"]
        HW_INPUT["Input Devices (evdev)"]
        HW_DISP["Display (KMS/DRM)"]
        HW_AUDIO["Audio (PipeWire)"]
    end

    subgraph L1["Layer 1: Linux Kernel"]
        K_DRM["DRM/KMS Subsystem"]
        K_INPUT["Input Subsystem (evdev)"]
        K_GBM["GBM Buffer Allocator"]
        K_WL["Kernel Wayland Sockets"]
    end

    subgraph L2["Layer 2: System Libraries"]
        LIB_WLROOTS["wlroots 0.18+"]
        LIB_LIBINPUT["libinput"]
        LIB_PIXMAN["pixman"]
        LIB_EGL["EGL / OpenGL ES"]
        LIB_VULKAN["Vulkan / SPIR-V"]
        LIB_DBUS["libdbus / sd-bus"]
        LIB_PAM["libpam"]
        LIB_SYSTEMD["libsystemd (logind)"]
    end

    subgraph L3["Layer 3: Tinexus Shell Core"]
        COMP["tinexus-comp (Compositor)"]
        SESSION["tinexus-session (Session Manager)"]
    end

    subgraph L4["Layer 4: Tinexus Shell Services"]
        SETTINGS["tinexus-settings"]
        NOTIF["tinexus-notif"]
        CLIP["tinexus-clip"]
        INDEXER["tinexus-indexer"]
        WALLPAPER["tinexus-wallpaper"]
    end

    subgraph L5["Layer 5: Tinexus Shell UI"]
        LAUNCHER["tinexus-launcher (Qt6/QML)"]
        DOCK["tinexus-dock (Dock UI)"]
        LOCK["tinexus-lock (Lock Screen)"]
        SETTINGSUI["tinexus-settings-ui (Qt6)"]
    end

    subgraph L6["Layer 6: Tinexus Shell Native Apps"]
        TERMINAL["tinexus-terminal (Native Terminal)"]
        FILES["tinexus-files (File Manager)"]
        INSTALLER["tinexus-app-installer (AppImage)"]
    end

    subgraph L7P["Layer 7: Plugin Runtime (Future)"]
        PLUGINHOST["tinexus-plugin-host"]
        PLUGINS["Plugin Processes (sandboxed)"]
    end

    subgraph L7A["Layer 7: Applications"]
        APPS["User Applications (Wayland/XWayland)"]
    end

    HW_GPU --> K_DRM
    HW_INPUT --> K_INPUT
    HW_DISP --> K_DRM

    K_DRM --> LIB_WLROOTS
    K_INPUT --> LIB_LIBINPUT
    LIB_LIBINPUT --> LIB_WLROOTS

    LIB_WLROOTS --> COMP
    LIB_DBUS --> SESSION
    LIB_SYSTEMD --> SESSION
    LIB_PAM --> LOCK

    SESSION --> COMP
    SESSION --> SETTINGS
    SESSION --> NOTIF
    SESSION --> CLIP
    SESSION --> INDEXER
    SESSION --> WALLPAPER
    SESSION --> LAUNCHER
    SESSION --> PLUGINHOST

    COMP --> LAUNCHER
    COMP --> LOCK
    COMP --> APPS
    COMP --> WALLPAPER

    INDEXER --> LAUNCHER
    NOTIF --> LAUNCHER
    CLIP --> LAUNCHER
    SETTINGS --> COMP
    SETTINGS --> LAUNCHER

    PLUGINHOST --> PLUGINS
    PLUGINHOST --> LAUNCHER`;

// 2. Module Interaction Map (graph LR)
const moduleInteractionChart = `graph LR
    subgraph IPC["IPC: D-Bus Session Broker"]
        DBUS[("D-Bus\nSystem/Session Bus")]
    end

    COMP["tinexus-comp"]
    SESSION["tinexus-session"]
    LAUNCHER["tinexus-launcher"]
    NOTIF["tinexus-notif"]
    SETTINGS["tinexus-settings"]
    CLIP["tinexus-clip"]
    INDEXER["tinexus-indexer"]
    WALLPAPER["tinexus-wallpaper"]
    LOCK["tinexus-lock"]
    SYSTEMD["systemd/logind"]
    APPS["Applications"]

    COMP <-->|Wayland Protocol| APPS
    COMP <-->|Wayland Protocol| LAUNCHER
    COMP <-->|Wayland Protocol| LOCK
    COMP <-->|Wayland Protocol| WALLPAPER

    SESSION <-->|D-Bus| DBUS
    LAUNCHER <-->|D-Bus| DBUS
    NOTIF <-->|D-Bus| DBUS
    SETTINGS <-->|D-Bus| DBUS
    CLIP <-->|D-Bus| DBUS
    INDEXER <-->|D-Bus| DBUS
    WALLPAPER <-->|D-Bus| DBUS
    COMP <-->|D-Bus| DBUS
    SYSTEMD <-->|D-Bus| DBUS

    APPS -.->|Notifications| NOTIF
    SETTINGS -.->|Config Signals| COMP
    SETTINGS -.->|Config Signals| LAUNCHER
    INDEXER -.->|Search Results| LAUNCHER
    CLIP -.->|Clipboard Sync| LAUNCHER
    NOTIF -.->|Notification Feed| LAUNCHER`;

// 3. Rendering Pipeline (graph TD)
const renderingPipelineChart = `graph TD
    subgraph INP["Input"]
        APP["Wayland Application"]
        DAMAGE["Damage Region (Dirty Rects)"]
    end

    subgraph COMPCORE["Compositor Core (tinexus-comp)"]
        SCENE["wlroots Scene Graph"]
        LAYOUT["Layout Engine\n(window positions, workspaces)"]
        DAMAGE2["Damage Accumulator"]
        RENDERER["wlroots Renderer\n(Vulkan / GLES2)"]
    end

    subgraph GPUHW["GPU Subsystem"]
        FRAMEBUF["Framebuffer\n(DRM/KMS)"]
        VBLANK["Vertical Blank\nInterrupt"]
    end

    subgraph DISPHW["Display Output"]
        MONITOR["Physical Monitor"]
    end

    APP -->|wl_surface.commit + wl_buffer| SCENE
    SCENE --> DAMAGE
    DAMAGE --> DAMAGE2
    LAYOUT --> SCENE
    DAMAGE2 --> RENDERER
    RENDERER -->|DMA-BUF / GBM| FRAMEBUF
    FRAMEBUF -->|DRM page flip| VBLANK
    VBLANK -->|send frame callbacks| APP
    VBLANK --> MONITOR`;

// 4. Launcher Process & Search Providers (graph TD)
const launcherProcessChart = `graph TD
    subgraph LP["tinexus-launcher Process"]
        QML["QML UI Layer\n(animations, layout, visual)"]
        CONTROLLER["Launcher Controller\n(C++ orchestrator)"]
        SEARCH_MGR["Search Manager\n(provider registry)"]
        RESULT_RANKER["Result Ranker\n(frequency + relevance scoring)"]
        HISTORY["Usage History\n(SQLite, local)"]

        subgraph BSP["Built-in Search Providers"]
            SP_APPS["App Provider\n(reads indexer cache)"]
            SP_SYS["System Actions Provider"]
            SP_CALC["Calculator Provider\n(tinyexpr / custom)"]
            SP_CLIP["Clipboard Provider\n(D-Bus → tinexus-clip)"]
            SP_FILES["Recent Files Provider"]
            SP_NOTIF["Notifications Provider"]
        end

        subgraph ESP["External Search Providers (Future)"]
            SP_AI["AI/NLP Provider\n(v2.0, local model)"]
            SP_PLUGIN["Plugin Providers\n(sandboxed processes)"]
        end
    end

    subgraph WI["Wayland Integration"]
        LAYER_SHELL["zwlr_layer_shell_v1\n(appear above all windows)"]
        GLOBAL_SHORTCUT["Global Shortcut\n(compositor D-Bus signal)"]
    end

    USER_INPUT["User Input (keyboard)"]
    USER_INPUT --> QML
    QML --> CONTROLLER
    CONTROLLER --> SEARCH_MGR
    SEARCH_MGR --> SP_APPS
    SEARCH_MGR --> SP_SYS
    SEARCH_MGR --> SP_CALC
    SEARCH_MGR --> SP_CLIP
    SEARCH_MGR --> SP_FILES
    SEARCH_MGR --> SP_NOTIF
    SEARCH_MGR --> SP_AI
    SEARCH_MGR --> SP_PLUGIN

    SP_APPS --> RESULT_RANKER
    SP_SYS --> RESULT_RANKER
    SP_CALC --> RESULT_RANKER
    SP_CLIP --> RESULT_RANKER
    SP_FILES --> RESULT_RANKER

    RESULT_RANKER --> HISTORY
    RESULT_RANKER --> QML

    GLOBAL_SHORTCUT --> CONTROLLER
    CONTROLLER --> LAYER_SHELL`;

// 5. Window State Machine (stateDiagram-v2)
const windowStateChart = `stateDiagram-v2
    [*] --> Mapped : App creates xdg_surface + xdg_toplevel
    Mapped --> Focused : User click or Alt+Tab
    Focused --> Unfocused : Another window focused
    Focused --> Minimized : User minimizes
    Minimized --> Focused : User restores from launcher
    Focused --> Maximized : User maximizes
    Maximized --> Focused : User restores
    Focused --> Fullscreen : App requests fullscreen
    Fullscreen --> Focused : App exits fullscreen
    Focused --> [*] : App closes xdg_toplevel
    Unfocused --> [*] : App closes
    Minimized --> [*] : App closes`;

// 6. Session Manager Startup & Supervision (graph TD)
const sessionManagerChart = `graph TD
    SM["tinexus-session"]
    
    SM -->|"Start (ordered 1)"| SRV_SETTINGS["tinexus-settings\n(starts first)"]
    SM -->|"Start (ordered 2)"| SRV_COMP["tinexus-comp\n(starts second, after settings)"]
    SM -->|"Start (parallel)"| SRV_NOTIF["tinexus-notif"]
    SM -->|"Start (parallel)"| SRV_CLIP["tinexus-clip"]
    SM -->|"Start (after comp)"| SRV_LAUNCHER["tinexus-launcher"]
    SM -->|"Start (after comp)"| SRV_WALLPAPER["tinexus-wallpaper"]
    
    SM -->|"Monitor + restart on crash"| SRV_NOTIF
    SM -->|"Monitor + restart on crash"| SRV_CLIP
    SM -->|"Monitor + restart on crash"| SRV_LAUNCHER
    
    SM -->|"logind integration"| SYSTEMD["systemd-logind"]
    SM -->|"idle detection"| IDLE["Idle Detector\n(swayidle-compatible)"]`;

// 7. Atomic Settings Write Flow (sequenceDiagram)
const settingsSequenceChart = `sequenceDiagram
    participant UI as Settings UI
    participant Daemon as tinexus-settings
    participant Comp as tinexus-comp
    participant Launcher as tinexus-launcher

    UI->>Daemon: SetValue("theme.accent_color", "#FF6B35")
    Daemon->>Daemon: Validate value
    Daemon->>Daemon: Write to TOML file (atomic write)
    Daemon->>Comp: SettingChanged signal (D-Bus)
    Daemon->>Launcher: SettingChanged signal (D-Bus)
    Comp->>Comp: Apply new accent color
    Launcher->>Launcher: Apply new accent color
    Note over UI,Launcher: Change visible immediately (< 10ms)`;

// 8. Sandboxed Plugin Host (graph TD)
const pluginSandboxChart = `graph TD
    LAUNCHER["tinexus-launcher"]
    
    subgraph PH["Plugin Host Process (tinexus-plugin-host)"]
        PLUGIN_REGISTRY["Plugin Registry"]
        PLUGIN_SANDBOX["Sandbox Manager (seccomp-bpf)"]
        
        subgraph PA["Plugin Process A (isolated)"]
            P_MANIFEST["Plugin Manifest Parser"]
            P_API["Plugin API Handler"]
            P_LOGIC["Plugin Logic"]
        end
        
        subgraph PB["Plugin Process B (isolated)"]
            P2_MANIFEST["Plugin Manifest Parser"]
            P2_API["Plugin API Handler"]
            P2_LOGIC["Plugin Logic"]
        end
    end
    
    LAUNCHER -->|"D-Bus: search(query)"| PLUGIN_REGISTRY
    PLUGIN_REGISTRY --> PLUGIN_SANDBOX
    PLUGIN_SANDBOX --> P_LOGIC
    P_LOGIC --> P_API
    P_API -->|"D-Bus: results"| LAUNCHER`;

// 9. Component Lifecycle (stateDiagram-v2)
const componentLifecycleChart = `stateDiagram-v2
    [*] --> Initializing : Session manager starts component

    Initializing --> Ready : D-Bus "Ready" signal sent
    Initializing --> Failed : Init error (3x retry)

    Ready --> Active : Receives work
    Active --> Ready : Work complete, idle

    Ready --> Degraded : Non-critical subsystem fails
    Degraded --> Ready : Subsystem recovered

    Ready --> Stopping : Session shutdown signal
    Active --> Stopping : Session shutdown signal

    Stopping --> [*] : Clean shutdown complete
    Failed --> [*] : Session manager gives up (notification shown)`;

export default function TinexusArchitecture() {
  const [activeSection, setActiveSection] = useState<
    "overview" | "diagrams" | "inventory" | "pipeline" | "launcher" | "ipc" | "safety" | "adrs"
  >("overview");

  const [diagramFilter, setDiagramFilter] = useState<"all" | "topology" | "subsystems" | "statemachines" | "sequences">("all");

  return (
    <div className="space-y-12">
      {/* Frozen Architectural Spec Banner */}
      <div className="glass-card p-6 md:p-8 border border-cyan-500/30 dark:border-cyan-400/20 bg-gradient-to-br from-cyan-500/5 via-slate-900/10 to-transparent relative overflow-hidden">
        <div className="hidden sm:block absolute top-0 right-0 px-4 py-1.5 bg-amber-500/20 text-amber-700 dark:text-amber-300 border-b border-l border-amber-500/30 text-xs font-mono font-semibold tracking-wider uppercase rounded-bl-xl">
          ACTIVE WORK IN PROGRESS · FUNCTIONAL CORE
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <span className="sm:hidden px-3 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-mono font-semibold">
            WORK IN PROGRESS
          </span>
          <span className="px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium">
            Tinexus Platform Core
          </span>
          <span className="text-xs text-slate-500 dark:text-white/40 font-mono">
            Active Development · Fully Functional Core Architecture
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Tinexus Shell | Complete System Architecture
        </h3>
        <p className="text-sm md:text-base text-slate-600 dark:text-white/60 max-w-3xl leading-relaxed">
          A microservice-inspired platform process architecture for the Linux desktop. Every subsystem is an independent, replaceable daemon communicating via <code className="text-cyan-600 dark:text-cyan-400 font-mono">io.tinexus.shell.*</code> D-Bus interfaces and binary Unix sockets.
        </p>

        {/* Top Technical Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-white/10 text-center">
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400">15 Processes</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Isolated Subsystems</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">Vulkan + GLES2</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Dual Render Backend</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-purple-600 dark:text-purple-400">&le; 10MB</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Trigram RAM Footprint</div>
          </div>
          <div>
            <div className="text-sm sm:text-xl font-bold font-mono text-amber-600 dark:text-amber-400">100% RAII</div>
            <div className="text-xs text-slate-500 dark:text-white/40">Zero Raw Pointers</div>
          </div>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex overflow-x-auto whitespace-nowrap gap-2 border-b border-slate-200 dark:border-white/10 pb-4 scrollbar-none">
        {[
          { id: "overview", label: "8-Layer Architecture", icon: Layers },
          { id: "diagrams", label: "Visual Mermaid Diagrams (9)", icon: Network },
          { id: "inventory", label: "Process Inventory (15)", icon: Boxes },
          { id: "pipeline", label: "Rendering & Frame Loop", icon: Gauge },
          { id: "launcher", label: "Launcher & Trigram Search", icon: Search },
          { id: "ipc", label: "IPC & Thread Model", icon: Radio },
          { id: "safety", label: "Memory & Security Sandbox", icon: Lock },
          { id: "adrs", label: "ADR Decision Audit", icon: CheckCircle2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex-shrink-0 whitespace-nowrap transition-all ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30 shadow-sm"
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
        {/* 1. 8-LAYER ARCHITECTURE */}
        {activeSection === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Visual Mermaid Graph TB */}
            <MermaidViewer
              id="arch-layer-tb"
              chart={layeredArchitectureChart}
              title="8-Layer System Architecture Diagram (graph TB)"
              caption="Complete dependency graph from Layer 0 (Hardware) up to Layer 7 (Native Apps & Sandboxed Plugins)"
            />

            {/* Layer breakdown cards */}
            <div className="glass-card p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  Layer Breakdown Summary
                </h4>
                <span className="text-xs font-mono text-slate-500 dark:text-white/40">
                  Strict Top-Down Dependency
                </span>
              </div>

              <div className="space-y-3">
                {layersData.map((l, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border ${l.color} transition-all duration-200 hover:scale-[1.005]`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
                          {l.level}
                        </span>
                        <h5 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                          {l.title}
                        </h5>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm opacity-90 pl-0 sm:pl-12 font-mono">
                      {l.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Wayland Protocols */}
            <div className="glass-card p-6 md:p-8 space-y-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Wayland Protocol Implementation Matrix
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {protocolsList.map((p, i) => (
                  <div key={i} className="p-3.5 rounded-lg bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 truncate max-w-[140px]" title={p.name}>
                        {p.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                        {p.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-white/40">{p.purpose}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. DEDICATED VISUAL DIAGRAMS GALLERY (9 DIAGRAMS) */}
        {activeSection === "diagrams" && (
          <motion.div
            key="diagrams"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All 9 Diagrams" },
                { id: "topology", label: "Topology & IPC (3)" },
                { id: "subsystems", label: "Subsystem Pipelines (3)" },
                { id: "statemachines", label: "State Machines & Lifecycle (2)" },
                { id: "sequences", label: "Sequence Flows (1)" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setDiagramFilter(f.id as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    diagramFilter === f.id
                      ? "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 font-bold"
                      : "bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-white/50 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* 1. Layered Architecture (graph TB) */}
            {(diagramFilter === "all" || diagramFilter === "topology") && (
              <MermaidViewer
                id="diag-layered-tb"
                chart={layeredArchitectureChart}
                title="1. 8-Layer System Architecture (graph TB)"
                caption="Hardware &rarr; Kernel DRM/GBM &rarr; wlroots 0.18+ &rarr; Core &rarr; Services &rarr; UI &rarr; Sandboxed Plugins"
              />
            )}

            {/* 2. Module Interaction Map (graph LR) */}
            {(diagramFilter === "all" || diagramFilter === "topology") && (
              <MermaidViewer
                id="diag-module-lr"
                chart={moduleInteractionChart}
                title="2. Module Interaction & D-Bus IPC Map (graph LR)"
                caption="D-Bus System/Session Bus broker with discrete service bindings and Wayland protocol surfaces"
              />
            )}

            {/* 3. Rendering Pipeline (graph TD) */}
            {(diagramFilter === "all" || diagramFilter === "subsystems") && (
              <MermaidViewer
                id="diag-render-td"
                chart={renderingPipelineChart}
                title="3. Frame Production & Vblank Pipeline (graph TD)"
                caption="Damage accumulator dirty rect tracking to Vulkan/GLES2 renderer and DRM page flip interrupts"
              />
            )}

            {/* 4. Launcher Process & Search Providers (graph TD) */}
            {(diagramFilter === "all" || diagramFilter === "subsystems") && (
              <MermaidViewer
                id="diag-launcher-td"
                chart={launcherProcessChart}
                title="4. Launcher Process & Pluggable Search Providers (graph TD)"
                caption="C++ controller orchestrating QML UI, built-in search providers, result ranking, and future local AI"
              />
            )}

            {/* 5. Window State Machine (stateDiagram-v2) */}
            {(diagramFilter === "all" || diagramFilter === "statemachines") && (
              <MermaidViewer
                id="diag-window-state"
                chart={windowStateChart}
                title="5. Window Management State Machine (stateDiagram-v2)"
                caption="Lifecycle transitions: Mapped &rarr; Focused &rarr; Minimized &rarr; Maximized &rarr; Fullscreen &rarr; Closed"
              />
            )}

            {/* 6. Session Manager Startup & Supervision (graph TD) */}
            {(diagramFilter === "all" || diagramFilter === "topology") && (
              <MermaidViewer
                id="diag-session-td"
                chart={sessionManagerChart}
                title="6. Session Manager Ordered Startup & Supervision (graph TD)"
                caption="Dependency order startup (Settings &rarr; Comp &rarr; Notif/Clip &rarr; Launcher/Wallpaper) + 3x restart recovery"
              />
            )}

            {/* 7. Atomic Settings Write Flow (sequenceDiagram) */}
            {(diagramFilter === "all" || diagramFilter === "sequences") && (
              <MermaidViewer
                id="diag-settings-seq"
                chart={settingsSequenceChart}
                title="7. Atomic Settings Write Sequence (sequenceDiagram)"
                caption="Atomic TOML file write and instantaneous D-Bus SettingChanged event propagation to daemons"
              />
            )}

            {/* 8. Sandboxed Plugin Host (graph TD) */}
            {(diagramFilter === "all" || diagramFilter === "subsystems") && (
              <MermaidViewer
                id="diag-plugin-td"
                chart={pluginSandboxChart}
                title="8. Out-of-Process Plugin Host Sandbox (graph TD)"
                caption="Seccomp-bpf isolated plugin host running out-of-process with strict IPC timeouts and zero .so in-process loading"
              />
            )}

            {/* 9. Component Lifecycle (stateDiagram-v2) */}
            {(diagramFilter === "all" || diagramFilter === "statemachines") && (
              <MermaidViewer
                id="diag-lifecycle-state"
                chart={componentLifecycleChart}
                title="9. Platform Component Lifecycle State Machine (stateDiagram-v2)"
                caption="Initializing &rarr; Ready &rarr; Active &rarr; Degraded &rarr; Stopping &rarr; Clean Shutdown"
              />
            )}
          </motion.div>
        )}

        {/* 3. PROCESS INVENTORY */}
        {activeSection === "inventory" && (
          <motion.div
            key="inventory"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Session supervision diagram */}
            <MermaidViewer
              id="inv-session-td"
              chart={sessionManagerChart}
              title="Session Supervisor & Process Dependency Graph"
              caption="Ordered startup flow and PID supervision managed by tinexus-session"
            />

            <div className="glass-card p-6 md:p-8 overflow-x-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Boxes className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    15 Subsystems Process Inventory
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-white/40 mt-1">
                    Zero monolithic shared-state. Each daemon is supervised by <code className="text-cyan-600 dark:text-cyan-400">tinexus-session</code>.
                  </p>
                </div>
              </div>

              <div className="w-full min-w-[950px] text-left text-xs sm:text-sm">
                {/* Header */}
                <div className="grid grid-cols-[minmax(150px,1.5fr)_minmax(150px,1.5fr)_minmax(165px,1.8fr)_minmax(100px,1.2fr)_minmax(250px,3fr)] gap-4 border-b border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/30 uppercase text-xs tracking-wider pb-3 font-semibold">
                  <div>Subsystem</div>
                  <div>Process Executable</div>
                  <div>Language / Stack</div>
                  <div>Tier</div>
                  <div>Responsibility</div>
                </div>
                
                {/* Body */}
                <div className="divide-y divide-slate-100 dark:divide-white/5">
                  {componentInventory.map((item, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-[minmax(150px,1.5fr)_minmax(150px,1.5fr)_minmax(165px,1.8fr)_minmax(100px,1.2fr)_minmax(250px,3fr)] gap-4 py-3 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors items-center"
                    >
                      <div className="font-semibold text-slate-800 dark:text-white/90 whitespace-nowrap">
                        {item.name}
                      </div>
                      <div className="font-mono text-cyan-700 dark:text-cyan-400 font-medium whitespace-nowrap">
                        {item.process}
                      </div>
                      <div className="font-mono text-xs text-slate-600 dark:text-white/60 whitespace-nowrap">
                        {item.lang} ({item.framework})
                      </div>
                      <div className="whitespace-nowrap flex items-center justify-start">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono border whitespace-nowrap ${
                          item.tier === "Core" ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30" :
                          item.tier === "UI" ? "bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/30" :
                          item.tier === "Service" ? "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30" :
                          item.tier === "Native App" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" :
                          "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30"
                        }`}>
                          {item.tier}
                        </span>
                      </div>
                      <div className="text-slate-600 dark:text-white/50 break-words leading-relaxed pr-2">
                        {item.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. RENDERING PIPELINE */}
        {activeSection === "pipeline" && (
          <motion.div
            key="pipeline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Visual Rendering Pipeline Diagram */}
            <MermaidViewer
              id="pipeline-render-td"
              chart={renderingPipelineChart}
              title="Frame Production & Vblank Pipeline (graph TD)"
              caption="Application commit &rarr; wlroots Scene Graph &rarr; Damage Accumulation &rarr; DRM/KMS Framebuffer Page Flip"
            />

            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Gauge className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                Vblank-Synchronized Frame Scheduling Loop
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs text-center">
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="text-cyan-600 dark:text-cyan-400 font-bold">1. Damage Catch</div>
                  <p className="text-slate-500 dark:text-white/40 text-[11px]">Clients commit wl_surface dirty rects</p>
                </div>
                <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 space-y-2">
                  <div className="text-cyan-700 dark:text-cyan-300 font-bold">2. DRM Vblank</div>
                  <p className="text-slate-500 dark:text-white/40 text-[11px]">Hardware interrupt signals display refresh</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                  <div className="text-emerald-700 dark:text-emerald-300 font-bold">3. Scissor Render</div>
                  <p className="text-slate-500 dark:text-white/40 text-[11px]">Vulkan/GLES renders only accumulated damage</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 space-y-2">
                  <div className="text-purple-700 dark:text-purple-300 font-bold">4. Page Flip</div>
                  <p className="text-slate-500 dark:text-white/40 text-[11px]">Atomic DRM/KMS flip to display framebuffer</p>
                </div>
                <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/20 space-y-2">
                  <div className="text-pink-700 dark:text-pink-300 font-bold">5. Frame Callback</div>
                  <p className="text-slate-500 dark:text-white/40 text-[11px]">wl_surface.frame sent to clients for next cycle</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-white/[0.02]">
                  <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400 block mb-1">Vulkan (Primary)</span>
                  <p className="text-xs text-slate-600 dark:text-white/50">Used for all modern AMD, Intel, and NVIDIA GPUs. Direct SPIR-V shader pipelines for blur and shadows.</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-white/[0.02]">
                  <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 block mb-1">OpenGL ES 3.2 (Fallback)</span>
                  <p className="text-xs text-slate-600 dark:text-white/50">Fallback driver for legacy hardware and virtualized GPU environments.</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-white/[0.02]">
                  <span className="text-xs font-bold font-mono text-purple-600 dark:text-purple-400 block mb-1">LLVMpipe (Headless / CI)</span>
                  <p className="text-xs text-slate-600 dark:text-white/50">Software rasterizer enables automated test suites and headless compositor CI verification.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 5. LAUNCHER & SEARCH */}
        {activeSection === "launcher" && (
          <motion.div
            key="launcher"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Visual Launcher Process Diagram */}
            <MermaidViewer
              id="launcher-process-td"
              chart={launcherProcessChart}
              title="Launcher Process Architecture (graph TD)"
              caption="QML UI Layer &rarr; Controller &rarr; Search Providers (Built-in + External) &rarr; Ranker &rarr; SQLite History"
            />

            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                Ctrl+K Universal Launcher &amp; Trigram Scoring Engine
              </h4>

              {/* Mathematical formula badge */}
              <div className="p-4 rounded-xl bg-slate-950 text-cyan-400 font-mono text-xs border border-cyan-500/20 space-y-2">
                <div className="text-slate-400 text-[11px] uppercase tracking-wider">Deterministic Result Ranking Formula:</div>
                <div className="text-sm font-bold text-white">
                  score = base_relevance + (launch_freq &times; log(launches + 1)) + (recency &times; (1 / days_since_use)) + exact_match_bonus
                </div>
                <div className="text-slate-500 text-[11px]">
                  Trigram index (L2 RAM resident, &le; 3MB) with Jaccard coefficient intersection scoring. Zero disk I/O on query.
                </div>
              </div>

              {/* ISearchProvider Interface Definition */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-white/80 font-mono uppercase tracking-wider">
                  C++ Core Contract: ISearchProvider
                </span>
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 font-mono text-xs text-slate-800 dark:text-slate-200">
                  <pre>{`interface ISearchProvider {
    virtual std::string name() const = 0;
    virtual int priority() const = 0;
    virtual bool canHandle(const std::string& query) const = 0;
    virtual SearchResultList search(const std::string& query, int maxResults) = 0;
    virtual void activate(const SearchResult& result) = 0;
};`}</pre>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-lg border border-slate-200 dark:border-white/10 space-y-1">
                  <div className="font-bold text-slate-800 dark:text-white">80ms Stagger Sequence</div>
                  <p className="text-slate-500 dark:text-white/40">Sub-5ms D-Bus signal trigger &rarr; 80ms cubic ease-out blur backdrop &rarr; 20ms staggered item fade.</p>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-200 dark:border-white/10 space-y-1">
                  <div className="font-bold text-slate-800 dark:text-white">Inotify Watcher</div>
                  <p className="text-slate-500 dark:text-white/40">Instant background cache update on modification of /usr/share/applications/.desktop files.</p>
                </div>
                <div className="p-3.5 rounded-lg border border-slate-200 dark:border-white/10 space-y-1">
                  <div className="font-bold text-slate-800 dark:text-white">Local NLP Ready (v2.0)</div>
                  <p className="text-slate-500 dark:text-white/40">Designed to accept llama.cpp offline intent tokens (&le; 2GB model RAM) via search provider slot.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 6. IPC & THREAD MODEL */}
        {activeSection === "ipc" && (
          <motion.div
            key="ipc"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Visual Module Interaction Map */}
            <MermaidViewer
              id="ipc-module-lr"
              chart={moduleInteractionChart}
              title="Module Interaction & D-Bus IPC Map (graph LR)"
              caption="Central D-Bus broker topology orchestrating signals between compositor, session manager, and shell services"
            />

            {/* Visual Settings Sequence Diagram */}
            <MermaidViewer
              id="ipc-settings-seq"
              chart={settingsSequenceChart}
              title="Atomic Settings Write Sequence Flow (sequenceDiagram)"
              caption="Transactional TOML disk flush and synchronous D-Bus event broadcast"
            />

            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                Hybrid IPC Architecture &amp; Thread Topologies
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* D-Bus registry */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-white/80 font-mono uppercase tracking-wider">
                    D-Bus Session Bus Registry (Discovery &amp; Events)
                  </span>
                  <div className="space-y-2 font-mono text-xs">
                    {[
                      { iface: "io.tinexus.shell.Compositor", desc: "Global shortcuts, window management" },
                      { iface: "io.tinexus.shell.Session", desc: "Lifecycle state, power management" },
                      { iface: "io.tinexus.shell.Launcher", desc: "Toggle, focus, external query triggers" },
                      { iface: "io.tinexus.shell.Settings", desc: "Atomic schema broadcast & change signals" },
                      { iface: "org.freedesktop.Notifications", desc: "Standard desktop notification pipeline" },
                    ].map((d, i) => (
                      <div key={i} className="p-2.5 rounded bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                        <div className="font-semibold text-cyan-700 dark:text-cyan-400">{d.iface}</div>
                        <div className="text-[11px] text-slate-500 dark:text-white/40">{d.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Unix Sockets & Threads */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-white/80 font-mono uppercase tracking-wider">
                    Binary Unix Sockets &amp; Thread Model
                  </span>
                  <div className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs border border-emerald-500/20 space-y-2">
                    <div className="text-white font-bold">Fast-Path Sockets (/run/user/{`{uid}`}/tinexus/):</div>
                    <div className="text-[11px] text-slate-400">
                      &bull; compositor.sock &mdash; Frame synchronization &lt; 0.5ms<br />
                      &bull; launcher.sock &mdash; Real-time search streaming (MessagePack binary)
                    </div>
                    <div className="border-t border-white/10 pt-2 text-[11px] text-slate-300">
                      <strong className="text-white">Thread Topologies:</strong><br />
                      &bull; <span className="text-cyan-300">comp-render</span>: Dedicated GPU rendering<br />
                      &bull; <span className="text-cyan-300">comp-input</span>: Isolated libinput queue<br />
                      &bull; <span className="text-cyan-300">launcher-search</span>: Async search off UI thread
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 7. MEMORY & SECURITY */}
        {activeSection === "safety" && (
          <motion.div
            key="safety"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Visual Plugin Sandbox Diagram */}
            <MermaidViewer
              id="safety-plugin-td"
              chart={pluginSandboxChart}
              title="Out-of-Process Plugin Host & Sandboxing Architecture (graph TD)"
              caption="Launcher &rarr; tinexus-plugin-host with seccomp-bpf filter &rarr; Process-isolated plugins"
            />

            <div className="glass-card p-6 md:p-8 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                C++20 Memory Strategy &amp; Plugin Process Isolation
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">Zero Raw Pointers / 100% RAII</h5>
                  <p className="text-xs text-slate-600 dark:text-white/50 leading-relaxed">
                    Tinexus Platform strictly bans manual <code className="text-cyan-600 dark:text-cyan-400">new/delete</code> in favor of custom RAII deleter wrappers around wlroots C handles:
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs border border-cyan-500/20">
                    <pre>{`struct WlrOutputDeleter {
    void operator()(wlr_output* o) { 
        wlr_output_destroy(o); 
    }
};
using UniqueOutput = std::unique_ptr<
    wlr_output, WlrOutputDeleter>;`}</pre>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">Seccomp-BPF Plugin Sandbox</h5>
                  <p className="text-xs text-slate-600 dark:text-white/50 leading-relaxed">
                    Plugins are strictly prohibited from running inside compositor memory space. Every plugin runs in a sandboxed child process managed by <code className="text-cyan-600 dark:text-cyan-400">tinexus-plugin-host</code> with zero network access by default and restricted filesystem scopes.
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-white/60 space-y-1">
                    <div>&bull; <strong>No .so dlopen:</strong> Dynamic library injection disabled</div>
                    <div>&bull; <strong>SIGCHLD Watchdog:</strong> Crashed plugins cannot freeze the shell</div>
                    <div>&bull; <strong>200ms Timeout:</strong> Unresponsive search queries dropped safely</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 8. ADR LOG */}
        {activeSection === "adrs" && (
          <motion.div
            key="adrs"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="glass-card p-6 md:p-8"
          >
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Architecture Decision Records Log (ADR-001 &rarr; ADR-010)
            </h4>

            <div className="divide-y divide-slate-200 dark:divide-white/10">
              {adrs.map((adr) => (
                <div key={adr.id} className="py-3.5 flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                        {adr.id}
                      </span>
                      <h5 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                        {adr.title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-white/50 leading-relaxed">
                      {adr.rationale}
                    </p>
                  </div>
                  <span className="self-start px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    ACCEPTED
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
