import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TimeWheel } from "@/components/timewheel/TimeWheel";
import { TimeWheel as TimeWheelEngine } from "@/engine/timeWheel";

interface Props { active: boolean; }

export function Section21TimeWheel({ active }: Props) {
  const wheelRef = useRef(new TimeWheelEngine());
  const [tickCount, setTickCount] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentBucket, setCurrentBucket] = useState(0);
  const [buckets, setBuckets] = useState(wheelRef.current.getBuckets());
  const [expiring, setExpiring] = useState<string[]>([]);

  const sync = () => {
    setBuckets(wheelRef.current.getBuckets());
    setCurrentBucket(wheelRef.current.getCurrentBucket());
  };

  const addRandomKey = () => {
    const delay = 1 + Math.floor(Math.random() * 25);
    const key = `k-${Date.now().toString().slice(-4)}`;
    wheelRef.current.addKey(key, Date.now() + delay * 1000);
    sync();
  };

  const step = () => {
    const out = wheelRef.current.tick();
    setTickCount((v) => v + 1);
    setCurrentBucket(out.newBucket);
    setExpiring(out.expiredKeys);
    sync();
  };

  const reset = () => {
    wheelRef.current = new TimeWheelEngine();
    wheelRef.current.addKey("expires-soon", Date.now() + 1000);
    wheelRef.current.addKey("expires-later", Date.now() + 7000);
    setExpiring([]);
    setTickCount(0);
    sync();
  };

  useEffect(() => { reset(); }, []);

  useEffect(() => {
    if (!active || !playing) return;
    const id = setInterval(step, 1000);
    return () => clearInterval(id);
  }, [active, playing]);

  return (
    <div className="slide-container px-8 md:px-14">
      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-4"
          style={{ fontSize: "clamp(1.2rem, 2.8vw, 2rem)", color: "var(--ef-white)" }}
        >
          Time Wheel Expiry (60 Buckets, 1s Tick)
        </motion.h2>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
          <TimeWheel buckets={buckets} currentBucket={currentBucket} tickCount={tickCount} expiringKeys={expiring} />

          <div className="glass rounded-xl p-4 space-y-2">
            <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>CONTROL</div>
            <button onClick={() => setPlaying((v) => !v)} className="w-full rounded-lg py-2 font-section text-xs" style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.4)", color: "#60a5fa" }}>
              {playing ? "Pause" : "Play"}
            </button>
            <button onClick={step} className="w-full rounded-lg py-2 font-section text-xs" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.4)", color: "#10b981" }}>
              Step One Tick
            </button>
            <button onClick={addRandomKey} className="w-full rounded-lg py-2 font-section text-xs" style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.4)", color: "#f59e0b" }}>
              Add Key With TTL
            </button>
            <button onClick={reset} className="w-full rounded-lg py-2 font-section text-xs" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.35)", color: "#ef4444" }}>
              Reset
            </button>
            <div className="font-section text-xs mt-2" style={{ color: "var(--ef-gray)" }}>
              Current bucket advances as: (i + 1) mod 60.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
