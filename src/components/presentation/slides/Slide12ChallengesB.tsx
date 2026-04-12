import { motion } from "framer-motion";

const challenges = [
  {
    icon: "💀",
    title: "Node Failures",
    color: "#EF4444",
    problem: "One of your 6 Redis nodes dies. 1/6 of all cache keys are unreachable. Traffic floods the DB.",
    fix: "Use Redis Sentinel or Redis Cluster with replication. Each shard has a standby replica that auto-promotes.",
    also: "Design for failure: assume nodes will die.",
  },
  {
    icon: "💾",
    title: "Memory Pressure",
    color: "#F59E0B",
    problem: "Cache is full. New keys push out old ones (eviction). If the wrong keys get evicted, DB load spikes.",
    fix: "Use LRU (Least Recently Used) eviction. Monitor cache hit rate — below 90% means too many evictions.",
    also: "Rule: cache size should be ~10-20% of your hot dataset size",
  },
  {
    icon: "⚖️",
    title: "Consistency",
    color: "#7C3AED",
    problem: "DB says price is $9.99. Cache says $12.99. User gets charged wrong amount. Support tickets explode.",
    fix: "For sensitive data: use write-through (update cache on every DB write). Accept eventual consistency only for non-critical data.",
    also: "CAP theorem: distributed systems can't have perfect consistency + availability at same time",
  },
];

export function Slide12ChallengesB() {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-8"
        >
          Caching <span className="text-red-alert">Challenges</span> — Part 2
        </motion.h2>

        <div className="space-y-4">
          {challenges.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.3 + i * 0.25, duration: 0.5 }}
              className="card-cinematic rounded-xl overflow-hidden"
              style={{ borderLeftColor: c.color, borderLeftWidth: 3 }}
            >
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <motion.span
                    className={`text-2xl ${c.icon === "💀" ? "block" : ""}`}
                    animate={
                      c.icon === "💀"
                        ? { opacity: [1, 0.2, 1] }
                        : { scale: [1, 1.2, 1] }
                    }
                    transition={{ delay: 0.5 + i * 0.25, duration: 0.8, repeat: 2 }}
                  >
                    {c.icon}
                  </motion.span>
                  <div className="font-display text-xl font-bold" style={{ color: c.color }}>
                    {c.title}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-red-alert text-xs font-mono-custom uppercase tracking-wider mb-1">Problem</div>
                    <div className="text-sm text-muted-foreground">{c.problem}</div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.25 }}
                  >
                    <div className="text-green-success text-xs font-mono-custom uppercase tracking-wider mb-1">Fix →</div>
                    <div className="text-sm text-foreground">{c.fix}</div>
                  </motion.div>
                </div>
                {c.also && (
                  <div className="mt-3 text-xs text-muted-foreground italic border-t border-muted pt-2">{c.also}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
