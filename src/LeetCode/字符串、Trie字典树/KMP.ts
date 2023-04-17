import * as _ from 'lodash';

function strStr(T: string, P: string): number {
  const [n, m] = [T.length, P.length];
  const fail = Array(m + 1).fill(0);
  fail[0] = -1;

  for (let i = 0, j = -1; i < m; ) {
    while (j !== -1 && P[i] !== P[j]) {
      j = fail[j];
    }
    fail[++i] = ++j;
  }
  let i = 0,
    j = 0;
  for (; i < n && j < m; i++, j++) {
    while (j !== -1 && T[i] !== P[j]) {
      j = fail[j];
    }
  }

  return j === m ? i - m : -1;
}

console.log(strStr('leetcode', 'leeto'));
