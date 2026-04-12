interface QuorumConfig {
  N: number;
  R: number;
  W: number;
  timeoutMs: number;
}

export interface QuorumWriteResult {
  success: boolean;
  achieved: number;
  version: number;
}

export interface QuorumReadResult {
  winnerNode: string | null;
  staleNodes: string[];
  achieved: number;
}

export class QuorumEngine {
  constructor(private config: QuorumConfig) {}

  async simulateWrite(
    key: string,
    replicas: string[],
    onRequest: (nodeId: string) => void,
    onResponse: (nodeId: string, success: boolean, version: number) => void,
  ): Promise<QuorumWriteResult> {
    const version = Date.now();
    let successCount = 0;

    for (const nodeId of replicas.slice(0, this.config.N)) {
      onRequest(nodeId);
      await this.delay(Math.random() * 200 + 50);

      const success = Math.random() > 0.1;
      if (success) {
        successCount += 1;
      }

      onResponse(nodeId, success, version);

      if (successCount >= this.config.W) {
        break;
      }
    }

    return {
      success: successCount >= this.config.W,
      achieved: successCount,
      version,
    };
  }

  async simulateRead(
    key: string,
    replicas: string[],
    nodeVersions: Map<string, number>,
    onRequest: (nodeId: string) => void,
    onResponse: (nodeId: string, version: number | null) => void,
  ): Promise<QuorumReadResult> {
    const responses: { nodeId: string; version: number }[] = [];

    for (const nodeId of replicas.slice(0, this.config.N)) {
      onRequest(nodeId);
      await this.delay(Math.random() * 150 + 50);
      const version = nodeVersions.get(nodeId) ?? null;
      if (version !== null) {
        responses.push({ nodeId, version });
      }
      onResponse(nodeId, version);

      if (responses.length >= this.config.R) {
        // Keep collecting in the UI path until N responses are shown.
      }
    }

    if (responses.length === 0) {
      return { winnerNode: null, staleNodes: [], achieved: 0 };
    }

    const winner = [...responses].sort((a, b) => b.version - a.version)[0];
    const staleNodes = responses
      .filter((resp) => resp.version < winner.version)
      .map((resp) => resp.nodeId);

    return {
      winnerNode: winner.nodeId,
      staleNodes,
      achieved: responses.length,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export type { QuorumConfig };
