// 完全背包/无限背包描述：在 0/1 背包的基础上，每件物品可选无限件
import * as _ from 'lodash';

// 求组成目标值所用的最少硬币数
function numSquares(n: number): number {
  // 初始看作全部由1组成
  const dp = Array.from({ length: n + 1 }, (_, i) => i);
  const bound = Math.floor(Math.sqrt(n));

  for (let i = 2; i <= bound; i++) {
    const square = i * i;
    // 我从哪里来：有当前面额硬币所参与组成的新面额，枚举新面额
    // 完全背包从前往后遍历
    for (let j = square; j <= n; j++) {
      dp[j] = Math.min(dp[j], dp[j - square] + 1);
    }
    // 我到哪里去：当前面额 + 其他面额组成新面额，枚举其他面额
    // for (let j = 0; j <= n - square; j++) {
    // dp[j + square] = Math.min(dp[j + square], dp[j] + 1);
    // }
  }

  return dp[n];
}

// 计算凑齐该金额的最少硬币数
export function coinChange(coins: number[], amount: number): number {
  if (!amount) return 0;
  const dp = Array(amount + 1).fill(Number.MAX_SAFE_INTEGER);
  for (const coin of coins) {
    dp[coin] = 1;
  }
  for (let i = 1; i < amount; i++) {
    if (dp[i] !== Number.MAX_SAFE_INTEGER) {
      for (const coin of coins) {
        if (i + coin <= amount) {
          dp[i + coin] = Math.min(dp[i + coin], dp[i] + 1);
        }
      }
    }
  }

  return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
}

// 计算凑齐该金额的方案数
function change(amount: number, coins: number[]) {
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;
  _.sortBy(coins);
  // 必须保证使用的硬币是递增的才不会有重复的方案
  // 所以从小到大枚举所有硬币
  for (const coin of coins) {
    for (let i = 0; i + coin <= amount; i++) {
      dp[i + coin] += dp[i];
    }
  }

  return dp[amount];
}
