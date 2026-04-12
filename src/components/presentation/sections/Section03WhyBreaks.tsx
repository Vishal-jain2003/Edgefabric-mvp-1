import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Props { active: boolean; }

const rows = [
  { before: "Normal user traffic", after: "Sudden rush causes repeated data requests", shake: true },
  { before: "Data comes from one source", after: "System starts checking many places again and again", shake: false },
  { before: "App feels fast", after: "Users start seeing delay across pages", shake: true },
];

function DbCounter({ active }: { active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setCount(c => {
        const next = c + Math.floor(Math.random() * 12 + 8);
        return next > 100 ? 12 : next;
      });
    }, 140);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div className="glass-red rounded-xl p-4 text-center">
      <div className="font-section text-xs mb-1" style={{ color: "var(--ef-gray)" }}>SERVER LOAD METER</div>
      <div className="font-section font-bold text-2xl animate-pulse-red" style={{ color: "var(--ef-red)" }}>
        {count}/100
      </div>
    </div>
  );
}

export function Section03WhyBreaks({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold mb-8"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "var(--ef-white)" }}
        >
          What goes wrong when traffic jumps.
        </motion.h2>

        {/* Simple breakdown card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-violet rounded-xl p-5 mb-8 border-l-4"
          style={{ borderLeftColor: "var(--ef-violet)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-section text-sm font-bold" style={{ color: "var(--ef-violet)" }}>SIMPLE BREAKDOWN</span>
          </div>
          <div className="font-body text-sm leading-relaxed space-y-1" style={{ color: "var(--ef-lgray)" }}>
            <p>Step 1: Many users come at the same time.</p>
            <p>Step 2: Same data is requested again and again from backend.</p>
            <p style={{ color: "var(--ef-red)" }}>Step 3: Response time increases and users feel the app is slow.</p>
            <p className="pt-1" style={{ color: "var(--ef-cyan)" }}>EdgeFabric keeps popular data ready, so speed stays better even in rush hours.</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Rows */}
          <div className="space-y-3">
            {rows.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.25, duration: 0.5 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-body text-sm" style={{ color: "var(--ef-lgray)" }}>{r.before}</span>
                  <span style={{ color: "var(--ef-gray)" }}>→</span>
                  <span
                    className={`font-section text-sm font-bold ${r.shake && active ? "animate-shake" : ""}`}
                    style={{ color: "var(--ef-red)", textShadow: "0 0 10px rgba(239,68,68,0.4)" }}
                  >
                    {r.after}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Live counter */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <DbCounter active={active} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
