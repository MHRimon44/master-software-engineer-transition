/**
 * Day 38: Binary Tree Zigzag Level Order
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null,
  ) {}
}

function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (root === null) {
    return [];
  }

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  let head = 0;
  let leftToRight = true;

  while (head < queue.length) {
    const levelSize = queue.length - head;

    const level: number[] = new Array<number>(levelSize);

    for (let i = 0; i < levelSize; i++) {
      const node = queue[head];

      if (node === undefined) {
        throw new Error("Unexpected empty queue");
      }

      head++;

      const index = leftToRight ? i : levelSize - 1 - i;

      level[index] = node.val;

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    result.push(level);
    leftToRight = !leftToRight;
  }

  return result;
}

function runTest(
  name: string,
  root: TreeNode | null,
  expected: number[][],
): void {
  const actual = zigzagLevelOrder(root);

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
runTest("Single node", new TreeNode(1), [[1]]);

// Test 3: Balanced tree
const balancedTree = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);

runTest("Balanced tree", balancedTree, [[3], [20, 9], [15, 7]]);

// Test 4: Left-skewed tree
const leftSkewed = new TreeNode(1, new TreeNode(2, new TreeNode(3)));

runTest("Left-skewed tree", leftSkewed, [[1], [2], [3]]);

// Test 5: Complete tree
const completeTree = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, new TreeNode(6), new TreeNode(7)),
);

runTest("Complete tree", completeTree, [[1], [3, 2], [4, 5, 6, 7]]);

console.log("All Day 38 DSA tests passed!");
