function subsetsWithDup(nums: number[]): number[][] {
  const sorted = [...nums].sort((a, b) => a - b);

  const result: number[][] = [];
  const path: number[] = [];

  function backtrack(start: number): void {
    result.push([...path]);

    for (let i = start; i < sorted.length; i++) {
      if (i > start && sorted[i] === sorted[i - 1]) {
        continue;
      }

      path.push(sorted[i]);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(0);

  return result;
}

function test(input: number[], expectedCount: number): void {
  const output = subsetsWithDup(input);

  const unique = new Set(output.map((subset) => JSON.stringify(subset)));

  if (output.length !== expectedCount || unique.size !== expectedCount) {
    throw new Error(`Failed: ${JSON.stringify(input)} -> ${output.length}`);
  }

  console.log(`PASS: ${JSON.stringify(input)} -> ${output.length} unique subsets`);
}

test([1, 2, 2], 6);
test([0], 2);
test([2, 2, 2], 4);
test([], 1);
test([1, 2, 3], 8);

console.log('All Subsets II tests passed.');
