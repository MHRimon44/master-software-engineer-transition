function runningSum(nums: number[]): number[] {
  const result: number[] = [];
  let sum = 0;

  for (const num of nums) {
    sum += num;
    result.push(sum);
  }

  return result;
}

console.log(runningSum([1, 2, 3, 4]));
