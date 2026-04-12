import type { VirtualNode } from "./types";

export class ConsistentHashRing {
  private ring: Map<number, string> = new Map();
  private virtualNodesCount: number;

  constructor(virtualNodesCount = 100) {
    this.virtualNodesCount = virtualNodesCount;
  }

  addNode(nodeId: string): VirtualNode[] {
    const virtualNodes: VirtualNode[] = [];

    for (let i = 0; i < this.virtualNodesCount; i++) {
      const hash = this.hash(`${nodeId}#${i}`);
      this.ring.set(hash, nodeId);
      virtualNodes.push({
        hash,
        physicalNodeId: nodeId,
        position: hash / 0xffffffff,
      });
    }

    return virtualNodes;
  }

  removeNode(nodeId: string): void {
    for (const [hash, owner] of this.ring.entries()) {
      if (owner === nodeId) {
        this.ring.delete(hash);
      }
    }
  }

  getOwner(key: string): string | null {
    return this.getNodes(key, 1)[0] ?? null;
  }

  getNodes(key: string, count: number): string[] {
    const keyHash = this.hash(key);
    const sortedHashes = [...this.ring.keys()].sort((a, b) => a - b);

    if (sortedHashes.length === 0 || count <= 0) {
      return [];
    }

    const seen = new Set<string>();
    const result: string[] = [];

    let startIdx = sortedHashes.findIndex((h) => h >= keyHash);
    if (startIdx === -1) {
      startIdx = 0;
    }

    for (let i = 0; i < sortedHashes.length && result.length < count; i++) {
      const idx = (startIdx + i) % sortedHashes.length;
      const owner = this.ring.get(sortedHashes[idx]);
      if (!owner) {
        continue;
      }
      if (!seen.has(owner)) {
        seen.add(owner);
        result.push(owner);
      }
    }

    return result;
  }

  getRingEntries(): VirtualNode[] {
    return [...this.ring.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([hash, physicalNodeId]) => ({
        hash,
        physicalNodeId,
        position: hash / 0xffffffff,
      }));
  }

  private hash(key: string): number {
    // Fast deterministic FNV-1a variant for visualization.
    let hash = 0x811c9dc5;
    for (let i = 0; i < key.length; i++) {
      hash ^= key.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
  }
}
