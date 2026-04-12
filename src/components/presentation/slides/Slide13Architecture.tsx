import { motion } from "framer-motion";

const layers = [
  { icon: "🌐", label: "CDN Layer", desc: "Static assets, edge caching (CloudFront, Cloudflare)", color: "#00D4FF", latency: "<5ms" },
  { icon: "🔧", label: "API Gateway", desc: "Rate limiting, response caching for public endpoints", color: "#7C3AED", latency: "~2ms" },
  { icon: "⚡", label: "L1 Local Cache", desc: "In-process Caffeine/Guava cache per app server", color: "#F59E0B", latency: "<0.1ms" },
  { icon: "🔴", label: "L2 Redis Cluster", desc: "Shared distributed cache — 6 shards, 3 replicas each", color: "#EF4444", latency: "~1ms" },
  { icon: "🗄", label: "Read Replicas", desc: "3 PostgreSQL read replicas for cache miss overflow", color: "#10B981", latency: "~15ms" },
  { icon: "💎", label: "Primary DB", desc: "Single source of truth — writes only", color: "#7C3AED", latency: "~30ms" },
];

export function Slide13Architecture() {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-4xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-8"
        >
          Our <span className="text-cyan">Cache Architecture</span>
        </motion.h2>

        <div className="relative">
          {layers.map((layer, i) => (
            <div key={i} className="relative">
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
                className="card-cinematic rounded-xl p-4 flex items-center gap-4 mb-1"
                style={{ borderLeftColor: layer.color, borderLeftWidth: 3 }}
              >
                <span className="text-2xl flex-shrink-0">{layer.icon}</span>
                <div className="flex-1">
                  <div className="font-bold text-sm mb-0.5" style={{ color: layer.color }}>{layer.label}</div>
                  <div className="text-xs text-muted-foreground">{layer.desc}</div>
                </div>
                <div className="font-mono-custom text-xs font-bold flex-shrink-0" style={{ color: layer.color }}>
                  {layer.latency}
                </div>
              </motion.div>

              {/* Connecting arrow with traveling dot */}
              {i < layers.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="flex items-center justify-center my-0.5 relative"
                >
                  <div className="w-px h-4 relative overflow-visible flex justify-center">
                    <div className="w-px h-full bg-muted" />
                    <motion.div
                      className="absolute top-0 w-1.5 h-1.5 rounded-full -ml-[2px]"
                      style={{ background: layer.color }}
                      animate={{ y: ["0%", "100%"] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
                    />
                  </div>
                  <div className="text-muted-foreground text-xs absolute right-4 font-mono-custom">↓ miss</div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
