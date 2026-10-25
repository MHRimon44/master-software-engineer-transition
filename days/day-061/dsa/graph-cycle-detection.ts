function hasCycle(graph: number[][]): boolean {
  const visited = new Set<number>();

  function dfs(node: number, parent: number): boolean {
    visited.add(node);

    for (const neighbor of graph[node]!) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, node)) {
          return true;
        }
      } else if (neighbor !== parent) {
        return true;
      }
    }

    return false;
  }

  for (let node = 0; node < graph.length; node++) {
    if (!visited.has(node)) {
      if (dfs(node, -1)) {
        return true;
      }
    }
  }

  return false;
}

// Contains cycle: 0 → 1 → 2 → 0
const cyclicGraph = [[1, 2], [0, 2], [0, 1, 3], [2]];

// No cycle
const acyclicGraph = [[1], [0, 2], [1, 3], [2]];

console.log('Cyclic graph:', hasCycle(cyclicGraph));
console.log('Acyclic graph:', hasCycle(acyclicGraph));
