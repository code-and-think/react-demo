import * as _ from 'lodash';

// 0/1 背包描述：
// 背包可容纳重量为 W，每件物品有重量 wi 和价值 vi 且只能选择一次，求背包可容纳的最大价值/方案数

// 已知 nums 和为 sum，设添加正号得到的正数和为 x，那么负数和就是 -(sum - x)
// 加起来等于 target: x - sum + x = target
// 则 x = (target + sum) / 2，转化为 0/1背包问题  => 选若干个数字组成和为 x 的背包方案数
function findTargetSumWays(nums: number[], target: number): number {
  const sum = _.sum(nums);
  if ((sum + target) % 2 || target + sum < 0) {
    return 0;
  }

  const x = (target + sum) / 2;
  const dp = Array(x + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    // 0/1背包从后往前遍历
    for (let j = x; j >= num; j--) {
      dp[j] += dp[j - num];
    }
  }

  return dp[x];
}
// 0/1 背包变种：分为两堆重量最相近的石头，这样最后产生的差值才会最小
function lastStoneWeightII(stones: number[]): number {
  const sum = _.sum(stones);

  const dp: boolean[] = Array(_.toInteger(sum / 2) + 1).fill(false);
  dp[0] = true;
  let maxWeight = 0;

  for (const stone of stones) {
    // 0/1 背包，从后往前遍历
    for (let i = dp.length - 1; i >= 0; i--) {
      dp[i] = dp[i] || (dp[i - stone] ?? false);
      if (dp[i]) {
        maxWeight = Math.max(maxWeight, i);
      }
    }
  }

  return sum - 2 * maxWeight;
}
console.log(findTargetSumWays([0, 1, 1], 2));
