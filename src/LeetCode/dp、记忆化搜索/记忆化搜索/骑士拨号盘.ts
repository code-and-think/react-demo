import * as _ from 'lodash';

// 可以拨多少个长度为 n 的不同号码
// 起始把骑士放在任意位置，然后走 n - 1 步看有多少种不同的组合
// 递归
function knightDialer(n: number): number {
  const board = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#'],
  ];
  // memo[i][j] 表示以当前在i位置，需要j长度有几种情况

  const memo = Array.from({ length: board.length }, () =>
    Array.from({ length: board[0].length }, () => Array(n + 1).fill(-1))
  );
  const stack: Array<{ i: number; j: number; len: number; cb: (res: number) => void }> = [];

  let ans = 0;
  const mod = 1e9 + 7;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (_.isFinite(parseInt(board[i][j]))) {
        stack.push({
          i,
          j,
          len: n - 1,
          cb(res) {
            ans = (ans + res) % mod;
          },
        });
      }
    }
  }

  while (stack.length) {
    const { cb, i, j, len } = stack.pop()!;
    if (len === 0) {
      cb(1);
    } else if (memo[i][j][len] !== -1) {
      cb(memo[i][j][len]);
    } else {
      let cur = 0;
      let cnt = 0;

      for (const [deltaI, deltaJ] of [
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2],
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
      ]) {
        const [nextI, nextJ] = [i + deltaI, j + deltaJ];
        if (_.isFinite(parseInt(board[nextI]?.[nextJ]))) {
          cnt++;
          // 跟递归还是有点不同，递归是直接进入，但这里是 push 到末尾不会进入
          stack.push({
            i: nextI,
            j: nextJ,
            len: len - 1,
            cb(res) {
              cur = (cur + res) % mod;
              if (--cnt === 0) {
                cb((memo[i][j][len] = cur));
              }
            },
          });
        }
      }
    }
  }

  return ans;
}
