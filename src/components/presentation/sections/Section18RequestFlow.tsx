import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ConsistentHashRing } from "@/engine/consistentHash";

interface Props { active: boolean; }

const PHYSICAL_NODES = ["node-1", "node-2", "node-3", "node-4"];

function polar(angle: number, radius: number, cx: number, cy: number) {
  const rad = angle * Math.PI * 2 - Math.PI / 2;
  return { x: cx + Math.cos(rad) * radius, y: cy + Math.sin(rad) * radius };
}

export default function Section18RequestFlow({ active }: Props) {
  const [key, setKey] = useState("user:123");
  const [replicationFactor, setReplicationFactor] = useState(3);

  const ring = useMemo(() => {
    const hashRing = new ConsistentHashRing(60);
    for (const nodeId of PHYSICAL_NODES) {
      hashRing.addNode(nodeId);
    }
    return hashRing;
  }, []);

  const entries = ring.getRingEntries();

  // replicate the same FNV-1a variant used by ConsistentHashRing to compute the key's hash/position
  const hashKey = (k: string) => {
    let h = 0x811c9dc5;
    for (let i = 0; i < k.length; i++) {
      h ^= k.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  };

  const keyHashNum = hashKey(key);
  const keyPos = entries.length > 0 ? keyHashNum / 0xffffffff : 0;

  // Map key to the first physical node clockwise from its hash position (uniform physical-node spacing)
  const physicalReplicas: string[] = [];
  const n = PHYSICAL_NODES.length;
  // find first physical node clockwise with position >= keyPos
  // For a clean, uniform UI we place physical nodes evenly spaced around the ring.
  const nodePositions: Record<string, number> = {};
  for (let i = 0; i < PHYSICAL_NODES.length; i++) {
    nodePositions[PHYSICAL_NODES[i]] = i / PHYSICAL_NODES.length;
  }

  let start = PHYSICAL_NODES.findIndex((nodeId) => (nodePositions[nodeId] ?? 0) >= keyPos);
  if (start === -1) start = 0;
  for (let i = 0; i < Math.min(replicationFactor, n); i++) {
    physicalReplicas.push(PHYSICAL_NODES[(start + i) % n]);
  }
  const replicas = physicalReplicas;
  const owner = replicas[0] ?? "-";

  return (
    <div className="slide-container px-8 md:px-14">
      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-4"
          style={{ fontSize: "clamp(1.2rem, 2.8vw, 2rem)", color: "var(--ef-white)" }}
        >
          Replication Placement on Consistent Hash Ring
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-4">
            <div className="font-section text-xs mb-3" style={{ color: "var(--ef-cyan)" }}>
              RING VIEW
            </div>

            <svg viewBox="0 0 320 320" className="w-full max-w-[420px] mx-auto">
              <circle cx="160" cy="160" r="118" fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="2" />
              {entries.filter((_, i) => i % 8 === 0).map((entry, i) => {
                const p = polar(entry.position, 118, 160, 160);
                return <circle key={i} cx={p.x} cy={p.y} r="2.2" fill="rgba(148,163,184,0.45)" />;
              })}

              {PHYSICAL_NODES.map((nodeId) => {
                const pos = nodePositions[nodeId] ?? 0;
                const p = polar(pos, 118, 160, 160);
                const chosen = replicas.includes(nodeId);
                return (
                  <g key={nodeId}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={chosen ? 11 : 8}
                      fill={chosen ? "#10b981" : "#60a5fa"}
                      opacity={chosen ? 1 : 0.75}
                    />
                    <text x={p.x} y={p.y + 22} textAnchor="middle" fill="var(--ef-lgray)" fontSize="10" fontFamily="Space Mono">
                      {nodeId}
                    </text>
                  </g>
                );
              })}

              {/* key marker on the ring (colored) */}
              <circle cx={polar(keyPos, 118, 160, 160).x} cy={polar(keyPos, 118, 160, 160).y} r="6" fill="#f59e0b" />

              {/* connectors from key to replicas (primary + next N-1 clockwise) */}
              {replicas.map((nodeId, i) => {
                const kp = polar(keyPos, 118, 160, 160);
                const np = polar(nodePositions[nodeId] ?? 0, 118, 160, 160);
                return (
                  <line
                    key={`conn-${nodeId}-${i}`}
                    x1={kp.x}
                    y1={kp.y}
                    x2={np.x}
                    y2={np.y}
                    stroke={i === 0 ? "#10b981" : "rgba(0,212,255,0.35)"}
                    strokeWidth={i === 0 ? 2 : 1}
                    strokeDasharray={i === 0 ? undefined : "3 4"}
                    opacity={0.9}
                  />
                );
              })}
            </svg>
            <div className="mt-3 flex items-center justify-center gap-4 text-xs font-section" style={{ color: "var(--ef-gray)" }}>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: "#10b981" }} /> primary owner</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: "#60a5fa" }} /> other nodes</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} /> key position</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass rounded-xl p-4 space-y-3">
              <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>INTERACTIVE INPUT</div>
              <input
                value={key}
                onChange={(e) => setKey(e.target.value || "user:123")}
                className="w-full rounded-lg px-3 py-2 font-section text-xs"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--ef-border)", color: "var(--ef-lgray)" }}
              />
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>Replication Factor</span>
                  <span className="font-section text-xs" style={{ color: "#10b981" }}>N={replicationFactor}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={4}
                  value={replicationFactor}
                  onChange={(e) => setReplicationFactor(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="glass rounded-xl p-4">
              <div className="font-section text-xs mb-2" style={{ color: "var(--ef-cyan)" }}>PLACEMENT RESULT</div>
              <div className="font-section text-xs" style={{ color: "var(--ef-lgray)" }}>
                Primary owner: <span style={{ color: "#10b981" }}>{owner}</span>
              </div>
              <div className="font-section text-xs mt-2" style={{ color: "var(--ef-lgray)" }}>
                Replica chain (clockwise): {replicas.join(" -> ")}
              </div>
              <div className="font-section text-xs mt-3" style={{ color: "var(--ef-gray)" }}>
                <div>Key hash: <span style={{ color: "var(--ef-cyan)", fontFamily: "Space Mono" }}>0x{keyHashNum.toString(16).padStart(8, "0")}</span></div>
                <div className="mt-1">Ring position: <span style={{ color: "var(--ef-cyan)" }}>{(keyPos * 100).toFixed(2)}%</span></div>
                <div className="mt-1">Maps to node: <span style={{ color: "#10b981" }}>{owner}</span></div>
              </div>
              <div className="font-section text-xs mt-3" style={{ color: "var(--ef-gray)" }}>
                {active ? "Live mode: adjust key/N to see deterministic replica selection." : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
