class FindUnion {
  parent: Array<number>;
  rank: Array<number>;
  count: number;

  constructor(n: number) {
    this.parent = [];
    this.rank = [];
    this.count = n;
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
      this.rank[i] = 1;
    }
  }

  find(x: number) {
    if (x !== this.parent[x]) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number) {
    const [rootX, rootY] = [this.find(x), this.find(y)];
    if (rootX !== rootY) {
      this.count--;
      if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
        this.rank[rootY] += this.rank[rootX];
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX] += this.rank[rootY];
      }
    }
  }
}

export function findCircleNum(isConnected: number[][]): number {
  const findUnion = new FindUnion(isConnected.length);
  for (let i = 0; i < isConnected.length; i++) {
    for (let j = 0; j < isConnected[i].length; j++) {
      if (isConnected[i][j]) {
        findUnion.union(i, j);
      }
    }
  }
  return findUnion.count;
}

console.log(
  findCircleNum([
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ])
);
