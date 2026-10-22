/** Day 45 Trees review: reimplement DFS and BFS from memory before reading this file. */
class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null,
  ) {}
}
function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) return [];
  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  let head = 0;
  while (head < queue.length) {
    const count = queue.length - head;
    const row: number[] = [];
    for (let i = 0; i < count; i++) {
      const node = queue[head++];
      if (node === undefined) throw new Error('Unexpected empty BFS queue');
      row.push(node.val);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    result.push(row);
  }
  return result;
}
function check(name: string, condition: boolean): void {
  if (!condition) throw new Error(`FAIL | ${name}`);
  console.log(`PASS | ${name}`);
}
const tree = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
check('Empty depth', maxDepth(null) === 0);
check('Single depth', maxDepth(new TreeNode(1)) === 1);
check('Sample depth', maxDepth(tree) === 3);
check('Empty BFS', JSON.stringify(levelOrder(null)) === '[]');
check('Sample BFS', JSON.stringify(levelOrder(tree)) === JSON.stringify([[3], [9, 20], [15, 7]]));
check('Single BFS', JSON.stringify(levelOrder(new TreeNode(1))) === '[[1]]');
console.log('All Day 45 Trees review tests passed!');
export {};
