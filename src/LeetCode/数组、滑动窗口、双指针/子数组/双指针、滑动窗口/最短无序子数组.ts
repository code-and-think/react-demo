import * as _ from 'lodash';

// 找出 最短 的子数组，对该子数组排序后就能让数组整体有序
// 滑动窗口维护子数组的最大/最小值，其中最小值必须比子数组左边的大，最大值必须比子数组右边的小
function findUnsortedSubarray(nums: number[]): number {
  let left = -1,
    right = nums.length;
  while (left + 1 < right && (nums[left] ?? Number.MIN_SAFE_INTEGER) <= nums[left + 1]) {
    left++;
  }
  while (
    left + 1 < right &&
    nums[right - 1] <= (nums[right] ?? Number.MAX_SAFE_INTEGER) &&
    nums[left] <= nums[right - 1]
  ) {
    right--;
  }
  let min = Number.MAX_SAFE_INTEGER,
    max = Number.MIN_SAFE_INTEGER;
  for (let i = left + 1; i < right; i++) {
    min = Math.min(nums[i], min);
    max = Math.max(nums[i], max);
  }
  while (left >= 0 && min < nums[left]) {
    min = Math.min(min, nums[left--]);
  }
  while (right < nums.length && max > nums[right]) {
    max = Math.max(max, nums[right++]);
  }

  return right - left - 1;
}
console.log(findUnsortedSubarray([2, 1, 3]));
