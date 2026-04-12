import { AnimatePresence, motion } from "framer-motion";
import type { LRUNode } from "@/engine/lruCache";

interface LRUVisualizerProps {
  order: LRUNode[];
  memory: { current: number; max: number };
  lastEvicted: string[];
}

function formatBytes(value: number): string {
  if (value >= 1024) {
    return `${(value / 1024).toFixed(1)}KB`;
  }
  return `${value}B`;
}

export function LRUVisualizer({ order, memory, lastEvicted }: LRUVisualizerProps) {
  const usage = Math.min((memory.current / Math.max(memory.max, 1)) * 100, 100);

  return (
    <div className="glass rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>
          LRU EVICTION STACK
        </div>
        <div className="font-section text-xs" style={{ color: usage > 85 ? "#f59e0b" : "var(--ef-gray)" }}>
          {usage.toFixed(0)}% used
        </div>
      </div>

      <div className="space-y-1.5 min-h-44">
        <AnimatePresence>
          {order.map((entry, index) => {
            const ageSeconds = Math.floor((Date.now() - entry.lastAccess) / 1000);
            const role = index === 0 ? "MRU" : index === order.length - 1 ? "LRU" : "   ";
            return (
              <motion.div
                key={entry.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 35, backgroundColor: "rgba(239,68,68,0.18)" }}
                layout
                className="rounded-lg px-2 py-1.5 flex items-center justify-between"
                style={{
                  border: `1px solid ${index === 0 ? "rgba(16,185,129,0.4)" : "var(--ef-border)"}`,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div className="font-section text-[11px]" style={{ color: "var(--ef-lgray)" }}>
                  {role} [{entry.key}] {formatBytes(entry.memorySize)}
                </div>
                <div className="font-section text-[11px]" style={{ color: "var(--ef-gray)" }}>
                  {ageSeconds}s ago
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
        <motion.div
          className="h-full"
          animate={{ width: `${usage}%` }}
          transition={{ duration: 0.4 }}
          style={{
            background: usage > 85 ? "linear-gradient(90deg,#f59e0b,#ef4444)" : "linear-gradient(90deg,#3b82f6,#10b981)",
          }}
        />
      </div>

      <div className="mt-2 font-section text-xs" style={{ color: "var(--ef-gray)" }}>
        Memory: {formatBytes(memory.current)} / {formatBytes(memory.max)}
      </div>
      <div className="font-section text-xs" style={{ color: lastEvicted.length ? "#ef4444" : "rgba(255,255,255,0.35)" }}>
        Evicted: {lastEvicted.length ? lastEvicted.join(", ") : "none"}
      </div>
    </div>
  );
}
