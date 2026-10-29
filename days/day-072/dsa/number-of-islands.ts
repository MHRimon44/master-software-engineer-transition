/**
 * Day 72 DSA
 *
 * Problem: Number of Islands
 * Pattern: Grid Traversal / DFS
 *
 * Given a 2D grid containing:
 *
 * "1" = land
 * "0" = water
 *
 * Return the number of separate islands.
 *
 * An island is connected horizontally or vertically.
 */

function numIslands(grid: string[][]): number {
  if (grid.length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;

  if (cols === 0) {
    return 0;
  }

  let islandCount = 0;

  function dfs(row: number, col: number): void {
    // Out of bounds
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return;
    }

    const currentRow = grid[row];

    if (currentRow === undefined) {
      return;
    }

    // Water or already visited
    if (currentRow[col] !== '1') {
      return;
    }

    // Mark current land as visited
    currentRow[col] = '0';

    // Explore four directions
    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const currentRow = grid[row];

      if (currentRow === undefined) {
        continue;
      }

      if (currentRow[col] === '1') {
        islandCount++;

        dfs(row, col);
      }
    }
  }

  return islandCount;
}

// -------------------------
// Test 1
// -------------------------

const grid1: string[][] = [
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0'],
];

console.log('Test 1');
console.log('Expected: 1');
console.log('Result:', numIslands(grid1));

// -------------------------
// Test 2
// -------------------------

const grid2: string[][] = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
];

console.log('\nTest 2');
console.log('Expected: 3');
console.log('Result:', numIslands(grid2));

// -------------------------
// Test 3
// -------------------------

const grid3: string[][] = [
  ['0', '0', '0'],
  ['0', '0', '0'],
];

console.log('\nTest 3');
console.log('Expected: 0');
console.log('Result:', numIslands(grid3));

/**
 * Time Complexity:
 *
 * O(R * C)
 *
 * R = number of rows
 * C = number of columns
 *
 * Every cell is visited at most once.
 *
 *
 * Space Complexity:
 *
 * O(R * C)
 *
 * Worst case:
 * the entire grid is land and DFS recursion
 * can grow with the number of cells.
 *
 *
 * Core Pattern:
 *
 * 1. Scan every cell.
 * 2. When unvisited land is found:
 *      - we discovered a new island
 *      - increase islandCount
 * 3. DFS from that cell.
 * 4. Mark connected land as visited.
 * 5. Continue scanning.
 */
