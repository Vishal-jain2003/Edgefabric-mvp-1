import { motion } from "framer-motion";
import { useCountUp } from "../useCountUp";

export function Slide06WhyCache() {
  const dbLoad = useCountUp(100, 1500, true);
  const repeatedCalc = useCountUp(847, 1200, true);

  return (
    <div className="slide-container px-8 md:px-16">
      <div className="max-w-4xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-10 text-center"
        >
          Why Caching Is <span className="text-cyan">Not Optional</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DB Overload */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="card-cinematic rounded-xl p-6"
          >
            <div className="text-red-alert font-mono-custom text-xs uppercase tracking-widest mb-3">⚠️ Problem 1: DB Overload</div>
            <p className="text-muted-foreground text-sm mb-4">
              Databases are ACID-compliant, disk-based, and designed for correctness — not speed at volume.
              Even the best DB maxes out around <span className="text-red-alert font-bold">50K–100K ops/sec</span>.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>DB CPU Load</span>
                <span className="text-red-alert font-mono-custom">{dbLoad}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dbLoad}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #F59E0B, #EF4444)", boxShadow: "0 0 10px rgba(239,68,68,0.5)" }}
                />
              </div>
            </div>
            <div className="card-cinematic rounded-lg p-3 border-l-2 border-green-success">
              <div className="text-green-success text-xs font-mono-custom mb-1">FIX →</div>
              <div className="text-sm text-foreground">Cache absorbs 95% of reads. DB only handles writes + cache misses.</div>
            </div>
          </motion.div>

          {/* Repeated Work */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="card-cinematic rounded-xl p-6"
          >
            <div className="text-red-alert font-mono-custom text-xs uppercase tracking-widest mb-3">⚠️ Problem 2: Repeated Work</div>
            <p className="text-muted-foreground text-sm mb-4">
              Your homepage product list is fetched and computed <span className="text-red-alert font-bold">identically</span> for every single user.
              That's pure waste — compute once, serve millions.
            </p>
            <div className="card-cinematic rounded-lg p-3 mb-4 font-mono-custom text-xs">
              <div className="text-muted-foreground">redundant_calculations_this_minute:</div>
              <motion.div
                className="text-red-alert text-2xl font-bold mt-1"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: 3, delay: 1 }}
              >
                {repeatedCalc.toLocaleString()}
              </motion.div>
            </div>
            <div className="card-cinematic rounded-lg p-3 border-l-2 border-green-success">
              <div className="text-green-success text-xs font-mono-custom mb-1">FIX →</div>
              <div className="text-sm text-foreground">Compute result once, cache with TTL. Serve from memory until stale.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
