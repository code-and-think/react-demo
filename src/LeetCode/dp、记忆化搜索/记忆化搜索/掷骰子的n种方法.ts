export {};

// 1000 30
function numRollsToTarget(n: number, k: number, target: number): number {
  const memo = Array.from({ length: n + 1 }, () => Array(target + 1).fill(-1));
  const mod = 1e9 + 7;

  function __traverse(num: number, t: number) {
    if (num < 0 || t < 0) {
      return 0;
    } else if (num === 0 && t === 0) {
      return 1;
    } else if (memo[num][t] !== -1) {
      return memo[num][t];
    }

    let ans = 0;
    for (let i = 1; i <= k; i++) {
      ans = (ans + __traverse(num - 1, t - i)) % mod;
    }

    return (memo[num][t] = ans);
  }

  return __traverse(n, target);
}
console.log(numRollsToTarget(30, 30, 500));
