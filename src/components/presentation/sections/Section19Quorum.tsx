import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { QuorumSimulator } from "@/components/quorum/QuorumSimulator";
import { scenarios } from "@/utils/mockData";

interface Props { active: boolean; }

export function Section19Quorum({ active }: Props) {
  const replicas = useMemo(() => scenarios.basicCluster.nodes.map((node) => node.id), []);
  const [events, setEvents] = useState<string[]>([]);
  const [replicationFactor, setReplicationFactor] = useState(3);
  const versionsRef = useRef(new Map<string, number>([
    ["node-1", 5],
    ["node-2", 5],
    ["node-3", 4],
  ]));

  const quorum = {
    ...scenarios.basicCluster.quorumConfig,
    N: replicationFactor,
    R: Math.max(1, Math.ceil(replicationFactor / 2)),
    W: Math.max(1, Math.ceil(replicationFactor / 2)),
  };

  return (
    <div className="slide-container px-8 md:px-14">
      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-4"
          style={{ fontSize: "clamp(1.2rem, 2.8vw, 2rem)", color: "var(--ef-white)" }}
        >
          Quorum Simulation (R/W/N)
        </motion.h2>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-5">
          <QuorumSimulator
            replicas={replicas}
            quorum={quorum}
            nodeVersions={versionsRef.current}
            onReadRepair={(winner, stale) => setEvents((prev) => [`repair: ${winner} -> ${stale.join(", ")}`, ...prev].slice(0, 12))}
            onEvent={(line) => setEvents((prev) => [line, ...prev].slice(0, 12))}
          />

          <div className="space-y-4">
            <div className="glass rounded-xl p-4">
              <div className="font-section text-xs mb-3" style={{ color: "var(--ef-cyan)" }}>QUORUM CONFIG</div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>Replication Factor</span>
                <span className="font-section text-xs" style={{ color: "#10b981" }}>N={quorum.N}</span>
              </div>
              <input
                type="range"
                min={2}
                max={3}
                value={replicationFactor}
                onChange={(e) => setReplicationFactor(Number(e.target.value))}
                className="w-full"
              />
              <div className="font-section text-xs mt-2" style={{ color: "var(--ef-lgray)" }}>
                Read quorum R={quorum.R}, Write quorum W={quorum.W}
              </div>
              <div className="font-section text-xs mt-1" style={{ color: "var(--ef-gray)" }}>
                Rule: R + W &gt; N ensures read-after-write consistency.
              </div>
            </div>

            <div className="glass rounded-xl p-4">
              <div className="font-section text-xs mb-2" style={{ color: "var(--ef-cyan)" }}>EVENTS</div>
              <div className="space-y-1 min-h-24">
                {events.length === 0 && <div className="font-section text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Run a read/write simulation.</div>}
                {events.map((entry, i) => (
                  <div key={`${entry}-${i}`} className="font-section text-xs" style={{ color: i === 0 ? "#60a5fa" : "var(--ef-gray)" }}>
                    {entry}
                  </div>
                ))}
              </div>
              <div className="font-section text-xs mt-2" style={{ color: "var(--ef-gray)" }}>
                {active ? "Interactive: trigger write/read from the simulator panel." : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
