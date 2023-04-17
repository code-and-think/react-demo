
import * as _ from 'lodash';

// 最长优雅子数组
// 子数组需满足：不同位置的每对元素按位与(&)的结果为0，
// 转化成：数组内的所有元素在某个二进制位上的1的个数 <= 1，所以需要滑动窗口维护子数组状态
function longestNiceSubarray(nums: number[]): number {
  const bitNum = Array(32).fill(0);
  // 滑动窗口的 left 从 0 开始，表示窗口包含的开始坐标
  // right 就是遍历过程中的 i，表示窗口包含的结束坐标
  let left = 0;
  let count = 0;
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    const rightNum = nums[i];
    for (let j = 0; j < 32; j++) {
      bitNum[j] += (rightNum >> j) & 1;
      if (bitNum[j] > 1) {
        count++;
      }
    }

    while (count > 0) {
      const leftNum = nums[left++];
      for (let j = 0; j < 32; j++) {
        let pre = bitNum[j];
        bitNum[j] -= (leftNum >> j) & 1;
        if (pre > 1 && bitNum[j] <= 1) {
          count--;
        }
      }
    }
    ans = Math.max(ans, i - left + 1);
  }

  return ans;
}
