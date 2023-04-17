// 本题为考试单行多行输入输出规范示例，无需提交，不计分。
export {};
var readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 当且仅当每个元素都不等于它前面的所有元素之和
// 长度为 n 的数组，每个元素都在 [1,m] 之间，有多少个不同的好数组？？？
rl.on('line', function (line: string) {
  let [n, m] = line.split(' ').map(item => parseInt(item));
  const memo = Array.from({ length: n * m + 1 }, () => Array(n + 1).fill(-1));

  function __traverse(preSum: number, num: number) {
    if (num < 0) return 0;
    if (num === 0) return 1;
    if (memo[preSum][num] !== -1) {
      return memo[preSum][num];
    }
    let cur = 0;
    for (let i = 1; i <= m; i++) {
      if (i !== preSum) {
        cur += __traverse(preSum + i, num - 1);
      }
    }
    memo[preSum][num] = cur;
    return cur;
  }

  console.log(__traverse(0, n));
});

function test(line: string) {
  let [n, m] = line.split(' ').map(item => parseInt(item));
  const memo = Array.from({ length: n * m + 1 }, () => Array(n + 1).fill(-1));

  function __traverse(preSum: number, num: number) {
    if (num < 0) return 0;
    if (num === 0) return 1;
    if (memo[preSum][num] !== -1) {
      return memo[preSum][num];
    }
    let cur = 0;
    for (let i = 1; i <= m; i++) {
      if (i !== preSum) {
        cur += __traverse(preSum + i, num - 1);
      }
    }
    memo[preSum][num] = cur;
    return cur;
  }

  console.log(__traverse(0, n));
}
test('3');
