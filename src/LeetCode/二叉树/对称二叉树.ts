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

function isSymmetric(root: TreeNode | null): boolean {
  function __isSymmetric(
    left: TreeNode | null | undefined,
    right: TreeNode | null | undefined
  ): boolean {
    if (left == null && right == null) return true;
    return (
      left?.val === right?.val &&
      __isSymmetric(left?.left, right?.right) &&
      __isSymmetric(left?.right, right?.left)
    );
  }

  return __isSymmetric(root?.left, root?.right);
}

const one = new TreeNode(1)
const two1 = new TreeNode(2)
const two2 = new TreeNode(2)
