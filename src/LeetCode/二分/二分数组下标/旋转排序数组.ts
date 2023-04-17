// 搜索指定值（数组中的每一项都不相同）
export function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = parseInt(String((left + right) / 2));
    // 左边升序
    // 为什么包含等于？因为等于只可能在两个元素的时候出现。这时候 left === mid，应该是 [left,mid] 升序而不是 [mid,right] 升序
    if (nums[left] <= nums[mid]) {
      // 在这个范围内
      if (nums[left] <= target && target <= nums[mid]) {
        right = mid;
      } else {
        // 不在这个范围内
        left = mid + 1;
      }
    } else {
      // 从下标 mid 到下标 right 是升序
      // 在这个范围内
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        // 不在这个范围内
        right = mid;
      }
    }
  }

  return nums[left] === target ? left : -1;
}

// 搜索最小值
function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = parseInt(String((left + right) / 2));
    // 左边升序
    if (nums[left] <= nums[mid]) {
      // nums[left] 是否是最小的，是的话继续搜左边
      if (nums[left] < nums[right]) {
        right = mid;
      } else {
        // 否则搜右边
        left = mid + 1;
      }
    } else {
      // 右边升序，则最小一定是在 [left,mid] 里面
      right = mid;
    }
  }

  return nums[left];
}

// 搜索指定值，数组中可能存在相同项，因为在 nums[left] === nums[mid] 时无法确定左边是否升序如：
// [0,0,0,0,0,0,1] 且 nums[left] === nums[mid] 时可能是 [0,0,0,0,0,1,0] 或者是 [0,1,0,0,0,0,0]
// 所以会退化成 O(n)
export function searchHasSame(nums: number[], target: number) {
  
}
