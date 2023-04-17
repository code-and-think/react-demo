export function longestCommonSubsequence(text1: string, text2: string): number {
  const [n, m] = [text1.length, text2.length];
  const dp = Array.from({ length: n }, () => Array(m).fill(0));

  for (let i = 0; i < n; i++) {
    const charI = text1[i];
    for (let j = 0; j < m; j++) {
      const charJ = text2[j];
      if (charI === charJ) {
        dp[i][j] = (dp[i - 1]?.[j - 1] ?? 0) + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1]?.[j] ?? 0, dp[i]?.[j - 1] ?? 0);
      }
    }
  }

  return dp[n - 1][m - 1];
}

console.log(longestCommonSubsequence('abc', 'abcd'));
