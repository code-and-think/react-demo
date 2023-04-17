// 归并相比快排的优势是稳定，坏处是需要额外的空间复杂度 O(n)
export function mergeSort(nums: number[]) {
  function _mergeSort(start: number, end: number) {
    if (start >= end) {
      return;
    }
    const mid = (start + end) >> 1;
    _mergeSort(start, mid);
    _mergeSort(mid + 1, end);
    const res = Array(end - start + 1).fill(0);
    let leftIndex = start;
    let rightIndex = mid + 1;

    for (let i = 0; i < res.length; i++) {
      if (leftIndex > mid) {
        res[i] = nums[rightIndex++];
      } else if (rightIndex > end) {
        res[i] = nums[leftIndex++];
      } else if (nums[leftIndex] < nums[rightIndex]) {
        res[i] = nums[leftIndex++];
      } else {
        res[i] = nums[rightIndex++];
      }
    }

    for (let i = 0; i < res.length; i++) {
      nums[start + i] = res[i];
    }
  }

  _mergeSort(0, nums.length - 1);

  return nums;
}

console.log(mergeSort([3, 5, 1, 2, 4, 8, 0]));
