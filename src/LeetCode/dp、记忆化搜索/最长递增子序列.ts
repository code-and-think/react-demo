export {};

// 严格递增的最长递增子序列的长度
function lengthOfLIS(nums: number[]): number {
  const n = nums.length;
  const dp = Array(n).fill(1);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      // dp[i] 表示的是 [0,i] 中以 nums[i] 为结尾的最长递增子序列的长度
      // 所以 dp[dp.length - 1] 不一定是最长的
      dp[i] = Math.max(dp[i], nums[i] > nums[j] ? dp[j] + 1 : Number.MIN_SAFE_INTEGER);
    }
  }

  return Math.max(...dp);
}
// [1,3,6,7,9,4,10,5,6]
console.log(lengthOfLIS([1, 3, 6, 7, 9, 4, 10, 5, 6]));

// 最长递增子序列的个数
function findNumberOfLIS(nums: number[]): number {
  // dp[i] 表示以 nums[i] 结尾的最长上升子序列的长度和个数
  const n = nums.length;
  const dp = Array.from({ length: n }, () => ({ len: 1, cnt: 1 }));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      // 可以在j后面接上i的情况
      if (nums[i] > nums[j]) {
        // 发现了相等的，那么情况叠加
        if (dp[j].len + 1 === dp[i].len) {
          dp[i].cnt += dp[j].cnt;
        } else if (dp[j].len + 1 > dp[i].len) {
          // 发现了更长的，直接替换
          dp[i] = { ...dp[j], len: dp[j].len + 1 };
        }
      }
    }
  }

  const maxLen = dp.reduce((res, item) => Math.max(res, item.len), 0);

  return dp.reduce((res, item) => res + (item.len === maxLen ? item.cnt : 0), 0);
}
