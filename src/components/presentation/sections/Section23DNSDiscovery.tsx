import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DNSDiscovery } from "@/components/discovery/DNSDiscovery";
import { ConsistentHashRing } from "@/engine/consistentHash";

interface Props { active: boolean; }

const POOL = ["10.0.0.1", "10.0.0.2", "10.0.0.3", "10.0.0.4", "10.0.0.5"];

export function Section23DNSDiscovery({ active }: Props) {
  const [count, setCount] = useState(3);
  const ips = useMemo(() => POOL.slice(0, count), [count]);
  const discoveredNodes = useMemo(() => ips.map((_, i) => `node-${i + 1}`), [ips]);

  const ringCount = useMemo(() => {
    const ring = new ConsistentHashRing(100);
    for (const nodeId of discoveredNodes) {
      ring.addNode(nodeId);
    }
    return ring.getRingEntries().length;
  }, [discoveredNodes]);

  return (
    <div className="slide-container px-8 md:px-14">
      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-4"
          style={{ fontSize: "clamp(1.2rem, 2.8vw, 2rem)", color: "var(--ef-white)" }}
        >
          DNS Node Discovery and Ring Bootstrap
        </motion.h2>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
          <DNSDiscovery ips={ips} discoveredNodes={discoveredNodes} virtualNodeCount={ringCount} />

          <div className="glass rounded-xl p-4 space-y-3">
            <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>DISCOVERY SIZE</div>
            <div className="flex gap-2">
              {[2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setCount(value)}
                  className="flex-1 rounded-md py-1.5 font-section text-xs"
                  style={{
                    border: count === value ? "1px solid rgba(0,212,255,0.45)" : "1px solid var(--ef-border)",
                    background: count === value ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.03)",
                    color: count === value ? "var(--ef-cyan)" : "var(--ef-gray)",
                  }}
                >
                  {value} nodes
                </button>
              ))}
            </div>
            <div className="font-section text-xs" style={{ color: "var(--ef-lgray)" }}>
              DNS answers: {ips.join(", ")}
            </div>
            <div className="font-section text-xs" style={{ color: "#10b981" }}>
              Virtual ring slots: {ringCount}
            </div>
            <div className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>
              Expected math: nodeCount x 100 virtual nodes.
            </div>
            <div className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>
              {active ? "Interactive: change discovered node count and ring repopulates." : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
