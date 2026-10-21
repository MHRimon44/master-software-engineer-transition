function searchInsert(nums: number[], target: number): number {
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

  return left;
}

console.log(searchInsert([1, 3, 5, 6], 5));

// 2

console.log(searchInsert([1, 3, 5, 6], 2));

// 1

// Time: O(log n)
// Space: O(1)
