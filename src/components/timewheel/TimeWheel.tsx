import { useMemo } from "react";
import { motion } from "framer-motion";

interface Bucket {
  index: number;
  keys: string[];
  isCurrent: boolean;
}

interface TimeWheelProps {
  buckets: Bucket[];
  currentBucket: number;
  tickCount: number;
  expiringKeys: string[];
}

const RADIUS_OUTER = 122;
const RADIUS_INNER = 74;

function describeArc(segment: number, total: number): string {
  const start = ((segment / total) * Math.PI * 2) - Math.PI / 2;
  const end = (((segment + 1) / total) * Math.PI * 2) - Math.PI / 2;

  const x0o = Math.cos(start) * RADIUS_OUTER;
  const y0o = Math.sin(start) * RADIUS_OUTER;
  const x1o = Math.cos(end) * RADIUS_OUTER;
  const y1o = Math.sin(end) * RADIUS_OUTER;

  const x0i = Math.cos(start) * RADIUS_INNER;
  const y0i = Math.sin(start) * RADIUS_INNER;
  const x1i = Math.cos(end) * RADIUS_INNER;
  const y1i = Math.sin(end) * RADIUS_INNER;

  return [
    `M ${x0o} ${y0o}`,
    `A ${RADIUS_OUTER} ${RADIUS_OUTER} 0 0 1 ${x1o} ${y1o}`,
    `L ${x1i} ${y1i}`,
    `A ${RADIUS_INNER} ${RADIUS_INNER} 0 0 0 ${x0i} ${y0i}`,
    "Z",
  ].join(" ");
}

export function TimeWheel({ buckets, currentBucket, tickCount, expiringKeys }: TimeWheelProps) {
  const ordered = useMemo(() => buckets.slice().sort((a, b) => a.index - b.index), [buckets]);

  return (
    <div className="glass rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>
          TIME WHEEL (60 BUCKETS)
        </div>
        <div className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>
          tick={tickCount}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <svg viewBox="-150 -150 300 300" className="w-[280px] h-[280px]">
          <motion.g
            animate={{ rotate: currentBucket * 6 }}
            transition={{ duration: 1, ease: "linear" }}
          >
            {ordered.map((bucket) => {
              const pressure = Math.min(bucket.keys.length / 4, 1);
              const fill = bucket.isCurrent
                ? "#3b82f6"
                : pressure > 0
                  ? `rgba(245,158,11,${0.2 + pressure * 0.5})`
                  : "rgba(55,65,81,0.55)";

              return (
                <motion.path
                  key={bucket.index}
                  d={describeArc(bucket.index, 60)}
                  fill={fill}
                  stroke="rgba(148,163,184,0.1)"
                  strokeWidth={0.9}
                >
                  <title>{`bucket ${bucket.index}: ${bucket.keys.join(", ") || "empty"}`}</title>
                </motion.path>
              );
            })}
          </motion.g>

          <motion.line
            x1={0}
            y1={0}
            x2={0}
            y2={-132}
            stroke="#ef4444"
            strokeWidth={3}
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />

          <circle cx={0} cy={0} r={38} fill="rgba(3,7,18,0.9)" stroke="rgba(0,212,255,0.2)" />
          <text x={0} y={-3} textAnchor="middle" fill="#94a3b8" fontSize={11} fontFamily="Space Mono">
            Bucket
          </text>
          <text x={0} y={14} textAnchor="middle" fill="#00d4ff" fontSize={16} fontWeight={700} fontFamily="Space Mono">
            {currentBucket}
          </text>
        </svg>
      </div>

      <div className="font-section text-xs mt-2" style={{ color: "var(--ef-gray)" }}>
        Expiring now: {expiringKeys.length > 0 ? expiringKeys.join(", ") : "none"}
      </div>
    </div>
  );
}
