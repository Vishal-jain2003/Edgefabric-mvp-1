import { motion } from "framer-motion";
import { CountUp } from "../shared";

interface Props { active: boolean; }

const lines = [
  "Cache early.",
  "Cache smart.",
  "Survive scale.",
];

const takeaways = [
  "At scale, the same data is requested millions of times — cache is the only answer",
  "WAL + SWIM + consistent hashing: the three pillars that kept us running at 3AM",
  "Agentic ops isn't the future — it's what we shipped",
  "99.97% availability isn't luck. It's architecture.",
];

const metrics = [
  { label: "Availability",    value: 9997,  format: (n: number) => `${(n/100).toFixed(2)}%` },
  { label: "GET P95",         value: 420,   format: (n: number) => `${(n/100).toFixed(1)}ms` },
  { label: "Hit Rate",        value: 9470,  format: (n: number) => `${(n/100).toFixed(1)}%` },
  { label: "Key Movement",    value: 830,   format: (n: number) => `≤${(n/100).toFixed(1)}%` },
  { label: "Data Loss",       value: 0,     format: () => "0 bytes" },
  { label: "Requirements Met",value: 12,   format: (n: number) => `${n}/12` },
];

export function Section17Closing({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      {/* Cinematic wave backdrop */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(58% 72% at 85% 68%, rgba(0, 224, 255, 0.3) 0%, rgba(111, 65, 255, 0.22) 34%, rgba(255, 20, 147, 0.16) 57%, transparent 78%), linear-gradient(125deg, rgba(255, 59, 92, 0.12) 8%, rgba(120, 55, 230, 0.16) 44%, rgba(0, 230, 230, 0.1) 80%)",
        }} />

      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(162deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 3px, transparent 20px)",
          opacity: 0.2,
          maskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0.2) 62%, transparent)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0.2) 62%, transparent)",
        }} />

      <div className="max-w-5xl w-full relative z-10">
        {/* Main lines */}
        <div className="mb-10">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.5, duration: 0.7, type: "spring", damping: 14 }}
              className="font-display font-black leading-tight"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                color: i === 2 ? "var(--ef-cyan)" : "var(--ef-white)",
                textShadow: i === 2 ? "0 0 30px rgba(0,212,255,0.5)" : "none",
              }}
            >
              {line}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="font-section text-sm mt-2 text-right max-w-lg"
            style={{ color: "var(--ef-cyan)" }}
          >
            — EdgeFabric
          </motion.div>
        </div>

        {/* Takeaways */}
        <div className="space-y-2 mb-8">
          {takeaways.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.3 + i * 0.3 }}
              className="flex items-start gap-3 font-body text-sm"
              style={{ color: "var(--ef-lgray)" }}
            >
              <span style={{ color: "var(--ef-green)" }} className="flex-shrink-0">✓</span>
              {t}
            </motion.div>
          ))}
        </div>

        {/* Metric strip */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.6 + i * 0.15 }}
              className="glass rounded-xl p-3 text-center"
            >
              <div className="font-section font-bold text-base" style={{ color: "var(--ef-cyan)" }}>
                {active ? <CountUp to={m.value} duration={2000 + i * 100} active={active} format={m.format} /> : "–"}
              </div>
              <div className="font-body text-xs mt-0.5" style={{ color: "var(--ef-gray)" }}>{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.8 }}
          className="text-center"
          style={{ animation: "glow-pulse 3s ease-in-out infinite" }}
        >
          <div className="font-section text-lg font-bold" style={{ color: "var(--ef-cyan)", textShadow: "0 0 20px rgba(0,212,255,0.4)" }}>
            EF
          </div>
          <div className="font-body text-sm mt-2" style={{ color: "var(--ef-gray)" }}>
            Questions? Let's go deeper.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
