import { motion } from "framer-motion";
import { useCountUp } from "../useCountUp";

const bullets = [
  "Every millisecond of latency costs revenue",
  "Databases cannot handle 10M+ reads per second",
  "Cache is the difference between survival and downtime",
  "This is not optimization — this is architecture",
];

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="card-cinematic rounded-lg p-4 text-center min-w-[120px] glow-cyan"
    >
      <div className="text-2xl font-mono-custom text-cyan font-bold">{value}</div>
      <div className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

export function Slide01Title() {
  return (
    <div className="slide-container px-8 md:px-16">
      {/* Left glowing bar */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-8 top-[15%] bottom-[15%] w-1 bg-cyan rounded-full glow-cyan-strong"
        style={{ originY: 0 }}
      />

      <div className="max-w-5xl w-full pl-12">
        {/* Title */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl md:text-7xl font-bold text-foreground mb-2"
          >
            Caching Is
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-display text-6xl md:text-9xl font-bold text-cyan text-glow-cyan tracking-widest animate-glow-pulse"
          >
            SURVIVAL
          </motion.div>
        </div>

        {/* Bullets */}
        <div className="mb-10 space-y-3">
          {bullets.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.2, duration: 0.5 }}
              className="flex items-center gap-3 text-lg text-muted-foreground"
            >
              <span className="w-2 h-2 rounded-full bg-cyan flex-shrink-0" />
              {b}
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex gap-4 flex-wrap">
          <StatCard value="10M+" label="Requests / sec" delay={1.6} />
          <StatCard value="~1ms" label="Cache latency" delay={1.8} />
          <StatCard value="94%" label="DB load reduced" delay={2.0} />
        </div>
      </div>

      {/* Shortcut legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-8 right-8 text-xs text-muted-foreground font-mono-custom text-right"
      >
        ← → navigate &nbsp;|&nbsp; F fullscreen
      </motion.div>
    </div>
  );
}
