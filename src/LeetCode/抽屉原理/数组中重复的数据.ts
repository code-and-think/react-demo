import * as _ from 'lodash';

// nums中的数字都在范围 [1,n]，且每个整数出现 一次 或 两次 。请你找出所有出现 两次 的整数，
// 将数字 num 放到它应该在的下标 num - 1 处，那么所有 nums[i] !== i + 1 中放的 i + 1 就是重复的数字
function findDuplicates(nums: number[]): number[] {
  const ans = [];

  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i + 1 && nums[nums[i] - 1] !== nums[i]) {
      const temp = nums[i];
      nums[i] = nums[temp - 1];
      nums[temp - 1] = temp;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      ans.push(nums[i]);
    }
  }

  return ans;
}

console.log(findDuplicates([1, 1, 2, 2, 3]));
