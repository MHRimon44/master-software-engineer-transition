/**
 * Day 39: Binary Tree Inorder Traversal
 * Approach: Iterative using an explicit stack
 *
 * Time Complexity: O(n)
 * Auxiliary Space: O(h)
 *
 * n = number of nodes
 * h = tree height
 */

class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null,
  ) {}
}

function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];

  let current: TreeNode | null = root;

  while (current !== null || stack.length > 0) {
    // Move to the leftmost node
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    // Visit the node
    const node = stack.pop();

    if (node === undefined) {
      throw new Error("Unexpected empty stack");
    }

    result.push(node.val);

    // Move to the right subtree
    current = node.right;
  }

  return result;
}

function runTest(
  name: string,
  root: TreeNode | null,
  expected: number[],
): void {
  const actual = inorderTraversal(root);

  const passed = JSON.stringify(actual) === JSON.stringify(expected);

  console.log(`${passed ? "PASS" : "FAIL"} | ${name}`);

  console.log("Expected:", JSON.stringify(expected));

  console.log("Actual:  ", JSON.stringify(actual));

  if (!passed) {
    throw new Error(`Test failed: ${name}`);
  }
}

// Test 1: Empty tree
runTest("Empty tree", null, []);

// Test 2: Single node
runTest("Single node", new TreeNode(1), [1]);

// Test 3: Balanced tree
const balancedTree = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3),
);

runTest("Balanced tree", balancedTree, [4, 2, 5, 1, 3]);

// Test 4: Left-skewed tree
const leftSkewed = new TreeNode(3, new TreeNode(2, new TreeNode(1)));

runTest("Left-skewed tree", leftSkewed, [1, 2, 3]);

// Test 5: Right-skewed tree
const rightSkewed = new TreeNode(
  1,
  null,
  new TreeNode(2, null, new TreeNode(3)),
);

runTest("Right-skewed tree", rightSkewed, [1, 2, 3]);

console.log("All Day 39 DSA tests passed!");
