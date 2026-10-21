function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const value = nums[mid]!;

    if (value === target) {
      return mid;
    }

    if (value < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9));

// 4
// Time: O(log n)
// Space: O(1)
