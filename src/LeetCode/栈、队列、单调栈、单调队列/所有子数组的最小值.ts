import * as _ from 'lodash';

// 所有子数组的最小值之和
// 给定一个整数数组 arr，找到 min(b) 的总和，其中 b 的范围为 arr 的每个（连续）子数组。
// 由于答案可能很大，因此 返回答案模 10^9 + 7 。
function sumSubarrayMins(arr: number[]): number {
  const n = arr.length;
  const minRight = Array(n).fill(n);
  const stack: number[] = [];
  // 单调栈
  for (let i = 0; i < n; i++) {
    while (stack.length && arr[stack[stack.length - 1]] > arr[i]) {
      minRight[stack.pop()!] = i;
    }
    stack.push(i);
  }

  const times = Array(n).fill(1);
  let ans = 0,
    mod = 1e9 + 7;
  for (let i = 0; i < n; i++) {
    if (minRight[i] !== n) {
      times[minRight[i]] = (times[minRight[i]] + times[i]) % mod;
    }
    ans = (ans + ((arr[i] * (minRight[i] - i) * times[i]) % mod)) % mod;
  }

  return ans;
}

console.log(sumSubarrayMins([11, 81, 94, 43, 3]));

// 所有子数组的最小值中的最大值
function findMaximums(nums: number[]) {
  const n = nums.length;
  const ans = Array(n + 1).fill(Number.MIN_SAFE_INTEGER);
  let stack: number[] = [];
  const rightMin = Array(n).fill(n);
  const leftMin = Array(n).fill(-1);

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] > nums[i]) {
      rightMin[stack.pop()!] = i;
    }
    stack.push(i);
  }

  stack = [];

  for (let i = nums.length - 1; i >= 0; i--) {
    while (stack.length && nums[stack[stack.length - 1]] >= nums[i]) {
      leftMin[stack.pop()!] = i;
    }
    stack.push(i);
  }

  for (let i = 0; i < n; i++) {
    const leftGreatCount = i - leftMin[i] - 1;
    const rightGreatCount = rightMin[i] - i - 1;

    for (
      let j = Math.max(leftGreatCount, rightGreatCount) + 1;
      j <= leftGreatCount + rightGreatCount + 1;
      j++
    ) {
      ans[j] = Math.max(ans[j], nums[i]);
    }
  }

  return ans.slice(1);
}

console.log(findMaximums([0, 1, 2, 4]));
