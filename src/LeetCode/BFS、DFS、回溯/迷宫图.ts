import * as _ from 'lodash';

// 无障碍物求路径数
function uniquePaths(m: number, n: number): number {
  // memo[i][j] 表示当前处于 obstacleGrid[i][j] 处到终点的路径数
  const memo = Array.from({ length: m }, () => Array(n).fill(-1));
  memo[m - 1][n - 1] = 1;

  function __traverse(i: number, j: number) {
    if (i < 0 || i >= m || j < 0 || j >= n) {
      return 0;
    } else if (memo[i][j] !== -1) {
      return memo[i][j];
    } else {
      let cur = 0;
      for (const [deltaI, deltaJ] of [
        [1, 0],
        [0, 1],
      ]) {
        cur += __traverse(i + deltaI, j + deltaJ);
      }

      return (memo[i][j] = cur);
    }
  }

  return __traverse(0, 0);
}

// 有障碍物求路径数，1表示障碍物 0表示空位置
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  // memo[i][j] 表示当前处于 obstacleGrid[i][j] 处到终点的路径数
  const [n, m] = [obstacleGrid.length, obstacleGrid[0].length];
  const memo = Array.from({ length: n }, () => Array(m).fill(-1));
  memo[n - 1][m - 1] = 1 - obstacleGrid[n - 1][m - 1];

  function __traverse(i: number, j: number) {
    if (obstacleGrid[i]?.[j] == null || obstacleGrid[i][j] === 1) {
      return 0;
    } else if (memo[i][j] !== -1) {
      return memo[i][j];
    } else {
      let cur = 0;
      for (const [deltaI, deltaJ] of [
        [1, 0],
        [0, 1],
      ]) {
        cur += __traverse(i + deltaI, j + deltaJ);
      }

      return (memo[i][j] = cur);
    }
  }

  return __traverse(0, 0);
}

// 1 表示起始方格。且只有一个起始方格。
// 2 表示结束方格，且只有一个结束方格。
// 0 表示我们可以走过的空方格。
// -1 表示我们无法跨越的障碍。
// 返回在四个方向（上、下、左、右）上行走时，从起始方格到结束方格的不同路径的数目。
// 每一个无障碍方格都要通过一次，但是一条路径中不能重复通过同一个方格。
function uniquePathsIII(grid: number[][]): number {
  const [n, m] = [grid.length, grid[0].length];
  const inPath = Array.from({ length: n }, () => Array(m).fill(false));
  let emptyCount = 0,
    startI = -1,
    startJ = -1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 0 || grid[i][j] === 2) {
        emptyCount++;
      } else if (grid[i][j] === 1) {
        startI = i;
        startJ = j;
      }
    }
  }

  inPath[startI][startJ] = true;

  function __traverse(i: number, j: number, cnt: number) {
    if (grid[i][j] === -1) {
      return 0;
    } else if (grid[i][j] === 2) {
      return Number(cnt === emptyCount);
    }
    let ans = 0;
    for (const [deltaI, deltaJ] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const [nextI, nextJ] = [i + deltaI, j + deltaJ];
      if (
        nextI >= 0 &&
        nextI < n &&
        nextJ >= 0 &&
        nextJ < m &&
        grid[nextI][nextJ] !== -1 &&
        !inPath[nextI][nextJ]
      ) {
        inPath[nextI][nextJ] = true;
        ans += __traverse(i + deltaI, j + deltaJ, cnt + 1);
        inPath[nextI][nextJ] = false;
      }
    }
    return ans;
  }

  return __traverse(startI, startJ, 0);
}

console.log(
  uniquePathsIII([
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 2, -1],
  ])
);
