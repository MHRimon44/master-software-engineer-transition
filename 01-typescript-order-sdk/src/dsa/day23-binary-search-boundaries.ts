function findFirst(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  let answer = -1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
      answer = mid;
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

function findLast(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  let answer = -1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
      answer = mid;
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

function searchRange(nums: number[], target: number): number[] {
  return [findFirst(nums, target), findLast(nums, target)];
}

console.log(searchRange([5, 7, 7, 8, 8, 10], 8));

console.log(searchRange([5, 7, 7, 8, 8, 10], 6));

console.log(searchRange([2, 2, 2, 2], 2));

console.log(searchRange([], 2));
