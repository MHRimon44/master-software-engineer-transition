function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const current: number[] = [];
  const used = new Array<boolean>(nums.length).fill(false);

  function backtrack(): void {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < nums.length; i += 1) {
      const value = nums[i];

      if (value === undefined || used[i]) {
        continue;
      }

      // Choose
      used[i] = true;
      current.push(value);

      // Explore
      backtrack();

      // Unchoose
      current.pop();
      used[i] = false;
    }
  }

  backtrack();

  return result;
}

// Test 1
console.log('Input: [1, 2, 3]');
console.log(permute([1, 2, 3]));

// Test 2
console.log('Input: [0, 1]');
console.log(permute([0, 1]));

// Test 3
console.log('Input: [1]');
console.log(permute([1]));
