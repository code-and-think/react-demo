import * as _ from 'lodash';

// 和可被 K 整除的子数组个数
function subarraysDivByK(nums: number[], k: number): number {
  let [ans, preSum, map] = [0, 0, { 0: 1 } as Record<string, number>];

  for (const item of nums) {
    preSum += item;
    const index = ((preSum % k) + k) % k;
    const count = map[index] ?? 0;
    ans += count;
    map[index] = count + 1;
  }

  return ans;
}

console.log(subarraysDivByK([0, 0, 1, 2, 2], 5));

// 判断是否存在和可被 K 整除且长度 >= 2 的子数组
function checkSubarraySum(nums: number[], k: number): boolean {
  const map: Record<string, number> = { 0: -1 };
  let preSum = 0;
  for (let i = 0; i < nums.length; i++) {
    preSum = (preSum + nums[i]) % k;

    if (i - map[preSum] >= 2) {
      return true;
    }

    if (map[preSum] == null) {
      map[preSum] = i;
    }
  }

  return false;
}

console.log(checkSubarraySum([0, 0], 6));
