import { motion } from "framer-motion";

interface DNSDiscoveryProps {
  ips: string[];
  discoveredNodes: string[];
  virtualNodeCount: number;
}

export function DNSDiscovery({ ips, discoveredNodes, virtualNodeCount }: DNSDiscoveryProps) {
  return (
    <div className="glass rounded-xl p-3">
      <div className="font-section text-xs mb-2" style={{ color: "var(--ef-cyan)" }}>
        DNS DISCOVERY {"->"} HASH RING BOOTSTRAP
      </div>

      <div className="space-y-1.5">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-section text-xs"
          style={{ color: "#60a5fa" }}
        >
          1) query: edgefabric.service.cluster.local
        </motion.div>

        <div className="rounded-lg p-2" style={{ border: "1px solid var(--ef-border)", background: "rgba(255,255,255,0.02)" }}>
          <div className="font-section text-[11px]" style={{ color: "var(--ef-gray)" }}>2) response IPs</div>
          <div className="mt-1 flex flex-wrap gap-1">
            {ips.map((ip) => (
              <motion.span
                key={ip}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-section text-[11px] px-1.5 py-0.5 rounded"
                style={{ border: "1px solid rgba(59,130,246,0.35)", color: "#60a5fa" }}
              >
                {ip}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="rounded-lg p-2" style={{ border: "1px solid var(--ef-border)", background: "rgba(255,255,255,0.02)" }}>
          <div className="font-section text-[11px]" style={{ color: "var(--ef-gray)" }}>3) nodes joined</div>
          <div className="mt-1 space-y-0.5">
            {discoveredNodes.map((node) => (
              <motion.div
                key={node}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-section text-[11px]"
                style={{ color: "#10b981" }}
              >
                + {node}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="font-section text-xs" style={{ color: "#f59e0b" }}>
          4) virtual nodes populated: {virtualNodeCount}
        </div>
      </div>
    </div>
  );
}
