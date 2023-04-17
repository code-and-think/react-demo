import * as _ from 'lodash';

// 合并区间：将相交的进行合并，使得结果区间互不相交
// 贪心：每次都选相交区间的最右顶点
function merge(intervals: number[][]): number[][] {
  // 根据左顶点排序
  intervals.sort((left, right) => left[0] - right[0]);
  const ans: number[][] = [];

  let [preLeft, preRight] = intervals[0];
  for (let i = 1; i < intervals.length; i++) {
    const [left, right] = intervals[i];
    if (left <= preRight) {
      preRight = Math.max(preRight, right);
    } else {
      ans.push([preLeft, preRight]);
      [preLeft, preRight] = [left, right];
    }
  }

  return ans.concat([[preLeft, preRight]]);
}

// 移除最小区间个数，使剩余区间互不重叠
// 贪心：每次相交都删包含最右顶点的区间，让右顶点尽量小防止继续相交
function eraseOverlapIntervals(intervals: number[][]): number {
  let ans = 0;
  let curRight = Number.MIN_SAFE_INTEGER;

  intervals.sort((a, b) => a[0] - b[0]);

  for (const [left, right] of intervals) {
    // 不相交
    if (left >= curRight) {
      curRight = right;
    } else {
      ans++;
      // 删除区间，取较小的右顶点
      curRight = Math.min(curRight, right);
    }
  }

  return ans;
}
