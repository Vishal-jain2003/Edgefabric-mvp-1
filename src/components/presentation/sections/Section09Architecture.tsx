import { motion } from "framer-motion";
 
interface Props {
  active: boolean;
}
 
const controlPlane = [
  "Cache Controller API",
  "Cache Gateway (Tenant Isolation)",
  "Consistent Hash Router",
  "Quorum Engine (N=3, W=2, R=2)",
  "Read Repair Service",
];
 
const nodeModules = [
  "In-Memory Store",
  "LRU Eviction",
  "TimeWheel TTL",
  "Gossip Protocol",
  "SWIM Failure Detector",
];
 
const cacheNodes = [
  { name: "Cache Node 1", port: "8081", accent: "#60a5fa", border: "rgba(96,165,250,0.5)" },
  { name: "Cache Node 2", port: "8082", accent: "#34d399", border: "rgba(52,211,153,0.5)" },
  { name: "Cache Node 3", port: "8083", accent: "#f59e0b", border: "rgba(245,158,11,0.5)" },
];
 
const FLOW = {
  clientToLb: 2.6,
  lbToRing: 3.2,
  lbToCluster: 3.4,
  lbPolling: 4.8,
  cloudMapToLb: 5.2,
  cloudMapDelay: 2.2,
  ringRotate: 24,
  nodeBeat: 4.8,
};
 
function Chip({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center rounded px-2 py-1 font-section text-[9px] leading-none"
      style={{
        border: "1px solid rgba(255,255,255,0.16)",
        color: "var(--ef-lgray)",
        background: "rgba(0,0,0,0.18)",
      }}
    >
      {text}
    </span>
  );
}
 
function SequenceItem({ label, index, active }: { label: string; index: number; active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
      transition={{ delay: 0.16 + index * 0.08 }}
      className="flex items-center gap-2 rounded px-2 py-1.5 font-section text-[10px]"
      style={{
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(0,0,0,0.18)",
        color: "var(--ef-white)",
      }}
    >
      <span
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[9px]"
        style={{ border: "1px solid rgba(245,158,11,0.55)", color: "var(--ef-amber)" }}
      >
        {index + 1}
      </span>
      <span>{label}</span>
    </motion.div>
  );
}
 
function HashRing({ active }: { active: boolean }) {
  const nodes = [
    { key: "N1", label: "Node 1", color: "#60a5fa" },
    { key: "N2", label: "Node 2", color: "#34d399" },
    { key: "N3", label: "Node 3", color: "#f59e0b" },
  ];
 
  const ringPoints = [
    { x: 90, y: 16 },
    { x: 132, y: 30 },
    { x: 164, y: 64 },
    { x: 176, y: 110 },
    { x: 164, y: 156 },
    { x: 132, y: 190 },
    { x: 90, y: 204 },
    { x: 48, y: 190 },
    { x: 16, y: 156 },
    { x: 4, y: 110 },
    { x: 16, y: 64 },
    { x: 48, y: 30 },
  ];
 
  const nodeAngles = [260, 28, 150];
  const nodePositions = nodeAngles.map((angle, index) => {
    const radians = (angle * Math.PI) / 180;
    const radius = 68;
    return {
      ...nodes[index],
      x: 90 + Math.cos(radians) * radius,
      y: 110 + Math.sin(radians) * radius,
    };
  });
 
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.22 }}
      className="flex h-full flex-col rounded-2xl p-4"
      style={{
        border: "1px solid rgba(245,158,11,0.45)",
        background: "rgba(245,158,11,0.06)",
      }}
    >
      <div className="font-section text-[11px] tracking-[0.12em]" style={{ color: "var(--ef-amber)" }}>
        Consistent Hash Ring
      </div>
      <div className="mt-1 font-section text-[9px]" style={{ color: "var(--ef-gray)" }}>
        Three physical nodes share a minimal ring with aligned ownership labels.
      </div>
 
      <motion.div
        className="relative mx-auto mt-4 h-[230px] w-[230px]"
        animate={active ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: FLOW.ringRotate, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% 50%" }}
      >
        <svg viewBox="0 0 180 220" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="90" cy="110" r="80" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <circle cx="90" cy="110" r="66" fill="none" stroke="rgba(245,158,11,0.72)" strokeWidth="2.25" />
          <circle cx="90" cy="110" r="44" fill="none" stroke="rgba(245,158,11,0.26)" strokeDasharray="4 6" strokeWidth="1.2" />
 
          {ringPoints.map((point, index) => (
            <circle
              key={`${point.x}-${point.y}-${index}`}
              cx={point.x}
              cy={point.y}
              r={index % 3 === 0 ? 2.9 : 2.2}
              fill={index % 3 === 0 ? "#f59e0b" : "rgba(255,255,255,0.68)"}
              opacity={index % 3 === 0 ? 0.95 : 0.55}
            />
          ))}
 
          {nodePositions.map((node, index) => (
            <g key={node.key}>
              <circle cx={node.x} cy={node.y} r="6" fill={node.color} opacity="0.92" />
              <circle cx={node.x} cy={node.y} r="10" fill="none" stroke={node.color} strokeOpacity="0.35" strokeWidth="1" />
              <text x={node.x} y={node.y - 12} fill={node.color} fontSize="8" fontFamily="monospace" textAnchor="middle">
                {node.key}
              </text>
              {active && (
                <circle cx={node.x} cy={node.y} r="6" fill="none" stroke={node.color} strokeWidth="1.5" strokeOpacity="0.85">
                  <animate attributeName="r" values="6;11;6;6" keyTimes="0;0.12;0.24;1" dur="9s" repeatCount="indefinite" begin={`${index * 3}s`} />
                  <animate attributeName="stroke-opacity" values="0.15;0.9;0.15;0.15" keyTimes="0;0.12;0.24;1" dur="9s" repeatCount="indefinite" begin={`${index * 3}s`} />
                </circle>
              )}
            </g>
          ))}
 
          <circle cx="90" cy="110" r="3" fill="rgba(255,255,255,0.8)" />
        </svg>
      </motion.div>
 
      <div className="mt-1 grid grid-cols-3 gap-2">
        {nodes.map((node) => (
          <div
            key={node.key}
            className="rounded-lg px-2 py-1.5 text-center font-section text-[9px]"
            style={{
              border: `1px solid ${node.color}66`,
              background: "rgba(0,0,0,0.14)",
              color: node.color,
            }}
          >
            {node.label}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
 
function CacheNodeCard({ name, port, accent, border, index, active }: { name: string; port: string; accent: string; border: string; index: number; active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ delay: 0.4 + index * 0.08 }}
      className="relative flex h-[158px] flex-col rounded-2xl p-3"
      style={{
        border: `1px solid ${border}`,
        background: "rgba(12,23,44,0.84)",
        boxShadow: "0 0 18px rgba(59,130,246,0.12)",
      }}
    >
      {active && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ border: `1px solid ${border}` }}
          animate={{ opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: FLOW.nodeBeat, repeat: Infinity, ease: "easeInOut", delay: index * 0.45 }}
        />
      )}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-section text-[10px] tracking-[0.08em]" style={{ color: "var(--ef-white)" }}>
            {name}
          </div>
          <div className="mt-1 font-section text-[9px]" style={{ color: accent }}>
            {port}
          </div>
        </div>
        <span
          className="rounded-full px-2 py-1 font-section text-[9px]"
          style={{
            border: `1px solid ${border}`,
            color: accent,
            background: "rgba(0,0,0,0.16)",
          }}
        >
          Node {index + 1}
        </span>
      </div>
 
      <div className="mt-3 flex flex-1 flex-wrap content-start gap-1.5">
        {nodeModules.map((module) => {
          const shouldShimmer = module === "In-Memory Store" || module === "Gossip Protocol";
          return (
            <motion.div
              key={`${name}-${module}`}
              animate={
                active && shouldShimmer
                  ? { boxShadow: ["0 0 0 rgba(255,255,255,0)", `0 0 8px ${accent}44`, "0 0 0 rgba(255,255,255,0)"] }
                  : { boxShadow: "0 0 0 rgba(255,255,255,0)" }
              }
              transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 + index * 0.35 }}
              className="rounded"
            >
              <Chip text={module} />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
 
function ClientCard({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl p-4"
      style={{
        border: "1px solid rgba(255,255,255,0.3)",
        background: "rgba(0,0,0,0.18)",
      }}
    >
      <div className="font-section text-[10px]" style={{ color: "var(--ef-lgray)" }}>
        Client Applications
      </div>
      <div className="mt-2 font-section text-[12px]" style={{ color: "var(--ef-white)" }}>
        HTTP GET / PUT
      </div>
    </motion.div>
  );
}
 
function LoadBalancerCard({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -18 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
      transition={{ delay: 0.12 }}
      className="rounded-2xl p-4"
      style={{
        border: "1px solid rgba(245,158,11,0.58)",
        background: "rgba(245,158,11,0.08)",
      }}
    >
      <div className="font-section text-[11px] tracking-[0.12em]" style={{ color: "var(--ef-amber)" }}>
        Load Balancer Layer :8080
      </div>
      <div className="mt-3 space-y-1.5">
        {controlPlane.map((layer, index) => (
          <SequenceItem key={layer} label={layer} index={index} active={active} />
        ))}
      </div>
    </motion.div>
  );
}
 
function CloudMapCard({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={
        active
          ? {
              opacity: 1,
              y: [0, -2, 0],
              boxShadow: [
                "0 0 0 rgba(167,139,250,0)",
                "0 0 18px rgba(167,139,250,0.18)",
                "0 0 0 rgba(167,139,250,0)",
              ],
            }
          : { opacity: 0, y: 14 }
      }
      transition={{ delay: 0.3 }}
      className="rounded-2xl p-4 text-center"
      style={{
        border: "1px solid rgba(167,139,250,0.45)",
        background: "rgba(76,29,149,0.14)",
      }}
    >
      <div className="flex items-center justify-center gap-2">
        <svg width="54" height="30" viewBox="0 0 104 56" aria-hidden="true">
          <text x="6" y="24" fill="#ffffff" fontSize="20" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="700">
            AWS
          </text>
          <path d="M12 34 C31 48, 65 48, 88 32" fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.92" />
          {active && (
            <path
              d="M12 34 C31 48, 65 48, 88 32"
              fill="none"
              stroke="#f8b750"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="6 24"
              opacity="0.75"
            >
              <animate attributeName="stroke-dashoffset" values="0;-30" dur="4.6s" repeatCount="indefinite" />
            </path>
          )}
          <circle cx="14" cy="36" r="2" fill="#f59e0b" />
          <circle cx="88" cy="32" r="2" fill="#f59e0b" />
          {active && (
            <>
              <motion.circle
                cx="14"
                cy="36"
                r="1.6"
                fill="#fde68a"
                opacity="0"
                animate={{
                  cx: [14, 31, 52, 73, 88],
                  cy: [36, 43, 44, 39, 32],
                  opacity: [0, 0.8, 0.8, 0.8, 0],
                }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "linear", delay: 0.5 }}
              />
              <motion.circle
                cx="14"
                cy="36"
                r="1.4"
                fill="#f8fafc"
                opacity="0"
                animate={{
                  cx: [14, 31, 52, 73, 88],
                  cy: [36, 43, 44, 39, 32],
                  opacity: [0, 0.62, 0.62, 0.62, 0],
                }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "linear", delay: 2.4 }}
              />
            </>
          )}
        </svg>
      </div>
      <div className="mt-2 font-section text-[10px] tracking-[0.08em]" style={{ color: "#ddd6fe" }}>
        AWS Cloud Map
      </div>
      <div className="mt-1 font-section text-[9px]" style={{ color: "var(--ef-gray)" }}>
        Service discovery source for the load balancer.
      </div>
    </motion.div>
  );
}
 
export function Section09Architecture({ active }: Props) {
  return (
    <div className="slide-container px-3 py-6 md:px-6">
      <div className="mx-auto relative z-10 w-full max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.45 }}
          className="mb-5"
        >
          <div className="font-section mb-2 ml-4 text-xs tracking-[0.2em]" style={{ color: "var(--ef-cyan)" }}>
            EDGEFABRIC - PRODUCT ARCHITECTURE
          </div>
          <h2
            className="font-display font-semibold leading-tight ml-12"
            style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)", color: "var(--ef-white)" }}
          >
            EDGEFABRIC ARCHITECTURE
          </h2>
        </motion.div>
 
        <div className="hidden lg:block relative overflow-hidden rounded-[28px]" style={{ minHeight: 860 }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 55% at 74% 14%, rgba(0,230,230,0.11), transparent 72%), radial-gradient(42% 44% at 16% 84%, rgba(245,158,11,0.09), transparent 70%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent 35%)",
            }}
          />
 
          <div className="relative mx-auto h-[820px] w-full max-w-[1400px] px-2 pt-4">
            <div className="absolute left-[22px] top-[274px] w-[196px]">
              <ClientCard active={active} />
            </div>

            <div className="absolute left-[254px] top-[150px] w-[320px]">
              <LoadBalancerCard active={active} />
            </div>

            <div className="absolute left-[650px] top-[154px] w-[282px]">
              <HashRing active={active} />
            </div>

            <div
              className="absolute left-[1000px] top-[92px] w-[376px] rounded-2xl p-4"
              style={{
                border: "1px solid rgba(245,158,11,0.42)",
                background: "rgba(245,158,11,0.06)",
              }}
            >
              <div className="font-section text-[12px] tracking-[0.14em]" style={{ color: "var(--ef-amber)" }}>
                Distributed Cache Cluster
              </div>
              <div className="mt-3 space-y-3">
                {cacheNodes.map((node, index) => (
                  <CacheNodeCard
                    key={node.name}
                    name={node.name}
                    port={`:${node.port}`}
                    accent={node.accent}
                    border={node.border}
                    index={index}
                    active={active}
                  />
                ))}
              </div>
            </div>

            <div className="absolute left-[1038px] top-[710px] w-[280px]">
              <CloudMapCard active={active} />
            </div>
 
            <div className="pointer-events-none absolute inset-0">
              <svg viewBox="0 0 1400 700" className="h-full w-full" aria-hidden="true">
                <defs>
                  <marker id="section09Arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="rgba(255,255,255,0.72)" />
                  </marker>
                  <marker id="section09CyanArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,0 L8,4 L0,8 Z" fill="rgba(0,230,230,0.72)" />
                  </marker>
                  <filter id="glowWhite" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glowCyan" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glowPurple" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Client to Load Balancer */}
                <line
                  x1="200"
                  y1="280"
                  x2="220"
                  y2="260"
                  stroke="rgba(255,255,255,0.58)"
                  strokeWidth="1.4"
                  markerEnd="url(#section09Arrow)"
                >
                  <animate attributeName="stroke-opacity" values="0.34;0.7;0.34" dur={`${FLOW.clientToLb}s`} repeatCount="indefinite" />
                </line>

                {/* Load Balancer to Hash Ring */}
                <polyline
                  points="520,240 540,240"
                  fill="none"
                  stroke="rgba(255,255,255,0.56)"
                  strokeWidth="1.4"
                  markerEnd="url(#section09Arrow)"
                >
                  <animate attributeName="stroke-opacity" values="0.28;0.6;0.28" dur={`${FLOW.lbToRing}s`} repeatCount="indefinite" begin="0.5s" />
                </polyline>

                {/* Hash Ring to Cache Cluster */}
                <polyline
                  points="800,240 820,240"
                  fill="none"
                  stroke="rgba(16,185,129,0.54)"
                  strokeWidth="1.35"
                  markerEnd="url(#section09CyanArrow)"
                >
                  <animate attributeName="stroke-opacity" values="0.24;0.62;0.24" dur={`${FLOW.lbToCluster}s`} repeatCount="indefinite" begin="1.1s" />
                </polyline>

                {active && (
                  <>
                    {/* Client to LB animated dot */}
                    <motion.circle
                      cx="200"
                      cy="280"
                      r="3.5"
                      fill="#ffffff"
                      filter="url(#glowWhite)"
                      opacity="0"
                      animate={{
                        cx: ["200", "220"],
                        cy: ["280", "260"],
                        opacity: [0, 0.85, 0.85, 0],
                        r: [2.8, 3.8, 3.8, 2.8],
                      }}
                      transition={{ duration: FLOW.clientToLb, repeat: Infinity, ease: "linear" }}
                    />

                    {/* LB to Ring animated dot */}
                    <motion.circle
                      cx="520"
                      cy="240"
                      r="3.3"
                      fill="#ffffff"
                      filter="url(#glowWhite)"
                      opacity="0"
                      animate={{
                        cx: ["520", "540"],
                        cy: ["240", "240"],
                        opacity: [0, 0.72, 0.72, 0],
                        r: [2.6, 3.6, 3.6, 2.6],
                      }}
                      transition={{ duration: FLOW.lbToRing, repeat: Infinity, ease: "linear", delay: 0.5 }}
                    />

                    {/* Ring to Cluster animated dot */}
                    <motion.circle
                      cx="800"
                      cy="240"
                      r="3.6"
                      fill="#10b981"
                      filter="url(#glowCyan)"
                      opacity="0"
                      animate={{
                        cx: ["800", "820"],
                        cy: ["240", "240"],
                        opacity: [0, 0.76, 0.76, 0],
                        r: [2.8, 3.8, 3.8, 2.8],
                      }}
                      transition={{ duration: FLOW.lbToCluster, repeat: Infinity, ease: "linear", delay: 1.1 }}
                    />
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
 
        <div className="lg:hidden space-y-3">
          <ClientCard active={active} />
          <LoadBalancerCard active={active} />
          <HashRing active={active} />
          <div
            className="rounded-2xl p-4"
            style={{
              border: "1px solid rgba(245,158,11,0.42)",
              background: "rgba(245,158,11,0.06)",
            }}
          >
            <div className="font-section text-[11px] tracking-[0.14em]" style={{ color: "var(--ef-amber)" }}>
              Distributed Cache Cluster
            </div>
            <div className="mt-3 space-y-3">
              {cacheNodes.map((node, index) => (
                <CacheNodeCard
                  key={node.name}
                  name={node.name}
                  port={`:${node.port}`}
                  accent={node.accent}
                  border={node.border}
                  index={index}
                  active={active}
                />
              ))}
            </div>
          </div>
          <CloudMapCard active={active} />
        </div>
 
        <motion.p
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-3 font-body text-xs"
          style={{ color: "var(--ef-gray)" }}
        >
          The diagram is intentionally constrained to five paths: client access, discovery seed, hash-ring routing, and two cache-cluster operations.
        </motion.p>
      </div>
    </div>
  );
}
 
 