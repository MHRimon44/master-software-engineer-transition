/**
 * Day 36: Maximum Depth of Binary Tree
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 * h = height of tree (recursion stack)
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

  console.log(`${passed ? 'PASS' : 'FAIL'} | ${name}`);

  console.log(`Expected: ${expected}, Actual: ${actual}`);

  if (!passed) {
    throw new Error(`Test failed: ${name}`);
  }
}

// Test 1: Empty tree
runTest('Empty tree', null, 0);

// Test 2: Single node
runTest('Single node', new TreeNode(1), 1);

// Test 3: Balanced tree
const balancedTree = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);

runTest('Balanced tree', balancedTree, 3);

// Test 4: Left-skewed tree
const leftSkewed = new TreeNode(1, new TreeNode(2, new TreeNode(3)));

runTest('Left-skewed tree', leftSkewed, 3);

// Test 5: Uneven tree
const unevenTree = new TreeNode(
  1,
  new TreeNode(2),
  new TreeNode(3, null, new TreeNode(4, null, new TreeNode(5))),
);

runTest('Uneven tree', unevenTree, 4);

console.log('All Day 36 DSA tests passed!');
