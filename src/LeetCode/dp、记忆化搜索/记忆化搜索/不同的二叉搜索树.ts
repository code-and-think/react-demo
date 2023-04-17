import * as _ from 'lodash';

function numTrees(n: number): number {
  const memo = Array(n + 1).fill(-1);
  memo[0] = memo[1] = 1;
  function __traverse(n: number) {
    if (n < 0) {
      return 0;
    } else if (memo[n] !== -1) {
      return memo[n];
    }
    let cur = 0;
    for (let i = 0; i < n; i++) {
      cur += __traverse(i) * __traverse(n - i - 1);
    }
    memo[n] = cur;
    return memo[n];
  }

  __traverse(n);
  return memo[n];
}
