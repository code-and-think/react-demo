export class FindUnion {
  parent: Array<number>;

  count: number;
  i: number;
  j: number;

  constructor(i: number, j: number) {
    this.parent = [];
    this.count = i * j;
    this.i = i;
    this.j = j;
    for (let k = 0; k < i * j; k++) {
      this.parent[k] = k;
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
      if (this.inBoundary(rootX)) {
        this.parent[rootY] = rootX;
      } else {
        this.parent[rootX] = rootY;
      }
    }
  }

  inBoundary(x: number) {
    return [0, this.i - 1].includes(Math.floor(x / this.j)) || [0, this.j - 1].includes(x % this.j);
  }
}
function solve(board: string[][]): void {
  const [x, y] = [board.length, board[0].length];
  const findUnion = new FindUnion(x, y);
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      const curIndex = i * y + j;
      if (board[i][j] === 'O') {
        if (board[i][j - 1] === 'O') {
          findUnion.union(curIndex, curIndex - 1);
        }
        if (board[i][j + 1] === 'O') {
          findUnion.union(curIndex, curIndex + 1);
        }
        if (board[i - 1]?.[j] === 'O') {
          findUnion.union(curIndex, curIndex - y);
        }
        if (board[i + 1]?.[j] === 'O') {
          findUnion.union(curIndex, curIndex + y);
        }
      }
    }
  }

  console.log(findUnion.parent);

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      const rootIndex = findUnion.find(i * y + j);
      const rootInBoundary = findUnion.inBoundary(rootIndex);
      console.log({ rootIndex, rootInBoundary });
      if (!rootInBoundary || board[Math.floor(rootIndex / y)][rootIndex % y] !== 'O') {
        board[i][j] = 'X';
      }
    }
  }
}
const board = [
  ['X', 'X', 'X', 'X'],
  ['X', 'O', 'O', 'X'],
  ['X', 'O', 'O', 'X'],
  ['O', 'X', 'X', 'X'],
];
solve(board);
console.log(board);
