import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

function TiltCard({ children, color }: { children: React.ReactNode; color: string }) {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotY(x * 12);
    setRotX(-y * 12);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => { setRotX(0); setRotY(0); }}
      animate={{ rotateX: rotX, rotateY: rotY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="card-cinematic rounded-xl p-6 flex-1 cursor-default"
      style={{ borderTopColor: color, borderTopWidth: 3, transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

export function Slide08TypesOfCaching() {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-10 text-center"
        >
          Two Kinds of <span className="text-cyan">Cache</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-6 items-stretch relative">
          {/* Local Cache */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex-1"
          >
            <TiltCard color="#F59E0B">
              <div className="text-3xl mb-3">🧠</div>
              <div className="font-mono-custom text-xs text-yellow-400 uppercase tracking-widest mb-2">LOCAL CACHE</div>
              <div className="font-display text-2xl font-bold text-foreground mb-3">In-Process</div>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2"><span className="text-yellow-400">→</span> Lives in app server RAM</div>
                <div className="flex items-center gap-2"><span className="text-yellow-400">→</span> Sub-microsecond access</div>
                <div className="flex items-center gap-2"><span className="text-yellow-400">→</span> Lost on server restart</div>
                <div className="flex items-center gap-2"><span className="text-yellow-400">→</span> Not shared between servers</div>
              </div>
              <div className="card-cinematic rounded-lg p-3 border-l-2 border-yellow-400 text-xs">
                <span className="text-yellow-400 font-bold">Best for:</span> Config, feature flags, tiny lookup tables
              </div>
            </TiltCard>
          </motion.div>

          {/* VS badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="hidden md:flex items-center justify-center flex-shrink-0 z-10"
          >
            <div className="w-12 h-12 rounded-full bg-violet glow-violet flex items-center justify-center font-bold text-foreground text-sm">
              VS
            </div>
          </motion.div>

          {/* Shared Cache */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex-1"
          >
            <TiltCard color="#00D4FF">
              <div className="text-3xl mb-3">☁️</div>
              <div className="font-mono-custom text-xs text-cyan uppercase tracking-widest mb-2">SHARED CACHE</div>
              <div className="font-display text-2xl font-bold text-foreground mb-3">Distributed</div>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2"><span className="text-cyan">→</span> External service (Redis, Memcached)</div>
                <div className="flex items-center gap-2"><span className="text-cyan">→</span> ~1ms network latency</div>
                <div className="flex items-center gap-2"><span className="text-cyan">→</span> Survives server restarts</div>
                <div className="flex items-center gap-2"><span className="text-cyan">→</span> All servers see same data</div>
              </div>
              <div className="card-cinematic rounded-lg p-3 border-l-2 border-cyan text-xs">
                <span className="text-cyan font-bold">Best for:</span> Sessions, feed data, leaderboards, shared state
              </div>
            </TiltCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-6 text-center text-muted-foreground text-sm"
        >
          Production systems use <span className="text-cyan font-bold">both</span> — L1 (local) checks first, then L2 (shared), then DB.
        </motion.div>
      </div>
    </div>
  );
}
