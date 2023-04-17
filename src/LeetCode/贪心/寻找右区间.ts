import * as _ from 'lodash';

function findRightInterval(intervals: number[][]): number[] {
  const sortStartArr = intervals
    .map((item, i) => ({ start: item[0], index: i }))
    .sort((a, b) => a.start - b.start);

  function binarySearch(target: number) {
    let left = 0,
      right = sortStartArr.length - 1;
    while (left < right) {
      const mid = _.toInteger((left + right) / 2);

      if (sortStartArr[mid].start >= target) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    const { start, index } = sortStartArr[left];
    return start >= target ? index : -1;
  }

  const ans = [];
  for (const [, end] of intervals) {
    ans.push(binarySearch(end));
  }

  return ans;
}
