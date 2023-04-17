// 核心原理就是：preSum[i] 是 arr[0] ~ arr[i] 的和
// 那如果要求中间的 i ~ j 的和就可以通过 preSum[j] - preSum[i - 1]
// [1]  [1,2,3,4]
export function preSum1(nums: number[]) {
  const n = nums.length;
  let preSum = Array(n).fill(0);
  for (let i = 0; i < n; ++i) {
    preSum[i] = (preSum[i - 1] ?? 0) + nums[i];
  }
  return preSum;
}
// 第一版代码求区间和为：sum(i,j) === preSum[j] - preSum[i - 1]，因为有 i - 1 所以在 i === 0 时会数组越界
// 用 preSum[i + 1] 表示 [0,i] 的前缀和相当于往前移了一位，所以之前的  sum(i,j) === preSum[j + 1] - preSum[i]
export class PreSum {
  preSum: number[];
  constructor(nums: number[]) {
    const preSum = [0];
    nums.forEach(item => [preSum.push(preSum[preSum.length - 1] + item)]);
    this.preSum = preSum;
  }
  sumRange(left: number, right: number): number {
    return this.preSum[right + 1] - this.preSum[left];
  }
}

export class MatrixSum {
  preSum: number[][];
  constructor(grid: number[][]) {
    const [n, m] = [grid.length, grid[0].length];
    const preSum = Array(n + 1)
      .fill(0)
      .map(() => Array(m + 1).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        preSum[i + 1][j + 1] = preSum[i][j + 1] + preSum[i + 1][j] + grid[i][j] - preSum[i][j];
      }
    }
    this.preSum = preSum;
  }
  sumRegion(i1: number, j1: number, i2: number, j2: number) {
    const preSum = this.preSum;
    // 正常是 preSum[i2][j2] - preSum[i1 - 1][j2] - preSum[i2][j1 - 1] - preSum[i1 - 1][j1 - 1]
    return preSum[i2 + 1][j2 + 1] - preSum[i1][j2 + 1] - preSum[i2 + 1][j1] + preSum[i1][j1];
  }
}
const matrixSum = new MatrixSum([
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5],
]);
console.log(matrixSum.preSum);

console.log(matrixSum.sumRegion(2, 1, 4, 3));
