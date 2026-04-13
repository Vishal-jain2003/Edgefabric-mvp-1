import { motion } from "framer-motion";

interface Props { active: boolean; }

const takeaways = [
  {
    text: "Millions of requests, same data — cache is the only answer",
    highlight: "cache is the only answer",
  },
  {
    text: "SWIM + consistent hashing — the pillars that keep us alive at 3AM",
    highlight: "the pillars that keep us alive at 3AM",
  },
  {
    text: "Nodes fail. Data doesn't. That's replication done right.",
    highlight: "Data doesn't.",
  },
  {
    text: "99.97% availability isn't luck. It's architecture.",
    highlight: "It's architecture.",
  },
];

export function Section17Closing({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      {/* Cinematic wave backdrop */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(58% 72% at 85% 68%, rgba(0, 224, 255, 0.3) 0%, rgba(111, 65, 255, 0.22) 34%, rgba(255, 20, 147, 0.16) 57%, transparent 78%), linear-gradient(125deg, rgba(255, 59, 92, 0.12) 8%, rgba(120, 55, 230, 0.16) 44%, rgba(0, 230, 230, 0.1) 80%)",
        }} />

      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(162deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 3px, transparent 20px)",
          opacity: 0.2,
          maskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0.2) 62%, transparent)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0.2) 62%, transparent)",
        }} />

      <div className="max-w-6xl w-full relative z-10 mx-auto">
        {/* Title & Thank You */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={active ? {
              boxShadow: [
                "0 0 20px rgba(0,212,255,0.3)",
                "0 0 50px rgba(0,212,255,0.6)",
                "0 0 20px rgba(0,212,255,0.3)",
              ]
            } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block px-10 py-5 rounded-2xl mb-6"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "2px solid var(--ef-cyan)",
            }}
          >
            <div
              className="font-display font-black text-4xl mb-2"
              style={{
                background: "linear-gradient(135deg, #00e6e6, #60a5fa, #34d399)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              Thank You!
            </div>
            <div className="font-body text-base" style={{ color: "var(--ef-gray)" }}>
              Questions? Let's go deeper.
            </div>
          </motion.div>
        </motion.div>

        {/* Conclusion Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-center mb-4"
        >
          <h2
            className="font-display font-bold text-xl"
            style={{ color: "var(--ef-cyan)" }}
          >
            Key Takeaways
          </h2>
        </motion.div>

        {/* Takeaways at the end */}
        <div className="grid md:grid-cols-2 gap-3">
          {takeaways.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{
                background: "rgba(10,15,30,0.6)",
                border: "1px solid rgba(0,230,230,0.2)",
                boxShadow: "0 0 15px rgba(0,230,230,0.1)",
              }}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={active ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 300 }}
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg"
                style={{
                  background: "rgba(52,211,153,0.2)",
                  border: "2px solid var(--ef-green)",
                  color: "var(--ef-green)"
                }}
              >
                ✓
              </motion.span>
              <p className="font-body text-sm" style={{ color: "var(--ef-lgray)", lineHeight: 1.4 }}>
                {item.text.split(item.highlight).map((part, j, arr) => (
                  <span key={j}>
                    {part}
                    {j < arr.length - 1 && (
                      <span style={{ color: "var(--ef-cyan)", fontWeight: 600 }}>{item.highlight}</span>
                    )}
                  </span>
                ))}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
}
