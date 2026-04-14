import { motion } from "framer-motion";

interface Props { active: boolean; }

const loadProfiles = [
  {
    title: 'LOW LOAD',
    users: 10,
    duration: '1 min',
    requests: '600',
    avgLatency: 6.49,
    p95: 11.73,
    throughput: 10,
    successRate: 100,
    color: '#10b981',
    bgGradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
  },
  {
    title: 'STAGED LOAD',
    users: 800,
    duration: '10 min',
    requests: '120,106',
    avgLatency: 3.27,
    p95: 5.49,
    throughput: 200,
    successRate: 100,
    color: '#00e6e6',
    bgGradient: 'linear-gradient(135deg, rgba(0,230,230,0.15), rgba(0,230,230,0.05))',
  },
  {
    title: 'High LOAD',
    users: 200,
    duration: '1 min',
    requests: '46,013',
    avgLatency: 260.83,
    p95: 321.54,
    throughput: 765,
    successRate: 100,
    color: '#60a5fa',
    bgGradient: 'linear-gradient(135deg, rgba(96,165,250,0.15), rgba(96,165,250,0.05))',
  },
];

function LatencyBar({ value, max, color, label, active }: { value: number; max: number; color: string; label: string; active: boolean }) {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="font-section text-[9px]" style={{ color: "var(--ef-gray)" }}>{label}</span>
        <span className="font-mono text-[10px] font-bold" style={{ color }}>{value}ms</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={active ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function Section16Observability({ active }: Props) {
  return (
    <div className="slide-container px-4 md:px-8 py-4">
      <div className="max-w-6xl w-full relative z-10 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <h2
            className="font-display font-black leading-tight"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              background: "linear-gradient(135deg, #00e6e6, #60a5fa, #34d399)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Load Testing Results
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-xs mt-1"
            style={{ color: "var(--ef-gray)" }}
          >
            ap-south-1 • Same AZ deployment • Zero failures across all tests
          </motion.p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {loadProfiles.map((profile, i) => (
            <motion.div
              key={profile.title}
              initial={{ opacity: 0, y: 30 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="rounded-xl p-4 relative overflow-hidden"
              style={{
                background: profile.bgGradient,
                border: `1px solid ${profile.color}40`,
              }}
            >
              {/* Animated top bar */}
              <motion.div
                className="absolute top-0 left-0 h-1"
                style={{ background: profile.color }}
                initial={{ width: 0 }}
                animate={active ? { width: "100%" } : { width: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
              />

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: profile.color, boxShadow: `0 0 10px ${profile.color}` }}
                  />
                  <span className="font-section text-sm font-bold" style={{ color: profile.color }}>
                    {profile.title}
                  </span>
                </div>
                <span
                  className="font-section text-[9px] px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(16,185,129,0.2)", color: "var(--ef-green)", border: "1px solid rgba(16,185,129,0.4)" }}
                >
                  100% Success
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 mb-4 pb-3" style={{ borderBottom: `1px solid ${profile.color}20` }}>
                <div className="text-center">
                  <motion.div
                    className="font-display text-xl font-bold"
                    style={{ color: "var(--ef-white)" }}
                    initial={{ scale: 0 }}
                    animate={active ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                  >
                    {profile.users}
                  </motion.div>
                  <div className="font-section text-[8px]" style={{ color: "var(--ef-gray)" }}>VUs</div>
                </div>
                <div className="text-center">
                  <motion.div
                    className="font-display text-xl font-bold"
                    style={{ color: "var(--ef-white)" }}
                    initial={{ scale: 0 }}
                    animate={active ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.55 + i * 0.1, type: "spring" }}
                  >
                    {profile.duration}
                  </motion.div>
                  <div className="font-section text-[8px]" style={{ color: "var(--ef-gray)" }}>Duration</div>
                </div>
                <div className="text-center">
                  <motion.div
                    className="font-display text-xl font-bold"
                    style={{ color: profile.color }}
                    initial={{ scale: 0 }}
                    animate={active ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                  >
                    {profile.throughput}
                  </motion.div>
                  <div className="font-section text-[8px]" style={{ color: "var(--ef-gray)" }}>req/s</div>
                </div>
              </div>

              {/* Latency Bars */}
              <div className="space-y-2">
                <LatencyBar
                  value={profile.avgLatency}
                  max={350}
                  color={profile.color}
                  label="Avg Latency"
                  active={active}
                />
                <LatencyBar
                  value={profile.p95}
                  max={350}
                  color={profile.color}
                  label="P95 Latency"
                  active={active}
                />
              </div>

              {/* Requests count */}
              <div className="mt-3 pt-2 flex justify-between items-center" style={{ borderTop: `1px solid ${profile.color}15` }}>
                <span className="font-section text-[9px]" style={{ color: "var(--ef-gray)" }}>Total Requests</span>
                <span className="font-mono text-xs font-bold" style={{ color: "var(--ef-white)" }}>{profile.requests}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
          className="rounded-xl p-3 flex items-center justify-between"
          style={{
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(0,230,230,0.15)",
          }}
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-lg">📊</span>
              <div>
                <div className="font-mono text-sm font-bold" style={{ color: "var(--ef-cyan)" }}>166,719</div>
                <div className="font-section text-[8px]" style={{ color: "var(--ef-gray)" }}>Total Requests</div>
              </div>
            </div>
            <div className="flex items-center gap-2">

            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
            <span className="text-sm">🎯</span>
            <span className="font-section text-xs" style={{ color: "var(--ef-green)" }}>Best P95: 5.49ms</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
