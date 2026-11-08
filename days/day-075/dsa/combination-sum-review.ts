/**
 * Day 075 — DSA: Backtracking Review
 * Problem: Combination Sum
 *
 * Given an array of distinct positive integers and a target,
 * return all unique combinations that sum to the target.
 *
 * Each candidate can be used unlimited times.
 */

function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  // Sorting allows us to stop exploring when a number
  // is larger than the remaining target.
  const sortedCandidates = [...candidates].sort((a, b) => a - b);

  function backtrack(startIndex: number, remaining: number): void {
    // Found a valid combination.
    if (remaining === 0) {
      result.push([...path]);
      return;
    }

    for (let i = startIndex; i < sortedCandidates.length; i++) {
      const current = sortedCandidates[i];

      // All subsequent candidates are also too large.
      if (current > remaining) {
        break;
      }

      // Choose
      path.push(current);

      // Explore
      // Reuse i because candidates can be used repeatedly.
      backtrack(i, remaining - current);

      // Undo the choice (backtrack)
      path.pop();
    }
  }

  backtrack(0, target);

  return result;
}

// -------------------------------
// Test cases
// -------------------------------

console.log('Day 075 — Combination Sum Review');

console.log('Test 1:', combinationSum([2, 3, 6, 7], 7));
// Expected: [[2, 2, 3], [7]]

console.log('Test 2:', combinationSum([2, 3, 5], 8));
// Expected: [[2, 2, 2, 2], [2, 3, 3], [3, 5]]

console.log('Test 3:', combinationSum([2], 1));
// Expected: []

console.log('Test 4:', combinationSum([2, 3], 6));
// Expected: [[2, 2, 2], [3, 3]]

console.log('Test 5:', combinationSum([3, 4, 5], 9));
// Expected: [[3, 3, 3], [4, 5]]
