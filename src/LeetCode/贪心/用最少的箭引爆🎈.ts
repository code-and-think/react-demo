import * as _ from 'lodash';

function findMinArrowShots(points: number[][]): number {
  points.sort((a, b) => a[0] - b[0]);
  let ans = 0;
  let preEnd = points[0][1];

  for (let i = 1; i < points.length; i++) {
    const [start, end] = points[i];

    if (start > preEnd) {
      preEnd = end;
      ans++;
    } else {
      preEnd = Math.min(end, preEnd);
    }
  }

  return ++ans;
}

console.log(findMinArrowShots([
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
]));
