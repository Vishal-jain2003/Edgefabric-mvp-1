import { motion } from "framer-motion";

const steps = [
  { num: "1", label: "REQUEST", desc: "User asks for data", color: "#00D4FF" },
  { num: "2", label: "CHECK CACHE", desc: "Is it in memory?", color: "#7C3AED" },
  { num: "3", label: "HIT → RETURN", desc: "Serve from cache <1ms", color: "#10B981" },
  { num: "4", label: "MISS → DB", desc: "Fetch from database", color: "#F59E0B" },
  { num: "5", label: "STORE + RETURN", desc: "Write to cache, serve user", color: "#00D4FF" },
];

export function Slide07MentalModel() {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-3"
        >
          The Simple <span className="text-cyan">Mental Model</span>
        </motion.h2>

        {/* Sticky note analogy */}
        <motion.div
          initial={{ opacity: 0, rotate: -2, scale: 0.9 }}
          animate={{ opacity: 1, rotate: -1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block mb-8 p-4 rounded-sm text-sm max-w-sm"
          style={{ background: "#FEF3C7", color: "#92400E", transform: "rotate(-1deg)", boxShadow: "3px 3px 8px rgba(0,0,0,0.3)" }}
        >
          📝 <strong>Cache = sticky note on your monitor.</strong><br />
          Instead of calling HR every time you need the WiFi password — you wrote it down.
          That's caching. The note is the cache. HR is the database.
        </motion.div>

        {/* 5-step flow */}
        <div className="flex flex-col md:flex-row items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex md:flex-col items-center gap-1 flex-1 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="flex-1 w-full card-cinematic rounded-xl p-3 text-center"
                style={{ borderTopColor: s.color, borderTopWidth: 2 }}
              >
                <div className="font-mono-custom text-lg font-bold mb-1" style={{ color: s.color }}>{s.num}</div>
                <div className="font-bold text-xs text-foreground mb-1">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.desc}</div>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="text-muted-foreground text-xl hidden md:block flex-shrink-0"
                  style={{ color: s.color }}
                >
                  →
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* TTL section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="card-cinematic rounded-xl p-5 border-l-4 border-violet"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ⏱️
            </motion.span>
            <div className="font-display text-lg font-bold text-foreground">TTL — Time To Live</div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            {[
              { label: "User profile", ttl: "5 minutes", note: "Changes rarely" },
              { label: "Product price", ttl: "30 seconds", note: "Changes sometimes" },
              { label: "Stock count", ttl: "1 second", note: "Changes constantly" },
            ].map((t, i) => (
              <div key={i} className="card-cinematic rounded-lg p-3">
                <div className="text-muted-foreground text-xs mb-1">{t.label}</div>
                <div className="text-violet font-mono-custom font-bold">{t.ttl}</div>
                <div className="text-muted-foreground text-xs mt-1 italic">{t.note}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
