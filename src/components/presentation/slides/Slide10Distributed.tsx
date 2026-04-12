import { motion } from "framer-motion";
import { useTypewriter } from "../useCountUp";
import { Server, Database, Cpu, Network, ArrowRight } from "lucide-react";

export function Slide10Distributed() {
  const typed = useTypewriter(
    'hash("user:42") % 3 = Node B\n→ Always routes to same node\n→ No duplicates, no confusion',
    30,
    true
  );

  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-6"
        >
          Distributed <span className="text-cyan">Caching Architecture</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Architecture diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="card-cinematic rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center"
            style={{ minHeight: 400 }}
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan/5 blur-[100px] pointer-events-none" />
            
            {/* App servers row */}
            <div className="relative z-10">
              <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-6 text-center font-medium opacity-70">Application Layer</div>
              <div className="flex justify-around items-center mb-12">
                {[1, 2, 3].map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-2 bg-cyan/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-background/40 backdrop-blur-sm border border-cyan/30 rounded-xl p-4 flex flex-col items-center gap-2 min-w-[80px]">
                      <Server size={20} className="text-cyan" />
                      <span className="text-[10px] font-mono-custom text-cyan/80">App {n}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Connecting Mesh */}
              <div className="relative h-16 mb-6">
                <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--ef-cyan)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="var(--ef-violet)" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                  {/* We draw lines from each app to each cache node to show the "distributed" nature */}
                  {[0, 1, 2].map(appIdx => 
                    [0, 1, 2].map(cacheIdx => (
                      <motion.line
                        key={`${appIdx}-${cacheIdx}`}
                        x1={`${16.6 + appIdx * 33.3}%`}
                        y1="0"
                        x2={`${16.6 + cacheIdx * 33.3}%`}
                        y2="100%"
                        stroke="url(#line-grad)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.15 }}
                        transition={{ delay: 0.8 + (appIdx + cacheIdx) * 0.05, duration: 1 }}
                      />
                    ))
                  )}
                </svg>
              </div>

              {/* Cache cluster label */}
              <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-6 text-center font-medium opacity-70">Distributed Cache Cluster (Redis)</div>

              {/* Cache nodes */}
              <div className="flex justify-around items-center">
                {["A", "B", "C"].map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-3 bg-violet/20 rounded-full blur-lg opacity-40 group-hover:opacity-100 transition-opacity animate-pulse" />
                    <div className="relative w-16 h-16 rounded-full bg-background/60 backdrop-blur-md border border-violet/40 flex flex-col items-center justify-center gap-0.5 shadow-2xl">
                      <Database size={18} className="text-violet" />
                      <span className="text-[10px] font-bold text-violet">Node {n}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Consistent hashing explanation */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="card-cinematic rounded-2xl p-6 border-l-4 border-l-cyan"
            >
              <div className="flex items-center gap-2 mb-4">
                <Network size={16} className="text-cyan" />
                <span className="text-cyan font-mono-custom text-xs uppercase tracking-widest font-bold">Consistent Hashing Logic</span>
              </div>
              <div className="bg-black/40 rounded-xl p-4 font-mono-custom text-sm leading-relaxed text-green-success border border-white/5">
                {typed}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-green-success ml-0.5 align-middle"
                />
              </div>
            </motion.div>

            <div className="space-y-3">
              {[
                { text: "Deterministic mapping: Key → Node", icon: <ArrowRight size={14} /> },
                { text: "Minimal reshuffling on cluster changes", icon: <ArrowRight size={14} /> },
                { text: "No single point of failure (No master)", icon: <ArrowRight size={14} /> },
                { text: "Scales horizontally to 1000s of nodes", icon: <ArrowRight size={14} /> },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + i * 0.15 }}
                  className="flex items-center gap-3 text-sm text-muted-foreground group hover:text-foreground transition-colors"
                >
                  <span className="text-cyan opacity-50 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                  {item.text}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
