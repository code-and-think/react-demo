export {};
import * as _ from 'lodash';

function substringXorQueries(s: string, queries: number[][]): number[][] {
  const map = new Map<number, [number, number]>();
  for (let i = 0; i < s.length; i++) {
    let num = 0;
    for (let j = i; j < Math.min(32 + i, s.length); j++) {
      const posNum = Number(s[j]);
      if (num === 0 && posNum === 0) {
        if (!map.get(0)) map.set(0, [i, i]);
        break;
      }
      num <<= 1;
      num += Number(s[j]);
      if (!map.get(num)) {
        map.set(num, [i, j]);
      }
    }
  }

  const res: number[][] = [];

  queries.forEach(([a, b]) => {
    res.push(map.get(a ^ b) ?? [-1, -1]);
  });

  return res;
}

console.log(substringXorQueries('0101', [[12, 8]]));
