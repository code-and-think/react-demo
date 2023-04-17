import * as _ from 'lodash';

function findPaths(
  m: number,
  n: number,
  maxMove: number,
  startRow: number,
  startColumn: number
): number {
  const memo: number[][][] = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => Array(maxMove + 1).fill(-1))
  );
  const mod = 1e9 + 7;

  function __traverse(i: number, j: number, step: number) {
    if (i < 0 || i >= m || j < 0 || j >= n) {
      return 1;
    } else if (step === 0) {
      return 0;
    } else if (memo[i][j][step] !== -1) {
      return memo[i][j][step];
    }

    let cur = 0;
    for (const [nextI, nextJ] of [
      [i + 1, j],
      [i - 1, j],
      [i, j + 1],
      [i, j - 1],
    ]) {
      cur = (cur + __traverse(nextI, nextJ, step - 1)) % mod;
    }

    return (memo[i][j][step] = cur);
  }

  return __traverse(startRow, startColumn, maxMove);
}