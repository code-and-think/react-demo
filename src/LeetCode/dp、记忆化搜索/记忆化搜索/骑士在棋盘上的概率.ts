export {};

function knightProbability(n: number, k: number, row: number, column: number): number {
  const steps = [
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [-2, 1],
    [-2, -1],
    [2, 1],
    [2, -1],
  ];

  // 移动 k 步后依然在棋盘上面的概率
  const memo = Array.from({ length: n }, () => Array.from({ length: n }, () => Array(k + 1).fill(-1)));

  function __traverse(r: number, c: number, k: number) {
    if (r < 0 || r >= n || c < 0 || c >= n) {
      return 0;
    } else if (k === 0) {
      return 1;
    } else if (memo[r][c][k] !== -1) {
      return memo[r][c][k];
    }

    let cur = 0;
    for (const [deltaX, deltaY] of steps) {
      cur += 0.125 * __traverse(r + deltaX, c + deltaY, k - 1);
    }

    return (memo[r][c][k] = cur);
  }

  return __traverse(row, column, k);
}

console.log(knightProbability(1,0,0,0));
