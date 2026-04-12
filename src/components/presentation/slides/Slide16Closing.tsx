import { motion } from "framer-motion";

const lines = [
  { text: "Cache early.", color: "#00D4FF" },
  { text: "Cache smart.", color: "#7C3AED" },
  { text: "Survive scale.", color: "#10B981" },
];

const takeaways = [
  "Start caching before you need it — retrofitting is 10x harder",
  "Measure hit rate weekly — it's your cache health score",
  "Always plan invalidation before you plan storage",
  "Cache is not magic — it trades consistency for speed, deliberately",
];

export function Slide16Closing() {
  return (
    <div className="slide-container px-8 md:px-16 relative">
      {/* Glowing violet backdrop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div
          className="w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Main headline */}
        <div className="mb-12">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.4, duration: 0.6, ease: "easeOut" }}
              className="font-display font-bold leading-tight"
              style={{
                color: line.color,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                textShadow: `0 0 30px ${line.color}60`,
              }}
            >
              {line.text}
            </motion.div>
          ))}
        </div>

        {/* Takeaways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
          {takeaways.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + i * 0.2, duration: 0.5 }}
              className="card-cinematic rounded-xl p-4 flex items-start gap-3 text-left"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 + i * 0.2, type: "spring" }}
                className="text-green-success text-lg flex-shrink-0 font-bold"
              >
                ✓
              </motion.span>
              <span className="text-sm text-muted-foreground">{t}</span>
            </motion.div>
          ))}
        </div>

        {/* Questions pulse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <motion.div
            animate={{ scale: [1, 1.03, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <div
              className="font-display text-2xl md:text-3xl font-bold border-2 rounded-xl px-8 py-4 cursor-default"
              style={{
                color: "#00D4FF",
                borderColor: "#00D4FF",
                boxShadow: "0 0 30px rgba(0,212,255,0.2)",
              }}
            >
              Questions? Let's discuss. 💬
            </div>
          </motion.div>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0 }}
          className="mt-6 text-muted-foreground text-sm font-mono-custom"
        >
          "Caching Is Survival" — The Talk
        </motion.div>
      </div>
    </div>
  );
}
