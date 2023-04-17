import * as _ from 'lodash';

// 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使得出现次数超过两次的元素只出现两次 ，返回删除后数组的新长度。
// [1,1,1,2,2,3] 返回 5，nums = [1,1,2,2,3]
// 思路：快慢双指针，快指针遍历数组，慢指针模拟结果数组
function removeDuplicates(nums: number[]): number {
  let i = -1;
  const n = nums.length;
  for (let j = 0; j < n; j++) {
    // i + 1 表示结果数组的最后一项，默认结果数组为空无最后一项所以值为 -1
    // 有两种情况需要往结果里面添加当前元素 nums[j]
    // 第一种：nums[j] !== nums[i] 表示出现新的数字
    // 第二种：nums[j] === nums[i] && nums[j] !== nums[i - 1] 说明出现第二个数字
    if (nums[j] !== nums[i] || nums[j] !== nums[i - 1]) {
      nums[++i] = nums[j];
    }
  }

  return i + 1;
}
