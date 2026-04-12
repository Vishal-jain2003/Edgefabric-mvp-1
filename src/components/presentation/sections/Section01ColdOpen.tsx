import { motion } from "framer-motion";

interface Props { active: boolean; }

export function Section01ColdOpen({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16 flex items-center justify-center min-h-screen" style={{ minHeight: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05, duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <div className="rounded-xl p-8 glass-cyan text-center relative overflow-hidden">
          <div className="font-display font-black leading-tight" style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)", color: "#ffffff" }}>
            "Every 100 ms of latency costs Amazon one percent in revenue."
          </div>
          <div className="font-section text-sm mt-3" style={{ color: "var(--ef-lgray)" }}>
            Latency doesn't just annoy users — it costs money. Small delays scale to big losses.
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ delay: 0.6, duration: 1.1, ease: "easeOut" }}
            className="h-px mx-auto mt-6"
            style={{ background: "linear-gradient(90deg,#00d4ff, transparent)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-4 font-body text-sm"
            style={{ color: "var(--ef-lgray)" }}
          >
            Ready to see how small changes in latency add up to real business impact?
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
