import * as _ from 'lodash';

// 左右指针分别对应小于x/大于x，然后就是合并两个有序数组了，在合并的时候通过与 x 的差值来判断取哪个
function findClosestElements(arr: number[], k: number, x: number): number[] {
  const n = arr.length;
  let xIndex = -1;
  for (let i = 0; i < n; i++) {
    if (arr[i] <= x) {
      xIndex = i;
    }
  }
  let greaterXIndex = xIndex + 1;
  const ans = [];

  while ((xIndex >= 0 || greaterXIndex < n) && ans.length < k) {
    if (xIndex >= 0 && greaterXIndex < n) {
      if (Math.abs(arr[xIndex] - x) <= Math.abs(arr[greaterXIndex] - x)) {
        ans.unshift(arr[xIndex--]);
      } else {
        ans.push(arr[greaterXIndex++]);
      }
    } else if (xIndex >= 0) {
      ans.unshift(arr[xIndex--]);
    } else {
      ans.push(arr[greaterXIndex++]);
    }
  }

  return ans;
}
