import { motion } from "framer-motion";

interface Props { active: boolean; }

function LogoBadge({ label, color, src }: { label: string; color: string; src?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div style={{ width: 44, height: 44, borderRadius: 10, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#021019', fontWeight: 700, overflow: 'hidden' }}>
        {src ? (
          <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          label.split(' ').map(w => w[0]).slice(0,2).join('')
        )}
      </div>
      <div className="font-body text-sm" style={{ color: 'var(--ef-lgray)' }}>{label}</div>
    </div>
  );
}

export function Section02ScaleShock({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-4xl w-full mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold mb-3"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "var(--ef-white)" }}
        >
          AI-native development
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "30%" }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="h-px mb-8"
          style={{ background: "linear-gradient(90deg,#00d4ff, transparent)" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-5">
            <div className="flex items-center gap-4">
              <img src="/copilot.webp" alt="GitHub Copilot" className="w-10 h-10 rounded-md object-contain" />
              <div>
                <div className="font-section font-semibold" style={{ color: "#00D4FF", fontSize: "1.05rem" }}>GitHub Copilot</div>
                <div className="font-body text-sm mt-2" style={{ color: "var(--ef-lgray)" }}>
                  Code velocity & pair programming
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="glass rounded-xl p-5">
            <div className="flex items-center gap-4">
              <img src="/claude.jpg" alt="Claude" className="w-10 h-10 rounded-md object-contain" />
              <div>
                <div className="font-section font-semibold" style={{ color: "#7C3AED", fontSize: "1.05rem" }}>Claude</div>
                <div className="font-body text-sm mt-2" style={{ color: "var(--ef-lgray)" }}>
                  Architecture decisions & deep understanding
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass rounded-xl p-5">
            <div className="flex items-center gap-4">
              <img src="/codemie.jpg" alt="Codemie" className="w-10 h-10 rounded-md object-contain" />
              <div>
                <div className="font-section font-semibold" style={{ color: "#10B981", fontSize: "1.05rem" }}>Codemie</div>
                <div className="font-body text-sm mt-2" style={{ color: "var(--ef-lgray)" }}>
                  Integrated AI engineering platform
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-8 text-center">
          <div className="font-body text-lg" style={{ color: "var(--ef-white)", fontWeight: 600 }}>
            "We don't just write code. We orchestrate AI to build production-grade systems."
          </div>
        </motion.div>
      </div>
    </div>
  );
}
