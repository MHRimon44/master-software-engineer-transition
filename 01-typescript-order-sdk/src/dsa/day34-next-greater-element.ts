/**
 * Day 34 — Next Greater Element
 *
 * Data Structure: Monotonic Stack
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

export function nextGreaterElement(nums: number[]): number[] {
  const n = nums.length;

  const result: number[] = new Array<number>(n).fill(-1);

  // Store indices of elements waiting for
  // their next greater element.
  const stack: number[] = [];

  for (let i = 0; i < n; i++) {
    const current = nums[i];

    if (current === undefined) {
      continue;
    }

    while (stack.length > 0) {
      const previousIndex = stack[stack.length - 1];

      if (previousIndex === undefined) {
        break;
      }

      const previousValue = nums[previousIndex];

      if (previousValue === undefined || current <= previousValue) {
        break;
      }

      stack.pop();

      result[previousIndex] = current;
    }

    stack.push(i);
  }

  return result;
}

// ======================================================
// TEST CASES
// ======================================================

function runTest(input: number[], expected: number[]): void {
  const actual = nextGreaterElement(input);

  const passed = JSON.stringify(actual) === JSON.stringify(expected);

  console.log(`${passed ? "PASS" : "FAIL"} | Input: ${JSON.stringify(input)}`);

  console.log("Expected:", expected);
  console.log("Actual:  ", actual);

  if (!passed) {
    throw new Error("Test failed");
  }
}

runTest([4, 5, 2, 10, 8], [5, 10, 10, -1, -1]);

runTest([1, 3, 2, 4], [3, 4, 4, -1]);

runTest([6, 5, 4, 3], [-1, -1, -1, -1]);

runTest([2, 2, 2], [-1, -1, -1]);

runTest([], []);

console.log("\nAll Day 34 DSA tests passed!");
