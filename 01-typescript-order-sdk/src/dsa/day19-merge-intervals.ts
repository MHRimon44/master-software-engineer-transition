type Interval = [number, number];

function merge(intervals: Interval[]): Interval[] {
  if (intervals.length === 0) {
    return [];
  }

  intervals.sort((a, b) => a[0] - b[0]);

  const first = intervals[0]!;

  const merged: Interval[] = [[...first]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i]!;

    const last = merged[merged.length - 1]!;

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push([...current]);
    }
  }

  return merged;
}

console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ]),
);

// [
//   [1, 6],
//   [8, 10],
//   [15, 18]
// ]

// Time: O(n log n)
// Space: O(n)
