export function dailyTemperatures(temperatures: number[]): number[] {
  const answer = Array<number>(temperatures.length).fill(0);
  const stack: number[] = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[i]! > temperatures[stack[stack.length - 1]!]!) {
      const previous = stack.pop()!;
      answer[previous] = i - previous;
    }
    stack.push(i);
  }
  return answer;
}
function check(actual: number[], expected: number[]) {
  if (JSON.stringify(actual) !== JSON.stringify(expected))
    throw new Error(`Expected ${expected}, got ${actual}`);
}
check(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]), [1, 1, 4, 2, 1, 1, 0, 0]);
check(dailyTemperatures([30, 40, 50, 60]), [1, 1, 1, 0]);
check(dailyTemperatures([30, 60, 90]), [1, 1, 0]);
check(dailyTemperatures([]), []);
console.log('PASS: Day 54 Daily Temperatures (4 cases)');
