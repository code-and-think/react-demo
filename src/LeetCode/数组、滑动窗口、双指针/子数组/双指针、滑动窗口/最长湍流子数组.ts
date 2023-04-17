
import * as _ from 'lodash';

// 最长湍流子数组：比较符号在前后不同
function maxTurbulenceSize(arr: number[]): number {
  let pre;
  let ans = 1;
  let left = 0;
  for (let i = 1; i < arr.length; i++) {
    const cur = arr[i] - arr[i - 1];
    if (cur === 0) {
      left = i;
      pre = null;
    } else if (pre == null) {
      pre = cur;
      ans = Math.max(ans, i - left + 1);
    } else if (pre * cur < 0) {
      pre = cur;
      ans = Math.max(ans, i - left + 1);
    } else {
      pre = cur;
      left = i - 1;
    }
  }
  return ans;
}