import * as _ from 'lodash';

function guessNumber(n: number): number {
  let left = 1;
  let right = n;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const res = guess(mid);
    if (res === 0) {
      return mid;
      // 往小了看
    } else if (res === -1) {
      right = mid - 1;
    } else {
      // 晚大了看
      left = mid + 1;
    }
  }

  return left;
}

function guess(n: number): -1 | 0 | 1 {
  return 1;
}
