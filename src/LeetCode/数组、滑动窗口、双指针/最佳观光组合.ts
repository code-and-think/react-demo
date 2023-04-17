import * as _ from 'lodash';

// 最佳观光组合：values[i] + values[j] + i - j 最大
// 思路：从左往右遍历，因为每走一步前面的所有值都会递减1保持相对不变，如果新加入的值不是最大值的话，就永远不可能成为最大值
function maxScoreSightseeingPair(values: number[]): number {
  let res = Number.MIN_SAFE_INTEGER;
  let preMax = values[0] - 1;
  for (let i = 1; i < values.length; i++) {
    res = Math.max(res, preMax + values[i]);
    preMax = Math.max(preMax, values[i]);
    preMax--;
  }
  return res;
}
