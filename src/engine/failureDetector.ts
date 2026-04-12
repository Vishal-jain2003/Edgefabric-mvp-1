import type { CacheNode } from "./types";

export class FailureDetector {
  private pingTimeout = 500;
  private indirectFanout = 3;
  private suspectTimeout = 10000;
  private suspectStartTimes: Map<string, number> = new Map();

  async probe(
    target: CacheNode,
    helpers: CacheNode[],
    onPing: (target: string, success: boolean) => void,
    onPingReq: (helper: string, target: string, success: boolean) => void,
  ): Promise<"ALIVE" | "SUSPECT"> {
    await this.delay(Math.random() * this.pingTimeout);

    const directSuccess = Math.random() > 0.1;
    onPing(target.id, directSuccess);

    if (directSuccess) {
      this.suspectStartTimes.delete(target.id);
      return "ALIVE";
    }

    let indirectSuccess = false;
    for (const helper of helpers.slice(0, this.indirectFanout)) {
      await this.delay(Math.random() * this.pingTimeout * 0.5);
      const success = Math.random() > 0.15;
      onPingReq(helper.id, target.id, success);
      if (success) {
        indirectSuccess = true;
        break;
      }
    }

    if (indirectSuccess) {
      this.suspectStartTimes.delete(target.id);
      return "ALIVE";
    }

    if (!this.suspectStartTimes.has(target.id)) {
      this.suspectStartTimes.set(target.id, Date.now());
    }

    return "SUSPECT";
  }

  checkSuspectTimeouts(): string[] {
    const now = Date.now();
    const deadNodes: string[] = [];

    for (const [nodeId, startTime] of this.suspectStartTimes.entries()) {
      if (now - startTime > this.suspectTimeout) {
        deadNodes.push(nodeId);
        this.suspectStartTimes.delete(nodeId);
      }
    }

    return deadNodes;
  }

  refuteSelf(nodeId: string): void {
    this.suspectStartTimes.delete(nodeId);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
