import { motion } from "framer-motion";

interface Props { active: boolean; }

const roadmap = [
  {
    quarter: "Q2 2026",
    color: "var(--ef-cyan)",
    items: [
      "Multi-tenant memory quotas",
      "Compression (LZ4/Snappy)",
      "Production observability dashboard",
    ],
  },
  {
    quarter: "Q3 2026",
    color: "var(--ef-amber)",
    items: [
      "Persistent snapshots to S3",
      "Health-aware load balancing",
      "Failure-drill automation",
    ],
  },
  {
    quarter: "Q4 2026",
    color: "var(--ef-green)",
    items: [
      "Prefix/range query support",
      "Multi-region replication",
      "Predictive cache warming",
    ],
  },
];

const goals = [
  { label: "Target Throughput", value: "50K RPS" },
  { label: "Cluster Scale", value: "10+ Nodes" },
  { label: "Global Regions", value: "3 Regions" },
  { label: "SLA", value: "99.95%+" },
];

export function Section15MCP({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-6"
          style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)", color: "var(--ef-white)" }}
        >
          Future Roadmap: From Stable MVP to Production-Grade Platform
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {roadmap.map((phase, i) => (
            <motion.div
              key={phase.quarter}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.15, duration: 0.45 }}
              className="glass rounded-xl p-4"
            >
              <div className="font-section text-xs tracking-wider mb-3" style={{ color: phase.color }}>
                {phase.quarter}
              </div>
              <div className="space-y-2">
                {phase.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-2 text-xs font-body" style={{ color: "var(--ef-lgray)" }}>
                    <span style={{ color: phase.color }} className="mt-0.5">●</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.45 }}
          className="glass rounded-xl p-4"
        >
          <div className="font-section text-xs mb-3" style={{ color: "var(--ef-cyan)" }}>
            NEXT-LEVEL OUTCOMES
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {goals.map((goal, i) => (
              <motion.div
                key={goal.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
                className="rounded-lg p-3"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.35)" }}
              >
                <div className="font-section text-[11px]" style={{ color: "var(--ef-gray)" }}>{goal.label}</div>
                <div className="font-section text-sm font-bold mt-1" style={{ color: "var(--ef-white)" }}>
                  {active ? goal.value : "-"}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="glass-amber rounded-xl p-4 mt-4"
        >
          <p className="font-body text-xs" style={{ color: "var(--ef-lgray)" }}>
            Roadmap priorities are ranked by reliability impact first, then developer experience, then global scale expansion.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
