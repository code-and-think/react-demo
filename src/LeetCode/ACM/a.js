var readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n, k;
rl.on('line', function (line) {
  if (n == null) {
    [n, k] = line.split(' ').map(Number);
  } else {
    const arr = line.split(' ').map(Number);
    const map = {};

    for (let i = 0; i < arr.length; i++) {
      map[arr[i]] = (map[arr[i]] ?? 0) + 1;
    }

    let ans = 0;
    Object.values(map).forEach(item => {
      if (item > k) {
        ans += item - k;
      }
    });

    console.log(ans);
  }
});
