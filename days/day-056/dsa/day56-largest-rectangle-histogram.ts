function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [];
  let best = 0;
  for (let i = 0; i <= heights.length; i++) {
    const current = i === heights.length ? 0 : heights[i];
    while (stack.length && heights[stack[stack.length - 1]] > current) {
      const h = heights[stack.pop()!];
      const left = stack.length ? stack[stack.length - 1] : -1;
      best = Math.max(best, h * (i - left - 1));
    }
    stack.push(i);
  }
  return best;
}
const cases: [number[],number][] = [ [[2,1,5,6,2,3],10], [[2,4],4], [[1],1], [[],0], [[2,2,2],6] ];
for(const [input,expected] of cases){const actual=largestRectangleArea(input);if(actual!==expected)throw new Error(`Expected ${expected}, got ${actual}`);console.log('PASS',JSON.stringify(input),'→',actual)}
