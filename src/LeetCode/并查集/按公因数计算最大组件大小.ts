class UnionFind {
  parent: number[];
  members: number[];
  rank: number[];
  max = 1;

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.members = Array(n).fill(0);
    this.rank = Array(n).fill(1);
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
      const [rankLowRoot, rankHighRoot] =
        this.rank[rootX] > this.rank[rootY] ? [rootX, rootY] : [rootY, rootX];

      this.parent[rankLowRoot] = rankHighRoot;
      this.members[rankHighRoot] += this.members[rankLowRoot];
      this.rank[rankHighRoot] += this.rank[rankLowRoot];
      this.max = Math.max(this.max, this.members[rankHighRoot]);
    }
  }
}

export function largestComponentSize(nums: number[]): number {
  const numSet = new Set(nums);
  const n = Math.max(...nums) + 1;
  const unionFind = new UnionFind(n);
  const isPrime = Array(n).fill(true);
  const primes = [];
  const divisor = Array(n).fill(1);

  for (let i = 2; i < n; i++) {
    if (isPrime[i]) {
      primes.push(i);
    }

    if (numSet.has(i)) {
      unionFind.members[i]++;
      for (let j = i; j !== 1; j = divisor[j]) {
        unionFind.union(i, j / divisor[j]);
      }
    }

    for (let j = 0; j < primes.length && i * primes[j] < n; j++) {
      const curPrime = primes[j];
      isPrime[curPrime * i] = false;
      divisor[curPrime * i] = i;
      if (i % curPrime === 0) {
        break;
      }
    }
  }

  return unionFind.max;
}

console.log(largestComponentSize([100, 68, 70, 79, 80, 20, 25, 27]));
