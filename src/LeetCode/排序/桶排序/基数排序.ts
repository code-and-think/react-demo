// 基数排序是一种特殊的桶排序，它根据数字在 radix 分位上的数字来分配桶；
// 普通版本：不能包含负数
export function radixSort(nums: number[]) {
  // 求数据中的最大位数，负数怎么办？
  const maxNum = Math.max(...nums);
  const maxBit = String(maxNum).length * (maxNum < 0 ? -1 : 1);
  let radix = 1;

  for (let i = 1; i <= maxBit; i++) {
    const count = Array(10).fill(0);
    // 记录该位上 0 - 9 的出现次数
    for (let j = 0; j < nums.length; j++) {
      console.log({ numsJ: nums[j], radix: Math.floor(nums[j] / radix) % 10 });
      count[Math.floor(nums[j] / radix) % 10]++;
    }
    // count 数组求前缀和，则 count[i] 表示该位为 i 的数应该去到的下标
    for (let j = 1; j < 10; j++) {
      count[j] += count[j - 1];
    }
    const nextNums = [];
    // 必须从后往前遍历，保持该位相同的数字的相对顺序不变
    for (let j = nums.length - 1; j >= 0; j--) {
      nextNums[--count[Math.floor(nums[j] / radix) % 10]] = nums[j];
    }
    nums = nextNums;
    radix *= 10;
  }

  return nums;
}

export function radixSortWithNegative(nums: number[]) {
  // 求数据中的最大位数，负数怎么办？
  const maxBit = String(Math.max(...nums.map(Math.abs))).length;
  let radix = 1;

  function getNumInRadix(num: number) {
    return (Math.floor(num / radix) % 10) + 10;
  }

  for (let i = 1; i <= maxBit; i++) {
    const count = Array(20).fill(0);
    // 记录该位上 0 - 9 的出现次数
    for (let j = 0; j < nums.length; j++) {
      count[getNumInRadix(nums[j])]++;
    }

    // count 数组求前缀和，则 count[i] 表示该位为 i 的数应该去到的下标
    for (let j = 1; j < count.length; j++) {
      count[j] += count[j - 1];
    }
    const nextNums = [];
    // 必须从后往前遍历，保持该位相同的数字的相对顺序不变
    for (let j = nums.length - 1; j >= 0; j--) {
      nextNums[--count[getNumInRadix(nums[j])]] = nums[j];
    }
    nums = nextNums;
    radix *= 10;
  }

  return nums;
}

console.log(
  radixSortWithNegative([-1, -2, -3, 0, 5, 10, 100, 100, 88, -4, -5, -111, -11, -21, -51, -1111])
);
