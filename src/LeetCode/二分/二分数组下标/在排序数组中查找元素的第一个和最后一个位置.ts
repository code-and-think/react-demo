import * as _ from 'lodash';

function searchRange(nums: number[], target: number) {
  function searchGT() {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
      const mid = parseInt(String((left + right) / 2));
      if (nums[mid] <= target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return nums[left] > target ? left : nums.length;
  }

  function searchLT() {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
      const mid = parseInt(String((left + right + 1) / 2));
      if (nums[mid] >= target) {
        right = mid - 1;
      } else {
        left = mid;
      }
    }

    return nums[left] < target ? left : -1;
  }

  const res = [searchLT() + 1, searchGT() - 1];

  if (res[0] > res[1]) {
    return [-1, -1];
  } else {
    return res;
  }
}

console.log(searchRange([8,8,8,8], 8));
