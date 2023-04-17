import * as _ from 'lodash';

function hasGroupsSizeX(deck: number[]): boolean {
  function gcd(x: number, y: number): number {
    return y === 0
      ? x
      : // 当 y 为 1 时，因为任何数 % 1 都为0，所以下一轮的结果中 y 必定为 0 然后返回 x
        gcd(y, x % y);
  }

  // 最大公约数是最大的，所以可能是若干个较小的公约数的乘积
  const counter = Array(1e4).fill(0);
  for (const card of deck) {
    counter[card]++;
  }

  let res = 0;
  for (const count of counter) {
    res = gcd(res, count);
  }

  return res >= 2;
}
