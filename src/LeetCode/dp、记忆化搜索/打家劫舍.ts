// 相邻的不能偷
export function rob1(nums: number[]): number {
  const dp = Array(nums.length).fill(0);

  for (let i = 0; i < nums.length; i++) {
    const money = nums[i];
    dp[i] = Math.max(
      // 偷
      (dp[i - 2] ?? 0) + money,
      // 不偷
      dp[i - 1] ?? 0
    );
  }

  return dp[dp.length - 1];
}

// 相邻的不能偷，且首尾相邻
export function rob2(nums: number[]): number {
  const n = nums.length;
  function __noConnect(nums: number[]) {
    if (nums.length === 0) return 0;
    const dp = Array(nums.length).fill(0);

    for (let i = 0; i < nums.length; i++) {
      const money = nums[i];
      dp[i] = Math.max(
        // 偷
        (dp[i - 2] ?? 0) + money,
        // 不偷
        dp[i - 1] ?? 0
      );
    }

    return dp[dp.length - 1];
  }

  return Math.max(
    __noConnect(nums.slice(0, n - 1)), // 不偷最后一个
    // 偷最后一个
    nums[n - 1] + __noConnect(nums.slice(1, n - 2))
  );
}

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

function rob3(root: TreeNode | null): number {
  const memo = new Map<TreeNode, number>();

  function __traverse(node: TreeNode | null | undefined): number {
    if (node == null) {
      return 0;
    }
    let res = memo.get(node);
    if (res != null) {
      return res;
    }
    res = Math.max(
      // 偷
      node.val +
        __traverse(node.left?.left) +
        __traverse(node.left?.right) +
        __traverse(node.right?.left) +
        __traverse(node.right?.right),
      // 不偷
      __traverse(node.left) + __traverse(node.right)
    );
    memo.set(node, res);

    return res;
  }

  return __traverse(root);
}
