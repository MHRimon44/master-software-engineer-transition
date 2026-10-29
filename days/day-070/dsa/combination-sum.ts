/**
 * Day 070 DSA
 * Pattern: Backtracking / Combination Sum
 *
 * Problem:
 * Given an array of distinct positive integers and a target,
 * return all combinations whose sum equals the target.
 *
 * A candidate may be used multiple times.
 */

function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(start: number, remaining: number): void {
    // We found a valid combination.
    if (remaining === 0) {
      result.push([...current]);
      return;
    }

    // Current path already exceeds the target.
    if (remaining < 0) {
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      const candidate = candidates[i];

      if (candidate === undefined) {
        continue;
      }

      current.push(candidate);

      // Same candidate can be reused.
      backtrack(i, remaining - candidate);

      current.pop();
    }
  }

  backtrack(0, target);

  return result;
}

// -------------------------
// Test 1
// -------------------------

const result1 = combinationSum([2, 3, 6, 7], 7);

console.log('Test 1:');
console.log('Candidates: [2, 3, 6, 7]');
console.log('Target: 7');
console.log(result1);

// Expected:
// [
//   [2, 2, 3],
//   [7]
// ]

// -------------------------
// Test 2
// -------------------------

const result2 = combinationSum([2, 3, 5], 8);

console.log('\nTest 2:');
console.log('Candidates: [2, 3, 5]');
console.log('Target: 8');
console.log(result2);

// Expected combinations:
// [
//   [2, 2, 2, 2],
//   [2, 3, 3],
//   [3, 5]
// ]

/**
 * Core Backtracking Pattern
 *
 * 1. Choose
 * 2. Explore
 * 3. Undo
 *
 * current.push(candidate);
 * backtrack(...);
 * current.pop();
 *
 *
 * Why backtrack(i)?
 *
 * The current candidate can be reused.
 *
 * Example:
 *
 * [2]
 * [2, 2]
 * [2, 2, 3]
 *
 * Therefore we recurse using `i`, not `i + 1`.
 *
 *
 * Why start?
 *
 * start prevents duplicate permutations.
 *
 * We want:
 *
 * [2, 2, 3]
 *
 * We do NOT separately want:
 *
 * [2, 3, 2]
 * [3, 2, 2]
 *
 * because those represent the same combination.
 *
 *
 * Complexity
 *
 * Backtracking complexity depends on the candidate values
 * and target because the search tree is input-dependent.
 *
 * A useful upper-bound intuition is exponential search.
 *
 * Recursion depth:
 * O(target / minCandidate)
 *
 * excluding the returned combinations.
 */
