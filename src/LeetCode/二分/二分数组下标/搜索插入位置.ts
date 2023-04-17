export function searchInsert(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = parseInt(String((left + right) / 2));
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  // 1 2 4
  return nums[left] >= target ? left : left + 1;
}

console.log(searchInsert([1, 3, 5, 6], 7));
