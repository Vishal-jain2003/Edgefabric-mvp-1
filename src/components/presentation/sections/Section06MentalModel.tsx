import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Props { active: boolean; }

function TTLClock({ active }: { active: boolean }) {
  const [ttl, setTtl] = useState(60);
  useEffect(() => {
    if (!active) { setTtl(60); return; }
    const id = setInterval(() => {
      setTtl(v => {
        if (v <= 0) { return 60; }
        return v - 1;
      });
    }, 600);
    return () => clearInterval(id);
  }, [active]);
  const pct = (ttl / 60) * 100;
  return (
    <div className="glass rounded-xl p-4">
      <div className="font-section text-xs mb-2" style={{ color: "var(--ef-amber)" }}>TTL = TIME TO LIVE</div>
      <p className="font-body text-xs mb-3" style={{ color: "var(--ef-lgray)" }}>
        Set cache key <span style={{ color: "var(--ef-cyan)" }}>"trending-products"</span> with TTL = 60s
      </p>
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12">
          <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
            <circle cx="20" cy="20" r="16" fill="none" stroke="var(--ef-border)" strokeWidth="3" />
            <circle cx="20" cy="20" r="16" fill="none" stroke="var(--ef-amber)" strokeWidth="3"
              strokeDasharray={`${pct} 100`} strokeLinecap="round" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-section text-xs font-bold" style={{ color: "var(--ef-amber)" }}>
            {ttl}s
          </span>
        </div>
        <div className="font-body text-xs" style={{ color: "var(--ef-gray)" }}>
          {ttl > 0 ? "Cache key valid — returning from memory" : (
            <span style={{ color: "var(--ef-red)" }}>Key expired — next request re-fetches from DB</span>
          )}
        </div>
      </div>
    </div>
  );
}

const flowNodes = [
  { id: "req",   label: "Request",       color: "var(--ef-cyan)" },
  { id: "check", label: "Check Cache",   color: "var(--ef-violet)" },
  { id: "hit",   label: "HIT → 1ms ✓",  color: "var(--ef-green)" },
  { id: "db",    label: "Hit Database",  color: "var(--ef-orange)" },
  { id: "store", label: "Store in Cache",color: "var(--ef-cyan)" },
  { id: "ret",   label: "Return result", color: "var(--ef-green)" },
];

export function Section06MentalModel({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-6"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "var(--ef-white)" }}
        >
          The idea is embarrassingly simple.
        </motion.h2>

        {/* Sticky note */}
        <motion.div
          initial={{ opacity: 0, rotate: 4, scale: 0.92 }}
          animate={{ opacity: 1, rotate: -2, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-block rounded-lg p-4 mb-8 max-w-md shadow-xl"
          style={{ background: "var(--ef-amber)", color: "#1a1a1a", fontFamily: "'Georgia', serif" }}
        >
          <p className="text-sm leading-relaxed italic">
            Instead of looking up a phone number in a 500-page book every time,<br />
            write it on a sticky note on your desk.<br />
            <strong>That sticky note = cache.</strong>
          </p>
        </motion.div>

        {/* Flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-xl p-5 mb-6"
        >
          <div className="font-section text-xs mb-3" style={{ color: "var(--ef-cyan)" }}>CACHE FLOW DIAGRAM</div>
          <div className="flex items-center flex-wrap gap-2 text-xs font-section">
            <span className="px-3 py-1.5 rounded" style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.3)", color: "var(--ef-cyan)" }}>Request</span>
            <span style={{ color: "var(--ef-gray)" }}>→→→</span>
            <span className="px-3 py-1.5 rounded" style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", color: "var(--ef-violet)" }}>Check Cache</span>
            <span style={{ color: "var(--ef-gray)" }}>→→→</span>
            <span className="px-3 py-1.5 rounded animate-pulse-green" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", color: "var(--ef-green)" }}>HIT: 1ms ✓</span>
          </div>
          <div className="ml-[7.5rem] mt-2 flex items-start gap-2 text-xs font-section" style={{ color: "var(--ef-gray)" }}>
            <span className="mt-0.5">↓ MISS</span>
          </div>
          <div className="flex items-center flex-wrap gap-2 text-xs font-section mt-2 ml-[7.5rem]">
            <span className="px-3 py-1.5 rounded" style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", color: "var(--ef-orange)" }}>Hit Database</span>
            <span style={{ color: "var(--ef-gray)" }}>→</span>
            <span className="px-3 py-1.5 rounded" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "var(--ef-cyan)" }}>Store in Cache</span>
            <span style={{ color: "var(--ef-gray)" }}>→</span>
            <span className="px-3 py-1.5 rounded" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", color: "var(--ef-green)" }}>Return + next time: instant</span>
          </div>
        </motion.div>

        {/* TTL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <TTLClock active={active} />
        </motion.div>
      </div>
    </div>
  );
}
