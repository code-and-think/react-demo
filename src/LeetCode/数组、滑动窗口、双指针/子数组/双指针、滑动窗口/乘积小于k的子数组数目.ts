import * as _ from 'lodash';

// 思路：通过双指针找到当前坐标 i的右边加入后会 > k 的下标 j，则以 i 为左边界的积小于k的子数组数目为 j - i
function numSubarrayProductLessThanK(nums: number[], k: number): number {
  const n = nums.length;
  const rightGreatK = Array(n).fill(n);
  let ans = 0;

  let product = 1;
  let left = 0;
  for (let i = 0; i < nums.length; i++) {
    product *= nums[i];
    while (product >= k && left <= i) {
      rightGreatK[left] = i;
      product /= nums[left++];
    }
  }

  for (let i = 0; i < rightGreatK.length; i++) {
    ans += rightGreatK[i] - i;
  }

  return ans;
}
