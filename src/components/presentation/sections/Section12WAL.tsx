import { motion } from "framer-motion";
import { Terminal } from "../shared";

interface Props { active: boolean; }

const walLines = [
  { text: "[22:47:33] Node-C: Received PUT user:9981 = {...}", color: "var(--ef-lgray)", delay: 200 },
  { text: "[22:47:33] Node-C: Writing to WAL...  ✓  (disk, fsync)", color: "var(--ef-green)", delay: 700 },
  { text: "[22:47:33] Node-C: Applying to in-memory store...  ✓", color: "var(--ef-green)", delay: 1200 },
  { text: "[22:47:33] Node-C: Sending ACK to client...  ✓", color: "var(--ef-green)", delay: 1700 },
  { text: "", color: "var(--ef-gray)", delay: 2300 },
  { text: "[22:47:34] ⚡ POWER FAILURE — Node-C crashes", color: "var(--ef-red)", delay: 2500 },
  { text: "", color: "var(--ef-gray)", delay: 3200 },
  { text: "[22:47:51] Node-C: Restarting...", color: "var(--ef-lgray)", delay: 3400 },
  { text: "[22:47:51] Node-C: Loading snapshot (checkpoint: 22:45:00)...", color: "var(--ef-cyan)", delay: 3900 },
  { text: "[22:47:51] Node-C: Replaying WAL from 22:45:00 → 22:47:33...", color: "var(--ef-cyan)", delay: 4500 },
  { text: "[22:47:52] Node-C: ✓ Recovered 847 operations", color: "var(--ef-green)", delay: 5400 },
  { text: "[22:47:52] Node-C: Rejoining cluster with SLOW-START mode", color: "var(--ef-cyan)", delay: 5900 },
  { text: "[22:47:52] Node-C: ✓ Online. Zero data loss.", color: "var(--ef-green)", delay: 6500 },
];

export function Section12WAL({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-8"
          style={{ fontSize: "clamp(1.2rem, 2.8vw, 2rem)", color: "var(--ef-white)" }}
        >
          What happens when a node crashes at the worst possible moment.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Terminal lines={walLines} active={active} title="node-c: WAL recovery" />
          </motion.div>

          {/* Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <div className="glass rounded-xl p-4">
              <div className="font-section text-xs mb-3" style={{ color: "var(--ef-cyan)" }}>WAL RECOVERY DIAGRAM</div>
              <div className="space-y-2">
                {[
                  { label: "SNAPSHOT", sub: "Checkpoint @ 22:45:00", color: "var(--ef-violet)", icon: "📸" },
                  { label: "WAL LOG",  sub: "Operations 22:45 → 22:47 (847 ops)", color: "var(--ef-cyan)",   icon: "📜" },
                  { label: "MEMORY",   sub: "Reconstructed state — zero loss", color: "var(--ef-green)",  icon: "✅" },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 5.5 + i * 0.4 }}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}33` }}
                  >
                    <span className="text-lg">{s.icon}</span>
                    <div>
                      <div className="font-section text-xs" style={{ color: s.color }}>{s.label}</div>
                      <div className="font-body text-xs" style={{ color: "var(--ef-gray)" }}>{s.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-green rounded-xl p-4 space-y-2">
              {[
                ["Write guarantee:", "Fsync before ACK"],
                ["Recovery time:", "340ms for 1,847 ops"],
                ["Data loss:", "Zero"],
                ["Slow-start:", "Gradual load ramp on rejoin"],
              ].map(([k, v], i) => (
                <div key={i} className="flex justify-between font-section text-xs">
                  <span style={{ color: "var(--ef-gray)" }}>{k}</span>
                  <span style={{ color: "var(--ef-green)" }}>{v}</span>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 7 }}
              className="glass-cyan rounded-xl p-4"
            >
              <p className="font-body text-xs italic" style={{ color: "var(--ef-lgray)" }}>
                "The WAL wasn't a nice-to-have. It was survival."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
