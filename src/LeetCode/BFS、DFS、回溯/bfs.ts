export function orangesRotting(grid: number[][]): number {
  const queue = new Set<{ i: number; j: number; k: number }>();
  const n = grid.length;
  const m = grid[0].length;
  // 剩下的橘子个数
  let leave = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 2) {
        queue.add({ i, j, k: 0 });
      } else if (grid[i][j] === 1) {
        leave++;
      }
    }
  }

  for (const { i, j, k } of queue) {
    for (const [nextI, nextJ] of [
      [i + 1, j],
      [i - 1, j],
      [i, j + 1],
      [i, j - 1],
    ]) {
      if (grid[nextI]?.[nextJ] === 1) {
        grid[nextI][nextJ] = 2;
        queue.add({ i: nextI, j: nextJ, k: k + 1 });
        if (--leave === 0) {
          return k + 1;
        }
      }
    }
  }
  return leave === 0 ? 0 : -1;
}
