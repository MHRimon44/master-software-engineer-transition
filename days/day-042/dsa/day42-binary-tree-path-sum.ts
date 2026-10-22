/**
 * Day 42: Binary Tree Path Sum
 * LeetCode 112
 *
 * Time: O(n)
 * Space: O(h)
 *
 * h = tree height
 */

class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null,
  ) {}
}

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (root === null) {
    return false;
  }

  const remaining = targetSum - root.val;

  // A path must end at a leaf.
  if (root.left === null && root.right === null) {
    return remaining === 0;
  }

  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}

function runTest(name: string, root: TreeNode | null, target: number, expected: boolean): void {
  const actual = hasPathSum(root, target);

  const passed = actual === expected;

  console.log(`${passed ? 'PASS' : 'FAIL'} | ${name}`);

  if (!passed) {
    throw new Error(`${name}: expected ${expected}, got ${actual}`);
  }
}

// Test 1: Empty tree
runTest('Empty tree', null, 0, false);

// Test 2: Single node matches
runTest('Single node matches', new TreeNode(5), 5, true);

// Test 3: Single node does not match
runTest('Single node mismatch', new TreeNode(5), 10, false);

// Test 4: Valid root-to-leaf path
const tree = new TreeNode(
  5,
  new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
  new TreeNode(8, new TreeNode(13), new TreeNode(4, null, new TreeNode(1))),
);

runTest('Valid path sum 22', tree, 22, true);

// Test 5: No matching path
runTest('No matching path', tree, 100, false);

// Test 6: Negative values
const negativeTree = new TreeNode(-2, null, new TreeNode(-3));

runTest('Negative path sum', negativeTree, -5, true);

// Test 7: Non-leaf match is invalid
const nonLeaf = new TreeNode(1, new TreeNode(2));

runTest('Non-leaf cannot finish path', nonLeaf, 1, false);

console.log('All Day 42 DSA tests passed!');
