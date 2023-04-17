import * as _ from 'lodash';

function majorityElement(nums: number[]): number {
  let cur = 0;
  let count = 0;

  for (const item of nums) {
    if (count === 0) {
      cur = item;
      count = 1;
    } else if (item === cur) {
      count++;
    } else {
      count--;
    }
  }

  return cur;
}

majorityElement([4, 1, 4, 2, 4, 3, 4]);
