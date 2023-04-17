
import * as _ from 'lodash';

// 找出和 >= target且长度最小的子数组
function minSubArrayLen(target: number, nums: number[]): number {
  // 滑动窗口
  let left = 0,
    sum = 0,
    ans = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    sum += num;
    while (sum >= target) {
      ans = Math.min(i - left + 1, ans);
      sum -= nums[left++];
    }
  }

  return ans === Number.MAX_SAFE_INTEGER ? 0 : ans;
}

console.log(minSubArrayLen(1000, [2, 3, 1, 2, 4, 3, 7]));
