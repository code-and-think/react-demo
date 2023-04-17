export class UnionFindZipRoute {
  // 基础模版里可能退化成链，当实际情况下我们可以在每次 find 时对路径进行压缩从而缩短下一次的查询路径
  parent: Array<number>;
  constructor(n: number) {
    this.parent = [];
    // 初始时每个集合的代表元素就是自身
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }
  find(x: number) {
    if (x !== this.parent[x]) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
  union(x: number, y: number) {
    let [rootX, rootY] = [this.find(x), this.find(y)];
    if (rootX !== rootY) {
      this.parent[rootX] = rootY;
    }
  }
}

export function findRedundantConnection(edges: number[][]): number[] {
  const unionFind = new UnionFindZipRoute(edges.length);
  let res: number[] = [];
  for (let i = 0; i < edges.length; i++) {
    const item = edges[i];
    if (unionFind.find(item[0]) === unionFind.find(item[1])) {
      res = item;
      break;
    }
    unionFind.union(item[0], item[1]);
  }
  return res;
}
