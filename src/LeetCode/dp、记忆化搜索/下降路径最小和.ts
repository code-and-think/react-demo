export function minFallingPathSum(matrix: number[][]): number {
  let ans = Number.MAX_SAFE_INTEGER;
  const [n, m] = [matrix.length, matrix[0].length];
  const dp = Array.from({ length: n }, () => Array(m).fill(Number.MAX_SAFE_INTEGER));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i === 0) {
        dp[i][j] = matrix[i][j];
      }
      // 最后一列
      if (i === n - 1) {
        ans = Math.min(ans, dp[i][j]);
      } else {
        // 非最后一列
        dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + matrix[i + 1][j]);
        if (j - 1 >= 0) {
          dp[i + 1][j - 1] = Math.min(dp[i + 1][j - 1], dp[i][j] + matrix[i + 1][j - 1]);
        }
        if (j + 1 < m) {
          dp[i + 1][j + 1] = Math.min(dp[i + 1][j + 1], dp[i][j] + matrix[i + 1][j + 1]);
        }
      }
    }
  }

  return ans;
}
