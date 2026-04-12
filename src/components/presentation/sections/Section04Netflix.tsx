import { motion } from "framer-motion";

interface Props { active: boolean; }

const steps = [
  { time: "0ms",    title: "User presses Play",          body: "Browser sends: GET /shows/stranger-things/metadata", color: "var(--ef-cyan)" },
  { time: "1ms",    title: "Cache layer — EVCache",       body: 'Key: "show:stranger-things:metadata:v3" → CACHE HIT ✓ Returns in 1ms. Done.', color: "var(--ef-green)" },
  { time: "???",    title: "Cache COLD? (first request)", body: "→ Falls back to Cassandra DB cluster\n→ Query time: 45–80ms\n→ Result stored for next 220M users", color: "var(--ef-orange)" },
  { time: "Impact", title: "Cache saved 99.96% of queries", body: "220M requests → 1 actual DB call", color: "var(--ef-cyan)" },
];

export function Section04Netflix({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-1"
          style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", color: "var(--ef-white)" }}
        >
          8:00 PM. Every night.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-body text-sm mb-8 max-w-2xl"
          style={{ color: "var(--ef-gray)" }}
        >
          220 million people press Play simultaneously. Here's what happens inside Netflix's infrastructure in the first 500 milliseconds.
        </motion.p>

        {/* Timeline */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.25, duration: 0.5, type: "spring", damping: 18 }}
              className="glass rounded-xl p-4 border-l-4"
              style={{ borderLeftColor: s.color }}
            >
              <div className="font-section text-xs mb-1" style={{ color: s.color }}>{s.time}</div>
              <div className="font-body font-semibold mb-2" style={{ color: "var(--ef-white)", fontSize: "0.9rem" }}>{s.title}</div>
              <div className="font-body text-xs whitespace-pre-line leading-relaxed" style={{ color: "var(--ef-lgray)" }}>{s.body}</div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { label: "Response time", before: "45ms", after: "1ms", suffix: "50× faster" },
            { label: "DB hits", before: "220M", after: "~8,800", suffix: "99.96% reduction" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.2 }}
              className="glass-cyan rounded-xl p-4 text-center"
            >
              <div className="font-body text-xs mb-1" style={{ color: "var(--ef-gray)" }}>{s.label}</div>
              <div className="flex items-center justify-center gap-2">
                <span className="font-section line-through text-sm" style={{ color: "var(--ef-red)" }}>{s.before}</span>
                <span style={{ color: "var(--ef-gray)" }}>→</span>
                <span className="font-section font-bold text-xl" style={{ color: "var(--ef-green)" }}>{s.after}</span>
              </div>
              <div className="font-section text-xs mt-1" style={{ color: "var(--ef-cyan)" }}>{s.suffix}</div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar fact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1 }}
          className="glass rounded-xl p-4"
        >
          <span className="font-section text-xs mr-2" style={{ color: "var(--ef-amber)" }}>⚡ NETFLIX EVCACHE</span>
          <span className="font-body text-xs" style={{ color: "var(--ef-gray)" }}>
            Built on Memcached. 2+ trillion requests/day. 30M+ operations/second. Deployed in every AWS availability zone they use.
          </span>
        </motion.div>
      </div>
    </div>
  );
}
