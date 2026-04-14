import { motion } from "framer-motion";

interface Props { active: boolean; }

export function Section03TeamGallery({ active }: Props) {
  return (
    <div className="slide-container px-4 md:px-8 py-12 flex flex-col">
      <div className="max-w-7xl w-full mx-auto relative z-10 flex-1 flex flex-col">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2
            className="font-display font-black leading-tight mb-2"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 3.8rem)",
              background: "linear-gradient(135deg, #00e6e6, #60a5fa, #34d399)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Hermes Team
          </h2>
          <p className="font-body text-sm" style={{ color: "var(--ef-gray)" }}>
            Meet the Passionate people building the future of distributed caching
          </p>
        </motion.div>

        {/* Team photo only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex-1 rounded-2xl overflow-hidden flex items-center justify-center p-4 lg:p-6"
          style={{
            border: "3px solid rgba(0,230,230,0.4)",
            boxShadow: "0 0 60px rgba(0,230,230,0.25), inset 0 0 40px rgba(0,230,230,0.08)",
            background: "rgba(10,15,30,0.8)",
            minHeight: "400px",
          }}
        >
          <img
            src="/team.jpg"
            alt="Hermes Development Team"
            className="object-contain object-center rounded-xl"
            style={{
              maxHeight: "60%",
              maxWidth: "60%",
            }}
          />
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center mt-8"
        >
          <p className="font-body text-xs" style={{ color: "var(--ef-lgray)" }}>
            Passionate engineers delivering high-performance distributed systems
          </p>
        </motion.div>
      </div>
    </div>
  );
}
