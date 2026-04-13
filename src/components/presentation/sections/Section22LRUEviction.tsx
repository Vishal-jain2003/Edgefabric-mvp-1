import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LRUVisualizer } from "@/components/lru/LRUVisualizer";
import { LRUCache, type LRUNode } from "@/engine/lruCache";

interface Props { active: boolean; }

// 2 MB cache size in KB
const CACHE_SIZE_KB = 2048;

// Random sizes in KB
const KEY_SIZES_KB = [700, 650, 350, 550];

function getRandomSize(): number {
  return KEY_SIZES_KB[Math.floor(Math.random() * KEY_SIZES_KB.length)];
}

export function Section22LRUEviction({ active }: Props) {
  const cacheRef = useRef(new LRUCache(CACHE_SIZE_KB));
  const [order, setOrder] = useState<LRUNode[]>([]);
  const [memory, setMemory] = useState({ current: 0, max: CACHE_SIZE_KB });
  const [evicted, setEvicted] = useState<string[]>([]);
  const [lastInsertedSize, setLastInsertedSize] = useState<number>(0);

  const sync = () => {
    setOrder(cacheRef.current.getOrder());
    setMemory(cacheRef.current.getMemoryUsage());
  };

  const seed = () => {
    cacheRef.current = new LRUCache(CACHE_SIZE_KB);
    cacheRef.current.put("user-123", 650);
    cacheRef.current.put("session-456", 550);
    cacheRef.current.put("cache-789", 350);
    setEvicted([]);
    setLastInsertedSize(0);
    sync();
  };

  const insert = () => {
    const key = `key-${Math.floor(Math.random() * 1000)}`;
    const size = getRandomSize();
    const result = cacheRef.current.put(key, size);
    setEvicted(result.evicted);
    setLastInsertedSize(size);
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
            <div className="text-[10px] font-section mb-2 px-2 py-1 rounded" style={{ background: "rgba(0,230,230,0.1)", color: "var(--ef-gray)" }}>
              Cache: 2 MB • Key sizes: 700KB, 650KB, 350KB, 550KB (random)
            </div>
            <button onClick={insert} className="w-full rounded-lg py-2 font-section text-xs" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.4)", color: "#ef4444" }}>
              Insert Random Key {lastInsertedSize > 0 && `(last: ${lastInsertedSize}KB)`}
            </button>
            <button onClick={accessTop} className="w-full rounded-lg py-2 font-section text-xs" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.4)", color: "#10b981" }}>
              Access Near-LRU Entry (Move to MRU)
            </button>
            <button onClick={seed} className="w-full rounded-lg py-2 font-section text-xs" style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.4)", color: "#60a5fa" }}>
              Reset Cache
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
 