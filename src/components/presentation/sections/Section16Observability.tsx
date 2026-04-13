import { motion } from "framer-motion";

interface Props { active: boolean; }

const testEnvironment = {
  region: "ap-south-1",
  az: "ap-south-1a",
  note: "Same AZ deployment for minimal network variability"
};

const loadProfiles = [
  {
    title: 'LOW LOAD',
    users: 10,
    requests: 600,
    avgLatency: '6.49ms',
    p95: '11.73ms',
    throughput: '~10 req/s',
    status: 'Excellent',
    statusColor: 'var(--ef-green)',
    color: '#10b981',
    intensity: 15
  },
  {
    title: 'STAGED LOAD',
    users: 800,
    requests: 120106,
    avgLatency: '3.27ms',
    p95: '5.49ms',
    throughput: '~200 req/s',
    status: 'Excellent',
    statusColor: 'var(--ef-green)',
    color: '#00e6e6',
    intensity: 40
  },
  {
    title: 'SPIKE LOAD',
    users: 1000,
    requests: 100066,
    avgLatency: '820ms',
    p95: '1.55s',
    throughput: '~769 req/s',
    status: 'Stable',
    statusColor: 'var(--ef-cyan)',
    color: '#f59e0b',
    intensity: 70
  },
  {
    title: 'HIGH LOAD',
    users: 2000,
    requests: 357733,
    avgLatency: '1.34s',
    p95: '2.7s',
    throughput: '~742 req/s',
    status: 'Bottleneck',
    statusColor: 'var(--ef-amber)',
    color: '#ef4444',
    intensity: 100
  },
];

export function Section16Observability({ active }: Props) {
  return (
    <div className="slide-container px-4 md:px-8 py-6">
      <div className="max-w-6xl w-full relative z-10 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
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
            Load Testing & Performance
          </h2>
          <p className="font-body text-sm" style={{ color: "var(--ef-gray)" }}>
            100% Success Rate across all test scenarios
          </p>
        </motion.div>

        {/* Test Environment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-6 flex justify-center"
        >
          <div
            className="inline-flex items-center gap-4 px-5 py-2 rounded-full"
            style={{
              background: "rgba(0,230,230,0.1)",
              border: "1px solid rgba(0,230,230,0.3)",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">🌐</span>
              <span className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>{testEnvironment.region}</span>
            </div>
            <div className="w-px h-4" style={{ background: "rgba(0,230,230,0.3)" }} />
            <div className="flex items-center gap-2">
              <span className="text-sm">📍</span>
              <span className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>{testEnvironment.az}</span>
            </div>
            <div className="w-px h-4" style={{ background: "rgba(0,230,230,0.3)" }} />
            <span className="font-body text-xs" style={{ color: "var(--ef-gray)" }}>{testEnvironment.note}</span>
          </div>
        </motion.div>

        {/* Test Scenarios Grid - 4 boxes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {loadProfiles.map((profile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="rounded-xl p-5 relative overflow-hidden"
              style={{
                border: `2px solid ${profile.color}60`,
                background: `${profile.color}15`,
              }}
            >
              {/* Animated top intensity bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden" style={{ background: `${profile.color}30` }}>
                <motion.div
                  className="h-full"
                  style={{ background: profile.color }}
                  initial={{ width: 0 }}
                  animate={active ? { width: `${profile.intensity}%` } : { width: 0 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 1, ease: "easeOut" }}
                />
              </div>

              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ boxShadow: `inset 0 0 30px ${profile.color}20` }}
                animate={active ? { opacity: [0.3, 0.6, 0.3] } : { opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Header */}
              <div className="mb-4 pt-2 relative">
                <motion.div
                  className="font-section text-sm font-bold"
                  style={{ color: profile.color }}
                  initial={{ x: -10, opacity: 0 }}
                  animate={active ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                >
                  {profile.title}
                </motion.div>
                <motion.span
                  className="inline-block mt-2 font-section text-[10px] px-2 py-1 rounded"
                  style={{
                    background: `${profile.statusColor}25`,
                    color: profile.statusColor,
                    border: `1px solid ${profile.statusColor}50`
                  }}
                  initial={{ scale: 0 }}
                  animate={active ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.6 + i * 0.12, type: "spring", stiffness: 200 }}
                >
                  {profile.status}
                </motion.span>
              </div>

              {/* Metrics with staggered animation */}
              <div className="space-y-3 relative">
                {[
                  { label: 'VUs', value: profile.users.toLocaleString(), color: 'var(--ef-white)' },
                  { label: 'Avg Latency', value: profile.avgLatency, color: 'var(--ef-cyan)' },
                  { label: 'P95', value: profile.p95, color: 'var(--ef-cyan)' },
                  { label: 'Throughput', value: profile.throughput, color: 'var(--ef-green)' },
                ].map((metric, j) => (
                  <motion.div
                    key={j}
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.5 + i * 0.12 + j * 0.08 }}
                  >
                    <span className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>{metric.label}</span>
                    <span className="font-section text-sm font-bold" style={{ color: metric.color }}>
                      {metric.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Insight */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="font-body text-sm" style={{ color: "var(--ef-gray)" }}>
            <span style={{ color: "var(--ef-green)" }}>✓ Optimal:</span> 10–800 VUs &nbsp;|&nbsp;
            <span style={{ color: "var(--ef-amber)" }}>⚠ Bottleneck:</span> Beyond 1000+ VUs
          </p>
        </motion.div>
      </div>
    </div>
  );
}
