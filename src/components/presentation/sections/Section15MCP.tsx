import { motion } from "framer-motion";

interface Props { active: boolean; }

const roadmapItems = [
  {
    title: "Durability",
    icon: "💾",
    color: "var(--ef-cyan)",
    items: [
      "WAL & Snapshots implemented",
      "Crash recovery with zero data loss",
    ],
  },
  {
    title: "Scaling",
    icon: "📈",
    color: "var(--ef-green)",
    items: [
      "Zero-downtime node add/remove",
      "Auto rebalancing & warm-up",
    ],
  },
  {
    title: "Observability",
    icon: "📊",
    color: "var(--ef-amber)",
    items: [
      "Real-time metrics & dashboards",
      "SLO alerts",
    ],
  },
  {
    title: "Security",
    icon: "🔒",
    color: "var(--ef-blue)",
    items: [
      "mTLS/TLS & auth controls",
      "Rate limiting",
    ],
  },
  {
    title: "Agentic Ops",
    icon: "🤖",
    color: "var(--ef-purple)",
    items: [
      "MCP self-healing automation",
      "Chaos testing & rolling upgrades",
    ],
  },
];

export function Section15MCP({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-6xl w-full">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2
            className="font-display font-black mb-2"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              background: "linear-gradient(135deg, #00e6e6, #60a5fa, #34d399)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Future Roadmap — MVP 2 Release
          </h2>
          <p className="font-body text-lg" style={{ color: "var(--ef-gray)" }}>
            MVP 1 made it work. <span style={{ color: "var(--ef-cyan)" }}>MVP 2 makes it production-ready.</span>
          </p>
        </motion.div>

        {/* 5 Boxes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {roadmapItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="rounded-xl p-5 flex flex-col"
              style={{
                background: "rgba(10,15,30,0.8)",
                border: `2px solid ${item.color}40`,
                boxShadow: `0 0 20px ${item.color}20`,
              }}
            >
              {/* Icon & Title */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="font-display font-bold text-base" style={{ color: item.color }}>
                  {item.title}
                </h3>
              </div>

              {/* Bullet Items */}
              <div className="space-y-2 flex-1">
                {item.items.map((bullet, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.4 + i * 0.1 + j * 0.1 }}
                    className="flex items-start gap-2 text-xs font-body"
                    style={{ color: "var(--ef-lgray)" }}
                  >
                    <span style={{ color: item.color }} className="mt-0.5 flex-shrink-0">●</span>
                    <span>{bullet}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-8"
        >
          <p className="font-body text-sm" style={{ color: "var(--ef-gray)" }}>
            Building for <span style={{ color: "var(--ef-cyan)" }}>reliability</span>, <span style={{ color: "var(--ef-green)" }}>scale</span>, and <span style={{ color: "var(--ef-amber)" }}>operational excellence</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
