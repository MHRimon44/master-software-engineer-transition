/** Day 46: Kth Largest Element in an Array — min-heap, O(n log k) time, O(k) space. */
class MinHeap {
  private values: number[] = [];
  get size(): number {
    return this.values.length;
  }
  peek(): number | undefined {
    return this.values[0];
  }
  push(value: number): void {
    this.values.push(value);
    let i = this.values.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      const parentValue = this.values[parent];
      if (parentValue === undefined || parentValue <= value) break;
      this.values[i] = parentValue;
      i = parent;
    }
    this.values[i] = value;
  }
  pop(): number | undefined {
    if (this.values.length === 0) return undefined;
    const root = this.values[0];
    const last = this.values.pop();
    if (last === undefined || this.values.length === 0) return root;
    let i = 0;
    while (true) {
      const left = i * 2 + 1;
      if (left >= this.values.length) break;
      const right = left + 1;
      let child = left;
      if (right < this.values.length) {
        const lv = this.values[left];
        const rv = this.values[right];
        if (lv !== undefined && rv !== undefined && rv < lv) child = right;
      }
      const childValue = this.values[child];
      if (childValue === undefined || childValue >= last) break;
      this.values[i] = childValue;
      i = child;
    }
    this.values[i] = last;
    return root;
  }
}
function findKthLargest(nums: number[], k: number): number {
  if (!Number.isInteger(k) || k < 1 || k > nums.length)
    throw new RangeError("Invalid k");
  const heap = new MinHeap();
  for (const num of nums) {
    heap.push(num);
    if (heap.size > k) heap.pop();
  }
  const answer = heap.peek();
  if (answer === undefined) throw new Error("Unexpected empty heap");
  return answer;
}
function assertEqual(name: string, actual: number, expected: number): void {
  if (actual !== expected)
    throw new Error(`FAIL | ${name}: expected ${expected}, got ${actual}`);
  console.log(`PASS | ${name}`);
}
assertEqual("Example 1", findKthLargest([3, 2, 1, 5, 6, 4], 2), 5);
assertEqual(
  "Example 2 with duplicates",
  findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4),
  4,
);
assertEqual("Single element", findKthLargest([7], 1), 7);
assertEqual("Negative numbers", findKthLargest([-3, -1, -2], 2), -2);
assertEqual("K equals length", findKthLargest([9, 1, 4], 3), 1);
console.log("All Day 46 heap tests passed!");
export {};
