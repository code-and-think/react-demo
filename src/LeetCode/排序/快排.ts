export function quickSort(nums: number[]) {
  function _quickSort(start: number, end: number) {
    if (start >= end) return;
    const p = partition(start, end);
    _quickSort(start, p - 1);
    _quickSort(p + 1, end);
  }
  // 让左边都是小于 nums[res]，右边都是大于 nums[res]，等于的在哪边都可以
  function partition(start: number, end: number) {
    // pivot可以选择任意一个元素，但一般选 left/right 因为方便跳过
    let pivot = nums[start];
    // pivotIndex 是最后一个值小于 pivot 的下标，每当发现小于 pivot 的值时，就将它交换到当前 pivotIndex 位置
    // 然后 pivotIndex+1 因为多了一个小于pivot的
    let pivotIndex = start;
    for (let i = start + 1; i <= end; i++) {
      if (nums[i] < pivot) {
        swap(i, pivotIndex + 1);
        pivotIndex++;
      }
    }
    swap(start, pivotIndex);
    return pivotIndex;
  }

  function swap(x: number, y: number) {
    [nums[x], nums[y]] = [nums[y], nums[x]];
  }

  _quickSort(0, nums.length - 1);
  return nums;
}

// 第一版的坏处是：[3,5,1,1,1,1] 因为一直有小于 pivot 的会一直交换多次才能把大于 pivot 的 5 送到目标位置而不能一步到位
// 双路快排就是用来解决交换一步到位问题
export function quickSort2Way(nums: number[]) {
  function _quickSort(start: number, end: number) {
    if (start >= end) return;
    const p = partition(start, end);
    _quickSort(start, p - 1);
    _quickSort(p + 1, end);
  }
  function partition(start: number, end: number) {
    let pivot = nums[start];
    let left = start + 1;
    let right = end;
    while (left <= right) {
      // 对于 [3,5,1,1,1,1]，第一轮中 left = 1 right = 5，一次交换就能变成 [3,1,1,1,1,5]
      while (left <= right && nums[left] <= pivot) left++;
      while (left <= right && nums[right] >= pivot) right--;
      if (left <= right) {
        swap(left, right);
      }
    }
    // left 停的位置是 > pivot 而 right 停的位置是 < pivot，而 start 是小于 pivot 的位置所以要交换 right
    swap(start, right);

    return right;
  }

  function swap(x: number, y: number) {
    [nums[x], nums[y]] = [nums[y], nums[x]];
  }

  _quickSort(0, nums.length - 1);
  return nums;
}

// 当数组中重复元素非常多的时候，可能出现等于 pivot 的元素太多，那么就将数组分成了极度不平衡的两个部分，因为等于 pivot 的部分总是集中在数组的某一边。
// 极端情况下会使快排由 nlogn 退化为 n**2
export function quickSort3Way(nums: number[]) {
  function _quickSort(start: number, end: number) {
    if (start >= end) return;
    let pivot = nums[start];
    let left = start;
    let right = end + 1;
    let mid = start + 1;

    while (mid < right) {
      if (nums[mid] > pivot) {
        swap(mid, right - 1);
        right--;
      } else if (nums[mid] < pivot) {
        swap(mid, left + 1);
        left++;
        mid++;
      } else {
        mid++;
      }
    }
    // left 停在最后一个小于 pivot 的
    // mid 停止最后一个等于 pivot 的
    // right 停在第一个大于 pivot 的
    swap(start, left);

    // 交换后的 left 为第一个等于 pivot 的
    _quickSort(start, left - 1);
    _quickSort(right, end);
  }

  function swap(x: number, y: number) {
    [nums[x], nums[y]] = [nums[y], nums[x]];
  }

  _quickSort(0, nums.length - 1);
  return nums;
}
