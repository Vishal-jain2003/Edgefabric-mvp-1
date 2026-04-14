import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Section imports ────────────────────────────────────────────────────
import { Section01ColdOpen }     from "./sections/Section01ColdOpen";
import { Section03TeamGallery }  from "./sections/Section03TeamGallery";
import { Section02ScaleShock }   from "./sections/Section02ScaleShock";
import { Section08EdgeFabric }   from "./sections/Section08EdgeFabric";
import { Section09Architecture } from "./sections/Section09Architecture";
import { Section10HashRing }     from "./sections/Section10HashRing";
import { Section11Gossip }       from "./sections/Section11Gossip";
import { Section15MCP }          from "./sections/Section15MCP";
import { Section16Observability } from "./sections/Section16Observability";
import { Section17Closing }      from "./sections/Section17Closing";
import Section18RequestFlow      from "./sections/Section18RequestFlow";
import { Section19Quorum }       from "./sections/Section19Quorum";
import { Section20ReadRepair }   from "./sections/Section20ReadRepair";
import { Section21TimeWheel }    from "./sections/Section21TimeWheel";
import { Section22LRUEviction }  from "./sections/Section22LRUEviction";
import { SectionGetPutDemo }     from "./sections/SectionGetPutDemo";

const SECTIONS = [
  { label: "THE TEAM",           code: "01" },
  { label: "INTRO",              code: "02" },
  { label: "EDGEFABRIC MVP",     code: "03" },
  { label: "ARCHITECTURE",       code: "04" },
  { label: "CONSISTENT HASHING", code: "05" },
  { label: "GOSSIP PROTOCOL",    code: "06" },
  { label: "REPLICATION",        code: "07" },
  { label: "QUORUM REPLICATION", code: "08" },
  { label: "READ REPAIR",        code: "09" },
  { label: "TIME WHEEL",         code: "10" },
  { label: "LRU EVICTION",       code: "11" },
  { label: "GET/PUT DEMO",       code: "12" },
  { label: "TESTING & PERF",     code: "13" },
  { label: "FUTURE ROADMAP",     code: "14" },
  { label: "CONCLUSION",         code: "15" },
];

const COMPONENTS = [
  Section03TeamGallery,
  Section01ColdOpen,
  Section08EdgeFabric,
  Section09Architecture,
  Section10HashRing,
  Section11Gossip,
  Section18RequestFlow,
  Section19Quorum,
  Section20ReadRepair,
  Section21TimeWheel,
  Section22LRUEviction,
  SectionGetPutDemo,
  Section16Observability,
  Section15MCP,
  Section17Closing,
];

const TOTAL = COMPONENTS.length;

const slideVariants = {
  enter: (dir: number) => ({
    scale: 0.9,
    opacity: 0,
    x: dir > 0 ? 100 : -100,
  }),
  center: { scale: 1, opacity: 1, x: 0 },
  exit: (dir: number) => ({
    scale: 0.9,
    opacity: 0,
    x: dir > 0 ? -100 : 100,
  }),
};

export function SlideNavigator() {
  const [current, setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(true);
  const touchStart = useRef<number | null>(null);
  const isAnimating = useRef(false);

  const navigate = useCallback((dir: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setDirection(dir);
    setCurrent(prev => Math.max(0, Math.min(TOTAL - 1, prev + dir)));
    setTimeout(() => { isAnimating.current = false; }, 500);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (isAnimating.current || idx === current) return;
    isAnimating.current = true;
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    setTimeout(() => { isAnimating.current = false; }, 500);
  }, [current]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown")  navigate(1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")    navigate(-1);
      if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  // Touch swipe
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientX; };
    const onEnd   = (e: TouchEvent) => {
      if (touchStart.current === null) return;
      const diff = touchStart.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
      touchStart.current = null;
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  }, [navigate]);

  // Mouse parallax
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Auto-hide hint
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  const SectionComponent = COMPONENTS[current];
  const section = SECTIONS[current];
  const progress = ((current) / (TOTAL - 1)) * 100;

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{
        background: "linear-gradient(90deg, #000000 0%, #000000 52%, #071a27 82%, #0c5c72 100%)",
      }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(44% 62% at 88% 72%, rgba(0, 209, 209, 0.34), rgba(63, 98, 255, 0.13) 42%, transparent 72%)",
        }}
      />

      {/* Persistent brand logo */}
      <div
        className="fixed top-3 left-3 z-50 px-3 py-2"
        style={{
          background: "rgba(0,0,0,0.72)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "1px",
        }}
      >
        <span
          className="font-epam"
          style={{
            color: "#ffffff",
            fontSize: "clamp(1.5rem, 2.1vw, 2rem)",
            lineHeight: 1,
          }}
        >
          &lt;epam&gt;
        </span>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-ef-border">
        <motion.div
          className="h-full"
          style={{ background: "var(--ef-cyan)", boxShadow: "0 0 8px rgba(0,212,255,0.8)" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Section indicator */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`sec-${current}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-16 left-6 z-40 flex items-center gap-3"
        >
          <span className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>
            {section.code}
          </span>
          <span className="font-section text-xs tracking-widest uppercase" style={{ color: "var(--ef-gray)" }}>
            / {section.label}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Slide count */}
      <div className="fixed top-4 right-6 z-40 font-section text-xs" style={{ color: "var(--ef-gray)" }}>
        {String(current + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
      </div>

      {/* Section content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 z-10"
        >
          <SectionComponent active={true} />
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      {current > 0 && (
        <button
          onClick={() => navigate(-1)}
          className="fixed left-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(17,24,39,0.9)", border: "1px solid var(--ef-border)", color: "var(--ef-gray)" }}
          aria-label="Previous"
        >
          ←
        </button>
      )}
      {current < TOTAL - 1 && (
        <button
          onClick={() => navigate(1)}
          className="fixed right-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(17,24,39,0.9)", border: "1px solid var(--ef-border)", color: "var(--ef-gray)" }}
          aria-label="Next"
        >
          →
        </button>
      )}

      {/* Dot progress */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5">
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width:      i === current ? 18 : 5,
              height:     5,
              background: i === current ? "var(--ef-cyan)" : "var(--ef-border)",
              boxShadow:  i === current ? "0 0 8px rgba(0,212,255,0.6)" : "none",
            }}
            aria-label={`Section ${i + 1}`}
          />
        ))}
      </div>

      {/* Keyboard hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-5 right-5 z-40 font-section text-xs hidden md:block"
            style={{ color: "var(--ef-gray)" }}
          >
            ← → navigate &nbsp;|&nbsp; F fullscreen
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
