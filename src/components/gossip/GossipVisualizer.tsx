import { AnimatePresence, motion } from "framer-motion";

interface GossipVisualizerProps {
  round: number;
  sender: string | null;
  peers: string[];
  dirtyEntries: string[];
  mtuSplit: boolean;
}

export function GossipVisualizer({
  round,
  sender,
  peers,
  dirtyEntries,
  mtuSplit,
}: GossipVisualizerProps) {
  return (
    <div className="glass rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>
          GOSSIP ROUND VISUALIZER
        </div>
        <div className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>
          round {round}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 items-center">
        <div className="rounded-lg p-2 text-center" style={{ border: "1px solid rgba(0,212,255,0.3)", background: "rgba(0,212,255,0.08)" }}>
          <motion.div
            animate={{ scale: sender ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5 }}
            className="font-section text-[11px]"
            style={{ color: "#00d4ff" }}
          >
            {sender ?? "sender"}
          </motion.div>
        </div>

        {Array.from({ length: 3 }).map((_, idx) => {
          const peer = peers[idx];
          return (
            <div
              key={`peer-${idx}`}
              className="rounded-lg p-2 text-center"
              style={{
                border: `1px solid ${peer ? "rgba(16,185,129,0.32)" : "var(--ef-border)"}`,
                background: peer ? "rgba(16,185,129,0.09)" : "rgba(255,255,255,0.03)",
              }}
            >
              <div className="font-section text-[11px]" style={{ color: peer ? "#10b981" : "var(--ef-gray)" }}>
                {peer ?? "peer"}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 min-h-10">
        <AnimatePresence>
          {peers.map((peer) => (
            <motion.div
              key={peer}
              initial={{ x: -14, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-section text-[11px]"
              style={{ color: "#60a5fa" }}
            >
              packet {sender} {"->"} {peer}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="rounded-lg p-2 mt-2" style={{ border: "1px solid var(--ef-border)", background: "rgba(255,255,255,0.03)" }}>
        <div className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>
          Dirty entries: {dirtyEntries.length ? dirtyEntries.join(", ") : "none"}
        </div>
        <div className="font-section text-xs" style={{ color: mtuSplit ? "#f59e0b" : "rgba(255,255,255,0.35)" }}>
          MTU split: {mtuSplit ? "yes (batched)" : "no"}
        </div>
      </div>
    </div>
  );
}
