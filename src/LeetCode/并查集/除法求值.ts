export class UnionFind {
  parent: Record<string, { parentIndex: string; times: number }>;

  constructor(n: string[]) {
    this.parent = {};

    for (let i = 0; i < n.length; i++) {
      this.parent[n[i]] = { parentIndex: n[i], times: 1 };
    }
  }
  find(x: string) {
    if (x !== this.parent[x].parentIndex) {
      const res = this.find(this.parent[x].parentIndex);
      this.parent[x] = { parentIndex: res.parentIndex, times: this.parent[x].times * res.times };
    }
    return this.parent[x];
  }
  union(x: string, y: string, times: number) {
    const [{ parentIndex: rootX, times: xTimes }, { parentIndex: rootY, times: yTimes }] = [
      this.find(x),
      this.find(y),
    ];

    if (rootX !== rootY) {
      this.parent[rootX] = { parentIndex: rootY, times: (times * yTimes) / xTimes };
    }
  }
}
function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
  const existNum = new Set(equations.reduce((res, item) => res.concat(item), [] as string[]));

  const unionFind = new UnionFind(Array.from(existNum));
  equations.forEach(([left, right], i) => {
    unionFind.union(left, right, values[i]);
    existNum.add(left);
    existNum.add(right);
    console.log(unionFind.parent);
  });

  return queries.map(([left, right]) => {
    if (existNum.has(left) && existNum.has(right)) {
      const rootLeft = unionFind.find(left);
      const rootRight = unionFind.find(right);
      // console.log({ rootLeft, rootRight });
      if (rootLeft.parentIndex === rootRight.parentIndex) {
        return rootLeft.times / rootRight.times;
      } else {
        return -1.0;
      }
    } else {
      return -1.0;
    }
  });
}
