import { motion } from "framer-motion";

const comparisons = [
  { label: "Concurrent users", before: "1,000", after: "10,000,000", beforeColor: "#10B981", afterColor: "#EF4444" },
  { label: "DB queries/sec", before: "100", after: "1,000,000", beforeColor: "#10B981", afterColor: "#EF4444" },
  { label: "Response time budget", before: "500ms OK", after: "50ms required", beforeColor: "#10B981", afterColor: "#EF4444" },
];

export function Slide03ScaleIntro() {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-4xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-4"
        >
          What Changes at Scale?
        </motion.h2>

        {/* Pizza shop analogy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="card-cinematic rounded-xl p-5 mb-8 border-l-4 border-cyan glow-cyan"
        >
          <div className="text-cyan font-mono-custom text-xs uppercase tracking-widest mb-2">🍕 The Analogy</div>
          <p className="text-foreground text-lg">
            Running a pizza shop for <span className="text-cyan font-bold">10 customers</span> is easy — one oven, one chef.
            Now imagine <span className="text-red-alert font-bold">1 million orders</span> arrive in the same minute.
            You can't bake faster. You need to <span className="text-cyan font-bold">pre-make the popular slices</span> — that's caching.
          </p>
        </motion.div>

        {/* Before vs After */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-2 text-xs font-mono-custom text-muted-foreground uppercase tracking-wider mb-2"
          >
            <span>Metric</span>
            <span className="text-green-success text-center">Small Scale</span>
            <span className="text-red-alert text-center">At Scale ⚠️</span>
          </motion.div>

          {comparisons.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
              className="grid grid-cols-3 gap-2 card-cinematic rounded-lg p-3 items-center"
            >
              <span className="text-muted-foreground text-sm">{c.label}</span>
              <span className="font-mono-custom text-center font-bold" style={{ color: c.beforeColor }}>
                {c.before}
              </span>
              <motion.span
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 0.98, 1.02, 1], x: [0, -3, 3, -2, 0] }}
                transition={{ delay: 1.5 + i * 0.2, duration: 0.5 }}
                className="font-mono-custom text-center font-bold"
                style={{ color: c.afterColor }}
              >
                {c.after}
              </motion.span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-6 text-muted-foreground text-sm"
        >
          The same architecture that worked at 1,000 users <span className="text-red-alert font-bold">collapses at 10M</span>.
          Scale doesn't just make things slower — it <span className="text-red-alert font-bold">breaks them entirely</span>.
        </motion.div>
      </div>
    </div>
  );
}
