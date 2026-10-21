/**
 * Day 41 — Maximum Depth of Binary Tree
 * LeetCode 104
 *
 * Time: O(n)
 * Space: O(h) recursion stack
 */

class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null,
  ) {}
}

function maxDepth(root: TreeNode | null): number {
  if (root === null) {
    return 0;
  }

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return 1 + Math.max(leftDepth, rightDepth);
}

function runTest(name: string, root: TreeNode | null, expected: number): void {
  const actual = maxDepth(root);
  const passed = actual === expected;

  console.log(`${passed ? "PASS" : "FAIL"} | ${name}`);

  if (!passed) {
    throw new Error(`${name}: expected ${expected}, got ${actual}`);
  }
}

// Test 1: Empty tree
runTest("Empty tree", null, 0);

// Test 2: Single node
runTest("Single node", new TreeNode(1), 1);

// Test 3: Balanced tree
const balanced = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);

runTest("Balanced tree", balanced, 3);

// Test 4: Left-skewed tree
const leftSkewed = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(3, new TreeNode(4))),
);

runTest("Left-skewed tree", leftSkewed, 4);

// Test 5: Right-skewed tree
const rightSkewed = new TreeNode(
  1,
  null,
  new TreeNode(2, null, new TreeNode(3)),
);

runTest("Right-skewed tree", rightSkewed, 3);

// Test 6: Uneven tree
const uneven = new TreeNode(
  10,
  new TreeNode(5),
  new TreeNode(15, new TreeNode(12, new TreeNode(11))),
);

runTest("Uneven tree", uneven, 4);

console.log("All Day 41 DSA tests passed!");
