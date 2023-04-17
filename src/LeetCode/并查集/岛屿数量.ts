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

export function numIslands(grid: string[][]) {
  const findUnion = new FindUnion(grid.length * grid[0].length);

  let cur = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        if (grid[i][j - 1] === '1') {
          findUnion.union(cur, cur - 1);
        }
        if (grid[i][j + 1] === '1') {
          findUnion.union(cur, cur + 1);
        }
        if (grid[i - 1]?.[j] === '1') {
          findUnion.union(cur, cur - grid[0].length);
        }
        if (grid[i + 1]?.[j] === '1') {
          findUnion.union(cur, cur + grid[0].length);
        }
      }
      cur++;
    }
  }

  return Array.from(new Set(findUnion.parent.map(item => findUnion.find(item)))).filter(item => {
    return grid[parseInt(String(item / grid[0].length))]?.[item % grid[0].length] === '1';
  }).length;
}
