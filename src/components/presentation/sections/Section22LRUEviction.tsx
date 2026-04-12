import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LRUVisualizer } from "@/components/lru/LRUVisualizer";
import { LRUCache, type LRUNode } from "@/engine/lruCache";

interface Props { active: boolean; }

export function Section22LRUEviction({ active }: Props) {
  const cacheRef = useRef(new LRUCache(2048));
  const [order, setOrder] = useState<LRUNode[]>([]);
  const [memory, setMemory] = useState({ current: 0, max: 2048 });
  const [evicted, setEvicted] = useState<string[]>([]);

  const sync = () => {
    setOrder(cacheRef.current.getOrder());
    setMemory(cacheRef.current.getMemoryUsage());
  };

  const seed = () => {
    cacheRef.current = new LRUCache(2048);
    cacheRef.current.put("old-key-1", 512);
    cacheRef.current.put("old-key-2", 512);
    cacheRef.current.put("recent-key", 384);
    setEvicted([]);
    sync();
  };

  const insert = () => {
    const key = `new-${Math.floor(Math.random() * 100)}`;
    const result = cacheRef.current.put(key, 700);
    setEvicted(result.evicted);
    sync();
  };

  const accessTop = () => {
    const candidate = cacheRef.current.getOrder()[Math.min(2, Math.max(0, cacheRef.current.getOrder().length - 1))];
    if (!candidate) return;
    cacheRef.current.access(candidate.key);
    sync();
  };

  useEffect(() => { seed(); }, []);

  return (
    <div className="slide-container px-8 md:px-14">
      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-4"
          style={{ fontSize: "clamp(1.2rem, 2.8vw, 2rem)", color: "var(--ef-white)" }}
        >
          LRU Eviction Under Memory Pressure
        </motion.h2>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-5">
          <LRUVisualizer order={order} memory={memory} lastEvicted={evicted} />

          <div className="glass rounded-xl p-4 space-y-2">
            <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>INTERACTIONS</div>
            <button onClick={insert} className="w-full rounded-lg py-2 font-section text-xs" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.4)", color: "#ef4444" }}>
              Insert 700B Entry (Force Eviction)
            </button>
            <button onClick={accessTop} className="w-full rounded-lg py-2 font-section text-xs" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.4)", color: "#10b981" }}>
              Access Near-LRU Entry
            </button>
            <button onClick={seed} className="w-full rounded-lg py-2 font-section text-xs" style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.4)", color: "#60a5fa" }}>
              Reset
            </button>
            <div className="font-section text-xs mt-2" style={{ color: "var(--ef-gray)" }}>
              Eviction source is always tail (least-recently used).
            </div>
            <div className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>
              {active ? "Interactive and deterministic by operation order." : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
