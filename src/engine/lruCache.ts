export interface LRUNode {
  key: string;
  memorySize: number;
  lastAccess: number;
}

export class LRUCache {
  private order: LRUNode[] = [];
  private maxMemoryBytes: number;
  private currentMemory = 0;

  constructor(maxMemoryBytes: number) {
    this.maxMemoryBytes = maxMemoryBytes;
  }

  access(key: string): { promoted: boolean; position: number } {
    const index = this.order.findIndex((node) => node.key === key);
    if (index === -1) {
      return { promoted: false, position: -1 };
    }

    const [node] = this.order.splice(index, 1);
    node.lastAccess = Date.now();
    this.order.unshift(node);

    return { promoted: true, position: 0 };
  }

  put(key: string, memorySize: number): { evicted: string[] } {
    const evicted: string[] = [];

    const existingIndex = this.order.findIndex((node) => node.key === key);
    if (existingIndex >= 0) {
      const [existing] = this.order.splice(existingIndex, 1);
      this.currentMemory -= existing.memorySize;
    }

    while (this.currentMemory + memorySize > this.maxMemoryBytes && this.order.length > 0) {
      const victim = this.order.pop();
      if (!victim) {
        break;
      }
      this.currentMemory -= victim.memorySize;
      evicted.push(victim.key);
    }

    const node: LRUNode = {
      key,
      memorySize,
      lastAccess: Date.now(),
    };

    this.order.unshift(node);
    this.currentMemory += memorySize;

    return { evicted };
  }

  getOrder(): LRUNode[] {
    return [...this.order];
  }

  getMemoryUsage(): { current: number; max: number } {
    return { current: this.currentMemory, max: this.maxMemoryBytes };
  }

  reset(initialEntries?: LRUNode[]): void {
    this.order = [];
    this.currentMemory = 0;

    if (!initialEntries?.length) {
      return;
    }

    for (const entry of initialEntries) {
      this.put(entry.key, entry.memorySize);
    }
  }
}
