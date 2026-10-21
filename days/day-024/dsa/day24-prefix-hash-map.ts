function subarraySum(nums: number[], k: number): number {
  const prefixCount = new Map<number, number>();

  // Empty prefix:
  // sum = 0 has appeared once before processing anything.
  prefixCount.set(0, 1);

  let prefixSum = 0;
  let count = 0;

  for (const num of nums) {
    prefixSum += num;

    const requiredPrefix = prefixSum - k;

    count += prefixCount.get(requiredPrefix) ?? 0;

    prefixCount.set(prefixSum, (prefixCount.get(prefixSum) ?? 0) + 1);
  }

  return count;
}

console.log(subarraySum([1, 1, 1], 2)); // 2

console.log(subarraySum([1, 2, 3], 3)); // 2

console.log(subarraySum([1, -1, 0], 0)); // 3

console.log(subarraySum([], 0)); // 0
