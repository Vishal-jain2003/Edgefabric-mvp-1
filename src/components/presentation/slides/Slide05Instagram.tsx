import { motion } from "framer-motion";
import { useTypewriter } from "../useCountUp";

const withoutPoints = [
  "Every like/follow triggers a DB query",
  "200M users = 200M queries per second",
  "MySQL dies. Page doesn't load.",
  "Engineers paged at 3am. Again.",
];

const withPoints = [
  "Follow graph cached in Redis clusters",
  "Feed pre-generated, not computed live",
  "Cache hit rate: 99.7%",
  "Engineers sleep. App stays alive.",
];

export function Slide05Instagram() {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-8 text-center"
        >
          Instagram: <span className="text-cyan">Feed at 200M Users</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Without Cache */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="card-cinematic rounded-xl p-6 animate-pulse-red border border-red-alert"
          >
            <div className="text-red-alert font-mono-custom text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="text-xl">💀</span> WITHOUT CACHE
            </div>
            <div className="space-y-3">
              {withoutPoints.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.25 }}
                  className="flex items-start gap-2 text-sm"
                >
                  <span className="text-red-alert mt-0.5 flex-shrink-0">✗</span>
                  <span className="text-muted-foreground">{p}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* With Cache */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="card-cinematic rounded-xl p-6 animate-pulse-green border border-green-success"
          >
            <div className="text-green-success font-mono-custom text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="text-xl">⚡</span> WITH CACHE (REDIS)
            </div>
            <div className="space-y-3">
              {withPoints.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.25 }}
                  className="flex items-start gap-2 text-sm"
                >
                  <span className="text-green-success mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-muted-foreground">{p}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
          className="mt-8 card-cinematic rounded-xl p-4 border-l-4 border-cyan text-center"
        >
          <span className="text-muted-foreground">Instagram served </span>
          <span className="text-cyan font-bold font-mono-custom text-xl">95M+ photos/day</span>
          <span className="text-muted-foreground"> by caching aggressively at every layer</span>
        </motion.div>
      </div>
    </div>
  );
}
