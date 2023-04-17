export function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let res = 0;

  while (left < right) {
    res = Math.max(res, Math.min(left, right) ** 2);
    if (height[left] >= height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return res;
}
