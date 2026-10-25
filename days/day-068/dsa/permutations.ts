function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  const used = Array(nums.length).fill(false);

  function backtrack(): void {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      path.push(nums[i]);

      backtrack();

      path.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

function factorial(n: number): number {
  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

function test(input: number[]): void {
  const result = permute(input);
  const expectedCount = factorial(input.length);

  const unique = new Set(result.map((item) => JSON.stringify(item)));

  if (result.length !== expectedCount || unique.size !== expectedCount) {
    throw new Error(`Test failed for ${JSON.stringify(input)}`);
  }

  console.log(`PASS: ${JSON.stringify(input)} -> ${result.length} permutations`);
}

test([1, 2, 3]);
test([0, 1]);
test([1]);
test([]);

console.log('All permutation tests passed.');
