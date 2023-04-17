export {};

// 求子集，有重复元素且需去重
function subsetsWithDup2(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const [cur, ans, n] = [[] as number[], [] as number[][], nums.length];

  function __traverse(start: number) {
    if (start >= nums.length) {
      ans.push([...cur]);
      return;
    }
    cur.push(nums[start]);
    __traverse(start + 1);
    cur.pop();
    while (start + 1 < n && nums[start + 1] === nums[start]) {
      start++;
    }
    __traverse(start + 1);
  }

  __traverse(0);

  return ans;
}

console.log(subsetsWithDup2([1, 2, 2]));
