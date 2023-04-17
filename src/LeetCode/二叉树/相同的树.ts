/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
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
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null && q === null) {
    return true;
  }

  return (
    p?.val === q?.val &&
    isSameTree(p?.left ?? null, q?.left ?? null) &&
    isSameTree(p?.right ?? null, q?.right ?? null)
  );
}
