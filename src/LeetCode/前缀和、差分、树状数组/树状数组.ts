// 主要用于时间复杂度均为 O(logn)
// 单点修改：更改数组中一个元素的值
// 区间查询：查询一个区间内所有元素的和

export class FenWickTree {
  // 下标从 1 开始，因为 0 的 lowBit 始终为 0
  tree: number[];
  constructor(nums: number[]) {
    this.tree = Array(nums.length + 1).fill(0);
    for (let i = 1; i < nums.length; i++) {
      this.update(i, nums[i]);
    }
  }
  // update 的是增量
  update(n: number, delta: number) {
    const tree = this.tree;
    for (let i = n; i < tree.length; i += this.lowBit(i)) {
      tree[i] += delta;
    }
  }
  // 前 n 项和，从 1 开始
  query(n: number) {
    let ans = 0;
    for (let i = n; i > 0; i -= this.lowBit(i)) {
      ans += this.tree[i];
    }
    return ans;
  }
  // 区间查询 [l,r]，l 和 r 都大等于1
  queryRange(l: number, r: number) {
    return this.query(r) - this.query(l - 1);
  }

  lowBit(x: number) {
    return x & -x;
  }
}
// 手动添加一个 Number.MIN_SAFE_INTEGER 使它们的下标都 + 1
const res = [3, 5, 1, 4, 8, 3, 3];
res.unshift(Number.MIN_SAFE_INTEGER);
const tree = new FenWickTree(res);

console.log(tree.query(1)); //=>  前 1 项和 3
console.log(tree.query(2)); //=>  前 2 项和 8
console.log(tree.query(3)); //=>  前 3 项和 9
// 将 第一项增加 100 变为 103
tree.update(1, 100);
console.log(tree.query(1)); //=>  前 1 项和 103
console.log(tree.query(2)); //=>  前 2 项和 108
console.log(tree.query(3)); //=>  前 3 项和 109

console.log(tree.queryRange(1, 1));
console.log(tree.queryRange(1, 2));
