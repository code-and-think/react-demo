import * as _ from 'lodash';


// 环型子数组的最大和
function maxSubarraySumCircular(nums: number[]): number {
  const n = nums.length;
  const sum = _.sum(nums);
  let ans = Number.MIN_SAFE_INTEGER;
  let curSum = 0;
  // 正常不跨的最大值
  for (let i = 0; i < n; i++) {
    curSum += nums[i];
    ans = Math.max(ans, curSum);
    curSum = Math.max(0, curSum);
  }

  curSum = 0;
  // 跨越的最大值 = 数组总和 - 连续数组的最小值
  for (let i = 0; i < n - 1; i++) {
    curSum += nums[i];
    ans = Math.max(ans, sum - curSum);
    curSum = Math.min(0, curSum);
  }

  return ans;
}
