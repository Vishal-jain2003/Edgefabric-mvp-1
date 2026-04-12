import type { CacheNode, NodeStatus } from "./types";

interface GossipEntry {
  nodeId: string;
  status: NodeStatus;
  heartbeat: number;
  incarnation: number;
}

export class GossipProtocol {
  private fanout = 3;
  private dirtyNodes: Set<string> = new Set();

  selectPeers(allNodes: CacheNode[], selfId: string): CacheNode[] {
    const candidates = allNodes.filter((node) => node.id !== selfId && node.status !== "DEAD");
    const shuffled = [...candidates].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, this.fanout);
  }

  buildDigest(nodes: CacheNode[]): GossipEntry[] {
    return nodes
      .filter((node) => this.dirtyNodes.has(node.id))
      .map((node) => ({
        nodeId: node.id,
        status: node.status,
        heartbeat: node.heartbeat,
        incarnation: node.incarnation,
      }));
  }

  merge(local: CacheNode, incoming: GossipEntry): boolean {
    if (incoming.incarnation > local.incarnation) {
      return true;
    }
    if (incoming.incarnation < local.incarnation) {
      return false;
    }

    const severity: Record<NodeStatus, number> = {
      ALIVE: 0,
      SUSPECT: 1,
      DEAD: 2,
    };

    if (severity[incoming.status] > severity[local.status]) {
      return true;
    }

    return incoming.status === local.status && incoming.heartbeat > local.heartbeat;
  }

  markDirty(nodeId: string): void {
    this.dirtyNodes.add(nodeId);
  }

  clearDirty(): void {
    this.dirtyNodes.clear();
  }
}

export type { GossipEntry };
