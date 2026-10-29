function combine(n: number, k: number): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(start: number): void {
    if (current.length === k) {
      result.push([...current]);
      return;
    }

    for (let i = start; i <= n; i++) {
      current.push(i);

      backtrack(i + 1);

      current.pop();
    }
  }

  backtrack(1);

  return result;
}

// Test 1
const result1 = combine(4, 2);

console.log('combine(4, 2):');
console.log(result1);
console.log('Total:', result1.length);

// Test 2
const result2 = combine(5, 3);

console.log('\ncombine(5, 3):');
console.log(result2);
console.log('Total:', result2.length);
/**
 * Pattern: Backtracking
 *
 * Time Complexity:
 * O(k * C(n, k))
 *
 * Auxiliary Space:
 * O(k)
 *
 * Key idea:
 * 1. Choose a number
 * 2. Explore recursively
 * 3. Remove the number (backtrack)
 */
