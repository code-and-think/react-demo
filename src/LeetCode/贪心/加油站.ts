import * as _ from 'lodash';

export {};

function canCompleteCircuit(gas: number[], cost: number[]): number {
  const minus = gas.map((item, i) => item - cost[i]);
  if (_.sum(minus) < 0) {
    return -1;
  }
  let cur = 0,
    max = 0,
    ans = -1;
  for (let i = minus.length - 1; i >= 0; i--) {
    cur += minus[i];
    if (cur >= max) {
      max = cur;
      ans = i;
    }
  }

  return ans;
}

console.log(canCompleteCircuit([], [1]));
// [7,-2,7,-2,7]
