import { motion } from "framer-motion";

interface Props { active: boolean; }

const cards = [
  {
    type: "MISTAKE",
    color: "var(--ef-red)",
    glassClass: "glass-red",
    title: "THE STAMPEDE",
    mistake: '"Our cache keys all had the same TTL — midnight UTC."',
    what: 'Every night at midnight, every key expired simultaneously. 10,000 requests hit the database at exactly 00:00:00. DB CPU: 8% → 100% in 3 seconds. Alerts everywhere.',
    fix: "Jittered TTL — add random(0, 300) seconds to every TTL. Keys now expire spread over 5 minutes. Incident never happened again.",
  },
  {
    type: "MISTAKE",
    color: "var(--ef-red)",
    glassClass: "glass-red",
    title: "THE HOT KEY",
    mistake: '"One cache key received 40% of ALL reads."',
    what: 'Key: "trending:global:feed" lived on Node 2 of 6. Node 2 CPU: 95%. All other nodes: 15%. Our "distributed" cache had a single point of overload.',
    fix: "Local L1 cache in front of Redis for detected hot keys. Node 2 load dropped to 22%. Problem eliminated.",
  },
  {
    type: "LESSON",
    color: "var(--ef-green)",
    glassClass: "glass-green",
    title: "GOSSIP SAVED US",
    mistake: '"A datacenter network partition lasted 4 minutes."',
    what: "Two of 6 nodes couldn't reach the other 4. SWIM protocol detected the partition in ~8 seconds. 4 healthy nodes continued serving reads.",
    fix: "When partition healed: anti-entropy reconciled divergence automatically. Zero manual intervention. Zero pages. Zero user-visible errors.",
  },
  {
    type: "LESSON",
    color: "var(--ef-green)",
    glassClass: "glass-green",
    title: "WAL PROVED ITSELF",
    mistake: '"A node\'s power supply failed during a PUT operation."',
    what: "Without WAL: that write would be lost forever. With WAL: On restart, we replayed 1,847 operations in 340ms.",
    fix: "Zero data loss. Node rejoined with slow-start. Users never saw an error. The WAL wasn't a nice-to-have. It was survival.",
  },
];

export function Section14Challenges({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-8"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "var(--ef-white)" }}
        >
          The things that broke us. And what we learned.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateY: -90, x: -40 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              transition={{ delay: 0.2 + i * 0.25, duration: 0.6, ease: "easeOut" }}
              className={`${c.glassClass} rounded-xl p-5 border-l-4`}
              style={{ borderLeftColor: c.color }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-section text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}44` }}>
                  {c.type}
                </span>
                <span className="font-section text-xs" style={{ color: "var(--ef-white)" }}>{c.title}</span>
              </div>

              <p className="font-body text-xs italic mb-2" style={{ color: "var(--ef-gray)" }}>{c.mistake}</p>

              <p className="font-body text-xs leading-relaxed mb-3" style={{ color: "var(--ef-lgray)" }}>
                {c.what}
              </p>

              <div className="pt-2 border-t" style={{ borderColor: `${c.color}30` }}>
                <span className="font-section text-xs mr-1" style={{ color: "var(--ef-green)" }}>The Fix:</span>
                <span className="font-body text-xs" style={{ color: "var(--ef-lgray)" }}>{c.fix}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
