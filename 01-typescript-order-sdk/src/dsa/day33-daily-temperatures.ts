/**
 * Day 33 - Monotonic Stack
 * LeetCode 739: Daily Temperatures
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;

  const result: number[] = new Array(n).fill(0);

  // Stores indices of days waiting for a warmer temperature.
  const stack: number[] = [];

  for (let currentDay = 0; currentDay < n; currentDay++) {
    const currentTemperature = temperatures[currentDay];

    // Strict TypeScript safety check.
    if (currentTemperature === undefined) {
      continue;
    }

    while (stack.length > 0) {
      const previousDay = stack[stack.length - 1];

      if (previousDay === undefined) {
        break;
      }

      const previousTemperature = temperatures[previousDay];

      if (
        previousTemperature === undefined ||
        previousTemperature >= currentTemperature
      ) {
        break;
      }

      // Current day is warmer than the previous unresolved day.
      stack.pop();

      result[previousDay] = currentDay - previousDay;
    }

    stack.push(currentDay);
  }

  return result;
}

// ----------------------
// TEST CASES
// ----------------------

console.log("Test 1:", dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));

console.log("Test 2:", dailyTemperatures([30, 40, 50, 60]));

console.log("Test 3:", dailyTemperatures([30, 60, 90]));

console.log("Test 4:", dailyTemperatures([90, 80, 70]));

console.log("Test 5:", dailyTemperatures([]));
