function numIslands(grid: string[][]): number {
  if (grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0]!.length;
  const visited = new Set<string>();

  const directions: [number, number][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function dfs(startRow: number, startCol: number): void {
    const stack: [number, number][] = [[startRow, startCol]];

    visited.add(`${startRow},${startCol}`);

    while (stack.length > 0) {
      const [row, col] = stack.pop()!;

      for (const [dr, dc] of directions) {
        const nr = row + dr;
        const nc = col + dc;
        const key = `${nr},${nc}`;

        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          grid[nr]![nc] === '1' &&
          !visited.has(key)
        ) {
          visited.add(key);
          stack.push([nr, nc]);
        }
      }
    }
  }

  let islands = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row]![col] === '1' && !visited.has(`${row},${col}`)) {
        islands++;
        dfs(row, col);
      }
    }
  }

  return islands;
}

const grid = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
];

console.log('Number of Islands:', numIslands(grid));
