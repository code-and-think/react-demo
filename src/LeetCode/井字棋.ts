export {};

function validTicTacToe(board: string[]): boolean {
  // 1. X 只比 O 多 0 - 1 个
  // 2. 获胜只能有 0 - 1 个
  let numSum = 0;
  let [rowSum, colSum, diagonalSum] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0],
  ];
  let xWin = false,
    oWin = false;

  for (let i = 0; i < board.length; i++) {
    const arr = board[i].split('');
    for (let j = 0; j < arr.length; j++) {
      const char = arr[j];

      const num = {
        O: -1,
        ' ': 0,
        X: 1,
      }[char] as number;

      numSum += num;
      rowSum[i] += num;
      colSum[j] += num;

      // 属于左对角线
      if (i === j) {
        diagonalSum[0] += num;
      }
      // 属于右对角线
      if (i + j === 2) {
        diagonalSum[1] += num;
      }

      if (rowSum[i] === 3 || colSum[j] === 3 || diagonalSum[0] === 3 || diagonalSum[1] === 3) {
        xWin = true;
      }
      if (rowSum[i] === -3 || colSum[j] === -3 || diagonalSum[0] === -3 || diagonalSum[1] === -3) {
        oWin = true;
      }
    }
  }

  // 1. X最多有5个，O最多有4个，那么最多有两个方向的完成，且需要共享一个，那么这个共享的就一定可以最后下
  // 2. X 和 O 都赢的肯定不存在，
  if (xWin && oWin) {
    return false;
  } else if (xWin) {
    // 3. 如果只有 X 赢，那么 O 必定比 X 少下一个，总和必须为 1
    return numSum === 1;
  } else if (oWin) {
    // 4. 如果 O 赢，那么 O 必定跟 X 下的个数相同，总和必须为 0
    return numSum === 0;
  } else {
    // 5. 如果都没赢，那么总和既可以是 0 也可以是 1
    return numSum === 0 || numSum === 1;
  }
}
