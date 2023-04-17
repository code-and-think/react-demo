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

// 前序遍历
export function preorderTraversal(root: TreeNode | null): number[] {
  const stack: Array<TreeNode | null | undefined> = [root];
  const res: number[] = [];
  const visited = new Set<TreeNode | null | undefined>();

  while (stack.length) {
    const item = stack[stack.length - 1];
    if (item) {
      if (visited.has(item)) {
        stack.pop();
        stack.push(item?.right);
      } else {
        visited.add(item);
        res.push(item.val);
        stack.push(item?.left);
      }
    } else {
      stack.pop();
    }
  }

  return res;
}

export function inorderTraversal(root: TreeNode | null): number[] {
  const stack: Array<TreeNode | null | undefined> = [root];
  const res: number[] = [];
  const visited = new Set<TreeNode | null | undefined>();

  while (stack.length) {
    const item = stack[stack.length - 1];
    if (item) {
      if (visited.has(item)) {
        res.push(item.val);
        stack.pop();
        stack.push(item?.right);
      } else {
        visited.add(item);
        stack.push(item?.left);
      }
    } else {
      stack.pop();
    }
  }

  return res;
}

export function postorderTraversal(root: TreeNode | null): number[] {
  const stack: Array<TreeNode | null | undefined> = [root];
  const res: number[] = [];
  const visited = new Map();

  while (stack.length) {
    const item = stack[stack.length - 1];
    if (item) {
      const count = visited.get(item) ?? 0;
      if (count === 0) {
        stack.push(item?.left);
      } else if (count === 1) {
        stack.push(item?.right);
      } else {
        res.push(item.val);
        stack.pop();
      }
      visited.set(item, count + 1);
    } else {
      stack.pop();
    }
  }

  return res;
}
