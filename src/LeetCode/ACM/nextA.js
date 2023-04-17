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
    const map = new Map();

    for (let i = 0; i < arr.length; i++) {
      map.set(arr[i], (map.get(arr[i]) ?? 0) + 1);
    }

    let ans = 0;
    map.forEach(value => {
      if (value > k) {
        ans += value - k;
      }
    });

    console.log(ans);
  }
});


console.log('111 222'.split(' '))