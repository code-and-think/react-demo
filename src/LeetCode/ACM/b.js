var readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let N, M, P;
rl.on('line', function (line) {
  [N, M, P] = line.split(' ').map(Number);
  const ans = [];
  const cur = [];
  function __traverse(leavePack, leaveToy, valueSum) {
    if (leavePack === 0 && leaveToy === 0 && valueSum === P) {
      ans.push([...cur]);
      return;
    } else if (
      // 价值过大
      valueSum > P ||
      leavePack === 0 ||
      leaveToy === 0 ||
      // 不够放每袋一个
      leavePack > leaveToy
    ) {
      return;
    }
    for (let i = 1; i <= leaveToy; i++) {
      if (i >= (cur[cur.length - 1] ?? 0)) {
        cur.push(i);
        __traverse(leavePack - 1, leaveToy - i, valueSum + i * i);
        if (ans.length === 1) {
          return;
        }
        cur.pop();
      }
    }
  }

  __traverse(M, N, 0);
  if (ans.length === 0) {
    console.log(-1);
  } else {
    console.log(ans[0].join(' '))
  }
});
