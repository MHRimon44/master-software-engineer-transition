// Day 51 DSA: LRU Cache — O(1) average get and put using Map insertion order.
class LRUCache {
  private cache = new Map<number, number>();
  constructor(private capacity: number) {
    if (capacity <= 0) throw new Error('capacity must be positive');
  }
  get(key: number): number {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  put(key: number, value: number): void {
    this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      const oldest = this.cache.keys().next().value;
      if (oldest !== undefined) this.cache.delete(oldest);
    }
  }
}
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.assert(cache.get(1) === 1);
cache.put(3, 3);
console.assert(cache.get(2) === -1);
cache.put(4, 4);
console.assert(cache.get(1) === -1);
console.assert(cache.get(3) === 3);
console.assert(cache.get(4) === 4);
console.log('Day 51 LRU Cache assertions passed');
