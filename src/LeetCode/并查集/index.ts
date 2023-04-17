export class UnionFind {
  parent: Array<number>;
  constructor(n: number) {
    this.parent = [];
    // 初始时每个集合的代表元素就是自身
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }
  find(x: number) {
    // 如果 x === this.parent[x] 的话说明找到根节点了
    while (x !== this.parent[x]) {
      // 不断循环查找根结点
      x = this.parent[x];
    }
    return this.parent[x];
  }
  union(x: number, y: number) {
    let [rootX, rootY] = [this.find(x), this.find(y)];
    // 本就属于同个集合的不需要操作
    if (rootX !== rootY) {
      this.parent[rootX] = rootY;
    }
  }
}

// 时间复杂度：最坏情况下，树会退化成链，
// 例如当 n=6 时，依次执行如下操作： union(1, 2) union(1, 3) union(1, 4) union(1, 5) union(1, 6)
// 这时候每次查询节点 1 的时候都需要遍历整棵「树」，所以 find 函数最坏时间复杂度是：O(n)，n 为节点数。
// 基础模版里可能退化成链，当实际情况下我们可以在每次 find 时对路径进行压缩从而缩短下一次的查询路径
export class UnionFindZipRoute {
  parent: Array<number>;
  constructor(n: number) {
    this.parent = [];
    // 初始时每个集合的代表元素就是自身
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }
  find(x: number): number {
    if (x !== this.parent[x]) {
      this.parent[x] = this.find(this.parent[x]);
    }
    // 这里是个递归，找到根节点才会返回，所以只要一次就会让所有节点指向根节点
    // 但是只有 find 的这一条路径是指向根的，并不是任意时候的 parent[i] 都是指向根的
    /**  这里是直接指向根，也可以选择只减少一层
     * while (x != parent[x])
      {
          parent[x] = parent[parent[x]];
          x = parent[x];
      }
      return x;
     */
    return this.parent[x];
  }
  union(x: number, y: number) {
    let [rootX, rootY] = [this.find(x), this.find(y)];
    if (rootX !== rootY) {
      this.parent[rootX] = rootY;
    }
  }
}

export class UnionFind2 {
  // 在合并的时候应该尽量让节点少的指向节点多的（但是节点数量好像并不和层级相关，但多数情况下也没有卡那么死）
  // 才能保证大多数节点的路径不增加，合并效益更高
  parent: Array<number>;
  rank: Array<number>;
  constructor(n: number) {
    this.parent = [];
    this.rank = [];

    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
      this.rank[i] = 1;
    }
  }
  find(x: number): number {
    if (x === this.parent[x]) {
      return x;
    }
    return (this.parent[x] = this.find(this.parent[x]));
  }
  union(x: number, y: number) {
    let [rootX, rootY] = [this.find(x), this.find(y)];
    if (rootX !== rootY) {
      // rootX 的节点更多，应该让节点少的 rootY 指向 rootX
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
        this.rank[rootX] += this.rank[rootY];
      } else {
        this.parent[rootX] = rootY;
        this.rank[rootY] += this.rank[rootX];
      }
    }
  }
}
