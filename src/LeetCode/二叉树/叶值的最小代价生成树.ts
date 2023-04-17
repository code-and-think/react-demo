import * as _ from 'lodash';

// 1. 每个节点要么没子，要么两子
// 2. arr中的值与树的中序遍历的叶节点对应
// 3. 每个非叶节点的值等于其左子树和右子树中叶节点的最大值的乘积
function mctFromLeafValues(arr: number[]): number {
  const n = arr.length;
  const memo = Array.from({ length: n }, () => Array(n));
  // 含 left 也含 right
  function __traverse(left: number, right: number) {
    // 单个叶子节点
    if (left === right) {
      return { maxLeaf: arr[left], minProduct: 0 };
    } else if (memo[left][right]) {
      return memo[left][right];
    }

    let minProduct = Number.MAX_SAFE_INTEGER;
    let maxLeaf = Number.MIN_SAFE_INTEGER;
    // root作为分割点不出现在 arr 中，但是左右子树至少要有一个节点，所以从 left 开始且最多到 right - 1
    for (let i = left; i <= right - 1; i++) {
      const leftChild = __traverse(left, i);
      const rightChild = __traverse(i + 1, right);
      minProduct = Math.min(
        minProduct,
        leftChild.minProduct + rightChild.minProduct + leftChild.maxLeaf * rightChild.maxLeaf
      );
      maxLeaf = Math.max(leftChild.maxLeaf, rightChild.maxLeaf);
    }

    return (memo[left][right] = { maxLeaf, minProduct });
  }

  return __traverse(0, arr.length - 1).minProduct;
}

console.log(mctFromLeafValues([7, 5, 12, 2, 2, 3, 13, 8, 4, 9, 12, 9, 3, 10, 4, 13, 7, 5, 15]));
