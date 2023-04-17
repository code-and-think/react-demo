import * as _ from 'lodash';

// 优美子数组：获取异或结果为0的子数组的数目
function beautifulSubarrays(nums: number[]): number {
  let xor = 0;

  for (const num of nums) {
    xor ^= num;
  }

  const countMap: Record<number, number> = { 0: 1 };
  let right = 0;
  // right 不包含第一个
  for (let i = nums.length - 1; i > 0; i--) {
    right ^= nums[i];
    countMap[right] = (countMap[right] ?? 0) + 1;
  }

  let left = 0;
  let ans = 0;
  // left 不包含最后一个
  for (let i = 0; i < nums.length; i++) {
    ans += countMap[left ^ xor] ?? 0;
    countMap[right]--;
    left ^= nums[i];
    right ^= nums[i + 1];
  }

  return ans;
}
