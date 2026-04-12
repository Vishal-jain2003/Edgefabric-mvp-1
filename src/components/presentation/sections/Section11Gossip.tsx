import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Props { active: boolean; }

type NodeStatus = "healthy" | "suspect" | "dead";

interface GossipNode {
  id: number;
  x: number;
  y: number;
  status: NodeStatus;
}

const INIT_NODES: GossipNode[] = [
  { id: 0, x: 120, y: 40,  status: "healthy" },
  { id: 1, x: 200, y: 80,  status: "healthy" },
  { id: 2, x: 220, y: 160, status: "healthy" },
  { id: 3, x: 160, y: 220, status: "healthy" },
  { id: 4, x: 80,  y: 220, status: "healthy" },
  { id: 5, x: 30,  y: 160, status: "healthy" },
  { id: 6, x: 40,  y: 80,  status: "healthy" },
  { id: 7, x: 120, y: 130, status: "healthy" },
];

const statusColor: Record<NodeStatus, string> = {
  healthy: "#10B981",
  suspect: "#F59E0B",
  dead:    "#EF4444",
};

export function Section11Gossip({ active }: Props) {
  const [nodes, setNodes] = useState<GossipNode[]>(INIT_NODES.map(n => ({ ...n })));
  const [act, setAct] = useState<1 | 2 | 3>(1);
  const [gossipLines, setGossipLines] = useState<[number, number][]>([]);

  // Gossip tick
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      const a = Math.floor(Math.random() * INIT_NODES.length);
      let b = Math.floor(Math.random() * INIT_NODES.length);
      while (b === a) b = Math.floor(Math.random() * INIT_NODES.length);
      setGossipLines(prev => [[a, b], ...prev.slice(0, 4)]);
    }, 600);
    return () => clearInterval(id);
  }, [active]);

  const advanceAct = () => {
    if (act === 1) {
      setAct(2);
      setNodes(prev => prev.map(n => n.id === 3 ? { ...n, status: "suspect" } : n));
    } else if (act === 2) {
      setAct(3);
      setNodes(prev => prev.map(n => n.id === 3 ? { ...n, status: "dead" } : n));
    } else {
      setAct(1);
      setNodes(INIT_NODES.map(n => ({ ...n })));
    }
  };

  const actText = {
    1: { title: "ACT 1: Normal Operation", desc: 'Every 500ms, each node picks 2 random neighbors and shares what it knows. System is fully healthy.' },
    2: { title: "ACT 2: Node 3 → SUSPECT", desc: "Node 2 tried to reach Node 3 — no response in 2s. Node 3 marked SUSPECT. Gossip spreads the suspicion." },
    3: { title: "ACT 3: Node 3 → DEAD", desc: "After 5 failed indirect probes, Node 3 is marked DEAD. Load redistributes automatically. Zero human intervention." },
  };

  const W = 250, H = 260;

  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-6"
          style={{ fontSize: "clamp(1.2rem, 2.8vw, 2rem)", color: "var(--ef-white)" }}
        >
          No master. No coordinator. Just nodes talking to each other.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* SVG gossip viz */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-6 flex flex-col items-center"
          >
            <div className="font-section text-xs mb-3" style={{ color: "var(--ef-cyan)" }}>SWIM GOSSIP NETWORK</div>
            <svg width={W} height={H}>
              {/* Gossip message lines */}
              {gossipLines.map(([a, b], i) => {
                const na = nodes[a], nb = nodes[b];
                if (!na || !nb) return null;
                return (
                  <motion.line
                    key={`${i}-${a}-${b}`}
                    x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke="rgba(0,212,255,0.5)"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => (
                <g key={node.id}>
                  <circle
                    cx={node.x} cy={node.y} r={14}
                    fill={`${statusColor[node.status]}18`}
                    stroke={statusColor[node.status]}
                    strokeWidth={node.status === "dead" ? 1 : 2}
                    opacity={node.status === "dead" ? 0.3 : 1}
                    style={{ filter: `drop-shadow(0 0 6px ${statusColor[node.status]})` }}
                  />
                  <text x={node.x} y={node.y} textAnchor="middle" dominantBaseline="middle"
                    fill={statusColor[node.status]} fontSize="9" fontFamily="Space Mono"
                    opacity={node.status === "dead" ? 0.3 : 1}>
                    N{node.id}
                  </text>
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="flex gap-4 mt-2 text-xs font-section">
              {(["healthy", "suspect", "dead"] as NodeStatus[]).map(s => (
                <span key={s} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: statusColor[s] }} />
                  <span style={{ color: "var(--ef-gray)" }}>{s}</span>
                </span>
              ))}
            </div>

            <button
              onClick={advanceAct}
              className="mt-4 px-4 py-1.5 rounded text-xs font-section font-bold transition-all"
              style={{ background: "rgba(0,212,255,0.12)", border: "1px solid var(--ef-cyan)", color: "var(--ef-cyan)" }}
            >
              {act === 3 ? "↺ Reset" : "Next Act →"}
            </button>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={act}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`rounded-xl p-5 ${act === 1 ? "glass-green" : act === 2 ? "glass-amber" : "glass-red"}`}
              >
                <div className="font-section text-xs font-bold mb-2"
                  style={{ color: act === 1 ? "var(--ef-green)" : act === 2 ? "var(--ef-amber)" : "var(--ef-red)" }}>
                  {actText[act].title}
                </div>
                <p className="font-body text-sm leading-relaxed" style={{ color: "var(--ef-lgray)" }}>
                  {actText[act].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="glass rounded-xl p-4 space-y-2">
              {[
                { label: "Detection time (8 nodes):", value: "~1 second", color: "var(--ef-cyan)" },
                { label: "Convergence formula:", value: "2 × log(N) rounds", color: "var(--ef-violet)" },
                { label: "At 100 nodes:", value: "~7 seconds", color: "var(--ef-green)" },
                { label: "Human pages fired:", value: "0", color: "var(--ef-green)" },
              ].map((s, i) => (
                <div key={i} className="flex justify-between font-section text-xs">
                  <span style={{ color: "var(--ef-gray)" }}>{s.label}</span>
                  <span style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
