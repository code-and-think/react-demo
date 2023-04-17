import * as _ from 'lodash';
import { toInteger } from 'lodash';
// 二分法
function mySqrt(x: number): number {
  let left = 0,
    right = x;
  while (left < right) {
    const mid = toInteger((left + right + 1) / 2);
    if (mid * mid > x) {
      right = mid - 1;
    } else {
      left = mid;
    }
  }

  return left;
}
