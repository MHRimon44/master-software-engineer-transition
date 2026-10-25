function shortestPath(graph: number[][], start: number, target: number): number {
  const distance = Array(graph.length).fill(-1);
  const queue: number[] = [start];
  let head = 0;

  distance[start] = 0;

  while (head < queue.length) {
    const node = queue[head++];

    if (node === target) {
      return distance[node];
    }

    for (const neighbor of graph[node]) {
      if (distance[neighbor] === -1) {
        distance[neighbor] = distance[node] + 1;
        queue.push(neighbor);
      }
    }
  }

  return -1;
}

const graph = [
  [1, 2],
  [0, 3],
  [0, 4],
  [1, 5],
  [2, 5],
  [3, 4],
];

console.log(shortestPath(graph, 0, 5)); // 3
