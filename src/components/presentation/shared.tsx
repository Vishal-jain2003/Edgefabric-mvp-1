import { useState, useEffect, useRef } from "react";

// ── useCountUp ─────────────────────────────────────────────────────────
export function useCountUp(target: number, duration = 1400, active = true) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) { setValue(0); return; }
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const elapsed  = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);
  return value;
}

// ── useTypewriter ──────────────────────────────────────────────────────
export function useTypewriter(text: string, speed = 38, active = true) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      if (i <= text.length) { setDisplayed(text.slice(0, i)); i++; }
      else clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);
  return displayed;
}

// ── CountUp component ─────────────────────────────────────────────────
interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  active?: boolean;
  format?: (n: number) => string;
  className?: string;
}
export function CountUp({ from = 0, to, duration = 1600, active = true, format, className }: CountUpProps) {
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (!active) { setValue(from); return; }
    const startTime = Date.now();
    let raf: number;
    const tick = () => {
      const elapsed  = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + eased * (to - from)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, from, duration, active]);
  const display = format ? format(value) : value.toLocaleString();
  return <span className={className}>{display}</span>;
}

// ── Terminal component ────────────────────────────────────────────────
interface TerminalLine {
  text: string;
  color?: string;
  delay: number; // ms
}

interface TerminalProps {
  lines: TerminalLine[];
  active?: boolean;
  title?: string;
  className?: string;
}

export function Terminal({ lines, active = true, title = "node-c", className = "" }: TerminalProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    if (!active) { setVisibleCount(0); return; }
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), lines[i].delay);
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [active, lines]);

  return (
    <div className={`terminal ${className}`}>
      <div className="terminal-header">
        <span className="terminal-dot" style={{ background: "#EF4444" }} />
        <span className="terminal-dot" style={{ background: "#F59E0B" }} />
        <span className="terminal-dot" style={{ background: "#10B981" }} />
        <span className="ml-2 text-xs font-section" style={{ color: "var(--ef-gray)" }}>{title}</span>
      </div>
      <div className="p-4 space-y-0.5">
        {lines.slice(0, visibleCount).map((line, i) => (
          <div
            key={i}
            className="font-section text-xs leading-relaxed"
            style={{ color: line.color ?? "var(--ef-lgray)" }}
          >
            {line.text}
          </div>
        ))}
        {visibleCount < lines.length && visibleCount > 0 && (
          <span className="inline-block w-1.5 h-3.5 ml-0.5 animate-blink" style={{ background: "var(--ef-cyan)" }} />
        )}
      </div>
    </div>
  );
}

// ── FlowArrow ─────────────────────────────────────────────────────────
export function FlowArrow({ color = "#00D4FF", vertical = false }: { color?: string; vertical?: boolean }) {
  if (vertical) {
    return (
      <div className="flex flex-col items-center gap-0.5 py-1">
        <div className="w-px h-5" style={{ background: color, opacity: 0.5 }} />
        <div className="text-xs" style={{ color }}>▼</div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-0.5 px-1">
      <div className="h-px w-6" style={{ background: color, opacity: 0.5 }} />
      <div className="text-xs" style={{ color }}>▶</div>
    </div>
  );
}

// ── GlowBadge ─────────────────────────────────────────────────────────
export function GlowBadge({ children, color = "cyan", className = "" }: {
  children: React.ReactNode;
  color?: "cyan" | "violet" | "green" | "red" | "amber" | "orange";
  className?: string;
}) {
  const map = {
    cyan:   { border: "rgba(0,212,255,0.4)",   bg: "rgba(0,212,255,0.08)",   text: "#00D4FF" },
    violet: { border: "rgba(124,58,237,0.4)",  bg: "rgba(124,58,237,0.08)",  text: "#7C3AED" },
    green:  { border: "rgba(16,185,129,0.4)",  bg: "rgba(16,185,129,0.08)",  text: "#10B981" },
    red:    { border: "rgba(239,68,68,0.4)",   bg: "rgba(239,68,68,0.08)",   text: "#EF4444" },
    amber:  { border: "rgba(245,158,11,0.4)",  bg: "rgba(245,158,11,0.08)",  text: "#F59E0B" },
    orange: { border: "rgba(249,115,22,0.4)",  bg: "rgba(249,115,22,0.08)",  text: "#F97316" },
  };
  const s = map[color];
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-section ${className}`}
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}
    >
      {children}
    </span>
  );
}

// ── SectionWrapper ────────────────────────────────────────────────────
export function SectionWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`slide-container px-6 md:px-14 py-16 ${className}`}>
      {children}
    </div>
  );
}

// ── ScrollReveal (intersection observer) ─────────────────────────────
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}
