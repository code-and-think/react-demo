// 不修改 nums + O(1) 的额外空间
export function findDuplicate(nums: number[]): number {
  let left = 1;
  let right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const count = nums.filter(item => item <= mid).length;
    // 数字在 1 - mid 之间
    if (count > mid) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}
