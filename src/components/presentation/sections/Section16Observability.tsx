import { motion } from "framer-motion";
import { CountUp } from "../shared";

interface Props { active: boolean; }

const sloCards = [
  { icon: "✅", metric: "Availability", value: "99.97%", target: "≥ 99.5%",  headroom: "0.47% headroom",  color: "var(--ef-green)" },
  { icon: "✅", metric: "GET P95",      value: "4.2ms",  target: "≤ 10ms",   headroom: "2.38× faster",    color: "var(--ef-green)" },
  { icon: "✅", metric: "Hit Rate",     value: "94.7%",  target: "≥ 80%",    headroom: "well above target", color: "var(--ef-green)" },
  { icon: "✅", metric: "Rebalance δ",  value: "8.3%",   target: "≤ 10%",    headroom: "key movement",     color: "var(--ef-green)" },
];

function Sparkline({ active }: { active: boolean }) {
  const points = [20, 35, 25, 45, 30, 50, 40, 55, 38, 48, 42, 52, 45, 58, 50];
  const maxP = Math.max(...points);
  const pts = points.map((p, i) => `${(i / (points.length - 1)) * 200},${50 - (p / maxP) * 40}`).join(" ");
  return (
    <svg width="200" height="50" className="overflow-visible">
      <polyline points={pts} fill="none" stroke="var(--ef-cyan)" strokeWidth="1.5"
        style={{ opacity: active ? 1 : 0 }} />
      <circle cx={pts.split(" ").at(-1)?.split(",")[0] ?? "200"} cy={pts.split(" ").at(-1)?.split(",")[1] ?? "10"} r="3"
        fill="var(--ef-cyan)" style={{ filter: "drop-shadow(0 0 4px var(--ef-cyan))" }} />
    </svg>
  );
}

export function Section16Observability({ active }: Props) {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold mb-6"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", color: "var(--ef-white)" }}
        >
          You can't fix what you can't see.
        </motion.h2>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
          <div className="flex items-center justify-between glass rounded-xl p-4">
            <div>
              <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>PERFORMANCE SNAPSHOT</div>
              <div className="font-body text-sm" style={{ color: "var(--ef-lgray)" }}>Quick summary from ap-south-1 / az: ap-south-1a — client and server co-located.</div>
            </div>
            <div className="text-sm font-section" style={{ color: "var(--ef-green)" }}>Stable · 0% errors</div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {[
              { title: 'LOW LOAD', v: '6.49 ms', p95: '11.73 ms', note: '10 VUs · 600 req' },
              { title: 'STAGED', v: '3.27 ms', p95: '5.49 ms', note: 'up to 800 VUs · 120k req' },
              { title: 'SPIKE', v: '820 ms', p95: '1.55 s', note: '50→1000 VUs in 10s' },
              { title: 'STRESS', v: '1.34 s', p95: '2.7 s', note: 'up to 2000 VUs' },
            ].map((c, i) => (
              <div key={i} className="glass rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>{c.title}</div>
                  <div className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>{c.note}</div>
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <div className="font-section text-2xl" style={{ color: i < 2 ? 'var(--ef-cyan)' : i === 2 ? 'var(--ef-amber)' : 'var(--ef-red)' }}>{c.v}</div>
                  <div className="text-xs font-section" style={{ color: 'var(--ef-lgray)' }}>p95 {c.p95}</div>
                </div>
                <div className="mt-3">
                  <div className="h-2 w-full rounded bg-[rgba(255,255,255,0.04)] overflow-hidden">
                    <div style={{ width: i === 0 ? '1%' : i === 1 ? '0.5%' : i === 2 ? '27%' : '45%', background: i < 2 ? 'var(--ef-cyan)' : i === 2 ? '#f59e0b' : '#ef4444' }} className="h-full rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass rounded-xl p-4 flex items-center justify-between">
            <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>KEY TAKEAWAY</div>
            <div className="font-body text-sm" style={{ color: "var(--ef-lgray)" }}>
              Best performance: <strong>10–800 VUs</strong>. Tail latency rises past ~1000 VUs — focus on p95.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
