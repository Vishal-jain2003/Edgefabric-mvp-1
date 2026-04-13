import { AnimatePresence, motion } from "framer-motion";
import type { LRUNode } from "@/engine/lruCache";

interface LRUVisualizerProps {
  order: LRUNode[];
  memory: { current: number; max: number };
  lastEvicted: string[];
}

function formatBytes(valueInKB: number): string {
  if (valueInKB >= 1024) {
    return `${(valueInKB / 1024).toFixed(1)}MB`;
  }
  return `${valueInKB}KB`;
}

function LinearLinkedList({ order }: { order: LRUNode[] }) {
  if (order.length === 0) {
    return (
      <div className="glass rounded-xl p-4 mt-4">
        <div className="font-section text-xs mb-3" style={{ color: "var(--ef-cyan)" }}>
          DOUBLY LINKED LIST STRUCTURE
        </div>
        <div className="flex items-center justify-center py-8 text-sm" style={{ color: "var(--ef-gray)" }}>
          Empty - Add keys to see the linked list
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-4 mt-4">
      <div className="font-section text-xs mb-3" style={{ color: "var(--ef-cyan)" }}>
        DOUBLY LINKED LIST STRUCTURE
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-[10px] font-section" style={{ color: "var(--ef-gray)" }}>
        <div className="flex items-center gap-1">
          <span style={{ color: "var(--ef-cyan)" }}>→</span> next
        </div>
        <div className="flex items-center gap-1">
          <span style={{ color: "var(--ef-amber)" }}>←</span> prev
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--ef-green)" }} />
          MRU
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ background: "#ef4444" }} />
          LRU (evict)
        </div>
      </div>

      {/* Linear Linked List */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-1 min-w-max">
          {/* HEAD Pointer Node */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center"
          >
            <div
              className="px-3 py-2 rounded-lg font-section text-[10px] font-bold"
              style={{
                background: "rgba(16,185,129,0.15)",
                border: "2px solid var(--ef-green)",
                color: "var(--ef-green)",
              }}
            >
              HEAD
            </div>
            <div className="text-[8px] mt-1" style={{ color: "var(--ef-gray)" }}>ptr</div>
          </motion.div>

          {/* Arrow from HEAD */}
          <svg width="30" height="20" viewBox="0 0 30 20">
            <line x1="0" y1="10" x2="22" y2="10" stroke="var(--ef-green)" strokeWidth="2" />
            <polygon points="28,10 20,5 20,15" fill="var(--ef-green)" />
          </svg>

          {/* Data Nodes */}
          {order.map((entry, index) => {
            const isFirst = index === 0;
            const isLast = index === order.length - 1;
            const nodeColor = isFirst ? "var(--ef-green)" : isLast ? "#ef4444" : "var(--ef-cyan)";
            const bgColor = isFirst ? "rgba(16,185,129,0.1)" : isLast ? "rgba(239,68,68,0.1)" : "rgba(0,230,230,0.08)";

            return (
              <motion.div
                key={entry.key}
                className="flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {/* Node Box */}
                <div
                  className="flex flex-col items-center rounded-lg px-3 py-2 min-w-[70px]"
                  style={{
                    background: bgColor,
                    border: `2px solid ${nodeColor}`,
                    boxShadow: `0 0 10px ${nodeColor}30`,
                  }}
                >
                  {/* Key */}
                  <div
                    className="font-mono text-[10px] font-bold truncate max-w-[60px]"
                    style={{ color: nodeColor }}
                    title={entry.key}
                  >
                    {entry.key.length > 8 ? entry.key.slice(0, 7) + ".." : entry.key}
                  </div>
                  {/* Size */}
                  <div className="text-[8px] mt-0.5" style={{ color: "var(--ef-gray)" }}>
                    {formatBytes(entry.memorySize)}
                  </div>
                  {/* Pointers representation */}
                  <div className="flex gap-2 mt-1 text-[7px]" style={{ color: "var(--ef-gray)" }}>
                    <span style={{ color: "var(--ef-amber)" }}>{!isFirst ? "←" : "∅"}</span>
                    <span>|</span>
                    <span style={{ color: "var(--ef-cyan)" }}>{!isLast ? "→" : "∅"}</span>
                  </div>
                </div>

                {/* Arrow to next node (if not last) */}
                {index < order.length - 1 && (
                  <svg width="35" height="30" viewBox="0 0 35 30">
                    {/* Next pointer (top arrow) */}
                    <line x1="2" y1="10" x2="26" y2="10" stroke="var(--ef-cyan)" strokeWidth="1.5" />
                    <polygon points="32,10 24,6 24,14" fill="var(--ef-cyan)" />
                    {/* Prev pointer (bottom arrow) */}
                    <line x1="32" y1="20" x2="8" y2="20" stroke="var(--ef-amber)" strokeWidth="1.5" strokeOpacity="0.6" />
                    <polygon points="2,20 10,16 10,24" fill="var(--ef-amber)" fillOpacity="0.6" />
                  </svg>
                )}
              </motion.div>
            );
          })}

          {/* Arrow to TAIL */}
          <svg width="30" height="20" viewBox="0 0 30 20">
            <line x1="0" y1="10" x2="22" y2="10" stroke="#ef4444" strokeWidth="2" />
            <polygon points="28,10 20,5 20,15" fill="#ef4444" />
          </svg>

          {/* TAIL Pointer Node */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center"
          >
            <div
              className="px-3 py-2 rounded-lg font-section text-[10px] font-bold"
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "2px solid #ef4444",
                color: "#ef4444",
              }}
            >
              TAIL
            </div>
            <div className="text-[8px] mt-1" style={{ color: "var(--ef-gray)" }}>evict</div>
          </motion.div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 text-[10px] font-section" style={{ color: "var(--ef-gray)" }}>
        New entries added at HEAD (MRU) • Eviction from TAIL (LRU)
      </div>
    </div>
  );
}

export function LRUVisualizer({ order, memory, lastEvicted }: LRUVisualizerProps) {
  const usage = Math.min((memory.current / Math.max(memory.max, 1)) * 100, 100);

  return (
    <div>
      {/* Original LRU Stack View */}
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
                    border: `1px solid ${index === 0 ? "rgba(16,185,129,0.4)" : index === order.length - 1 ? "rgba(239,68,68,0.4)" : "var(--ef-border)"}`,
                    background: index === 0 ? "rgba(16,185,129,0.08)" : index === order.length - 1 ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.03)",
                  }}
                >
                  <div className="font-section text-[11px]" style={{ color: "var(--ef-lgray)" }}>
                    <span style={{ color: index === 0 ? "var(--ef-green)" : index === order.length - 1 ? "#ef4444" : "var(--ef-gray)" }}>{role}</span> [{entry.key}] {formatBytes(entry.memorySize)}
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

      {/* Linear Linked List Visualization */}
      <LinearLinkedList order={order} />
    </div>
  );
}
 