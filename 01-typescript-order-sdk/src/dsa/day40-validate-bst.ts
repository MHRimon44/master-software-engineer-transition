/**
 * Day 40: Validate Binary Search Tree
 *
 * LeetCode 98
 *
 * Time: O(n)
 * Space: O(h) recursive call stack
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

function isValidBST(root: TreeNode | null): boolean {
  function validate(node: TreeNode | null, min: number, max: number): boolean {
    if (node === null) {
      return true;
    }

    // Strict inequalities:
    // duplicate values are not allowed.
    if (node.val <= min || node.val >= max) {
      return false;
    }

    return (
      validate(node.left, min, node.val) && validate(node.right, node.val, max)
    );
  }

  return validate(root, -Infinity, Infinity);
}

function runTest(name: string, root: TreeNode | null, expected: boolean): void {
  const actual = isValidBST(root);
  const passed = actual === expected;

  console.log(`${passed ? "PASS" : "FAIL"} | ${name}`);

  console.log(`Expected: ${expected}, Actual: ${actual}`);

  if (!passed) {
    throw new Error(`Test failed: ${name}`);
  }
}

// Test 1: Empty tree
runTest("Empty tree", null, true);

// Test 2: Single node
runTest("Single node", new TreeNode(10), true);

// Test 3: Valid BST
const validTree = new TreeNode(
  8,
  new TreeNode(4, new TreeNode(2), new TreeNode(6)),
  new TreeNode(12, new TreeNode(10), new TreeNode(14)),
);

runTest("Valid BST", validTree, true);

// Test 4: Invalid immediate child
const invalidChild = new TreeNode(10, new TreeNode(12), new TreeNode(15));

runTest("Invalid immediate child", invalidChild, false);

// Test 5: Invalid deeper subtree
const invalidSubtree = new TreeNode(
  10,
  new TreeNode(5),
  new TreeNode(15, new TreeNode(6), new TreeNode(20)),
);

runTest("Invalid deeper subtree", invalidSubtree, false);

// Test 6: Duplicate value
const duplicateTree = new TreeNode(5, new TreeNode(5), new TreeNode(7));

runTest("Duplicate value", duplicateTree, false);

// Test 7: Valid negative values
const negativeTree = new TreeNode(-5, new TreeNode(-10), new TreeNode(0));

runTest("Negative values", negativeTree, true);

console.log("All Day 40 DSA tests passed!");
