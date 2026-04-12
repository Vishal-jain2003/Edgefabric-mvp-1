import { motion } from "framer-motion";
import { useCountUp } from "../useCountUp";

const steps = [
  { title: "User Requests", desc: "140M users hit Netflix at 8PM Friday", icon: "👤", color: "#00D4FF" },
  { title: "No Cache", desc: "Every request goes to database", icon: "💀", color: "#EF4444" },
  { title: "DB MELTS", desc: "PostgreSQL hits 100% CPU. Response: timeout.", icon: "🔥", color: "#EF4444" },
  { title: "Caching Saves It", desc: "Redis serves 95% of reads in <1ms", icon: "⚡", color: "#10B981" },
];

function PulsingRedCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-pulse-red rounded-xl p-4 card-cinematic border border-red-alert">
      {children}
    </div>
  );
}

export function Slide04Netflix() {
  const users = useCountUp(140, 1200, true);
  const hits = useCountUp(2800000, 1500, true);
  const redisSaved = useCountUp(95, 1000, true);

  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-5xl text-foreground mb-2"
        >
          The Netflix <span className="text-cyan">Friday Night</span> Problem
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-8 text-lg"
        >
          What happens when 140 million people press play at the same time?
        </motion.div>

        {/* Timeline */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex md:flex-col items-center gap-2 flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.2 }}
                className={`flex-1 w-full card-cinematic rounded-xl p-4 relative ${s.color === "#EF4444" && i === 2 ? "animate-pulse-red" : ""}`}
                style={{ borderTopColor: s.color, borderTopWidth: 2 }}
              >
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="font-bold text-sm mb-1" style={{ color: s.color }}>{s.title}</div>
                <div className="text-xs text-muted-foreground">{s.desc}</div>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6 + i * 0.2, duration: 0.4 }}
                  className="hidden md:block text-cyan text-xl"
                >
                  →
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Peak users", value: `${users}M`, color: "#00D4FF" },
            { label: "DB hits averted", value: `${(hits / 1000000).toFixed(1)}M/sec`, color: "#EF4444" },
            { label: "Served by Redis", value: `${redisSaved}%`, color: "#10B981" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.15 }}
              className="card-cinematic rounded-xl p-4 text-center"
              style={{ borderColor: stat.color, borderWidth: 1 }}
            >
              <div className="font-mono-custom text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
