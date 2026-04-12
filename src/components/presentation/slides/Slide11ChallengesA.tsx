import { motion } from "framer-motion";

const challenges = [
  {
    icon: "🐏",
    title: "Cache Stampede",
    color: "#EF4444",
    problem: "A popular key expires. 10,000 requests flood the DB simultaneously to refill it.",
    fix: "Use mutex locks or probabilistic early recompute. Only ONE request rebuilds; the rest wait.",
    also: "Also called 'Thundering Herd Problem'",
  },
  {
    icon: "❓",
    title: "Cache Invalidation",
    color: "#F59E0B",
    problem: "User updates their profile. Cache shows stale data for 5 minutes. Users see the wrong info.",
    fix: "Write-through cache: on DB write, immediately update or delete cache key. Never serve stale.",
    also: '"There are only 2 hard problems in CS: cache invalidation and naming things" — Phil Karlton',
  },
  {
    icon: "🔥",
    title: "Hot Key Problem",
    color: "#EF4444",
    problem: "One celebrity's profile is requested 1M times/sec. One Redis node melts under the load.",
    fix: "Replicate hot keys across multiple nodes. Client-side randomization selects replica on each read.",
    also: "Beyoncé Effect: 100x traffic spike on a single key",
  },
];

export function Slide11ChallengesA() {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-8"
        >
          Caching <span className="text-red-alert">Challenges</span> — Part 1
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
                    className="text-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ delay: 0.5 + i * 0.25, duration: 0.3, repeat: 2 }}
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
