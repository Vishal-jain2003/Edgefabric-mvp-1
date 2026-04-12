import { motion } from "framer-motion";
import { useTypewriter } from "../useCountUp";

const cards = [
  {
    type: "mistake",
    icon: "❌",
    title: "Cached Everything Blindly",
    body: "We cached 50GB of data including one-time queries. Memory exploded. Eviction killed hit rate. Lesson: only cache frequently-read, rarely-changed data.",
    color: "#EF4444",
  },
  {
    type: "lesson",
    icon: "✅",
    title: "Monitor Hit Rate First",
    body: "Deploy cache first, measure hit rate for a week, then optimize TTL and key strategy based on real traffic. Data beats intuition.",
    color: "#10B981",
  },
  {
    type: "mistake",
    icon: "❌",
    title: "Forgot Cache Invalidation",
    body: "Product prices were cached for 1 hour. A flash sale changed prices in DB. Customers saw wrong prices for 58 minutes. Lost trust, got chargebacks.",
    color: "#EF4444",
  },
  {
    type: "lesson",
    icon: "✅",
    title: "Event-Driven Invalidation",
    body: "Now every DB write publishes an event. Cache subscribers immediately purge affected keys. Stale data window: <100ms instead of 1 hour.",
    color: "#10B981",
  },
];

export function Slide14Lessons() {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-8"
        >
          Lessons & <span className="text-red-alert">Costly Mistakes</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
              className="card-cinematic rounded-xl p-5 relative overflow-hidden"
              style={{
                borderLeftColor: c.color,
                borderLeftWidth: 3,
              }}
            >
              {c.type === "mistake" ? (
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  animate={{ boxShadow: ["0 0 0 0 rgba(239,68,68,0)", "0 0 0 2px rgba(239,68,68,0.3)", "0 0 0 0 rgba(239,68,68,0)"] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
              ) : (
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ boxShadow: "0 0 20px rgba(16,185,129,0.15)" }}
                />
              )}

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{c.icon}</span>
                <div className="font-display text-lg font-bold" style={{ color: c.color }}>
                  {c.title}
                </div>
              </div>
              <TypedBody text={c.body} delay={0.8 + i * 0.2} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TypedBody({ text, delay }: { text: string; delay: number }) {
  const typed = useTypewriter(text, 15, true);
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="text-sm text-muted-foreground leading-relaxed"
    >
      {typed}
    </motion.p>
  );
}
