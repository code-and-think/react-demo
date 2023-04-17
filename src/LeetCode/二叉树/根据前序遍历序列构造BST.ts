import * as _ from 'lodash';


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

// 前序遍历：先根 -> 左子树 -> 右子树
function bstFromPreorder(preorder: number[]): TreeNode | null {
  if (preorder.length === 0) {
    return null;
  }

  const parentNode = new TreeNode(preorder[0]);
  // 二分找大于的第一个
  let left = 1,
    right = preorder.length - 1;
  while (left < right) {
    const mid = _.toInteger((left + right) / 2);
    if (preorder[0] > preorder[mid]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  const rightChildIndex = preorder[left] > preorder[0] ? left : preorder.length;

  parentNode.left = bstFromPreorder(preorder.slice(1, rightChildIndex));
  parentNode.right = bstFromPreorder(preorder.slice(rightChildIndex));

  return parentNode;
}
