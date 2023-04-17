
import * as _ from 'lodash';
// 找出乘积最大的非空子数组，然后返回最大乘积
// 对于和最大的子数组来说，我们碰到小于0的就直接丢掉了，因为它不能让后面的变得更大
// 但是乘积不能这么搞，因为负数*负数可能更大，所以不能丢掉
function maxProduct(nums: number[]): number {
  let posCur = 1,
    negCur = 1;

  let ans = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      [posCur, negCur] = [1, 1];
      ans = Math.max(0, ans);
      continue;
    } else if (nums[i] > 0) {
      posCur *= nums[i];
      negCur *= nums[i];
    } else {
      [posCur, negCur] = [negCur * nums[i], posCur * nums[i]];
    }
    ans = Math.max(ans, posCur);
    negCur = Math.min(1, negCur);
    posCur = Math.max(1, posCur);
  }

  return ans;
}
