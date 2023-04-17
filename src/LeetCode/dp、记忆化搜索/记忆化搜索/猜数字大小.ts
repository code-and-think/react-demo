export {};

function getMoneyAmount(n: number): number {
  const memo = Array.from({ length: n + 1 }, () => Array(n + 1).fill(-1));

  function __traverse(left: number, right: number) {
    if (left >= right) {
      return 0;
    } else if (memo[left][right] !== -1) {
      return memo[left][right];
    }

    let cur = Number.MAX_SAFE_INTEGER;
    for (let i = left; i <= right; i++) {
      cur = Math.min(
        cur,
        Math.max(
          // 高了
          __traverse(left, i - 1) + i,
          // 低了
          __traverse(i + 1, right) + i
        )
      );
    }

    return (memo[left][right] = cur);
  }

  return __traverse(1, n);
}

console.log(getMoneyAmount(2));
