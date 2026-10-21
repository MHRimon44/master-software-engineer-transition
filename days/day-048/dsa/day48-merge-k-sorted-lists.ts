type ListNode = { val: number; next: ListNode | null };

class MinHeap {
  private data: ListNode[] = [];
  get size(): number { return this.data.length; }
  push(node: ListNode): void {
    this.data.push(node);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[p]!.val <= this.data[i]!.val) break;
      [this.data[p], this.data[i]] = [this.data[i]!, this.data[p]!];
      i = p;
    }
  }
  pop(): ListNode | undefined {
    const root = this.data[0];
    const last = this.data.pop();
    if (this.data.length && last) {
      this.data[0] = last;
      let i = 0;
      while (true) {
        const l = i * 2 + 1, r = l + 1;
        let smallest = i;
        if (l < this.data.length && this.data[l]!.val < this.data[smallest]!.val) smallest = l;
        if (r < this.data.length && this.data[r]!.val < this.data[smallest]!.val) smallest = r;
        if (smallest === i) break;
        [this.data[i], this.data[smallest]] = [this.data[smallest]!, this.data[i]!];
        i = smallest;
      }
    }
    return root;
  }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const heap = new MinHeap();
  for (const node of lists) if (node) heap.push(node);
  const dummy: ListNode = { val: 0, next: null };
  let tail = dummy;
  while (heap.size) {
    const node = heap.pop();
    if (!node) throw new Error('Heap invariant violated');
    if (node.next) heap.push(node.next);
    tail.next = node;
    tail = node;
  }
  tail.next = null;
  return dummy.next;
}
function makeList(nums: number[]): ListNode | null {
  let head: ListNode | null = null;
  for (let i = nums.length - 1; i >= 0; i--) head = { val: nums[i]!, next: head };
  return head;
}
function values(head: ListNode | null): number[] {
  const result: number[] = [];
  for (let n = head; n; n = n.next) result.push(n.val);
  return result;
}
function test(name: string, lists: number[][], expected: number[]): void {
  const actual = values(mergeKLists(lists.map(makeList)));
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`${name}: ${JSON.stringify(actual)}`);
  console.log(`PASS | ${name}`);
}
test('Empty input', [], []);
test('Empty lists', [[], []], []);
test('Single list', [[1, 2, 3]], [1, 2, 3]);
test('Classic example', [[1, 4, 5], [1, 3, 4], [2, 6]], [1, 1, 2, 3, 4, 4, 5, 6]);
test('Negative and duplicates', [[-5, 0], [-3, 0, 9]], [-5, -3, 0, 0, 9]);
console.log('All Day 48 Merge K Sorted Lists tests passed!');
export {};
