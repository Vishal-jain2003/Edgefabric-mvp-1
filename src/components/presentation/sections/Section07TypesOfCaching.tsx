import { motion } from "framer-motion";
import { useState } from "react";

interface Props { active: boolean; }

const cards = [
  {
    tier: "L0",
    name: "CDN Edge Cache",
    icon: "🌐",
    speed: "~5ms",
    scope: "Geographically distributed",
    tools: "Cloudflare, Fastly, AWS CloudFront",
    bestFor: "Static assets, API responses, rendered HTML",
    drawback: "Hard to invalidate instantly across all edge nodes",
    color: "violet" as const,
    borderColor: "var(--ef-violet)",
    glassClass: "glass-violet",
  },
  {
    tier: "L1",
    name: "In-Process Cache",
    icon: "🔧",
    speed: "~0ms",
    scope: "This server only",
    tools: "Caffeine (Java), functools.lru_cache (Python), node-cache",
    bestFor: "Config, feature flags, reference data",
    drawback: "Each server has its own copy — 5 servers = 5 different answers",
    color: "amber" as const,
    borderColor: "var(--ef-amber)",
    glassClass: "glass-amber",
  },
  {
    tier: "L2",
    name: "Distributed Cache",
    icon: "🔗",
    speed: "~1ms",
    scope: "All servers see same data",
    tools: "Redis, Memcached, Hazelcast, EdgeFabric",
    bestFor: "Sessions, counters, rate limits, hot data",
    drawback: "Network hop. Single cluster = potential single point of failure",
    color: "cyan" as const,
    borderColor: "var(--ef-cyan)",
    glassClass: "glass-cyan",
  },
];

export function Section07TypesOfCaching({ active }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-8"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "var(--ef-white)" }}
        >
          Not all caches are equal.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
              onClick={() => setExpanded(expanded === i ? null : i)}
              className={`${c.glassClass} rounded-xl p-5 cursor-pointer tilt-card border-l-4 transition-all duration-300`}
              style={{ borderLeftColor: c.borderColor }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <div className="font-section text-xs" style={{ color: c.borderColor }}>{c.tier}</div>
                  <div className="font-body font-semibold text-sm" style={{ color: "var(--ef-white)" }}>{c.name}</div>
                </div>
              </div>
              <div className="space-y-1.5 text-xs font-body" style={{ color: "var(--ef-lgray)" }}>
                <div><span style={{ color: "var(--ef-gray)" }}>Speed:</span> <span style={{ color: c.borderColor }} className="font-semibold">{c.speed}</span></div>
                <div><span style={{ color: "var(--ef-gray)" }}>Scope:</span> {c.scope}</div>
                {expanded === i && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5 pt-1">
                    <div><span style={{ color: "var(--ef-gray)" }}>Tools:</span> {c.tools}</div>
                    <div><span style={{ color: "var(--ef-gray)" }}>Best for:</span> {c.bestFor}</div>
                    <div><span style={{ color: "var(--ef-red)" }}>Drawback:</span> {c.drawback}</div>
                  </motion.div>
                )}
              </div>
              <div className="mt-2 text-xs" style={{ color: "var(--ef-gray)" }}>
                {expanded === i ? "↑ click to collapse" : "↓ click to expand"}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="glass rounded-xl p-5"
        >
          <div className="font-section text-xs mb-3" style={{ color: "var(--ef-cyan)" }}>L0 + L1 + L2 PIPELINE</div>
          <div className="font-section text-xs leading-relaxed space-y-1" style={{ color: "var(--ef-lgray)" }}>
            <div>User Request → <span style={{ color: "var(--ef-violet)" }}>[L0: CDN Edge ~5ms]</span> → hit ✓</div>
            <div className="ml-8">↓ miss</div>
            <div className="ml-8"><span style={{ color: "var(--ef-amber)" }}>[L1: Local RAM ~0ms]</span> → hit ✓</div>
            <div className="ml-20">↓ miss</div>
            <div className="ml-20"><span style={{ color: "var(--ef-cyan)" }}>[L2: Redis ~1ms]</span> → hit ✓</div>
            <div className="ml-36">↓ miss</div>
            <div className="ml-36"><span style={{ color: "var(--ef-orange)" }}>[Database 60ms]</span> → store in L2 → store in L1 → return</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
