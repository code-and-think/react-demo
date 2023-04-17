// 差分就是就是当前值减去前一个值
// 所以前缀和数列的差分就是原数列
// 同时差分序列的前缀和序列就是原序列
// 使用差分主要是为了实现对 [i,j] 整个区间加上某个值 k，根据差分的前缀和就是原值，
// 我们只需要对 diff[i] + k，然后对 diff[j + 1] - k 即可。
export class NumsDiff {
  diff: Array<number>;
  constructor(nums: number[]) {
    const diff = [];
    for (let i = 0; i < nums.length; i++) {
      diff.push(nums[i] - (nums[i - 1] ?? 0));
    }
    this.diff = diff;
  }

  insert(i: number, j: number, k: number) {
    this.diff[i] += k;
    this.diff[j + 1] -= k;
  }

  query(i: number) {
    return this.diff.slice(0, i + 1).reduce((sum, item) => sum + item, 0);
  }
}

const numsDiff = new NumsDiff([1, 3, 5, 9]);

numsDiff.insert(1, 2, 100);
console.log(numsDiff.query(0));
console.log(numsDiff.query(1));
console.log(numsDiff.query(2));
console.log(numsDiff.query(3));
