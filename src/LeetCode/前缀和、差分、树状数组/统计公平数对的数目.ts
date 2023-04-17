import * as _ from 'lodash';

class FenWickTree {
  nums: number[];

  constructor(n: number) {
    this.nums = Array(n).fill(0);
  }

  update(x: number) {
    for (let i = x; i < this.nums.length; i += this.lowBit(i)) {
      this.nums[i]++;
    }
  }

  query(n: number) {
    let ans = 0;
    for (let i = n; i > 0; i -= this.lowBit(i)) {
      ans += this.nums[i];
    }
    return ans;
  }

  queryRange(l: number, r: number) {
    return this.query(r) - this.query(l - 1);
  }

  lowBit(x: number) {
    return x & -x;
  }
}

function countFairPairs(nums: number[], lower: number, upper: number) {
  // 离散化
  const uniqSortArr = _.uniq(
    nums
      .reduce(
        (res, item) => {
          res.push(item);
          res.push(lower - item);
          res.push(upper - item);
          return res;
        },
        [Number.MIN_SAFE_INTEGER] as number[]
      )
      .sort((a, b) => a - b)
  );
  // 在开头手动加一个让所有的下标都 + 1
  const bit = new FenWickTree(uniqSortArr.length);
  function binarySearch(target: number) {
    let left = 0,
      right = uniqSortArr.length - 1;
    while (left < right) {
      const mid = (left + right) >> 1;
      if (uniqSortArr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return uniqSortArr[left] >= target ? left : -1;
  }
  let ans = 0;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const index = binarySearch(num);
    const lowIndex = binarySearch(lower - num);
    const highIndex = binarySearch(upper - num);
    const res = bit.queryRange(lowIndex, highIndex);
    if (res > 0) {
      ans += res;
    }
    bit.update(index);
  }

  return ans;
}

console.log(countFairPairs([-1, -1, 0, 0], 1, 1));
