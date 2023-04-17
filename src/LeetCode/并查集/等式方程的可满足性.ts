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

export function equationsPossible(equations: string[]): boolean {
  const aCode = 'a'.charCodeAt(0);
  const mapFn = equations.map(item => {
    return [
      item[0].charCodeAt(0) - aCode,
      item[1],
      item[2],
      item[3].charCodeAt(0) - aCode,
    ] as const;
  });
  const equalFn = mapFn.filter(item => item[1] === '=');
  const inEqualFn = mapFn.filter(item => item[1] === '!');
  const findUnion = new FindUnion(24);
  let res = true;

  equalFn.forEach(item => {
    findUnion.union(item[0], item[3]);
  });

  inEqualFn.forEach(item => {
    const equal = findUnion.find(item[0]) === findUnion.find(item[3]);
    if (equal) {
      res = false;
    }
  });

  return res;;
}
