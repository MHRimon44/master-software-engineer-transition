export function isValid(s: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  for (const c of s) {
    if (c === '(' || c === '[' || c === '{') stack.push(c);
    else if (pairs[c] && stack.pop() !== pairs[c]) return false;
    else if (!pairs[c]) return false;
  }
  return stack.length === 0;
}
const cases: [string, boolean][] = [
  ['()', true],
  ['()[]{}', true],
  ['(]', false],
  ['([)]', false],
  ['{[]}', true],
  ['', true],
];
for (const [input, expected] of cases) {
  const actual = isValid(input);
  if (actual !== expected) throw new Error(`Failed: ${input}`);
  console.log(`PASS ${JSON.stringify(input)}`);
}
