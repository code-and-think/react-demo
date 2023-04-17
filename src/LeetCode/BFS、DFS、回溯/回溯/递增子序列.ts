export {};

// 找出所有递增子序列，子序列至少有两个元素，可以按任意顺序返回答案
// 因为相对位置不能改变而不能排序使相同元素处于连续的情况下如何去重呢？？？
// 通过使用 set，而且它更通用，可以用它来代替排序
function findSubsequences(nums: number[]): number[][] {
  const [ans, cur, n] = [[] as number[][], [] as number[], nums.length];
  function __traverse(start: number) {
    const vis = new Set();

    for (let i = start; i < n; i++) {
      const num = nums[i];
      
      if (num >= (cur[cur.length - 1] ?? Number.MIN_SAFE_INTEGER) && !vis.has(num)) {
        vis.add(num);
        cur.push(nums[i]);
        __traverse(i + 1);
        cur.pop();
      }
    }
    if (cur.length >= 2) {
      ans.push([...cur]);
    }
  }

  __traverse(0);

  return ans;
}

console.log(findSubsequences([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]));
