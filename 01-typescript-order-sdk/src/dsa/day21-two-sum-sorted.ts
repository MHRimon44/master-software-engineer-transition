function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const leftValue = numbers[left]!;

    const rightValue = numbers[right]!;

    const sum = leftValue + rightValue;

    if (sum === target) {
      return [left + 1, right + 1];
    }

    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));

// [1, 2]

// Time: O(n)
// Space: O(1)
