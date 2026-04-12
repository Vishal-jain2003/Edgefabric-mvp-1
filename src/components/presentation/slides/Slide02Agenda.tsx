import { motion } from "framer-motion";

const sections = [
  { num: "01", title: "SCALE", desc: "Why everything breaks at 10M users", color: "#00D4FF", dir: [-80, -80] },
  { num: "02", title: "SCENARIOS", desc: "Netflix, Instagram — real war stories", color: "#7C3AED", dir: [80, -80] },
  { num: "03", title: "WHY CACHE?", desc: "The math behind DB overload", color: "#10B981", dir: [-80, 0] },
  { num: "04", title: "HOW IT WORKS", desc: "Mental models, TTL, eviction", color: "#F59E0B", dir: [80, 0] },
  { num: "05", title: "ARCHITECTURE", desc: "L1+L2, distributed, patterns", color: "#EF4444", dir: [-80, 80] },
  { num: "06", title: "SURVIVAL", desc: "Challenges, lessons, results", color: "#00D4FF", dir: [80, 80] },
];

export function Slide02Agenda() {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-10 text-center"
        >
          What We're Covering
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: s.dir[0], y: s.dir[1] }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              className="card-cinematic rounded-xl p-5 relative overflow-hidden hover:scale-105 transition-transform duration-300"
              style={{ borderLeftColor: s.color, borderLeftWidth: 3 }}
            >
              <div
                className="font-mono-custom text-4xl font-bold opacity-20 absolute top-3 right-4"
                style={{ color: s.color }}
              >
                {s.num}
              </div>
              <div className="font-mono-custom text-sm mb-2" style={{ color: s.color }}>
                {s.num}
              </div>
              <div className="font-display text-lg font-bold text-foreground mb-1">{s.title}</div>
              <div className="text-sm text-muted-foreground">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
