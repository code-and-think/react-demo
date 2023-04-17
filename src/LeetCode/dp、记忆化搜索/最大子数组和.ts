export function maxSubArray(nums: number[]): number {
  let ans = Number.MIN_SAFE_INTEGER;
  let preSum = 0;
  for (const item of nums) {
    preSum += item;
    ans = Math.max(ans, preSum);
    preSum = Math.max(0, preSum);
  }
  return ans;
}

console.log(maxSubArray([-2,-1,4,-5,3]));
