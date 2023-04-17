export {};

// 判断是否存在目标单词
function exist(board: string[][], word: string): boolean {
  const [m, n] = [board.length, board[0].length];
  let inPath = Array.from({ length: m }, () => Array(n).fill(false));
  let res = false;
  function dfs(index: number, x: number, y: number) {
    if (index === word.length) {
      res = true;
      return;
    }
    if (x >= 0 && x < m && y >= 0 && y < n && !inPath[x][y]) {
      inPath[x][y] = true;
      if (board[x][y] === word[index]) {
        dfs(index + 1, x + 1, y);
        dfs(index + 1, x - 1, y);
        dfs(index + 1, x, y + 1);
        dfs(index + 1, x, y - 1);
      }
      inPath[x][y] = false;
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(0, i, j);
    }
  }

  return res;
}

