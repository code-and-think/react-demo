export {};
import * as _ from 'lodash';
// h 代表“高引用次数”（high citations）
// 一名科研人员的 h 指数是指他（她）的 （n 篇论文中）总共有 h 篇论文分别被引用了至少 h 次。
// 且其余的 n - h 篇论文每篇被引用次数 不超过 h 次。

// h篇每篇至少被引用了 h 次，其余的 n - h 篇每篇不超过 h 次
function hIndex(citations: number[]): number {
  let [left, right] = [0, citations[citations.length - 1]];

  function binarySearch(target: number) {
    let left = 0,
      right = citations.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (citations[mid] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return citations[left] >= target ? left : citations.length;
  }

  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);
    if (citations.length - binarySearch(mid) >= mid) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

console.log(hIndex([0,0]));
