export type NodeStatus = "ALIVE" | "SUSPECT" | "DEAD";

export interface CacheNode {
  id: string;
  host?: string;
  status: NodeStatus;
  heartbeat: number;
  incarnation: number;
  x?: number;
  y?: number;
}

export interface VirtualNode {
  hash: number;
  physicalNodeId: string;
  position: number;
}
