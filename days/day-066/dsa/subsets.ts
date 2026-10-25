function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  function backtrack(start: number): void {
    result.push([...path]);

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);

      backtrack(i + 1);

      path.pop();
    }
  }

  backtrack(0);

  return result;
}

function test(input: number[], expectedCount: number): void {
  const result = subsets(input);

  const unique = new Set(result.map((item) => JSON.stringify(item)));

  const passed = result.length === expectedCount && unique.size === expectedCount;

  if (!passed) {
    throw new Error(`Failed for input ${JSON.stringify(input)}`);
  }

  console.log(`PASS: ${JSON.stringify(input)} -> ${result.length} subsets`);
}

test([1, 2, 3], 8);
test([0], 2);
test([], 1);
test([1, 2, 3, 4], 16);

console.log('All backtracking tests passed.');
