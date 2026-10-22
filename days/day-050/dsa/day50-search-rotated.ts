// Day 50 DSA: Search in Rotated Sorted Array (unique numbers).
// Time O(log n), extra space O(1).
export function searchRotated(nums: number[], target: number): number {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      // left half sorted
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      // right half sorted
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}
const cases: Array<[number[], number, number]> = [
  [[4, 5, 6, 7, 0, 1, 2], 0, 4],
  [[4, 5, 6, 7, 0, 1, 2], 3, -1],
  [[1], 0, -1],
  [[1], 1, 0],
  [[], 2, -1],
  [[3, 1], 1, 1],
];
for (const [nums, target, expected] of cases) {
  const actual = searchRotated(nums, target);
  if (actual !== expected)
    throw new Error(`Failed ${JSON.stringify(nums)} target ${target}: ${actual} !== ${expected}`);
  console.log('PASS', nums, target, '=>', actual);
}
console.log('All Day 50 DSA tests passed');
