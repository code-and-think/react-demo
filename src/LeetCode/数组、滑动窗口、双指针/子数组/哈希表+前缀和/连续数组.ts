import * as _ from 'lodash';

// 给定一个二进制数组 nums , 找到含有相同数量的 0 和 1 的最长连续子数组，并返回该子数组的长度。
// 0 跟 1 的个数相同
function findMaxLength(nums: number[]): number {
  const n = nums.length;
  const preSum = new Map<number, number>([[0, -1]]);
  let num = 0;
  let ans = 0;

  for (let i = 0; i < n; i++) {
    num += nums[i] ? 1 : -1;
    const pre = preSum.get(num);
    if (pre == null) {
      preSum.set(num, i);
    } else {
      ans = Math.max(ans, i - pre);
    }
  }

  return ans;
}
