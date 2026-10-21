/**
 * Day 44 DSA
 *
 * Problem:
 * Binary Tree Level Order Traversal
 *
 * Technique:
 * Breadth-First Search (BFS)
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(
    val: number,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) {
    return [];
  }

  const result: number[][] = [];

  const queue: TreeNode[] = [root];

  let head = 0;

  while (head < queue.length) {
    const levelSize = queue.length - head;

    const currentLevel: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue[head++];

      if (node === undefined) {
        throw new Error("Unexpected empty BFS queue");
      }

      currentLevel.push(node.val);

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    result.push(currentLevel);
  }

  return result;
}

/* =====================================
   TEST HELPERS
===================================== */

function assertEqual(
  name: string,
  actual: number[][],
  expected: number[][],
): void {
  const actualString = JSON.stringify(actual);
  const expectedString = JSON.stringify(expected);

  if (actualString !== expectedString) {
    throw new Error(
      `FAIL | ${name}\nExpected: ${expectedString}\nActual: ${actualString}`,
    );
  }

  console.log(`PASS | ${name}`);
}

/* =====================================
   TEST CASES
===================================== */

// Test 1: Empty tree

assertEqual("Empty tree", levelOrder(null), []);

// Test 2: Single node

assertEqual("Single node", levelOrder(new TreeNode(1)), [[1]]);

// Test 3: Balanced tree

const balancedTree = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);

assertEqual("Balanced tree", levelOrder(balancedTree), [[3], [9, 20], [15, 7]]);

// Test 4: Left-skewed tree

const leftTree = new TreeNode(1, new TreeNode(2, new TreeNode(3)));

assertEqual("Left-skewed tree", levelOrder(leftTree), [[1], [2], [3]]);

// Test 5: Right-skewed tree

const rightTree = new TreeNode(1, null, new TreeNode(2, null, new TreeNode(3)));

assertEqual("Right-skewed tree", levelOrder(rightTree), [[1], [2], [3]]);

console.log("\nAll Day 44 Level Order Traversal tests passed!");

export {};
