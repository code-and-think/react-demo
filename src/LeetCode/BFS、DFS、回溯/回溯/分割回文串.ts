export {};

// 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。
// 回文串 是正着读和反着读都一样的字符串。
function partition(s: string) {
  const [ans, cur, len] = [[] as string[][], [] as string[], s.length];
  const dp = Array.from({ length: len }, () => Array(len));

  for (let i = len - 1; i >= 0; i--) {
    dp[i][i] = true;
    for (let j = i + 1; j < len; j++) {
      // 当前的值需要知道 i + 1 / j -1 的值，所以 i 从大到小，j从小到大
      dp[i][j] = s[i] === s[j] && (dp[i + 1][j - 1] ?? true);
    }
  }

  function __traverse(start: number) {
    if (start >= len) {
      ans.push([...cur]);
      return;
    }
    for (let i = start; i < len; i++) {
      // 切
      if (dp[start][i]) {
        cur.push(s.slice(start, i + 1));
        __traverse(i + 1);
        cur.pop();
      }
    }
  }

  __traverse(0);

  return ans;
}

console.log(partition('baab'));
