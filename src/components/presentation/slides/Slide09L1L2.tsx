import { motion } from "framer-motion";
import { useCountUp } from "../useCountUp";

const pipeline = [
  { label: "User Request", color: "#00D4FF", latency: null },
  { label: "L1 Cache", sublabel: "(Local RAM)", color: "#F59E0B", latency: "0.1ms", hit: true },
  { label: "L2 Cache", sublabel: "(Redis)", color: "#7C3AED", latency: "1ms", hit: true },
  { label: "Database", sublabel: "(Postgres)", color: "#EF4444", latency: "100ms", hit: false },
];

const walkthrough = [
  { icon: "⚡", label: "L1 Hit", desc: "Data in local memory → return in <0.1ms. 80% of traffic here.", color: "#F59E0B" },
  { icon: "🔵", label: "L1 Miss, L2 Hit", desc: "Not local → check Redis → return in ~1ms. 18% of traffic.", color: "#7C3AED" },
  { icon: "🔴", label: "L2 Miss (DB)", desc: "Cold query → hit DB in ~100ms → populate both caches. 2% of traffic.", color: "#EF4444" },
];

export function Slide09L1L2() {
  const l1 = useCountUp(80, 900, true);
  const l2 = useCountUp(18, 900, true);
  const db = useCountUp(2, 900, true);

  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-8"
        >
          L1 + L2 <span className="text-cyan">Cache Layering</span>
        </motion.h2>

        {/* Pipeline */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {pipeline.map((p, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.2 }}
                className="card-cinematic rounded-xl p-4 text-center min-w-[100px]"
                style={{ borderColor: p.color, borderWidth: 1 }}
              >
                <div className="font-bold text-sm mb-1" style={{ color: p.color }}>{p.label}</div>
                {p.sublabel && <div className="text-xs text-muted-foreground">{p.sublabel}</div>}
                {p.latency && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    className="font-mono-custom text-xs mt-2 font-bold"
                    style={{ color: p.color }}
                  >
                    {p.latency}
                  </motion.div>
                )}
              </motion.div>
              {i < pipeline.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="text-muted-foreground text-lg flex-shrink-0"
                >
                  →
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Traffic split */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="card-cinematic rounded-xl p-4 mb-6"
        >
          <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Traffic Distribution</div>
          <div className="flex gap-2 h-8 rounded-full overflow-hidden">
            <motion.div
              initial={{ flex: 0 }}
              animate={{ flex: 80 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex items-center justify-center text-xs font-bold text-space-bg rounded-l-full"
              style={{ background: "#F59E0B" }}
            >
              {l1}% L1
            </motion.div>
            <motion.div
              initial={{ flex: 0 }}
              animate={{ flex: 18 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="flex items-center justify-center text-xs font-bold text-foreground"
              style={{ background: "#7C3AED" }}
            >
              {l2}% L2
            </motion.div>
            <motion.div
              initial={{ flex: 0 }}
              animate={{ flex: 2 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="flex items-center justify-center text-xs font-bold text-foreground rounded-r-full"
              style={{ background: "#EF4444" }}
            >
              {db}%
            </motion.div>
          </div>
        </motion.div>

        {/* Walkthrough */}
        <div className="space-y-2">
          {walkthrough.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.2 }}
              className="card-cinematic rounded-lg p-3 flex items-start gap-3"
              style={{ borderLeftColor: w.color, borderLeftWidth: 2 }}
            >
              <span className="text-lg flex-shrink-0">{w.icon}</span>
              <div>
                <div className="font-bold text-sm mb-0.5" style={{ color: w.color }}>{w.label}</div>
                <div className="text-xs text-muted-foreground">{w.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
