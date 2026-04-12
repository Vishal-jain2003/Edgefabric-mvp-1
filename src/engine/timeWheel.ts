export class TimeWheel {
  private readonly bucketCount = 60;
  private buckets: Set<string>[] = Array.from({ length: 60 }, () => new Set());
  private currentBucket = 0;
  private keyBucketMap: Map<string, number> = new Map();

  addKey(key: string, expiryTimeMs: number): number {
    const nowMs = Date.now();
    const delaySeconds = Math.floor((expiryTimeMs - nowMs) / 1000);
    const bucketIndex = this.normalize((this.currentBucket + delaySeconds) % this.bucketCount);

    const oldBucket = this.keyBucketMap.get(key);
    if (oldBucket !== undefined) {
      this.buckets[oldBucket].delete(key);
    }

    this.buckets[bucketIndex].add(key);
    this.keyBucketMap.set(key, bucketIndex);

    return bucketIndex;
  }

  tick(): { expiredKeys: string[]; newBucket: number } {
    const bucket = this.buckets[this.currentBucket];
    const expiredKeys = [...bucket];

    bucket.clear();
    for (const key of expiredKeys) {
      this.keyBucketMap.delete(key);
    }

    this.currentBucket = (this.currentBucket + 1) % this.bucketCount;

    return { expiredKeys, newBucket: this.currentBucket };
  }

  getCurrentBucket(): number {
    return this.currentBucket;
  }

  getBuckets(): { index: number; keys: string[]; isCurrent: boolean }[] {
    return this.buckets.map((bucket, index) => ({
      index,
      keys: [...bucket],
      isCurrent: index === this.currentBucket,
    }));
  }

  reset(): void {
    this.buckets = Array.from({ length: this.bucketCount }, () => new Set());
    this.currentBucket = 0;
    this.keyBucketMap.clear();
  }

  private normalize(value: number): number {
    return value >= 0 ? value : value + this.bucketCount;
  }
}
