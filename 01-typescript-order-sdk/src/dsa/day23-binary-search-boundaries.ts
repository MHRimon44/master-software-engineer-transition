function findFirst(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const value = nums[mid]!;

    if (value === target) {
      result = mid;

      right = mid - 1;
    } else if (value < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

function findLast(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const value = nums[mid]!;

    if (value === target) {
      result = mid;

      left = mid + 1;
    } else if (value < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

function searchRange(nums: number[], target: number): [number, number] {
  return [findFirst(nums, target), findLast(nums, target)];
}

console.log(searchRange([5, 7, 7, 8, 8, 10], 8));

// [3, 4]

// Time: O(log n)
// Space: O(1)
