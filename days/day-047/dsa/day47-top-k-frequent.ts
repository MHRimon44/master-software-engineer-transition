/** Day 47: Top K Frequent Elements — min-heap by frequency.
 * Time O(n log k), space O(n + k). Tie order is not specified.
 */
type Entry = { value: number; count: number };
class MinHeap {
  private items: Entry[] = [];
  get size(): number {
    return this.items.length;
  }
  push(entry: Entry): void {
    this.items.push(entry);
    let i = this.items.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      const parent = this.items[p];
      const child = this.items[i];
      if (!parent || !child || parent.count <= child.count) break;
      [this.items[p], this.items[i]] = [child, parent];
      i = p;
    }
  }
  pop(): Entry | undefined {
    if (!this.items.length) return undefined;
    const top = this.items[0];
    const last = this.items.pop();
    if (!top || !last) return top;
    if (this.items.length) {
      this.items[0] = last;
      let i = 0;
      while (true) {
        let m = i;
        const l = i * 2 + 1;
        const r = l + 1;
        if (this.items[l] && this.items[m] && this.items[l]!.count < this.items[m]!.count) m = l;
        if (this.items[r] && this.items[m] && this.items[r]!.count < this.items[m]!.count) m = r;
        if (m === i) break;
        const a = this.items[i];
        const b = this.items[m];
        if (!a || !b) break;
        [this.items[i], this.items[m]] = [b, a];
        i = m;
      }
    }
    return top;
  }
}
function topKFrequent(nums: number[], k: number): number[] {
  if (k < 1) return [];
  const freq = new Map<number, number>();
  for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);
  const heap = new MinHeap();
  for (const [value, count] of freq) {
    heap.push({ value, count });
    if (heap.size > k) heap.pop();
  }
  const answer: number[] = [];
  while (heap.size) {
    const entry = heap.pop();
    if (entry) answer.push(entry.value);
  }
  return answer;
}
function test(name: string, input: number[], k: number, expected: number[]) {
  const actual = topKFrequent(input, k).sort((a, b) => a - b);
  const want = [...expected].sort((a, b) => a - b);
  if (JSON.stringify(actual) !== JSON.stringify(want))
    throw new Error(`FAIL ${name}: ${actual} != ${want}`);
  console.log(`PASS | ${name}`);
}
test('Standard', [1, 1, 1, 2, 2, 3], 2, [1, 2]);
test('Single', [1], 1, [1]);
test('Negative', [-1, -1, 2, 2, 2, 3], 1, [2]);
test('All distinct k=n', [4, 5, 6], 3, [4, 5, 6]);
test('Empty', [], 2, []);
console.log('All Day 47 Top-K tests passed!');
export {};
