function subsetsWithDup(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);

  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(start: number): void {
    result.push([...current]);

    for (let i = start; i < nums.length; i += 1) {
      const currentNumber = nums[i];

      if (currentNumber === undefined) {
        continue;
      }

      if (i > start && currentNumber === nums[i - 1]) {
        continue;
      }

      current.push(currentNumber);

      backtrack(i + 1);

      current.pop();
    }
  }

  backtrack(0);

  return result;
}

// Test 1
console.log('Input: [1, 2, 2]');

console.log(subsetsWithDup([1, 2, 2]));

// Test 2
console.log('Input: [0]');

console.log(subsetsWithDup([0]));

// Test 3
console.log('Input: [1, 1, 2, 2]');

console.log(subsetsWithDup([1, 1, 2, 2]));
