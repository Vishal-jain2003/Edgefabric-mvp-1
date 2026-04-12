import type { NodeStatus } from "@/engine/types";

export interface ScenarioNode {
  id: string;
  host: string;
  status: NodeStatus;
  heartbeat?: number;
  incarnation?: number;
}

export const scenarios = {
  basicCluster: {
    nodes: [
      { id: "node-1", host: "10.0.0.1", status: "ALIVE" as const, heartbeat: 1, incarnation: 1 },
      { id: "node-2", host: "10.0.0.2", status: "ALIVE" as const, heartbeat: 1, incarnation: 1 },
      { id: "node-3", host: "10.0.0.3", status: "ALIVE" as const, heartbeat: 1, incarnation: 1 },
    ],
    quorumConfig: { N: 3, R: 2, W: 2, timeoutMs: 800 },
  },

  nodeFailure: {
    events: [
      { type: "PING", source: "node-1", target: "node-2", success: false },
      { type: "PING_REQ", source: "node-1", helper: "node-3", target: "node-2", success: false },
      { type: "NODE_SUSPECT", nodeId: "node-2" },
      { type: "NODE_DEAD", nodeId: "node-2" },
    ],
  },

  readRepair: {
    initialState: {
      "node-1": { key: "user:123", version: 5 },
      "node-2": { key: "user:123", version: 3 },
      "node-3": { key: "user:123", version: 5 },
    },
    events: [
      { type: "QUORUM_READ", key: "user:123", targetNodes: ["node-1", "node-2", "node-3"] },
      { type: "READ_REPAIR", staleNode: "node-2", freshNode: "node-1", key: "user:123" },
    ],
  },

  cacheEviction: {
    maxMemory: 1024,
    initialCache: [
      { key: "old-key-1", memorySize: 256, lastAccess: Date.now() - 60000 },
      { key: "old-key-2", memorySize: 256, lastAccess: Date.now() - 30000 },
      { key: "recent-key", memorySize: 256, lastAccess: Date.now() - 1000 },
    ],
    newEntry: { key: "new-key", memorySize: 512 },
  },

  timeWheelExpiry: {
    buckets: [
      { index: 0, keys: ["expires-soon-1", "expires-soon-2"] },
      { index: 5, keys: ["expires-later"] },
      { index: 30, keys: ["expires-much-later"] },
    ],
  },
};
