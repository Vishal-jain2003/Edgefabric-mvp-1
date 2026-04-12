import { motion } from "framer-motion";

interface Props { active: boolean; }

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
  "CACHE NODE 1 :8081",
  "CACHE NODE 2 :8082",
  "CACHE NODE 3 :8083",
];

function Chip({ text }: { text: string }) {
  return (
    <span
      className="font-section text-[10px] px-2 py-1 rounded"
      style={{
        border: "1px solid rgba(255,255,255,0.18)",
        color: "var(--ef-lgray)",
        background: "rgba(0,0,0,0.2)",
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
      className="rounded px-2 py-1.5 font-section text-[10px] flex items-center gap-2"
      style={{
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(0,0,0,0.22)",
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
  const owners = [
    { key: "N1", label: "Node 1", color: "#60a5fa", border: "rgba(96,165,250,0.65)" },
    { key: "N2", label: "Node 2", color: "#34d399", border: "rgba(52,211,153,0.65)" },
    { key: "N3", label: "Node 3", color: "#f59e0b", border: "rgba(245,158,11,0.72)" },
  ];

  const angles = [8, 26, 44, 62, 84, 104, 126, 144, 168, 188, 208, 226, 246, 268, 286, 308, 328, 346];

  const virtualNodes = angles.map((angle, idx) => {
    const owner = owners[idx % owners.length];
    const radians = (angle * Math.PI) / 180;
    const r = 86;
    const x = 110 + Math.cos(radians) * r;
    const y = 110 + Math.sin(radians) * r;
    return {
      id: `v${idx + 1}`,
      owner,
      x,
      y,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ delay: 0.22 }}
      className="rounded-xl p-3 relative"
      style={{
        border: "1px solid rgba(245,158,11,0.52)",
        background: "rgba(245,158,11,0.08)",
      }}
    >
      <div className="font-section text-[11px] mb-2" style={{ color: "var(--ef-amber)" }}>
        CONSISTENT HASH RING
      </div>
      <div className="font-section text-[9px] mb-2" style={{ color: "var(--ef-gray)" }}>
        3 physical nodes mapped to multiple virtual nodes
      </div>

      <div className="relative h-[220px] w-[220px] mx-auto">
        <motion.div
          className="absolute inset-[24px] rounded-full"
          style={{ border: "2px solid rgba(245,158,11,0.7)" }}
          animate={active ? { boxShadow: ["0 0 0 rgba(245,158,11,0.1)", "0 0 18px rgba(245,158,11,0.35)", "0 0 0 rgba(245,158,11,0.1)"] } : {}}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute inset-[16px]"
          style={{ transformOrigin: "50% 50%" }}
          animate={active ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "var(--ef-cyan)", boxShadow: "0 0 12px rgba(0,230,230,0.9)" }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-[26px] rounded-full"
          style={{ border: "1px dashed rgba(255,255,255,0.2)" }}
          animate={active ? { rotate: -360 } : { rotate: 0 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "rgba(255,255,255,0.72)" }}
          animate={active ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {virtualNodes.map((point, idx) => (
          <motion.div
            key={point.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: point.x,
              top: point.y,
              width: 8,
              height: 8,
              border: `1px solid ${point.owner.border}`,
              background: point.owner.color,
              boxShadow: `0 0 6px ${point.owner.color}`,
            }}
            animate={active ? { scale: [0.9, 1.2, 0.9], opacity: [0.65, 1, 0.65] } : { scale: 1, opacity: 0.65 }}
            transition={{ duration: 2.6, repeat: Infinity, delay: idx * 0.08 }}
          />
        ))}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="font-section text-[9px]" style={{ color: "var(--ef-lgray)" }}>TOKEN RING</div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {owners.map((owner) => (
          <div
            key={owner.key}
            className="font-section text-[9px] rounded px-1.5 py-1 text-center"
            style={{
              border: `1px solid ${owner.border}`,
              color: "var(--ef-lgray)",
              background: "rgba(0,0,0,0.16)",
            }}
          >
            <span style={{ color: owner.color }}>{owner.label}</span> VNodes
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AnimatedPathPacket({
  points,
  color,
  delay,
  duration = 2.8,
  repeat = Infinity,
}: {
  points: Array<{ x: number; y: number }>;
  color: string;
  delay: number;
  duration?: number;
  repeat?: number;
}) {
  const xFrames = points.map((point) => point.x);
  const yFrames = points.map((point) => point.y);
  const opacityFrames = points.map((_, idx) => {
    if (idx === 0 || idx === points.length - 1) return 0;
    return 1;
  });

  return (
    <motion.circle
      cx={points[0].x}
      cy={points[0].y}
      r="4"
      fill={color}
      style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      animate={{
        cx: xFrames,
        cy: yFrames,
        opacity: opacityFrames,
      }}
      transition={{ duration, delay, repeat, ease: "linear" }}
    />
  );
}

export function Section09Architecture({ active }: Props) {
  return (
    <div className="slide-container px-4 md:px-8 py-8">
      <div className="max-w-[1200px] w-full relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.45 }}
          className="mb-5"
        >
          <div className="font-section text-xs tracking-[0.2em] mb-2" style={{ color: "var(--ef-cyan)" }}>
            EDGEFABRIC - PRODUCT ARCHITECTURE
          </div>
          <h2
            className="font-display font-semibold leading-tight"
            style={{ fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)", color: "var(--ef-white)" }}
          >
            Horizontal Architecture Flow: Routing, Hashing, Quorum, Repair
          </h2>
        </motion.div>

        <div className="hidden lg:block relative overflow-hidden" style={{ minHeight: 650 }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(55% 70% at 78% 14%, rgba(0,230,230,0.12), transparent 70%), radial-gradient(40% 48% at 10% 86%, rgba(245,158,11,0.1), transparent 72%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
            transition={{ delay: 0.16 }}
            className="absolute left-[20px] top-[245px] w-[160px] rounded-xl p-3"
            style={{
              border: "1px solid rgba(255,255,255,0.35)",
              background: "rgba(0,0,0,0.22)",
            }}
          >
            <div className="font-section text-[10px] mb-1" style={{ color: "var(--ef-lgray)" }}>
              CLIENT APPLICATIONS
            </div>
            <div className="font-section text-xs" style={{ color: "var(--ef-white)" }}>
              HTTP GET / PUT
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ delay: 0.15 }}
            className="absolute left-[210px] top-[108px] w-[250px] rounded-xl p-3"
            style={{
              border: "1px solid rgba(245,158,11,0.58)",
              background: "rgba(245,158,11,0.1)",
            }}
          >
            <div className="font-section text-[11px] mb-2" style={{ color: "var(--ef-amber)" }}>
              LOAD BALANCER LAYER :8080
            </div>
            <div className="space-y-1.5">
              {controlPlane.map((layer, idx) => (
                  <SequenceItem key={layer} label={layer} index={idx} active={active} />
              ))}
            </div>
          </motion.div>

          <div className="absolute left-[505px] top-[165px] w-[240px]">
            <HashRing active={active} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.35 }}
            className="absolute left-[760px] top-[70px] w-[390px] rounded-xl p-4"
            style={{
              border: "1px solid rgba(245,158,11,0.5)",
              background: "rgba(245,158,11,0.08)",
            }}
          >
            <div className="font-section text-[11px] mb-3" style={{ color: "var(--ef-amber)" }}>
              DISTRIBUTED CACHE CLUSTER
            </div>
            <div className="grid grid-cols-3 gap-3">
              {cacheNodes.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="rounded-lg p-3"
                  style={{
                    border: "1px solid rgba(59,130,246,0.66)",
                    background: "rgba(12,23,44,0.85)",
                    boxShadow: "0 0 24px rgba(59,130,246,0.16)",
                    gridColumn: "span 3 / span 3",
                  }}
                >
                  <div className="font-section text-[10px] mb-2" style={{ color: "var(--ef-white)" }}>
                    {name}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {nodeModules.map((module) => (
                      <Chip key={module} text={module} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: 0.45 }}
            className="absolute left-[870px] top-[560px] w-[180px] rounded-lg p-2.5 text-center"
            style={{
              border: "1px solid rgba(167,139,250,0.5)",
              background: "rgba(76,29,149,0.16)",
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg width="28" height="16" viewBox="0 0 56 32" aria-hidden="true">
                <text x="4" y="14" fill="#ffffff" fontSize="13" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="700">aws</text>
                <path d="M8 22 C20 30, 38 30, 50 20" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div className="font-section text-[10px]" style={{ color: "#ddd6fe" }}>
              AWS CLOUD MAP (SERVICE DISCOVERY)
            </div>
          </motion.div>

          <div className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 1180 650" className="w-full h-full">
              <defs>
                <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 Z" fill="rgba(255,255,255,0.7)" />
                </marker>
              </defs>

              <line x1="180" y1="285" x2="210" y2="245" stroke="rgba(255,255,255,0.55)" strokeWidth="1.3" markerEnd="url(#arrowHead)" />
              <line x1="460" y1="236" x2="505" y2="272" stroke="rgba(255,255,255,0.52)" strokeWidth="1.3" markerEnd="url(#arrowHead)" />

              <line x1="725" y1="280" x2="760" y2="160" stroke="rgba(255,255,255,0.38)" strokeWidth="1.2" markerEnd="url(#arrowHead)" />
              <line x1="725" y1="280" x2="760" y2="295" stroke="rgba(255,255,255,0.38)" strokeWidth="1.2" markerEnd="url(#arrowHead)" />
              <line x1="725" y1="280" x2="760" y2="430" stroke="rgba(255,255,255,0.38)" strokeWidth="1.2" markerEnd="url(#arrowHead)" />

              <line x1="460" y1="204" x2="760" y2="160" stroke="rgba(16,185,129,0.45)" strokeWidth="1.2" markerEnd="url(#arrowHead)" />
              <line x1="460" y1="204" x2="760" y2="295" stroke="rgba(16,185,129,0.45)" strokeWidth="1.2" markerEnd="url(#arrowHead)" />
              <line x1="460" y1="204" x2="760" y2="430" stroke="rgba(16,185,129,0.45)" strokeWidth="1.2" markerEnd="url(#arrowHead)" />

              <line x1="460" y1="234" x2="760" y2="160" stroke="rgba(125,211,252,0.45)" strokeWidth="1.2" markerEnd="url(#arrowHead)" />
              <line x1="460" y1="234" x2="760" y2="295" stroke="rgba(125,211,252,0.45)" strokeWidth="1.2" markerEnd="url(#arrowHead)" />
              <line x1="460" y1="234" x2="760" y2="430" stroke="rgba(125,211,252,0.45)" strokeWidth="1.2" markerEnd="url(#arrowHead)" />

              <line x1="1138" y1="160" x2="1138" y2="295" stroke="rgba(0,230,230,0.42)" strokeDasharray="5 5" strokeWidth="1.2" />
              <line x1="1138" y1="295" x2="1138" y2="430" stroke="rgba(0,230,230,0.42)" strokeDasharray="5 5" strokeWidth="1.2" />
              <line x1="1120" y1="160" x2="1120" y2="430" stroke="rgba(245,158,11,0.36)" strokeDasharray="5 6" strokeWidth="1.1" />

              <line x1="955" y1="205" x2="955" y2="560" stroke="rgba(167,139,250,0.42)" strokeWidth="1.1" markerEnd="url(#arrowHead)" />
              <line x1="955" y1="340" x2="955" y2="560" stroke="rgba(167,139,250,0.42)" strokeWidth="1.1" markerEnd="url(#arrowHead)" />
              <line x1="955" y1="475" x2="955" y2="560" stroke="rgba(167,139,250,0.42)" strokeWidth="1.1" markerEnd="url(#arrowHead)" />

              <polyline
                points="955,560 955,86 330,86 330,108"
                fill="none"
                stroke="rgba(167,139,250,0.56)"
                strokeWidth="1.2"
                strokeDasharray="6 6"
                markerEnd="url(#arrowHead)"
              />

              <polyline
                points="460,144 680,144 680,300 760,300"
                fill="none"
                stroke="rgba(16,185,129,0.52)"
                strokeWidth="1.2"
                strokeDasharray="6 5"
                markerEnd="url(#arrowHead)"
              />

              <polyline
                points="760,328 662,328 662,176 460,176"
                fill="none"
                stroke="rgba(34,197,94,0.65)"
                strokeWidth="1.2"
                markerEnd="url(#arrowHead)"
              />

              <line x1="460" y1="192" x2="505" y2="244" stroke="rgba(34,197,94,0.62)" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#arrowHead)" />

              <text x="1096" y="242" fill="rgba(0,230,230,0.76)" fontSize="10" fontFamily="monospace">UDP Gossip</text>
              <text x="1068" y="452" fill="rgba(245,158,11,0.78)" fontSize="10" fontFamily="monospace">PING / INDIRECT</text>
              <text x="400" y="74" fill="rgba(167,139,250,0.8)" fontSize="10" fontFamily="monospace">Startup only: AWS DNS discovery -&gt; LB seed list</text>
              <text x="452" y="136" fill="rgba(16,185,129,0.78)" fontSize="10" fontFamily="monospace">Runtime: LB membership probe -&gt; random known node</text>
              <text x="502" y="168" fill="rgba(34,197,94,0.82)" fontSize="10" fontFamily="monospace">Membership snapshot -&gt; LB -&gt; ring update</text>

              {active && (
                <>
                  <AnimatedPathPacket points={[{ x: 180, y: 285 }, { x: 210, y: 245 }]} color="#00e6e6" delay={0.15} duration={2.6} />
                  <AnimatedPathPacket points={[{ x: 460, y: 236 }, { x: 505, y: 272 }]} color="#f59e0b" delay={0.5} duration={2.6} />
                  <AnimatedPathPacket points={[{ x: 725, y: 280 }, { x: 760, y: 295 }]} color="#60a5fa" delay={0.9} duration={2.8} />
                  <AnimatedPathPacket points={[{ x: 460, y: 204 }, { x: 760, y: 295 }]} color="#10b981" delay={1.3} duration={3} />
                  <AnimatedPathPacket points={[{ x: 460, y: 234 }, { x: 760, y: 430 }]} color="#7dd3fc" delay={1.75} duration={3} />
                  <AnimatedPathPacket points={[{ x: 955, y: 340 }, { x: 955, y: 560 }]} color="#a78bfa" delay={2.2} duration={2.6} />
                  <AnimatedPathPacket points={[{ x: 955, y: 560 }, { x: 955, y: 86 }, { x: 330, y: 86 }, { x: 330, y: 108 }]} color="#a78bfa" delay={0.35} duration={2.9} repeat={0} />
                  <AnimatedPathPacket points={[{ x: 460, y: 144 }, { x: 680, y: 144 }, { x: 680, y: 300 }, { x: 760, y: 300 }]} color="#10b981" delay={2.7} duration={2.8} />
                  <AnimatedPathPacket points={[{ x: 760, y: 328 }, { x: 662, y: 328 }, { x: 662, y: 176 }, { x: 460, y: 176 }]} color="#22c55e" delay={3.1} duration={2.8} />
                  <AnimatedPathPacket points={[{ x: 460, y: 192 }, { x: 505, y: 244 }]} color="#22c55e" delay={3.45} duration={2.2} />
                </>
              )}
            </svg>
          </div>
        </div>

        <div className="lg:hidden space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            className="glass rounded-xl p-3"
          >
            <div className="font-section text-[11px] mb-2" style={{ color: "var(--ef-amber)" }}>
              CLIENT -&gt; LOAD BALANCER LAYER :8080
            </div>
            <div className="space-y-1.5">
              {controlPlane.map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 8 }}
                  animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                  transition={{ delay: 0.15 + idx * 0.06 }}
                  className="font-section text-[10px] px-2 py-1 rounded"
                  style={{ border: "1px solid rgba(245,158,11,0.4)", color: "var(--ef-lgray)", background: "rgba(0,0,0,0.18)" }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.16 }}
            className="glass rounded-xl p-3"
          >
            <HashRing active={active} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-3"
          >
            <div className="font-section text-[11px] mb-2" style={{ color: "var(--ef-cyan)" }}>
              DISTRIBUTED CACHE CLUSTER
            </div>
            <div className="space-y-2">
              {cacheNodes.map((name) => (
                <div
                  key={name}
                  className="rounded-lg p-2"
                  style={{ border: "1px solid rgba(59,130,246,0.6)", background: "rgba(10,20,40,0.75)" }}
                >
                  <div className="font-section text-[10px] mb-1" style={{ color: "var(--ef-white)" }}>
                    {name}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {nodeModules.map((module) => <Chip key={module} text={module} />)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-3"
          >
            <div className="font-section text-[11px] mb-2" style={{ color: "var(--ef-green)" }}>
              CLUSTER LINKS + DISCOVERY
            </div>
            <div className="font-section text-[10px] mb-1" style={{ color: "var(--ef-lgray)" }}>
              Gossip: Node1 &lt;-&gt; Node2 &lt;-&gt; Node3 and Node1 &lt;-&gt; Node3 (UDP)
            </div>
            <div className="font-section text-[10px] mb-2" style={{ color: "var(--ef-lgray)" }}>
              Failure Detection: Node1 &lt;-&gt; Node2 &lt;-&gt; Node3 and Node1 &lt;-&gt; Node3 (PING/INDIRECT)
            </div>
            <div className="font-section text-[10px]" style={{ color: "#ddd6fe" }}>
              Startup only: LB seeds node list once from AWS DNS/Cloud Map.
            </div>
            <div className="font-section text-[10px] mt-1" style={{ color: "#ddd6fe" }}>
              Runtime: LB polls any known node for membership, then refreshes the hash ring.
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="font-body text-xs mt-3"
          style={{ color: "var(--ef-gray)" }}
        >
          Animation is intentionally minimal: one clear packet per major path, plus ring orbit, so the sequence stays readable and accurate.
        </motion.p>
      </div>
    </div>
  );
}
