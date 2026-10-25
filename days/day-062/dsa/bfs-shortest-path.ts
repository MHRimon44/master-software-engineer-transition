type Graph = Record<string, string[]>;

function bfsShortestPath(graph: Graph, start: string, target: string): string[] | null {
  if (!(start in graph) || !(target in graph)) {
    return null;
  }

  const queue: string[] = [start];
  let head = 0;

  const visited = new Set<string>([start]);
  const parent = new Map<string, string | null>();

  parent.set(start, null);

  while (head < queue.length) {
    const current = queue[head++]!;

    if (current === target) {
      const path: string[] = [];
      let node: string | null = target;

      while (node !== null) {
        path.push(node);
        node = parent.get(node) ?? null;
      }

      return path.reverse();
    }

    for (const neighbor of graph[current] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, current);
        queue.push(neighbor);
      }
    }
  }

  return null;
}

const graph: Graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C', 'E'],
  E: ['D'],
};

console.log('Shortest Path A → E:', bfsShortestPath(graph, 'A', 'E'));

console.log('Shortest Path B → C:', bfsShortestPath(graph, 'B', 'C'));

console.log('Same Node:', bfsShortestPath(graph, 'A', 'A'));

console.log('Unknown Node:', bfsShortestPath(graph, 'A', 'Z'));
