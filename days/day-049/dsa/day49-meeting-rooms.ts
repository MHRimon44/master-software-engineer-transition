// Day 49: Meeting Rooms II — Heap + Intervals. O(n log n) time, O(n) space.
type Meeting = readonly [number, number];
class MinHeap {
  private a: number[] = [];
  get size() { return this.a.length; }
  peek(): number | undefined { return this.a[0]; }
  push(v: number) { const a = this.a; a.push(v); let i = a.length - 1; while (i > 0) { const p = Math.floor((i - 1) / 2); if (a[p]! <= a[i]!) break; [a[p],a[i]] = [a[i]!,a[p]!]; i = p; } }
  pop(): number | undefined { const a = this.a; if (!a.length) return undefined; const first = a[0]!; const last = a.pop()!; if (a.length) { a[0] = last; let i = 0; while (true) { const l = i * 2 + 1, r = l + 1; let s = i; if (l < a.length && a[l]! < a[s]!) s = l; if (r < a.length && a[r]! < a[s]!) s = r; if (s === i) break; [a[i],a[s]] = [a[s]!,a[i]!]; i = s; } } return first; }
}
export function minMeetingRooms(intervals: readonly Meeting[]): number {
  const sorted = [...intervals].sort((a,b) => a[0]-b[0]); const ends = new MinHeap(); let peak = 0;
  for (const [start,end] of sorted) { if (end <= start) throw new Error('Meeting end must be after start'); while (ends.size && ends.peek()! <= start) ends.pop(); ends.push(end); peak = Math.max(peak, ends.size); }
  return peak;
}
const cases: Array<[string, Meeting[], number]> = [ ['Empty',[],0],['One',[[0,10]],1],['Overlapping',[[0,30],[5,10],[15,20]],2],['Non-overlapping',[[7,10],[2,4]],1],['Same start',[[0,5],[0,10],[0,20]],3],['Touching',[[0,5],[5,10]],1] ];
for (const [name, input, expected] of cases) { const actual = minMeetingRooms(input); if (actual !== expected) throw new Error(`${name}: expected ${expected}, got ${actual}`); console.log(`PASS | ${name}`); }
console.log('All Day 49 Heap + Intervals tests passed!');
