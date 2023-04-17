import * as _ from 'lodash';

function prisonAfterNDays(cells: number[], n: number): number[] {
  let mask = 0;
  const memo = new Map<number, number>();
  // 求出 mask
  for (let i = 0; i < 8; i++) {
    mask |= cells[7 - i] << i;
  }

  while (n > 0) {
    if (memo.has(mask)) {
      // 循环长度为 n - memo.get(mask)!，所以可知 n%= n - memo.get(mask)! 的状态还是 mask
      n %= n - memo.get(mask)!;
    }
    memo.set(mask, n);
    if (n >= 1) {
      n--;
      mask = nextDay(mask);
    }
  }

  function nextDay(mask: number) {
    let ans = 0;
    for (let i = 1; i < 7; i++) {
      if (((mask >> (i - 1)) & 1) === ((mask >> (i + 1)) & 1)) {
        ans |= 1 << i;
      }
    }

    return ans;
  }

  const ans = Array(8).fill(0);

  for (let i = 0; i < 8; i++) {
    ans[7 - i] = (mask >> i) & 1;
  }

  return ans;
}
