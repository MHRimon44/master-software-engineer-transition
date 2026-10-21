class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null,
  ) {}
}

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode,
): TreeNode | null {
  let current = root;

  while (current !== null) {
    if (p.val < current.val && q.val < current.val) {
      current = current.left;
    } else if (p.val > current.val && q.val > current.val) {
      current = current.right;
    } else {
      return current;
    }
  }

  return null;
}

function runTest(
  name: string,
  root: TreeNode,
  p: TreeNode,
  q: TreeNode,
  expected: number,
): void {
  const actual = lowestCommonAncestor(root, p, q)?.val ?? null;

  if (actual !== expected) {
    throw new Error(`FAIL | ${name}: expected ${expected}, got ${actual}`);
  }

  console.log(`PASS | ${name}`);
}

const n0 = new TreeNode(0);
const n3 = new TreeNode(3);
const n5 = new TreeNode(5);
const n7 = new TreeNode(7);
const n9 = new TreeNode(9);

const n4 = new TreeNode(4, n3, n5);
const n2 = new TreeNode(2, n0, n4);
const n8 = new TreeNode(8, n7, n9);

const root = new TreeNode(6, n2, n8);

runTest("Opposite sides", root, n2, n8, 6);
runTest("Ancestor is target", root, n2, n4, 2);
runTest("Left subtree", root, n3, n5, 4);
runTest("Right subtree", root, n7, n9, 8);
runTest("Root is target", root, root, n5, 6);
runTest("Same node", root, n4, n4, 4);

console.log("All Day 43 LCA tests passed!");
