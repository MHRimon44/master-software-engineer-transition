// Kahn's algorithm: O(V + E) time and O(V + E) space.
export function topologicalSort(nodes: number, edges: Array<[number, number]>): number[] {
  const graph: number[][] = Array.from({ length: nodes }, () => []);
  const indegree = Array(nodes).fill(0) as number[];
  for (const [from, to] of edges) {
    if (from < 0 || to < 0 || from >= nodes || to >= nodes) throw new Error('Invalid vertex');
    graph[from].push(to);
    indegree[to]++;
  }
  const queue: number[] = [];
  for (let i = 0; i < nodes; i++) if (indegree[i] === 0) queue.push(i);
  const order: number[] = [];
  for (let head = 0; head < queue.length; head++) {
    const node = queue[head];
    order.push(node);
    for (const next of graph[node]) if (--indegree[next] === 0) queue.push(next);
  }
  if (order.length !== nodes) throw new Error('Cycle detected');
  return order;
}
const result = topologicalSort(4, [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
]);
console.log('Topological order:', result);
console.assert(result[0] === 0 && result[3] === 3, 'Unexpected order');
try {
  topologicalSort(2, [
    [0, 1],
    [1, 0],
  ]);
  throw new Error('Cycle test failed');
} catch (error) {
  if ((error as Error).message !== 'Cycle detected') throw error;
  console.log('Cycle test passed');
}
