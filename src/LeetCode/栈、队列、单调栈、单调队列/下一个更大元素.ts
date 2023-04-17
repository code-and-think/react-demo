export {};

function nextGreaterElements(nums: number[]): number[] {
  const n = nums.length;
  const ans = Array(n).fill(-1);
  const stack: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      ans[stack.pop()!] = nums[i];
    }
    stack.push(i);
  }

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      ans[stack.pop()!] = nums[i];
    }
    stack.push(i);
  }

  return ans;
}

console.log(nextGreaterElements([1, 2, 3, 4, 3, 4]));
