import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface Props { active: boolean; }

const RING_NODES = [
  { name: "Node A", angle: 0,   color: "var(--ef-cyan)",   range: "0–25%" },
  { name: "Node B", angle: 90,  color: "var(--ef-violet)", range: "26–50%" },
  { name: "Node C", angle: 180, color: "var(--ef-green)",  range: "51–75%" },
  { name: "Node D", angle: 270, color: "var(--ef-orange)", range: "76–99%" },
];

function hashKey(key: string): number {
  let h = 0;
  for (let c of key) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return (h / 0xffff) * 360;
}

function angleToXY(angle: number, r: number, cx: number, cy: number) {
  const rad = (angle - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function Section10HashRing({ active }: Props) {
  const [inputKey, setInputKey] = useState("user:123");
  const [hashedAngle, setHashedAngle] = useState<number | null>(null);
  const [ownerNode, setOwnerNode] = useState<string | null>(null);
  const displayKey = inputKey.trim() || "cache:key";

  const handleHash = () => {
    const angle = hashKey(inputKey);
    setHashedAngle(angle);
    // Walk clockwise to next node
    const next = RING_NODES.reduce((best, node) => {
      const diff = ((node.angle - angle) + 360) % 360;
      const bestDiff = ((best.angle - angle) + 360) % 360;
      return diff < bestDiff ? node : best;
    }, RING_NODES[0]);
    setOwnerNode(next.name);
  };

  const cx = 120, cy = 120, r = 85;

  const keyAnglePos = hashedAngle !== null ? angleToXY(hashedAngle, r, cx, cy) : null;

  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-6"
          style={{ fontSize: "clamp(1.3rem, 3vw, 2.2rem)", color: "var(--ef-white)" }}
        >
          How EdgeFabric routes every key — without a central router.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* SVG Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-6 flex flex-col items-center"
          >
            <div className="font-section text-xs mb-4" style={{ color: "var(--ef-cyan)" }}>CONSISTENT HASH RING</div>
            <svg width="240" height="240" viewBox="0 0 240 240">
              {/* Ring */}
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,212,255,0.15)" strokeWidth="2" />

              {/* Virtual node ticks */}
              {Array.from({ length: 40 }).map((_, i) => {
                const angle = (i / 40) * 360;
                const inner = angleToXY(angle, r - 4, cx, cy);
                const outer = angleToXY(angle, r + 4, cx, cy);
                return <line key={i} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
                  stroke="rgba(0,212,255,0.15)" strokeWidth="1" />;
              })}

              {/* Nodes */}
              {RING_NODES.map((node) => {
                const pos = angleToXY(node.angle, r, cx, cy);
                return (
                  <g key={node.name}>
                    <circle cx={pos.x} cy={pos.y} r="10" fill={node.color} opacity="0.9"
                      style={{ filter: `drop-shadow(0 0 6px ${node.color})` }} />
                    <text x={angleToXY(node.angle, r + 20, cx, cy).x} y={angleToXY(node.angle, r + 20, cx, cy).y}
                      textAnchor="middle" dominantBaseline="middle" fill={node.color} fontSize="8" fontFamily="Space Mono">
                      {node.name}
                    </text>
                  </g>
                );
              })}

              {/* Key point */}
              {keyAnglePos && (
                <motion.circle
                  key={inputKey}
                  cx={keyAnglePos.x} cy={keyAnglePos.y} r="5"
                  fill="#F59E0B"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ filter: "drop-shadow(0 0 8px #F59E0B)" }}
                />
              )}

              {/* Center label */}
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
                fill="rgba(0,212,255,0.4)" fontSize="8" fontFamily="Space Mono">HASH RING</text>
            </svg>

            {/* Input */}
            <div className="flex gap-2 mt-4 w-full">
              <input
                value={inputKey}
                onChange={e => { setInputKey(e.target.value); setHashedAngle(null); setOwnerNode(null); }}
                className="flex-1 px-3 py-1.5 rounded text-xs font-section"
                style={{ background: "var(--ef-surface)", border: "1px solid var(--ef-border)", color: "var(--ef-lgray)", outline: "none" }}
                placeholder='Type a cache key...'
              />
              <button
                onClick={handleHash}
                className="px-3 py-1.5 rounded text-xs font-section font-bold transition-all"
                style={{ background: "rgba(0,212,255,0.15)", border: "1px solid var(--ef-cyan)", color: "var(--ef-cyan)" }}
              >
                Hash →
              </button>
            </div>
            {ownerNode && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="mt-2 text-xs font-section"
                style={{ color: "var(--ef-green)" }}
              >
                ✓ "{inputKey}" → {ownerNode}
              </motion.div>
            )}
          </motion.div>

          {/* Walkthrough */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            {[
              { n: "1", text: `Hash the key "${displayKey}" using hashKey() → position on ring`, color: "var(--ef-cyan)" },
              { n: "2", text: "Walk clockwise → first node you hit owns this key", color: "var(--ef-violet)" },
              { n: "3", text: "That node returns the value in ~1ms", color: "var(--ef-green)" },
              { n: "4", text: "If that node fails, walk further → next node takes over automatically", color: "var(--ef-orange)" },
              { n: "5", text: "Only that node's keys migrate. All other keys unaffected.", color: "var(--ef-cyan)" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.15 }}
                className="glass rounded-xl p-4 flex gap-3"
              >
                <span className="font-section text-sm font-bold flex-shrink-0 w-5" style={{ color: s.color }}>{s.n}.</span>
                <span className="font-body text-xs leading-relaxed" style={{ color: "var(--ef-lgray)" }}>{s.text}</span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="glass-cyan rounded-xl p-3 mt-2"
            >
              <span className="font-section text-xs font-bold" style={{ color: "var(--ef-cyan)" }}>
                Key movement during rebalance: ≤ 10%{" "}
              </span>
              <span className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>
                (EdgeFabric guarantee)
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
