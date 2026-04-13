import { motion } from "framer-motion";

interface Props { active: boolean; }

const operations = [
  {
    method: "PUT",
    color: "#f59e0b",
    endpoint: "/cache/{key}",
    description: "Store a key-value pair in the distributed cache",
    steps: [
      "Client sends PUT request with key & value",
      "Request routed to coordinator node",
      "Coordinator hashes key → finds responsible nodes",
      "Data replicated to N nodes (quorum write)",
      "ACK returned after W successful writes"
    ]
  },
  {
    method: "GET",
    color: "#10b981",
    endpoint: "/cache/{key}",
    description: "Retrieve a value by key from the distributed cache",
    steps: [
      "Client sends GET request with key",
      "Request routed to coordinator node",
      "Coordinator queries R replica nodes",
      "Returns value after R successful reads",
      "Read repair triggered if inconsistency detected"
    ]
  },
];

export function SectionGetPutDemo({ active }: Props) {
  return (
    <div className="slide-container px-4 md:px-8 py-6">
      <div className="max-w-6xl w-full relative z-10 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2
            className="font-display font-black leading-tight mb-2"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              background: "linear-gradient(135deg, #00e6e6, #60a5fa, #34d399)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            GET / PUT Request Flow
          </h2>
          <p className="font-body text-sm" style={{ color: "var(--ef-gray)" }}>
            How data flows through the distributed cache
          </p>
        </motion.div>

        {/* Operations Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {operations.map((op, i) => (
            <motion.div
              key={op.method}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: i === 0 ? -30 : 30 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              className="rounded-xl p-6 relative overflow-hidden"
              style={{
                background: "rgba(10,15,30,0.8)",
                border: `2px solid ${op.color}50`,
                boxShadow: `0 0 30px ${op.color}15`,
              }}
            >
              {/* Method badge */}
              <div className="flex items-center gap-3 mb-4">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={active ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 200 }}
                  className="font-mono font-bold text-lg px-4 py-1 rounded-lg"
                  style={{
                    background: `${op.color}25`,
                    color: op.color,
                    border: `1px solid ${op.color}60`,
                  }}
                >
                  {op.method}
                </motion.span>
                <span className="font-mono text-sm" style={{ color: "var(--ef-gray)" }}>
                  {op.endpoint}
                </span>
              </div>

              {/* Description */}
              <p className="font-body text-sm mb-4" style={{ color: "var(--ef-lgray)" }}>
                {op.description}
              </p>

              {/* Steps */}
              <div className="space-y-2">
                {op.steps.map((step, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -15 }}
                    animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                    transition={{ delay: 0.5 + i * 0.15 + j * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{
                        background: `${op.color}20`,
                        color: op.color,
                        border: `1px solid ${op.color}50`
                      }}
                    >
                      {j + 1}
                    </span>
                    <span className="font-body text-xs" style={{ color: "var(--ef-gray)" }}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demo CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={active ? {
              boxShadow: [
                "0 0 20px rgba(0,212,255,0.2)",
                "0 0 40px rgba(0,212,255,0.4)",
                "0 0 20px rgba(0,212,255,0.2)",
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block px-8 py-5 rounded-xl"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "2px solid var(--ef-cyan)",
            }}
          >
            <div className="flex items-center gap-4 justify-center mb-2">
              <span className="text-3xl">🚀</span>
              <span
                className="font-display font-bold text-xl"
                style={{ color: "var(--ef-cyan)" }}
              >
                Live Demo
              </span>
            </div>
            <p className="font-body text-sm" style={{ color: "var(--ef-gray)" }}>
              Let's see this in action with <span style={{ color: "var(--ef-amber)", fontWeight: 600 }}>Postman</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

