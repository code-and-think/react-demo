// 计数排序也是一种特殊的桶排序，每个桶只存储单一数字
// 计数排序的前提是明确知道数字的范围
export function countingSort(nums: number[]) {
  const [max, min] = [Math.max(...nums), Math.min(...nums)];
  const count = Array(max - min + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    count[nums[i] - min]++;
  }
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  const nextNums = Array(nums.length);
  // 这里逆的话就是稳定排序，顺的话位非稳定
  for (let i = nums.length - 1; i >= 0; i--) {
    nextNums[--count[nums[i] - min]] = nums[i];
  }
  return nextNums;
}
