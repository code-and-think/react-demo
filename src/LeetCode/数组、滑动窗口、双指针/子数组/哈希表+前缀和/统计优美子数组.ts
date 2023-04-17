import { toInteger } from 'lodash';

// 给你一个整数数组 nums 和一个整数 k。如果某个连续子数组中恰好有 k 个奇数数字，我们就认为这个子数组是「优美子数组」。统计优美子数组的数目
// 将奇
function numberOfSubarrays(nums: number[], k: number): number {
  let ans = 0;
  const map: Record<string, number> = {};
  // 某个连续子数组恰好有 k 个奇数数字
  // 1 0 1 0 区间和刚好为 k 的区间个数
  for (let i = 0; i < nums.length; i++) {
    nums[i] &= 1;
  }

  let sum = 0;
  map[0] = 1;
  for (const num of nums) {
    sum += num;
    map[sum] = (map[sum] ?? 0) + 1;
    ans += map[sum - k] ?? 0;
  }

  return ans;
}
console.log(numberOfSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2));
