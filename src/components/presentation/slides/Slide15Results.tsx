import { motion } from "framer-motion";
import { useCountUp } from "../useCountUp";

function MetricCard({
  label, beforeVal, afterVal, beforeLabel, afterLabel, color, delay, unit = "", countTarget, countdown = false,
}: {
  label: string; beforeVal: string; afterVal: string; beforeLabel: string; afterLabel: string;
  color: string; delay: number; unit?: string; countTarget: number; countdown?: boolean;
}) {
  const count = useCountUp(countTarget, 1800, true);
  const display = countdown
    ? `${Math.max(0, 12000 - (count * (12000 - 200)) / countTarget)}ms`
    : `${count}${unit}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6 }}
      className="card-cinematic rounded-2xl p-6 text-center relative overflow-hidden"
      style={{ borderColor: color, borderWidth: 2, boxShadow: `0 0 40px ${color}30` }}
    >
      <div className="font-mono-custom text-xs uppercase tracking-widest text-muted-foreground mb-4">{label}</div>

      <div className="flex items-center justify-center gap-4 mb-4">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: delay + 0.8, duration: 0.6 }}
          className="text-center"
        >
          <div className="font-mono-custom text-lg line-through" style={{ color: "#EF4444" }}>{beforeVal}</div>
          <div className="text-xs text-muted-foreground">before</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 1.0, duration: 0.4 }}
          className="text-muted-foreground text-lg"
        >
          →
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 1.2, duration: 0.5 }}
          className="text-center"
        >
          <div className="font-mono-custom text-2xl font-bold" style={{ color }}>
            {afterVal}
          </div>
          <div className="text-xs text-muted-foreground">after</div>
        </motion.div>
      </div>

      {/* Animated after value counting up */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 1.5 }}
        className="font-mono-custom text-4xl font-bold"
        style={{ color }}
      >
        {afterVal}
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + 1.8, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 h-1 origin-left"
        style={{ background: color }}
      />
    </motion.div>
  );
}

export function Slide15Results() {
  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-4"
        >
          The <span className="text-cyan">Results</span> 🏆
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-8 text-lg"
        >
          What actually happened after 3 months of aggressive caching:
        </motion.p>

        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            label="P95 Response Time"
            beforeVal="12,000ms"
            afterVal="200ms"
            beforeLabel="12 seconds"
            afterLabel="200ms"
            color="#10B981"
            delay={0.4}
            countTarget={100}
          />
          <MetricCard
            label="DB CPU Usage"
            beforeVal="97%"
            afterVal="12%"
            beforeLabel="97%"
            afterLabel="12%"
            color="#00D4FF"
            delay={0.6}
            unit="%"
            countTarget={100}
          />
          <MetricCard
            label="Cache Hit Rate"
            beforeVal="0%"
            afterVal="97.3%"
            beforeLabel="0%"
            afterLabel="97.3%"
            color="#7C3AED"
            delay={0.8}
            unit="%"
            countTarget={100}
          />
          <MetricCard
            label="DB Servers Needed"
            beforeVal="24 servers"
            afterVal="4 servers"
            beforeLabel="24"
            afterLabel="4"
            color="#F59E0B"
            delay={1.0}
            countTarget={100}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mt-6 card-cinematic rounded-xl p-4 text-center border-l-4 border-cyan glow-cyan"
        >
          <span className="text-muted-foreground">Infrastructure cost: </span>
          <span className="text-red-alert line-through font-mono-custom">$47K/month</span>
          <span className="text-muted-foreground"> → </span>
          <span className="text-green-success font-bold font-mono-custom text-xl">$11K/month</span>
          <span className="text-muted-foreground"> &nbsp;|&nbsp; </span>
          <span className="text-cyan font-bold">76% cost reduction</span>
        </motion.div>
      </div>
    </div>
  );
}
