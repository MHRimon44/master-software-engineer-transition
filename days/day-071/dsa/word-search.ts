function exist(board: string[][], word: string): boolean {
  const rows = board.length;

  if (rows === 0) {
    return false;
  }

  const firstRow = board[0];

  if (firstRow === undefined) {
    return false;
  }

  const cols = firstRow.length;

  function backtrack(row: number, col: number, index: number): boolean {
    // Entire word has been matched.
    if (index === word.length) {
      return true;
    }

    // Constraint pruning:
    // Stop if position is outside the board.
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return false;
    }

    const currentRow = board[row];

    if (currentRow === undefined) {
      return false;
    }

    const cell = currentRow[col];
    const expectedCharacter = word[index];

    // Constraint pruning:
    // Stop immediately when the character does not match.
    if (cell === undefined || expectedCharacter === undefined || cell !== expectedCharacter) {
      return false;
    }

    // Mark this cell as visited.
    currentRow[col] = '#';

    const found =
      backtrack(row + 1, col, index + 1) ||
      backtrack(row - 1, col, index + 1) ||
      backtrack(row, col + 1, index + 1) ||
      backtrack(row, col - 1, index + 1);

    // Restore the board for other search paths.
    currentRow[col] = cell;

    return found;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (backtrack(row, col, 0)) {
        return true;
      }
    }
  }

  return false;
}

// Test 1
const board1 = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E'],
];

console.log('ABCCED:', exist(board1, 'ABCCED'));
// Expected: true

// Test 2
const board2 = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E'],
];

console.log('SEE:', exist(board2, 'SEE'));
// Expected: true

// Test 3
const board3 = [
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E'],
];

console.log('ABCB:', exist(board3, 'ABCB'));
// Expected: false

/**
 * Pattern:
 * Backtracking + Constraint Pruning
 *
 * Main idea:
 * 1. Choose a starting cell.
 * 2. Check whether it matches the required character.
 * 3. Mark it visited.
 * 4. Explore four directions.
 * 5. Stop invalid paths immediately.
 * 6. Restore the cell during backtracking.
 *
 * Time Complexity:
 * O(R * C * 4^L)
 *
 * R = rows
 * C = columns
 * L = word length
 *
 * Space Complexity:
 * O(L)
 *
 * Recursive call stack can grow to the word length.
 */
