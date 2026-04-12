import { motion } from "framer-motion";

interface ReadRepairVisualizerProps {
  versions: Record<string, number>;
  winnerNode: string | null;
  staleNodes: string[];
  repairing: boolean;
}

export function ReadRepairVisualizer({
  versions,
  winnerNode,
  staleNodes,
  repairing,
}: ReadRepairVisualizerProps) {
  const nodeIds = Object.keys(versions);

  return (
    <div className="glass rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>
          READ REPAIR FLOW
        </div>
        <div className="font-section text-xs" style={{ color: repairing ? "#10b981" : "var(--ef-gray)" }}>
          {repairing ? "repair active" : "idle"}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 items-center">
        {nodeIds.map((nodeId) => {
          const isWinner = winnerNode === nodeId;
          const isStale = staleNodes.includes(nodeId);

          return (
            <motion.div
              key={nodeId}
              animate={{
                borderColor: isWinner ? "#10b981" : isStale ? "#ef4444" : "rgba(148,163,184,0.2)",
                boxShadow: repairing && isStale ? "0 0 18px rgba(239,68,68,0.3)" : "0 0 0 rgba(0,0,0,0)",
              }}
              className="rounded-lg p-2 text-center"
              style={{ border: "1px solid rgba(148,163,184,0.2)", background: "rgba(255,255,255,0.03)" }}
            >
              <div className="font-section text-[11px]" style={{ color: "var(--ef-lgray)" }}>{nodeId}</div>
              <div className="font-section text-sm" style={{ color: isWinner ? "#10b981" : isStale ? "#ef4444" : "#60a5fa" }}>
                v{versions[nodeId]}
              </div>
            </motion.div>
          );
        })}
      </div>

      {winnerNode && staleNodes.length > 0 && (
        <div className="mt-2">
          {staleNodes.map((nodeId) => (
            <motion.div
              key={nodeId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-section text-xs"
              style={{ color: repairing ? "#10b981" : "var(--ef-gray)" }}
            >
              {winnerNode} {"->"} {nodeId} (repair to v{versions[winnerNode]})
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
