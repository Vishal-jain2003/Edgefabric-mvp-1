import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Props { active: boolean; }

function LatencyMeter({ target, active, color }: { target: number; active: boolean; color: string }) {
  const [val, setVal] = useState(200);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setVal(v => Math.min(v + Math.floor(Math.random() * 300), target));
    }, 120);
    return () => clearInterval(id);
  }, [active, target]);
  const pct = Math.min((val / 10000) * 100, 100);
  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs font-section mb-1">
        <span style={{ color: "var(--ef-gray)" }}>Latency</span>
        <span style={{ color }}>{val >= target ? (target > 500 ? "TIMEOUT" : `~${target}ms`) : `${val}ms`}</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--ef-border)" }}>
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

export function Section05Viral({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-8"
          style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)", color: "var(--ef-white)" }}
        >
          One viral post. Half a million requests. 60 seconds.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Without cache */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-red rounded-xl p-5 animate-pulse-red"
          >
            <div className="font-section text-xs font-bold mb-3" style={{ color: "var(--ef-red)" }}>WITHOUT CACHE</div>
            <div className="space-y-2 font-body text-xs leading-relaxed" style={{ color: "var(--ef-lgray)" }}>
              <p>500K users → 500K identical SQL JOINs</p>
              <p style={{ color: "var(--ef-red)" }}>→ Connection pool exhausted → 503 errors</p>
            </div>
            <LatencyMeter target={9000} active={active} color="var(--ef-red)" />
            {/* DB load bar */}
            <div className="mt-3">
              <div className="text-xs font-section mb-1" style={{ color: "var(--ef-gray)" }}>DB Load</div>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: active ? "100%" : "0%" }}
                transition={{ delay: 0.5, duration: 2 }}
                className="h-3 rounded-full animate-pulse-red"
                style={{ background: "var(--ef-red)" }}
              />
            </div>
          </motion.div>

          {/* With cache */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-green rounded-xl p-5 animate-pulse-green"
          >
            <div className="font-section text-xs font-bold mb-3" style={{ color: "var(--ef-green)" }}>WITH CACHE</div>
            <div className="space-y-2 font-body text-xs leading-relaxed" style={{ color: "var(--ef-lgray)" }}>
              <p>500K users → 1 cache write → 499,999 cache reads</p>
              <p style={{ color: "var(--ef-green)" }}>→ All served in ~1ms</p>
            </div>
            <LatencyMeter target={180} active={active} color="var(--ef-green)" />
            <div className="mt-3">
              <div className="text-xs font-section mb-1" style={{ color: "var(--ef-gray)" }}>DB Load</div>
              <div className="h-3 rounded-full" style={{ background: "var(--ef-border)" }}>
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "5%" }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="h-full rounded-full"
                  style={{ background: "var(--ef-green)" }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="glass-amber rounded-xl p-4"
        >
          <div className="font-section text-xs mb-1" style={{ color: "var(--ef-amber)" }}>📸 INSTAGRAM / TAO</div>
          <p className="font-body text-xs leading-relaxed" style={{ color: "var(--ef-lgray)" }}>
            Instagram uses Memcache + TAO (distributed cache for social graphs). When Kylie Jenner posts, TAO pre-warms the cache
            across data centers <em>before</em> the post goes live. That's why Instagram doesn't crash when a celebrity posts.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
