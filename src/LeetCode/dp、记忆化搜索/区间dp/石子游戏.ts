import * as _ from 'lodash';

// 区间 dp
// 一共有偶数堆石子，排成一行；每堆都有 正 整数颗石子，数目为 piles[i] 。
// 游戏以谁手中的石子最多来决出胜负。石子的 总数 是 奇数 ，所以没有平局。
// Alice 先开始，玩家从行的 开始 或 结束 处取走整堆石头。
// 这种情况一直持续到没有更多的石子堆为止，此时手中 石子最多 的玩家 获胜 。
// 假设 Alice 和 Bob 都发挥出最佳水平，当 Alice 赢得比赛时返回 true ，当 Bob 赢得比赛时返回 false 。
function stoneGame(piles: number[]): boolean {
  // 偶数堆一定是 Alice 拿，奇数堆一定是 Bob 拿
  const n = piles.length;
  const memo = Array.from({ length: n }, () => Array(n).fill(-1));
  let sum = 0;
  for (let i = 0; i < n; i++) {
    memo[i][i] = piles[i];
    sum += piles[i];
  }

  // 左右都包含
  function __traverse(i: number, j: number, sum: number): number {
    if (memo[i][j] !== -1) {
      return memo[i][j];
    }

    return (memo[i][j] = Math.max(
      // 取最左边那堆
      sum - __traverse(i + 1, j, sum - piles[i]),
      // 取最右边那堆
      sum - __traverse(i, j - 1, sum - piles[j])
    ));
  }

  __traverse(0, n - 1, sum);

  return memo[0][n - 1] > Math.floor(sum / 2);
}

// 爱丽丝和鲍勃轮流进行，爱丽丝先开始。最初，M = 1。
// 在每个玩家的回合中，该玩家可以拿走剩下的 前 X 堆的所有石子，其中 1 <= X <= 2M。然后，令 M = max(M, X)。
// 前 X 堆的所有石子
function stoneGameII(piles: number[]): number {
  const n = piles.length;
  const memo = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Array(n + 1).fill(-1))
  );

  function __traverse(i: number, j: number, M: number, sum: number): number {
    if (i === j) {
      return piles[i];
    } else if (i > j) {
      return 0;
    } else if (memo[i][j][M] !== -1) {
      return memo[i][j][M];
    }
    let cur = Number.MIN_SAFE_INTEGER;
    let stoneSum = 0;

    for (let x = i; x <= Math.min(i + 2 * M - 1, j); x++) {
      stoneSum += piles[x];
      // 取前 i 堆
      cur = Math.max(cur, sum - __traverse(x + 1, j, Math.max(x - i + 1, M), sum - stoneSum));
    }

    return (memo[i][j][M] = cur);
  }

  return __traverse(0, n - 1, 1, _.sum(piles));
}

console.log(stoneGameII([2, 7, 9, 4, 4]));
