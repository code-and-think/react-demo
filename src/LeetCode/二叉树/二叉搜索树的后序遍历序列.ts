import _, { findIndex } from 'lodash';

export {};

// 判断某个序列是否为二叉搜索树等后序遍历序列
function verifyPostorder(postorder: number[]): boolean {
  function __verifyRange(left: number, right: number): boolean {
    if (right - left <= 1) return true;
    const root = postorder[right];
    let hasMin = false;
    let rightChildIndex = right;
    for (let i = left; i < right; i++) {
      if (postorder[i] < root) {
        if (rightChildIndex < right) {
          return false;
        }
        hasMin = true;
      }
      if (postorder[i] > root) {
        rightChildIndex = Math.min(rightChildIndex, i);
      }
    }
    return (
      (!hasMin || __verifyRange(left, rightChildIndex - 1)) &&
      __verifyRange(rightChildIndex, right - 1)
    );
  }

  return __verifyRange(0, postorder.length - 1);
}
// [5, 2, -17, -11, 25, 76, 62, 98, 92, 61]
console.log(verifyPostorder([5, 2, -17, -11, 25, 76, 62, 98, 92, 61]));
console.log(verifyPostorder([4, 8, 6, 12, 16, 14, 10]));
