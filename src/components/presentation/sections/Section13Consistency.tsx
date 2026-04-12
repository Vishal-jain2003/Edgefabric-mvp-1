import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props { active: boolean; }

const modes = [
  {
    id: "eventual",
    label: "Eventual Consistency",
    badge: "Default",
    badgeColor: "var(--ef-cyan)",
    speed: "Fastest",
    useCase: "Social media feeds, recommendations, analytics",
    desc: "Write goes to Node A, Nodes B and C update asynchronously. Reads can return different values for ~100ms window.",
    header: "X-Consistency-Level: eventual",
    nodes: [
      { label: "Node A", status: "write", color: "var(--ef-cyan)" },
      { label: "Node B", status: "async", color: "var(--ef-gray)" },
      { label: "Node C", status: "async", color: "var(--ef-gray)" },
    ],
  },
  {
    id: "read-your-writes",
    label: "Read-Your-Writes",
    badge: "Session",
    badgeColor: "var(--ef-violet)",
    speed: "Slightly slower",
    useCase: "User profiles, shopping cart, notifications",
    desc: "Write to Node A, read request pinned to Node A (session stickiness). You always see your own writes.",
    header: "X-Consistency-Level: read-your-writes",
    nodes: [
      { label: "Node A", status: "write+read", color: "var(--ef-violet)" },
      { label: "Node B", status: "pinned out", color: "var(--ef-gray)" },
      { label: "Node C", status: "pinned out", color: "var(--ef-gray)" },
    ],
  },
  {
    id: "strong",
    label: "Strong Consistency",
    badge: "Tunable",
    badgeColor: "var(--ef-amber)",
    speed: "Slowest",
    useCase: "Payment, account security, inventory counts",
    desc: "Routes to primary replica, waits for quorum ACK from 2+ nodes before returning. Per-request and per-tenant.",
    header: "X-Consistency-Level: strong",
    nodes: [
      { label: "Node A", status: "primary", color: "var(--ef-green)" },
      { label: "Node B", status: "quorum ✓", color: "var(--ef-green)" },
      { label: "Node C", status: "quorum ✓", color: "var(--ef-green)" },
    ],
  },
];

export function Section13Consistency({ active }: Props) {
  const [selected, setSelected] = useState(0);
  const mode = modes[selected];

  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-6"
          style={{ fontSize: "clamp(1.2rem, 2.8vw, 2rem)", color: "var(--ef-white)" }}
        >
          One size doesn't fit all. EdgeFabric lets you choose.
        </motion.h2>

        {/* Mode tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {modes.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setSelected(i)}
              className="px-3 py-1.5 rounded-lg font-section text-xs transition-all duration-200"
              style={{
                background: selected === i ? "rgba(0,212,255,0.12)" : "transparent",
                border: `1px solid ${selected === i ? m.badgeColor : "var(--ef-border)"}`,
                color: selected === i ? m.badgeColor : "var(--ef-gray)",
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Visual */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="font-section text-sm font-bold" style={{ color: mode.badgeColor }}>
                  {mode.label}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-section"
                  style={{ background: `${mode.badgeColor}18`, border: `1px solid ${mode.badgeColor}44`, color: mode.badgeColor }}>
                  {mode.badge}
                </span>
              </div>

              {/* Nodes visual */}
              <div className="flex gap-3 mb-4 justify-center">
                {mode.nodes.map((n, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center border-2"
                      style={{ borderColor: n.color, background: `${n.color}15`,
                        boxShadow: n.color !== "var(--ef-gray)" ? `0 0 12px ${n.color}50` : "none" }}>
                      <span className="font-section text-xs" style={{ color: n.color }}>{n.label.split(" ")[1]}</span>
                    </div>
                    <span className="font-section text-xs text-center" style={{ color: n.color, fontSize: "0.6rem" }}>
                      {n.status}
                    </span>
                  </div>
                ))}
              </div>

              <p className="font-body text-xs leading-relaxed" style={{ color: "var(--ef-lgray)" }}>{mode.desc}</p>

              <div className="mt-3 p-2 rounded font-section text-xs" style={{ background: "#030712", color: "var(--ef-cyan)" }}>
                {mode.header}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="glass rounded-xl p-4 space-y-2">
              <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>CURRENT MODE DETAILS</div>
              <div className="flex justify-between font-section text-xs">
                <span style={{ color: "var(--ef-gray)" }}>Speed:</span>
                <span style={{ color: "var(--ef-amber)" }}>{mode.speed}</span>
              </div>
              <div className="flex justify-between font-section text-xs items-start gap-2">
                <span className="flex-shrink-0" style={{ color: "var(--ef-gray)" }}>Best for:</span>
                <span className="text-right" style={{ color: "var(--ef-lgray)" }}>{mode.useCase}</span>
              </div>
            </div>

            <div className="glass rounded-xl p-4">
              <div className="font-section text-xs mb-2" style={{ color: "var(--ef-violet)" }}>PER-REQUEST HEADER API</div>
              <pre className="font-section text-xs leading-relaxed" style={{ color: "var(--ef-lgray)" }}>
{`GET /cache/user:123
X-Consistency-Level: strong
X-Tenant-Id: tenant-A`}
              </pre>
            </div>

            <div className="glass-cyan rounded-xl p-4">
              <p className="font-body text-xs leading-relaxed" style={{ color: "var(--ef-lgray)" }}>
                <span style={{ color: "var(--ef-cyan)" }} className="font-semibold">Netflix insight:</span>{" "}
                Uses eventual consistency for 95% of operations. Only payment and account security use strong.
                EdgeFabric gives you that same flexibility — per request.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
