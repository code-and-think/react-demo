export {};

function longestPalindromeSubseq(s: string): number {
  const n = s.length;
  const dp: any[][] = Array.from({ length: n }, () => Array.from({ length: n }).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      dp[i][j] = Math.max(
        dp[i + 1][j],
        dp[i][j - 1],
        s[i] === s[j] ? dp[i + 1][j - 1] + 2 : Number.MIN_SAFE_INTEGER
      );
    }
  }

  return dp[0][n - 1];
}


console.log(longestPalindromeSubseq('c'));