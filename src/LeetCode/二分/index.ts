import * as _ from 'lodash';

function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    // 没有 + 1 所以在两个元素时是靠左边，这时候不能写成 left = mid 搭配 right = mid + 1 因为这样会死循环
    // 而是要写成 left = mid + 1 搭配 right = mid
    // 防止数据溢出可写成：const mid = left + (right - left) / 2;
    const mid = _.toInteger((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  // 如果不是目标值的话就是大于目标值中最小的，如果没有大于的话就是小于目标值中最大的
  return nums[left] === target ? left : -1;
  // 如果想优先是小于的最大的话改成 left = mid right = mid - 1
}

console.log(search([1, 3, 5, 7], 4));

// 上面是没有目标值时获取大于/小于，能不能直接获取大于/小于呢？？？
// 直接获取最小的大于
function searchGT(nums: number[], target: number) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = parseInt(String((left + right) / 2));
    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left];
}
// 直接获取最大的小于
function searchLT(nums: number[], target: number) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = parseInt(String((left + right + 1) / 2));
    if (nums[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid;
    }
  }
  return nums[left];
}

console.log(searchGT([1, 3, 5, 7], 3));
console.log(searchLT([1, 3, 5, 7], 5));
