export {};
// 直接插入
function insertSort(nums: number[]) {
  const n = nums.length;
  for (let i = 1; i < n; i++) {
    const temp = nums[i];
    let j: number;
    // 寻找插入位置
    for (j = i - 1; j >= 0; j--) {
      if (nums[j] < temp) {
        break;
      }
    }
    // j + 1 就要去的下标，所以要将 j + 1 到 i - 1范围内的元素往右挪腾出 j + 1
    for (let k = i - 1; k > j; k--) {
      nums[k + 1] = nums[k];
    }
    // k 最终停在 j 到位置
    nums[j + 1] = temp;
  }

  return nums;
}


// 折半插入，因为左边是递增的所以可用二分搜索插入位置，但实际挪动还是 O(n) 所以整体时间复杂度无变化
