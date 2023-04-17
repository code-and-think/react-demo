export {};

function findMaxForm(strs: string[], m: number, n: number): number {
  // dp[i][j][k] 表示至多包含 m个0，n个1，考虑前k项到最大子集的长度
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (const str of strs) {
    let oneNum = 0;
    for (const char of str) {
      oneNum += parseInt(char);
    }
    let zeroNum = str.length - oneNum;
    if (zeroNum > m || oneNum > n) {
      continue;
    }
    for (let i = m; i >= zeroNum; i--) {
      for (let j = n; j >= oneNum; j--) {
        // 加上当前元素
        dp[i][j] = Math.max(dp[i][j], dp[i - zeroNum][j - oneNum] + 1);
      }
    }
  }

  return dp[m][n];
}

console.log(findMaxForm(['10', '0001', '111001', '1', '0'], 5, 3));
