import * as _ from 'lodash';

// [4,3,2,7,8,2,3,1]
function findDisappearedNumbers(nums: number[]): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let cur = nums[i]; i + 1 !== cur && nums[cur - 1] !== cur; cur = nums[i]) {
      [nums[i], nums[cur - 1]] = [nums[cur - 1], nums[i]];
    }
  }

  const ans = [];
  for (let i = 0; i < nums.length; i++) {
    if (i + 1 !== nums[i]) {
      ans.push(i + 1);
    }
  }

  return ans;
}
console.log(findDisappearedNumbers([1, 1, 1, 1, 1, 1]));
