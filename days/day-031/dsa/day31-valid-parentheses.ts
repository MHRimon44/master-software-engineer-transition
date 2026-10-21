function isValidParentheses(input: string): boolean {
  const stack: string[] = [];

  const pairs: Record<string, string> = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const char of input) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
      continue;
    }

    const expectedOpening = pairs[char];

    if (expectedOpening === undefined) {
      return false;
    }

    const lastOpening = stack.pop();

    if (lastOpening !== expectedOpening) {
      return false;
    }
  }

  return stack.length === 0;
}

const testCases = ["()", "()[]{}", "(]", "([{}])", "([)]", "{[]}", "(", "]"];

for (const testCase of testCases) {
  console.log(`${testCase} -> ${isValidParentheses(testCase)}`);
}
