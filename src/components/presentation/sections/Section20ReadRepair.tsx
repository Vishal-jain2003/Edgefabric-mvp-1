import { useState } from "react";
import { motion } from "framer-motion";
import { ReadRepairVisualizer } from "@/components/repair/ReadRepairVisualizer";

interface Props { active: boolean; }

export function Section20ReadRepair({ active }: Props) {
  const [versions, setVersions] = useState<Record<string, number>>({
    "node-1": 5,
    "node-2": 3,
    "node-3": 5,
  });
  const [winner, setWinner] = useState<string | null>("node-1");
  const [stale, setStale] = useState<string[]>(["node-2"]);
  const [repairing, setRepairing] = useState(false);

  const detect = () => {
    const max = Math.max(...Object.values(versions));
    const winnerNode = Object.entries(versions).find(([, v]) => v === max)?.[0] ?? null;
    const staleNodes = Object.entries(versions).filter(([, v]) => v < max).map(([k]) => k);
    setWinner(winnerNode);
    setStale(staleNodes);
  };

  const repair = () => {
    if (!winner) return;
    setRepairing(true);
    const version = versions[winner];
    setTimeout(() => {
      setVersions((prev) => {
        const next = { ...prev };
        stale.forEach((nodeId) => { next[nodeId] = version; });
        return next;
      });
      setStale([]);
      setRepairing(false);
    }, 850);
  };

  const reset = () => {
    setVersions({ "node-1": 5, "node-2": 3, "node-3": 5 });
    setWinner("node-1");
    setStale(["node-2"]);
    setRepairing(false);
  };

  return (
    <div className="slide-container px-8 md:px-14">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-4"
          style={{ fontSize: "clamp(1.2rem, 2.8vw, 2rem)", color: "var(--ef-white)" }}
        >
          Read Repair: Detect Divergence, Heal Stale Replica
        </motion.h2>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-5">
          <ReadRepairVisualizer
            versions={versions}
            winnerNode={winner}
            staleNodes={stale}
            repairing={repairing}
          />

          <div className="glass rounded-xl p-4 space-y-2">
            <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>FLOW CONTROL</div>
            <button onClick={detect} className="w-full rounded-lg py-2 font-section text-xs" style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.4)", color: "#60a5fa" }}>
              1) Detect Winner/Stale
            </button>
            <button onClick={repair} className="w-full rounded-lg py-2 font-section text-xs" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.4)", color: "#10b981" }}>
              2) Run Read Repair
            </button>
            <button onClick={reset} className="w-full rounded-lg py-2 font-section text-xs" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.35)", color: "#ef4444" }}>
              Reset Scenario
            </button>
            <div className="font-section text-xs mt-3" style={{ color: "var(--ef-gray)" }}>
              Accuracy: winner uses highest version; only stale replicas are repaired.
            </div>
            <div className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>
              {active ? "Interactive: click in order to replay mismatch -> repair." : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
