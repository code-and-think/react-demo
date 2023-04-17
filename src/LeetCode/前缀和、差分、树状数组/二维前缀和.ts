import * as _ from 'lodash';

function maximalSquare(matrix: string[][]): number {
  // 只包含 '1' 的最大矩形面积
  // 二维前缀和
  const [n, m] = [matrix.length, matrix[0].length];
  const sum = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      sum[i + 1][j + 1] = sum[i][j + 1] + sum[i + 1][j] - sum[i][j] + parseInt(matrix[i][j]);
    }
  }

  function squareSum(i1: number, j1: number, i2: number, j2: number) {
    return sum[i1 + 1][j1 + 1] - sum[i2 + 1][j1 + 1] - sum[i1 + 1][j2 + 1] + sum[i2 + 1][j2 + 1];
  }

  let ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i === 2 && j === 4) {
        console.log(i, j);
      }
      const minEdge = Math.min(i, j);
      for (let k = 1; k <= minEdge + 1; k++) {
        if (squareSum(i, j, i - k, j - k) === k * k) {
          ans = Math.max(ans, k * k);
        }
      }
    }
  }

  return ans;
}
console.log(
  maximalSquare([
    ['1', '1', '1', '1', '0'],
    ['1', '1', '1', '1', '1'],
    ['1', '1', '1', '1', '1'],
    ['1', '1', '1', '1', '0'],
  ])
);
