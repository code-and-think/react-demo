import * as _ from 'lodash';

// 和为 k 的连续子数组的个数
function subarraySum(nums: number[], k: number): number {
  const [n, map] = [nums.length, new Map<number, number>()];
  let [preSum, ans] = [0, 0];
  map.set(0, 1);

  for (let i = 0; i < n; i++) {
    preSum += nums[i];
    ans += map.get(preSum - k) ?? 0;
    map.set(preSum, (map.get(preSum) ?? 0) + 1);
  }

  return ans;
}

console.log(subarraySum([-1, 1, 3], 3));
