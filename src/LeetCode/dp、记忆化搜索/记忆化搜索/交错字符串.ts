import * as _ from 'lodash';

function isInterleave(s1: string, s2: string, s3: string): boolean {
  const memo: Record<string, boolean> = {};

  function __traverse(prev: string, after: string, res: string) {
    const str = [prev, after, res].join('&&');
    if (prev + after === res) {
      return true;
    } else if (memo[str] != null) {
      return memo[str];
    }

    for (let i = 1; i <= prev.length; i++) {
      const prevPart = prev.slice(0, i);
      if (res.startsWith(prevPart) && __traverse(after, prev.slice(i), res.slice(i))) {
        return true;
      }
    }

    return (memo[str] = false);
  }

  return __traverse(s1, s2, s3) || __traverse(s2, s1, s3);
}

console.log(isInterleave('cc', 'ca', 'ccac'));
