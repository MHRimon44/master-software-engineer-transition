type Graph = number[][];

function bfs(graph: Graph, start: number): number[] {
  const visited = new Set<number>([start]);
  const queue = [start];
  const result: number[] = [];

  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    result.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}

function dfs(graph: Graph, start: number): number[] {
  const visited = new Set<number>();
  const result: number[] = [];
  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop()!;

    if (visited.has(node)) continue;

    visited.add(node);
    result.push(node);

    for (let i = graph[node].length - 1; i >= 0; i--) {
      const neighbor = graph[node][i];

      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return result;
}

function topologicalSort(numCourses: number, prerequisites: number[][]): number[] {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);

  const indegree = Array(numCourses).fill(0);

  for (const [course, prerequisite] of prerequisites) {
    graph[prerequisite].push(course);
    indegree[course]++;
  }

  const queue: number[] = [];

  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  const order: number[] = [];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    order.push(node);

    for (const next of graph[node]) {
      indegree[next]--;

      if (indegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return order.length === numCourses ? order : [];
}

function assertEqual(actual: number[], expected: number[], name: string): void {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${name}: expected ${expected}, got ${actual}`);
  }

  console.log(`PASS: ${name}`);
}

const graph: Graph = [
  [1, 2],
  [0, 3],
  [0, 3],
  [1, 2],
];

assertEqual(bfs(graph, 0), [0, 1, 2, 3], 'BFS');
assertEqual(dfs(graph, 0), [0, 1, 3, 2], 'DFS');

assertEqual(
  topologicalSort(4, [
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2],
  ]),
  [0, 1, 2, 3],
  'Topological Sort',
);

assertEqual(
  topologicalSort(2, [
    [1, 0],
    [0, 1],
  ]),
  [],
  'Cycle Detection',
);

console.log('All graph review tests passed.');
