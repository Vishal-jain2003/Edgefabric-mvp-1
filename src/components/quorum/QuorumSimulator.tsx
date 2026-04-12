import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QuorumEngine } from "@/engine/quorumEngine";

interface QuorumSimulatorProps {
  replicas: string[];
  quorum: { N: number; R: number; W: number; timeoutMs: number };
  nodeVersions: Map<string, number>;
  onReadRepair: (winnerNode: string, staleNodes: string[]) => void;
  onEvent: (line: string) => void;
}

interface RequestState {
  node: string;
  phase: "request" | "response";
  success?: boolean;
  version?: number | null;
}

export function QuorumSimulator({
  replicas,
  quorum,
  nodeVersions,
  onReadRepair,
  onEvent,
}: QuorumSimulatorProps) {
  const [requestType, setRequestType] = useState<"READ" | "WRITE" | null>(null);
  const [requests, setRequests] = useState<RequestState[]>([]);
  const [achieved, setAchieved] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [stale, setStale] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const engine = useMemo(() => new QuorumEngine(quorum), [quorum]);

  const runWrite = async () => {
    if (running) {
      return;
    }

    setRunning(true);
    setRequestType("WRITE");
    setRequests([]);
    setAchieved(0);
    setWinner(null);
    setStale([]);

    const result = await engine.simulateWrite(
      "user:123",
      replicas,
      (nodeId) => {
        setRequests((prev) => [...prev, { node: nodeId, phase: "request" }]);
      },
      (nodeId, success, version) => {
        setRequests((prev) => [...prev, { node: nodeId, phase: "response", success, version }]);
        if (success) {
          setAchieved((value) => value + 1);
          nodeVersions.set(nodeId, version);
        }
      },
    );

    onEvent(`WRITE quorum ${result.achieved}/${quorum.W} ${result.success ? "achieved" : "failed"}`);
    setRunning(false);
  };

  const runRead = async () => {
    if (running) {
      return;
    }

    setRunning(true);
    setRequestType("READ");
    setRequests([]);
    setAchieved(0);
    setWinner(null);
    setStale([]);

    const result = await engine.simulateRead(
      "user:123",
      replicas,
      nodeVersions,
      (nodeId) => {
        setRequests((prev) => [...prev, { node: nodeId, phase: "request" }]);
      },
      (nodeId, version) => {
        setRequests((prev) => [
          ...prev,
          {
            node: nodeId,
            phase: "response",
            success: version !== null,
            version,
          },
        ]);
        if (version !== null) {
          setAchieved((value) => value + 1);
        }
      },
    );

    setWinner(result.winnerNode);
    setStale(result.staleNodes);

    if (result.winnerNode && result.staleNodes.length > 0) {
      onReadRepair(result.winnerNode, result.staleNodes);
      onEvent(`READ repair triggered by ${result.winnerNode} -> ${result.staleNodes.join(", ")}`);
    } else {
      onEvent(`READ quorum responses ${result.achieved}/${quorum.R}`);
    }

    setRunning(false);
  };

  return (
    <div className="glass rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-section text-xs" style={{ color: "var(--ef-cyan)" }}>
          QUORUM SIMULATOR
        </div>
        <div className="font-section text-xs" style={{ color: "var(--ef-gray)" }}>
          {requestType ? `${requestType} in-flight` : "idle"}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-2 items-center">
        <div className="rounded-lg p-2 text-center" style={{ border: "1px solid var(--ef-border)", background: "rgba(255,255,255,0.03)" }}>
          <div className="font-section text-[11px]" style={{ color: "#60a5fa" }}>CLIENT</div>
        </div>

        {replicas.slice(0, quorum.N).map((nodeId) => {
          const isWinner = winner === nodeId;
          const isStale = stale.includes(nodeId);
          return (
            <div
              key={nodeId}
              className="rounded-lg p-2 text-center"
              style={{
                border: `1px solid ${isWinner ? "#10b981" : isStale ? "#ef4444" : "var(--ef-border)"}`,
                background: isWinner ? "rgba(16,185,129,0.12)" : isStale ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.03)",
              }}
            >
              <div className="font-section text-[11px]" style={{ color: isWinner ? "#10b981" : "var(--ef-lgray)" }}>
                {nodeId}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={runWrite}
          disabled={running}
          className="flex-1 rounded-lg py-2 font-section text-xs"
          style={{
            border: "1px solid rgba(16,185,129,0.35)",
            background: "rgba(16,185,129,0.12)",
            color: "#10b981",
            opacity: running ? 0.5 : 1,
          }}
        >
          Simulate WRITE
        </button>
        <button
          onClick={runRead}
          disabled={running}
          className="flex-1 rounded-lg py-2 font-section text-xs"
          style={{
            border: "1px solid rgba(59,130,246,0.35)",
            background: "rgba(59,130,246,0.12)",
            color: "#60a5fa",
            opacity: running ? 0.5 : 1,
          }}
        >
          Simulate READ
        </button>
      </div>

      <div className="mt-2 rounded-lg px-2 py-1.5 font-section text-xs" style={{ border: "1px solid var(--ef-border)", color: "var(--ef-gray)" }}>
        Achieved: {achieved}/{requestType === "WRITE" ? quorum.W : quorum.R}
      </div>

      <div className="mt-2 min-h-14 space-y-1">
        <AnimatePresence>
          {requests.slice(-6).map((req, idx) => (
            <motion.div
              key={`${req.node}-${req.phase}-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="font-section text-[11px]"
              style={{ color: req.phase === "request" ? "#60a5fa" : req.success ? "#10b981" : "#ef4444" }}
            >
              {req.phase === "request"
                ? `REQ -> ${req.node}`
                : `RESP <- ${req.node} ${req.success ? "ok" : "fail"}${req.version ? ` v${req.version % 1000}` : ""}`}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
