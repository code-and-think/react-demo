export {};

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function generateTrees(n: number): Array<TreeNode | null> {
  function __traverse(start: number, end: number): Array<TreeNode | null> {
    if (start === end) {
      return [new TreeNode(start)];
    } else if (start > end) {
      return [null];
    }
    const ans: Array<TreeNode | null> = [];

    for (let i = start; i <= end; i++) {
      const [left, right] = [__traverse(start, i - 1), __traverse(i + 1, end)];

      for (const leftChild of left) {
        for (const rightChild of right) {
          ans.push(new TreeNode(i, leftChild, rightChild));
        }
      }
    }

    return ans;
  }

  const ans = __traverse(1, n);

  return ans;
}
console.log(generateTrees(3));
