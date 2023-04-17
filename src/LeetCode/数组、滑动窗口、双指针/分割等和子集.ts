import * as _ from 'lodash';

// 数组元素是否可分成和相同的两部分
function canPartition(nums: number[]): boolean {
  const sum = _.sum(nums);
  if (sum % 2 === 1) {
    return false;
  }

  const set = new Set([sum / 2]);

  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i];
    const [iteObj, size] = [set.keys(), set.size];
    for (let i = 0; i < size; i++) {
      const target = iteObj.next().value;
      const chooseTarget = target - cur;
      if (chooseTarget > 0) {
        set.add(chooseTarget);
      } else if (chooseTarget === 0) {
        return true;
      }
    }
  }
  return false;
}

canPartition([3, 1, 5, 4, 2, 3]);
