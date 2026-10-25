// Day 56 PDF DSA: Topological Sort (Kahn's algorithm)
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  const indegree = Array(numCourses).fill(0);
  for (const [course, pre] of prerequisites) {
    if (course === undefined || pre === undefined || !graph[pre] || !graph[course]) {
      throw new RangeError('Invalid course dependency');
    }
    graph[pre]!.push(course);
    indegree[course] = indegree[course]! + 1;
  }
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);
  let head = 0,
    seen = 0;
  while (head < queue.length) {
    const node = queue[head++]!;
    seen++;
    for (const next of graph[node]!) if (--indegree[next] === 0) queue.push(next);
  }
  return seen === numCourses;
}
const tests: [number, number[][], boolean][] = [
  [2, [[1, 0]], true],
  [
    2,
    [
      [1, 0],
      [0, 1],
    ],
    false,
  ],
  [3, [], true],
];
for (const [n, p, expected] of tests) {
  const actual = canFinish(n, p);
  if (actual !== expected) throw new Error(`Expected ${expected}, got ${actual}`);
  console.log({ n, prerequisites: p, actual });
}
// O(V + E) time; O(V + E) space. Re-solve one previous DSA from memory.
