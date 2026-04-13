import { motion } from "framer-motion";
import { useState } from "react";

interface Props { active: boolean; }

const LETTERS = "EDGEFABRIC".split("");

const requirements = [
  { name: "API & Client",       desc: "REST + gRPC client libraries" },
  { name: "Data Distribution",  desc: "Consistent hash ring" },
  { name: "Cluster Membership", desc: "SWIM gossip protocol" },
  { name: "Health Checks",      desc: "Active + passive probing" },
  { name: "Consistency",        desc: "Tunable per-request + per-tenant" },
  { name: "SLOs",               desc: "99.5% avail, P95 ≤10ms" },
  { name :"Perfomance testing", desc: "Load testing, stress testing" },
  { name: "Cost Design",        desc: "Resource-aware eviction" },
  {name :"Smoke Testing",        desc: "Chaos testing, canary releases" },
  { name: "CI/CD",              desc: "Blue-green, canary releases" },
];

const reasons = [
  "① We wanted full control over caching behavior, deployment, and scaling.",
  "② Core distributed engine is live now: consistent hashing, gossip membership, quorum replication,read-repair recovery.",
  
];

export function Section08EdgeFabric({ active }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="slide-container px-8 md:px-16">
      {/* Cinematic wave background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(52% 70% at 88% 66%, rgba(0, 225, 255, 0.28) 0%, rgba(118, 60, 255, 0.2) 34%, rgba(255, 0, 153, 0.13) 58%, transparent 76%), linear-gradient(118deg, rgba(255, 41, 116, 0.08) 10%, rgba(113, 52, 235, 0.12) 42%, rgba(0, 227, 255, 0.08) 78%)",
          filter: "saturate(115%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(164deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 3px, transparent 18px)",
          opacity: 0.18,
          maskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0.2) 60%, transparent)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0.2) 60%, transparent)",
        }}
      />

      <div className="max-w-5xl w-full relative z-10">
        {/* EdgeFabric letter-by-letter */}
        <div className="flex items-baseline gap-1 mb-4">
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
              className="font-section font-bold"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "var(--ef-cyan)",
                textShadow: "0 0 20px rgba(0,212,255,0.6)",
                letterSpacing: "0.08em",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="font-body italic mb-6"
          style={{ color: "var(--ef-gray)", fontSize: "1rem" }}
        >
          Built in-house for our product needs.{" "}
          <span style={{ color: "var(--ef-white)" }} className="font-semibold not-italic">
            This is EdgeFabric.
          </span>
        </motion.p>

        {/* Reasons */}
        <div className="space-y-2 mb-8">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.2 }}
              className="font-body text-sm"
              style={{ color: "var(--ef-lgray)" }}
            >
              {r}
            </motion.div>
          ))}
        </div>

        {/* Requirements grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="glass rounded-xl p-5 mb-6"
        >
          <div className="font-section text-xs mb-3" style={{ color: "var(--ef-cyan)" }}>
            {requirements.length} CORE CAPABILITIES - DESIGNED IN-HOUSE (CORE READY, ENHANCEMENTS IN PROGRESS)
          </div>
          <div className="flex flex-wrap gap-2">
            {requirements.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 + i * 0.06 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative px-2.5 py-1 rounded text-xs font-section cursor-default transition-all duration-200"
                style={{
                  background: "rgba(0,212,255,0.08)",
                  border: `1px solid ${hovered === i ? "rgba(0,212,255,0.6)" : "rgba(0,212,255,0.2)"}`,
                  color: hovered === i ? "var(--ef-cyan)" : "var(--ef-lgray)",
                  boxShadow: hovered === i ? "0 0 12px rgba(0,212,255,0.3)" : "none",
                }}
              >
                {r.name}
                {hovered === i && (
                  <div className="absolute bottom-full left-0 mb-1 px-2 py-1 rounded text-xs z-50 whitespace-nowrap"
                    style={{ background: "var(--ef-card)", border: "1px solid var(--ef-border)", color: "var(--ef-lgray)" }}>
                    {r.desc}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0 }}
          className="font-section text-sm"
          style={{ color: "var(--ef-cyan)" }}
        >
          Every capability here is planned, implemented, and validated by Team Hermes.
        </motion.div>
      </div>
    </div>
  );
}
