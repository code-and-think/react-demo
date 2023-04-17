import * as _ from 'lodash';


function findPeakElement(nums: number[]): number {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    const mid = _.toInteger((left + right) / 2);
    // 右边的更大，那么右边的要么全程递增，要么先递增再递减，不管哪种都会出现顶峰元素
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}
